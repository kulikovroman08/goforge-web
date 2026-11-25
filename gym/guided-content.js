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
  },
  "core-linear-search": {
    "frames": [
      [
        "Вход",
        [
          "8",
          "3",
          "5",
          "3"
        ],
        "target = 3",
        "Нужен индекс первого совпадения."
      ],
      [
        "Сравнение",
        [
          "8",
          "3",
          "5",
          "3"
        ],
        "i=0, v=8",
        "Не совпало: продолжаем."
      ],
      [
        "Совпадение",
        [
          "8",
          "3",
          "5",
          "3"
        ],
        "i=1, v=3",
        "Возвращаем индекс 1."
      ],
      [
        "Выход",
        [
          "1"
        ],
        "return 1",
        "Второе совпадение не нужно искать."
      ]
    ],
    "steps": [
      [
        "Перебрать срез",
        "for i, v := range values {",
        "Получаем индекс и значение."
      ],
      [
        "Проверить совпадение",
        "if v == target {",
        "Сравниваем значения, а не индекс."
      ],
      [
        "Вернуть первый индекс",
        "return i\n}\n}",
        "Ранний return останавливает поиск."
      ],
      [
        "Сообщить об отсутствии",
        "return -1",
        "-1 не является допустимым индексом среза."
      ]
    ],
    "blocks": [
      "Сообщить об отсутствии",
      "Перебрать срез",
      "Проверить совпадение",
      "Вернуть первый индекс"
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
        "after": " target",
        "options": [
          "=",
          "==",
          "!="
        ],
        "correct": 1,
        "explain": "Нужно сравнение на равенство."
      },
      {
        "before": "return ",
        "after": "",
        "options": [
          "v",
          "i",
          "target"
        ],
        "correct": 1,
        "explain": "По контракту возвращаем индекс."
      }
    ],
    "partial": "package practice\n\nfunc IndexOf(values []int, target int) int {\n\tfor i, v := range values {\n\t // TODO: проверь совпадение и верни индекс\n\t _, _ = i, v\n\t}\n\treturn -1\n}\n",
    "bug": "package practice\n\nfunc IndexOf(values []int, target int) int {\n\tindex := -1\n\tfor i,v := range values { if v == target { index = i } }\n\treturn index\n}\n",
    "hints": [
      "Верни индекс первого элемента, равного target, или -1 при отсутствии. Срез может быть неотсортированным. Не меняй вход.",
      "Получаем индекс и значение.",
      "Сравниваем значения, а не индекс.",
      "Ранний return останавливает поиск.",
      "for i, v := range values {"
    ],
    "related": [
      [
        "core-first-repeat",
        "Найти первый повторяющийся элемент"
      ]
    ],
    "production": "Поиск первого совпадения в небольшом списке уже загруженных записей. Для частых поисков по большому набору рассмотри индекс или map.",
    "interview": "Когда линейный поиск лучше бинарного?"
  },
  "core-binary-search": {
    "frames": [
      [
        "Вход",
        [
          "1",
          "3",
          "3",
          "3",
          "8"
        ],
        "lo=0, hi=5, target=3",
        "Ищем левую границу, hi не включается."
      ],
      [
        "Середина",
        [
          "1",
          "3",
          "3",
          "3",
          "8"
        ],
        "mid=2, values[mid]=3 → hi=2",
        "Совпадение не завершает поиск: слева может быть ещё 3."
      ],
      [
        "Новая середина",
        [
          "1",
          "3"
        ],
        "lo=0, hi=2, mid=1 → hi=1",
        "Снова сужаем правую границу."
      ],
      [
        "Последняя проверка",
        [
          "1"
        ],
        "mid=0, 1<3 → lo=1",
        "Диапазон становится пустым."
      ],
      [
        "Выход",
        [
          "3"
        ],
        "lo=hi=1",
        "Проверяем границу и возвращаем 1."
      ]
    ],
    "steps": [
      [
        "Задать полуоткрытый диапазон",
        "lo, hi := 0, len(values)",
        "Ищем первую позицию со значением не меньше target."
      ],
      [
        "Вычислить середину",
        "for lo < hi {\n mid := lo + (hi-lo)/2",
        "Форма избегает переполнения суммы lo+hi."
      ],
      [
        "Сузить диапазон",
        "if values[mid] < target { lo = mid+1 } else { hi = mid }\n}",
        "При равенстве продолжаем искать слева."
      ],
      [
        "Проверить найденную границу",
        "if lo < len(values) && values[lo] == target { return lo }",
        "Короткое замыкание && защищает от выхода за границу."
      ],
      [
        "Вернуть отсутствие",
        "return -1",
        "Граница может указывать на большее значение или конец."
      ]
    ],
    "blocks": [
      "Вернуть отсутствие",
      "Задать полуоткрытый диапазон",
      "Вычислить середину",
      "Сузить диапазон",
      "Проверить найденную границу"
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
        "before": "mid := lo + (hi-lo)/",
        "after": "",
        "options": [
          "2",
          "1",
          "0"
        ],
        "correct": 0,
        "explain": "Делим диапазон пополам."
      },
      {
        "before": "if values[mid] < target { lo = ",
        "after": " }",
        "options": [
          "mid",
          "mid+1",
          "hi+1"
        ],
        "correct": 1,
        "explain": "mid уже точно меньше цели."
      }
    ],
    "partial": "package practice\n\nfunc LowerBoundIndex(values []int, target int) int {\n\tlo, hi := 0, len(values)\n\tfor lo < hi {\n\t mid := lo + (hi-lo)/2\n\t // TODO: сузь диапазон с учётом values[mid]\n\t _ = mid\n\t break // убери после реализации\n\t}\n\tif lo < len(values) && values[lo] == target { return lo }\n\treturn -1\n}\n",
    "bug": "package practice\n\nfunc LowerBoundIndex(values []int, target int) int {\n\tlo, hi := 0, len(values)\n\tfor lo < hi {\n\t mid := lo + (hi-lo)/2\n\t if values[mid] == target { return mid }\n\t if values[mid] < target { lo = mid+1 } else { hi = mid }\n\t}\n\treturn -1\n}\n",
    "hints": [
      "В отсортированном по возрастанию срезе найди индекс первого target или -1. Повторы допустимы. Сложность O(log n); вход не меняй.",
      "Ищем первую позицию со значением не меньше target.",
      "Форма избегает переполнения суммы lo+hi.",
      "Короткое замыкание && защищает от выхода за границу.",
      "lo, hi := 0, len(values)"
    ],
    "related": [
      [
        "core-linear-search",
        "Найти индекс первого совпадения"
      ]
    ],
    "production": "Поиск границы в отсортированном списке. В стандартной библиотеке есть sort.Search и slices.BinarySearch; ручная реализация полезна для интервью.",
    "interview": "Почему при равенстве нельзя сразу вернуть mid?"
  },
  "core-remove": {
    "frames": [
      [
        "Вход",
        [
          "10",
          "20",
          "30",
          "40"
        ],
        "index=1",
        "Удаляем 20, исходный массив должен остаться прежним."
      ],
      [
        "Левая часть",
        [
          "10"
        ],
        "out=[10]",
        "Копируем элементы до index."
      ],
      [
        "Правая часть",
        [
          "30",
          "40"
        ],
        "out=[10,30,40]",
        "Копируем элементы после index."
      ],
      [
        "Выход",
        [
          "10",
          "30",
          "40"
        ],
        "return out,true",
        "Результат имеет отдельную память."
      ]
    ],
    "steps": [
      [
        "Проверить индекс",
        "if index < 0 || index >= len(values) { return nil, false }",
        "Нельзя использовать отрицательный индекс или len."
      ],
      [
        "Выделить новый срез",
        "out := make([]int, 0, len(values)-1)",
        "Резервируем место для всех оставшихся элементов."
      ],
      [
        "Скопировать префикс",
        "out = append(out, values[:index]...)",
        "Удаляемый элемент не входит в префикс."
      ],
      [
        "Скопировать суффикс",
        "out = append(out, values[index+1:]...)",
        "Начинаем со следующего элемента."
      ],
      [
        "Вернуть результат",
        "return out, true",
        "Сохраняем порядок и независимость."
      ]
    ],
    "blocks": [
      "Вернуть результат",
      "Проверить индекс",
      "Выделить новый срез",
      "Скопировать префикс",
      "Скопировать суффикс"
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
        "before": "values[index+",
        "after": " :]",
        "options": [
          "0",
          "1",
          "2"
        ],
        "correct": 1,
        "explain": "Пропускаем ровно удаляемый элемент."
      },
      {
        "before": "make([]int, 0, len(values)-",
        "after": ")",
        "options": [
          "0",
          "1",
          "2"
        ],
        "correct": 1,
        "explain": "Остаётся на один элемент меньше."
      }
    ],
    "partial": "package practice\n\nfunc RemoveAtCopy(values []int, index int) ([]int, bool) {\n\tif index < 0 || index >= len(values) { return nil, false }\n\tout := make([]int, 0, len(values)-1)\n\tout = append(out, values[:index]...)\n\t// TODO: добавь часть после удаляемого элемента\n\treturn out, true\n}\n",
    "bug": "package practice\n\nfunc RemoveAtCopy(values []int, index int) ([]int, bool) {\n\tif index < 0 || index >= len(values) { return nil, false }\n\treturn append(values[:index], values[index+1:]...), true\n}\n",
    "hints": [
      "Если индекс допустим, верни независимый срез без этого элемента и true. При недопустимом индексе верни nil,false. Порядок остальных элементов сохраняется.",
      "Нельзя использовать отрицательный индекс или len.",
      "Резервируем место для всех оставшихся элементов.",
      "Начинаем со следующего элемента.",
      "if index < 0 || index >= len(values) { return nil, false }"
    ],
    "related": [
      [
        "core-reverse",
        "Развернуть срез без изменения оригинала"
      ]
    ],
    "production": "Удаление записи из списка, который также используется другими компонентами. Копирование защищает исходные элементы; для указателей это только поверхностная копия.",
    "interview": "Почему append(s[:i],s[i+1:]...) меняет исходный массив?"
  },
  "core-transpose": {
    "frames": [
      [
        "Вход",
        [
          "[1,2,3]",
          "[4,5,6]"
        ],
        "rows=2, cols=3",
        "Проверяем, что строки одинаковой длины."
      ],
      [
        "Выделение",
        [
          "[0,0]",
          "[0,0]",
          "[0,0]"
        ],
        "out: 3 строки по 2 числа",
        "Столбцы становятся строками."
      ],
      [
        "Первый столбец",
        [
          "[1,4]",
          "[0,0]",
          "[0,0]"
        ],
        "out[0][i]=matrix[i][0]",
        "Копируем вертикальный столбец в строку."
      ],
      [
        "Остальные",
        [
          "[1,4]",
          "[2,5]",
          "[3,6]"
        ],
        "out[j][i]=matrix[i][j]",
        "Меняем местами индексы."
      ],
      [
        "Выход",
        [
          "[1,4]",
          "[2,5]",
          "[3,6]"
        ],
        "return out,true",
        "Исходная матрица не изменена."
      ]
    ],
    "steps": [
      [
        "Проверить пустой вход",
        "if len(matrix)==0 { return [][]int{}, true }",
        "Не обращаемся к matrix[0], если строк нет."
      ],
      [
        "Проверить прямоугольность",
        "cols := len(matrix[0])\nfor _, row := range matrix { if len(row)!=cols { return nil,false } }",
        "В Go строки [][]int могут иметь разные длины."
      ],
      [
        "Выделить строки результата",
        "out := make([][]int, cols)\nfor j:=0;j<cols;j++ { out[j]=make([]int,len(matrix))",
        "Каждую внутреннюю строку выделяем отдельно."
      ],
      [
        "Перенести элементы",
        "for i:=range matrix { out[j][i]=matrix[i][j] }\n}",
        "Столбец j становится строкой j."
      ],
      [
        "Вернуть результат",
        "return out,true",
        "Размеры поменялись местами."
      ]
    ],
    "blocks": [
      "Вернуть результат",
      "Проверить пустой вход",
      "Проверить прямоугольность",
      "Выделить строки результата",
      "Перенести элементы"
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
        "before": "out[j][i] = matrix[",
        "after": "][j]",
        "options": [
          "j",
          "i",
          "0"
        ],
        "correct": 1,
        "explain": "Индекс строки исходной матрицы становится индексом столбца."
      },
      {
        "before": "out := make([][]int, ",
        "after": ")",
        "options": [
          "len(matrix)",
          "cols",
          "0"
        ],
        "correct": 1,
        "explain": "Число выходных строк равно исходным столбцам."
      }
    ],
    "partial": "package practice\n\nfunc TransposeInts(matrix [][]int) ([][]int, bool) {\n\tif len(matrix)==0 { return [][]int{}, true }\n\tcols := len(matrix[0])\n\tfor _, row := range matrix { if len(row)!=cols { return nil,false } }\n\tout := make([][]int, cols)\n\tfor j:=0;j<cols;j++ { out[j]=make([]int,len(matrix)); for i:=range matrix { /* TODO: перенеси элемент */ _=i } }\n\treturn out,true\n}\n",
    "bug": "package practice\n\nfunc TransposeInts(matrix [][]int) ([][]int, bool) {\n\tif len(matrix)==0 { return [][]int{}, true }\n\tcols := len(matrix[0])\n\tfor _, row := range matrix { if len(row)!=cols { return nil,false } }\n\tout := make([][]int, cols)\n\tfor j:=0;j<cols;j++ { out[j]=make([]int,len(matrix)); for i:=range matrix { out[j][i]=matrix[i][0] } }\n\treturn out,true\n}\n",
    "hints": [
      "Поменяй строки и столбцы местами. Для пустой матрицы или прямоугольной матрицы с нулём столбцов верни пустой результат,true. Если длины строк различаются, верни nil,false. Вход не меняй.",
      "Не обращаемся к matrix[0], если строк нет.",
      "В Go строки [][]int могут иметь разные длины.",
      "Столбец j становится строкой j.",
      "if len(matrix)==0 { return [][]int{}, true }"
    ],
    "related": [
      [
        "core-array",
        "Циклически сдвинуть массив из трёх чисел"
      ]
    ],
    "production": "Преобразование табличных данных из строкового представления в столбцовое. Для больших матриц важны память и порядок обхода.",
    "interview": "Чем [][]int отличается от [2][3]int?"
  },
  "core-bubble": {
    "frames": [
      [
        "Вход",
        [
          "5",
          "2",
          "4"
        ],
        "end=2",
        "Сравниваем соседние элементы."
      ],
      [
        "Первый обмен",
        [
          "2",
          "5",
          "4"
        ],
        "5 > 2",
        "Меняем соседей местами."
      ],
      [
        "Второй обмен",
        [
          "2",
          "4",
          "5"
        ],
        "5 > 4",
        "Максимум дошёл до конца."
      ],
      [
        "Следующий проход",
        [
          "2",
          "4",
          "5"
        ],
        "end=1, обменов нет",
        "Останавливаемся: порядок достигнут."
      ]
    ],
    "steps": [
      [
        "Задать проходы",
        "for end:=len(values)-1;end>0;end-- {",
        "После прохода последний элемент рабочей области на своём месте."
      ],
      [
        "Перебрать соседей",
        "for i:=0;i<end;i++ {",
        "i+1 не превышает end."
      ],
      [
        "Обменять при нарушении порядка",
        "if values[i]>values[i+1] { values[i],values[i+1]=values[i+1],values[i] }\n}\n}",
        "Строгое сравнение не меняет порядок равных элементов."
      ]
    ],
    "blocks": [
      "Обменять при нарушении порядка",
      "Задать проходы",
      "Перебрать соседей"
    ],
    "order": [
      1,
      2,
      0
    ],
    "blanks": [
      {
        "before": "i ",
        "after": " end",
        "options": [
          "<",
          "<=",
          ">"
        ],
        "correct": 0,
        "explain": "Нужен допустимый индекс i+1."
      },
      {
        "before": "if values[i] ",
        "after": " values[i+1]",
        "options": [
          "<",
          ">",
          "=="
        ],
        "correct": 1,
        "explain": "Для возрастания меняем пару при левом большем."
      }
    ],
    "partial": "package practice\n\nfunc BubbleSortInts(values []int) {\n\tfor end:=len(values)-1;end>0;end-- {\n\t for i:=0;i<end;i++ {\n\t  // TODO: сравни соседние элементы и обменяй при необходимости\n\t  _=i\n\t }\n\t}\n}\n",
    "bug": "package practice\n\nfunc BubbleSortInts(values []int) {\n\tfor end:=len(values)-1;end>0;end-- {\n\t for i:=0;i<end;i++ { if values[i]<values[i+1] { values[i],values[i+1]=values[i+1],values[i] } }\n\t}\n}\n",
    "hints": [
      "Отсортируй исходный срез по неубыванию пузырьковой сортировкой. Не выделяй новый массив. Пустой срез допустим.",
      "После прохода последний элемент рабочей области на своём месте.",
      "i+1 не превышает end.",
      "i+1 не превышает end.",
      "for end:=len(values)-1;end>0;end-- {"
    ],
    "related": [
      [
        "core-linear-search",
        "Найти индекс первого совпадения"
      ]
    ],
    "production": "Пузырьковая сортировка полезна для изучения циклов и инвариантов, но в рабочих сервисах обычно выбирают стандартную библиотеку.",
    "interview": "Какова сложность пузырьковой сортировки?"
  },
  "core-insertion-sort": {
    "frames": [
      [
        "Вход",
        [
          "4",
          "2",
          "3"
        ],
        "i=1, key=2",
        "Левый префикс из одного элемента уже отсортирован."
      ],
      [
        "Сдвиг",
        [
          "4",
          "4",
          "3"
        ],
        "j=0, key=2",
        "Сохранили 2 отдельно до перезаписи."
      ],
      [
        "Вставка",
        [
          "2",
          "4",
          "3"
        ],
        "values[0]=2",
        "Префикс из двух чисел отсортирован."
      ],
      [
        "Следующий key",
        [
          "2",
          "4",
          "4"
        ],
        "key=3, j=1",
        "Сдвигаем 4 вправо."
      ],
      [
        "Выход",
        [
          "2",
          "3",
          "4"
        ],
        "values[1]=3",
        "Весь срез отсортирован."
      ]
    ],
    "steps": [
      [
        "Перебрать элементы после первого",
        "for i:=1;i<len(values);i++ {",
        "Префикс до i считаем отсортированным."
      ],
      [
        "Сохранить ключ",
        "key:=values[i]\nj:=i",
        "Сохраняем число до сдвигов."
      ],
      [
        "Сдвинуть большие элементы",
        "for j>0 && values[j-1]>key { values[j]=values[j-1];j-- }",
        "Проверка j>0 защищает индекс j-1."
      ],
      [
        "Вставить ключ",
        "values[j]=key\n}",
        "Префикс становится длиннее на один элемент."
      ]
    ],
    "blocks": [
      "Вставить ключ",
      "Перебрать элементы после первого",
      "Сохранить ключ",
      "Сдвинуть большие элементы"
    ],
    "order": [
      1,
      2,
      3,
      0
    ],
    "blanks": [
      {
        "before": "key := ",
        "after": "",
        "options": [
          "values[i]",
          "i",
          "values[0]"
        ],
        "correct": 0,
        "explain": "Сохраняем вставляемое значение."
      },
      {
        "before": "for j>0 && values[j-1] ",
        "after": " key",
        "options": [
          "<",
          ">",
          "=="
        ],
        "correct": 1,
        "explain": "Сдвигаем только большие значения."
      }
    ],
    "partial": "package practice\n\nfunc InsertionSortInts(values []int) {\n\tfor i:=1;i<len(values);i++ {\n\t key:=values[i]\n\t j:=i\n\t // TODO: сдвигай большие элементы вправо\n\t values[j]=key\n\t}\n}\n",
    "bug": "package practice\n\nfunc InsertionSortInts(values []int) {\n\tfor i:=1;i<len(values);i++ {\n\t j:=i\n\t for j>0 && values[j-1]>values[j] { values[j]=values[j-1];j-- }\n\t}\n}\n",
    "hints": [
      "Отсортируй срез на месте по неубыванию методом вставок. Сохраняй значение вставляемого элемента до сдвигов.",
      "Префикс до i считаем отсортированным.",
      "Сохраняем число до сдвигов.",
      "Проверка j>0 защищает индекс j-1.",
      "for i:=1;i<len(values);i++ {"
    ],
    "related": [
      [
        "core-bubble",
        "Пузырьковая сортировка на месте"
      ]
    ],
    "production": "Сортировка вставками удобна на небольших или почти отсортированных наборах и применяется как часть гибридных алгоритмов.",
    "interview": "Какой инвариант у сортировки вставками?"
  },
  "core-sort-copy": {
    "frames": [
      [
        "Вход",
        [
          "7",
          "2",
          "5"
        ],
        "values=[7,2,5]",
        "Не меняем исходный массив."
      ],
      [
        "Копия",
        [
          "7",
          "2",
          "5"
        ],
        "out=[7,2,5]",
        "Данные находятся в независимом буфере."
      ],
      [
        "Сортировка",
        [
          "2",
          "5",
          "7"
        ],
        "slices.Sort(out)",
        "Библиотека изменяет out на месте."
      ],
      [
        "Результат",
        [
          "2",
          "5",
          "7"
        ],
        "values=[7,2,5]",
        "Оригинал сохранён."
      ]
    ],
    "steps": [
      [
        "Выделить новый срез",
        "out := make([]int,len(values))",
        "Длина равна числу копируемых элементов."
      ],
      [
        "Скопировать вход",
        "copy(out,values)",
        "Копируем значения int."
      ],
      [
        "Отсортировать копию",
        "slices.Sort(out)",
        "Функция изменяет переданный срез на месте."
      ],
      [
        "Вернуть результат",
        "return out",
        "Память независима от входа."
      ]
    ],
    "blocks": [
      "Вернуть результат",
      "Выделить новый срез",
      "Скопировать вход",
      "Отсортировать копию"
    ],
    "order": [
      1,
      2,
      3,
      0
    ],
    "blanks": [
      {
        "before": "copy(out, ",
        "after": ")",
        "options": [
          "values",
          "out",
          "nil"
        ],
        "correct": 0,
        "explain": "Копируем исходные элементы."
      },
      {
        "before": "slices.Sort(",
        "after": ")",
        "options": [
          "values",
          "out",
          "len(out)"
        ],
        "correct": 1,
        "explain": "Сортируем только копию."
      }
    ],
    "partial": "package practice\n\nfunc SortedIntsCopy(values []int) []int {\n\tout := make([]int,len(values))\n\tcopy(out,values)\n\t// TODO: отсортируй out через slices.Sort\n\treturn out\n}\n",
    "bug": "package practice\n\nfunc SortedIntsCopy(values []int) []int {\n\tslices.Sort(values)\n\treturn values\n}\n",
    "hints": [
      "Верни независимый срез с числами по неубыванию. Используй slices.Sort. Исходные элементы не меняй. Пустой вход — пустой результат.",
      "Длина равна числу копируемых элементов.",
      "Копируем значения int.",
      "Функция изменяет переданный срез на месте.",
      "out := make([]int,len(values))"
    ],
    "related": [
      [
        "core-insertion-sort",
        "Сортировка вставками"
      ]
    ],
    "production": "Сортировка списка перед выдачей API без изменения данных, используемых другим компонентом.",
    "interview": "Чем slices.Sort отличается от slices.SortStableFunc?"
  },
  "core-merge-sorted": {
    "frames": [
      [
        "Вход",
        [
          "a: 1,4",
          "b: 2,3,5"
        ],
        "i=0, j=0",
        "Сравниваем первые ещё не обработанные числа."
      ],
      [
        "Первый выбор",
        [
          "1"
        ],
        "i=1, j=0",
        "1 меньше 2."
      ],
      [
        "Следующие выборы",
        [
          "1",
          "2",
          "3"
        ],
        "i=1, j=2",
        "2 и 3 меньше 4."
      ],
      [
        "Последнее сравнение",
        [
          "1",
          "2",
          "3",
          "4"
        ],
        "i=2, j=2",
        "Первый срез исчерпан."
      ],
      [
        "Остаток",
        [
          "1",
          "2",
          "3",
          "4",
          "5"
        ],
        "append(out,b[j:]...)",
        "Добавляем оставшиеся элементы второго среза."
      ]
    ],
    "steps": [
      [
        "Создать результат и индексы",
        "out:=make([]int,0,len(a)+len(b))\ni,j:=0,0",
        "Каждый индекс указывает на следующий кандидат."
      ],
      [
        "Проверить оба диапазона",
        "for i<len(a) && j<len(b) {",
        "Не обращаемся к исчерпанному срезу."
      ],
      [
        "Добавить меньший элемент",
        "if a[i]<=b[j] { out=append(out,a[i]);i++ } else { out=append(out,b[j]);j++ }\n}",
        "Продвигаем только индекс выбранного среза."
      ],
      [
        "Добавить хвосты",
        "out=append(out,a[i:]...)\nout=append(out,b[j:]...)",
        "После цикла один хвост может остаться."
      ],
      [
        "Вернуть результат",
        "return out",
        "Повторы сохраняются."
      ]
    ],
    "blocks": [
      "Вернуть результат",
      "Создать результат и индексы",
      "Проверить оба диапазона",
      "Добавить меньший элемент",
      "Добавить хвосты"
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
        "before": "if a[i] ",
        "after": " b[j]",
        "options": [
          "<=",
          ">",
          "=="
        ],
        "correct": 0,
        "explain": "Выбираем меньший текущий элемент."
      },
      {
        "before": "out=append(out,b[",
        "after": ":]...)",
        "options": [
          "i",
          "j",
          "0"
        ],
        "correct": 1,
        "explain": "Добавляем только необработанный хвост b."
      }
    ],
    "partial": "package practice\n\nfunc MergeSortedInts(a, b []int) []int {\n\tout:=make([]int,0,len(a)+len(b))\n\ti,j:=0,0\n\tfor i<len(a) && j<len(b) {\n\t // TODO: добавь меньший элемент и сдвинь соответствующий индекс\n\t break\n\t}\n\tout=append(out,a[i:]...)\n\tout=append(out,b[j:]...)\n\treturn out\n}\n",
    "bug": "package practice\n\nfunc MergeSortedInts(a, b []int) []int {\n\tout:=make([]int,0,len(a)+len(b))\n\ti,j:=0,0\n\tfor i<len(a) && j<len(b) {\n\t if a[i]<=b[j] { out=append(out,a[i]);i++ } else { out=append(out,b[j]);j++ }\n\t}\n\treturn out\n}\n",
    "hints": [
      "Объедини два отсортированных по неубыванию среза в новый отсортированный срез. Сохрани все повторы. Используй один проход O(n+m), не меняй входы.",
      "Каждый индекс указывает на следующий кандидат.",
      "Не обращаемся к исчерпанному срезу.",
      "После цикла один хвост может остаться.",
      "out:=make([]int,0,len(a)+len(b))\ni,j:=0,0"
    ],
    "related": [
      [
        "core-binary-search",
        "Найти первое совпадение бинарным поиском"
      ]
    ],
    "production": "Слияние отсортированных результатов из двух источников или шардов. Для нескольких потоков можно расширить идею через очередь с приоритетом.",
    "interview": "Почему слияние занимает O(n+m), а не O(n*m)?"
  },
  "core-insert": {
    "frames": [
      [
        "Вход",
        [
          "10",
          "20",
          "30"
        ],
        "index=1, value=99",
        "Вставляем перед старым элементом с индексом 1."
      ],
      [
        "Префикс",
        [
          "10"
        ],
        "out=[10]",
        "Копируем часть до index."
      ],
      [
        "Вставка",
        [
          "10",
          "99"
        ],
        "out=append(out,99)",
        "Добавляем новое число."
      ],
      [
        "Суффикс",
        [
          "10",
          "99",
          "20",
          "30"
        ],
        "out=append(out,values[1:]...)",
        "Копируем всё начиная с прежнего index."
      ],
      [
        "Выход",
        [
          "10",
          "99",
          "20",
          "30"
        ],
        "return out,true",
        "Оригинал [10,20,30] не изменился."
      ]
    ],
    "steps": [
      [
        "Проверить границы",
        "if index<0 || index>len(values) { return nil,false }",
        "Для вставки допустима позиция len, в отличие от удаления."
      ],
      [
        "Выделить результат",
        "out:=make([]int,0,len(values)+1)",
        "Новый массив гарантирует независимость элементов."
      ],
      [
        "Добавить префикс",
        "out=append(out,values[:index]...)",
        "Правая граница не входит в срез."
      ],
      [
        "Вставить число",
        "out=append(out,value)",
        "Один новый элемент в нужной позиции."
      ],
      [
        "Добавить суффикс",
        "out=append(out,values[index:]...)",
        "Сохраняем и старый элемент index."
      ],
      [
        "Вернуть результат",
        "return out,true",
        "Получили на один элемент больше."
      ]
    ],
    "blocks": [
      "Вернуть результат",
      "Проверить границы",
      "Выделить результат",
      "Добавить префикс",
      "Вставить число",
      "Добавить суффикс"
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
        "before": "index ",
        "after": " len(values)",
        "options": [
          ">",
          ">=",
          "=="
        ],
        "correct": 0,
        "explain": "Вставка в конец допустима."
      },
      {
        "before": "out=append(out,values[",
        "after": ":]...)",
        "options": [
          "index",
          "index+1",
          "0"
        ],
        "correct": 0,
        "explain": "Суффикс включает старый элемент index."
      }
    ],
    "partial": "package practice\n\nfunc InsertAtCopy(values []int, index, value int) ([]int, bool) {\n\tif index<0 || index>len(values) { return nil,false }\n\tout:=make([]int,0,len(values)+1)\n\tout=append(out,values[:index]...)\n\t// TODO: добавь value\n\tout=append(out,values[index:]...)\n\treturn out,true\n}\n",
    "bug": "package practice\n\nfunc InsertAtCopy(values []int, index, value int) ([]int, bool) {\n\tif index<0 || index>=len(values) { return nil,false }\n\tout:=make([]int,0,len(values)+1)\n\tout=append(out,values[:index]...)\n\tout=append(out,value)\n\tout=append(out,values[index:]...)\n\treturn out,true\n}\n",
    "hints": [
      "Вставь value перед элементом index, сохрани порядок и не меняй исходный массив. index==len(values) означает добавление в конец. Недопустимый индекс — nil,false.",
      "Для вставки допустима позиция len, в отличие от удаления.",
      "Новый массив гарантирует независимость элементов.",
      "Сохраняем и старый элемент index.",
      "if index<0 || index>len(values) { return nil,false }"
    ],
    "related": [
      [
        "core-remove",
        "Удалить элемент без изменения исходного среза"
      ]
    ],
    "production": "Добавление элемента в упорядоченный список интерфейса без мутации общей коллекции. Для очень больших списков учитывай стоимость копирования.",
    "interview": "Чем диапазон допустимых индексов вставки отличается от удаления?"
  },
  "core-intersection": {
    "frames": [
      [
        "Вход",
        [
          "a: 3,1,3,2",
          "b: 2,3"
        ],
        "members={2,3}",
        "Map хранит кандидатов из b."
      ],
      [
        "Первое число",
        [
          "3"
        ],
        "out=[3], members={2}",
        "3 входит в b; после выдачи удаляем ключ."
      ],
      [
        "Следующие числа",
        [
          "1",
          "3"
        ],
        "out=[3]",
        "1 отсутствует, повтор 3 уже выдан."
      ],
      [
        "Последнее число",
        [
          "2"
        ],
        "out=[3,2]",
        "2 есть в members."
      ],
      [
        "Выход",
        [
          "3",
          "2"
        ],
        "return out",
        "Порядок первого появления в a сохранён."
      ]
    ],
    "steps": [
      [
        "Создать множество b",
        "members:=make(map[int]struct{},len(b))\nfor _,v:=range b { members[v]=struct{}{} }",
        "Проверяем наличие, а не количество."
      ],
      [
        "Создать результат",
        "out:=make([]int,0)",
        "Результат формируется в порядке a."
      ],
      [
        "Перебрать a",
        "for _,v:=range a { if _,ok:=members[v];ok {",
        "Только общие элементы подходят."
      ],
      [
        "Добавить и удалить ключ",
        "out=append(out,v);delete(members,v)\n} }",
        "Удаляем из локальной map, чтобы не выдавать дубли."
      ],
      [
        "Вернуть пересечение",
        "return out",
        "Входные срезы не меняются."
      ]
    ],
    "blocks": [
      "Вернуть пересечение",
      "Создать множество b",
      "Создать результат",
      "Перебрать a",
      "Добавить и удалить ключ"
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
        "before": "if _,ok:=members[v]; ",
        "after": " {",
        "options": [
          "ok",
          "!ok",
          "v"
        ],
        "correct": 0,
        "explain": "Нужен элемент, который есть в обоих множествах."
      },
      {
        "before": "delete(members,",
        "after": ")",
        "options": [
          "v",
          "a",
          "b"
        ],
        "correct": 0,
        "explain": "После выдачи удаляем именно текущий ключ."
      }
    ],
    "partial": "package practice\n\nfunc IntersectInts(a, b []int) []int {\n\tmembers:=make(map[int]struct{},len(b))\n\tfor _,v:=range b { members[v]=struct{}{} }\n\tout:=make([]int,0)\n\tfor _,v:=range a { if _,ok:=members[v];ok { out=append(out,v); /* TODO: исключи повторную выдачу */ } }\n\treturn out\n}\n",
    "bug": "package practice\n\nfunc IntersectInts(a, b []int) []int {\n\tmembers:=make(map[int]struct{},len(b))\n\tfor _,v:=range b { members[v]=struct{}{} }\n\tout:=make([]int,0)\n\tfor _,v:=range a { if _,ok:=members[v];ok { out=append(out,v) } }\n\treturn out\n}\n",
    "hints": [
      "Верни уникальные числа, которые присутствуют в обоих срезах, в порядке первого появления в a. Входы не меняй. Пустой результат допустим.",
      "Проверяем наличие, а не количество.",
      "Результат формируется в порядке a.",
      "Удаляем из локальной map, чтобы не выдавать дубли.",
      "members:=make(map[int]struct{},len(b))\nfor _,v:=range b { members[v]=struct{}{} }"
    ],
    "related": [
      [
        "core-frequency",
        "Посчитать частоту чисел"
      ]
    ],
    "production": "Получить общие ID между двумя наборами. Для пересечения списков прав доступа обязательно учитывай актуальность источников и точный контракт.",
    "interview": "Как получить уникальное пересечение за ожидаемое O(n+m)?"
  },
  "core-difference": {
    "frames": [
      [
        "Вход",
        [
          "a: 3,1,3,2,4",
          "b: 1,4"
        ],
        "blocked={1,4}",
        "Исключаем числа из b."
      ],
      [
        "Первый элемент",
        [
          "3"
        ],
        "out=[3], blocked={1,4,3}",
        "3 разрешено; после добавления отмечаем его."
      ],
      [
        "Следующие элементы",
        [
          "1",
          "3"
        ],
        "out=[3]",
        "1 исключён, 3 уже выдано."
      ],
      [
        "Остаток",
        [
          "2",
          "4"
        ],
        "out=[3,2]",
        "Добавляем 2, пропускаем 4."
      ],
      [
        "Выход",
        [
          "3",
          "2"
        ],
        "return out",
        "Разница A\\B с сохранением порядка."
      ]
    ],
    "steps": [
      [
        "Построить множество исключений",
        "blocked:=make(map[int]struct{},len(b))\nfor _,v:=range b { blocked[v]=struct{}{} }",
        "Все элементы b запрещены к выдаче."
      ],
      [
        "Создать результат",
        "out:=make([]int,0)",
        "Добавляем только разрешённые элементы."
      ],
      [
        "Перебрать a",
        "for _,v:=range a { if _,ok:=blocked[v];ok { continue }",
        "Пропускаем исключения и уже выданные числа."
      ],
      [
        "Добавить и отметить",
        "out=append(out,v);blocked[v]=struct{}{}\n}",
        "Добавленный элемент больше не выдаём."
      ],
      [
        "Вернуть результат",
        "return out",
        "Порядок соответствует первому появлению в a."
      ]
    ],
    "blocks": [
      "Вернуть результат",
      "Построить множество исключений",
      "Создать результат",
      "Перебрать a",
      "Добавить и отметить"
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
        "before": "if _,ok:=blocked[v];ok { ",
        "after": " }",
        "options": [
          "continue",
          "break",
          "return nil"
        ],
        "correct": 0,
        "explain": "Пропускаем только текущий элемент."
      },
      {
        "before": "blocked[v]=",
        "after": "",
        "options": [
          "struct{}{}",
          "false",
          "nil"
        ],
        "correct": 0,
        "explain": "Отмечаем уже выданный элемент."
      }
    ],
    "partial": "package practice\n\nfunc DifferenceInts(a, b []int) []int {\n\tblocked:=make(map[int]struct{},len(b))\n\tfor _,v:=range b { blocked[v]=struct{}{} }\n\tout:=make([]int,0)\n\tfor _,v:=range a { /* TODO: пропусти заблокированное число */ out=append(out,v);blocked[v]=struct{}{} }\n\treturn out\n}\n",
    "bug": "package practice\n\nfunc DifferenceInts(a, b []int) []int {\n\tblocked:=make(map[int]struct{},len(b))\n\tfor _,v:=range b { blocked[v]=struct{}{} }\n\tout:=make([]int,0)\n\tfor _,v:=range a { if _,ok:=blocked[v];ok { continue };out=append(out,v) }\n\treturn out\n}\n",
    "hints": [
      "Верни уникальные числа из a, отсутствующие в b, в порядке первого появления в a. Входы не меняй.",
      "Все элементы b запрещены к выдаче.",
      "Добавляем только разрешённые элементы.",
      "Добавленный элемент больше не выдаём.",
      "blocked:=make(map[int]struct{},len(b))\nfor _,v:=range b { blocked[v]=struct{}{} }"
    ],
    "related": [
      [
        "core-intersection",
        "Найти пересечение множеств"
      ]
    ],
    "production": "Сравнение уже обработанных ID с новым батчем. Локальное множество помогает вычислить недостающие элементы, но не заменяет идемпотентность при конкурентной обработке.",
    "interview": "Коммутативна ли разница множеств?"
  },
  "core-map-merge": {
    "frames": [
      [
        "Вход",
        [
          "a: x=5, y=2",
          "b: x=0, z=7"
        ],
        "out={}",
        "Нужна новая map."
      ],
      [
        "Копируем a",
        [
          "x=5",
          "y=2"
        ],
        "out={x:5,y:2}",
        "Сохраняем исходные настройки."
      ],
      [
        "Копируем b",
        [
          "x=0",
          "y=2",
          "z=7"
        ],
        "out[x]=0",
        "b имеет приоритет, даже если значение ноль."
      ],
      [
        "Выход",
        [
          "x=0",
          "y=2",
          "z=7"
        ],
        "return out",
        "Обе исходные map неизменны."
      ]
    ],
    "steps": [
      [
        "Создать независимую map",
        "out:=make(map[string]int,len(a)+len(b))",
        "Подсказка размера не задаёт точное число элементов."
      ],
      [
        "Перенести a",
        "for k,v:=range a { out[k]=v }",
        "Копируем базовые значения."
      ],
      [
        "Перенести b",
        "for k,v:=range b { out[k]=v }",
        "Присваивание перезаписывает конфликтующие ключи."
      ],
      [
        "Вернуть результат",
        "return out",
        "Ключи и int скопированы; map независима."
      ]
    ],
    "blocks": [
      "Вернуть результат",
      "Создать независимую map",
      "Перенести a",
      "Перенести b"
    ],
    "order": [
      1,
      2,
      3,
      0
    ],
    "blanks": [
      {
        "before": "for k,v:=range ",
        "after": " { out[k]=v }",
        "options": [
          "a",
          "out",
          "b"
        ],
        "correct": 2,
        "explain": "Последней копируем map с приоритетом b."
      },
      {
        "before": "out[",
        "after": "]=v",
        "options": [
          "k",
          "v",
          "len(out)"
        ],
        "correct": 0,
        "explain": "Ключ сохраняется при переносе."
      }
    ],
    "partial": "package practice\n\nfunc MergeQuotas(a, b map[string]int) map[string]int {\n\tout:=make(map[string]int,len(a)+len(b))\n\tfor k,v:=range a { out[k]=v }\n\t// TODO: перенеси b с приоритетом над a\n\treturn out\n}\n",
    "bug": "package practice\n\nfunc MergeQuotas(a, b map[string]int) map[string]int {\n\tout:=make(map[string]int,len(a)+len(b))\n\tfor k,v:=range b { out[k]=v }\n\tfor k,v:=range a { out[k]=v }\n\treturn out\n}\n",
    "hints": [
      "Верни новую map со всеми ключами a и b. При совпадении ключей побеждает b, включая значение 0. Не меняй входы и не разделяй с ними map. Для двух nil верни инициализированную пустую map.",
      "Подсказка размера не задаёт точное число элементов.",
      "Копируем базовые значения.",
      "Присваивание перезаписывает конфликтующие ключи.",
      "out:=make(map[string]int,len(a)+len(b))"
    ],
    "related": [
      [
        "core-lookup",
        "Проверить наличие квоты пользователя"
      ]
    ],
    "production": "Объединение конфигурационных значений с явным приоритетом источника. Если значения содержат срезы или указатели, копирование map не является глубоким.",
    "interview": "Почему out := a не создаёт независимую map?"
  },
  "core-group-length": {
    "frames": [
      [
        "Вход",
        [
          "a",
          "go",
          "b",
          "go"
        ],
        "out={}",
        "Ключ — число байтов."
      ],
      [
        "Первый элемент",
        [
          "1: [a]"
        ],
        "out[1]=append(out[1],\"a\")",
        "Отсутствующий ключ даёт nil-срез, append работает."
      ],
      [
        "Второй элемент",
        [
          "1: [a]",
          "2: [go]"
        ],
        "len(\"go\")=2",
        "Создаём новую группу."
      ],
      [
        "Третий элемент",
        [
          "1: [a,b]",
          "2: [go]"
        ],
        "append(out[1],\"b\")",
        "Сохраняем предыдущее слово."
      ],
      [
        "Выход",
        [
          "1: [a,b]",
          "2: [go,go]"
        ],
        "return out",
        "Дубли и порядок внутри групп сохранены."
      ]
    ],
    "steps": [
      [
        "Создать map",
        "out:=make(map[int][]string)",
        "Значение каждой записи — срез строк."
      ],
      [
        "Перебрать слова",
        "for _,word:=range words {",
        "Каждый элемент обрабатываем один раз."
      ],
      [
        "Определить ключ",
        "n:=len(word)",
        "len строки измеряется в байтах."
      ],
      [
        "Дополнить группу",
        "out[n]=append(out[n],word)\n}",
        "Сохраняем возвращённый срез; новый ключ изначально даёт nil."
      ],
      [
        "Вернуть группы",
        "return out",
        "Порядок внутри групп стабилен, порядок ключей map не гарантируется."
      ]
    ],
    "blocks": [
      "Вернуть группы",
      "Создать map",
      "Перебрать слова",
      "Определить ключ",
      "Дополнить группу"
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
        "before": "out[n] = append(",
        "after": " ,word)",
        "options": [
          "out[n]",
          "words",
          "nil"
        ],
        "correct": 0,
        "explain": "Добавляем к существующей группе."
      },
      {
        "before": "n := ",
        "after": "(word)",
        "options": [
          "cap",
          "len",
          "int"
        ],
        "correct": 1,
        "explain": "Длина строки в байтах."
      }
    ],
    "partial": "package practice\n\nfunc GroupByLength(words []string) map[int][]string {\n\tout:=make(map[int][]string)\n\tfor _,word:=range words {\n\t n:=len(word)\n\t // TODO: добавь слово в группу n\n\t _=n\n\t}\n\treturn out\n}\n",
    "bug": "package practice\n\nfunc GroupByLength(words []string) map[int][]string {\n\tout:=make(map[int][]string)\n\tfor _,word:=range words { out[len(word)]=[]string{word} }\n\treturn out\n}\n",
    "hints": [
      "Верни новую map, где ключ — длина строки в байтах, значение — все строки этой длины в исходном порядке, включая дубли. Пустой вход — инициализированная пустая map.",
      "Значение каждой записи — срез строк.",
      "Каждый элемент обрабатываем один раз.",
      "Сохраняем возвращённый срез; новый ключ изначально даёт nil.",
      "out:=make(map[int][]string)"
    ],
    "related": [
      [
        "core-string-stats",
        "Посчитать байты и руны строки"
      ]
    ],
    "production": "Группировка событий по статусу или владельцу. Для строк заранее согласуй единицу длины: байты, руны или графемы.",
    "interview": "Почему append к отсутствующему ключу работает?"
  },
  "core-map-delete": {
    "frames": [
      [
        "Вход",
        [
          "a:1",
          "b:3",
          "c:5"
        ],
        "min=3, removed=0",
        "Рассматриваем возможный порядок обхода."
      ],
      [
        "Низкая квота",
        [
          "a:1"
        ],
        "delete(quotas,\"a\"), removed=1",
        "1 строго меньше 3."
      ],
      [
        "Граница",
        [
          "b:3"
        ],
        "3 < 3 → false",
        "Ключ b остаётся."
      ],
      [
        "Выше порога",
        [
          "c:5"
        ],
        "5 < 3 → false",
        "Ключ c остаётся."
      ],
      [
        "Выход",
        [
          "b:3",
          "c:5"
        ],
        "return 1",
        "Исходная map изменена согласно контракту."
      ]
    ],
    "steps": [
      [
        "Создать счётчик",
        "removed:=0",
        "Считаем только удалённые ключи."
      ],
      [
        "Обойти map",
        "for k,v:=range quotas {",
        "Порядок обхода не задан и не важен."
      ],
      [
        "Проверить значение",
        "if v<min {",
        "Строгое сравнение сохраняет равные min записи."
      ],
      [
        "Удалить и посчитать",
        "delete(quotas,k);removed++\n}\n}",
        "Удалять текущий ключ во время range разрешено."
      ],
      [
        "Вернуть количество",
        "return removed",
        "При nil map цикл не выполнится."
      ]
    ],
    "blocks": [
      "Вернуть количество",
      "Создать счётчик",
      "Обойти map",
      "Проверить значение",
      "Удалить и посчитать"
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
        "before": "if v ",
        "after": " min",
        "options": [
          "<",
          "<=",
          ">"
        ],
        "correct": 0,
        "explain": "По контракту удаляем строго меньшие."
      },
      {
        "before": "delete(quotas,",
        "after": ")",
        "options": [
          "v",
          "k",
          "min"
        ],
        "correct": 1,
        "explain": "delete принимает ключ map."
      }
    ],
    "partial": "package practice\n\nfunc RemoveLowQuotas(quotas map[string]int, min int) int {\n\tremoved:=0\n\tfor k,v:=range quotas {\n\t if v<min {\n\t // TODO: удали ключ и обнови счётчик\n\t _=k\n\t }\n\t}\n\treturn removed\n}\n",
    "bug": "package practice\n\nfunc RemoveLowQuotas(quotas map[string]int, min int) int {\n\tremoved:=0\n\tfor k,v:=range quotas { if v<=min { delete(quotas,k);removed++ } }\n\treturn removed\n}\n",
    "hints": [
      "Удали из переданной map все записи со значением строго меньше min. Верни количество удалённых ключей. Значение, равное min, оставь. Nil map допустима.",
      "Считаем только удалённые ключи.",
      "Порядок обхода не задан и не важен.",
      "Удалять текущий ключ во время range разрешено.",
      "removed:=0"
    ],
    "related": [
      [
        "core-lookup",
        "Проверить наличие квоты пользователя"
      ]
    ],
    "production": "Очистка локальных наборов настроек по предикату. Для общей map с конкурентным доступом нужна синхронизация; для сохранения оригинала сначала сделай копию.",
    "interview": "Можно ли удалять ключи map во время range?"
  },
  "core-deep-map": {
    "frames": [
      [
        "Вход",
        [
          "a → [1,2]",
          "b → nil"
        ],
        "groups",
        "Значения map — дескрипторы срезов."
      ],
      [
        "Поверхностная копия",
        [
          "out.a → тот же массив"
        ],
        "out[k]=v",
        "Новая map, но backing array общий."
      ],
      [
        "Независимая копия",
        [
          "out.a → [0,0]"
        ],
        "dst:=make([]int,2)",
        "Создаём новый массив для каждой группы."
      ],
      [
        "Копируем",
        [
          "out.a → [1,2]",
          "out.b → nil"
        ],
        "copy(dst,v)",
        "Сохраняем данные и nil-контракт."
      ],
      [
        "Проверка",
        [
          "out.a[0]=9",
          "groups.a[0]=1"
        ],
        "оригинал не изменён",
        "Независимость вложенных срезов обеспечена."
      ]
    ],
    "steps": [
      [
        "Выделить map",
        "out:=make(map[string][]int,len(groups))",
        "Внешняя коллекция независима."
      ],
      [
        "Перебрать записи",
        "for k,v:=range groups {",
        "Каждое значение — отдельный срез."
      ],
      [
        "Сохранить nil",
        "if v==nil { out[k]=nil;continue }",
        "Не превращаем nil в пустой не nil срез."
      ],
      [
        "Создать и заполнить копию",
        "dst:=make([]int,len(v));copy(dst,v)",
        "Для int достаточно копирования элементов."
      ],
      [
        "Записать и вернуть",
        "out[k]=dst\n}\nreturn out",
        "Независимость сохраняется и при изменении вложенного массива."
      ]
    ],
    "blocks": [
      "Записать и вернуть",
      "Выделить map",
      "Перебрать записи",
      "Сохранить nil",
      "Создать и заполнить копию"
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
        "before": "dst:=make([]int,",
        "after": ")",
        "options": [
          "cap(groups)",
          "len(v)",
          "0"
        ],
        "correct": 1,
        "explain": "copy ограничен длиной назначения."
      },
      {
        "before": "copy(dst,",
        "after": ")",
        "options": [
          "v",
          "dst",
          "groups"
        ],
        "correct": 0,
        "explain": "Копируем текущий вложенный срез."
      }
    ],
    "partial": "package practice\n\nfunc CloneGroups(groups map[string][]int) map[string][]int {\n\tout:=make(map[string][]int,len(groups))\n\tfor k,v:=range groups {\n\t if v==nil { out[k]=nil;continue }\n\t dst:=make([]int,len(v))\n\t // TODO: перенеси элементы v в dst\n\t out[k]=dst\n\t}\n\treturn out\n}\n",
    "bug": "package practice\n\nfunc CloneGroups(groups map[string][]int) map[string][]int {\n\tout:=make(map[string][]int,len(groups))\n\tfor k,v:=range groups { out[k]=v }\n\treturn out\n}\n",
    "hints": [
      "Верни независимую map с независимыми backing arrays всех ненулевых срезов. Сохрани nil-срезы и отличие пустого не nil среза от nil. Вход не меняй; nil map превращается в пустую не nil map.",
      "Внешняя коллекция независима.",
      "Каждое значение — отдельный срез.",
      "Для int достаточно копирования элементов.",
      "out:=make(map[string][]int,len(groups))"
    ],
    "related": [
      [
        "core-map-merge",
        "Объединить две map с приоритетом"
      ]
    ],
    "production": "Создание снимка локального состояния с коллекциями значений. Для указателей, вложенных map и структур с ссылочными полями требуется отдельный контракт копирования; конкурентное чтение оригинала должно быть безопасным.",
    "interview": "Почему maps.Clone недостаточно для map[string][]int?"
  },
  "core-sorted-keys": {
    "frames": [
      [
        "Вход",
        [
          "z:7",
          "a:2",
          "m:0"
        ],
        "quotas",
        "Map не обещает порядок обхода."
      ],
      [
        "Собираем ключи",
        [
          "z",
          "a",
          "m"
        ],
        "keys=[z,a,m]",
        "Один из возможных порядков range."
      ],
      [
        "Сортируем",
        [
          "a",
          "m",
          "z"
        ],
        "slices.Sort(keys)",
        "Сравниваем строки в порядке Go."
      ],
      [
        "Выход",
        [
          "a",
          "m",
          "z"
        ],
        "return keys",
        "Результат детерминирован для того же набора ключей."
      ]
    ],
    "steps": [
      [
        "Создать пустой срез",
        "keys:=make([]string,0,len(quotas))",
        "Нулевая длина нужна для append, cap резервирует место."
      ],
      [
        "Собрать ключи",
        "for k:=range quotas { keys=append(keys,k) }",
        "Один результат range по map — ключ."
      ],
      [
        "Отсортировать",
        "slices.Sort(keys)",
        "Сортировка устраняет зависимость от порядка range."
      ],
      [
        "Вернуть результат",
        "return keys",
        "Значения map не используются."
      ]
    ],
    "blocks": [
      "Вернуть результат",
      "Создать пустой срез",
      "Собрать ключи",
      "Отсортировать"
    ],
    "order": [
      1,
      2,
      3,
      0
    ],
    "blanks": [
      {
        "before": "make([]string,",
        "after": ",len(quotas))",
        "options": [
          "0",
          "len(quotas)",
          "1"
        ],
        "correct": 0,
        "explain": "Начинаем без элементов, иначе append добавит лишние пустые строки."
      },
      {
        "before": "for ",
        "after": " :=range quotas",
        "options": [
          "k",
          "v,ok",
          "len"
        ],
        "correct": 0,
        "explain": "Один результат range — ключ."
      }
    ],
    "partial": "package practice\n\nfunc SortedQuotaKeys(quotas map[string]int) []string {\n\tkeys:=make([]string,0,len(quotas))\n\tfor k:=range quotas { keys=append(keys,k) }\n\t// TODO: отсортируй ключи\n\treturn keys\n}\n",
    "bug": "package practice\n\nfunc SortedQuotaKeys(quotas map[string]int) []string {\n\tkeys:=make([]string,len(quotas))\n\tfor k:=range quotas { keys=append(keys,k) }\n\tslices.Sort(keys)\n\treturn keys\n}\n",
    "hints": [
      "Верни новый срез всех ключей map в лексикографическом порядке Go. Не меняй map; nil map даёт пустой результат.",
      "Нулевая длина нужна для append, cap резервирует место.",
      "Один результат range по map — ключ.",
      "Сортировка устраняет зависимость от порядка range.",
      "keys:=make([]string,0,len(quotas))"
    ],
    "related": [
      [
        "core-sort-copy",
        "Отсортировать независимую копию"
      ]
    ],
    "production": "Детерминированный вывод диагностических данных, стабильные обходы узлов и сравнимые отчёты. Лексикографический порядок Go не равен языковой сортировке для всех локалей.",
    "interview": "Как получить детерминированный порядок обхода map?"
  }
};
