# GoForge Gym 2.0

Мобильный и десктопный тренажёр **Go backend**, ориентированный на регулярную практику, инженерное мышление и подготовку к интервью.

**Сайт:** https://kulikovroman08.github.io/goforge-web/

## Новый цикл

1. **Теория** — развёрнутые уроки по темам и подтемам (6 разделов на каждую готовую подтему): понятные примеры, устройство Go, поведение в production и ссылки на источники.
2. **Тесты** — 12 проверяемых вопросов на каждую из 30 готовых подтем (360 всего) с перемешанными вариантами и объяснениями.
3. **Песочница** — собственноручно писать код, открывать подсказки по одной, проверять реальные тест-кейсы.
4. **Повторение** — заново решить задачу без подсказок.

**Режимы:** 10, 20 или 30 минут в день. Сначала упор на самостоятельность и повторение, потом увеличение сложности.

### Запуск на компьютере

Для настоящей проверки кода нужен установленный Go:

```bash
git clone https://github.com/kulikovroman08/goforge-web.git
cd goforge-web/gym/practice
go test ./...
go test -run '^TestUniqueUsers$' -v
go test -race -run '^TestCounter$' -v
```

В `kata.go` находятся намеренно незавершённые реализации и один конкурентный баг. Тесты **должны падать**, пока ты не исправишь код. Редактируй функции, снова запускай тесты, затем решай с нуля.

`go test -race` нужен в первую очередь для задач конкурентности. Go в браузере **пока не запускается автоматически**: GitHub Pages размещает статический сайт и не является сервером безопасного выполнения пользовательского кода.

### Телефон Android

Открой сайт в Chrome → «Добавить на главный экран». Изучай теорию, решай тесты и пиши черновики в редакторе (сохраняются только локально на устройстве). Для отдельного реального запуска Go с телефона используй [golings Catalog](https://golings.madhan.app/catalog/), где многие задания запускаются через Go Playground. Не все инструменты (например, race detector) доступны онлайн.

### Старая версия

Предыдущий Deep Go MVP сохранён по адресу https://kulikovroman08.github.io/goforge-web/?legacy=1. Данные старой версии не удаляются. Gym хранит прогресс в отдельном ключе localStorage, синхронизации ПК ↔ Android пока нет.

Полная карта тем и текущее покрытие: [gym/CURRICULUM.md](gym/CURRICULUM.md).

## Источники и подборка интервью

Оригинальные учебные задания GoForge созданы для собственного тренажёра; тексты и решения чужих упражнений не копируются. Полезные ориентиры:
- [yakomisar/golang-questions](https://github.com/yakomisar/golang-questions/blob/main/README.md) — русскоязычная структура Go-интервью: slices, maps, pointers, goroutines, strings, GC, profiling
- [goavengers/go-interview](https://github.com/goavengers/go-interview) — Go, backend, сети, БД, микросервисы и практические задачи
- [MedUnes/go-kata](https://github.com/MedUnes/go-kata) — регулярные backend-kata, concurrency, ошибки, тесты, HTTP
- [exercism/go](https://github.com/exercism/go) — прогрессивные задачи и проверка тестами
- [golings](https://golings.madhan.app/catalog/) — исправление Go-кода, браузерные упражнения
- [justxor/sobesrazborgoogle](https://github.com/justxor/sobesrazborgoogle) — русскоязычная подборка 2026: Go, конкурентность, runtime, live coding и backend
- [goavengers/go-interview](https://github.com/goavengers/go-interview) — фундаментальные вопросы Go и backend, включая типичные задачи с каналами и worker pool
- [Devinterview-io/golang-interview-questions](https://github.com/Devinterview-io/golang-interview-questions) — публичные вопросы, репозиторий позиционируется как подборка 2026 года
- [golang-design/go-questions](https://github.com/golang-design/go-questions) — большая коллекция вопросов по устройству Go

Метка «2026» не означает, что каждый вопрос подтверждён как заданный на реальном интервью в 2026 году. Приоритет определяется фундаментальностью Go, практической полезностью и повторяемостью темы в открытых подборках.

## План развития

- Реальные Go-тесты для всех задач и удобная синхронизация редактора с локальным кодом.
- Продвинутые backend-модули: PostgreSQL, Kafka, gRPC, WebSockets, контекст, профилирование и производственные баги.
- Онлайн-песочница для мобильного выполнения Go с изоляцией и лимитами.
- Отдельный AI-интервьюер (не входит в этот MVP).

Безопасность: никогда не вставляй в публичный тренажёр секреты, токены или код работодателя.

## Новое: тематическая практика golings

Вместо общей ссылки на каталог у каждой из 12 kata отображается подходящее упражнение golings. Ссылка вида `https://golings.madhan.app/catalog/?exercise=concpat2` открывает **конкретное** упражнение в каталоге; оттуда можно перейти в браузерный Go Playground. Соответствие тематическое, не предполагает одинаковых контрактов и тестов GoForge и golings.

Новые готовые разделы: подсчёт по map, безопасное ограничение UTF-8 строк по rune, fan-in нескольких каналов с отменой, HTTP handler с `httptest`.

## Дополнительный блок Middle/Middle+ (5 новых kata)

- **UpdateEventStatus:** передача указателя, nil, валидация перед мутацией.
- **ChatActivity.ApplyMessage:** struct, pointer receiver, метод и инварианты.
- **CloseWithError:** defer, LIFO и сохранение причин через errors.Join.
- **ProcessJobs:** ограниченный worker pool с context, остановкой по ошибке, безопасной синхронизацией и ожиданием горутин.
- **RequestIDMiddleware:** проверка X-Request-ID, HTTP 400, корректная передача управления next и httptest.

Всего **30 подтем, 360 проверяемых вопросов и 30 Go-заготовок**. Браузерный редактор пока сохраняет код, но не исполняет Go; реальные проверки выполняются локально через `gym/practice`.

## Новые упражнения (select, тесты, память, идемпотентность)

- `WaitMessage` — `select`, `ctx.Done()`, закрытый канал, deadline.
- `ValidateCreateEvent` — валидация обязательных полей и table-driven tests.
- `DetachedPrefix` — копирование среза без удержания исходного backing array.
- `EventProcessor` — потокобезопасная учебная идемпотентность при повторной доставке события. **Не устойчив к рестарту**; для production потребуется БД и атомарная транзакция.

Ссылка golings ведёт на конкретную карточку браузерного упражнения в той же области. Задания golings и GoForge независимы и имеют разные тесты.

## Новые backend и runtime kata

- `MapServiceError`: безопасное отображение доменных причин в **учебные** gRPC-категории. Для настоящего gRPC требуются `grpc-go/status` и `codes`.
- `BuildEventsPageQuery`: параметризованный PostgreSQL SQL с составным курсором `(created_at,id)`, фильтром tenant и лимитом.
- `HandleAndCommit`: учебная последовательность обработки Kafka-сообщения и commit offset (не реальный клиент).
- `BuildLogLine`: `strings.Builder`, корректное объединение строк и benchmark с `-benchmem`.

В браузере Go-код по-прежнему не компилируется; реальные Go-тесты и benchmark запускаются локально.

## Go Runtime, Generics, Channels и транзакции (5 дополнительных тренировок)

- `UniqueValues[T comparable]`: generic-дедупликация с тестами для нескольких типов.
- `EvictExpired`: очистка map-кеша по TTL; объяснение GC reachability, GOGC и GOMEMLIMIT.
- `RunLimited`: ограничение конкурентного fan-out, контекст и ошибки; отдельная теория GMP.
- `SquarePipeline`: конвейер каналов с отменой, backpressure и корректным закрытием.
- `WithinTx`: учебный lifecycle транзакции BeginTx → work → Commit/Rollback с fake-зависимостью.

Эти задачи не запускают настоящий планировщик Go как отдельный сервис и не проверяют PostgreSQL MVCC на реальной БД; это отдельные последующие интеграционные занятия.
