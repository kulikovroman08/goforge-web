# Каталог GoForge Gym: интервью и production Go

Основные источники тематик:

- [yakomisar/golang-questions](https://github.com/yakomisar/golang-questions/blob/main/README.md) — общие вопросы, slices, maps, указатели, goroutines/channels, строки; есть разборы GC, pprof, GOGC, middleware.
- [goavengers/go-interview](https://github.com/goavengers/go-interview) — Go, сети, HTTP, микросервисы, паттерны, БД и кэширование, CI/CD, задачи на каналы и worker pools.

Это **карта тем**, а не перепечатка содержимого источников. Мы сохраняем ссылки на полные материалы и пишем самостоятельные подробные уроки, проверяя технические особенности для актуальных версий Go.

## Работающие подтемы (12 тестов и песочница на каждую)

| Группа | Подтема | Упражнение |
|---|---|---|
| Go Core | Срезы и map, дедупликация | UniqueUsers |
| Go Core | Срезы, copy/append/aliasing | Active |
| Go Core | error, %w, Is/As | WithContext |
| Go Core | Интерфейсы, typed nil и method sets | MaybeError |
| Go Core | Указатели, передача аргументов и безопасная мутация | UpdateEventStatus |
| Go Core | Структуры, методы и pointer receiver | ChatActivity.ApplyMessage |
| Go Core | defer, errors.Join и закрытие ресурсов | CloseWithError |
| Go Core | Maps: подсчёт и правила обращения | CountStatuses |
| Go Core | Строки: Unicode, UTF-8, rune и byte | TruncateRunes |
| Runtime | Удержание backing array и независимое копирование | DetachedPrefix |
| Runtime | Аллокации, строки, strings.Builder и benchmark | BuildLogLine |
| Backend | JSON, io.Reader и валидация HTTP | DecodeEvent |
| Backend | offset/cursor pagination | Page |
| Backend | context, retry и идемпотентность | Retry |
| Backend | Table-driven tests и валидация CreateEventRequest | ValidateCreateEvent |
| Backend | Повторная доставка Kafka и идемпотентность | EventProcessor.Apply |
| Backend | gRPC-коды и отображение доменных ошибок | MapServiceError |
| Backend | PostgreSQL cursor pagination | BuildEventsPageQuery |
| Backend | Kafka: порядок обработки и commit offset | HandleAndCommit |
| Concurrency | goroutines, mutex, data race | Counter |
| Concurrency | Channels: fan-in и отмена через context | MergeInts |
| Concurrency | Ограниченный worker pool и fail-fast | ProcessJobs |
| Concurrency | select, context cancellation и закрытые каналы | WaitMessage |
| Backend | HTTP handler и тестирование httptest | HealthHandler |
| Backend | HTTP middleware, Request ID и валидация | RequestIDMiddleware |

У каждой из 25 готовых подтем есть 6 развёрнутых разделов собственной теории, 12 вопросов с объяснением, рабочая Go-заготовка и локальные Go-тесты. Исходный каталог сохраняет ранее созданные задачи, а новая теория содержит ссылки на источники.

## Полная карта дальнейшего наполнения

### 1. Go Core

- Типы данных, константы, преобразования, переполнение и указатели
- Массивы, slices, len/cap, append, copy, aliasing и удержание памяти
- Maps: nil map, проверка ключа, обход, удаление, коллизии и современные детали реализации
- Строки: bytes, runes, UTF-8, преобразования, сборка строк и безопасность ввода
- Структуры, методы, receiver, встраивание, выравнивание
- Интерфейсы, method sets, typed nil, динамический тип
- Ошибки, %w, Is/As, Join, panic, defer, recover
- Generics, ограничения типов и reflection

### 2. Runtime, память и конкурентность

- Stack/heap, escape analysis, allocator
- Garbage collector: триггеры, GOGC, GOMEMLIMIT и конкурирующая маркировка
- pprof, метрики, бенчмарки, анализ аллокаций
- Goroutine lifecycle, GMP, work stealing, preemption, netpoller
- Unbuffered/buffered channels, select, closed/nil channels, directional channels
- Context cancellation, deadlines, неутекающие горутины
- Mutex/RWMutex, atomics, memory model, race detector
- Worker pool, fan-in/fan-out, backpressure, graceful shutdown

### 3. Backend и инженерные системы

- HTTP/HTTPS, TLS, TCP/UDP, proxy, middleware и router
- gRPC/Protobuf, validation, error codes, interceptors, streaming
- API pagination, идемпотентность, retry, rate limit
- SQL, индексы, транзакции, блокировки, EXPLAIN и медленные запросы
- PostgreSQL MVCC, WAL, VACUUM, connection pooling, replication
- Kafka: offset, consumer groups, delivery semantics, retry и дедупликация
- Кэширование, TTL, инвалидация, Redis
- Микросервисы, consistency, распределённые паттерны, observability
- Тестирование, CI/CD, Kubernetes, эксплуатация и диагностика

**Статус:** перечисленные разделы карты ещё не все превращены в интерактивные уроки. Мы не показываем пустые уроки как готовые; готовность появляется только после написания глубокой теории, 10–15 уникальных вопросов и практической задачи с тестами.

## Принцип проверки

Каждая готовая подтема должна иметь 10–15 **самостоятельных** вопросов, проверяющих механизм, предсказание поведения кода, граничные случаи и применение в production. Порядок вариантов ответа перемешивается. Показатели собеседований не выдумываем: публичная подборка вопросов не является репрезентативной статистикой реальных наймов.

<!-- Documentation-only commit to request a fresh CI and GitHub Pages deployment after the November 2026 Actions queue incident. -->

## Сопоставление с упражнениями golings

Ссылка «Практика Go в браузере» у каждой kata теперь открывает конкретное упражнение через `https://golings.madhan.app/catalog/?exercise=<slug>`. Эта возможность подтверждена кодом оригинального сайта golings (`web/src/pages/catalog.astro`). Упражнения тематически совпадают с задачами GoForge, но **не являются их копиями** и могут проверять другой контракт. Из браузерной карточки golings можно перейти в Go Playground через кнопку Play.

## Проверенные в этой итерации источники практики

- [go-kata: Worker Pool with Backpressure](https://github.com/MedUnes/go-kata/tree/master/01-context-cancellation-concurrency/10-worker-pool-errors-join)
- [go-kata: Cleanup Chain](https://github.com/MedUnes/go-kata/tree/master/04-errors-semantics/19-defer-cleanup-chain)
- [go-kata: Middleware Chain](https://github.com/MedUnes/go-kata/tree/master/03-http-middleware/06-interface-based-middleware-chain)
- [goavengers: популярные live coding задачи](https://github.com/goavengers/go-interview/tree/master/docs/popular_tasks)

Тексты и Go-тесты GoForge авторские, а не копии исходных задач. Остальные темы карты пока не реализованы.

## Важные ограничения

`EventProcessor` использует in-memory карту и mutex только как учебную модель повторной доставки. Для защиты после перезапуска сервиса нужна устойчивая транзакционная запись о обработанном ID. В `DetachedPrefix` мы тренируем самостоятельное владение байтами; это не универсальная оптимизация, потому что копирование тоже расходует память и CPU.

## Backend и Runtime: новые тренировки

Выполнимые задачи `MapServiceError`, `BuildEventsPageQuery`, `HandleAndCommit`, `BuildLogLine` дополняют теорию и 12 проверяемых вопросов на каждую подтему. Первое и третье упражнения **моделируют** правила gRPC и Kafka на уровне чистого Go без интеграционного сервера; они не заменяют тесты с реальными grpc-go, PostgreSQL и Kafka. Для продуктивной системы нужно отдельно реализовать инфраструктурную интеграцию, обработку ребаланса, транзакции и корректную работу с page token.
