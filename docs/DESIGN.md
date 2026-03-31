# ДИЗАЙН-ПЛАН БЛОГА `blog.krofn.online`

## 0. Короткий вердикт по референсам

### Да, в этом стиле работать можно.  
**Но не в лоб.**

То, что ты скинул, — это очень сильный **visual direction**:
- темный premium-фон
- tech/editorial атмосфера
- крупная типографика
- постерная подача
- много воздуха
- тонкие линии, сетки, метки, pseudo-industrial details
- дорогая монохромная подача

### Где проблема, если копировать 1:1
Такой стиль **часто убивает usability**, если:
- текст слишком мелкий и серый
- слишком много декоративного шума
- карточки выглядят как арт-объекты, а не как контент
- статья превращается в «дизайн-плакат», который неудобно читать 4–6 минут
- мобильная версия становится страданием

---

# 1. НАША ДИЗАЙН-СТРАТЕГИЯ

## Рабочая формула:
**AWWWARDS-shell + real editorial readability**

То есть:

- **снаружи** сайт ощущается как дорогой digital object
- **внутри** он читается как хороший editorial / journal / product notes
- главная должна говорить:  
  **“этот чувак умеет визуал, типографику, motion и системное мышление”**
- страница поста должна говорить:  
  **“а еще он понимает UX, ритм контента и не жертвует смыслом ради понтов”**

---

# 2. КОНЦЕПТ: КАКИМ ДОЛЖЕН БЫТЬ САЙТ ПО ОЩУЩЕНИЮ

## Название визуального направления:
**Editorial Control Room**

Представь смесь:
- luxury dark editorial
- tech lab / systems interface
- личный инженерный журнал
- premium product landing
- немного “operating system for ideas”

## Эмоция, которую должен вызывать сайт:
- собранность
- интеллект
- вкус
- дорогой минимализм
- инженерная эстетика
- уверенность без крика

## Не должен вызывать:
- дешёвый “cyberpunk template”
- школьный “я навалил blur + gradients”
- “опять очередной dark SaaS лендинг”
- “дизайнер красиво сломал читаемость”

---

# 3. ГЛАВНЫЕ ПРИНЦИПЫ ДИЗАЙНА

## 3.1. Контент выше декора
Декор поддерживает контент, а не наоборот.  
Если элемент не усиливает восприятие статьи / структуры / бренда — вырезаем.

## 3.2. Один сильный акцент, не десять
Вместо:
- 3 акцентных цветов
- 4 типа свечения
- 5 видов карточек

Делаем:
- 1 базовый цвет фона
- 1 акцентный цвет бренда
- 1 secondary neutral highlight
- единый язык поверхностей, линий и hover-состояний

## 3.3. Типографика — главный герой
Этот блог должен выигрывать **не 3D-шарами**, а:
- ритмом текста
- scale заголовков
- сеткой
- spacing
- микро-метками
- чистыми контрастами

## 3.4. Motion — дорогой, но сдержанный
Анимация не должна выглядеть как “смотри, я знаю GSAP”.  
Она должна выглядеть как “это просто очень хорошо собрано”.

## 3.5. Админка — тоже часть шоукейса
Но:
- не превращаем её в цирк
- админка = “control panel”
- визуально едина с блогом
- функционально очень понятна

---

# 4. ВИЗУАЛЬНАЯ СИСТЕМА

---

## 4.1. Цветовая система

### Базовая палитра
Не чисто черный `#000`, а глубокий layered-dark.

#### Основные цвета:
- **Background Primary:** `#07080B`
- **Background Secondary:** `#0D1016`
- **Surface:** `#11141B`
- **Surface Elevated:** `#151922`
- **Border Soft:** `rgba(255,255,255,0.08)`
- **Border Strong:** `rgba(255,255,255,0.14)`

#### Текст:
- **Text Primary:** `#F3F5F7`
- **Text Secondary:** `#B8BEC9`
- **Text Muted:** `#7F8794`

#### Акцент:
Тут важно не испортить.  
У тебя уже есть сильная ассоциация с теплым акцентом из портфолио.

### Предлагаю:
- **Accent Primary:** `#FF6A1A`
- **Accent Hover:** `#FF7D3A`
- **Accent Soft BG:** `rgba(255,106,26,0.10)`
- **Accent Line:** `rgba(255,106,26,0.35)`

### Дополнительный холодный системный оттенок:
Чтобы было ощущение tech/control.
- **System Blue (очень редко):** `#6E7CFF`

Использовать только:
- активные состояния
- метки
- фокус
- маленькие data-points

### Важно:
**Оранжевый — редкий и точный.**  
Если им залить всё, сайт станет “ремонт квартир 2.0”, а нам нужен premium editorial-tech.

---

## 4.2. Фон и текстуры

### Фон не должен быть плоским
Слой фона делаем из 3 компонентов:

#### 1. Базовый темный фон
Очень темный градиент:
- слева холоднее
- справа чуть теплее
- едва заметно

#### 2. Noise / Grain overlay
Супертонкий шум:
- непрозрачность 2–4%
- не грязный
- не “грязная jpeg-текстура”
- нужен для ощущения дороговизны и глубины

#### 3. Subtle grid / lines
Очень тонкая инженерная сетка:
- 1px линии
- low opacity
- не везде, а локально по секциям
- больше как ощущение структуры, чем явный паттерн

### Что можно добавить:
- редкие radial glows за крупными блоками
- очень мягкие световые пятна
- тонкие технические линии / labels / coordinates / section ids

### Что нельзя:
- слишком явный “futuristic HUD”
- дешёвые neon-сетки
- бесконечные luminous blobs
- яркий стекломорфизм

---

## 4.3. Типографика

Тут надо попасть идеально.  
Нам нужны **3 роли шрифта**.

---

### A. Display font — для hero и крупных заголовков
Задача:
- техничный
- современный
- характерный
- не ломать читаемость

### Варианты:
1. **Unbounded** — если нужен сильный характер и техно-нотка  
2. **Sora** — если нужен более premium-tech баланс  
3. **Manrope** — если хочешь максимально чисто и системно

### Моя рекомендация:
- **Display:** `Sora` или `Unbounded`
- если хочешь **чуть спокойнее и дороже** → `Sora`
- если хочешь **чуть смелее и техничнее** → `Unbounded`

---

### B. Body font — для статьи и интерфейса
Задача:
- идеальная читаемость
- плотный, но мягкий ритм
- хороший набор в длинных абзацах

### Варианты:
- `Manrope`
- `Inter`
- `Geist Sans`

### Моя рекомендация:
- **Body/UI:** `Manrope`
Потому что:
- современный
- аккуратный
- хорошо работает в dark UI
- поддерживает кириллицу
- не выглядит дёшево

---

### C. Mono font — для меток, дат, категорий, system labels
Варианты:
- `IBM Plex Mono`
- `JetBrains Mono`

### Моя рекомендация:
- **Mono:** `IBM Plex Mono`

---

## 4.4. Типографическая шкала

### Для desktop:

#### Hero title:
- `96–140px`
- плотный line-height
- letter-spacing слегка сжатый
- максимум 2–3 строки

#### H1 post:
- `64–88px`

#### H2:
- `36–48px`

#### H3:
- `26–32px`

#### Body Large:
- `20px / 1.7`

#### Body Regular:
- `18px / 1.75`

#### Small meta:
- `12–14px`
- uppercase
- mono
- tracking увеличенный

---

### Для mobile:

#### Hero:
- `42–56px`

#### H1 post:
- `34–42px`

#### Body:
- `16–18px`

#### Meta:
- `11–12px`

---

## 4.5. Сетка и ширины

### Глобальный layout:
- `max-width: 1440px` — outer shell
- `max-width: 1280px` — основные секции
- `max-width: 760px` — текст статьи
- `max-width: 920px` — hero content zone

### Отступы:
- Desktop page padding: `40px`
- Large desktop: `56px`
- Tablet: `24px`
- Mobile: `16px`

### Сетка:
- 12-column grid на desktop
- 6-column на tablet
- 4-column на mobile

---

# 5. ФОРМЫ, ПОВЕРХНОСТИ, БОРДЕРЫ, ТЕНИ

## 5.1. Карточки
Карточки должны ощущаться как:
- панель
- editorial tile
- dark object

### Свойства:
- фон: `surface`
- бордер: 1px soft
- radius: `20px`
- внутренний padding: `20–28px`
- hover: слегка brighter border + soft lift

### Не надо:
- сильный blur
- heavy neumorphism
- жирные тени как в Bootstrap-темах

---

## 5.2. Кнопки

### Primary button
- темный фон + оранжевый акцент
или
- акцентный fill в редких местах

#### Состояния:
- idle: четко, спокойно
- hover: border brightens + subtle translateY(-1px)
- active: чуть сильнее сжатие
- focus: заметный accent ring

### Secondary button
- transparent / dark surface
- border
- white text
- мягкий hover

### Tertiary button
- text + arrow
- editorial style
- тонкая линия / underline reveal

---

## 5.3. Инпуты и формы
Формы не должны выглядеть как дефолтные Tailwind inputs.

### Поля:
- height: `48–56px`
- radius: `14px`
- border: soft
- bg: surface dark
- placeholder: muted
- focus: accent border + glow 1–2px

### Textarea / editor:
- большой внутренний воздух
- хорошая line-height
- toolbar не кричит
- наводка: как будто маленький dark control deck

---

# 6. ЧТО МЫ БЕРЕМ ИЗ ТВОИХ РЕФЕРЕНСОВ

## Берем:
- крупную центральную типографику
- темные большие плоскости
- высокий контраст заголовков
- постерность
- минимальное количество цветов
- «дорогой воздух»
- техно-метки, микронавигацию, labels
- modular composition
- ощущение digital-object, а не просто блога

## Не берем:
- ультрамелкий серый текст
- слишком закрытые композиции
- чрезмерно декоративные 3D-объекты
- нечитабельную плотность
- “Dribbble shot, который невозможно читать”
- giant hero ради hero без контента

---

# 7. СТРУКТУРА ПУБЛИЧНОЙ ЧАСТИ: ДИЗАЙН ПО СТРАНИЦАМ

---

# 7.1. Главная страница блога

## Задача страницы
Сразу показать:
1. это не обычный блог
2. автор — инженер с сильным visual sense
3. здесь есть реальный контент, а не просто “посмотрите, какой я стильный”

---

## Блок 1. Top Navigation

### Состав:
- слева: `KROFN / JOURNAL`
- справа:  
  `About` / `Notes` / `Systems` / `Admin`
- optional language toggle, если нужен
- mobile: burger / sheet menu

### Стиль:
- очень тонкий, тихий
- sticky / fixed
- прозрачный с blur only on scroll
- нижняя линия или subtle shadow после скролла

### Детали:
- метка в mono:
  `01 / PUBLIC LOG`
- hover на ссылках:
  underline grow / opacity shift / micro x-translation

---

## Блок 2. Hero

Это главный wow-block.

### Композиция:
Слева/по центру:
- маленькая системная метка:
  `EDITORIAL NOTESET / 2026`
- большой H1:
  **JOURNAL**
  или  
  **SYSTEMS / NOTES / PROCESS**
- подзаголовок:
  2–3 строки о том, что это блог про инженерное мышление, дизайн-системы, workflow, shipping
- 2 CTA:
  `Read latest`
  `View portfolio`

Справа или фоном:
- abstract visual panel
- мягкие grid-lines
- subtle motion mesh / radial halo
- либо большой featured image panel

### Важно:
Hero должен быть:
- мощным
- но не мешать дальше читать посты

### Что я рекомендую:
Не делать гигантскую пустую заставку на 100vh без смысла.  
Лучше:
- `min-height: 70–85vh`
- в нижней части hero уже виден начало feed/grid

---

## Блок 3. Featured Post

### Почему нужен:
Это instantly повышает ощущение “издания”, а не просто списка карточек.

### Вид:
Одна большая карточка:
- cover image / visual
- category
- big title
- 2–3 строки excerpt
- дата / reading time
- arrow CTA

### Layout:
- desktop: 8/4 или 7/5
- mobile: stacked

### Поведение:
- hover: image scale 1.02, border brightens, arrow slides
- whole card clickable

---

## Блок 4. Filter / Topics row
Если не хочешь перегружать — можно без реальных фильтров на старте, но визуально это сильно.

### Пример:
- All
- Engineering
- Frontend
- Design Systems
- Motion
- AI Workflow
- Process

### Стиль:
- pill buttons
- dark surface
- active = accent border / accent text

---

## Блок 5. Posts Grid / Editorial Feed

Это основной контентный блок.

### Вариант, который я рекомендую:
Не masonry.  
А **structured editorial grid**.

### Почему не masonry:
- красиво на пинтересте
- хуже сканируется
- ломает ритм заголовков
- выглядит менее собранно

### Лучше:
Сетка 2 колонки на desktop:
- большие карточки чередуются с компактными
- есть ритм, но не хаос

### Карточка поста должна содержать:
- category / type
- title
- excerpt
- date
- reading time
- optional thumbnail

### Варианты карточек:
#### A. Large card
- image
- большой title
- excerpt
- meta
- для featured / важных постов

#### B. Medium card
- заголовок + excerpt + meta
- image optional

#### C. Text-only card
- полезно для editorial rhythm
- иногда без изображения, чтобы сетка дышала

### Важно:
Не все карточки должны быть одинаковыми.  
Но и не делаем цирк из 9 уникальных форматов.  
Нужно **3 четких варианта карточки максимум**.

---

## Блок 6. Footer
Не дефолтный футер.  
А спокойный финальный системный блок.

### Состав:
- logo / journal name
- почта
- ссылка на портфолио
- GitHub
- Telegram
- короткая фраза типа:
  `Built with Next.js / Supabase / shipped by Sergey Kraskovsky`

---

# 7.2. Страница поста

Это самая важная часть по UX.

---

## Общая цель
Надо сделать так, чтобы:
- заголовок бил по глазам красиво
- сама статья читалась легко
- код, картинки, цитаты выглядели дорого
- была ощущаемая editorial-структура

---

## Структура страницы поста

### Блок 1. Post Header
Содержит:
- category
- title
- excerpt
- date
- reading time
- author
- optional cover image

### Композиция:
#### Вариант A — лучший:
- meta сверху
- giant title
- excerpt ниже
- под ним wide cover image

#### Вариант B:
- split-layout
- слева текст, справа image

Для блога я бы взял **A**, потому что он чище и сильнее.

---

## Блок 2. Sticky Reading Progress
Тонкая линия вверху страницы:
- заполняется по мере чтения
- accent color очень дозированно
- это мелочь, но ощущается “дорого”

---

## Блок 3. Article Body
### Ширина:
- максимум `720–760px`

### Почему:
Чтобы не превращать статью в теннисный матч для глаз.

### Ритм:
- body 18px
- line-height 1.75
- хорошие отступы между абзацами
- длинные статьи должны дышать

### Стили внутри:
#### H2/H3
- крупные, с сильным отступом сверху
- могут иметь micro-label перед собой

#### Paragraph
- без слишком серого текста
- идеальный contrast

#### Lists
- четкие маркеры
- хорошие отступы
- не слипшиеся

#### Quote blocks
- крупнее body
- accent line слева
- мягкий surface bg

#### Code blocks
- темнее фона статьи
- border
- моноширинный шрифт
- горизонтальный scroll при необходимости
- copy button

#### Images
- wide
- radius 18–24px
- optional caption в mono/small
- spacing вокруг большой

#### Tables
- только если нужны, но красиво:
  border rows, muted headers, fixed spacing

---

## Блок 4. Side Rail / TOC
На desktop можно сделать справа:
- table of contents
- active section highlight
- back to top
- maybe share/copy link

### Но:
Если времени мало — TOC optional.  
Если делаем, то **очень спокойно**, не перегружаем.

---

## Блок 5. Bottom Navigation
После статьи:
- `Previous note`
- `Next note`
- `Back to journal`

### Вид:
2 карточки навигации + 1 текстовая ссылка назад

---

## Блок 6. End CTA
Финал:
- `If this resonates — visit portfolio / contact me`
- без инфоцыганства
- просто аккуратный переход в основное портфолио

---

# 7.3. 404 Page

Даже 404 должна быть стильной.

### Идея:
- giant `404`
- подпись:
  `Signal lost`
  или  
  `This note does not exist`
- кнопка:
  `Back to journal`

### Визуально:
- не clown page
- не мем
- а технично и красиво

---

# 8. ДИЗАЙН АДМИНКИ

Вот тут важный момент.

## Правило:
**Публичная часть = magazine / object / showcase**  
**Админка = control room / operator UI**

То есть админка должна быть:
- брендовой
- красивой
- чистой
- функциональной
- заметно менее “артовой”, чем публичная часть

---

# 8.1. Страница логина

### Композиция:
- центрированный panel card
- темный фон
- слева/сзади subtle grid/glow
- заголовок:
  `Secure access`
- подзаголовок:
  `Admin panel for publishing notes`

### Поля:
- email
- password
- login button

### UX:
- ошибки — четко
- фокус — красиво
- без лишней анимации

---

# 8.2. Dashboard

### Layout:
- верхняя панель
- список постов
- кнопка `New post`
- search bar optional
- filters: `All / Draft / Published`

### Стиль:
- похоже на premium CMS
- темные ряды
- тонкие бордеры
- хороший spacing
- статусы через цветные точки:
  - orange / white / muted

### Каждая строка поста:
- title
- slug
- status
- updated_at
- actions

### Hover:
- row highlight
- action icons плавно проявляются

---

# 8.3. Editor / Create Post

Это must-have wow-часть админки.

## Рекомендуемая структура:
### Split layout:
#### Левая/основная часть:
- title input
- excerpt
- editor content

#### Правая колонка:
- slug
- status toggle
- cover upload
- publish controls
- preview link

---

## Editor UX
Редактор должен выглядеть как инструмент, а не как textarea.

### Желательно:
- toolbar сверху
- headings
- bold/italic
- quote
- code
- image
- bullet/ordered list
- divider

### Очень сильный ход:
Сделать переключатель:
- `Edit`
- `Preview`
- `Split`

Если успеешь — это прям вкусно для работодателя.

---

## Publish Panel
Справа sticky box:
- status: draft / published
- slug
- cover image
- save draft
- publish
- delete

### Важно:
Все действия понятны и крупны.  
Никакой каши.

---

# 9. ДИЗАЙН-СИСТЕМА КОМПОНЕНТОВ

Нужен единый язык компонентов.

---

## 9.1. Header
- прозрачный / sticky
- thin border bottom on scroll
- логотип + nav
- минимализм

## 9.2. Section label
- mono
- uppercase
- tracking
- muted
- пример:
  `02 / LATEST NOTES`

## 9.3. Post card
3 варианта:
- featured
- standard
- compact

## 9.4. Button
3 варианта:
- primary
- secondary
- text-link

## 9.5. Tag / Category chip
- rounded pill
- muted border
- hover state
- active state with accent

## 9.6. Info row
- date
- reading time
- author
- views
в mono / muted / uppercase

## 9.7. Input
единый стиль для:
- text
- textarea
- upload
- select

## 9.8. Modal
Для delete confirm:
- dark panel
- clear hierarchy
- destructive button аккуратно выделен

## 9.9. Toast
Уведомления:
- saved
- published
- deleted
- upload failed

## 9.10. Divider / rule
Очень важная штука для editorial style:
- thin line
- часто с label
- помогает секции чувствоваться как макет журнала

---

# 10. MOTION SYSTEM

Вот тут можно очень сильно выиграть.  
Но надо не заиграться.

---

## 10.1. Общий характер анимации
- smooth
- restrained
- premium
- low amplitude
- no bouncy circus

### Основной easing:
- мягкий, кинематографичный
- без “elastic”
- без spring overload

---

## 10.2. Page load
### Главная:
- hero text появляется по строкам
- метки fade up
- featured card проявляется с delay
- посты ниже stagger reveal

### Пост:
- title / meta softly reveal
- cover image fade + slight scale

---

## 10.3. Scroll interactions
- reveal sections на 6–12px
- subtle opacity/translate
- active progress bar
- TOC active section

---

## 10.4. Hover interactions
### На карточках:
- image scale 1.02
- border brighten
- title немного сдвигается
- arrow плавно уходит вправо

### На кнопках:
- фон/бордер слегка меняются
- никакого резкого flashy effect

---

## 10.5. Cursor
Можно сделать кастомный курсор **только на публичной части** и только на desktop.

### Но:
Очень осторожно.

#### Если делаем:
- маленькое кольцо / dot
- липнет к ссылкам
- не мешает
- отключается на:
  - mobile
  - form fields
  - editor
  - admin

#### Если нет времени сделать идеально:
**лучше не делать вообще.**

---

## 10.6. Reduced Motion
Обязательно:
- если пользователь предпочитает reduced motion — почти всё отключаем

Это мелочь, но сеньоры это замечают.

---

# 11. АДАПТИВ

И вот тут я тебе еще раз как старший бро скажу:
**никакого “ну мобилка базовая”.**  
Делаем красиво.

---

## 11.1. Mobile behavior
### Навигация:
- компактный header
- burger
- full-screen sheet menu или clean overlay panel

### Hero:
- не пытаемся сохранить desktop-сцену
- типографика уменьшается
- всё становится вертикальным
- сохраняется мощь за счет ритма и spacing

### Feed:
- одна колонка
- карточки чуть проще
- featured по-прежнему first

### Пост:
- текст 16–18px
- хороший line-height
- изображения full-width
- progress bar остается
- TOC можно убрать

---

## 11.2. Tablet behavior
- 2 колонки там, где возможно
- hero может быть split
- admin editor уже может иметь side panel

---

# 12. UX-ОГРАНИЧЕНИЯ, КОТОРЫЕ МЫ НЕ НАРУШАЕМ

Это очень важно. Вот что нельзя ломать ради красоты:

### Нельзя:
- body text меньше 16px
- светло-серый текст на черном с низким контрастом
- слишком длинная строка текста
- 4 разных радиуса на одном экране
- 5 разных типов теней
- декоративные элементы поверх контента
- неудобные hover-only паттерны
- непонятные кнопки ради “минимализма”
- супердизайнерские формы input без нормального focus state

### Нужно:
- контраст
- читаемые абзацы
- понятная навигация
- стабильная система spacing
- узнаваемые interactive states
- логика первична, декор вторичен

---

# 13. ЧТО СДЕЛАЕТ ПРОЕКТ ОСОБЕННО СИЛЬНЫМ

Если хочешь прям “HR/арт-дир сел и прифигел”, вот что даст максимальный эффект:

## Топ-эффекты по отдаче:
1. **Очень сильный hero**
2. **Офигенная типографика**
3. **Плавный premium scroll**
4. **Качественные карточки постов**
5. **Редактор в админке с preview**
6. **Страница поста с идеальным reading UX**
7. **Единая дизайн-система**
8. **Хорошие loading/empty/error states**
9. **OG image генерация для постов**
10. **Супераккуратный mobile**

---

# 14. ЧТО Я РЕКОМЕНДУЮ КАК ФИНАЛЬНОЕ ВИЗУАЛЬНОЕ НАПРАВЛЕНИЕ

## Финальный ответ:
**Да, мы работаем в стиле Dark Modern / Editorial Tech.**

### Но в адаптированной форме:
**не “дрибббл-постер”, а “premium editorial product”.**

---

# 15. КОНКРЕТНЫЙ ФИНАЛЬНЫЙ ВИЗУАЛЬНЫЙ РЕЦЕПТ

## Публичная часть:
- тёмный layered фон
- subtle grain
- большие заголовки
- много воздуха
- тонкие линии и секционные labels
- 1 теплый оранжевый акцент
- premium карточки
- сильный featured post
- article page с excellent readability

## Админка:
- dark control panel
- меньше декора
- больше utility
- такой же бренд-язык
- editor как серьезный publishing tool

---

# 16. ДИЗАЙН-СПЕЦИФИКАЦИЯ В ОДНУ ФРАЗУ

> **A dark editorial journal with control-room aesthetics: bold typography, restrained motion, premium surfaces, system-level detail, and real reading comfort.**

---

# 17. МОЙ ЖЕСТКИЙ ВЕРДИКТ КАК СТАРШЕГО БРО

Если делать **точно как на скринах**, будет:
- красиво
- но частично неудобно
- и местами слишком “concept shot”

Если делать **по плану выше**, будет:
- красиво
- цельно
- читаемо
- очень дорого по ощущению
- и главное — **выглядеть как работа человека, который понимает и дизайн, и продукт**

А это уже уровень “не очередной парень с Tailwind, а человек со вкусом и системой”.

---