/**
 * HAUT Flagship Studio — Apps Script bound to the "Leads" sheet
 * (Google account vadim@hautppfstudio.com, project "Leads").
 *
 * The source of truth is this file in the site repo, docs/leads-sheet.gs. Edit
 * it here, then paste the whole file into the Apps Script editor.
 *
 * What it does:
 *   1. doPost — the site's /api/lead posts every enquiry here; one row each.
 *      A–I are the original nine columns, J–R what the site added on
 *      2026-10-09, S–V are filled in by the studio.
 *   2. onPaidEdit — when Status becomes "Оплатил" and Paid amount is filled,
 *      the row goes to https://hautppfstudio.com/api/purchase, which reports a
 *      Purchase to Meta. The result lands in "Sent to Meta". A row with ✓ is
 *      never sent again; a row with an error is retried on the next edit or
 *      from the menu HAUT → Send paid rows to Meta.
 *   3. checkReminders (every 5 min) and dailyDigest (10:00 ET) — reminders to
 *      the sales chat in Telegram: a lead still "Новая" after 15 and 60 minutes
 *      of studio hours, and every morning the clients "Записан" for over 7 days
 *      with no payment marked, plus leads left "Новая" for over a day. Sent
 *      through https://hautppfstudio.com/api/notify, so the bot token stays in
 *      Vercel.
 *
 * One-time setup (Project Settings → Script Properties):
 *   SITE_SECRET = the value of LEADS_SHEET_SECRET in Vercel.
 * Then run setup() once from the editor and allow access.
 * After any code change: Deploy → Manage deployments → edit → New version.
 * The web-app URL stays the same.
 */

const SITE_PURCHASE_URL = 'https://hautppfstudio.com/api/purchase'
const SITE_NOTIFY_URL = 'https://hautppfstudio.com/api/notify'
const TIMEZONE = 'America/New_York'

// Studio hours, as on the site: Mon–Fri 9–18, Sat 9–16, Sunday closed.
// Keyed by ISO weekday (1 = Monday).
const OPEN_HOURS = { 1: [9, 18], 2: [9, 18], 3: [9, 18], 4: [9, 18], 5: [9, 18], 6: [9, 16] }
const REMIND_AFTER_MIN = [15, 60]
const BOOKED_STALE_DAYS = 7

const STATUSES = ['Новая', 'Связались', 'Записан', 'Оплатил', 'Отказ']
const NEW = 'Новая'
const BOOKED = 'Записан'
const PAID = 'Оплатил'

// Column numbers (A = 1). A–I are the original layout and must not move.
const COL = {
  timestamp: 1, name: 2, phone: 3, email: 4, vehicle: 5, services: 6, estimate: 7, type: 8, notes: 9,
  utmSource: 10, utmMedium: 11, utmCampaign: 12, utmContent: 13, fbclid: 14, source: 15,
  fbc: 16, fbp: 17, eventId: 18,
  status: 19, amount: 20, paidDate: 21, sent: 22,
}
const NEW_HEADERS = [
  'utm_source', 'utm_medium', 'utm_campaign', 'utm_content', 'fbclid', 'source',
  'fbc', 'fbp', 'event_id', 'Status', 'Paid amount', 'Paid date', 'Sent to Meta',
]

function leadsSheet() {
  return SpreadsheetApp.getActiveSpreadsheet().getSheets()[0]
}

/** Headers J1:V1, the Status dropdown, amount and date formats. Safe to repeat. */
function ensureLayout(sheet) {
  const header = sheet.getRange(1, COL.utmSource, 1, NEW_HEADERS.length)
  if (header.getValues()[0].join('') === '') header.setValues([NEW_HEADERS]).setFontWeight('bold')

  if (sheet.getMaxRows() < 2) sheet.insertRowAfter(1)
  const rows = sheet.getMaxRows() - 1
  const statusRule = SpreadsheetApp.newDataValidation().requireValueInList(STATUSES, true).setAllowInvalid(false).build()
  sheet.getRange(2, COL.status, rows, 1).setDataValidation(statusRule)
  sheet.getRange(2, COL.amount, rows, 1).setNumberFormat('$#,##0.00')
  const dateRule = SpreadsheetApp.newDataValidation().requireDate().setAllowInvalid(false).build()
  sheet.getRange(2, COL.paidDate, rows, 1).setDataValidation(dateRule).setNumberFormat('yyyy-mm-dd')
}

/** A value from a web form must never run as a formula: "=…" or "+1 (201)…". */
function safe(v) {
  const s = v === undefined || v === null ? '' : String(v)
  return /^[=+\-@]/.test(s) ? "'" + s : s
}

// ── 1. New enquiries from the site ──────────────────────────────────────────
function doPost(e) {
  const lock = LockService.getScriptLock()
  lock.waitLock(20000)
  try {
    const sheet = leadsSheet()
    const d = JSON.parse(e.postData.contents)
    if (sheet.getRange(1, COL.utmSource).getValue() === '') ensureLayout(sheet)

    sheet.appendRow([
      d.timestamp || new Date().toISOString(),
      safe(d.name), safe(d.phone), safe(d.email), safe(d.vehicle), safe(d.services),
      safe(d.estimate), safe(d.type), safe(d.notes),
      safe(d.utm_source), safe(d.utm_medium), safe(d.utm_campaign), safe(d.utm_content), safe(d.fbclid),
      safe(d.source), safe(d.fbc), safe(d.fbp), safe(d.event_id),
      NEW, '', '', '',
    ])

    return ContentService.createTextOutput(JSON.stringify({ success: true })).setMimeType(ContentService.MimeType.JSON)
  } finally {
    lock.releaseLock()
  }
}

// ── 2. Paid clients to Meta ─────────────────────────────────────────────────
function onPaidEdit(e) {
  const range = e.range
  const sheet = range.getSheet()
  if (sheet.getSheetId() !== leadsSheet().getSheetId()) return
  // Only edits that touch Status, Paid amount or Paid date matter.
  if (range.getLastColumn() < COL.status || range.getColumn() > COL.paidDate) return
  for (let row = Math.max(range.getRow(), 2); row <= range.getLastRow(); row++) {
    recordStatus(sheet, row)
    sendIfPaid(sheet, row)
  }
}

/** The lead's id: event_id from the site, or a stable one for rows that predate it. */
function leadIdOf(v, row) {
  const ts = new Date(v[COL.timestamp - 1]).getTime()
  return String(v[COL.eventId - 1] || 'row_' + row + '_' + (isNaN(ts) ? 0 : Math.floor(ts / 1000)))
}

function sendPaidRows() {
  const sheet = leadsSheet()
  for (let row = 2; row <= sheet.getLastRow(); row++) sendIfPaid(sheet, row)
}

function sendIfPaid(sheet, row) {
  const v = sheet.getRange(row, 1, 1, COL.sent).getValues()[0]
  const at = (c) => v[c - 1]
  if (at(COL.status) !== PAID) return
  if (at(COL.amount) === '' || at(COL.amount) === null) return
  if (String(at(COL.sent)).indexOf('✓') === 0) return

  const secret = PropertiesService.getScriptProperties().getProperty('SITE_SECRET')
  const sentCell = sheet.getRange(row, COL.sent)
  if (!secret) {
    sentCell.setValue('Ошибка: нет SITE_SECRET в Script Properties')
    return
  }

  let paid = at(COL.paidDate)
  if (!paid) {
    paid = new Date()
    sheet.getRange(row, COL.paidDate).setValue(paid)
  }
  const paidDate = paid instanceof Date ? Utilities.formatDate(paid, TIMEZONE, 'yyyy-MM-dd') : String(paid)

  const leadId = leadIdOf(v, row)

  let result
  try {
    const res = UrlFetchApp.fetch(SITE_PURCHASE_URL, {
      method: 'post',
      contentType: 'application/json',
      headers: { 'x-haut-secret': secret },
      muteHttpExceptions: true,
      payload: JSON.stringify({
        leadId: leadId,
        amount: at(COL.amount),
        paidDate: paidDate,
        name: String(at(COL.name)),
        phone: String(at(COL.phone)),
        email: String(at(COL.email)),
        services: String(at(COL.services)),
        source: String(at(COL.source)),
        fbc: String(at(COL.fbc)),
        fbp: String(at(COL.fbp)),
      }),
    })
    result = JSON.parse(res.getContentText() || '{}')
  } catch (err) {
    result = { ok: false, error: String(err) }
  }

  const stamp = Utilities.formatDate(new Date(), TIMEZONE, 'yyyy-MM-dd HH:mm')
  sentCell.setValue(result.ok ? '✓ ' + stamp : 'Ошибка ' + stamp + ': ' + String(result.error || result.detail).slice(0, 300))
}

// ── 3. Reminders to the sales chat ──────────────────────────────────────────
const state = () => PropertiesService.getDocumentProperties()

/** When each lead's status last changed — the sheet itself does not keep it. */
function recordStatus(sheet, row) {
  const v = sheet.getRange(row, 1, 1, COL.sent).getValues()[0]
  const status = v[COL.status - 1]
  const key = 'status_' + leadIdOf(v, row)
  const prev = JSON.parse(state().getProperty(key) || '{}')
  if (prev.s !== status) state().setProperty(key, JSON.stringify({ s: status, t: Date.now() }))
}

function isOpen(date) {
  const parts = Utilities.formatDate(date, TIMEZONE, 'u H').split(' ')
  const hours = OPEN_HOURS[Number(parts[0])]
  const hour = Number(parts[1])
  return !!hours && hour >= hours[0] && hour < hours[1]
}

/** Minutes the studio was open between two moments, in 5-minute steps. */
function openMinutesBetween(from, to) {
  let minutes = 0
  for (let t = from.getTime(); t < to.getTime(); t += 5 * 60000) if (isOpen(new Date(t))) minutes += 5
  return minutes
}

function notify(text) {
  const secret = PropertiesService.getScriptProperties().getProperty('SITE_SECRET')
  if (!secret) return false
  const res = UrlFetchApp.fetch(SITE_NOTIFY_URL, {
    method: 'post',
    contentType: 'application/json',
    headers: { 'x-haut-secret': secret },
    muteHttpExceptions: true,
    payload: JSON.stringify({ text: text }),
  })
  if (res.getResponseCode() !== 200) console.error('notify failed: ' + res.getContentText())
  return res.getResponseCode() === 200
}

function rowLink(sheet, row) {
  return sheet.getParent().getUrl() + '#gid=' + sheet.getSheetId() + '&range=A' + row
}

function describe(v) {
  const at = (c) => v[c - 1]
  return [at(COL.name) || 'без имени', at(COL.phone)].filter(String).join(' · ') + '\n' +
    [at(COL.vehicle), at(COL.services), at(COL.estimate)].filter(String).join(' · ')
}

/** Every 5 minutes: leads still "Новая" after 15 and 60 minutes of studio hours. */
function checkReminders() {
  const now = new Date()
  if (!isOpen(now)) return
  const sheet = leadsSheet()
  const last = sheet.getLastRow()
  if (last < 2) return
  const values = sheet.getRange(2, 1, last - 1, COL.sent).getValues()
  const oldest = now.getTime() - 4 * 86400000

  values.forEach(function (v, i) {
    const row = i + 2
    if (v[COL.status - 1] !== NEW) return
    const ts = new Date(v[COL.timestamp - 1])
    if (isNaN(ts.getTime()) || ts.getTime() < oldest) return

    const key = 'reminded_' + leadIdOf(v, row)
    const done = Number(state().getProperty(key) || 0)
    if (done >= REMIND_AFTER_MIN[REMIND_AFTER_MIN.length - 1]) return

    const waited = openMinutesBetween(ts, now)
    // The highest threshold reached — one message, never a 15-minute ping after the hour one.
    const due = REMIND_AFTER_MIN.filter((m) => m <= waited && m > done).pop()
    if (!due) return

    const head = due >= 60 ? '🔴 Заявка без ответа уже час' : '⏰ Заявка ждёт ответа ' + due + ' мин'
    if (notify(head + '\n' + describe(v) + '\nПоставьте статус: ' + rowLink(sheet, row))) {
      state().setProperty(key, String(due))
    }
  })
}

/** 10:00 ET, Monday to Saturday: what is stuck. */
function dailyDigest() {
  const now = new Date()
  if (Utilities.formatDate(now, TIMEZONE, 'u') === '7') return
  const sheet = leadsSheet()
  const last = sheet.getLastRow()
  if (last < 2) return
  const values = sheet.getRange(2, 1, last - 1, COL.sent).getValues()

  const booked = []
  const unanswered = []
  values.forEach(function (v, i) {
    const row = i + 2
    const status = v[COL.status - 1]
    if (status === BOOKED) {
      const key = 'status_' + leadIdOf(v, row)
      let rec = JSON.parse(state().getProperty(key) || '{}')
      // Booked before reminders existed: start counting from today.
      if (rec.s !== BOOKED) {
        rec = { s: BOOKED, t: now.getTime() }
        state().setProperty(key, JSON.stringify(rec))
      }
      const days = Math.floor((now.getTime() - rec.t) / 86400000)
      if (days >= BOOKED_STALE_DAYS) booked.push('• ' + describe(v).replace('\n', ' — ') + ' (' + days + ' дн.) ' + rowLink(sheet, row))
    } else if (status === NEW) {
      const ts = new Date(v[COL.timestamp - 1]).getTime()
      const age = now.getTime() - ts
      if (age > 86400000 && age < 14 * 86400000) unanswered.push('• ' + describe(v).replace('\n', ' — ') + ' ' + rowLink(sheet, row))
    }
  })

  const parts = []
  if (booked.length) parts.push('📋 Записаны больше ' + BOOKED_STALE_DAYS + ' дней, оплата не отмечена. Если клиент заплатил — поставьте «Оплатил» и сумму:\n' + booked.join('\n'))
  if (unanswered.length) parts.push('🔴 Новые заявки без ответа больше суток:\n' + unanswered.join('\n'))
  if (parts.length) notify(parts.join('\n\n'))
}

// ── Setup and menu ──────────────────────────────────────────────────────────
function setup() {
  const ss = SpreadsheetApp.getActiveSpreadsheet()
  ensureLayout(leadsSheet())
  const handlers = ['onPaidEdit', 'checkReminders', 'dailyDigest']
  ScriptApp.getProjectTriggers()
    .filter((t) => handlers.indexOf(t.getHandlerFunction()) !== -1)
    .forEach((t) => ScriptApp.deleteTrigger(t))
  ScriptApp.newTrigger('onPaidEdit').forSpreadsheet(ss).onEdit().create()
  ScriptApp.newTrigger('checkReminders').timeBased().everyMinutes(5).create()
  ScriptApp.newTrigger('dailyDigest').timeBased().everyDays(1).atHour(10).inTimezone(TIMEZONE).create()
  if (!PropertiesService.getScriptProperties().getProperty('SITE_SECRET')) {
    throw new Error('Добавьте SITE_SECRET в Project Settings → Script Properties и запустите setup() ещё раз.')
  }
}

function onOpen() {
  SpreadsheetApp.getUi().createMenu('HAUT').addItem('Send paid rows to Meta', 'sendPaidRows').addToUi()
}
