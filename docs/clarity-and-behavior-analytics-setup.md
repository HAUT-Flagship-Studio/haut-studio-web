# Подключение Clarity и аналитики поведения — hautppfstudio.com и haut-usa.com

Дата: 2026-10-20

Код на обоих сайтах уже в `main` и задеплоен. Чтобы включить запись визитов, осталось создать два проекта Microsoft Clarity и прописать их ID в Vercel. **Код писать не нужно.**

| Сайт | Проект Vercel | Что уже работает | Что осталось |
| --- | --- | --- | --- |
| hautppfstudio.com | `haut-studio-web`, коммит `f3a6c89` | Поведенческие события дублируются в GA4 (с 2026-10-18); компонент Clarity; маскирование форм; Clarity упомянута в политике конфиденциальности | Проект Clarity + переменная в Vercel |
| haut-usa.com | `haut-usa-com`, коммиты `0cf86bf`, `f9e5b9a` | Компонент Clarity; политика 1.4 с абзацем про запись сессий (опубликована 2026-10-20); защита в `check-contract.mjs` | Проект Clarity + переменная в Vercel; передать политику 1.4 HAUT Software |

Оба проекта Vercel — в команде `nedelenko7s-projects`. Clarity включается одной переменной окружения `NEXT_PUBLIC_CLARITY_ID`. Пока её нет, компонент ничего не загружает.

---

## Шаг 1. Два проекта в Microsoft Clarity

Нужны два отдельных проекта, по одному на сайт. Аудитории у сайтов разные (владельцы машин и дилеры), и в одном проекте отчёты смешаются.

1. Войти на [clarity.microsoft.com](https://clarity.microsoft.com) под аккаунтом студии (vadim@hautppfstudio.com, вход через Google). Тогда проекты будут принадлежать владельцу, а не разработчику.
2. New project → `HAUT Studio`, URL `https://hautppfstudio.com`.
3. New project → `HAUT USA`, URL `https://haut-usa.com`.
4. **На экране установки ничего не ставить:** ни сниппет в `<head>`, ни через GTM, ни плагином. Скрипт уже подключён в коде сайта. Вторая установка обойдёт все ограничения: тестовый режим, закрытые страницы, отказ посетителя от передачи данных.
5. Взять Project ID каждого проекта: Settings → Overview или строка `clarity.ms/tag/XXXXXXXXXX` в коде установки.

### Настройки каждого проекта (Settings)

| Настройка | Значение | Зачем |
| --- | --- | --- |
| Masking | Balanced (по умолчанию). **Никогда не Relaxed** | Код сам маскирует формы (`data-clarity-mask`), это вторая страховка. Политика обещает, что введённое в формы не попадает в записи |
| Google Analytics integration | Студия → GA4 `G-GSC600LZS3` (property 549989645). Бренд → GA4 `G-QZLSKKW164` (property 552236045) | Из отчёта GA4 можно перейти к записям тех же визитов |
| IP blocking | IP студии в Hackensack и домашние IP владельца (по желанию) | Свои визиты не смешиваются с клиентскими |
| Team | Маркетологи — роль Member, не Admin | Смотрят записи, но не меняют маскирование |
| Data Export | Generate new API token, передать владельцу | Для автоматических отчётов: прокрутка, rage/dead clicks по страницам |

Project ID не секрет: он и так виден в коде страницы. **API-токен — секрет:** не класть в репозиторий и не пересылать в чаты.

---

## Шаг 2. Переменная в Vercel и пересборка

На каждый проект одна переменная, только для Production. После неё обязательно пересобрать сайт: `NEXT_PUBLIC_*` вшивается в JS при сборке, без пересборки сайт её не увидит.

| Проект Vercel | Переменная | Значение | Окружение |
| --- | --- | --- | --- |
| `haut-studio-web` | `NEXT_PUBLIC_CLARITY_ID` | Project ID проекта `HAUT Studio` | Production |
| `haut-usa-com` | `NEXT_PUBLIC_CLARITY_ID` | Project ID проекта `HAUT USA` | Production |

**Через панель:** Project → Settings → Environment Variables → Add, отметить только Production. Затем Deployments → последний Production-деплой → Redeploy.

**Через CLI**, из корня соответствующего репозитория:

```bash
vercel link --yes --project haut-studio-web        # в репозитории бренда — haut-usa-com
vercel env add NEXT_PUBLIC_CLARITY_ID production   # вставить ID, когда спросит
vercel --prod                                      # пересборка с новой переменной
```

В Preview и Development переменная не нужна: код грузит Clarity только на основном домене (не на `*.vercel.app` и не на localhost).

На бренде перед сборкой запускается `scripts/check-contract.mjs`. Если переменная задана, а в `docs/legal/site-privacy-policy.md` нет слова «Clarity», сборка падает с ошибкой `[recording-named-in-policy]`. С политикой 1.4 эта проверка проходит.

---

## Шаг 3. Проверка после включения

Проверять в обычном браузере: DevTools → Network, фильтр `clarity`, блокировщик рекламы выключен. На haut-usa.com включён челлендж Vercel: curl и headless-браузеры получают 403. Это не ошибка деплоя.

### hautppfstudio.com

- [ ] `/ppf` — есть запрос `www.clarity.ms/tag/<ID>`, в консоли `typeof clarity === 'function'`.
- [ ] `/ppf?test=1` — запроса к clarity.ms нет. Тестовый режим держится до закрытия браузера, `?test=0` выключает его.
- [ ] Калькулятор, шаг контактов: у `<form>` есть `data-clarity-mask="true"`. То же у формы телефона в квизе.
- [ ] Зайти по ссылке с `?utm_campaign=check&utm_content=check`. Через 1–2 часа в Clarity → Recordings запись находится фильтром Custom tags: `utm_campaign = check`.
- [ ] В этой записи введённые имя и телефон закрыты масками, текста не видно. **Форму не отправлять**, иначе студии придёт настоящая заявка. Если нужно проверить отправку, делать это с `?test=1`.

### haut-usa.com

- [ ] `/software-ads` и `/` — есть запрос `www.clarity.ms/tag/<ID>`, у всех `<form>` на странице есть `data-clarity-mask`.
- [ ] При прямом заходе на `/login`, `/account`, `/checkout`, `/reset-password`, `/warranty/register` запроса к clarity.ms нет.
- [ ] Переход с публичной страницы на `/login` по ссылке сайта полностью перезагружает страницу, после этого `window.clarity` нет.
- [ ] `/do-not-share` → включить отказ → страница перезагружается, дальше по сайту запросов к clarity.ms нет. После проверки отказ снять.
- [ ] `https://haut-usa-com.vercel.app` — Clarity не грузится.

Первые записи появляются в панели Clarity через час-два. Тепловые карты — когда наберётся трафик.

---

## GA4 студии: что теперь приходит

С 2026-10-18 функция `track()` в `lib/analytics.ts` дублирует в GA4 все поведенческие события, которые раньше уходили только в Meta (функция `mirrorToGa`). Имена переводятся в snake_case.

| Событие GA4 | Когда | Ключевые параметры |
| --- | --- | --- |
| `section_viewed` | Блок страницы попал в экран (`data-track-section`) | `section` |
| `scroll_depth` | Прокрутка 50% / 90% | `percent` |
| `engaged` | 30 / 60 / 120 с активного времени | `seconds` |
| `faq_expand` | Открыт вопрос FAQ | `question` |
| `cta_click` | Нажата кнопка-CTA | `cta_id`, `location` |
| `nav_click`, `outbound_click`, `reviews_click` | Навигация, внешние ссылки, отзывы | `target`, `destination`, `location` |
| `quiz_started`, `quiz_step` | Квиз | `step`, `vehicle_category` |
| `calculator_started`, `calculator_step_viewed`, `calculator_closed` | Калькулятор | `step`, `last_step`, `service` |
| `vehicle_selected`, `package_selected`, `addon_selected`, `addon_removed` | Выбор в калькуляторе | `vehicle_category`, `package`, `addon` |
| `quote_form_viewed`, `form_field_focus`, `form_error` | Форма заявки | `field` |
| `gallery_open`, `hazard_viewed`, `video_play`, `video_progress` | Галерея, блок дорожных угроз, видео | `image_id`, `hazard`, `video_id`, `percent` |

Ко всем событиям добавляются `page_type` и `service`. События `price_viewed`, `generate_lead`, `phone_click`, `sms_click`, `address_click` отправлялись в GA4 и раньше, под своими именами.

**Правило для новых параметров.** Любой новый параметр события нужно зарегистрировать в GA4 как custom dimension (Admin → Custom definitions), иначе GA4 молча его отбросит, а задним числом он не появится. Список зарегистрированного ведётся в `~/.ga-credentials/scripts/ga-create-dims.js` у владельца. Сейчас на студии зарегистрировано 25 параметров: `link_location`, `page_type`, `service`, `section`, `percent`, `seconds`, `question`, `cta_id`, `location`, `step`, `last_step`, `vehicle`, `vehicle_category`, `package`, `addon`, `field`, `hazard`, `image_id`, `video_id`, `destination`, `target`, `town`, `source`, `lead_type`, `reason`.

Новые события ставятся разметкой, без кода: `data-track-section="…"` на блоке, `data-cta="…"` на кнопке, `data-track-location="…"` на контейнере (см. `components/SiteTracking.tsx`).

---

## Политика конфиденциальности бренда 1.4 и HAUT Software

Политика 1.4 опубликована 2026-10-20. Она отличается от 1.3 одним пунктом в §1, «Session recording», — текст юрист одобрил без правок. Версия 1.3 лежит в `docs/legal/history/site-privacy-policy-1.3.md`.

Передать HAUT Software, чтобы они записали новую версию у себя (как при выпуске 1.2 и 1.3):

- документ: `privacy_site`, версия 1.4;
- размер: 10651 байт;
- sha256: `7791236f006b53b164bda4da28836f7d98e6f78d265a405477050d5dcdd4e84b`;
- файл: `https://haut-usa.com/legal/site-privacy-policy.md`. Давать именно URL, а не путь в репозитории: в их репозитории по тому же пути лежит другая версия.

**Важно:** `haut_vid` и события Meta `Subscribe` / `Activated` в 1.4 **не вошли**. Юрист их не видел. Им нужна следующая версия политики (1.5) с отдельным одобрением. До неё эти события в Meta не отправлять.

---

## Чего не делать

- **Не ставить Clarity вторым способом** (GTM, сниппет, плагин). Он обойдёт тестовый режим, закрытые страницы и отказ от передачи данных.
- **Не переключать маскирование в Relaxed** и не снимать `data-clarity-mask` с форм.
- **Не править `docs/legal/*.md` на бренде.** Файлы сверяются по sha256, любая правка ломает сборку. Изменение политики — это новая версия через владельца и юриста.
- **Не убирать путь из `lib/analytics/sensitive-paths.ts`** на бренде, не согласовав это. Список общий для GA4, пикселя Meta, Vercel Analytics и Clarity.
- **Не передавать в события аналитики персональные данные** (имя, телефон, email, VIN, адрес). На бренде это проверяет `check-contract.mjs`, на студии — только код-ревью.
- **Не отправлять тестовые заявки без `?test=1`** на студии: они уходят владельцу в Telegram и в Meta как настоящие.
