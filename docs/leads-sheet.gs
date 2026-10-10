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
 *
 * One-time setup (Project Settings → Script Properties):
 *   SITE_SECRET = the value of LEADS_SHEET_SECRET in Vercel.
 * Then run setup() once from the editor and allow access.
 * After any code change: Deploy → Manage deployments → edit → New version.
 * The web-app URL stays the same.
 */

const SITE_PURCHASE_URL = 'https://hautppfstudio.com/api/purchase'
const TIMEZONE = 'America/New_York'

const STATUSES = ['Новая', 'Связались', 'Записан', 'Оплатил', 'Отказ']
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
      'Новая', '', '', '',
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
  for (let row = Math.max(range.getRow(), 2); row <= range.getLastRow(); row++) sendIfPaid(sheet, row)
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

  // Rows written before event_id existed get a stable id of their own.
  const ts = new Date(at(COL.timestamp)).getTime()
  const leadId = String(at(COL.eventId) || 'row_' + row + '_' + (isNaN(ts) ? 0 : Math.floor(ts / 1000)))

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

// ── Setup and menu ──────────────────────────────────────────────────────────
function setup() {
  const ss = SpreadsheetApp.getActiveSpreadsheet()
  ensureLayout(leadsSheet())
  ScriptApp.getProjectTriggers()
    .filter((t) => t.getHandlerFunction() === 'onPaidEdit')
    .forEach((t) => ScriptApp.deleteTrigger(t))
  ScriptApp.newTrigger('onPaidEdit').forSpreadsheet(ss).onEdit().create()
  if (!PropertiesService.getScriptProperties().getProperty('SITE_SECRET')) {
    throw new Error('Добавьте SITE_SECRET в Project Settings → Script Properties и запустите setup() ещё раз.')
  }
}

function onOpen() {
  SpreadsheetApp.getUi().createMenu('HAUT').addItem('Send paid rows to Meta', 'sendPaidRows').addToUi()
}
