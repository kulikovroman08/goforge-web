window.GOFORGE_GUIDES = {
  "dedupe": {
    "example": [
      "101",
      "202",
      "101",
      "303",
      "202"
    ],
    "steps": [
      [
        "Запомнить встреченные ID",
        "seen := make(map[string]bool)",
        "Ключ — ID. Значение true означает, что его уже обработали."
      ],
      [
        "Подготовить результат",
        "result := make([]string, 0)",
        "Пустой срез будет сохранять порядок."
      ],
      [
        "Перебрать вход",
        "for _, id := range ids {",
        "Индекс не нужен, поэтому _."
      ],
      [
        "Пропустить повтор",
        "    if seen[id] { continue }",
        "continue переходит к следующей итерации."
      ],
      [
        "Запомнить новый ID",
        "    seen[id] = true\n    result = append(result, id)\n}",
        "Отмечаем ID и добавляем его в результат."
      ],
      [
        "Вернуть результат",
        "return result",
        "Возвращаем список после завершения цикла."
      ]
    ],
    "order": [
      2,
      4,
      1,
      3,
      0
    ],
    "blocks": [
      "Вернуть результат",
      "Проверить повтор",
      "Создать map и результат",
      "Запомнить новый ID и добавить его",
      "Перебрать вход"
    ],
    "blanks": [
      {
        "before": "if seen[id] { ",
        "after": " }",
        "options": [
          "break",
          "continue",
          "return nil"
        ],
        "correct": 1,
        "explain": "continue пропускает текущий ID, не заканчивая цикл."
      },
      {
        "before": "seen[id] = ",
        "after": "",
        "options": [
          "false",
          "nil",
          "true"
        ],
        "correct": 2,
        "explain": "true отмечает ID как встреченный."
      },
      {
        "before": "result = ",
        "after": "",
        "options": [
          "append(result, id)",
          "append(ids, id)",
          "result[:0]"
        ],
        "correct": 0,
        "explain": "Добавляем именно в результат."
      }
    ],
    "hints": [
      "Храни информацию о встреченных ID.",
      "Используй map[string]bool и []string.",
      "Перебери вход, пропусти повтор, запомни новый ID и добавь его.",
      "Создай seen и result до цикла. В цикле проверяй seen[id].",
      "seen := make(map[string]bool)\nresult := make([]string, 0)\nfor _, id := range ids {\n    // продолжи самостоятельно\n}"
    ],
    "partial": "package practice\n\nfunc UniqueUsers(ids []string) []string {\n    seen := make(map[string]bool)\n    result := make([]string, 0)\n    for _, id := range ids {\n        // TODO: пропусти уже встреченный ID\n        seen[id] = true\n        result = append(result, id)\n    }\n    return result\n}\n",
    "bug": "package practice\n\nfunc UniqueUsers(ids []string) []string {\n    seen := make(map[string]bool)\n    result := make([]string, 0)\n    for _, id := range ids {\n        if seen[id] { break }\n        seen[id] = true\n        result = append(result, id)\n    }\n    return result\n}\n"
  },
  "filter": {
    "frames": [
      [
        "Исходные данные",
        [
          "A: active",
          "B: cancelled",
          "C: active"
        ],
        "result = []",
        "Нужно сохранить только активные события, в исходном порядке."
      ],
      [
        "Смотрим A",
        [
          "A: active",
          "B: cancelled",
          "C: active"
        ],
        "result = [A]",
        "Статус active подходит — добавляем A."
      ],
      [
        "Смотрим B",
        [
          "A: active",
          "B: cancelled",
          "C: active"
        ],
        "result = [A]",
        "Статус не подходит — ничего не добавляем."
      ],
      [
        "Смотрим C",
        [
          "A: active",
          "B: cancelled",
          "C: active"
        ],
        "result = [A, C]",
        "Добавляем C. Входной список остаётся неизменным."
      ]
    ],
    "steps": [
      [
        "Создать пустой результат",
        "out := make([]Event, 0, len(events))",
        "Длина ноль: пока ничего не нашли. Ёмкость резервирует место."
      ],
      [
        "Перебрать события",
        "for _, ev := range events {",
        "ev — очередное событие, индекс не нужен."
      ],
      [
        "Проверить статус",
        "    if ev.Status == \"active\" {",
        "Двойное равенство сравнивает значения."
      ],
      [
        "Добавить подходящее событие",
        "        out = append(out, ev)\n    }\n}",
        "append возвращает обновлённый срез."
      ],
      [
        "Вернуть результат",
        "return out",
        "Возвращаем после цикла, чтобы обработать все события."
      ]
    ],
    "blocks": [
      "Вернуть результат",
      "Создать пустой результат",
      "Перебрать события",
      "Проверить статус",
      "Добавить подходящее событие"
    ],
    "order": [
      1,
      2,
      3,
      4,
      0
    ],
    "blanks": [
      {
        "before": "out := make([]Event, ",
        "after": " , len(events))",
        "options": [
          "len(events)",
          "0",
          "1"
        ],
        "correct": 1,
        "explain": "Результат начинается с нулевой длины."
      },
      {
        "before": "if ev.Status ",
        "after": " \"active\" {",
        "options": [
          "=",
          "!=",
          "=="
        ],
        "correct": 2,
        "explain": "Нужно сравнить статус на равенство."
      },
      {
        "before": "out = append(",
        "after": " , ev)",
        "options": [
          "out",
          "events",
          "ev"
        ],
        "correct": 0,
        "explain": "Добавляем в результирующий срез."
      }
    ],
    "partial": "package practice\n\ntype Event struct { ID, Status string }\n\nfunc Active(events []Event) []Event {\n\tout := make([]Event, 0, len(events))\n\tfor _, ev := range events {\n\t\t// TODO: добавь событие, если оно активное\n\t\t_ = ev\n\t}\n\treturn out\n}\n",
    "bug": "package practice\n\ntype Event struct { ID, Status string }\n\nfunc Active(events []Event) []Event {\n\tout := make([]Event, len(events))\n\tfor _, ev := range events { if ev.Status == \"active\" { out = append(out, ev) } }\n\treturn out\n}\n",
    "hints": [
      "Не удаляй элементы из входа.",
      "Понадобится отдельный срез результата.",
      "Пройди events через range.",
      "Сравни ev.Status с active.",
      "out := make([]Event, 0, len(events))\nfor _, ev := range events {\n    // проверка статуса\n}"
    ],
    "related": [
      [
        "dedupe",
        "Удаление дублей"
      ],
      [
        "slice-detach",
        "Независимая копия"
      ]
    ],
    "production": "Фильтрация батча сообщений перед публикацией. Если вход используется для аудита, не перезаписывай его через events[:0].",
    "interview": "Почему make с длиной len(events) создаёт лишние нулевые элементы? Чем фильтрация на месте отличается от отдельного результата?"
  },
  "map-count": {
    "frames": [
      [
        "Начинаем",
        [
          "active",
          "cancelled",
          "active"
        ],
        "counts = {}",
        "Для каждого статуса нужно посчитать количество."
      ],
      [
        "Первый active",
        [
          "active",
          "cancelled",
          "active"
        ],
        "active: 1",
        "Отсутствующий ключ int имеет нулевое значение."
      ],
      [
        "cancelled",
        [
          "active",
          "cancelled",
          "active"
        ],
        "active: 1, cancelled: 1",
        "Добавляем отдельный счётчик."
      ],
      [
        "Второй active",
        [
          "active",
          "cancelled",
          "active"
        ],
        "active: 2, cancelled: 1",
        "Увеличиваем уже существующее значение."
      ]
    ],
    "steps": [
      [
        "Создать счётчики",
        "counts := make(map[string]int)",
        "Ключ — статус, значение — количество."
      ],
      [
        "Перебрать события",
        "for _, ev := range events {",
        "Каждое событие учитываем один раз."
      ],
      [
        "Увеличить счётчик",
        "    counts[ev.Status]++\n}",
        "Для отсутствующего ключа сначала читается 0."
      ],
      [
        "Вернуть map",
        "return counts",
        "Порядок ключей map не гарантирован."
      ]
    ],
    "blocks": [
      "Вернуть map",
      "Создать счётчики",
      "Перебрать события",
      "Увеличить счётчик"
    ],
    "order": [
      1,
      2,
      3,
      0
    ],
    "blanks": [
      {
        "before": "counts := make(map[string]",
        "after": ")",
        "options": [
          "bool",
          "int",
          "string"
        ],
        "correct": 1,
        "explain": "Количество — целое число."
      },
      {
        "before": "counts[",
        "after": "]++",
        "options": [
          "ev.Status",
          "ev.ID",
          "events"
        ],
        "correct": 0,
        "explain": "Группируем по статусу, а не ID."
      },
      {
        "before": "return ",
        "after": "",
        "options": [
          "events",
          "nil",
          "counts"
        ],
        "correct": 2,
        "explain": "Нужны накопленные счётчики."
      }
    ],
    "partial": "package practice\n\nfunc CountStatuses(events []Event) map[string]int {\n\tcounts := make(map[string]int)\n\tfor _, ev := range events {\n\t\t// TODO: увеличь счётчик\n\t\t_ = ev\n\t}\n\treturn counts\n}\n",
    "bug": "package practice\n\nfunc CountStatuses(events []Event) map[string]int {\n\tcounts := make(map[string]int)\n\tfor _, ev := range events { counts[ev.Status] = 1 }\n\treturn counts\n}\n",
    "hints": [
      "Нужны отдельные счётчики для каждого статуса.",
      "map[string]int подходит для группировки.",
      "Пройди события по одному.",
      "Используй статус в качестве ключа.",
      "counts := make(map[string]int)\nfor _, ev := range events {\n    // увеличь значение\n}"
    ],
    "related": [
      [
        "dedupe",
        "Удаление дублей"
      ],
      [
        "filter",
        "Фильтрация"
      ]
    ],
    "production": "Подсчёт статусов сообщений для отчёта. Если map разделяется между горутинами, понадобится синхронизация.",
    "interview": "Почему можно делать counts[key]++ без предварительной проверки ключа? Почему нельзя писать в обычную map одновременно?"
  },
  "pagination": {
    "frames": [
      [
        "Вход",
        [
          "A",
          "B",
          "C",
          "D"
        ],
        "offset = 1, limit = 2",
        "Пропускаем один элемент, берём не больше двух."
      ],
      [
        "Проверяем границы",
        [
          "A",
          "B",
          "C",
          "D"
        ],
        "0 <= offset < 4",
        "Некорректные параметры должны давать пустой результат."
      ],
      [
        "Вычисляем конец",
        [
          "A",
          "B",
          "C",
          "D"
        ],
        "end = 3",
        "Конец не включается в срез."
      ],
      [
        "Результат",
        [
          "B",
          "C"
        ],
        "[B, C]",
        "Копируем выбранный участок в независимый массив."
      ]
    ],
    "steps": [
      [
        "Проверить параметры",
        "if offset < 0 || limit <= 0 || offset >= len(ids) { return []string{} }",
        "Не допускаем отрицательный индекс или выход за границы."
      ],
      [
        "Определить конец списка",
        "end := len(ids)",
        "По умолчанию берём до конца."
      ],
      [
        "Ограничить число элементов",
        "if limit < len(ids)-offset { end = offset + limit }",
        "Сначала сравниваем с остатком, чтобы избежать переполнения."
      ],
      [
        "Вернуть копию страницы",
        "return append([]string{}, ids[offset:end]...)",
        "Копирование исключает изменение исходного массива через результат."
      ]
    ],
    "blocks": [
      "Вернуть копию страницы",
      "Проверить параметры",
      "Определить конец списка",
      "Ограничить число элементов"
    ],
    "order": [
      1,
      2,
      3,
      0
    ],
    "blanks": [
      {
        "before": "if offset ",
        "after": " 0 { return []string{} }",
        "options": [
          "<",
          ">",
          "=="
        ],
        "correct": 0,
        "explain": "Отрицательное смещение невалидно."
      },
      {
        "before": "end := ",
        "after": "",
        "options": [
          "cap(ids)",
          "len(ids)",
          "offset"
        ],
        "correct": 1,
        "explain": "Граница задаётся длиной."
      },
      {
        "before": "ids[offset:",
        "after": "]",
        "options": [
          "limit",
          "end",
          "len(ids)+1"
        ],
        "correct": 1,
        "explain": "Конец — вычисленный индекс, не количество."
      }
    ],
    "partial": "package practice\n\nfunc Page(ids []string, offset, limit int) []string {\n\tif offset < 0 || limit <= 0 || offset >= len(ids) { return []string{} }\n\tend := len(ids)\n\t// TODO: ограничь end с учётом limit\n\treturn append([]string{}, ids[offset:end]...)\n}\n",
    "bug": "package practice\n\nfunc Page(ids []string, offset, limit int) []string {\n\tif offset < 0 || limit <= 0 || offset >= len(ids) { return []string{} }\n\treturn ids[offset:offset+limit]\n}\n",
    "hints": [
      "Определи допустимые границы.",
      "offset — начало, limit — максимум элементов.",
      "Сравни limit с количеством оставшихся элементов.",
      "Не используй offset+limit до проверки.",
      "end := len(ids)\nif limit < len(ids)-offset {\n    // вычисли end\n}"
    ],
    "related": [
      [
        "slice-detach",
        "Копирование"
      ],
      [
        "filter",
        "Фильтрация"
      ]
    ],
    "production": "Пагинация уже загруженного списка. Для больших таблиц лучше выполнять ограничение на стороне базы.",
    "interview": "Почему offset+limit может переполниться? Что произойдёт при выходе за len?"
  },
  "utf8-truncate": {
    "frames": [
      [
        "Строка",
        [
          "А",
          "Б",
          "C"
        ],
        "max = 2",
        "Кириллица занимает несколько байтов в UTF-8."
      ],
      [
        "Первый символ",
        [
          "А",
          "Б",
          "C"
        ],
        "byte index = 0, count = 0",
        "range выдаёт байтовый индекс начала руны."
      ],
      [
        "Второй символ",
        [
          "А",
          "Б",
          "C"
        ],
        "byte index = 2, count = 1",
        "Считаем руны, а не байты."
      ],
      [
        "Третий символ",
        [
          "А",
          "Б",
          "C"
        ],
        "byte index = 4, count = 2 → s[:4]",
        "Возвращаем префикс на корректной границе: АБ."
      ]
    ],
    "steps": [
      [
        "Обработать нулевой лимит",
        "if max <= 0 { return \"\" }",
        "При неположительном лимите результат пуст."
      ],
      [
        "Подготовить счётчик",
        "count := 0",
        "Будем считать пройденные руны."
      ],
      [
        "Перебрать строку",
        "for i := range s {",
        "i — байтовый индекс начала руны."
      ],
      [
        "Остановиться на границе",
        "    if count == max { return s[:i] }\n    count++\n}",
        "Режем только перед очередной руной."
      ],
      [
        "Вернуть исходную строку",
        "return s",
        "Если строка короче лимита, не обрезаем."
      ]
    ],
    "blocks": [
      "Вернуть исходную строку",
      "Обработать нулевой лимит",
      "Подготовить счётчик",
      "Перебрать строку",
      "Остановиться на границе"
    ],
    "order": [
      1,
      2,
      3,
      4,
      0
    ],
    "blanks": [
      {
        "before": "for i := range ",
        "after": " {",
        "options": [
          "s",
          "max",
          "count"
        ],
        "correct": 0,
        "explain": "range по строке выдаёт границы рун."
      },
      {
        "before": "if count == ",
        "after": " { return s[:i] }",
        "options": [
          "i",
          "max",
          "len(s)"
        ],
        "correct": 1,
        "explain": "Сравниваем число рун с лимитом."
      },
      {
        "before": "return s[:",
        "after": "]",
        "options": [
          "max",
          "count",
          "i"
        ],
        "correct": 2,
        "explain": "i — корректный байтовый индекс."
      }
    ],
    "partial": "package practice\n\nfunc TruncateRunes(s string, max int) string {\n\tif max <= 0 { return \"\" }\n\tcount := 0\n\tfor i := range s {\n\t\t// TODO: остановись на границе нужной руны\n\t\t_ = i\n\t\tcount++\n\t}\n\t_ = count\n\treturn s\n}\n",
    "bug": "package practice\n\nfunc TruncateRunes(s string, max int) string {\n\tif max <= 0 { return \"\" }\n\tif max >= len(s) { return s }\n\treturn s[:max]\n}\n",
    "hints": [
      "Байт и руна — разные вещи.",
      "range по строке возвращает байтовые индексы.",
      "Веди отдельный счётчик рун.",
      "Когда count == max, верни s[:i].",
      "count := 0\nfor i := range s {\n    // проверь лимит и увеличь count\n}"
    ],
    "related": [
      [
        "filter",
        "Фильтрация"
      ],
      [
        "pagination",
        "Границы среза"
      ]
    ],
    "production": "Обрезка отображаемого имени. Руны не равны пользовательским графемам: составные emoji требуют отдельного алгоритма.",
    "interview": "Почему len(string) считает байты? Чем rune отличается от графемы?"
  },
  "event-pointer": {
    "frames": [
      [
        "Вход",
        [
          "event → active",
          "status = cancelled"
        ],
        "Есть ссылка на Event",
        "Указатель позволяет менять исходную структуру."
      ],
      [
        "Проверка nil",
        [
          "event → active",
          "status = cancelled"
        ],
        "event != nil",
        "Без объекта запись невозможна."
      ],
      [
        "Проверка значения",
        [
          "active",
          "cancelled"
        ],
        "cancelled разрешён",
        "Проверяем до изменения объекта."
      ],
      [
        "Запись",
        [
          "event → cancelled"
        ],
        "return nil",
        "Вызывающий код видит новый статус."
      ]
    ],
    "steps": [
      [
        "Проверить указатель",
        "if event == nil { return errors.New(\"nil event\") }",
        "Защищаемся от обращения к отсутствующему объекту."
      ],
      [
        "Проверить статус",
        "if status != \"active\" && status != \"cancelled\" { return errors.New(\"invalid status\") }",
        "Ошибка только если оба допустимых варианта не совпали."
      ],
      [
        "Изменить поле",
        "event.Status = status",
        "Go автоматически разыменовывает указатель при доступе к полю."
      ],
      [
        "Вернуть успех",
        "return nil",
        "nil означает отсутствие ошибки."
      ]
    ],
    "blocks": [
      "Вернуть успех",
      "Проверить указатель",
      "Проверить статус",
      "Изменить поле"
    ],
    "order": [
      1,
      2,
      3,
      0
    ],
    "blanks": [
      {
        "before": "if event == ",
        "after": " {",
        "options": [
          "0",
          "nil",
          "false"
        ],
        "correct": 1,
        "explain": "Указатель сравнивается с nil."
      },
      {
        "before": "status != \"active\" ",
        "after": " status != \"cancelled\"",
        "options": [
          "||",
          "&&",
          "+"
        ],
        "correct": 1,
        "explain": "Нужно исключить оба разрешённых значения."
      },
      {
        "before": "event.Status = ",
        "after": "",
        "options": [
          "status",
          "event.ID",
          "nil"
        ],
        "correct": 0,
        "explain": "Записываем проверенный новый статус."
      }
    ],
    "partial": "package practice\n\nfunc UpdateEventStatus(event *Event, status string) error {\n\tif event == nil { return errors.New(\"nil event\") }\n\t// TODO: проверь status перед изменением\n\tevent.Status = status\n\treturn nil\n}\n",
    "bug": "package practice\n\nfunc UpdateEventStatus(event *Event, status string) error {\n\tif event == nil { return errors.New(\"nil event\") }\n\tevent.Status = status\n\tif status != \"active\" && status != \"cancelled\" { return errors.New(\"invalid status\") }\n\treturn nil\n}\n",
    "hints": [
      "Нужно менять исходный объект.",
      "Указатель может быть nil.",
      "Допустимы active и cancelled.",
      "Валидация должна быть до записи.",
      "if event == nil { return errors.New(\"nil event\") }\n// проверь новый статус"
    ],
    "related": [
      [
        "filter",
        "Фильтрация"
      ],
      [
        "map-count",
        "Группировка"
      ]
    ],
    "production": "Валидация команды смены статуса до изменения объекта. При конкурентном доступе нужны отдельные гарантии синхронизации.",
    "interview": "Чем передача структуры по значению отличается от передачи указателя? Почему нельзя менять состояние до валидации?"
  },
  "slice-detach": {
    "frames": [
      [
        "Исходный буфер",
        [
          "1",
          "2",
          "3",
          "4"
        ],
        "n = 2",
        "Нужны первые два байта, но не весь массив."
      ],
      [
        "Ограничиваем n",
        [
          "1",
          "2"
        ],
        "n = min(n, len(data))",
        "Не выходим за длину."
      ],
      [
        "Выделяем отдельно",
        [
          "0",
          "0"
        ],
        "dst = [0, 0]",
        "Новый массив не связан с data."
      ],
      [
        "Копируем",
        [
          "1",
          "2"
        ],
        "dst = [1, 2]",
        "Изменение data[0] больше не меняет dst[0]."
      ]
    ],
    "steps": [
      [
        "Проверить пустой результат",
        "if n <= 0 { return []byte{} }",
        "Неположительное число элементов означает пустой результат."
      ],
      [
        "Ограничить длину",
        "if n > len(data) { n = len(data) }",
        "Не допускаем panic при срезании."
      ],
      [
        "Создать массив результата",
        "dst := make([]byte, n)",
        "Длина n нужна, чтобы copy записал n элементов."
      ],
      [
        "Скопировать байты",
        "copy(dst, data[:n])",
        "copy переносит значения, не ссылку на массив."
      ],
      [
        "Вернуть копию",
        "return dst",
        "Результат владеет отдельным массивом."
      ]
    ],
    "blocks": [
      "Вернуть копию",
      "Проверить пустой результат",
      "Ограничить длину",
      "Создать массив результата",
      "Скопировать байты"
    ],
    "order": [
      1,
      2,
      3,
      4,
      0
    ],
    "blanks": [
      {
        "before": "dst := make([]byte, ",
        "after": ")",
        "options": [
          "0",
          "n",
          "cap(data)"
        ],
        "correct": 1,
        "explain": "copy ограничен длиной получателя."
      },
      {
        "before": "copy(dst, data[:",
        "after": "])",
        "options": [
          "n",
          "cap(data)",
          "0"
        ],
        "correct": 0,
        "explain": "Копируем только нужный префикс."
      },
      {
        "before": "return ",
        "after": "",
        "options": [
          "data[:n]",
          "data",
          "dst"
        ],
        "correct": 2,
        "explain": "Возвращаем независимый массив."
      }
    ],
    "partial": "package practice\n\nfunc DetachedPrefix(data []byte, n int) []byte {\n\tif n <= 0 { return []byte{} }\n\tif n > len(data) { n = len(data) }\n\tdst := make([]byte, n)\n\t// TODO: скопируй префикс в dst\n\treturn dst\n}\n",
    "bug": "package practice\n\nfunc DetachedPrefix(data []byte, n int) []byte {\n\tif n <= 0 { return []byte{} }\n\tif n > len(data) { n = len(data) }\n\treturn data[:n]\n}\n",
    "hints": [
      "Не возвращай просто окно в исходный массив.",
      "Проверь n и ограничь длиной data.",
      "Выдели отдельный []byte.",
      "copy переносит минимум из двух длин.",
      "dst := make([]byte, n)\n// скопируй data[:n]"
    ],
    "related": [
      [
        "pagination",
        "Пагинация"
      ],
      [
        "filter",
        "Фильтрация"
      ]
    ],
    "production": "Кэширование короткого префикса большого буфера. Отдельная копия позволяет GC освободить исходный массив, если других ссылок нет.",
    "interview": "Почему уменьшение cap не освобождает backing array? Как проверить независимость тестом?"
  },
  "event-validation": {
    "frames": [
      [
        "Вход",
        [
          "Title: пробелы",
          "OwnerID: 42"
        ],
        "req не меняем",
        "Проверяем обязательные поля."
      ],
      [
        "Убираем пробелы для проверки",
        [
          "Title: пусто",
          "OwnerID: 42"
        ],
        "TrimSpace(Title) == \"\"",
        "Пробелы не считаются значением."
      ],
      [
        "Возвращаем ошибку",
        [
          "title required"
        ],
        "return error",
        "Не продолжаем обработку невалидного запроса."
      ],
      [
        "Валидный пример",
        [
          "Title: встреча",
          "OwnerID: 42"
        ],
        "return nil",
        "Оба поля заполнены."
      ]
    ],
    "steps": [
      [
        "Проверить название",
        "if strings.TrimSpace(req.Title) == \"\" { return errors.New(\"title required\") }",
        "TrimSpace возвращает строку без крайних пробельных символов."
      ],
      [
        "Проверить владельца",
        "if strings.TrimSpace(req.OwnerID) == \"\" { return errors.New(\"owner required\") }",
        "Второе обязательное поле проверяется отдельно."
      ],
      [
        "Вернуть успех",
        "return nil",
        "Все условия выполнены."
      ]
    ],
    "blocks": [
      "Вернуть успех",
      "Проверить название",
      "Проверить владельца"
    ],
    "order": [
      1,
      2,
      0
    ],
    "blanks": [
      {
        "before": "strings.",
        "after": "(req.Title)",
        "options": [
          "Split",
          "TrimSpace",
          "Join"
        ],
        "correct": 1,
        "explain": "Нужно убрать пробелы по краям."
      },
      {
        "before": "if strings.TrimSpace(req.OwnerID) ",
        "after": " \"\" {",
        "options": [
          "!=",
          "=",
          "=="
        ],
        "correct": 2,
        "explain": "Ошибка при пустом значении."
      },
      {
        "before": "return ",
        "after": "",
        "options": [
          "nil",
          "req",
          "true"
        ],
        "correct": 0,
        "explain": "Функция возвращает error."
      }
    ],
    "partial": "package practice\n\nfunc ValidateCreateEvent(req CreateEventRequest) error {\n\tif strings.TrimSpace(req.Title) == \"\" { return errors.New(\"title required\") }\n\t// TODO: проверь OwnerID\n\treturn nil\n}\n",
    "bug": "package practice\n\nfunc ValidateCreateEvent(req CreateEventRequest) error {\n\tif req.Title == \"\" || req.OwnerID == \"\" { return errors.New(\"required\") }\n\treturn nil\n}\n",
    "hints": [
      "Запиши правила валидации словами.",
      "Поля должны быть непустыми после TrimSpace.",
      "Проверь каждое отдельно.",
      "На ошибке сделай ранний return.",
      "if strings.TrimSpace(req.Title) == \"\" {\n    return errors.New(\"title required\")\n}"
    ],
    "related": [
      [
        "event-pointer",
        "Валидация перед записью"
      ],
      [
        "filter",
        "Условия"
      ]
    ],
    "production": "Валидация API до обращения к репозиторию. Проверки должны быть детерминированными.",
    "interview": "Как составить table-driven tests для пустых строк, пробелов и валидных полей?"
  },
  "perf-builder": {
    "frames": [
      [
        "Начинаем",
        [
          "a",
          "",
          "b"
        ],
        "builder = \"\"",
        "Пустые фрагменты тоже учитываем."
      ],
      [
        "Первый фрагмент",
        [
          "a",
          "",
          "b"
        ],
        "a",
        "До первого элемента разделитель не нужен."
      ],
      [
        "Второй фрагмент",
        [
          "a",
          "",
          "b"
        ],
        "a|",
        "Добавляем разделитель и пустую строку."
      ],
      [
        "Третий фрагмент",
        [
          "a",
          "",
          "b"
        ],
        "a||b",
        "Нет лишнего разделителя в конце."
      ]
    ],
    "steps": [
      [
        "Создать накопитель",
        "var b strings.Builder",
        "Builder хранит накапливаемые байты."
      ],
      [
        "Перебрать части с индексом",
        "for i, part := range parts {",
        "Индекс помогает определить первый элемент."
      ],
      [
        "Добавить разделитель не перед первым",
        "    if i > 0 { b.WriteByte('|') }",
        "Разделитель нужен между элементами."
      ],
      [
        "Записать строку",
        "    b.WriteString(part)\n}",
        "Пустая строка допустима."
      ],
      [
        "Вернуть итог",
        "return b.String()",
        "Получаем накопленную строку."
      ]
    ],
    "blocks": [
      "Вернуть итог",
      "Создать накопитель",
      "Перебрать части с индексом",
      "Добавить разделитель не перед первым",
      "Записать строку"
    ],
    "order": [
      1,
      2,
      3,
      4,
      0
    ],
    "blanks": [
      {
        "before": "var b strings.",
        "after": "",
        "options": [
          "Reader",
          "Builder",
          "Replacer"
        ],
        "correct": 1,
        "explain": "Builder накапливает строку."
      },
      {
        "before": "if i ",
        "after": " 0 { b.WriteByte('|') }",
        "options": [
          "==",
          "<",
          ">"
        ],
        "correct": 2,
        "explain": "Разделитель перед каждым элементом после первого."
      },
      {
        "before": "return b.",
        "after": "()",
        "options": [
          "String",
          "Len",
          "Reset"
        ],
        "correct": 0,
        "explain": "Нужна строка, а не длина."
      }
    ],
    "partial": "package practice\n\nfunc BuildLogLine(parts []string) string {\n\tvar b strings.Builder\n\tfor i, part := range parts {\n\t\t// TODO: добавь разделитель где нужно\n\t\t_ = i\n\t\tb.WriteString(part)\n\t}\n\treturn b.String()\n}\n",
    "bug": "package practice\n\nfunc BuildLogLine(parts []string) string {\n\tvar b strings.Builder\n\tfor _, part := range parts { b.WriteString(part); b.WriteByte('|') }\n\treturn b.String()\n}\n",
    "hints": [
      "Разделитель нужен между фрагментами.",
      "Сохрани пустые фрагменты.",
      "Используй индекс цикла.",
      "Builder.WriteString добавляет строку.",
      "var b strings.Builder\nfor i, part := range parts {\n    // добавь разделитель и part\n}"
    ],
    "related": [
      [
        "utf8-truncate",
        "Строки и руны"
      ],
      [
        "map-count",
        "Циклы"
      ]
    ],
    "production": "Сборка логов и текстовых полей. Сравни с strings.Join и измерь аллокации до оптимизации.",
    "interview": "Почему повторное сложение строк может копировать накопленные данные? Когда Builder не нужен?"
  },
  "core-zero-values": {
    "frames": [
      [
        "Вход",
        [
          "configured = 0"
        ],
        "0",
        "Нулевое значение int."
      ],
      [
        "Проверка",
        [
          "0 <= 0"
        ],
        "true",
        "Условие выполнено."
      ],
      [
        "Выход",
        [
          "3"
        ],
        "return 3",
        "Возвращаем default."
      ]
    ],
    "steps": [
      [
        "Проверить настройку",
        "if configured <= 0 {",
        "Ноль и отрицательные значения означают default."
      ],
      [
        "Вернуть default",
        "    return 3\n}",
        "return завершает функцию."
      ],
      [
        "Вернуть настройку",
        "return configured",
        "Остался положительный аргумент."
      ]
    ],
    "blocks": [
      "Вернуть настройку",
      "Проверить настройку",
      "Вернуть default"
    ],
    "order": [
      1,
      2,
      0
    ],
    "blanks": [
      {
        "before": "configured ",
        "after": " 0",
        "options": [
          "<",
          "<=",
          "=="
        ],
        "correct": 1,
        "explain": "Нужно включить ноль."
      },
      {
        "before": "return ",
        "after": "",
        "options": [
          "3",
          "0",
          "nil"
        ],
        "correct": 0,
        "explain": "По контракту default равен 3."
      }
    ],
    "partial": "package practice\n\nfunc DefaultRetries(configured int) int {\n\tif configured <= 0 { /* TODO: default */ }\n\treturn configured\n}\n",
    "bug": "package practice\n\nfunc DefaultRetries(configured int) int {\n\tif configured < 0 { return 3 }\n\treturn configured\n}\n",
    "hints": [
      "Разбери условие: Верни 3, если configured <= 0; иначе верни configured.",
      "Ноль и отрицательные значения означают default.",
      "return завершает функцию.",
      "Остался положительный аргумент.",
      "if configured <= 0 {"
    ],
    "related": [
      [
        "filter",
        "Следующая задача"
      ]
    ],
    "production": "Настройка числа повторов; в реальном API отличай отсутствующее значение от явно заданного нуля.",
    "interview": "Каково нулевое значение int? Чем var n int отличается от n := 0?"
  },
  "core-sum": {
    "frames": [
      [
        "Старт",
        [
          "2",
          "3",
          "-1"
        ],
        "total = 0",
        "Создаём накопитель."
      ],
      [
        "Первое число",
        [
          "2",
          "3",
          "-1"
        ],
        "total = 2",
        "Добавляем 2."
      ],
      [
        "Второе число",
        [
          "2",
          "3",
          "-1"
        ],
        "total = 5",
        "Добавляем 3."
      ],
      [
        "Последнее число",
        [
          "2",
          "3",
          "-1"
        ],
        "total = 4",
        "Добавляем -1."
      ]
    ],
    "steps": [
      [
        "Создать накопитель",
        "total := 0",
        "Сумма начинается с нуля."
      ],
      [
        "Перебрать вход",
        "for _, v := range values {",
        "v — очередное число, _ игнорирует индекс."
      ],
      [
        "Прибавить число",
        "    total += v\n}",
        "Прибавляем, не заменяем."
      ],
      [
        "Вернуть сумму",
        "return total",
        "После обработки всех элементов."
      ]
    ],
    "blocks": [
      "Вернуть сумму",
      "Создать накопитель",
      "Перебрать вход",
      "Прибавить число"
    ],
    "order": [
      1,
      2,
      3,
      0
    ],
    "blanks": [
      {
        "before": "total := ",
        "after": "",
        "options": [
          "1",
          "0",
          "len(values)"
        ],
        "correct": 1,
        "explain": "Нейтральное значение сложения — ноль."
      },
      {
        "before": "total ",
        "after": " v",
        "options": [
          "=",
          "+=",
          "=="
        ],
        "correct": 1,
        "explain": "Нужно прибавить."
      }
    ],
    "partial": "package practice\n\nfunc Sum(values []int) int {\n\ttotal := 0\n\tfor _, v := range values { /* TODO: накопи сумму */ _ = v }\n\treturn total\n}\n",
    "bug": "package practice\n\nfunc Sum(values []int) int {\n\ttotal := 0\n\tfor _, v := range values { total = v }\n\treturn total\n}\n",
    "hints": [
      "Разбери условие: Верни сумму чисел; для пустого списка верни 0.",
      "Сумма начинается с нуля.",
      "v — очередное число, _ игнорирует индекс.",
      "После обработки всех элементов.",
      "total := 0"
    ],
    "related": [
      [
        "filter",
        "Следующая задача"
      ]
    ],
    "production": "Суммирование количества записей по батчам; для больших объёмов учитывай диапазон типа.",
    "interview": "Сколько итераций range по nil-срезу? Когда int может переполниться?"
  },
  "core-count-positive": {
    "frames": [
      [
        "Вход",
        [
          "-1",
          "0",
          "2",
          "5"
        ],
        "count = 0",
        "Считаем только положительные."
      ],
      [
        "Пропуск",
        [
          "-1",
          "0"
        ],
        "count = 0",
        "Условие ложно."
      ],
      [
        "Подходящие",
        [
          "2",
          "5"
        ],
        "count = 2",
        "Два инкремента."
      ]
    ],
    "steps": [
      [
        "Создать счётчик",
        "count := 0",
        "Пока подходящих значений нет."
      ],
      [
        "Перебрать список",
        "for _, v := range values {",
        "Проверяем каждый элемент."
      ],
      [
        "Проверить знак",
        "    if v > 0 { count++ }\n}",
        "Инкремент увеличивает количество на один."
      ],
      [
        "Вернуть количество",
        "return count",
        "Возвращаем число элементов, а не сумму."
      ]
    ],
    "blocks": [
      "Вернуть количество",
      "Создать счётчик",
      "Перебрать список",
      "Проверить знак"
    ],
    "order": [
      1,
      2,
      3,
      0
    ],
    "blanks": [
      {
        "before": "if v ",
        "after": " 0",
        "options": [
          "<",
          ">",
          ">="
        ],
        "correct": 1,
        "explain": "Ноль не учитываем."
      },
      {
        "before": "count",
        "after": "",
        "options": [
          "++",
          "--",
          "=="
        ],
        "correct": 0,
        "explain": "Увеличиваем счётчик."
      }
    ],
    "partial": "package practice\n\nfunc CountPositive(values []int) int {\n\tcount := 0\n\tfor _, v := range values { /* TODO: проверь знак */ _ = v }\n\treturn count\n}\n",
    "bug": "package practice\n\nfunc CountPositive(values []int) int {\n\tcount := 0\n\tfor _, v := range values { if v >= 0 { count++ } }\n\treturn count\n}\n",
    "hints": [
      "Разбери условие: Верни число элементов строго больше нуля.",
      "Пока подходящих значений нет.",
      "Проверяем каждый элемент.",
      "Возвращаем число элементов, а не сумму.",
      "count := 0"
    ],
    "related": [
      [
        "filter",
        "Следующая задача"
      ]
    ],
    "production": "Подсчёт валидных измерений по условию.",
    "interview": "Чем break отличается от continue? Почему >= здесь неверно?"
  },
  "core-clamp": {
    "frames": [
      [
        "Вход",
        [
          "limit = 50",
          "max = 10"
        ],
        "max > 0",
        "Сначала проверяем максимум."
      ],
      [
        "Сравнение",
        [
          "50",
          "10"
        ],
        "50 > 10",
        "Ограничиваем значение."
      ],
      [
        "Выход",
        [
          "10"
        ],
        "return 10",
        "Аргументы передаются по значению."
      ]
    ],
    "steps": [
      [
        "Проверить максимум",
        "if max <= 0 { return 0 }",
        "Невалидный максимум имеет приоритет."
      ],
      [
        "Проверить нижнюю границу",
        "if limit <= 0 { return 1 }",
        "При положительном max единица допустима."
      ],
      [
        "Ограничить сверху",
        "if limit > max { return max }",
        "Не превышаем максимум."
      ],
      [
        "Вернуть аргумент",
        "return limit",
        "Значение уже допустимо."
      ]
    ],
    "blocks": [
      "Вернуть аргумент",
      "Проверить максимум",
      "Проверить нижнюю границу",
      "Ограничить сверху"
    ],
    "order": [
      1,
      2,
      3,
      0
    ],
    "blanks": [
      {
        "before": "if max <= 0 { return ",
        "after": " }",
        "options": [
          "1",
          "0",
          "max"
        ],
        "correct": 1,
        "explain": "Невалидный максимум."
      },
      {
        "before": "if limit > max { return ",
        "after": " }",
        "options": [
          "limit",
          "max",
          "0"
        ],
        "correct": 1,
        "explain": "Верхняя граница."
      }
    ],
    "partial": "package practice\n\nfunc ClampLimit(limit, max int) int {\n\tif max <= 0 { return 0 }\n\tif limit <= 0 { return 1 }\n\t// TODO: верхняя граница\n\treturn limit\n}\n",
    "bug": "package practice\n\nfunc ClampLimit(limit, max int) int {\n\tif limit <= 0 { return 1 }\n\tif max <= 0 { return 0 }\n\tif limit > max { return max }\n\treturn limit\n}\n",
    "hints": [
      "Разбери условие: Если max <= 0, верни 0. Иначе при limit <= 0 верни 1, при limit > max верни max, иначе limit.",
      "Невалидный максимум имеет приоритет.",
      "При положительном max единица допустима.",
      "Значение уже допустимо.",
      "if max <= 0 { return 0 }"
    ],
    "related": [
      [
        "pagination",
        "Следующая задача"
      ]
    ],
    "production": "Ограничение размера выборки API перед запросом к базе.",
    "interview": "Как передаются int в функцию? Почему порядок ранних return важен?"
  },
  "core-swap": {
    "frames": [
      [
        "Вход",
        [
          "a → 10",
          "b → 20"
        ],
        "Два адреса",
        "Нужно поменять исходные числа."
      ],
      [
        "Проверка",
        [
          "a != nil",
          "b != nil"
        ],
        "Адреса допустимы",
        "Можно разыменовать."
      ],
      [
        "Обмен",
        [
          "a → 20",
          "b → 10"
        ],
        "return true",
        "Оба значения изменились."
      ]
    ],
    "steps": [
      [
        "Проверить адреса",
        "if a == nil || b == nil { return false }",
        "Любой отсутствующий адрес делает обмен невозможным."
      ],
      [
        "Обменять значения",
        "*a, *b = *b, *a",
        "Правая часть вычисляется до записи."
      ],
      [
        "Вернуть успех",
        "return true",
        "Значения изменены у вызывающего кода."
      ]
    ],
    "blocks": [
      "Вернуть успех",
      "Проверить адреса",
      "Обменять значения"
    ],
    "order": [
      1,
      2,
      0
    ],
    "blanks": [
      {
        "before": "a == nil ",
        "after": " b == nil",
        "options": [
          "&&",
          "||",
          "+"
        ],
        "correct": 1,
        "explain": "Достаточно одного nil."
      },
      {
        "before": "*a, *b = ",
        "after": "",
        "options": [
          "*a, *b",
          "*b, *a",
          "a, b"
        ],
        "correct": 1,
        "explain": "Меняем значения, не адреса."
      }
    ],
    "partial": "package practice\n\nfunc SwapInts(a, b *int) bool {\n\tif a == nil || b == nil { return false }\n\t// TODO: обменяй значения\n\treturn true\n}\n",
    "bug": "package practice\n\nfunc SwapInts(a, b *int) bool {\n\tif a == nil || b == nil { return false }\n\t*a = *b\n\t*b = *a\n\treturn true\n}\n",
    "hints": [
      "Разбери условие: Если один из указателей nil, верни false и ничего не меняй. Иначе обменяй значения и верни true.",
      "Любой отсутствующий адрес делает обмен невозможным.",
      "Правая часть вычисляется до записи.",
      "Значения изменены у вызывающего кода.",
      "if a == nil || b == nil { return false }"
    ],
    "related": [
      [
        "event-pointer",
        "Следующая задача"
      ]
    ],
    "production": "Мутация через указатели; явно описывай владение состоянием.",
    "interview": "Чем *int отличается от int? Почему два последовательных присваивания теряют первое значение?"
  },
  "core-max": {
    "frames": [
      [
        "Вход",
        [
          "-5",
          "-2",
          "-8"
        ],
        "best = -5",
        "Начинаем с первого числа, а не с нуля."
      ],
      [
        "Сравнение",
        [
          "-5",
          "-2",
          "-8"
        ],
        "best = -2",
        "-2 больше -5."
      ],
      [
        "Последний элемент",
        [
          "-5",
          "-2",
          "-8"
        ],
        "best = -2",
        "-8 меньше текущего максимума."
      ]
    ],
    "steps": [
      [
        "Проверить длину",
        "if len(values) == 0 { return 0, false }",
        "Нельзя читать values[0] у пустого среза."
      ],
      [
        "Взять первый элемент",
        "best := values[0]",
        "Это корректный максимум даже для отрицательных чисел."
      ],
      [
        "Сравнить остальные",
        "for _, v := range values[1:] { if v > best { best = v } }",
        "Обновляем только при большем значении."
      ],
      [
        "Вернуть результат",
        "return best, true",
        "bool сообщает, что максимум существует."
      ]
    ],
    "blocks": [
      "Вернуть результат",
      "Проверить длину",
      "Взять первый элемент",
      "Сравнить остальные"
    ],
    "order": [
      1,
      2,
      3,
      0
    ],
    "blanks": [
      {
        "before": "best := ",
        "after": "",
        "options": [
          "0",
          "values[0]",
          "len(values)"
        ],
        "correct": 1,
        "explain": "Начинаем с реального элемента."
      },
      {
        "before": "if v ",
        "after": " best",
        "options": [
          "<",
          ">",
          "=="
        ],
        "correct": 1,
        "explain": "Ищем большее значение."
      }
    ],
    "partial": "package practice\n\nfunc MaxValue(values []int) (int, bool) {\n\tif len(values) == 0 { return 0, false }\n\tbest := values[0]\n\tfor _, v := range values[1:] { /* TODO: обнови максимум */ _ = v }\n\treturn best, true\n}\n",
    "bug": "package practice\n\nfunc MaxValue(values []int) (int, bool) {\n\tif len(values) == 0 { return 0, false }\n\tbest := 0\n\tfor _, v := range values { if v > best { best = v } }\n\treturn best, true\n}\n",
    "hints": [
      "Верни максимальное число и true. Для пустого среза верни 0, false. Отрицательные числа допустимы.",
      "Нельзя читать values[0] у пустого среза.",
      "Это корректный максимум даже для отрицательных чисел.",
      "Обновляем только при большем значении.",
      "if len(values) == 0 { return 0, false }"
    ],
    "related": [
      [
        "core-sum",
        "Сложить числа в списке"
      ]
    ],
    "production": "Максимальное время обработки в батче; пустой батч не должен выглядеть как измерение нулевой длительности.",
    "interview": "Почему нельзя начинать максимум с 0?"
  },
  "core-reverse": {
    "frames": [
      [
        "Вход",
        [
          "10",
          "20",
          "30"
        ],
        "out = [0,0,0]",
        "Выделяем отдельный массив."
      ],
      [
        "Первое число",
        [
          "10",
          "20",
          "30"
        ],
        "out = [0,0,10]",
        "Индекс назначения 3-1-0 = 2."
      ],
      [
        "Второе число",
        [
          "10",
          "20",
          "30"
        ],
        "out = [0,20,10]",
        "Индекс назначения 1."
      ],
      [
        "Последнее число",
        [
          "10",
          "20",
          "30"
        ],
        "out = [30,20,10]",
        "Исходные числа не изменились."
      ]
    ],
    "steps": [
      [
        "Выделить результат",
        "out := make([]int, len(values))",
        "Длина нужна для записи по индексу."
      ],
      [
        "Перебрать вход",
        "for i, v := range values {",
        "Нужен индекс каждого элемента."
      ],
      [
        "Записать в обратный индекс",
        "    out[len(values)-1-i] = v\n}",
        "Последний индекс равен длине минус один."
      ],
      [
        "Вернуть новый срез",
        "return out",
        "Память результата независима."
      ]
    ],
    "blocks": [
      "Вернуть новый срез",
      "Выделить результат",
      "Перебрать вход",
      "Записать в обратный индекс"
    ],
    "order": [
      1,
      2,
      3,
      0
    ],
    "blanks": [
      {
        "before": "make([]int, ",
        "after": ")",
        "options": [
          "0",
          "len(values)",
          "1"
        ],
        "correct": 1,
        "explain": "Записываем по индексам."
      },
      {
        "before": "out[",
        "after": "] = v",
        "options": [
          "i",
          "len(values)-1-i",
          "len(values)-i"
        ],
        "correct": 1,
        "explain": "Зеркальный индекс."
      }
    ],
    "partial": "package practice\n\nfunc ReverseCopy(values []int) []int {\n\tout := make([]int, len(values))\n\tfor i, v := range values { /* TODO: запиши в обратный индекс */ _, _ = i, v }\n\treturn out\n}\n",
    "bug": "package practice\n\nfunc ReverseCopy(values []int) []int {\n\tout := values\n\tfor i,j:=0,len(out)-1;i<j;i,j=i+1,j-1 { out[i],out[j]=out[j],out[i] }\n\treturn out\n}\n",
    "hints": [
      "Верни новый срез в обратном порядке. Исходный срез не меняй и не разделяй с ним backing array. Пустой вход — пустой результат.",
      "Длина нужна для записи по индексу.",
      "Нужен индекс каждого элемента.",
      "Последний индекс равен длине минус один.",
      "out := make([]int, len(values))"
    ],
    "related": [
      [
        "pagination",
        "Пагинация списка ID"
      ]
    ],
    "production": "Обратный порядок уже загруженной истории без изменения общего входного списка.",
    "interview": "Чем массив отличается от среза при присваивании?"
  },
  "core-concat": {
    "frames": [
      [
        "Вход",
        [
          "a: 1,2",
          "b: 3,4"
        ],
        "out = []",
        "Подготавливаем независимый буфер."
      ],
      [
        "Добавляем a",
        [
          "1",
          "2"
        ],
        "out = [1,2]",
        "a... раскрывает элементы среза."
      ],
      [
        "Добавляем b",
        [
          "1",
          "2",
          "3",
          "4"
        ],
        "out = [1,2,3,4]",
        "Порядок сохранён."
      ]
    ],
    "steps": [
      [
        "Выделить пустой результат",
        "out := make([]int, 0, len(a)+len(b))",
        "Нулевая длина, ёмкость для всех элементов."
      ],
      [
        "Добавить первый срез",
        "out = append(out, a...)",
        "Многоточие передаёт элементы как вариативные аргументы."
      ],
      [
        "Добавить второй срез",
        "out = append(out, b...)",
        "Сохраняем возвращённый slice header."
      ],
      [
        "Вернуть результат",
        "return out",
        "Входные массивы не используются для записи."
      ]
    ],
    "blocks": [
      "Вернуть результат",
      "Выделить пустой результат",
      "Добавить первый срез",
      "Добавить второй срез"
    ],
    "order": [
      1,
      2,
      3,
      0
    ],
    "blanks": [
      {
        "before": "make([]int, ",
        "after": " ,len(a)+len(b))",
        "options": [
          "0",
          "len(a)",
          "1"
        ],
        "correct": 0,
        "explain": "append добавляет после текущей длины."
      },
      {
        "before": "append(out, b",
        "after": ")",
        "options": [
          "",
          "...",
          "[]"
        ],
        "correct": 1,
        "explain": "Раскрываем срез."
      }
    ],
    "partial": "package practice\n\nfunc ConcatInts(a, b []int) []int {\n\tout := make([]int, 0, len(a)+len(b))\n\tout = append(out, a...)\n\t// TODO: добавь все элементы b\n\treturn out\n}\n",
    "bug": "package practice\n\nfunc ConcatInts(a, b []int) []int {\n\treturn append(a,b...)\n}\n",
    "hints": [
      "Верни элементы a, затем b, в независимом срезе. Не изменяй входы и не разделяй с ними массив.",
      "Нулевая длина, ёмкость для всех элементов.",
      "Многоточие передаёт элементы как вариативные аргументы.",
      "Сохраняем возвращённый slice header.",
      "out := make([]int, 0, len(a)+len(b))"
    ],
    "related": [
      [
        "core-reverse",
        "Развернуть срез без изменения оригинала"
      ]
    ],
    "production": "Объединение списков получателей перед дальнейшей дедупликацией.",
    "interview": "Почему append(a,b...) не гарантирует независимый результат?"
  },
  "core-first-repeat": {
    "frames": [
      [
        "Старт",
        [
          "4",
          "2",
          "2",
          "4"
        ],
        "seen = {}",
        "Запоминаем посещённые числа."
      ],
      [
        "Первое число",
        [
          "4",
          "2",
          "2",
          "4"
        ],
        "seen = {4}",
        "4 ещё не встречалось."
      ],
      [
        "Второе число",
        [
          "4",
          "2",
          "2",
          "4"
        ],
        "seen = {4,2}",
        "2 ещё не встречалось."
      ],
      [
        "Третье число",
        [
          "4",
          "2",
          "2",
          "4"
        ],
        "return 2,true",
        "2 уже есть: завершаем функцию."
      ]
    ],
    "steps": [
      [
        "Создать множество",
        "seen := make(map[int]struct{})",
        "Ключи — встреченные числа."
      ],
      [
        "Перебрать вход",
        "for _, v := range values {",
        "Важно идти слева направо."
      ],
      [
        "Проверить присутствие",
        "    if _, ok := seen[v]; ok { return v, true }",
        "comma-ok проверяет факт наличия ключа."
      ],
      [
        "Запомнить число",
        "    seen[v] = struct{}{}\n}",
        "Запись выполняется только после проверки."
      ],
      [
        "Вернуть отсутствие",
        "return 0, false",
        "Повтора нет."
      ]
    ],
    "blocks": [
      "Вернуть отсутствие",
      "Создать множество",
      "Перебрать вход",
      "Проверить присутствие",
      "Запомнить число"
    ],
    "order": [
      1,
      2,
      3,
      4,
      0
    ],
    "blanks": [
      {
        "before": "if _, ok := seen[v]; ",
        "after": " {",
        "options": [
          "!ok",
          "ok",
          "v"
        ],
        "correct": 1,
        "explain": "Ищем уже встреченное число."
      },
      {
        "before": "seen[v] = ",
        "after": "",
        "options": [
          "true",
          "struct{}{}",
          "nil"
        ],
        "correct": 1,
        "explain": "Значение имеет тип struct{}."
      }
    ],
    "partial": "package practice\n\nfunc FirstRepeat(values []int) (int, bool) {\n\tseen := make(map[int]struct{})\n\tfor _, v := range values {\n\t // TODO: проверь, был ли v раньше\n\t seen[v] = struct{}{}\n\t}\n\treturn 0, false\n}\n",
    "bug": "package practice\n\nfunc FirstRepeat(values []int) (int, bool) {\n\tseen := make(map[int]struct{})\n\tfor _, v := range values { seen[v]=struct{}{}; if _,ok:=seen[v];ok{return v,true} }\n\treturn 0,false\n}\n",
    "hints": [
      "Верни число, которое первым встречается повторно при проходе слева направо, и true. Если повторов нет — 0,false.",
      "Ключи — встреченные числа.",
      "Важно идти слева направо.",
      "Запись выполняется только после проверки.",
      "seen := make(map[int]struct{})"
    ],
    "related": [
      [
        "dedupe",
        "Убрать дубли получателей"
      ]
    ],
    "production": "Поиск первого повторного ID при проверке входного батча.",
    "interview": "Зачем comma-ok при map[int]struct{}?"
  },
  "core-batches": {
    "frames": [
      [
        "Вход",
        [
          "1",
          "2",
          "3",
          "4",
          "5"
        ],
        "size = 2, start = 0",
        "Нужны группы максимум по два числа."
      ],
      [
        "Первый батч",
        [
          "1",
          "2"
        ],
        "start=0, end=2",
        "Срез [0:2:2] ограничивает ёмкость."
      ],
      [
        "Второй батч",
        [
          "3",
          "4"
        ],
        "start=2, end=4",
        "Следующий батч начинается с предыдущего end."
      ],
      [
        "Остаток",
        [
          "5"
        ],
        "start=4, end=5",
        "Остался один элемент: не выходим за len."
      ],
      [
        "Выход",
        [
          "[1,2]",
          "[3,4]",
          "[5]"
        ],
        "start=5",
        "Цикл завершён."
      ]
    ],
    "steps": [
      [
        "Проверить размер",
        "if size <= 0 { return [][]int{} }",
        "Нулевой или отрицательный шаг недопустим."
      ],
      [
        "Создать список групп",
        "out := make([][]int, 0)",
        "Каждый элемент результата — отдельный дескриптор []int."
      ],
      [
        "Начать проход",
        "for start := 0; start < len(values); {",
        "Начало следующей группы определим вручную."
      ],
      [
        "Вычислить конец",
        "end := len(values)\nif size < end-start { end = start+size }",
        "Сравнение с остатком предотвращает выход за границу и переполнение start+size."
      ],
      [
        "Добавить группу и сдвинуться",
        "out = append(out, values[start:end:end])\nstart = end\n}",
        "Трёхиндексный срез ограничивает cap; append не затронет следующую группу."
      ],
      [
        "Вернуть группы",
        "return out",
        "Элементы групп всё ещё могут ссылаться на исходный массив."
      ]
    ],
    "blocks": [
      "Вернуть группы",
      "Проверить размер",
      "Создать список групп",
      "Начать проход",
      "Вычислить конец",
      "Добавить группу и сдвинуться"
    ],
    "order": [
      1,
      2,
      3,
      4,
      5,
      0
    ],
    "blanks": [
      {
        "before": "if size ",
        "after": " 0",
        "options": [
          "<",
          "<=",
          "=="
        ],
        "correct": 1,
        "explain": "Нужно исключить ноль и отрицательный размер."
      },
      {
        "before": "values[start:end:",
        "after": "]",
        "options": [
          "len(values)",
          "end",
          "start"
        ],
        "correct": 1,
        "explain": "Ёмкость батча ограничиваем end-start."
      }
    ],
    "partial": "package practice\n\nfunc BatchInts(values []int, size int) [][]int {\n\tif size <= 0 { return [][]int{} }\n\tout := make([][]int, 0)\n\tfor start := 0; start < len(values); {\n\t    end := len(values)\n\t    // TODO: ограничь end размером батча\n\t    out = append(out, values[start:end:end])\n\t    start = end\n\t}\n\treturn out\n}\n",
    "bug": "package practice\n\nfunc BatchInts(values []int, size int) [][]int {\n\tif size <= 0 { return [][]int{} }\n\tout := make([][]int, 0)\n\tfor start := 0; start < len(values); {\n\t    end := len(values)\n\t    if size < end-start { end = start+size }\n\t    out = append(out, values[start:end])\n\t    start = end\n\t}\n\treturn out\n}\n",
    "hints": [
      "Разбей числа на последовательные непустые группы длиной не больше size. Последняя группа может быть короче. При size <= 0 или пустом входе верни пустой результат. Батчи могут разделять массив входа, но append к батчу не должен перезаписывать следующий батч.",
      "Нулевой или отрицательный шаг недопустим.",
      "Каждый элемент результата — отдельный дескриптор []int.",
      "Трёхиндексный срез ограничивает cap; append не затронет следующую группу.",
      "if size <= 0 { return [][]int{} }"
    ],
    "related": [
      [
        "slice-detach",
        "Не удерживать большой буфер памяти"
      ]
    ],
    "production": "Отправка событий пакетами. Если пакеты передаются независимым владельцам или изменяются конкурентно, копируй элементы отдельно: ограничение cap не устраняет aliasing.",
    "interview": "Что гарантирует s[low:high:max]?"
  },
  "core-frequency": {
    "frames": [
      [
        "Вход",
        [
          "2",
          "-1",
          "2",
          "0"
        ],
        "counts = {}",
        "Числа могут быть любыми int."
      ],
      [
        "Первый элемент",
        [
          "2"
        ],
        "2 → 1",
        "Отсутствующий ключ читается как 0."
      ],
      [
        "Второй элемент",
        [
          "-1"
        ],
        "2 → 1, -1 → 1",
        "Другой ключ имеет отдельный счётчик."
      ],
      [
        "Повтор",
        [
          "2"
        ],
        "2 → 2, -1 → 1",
        "Увеличиваем существующее значение."
      ],
      [
        "Последний",
        [
          "0"
        ],
        "2 → 2, -1 → 1, 0 → 1",
        "Ноль тоже допустимый ключ."
      ]
    ],
    "steps": [
      [
        "Создать map",
        "counts := make(map[int]int)",
        "И ключ, и количество имеют тип int."
      ],
      [
        "Перебрать список",
        "for _, v := range values {",
        "Каждый элемент учитываем один раз."
      ],
      [
        "Увеличить счётчик",
        "    counts[v]++\n}",
        "Если ключа не было, нулевое значение int становится единицей."
      ],
      [
        "Вернуть результат",
        "return counts",
        "Порядок обхода ключей не гарантируется."
      ]
    ],
    "blocks": [
      "Вернуть результат",
      "Создать map",
      "Перебрать список",
      "Увеличить счётчик"
    ],
    "order": [
      1,
      2,
      3,
      0
    ],
    "blanks": [
      {
        "before": "make(map[int]",
        "after": ")",
        "options": [
          "bool",
          "int",
          "string"
        ],
        "correct": 1,
        "explain": "Количество — целое число."
      },
      {
        "before": "counts[v]",
        "after": "",
        "options": [
          " = 1",
          "++",
          "--"
        ],
        "correct": 1,
        "explain": "При повторе нужно увеличивать значение."
      }
    ],
    "partial": "package practice\n\nfunc IntFrequency(values []int) map[int]int {\n\tcounts := make(map[int]int)\n\tfor _, v := range values {\n\t    // TODO: увеличь счётчик v\n\t    _ = v\n\t}\n\treturn counts\n}\n",
    "bug": "package practice\n\nfunc IntFrequency(values []int) map[int]int {\n\tcounts := make(map[int]int)\n\tfor _, v := range values { counts[v] = 1 }\n\treturn counts\n}\n",
    "hints": [
      "Верни map, где ключ — число, значение — сколько раз оно встречается. Пустой вход должен вернуть непустую по инициализации (не nil) пустую map.",
      "И ключ, и количество имеют тип int.",
      "Каждый элемент учитываем один раз.",
      "Если ключа не было, нулевое значение int становится единицей.",
      "counts := make(map[int]int)"
    ],
    "related": [
      [
        "core-first-repeat",
        "Найти первый повторяющийся элемент"
      ]
    ],
    "production": "Подсчёт кодов ответов или категорий ошибок. Для общей map между горутинами нужна синхронизация.",
    "interview": "Почему можно сразу выполнить counts[v]++?"
  },
  "core-lookup": {
    "frames": [
      [
        "Map",
        [
          "alice → 0",
          "bob → 5"
        ],
        "user = alice",
        "Нулевая квота существует как запись."
      ],
      [
        "Lookup",
        [
          "alice → 0"
        ],
        "quota=0, ok=true",
        "Comma-ok отличает наличие ключа."
      ],
      [
        "Другой запрос",
        [
          "charlie"
        ],
        "quota=0, ok=false",
        "Отсутствующий ключ тоже даёт 0, но ok отличается."
      ],
      [
        "Nil map",
        [
          "nil"
        ],
        "quota=0, ok=false",
        "Чтение из nil map безопасно."
      ]
    ],
    "steps": [
      [
        "Найти значение и наличие",
        "quota, ok := quotas[user]",
        "Map lookup в двухзначной форме возвращает значение и bool."
      ],
      [
        "Вернуть оба результата",
        "return quota, ok",
        "Ноль не заменяет проверку наличия."
      ]
    ],
    "blocks": [
      "Вернуть оба результата",
      "Найти значение и наличие"
    ],
    "order": [
      1,
      0
    ],
    "blanks": [
      {
        "before": "quota, ",
        "after": " := quotas[user]",
        "options": [
          "user",
          "ok",
          "nil"
        ],
        "correct": 1,
        "explain": "Второй результат сообщает наличие."
      },
      {
        "before": "return quota, ",
        "after": "",
        "options": [
          "quota != 0",
          "ok",
          "true"
        ],
        "correct": 1,
        "explain": "Возвращаем факт присутствия, не сравнение значения."
      }
    ],
    "partial": "package practice\n\nfunc LookupQuota(quotas map[string]int, user string) (int, bool) {\n\t// TODO: получи значение и признак наличия ключа\n\treturn 0, false\n}\n",
    "bug": "package practice\n\nfunc LookupQuota(quotas map[string]int, user string) (int, bool) {\n\tquota := quotas[user]\n\treturn quota, quota != 0\n}\n",
    "hints": [
      "Верни квоту пользователя и true, если ключ есть. Если его нет — 0,false. Квота 0 является допустимым значением. Входную map не изменяй.",
      "Map lookup в двухзначной форме возвращает значение и bool.",
      "Ноль не заменяет проверку наличия.",
      "Map lookup в двухзначной форме возвращает значение и bool.",
      "quota, ok := quotas[user]"
    ],
    "related": [
      [
        "core-first-repeat",
        "Найти первый повторяющийся элемент"
      ]
    ],
    "production": "Проверка настроек лимитов, где ноль означает запрет, а отсутствие — применение default. Не подменяй наличие проверкой на ненулевое значение.",
    "interview": "Что отличает m[k] от v,ok := m[k]?"
  },
  "core-string-stats": {
    "frames": [
      [
        "Строка",
        [
          "A",
          "я",
          "🙂"
        ],
        "len(s)=7",
        "ASCII 1 байт, кириллица 2, emoji 4."
      ],
      [
        "Первый проход",
        [
          "A"
        ],
        "runes=1",
        "range декодирует первую руну."
      ],
      [
        "Второй проход",
        [
          "я"
        ],
        "runes=2",
        "Одна руна занимает два байта."
      ],
      [
        "Последний проход",
        [
          "🙂"
        ],
        "runes=3",
        "Одна руна занимает четыре байта."
      ],
      [
        "Выход",
        [
          "7 bytes",
          "3 runes"
        ],
        "return 7,3",
        "Руны не всегда равны визуальным символам."
      ]
    ],
    "steps": [
      [
        "Создать счётчик",
        "runes := 0",
        "Считаем декодированные руны, не байты."
      ],
      [
        "Перебрать строку",
        "for range s {",
        "Каждая итерация соответствует декодированной руне; невалидный байт даёт RuneError."
      ],
      [
        "Увеличить счётчик",
        "    runes++\n}",
        "Одна итерация — одна руна."
      ],
      [
        "Вернуть оба числа",
        "return len(s), runes",
        "len возвращает байты, счётчик — число итераций range."
      ]
    ],
    "blocks": [
      "Вернуть оба числа",
      "Создать счётчик",
      "Перебрать строку",
      "Увеличить счётчик"
    ],
    "order": [
      1,
      2,
      3,
      0
    ],
    "blanks": [
      {
        "before": "return ",
        "after": " , runes",
        "options": [
          "cap(s)",
          "len(s)",
          "s"
        ],
        "correct": 1,
        "explain": "len строки — число байтов."
      },
      {
        "before": "for range ",
        "after": " {",
        "options": [
          "runes",
          "s",
          "len(s)"
        ],
        "correct": 1,
        "explain": "range по строке декодирует UTF-8."
      }
    ],
    "partial": "package practice\n\nfunc StringStats(s string) (int, int) {\n\trunes := 0\n\tfor range s {\n\t    // TODO: увеличь количество рун\n\t}\n\treturn len(s), runes\n}\n",
    "bug": "package practice\n\nfunc StringStats(s string) (int, int) {\n\treturn len(s), len(s)\n}\n",
    "hints": [
      "Верни число байтов строки и число рун, которое выдаёт range. Пустая строка даёт 0,0. Невалидный UTF-8 учитывай по правилам range.",
      "Считаем декодированные руны, не байты.",
      "Каждая итерация соответствует декодированной руне; невалидный байт даёт RuneError.",
      "Одна итерация — одна руна.",
      "runes := 0"
    ],
    "related": [
      [
        "utf8-truncate",
        "Обрезать имя без повреждения UTF-8"
      ]
    ],
    "production": "Лимиты API могут измеряться в байтах, Unicode code points или графемах. Уточняй контракт; например, e с combining accent состоит из двух рун, но визуально воспринимается как один символ.",
    "interview": "Чем len(s) отличается от числа итераций range?"
  },
  "core-parse-int": {
    "frames": [
      [
        "Вход",
        [
          "\"8080\""
        ],
        "s имеет тип string",
        "Строка содержит цифры, но ещё не число."
      ],
      [
        "Преобразование",
        [
          "8080"
        ],
        "port=8080, err=nil",
        "Atoi возвращает int и error."
      ],
      [
        "Проверка",
        [
          "1",
          "8080",
          "65535"
        ],
        "диапазон допустим",
        "Сначала проверяем ошибку парсинга, потом диапазон."
      ],
      [
        "Выход",
        [
          "8080"
        ],
        "return 8080,nil",
        "Если вход abc или 70000, возвращаем ошибку."
      ]
    ],
    "steps": [
      [
        "Распарсить строку",
        "port, err := strconv.Atoi(s)",
        "Atoi разбирает десятичное целое число."
      ],
      [
        "Проверить ошибку",
        "if err != nil { return 0, err }",
        "Нельзя использовать результат при ошибке."
      ],
      [
        "Проверить диапазон",
        "if port < 1 || port > 65535 { return 0, errors.New(\"invalid port\") }",
        "Синтаксически правильное число может быть недопустимо."
      ],
      [
        "Вернуть результат",
        "return port, nil",
        "nil сообщает об успехе."
      ]
    ],
    "blocks": [
      "Вернуть результат",
      "Распарсить строку",
      "Проверить ошибку",
      "Проверить диапазон"
    ],
    "order": [
      1,
      2,
      3,
      0
    ],
    "blanks": [
      {
        "before": "strconv.",
        "after": "(s)",
        "options": [
          "Itoa",
          "Atoi",
          "FormatBool"
        ],
        "correct": 1,
        "explain": "Atoi преобразует string в int."
      },
      {
        "before": "if err ",
        "after": " nil",
        "options": [
          "==",
          "!=",
          "<"
        ],
        "correct": 1,
        "explain": "Ненулевая ошибка означает неуспех."
      }
    ],
    "partial": "package practice\n\nfunc ParsePort(s string) (int, error) {\n\tport, err := strconv.Atoi(s)\n\tif err != nil { return 0, err }\n\t// TODO: проверь диапазон\n\treturn port, nil\n}\n",
    "bug": "package practice\n\nfunc ParsePort(s string) (int, error) {\n\tport, err := strconv.Atoi(s)\n\tif err != nil { return 0, err }\n\treturn port, nil\n}\n",
    "hints": [
      "Преобразуй десятичную строку через strconv.Atoi. Разрешены значения от 1 до 65535; при ошибке преобразования или диапазона верни 0 и ненулевую ошибку.",
      "Atoi разбирает десятичное целое число.",
      "Нельзя использовать результат при ошибке.",
      "Синтаксически правильное число может быть недопустимо.",
      "port, err := strconv.Atoi(s)"
    ],
    "related": [
      [
        "core-clamp",
        "Ограничить размер страницы"
      ]
    ],
    "production": "Парсинг переменных окружения и параметров API. Отдельно проверяй формат, диапазон и смысл значения.",
    "interview": "Чем int(s) отличается от strconv.Atoi(s)?"
  },
  "core-byte-conversion": {
    "frames": [
      [
        "Вход",
        [
          "n=256"
        ],
        "int",
        "256 не помещается в uint8."
      ],
      [
        "Проверка",
        [
          "0",
          "255",
          "256"
        ],
        "256 > 255",
        "Отказываемся до преобразования."
      ],
      [
        "Допустимый пример",
        [
          "n=200"
        ],
        "byte(200)=200",
        "Число укладывается в восемь бит."
      ],
      [
        "Результат",
        [
          "200",
          "true"
        ],
        "return byte(n),true",
        "bool отличает успешный ноль от ошибки."
      ]
    ],
    "steps": [
      [
        "Проверить диапазон",
        "if n < 0 || n > 255 { return 0, false }",
        "byte — псевдоним uint8."
      ],
      [
        "Преобразовать значение",
        "return byte(n), true",
        "Явное преобразование безопасно после проверки."
      ]
    ],
    "blocks": [
      "Преобразовать значение",
      "Проверить диапазон"
    ],
    "order": [
      1,
      0
    ],
    "blanks": [
      {
        "before": "n < 0 ",
        "after": " n > 255",
        "options": [
          "&&",
          "||",
          "+"
        ],
        "correct": 1,
        "explain": "Достаточно выхода за одну границу."
      },
      {
        "before": "return ",
        "after": " , true",
        "options": [
          "n",
          "byte(n)",
          "string(n)"
        ],
        "correct": 1,
        "explain": "Результат должен иметь тип byte."
      }
    ],
    "partial": "package practice\n\nfunc ToByte(n int) (byte, bool) {\n\t// TODO: проверь диапазон n\n\treturn byte(n), true\n}\n",
    "bug": "package practice\n\nfunc ToByte(n int) (byte, bool) {\n\treturn byte(n), true\n}\n",
    "hints": [
      "Верни byte(n) и true, если n в диапазоне 0..255. Иначе верни 0,false. Не допускай молчаливого усечения.",
      "byte — псевдоним uint8.",
      "Явное преобразование безопасно после проверки.",
      "byte — псевдоним uint8.",
      "if n < 0 || n > 255 { return 0, false }"
    ],
    "related": [
      [
        "core-zero-values",
        "Выбрать число попыток"
      ]
    ],
    "production": "Преобразование значений для двоичного протокола. Не полагайся на усечение при смене числового типа.",
    "interview": "Что произойдёт при byte(n), если переменная n равна 256?"
  },
  "core-array": {
    "frames": [
      [
        "Вход",
        [
          "10",
          "20",
          "30"
        ],
        "a: [3]int",
        "Длина входит в тип массива."
      ],
      [
        "Последний в начало",
        [
          "30",
          "?",
          "?"
        ],
        "out[0] = a[2]",
        "Берём последний элемент."
      ],
      [
        "Сдвиг",
        [
          "30",
          "10",
          "20"
        ],
        "out[1]=a[0], out[2]=a[1]",
        "Сдвигаем остальные вправо."
      ],
      [
        "Возврат",
        [
          "30",
          "10",
          "20"
        ],
        "return [3]int{30,10,20}",
        "Исходный массив остаётся прежним."
      ]
    ],
    "steps": [
      [
        "Определить порядок",
        "a[2], a[0], a[1]",
        "Последний элемент переносится в начало."
      ],
      [
        "Создать и вернуть массив",
        "return [3]int{a[2], a[0], a[1]}",
        "Литерал создаёт значение фиксированного типа."
      ]
    ],
    "blocks": [
      "Создать и вернуть массив",
      "Определить порядок"
    ],
    "order": [
      1,
      0
    ],
    "blanks": [
      {
        "before": "return [3]int{a[",
        "after": "], a[0], a[1]}",
        "options": [
          "0",
          "1",
          "2"
        ],
        "correct": 2,
        "explain": "Первым становится последний элемент."
      },
      {
        "before": "Тип массива из трёх int: ",
        "after": "",
        "options": [
          "[]int",
          "[3]int",
          "[2]int"
        ],
        "correct": 1,
        "explain": "Длина входит в тип массива."
      }
    ],
    "partial": "package practice\n\nfunc RotateArray(a [3]int) [3]int {\n\t// TODO: расположи элементы в новом порядке\n\treturn [3]int{a[2], 0, 0}\n}\n",
    "bug": "package practice\n\nfunc RotateArray(a [3]int) [3]int {\n\treturn [3]int{a[1], a[2], a[0]}\n}\n",
    "hints": [
      "Верни массив [a[2],a[0],a[1]]. Исходный массив вызывающего кода не меняется.",
      "Последний элемент переносится в начало.",
      "Литерал создаёт значение фиксированного типа.",
      "Последний элемент переносится в начало.",
      "a[2], a[0], a[1]"
    ],
    "related": [
      [
        "core-reverse",
        "Развернуть срез без изменения оригинала"
      ]
    ],
    "production": "Фиксированные по размеру значения применяются, например, для идентификаторов и контрольных сумм; массивы удобны, когда длина является частью контракта.",
    "interview": "Чем [3]int отличается от []int?"
  },
  "core-apply": {
    "frames": [
      [
        "Вход",
        [
          "1",
          "2",
          "3"
        ],
        "fn(x) = x*2",
        "Функция передаётся как значение."
      ],
      [
        "Первый вызов",
        [
          "2",
          "0",
          "0"
        ],
        "fn(1)=2",
        "Результат записывается в новый массив."
      ],
      [
        "Второй вызов",
        [
          "2",
          "4",
          "0"
        ],
        "fn(2)=4",
        "Алгоритм не знает внутренней логики fn."
      ],
      [
        "Выход",
        [
          "2",
          "4",
          "6"
        ],
        "fn(3)=6",
        "Вход [1,2,3] не меняется."
      ]
    ],
    "steps": [
      [
        "Проверить функцию",
        "if fn == nil { return []int{} }",
        "Вызов nil-функции привёл бы к panic."
      ],
      [
        "Создать результат",
        "out := make([]int, len(values))",
        "Длина результата равна длине входа."
      ],
      [
        "Перебрать и применить",
        "for i, v := range values { out[i] = fn(v) }",
        "Вызов fn(v) возвращает преобразованное число."
      ],
      [
        "Вернуть результат",
        "return out",
        "Новый срез не разделяет массив входа."
      ]
    ],
    "blocks": [
      "Вернуть результат",
      "Проверить функцию",
      "Создать результат",
      "Перебрать и применить"
    ],
    "order": [
      1,
      2,
      3,
      0
    ],
    "blanks": [
      {
        "before": "out[i] = ",
        "after": "",
        "options": [
          "fn(v)",
          "fn",
          "v"
        ],
        "correct": 0,
        "explain": "Нужно вызвать функцию."
      },
      {
        "before": "if fn == ",
        "after": "",
        "options": [
          "0",
          "nil",
          "false"
        ],
        "correct": 1,
        "explain": "Нулевое значение функционального типа — nil."
      }
    ],
    "partial": "package practice\n\nfunc ApplyInts(values []int, fn func(int) int) []int {\n\tif fn == nil { return []int{} }\n\tout := make([]int, len(values))\n\tfor i, v := range values { /* TODO: вызови fn и запиши результат */ _, _ = i, v }\n\treturn out\n}\n",
    "bug": "package practice\n\nfunc ApplyInts(values []int, fn func(int) int) []int {\n\tif fn == nil { return []int{} }\n\tout := values\n\tfor i, v := range values { out[i] = fn(v) }\n\treturn out\n}\n",
    "hints": [
      "Верни новый срез, применив fn к каждому числу в исходном порядке. Если fn == nil, верни пустой срез; вход не меняй.",
      "Вызов nil-функции привёл бы к panic.",
      "Длина результата равна длине входа.",
      "Вызов fn(v) возвращает преобразованное число.",
      "if fn == nil { return []int{} }"
    ],
    "related": [
      [
        "core-sum",
        "Сложить числа в списке"
      ]
    ],
    "production": "Передача стратегии преобразования данных без дублирования обхода. Следи за побочными эффектами callback.",
    "interview": "Что такое func(int) int и можно ли передать такую функцию аргументом?"
  },
  "core-shadow": {
    "frames": [
      [
        "Внешний блок",
        [
          "limit = 20"
        ],
        "requested = 7",
        "Создали переменную со значением по умолчанию."
      ],
      [
        "Вход в if",
        [
          "limit = 20",
          "requested = 7"
        ],
        "requested > 0",
        "Условие истинно."
      ],
      [
        "Ошибочный вариант",
        [
          "внешняя limit = 20",
          "внутренняя limit = 7"
        ],
        "limit := requested",
        "Внутри нового блока создаётся другая переменная."
      ],
      [
        "Исправление",
        [
          "внешняя limit = 7"
        ],
        "limit = requested",
        "Обычное присваивание обновляет существующую переменную."
      ],
      [
        "Выход",
        [
          "7"
        ],
        "return limit",
        "После if доступна внешняя переменная."
      ]
    ],
    "steps": [
      [
        "Создать default",
        "limit := 20",
        "Переменная объявлена во внешнем блоке функции."
      ],
      [
        "Проверить вход",
        "if requested > 0 {",
        "При положительном аргументе нужно изменить default."
      ],
      [
        "Обновить существующую переменную",
        "    limit = requested\n}",
        "Не используй := в новом блоке: оно объявит другую limit."
      ],
      [
        "Вернуть результат",
        "return limit",
        "Читаем внешнюю переменную после if."
      ]
    ],
    "blocks": [
      "Вернуть результат",
      "Создать default",
      "Проверить вход",
      "Обновить существующую переменную"
    ],
    "order": [
      1,
      2,
      3,
      0
    ],
    "blanks": [
      {
        "before": "limit ",
        "after": " requested",
        "options": [
          ":=",
          "=",
          "=="
        ],
        "correct": 1,
        "explain": "Присваивание обновляет существующую переменную."
      },
      {
        "before": "return ",
        "after": "",
        "options": [
          "limit",
          "requested",
          "20"
        ],
        "correct": 0,
        "explain": "Возвращаем итоговое значение после проверки."
      }
    ],
    "partial": "package practice\n\nfunc EffectiveLimit(requested int) int {\n\tlimit := 20\n\tif requested > 0 {\n\t    // TODO: обнови внешнюю limit\n\t}\n\treturn limit\n}\n",
    "bug": "package practice\n\nfunc EffectiveLimit(requested int) int {\n\tlimit := 20\n\tif requested > 0 { limit := requested; _ = limit }\n\treturn limit\n}\n",
    "hints": [
      "Верни requested, если он положительный, иначе 20. В упражнении исправь затенение переменной limit внутри if.",
      "Переменная объявлена во внешнем блоке функции.",
      "При положительном аргументе нужно изменить default.",
      "Не используй := в новом блоке: оно объявит другую limit.",
      "limit := 20"
    ],
    "related": [
      [
        "core-clamp",
        "Ограничить размер страницы"
      ]
    ],
    "production": "Типичный баг в обработке конфигурации и ошибок: внутреннее err или limit затеняет внешнее значение, которое потом используется после блока.",
    "interview": "Чем := отличается от = во вложенном блоке?"
  },
  "core-closure": {
    "frames": [
      [
        "Создание",
        [
          "A: count = 10"
        ],
        "a := NewCounter(10)",
        "Возвращённая функция сохраняет доступ к count."
      ],
      [
        "Первый вызов A",
        [
          "A: count = 11"
        ],
        "a() → 11",
        "Изменение сохраняется между вызовами."
      ],
      [
        "Создание B",
        [
          "A: 11",
          "B: 100"
        ],
        "b := NewCounter(100)",
        "Другой вызов создаёт отдельную переменную."
      ],
      [
        "Второй вызов A",
        [
          "A: 12",
          "B: 100"
        ],
        "a() → 12",
        "A меняет только собственный count."
      ],
      [
        "Первый вызов B",
        [
          "A: 12",
          "B: 101"
        ],
        "b() → 101",
        "Счётчики независимы."
      ]
    ],
    "steps": [
      [
        "Создать состояние",
        "count := start",
        "Каждый вызов фабрики создаёт собственную переменную."
      ],
      [
        "Вернуть функциональный литерал",
        "return func() int {",
        "Внутренняя функция имеет доступ к внешней count."
      ],
      [
        "Изменить захваченную переменную",
        "    count++",
        "Состояние сохраняется после завершения NewCounter."
      ],
      [
        "Вернуть новое значение",
        "    return count\n}",
        "При следующем вызове будет использовано обновлённое состояние."
      ]
    ],
    "blocks": [
      "Вернуть новое значение",
      "Создать состояние",
      "Вернуть функциональный литерал",
      "Изменить захваченную переменную"
    ],
    "order": [
      1,
      2,
      3,
      0
    ],
    "blanks": [
      {
        "before": "return func() ",
        "after": " {",
        "options": [
          "int",
          "bool",
          "string"
        ],
        "correct": 0,
        "explain": "Функция возвращает текущее число."
      },
      {
        "before": "count",
        "after": "",
        "options": [
          " = start",
          "++",
          "--"
        ],
        "correct": 1,
        "explain": "Увеличиваем существующее состояние."
      }
    ],
    "partial": "package practice\n\nfunc NewCounter(start int) func() int {\n\tcount := start\n\treturn func() int {\n\t    // TODO: увеличь захваченную переменную\n\t    return count\n\t}\n}\n",
    "bug": "package practice\n\nfunc NewCounter(start int) func() int {\n\treturn func() int {\n\t    count := start\n\t    count++\n\t    return count\n\t}\n}\n",
    "hints": [
      "Верни функцию без аргументов. Каждый вызов увеличивает собственный счётчик на 1 и возвращает новое значение. Два вызова NewCounter создают независимые счётчики.",
      "Каждый вызов фабрики создаёт собственную переменную.",
      "Внутренняя функция имеет доступ к внешней count.",
      "Состояние сохраняется после завершения NewCounter.",
      "count := start"
    ],
    "related": [
      [
        "core-apply",
        "Передать функцию как аргумент"
      ]
    ],
    "production": "Фабрика обработчиков с локальным состоянием. Если одна функция вызывается несколькими горутинами, изменение count требует синхронизации.",
    "interview": "Почему переменная count живёт после возврата NewCounter?"
  },
  "core-variadic": {
    "frames": [
      [
        "Вызов",
        [
          "10",
          "2",
          "3"
        ],
        "SumAll(10,2,3)",
        "Первый аргумент обязателен, остальные собираются в срез."
      ],
      [
        "Начало",
        [
          "2",
          "3"
        ],
        "total = 10",
        "Начинаем с base."
      ],
      [
        "Первый элемент",
        [
          "2",
          "3"
        ],
        "total = 12",
        "Добавляем 2."
      ],
      [
        "Второй элемент",
        [
          "2",
          "3"
        ],
        "total = 15",
        "Добавляем 3."
      ],
      [
        "Без extras",
        [
          "10"
        ],
        "SumAll(10) → 10",
        "Пустой вариативный срез не меняет total."
      ]
    ],
    "steps": [
      [
        "Инициализировать накопитель",
        "total := base",
        "Базовое значение входит в сумму."
      ],
      [
        "Перебрать дополнительные аргументы",
        "for _, v := range values {",
        "Внутри функции values имеет тип []int."
      ],
      [
        "Прибавить значение",
        "    total += v\n}",
        "Суммируем все extras."
      ],
      [
        "Вернуть итог",
        "return total",
        "При отсутствии extras получаем base."
      ]
    ],
    "blocks": [
      "Вернуть итог",
      "Инициализировать накопитель",
      "Перебрать дополнительные аргументы",
      "Прибавить значение"
    ],
    "order": [
      1,
      2,
      3,
      0
    ],
    "blanks": [
      {
        "before": "total := ",
        "after": "",
        "options": [
          "0",
          "base",
          "len(values)"
        ],
        "correct": 1,
        "explain": "Не забываем обязательный аргумент."
      },
      {
        "before": "SumAll(10, nums",
        "after": ")",
        "options": [
          "",
          "...",
          "[]"
        ],
        "correct": 1,
        "explain": "Для передачи среза в variadic используется ... ."
      }
    ],
    "partial": "package practice\n\nfunc SumAll(base int, values ...int) int {\n\ttotal := base\n\tfor _, v := range values {\n\t    // TODO: прибавь очередное значение\n\t    _ = v\n\t}\n\treturn total\n}\n",
    "bug": "package practice\n\nfunc SumAll(base int, values ...int) int {\n\ttotal := 0\n\tfor _, v := range values { total += v }\n\treturn total\n}\n",
    "hints": [
      "Верни base плюс сумму всех дополнительных аргументов values. Без дополнительных аргументов верни base.",
      "Базовое значение входит в сумму.",
      "Внутри функции values имеет тип []int.",
      "Суммируем все extras.",
      "total := base"
    ],
    "related": [
      [
        "core-sum",
        "Сложить числа в списке"
      ]
    ],
    "production": "Вариативные аргументы часто встречаются в форматировании, логировании и небольших helper-функциях. Не изменяй входной срез без явного контракта.",
    "interview": "Как variadic-параметр представлен внутри функции?"
  },
  "core-switch": {
    "frames": [
      [
        "Вход",
        [
          "code = 404"
        ],
        "switch без выражения",
        "Каждый case содержит булево условие."
      ],
      [
        "Проверка 1xx–3xx",
        [
          "false",
          "false",
          "false"
        ],
        "404 не входит в диапазоны",
        "Идём до первого подходящего case."
      ],
      [
        "Проверка 4xx",
        [
          "400",
          "404",
          "499"
        ],
        "400 <= 404 < 500",
        "Условие истинно."
      ],
      [
        "Выход",
        [
          "client_error"
        ],
        "return \"client_error\"",
        "Дальнейшие case не выполняются."
      ],
      [
        "Некорректный код",
        [
          "600"
        ],
        "default → \"invalid\"",
        "Ни один диапазон не подошёл."
      ]
    ],
    "steps": [
      [
        "Выбрать форму switch",
        "switch {",
        "Без выражения switch эквивалентен switch true."
      ],
      [
        "Описать классы 1xx–3xx",
        "case code >= 100 && code < 200: return \"informational\"\ncase code >= 200 && code < 300: return \"success\"\ncase code >= 300 && code < 400: return \"redirect\"",
        "Полуоткрытые диапазоны не пересекаются."
      ],
      [
        "Описать классы ошибок",
        "case code >= 400 && code < 500: return \"client_error\"\ncase code >= 500 && code < 600: return \"server_error\"",
        "Различаем ошибки клиента и сервера."
      ],
      [
        "Обработать остальные значения",
        "default: return \"invalid\"\n}",
        "default выполняется, если нет совпадения."
      ]
    ],
    "blocks": [
      "Обработать остальные значения",
      "Выбрать форму switch",
      "Описать классы 1xx–3xx",
      "Описать классы ошибок"
    ],
    "order": [
      1,
      2,
      3,
      0
    ],
    "blanks": [
      {
        "before": "case code >= 200 && code ",
        "after": " 300:",
        "options": [
          "<",
          "<=",
          ">"
        ],
        "correct": 0,
        "explain": "Код 300 относится к следующему классу."
      },
      {
        "before": "",
        "after": " : return \"invalid\"",
        "options": [
          "else",
          "default",
          "continue"
        ],
        "correct": 1,
        "explain": "default обрабатывает отсутствие совпадения."
      }
    ],
    "partial": "package practice\n\nfunc StatusClass(code int) string {\n\tswitch {\n\tcase code >= 100 && code < 200: return \"informational\"\n\tcase code >= 200 && code < 300: return \"success\"\n\tcase code >= 300 && code < 400: return \"redirect\"\n\t// TODO: добавь классы 4xx и 5xx\n\tdefault: return \"invalid\"\n\t}\n}\n",
    "bug": "package practice\n\nfunc StatusClass(code int) string {\n\tswitch {\n\tcase code >= 100 && code < 200: return \"informational\"\n\tcase code >= 200 && code <= 300: return \"success\"\n\tcase code >= 300 && code < 400: return \"redirect\"\n\tcase code >= 400 && code < 500: return \"client_error\"\n\tcase code >= 500 && code < 600: return \"server_error\"\n\tdefault: return \"invalid\"\n\t}\n}\n",
    "hints": [
      "Верни informational для 100–199, success для 200–299, redirect для 300–399, client_error для 400–499, server_error для 500–599, invalid для остальных значений.",
      "Без выражения switch эквивалентен switch true.",
      "Полуоткрытые диапазоны не пересекаются.",
      "Различаем ошибки клиента и сервера.",
      "switch {"
    ],
    "related": [
      [
        "core-count-positive",
        "Посчитать положительные числа"
      ]
    ],
    "production": "Классификация HTTP-ответов для метрик. Не превращай любой 5xx в автоматический retry: учитывай идемпотентность и политику повторов.",
    "interview": "Как работает switch без выражения и есть ли автоматический fallthrough?"
  }
};
