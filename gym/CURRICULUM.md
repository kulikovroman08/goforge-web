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
| Backend | JSON, io.Reader и валидация HTTP | DecodeEvent |
| Backend | offset/cursor pagination | Page |
| Backend | context, retry и идемпотентность | Retry |
| Concurrency | goroutines, mutex, data race | Counter |

У каждой из этих подтем есть 6 развёрнутых разделов собственной теории, 12 вопросов с объяснением, рабочая Go-заготовка и локальные Go-тесты. Исходный каталог сохраняет ранее созданные задачи, а новая теория содержит ссылки на источники.

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
