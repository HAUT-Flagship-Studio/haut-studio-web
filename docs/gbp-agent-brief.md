# Бриф: Google Business Profile — HAUT Flagship Studio

Для агента, который ведёт профиль студии в Google Business Profile (GBP).
Состояние на 2026-11-22. Тексты для вставки в профиль написаны по-английски,
инструкции по-русски. Если что-то здесь расходится с `lib/data.ts` в репозитории
hautppfstudio.com, верен `lib/data.ts`.

## Зачем это

Сайт студии в поиске уже стоит высоко, но клики уходят на карту.

- **По «ppf near me» главная hautppfstudio.com на 4.5 месте.** По
  «affordable paint protection film» и «benefits of paint protection film» она
  на 1-м.
- **Кликов почти нет.** За 23.10–19.11 из поиска пришло 8 кликов на 1414
  показов. По местным запросам кликов ноль: их забирает блок с картой над
  результатами.
- **Посещений из поиска 2 в неделю.** Платная реклама выключена с конца
  октября, другого трафика у студии сейчас нет.
- **Конкуренты на карте:** Tint World Paramus, Ceramic Pro Hackensack,
  Sound Waves, Illmatic Wraps, 46tints. У них от 50 до 200 отзывов.

Цель — попасть в первые три места карты по запросам «ppf near me», «paint
protection film near me», «ceramic coating near me» и «car window tinting near
me» в Hackensack, Lodi, Fair Lawn, Paramus и Teaneck. Попадание в эти три места
зависит от трёх вещей: насколько профиль совпадает с поиском, близко ли студия
к тому, кто ищет, и насколько профиль известен. Близость изменить нельзя.
Совпадение — это правильные категории, услуги и описание. Известность — это
отзывы, фото, посты и одинаковые данные во всех каталогах.

## Данные: везде символ в символ

```
HAUT Flagship Studio
361 NJ-17
Hackensack, NJ 07601
+1 (201) 201-0170
```

- **Ссылка в поле Website:**
  `https://hautppfstudio.com/?utm_source=google&utm_medium=organic&utm_campaign=gbp`.
  Метка нужна, иначе GA4 считает клики с карты прямыми заходами.
- **Часы:** Monday–Friday 10:00 AM – 7:00 PM. Saturday и Sunday — Closed.
- **Метка на карте:** https://maps.app.goo.gl/XTmE5NDHpzPsf16Y7 (40.8773629,
  −74.0652157).

Не путать с брендом:
- haut-usa.com — сайт производителя плёнки, это не студия;
- (551) 800-2858 — офис бренда, а не телефон студии.

## Известные проблемы, исправить первыми

1. **Название в профиле с ключевыми словами.** На 2026-10-06 карта показывала
   «HAUT Flagship Studio - Premium PPF & Paint Protection». Ключевые слова в
   названии нарушают правила Google: если конкурент пожалуется, профиль могут
   заблокировать. К тому же это расходится с тоном бренда. Название должно
   быть ровно `HAUT Flagship Studio`. Проверь, какое оно сейчас.
2. **Старая карточка в Yelp «HAUT Protection Film»** (Hackensack). В ней
   телефон (347) 593-0666 и другие часы. Её нужно получить в управление
   (Claim) и исправить данные. Если не выйдет — закрыть.
3. **На haut-usa.com, в поиске установщиков, у студии стоит телефон бренда.**
   Карточка подписана «HAUT Flagship Studio», а номер в ней (551) 800-2858.
   Данные берутся из записи дилера в HAUT Software, исправляет владелец. Агент
   только проверяет, что исправлено.
4. **По адресу 361 NJ-17 в Yelp и LoopNet значится Pelican Car Wash and Lube.**
   Это другой бизнес в том же здании. Не путать и не «исправлять».

## Профиль: что должно стоять

**Категории.** Основная — `Vehicle wrapping service`, не менять. Проверено
агентом 2026-11-22: отдельной категории для PPF в Google нет. Чаще всего
профиль находят по «car wrap near me» (96 показов против 23 у «paint protection
film»). У конкурентов рядом на карте основная категория тоже эта. 15.11 студия
была на 3-м месте карты по «paint protection film Hackensack NJ». Переключать
основную категорию только по решению владельца. Дополнительные: `Car detailing
service`, `Window tinting service`.

**Описание** (до 750 символов):

```
HAUT Flagship Studio installs paint protection film, ceramic coating and automotive window tinting at 361 NJ-17 in Hackensack, a mile from Lodi and a short drive from Fort Lee, Tenafly, Ridgewood, Alpine, Saddle River and Franklin Lakes. PPF patterns are traced by hand on the actual car, digitized with HAUT Precision Scan and plotter-cut — no blade on the paint, edges wrapped. The film is self-healing and carries a ten-year manufacturer warranty registered to the car. Work happens in climate-controlled bays; a full vehicle takes three to five business days. Packages: Front End Protection from $2,399, Highway & Track from $3,199, Full Body Armor from $6,499, ceramic coating from $999, window tint from $199. Open Monday–Friday 10–7.
```

**Услуги с ценами** (раздел Services):

```
Front End Protection (PPF) — from $2,399
Highway & Track Package (PPF) — from $3,199
Full Body Armor (PPF) — from $6,499
Ceramic Coating — from $999
Window Tint, Front Windows — from $199
Window Tint, Windshield — from $299
Window Tint, Full Vehicle — from $799
```

**Тонировка только для машин.** Почти половина показов страницы /window-tint
приходится на тонировку домов («home / residential window tinting near me»).
Таких услуг в профиле быть не должно, и в постах не намекать на дома и офисы.

**Фото:** минимум 20, логотип и обложка отдельно. Готовые снимки лежат в
репозитории:
- `public/assets/work/`: Ferrari F8, две SF90, Huracán Tecnica, Revuelto,
  Porsche GT3 RS;
- `public/assets/`: `hero-car-photo`, `ppf-page-cover`.

GBP не принимает `.webp`, перед загрузкой конвертируй в JPG. Ещё нужны фасад
с вывеской, бокс изнутри и плоттер в работе. Таких снимков нет, их снимает
владелец на телефон.

**Вопросы и ответы.** Владелец больше не может сам добавлять вопросы с
ответами: Google убрал эту функцию. Отвечай на вопросы, которые Google
формирует сам.

**Фото: только реальные работы студии.** Рендеры (`ppf-finish-gloss`,
`ppf-finish-matte`) и снимки `service-*`, по которым не видно, что это студия,
не загружать.

## Работа каждую неделю

1. **Один пост.** Готовые тексты:

```
Front End Protection from $2,399: full bumper, full hood, full fenders, mirrors and headlights in self-healing film. Patterns traced by hand on the actual car and plotter-cut — no blade on the paint. 10-year manufacturer warranty. 361 NJ-17, Hackensack.
```
```
New car this month? The week it is delivered is the week to film it. Paint that has never been chipped needs no correction, so the film goes on faster and protects original paint. Front End from $2,399, Full Body Armor from $6,499.
```
```
Satin finish without a respray: a matte film over factory gloss paint, fully reversible, 10-year warranty. See the gloss-vs-matte comparison on hautppfstudio.com/ppf.
```
```
Automotive window tint from $199, cut by plotter to the car's own pattern, within New Jersey legal limits. Vehicles only. Mon–Fri 10–7 at 361 NJ-17, Hackensack.
```

   Когда готовые тексты закончатся, лучший пост — конкретная машина, сданная на
   этой неделе: марка, какой пакет, фото. Ссылки на страницы под марки:
   hautppfstudio.com/ppf/ferrari, /ppf/lamborghini, /ppf/porsche.

2. **Ответ на каждый новый отзыв в течение 48 часов.** По имени, одно-два
   предложения, назвать, что делали. На негативный отвечать спокойно и по
   фактам, разбор переносить в телефонный разговор.

3. **Ссылка на отзыв каждому клиенту в день выдачи машины.** Шаблон SMS
   (отправляет владелец):

```
Hi [Name], thank you for trusting HAUT Flagship Studio with your [car]. If you have a minute, a Google review helps the next owner find us — and if you mention your town, it helps even more: [REVIEW LINK]. Vadim
```

## Каталоги (одинаковые данные во всех)

Порядок — по отдаче на час работы:
1. **Bing Places:** «Import from Google».
2. **Apple Business Connect.**
3. **Yelp:** см. проблему 2 выше. Рекламу у Yelp не покупать.
4. **Facebook:** раздел About.
5. **Nextdoor Business.**
6. **Patch Hackensack.**
7. **YellowPages.**

Везде одни и те же название, адрес и телефон из блока выше и сайт
`https://hautppfstudio.com`.

## Нельзя

- Покупать, выменивать или писать отзывы, просить их у родных и знакомых,
  предлагать скидку за отзыв.
- Добавлять в название города, услуги и прилагательные.
- Заводить второй профиль или виртуальный офис в другом городе.
- Писать «premium», «luxury», «best», «elite» и подобные превосходные
  степени. Пиши, что именно делается: паттерн по скану, без лезвия по краске,
  самовосстанавливающееся покрытие, тонировка по плоттеру, гарантия
  производителя на 10 лет.
- Обещать то, чего нет в `lib/data.ts`. Это касается сроков, гарантии и
  керамики: что именно продаётся как керамика, ещё не утверждено, поэтому
  про керамику только «Ceramic Coating — from $999», без названия продукта и
  гарантии.

## Доступ

У GCP-проекта `steel-paratext-441716-t4` (249583020756) нет одобрения Business
Profile API, квота — ноль. Поэтому профиль ведётся вручную через
business.google.com под аккаунтом владельца. Заявка на доступ к API:
https://developers.google.com/my-business/content/prereqs. После одобрения
отзывы, просмотры и посты можно будет снимать скриптами из
`~/.ga-credentials/scripts`.

## Что сообщать раз в неделю

- **Профиль:** число отзывов и средняя оценка; сколько отзывов получено и
  сколько ответов дано за неделю.
- **Статистика GBP за неделю:** просмотры, звонки, переходы на сайт, маршруты.
- **Работа:** что опубликовано, какие каталоги проверены и исправлены.
- **Сверка с GA4:** посещения сайта с меткой `utm_campaign=gbp`. Это свойство
  GA4 студии 549989645, звонки и заявки там с 2026-11-22 считаются ключевыми
  событиями.

Исходные цифры (23.10–19.11): из поиска 8 кликов на сайт студии, по местным
запросам кликов ноль. Звонков с сайта за 25.10–21.11 — один.
