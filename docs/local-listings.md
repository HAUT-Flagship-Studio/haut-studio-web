# Локальные профили студии — набор для копирования

Всё, что нужно вставить в Google Business Profile, Yelp, Apple, Bing, Facebook
и Nextdoor. Текст на английском готов к вставке; инструкции — по-русски.
Данные взяты из `lib/data.ts` и `lib/serviceArea.ts` на 2026-10-02 — если там меняются цены или
часы, менять и здесь.

**Правило одно: имя, адрес и телефон везде символ в символ.** Google сверяет
профили между собой; «NJ-17» в одном месте и «Route 17» в другом — это два
разных бизнеса для него.

## NAP — имя, адрес, телефон

```
HAUT Flagship Studio
361 NJ-17
Hackensack, NJ 07601
+1 (201) 201-0170
https://hautppfstudio.com
```

Сайт для поля «Website» в Google Business Profile — с меткой, чтобы в GA4
клики с карты перестали падать в Direct:

```
https://hautppfstudio.com/?utm_source=google&utm_medium=organic&utm_campaign=gbp
```

Часы:

```
Monday–Friday 9:00 AM – 6:00 PM
Saturday 9:00 AM – 4:00 PM
Sunday Closed
```

## Описания

Короткое (до 160 символов — Yelp, Bing, Apple):

```
Paint protection film, ceramic coating and window tinting at 361 NJ-17, Hackensack. Self-healing film, zero blades on paint, 10-year manufacturer warranty.
```

Длинное (до 750 символов — Google Business Profile, Facebook):

```
HAUT Flagship Studio installs paint protection film, ceramic coating and automotive window tinting at 361 NJ-17 in Hackensack, a mile from Lodi and a short drive from Fort Lee, Tenafly, Ridgewood, Alpine, Saddle River and Franklin Lakes. PPF patterns are cut from the car's own scan data with HAUT Precision Scan — no blade on the paint, edges wrapped. The film is self-healing and carries a ten-year manufacturer warranty registered to the car. Work happens in climate-controlled bays; a full vehicle takes three to five business days. Packages: Front End Protection from $2,399, Highway & Track from $3,199, Full Body Armor from $6,499, ceramic coating from $999, window tint from $199. Open Monday–Friday 9–6, Saturday 9–4.
```

## Категории

Google Business Profile:
- Основная: **Car detailing service** — под неё попадают запросы «ceramic
  coating», «ppf» и «near me» с карты. Если в списке категорий найдётся
  «Paint protection film service» или похожая — ставить её основной, а
  Car detailing service второй.
- Дополнительные: **Window tinting service**, **Vehicle wrapping service**.

Yelp: Auto Detailing, Car Window Tinting, Vehicle Wraps.

## Услуги с ценами (раздел Services в GBP, Yelp)

```
Front End Protection (PPF) — from $2,399
Highway & Track Package (PPF) — from $3,199
Full Body Armor (PPF) — from $6,499
Ceramic Coating — from $999
Window Tint, Front Windows — from $199
Window Tint, Windshield — from $299
Window Tint, Full Vehicle — from $799
```

## Фото для загрузки

Из `public/assets/work/`: Ferrari F8, обе SF90, Huracán Tecnica, Revuelto,
Porsche GT3 RS. Из `public/assets/`: `hero-car-photo.webp`,
`ppf-page-cover.webp`, `service-ppf.webp`, `service-ceramic-coating.webp`,
`service-window-tinting.webp`, `ppf-finish-gloss.webp`, `ppf-finish-matte.webp`.
GBP не принимает `.webp` — перед загрузкой конвертировать в JPG. Плюс
обязательно: фасад с вывеской, бокс изнутри, плоттер за работой. Этого в
`assets` нет — снять телефоном, Google любит именно такие.

## Google Business Profile — что сделать

1. business.google.com → профиль «HAUT Flagship Studio». Проверить, что
   Website = ссылка с меткой выше, а не haut-usa.com.
2. Категории — как выше.
3. Описание — длинное, как выше.
4. Services — список с ценами.
5. Фото — минимум 20. Логотип и обложку — отдельно.
6. Пост раз в неделю. Четыре готовых ниже.
7. «Get more reviews» → скопировать короткую ссылку на отзыв → вставить в
   SMS-шаблон ниже. Отправлять **каждому** клиенту при выдаче машины.
8. Q&A: добавить самому три вопроса-ответа (цена, сроки, гарантия) — иначе
   их добавят случайные люди.

Отзывы — это и есть первое место на карте. У конкурентов в Хакенсаке
50–200 отзывов. Просить в день выдачи, не позже.

### SMS после выдачи

```
Hi [Name], thank you for trusting HAUT Flagship Studio with your [car]. If you have a minute, a Google review helps the next owner find us — and if you mention your town, it helps even more: [REVIEW LINK]. Vadim
```

### Посты в GBP (по одному в неделю)

```
Front End Protection from $2,399: full bumper, full hood, full fenders, mirrors and headlights in self-healing film. Patterns cut from the car's own scan data — no blade on the paint. 10-year manufacturer warranty. 361 NJ-17, Hackensack.
```

```
New car this month? The week it is delivered is the week to film it. Paint that has never been chipped needs no correction, so the film goes on faster and protects original paint. Front End from $2,399, Full Body Armor from $6,499.
```

```
Satin finish without a respray: a matte film over factory gloss paint, fully reversible, 10-year warranty. See the gloss-vs-matte comparison on hautppfstudio.com/ppf.
```

```
Automotive window tint from $199, cut by plotter to the car's own pattern, within New Jersey legal limits. Vehicles only. Mon–Fri 9–6, Sat 9–4 at 361 NJ-17, Hackensack.
```

## Остальные площадки

Порядок — по отдаче за час работы.

1. **Bing Places** — bingplaces.com → «Import from Google» — пять минут,
   забирает всё из GBP, включая фото.
2. **Apple Business Connect** — businessconnect.apple.com → Apple ID →
   добавить место. Карты в iPhone по умолчанию — это Apple Maps, половина
   «near me» с телефона идёт туда.
3. **Yelp** — biz.yelp.com → Claim. Категории выше, короткое описание,
   фото, услуги с ценами. Не покупать рекламу у их менеджера, который
   позвонит на следующий день.
4. **Facebook-страница** — About: длинное описание, адрес, часы, сайт.
   Instagram — связать с ней, в профиле адрес и ссылка на сайт.
5. **Nextdoor Business** — business.nextdoor.com. Это и есть Alpine,
   Tenafly, Ridgewood: соседи спрашивают «кто делает PPF» именно там.
6. **Patch** (Hackensack) — patch.com/new-jersey/hackensack → Directory →
   добавить бизнес. Конкурент EM NJ Ceramic Coating там уже есть.
7. **YellowPages** — yellowpages.com → Claim your listing.

На каждой: имя, адрес, телефон как в NAP, сайт `https://hautppfstudio.com`,
короткое описание, те же категории, те же фото.

## Доступ к Google Business Profile по API

Сейчас профиль нельзя читать и вести скриптом: у GCP-проекта
`steel-paratext-441716-t4` (249583020756) нет одобрения Google на Business
Profile API, квота — ноль, отсюда «Quota exceeded». Заявка:
https://developers.google.com/my-business/content/prereqs — форма
«Request access», указать этот проект, описание «owner-operated
reporting for one location». Одобряют 1–3 недели. После этого отзывы,
просмотры с карты и посты можно будет снимать и публиковать из
`~/.ga-credentials/scripts`.
