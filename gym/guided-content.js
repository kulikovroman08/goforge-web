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
  }
};
