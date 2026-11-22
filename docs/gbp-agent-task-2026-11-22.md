# Мини-ТЗ для агента Google Business Profile — 22.11.2026

Дополнение к [gbp-agent-brief.md](gbp-agent-brief.md). Тексты для вставки в
профиль даны по-английски: вставлять **дословно, целиком, без сокращений**.
Примечания в [квадратных скобках] в профиль не попадают.

## 1. Кнопка записи

Ссылка для кнопки записи в профиле (вместо ARI):

```
https://hautppfstudio.com/book?utm_source=google&utm_medium=organic&utm_campaign=gbp_booking
```

[Метка `gbp_booking` отличается от метки сайта `gbp`: так в GA4 видно, сколько
людей пришло через кнопку записи, а сколько через ссылку на сайт.]

Что важно знать про страницу /book:
- Это заявка, а не бронь. Клиент выбирает будний день (до 30 рабочих дней
  вперёд, начиная с завтра) и время, к которому привезёт машину: с 10:00 до
  18:00. Студия звонит и подтверждает.
- Заявка приходит в Telegram с пометкой «📅 Drop-off request — call to
  confirm» и в таблицу заявок.
- Сам тестовую заявку не отправляй: она придёт как настоящая. Проверку
  отправки делает владелец.

## 2. Праздничные часы (Special hours)

Поставь «Closed» на эти дни. Они совпадают с днями, которые закрыты на /book:

| Дата | Праздник |
|---|---|
| Thu, Nov 26, 2026 | Thanksgiving |
| Fri, Dec 25, 2026 | Christmas Day |
| Fri, Jan 1, 2027 | New Year's Day |

[25.12 и 1.01 разработчик поставил сам, владелец их ещё не подтвердил. Если
владелец скажет, что в какой-то из этих дней студия работает, этот день меняют
и в профиле, и в `lib/booking.ts` на сайте. Они должны совпадать.]

## 3. Пост на неделю: тест пожелтения

Сейчас идёт публичный спор о видео, где плёнку держат под UV-лампой. Клиенты
студии будут о нём спрашивать. Опубликуй этот пост как один из четырёх
недельных:

```
Seen a video of PPF turning yellow under a UV lamp? Most of those lamps put out short-wave UV that never reaches a car: the atmosphere stops sunlight at about 295 nm. The film we install is tested the way the weathering standard does it, ASTM G154 with UVA-340 lamps, and carries a 10-year manufacturer warranty that covers premature yellowing. How the test works and the measured numbers are in the article below.
```

Кнопка поста: **Learn more** →

```
https://haut-usa.com/blog/how-ppf-yellowing-is-tested?utm_source=google&utm_medium=organic&utm_campaign=gbp_post
```

[Статья лежит на сайте производителя, а не студии. Это нормально: студия ставит
HAUT, и цифры теста опубликованы там. Сайт haut-usa.com отвечает 403 любому
клиенту, который не является браузером. Поэтому ссылку проверяй в браузере, а
не скриптом.]

Фото к посту: снимок плёнки на машине из папки работ (`public/assets/work/`).
Не скриншот статьи и не лампа.

## 4. Что прислать в ответ

- Кнопка записи стоит, с какой ссылкой.
- Праздничные часы поставлены на три дня.
- Пост опубликован, дата публикации.
