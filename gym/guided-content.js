window.GOFORGE_GUIDES ={
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
  },
  "core-recursive-sum": {
    "frames": [
      [
        "Первый вызов",
        [
          "2",
          "3",
          "4"
        ],
        "2 + RecursiveSum([3,4])",
        "Оставляем первый элемент и уменьшаем задачу."
      ],
      [
        "Второй вызов",
        [
          "3",
          "4"
        ],
        "3 + RecursiveSum([4])",
        "Предыдущий вызов ждёт результат."
      ],
      [
        "Третий вызов",
        [
          "4"
        ],
        "4 + RecursiveSum([])",
        "Хвост становится пустым."
      ],
      [
        "Базовый случай",
        [
          "[]"
        ],
        "return 0",
        "Рекурсия заканчивается."
      ],
      [
        "Возврат",
        [
          "4",
          "7",
          "9"
        ],
        "4+0 → 3+4 → 2+7",
        "Результаты возвращаются в обратном порядке."
      ]
    ],
    "steps": [
      [
        "Описать базовый случай",
        "if len(values)==0 { return 0 }",
        "Останавливаем рекурсию до обращения по индексу."
      ],
      [
        "Уменьшить задачу",
        "values[1:]",
        "Хвост короче входа на один элемент."
      ],
      [
        "Объединить результаты",
        "return values[0]+RecursiveSum(values[1:])",
        "Сумма равна первому числу плюс сумма хвоста."
      ]
    ],
    "blocks": [
      "Объединить результаты",
      "Описать базовый случай",
      "Уменьшить задачу"
    ],
    "order": [
      1,
      2,
      0
    ],
    "blanks": [
      {
        "before": "if len(values)==",
        "after": " { return 0 }",
        "options": [
          "0",
          "1",
          "2"
        ],
        "correct": 0,
        "explain": "Пустой срез завершает рекурсию."
      },
      {
        "before": "RecursiveSum(values[",
        "after": ":])",
        "options": [
          "0",
          "1",
          "2"
        ],
        "correct": 1,
        "explain": "Убираем ровно первый элемент."
      }
    ],
    "partial": "package practice\n\nfunc RecursiveSum(values []int) int {\n\tif len(values)==0 { return 0 }\n\t// TODO: сложи первый элемент и сумму хвоста\n\treturn values[0]\n}\n",
    "bug": "package practice\n\nfunc RecursiveSum(values []int) int {\n\tif len(values)<=1 { return 0 }\n\treturn values[0]+RecursiveSum(values[1:])\n}\n",
    "hints": [
      "Верни сумму всех чисел рекурсивно, без циклов. Пустой срез даёт 0.",
      "Останавливаем рекурсию до обращения по индексу.",
      "Хвост короче входа на один элемент.",
      "Сумма равна первому числу плюс сумма хвоста.",
      "if len(values)==0 { return 0 }"
    ],
    "related": [
      [
        "core-sum",
        "Сложить числа в списке"
      ]
    ],
    "production": "Рекурсия удобна для деревьев; для обычного длинного среза итерация обычно экономнее по стеку. Не используй неограниченную глубину для внешнего ввода.",
    "interview": "Какие условия нужны для завершения рекурсии?"
  },
  "core-named-results": {
    "frames": [
      [
        "Вход",
        [
          "a=7",
          "b=3"
        ],
        "quotient=0, remainder=0, ok=false",
        "Именованные результаты имеют нулевые значения."
      ],
      [
        "Деление",
        [
          "2",
          "0",
          "false"
        ],
        "quotient=7/3=2",
        "Целочисленное деление усекает к нулю."
      ],
      [
        "Остаток",
        [
          "2",
          "1",
          "false"
        ],
        "remainder=7%3=1",
        "Сохраняем остаток."
      ],
      [
        "Успех",
        [
          "2",
          "1",
          "true"
        ],
        "ok=true; return",
        "Пустой return возвращает текущие значения результатов."
      ]
    ],
    "steps": [
      [
        "Защитить деление",
        "if b==0 { return }",
        "Нулевые именованные результаты уже соответствуют ошибке."
      ],
      [
        "Вычислить частное",
        "quotient=a/b",
        "Целочисленное деление усекает к нулю."
      ],
      [
        "Вычислить остаток",
        "remainder=a%b",
        "Остаток имеет знак делимого или равен нулю."
      ],
      [
        "Отметить успех",
        "ok=true\nreturn",
        "Пустой return возвращает именованные результаты."
      ]
    ],
    "blocks": [
      "Отметить успех",
      "Защитить деление",
      "Вычислить частное",
      "Вычислить остаток"
    ],
    "order": [
      1,
      2,
      3,
      0
    ],
    "blanks": [
      {
        "before": "remainder=a ",
        "after": " b",
        "options": [
          "/",
          "%",
          "*"
        ],
        "correct": 1,
        "explain": "Оператор % вычисляет остаток."
      },
      {
        "before": "ok=",
        "after": "",
        "options": [
          "true",
          "false",
          "nil"
        ],
        "correct": 0,
        "explain": "Отмечаем успешное деление."
      }
    ],
    "partial": "package practice\n\nfunc DivideParts(a, b int) (quotient, remainder int, ok bool) {\n\tif b==0 { return }\n\tquotient=a/b\n\t// TODO: вычисли остаток и установи ok\n\treturn\n}\n",
    "bug": "package practice\n\nfunc DivideParts(a, b int) (quotient, remainder int, ok bool) {\n\tif b==0 { return }\n\tquotient=a/b\n\tremainder=a%b\n\treturn\n}\n",
    "hints": [
      "Верни частное, остаток и true. При b==0 верни 0,0,false. Используй именованные результаты. Деление следует правилам Go.",
      "Нулевые именованные результаты уже соответствуют ошибке.",
      "Целочисленное деление усекает к нулю.",
      "Пустой return возвращает именованные результаты.",
      "if b==0 { return }"
    ],
    "related": [
      [
        "core-lookup",
        "Проверить наличие квоты пользователя"
      ]
    ],
    "production": "Именованные результаты помогают документировать несколько возвращаемых значений, но длинные функции с naked return сложнее читать.",
    "interview": "Чем именованные результаты отличаются от обычных?"
  },
  "core-defer-result": {
    "frames": [
      [
        "Вход",
        [
          "base=10",
          "bonus=3"
        ],
        "score=0",
        "Именованный результат начинается с нуля."
      ],
      [
        "Присваивание",
        [
          "score=10"
        ],
        "score=base",
        "Подготовили результат."
      ],
      [
        "Регистрация",
        [
          "defer"
        ],
        "func(){ score+=bonus }",
        "Тело замыкания ещё не выполнено."
      ],
      [
        "Return",
        [
          "score=10"
        ],
        "начинается выход",
        "Отложенная функция выполняется до передачи результата."
      ],
      [
        "Выход",
        [
          "score=13"
        ],
        "return 13",
        "Замыкание изменило именованный результат."
      ]
    ],
    "steps": [
      [
        "Установить результат",
        "score=base",
        "Записываем исходное значение."
      ],
      [
        "Зарегистрировать замыкание",
        "defer func(){ score+=bonus }()",
        "Замыкание обращается к переменной результата."
      ],
      [
        "Выйти из функции",
        "return",
        "Перед передачей результата выполняется defer."
      ]
    ],
    "blocks": [
      "Выйти из функции",
      "Установить результат",
      "Зарегистрировать замыкание"
    ],
    "order": [
      1,
      2,
      0
    ],
    "blanks": [
      {
        "before": "",
        "after": " func(){ score+=bonus }()",
        "options": [
          "defer",
          "go",
          "return"
        ],
        "correct": 0,
        "explain": "Отложенный вызов выполняется при выходе."
      },
      {
        "before": "func(){ ",
        "after": "+=bonus }",
        "options": [
          "base",
          "score",
          "bonus"
        ],
        "correct": 1,
        "explain": "Изменяем переменную результата."
      }
    ],
    "partial": "package practice\n\nfunc FinalScore(base, bonus int) (score int) {\n\tscore=base\n\tdefer func(){\n\t // TODO: обнови именованный результат\n\t}()\n\treturn\n}\n",
    "bug": "package practice\n\nfunc FinalScore(base, bonus int) (score int) {\n\tscore=base\n\tdefer func(v int){ v+=bonus }(score)\n\treturn\n}\n",
    "hints": [
      "Присвой score значение base и зарегистрируй defer с замыканием, которое добавляет bonus к именованному результату перед выходом. Итог base+bonus.",
      "Записываем исходное значение.",
      "Замыкание обращается к переменной результата.",
      "Перед передачей результата выполняется defer.",
      "score=base"
    ],
    "related": [
      [
        "core-named-results",
        "Вернуть частное и остаток"
      ]
    ],
    "production": "Типичный полезный сценарий — присоединение ошибки Close к именованной error. Не скрывай бизнес-логику в defer без необходимости.",
    "interview": "Когда выполняется defer относительно return?"
  },
  "core-pointer-update": {
    "frames": [
      [
        "Вход",
        [
          "x=10",
          "delta=3"
        ],
        "value=&x",
        "Указатель содержит адрес x."
      ],
      [
        "Проверка",
        [
          "value != nil"
        ],
        "адрес допустим",
        "Не разыменовываем nil."
      ],
      [
        "Изменение",
        [
          "x=13"
        ],
        "*value += 3",
        "Записываем в переменную вызывающего кода."
      ],
      [
        "Выход",
        [
          "true"
        ],
        "x=13",
        "Изменение видно снаружи функции."
      ]
    ],
    "steps": [
      [
        "Проверить указатель",
        "if value==nil { return false }",
        "Разыменование nil вызывает panic."
      ],
      [
        "Изменить значение",
        "*value+=delta",
        "Звёздочка обращается к числу по адресу."
      ],
      [
        "Сообщить успех",
        "return true",
        "Изменение выполнено."
      ]
    ],
    "blocks": [
      "Сообщить успех",
      "Проверить указатель",
      "Изменить значение"
    ],
    "order": [
      1,
      2,
      0
    ],
    "blanks": [
      {
        "before": "if value==",
        "after": " { return false }",
        "options": [
          "0",
          "nil",
          "false"
        ],
        "correct": 1,
        "explain": "Нулевое значение указателя — nil."
      },
      {
        "before": "",
        "after": "value+=delta",
        "options": [
          "&",
          "*",
          ""
        ],
        "correct": 1,
        "explain": "Разыменование позволяет записать число."
      }
    ],
    "partial": "package practice\n\nfunc AddToValue(value *int, delta int) bool {\n\tif value==nil { return false }\n\t// TODO: измени число по адресу\n\treturn true\n}\n",
    "bug": "package practice\n\nfunc AddToValue(value *int, delta int) bool {\n\tif value==nil { return false }\n\tlocal:=*value\n\tlocal+=delta\n\treturn true\n}\n",
    "hints": [
      "Если value не nil, увеличь число по адресу на delta и верни true. Для nil верни false без panic.",
      "Разыменование nil вызывает panic.",
      "Звёздочка обращается к числу по адресу.",
      "Изменение выполнено.",
      "if value==nil { return false }"
    ],
    "related": [
      [
        "core-swap",
        "Поменять числа через указатели"
      ]
    ],
    "production": "Обновление небольшого mutable-состояния через указатель. При конкурентном доступе необходима синхронизация, а не просто указатель.",
    "interview": "Передаются ли указатели по ссылке в Go?"
  },
  "core-element-pointer": {
    "frames": [
      [
        "Вход",
        [
          "8",
          "3",
          "3"
        ],
        "target=3",
        "Нужен адрес элемента, а не копии числа."
      ],
      [
        "Обход",
        [
          "8",
          "3",
          "3"
        ],
        "i=0, values[0]=8",
        "Не совпало."
      ],
      [
        "Совпадение",
        [
          "8",
          "3",
          "3"
        ],
        "i=1, &values[1]",
        "Возвращаем адрес первого совпадения."
      ],
      [
        "Запись через указатель",
        [
          "8",
          "99",
          "3"
        ],
        "*p=99",
        "Исходный элемент с индексом 1 меняется."
      ]
    ],
    "steps": [
      [
        "Перебирать индексы",
        "for i:=range values {",
        "Индекс позволяет обратиться к самому элементу."
      ],
      [
        "Найти совпадение",
        "if values[i]==target {",
        "Сравниваем значение исходного элемента."
      ],
      [
        "Вернуть адрес",
        "return &values[i]\n}\n}",
        "Адрес переменной v из range указывает на копию."
      ],
      [
        "Вернуть отсутствие",
        "return nil",
        "Нет совпадений — нет адреса."
      ]
    ],
    "blocks": [
      "Вернуть отсутствие",
      "Перебирать индексы",
      "Найти совпадение",
      "Вернуть адрес"
    ],
    "order": [
      1,
      2,
      3,
      0
    ],
    "blanks": [
      {
        "before": "return &",
        "after": "[i]",
        "options": [
          "values",
          "target",
          "i"
        ],
        "correct": 0,
        "explain": "Нужен адрес элемента массива."
      },
      {
        "before": "return ",
        "after": "",
        "options": [
          "0",
          "nil",
          "target"
        ],
        "correct": 1,
        "explain": "Отсутствующий указатель — nil."
      }
    ],
    "partial": "package practice\n\nfunc FindIntPointer(values []int, target int) *int {\n\tfor i:=range values {\n\t if values[i]==target {\n\t  // TODO: верни адрес элемента\n\t  return nil\n\t }\n\t}\n\treturn nil\n}\n",
    "bug": "package practice\n\nfunc FindIntPointer(values []int, target int) *int {\n\tfor _,v:=range values { if v==target { return &v } }\n\treturn nil\n}\n",
    "hints": [
      "Верни указатель на первый элемент исходного среза, равный target, или nil. Изменение через возвращённый указатель должно менять именно элемент входного массива.",
      "Индекс позволяет обратиться к самому элементу.",
      "Сравниваем значение исходного элемента.",
      "Нет совпадений — нет адреса.",
      "for i:=range values {\nif values[i]==target {\nreturn &values[i]\n}\n}\nreturn nil"
    ],
    "related": [
      [
        "core-linear-search",
        "Найти индекс первого совпадения"
      ]
    ],
    "production": "Указатель на элемент может удерживать backing array. После append с перераспределением он продолжает указывать на старый массив, а не на новый элемент среза.",
    "interview": "Почему &v из for _, v := range s не равен &s[i]?"
  },
  "core-reverse-runes": {
    "frames": [
      [
        "Вход",
        [
          "A",
          "я",
          "🙂"
        ],
        "s=\"Aя🙂\", len(s)=7",
        "Байты и Unicode code points — разные единицы."
      ],
      [
        "Декодирование",
        [
          "A",
          "я",
          "🙂"
        ],
        "[]rune(s), len=3",
        "Получаем изменяемый срез code points."
      ],
      [
        "Обмен",
        [
          "🙂",
          "я",
          "A"
        ],
        "i=0, j=2",
        "Меняем крайние руны."
      ],
      [
        "Выход",
        [
          "🙂",
          "я",
          "A"
        ],
        "string(runes)",
        "Кодируем руны обратно в UTF-8."
      ]
    ],
    "steps": [
      [
        "Декодировать строку",
        "runes:=[]rune(s)",
        "Индексы среза рун соответствуют code points."
      ],
      [
        "Задать два индекса",
        "for i,j:=0,len(runes)-1;i<j;i,j=i+1,j-1 {",
        "Движемся навстречу от двух краёв."
      ],
      [
        "Обменять элементы",
        "runes[i],runes[j]=runes[j],runes[i]\n}",
        "Меняем руны, а не байты."
      ],
      [
        "Закодировать результат",
        "return string(runes)",
        "Преобразование восстанавливает UTF-8."
      ]
    ],
    "blocks": [
      "Закодировать результат",
      "Декодировать строку",
      "Задать два индекса",
      "Обменять элементы"
    ],
    "order": [
      1,
      2,
      3,
      0
    ],
    "blanks": [
      {
        "before": "runes := []",
        "after": "(s)",
        "options": [
          "byte",
          "rune",
          "int"
        ],
        "correct": 1,
        "explain": "Нужно переставлять целые code points."
      },
      {
        "before": "return ",
        "after": "(runes)",
        "options": [
          "string",
          "int",
          "byte"
        ],
        "correct": 0,
        "explain": "Строка создаётся из последовательности рун."
      }
    ],
    "partial": "package practice\n\nfunc ReverseRunes(s string) string {\n\trunes:=[]rune(s)\n\tfor i,j:=0,len(runes)-1;i<j;i,j=i+1,j-1 {\n\t // TODO: поменяй элементы i и j\n\t}\n\treturn string(runes)\n}\n",
    "bug": "package practice\n\nfunc ReverseRunes(s string) string {\n\tbytes:=[]byte(s)\n\tfor i,j:=0,len(bytes)-1;i<j;i,j=i+1,j-1 { bytes[i],bytes[j]=bytes[j],bytes[i] }\n\treturn string(bytes)\n}\n",
    "hints": [
      "Верни строку с обратным порядком Unicode code points. Вход интерпретируй как []rune(s), включая замену некорректного UTF-8 на U+FFFD. Не требуется сохранять графемные кластеры.",
      "Индексы среза рун соответствуют code points.",
      "Движемся навстречу от двух краёв.",
      "Преобразование восстанавливает UTF-8.",
      "runes:=[]rune(s)\nfor i,j:=0,len(runes)-1;i<j;i,j=i+1,j-1 {\nrunes[i],runes[j]=runes[j],runes[i]\n}\nreturn string(runes)"
    ],
    "related": [
      [
        "core-string-stats",
        "Посчитать байты и руны строки"
      ]
    ],
    "production": "Разворот code points полезен для изучения Unicode, но не подходит для корректного разворота всех видимых символов: emoji ZWJ и combining marks требуют сегментации графем.",
    "interview": "Почему разворот []byte ломает UTF-8?"
  },
  "core-palindrome": {
    "frames": [
      [
        "Вход",
        [
          "т",
          "о",
          "п",
          "о",
          "т"
        ],
        "i=0, j=4",
        "Сравниваем крайние code points."
      ],
      [
        "Первая пара",
        [
          "т",
          "о",
          "п",
          "о",
          "т"
        ],
        "т == т",
        "Оба индекса движутся внутрь."
      ],
      [
        "Вторая пара",
        [
          "т",
          "о",
          "п",
          "о",
          "т"
        ],
        "о == о",
        "Пары совпадают."
      ],
      [
        "Центр",
        [
          "п"
        ],
        "i=j=2",
        "Центральный элемент не требует сравнения."
      ],
      [
        "Выход",
        [
          "true"
        ],
        "return true",
        "Все зеркальные пары равны."
      ]
    ],
    "steps": [
      [
        "Декодировать руны",
        "runes:=[]rune(s)",
        "Сравниваем code points, а не байты."
      ],
      [
        "Перебирать зеркальные пары",
        "for i,j:=0,len(runes)-1;i<j;i,j=i+1,j-1 {",
        "Доходим до середины."
      ],
      [
        "Остановиться при несовпадении",
        "if runes[i]!=runes[j] { return false }\n}",
        "Одного несовпадения достаточно."
      ],
      [
        "Подтвердить результат",
        "return true",
        "Пустой ввод и одиночная руна тоже проходят."
      ]
    ],
    "blocks": [
      "Подтвердить результат",
      "Декодировать руны",
      "Перебирать зеркальные пары",
      "Остановиться при несовпадении"
    ],
    "order": [
      1,
      2,
      3,
      0
    ],
    "blanks": [
      {
        "before": "if runes[i] ",
        "after": " runes[j]",
        "options": [
          "==",
          "!=",
          "<"
        ],
        "correct": 1,
        "explain": "При несовпадении палиндром невозможен."
      },
      {
        "before": "for i,j:=0,len(runes)-1; i ",
        "after": " j",
        "options": [
          "<",
          ">",
          "=="
        ],
        "correct": 0,
        "explain": "Сравниваем пары до середины."
      }
    ],
    "partial": "package practice\n\nfunc IsRunePalindrome(s string) bool {\n\trunes:=[]rune(s)\n\tfor i,j:=0,len(runes)-1;i<j;i,j=i+1,j-1 {\n\t // TODO: сравни пару рун\n\t _,_=i,j\n\t}\n\treturn len(runes)==0\n}\n",
    "bug": "package practice\n\nfunc IsRunePalindrome(s string) bool {\n\tfor i,j:=0,len(s)-1;i<j;i,j=i+1,j-1 { if s[i]!=s[j] { return false } }\n\treturn true\n}\n",
    "hints": [
      "Проверь, совпадает ли последовательность []rune(s) с обратной. Регистр, пробелы и знаки значимы. Пустая строка — палиндром. Нормализация Unicode не нужна.",
      "Сравниваем code points, а не байты.",
      "Доходим до середины.",
      "Пустой ввод и одиночная руна тоже проходят.",
      "runes:=[]rune(s)\nfor i,j:=0,len(runes)-1;i<j;i,j=i+1,j-1 {\nif runes[i]!=runes[j] { return false }\n}\nreturn true"
    ],
    "related": [
      [
        "core-reverse-runes",
        "Развернуть строку по Unicode code points"
      ]
    ],
    "production": "Сравнение строк требует явного контракта: учитываются ли регистр, пробелы, каноническая эквивалентность и графемы. Не нормализуй данные молча.",
    "interview": "Можно ли проверить UTF-8 палиндром без выделения []rune?"
  },
  "core-count-substring": {
    "frames": [
      [
        "Вход",
        [
          "a",
          "a",
          "a",
          "a",
          "a"
        ],
        "needle=\"aa\", count=0",
        "Считаем неперекрывающиеся вхождения."
      ],
      [
        "Первое совпадение",
        [
          "a",
          "a",
          "a"
        ],
        "i=0, count=1",
        "Отбрасываем найденные два байта."
      ],
      [
        "Второе совпадение",
        [
          "a"
        ],
        "i=0, count=2",
        "Следующий поиск начинается после предыдущего."
      ],
      [
        "Выход",
        [
          "2"
        ],
        "strings.Index(\"a\",\"aa\")=-1",
        "Больше совпадений нет."
      ]
    ],
    "steps": [
      [
        "Обработать пустую подстроку",
        "if needle==\"\" { return 0 }",
        "Контракт исключает пустой шаблон и обеспечивает продвижение."
      ],
      [
        "Искать первое вхождение",
        "count:=0\nfor {\n i:=strings.Index(s,needle)",
        "Index возвращает байтовый индекс."
      ],
      [
        "Завершить при отсутствии",
        "if i<0 { return count }",
        "-1 означает, что совпадений больше нет."
      ],
      [
        "Обновить счётчик и остаток",
        "count++\ns=s[i+len(needle):]\n}",
        "Пропускаем всю совпавшую подстроку."
      ]
    ],
    "blocks": [
      "Обновить счётчик и остаток",
      "Обработать пустую подстроку",
      "Искать первое вхождение",
      "Завершить при отсутствии"
    ],
    "order": [
      1,
      2,
      3,
      0
    ],
    "blanks": [
      {
        "before": "if i ",
        "after": " 0 { return count }",
        "options": [
          "<",
          ">",
          "=="
        ],
        "correct": 0,
        "explain": "-1 — признак отсутствия."
      },
      {
        "before": "s=s[i+",
        "after": ":]",
        "options": [
          "1",
          "len(needle)",
          "len(s)"
        ],
        "correct": 1,
        "explain": "Продвигаемся за всё совпадение, а не один байт."
      }
    ],
    "partial": "package practice\n\nfunc CountOccurrences(s, needle string) int {\n\tif needle==\"\" { return 0 }\n\tcount:=0\n\tfor {\n\t i:=strings.Index(s,needle)\n\t if i<0 { return count }\n\t count++\n\t // TODO: продолжи после найденного вхождения\n\t return count\n\t}\n}\n",
    "bug": "package practice\n\nfunc CountOccurrences(s, needle string) int {\n\tif needle==\"\" { return 0 }\n\tcount:=0\n\tfor {\n\t i:=strings.Index(s,needle)\n\t if i<0 { return count }\n\t count++\n\t s=s[i+1:]\n\t}\n}\n",
    "hints": [
      "Верни число точных неперекрывающихся вхождений непустой needle в s. Для пустой needle верни 0. Используй strings.Index, сравнение байтовое и чувствительно к регистру.",
      "Контракт исключает пустой шаблон и обеспечивает продвижение.",
      "Index возвращает байтовый индекс.",
      "Пропускаем всю совпавшую подстроку.",
      "if needle==\"\" { return 0 }\ncount:=0\nfor {\n i:=strings.Index(s,needle)\nif i<0 { return count }\ncount++\ns=s[i+len(needle):]\n}"
    ],
    "related": [
      [
        "core-linear-search",
        "Найти индекс первого совпадения"
      ]
    ],
    "production": "Поиск маркеров в небольших текстовых данных. Для стандартного подсчёта подходит strings.Count, но его семантика пустой подстроки отличается от данного контракта.",
    "interview": "Чем отличаются перекрывающиеся и неперекрывающиеся совпадения?"
  },
  "core-append-pointer": {
    "frames": [
      [
        "Вход",
        [
          "1",
          "2"
        ],
        "dst=&s; len(s)=2, cap(s)=2",
        "Указатель ведёт к дескриптору среза."
      ],
      [
        "Проверка",
        [
          "dst != nil"
        ],
        "value=3",
        "Указатель на nil-срез тоже допустим."
      ],
      [
        "Append",
        [
          "1",
          "2",
          "3"
        ],
        "append(*dst,3)",
        "Получаем новый дескриптор; backing array может измениться."
      ],
      [
        "Присваивание",
        [
          "1",
          "2",
          "3"
        ],
        "*dst = новый дескриптор",
        "Длина среза вызывающего кода теперь 3."
      ]
    ],
    "steps": [
      [
        "Проверить адрес",
        "if dst==nil { return false }",
        "Nil-указатель нельзя разыменовывать, но сам срез может быть nil."
      ],
      [
        "Добавить и сохранить дескриптор",
        "*dst=append(*dst,value)",
        "append возвращает новый slice header. Присваивание через указатель обновляет исходную переменную."
      ],
      [
        "Сообщить успех",
        "return true",
        "Вызывающий код видит новую длину и данные."
      ]
    ],
    "blocks": [
      "Сообщить успех",
      "Проверить адрес",
      "Добавить и сохранить дескриптор"
    ],
    "order": [
      1,
      2,
      0
    ],
    "blanks": [
      {
        "before": "*dst = append(",
        "after": " ,value)",
        "options": [
          "*dst",
          "dst",
          "nil"
        ],
        "correct": 0,
        "explain": "append принимает срез, а не указатель."
      },
      {
        "before": "",
        "after": "dst = append(*dst,value)",
        "options": [
          "*",
          "&",
          ""
        ],
        "correct": 0,
        "explain": "Записываем дескриптор по адресу."
      }
    ],
    "partial": "package practice\n\nfunc AppendInt(dst *[]int, value int) bool {\n\tif dst==nil { return false }\n\t// TODO: обнови дескриптор среза через указатель\n\treturn true\n}\n",
    "bug": "package practice\n\nfunc AppendInt(dst *[]int, value int) bool {\n\tif dst==nil { return false }\n\tlocal:=append(*dst,value)\n\t_ = local\n\treturn true\n}\n",
    "hints": [
      "Добавь value в срез, на который указывает dst, обновив сам дескриптор среза вызывающего кода. Если dst==nil, верни false. Указатель на nil-срез допустим; при успехе верни true.",
      "Nil-указатель нельзя разыменовывать, но сам срез может быть nil.",
      "append возвращает новый slice header. Присваивание через указатель обновляет исходную переменную.",
      "Вызывающий код видит новую длину и данные.",
      "if dst==nil { return false }\n*dst=append(*dst,value)\nreturn true"
    ],
    "related": [
      [
        "core-element-pointer",
        "Найти указатель на первый элемент среза по значению"
      ]
    ],
    "production": "Обычно API проще возвращать новый срез вместо *[]T. Указатель на срез нужен, если контракт требует обновить переменную вызывающего кода.",
    "interview": "Почему append(s,v) внутри функции не меняет len(s) у вызывающего кода?"
  },
  "core-normalize-space": {
    "frames": [
      [
        "Вход",
        [
          "  Go",
          "\\t",
          "backend",
          "\\n"
        ],
        "s=\"  Go\\t backend\\n\"",
        "Вход содержит разные пробельные символы."
      ],
      [
        "Разбиение",
        [
          "Go",
          "backend"
        ],
        "strings.Fields(s)",
        "Пустые элементы не появляются, Unicode whitespace учитывается."
      ],
      [
        "Сборка",
        [
          "Go backend"
        ],
        "strings.Join(fields,\" \")",
        "Вставляем один пробел между словами."
      ],
      [
        "Выход",
        [
          "Go backend"
        ],
        "return result",
        "Края и повторяющиеся пробелы нормализованы."
      ]
    ],
    "steps": [
      [
        "Выделить непустые слова",
        "fields:=strings.Fields(s)",
        "Fields разделяет по Unicode whitespace и отбрасывает пустые группы."
      ],
      [
        "Объединить слова",
        "return strings.Join(fields,\" \")",
        "Join добавляет разделитель только между элементами."
      ]
    ],
    "blocks": [
      "Объединить слова",
      "Выделить непустые слова"
    ],
    "order": [
      1,
      0
    ],
    "blanks": [
      {
        "before": "fields := strings.",
        "after": "(s)",
        "options": [
          "Split",
          "Fields",
          "TrimSpace"
        ],
        "correct": 1,
        "explain": "Fields принимает Unicode whitespace как разделители."
      },
      {
        "before": "strings.Join(fields,",
        "after": ")",
        "options": [
          "\" \"",
          "\"\"",
          "\"\\n\""
        ],
        "correct": 0,
        "explain": "Между словами нужен один обычный пробел."
      }
    ],
    "partial": "package practice\n\nfunc NormalizeSpaces(s string) string {\n\tfields:=strings.Fields(s)\n\t// TODO: соедини слова одним пробелом\n\treturn strings.Join(fields,\"\")\n}\n",
    "bug": "package practice\n\nfunc NormalizeSpaces(s string) string {\n\treturn strings.TrimSpace(s)\n}\n",
    "hints": [
      "Удали пробельные символы по краям и замени каждую последовательность Unicode whitespace между словами одним ASCII-пробелом. Не меняй регистр и содержимое слов. Используй strings.Fields и strings.Join.",
      "Fields разделяет по Unicode whitespace и отбрасывает пустые группы.",
      "Join добавляет разделитель только между элементами.",
      "Join добавляет разделитель только между элементами.",
      "fields:=strings.Fields(s)\nreturn strings.Join(fields,\" \")"
    ],
    "related": [
      [
        "core-string-stats",
        "Посчитать байты и руны строки"
      ]
    ],
    "production": "Нормализация пользовательского текста и поисковых запросов. Не применяй её к паролям, подписи или данным, где пробелы значимы.",
    "interview": "Чем strings.Fields отличается от strings.Split(s,\" \")?"
  },
  "core-rune-frequency": {
    "frames": [
      [
        "Вход",
        [
          "я",
          "A",
          "я",
          "🙂"
        ],
        "s=\"яAя🙂\"",
        "Строка содержит многобайтовые символы."
      ],
      [
        "Первое чтение",
        [
          "я:1"
        ],
        "r='я'",
        "range декодирует Unicode code point."
      ],
      [
        "Следующие",
        [
          "я:2",
          "A:1"
        ],
        "counts[r]++",
        "Отсутствующий ключ даёт 0."
      ],
      [
        "Выход",
        [
          "я:2",
          "A:1",
          "🙂:1"
        ],
        "return counts",
        "Порядок ключей не задан."
      ]
    ],
    "steps": [
      [
        "Создать счётчики",
        "counts:=make(map[rune]int)",
        "Ключ — rune, значение — количество."
      ],
      [
        "Перебрать code points",
        "for _,r:=range s {",
        "Второй результат range — rune, первый — байтовый индекс."
      ],
      [
        "Увеличить частоту",
        "counts[r]++\n}",
        "Нулевое значение отсутствующей записи позволяет начать с 0."
      ],
      [
        "Вернуть map",
        "return counts",
        "Для пустого ввода map остаётся инициализированной."
      ]
    ],
    "blocks": [
      "Вернуть map",
      "Создать счётчики",
      "Перебрать code points",
      "Увеличить частоту"
    ],
    "order": [
      1,
      2,
      3,
      0
    ],
    "blanks": [
      {
        "before": "make(map[",
        "after": "]int)",
        "options": [
          "rune",
          "byte",
          "string"
        ],
        "correct": 0,
        "explain": "Храним Unicode code point."
      },
      {
        "before": "counts[r]",
        "after": "",
        "options": [
          "++",
          "--",
          "=0"
        ],
        "correct": 0,
        "explain": "Каждое появление увеличивает частоту."
      }
    ],
    "partial": "package practice\n\nfunc RuneFrequency(s string) map[rune]int {\n\tcounts:=make(map[rune]int)\n\tfor _,r:=range s {\n\t // TODO: увеличь счётчик руны\n\t _=r\n\t}\n\treturn counts\n}\n",
    "bug": "package practice\n\nfunc RuneFrequency(s string) map[rune]int {\n\tcounts:=make(map[rune]int)\n\tfor i:=0;i<len(s);i++ { counts[rune(s[i])]++ }\n\treturn counts\n}\n",
    "hints": [
      "Верни новую map с количеством каждого code point в s. Используй range по строке; регистр значим, пробелы учитываются, некорректный UTF-8 декодируется как U+FFFD. Для пустой строки верни не nil map.",
      "Ключ — rune, значение — количество.",
      "Второй результат range — rune, первый — байтовый индекс.",
      "Для пустого ввода map остаётся инициализированной.",
      "counts:=make(map[rune]int)\nfor _,r:=range s { counts[r]++ }\nreturn counts"
    ],
    "related": [
      [
        "core-string-stats",
        "Посчитать байты и руны строки"
      ]
    ],
    "production": "Статистика символов требует определить, что считать: байты, code points или графемы. Для сравнения естественного языка также может понадобиться нормализация.",
    "interview": "Что возвращает range по строке?"
  },
  "core-anagram": {
    "frames": [
      [
        "Вход",
        [
          "a: кот",
          "b: ток"
        ],
        "counts={}",
        "Порядок букв различается."
      ],
      [
        "Считаем a",
        [
          "к:1",
          "о:1",
          "т:1"
        ],
        "counts={к:1,о:1,т:1}",
        "Запоминаем количество каждой руны."
      ],
      [
        "Читаем b",
        [
          "к:1",
          "о:1"
        ],
        "т найден, вычитаем 1",
        "Удаляем запись с нулевым остатком."
      ],
      [
        "Следующие",
        [
          "к:1"
        ],
        "о найден, удаляем",
        "Каждую руну используем только один раз."
      ],
      [
        "Выход",
        [
          "{}"
        ],
        "len(counts)==0 → true",
        "Все частоты взаимно компенсировались."
      ]
    ],
    "steps": [
      [
        "Посчитать руны a",
        "counts:=make(map[rune]int)\nfor _,r:=range a { counts[r]++ }",
        "Важно количество, а не только присутствие."
      ],
      [
        "Перебрать руны b",
        "for _,r:=range b {",
        "Для каждого элемента ищем доступный остаток."
      ],
      [
        "Проверить доступность",
        "if counts[r]==0 { return false }",
        "Отсутствующий или исчерпанный ключ означает несовпадение."
      ],
      [
        "Уменьшить и очистить",
        "counts[r]--\nif counts[r]==0 { delete(counts,r) }\n}",
        "Удаляем только полностью использованные записи."
      ],
      [
        "Проверить остаток",
        "return len(counts)==0",
        "Если остались ключи, в a были лишние руны."
      ]
    ],
    "blocks": [
      "Проверить остаток",
      "Посчитать руны a",
      "Перебрать руны b",
      "Проверить доступность",
      "Уменьшить и очистить"
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
        "before": "if counts[r]==",
        "after": " { return false }",
        "options": [
          "0",
          "1",
          "-1"
        ],
        "correct": 0,
        "explain": "Нет доступной руны для сопоставления."
      },
      {
        "before": "return len(counts) ",
        "after": " 0",
        "options": [
          "==",
          "!=",
          "<"
        ],
        "correct": 0,
        "explain": "Все частоты должны быть исчерпаны."
      }
    ],
    "partial": "package practice\n\nfunc AreRuneAnagrams(a, b string) bool {\n\tcounts:=make(map[rune]int)\n\tfor _,r:=range a { counts[r]++ }\n\tfor _,r:=range b {\n\t if counts[r]==0 { return false }\n\t // TODO: уменьши счётчик и удали нулевую запись\n\t}\n\treturn len(counts)==0\n}\n",
    "bug": "package practice\n\nfunc AreRuneAnagrams(a, b string) bool {\n\tseen:=make(map[rune]bool)\n\tfor _,r:=range a { seen[r]=true }\n\tfor _,r:=range b { if !seen[r] { return false } }\n\treturn true\n}\n",
    "hints": [
      "Проверь, содержат ли []rune(a) и []rune(b) одинаковое количество каждого code point независимо от порядка. Регистр, пробелы и combining marks значимы. Unicode-нормализация не нужна. Используй map частот.",
      "Важно количество, а не только присутствие.",
      "Для каждого элемента ищем доступный остаток.",
      "Если остались ключи, в a были лишние руны.",
      "counts:=make(map[rune]int)\nfor _,r:=range a { counts[r]++ }\nfor _,r:=range b {\n if counts[r]==0 { return false }\n counts[r]--\n if counts[r]==0 { delete(counts,r) }\n}\nreturn len(counts)==0"
    ],
    "related": [
      [
        "core-rune-frequency",
        "Посчитать частоту Unicode code points"
      ]
    ],
    "production": "Сравнение мультимножеств полезно и для ID, токенов, событий. Для пользовательского текста явно решай, нужны ли case folding и Unicode-нормализация.",
    "interview": "Почему множества рун недостаточно для проверки анаграмм?"
  },
  "core-clone-config": {
    "frames": [
      [
        "Вход",
        [
          "Name=api",
          "Limit → 10"
        ],
        "cfg",
        "Структура содержит указатель на число."
      ],
      [
        "Поверхностная копия",
        [
          "cfg.Limit → 10",
          "out.Limit → 10"
        ],
        "out:=cfg",
        "Оба указателя ведут к одному числу."
      ],
      [
        "Глубокая копия",
        [
          "cfg.Limit → 10",
          "out.Limit → 10 (новое)"
        ],
        "n:=*cfg.Limit; out.Limit=&n",
        "Создаём независимое число."
      ],
      [
        "Проверка",
        [
          "cfg.Limit → 10",
          "out.Limit → 99"
        ],
        "*out.Limit=99",
        "Исходное число осталось прежним."
      ]
    ],
    "steps": [
      [
        "Скопировать структуру",
        "out:=cfg",
        "Строка копируется как значение, указатель сохраняет адрес."
      ],
      [
        "Проверить nil",
        "if cfg.Limit!=nil {",
        "Нельзя разыменовывать отсутствующий указатель."
      ],
      [
        "Скопировать число",
        "n:=*cfg.Limit\nout.Limit=&n\n}",
        "Адрес новой переменной не совпадает с адресом оригинала."
      ],
      [
        "Вернуть результат",
        "return out",
        "Оригинал и копия независимы по полю Limit."
      ]
    ],
    "blocks": [
      "Вернуть результат",
      "Скопировать структуру",
      "Проверить nil",
      "Скопировать число"
    ],
    "order": [
      1,
      2,
      3,
      0
    ],
    "blanks": [
      {
        "before": "n := ",
        "after": "cfg.Limit",
        "options": [
          "*",
          "&",
          ""
        ],
        "correct": 0,
        "explain": "Разыменование читает число."
      },
      {
        "before": "out.Limit = ",
        "after": "n",
        "options": [
          "*",
          "&",
          ""
        ],
        "correct": 1,
        "explain": "Нужен адрес новой переменной."
      }
    ],
    "partial": "package practice\n\ntype QuotaConfig struct { Name string; Limit *int }\n\nfunc CloneQuotaConfig(cfg QuotaConfig) QuotaConfig {\n\tout:=cfg\n\tif cfg.Limit!=nil {\n\t // TODO: скопируй число и замени указатель\n\t}\n\treturn out\n}\n",
    "bug": "package practice\n\ntype QuotaConfig struct { Name string; Limit *int }\n\nfunc CloneQuotaConfig(cfg QuotaConfig) QuotaConfig {\n\treturn cfg\n}\n",
    "hints": [
      "Верни копию QuotaConfig. Если Limit не nil, скопируй число в отдельную переменную и сохрани её адрес. Если Limit nil, оставь nil. Name сохраняется.",
      "Строка копируется как значение, указатель сохраняет адрес.",
      "Нельзя разыменовывать отсутствующий указатель.",
      "Оригинал и копия независимы по полю Limit.",
      "out:=cfg\nif cfg.Limit!=nil {\n n:=*cfg.Limit\n out.Limit=&n\n}\nreturn out"
    ],
    "related": [
      [
        "core-deep-map",
        "Глубоко скопировать map со срезами"
      ]
    ],
    "production": "Копирование конфигурации с optional-полями. Для сложных графов объектов заранее определяй, какие ссылки должны быть общими и какие независимыми.",
    "interview": "Безопасно ли возвращать адрес локальной переменной в Go?"
  },
  "core-tree-sum": {
    "frames": [
      [
        "Корень",
        [
          "5",
          "↙ 2",
          "↘ 7"
        ],
        "SumIntTree(root)",
        "Корень имеет два поддерева."
      ],
      [
        "Левый узел",
        [
          "2",
          "nil",
          "nil"
        ],
        "2+0+0=2",
        "Nil завершает вызов."
      ],
      [
        "Правый узел",
        [
          "7",
          "nil",
          "nil"
        ],
        "7+0+0=7",
        "Обрабатываем и правую ветвь."
      ],
      [
        "Возврат",
        [
          "5",
          "2",
          "7"
        ],
        "5+2+7=14",
        "Складываем корень и обе суммы."
      ]
    ],
    "steps": [
      [
        "Обработать пустой узел",
        "if root==nil { return 0 }",
        "Базовый случай предотвращает разыменование nil."
      ],
      [
        "Обойти левую ветвь",
        "SumIntTree(root.Left)",
        "Рекурсивный вызов возвращает сумму левого поддерева."
      ],
      [
        "Обойти правую ветвь",
        "SumIntTree(root.Right)",
        "Не пропускаем вторую ветвь."
      ],
      [
        "Сложить результаты",
        "return root.Value+SumIntTree(root.Left)+SumIntTree(root.Right)",
        "Каждый узел учитывается один раз."
      ]
    ],
    "blocks": [
      "Сложить результаты",
      "Обработать пустой узел",
      "Обойти левую ветвь",
      "Обойти правую ветвь"
    ],
    "order": [
      1,
      2,
      3,
      0
    ],
    "blanks": [
      {
        "before": "if root==",
        "after": " { return 0 }",
        "options": [
          "nil",
          "0",
          "false"
        ],
        "correct": 0,
        "explain": "Пустое дерево завершает рекурсию."
      },
      {
        "before": "root.Value+SumIntTree(root.Left)+",
        "after": "",
        "options": [
          "SumIntTree(root.Right)",
          "root.Value",
          "0"
        ],
        "correct": 0,
        "explain": "Нужна сумма правого поддерева."
      }
    ],
    "partial": "package practice\n\ntype IntTree struct { Value int; Left, Right *IntTree }\n\nfunc SumIntTree(root *IntTree) int {\n\tif root==nil { return 0 }\n\t// TODO: добавь суммы обоих поддеревьев\n\treturn root.Value\n}\n",
    "bug": "package practice\n\ntype IntTree struct { Value int; Left, Right *IntTree }\n\nfunc SumIntTree(root *IntTree) int {\n\tif root==nil { return 0 }\n\treturn root.Value+SumIntTree(root.Left)\n}\n",
    "hints": [
      "Верни сумму значений всех узлов конечного бинарного дерева без циклов и общих узлов. Nil-дерево даёт 0. Используй рекурсию, не меняй дерево.",
      "Базовый случай предотвращает разыменование nil.",
      "Рекурсивный вызов возвращает сумму левого поддерева.",
      "Каждый узел учитывается один раз.",
      "if root==nil { return 0 }\nreturn root.Value+SumIntTree(root.Left)+SumIntTree(root.Right)"
    ],
    "related": [
      [
        "core-recursive-sum",
        "Рекурсивно сложить числа"
      ]
    ],
    "production": "Обход иерархий категорий и деревьев выражений. Для произвольных графов нужна защита от циклов, для глубокой иерархии может потребоваться явный стек.",
    "interview": "Какова память рекурсивного обхода дерева?"
  },
  "core-equal-fold": {
    "frames": [
      [
        "Вход",
        [
          "Go",
          "gO"
        ],
        "a=\"Go\", b=\"gO\"",
        "Обычное == чувствительно к регистру."
      ],
      [
        "Сравнение",
        [
          "G ↔ g",
          "o ↔ O"
        ],
        "strings.EqualFold(a,b)",
        "Сравнение учитывает Unicode simple folding."
      ],
      [
        "Греческий пример",
        [
          "Σ",
          "ς"
        ],
        "EqualFold(\"Σ\",\"ς\") → true",
        "Приведение обеих строк к нижнему регистру не всегда эквивалентно folding."
      ],
      [
        "Граница контракта",
        [
          "Go",
          " Go"
        ],
        "false",
        "Пробелы не удаляем."
      ]
    ],
    "steps": [
      [
        "Определить контракт",
        "// Unicode simple case folding",
        "Сравнение регистра не означает нормализацию или удаление пробелов."
      ],
      [
        "Выбрать функцию",
        "strings.EqualFold(a,b)",
        "Стандартная библиотека выполняет нужное сравнение."
      ],
      [
        "Вернуть результат",
        "return strings.EqualFold(a,b)",
        "Не создаём вручную строки в нижнем регистре."
      ]
    ],
    "blocks": [
      "Вернуть результат",
      "Определить контракт",
      "Выбрать функцию"
    ],
    "order": [
      1,
      2,
      0
    ],
    "blanks": [
      {
        "before": "return strings.",
        "after": "(a,b)",
        "options": [
          "EqualFold",
          "Contains",
          "Compare"
        ],
        "correct": 0,
        "explain": "EqualFold сравнивает без учёта регистра."
      },
      {
        "before": "EqualNames(\"Go\", \" Go\") == ",
        "after": "",
        "options": [
          "true",
          "false",
          "nil"
        ],
        "correct": 1,
        "explain": "Пробелы значимы."
      }
    ],
    "partial": "package practice\n\nfunc EqualNames(a,b string) bool {\n\t// TODO: используй Unicode-aware сравнение\n\treturn a==b\n}\n",
    "bug": "package practice\n\nfunc EqualNames(a,b string) bool {\n\treturn strings.ToLower(a)==strings.ToLower(b)\n}\n",
    "hints": [
      "Сравни строки без учёта регистра по правилам Unicode simple case folding, используя strings.EqualFold. Пробелы и нормализация Unicode не изменяются.",
      "Сравнение регистра не означает нормализацию или удаление пробелов.",
      "Стандартная библиотека выполняет нужное сравнение.",
      "Не создаём вручную строки в нижнем регистре.",
      "return strings.EqualFold(a,b)"
    ],
    "related": [
      [
        "core-normalize-space",
        "Нормализовать пробелы в строке"
      ]
    ],
    "production": "Сравнение пользовательских имён по оговорённому контракту. Для идентификаторов и безопасности не выбирай правила эквивалентности без требований продукта.",
    "interview": "Почему EqualFold не равно сравнению ToLower(a)==ToLower(b)?"
  },
  "core-cap-window": {
    "frames": [
      [
        "Вход",
        [
          "10",
          "20",
          "30",
          "40",
          "50"
        ],
        "start=1, end=3",
        "Выбираем элементы 20 и 30."
      ],
      [
        "Обычный подсрез",
        [
          "20",
          "30",
          "40",
          "50"
        ],
        "len=2, cap=4",
        "Append может перезаписать 40."
      ],
      [
        "Полное выражение",
        [
          "20",
          "30"
        ],
        "values[1:3:3], len=2, cap=2",
        "Третий индекс ограничивает capacity."
      ],
      [
        "Append",
        [
          "20",
          "30",
          "99"
        ],
        "новый backing array",
        "Исходный элемент 40 сохраняется."
      ]
    ],
    "steps": [
      [
        "Проверить границы",
        "if start<0||end<start||end>len(values) { return nil,false }",
        "Контракт ограничивает окно длиной, не capacity."
      ],
      [
        "Выбрать полное выражение",
        "values[start:end:end]",
        "Длина end-start, capacity также end-start."
      ],
      [
        "Вернуть окно",
        "return values[start:end:end],true",
        "Существующие элементы общие, следующий append требует места в новом массиве."
      ]
    ],
    "blocks": [
      "Вернуть окно",
      "Проверить границы",
      "Выбрать полное выражение"
    ],
    "order": [
      1,
      2,
      0
    ],
    "blanks": [
      {
        "before": "values[start:end:",
        "after": "]",
        "options": [
          "end",
          "start",
          "len(values)"
        ],
        "correct": 0,
        "explain": "Третий индекс определяет cap относительно start."
      },
      {
        "before": "end>",
        "after": "(values)",
        "options": [
          "cap",
          "len",
          "copy"
        ],
        "correct": 1,
        "explain": "Контракт разрешает только видимые элементы входа."
      }
    ],
    "partial": "package practice\n\nfunc LimitedWindow(values []int,start,end int) ([]int,bool) {\n\tif start<0||end<start||end>len(values) { return nil,false }\n\t// TODO: ограничь capacity третьим индексом\n\treturn values[start:end],true\n}\n",
    "bug": "package practice\n\nfunc LimitedWindow(values []int,start,end int) ([]int,bool) {\n\tif start<0||end<start||end>len(values) { return nil,false }\n\treturn values[start:end],true\n}\n",
    "hints": [
      "Верни подсрез values[start:end] с ёмкостью ровно end-start. Допустимо 0<=start<=end<=len(values). При неверных границах верни nil,false. Элементы могут разделять исходный массив, но append к результату не должен перезаписывать следующие элементы.",
      "Контракт ограничивает окно длиной, не capacity.",
      "Длина end-start, capacity также end-start.",
      "Существующие элементы общие, следующий append требует места в новом массиве.",
      "if start<0||end<start||end>len(values) { return nil,false }\nreturn values[start:end:end],true"
    ],
    "related": [
      [
        "core-append-pointer",
        "Добавить число через указатель на срез"
      ]
    ],
    "production": "Передача ограниченного окна буфера другому компоненту. Full slice expression защищает соседние элементы от append, но не обеспечивает полную независимость памяти.",
    "interview": "Чем s[i:j:k] отличается от s[i:j]?"
  },
  "core-builder-repeat": {
    "frames": [
      [
        "Старт",
        [
          "go",
          "go",
          "go"
        ],
        "label=\"go\", n=3",
        "Builder пока пустой."
      ],
      [
        "Первый повтор",
        [
          "go"
        ],
        "i=0",
        "Перед первым фрагментом разделитель не нужен."
      ],
      [
        "Второй повтор",
        [
          "go,go"
        ],
        "i=1",
        "Сначала запятая, потом фрагмент."
      ],
      [
        "Третий повтор",
        [
          "go,go,go"
        ],
        "i=2",
        "Не добавляем разделитель после последнего."
      ],
      [
        "Результат",
        [
          "go,go,go"
        ],
        "b.String()",
        "Получаем готовую строку."
      ]
    ],
    "steps": [
      [
        "Создать накопитель",
        "var b strings.Builder",
        "Нулевое значение Builder готово к использованию."
      ],
      [
        "Перебрать повторения",
        "for i:=0;i<n;i++ {",
        "При n<=0 цикл не выполнится."
      ],
      [
        "Добавить разделитель при необходимости",
        "if i>0 { b.WriteByte(',') }",
        "Разделитель стоит только между фрагментами."
      ],
      [
        "Записать фрагмент",
        "b.WriteString(label)\n}",
        "Builder накапливает байты."
      ],
      [
        "Вернуть строку",
        "return b.String()",
        "String возвращает накопленное содержимое."
      ]
    ],
    "blocks": [
      "Вернуть строку",
      "Создать накопитель",
      "Перебрать повторения",
      "Добавить разделитель при необходимости",
      "Записать фрагмент"
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
        "before": "if i",
        "after": "0 { b.WriteByte(',') }",
        "options": [
          ">",
          "<",
          "=="
        ],
        "correct": 0,
        "explain": "Разделитель нужен после первого повторения."
      },
      {
        "before": "return b.",
        "after": "()",
        "options": [
          "String",
          "Len",
          "Cap"
        ],
        "correct": 0,
        "explain": "Получаем строковое содержимое."
      }
    ],
    "partial": "package practice\n\nfunc RepeatLabel(label string, n int) string {\n\tvar b strings.Builder\n\tfor i:=0;i<n;i++ {\n\t // TODO: добавь разделитель между повторениями\n\t b.WriteString(label)\n\t}\n\treturn b.String()\n}\n",
    "bug": "package practice\n\nfunc RepeatLabel(label string, n int) string {\n\tvar b strings.Builder\n\tfor i:=0;i<n;i++ { b.WriteString(label);b.WriteByte(',') }\n\treturn b.String()\n}\n",
    "hints": [
      "Верни n повторений label, разделённых запятыми. При n<=0 верни пустую строку. Используй strings.Builder и не добавляй завершающую запятую. Входы небольшие, результат помещается в память.",
      "Нулевое значение Builder готово к использованию.",
      "При n<=0 цикл не выполнится.",
      "String возвращает накопленное содержимое.",
      "var b strings.Builder\nfor i:=0;i<n;i++ {\n if i>0 { b.WriteByte(',') }\n b.WriteString(label)\n}\nreturn b.String()"
    ],
    "related": [
      [
        "core-normalize-space",
        "Нормализовать пробелы в строке"
      ]
    ],
    "production": "Builder удобен при последовательной сборке строк. Не копируй уже использованный Builder по значению; оценивай размер результата и измеряй аллокации бенчмарками.",
    "interview": "Почему Builder может быть лучше конкатенации в цикле?"
  },
  "core-utf8-byte-limit": {
    "frames": [
      [
        "Вход",
        [
          "41",
          "D1",
          "8F",
          "42"
        ],
        "s=\"AяB\", max=2",
        "A занимает 1 байт, я — 2, B — 1."
      ],
      [
        "Граница",
        [
          "41",
          "D1",
          "| 8F",
          "42"
        ],
        "s[2]=0x8F",
        "Граница попала внутрь многобайтовой руны."
      ],
      [
        "Сдвиг",
        [
          "41",
          "| D1",
          "8F",
          "42"
        ],
        "max=1",
        "Останавливаемся на начале руны."
      ],
      [
        "Выход",
        [
          "A"
        ],
        "s[:1]",
        "Префикс корректен и не длиннее лимита."
      ]
    ],
    "steps": [
      [
        "Обработать крайние лимиты",
        "if max<=0 { return \"\" }\nif max>=len(s) { return s }",
        "После проверок индекс max находится внутри строки."
      ],
      [
        "Распознать байт продолжения",
        "(s[max]&0xC0)==0x80",
        "Байты продолжения UTF-8 имеют старшие биты 10."
      ],
      [
        "Сдвинуть границу назад",
        "for max>0 && (s[max]&0xC0)==0x80 { max-- }",
        "На корректном UTF-8 найдём начало code point."
      ],
      [
        "Вернуть префикс",
        "return s[:max]",
        "Индекс max не включается в результат."
      ]
    ],
    "blocks": [
      "Вернуть префикс",
      "Обработать крайние лимиты",
      "Распознать байт продолжения",
      "Сдвинуть границу назад"
    ],
    "order": [
      1,
      2,
      3,
      0
    ],
    "blanks": [
      {
        "before": "if max>=len(s) { return ",
        "after": " }",
        "options": [
          "s",
          "\"\"",
          "s[:0]"
        ],
        "correct": 0,
        "explain": "Весь вход помещается в лимит."
      },
      {
        "before": "for max>0 && (s[max]&0xC0)==0x80 { max",
        "after": " }",
        "options": [
          "++",
          "--",
          "=0"
        ],
        "correct": 1,
        "explain": "Границу двигаем назад до начала руны."
      }
    ],
    "partial": "package practice\n\nfunc TruncateUTF8Bytes(s string, max int) string {\n\tif max<=0 { return \"\" }\n\tif max>=len(s) { return s }\n\t// TODO: сдвинь границу назад, пока s[max] — байт продолжения\n\treturn s[:max]\n}\n",
    "bug": "package practice\n\nfunc TruncateUTF8Bytes(s string, max int) string {\n\tif max<=0 { return \"\" }\n\tif max>=len(s) { return s }\n\treturn s[:max]\n}\n",
    "hints": [
      "Вход s — корректная UTF-8 строка. Верни самый длинный её префикс не длиннее max байтов, не разрывая code point. При max<=0 верни пустую строку. Если max>=len(s), верни s.",
      "После проверок индекс max находится внутри строки.",
      "Байты продолжения UTF-8 имеют старшие биты 10.",
      "Индекс max не включается в результат.",
      "if max<=0 { return \"\" }\nif max>=len(s) { return s }\nfor max>0 && (s[max]&0xC0)==0x80 { max-- }\nreturn s[:max]"
    ],
    "related": [
      [
        "core-reverse-runes",
        "Развернуть строку по Unicode code points"
      ]
    ],
    "production": "Лимиты хранения и протоколов могут измеряться в байтах. Для произвольного ввода отдельно проверяй utf8.ValidString или определяй политику замены. Графемы могут состоять из нескольких code points.",
    "interview": "Как распознать байт продолжения UTF-8?"
  },
  "core-reuse-buffer": {
    "frames": [
      [
        "Вход",
        [
          "-1",
          "3",
          "0",
          "5"
        ],
        "out=values[:0], len=0",
        "Массив общий, но результат пока пуст."
      ],
      [
        "Первый выбор",
        [
          "3",
          "3",
          "0",
          "5"
        ],
        "v=3, out=[3]",
        "Записываем в уже прочитанную позицию."
      ],
      [
        "Пропуск",
        [
          "3",
          "3",
          "0",
          "5"
        ],
        "v=0",
        "Ноль не положительный."
      ],
      [
        "Выход",
        [
          "3",
          "5",
          "0",
          "5"
        ],
        "out=[3,5], len=2",
        "Хвост массива не является частью результата."
      ]
    ],
    "steps": [
      [
        "Создать пустое окно",
        "out:=values[:0]",
        "Сохраняем исходный backing array и capacity."
      ],
      [
        "Перебрать исходные элементы",
        "for _,v:=range values {",
        "Читаем каждый элемент один раз."
      ],
      [
        "Добавить подходящие",
        "if v>0 { out=append(out,v) }\n}",
        "Индекс записи не опережает индекс чтения."
      ],
      [
        "Вернуть новую длину",
        "return out",
        "Вызывающий код должен использовать возвращённый срез."
      ]
    ],
    "blocks": [
      "Вернуть новую длину",
      "Создать пустое окно",
      "Перебрать исходные элементы",
      "Добавить подходящие"
    ],
    "order": [
      1,
      2,
      3,
      0
    ],
    "blanks": [
      {
        "before": "out:=values[:",
        "after": "]",
        "options": [
          "0",
          "1",
          "len(values)"
        ],
        "correct": 0,
        "explain": "Начинаем с нулевой длины без нового массива."
      },
      {
        "before": "if v ",
        "after": " 0",
        "options": [
          ">",
          ">=",
          "<"
        ],
        "correct": 0,
        "explain": "Нужны строго положительные числа."
      }
    ],
    "partial": "package practice\n\nfunc KeepPositiveInPlace(values []int) []int {\n\tout:=values[:0]\n\tfor _,v:=range values {\n\t // TODO: добавляй только положительные\n\t _=v\n\t}\n\treturn out\n}\n",
    "bug": "package practice\n\nfunc KeepPositiveInPlace(values []int) []int {\n\tout:=values[:0]\n\tfor _,v:=range values { if v>=0 { out=append(out,v) } }\n\treturn out\n}\n",
    "hints": [
      "Оставь строго положительные числа в исходном порядке, переиспользуя backing array входного среза через values[:0]. Разрешено менять исходный массив. Не выделяй новый массив. Верни срез правильной длины.",
      "Сохраняем исходный backing array и capacity.",
      "Читаем каждый элемент один раз.",
      "Вызывающий код должен использовать возвращённый срез.",
      "out:=values[:0]\nfor _,v:=range values { if v>0 { out=append(out,v) } }\nreturn out"
    ],
    "related": [
      [
        "core-cap-window",
        "Ограничить ёмкость подсреза"
      ]
    ],
    "production": "In-place фильтрация снижает число выделений, если вход принадлежит текущему компоненту. Для срезов указателей или других ссылочных значений может потребоваться очистка неиспользуемого хвоста.",
    "interview": "Почему фильтрация через s[:0] не уничтожает ещё не прочитанные элементы?"
  },
  "core-detach-window": {
    "frames": [
      [
        "Вход",
        [
          "A",
          "B",
          "C",
          "D",
          "E",
          "F"
        ],
        "start=2, end=4",
        "Хотим сохранить только C,D."
      ],
      [
        "Обычный view",
        [
          "C",
          "D"
        ],
        "data[2:4:4]",
        "Даже cap=2 не разрывает связь с большим массивом."
      ],
      [
        "Выделение",
        [
          "0",
          "0"
        ],
        "make([]byte,2)",
        "Создаём независимую память."
      ],
      [
        "Копирование",
        [
          "C",
          "D"
        ],
        "copy(out,data[2:4])",
        "Копируем только нужные байты."
      ],
      [
        "Результат",
        [
          "C",
          "D"
        ],
        "out, true",
        "Фрагмент не удерживает исходный массив."
      ]
    ],
    "steps": [
      [
        "Проверить границы",
        "if start<0||end<start||end>len(data) { return nil,false }",
        "Проверка выполняется до срезания."
      ],
      [
        "Создать новый массив",
        "out:=make([]byte,end-start)",
        "Длина и capacity равны размеру окна."
      ],
      [
        "Скопировать байты",
        "copy(out,data[start:end])",
        "Независимая память содержит только нужный фрагмент."
      ],
      [
        "Вернуть результат",
        "return out,true",
        "Пустое окно тоже имеет корректный результат."
      ]
    ],
    "blocks": [
      "Вернуть результат",
      "Проверить границы",
      "Создать новый массив",
      "Скопировать байты"
    ],
    "order": [
      1,
      2,
      3,
      0
    ],
    "blanks": [
      {
        "before": "out:=make([]byte,",
        "after": ")",
        "options": [
          "end-start",
          "len(data)",
          "start"
        ],
        "correct": 0,
        "explain": "Выделяем ровно размер выбранного окна."
      },
      {
        "before": "copy(out,data[start:",
        "after": "])",
        "options": [
          "end",
          "start",
          "len(data)"
        ],
        "correct": 0,
        "explain": "Копируем только требуемый диапазон."
      }
    ],
    "partial": "package practice\n\nfunc DetachByteWindow(data []byte,start,end int) ([]byte,bool) {\n\tif start<0||end<start||end>len(data) { return nil,false }\n\tout:=make([]byte,end-start)\n\t// TODO: скопируй выбранное окно\n\treturn out,true\n}\n",
    "bug": "package practice\n\nfunc DetachByteWindow(data []byte,start,end int) ([]byte,bool) {\n\tif start<0||end<start||end>len(data) { return nil,false }\n\treturn data[start:end:end],true\n}\n",
    "hints": [
      "Для 0<=start<=end<=len(data) верни независимую копию data[start:end] с len==cap==end-start и true. Пустой допустимый фрагмент — пустой не nil срез. Неверные границы — nil,false. Вход не меняй.",
      "Проверка выполняется до срезания.",
      "Длина и capacity равны размеру окна.",
      "Пустое окно тоже имеет корректный результат.",
      "if start<0||end<start||end>len(data) { return nil,false }\nout:=make([]byte,end-start)\ncopy(out,data[start:end])\nreturn out,true"
    ],
    "related": [
      [
        "core-cap-window",
        "Ограничить ёмкость подсреза"
      ]
    ],
    "production": "Кеширование небольших частей сетевых сообщений: копирование позволяет освободить большой буфер после исчезновения остальных ссылок. Тест проверяет независимость данных, а фактическое удержание памяти измеряют heap-профилем.",
    "interview": "Почему s[i:j:j] не решает проблему удержания большого массива?"
  },
  "core-two-sum": {
    "frames": [
      [
        "Вход",
        [
          "3",
          "1",
          "4",
          "2"
        ],
        "target=5, seen={}",
        "Ищем дополнение до target."
      ],
      [
        "Первый элемент",
        [
          "3"
        ],
        "j=0, need=2, seen={3:0}",
        "Дополнения ещё нет; запоминаем индекс."
      ],
      [
        "Второй элемент",
        [
          "3",
          "1"
        ],
        "j=1, need=4, seen={3:0,1:1}",
        "Дополнение отсутствует."
      ],
      [
        "Третий элемент",
        [
          "1",
          "4"
        ],
        "j=2, need=1, i=1",
        "Ключ 1 уже встречался."
      ],
      [
        "Выход",
        [
          "1",
          "2"
        ],
        "return 1,2,true",
        "Проверка до записи гарантирует разные индексы."
      ]
    ],
    "steps": [
      [
        "Создать map индексов",
        "seen:=make(map[int]int)",
        "Храним первый индекс каждого значения."
      ],
      [
        "Перебрать числа",
        "for j,v:=range values {",
        "j — правый индекс потенциальной пары."
      ],
      [
        "Найти дополнение",
        "if i,ok:=seen[target-v];ok { return i,j,true }",
        "Ищем только среди ранее прочитанных элементов."
      ],
      [
        "Запомнить первое появление",
        "if _,ok:=seen[v];!ok { seen[v]=j }\n}",
        "Первый индекс нужен для детерминированного результата."
      ],
      [
        "Обработать отсутствие пары",
        "return -1,-1,false",
        "Перебрали все варианты правого индекса."
      ]
    ],
    "blocks": [
      "Обработать отсутствие пары",
      "Создать map индексов",
      "Перебрать числа",
      "Найти дополнение",
      "Запомнить первое появление"
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
        "before": "seen[",
        "after": "]",
        "options": [
          "target-v",
          "target+v",
          "j"
        ],
        "correct": 0,
        "explain": "Дополнение равно target минус текущее число."
      },
      {
        "before": "if _,ok:=seen[v];",
        "after": " { seen[v]=j }",
        "options": [
          "!ok",
          "ok",
          "v"
        ],
        "correct": 0,
        "explain": "Сохраняем первое появление."
      }
    ],
    "partial": "package practice\n\nfunc TwoSumIndices(values []int,target int) (int,int,bool) {\n\tseen:=make(map[int]int)\n\tfor j,v:=range values {\n\t // TODO: найди дополнение target-v среди ранее прочитанных чисел\n\t if _,ok:=seen[v];!ok { seen[v]=j }\n\t}\n\treturn -1,-1,false\n}\n",
    "bug": "package practice\n\nfunc TwoSumIndices(values []int,target int) (int,int,bool) {\n\tseen:=make(map[int]int)\n\tfor j,v:=range values {\n\t seen[v]=j\n\t if i,ok:=seen[target-v];ok { return i,j,true }\n\t}\n\treturn -1,-1,false\n}\n",
    "hints": [
      "Верни индексы двух разных элементов с суммой target. Выбери пару с минимальным правым индексом, а при равенстве — минимальным левым. При отсутствии верни -1,-1,false. Вход не меняй. Все числа и target-value укладываются в int.",
      "Храним первый индекс каждого значения.",
      "j — правый индекс потенциальной пары.",
      "Перебрали все варианты правого индекса.",
      "seen:=make(map[int]int)\nfor j,v:=range values {\n if i,ok:=seen[target-v];ok { return i,j,true }\n if _,ok:=seen[v];!ok { seen[v]=j }\n}\nreturn -1,-1,false"
    ],
    "related": [
      [
        "core-first-repeat",
        "Найти первый повторяющийся элемент"
      ]
    ],
    "production": "Поиск пар по ключу или дополнению без квадратичного перебора. Для произвольных int отдельно контролируй переполнение при вычислении дополнения.",
    "interview": "Как решить Two Sum за ожидаемое O(n) вместо O(n²)?"
  },
  "core-first-unique-rune": {
    "frames": [
      [
        "Вход",
        [
          "я",
          "A",
          "я",
          "🙂",
          "A"
        ],
        "s=\"яAя🙂A\"",
        "Первое появление не обязательно уникально."
      ],
      [
        "Первый проход",
        [
          "я:2",
          "A:2",
          "🙂:1"
        ],
        "counts",
        "Считаем частоты всей строки."
      ],
      [
        "Второй проход",
        [
          "я",
          "A"
        ],
        "counts[я]=2, counts[A]=2",
        "Пропускаем повторы."
      ],
      [
        "Выход",
        [
          "🙂"
        ],
        "counts[🙂]=1",
        "Это первая руна с частотой один."
      ]
    ],
    "steps": [
      [
        "Создать счётчики",
        "counts:=make(map[rune]int)",
        "Нужно знать полную кратность каждой руны."
      ],
      [
        "Подсчитать частоты",
        "for _,r:=range s { counts[r]++ }",
        "Первый проход учитывает и будущие повторы."
      ],
      [
        "Сохранить порядок входа",
        "for _,r:=range s { if counts[r]==1 { return r,true } }",
        "Второй проход по строке, а не по map, гарантирует первый уникальный элемент."
      ],
      [
        "Обработать отсутствие",
        "return 0,false",
        "Нулевая руна может быть валидным результатом, поэтому нужен bool."
      ]
    ],
    "blocks": [
      "Обработать отсутствие",
      "Создать счётчики",
      "Подсчитать частоты",
      "Сохранить порядок входа"
    ],
    "order": [
      1,
      2,
      3,
      0
    ],
    "blanks": [
      {
        "before": "if counts[r]==",
        "after": " { return r,true }",
        "options": [
          "1",
          "0",
          "2"
        ],
        "correct": 0,
        "explain": "Уникальный элемент имеет частоту 1."
      },
      {
        "before": "for _,r:=range ",
        "after": " {",
        "options": [
          "s",
          "counts",
          "nil"
        ],
        "correct": 0,
        "explain": "Порядок исходной строки важен."
      }
    ],
    "partial": "package practice\n\nfunc FirstUniqueRune(s string) (rune,bool) {\n\tcounts:=make(map[rune]int)\n\tfor _,r:=range s { counts[r]++ }\n\t// TODO: вторым проходом найди первую руну с частотой 1\n\treturn 0,false\n}\n",
    "bug": "package practice\n\nfunc FirstUniqueRune(s string) (rune,bool) {\n\tseen:=make(map[rune]bool)\n\tfor _,r:=range s { if !seen[r] { return r,true };seen[r]=true }\n\treturn 0,false\n}\n",
    "hints": [
      "Верни первую руну, встречающуюся ровно один раз, в порядке исходной строки. Если такой руны нет, верни 0,false. Регистр значим; range по строке задаёт обработку невалидного UTF-8.",
      "Нужно знать полную кратность каждой руны.",
      "Первый проход учитывает и будущие повторы.",
      "Нулевая руна может быть валидным результатом, поэтому нужен bool.",
      "counts:=make(map[rune]int)\nfor _,r:=range s { counts[r]++ }\nfor _,r:=range s { if counts[r]==1 { return r,true } }\nreturn 0,false"
    ],
    "related": [
      [
        "core-rune-frequency",
        "Посчитать частоту Unicode code points"
      ]
    ],
    "production": "Поиск первого уникального идентификатора или символа по полной коллекции. В потоковой задаче без полного входа понятие уникальности требует отдельного контракта.",
    "interview": "Почему нельзя просто вернуть первый ключ с частотой 1 при range по map?"
  },
  "core-sliding-window": {
    "frames": [
      [
        "Вход",
        [
          "2",
          "1",
          "5",
          "3",
          "2"
        ],
        "k=3",
        "Окно фиксированной длины."
      ],
      [
        "Первое окно",
        [
          "2",
          "1",
          "5"
        ],
        "sum=8, best=8",
        "Суммируем первые k элементов."
      ],
      [
        "Сдвиг вправо",
        [
          "1",
          "5",
          "3"
        ],
        "sum=8-2+3=9, best=9",
        "Убираем левый и добавляем новый правый элемент."
      ],
      [
        "Следующее окно",
        [
          "5",
          "3",
          "2"
        ],
        "sum=9-1+2=10, best=10",
        "Обновление суммы O(1)."
      ],
      [
        "Выход",
        [
          "10"
        ],
        "return 10,true",
        "Максимум среди всех окон."
      ]
    ],
    "steps": [
      [
        "Проверить размер",
        "if k<=0||k>len(values) { return 0,false }",
        "Нужно хотя бы одно полное окно."
      ],
      [
        "Посчитать первое окно",
        "sum:=0\nfor _,v:=range values[:k] { sum+=v }\nbest:=sum",
        "Даже при всех отрицательных числах best — реальная сумма."
      ],
      [
        "Сдвигать окно",
        "for i:=k;i<len(values);i++ {",
        "i — индекс нового правого элемента."
      ],
      [
        "Обновить сумму и максимум",
        "sum-=values[i-k]\nsum+=values[i]\nif sum>best { best=sum }\n}",
        "Размер окна остаётся k, пересчитывать остальные элементы не нужно."
      ],
      [
        "Вернуть максимум",
        "return best,true",
        "Все допустимые окна проверены."
      ]
    ],
    "blocks": [
      "Вернуть максимум",
      "Проверить размер",
      "Посчитать первое окно",
      "Сдвигать окно",
      "Обновить сумму и максимум"
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
        "before": "best := ",
        "after": "",
        "options": [
          "sum",
          "0",
          "k"
        ],
        "correct": 0,
        "explain": "Максимум должен начинаться с действительного окна."
      },
      {
        "before": "sum -= values[",
        "after": "]",
        "options": [
          "i-k",
          "i",
          "k"
        ],
        "correct": 0,
        "explain": "Убираем вышедший слева элемент."
      }
    ],
    "partial": "package practice\n\nfunc MaxWindowSum(values []int,k int) (int,bool) {\n\tif k<=0||k>len(values) { return 0,false }\n\tsum:=0\n\tfor _,v:=range values[:k] { sum+=v }\n\tbest:=sum\n\t// TODO: сдвигай окно и обновляй best\n\treturn best,true\n}\n",
    "bug": "package practice\n\nfunc MaxWindowSum(values []int,k int) (int,bool) {\n\tif k<=0||k>len(values) { return 0,false }\n\tsum:=0\n\tfor _,v:=range values[:k] { sum+=v }\n\tbest:=0\n\tfor i:=k;i<len(values);i++ { sum-=values[i-k];sum+=values[i];if sum>best { best=sum } }\n\treturn best,true\n}\n",
    "hints": [
      "Верни максимальную сумму непрерывного окна ровно из k элементов. Если k<=0 или k>len(values), верни 0,false. Вход не меняй. Все промежуточные суммы укладываются в int. Используй скользящее окно O(n).",
      "Нужно хотя бы одно полное окно.",
      "Даже при всех отрицательных числах best — реальная сумма.",
      "Все допустимые окна проверены.",
      "if k<=0||k>len(values) { return 0,false }\nsum:=0\nfor _,v:=range values[:k] { sum+=v }\nbest:=sum\nfor i:=k;i<len(values);i++ {\n sum-=values[i-k]\n sum+=values[i]\n if sum>best { best=sum }\n}\nreturn best,true"
    ],
    "related": [
      [
        "core-batches",
        "Разбить список на батчи"
      ]
    ],
    "production": "Агрегация фиксированного числа последних измерений, rolling sum. Для окна по времени нужны timestamps и удаление устаревших событий, а не просто фиксированное k.",
    "interview": "Как сократить перебор окон O(n*k) до O(n)?"
  },
  "core-event-summary": {
    "frames": [
      [
        "Вход",
        [
          " Active ",
          "cancelled",
          "ACTIVE",
          " ",
          "Pending"
        ],
        "order=[], counts={}",
        "Условия API определяют нормализацию."
      ],
      [
        "Первый статус",
        [
          "active"
        ],
        "order=[active], counts={active:1}",
        "TrimSpace и ToLower; первое появление."
      ],
      [
        "Следующий статус",
        [
          "active",
          "cancelled"
        ],
        "counts={active:1,cancelled:1}",
        "Новый ключ добавляется в порядок."
      ],
      [
        "Повтор и пустое значение",
        [
          "active",
          "cancelled"
        ],
        "counts.active=2; пустой пропускаем",
        "Счётчик растёт, порядок не дублируется."
      ],
      [
        "Выход",
        [
          "active",
          "cancelled",
          "pending"
        ],
        "counts={active:2,cancelled:1,pending:1}",
        "Два согласованных результата для API."
      ]
    ],
    "steps": [
      [
        "Подготовить результаты",
        "order:=make([]string,0)\ncounts:=make(map[string]int)",
        "Срез хранит порядок, map — частоты."
      ],
      [
        "Перебрать и нормализовать",
        "for _,raw:=range statuses {\n status:=strings.ToLower(strings.TrimSpace(raw))",
        "Правила нормализации заданы контрактом."
      ],
      [
        "Пропустить пустой статус",
        "if status==\"\" { continue }",
        "Не создаём пустые группы."
      ],
      [
        "Зафиксировать первое появление",
        "if counts[status]==0 { order=append(order,status) }",
        "Частота 0 до увеличения означает новый ключ."
      ],
      [
        "Увеличить частоту",
        "counts[status]++\n}",
        "Повторы учитываются без добавления в order."
      ],
      [
        "Вернуть сводку",
        "return order,counts",
        "Оба результата независимы от входной коллекции."
      ]
    ],
    "blocks": [
      "Вернуть сводку",
      "Подготовить результаты",
      "Перебрать и нормализовать",
      "Пропустить пустой статус",
      "Зафиксировать первое появление",
      "Увеличить частоту"
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
        "before": "if status==\"\" { ",
        "after": " }",
        "options": [
          "continue",
          "break",
          "return nil,nil"
        ],
        "correct": 0,
        "explain": "Пропускаем только текущий пустой элемент."
      },
      {
        "before": "if counts[status]==",
        "after": " { order=append(order,status) }",
        "options": [
          "0",
          "1",
          "-1"
        ],
        "correct": 0,
        "explain": "До первого увеличения частота равна нулю."
      }
    ],
    "partial": "package practice\n\nfunc SummarizeEventStatuses(statuses []string) ([]string,map[string]int) {\n\torder:=make([]string,0)\n\tcounts:=make(map[string]int)\n\tfor _,raw:=range statuses {\n\t status:=strings.ToLower(strings.TrimSpace(raw))\n\t if status==\"\" { continue }\n\t // TODO: обнови порядок при первом появлении и увеличь частоту\n\t _=status\n\t}\n\treturn order,counts\n}\n",
    "bug": "package practice\n\nfunc SummarizeEventStatuses(statuses []string) ([]string,map[string]int) {\n\torder:=make([]string,0)\n\tcounts:=make(map[string]int)\n\tfor _,raw:=range statuses {\n\t status:=strings.ToLower(strings.TrimSpace(raw))\n\t if status==\"\" { continue }\n\t order=append(order,status)\n\t counts[status]++\n\t}\n\treturn order,counts\n}\n",
    "hints": [
      "Нормализуй каждый статус через strings.TrimSpace и strings.ToLower. Пропусти пустые статусы. Верни уникальные нормализованные статусы в порядке первого появления и map их частот. Вход не меняй. Для пустого результата верни инициализированные пустые срез и map.",
      "Срез хранит порядок, map — частоты.",
      "Правила нормализации заданы контрактом.",
      "Оба результата независимы от входной коллекции.",
      "order:=make([]string,0)\ncounts:=make(map[string]int)\nfor _,raw:=range statuses {\n status:=strings.ToLower(strings.TrimSpace(raw))\n if status==\"\" { continue }\n if counts[status]==0 { order=append(order,status) }\n counts[status]++\n}\nreturn order,counts"
    ],
    "related": [
      [
        "core-normalize-space",
        "Нормализовать пробелы в строке"
      ]
    ],
    "production": "Агрегация статусов для API, аналитики или UI. В реальном сервисе статусы обычно enum: неизвестные значения валидируются, а нормализация и порядок определяются продуктовым контрактом.",
    "interview": "Почему для такого ответа используют и map, и slice?"
  },
  "errors": {
    "frames": [
      [
        "Причина",
        [
          "repository → not found"
        ],
        "err = cause",
        "Исходная ошибка имеет собственную идентичность."
      ],
      [
        "Проверка",
        [
          "err != nil"
        ],
        "if err == nil { return nil }",
        "Не создаём ошибку при успехе."
      ],
      [
        "Оборачивание",
        [
          "load event → cause"
        ],
        "fmt.Errorf(\"load event: %w\", err)",
        "Добавляем контекст и сохраняем связь."
      ],
      [
        "Проверка вызывающим кодом",
        [
          "errors.Is → true"
        ],
        "errors.Is(wrapped,cause)",
        "Причина доступна через цепочку."
      ]
    ],
    "steps": [
      [
        "Проверить отсутствие ошибки",
        "if err == nil { return nil }",
        "nil означает успех."
      ],
      [
        "Добавить контекст",
        "return fmt.Errorf(\"load event: %w\", err)",
        "%w сохраняет исходную причину."
      ]
    ],
    "blocks": [
      "Добавить контекст",
      "Проверить отсутствие ошибки"
    ],
    "order": [
      1,
      0
    ],
    "blanks": [
      {
        "before": "fmt.Errorf(\"load event: ",
        "after": "\", err)",
        "options": [
          "%v",
          "%w",
          "%s"
        ],
        "correct": 1,
        "explain": "Для оборачивания нужна %w."
      },
      {
        "before": "if err == nil { return ",
        "after": " }",
        "options": [
          "nil",
          "err.Error()",
          "errors.New(\"nil\")"
        ],
        "correct": 0,
        "explain": "Успех остаётся успехом."
      }
    ],
    "partial": "package practice\nfunc WithContext(err error) error {\n if err==nil {return nil}\n // TODO: оберни ошибку с контекстом\n return err\n}\n",
    "bug": "package practice\nfunc WithContext(err error) error {\n if err==nil {return nil}\n return fmt.Errorf(\"load event: %v\",err)\n}\n",
    "hints": [
      "Вначале обработай err == nil.",
      "Используй fmt.Errorf.",
      "Строка: \"load event: %w\".",
      "%w сохраняет исходную причину.",
      "package practice\n\nimport \"fmt\"\nfunc WithContext(err error) error {\n\tif err == nil { return nil }\n\treturn fmt.Errorf(\"load event: %w\", err)\n}\n"
    ],
    "related": [
      [
        "defer-cleanup",
        "Сохранить ошибку при закрытии ресурса"
      ]
    ],
    "production": "На границе repository/service добавляй контекст операции, не раскрывая внутренние детали клиенту. Используй errors.Is для классификации, а не сравнение текста.",
    "interview": "Чем отличаются errors.Is и errors.As?"
  },
  "typednil": {
    "frames": [
      [
        "Указатель",
        [
          "*MyError",
          "nil"
        ],
        "var e *MyError",
        "Указатель равен nil."
      ],
      [
        "Преобразование",
        [
          "type: *MyError",
          "value: nil"
        ],
        "var err error = e",
        "Интерфейс получил динамический тип."
      ],
      [
        "Сравнение",
        [
          "err != nil"
        ],
        "true",
        "Интерфейс с динамическим типом не является nil."
      ],
      [
        "Исправление",
        [
          "type: отсутствует",
          "value: отсутствует"
        ],
        "return nil",
        "Возвращаем nil interface напрямую."
      ]
    ],
    "steps": [
      [
        "Проверить флаг",
        "if !fail {",
        "При успехе не нужен объект ошибки."
      ],
      [
        "Вернуть настоящий nil",
        "return nil\n}",
        "Не преобразуем nil-указатель в интерфейс."
      ],
      [
        "Создать ошибку при сбое",
        "return &MyError{}",
        "При fail=true возвращаем ненулевую ошибку."
      ]
    ],
    "blocks": [
      "Создать ошибку при сбое",
      "Проверить флаг",
      "Вернуть настоящий nil"
    ],
    "order": [
      1,
      2,
      0
    ],
    "blanks": [
      {
        "before": "if !fail { return ",
        "after": " }",
        "options": [
          "nil",
          "(*MyError)(nil)",
          "&MyError{}"
        ],
        "correct": 0,
        "explain": "Возвращаем nil интерфейс."
      },
      {
        "before": "return ",
        "after": "",
        "options": [
          "&MyError{}",
          "nil",
          "\"failed\""
        ],
        "correct": 0,
        "explain": "Ненулевая ошибка при сбое."
      }
    ],
    "partial": "package practice\ntype MyError struct{}\nfunc (*MyError) Error() string{return \"failed\"}\nfunc MaybeError(fail bool) error {\n // TODO: верни nil при успехе\n return &MyError{}\n}\n",
    "bug": "package practice\ntype MyError struct{}\nfunc (*MyError) Error() string{return \"failed\"}\nfunc MaybeError(fail bool) error {\n var e *MyError\n if fail {e=&MyError{}}\n return e\n}\n",
    "hints": [
      "Проверь значение e перед возвратом.",
      "error — интерфейс; *MyError(nil) не равен nil-interface.",
      "При e==nil возвращай nil напрямую.",
      "При fail=true возвращаем ненулевую ошибку.",
      "package practice\ntype MyError struct{}\nfunc (*MyError) Error() string{return \"failed\"}\nfunc MaybeError(fail bool)error{if !fail{return nil};return &MyError{}}\n"
    ],
    "related": [
      [
        "errors",
        "Оборачивать ошибки сервиса"
      ]
    ],
    "production": "Не возвращай nil-указатель конкретного типа как error. Проверяй контракт на границе сервиса; не используй reflect как универсальный обход проблемы.",
    "interview": "Почему `var err error = (*MyError)(nil)` не равен nil?"
  },
  "activity-methods": {
    "frames": [
      [
        "Начальное состояние",
        [
          "LastMessageAt=0",
          "Unread=0"
        ],
        "at=10",
        "Нулевое значение структуры пригодно к работе."
      ],
      [
        "Новое событие",
        [
          "LastMessageAt=10",
          "Unread=1"
        ],
        "return true",
        "Обновляем оба поля."
      ],
      [
        "Повтор",
        [
          "LastMessageAt=10",
          "Unread=1"
        ],
        "at=10 → false",
        "Повторный timestamp не изменяет состояние."
      ],
      [
        "Старое событие",
        [
          "LastMessageAt=10",
          "Unread=1"
        ],
        "at=9 → false",
        "Не допускаем движение времени назад."
      ],
      [
        "Следующее событие",
        [
          "LastMessageAt=11",
          "Unread=2"
        ],
        "at=11 → true",
        "Инварианты сохранены."
      ]
    ],
    "steps": [
      [
        "Проверить receiver и timestamp",
        "if a==nil || at<=0 || at<=a.LastMessageAt { return false }",
        "Проверка nil должна предшествовать чтению поля."
      ],
      [
        "Обновить активность",
        "a.LastMessageAt=at",
        "Pointer receiver меняет исходный объект."
      ],
      [
        "Увеличить счётчик",
        "a.Unread++",
        "Только принятые события изменяют счётчик."
      ],
      [
        "Сообщить результат",
        "return true",
        "Вызывающий код знает, была ли мутация."
      ]
    ],
    "blocks": [
      "Сообщить результат",
      "Проверить receiver и timestamp",
      "Обновить активность",
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
        "before": "func (a ",
        "after": "ChatActivity) ApplyMessage",
        "options": [
          "*",
          "",
          "&"
        ],
        "correct": 0,
        "explain": "Нужен pointer receiver."
      },
      {
        "before": "at ",
        "after": " a.LastMessageAt",
        "options": [
          "<=",
          "<",
          ">="
        ],
        "correct": 0,
        "explain": "Отклоняем повтор и старое событие."
      }
    ],
    "partial": "package practice\ntype ChatActivity struct { LastMessageAt int64; Unread int }\nfunc (a *ChatActivity) ApplyMessage(at int64) bool {\n if a==nil||at<=0||at<=a.LastMessageAt{return false}\n a.LastMessageAt=at\n // TODO: обнови счётчик\n return true\n}\n",
    "bug": "package practice\ntype ChatActivity struct { LastMessageAt int64; Unread int }\nfunc (a *ChatActivity) ApplyMessage(at int64) bool {\n if a==nil||at<=0||at<a.LastMessageAt{return false}\n a.LastMessageAt=at;a.Unread++;return true\n}\n",
    "hints": [
      "Проверь a==nil, at<=0 и at<=a.LastMessageAt.",
      "Если проверка прошла — обнови LastMessageAt.",
      "Увеличь Unread и верни true.",
      "Вызывающий код знает, была ли мутация.",
      "type ChatActivity struct { LastMessageAt int64; Unread int }\nfunc (a *ChatActivity) ApplyMessage(at int64) bool {\n\tif a==nil || at<=0 || at<=a.LastMessageAt { return false }\n\ta.LastMessageAt=at\n\ta.Unread++\n\treturn true\n}\n"
    ],
    "related": [
      [
        "core-clone-config",
        "Скопировать структуру с указателем"
      ]
    ],
    "production": "Монотонное обновление активности — пример доменного инварианта. В реальном конкурентном сервисе необходима атомарная операция в хранилище или синхронизация; timestamp сам по себе не уникальный ID события.",
    "interview": "Когда использовать value receiver, а когда pointer receiver? Как это влияет на method set?"
  },
  "defer-cleanup": {
    "frames": [
      [
        "Результат работы",
        [
          "workErr = write failed"
        ],
        "err пока nil",
        "Основная операция завершилась ошибкой."
      ],
      [
        "Регистрация",
        [
          "defer Close"
        ],
        "defer func(){...}()",
        "Ресурс нужно закрыть независимо от результата работы."
      ],
      [
        "Return",
        [
          "err = workErr"
        ],
        "return workErr",
        "Именованный результат установлен до defer."
      ],
      [
        "Закрытие",
        [
          "Close → flush failed"
        ],
        "errors.Join(err, closer.Close())",
        "Объединяем обе причины."
      ],
      [
        "Выход",
        [
          "write failed",
          "flush failed"
        ],
        "errors.Is → true для обеих",
        "Ни одна ошибка не потеряна."
      ]
    ],
    "steps": [
      [
        "Проверить отсутствие ресурса",
        "if closer==nil { return workErr }",
        "Nil-интерфейс не вызываем."
      ],
      [
        "Зарегистрировать закрытие",
        "defer func(){ err=errors.Join(err,closer.Close()) }()",
        "Замыкание обновит именованный результат при выходе."
      ],
      [
        "Вернуть основную ошибку",
        "return workErr",
        "До передачи результата выполнится defer."
      ]
    ],
    "blocks": [
      "Вернуть основную ошибку",
      "Проверить отсутствие ресурса",
      "Зарегистрировать закрытие"
    ],
    "order": [
      1,
      2,
      0
    ],
    "blanks": [
      {
        "before": "err = errors.",
        "after": "(err,closer.Close())",
        "options": [
          "Join",
          "New",
          "Is"
        ],
        "correct": 0,
        "explain": "Join сохраняет обе причины."
      },
      {
        "before": "defer ",
        "after": "(){ err=errors.Join(err,closer.Close()) }()",
        "options": [
          "func",
          "go",
          "return"
        ],
        "correct": 0,
        "explain": "Тело замыкания выполнится при выходе."
      }
    ],
    "partial": "package practice\nfunc CloseWithError(workErr error,closer io.Closer)(err error){\n if closer==nil{return workErr}\n defer func(){ _=closer.Close() }()\n // TODO: сохрани ошибку Close\n return workErr\n}\n",
    "bug": "package practice\nfunc CloseWithError(workErr error,closer io.Closer)(err error){\n if closer==nil{return workErr}\n defer func(){err=closer.Close()}()\n return workErr\n}\n",
    "hints": [
      "Если closer==nil, возвращай workErr.",
      "Зарегистрируй defer с замыканием, чтобы закрытие произошло при выходе из функции.",
      "В defer выполни err = errors.Join(err, closer.Close()).",
      "До передачи результата выполнится defer.",
      "func CloseWithError(workErr error, closer io.Closer) (err error) {\n\tif closer == nil { return workErr }\n\tdefer func() { err = errors.Join(err, closer.Close()) }()\n\treturn workErr\n}\n"
    ],
    "related": [
      [
        "core-defer-result",
        "Изменить результат через defer"
      ]
    ],
    "production": "Закрытие файла или flush ресурса может быть значимой частью операции. Сохраняй обе причины; учитывай, что nil-интерфейс и typed nil различаются.",
    "interview": "В каком порядке выполняются defer и как сохранить ошибку Close, не потеряв основную ошибку?"
  },
  "generic-unique": {
    "frames": [
      [
        "Вход",
        [
          "2",
          "1",
          "2",
          "3"
        ],
        "T=int",
        "Тип выводится из аргумента."
      ],
      [
        "Первый элемент",
        [
          "seen: 2",
          "out: 2"
        ],
        "map[T]struct{}",
        "Constraint comparable разрешает ключи map."
      ],
      [
        "Второй элемент",
        [
          "seen: 2,1",
          "out: 2,1"
        ],
        "v=1",
        "Сохраняем первое появление."
      ],
      [
        "Повтор",
        [
          "seen: 2,1",
          "out: 2,1"
        ],
        "v=2 → continue",
        "Не добавляем повтор."
      ],
      [
        "Выход",
        [
          "2",
          "1",
          "3"
        ],
        "return out",
        "Тот же алгоритм работает для string."
      ]
    ],
    "steps": [
      [
        "Создать множество",
        "seen:=make(map[T]struct{},len(values))",
        "T ограничен comparable."
      ],
      [
        "Создать выход",
        "out:=make([]T,0,len(values))",
        "Тип элементов сохраняется."
      ],
      [
        "Обойти значения",
        "for _,v:=range values {",
        "Работаем с T без type assertions."
      ],
      [
        "Проверить повтор",
        "if _,ok:=seen[v];ok{continue}",
        "Повторные значения пропускаем."
      ],
      [
        "Запомнить и добавить",
        "seen[v]=struct{}{}\nout=append(out,v)\n}",
        "Порядок задаёт вход, не map."
      ],
      [
        "Вернуть результат",
        "return out",
        "Результат имеет тип []T."
      ]
    ],
    "blocks": [
      "Вернуть результат",
      "Создать множество",
      "Создать выход",
      "Обойти значения",
      "Проверить повтор",
      "Запомнить и добавить"
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
        "before": "func UniqueValues[T ",
        "after": "](values []T) []T",
        "options": [
          "any",
          "comparable",
          "string"
        ],
        "correct": 1,
        "explain": "Для ключа map нужен comparable."
      },
      {
        "before": "seen[v] = ",
        "after": "",
        "options": [
          "struct{}{}",
          "true",
          "nil"
        ],
        "correct": 0,
        "explain": "Пустая структура хранит факт присутствия."
      }
    ],
    "partial": "package practice\nfunc UniqueValues[T comparable](values []T) []T {\n seen:=make(map[T]struct{})\n out:=make([]T,0,len(values))\n for _,v:=range values {seen[v]=struct{}{};out=append(out,v)}\n // TODO: пропускай повторы\n return out\n}\n",
    "bug": "package practice\nfunc UniqueValues[T comparable](values []T) []T {\n seen:=make(map[T]struct{})\n for _,v:=range values {seen[v]=struct{}{}}\n out:=make([]T,0,len(seen))\n // BUG: идём по входу в обратном порядке\n for i:=len(values)-1;i>=0;i-- {v:=values[i];if _,ok:=seen[v];ok{out=append(out,v);delete(seen,v)}}\n return out\n}\n",
    "hints": [
      "Создай seen := make(map[T]struct{},len(values)).",
      "Перебери values через range; если значение уже встречалось, пропусти.",
      "Иначе добавь в seen и append в result.",
      "Результат имеет тип []T.",
      "func UniqueValues[T comparable](values []T) []T {\n seen:=make(map[T]struct{},len(values))\n out:=make([]T,0,len(values))\n for _,v:=range values {if _,ok:=seen[v];ok{continue};seen[v]=struct{}{};out=append(out,v)}\n return out\n}\n"
    ],
    "related": [
      [
        "dedupe",
        "Убрать дубли получателей"
      ]
    ],
    "production": "Обобщай действительно одинаковые алгоритмы для нескольких типов. Comparable не гарантирует отсутствие panic для interface-ключей с динамически несравнимым значением; для обычных int/string такой проблемы нет.",
    "interview": "Что такое type parameters и constraint comparable, чем generics отличаются от interface{}?"
  },
  "advanced-value-receiver": {
    "frames": [
      [
        "Вход",
        [
          "original.Limit=10",
          "limit=20"
        ],
        "original.WithLimit(20)",
        "Value receiver получает копию структуры."
      ],
      [
        "Локальная копия",
        [
          "original=10",
          "q=10"
        ],
        "q.Limit=20",
        "Меняем только поле копии."
      ],
      [
        "Возврат",
        [
          "original=10",
          "result=20"
        ],
        "return q",
        "Оригинал остаётся неизменным."
      ],
      [
        "Неверный лимит",
        [
          "original=10",
          "result=10"
        ],
        "limit=0",
        "Не допускаем некорректное состояние."
      ]
    ],
    "steps": [
      [
        "Проверить лимит",
        "if limit>0 {",
        "limit > 0 сравнивает аргумент с нулём; при false тело if пропускается."
      ],
      [
        "Обновить локальную копию",
        "q.Limit=limit\n}",
        "q — копия ServiceQuota. Присваивание меняет только её поле Limit, а не поле вызывающего объекта."
      ],
      [
        "Вернуть копию",
        "return q",
        "return q возвращает всю структуру. Для изменения оригинала вызывающий код может присвоить результат обратно."
      ]
    ],
    "blocks": [
      "Вернуть копию",
      "Проверить лимит",
      "Обновить локальную копию"
    ],
    "order": [
      1,
      2,
      0
    ],
    "blanks": [
      {
        "before": "func (q ",
        "after": "ServiceQuota) WithLimit",
        "options": [
          "",
          "*",
          "&"
        ],
        "correct": 0,
        "explain": "Для этого контракта нужен value receiver."
      },
      {
        "before": "if limit ",
        "after": " 0",
        "options": [
          ">",
          ">=",
          "<"
        ],
        "correct": 0,
        "explain": "Допускаем строго положительное значение."
      }
    ],
    "partial": "package practice\n\ntype ServiceQuota struct { Limit int }\nfunc (q *ServiceQuota) SetLimit(limit int) { q.Limit=limit }\n\nfunc (q ServiceQuota) WithLimit(limit int) ServiceQuota {\n\tif limit<=0 { return q }\n\t// TODO: обнови локальную копию\n\treturn q\n}\n",
    "bug": "package practice\n\ntype ServiceQuota struct { Limit int }\nfunc (q *ServiceQuota) SetLimit(limit int) { q.Limit=limit }\n\nfunc (q ServiceQuota) WithLimit(limit int) ServiceQuota {\n\tq.Limit=limit\n\treturn q\n}\n",
    "hints": [
      "Начни: Проверить лимит.",
      "limit > 0 сравнивает аргумент с нулём; при false тело if пропускается.",
      "Следующее действие: Обновить локальную копию. q — копия ServiceQuota. Присваивание меняет только её поле Limit, а не поле вызывающего объекта.",
      "Проверь план: Проверить лимит → Обновить локальную копию → Вернуть копию.",
      "if limit>0 { q.Limit=limit }\nreturn q"
    ],
    "related": [
      [
        "activity-methods",
        "Метод обновления активности чата"
      ]
    ],
    "production": "Value receiver удобен для небольших value objects. Копирование структуры с map, slice или pointer не обеспечивает глубокую независимость; структуры с mutex нельзя копировать после использования.",
    "interview": "Когда value receiver не гарантирует отсутствие мутации исходных данных?"
  },
  "advanced-embedding": {
    "frames": [
      [
        "Вход",
        [
          "id=u1",
          "name=Go",
          "active=true"
        ],
        "NewServiceProfile(...)",
        "Поля относятся к двум структурам."
      ],
      [
        "Композиция",
        [
          "ProfileMeta",
          "ID=u1",
          "Active=true"
        ],
        "ProfileMeta{ID:id,Active:active}",
        "Вложенное значение создаётся явно."
      ],
      [
        "Сборка",
        [
          "ProfileMeta",
          "Name=Go"
        ],
        "ServiceProfile{ProfileMeta:...,Name:name}",
        "Embedding включает поле типа ProfileMeta."
      ],
      [
        "Доступ",
        [
          "p.ID=u1",
          "p.IsActive()=true"
        ],
        "promoted field / method",
        "Поля и методы доступны через внешнюю структуру."
      ]
    ],
    "steps": [
      [
        "Создать вложенное значение",
        "ProfileMeta{ID:id,Active:active}",
        "Литерал ProfileMeta{ID: id, Active: active} создаёт значение вложенного типа; имена слева — поля, справа — аргументы."
      ],
      [
        "Собрать внешнюю структуру",
        "return ServiceProfile{ProfileMeta:ProfileMeta{ID:id,Active:active},Name:name}",
        "ServiceProfile содержит embedded field ProfileMeta и обычное поле Name. В литерале нельзя писать promoted ID напрямую: заполняем ProfileMeta явно, затем Name."
      ]
    ],
    "blocks": [
      "Собрать внешнюю структуру",
      "Создать вложенное значение"
    ],
    "order": [
      1,
      0
    ],
    "blanks": [
      {
        "before": "ServiceProfile{",
        "after": " :ProfileMeta{ID:id,Active:active},Name:name}",
        "options": [
          "ProfileMeta",
          "ID",
          "Active"
        ],
        "correct": 0,
        "explain": "В литерале указывается имя непосредственного поля."
      },
      {
        "before": "p.",
        "after": "()",
        "options": [
          "IsActive",
          "Active",
          "ID"
        ],
        "correct": 0,
        "explain": "Метод вложенного типа продвигается во внешний тип."
      }
    ],
    "partial": "package practice\n\ntype ProfileMeta struct { ID string; Active bool }\nfunc (m ProfileMeta) IsActive() bool { return m.Active }\ntype ServiceProfile struct { ProfileMeta; Name string }\n\nfunc NewServiceProfile(id,name string,active bool) ServiceProfile {\n\t// TODO: заполни вложенный ProfileMeta полями ID и Active\n\treturn ServiceProfile{Name:name}\n}\n",
    "bug": "package practice\n\ntype ProfileMeta struct { ID string; Active bool }\nfunc (m ProfileMeta) IsActive() bool { return m.Active }\ntype ServiceProfile struct { ProfileMeta; Name string }\n\nfunc NewServiceProfile(id,name string,active bool) ServiceProfile {\n\treturn ServiceProfile{ProfileMeta:ProfileMeta{ID:id,Active:!active},Name:name}\n}\n",
    "hints": [
      "Начни с литерала вложенного ProfileMeta.",
      "Заполни поля ID и Active аргументами id и active.",
      "Внешний литерал принимает поле ProfileMeta, а не promoted ID.",
      "Заполни также Name и верни ServiceProfile.",
      "return ServiceProfile{ProfileMeta:ProfileMeta{ID:id,Active:active},Name:name}"
    ],
    "related": [
      [
        "advanced-value-receiver",
        "Обновить конфигурацию без изменения оригинала"
      ]
    ],
    "production": "Embedding помогает переиспользовать поведение, но создаёт часть публичного API внешнего типа. При конфликте имён или необходимости строгой инкапсуляции лучше использовать именованное поле и явные методы.",
    "interview": "Является ли embedding наследованием?"
  },
  "advanced-repository": {
    "frames": [
      [
        "Зависимость",
        [
          "service",
          "NameRepository",
          "fake / real"
        ],
        "LoadUserName(repo,\"42\")",
        "Сервис зависит от контракта, а не конкретного хранилища."
      ],
      [
        "Вызов",
        [
          "FindName(\"42\")"
        ],
        "name,err:=repo.FindName(id)",
        "Один вызов репозитория."
      ],
      [
        "Успех",
        [
          "name=Alice",
          "err=nil"
        ],
        "return name,nil",
        "Возвращаем данные."
      ],
      [
        "Ошибка",
        [
          "load user",
          "cause"
        ],
        "fmt.Errorf(\"load user: %w\",err)",
        "Причина остаётся доступной через errors.Is."
      ]
    ],
    "steps": [
      [
        "Вызвать зависимость",
        "name,err:=repo.FindName(id)",
        "repo имеет тип интерфейса NameRepository. := создаёт name и err из двух результатов FindName; передаём исходный id ровно один раз."
      ],
      [
        "Обработать ошибку",
        "if err!=nil { return \"\",fmt.Errorf(\"load user: %w\",err) }",
        "err != nil означает сбой. fmt.Errorf с %w добавляет контекст и сохраняет причину для errors.Is; пустая строка исключает частичный результат."
      ],
      [
        "Вернуть имя",
        "return name,nil",
        "При отсутствии ошибки возвращаем имя и nil. Реальную БД можно заменить fake с тем же методом FindName."
      ]
    ],
    "blocks": [
      "Вернуть имя",
      "Вызвать зависимость",
      "Обработать ошибку"
    ],
    "order": [
      1,
      2,
      0
    ],
    "blanks": [
      {
        "before": "name,err:=repo.",
        "after": "(id)",
        "options": [
          "FindName",
          "LoadUserName",
          "Error"
        ],
        "correct": 0,
        "explain": "Вызываем метод интерфейса."
      },
      {
        "before": "fmt.Errorf(\"load user: ",
        "after": "\",err)",
        "options": [
          "%w",
          "%v",
          "%s"
        ],
        "correct": 0,
        "explain": "Сохраняем причину ошибки."
      }
    ],
    "partial": "package practice\n\ntype NameRepository interface { FindName(id string) (string,error) }\n\nfunc LoadUserName(repo NameRepository,id string) (string,error) {\n\tname,err:=repo.FindName(id)\n\t// TODO: обработай ошибку с контекстом\n\treturn name,err\n}\n",
    "bug": "package practice\n\ntype NameRepository interface { FindName(id string) (string,error) }\n\nfunc LoadUserName(repo NameRepository,id string) (string,error) {\n\tname,err:=repo.FindName(id)\n\tif err!=nil { return \"\",fmt.Errorf(\"load user: %v\",err) }\n\treturn name,nil\n}\n",
    "hints": [
      "Начни: Вызвать зависимость.",
      "repo имеет тип интерфейса NameRepository. := создаёт name и err из двух результатов FindName; передаём исходный id ровно один раз.",
      "Следующее действие: Обработать ошибку. err != nil означает сбой. fmt.Errorf с %w добавляет контекст и сохраняет причину для errors.Is; пустая строка исключает частичный результат.",
      "Проверь план: Вызвать зависимость → Обработать ошибку → Вернуть имя.",
      "name,err:=repo.FindName(id)\nif err!=nil { return \"\",fmt.Errorf(\"load user: %w\",err) }\nreturn name,nil"
    ],
    "related": [
      [
        "errors",
        "Оборачивать ошибки сервиса"
      ]
    ],
    "production": "Небольшие интерфейсы на стороне потребителя упрощают тестирование сервисов без БД. Реальный репозиторий обычно принимает context.Context для отмены и дедлайнов.",
    "interview": "Почему интерфейс часто объявляют на стороне потребителя?"
  },
  "advanced-type-switch": {
    "frames": [
      [
        "Вход",
        [
          "any",
          "dynamic type=int",
          "value=42"
        ],
        "ValueKind(42)",
        "any — alias interface{}."
      ],
      [
        "Проверка",
        [
          "case int"
        ],
        "switch v.(type)",
        "Выбираем ветку по динамическому типу."
      ],
      [
        "Именованный тип",
        [
          "type UserID int",
          "dynamic type=UserID"
        ],
        "case int не совпадает",
        "Определённый тип отличается от int."
      ],
      [
        "Nil",
        [
          "type отсутствует"
        ],
        "case nil",
        "Typed nil указатель относится к other."
      ]
    ],
    "steps": [
      [
        "Начать type switch",
        "switch v.(type) {",
        "v — интерфейс any; v.(type) допустимо в type switch и проверяет динамический тип, а не значение."
      ],
      [
        "Обработать известные типы",
        "case nil: return \"nil\"\ncase string: return \"string\"\ncase int: return \"int\"\ncase bool: return \"bool\"",
        "case nil совпадает только с nil-интерфейсом. string, int и bool — точные типы; именованный UserID не совпадает с int."
      ],
      [
        "Обработать остальные",
        "default: return \"other\"\n}",
        "default выполняется для всех остальных типов, включая typed nil указатель. return завершает функцию; break не нужен."
      ]
    ],
    "blocks": [
      "Обработать остальные",
      "Начать type switch",
      "Обработать известные типы"
    ],
    "order": [
      1,
      2,
      0
    ],
    "blanks": [
      {
        "before": "switch v.(",
        "after": ")",
        "options": [
          "type",
          "int",
          "any"
        ],
        "correct": 0,
        "explain": "Type switch использует специальную форму .(type)."
      },
      {
        "before": "case ",
        "after": " : return \"nil\"",
        "options": [
          "nil",
          "any",
          "string"
        ],
        "correct": 0,
        "explain": "Nil interface обрабатывается отдельным case."
      }
    ],
    "partial": "package practice\n\nfunc ValueKind(v any) string {\n\tswitch v.(type) {\n\tcase nil: return \"nil\"\n\tcase string: return \"string\"\n\t// TODO: обработай int и bool\n\tdefault: return \"other\"\n\t}\n}\n",
    "bug": "package practice\n\nfunc ValueKind(v any) string {\n\tif v==nil { return \"nil\" }\n\tif _,ok:=v.(string);ok { return \"string\" }\n\tif _,ok:=v.(int);ok { return \"int\" }\n\treturn \"other\"\n}\n",
    "hints": [
      "Начни: Начать type switch.",
      "v — интерфейс any; v.(type) допустимо в type switch и проверяет динамический тип, а не значение.",
      "Следующее действие: Обработать известные типы. case nil совпадает только с nil-интерфейсом. string, int и bool — точные типы; именованный UserID не совпадает с int.",
      "Проверь план: Начать type switch → Обработать известные типы → Обработать остальные.",
      "switch v.(type) {\ncase nil: return \"nil\"\ncase string: return \"string\"\ncase int: return \"int\"\ncase bool: return \"bool\"\ndefault: return \"other\"\n}"
    ],
    "related": [
      [
        "typednil",
        "Починить typed nil error"
      ]
    ],
    "production": "Type switch полезен для ограниченных наборов входных форматов и адаптеров. Для доменной логики предпочитай типизированные контракты и не превращай всё в any без необходимости.",
    "interview": "Чем отличается v.(T) от v.(type)?"
  },
  "advanced-errors-as": {
    "frames": [
      [
        "Вход",
        [
          "load user",
          "ServiceCodeError{Code:404}"
        ],
        "err = wrapped",
        "Типизированная ошибка находится внутри обёртки."
      ],
      [
        "Целевая переменная",
        [
          "target: *ServiceCodeError",
          "nil"
        ],
        "var target *ServiceCodeError",
        "As нужен адрес переменной, в которую записать найденное значение."
      ],
      [
        "Поиск",
        [
          "errors.As(err,&target) → true"
        ],
        "target → {Code:404}",
        "As проходит цепочку или дерево ошибок."
      ],
      [
        "Результат",
        [
          "404",
          "true"
        ],
        "target.Code,true",
        "Читаем поле только у ненулевого указателя."
      ]
    ],
    "steps": [
      [
        "Объявить целевой указатель",
        "var target *ServiceCodeError",
        "var target *ServiceCodeError создаёт nil-указатель нужного типа."
      ],
      [
        "Найти ошибку",
        "if errors.As(err,&target)&&target!=nil {",
        "errors.As(err, &target) получает **ServiceCodeError и записывает найденный указатель. && проверяет target только при успехе As; typed nil не разыменовываем."
      ],
      [
        "Вернуть код",
        "return target.Code,true\n}",
        "target.Code — поле найденной ошибки. true отличает найденный код 0 от отсутствия."
      ],
      [
        "Обработать отсутствие",
        "return 0,false",
        "Если совпадения нет или первое совпадение typed nil, возвращаем 0,false."
      ]
    ],
    "blocks": [
      "Обработать отсутствие",
      "Объявить целевой указатель",
      "Найти ошибку",
      "Вернуть код"
    ],
    "order": [
      1,
      2,
      3,
      0
    ],
    "blanks": [
      {
        "before": "errors.As(err,",
        "after": "target)",
        "options": [
          "&",
          "*",
          ""
        ],
        "correct": 0,
        "explain": "As должен записать найденное значение в target."
      },
      {
        "before": "&& target ",
        "after": " nil",
        "options": [
          "!=",
          "==",
          "<"
        ],
        "correct": 0,
        "explain": "Защищаемся от typed nil."
      }
    ],
    "partial": "package practice\n\ntype ServiceCodeError struct { Code int }\nfunc (e *ServiceCodeError) Error() string { return fmt.Sprintf(\"service code %d\",e.Code) }\n\nfunc ExtractServiceCode(err error) (int,bool) {\n\tvar target *ServiceCodeError\n\tif errors.As(err,&target)&&target!=nil {\n\t // TODO: верни код\n\t return 0,true\n\t}\n\treturn 0,false\n}\n",
    "bug": "package practice\n\ntype ServiceCodeError struct { Code int }\nfunc (e *ServiceCodeError) Error() string { return fmt.Sprintf(\"service code %d\",e.Code) }\n\nfunc ExtractServiceCode(err error) (int,bool) {\n\ttarget,ok:=err.(*ServiceCodeError)\n\tif ok&&target!=nil {return target.Code,true}\n\treturn 0,false\n}\n",
    "hints": [
      "Начни: Объявить целевой указатель.",
      "var target *ServiceCodeError создаёт nil-указатель нужного типа.",
      "Следующее действие: Найти ошибку. errors.As(err, &target) получает **ServiceCodeError и записывает найденный указатель. && проверяет target только при успехе As; typed nil не разыменовываем.",
      "Проверь план: Объявить целевой указатель → Найти ошибку → Вернуть код → Обработать отсутствие.",
      "var target *ServiceCodeError\nif errors.As(err,&target)&&target!=nil { return target.Code,true }\nreturn 0,false"
    ],
    "related": [
      [
        "errors",
        "Оборачивать ошибки сервиса"
      ]
    ],
    "production": "Типизированные доменные ошибки могут хранить код, retryability или сведения о нарушенном ограничении. На границе API преобразуй их в публичный ответ, не раскрывая внутренние данные.",
    "interview": "Почему для поиска *MyError в errors.As передают &target, где target имеет тип *MyError?"
  },
  "advanced-method-set": {
    "frames": [
      [
        "Вход",
        [
          "c → Count=5"
        ],
        "c: *ResetCounter",
        "Reset объявлен с pointer receiver."
      ],
      [
        "Присваивание",
        [
          "r: Resettable",
          "dynamic type: *ResetCounter"
        ],
        "var r Resettable=c",
        "Интерфейс содержит копию указателя."
      ],
      [
        "Вызов",
        [
          "Count=0"
        ],
        "r.Reset()",
        "Метод меняет тот же объект."
      ],
      [
        "Выход",
        [
          "true",
          "c.Count=0"
        ],
        "return true",
        "Изменение видно снаружи."
      ]
    ],
    "steps": [
      [
        "Проверить вход",
        "if c==nil||c.Count==0 { return false }",
        "|| вычисляется слева направо: при c == nil поле Count не читается. Нулевой счётчик не требует сброса."
      ],
      [
        "Присвоить интерфейсу",
        "var r Resettable=c",
        "var r Resettable = c проверяет соответствие интерфейсу: Reset входит в method set *ResetCounter, но не ResetCounter."
      ],
      [
        "Вызвать метод",
        "r.Reset()",
        "r.Reset() вызывает метод динамического типа и через указатель меняет исходный Count."
      ],
      [
        "Вернуть результат",
        "return true",
        "true означает, что сброс действительно выполнен."
      ]
    ],
    "blocks": [
      "Вернуть результат",
      "Проверить вход",
      "Присвоить интерфейсу",
      "Вызвать метод"
    ],
    "order": [
      1,
      2,
      3,
      0
    ],
    "blanks": [
      {
        "before": "var r Resettable = ",
        "after": "",
        "options": [
          "c",
          "*c",
          "c.Count"
        ],
        "correct": 0,
        "explain": "Только *ResetCounter имеет нужный method set."
      },
      {
        "before": "r.",
        "after": "()",
        "options": [
          "Reset",
          "Count",
          "Set"
        ],
        "correct": 0,
        "explain": "Вызываем метод контракта."
      }
    ],
    "partial": "package practice\n\ntype Resettable interface { Reset() }\ntype ResetCounter struct { Count int }\nfunc (c *ResetCounter) Reset() { c.Count=0 }\nvar _ Resettable = (*ResetCounter)(nil)\n\nfunc ResetIfNeeded(c *ResetCounter) bool {\n\tif c==nil||c.Count==0 { return false }\n\tvar r Resettable=c\n\t// TODO: вызови Reset через r\n\t_ = r\n\treturn true\n}\n",
    "bug": "package practice\n\ntype Resettable interface { Reset() }\ntype ResetCounter struct { Count int }\nfunc (c *ResetCounter) Reset() { c.Count=0 }\nvar _ Resettable = (*ResetCounter)(nil)\n\nfunc ResetIfNeeded(c *ResetCounter) bool {\n\tif c==nil||c.Count==0 { return false }\n\tcopyValue:=*c\n\tvar r Resettable=&copyValue\n\tr.Reset()\n\treturn true\n}\n",
    "hints": [
      "Начни: Проверить вход.",
      "|| вычисляется слева направо: при c == nil поле Count не читается. Нулевой счётчик не требует сброса.",
      "Следующее действие: Присвоить интерфейсу. var r Resettable = c проверяет соответствие интерфейсу: Reset входит в method set *ResetCounter, но не ResetCounter.",
      "Проверь план: Проверить вход → Присвоить интерфейсу → Вызвать метод → Вернуть результат.",
      "if c==nil||c.Count==0 { return false }\nvar r Resettable=c\nr.Reset()\nreturn true"
    ],
    "related": [
      [
        "advanced-value-receiver",
        "Обновить конфигурацию без изменения оригинала"
      ]
    ],
    "production": "Compile-time assertion var _ Interface = (*Type)(nil) документирует контракт. Он не создаёт рабочий объект и не доказывает, что nil receiver безопасен.",
    "interview": "Почему c.Reset() может компилироваться для адресуемого значения c, но c нельзя присвоить Resettable?"
  },
  "advanced-interface-compose": {
    "frames": [
      [
        "Контракт",
        [
          "LabelReader",
          "LabelWriter"
        ],
        "LabelStore",
        "Композиция включает методы обоих интерфейсов."
      ],
      [
        "Чтение",
        [
          "ReadLabel → go,nil"
        ],
        "label=\"go\"",
        "Читаем данные один раз."
      ],
      [
        "Проверка",
        [
          "err=nil"
        ],
        "переход к записи",
        "Если чтение не удалось, останавливаемся."
      ],
      [
        "Запись",
        [
          "WriteLabel(\"go\")"
        ],
        "return error",
        "Передаём результат записи вызывающему коду."
      ]
    ],
    "steps": [
      [
        "Прочитать данные",
        "label,err:=store.ReadLabel()",
        "ReadLabel возвращает строку и error. := объявляет обе переменные; пустая строка сама по себе допустима."
      ],
      [
        "Проверить ошибку",
        "if err!=nil { return err }",
        "При err != nil return завершает функцию до записи и сохраняет исходную ошибку."
      ],
      [
        "Записать значение",
        "return store.WriteLabel(label)",
        "WriteLabel получает ровно прочитанное значение; возвращаем его error без замены. Два вызова не становятся транзакцией автоматически."
      ]
    ],
    "blocks": [
      "Записать значение",
      "Прочитать данные",
      "Проверить ошибку"
    ],
    "order": [
      1,
      2,
      0
    ],
    "blanks": [
      {
        "before": "type LabelStore interface { LabelReader; ",
        "after": " }",
        "options": [
          "LabelWriter",
          "string",
          "error"
        ],
        "correct": 0,
        "explain": "Объединяем два набора методов."
      },
      {
        "before": "if err!=nil { return ",
        "after": " }",
        "options": [
          "err",
          "nil",
          "label"
        ],
        "correct": 0,
        "explain": "Ошибка чтения прерывает операцию."
      }
    ],
    "partial": "package practice\n\ntype LabelReader interface { ReadLabel() (string,error) }\ntype LabelWriter interface { WriteLabel(string) error }\ntype LabelStore interface { LabelReader; LabelWriter }\n\nfunc CopyLabel(store LabelStore) error {\n\tlabel,err:=store.ReadLabel()\n\tif err!=nil { return err }\n\t// TODO: запиши прочитанное значение\n\t_ = label\n\treturn nil\n}\n",
    "bug": "package practice\n\ntype LabelReader interface { ReadLabel() (string,error) }\ntype LabelWriter interface { WriteLabel(string) error }\ntype LabelStore interface { LabelReader; LabelWriter }\n\nfunc CopyLabel(store LabelStore) error {\n\tlabel,err:=store.ReadLabel()\n\t_ = err\n\treturn store.WriteLabel(label)\n}\n",
    "hints": [
      "Начни: Прочитать данные.",
      "ReadLabel возвращает строку и error. := объявляет обе переменные; пустая строка сама по себе допустима.",
      "Следующее действие: Проверить ошибку. При err != nil return завершает функцию до записи и сохраняет исходную ошибку.",
      "Проверь план: Прочитать данные → Проверить ошибку → Записать значение.",
      "label,err:=store.ReadLabel()\nif err!=nil { return err }\nreturn store.WriteLabel(label)"
    ],
    "related": [
      [
        "advanced-repository",
        "Загрузить имя пользователя через Repository"
      ]
    ],
    "production": "Композиция маленьких интерфейсов позволяет потребителю запрашивать только нужные возможности. Не объединяй интерфейсы без необходимости: это усложняет fake и связывает независимые компоненты.",
    "interview": "Что означает embedding интерфейса в интерфейс?"
  },
  "advanced-domain-error": {
    "frames": [
      [
        "Причина",
        [
          "cause: timeout"
        ],
        "op=\"load\"",
        "Есть исходный объект ошибки."
      ],
      [
        "Обёртка",
        [
          "OperationError",
          "Op=load",
          "Cause → timeout"
        ],
        "&OperationError{Op:op,Cause:cause}",
        "Сохраняем метаданные и исходную причину."
      ],
      [
        "Извлечение",
        [
          "errors.As → OperationError"
        ],
        "target.Op == \"load\"",
        "Типизированная ошибка доступна вызывающему коду."
      ],
      [
        "Классификация",
        [
          "errors.Is → true"
        ],
        "Unwrap() → cause",
        "Цепочка не потеряна."
      ]
    ],
    "steps": [
      [
        "Проверить nil",
        "if cause==nil { return nil }",
        "Если cause == nil, нет причины для обёртки: возвращаем nil-интерфейс."
      ],
      [
        "Создать типизированную обёртку",
        "return &OperationError{Op:op,Cause:cause}",
        "&OperationError{Op: op, Cause: cause} создаёт указатель на структуру. Error формирует текст, Unwrap возвращает исходную причину; errors.As находит тип, errors.Is — причину."
      ]
    ],
    "blocks": [
      "Создать типизированную обёртку",
      "Проверить nil"
    ],
    "order": [
      1,
      0
    ],
    "blanks": [
      {
        "before": "func (e *OperationError) ",
        "after": "() error",
        "options": [
          "Unwrap",
          "Error",
          "String"
        ],
        "correct": 0,
        "explain": "Unwrap предоставляет следующую причину."
      },
      {
        "before": "Cause: ",
        "after": "",
        "options": [
          "cause",
          "errors.New(cause.Error())",
          "nil"
        ],
        "correct": 0,
        "explain": "Сохраняем оригинальную ошибку."
      }
    ],
    "partial": "package practice\n\ntype OperationError struct { Op string; Cause error }\nfunc (e *OperationError) Error() string { return e.Op+\": \"+e.Cause.Error() }\nfunc (e *OperationError) Unwrap() error { return e.Cause }\n\nfunc WrapOperation(op string,cause error) error {\n\tif cause==nil { return nil }\n\t// TODO: верни типизированную ошибку\n\treturn cause\n}\n",
    "bug": "package practice\n\ntype OperationError struct { Op string; Cause error }\nfunc (e *OperationError) Error() string { return e.Op+\": \"+e.Cause.Error() }\nfunc (e *OperationError) Unwrap() error { return e.Cause }\n\nfunc WrapOperation(op string,cause error) error {\n\tif cause==nil { return nil }\n\treturn &OperationError{Op:op,Cause:errors.New(cause.Error())}\n}\n",
    "hints": [
      "Сначала исключи отсутствие причины.",
      "Создай указатель на OperationError.",
      "Заполни Op исходным op, Cause исходным cause.",
      "Не создавай errors.New из текста: Unwrap должен вернуть тот же объект.",
      "if cause==nil { return nil }\nreturn &OperationError{Op:op,Cause:cause}"
    ],
    "related": [
      [
        "advanced-errors-as",
        "Извлечь код типизированной ошибки"
      ]
    ],
    "production": "Доменная ошибка может хранить структурированные поля для логирования и преобразования в API-ответ. Определяй инварианты: Cause в данной обёртке не nil; не публикуй внутренние тексты ошибок клиентам.",
    "interview": "Зачем реализовывать Unwrap у собственного error?"
  },
  "advanced-sentinel-errors": {
    "frames": [
      [
        "Вход",
        [
          "load label",
          "ErrLabelMissing"
        ],
        "wrapped error",
        "Внешний текст не определяет категорию."
      ],
      [
        "Проверка",
        [
          "errors.Is → true"
        ],
        "ErrLabelMissing",
        "Стандартный обход находит sentinel."
      ],
      [
        "Приоритет",
        [
          "missing + conflict"
        ],
        "404",
        "Порядок проверок фиксирует приоритет."
      ],
      [
        "Неизвестная ошибка",
        [
          "errors.Is → false"
        ],
        "500",
        "Не раскрываем внутреннюю причину в статусе."
      ]
    ],
    "steps": [
      [
        "Обработать успех",
        "if err==nil { return 200 }",
        "nil означает успех; 200 — статус по контракту этой задачи."
      ],
      [
        "Проверить отсутствие",
        "if errors.Is(err,ErrLabelMissing) { return 404 }",
        "errors.Is обходит обёртки и дерево ошибок. Проверяем ErrLabelMissing первым, поскольку 404 имеет приоритет."
      ],
      [
        "Проверить конфликт",
        "if errors.Is(err,ErrLabelConflict) { return 409 }",
        "Если missing не найден, ищем ErrLabelConflict и возвращаем 409."
      ],
      [
        "Вернуть общий статус",
        "return 500",
        "Ни одна известная причина не найдена: 500. Сравнение текста не используется."
      ]
    ],
    "blocks": [
      "Вернуть общий статус",
      "Обработать успех",
      "Проверить отсутствие",
      "Проверить конфликт"
    ],
    "order": [
      1,
      2,
      3,
      0
    ],
    "blanks": [
      {
        "before": "errors.",
        "after": "(err,ErrLabelMissing)",
        "options": [
          "Is",
          "As",
          "New"
        ],
        "correct": 0,
        "explain": "Is проверяет конкретную причину."
      },
      {
        "before": "if errors.Is(err,ErrLabelConflict) { return ",
        "after": " }",
        "options": [
          "409",
          "404",
          "200"
        ],
        "correct": 0,
        "explain": "Конфликт соответствует 409."
      }
    ],
    "partial": "package practice\n\nfunc LabelErrorStatus(err error) int {\n\tif err==nil { return 200 }\n\tif errors.Is(err,ErrLabelMissing) { return 404 }\n\t// TODO: обработай конфликт\n\treturn 500\n}\n",
    "bug": "package practice\n\nfunc LabelErrorStatus(err error) int {\n\tif err==nil { return 200 }\n\tif err==ErrLabelMissing { return 404 }\n\tif err==ErrLabelConflict { return 409 }\n\treturn 500\n}\n",
    "hints": [
      "Начни: Обработать успех.",
      "nil означает успех; 200 — статус по контракту этой задачи.",
      "Следующее действие: Проверить отсутствие. errors.Is обходит обёртки и дерево ошибок. Проверяем ErrLabelMissing первым, поскольку 404 имеет приоритет.",
      "Проверь план: Обработать успех → Проверить отсутствие → Проверить конфликт → Вернуть общий статус.",
      "if err==nil { return 200 }\nif errors.Is(err,ErrLabelMissing) { return 404 }\nif errors.Is(err,ErrLabelConflict) { return 409 }\nreturn 500"
    ],
    "related": [
      [
        "advanced-domain-error",
        "Создать доменную ошибку с причиной"
      ]
    ],
    "production": "Преобразование доменных ошибок в HTTP-статусы удобно делать на границе API. Реальные правила статусов, приоритетов и публичных сообщений должны быть согласованы с контрактом сервиса.",
    "interview": "Чем sentinel error отличается от типизированной ошибки?"
  },
  "advanced-safe-assertion": {
    "frames": [
      [
        "Вход",
        [
          "any",
          "dynamic type=string",
          "value=Go"
        ],
        "value.(string)",
        "Assertion проверяет динамический тип."
      ],
      [
        "Успех",
        [
          "s=Go",
          "ok=true"
        ],
        "s,ok:=value.(string)",
        "Возвращаем значение."
      ],
      [
        "Несовпадение",
        [
          "dynamic type=int",
          "s=\"\"",
          "ok=false"
        ],
        "value=42",
        "Comma-ok не вызывает panic."
      ],
      [
        "Пустая строка",
        [
          "s=\"\"",
          "ok=true"
        ],
        "value=\"\"",
        "Bool отличает успех от несовпадения."
      ]
    ],
    "steps": [
      [
        "Проверить динамический тип",
        "s,ok:=value.(string)",
        "value.(string) с двумя результатами проверяет точный динамический тип. При несовпадении s — zero value строки, ok — false; panic нет."
      ],
      [
        "Вернуть оба результата",
        "return s,ok",
        "Возвращаем s и ok вместе: пустая строка может быть корректным результатом, если ok == true."
      ]
    ],
    "blocks": [
      "Вернуть оба результата",
      "Проверить динамический тип"
    ],
    "order": [
      1,
      0
    ],
    "blanks": [
      {
        "before": "s,ok:=value.(",
        "after": ")",
        "options": [
          "string",
          "[]byte",
          "any"
        ],
        "correct": 0,
        "explain": "Проверяем конкретный встроенный string."
      },
      {
        "before": "return s,",
        "after": "",
        "options": [
          "ok",
          "true",
          "false"
        ],
        "correct": 0,
        "explain": "Сохраняем признак совпадения типа."
      }
    ],
    "partial": "package practice\n\nfunc ReadStringValue(value any) (string,bool) {\n\t// TODO: извлеки string через comma-ok\n\treturn \"\",false\n}\n",
    "bug": "package practice\n\nfunc ReadStringValue(value any) (string,bool) {\n\tif value==nil { return \"\",false }\n\treturn fmt.Sprint(value),true\n}\n",
    "hints": [
      "Проверяй динамический тип, а не строковое представление.",
      "Используй assertion к string с двумя результатами.",
      "При несовпадении Go сам вернёт пустую строку и false.",
      "Верни оба результата без дополнительной проверки пустой строки.",
      "s,ok:=value.(string)\nreturn s,ok"
    ],
    "related": [
      [
        "advanced-type-switch",
        "Классифицировать входное значение через type switch"
      ]
    ],
    "production": "Comma-ok полезен в адаптерах динамических данных. Для JSON и доменных объектов предпочтительнее заранее определённая структура и явная валидация, а не неявное преобразование через fmt.Sprint.",
    "interview": "Чем type assertion отличается от преобразования типа?"
  },
  "advanced-join-errors": {
    "frames": [
      [
        "Обе отсутствуют",
        [
          "operation=nil",
          "cleanup=nil"
        ],
        "nil",
        "Нет ошибки."
      ],
      [
        "Только операция",
        [
          "operation=write failed",
          "cleanup=nil"
        ],
        "operation",
        "Сохраняем исходный объект."
      ],
      [
        "Только очистка",
        [
          "operation=nil",
          "cleanup=close failed"
        ],
        "cleanup",
        "Сохраняем исходный объект."
      ],
      [
        "Обе ошибки",
        [
          "operation=write failed",
          "cleanup=close failed"
        ],
        "errors.Join(operation,cleanup)",
        "Дерево содержит обе причины."
      ]
    ],
    "steps": [
      [
        "Нет ошибки операции",
        "if operation == nil { return cleanup }",
        "Если operation == nil, возвращаем cleanup как есть, включая nil."
      ],
      [
        "Нет ошибки очистки",
        "if cleanup == nil { return operation }",
        "Если cleanup == nil, возвращаем исходную operation, сохраняя идентичность объекта ошибки."
      ],
      [
        "Есть обе причины",
        "return errors.Join(operation, cleanup)",
        "При двух причинах errors.Join создаёт ошибку с Unwrap() []error; порядок причин сохраняется, Is и As обходят обе."
      ]
    ],
    "blocks": [
      "Есть обе причины",
      "Нет ошибки операции",
      "Нет ошибки очистки"
    ],
    "order": [
      1,
      2,
      0
    ],
    "blanks": [
      {
        "before": "if operation == nil { return ",
        "after": " }",
        "options": [
          "cleanup",
          "operation",
          "errors.New(\"cleanup\")"
        ],
        "correct": 0,
        "explain": "Одиночную причину сохраняем без обёртки."
      },
      {
        "before": "return ",
        "after": "",
        "options": [
          "errors.Join(operation, cleanup)",
          "cleanup",
          "nil"
        ],
        "correct": 0,
        "explain": "Объединяем причины в заданном порядке."
      }
    ],
    "partial": "package practice\n\nfunc CombineOperationErrors(operation, cleanup error) error {\n    if operation == nil { return cleanup }\n    if cleanup == nil { return operation }\n    // TODO: объедини обе причины, не потеряв ни одну\n    return operation\n}\n",
    "bug": "package practice\n\nfunc CombineOperationErrors(operation, cleanup error) error {\n\tif cleanup != nil { return cleanup }\n\treturn operation\n}\n",
    "hints": [
      "Начни: Нет ошибки операции.",
      "Если operation == nil, возвращаем cleanup как есть, включая nil.",
      "Следующее действие: Нет ошибки очистки. Если cleanup == nil, возвращаем исходную operation, сохраняя идентичность объекта ошибки.",
      "Проверь план: Нет ошибки операции → Нет ошибки очистки → Есть обе причины.",
      "if operation == nil { return cleanup }\nif cleanup == nil { return operation }\nreturn errors.Join(operation, cleanup)"
    ],
    "related": [
      [
        "defer-cleanup",
        "Освобождение ресурсов"
      ],
      [
        "advanced-domain-error",
        "Типизированная ошибка"
      ]
    ],
    "production": "При записи файла или обработке транзакции ошибка очистки не должна скрывать исходную ошибку. В реальном сервисе правила логирования, повторов и ответа клиенту определяются отдельно.",
    "interview": "Почему errors.Unwrap не возвращает первую причину errors.Join?"
  },
  "advanced-defer-lifo": {
    "frames": [
      [
        "Открытие A",
        [
          "resources=[A,B,C]",
          "stack=[A]"
        ],
        "defer release(A)",
        "Вызов зарегистрирован, но не выполнен."
      ],
      [
        "Открытие B и C",
        [
          "stack=[A,B,C]",
          "order=[]"
        ],
        "defer release(C)",
        "Последний зарегистрированный вызов выполнится первым."
      ],
      [
        "Возврат",
        [
          "stack=[A,B]",
          "order=[C]"
        ],
        "release(C)",
        "Начинается выполнение отложенных функций."
      ],
      [
        "Завершение",
        [
          "stack=[]",
          "order=[C,B,A]"
        ],
        "return",
        "Именованный результат включает изменения defer."
      ]
    ],
    "steps": [
      [
        "Создать результат",
        "order = make([]string, 0, len(resources))",
        "order уже объявлен как именованный результат в сигнатуре. Поэтому используем =, а не :=."
      ],
      [
        "Перебрать ресурсы",
        "for _, name := range resources {",
        "name — имя текущего ресурса в порядке открытия."
      ],
      [
        "Зарегистрировать освобождение",
        "    defer func(resource string) {\n        order = append(order, resource)\n    }(name)\n}",
        "func(resource string) объявляет функцию с параметром. (name) передаёт текущее имя. defer откладывает вызов до выхода из функции."
      ],
      [
        "Вернуть именованный результат",
        "return",
        "После return выполняются defer в обратном порядке и дополняют order."
      ]
    ],
    "blocks": [
      "Вернуть именованный результат",
      "Зарегистрировать освобождение",
      "Перебрать ресурсы",
      "Создать результат"
    ],
    "order": [
      3,
      2,
      1,
      0
    ],
    "blanks": [
      {
        "before": "",
        "after": "",
        "options": [
          "defer func(resource string) { order = append(order, resource) }(name)",
          "order = append(order,name)",
          "return nil"
        ],
        "correct": 0,
        "explain": "Регистрируем вызов, сохраняющий текущее имя."
      },
      {
        "before": "",
        "after": "",
        "options": [
          "return nil",
          "return",
          "panic(nil)"
        ],
        "correct": 1,
        "explain": "Сохраняем именованный результат."
      }
    ],
    "partial": "package practice\n\nfunc DeferredReleaseOrder(resources []string) (order []string) {\n    order = make([]string, 0, len(resources))\n    for _, name := range resources {\n        defer func(resource string) {\n            // TODO: добавь resource в order\n            _ = resource\n        }(name)\n    }\n    return\n}\n",
    "bug": "package practice\n\nfunc DeferredReleaseOrder(resources []string) (order []string) {\n\torder = make([]string, 0, len(resources))\n\tfor _, name := range resources { defer func(resource string) { order = append(order, resource) }(name) }\n\treturn nil\n}\n",
    "hints": [
      "Первое действие: Создать результат. order уже объявлен как именованный результат в сигнатуре. Поэтому используем =, а не :=.",
      "Начни с этой строки: order = make([]string, 0, len(resources))",
      "Следующее действие: Перебрать ресурсы. name — имя текущего ресурса в порядке открытия.",
      "Проверь оставшиеся действия: Зарегистрировать освобождение → Вернуть именованный результат.",
      "order = make([]string, 0, len(resources))\nfor _, name := range resources {\n    defer func(resource string) {\n        order = append(order, resource)\n    }(name)\n}\nreturn"
    ],
    "related": [
      [
        "core-defer-result",
        "Именованный результат"
      ],
      [
        "defer-cleanup",
        "Очистка ресурсов"
      ]
    ],
    "production": "При последовательном захвате ресурсов обычно освобождают их в обратном порядке: например, сначала закрывают файл, затем удаляют временный каталог. Здесь моделируется только порядок, не ошибки реального I/O.",
    "interview": "Когда выполняются defer и в каком порядке?"
  },
  "advanced-defer-capture": {
    "frames": [
      [
        "Начало",
        [
          "status=pending",
          "trace=[]"
        ],
        "status := initial",
        "Одна переменная status."
      ],
      [
        "Регистрация",
        [
          "closure → status",
          "snapshot=pending"
        ],
        "defer ... (status)",
        "Снимок сохраняет значение."
      ],
      [
        "Изменение",
        [
          "status=done",
          "snapshot=pending"
        ],
        "status = final",
        "Снимок не меняется."
      ],
      [
        "Возврат",
        [
          "trace=[pending,done]"
        ],
        "return",
        "Сначала snapshot, затем чтение status."
      ]
    ],
    "steps": [
      [
        "Создать переменную статуса",
        "status := initial",
        "status — переменная, которую позже изменим."
      ],
      [
        "Создать журнал",
        "trace = make([]string, 0, 2)",
        "trace уже объявлен в сигнатуре; ожидаем две записи."
      ],
      [
        "Зарегистрировать чтение позже",
        "defer func() {\n    trace = append(trace, status)\n}()",
        "Функция без параметров прочитает переменную status при выполнении defer."
      ],
      [
        "Зарегистрировать снимок",
        "defer func(snapshot string) {\n    trace = append(trace, snapshot)\n}(status)",
        "status передаётся как аргумент прямо сейчас. snapshot хранит исходное значение."
      ],
      [
        "Изменить статус",
        "status = final",
        "Первое замыкание увидит final, снимок не изменится."
      ],
      [
        "Вернуть журнал",
        "return",
        "Второй defer выполнится первым: initial, затем final."
      ]
    ],
    "blocks": [
      "Вернуть журнал",
      "Изменить статус",
      "Зарегистрировать снимок",
      "Зарегистрировать чтение позже",
      "Создать журнал",
      "Создать переменную статуса"
    ],
    "order": [
      5,
      4,
      3,
      2,
      1,
      0
    ],
    "blanks": [
      {
        "before": "defer func(snapshot string) { trace = append(trace, snapshot) }(",
        "after": ")",
        "options": [
          "final",
          "status",
          "\"\""
        ],
        "correct": 1,
        "explain": "Аргумент вычисляется при регистрации."
      },
      {
        "before": "status = ",
        "after": "",
        "options": [
          "initial",
          "\"\"",
          "final"
        ],
        "correct": 2,
        "explain": "Замыкание прочитает final."
      }
    ],
    "partial": "package practice\n\nfunc DeferredStatusTrace(initial, final string) (trace []string) {\n    status := initial\n    trace = make([]string, 0, 2)\n    defer func() { trace = append(trace, status) }()\n    defer func(snapshot string) {\n        // TODO: добавь snapshot в trace\n        _ = snapshot\n    }(status)\n    status = final\n    return\n}\n",
    "bug": "package practice\n\nfunc DeferredStatusTrace(initial, final string) (trace []string) {\n\tstatus := initial\n\ttrace = make([]string, 0, 2)\n\tdefer func() { trace = append(trace, status) }()\n\tdefer func() { trace = append(trace, status) }()\n\tstatus = final\n\treturn\n}\n",
    "hints": [
      "Первое действие: Создать переменную статуса. status — переменная, которую позже изменим.",
      "Начни с этой строки: status := initial",
      "Следующее действие: Создать журнал. trace уже объявлен в сигнатуре; ожидаем две записи.",
      "Проверь оставшиеся действия: Зарегистрировать чтение позже → Зарегистрировать снимок → Изменить статус → Вернуть журнал.",
      "status := initial\ntrace = make([]string, 0, 2)\ndefer func() {\n    trace = append(trace, status)\n}()\ndefer func(snapshot string) {\n    trace = append(trace, snapshot)\n}(status)\nstatus = final\nreturn"
    ],
    "related": [
      [
        "advanced-defer-lifo",
        "Порядок LIFO"
      ],
      [
        "core-defer-result",
        "Именованный результат"
      ]
    ],
    "production": "При журналировании завершения запроса важно осознанно выбирать начальные или итоговые значения. Для итогового результата часто подходит замыкание, для неизменного снимка — аргумент.",
    "interview": "Почему defer log(x) и defer func(){log(x)}() могут вывести разные значения?"
  },
  "advanced-panic-trace": {
    "frames": [
      [
        "Вход",
        [
          "outer frame",
          "defer outer"
        ],
        "defer func() ...",
        "Внешняя граница готова восстановиться."
      ],
      [
        "Вложенный вызов",
        [
          "outer frame",
          "inner frame",
          "defer inner"
        ],
        "panic(\"failed\")",
        "Обычное выполнение прекращается."
      ],
      [
        "Раскрутка",
        [
          "trace=[inner]",
          "outer frame"
        ],
        "defer inner",
        "Вложенный defer выполняется первым."
      ],
      [
        "Восстановление",
        [
          "trace=[inner,outer,recovered]"
        ],
        "recover()",
        "Внешний defer останавливает панику; функция возвращается."
      ]
    ],
    "steps": [
      [
        "Создать журнал",
        "trace = make([]string, 0, 3)",
        "Именованный результат trace доступен обеим вложенным функциям."
      ],
      [
        "Зарегистрировать внешний defer",
        "defer func() {\n    trace = append(trace, \"outer\")",
        "Когда стек дойдёт до внешней функции, добавим outer."
      ],
      [
        "Восстановиться после паники",
        "    if recover() != nil {\n        trace = append(trace, \"recovered\")\n    }\n}()",
        "recover вызывается непосредственно в defer. При активной панике добавляем recovered."
      ],
      [
        "Начать вложенную функцию",
        "func() {",
        "Анонимная функция создаёт отдельный вызов в той же горутине."
      ],
      [
        "Зарегистрировать внутренний defer",
        "    defer func() { trace = append(trace, \"inner\") }()",
        "Этот defer выполнится раньше внешнего при раскрутке."
      ],
      [
        "Вызвать panic",
        "    panic(\"failed\")\n}()",
        "Вызов вложенной функции запускает панику, затем выполняется inner."
      ],
      [
        "Показать, что обычный путь не продолжается",
        "trace = append(trace, \"after\")\nreturn",
        "При панике эта запись не выполняется. Внешний defer остановит панику, и функция вернётся с журналом."
      ]
    ],
    "blocks": [
      "Показать, что обычный путь не продолжается",
      "Вызвать panic",
      "Зарегистрировать внутренний defer",
      "Начать вложенную функцию",
      "Восстановиться после паники",
      "Зарегистрировать внешний defer",
      "Создать журнал"
    ],
    "order": [
      6,
      5,
      4,
      3,
      2,
      1,
      0
    ],
    "blanks": [
      {
        "before": "if ",
        "after": " != nil",
        "options": [
          "recover()",
          "panic(\"failed\")",
          "nil"
        ],
        "correct": 0,
        "explain": "Recover вызывается непосредственно в defer."
      },
      {
        "before": "",
        "after": "(\"failed\")",
        "options": [
          "recover",
          "panic",
          "return"
        ],
        "correct": 1,
        "explain": "Паника запускает раскрутку."
      }
    ],
    "partial": "package practice\n\nfunc PanicUnwindTrace() (trace []string) {\n    trace = make([]string, 0, 3)\n    defer func() {\n        trace = append(trace, \"outer\")\n        if recover() != nil { trace = append(trace, \"recovered\") }\n    }()\n    func() {\n        defer func() {\n            // TODO: добавь \"inner\" в trace\n        }()\n        panic(\"failed\")\n    }()\n    return\n}\n",
    "bug": "package practice\n\nfunc PanicUnwindTrace() (trace []string) {\n\ttrace = make([]string, 0, 3)\n\tdefer func() {\n\t trace = append(trace, \"outer\")\n\t if recover() != nil { trace = append(trace, \"recovered\") }\n\t}()\n\tfunc() {\n\t defer func() { trace = append(trace, \"inner\") }()\n\t}()\n\ttrace = append(trace, \"after\")\n\treturn\n}\n",
    "hints": [
      "Первое действие: Создать журнал. Именованный результат trace доступен обеим вложенным функциям.",
      "Начни с этой строки: trace = make([]string, 0, 3)",
      "Следующее действие: Зарегистрировать внешний defer. Когда стек дойдёт до внешней функции, добавим outer.",
      "Проверь оставшиеся действия: Восстановиться после паники → Начать вложенную функцию → Зарегистрировать внутренний defer → Вызвать panic → Показать, что обычный путь не продолжается.",
      "trace = make([]string, 0, 3)\ndefer func() {\n    trace = append(trace, \"outer\")\n    if recover() != nil {\n        trace = append(trace, \"recovered\")\n    }\n}()\nfunc() {\n    defer func() { trace = append(trace, \"inner\") }()\n    panic(\"failed\")\n}()\ntrace = append(trace, \"after\")\nreturn"
    ],
    "related": [
      [
        "advanced-defer-lifo",
        "Порядок defer"
      ],
      [
        "advanced-defer-capture",
        "Захват переменной"
      ]
    ],
    "production": "На границе обработки запроса можно восстановиться после неожиданной паники, записать диагностические данные и завершить запрос. Не следует использовать panic для обычных доменных ошибок.",
    "interview": "Продолжается ли выполнение после строки panic, если recover сработал?"
  },
  "advanced-recover-boundary": {
    "frames": [
      [
        "Вход",
        [
          "work callback",
          "err=nil"
        ],
        "defer recovery",
        "Граница регистрируется заранее."
      ],
      [
        "Нормальный путь",
        [
          "work → original error"
        ],
        "return work()",
        "Recover возвращает nil, результат сохраняется."
      ],
      [
        "Путь panic",
        [
          "work → panic(error)"
        ],
        "recover()",
        "Отложенная функция получает значение паники."
      ],
      [
        "Результат",
        [
          "err=wrapped cause"
        ],
        "fmt.Errorf(... %w ...)",
        "Вызывающий код получает ошибку вместо продолжения аварии."
      ]
    ],
    "steps": [
      [
        "Зарегистрировать отложенную функцию",
        "defer func() {",
        "Граница восстановления должна быть зарегистрирована до вызова work. Именованный err доступен внутри замыкания."
      ],
      [
        "Получить значение паники",
        "    if value := recover(); value != nil {",
        "recover вызываем непосредственно внутри defer. При обычном возврате он даст nil, и блок не выполнится."
      ],
      [
        "Проверить, является ли значение ошибкой",
        "        if cause, ok := value.(error); ok {",
        "Type assertion с двумя результатами не вызывает panic при несовпадении типа."
      ],
      [
        "Сохранить исходную ошибку",
        "            err = fmt.Errorf(\"work panic: %w\", cause)\n            return\n        }",
        "%w сохраняет причину. return здесь выходит только из отложенной функции."
      ],
      [
        "Обработать другое значение",
        "        err = fmt.Errorf(\"work panic: %v\", value)\n    }\n}()",
        "%v форматирует строку, число или другое значение. Закрываем блоки и объявление defer."
      ],
      [
        "Вызвать основную операцию",
        "return work()",
        "При обычном возврате сохраняется исходный error. При panic отложенная функция изменит err."
      ]
    ],
    "blocks": [
      "Вызвать основную операцию",
      "Обработать другое значение",
      "Сохранить исходную ошибку",
      "Проверить, является ли значение ошибкой",
      "Получить значение паники",
      "Зарегистрировать отложенную функцию"
    ],
    "order": [
      5,
      4,
      3,
      2,
      1,
      0
    ],
    "blanks": [
      {
        "before": "if value := ",
        "after": "; value != nil",
        "options": [
          "work()",
          "recover()",
          "nil"
        ],
        "correct": 1,
        "explain": "Получаем значение паники."
      },
      {
        "before": "fmt.Errorf(\"work panic: ",
        "after": "\", cause)",
        "options": [
          "%v",
          "%s",
          "%w"
        ],
        "correct": 2,
        "explain": "%w сохраняет error-причину."
      }
    ],
    "partial": "package practice\n\nfunc RunProtectedWork(work func() error) (err error) {\n    defer func() {\n        if value := recover(); value != nil {\n            if cause, ok := value.(error); ok {\n                // TODO: замени %v на формат, сохраняющий причину\n                err = fmt.Errorf(\"work panic: %v\", cause)\n                return\n            }\n            err = fmt.Errorf(\"work panic: %v\", value)\n        }\n    }()\n    return work()\n}\n",
    "bug": "package practice\n\nfunc RunProtectedWork(work func() error) (err error) {\n\tdefer func() {\n\t if value := recover(); value != nil { err = nil }\n\t}()\n\treturn work()\n}\n",
    "hints": [
      "Первое действие: Зарегистрировать отложенную функцию. Граница восстановления должна быть зарегистрирована до вызова work. Именованный err доступен внутри замыкания.",
      "Начни с этой строки: defer func() {",
      "Следующее действие: Получить значение паники. recover вызываем непосредственно внутри defer. При обычном возврате он даст nil, и блок не выполнится.",
      "Проверь оставшиеся действия: Проверить, является ли значение ошибкой → Сохранить исходную ошибку → Обработать другое значение → Вызвать основную операцию.",
      "defer func() {\n    if value := recover(); value != nil {\n        if cause, ok := value.(error); ok {\n            err = fmt.Errorf(\"work panic: %w\", cause)\n            return\n        }\n        err = fmt.Errorf(\"work panic: %v\", value)\n    }\n}()\nreturn work()"
    ],
    "related": [
      [
        "advanced-panic-trace",
        "Раскрутка стека"
      ],
      [
        "advanced-join-errors",
        "Сохранение причин ошибок"
      ]
    ],
    "production": "Обёртка подходит как учебная модель границы worker или request handler. В production дополнительно нужны stack trace, политика логирования, корректная отмена и защита от повторной обработки. Нельзя считать recover гарантией целостности данных.",
    "interview": "Почему recover лучше размещать на границе обработки, а не в каждой функции?"
  },
  "advanced-generic-filter": {
    "frames": [
      [
        "Вход",
        [
          "values=[3,2,4]",
          "out=[]"
        ],
        "keep: чётное число",
        "Тип T выведен как int."
      ],
      [
        "Первый элемент",
        [
          "v=3",
          "out=[]"
        ],
        "keep(3)=false",
        "Пропускаем."
      ],
      [
        "Второй элемент",
        [
          "v=2",
          "out=[2]"
        ],
        "keep(2)=true",
        "Добавляем."
      ],
      [
        "Завершение",
        [
          "values=[3,2,4]",
          "out=[2,4]"
        ],
        "return out",
        "Вход не изменён."
      ]
    ],
    "steps": [
      [
        "Выделить результат",
        "out := make([]T, 0, len(values))",
        "T — тип элемента входного среза. Длина 0, потому что пока ничего не отобрали. Ёмкость len(values) резервирует память."
      ],
      [
        "Перебрать элементы",
        "for _, v := range values {",
        "range даёт индекс и элемент v. Индекс не нужен, поэтому _."
      ],
      [
        "Проверить условие отбора",
        "    if keep(v) {",
        "keep — функция из параметров, возвращающая bool. Если true, элемент подходит."
      ],
      [
        "Добавить подходящий элемент",
        "        out = append(out, v)\n    }\n}",
        "append возвращает обновлённый срез. Закрываем условие и цикл."
      ],
      [
        "Вернуть результат",
        "return out",
        "После цикла возвращаем только отобранные элементы."
      ]
    ],
    "blocks": [
      "Вернуть результат",
      "Добавить подходящий элемент",
      "Проверить условие отбора",
      "Перебрать элементы",
      "Выделить результат"
    ],
    "order": [
      4,
      3,
      2,
      1,
      0
    ],
    "blanks": [
      {
        "before": "out := ",
        "after": "",
        "options": [
          "values[:0]",
          "make([]T,0,len(values))",
          "values"
        ],
        "correct": 1,
        "explain": "Отдельный backing array."
      },
      {
        "before": "if ",
        "after": " { out=append(out,v) }",
        "options": [
          "v==v",
          "true",
          "keep(v)"
        ],
        "correct": 2,
        "explain": "Предикат определяет отбор."
      }
    ],
    "partial": "package practice\n\nfunc FilterValues[T any](values []T, keep func(T) bool) []T {\n    out := make([]T, 0, len(values))\n    for _, v := range values {\n        if keep(v) {\n            // TODO: добавь v в out\n        }\n    }\n    return out\n}\n",
    "bug": "package practice\n\nfunc FilterValues[T any](values []T, keep func(T) bool) []T {\n\tout := values[:0]\n\tfor _, v := range values { if keep(v) { out = append(out,v) } }\n\treturn out\n}\n",
    "hints": [
      "Первое действие: Выделить результат. T — тип элемента входного среза. Длина 0, потому что пока ничего не отобрали. Ёмкость len(values) резервирует память.",
      "Начни с этой строки: out := make([]T, 0, len(values))",
      "Следующее действие: Перебрать элементы. range даёт индекс и элемент v. Индекс не нужен, поэтому _.",
      "Проверь оставшиеся действия: Проверить условие отбора → Добавить подходящий элемент → Вернуть результат.",
      "out := make([]T, 0, len(values))\nfor _, v := range values {\n    if keep(v) {\n        out = append(out, v)\n    }\n}\nreturn out"
    ],
    "related": [
      [
        "filter",
        "Фильтрация конкретного типа"
      ],
      [
        "generic-unique",
        "Ограничение comparable"
      ]
    ],
    "production": "Один алгоритм фильтрации подходит для DTO, событий и результатов запросов. Независимый backing array не означает глубокую копию вложенных ссылочных полей.",
    "interview": "Зачем здесь any, а не comparable?"
  },
  "advanced-generic-sum": {
    "frames": [
      [
        "Вызов",
        [
          "type Quantity int64",
          "values=[5,-2,4]"
        ],
        "T=Quantity",
        "~int64 включает Quantity."
      ],
      [
        "Начало",
        [
          "total=0"
        ],
        "var total T",
        "Нулевое значение."
      ],
      [
        "Накопление",
        [
          "total=5",
          "total=3"
        ],
        "total += v",
        "Учитываем отрицательное значение."
      ],
      [
        "Возврат",
        [
          "total=7",
          "type=Quantity"
        ],
        "return total",
        "Тип не потерян."
      ]
    ],
    "steps": [
      [
        "Объявить накопитель",
        "var total T",
        "Сумма начинается с zero value типа T. Так сохраняем именованный числовой тип."
      ],
      [
        "Перебрать числа",
        "for _, v := range values {",
        "v — очередной элемент типа T, _ пропускает индекс."
      ],
      [
        "Прибавить число",
        "    total += v\n}",
        "+= означает total = total + v. Constraint разрешает сложение для всех допустимых типов."
      ],
      [
        "Вернуть сумму",
        "return total",
        "Возвращаем T, а не преобразуем результат в int."
      ]
    ],
    "blocks": [
      "Вернуть сумму",
      "Прибавить число",
      "Перебрать числа",
      "Объявить накопитель"
    ],
    "order": [
      3,
      2,
      1,
      0
    ],
    "blanks": [
      {
        "before": "var total ",
        "after": "",
        "options": [
          "T",
          "int64",
          "any"
        ],
        "correct": 0,
        "explain": "Сохраняем тип."
      },
      {
        "before": "total ",
        "after": " v",
        "options": [
          "=",
          "+=",
          "-="
        ],
        "correct": 1,
        "explain": "Накапливаем сумму."
      }
    ],
    "partial": "package practice\n\nfunc SumSigned[T ~int | ~int64](values []T) T {\n    var total T\n    for _, v := range values {\n        // TODO: прибавь v к total\n        _ = v\n    }\n    return total\n}\n",
    "bug": "package practice\n\nfunc SumSigned[T ~int | ~int64](values []T) T {\n\tvar total T\n\tfor _,v:=range values { if v>0 { total+=v } }\n\treturn total\n}\n",
    "hints": [
      "Первое действие: Объявить накопитель. Сумма начинается с zero value типа T. Так сохраняем именованный числовой тип.",
      "Начни с этой строки: var total T",
      "Следующее действие: Перебрать числа. v — очередной элемент типа T, _ пропускает индекс.",
      "Проверь оставшиеся действия: Прибавить число → Вернуть сумму.",
      "var total T\nfor _, v := range values {\n    total += v\n}\nreturn total"
    ],
    "related": [
      [
        "generic-unique",
        "Comparable"
      ],
      [
        "advanced-generic-filter",
        "Any и предикат"
      ]
    ],
    "production": "Доменные числовые типы помогают не смешивать разные единицы измерения. Общий алгоритм может сохранить тип, но не заменяет проверку переполнения или бизнес-инвариантов.",
    "interview": "Чем int64 отличается от ~int64 в constraint?"
  },
  "advanced-generic-named-slice": {
    "frames": [
      [
        "Вход",
        [
          "type Labels []string",
          "values=[go,api]"
        ],
        "S=Labels, E=string",
        "Компилятор выводит оба параметра."
      ],
      [
        "Выделение",
        [
          "values → array A",
          "out → array B"
        ],
        "make(S,2)",
        "Хранилища различны."
      ],
      [
        "Копирование",
        [
          "A=[go,api]",
          "B=[go,api]"
        ],
        "copy(out,values)",
        "Копируются значения элементов."
      ],
      [
        "Возврат",
        [
          "out type=Labels"
        ],
        "return out",
        "Именованный тип сохранён."
      ]
    ],
    "steps": [
      [
        "Сохранить nil",
        "if values == nil { return nil }",
        "Отличаем nil от пустого инициализированного среза."
      ],
      [
        "Создать S",
        "out := make(S, len(values))",
        "Сохраняем конкретный тип, а не только []E."
      ],
      [
        "Скопировать элементы",
        "copy(out, values)",
        "Создаём независимое внешнее хранилище."
      ],
      [
        "Вернуть S",
        "return out",
        "Методы именованного типа доступны вызывающему коду."
      ]
    ],
    "blocks": [
      "Вернуть S",
      "Скопировать элементы",
      "Создать S",
      "Сохранить nil"
    ],
    "order": [
      3,
      2,
      1,
      0
    ],
    "blanks": [
      {
        "before": "out := make(",
        "after": ",len(values))",
        "options": [
          "[]any",
          "S",
          "E"
        ],
        "correct": 1,
        "explain": "Тип всего среза."
      },
      {
        "before": "",
        "after": "(out,values)",
        "options": [
          "append",
          "delete",
          "copy"
        ],
        "correct": 2,
        "explain": "Копируем элементы."
      }
    ],
    "partial": "package practice\n\nfunc CloneNamedSlice[S ~[]E, E any](values S) S {\n    if values == nil { return nil }\n    out := make(S, len(values))\n    // TODO: скопируй элементы из values в out\n    return out\n}\n",
    "bug": "package practice\n\nfunc CloneNamedSlice[S ~[]E, E any](values S) S {\n\treturn values\n}\n",
    "hints": [
      "Сначала различи nil и непустой по признаку nil вход.",
      "Параметр S описывает тип всего среза.",
      "Выдели make(S,len(values)), не []E.",
      "Скопируй элементы встроенной copy.",
      "if values==nil{return nil}; out:=make(S,len(values));copy(out,values);return out"
    ],
    "related": [
      [
        "slice-detach",
        "Независимое хранилище"
      ],
      [
        "advanced-generic-sum",
        "Underlying types"
      ]
    ],
    "production": "Подходит для копирования доменных коллекций перед изменением. В стандартной библиотеке есть slices.Clone; это упражнение изучает смысл сигнатуры, а не предлагает заменять библиотеку.",
    "interview": "Почему возвращать S, а не []E?"
  },
  "advanced-generic-group": {
    "frames": [
      [
        "Вход",
        [
          "values=[go,api,db]",
          "key=len"
        ],
        "out={}",
        "K=int, T=string."
      ],
      [
        "Первый элемент",
        [
          "k=2",
          "out={2:[go]}"
        ],
        "append(out[2],go)",
        "Создаём первую группу."
      ],
      [
        "Второй элемент",
        [
          "k=3",
          "out={2:[go],3:[api]}"
        ],
        "append(out[3],api)",
        "Новая группа."
      ],
      [
        "Третий элемент",
        [
          "k=2",
          "out={2:[go,db],3:[api]}"
        ],
        "append(out[2],db)",
        "Сохраняем оба элемента."
      ]
    ],
    "steps": [
      [
        "Создать map для групп",
        "out := make(map[K][]T)",
        "Нам нужно хранить несколько элементов для одного ключа. K — тип ключа, []T — список элементов этой группы."
      ],
      [
        "Перебрать вход",
        "for _, v := range values {",
        "range даёт индекс и элемент. Индекс не нужен, поэтому используем _. Переменная v — текущий элемент типа T."
      ],
      [
        "Получить ключ текущего элемента",
        "    k := key(v)",
        "key — функция из параметров GroupValues. Она принимает v и возвращает K. Например, key(\"go\") вернёт 2 при группировке по длине."
      ],
      [
        "Добавить элемент в его группу",
        "    out[k] = append(out[k], v)\n}",
        "out[k] — текущий список группы. Для отсутствующего ключа это nil срез. append добавляет v и возвращает обновлённый срез, который записываем обратно."
      ],
      [
        "Вернуть группы",
        "return out",
        "Цикл уже завершён, все элементы распределены."
      ]
    ],
    "blocks": [
      "Вернуть группы",
      "Добавить элемент в его группу",
      "Получить ключ текущего элемента",
      "Перебрать вход",
      "Создать map для групп"
    ],
    "order": [
      4,
      3,
      2,
      1,
      0
    ],
    "blanks": [
      {
        "before": "out[k] = ",
        "after": "",
        "options": [
          "[]T{v}",
          "append(out[k],v)",
          "nil"
        ],
        "correct": 1,
        "explain": "Добавляем к существующей группе."
      },
      {
        "before": "k := ",
        "after": "",
        "options": [
          "v",
          "key",
          "key(v)"
        ],
        "correct": 2,
        "explain": "Вычисляем ключ."
      }
    ],
    "partial": "package practice\n\nfunc GroupValues[T any, K comparable](values []T, key func(T) K) map[K][]T {\n    out := make(map[K][]T)\n    for _, v := range values {\n        k := key(v)\n        // TODO: добавь v в группу out[k]\n        _ = k\n    }\n    return out\n}\n",
    "bug": "package practice\n\nfunc GroupValues[T any, K comparable](values []T, key func(T) K) map[K][]T {\n\tout := make(map[K][]T)\n\tfor _,v := range values { k:=key(v); out[k]=[]T{v} }\n\treturn out\n}\n",
    "hints": [
      "Первое действие: Создать map для групп. Нам нужно хранить несколько элементов для одного ключа. K — тип ключа, []T — список элементов этой группы.",
      "Начни с этой строки: out := make(map[K][]T)",
      "Следующее действие: Перебрать вход. range даёт индекс и элемент. Индекс не нужен, поэтому используем _. Переменная v — текущий элемент типа T.",
      "Проверь оставшиеся действия: Получить ключ текущего элемента → Добавить элемент в его группу → Вернуть группы.",
      "out := make(map[K][]T)\nfor _, v := range values {\n    k := key(v)\n    out[k] = append(out[k], v)\n}\nreturn out"
    ],
    "related": [
      [
        "core-group-length",
        "Группировка строк"
      ],
      [
        "advanced-generic-filter",
        "Generic предикат"
      ]
    ],
    "production": "Группировка событий по tenant ID или DTO по статусу помогает формировать пакетные операции. Порядок обхода самих ключей map не определён; для стабильного вывода сортируй ключи отдельно.",
    "interview": "Почему T any, а K comparable?"
  },
  "advanced-generic-map": {
    "frames": [
      [
        "Вход",
        [
          "values=[7,12]",
          "T=int",
          "R=string"
        ],
        "convert=strconv.Itoa",
        "Типы различаются."
      ],
      [
        "Выделение",
        [
          "out=[\"\",\"\"]"
        ],
        "make([]R,2)",
        "Длина уже равна двум."
      ],
      [
        "Первый вызов",
        [
          "out=[\"7\",\"\"]"
        ],
        "out[0]=convert(7)",
        "Записываем по индексу."
      ],
      [
        "Результат",
        [
          "out=[\"7\",\"12\"]"
        ],
        "return out",
        "Исходный срез не меняется."
      ]
    ],
    "steps": [
      [
        "Выделить результат",
        "out := make([]R, len(values))",
        "R — выходной тип. Длина заранее известна: один выходной элемент на каждый входной."
      ],
      [
        "Перебрать с индексом",
        "for i, v := range values {",
        "i — позиция, v — элемент T. Индекс нужен для записи в готовый срез."
      ],
      [
        "Преобразовать элемент",
        "    out[i] = convert(v)\n}",
        "convert принимает T и возвращает R. Записываем R по тому же индексу, не используем append к уже заполненной длине."
      ],
      [
        "Вернуть результат",
        "return out",
        "Порядок и длина сохранены."
      ]
    ],
    "blocks": [
      "Вернуть результат",
      "Преобразовать элемент",
      "Перебрать с индексом",
      "Выделить результат"
    ],
    "order": [
      3,
      2,
      1,
      0
    ],
    "blanks": [
      {
        "before": "out := make(",
        "after": ",len(values))",
        "options": [
          "[]R",
          "[]T",
          "[]any"
        ],
        "correct": 0,
        "explain": "Выходной тип R."
      },
      {
        "before": "out[i] = ",
        "after": "",
        "options": [
          "v",
          "convert(v)",
          "nil"
        ],
        "correct": 1,
        "explain": "Преобразуем элемент."
      }
    ],
    "partial": "package practice\n\nfunc TransformValues[T any, R any](values []T, convert func(T) R) []R {\n    out := make([]R, len(values))\n    for i, v := range values {\n        // TODO: запиши результат convert(v) в out[i]\n        _, _ = i, v\n    }\n    return out\n}\n",
    "bug": "package practice\n\nfunc TransformValues[T any, R any](values []T, convert func(T) R) []R {\n\tout := make([]R,0,len(values))\n\tfor i:=len(values)-1;i>=0;i-- {out=append(out,convert(values[i]))}\n\treturn out\n}\n",
    "hints": [
      "Первое действие: Выделить результат. R — выходной тип. Длина заранее известна: один выходной элемент на каждый входной.",
      "Начни с этой строки: out := make([]R, len(values))",
      "Следующее действие: Перебрать с индексом. i — позиция, v — элемент T. Индекс нужен для записи в готовый срез.",
      "Проверь оставшиеся действия: Преобразовать элемент → Вернуть результат.",
      "out := make([]R, len(values))\nfor i, v := range values {\n    out[i] = convert(v)\n}\nreturn out"
    ],
    "related": [
      [
        "advanced-generic-filter",
        "Универсальная фильтрация"
      ],
      [
        "advanced-generic-group",
        "Универсальная группировка"
      ]
    ],
    "production": "Преобразование доменных моделей в DTO можно выразить обычным циклом или generic helper, если это повышает читаемость. Сложные преобразования с ошибками требуют отдельного контракта.",
    "interview": "Чем TransformValues отличается от FilterValues?"
  },
  "advanced-generic-set": {
    "frames": [
      [
        "Подготовка",
        [
          "first=[b,a,b,c]",
          "second=[a,b]"
        ],
        "remaining={a,b}",
        "Множество второго среза."
      ],
      [
        "Первое совпадение",
        [
          "out=[b]",
          "remaining={a}"
        ],
        "delete(remaining,b)",
        "b больше не выдаём."
      ],
      [
        "Второе совпадение",
        [
          "out=[b,a]",
          "remaining={}"
        ],
        "delete(remaining,a)",
        "a добавлено."
      ],
      [
        "Остальные",
        [
          "out=[b,a]"
        ],
        "b и c пропущены",
        "Порядок и уникальность сохранены."
      ]
    ],
    "steps": [
      [
        "Создать множество",
        "remaining := make(map[T]struct{}, len(second))",
        "Ключ — элемент T. Пустая структура хранит только факт присутствия."
      ],
      [
        "Заполнить множество",
        "for _, v := range second {\n    remaining[v] = struct{}{}\n}",
        "Перебираем второй срез. Одинаковые ключи записываются в одну ячейку map."
      ],
      [
        "Создать результат",
        "out := make([]T, 0)",
        "Нужен отдельный срез, потому что map не сохраняет порядок."
      ],
      [
        "Перебрать первый срез",
        "for _, v := range first {",
        "Именно этот обход задаёт порядок результата."
      ],
      [
        "Проверить присутствие",
        "    if _, ok := remaining[v]; ok {",
        "ok показывает, есть ли ключ. Само пустое значение нам не нужно."
      ],
      [
        "Добавить и исключить повтор",
        "        out = append(out, v)\n        delete(remaining, v)\n    }\n}",
        "Добавляем совпадение один раз. Удаляем ключ, чтобы повтор в first больше не прошёл проверку."
      ],
      [
        "Вернуть результат",
        "return out",
        "Оба входных среза остаются неизменными."
      ]
    ],
    "blocks": [
      "Вернуть результат",
      "Добавить и исключить повтор",
      "Проверить присутствие",
      "Перебрать первый срез",
      "Создать результат",
      "Заполнить множество",
      "Создать множество"
    ],
    "order": [
      6,
      5,
      4,
      3,
      2,
      1,
      0
    ],
    "blanks": [
      {
        "before": "remaining := make(",
        "after": ",len(second))",
        "options": [
          "[]T",
          "map[T]struct{}",
          "map[any]T"
        ],
        "correct": 1,
        "explain": "Множество сравнимых ключей."
      },
      {
        "before": "",
        "after": "(remaining,v)",
        "options": [
          "append",
          "copy",
          "delete"
        ],
        "correct": 2,
        "explain": "Исключаем повтор."
      }
    ],
    "partial": "package practice\n\nfunc CommonDistinct[T comparable](first, second []T) []T {\n    remaining := make(map[T]struct{}, len(second))\n    for _, v := range second { remaining[v] = struct{}{} }\n    out := make([]T, 0)\n    for _, v := range first {\n        if _, ok := remaining[v]; ok {\n            // TODO: добавь v в out\n            delete(remaining, v)\n        }\n    }\n    return out\n}\n",
    "bug": "package practice\n\nfunc CommonDistinct[T comparable](first, second []T) []T {\n\tremaining:=make(map[T]struct{})\n\tfor _,v:=range second {remaining[v]=struct{}{}}\n\tout:=make([]T,0)\n\tfor _,v:=range first {if _,ok:=remaining[v];ok {out=append(out,v)}}\n\treturn out\n}\n",
    "hints": [
      "Первое действие: Создать множество. Ключ — элемент T. Пустая структура хранит только факт присутствия.",
      "Начни с этой строки: remaining := make(map[T]struct{}, len(second))",
      "Следующее действие: Заполнить множество. Перебираем второй срез. Одинаковые ключи записываются в одну ячейку map.",
      "Проверь оставшиеся действия: Создать результат → Перебрать первый срез → Проверить присутствие → Добавить и исключить повтор → Вернуть результат.",
      "remaining := make(map[T]struct{}, len(second))\nfor _, v := range second {\n    remaining[v] = struct{}{}\n}\nout := make([]T, 0)\nfor _, v := range first {\n    if _, ok := remaining[v]; ok {\n        out = append(out, v)\n        delete(remaining, v)\n    }\n}\nreturn out"
    ],
    "related": [
      [
        "generic-unique",
        "Дедупликация"
      ],
      [
        "advanced-generic-group",
        "Ключи generic map"
      ]
    ],
    "production": "Пересечение списков разрешённых идентификаторов удобно при подготовке выборок. Само по себе упражнение не заменяет полноценную серверную авторизацию и проверки актуальности прав.",
    "interview": "Почему comparable не гарантирует отсутствие panic для любого интерфейсного аргумента?"
  },
  "advanced-dependency-injection": {
    "frames": [
      [
        "Сборка",
        [
          "fake sender",
          "NewDeliveryService(fake)"
        ],
        "service.sender = fake",
        "Сохраняем зависимость."
      ],
      [
        "Вызов",
        [
          "service.Deliver(\"hello\")"
        ],
        "s.sender.Send(\"hello\")",
        "Текст передаётся без изменения."
      ],
      [
        "Успех",
        [
          "calls=1",
          "err=nil"
        ],
        "return nil",
        "Операция завершена."
      ],
      [
        "Сбой",
        [
          "calls=1",
          "err=offline"
        ],
        "return offline",
        "Сервис возвращает ошибку зависимости."
      ]
    ],
    "steps": [
      [
        "Определить контракт",
        "type DeliverySender interface {\n    Send(string) error\n}",
        "Сервису нужен один метод отправки текста. Интерфейс описывает его сигнатуру, а не способ отправки."
      ],
      [
        "Хранить зависимость",
        "type DeliveryService struct {\n    sender DeliverySender\n}",
        "Поле sender имеет тип интерфейса: в нём может храниться любая подходящая реализация."
      ],
      [
        "Объявить конструктор",
        "func NewDeliveryService(sender DeliverySender) *DeliveryService {",
        "Принимаем готовую зависимость снаружи. Результат — указатель на сервис."
      ],
      [
        "Создать структуру",
        "    return &DeliveryService{sender: sender}\n}",
        "Слева имя поля, справа параметр. & берёт адрес созданной структуры."
      ],
      [
        "Объявить метод",
        "func (s *DeliveryService) Deliver(text string) error {",
        "s — receiver, через него доступно поле sender конкретного сервиса."
      ],
      [
        "Вызвать зависимость",
        "    return s.sender.Send(text)\n}",
        "Получаем поле sender, вызываем его метод Send с text и сразу возвращаем исходный error."
      ]
    ],
    "blocks": [
      "Вызвать зависимость",
      "Объявить метод",
      "Создать структуру",
      "Объявить конструктор",
      "Хранить зависимость",
      "Определить контракт"
    ],
    "order": [
      5,
      4,
      3,
      2,
      1,
      0
    ],
    "blanks": [
      {
        "before": "return &DeliveryService{sender: ",
        "after": "}",
        "options": [
          "nil",
          "sender",
          "text"
        ],
        "correct": 1,
        "explain": "Сохраняем переданный параметр."
      },
      {
        "before": "return ",
        "after": "(text)",
        "options": [
          "sender",
          "s.Deliver",
          "s.sender.Send"
        ],
        "correct": 2,
        "explain": "Вызываем метод зависимости."
      }
    ],
    "partial": "package practice\n\ntype DeliverySender interface { Send(string) error }\ntype DeliveryService struct { sender DeliverySender }\n\nfunc NewDeliveryService(sender DeliverySender) *DeliveryService {\n    return &DeliveryService{sender: sender}\n}\n\nfunc (s *DeliveryService) Deliver(text string) error {\n    // TODO: вызови Send через поле sender и верни полученную ошибку\n    return nil\n}\n",
    "bug": "package practice\n\ntype DeliverySender interface { Send(string) error }\ntype DeliveryService struct { sender DeliverySender }\n\nfunc NewDeliveryService(sender DeliverySender) *DeliveryService {\n    return &DeliveryService{sender: sender}\n}\n\nfunc (s *DeliveryService) Deliver(text string) error {\n    _ = s.sender.Send(text)\n    return nil\n}\n",
    "hints": [
      "Сервис получает готовую зависимость, а не создаёт её сам.",
      "Посмотри на поле sender структуры DeliveryService.",
      "Создай сервис: return &DeliveryService{sender: sender}.",
      "В Deliver обратись к s.sender и вызови Send с text.",
      "return s.sender.Send(text)"
    ],
    "related": [
      [
        "advanced-repository",
        "Интерфейс репозитория"
      ],
      [
        "advanced-interface-compose",
        "Композиция интерфейсов"
      ]
    ],
    "production": "В main или composition root собирают сервис из репозиториев, HTTP-клиентов и publishers. В тестах подставляют fake. Это ручной DI без обязательного фреймворка.",
    "interview": "Зачем передавать интерфейс через конструктор?"
  },
  "advanced-interface-adapter": {
    "frames": [
      [
        "Вход",
        [
          "fn: func(string) error",
          "calls=0"
        ],
        "AdaptEventHandler(fn)",
        "Функция ещё не вызывается."
      ],
      [
        "Адаптация",
        [
          "dynamic type=EventHandlerFunc",
          "calls=0"
        ],
        "EventHandlerFunc(fn)",
        "Преобразуем тип, помещаем значение в интерфейс."
      ],
      [
        "Вызов",
        [
          "handler.Handle(\"created\")",
          "f(\"created\")"
        ],
        "return f(event)",
        "Метод делегирует вызов."
      ],
      [
        "Выход",
        [
          "calls=1",
          "err=original"
        ],
        "return error",
        "Сохраняем результат callback."
      ]
    ],
    "steps": [
      [
        "Описать нужный метод",
        "type EventHandler interface {\n    Handle(string) error\n}",
        "Потребителю нужен метод Handle. Обычная функция с такой сигнатурой ещё не имеет метода."
      ],
      [
        "Объявить определённый тип функции",
        "type EventHandlerFunc func(string) error",
        "Это новый тип с underlying function type. В том же пакете к нему можно добавить метод."
      ],
      [
        "Объявить метод",
        "func (f EventHandlerFunc) Handle(event string) error {",
        "f — receiver, значение нашего функционального типа. event — аргумент метода."
      ],
      [
        "Вызвать функцию",
        "    return f(event)\n}",
        "f можно вызывать как обычную функцию. Передаём event и возвращаем исходный error."
      ],
      [
        "Объявить адаптер",
        "func AdaptEventHandler(fn func(string) error) EventHandler {",
        "Принимаем обычную функцию. Результат — интерфейс, требующий Handle."
      ],
      [
        "Преобразовать тип",
        "    return EventHandlerFunc(fn)\n}",
        "Это conversion, не вызов fn. Полученный тип имеет Handle и неявно реализует EventHandler."
      ]
    ],
    "blocks": [
      "Преобразовать тип",
      "Объявить адаптер",
      "Вызвать функцию",
      "Объявить метод",
      "Объявить определённый тип функции",
      "Описать нужный метод"
    ],
    "order": [
      5,
      4,
      3,
      2,
      1,
      0
    ],
    "blanks": [
      {
        "before": "return ",
        "after": "(event)",
        "options": [
          "f",
          "Handle",
          "EventHandler"
        ],
        "correct": 0,
        "explain": "Receiver f — функция."
      },
      {
        "before": "return ",
        "after": "(fn)",
        "options": [
          "fn",
          "EventHandlerFunc",
          "Handle"
        ],
        "correct": 1,
        "explain": "Преобразуем тип, не вызываем callback."
      }
    ],
    "partial": "package practice\n\ntype EventHandler interface { Handle(string) error }\ntype EventHandlerFunc func(string) error\n\nfunc (f EventHandlerFunc) Handle(event string) error {\n    return f(event)\n}\n\nfunc AdaptEventHandler(fn func(string) error) EventHandler {\n    // TODO: преобразуй fn в EventHandlerFunc и верни результат\n    return nil\n}\n",
    "bug": "package practice\n\ntype EventHandler interface { Handle(string) error }\ntype EventHandlerFunc func(string) error\n\nfunc (f EventHandlerFunc) Handle(event string) error {\n    _ = f(event)\n    return nil\n}\n\nfunc AdaptEventHandler(fn func(string) error) EventHandler {\n    return EventHandlerFunc(fn)\n}\n",
    "hints": [
      "Интерфейс требует метод Handle, а не просто функцию с такой сигнатурой.",
      "Тип EventHandlerFunc уже объявлен. Receiver f сам является функцией.",
      "В Handle напиши return f(event).",
      "В AdaptEventHandler нужно преобразовать fn, не вызывать её.",
      "return EventHandlerFunc(fn)"
    ],
    "related": [
      [
        "advanced-dependency-injection",
        "Передача зависимости"
      ],
      [
        "advanced-method-set",
        "Method set"
      ]
    ],
    "production": "net/http использует http.HandlerFunc для адаптации обычных функций к Handler. Этот приём подходит и для небольших обработчиков событий или тестовых зависимостей.",
    "interview": "Почему http.HandlerFunc реализует http.Handler?"
  },
  "advanced-interface-equality": {
    "frames": [
      [
        "Обычные значения",
        [
          "a=int(7)",
          "b=int(7)"
        ],
        "equal=true,ok=true",
        "Типы совпадают, значения сравнимы."
      ],
      [
        "Разные типы",
        [
          "a=[]int{1}",
          "b=string(\"1\")"
        ],
        "equal=false,ok=true",
        "Разные динамические типы не равны."
      ],
      [
        "Одинаковые срезы",
        [
          "a=[]int{1}",
          "b=[]int{1}"
        ],
        "equal=false,ok=false",
        "Срезы нельзя сравнивать через ==."
      ],
      [
        "Вложенный интерфейс",
        [
          "a=struct{V any}{[]int{1}}",
          "b=struct{V any}{[]int{1}}"
        ],
        "Value.Comparable=false",
        "Type.Comparable недостаточно для конкретного значения."
      ]
    ],
    "steps": [
      [
        "Обработать nil-интерфейс",
        "if a == nil || b == nil {",
        "Сравнить интерфейс с nil безопасно. ValueOf(nil) даёт невалидное reflect.Value, поэтому начинаем с этой проверки."
      ],
      [
        "Вернуть результат для nil",
        "    return a == nil && b == nil, true\n}",
        "Оба nil равны. Если только один nil, значения не равны, но сравнение допустимо."
      ],
      [
        "Сравнить динамические типы",
        "if reflect.TypeOf(a) != reflect.TypeOf(b) {\n    return false, true\n}",
        "Разные динамические типы интерфейсов не равны, даже если один содержит срез."
      ],
      [
        "Проверить сравнимость значений",
        "if !reflect.ValueOf(a).Comparable() || !reflect.ValueOf(b).Comparable() {",
        "Value.Comparable проверяет конкретное значение, включая динамические значения вложенных интерфейсных полей."
      ],
      [
        "Отклонить опасное сравнение",
        "    return false, false\n}",
        "ok=false сообщает, что безопасное сравнение через == не поддержано контрактом."
      ],
      [
        "Сравнить значения",
        "return a == b, true",
        "После проверок сравнение безопасно. Не используем DeepEqual: у него другая семантика."
      ]
    ],
    "blocks": [
      "Сравнить значения",
      "Отклонить опасное сравнение",
      "Проверить сравнимость значений",
      "Сравнить динамические типы",
      "Вернуть результат для nil",
      "Обработать nil-интерфейс"
    ],
    "order": [
      5,
      4,
      3,
      2,
      1,
      0
    ],
    "blanks": [
      {
        "before": "if reflect.",
        "after": "(a) != reflect.TypeOf(b) {",
        "options": [
          "ValueOf",
          "TypeOf",
          "DeepEqual"
        ],
        "correct": 1,
        "explain": "Сравниваем динамические типы."
      },
      {
        "before": "if !reflect.ValueOf(a).",
        "after": "() {",
        "options": [
          "IsNil",
          "Kind",
          "Comparable"
        ],
        "correct": 2,
        "explain": "Проверяем безопасную сравнимость конкретного значения."
      }
    ],
    "partial": "package practice\n\nfunc SafeValueEqual(a, b any) (equal, ok bool) {\n    if a == nil || b == nil { return a == nil && b == nil, true }\n    if reflect.TypeOf(a) != reflect.TypeOf(b) { return false, true }\n    // TODO: проверь Comparable у обоих значений перед сравнением\n    return false, false\n}\n",
    "bug": "package practice\n\nfunc SafeValueEqual(a, b any) (equal, ok bool) {\n    if a == nil || b == nil { return a == nil && b == nil, true }\n    if reflect.TypeOf(a) != reflect.TypeOf(b) { return false, true }\n    if !reflect.TypeOf(a).Comparable() { return false, false }\n    return a == b, true\n}\n",
    "hints": [
      "Сначала разберись с nil: reflect.ValueOf(nil) невалиден.",
      "Если динамические типы различны, интерфейсы не равны.",
      "Проверяй reflect.ValueOf(a).Comparable(), а не только TypeOf(a).Comparable().",
      "Если хотя бы одно значение несравнимо, верни false,false.",
      "После проверок напиши return a == b, true."
    ],
    "related": [
      [
        "typednil",
        "Typed nil"
      ],
      [
        "advanced-generic-set",
        "Comparable в generics"
      ]
    ],
    "production": "При работе с произвольными metadata или адаптерами не следует сравнивать any без контракта. Лучше ограничить типы заранее. Эта функция учебно показывает консервативную проверку безопасности ==, а не универсальное сравнение объектов.",
    "interview": "Почему reflect.Type.Comparable может быть true, а сравнение всё равно вызвать panic?"
  },
  "advanced-method-values": {
    "frames": [
      [
        "Исходное состояние",
        [
          "q → Limit=10"
        ],
        "q.Current, q.Live",
        "Оба метода доступны через указатель."
      ],
      [
        "Создание функций",
        [
          "snapshot → copy{10}",
          "live → q"
        ],
        "snapshot = q.Current; live = q.Live",
        "Receiver вычисляется и сохраняется при создании method value."
      ],
      [
        "Изменение",
        [
          "q → Limit=25",
          "copy → Limit=10"
        ],
        "q.Limit = 25",
        "Копия структуры не изменяется."
      ],
      [
        "Вызов",
        [
          "snapshot()=10",
          "live()=25"
        ],
        "return values",
        "Pointer method читает изменённый объект."
      ]
    ],
    "steps": [
      [
        "Разобрать структуру и методы",
        "type MethodQuota struct { Limit int }\nfunc (q MethodQuota) Current() int { return q.Limit }\nfunc (q *MethodQuota) Live() int { return q.Limit }",
        "Оба метода возвращают Limit, но Current получает копию структуры, а Live — указатель. Они уже даны в заготовке."
      ],
      [
        "Разобрать сигнатуру",
        "func CaptureQuotaReaders(q *MethodQuota) (snapshot, live func() int) {",
        "Возвращаем две функции без аргументов. snapshot и live — именованные переменные результата, поэтому далее используем =, а не :=."
      ],
      [
        "Сохранить value method",
        "    snapshot = q.Current",
        "Убираем круглые скобки: q.Current — значение функции, q.Current() — вызов с результатом int. Для value receiver Go сохраняет копию *q при создании method value."
      ],
      [
        "Сохранить pointer method",
        "    live = q.Live",
        "Здесь сохраняется указатель q, а не копия структуры. При будущем вызове метод прочитает актуальное поле по этому адресу."
      ],
      [
        "Вернуть функции",
        "    return\n}",
        "Именованные результаты уже заполнены. Вызовы snapshot() и live() произойдут позже у вызывающего кода."
      ]
    ],
    "blocks": [
      "Вернуть функции",
      "Сохранить pointer method",
      "Сохранить value method",
      "Разобрать сигнатуру",
      "Разобрать структуру и методы"
    ],
    "order": [
      4,
      3,
      2,
      1,
      0
    ],
    "blanks": [
      {
        "before": "snapshot = ",
        "after": "",
        "options": [
          "q.Current()",
          "q.Current",
          "q.Live"
        ],
        "correct": 1,
        "explain": "Сохраняем value method, не вызывая."
      },
      {
        "before": "live = ",
        "after": "",
        "options": [
          "q.Current",
          "q.Live()",
          "q.Live"
        ],
        "correct": 2,
        "explain": "Связываем pointer receiver."
      }
    ],
    "partial": "package practice\n\ntype MethodQuota struct { Limit int }\nfunc (q MethodQuota) Current() int { return q.Limit }\nfunc (q *MethodQuota) Live() int { return q.Limit }\n\nfunc CaptureQuotaReaders(q *MethodQuota) (snapshot, live func() int) {\n    snapshot = q.Current\n    // TODO: сохрани метод Live как функцию, не вызывая его\n    return\n}\n",
    "bug": "package practice\n\ntype MethodQuota struct { Limit int }\nfunc (q MethodQuota) Current() int { return q.Limit }\nfunc (q *MethodQuota) Live() int { return q.Limit }\n\nfunc CaptureQuotaReaders(q *MethodQuota) (snapshot, live func() int) {\n    snapshot = q.Live\n    live = q.Live\n    return\n}\n",
    "hints": [
      "Нужно вернуть функции, а не результаты их вызовов.",
      "Method value записывается как q.Method без круглых скобок.",
      "snapshot = q.Current сохраняет value receiver.",
      "live = q.Live сохраняет pointer receiver.",
      "snapshot = q.Current\nlive = q.Live\nreturn"
    ],
    "related": [
      [
        "advanced-value-receiver",
        "Value и pointer receiver"
      ],
      [
        "core-closure",
        "Функции и захват состояния"
      ]
    ],
    "production": "Method values позволяют передать метод сервиса как callback с уже связанным экземпляром. Копия value receiver поверхностная: вложенные map, slices и указатели могут по-прежнему разделять данные. В этом упражнении поле int демонстрирует копирование без дополнительных ссылок.",
    "interview": "Когда вычисляется receiver method value?"
  },
  "advanced-method-expressions": {
    "frames": [
      [
        "Вход",
        [
          "c.Value=10",
          "deltas=[2,-3,5]"
        ],
        "add := (*MetricCounter).Add",
        "Тип функции включает receiver."
      ],
      [
        "Первое изменение",
        [
          "c.Value=12",
          "out=[12]"
        ],
        "add(c,2)",
        "Мутируем исходный объект."
      ],
      [
        "Второе изменение",
        [
          "c.Value=9",
          "out=[12,9]"
        ],
        "add(c,-3)",
        "Отрицательное изменение тоже применяется."
      ],
      [
        "Завершение",
        [
          "c.Value=14",
          "out=[12,9,14]"
        ],
        "add(c,5)",
        "Сохраняем последовательность результатов."
      ]
    ],
    "steps": [
      [
        "Разобрать готовый метод",
        "type MetricCounter struct { Value int }\nfunc (c *MetricCounter) Add(delta int) int { c.Value += delta; return c.Value }",
        "Add изменяет поле конкретного счётчика через указатель. Возвращает значение после прибавления. Этот код уже дан."
      ],
      [
        "Получить функцию с явным receiver",
        "add := (*MetricCounter).Add",
        "Используем тип (*MetricCounter), а не переменную c. Получаем func(*MetricCounter, int) int: receiver становится первым параметром."
      ],
      [
        "Подготовить результат",
        "out := make([]int, 0, len(deltas))",
        "Длина пока 0, ёмкость резервируется для всех изменений."
      ],
      [
        "Перебрать изменения",
        "for _, delta := range deltas {",
        "delta — очередное изменение. Индекс не нужен."
      ],
      [
        "Вызвать функцию с receiver",
        "    out = append(out, add(c, delta))\n}",
        "Передаём c явно первым аргументом, delta вторым. Add меняет исходный счётчик и возвращает его новое значение, append сохраняет результат."
      ],
      [
        "Вернуть журнал",
        "return out",
        "Все изменения применены по порядку. Пустой вход оставляет счётчик неизменным."
      ]
    ],
    "blocks": [
      "Вернуть журнал",
      "Вызвать функцию с receiver",
      "Перебрать изменения",
      "Подготовить результат",
      "Получить функцию с явным receiver",
      "Разобрать готовый метод"
    ],
    "order": [
      5,
      4,
      3,
      2,
      1,
      0
    ],
    "blanks": [
      {
        "before": "add := ",
        "after": "",
        "options": [
          "c.Add",
          "(*MetricCounter).Add",
          "MetricCounter.Add"
        ],
        "correct": 1,
        "explain": "Выбираем метод у типа указателя."
      },
      {
        "before": "out = append(out, ",
        "after": ")",
        "options": [
          "add(delta)",
          "add(delta,c)",
          "add(c,delta)"
        ],
        "correct": 2,
        "explain": "Явно передаём receiver."
      }
    ],
    "partial": "package practice\n\ntype MetricCounter struct { Value int }\nfunc (c *MetricCounter) Add(delta int) int { c.Value += delta; return c.Value }\n\nfunc ApplyMetricDeltas(c *MetricCounter, deltas []int) []int {\n    add := (*MetricCounter).Add\n    out := make([]int, 0, len(deltas))\n    for _, delta := range deltas {\n        // TODO: передай receiver c и delta в add, добавь результат в out\n        _, _ = add, delta\n    }\n    return out\n}\n",
    "bug": "package practice\n\ntype MetricCounter struct { Value int }\nfunc (c *MetricCounter) Add(delta int) int { c.Value += delta; return c.Value }\n\nfunc ApplyMetricDeltas(c *MetricCounter, deltas []int) []int {\n    add := (*MetricCounter).Add\n    out := make([]int, 0, len(deltas))\n    for _, delta := range deltas {\n        copyCounter := *c\n        out = append(out, add(&copyCounter, delta))\n    }\n    return out\n}\n",
    "hints": [
      "Method expression выбирается у типа, не у экземпляра.",
      "Для pointer receiver запиши add := (*MetricCounter).Add.",
      "Создай out и перебери deltas через range.",
      "Функция add принимает c первым аргументом, delta вторым.",
      "out = append(out, add(c, delta))"
    ],
    "related": [
      [
        "advanced-method-values",
        "Method values"
      ],
      [
        "advanced-method-set",
        "Method set"
      ]
    ],
    "production": "Method expressions удобны, когда одна функция должна работать с разными экземплярами, например в таблице обработчиков или generic-алгоритме. Обычный вызов метода часто проще; method expression полезен там, где действительно нужен явный receiver.",
    "interview": "Чем c.Add отличается от (*MetricCounter).Add?"
  },
  "advanced-embedding-conflict": {
    "frames": [
      [
        "Вход",
        [
          "LocalAccess.Enabled=true",
          "RemoteAccess.Approved=false"
        ],
        "AccessSummary",
        "Два встроенных поля."
      ],
      [
        "Локальная проверка",
        [
          "local=true"
        ],
        "s.LocalAccess.Allowed()",
        "Обращаемся к конкретному полю."
      ],
      [
        "Удалённая проверка",
        [
          "local=true",
          "remote=false"
        ],
        "s.RemoteAccess.Allowed()",
        "Вторая проверка независима."
      ],
      [
        "Результат",
        [
          "true && false"
        ],
        "false",
        "Обе проверки должны разрешить доступ."
      ]
    ],
    "steps": [
      [
        "Разобрать два готовых типа",
        "type LocalAccess struct { Enabled bool }\nfunc (a LocalAccess) Allowed() bool { return a.Enabled }\ntype RemoteAccess struct { Approved bool }\nfunc (a RemoteAccess) Allowed() bool { return a.Approved }",
        "Оба типа уже имеют метод Allowed. Первый проверяет локальный флаг, второй — удалённое разрешение. Не переписываем их логику."
      ],
      [
        "Разобрать встраивание",
        "type AccessSummary struct {\n    LocalAccess\n    RemoteAccess\n}",
        "Имена типов одновременно служат именами встроенных полей. Методы Allowed находятся на одинаковой глубине: без собственного метода селектор s.Allowed неоднозначен."
      ],
      [
        "Объявить собственный метод",
        "func (s AccessSummary) Allowed() bool {",
        "Receiver s — значение составной структуры. Метод на самой структуре имеет приоритет над promoted methods."
      ],
      [
        "Вызвать локальную проверку",
        "    local := s.LocalAccess.Allowed()",
        "Сначала выбираем встроенное поле LocalAccess, затем его метод. := объявляет переменную local типа bool."
      ],
      [
        "Вызвать удалённую проверку",
        "    remote := s.RemoteAccess.Allowed()",
        "Явно выбираем второе поле. Конфликта имён больше нет."
      ],
      [
        "Объединить результаты",
        "    return local && remote\n}",
        "&& возвращает true только при двух true. || разрешил бы доступ при одной успешной проверке, что нарушает условие."
      ]
    ],
    "blocks": [
      "Объединить результаты",
      "Вызвать удалённую проверку",
      "Вызвать локальную проверку",
      "Объявить собственный метод",
      "Разобрать встраивание",
      "Разобрать два готовых типа"
    ],
    "order": [
      5,
      4,
      3,
      2,
      1,
      0
    ],
    "blanks": [
      {
        "before": "local := s.",
        "after": ".Allowed()",
        "options": [
          "Allowed",
          "LocalAccess",
          "RemoteAccess"
        ],
        "correct": 1,
        "explain": "Выбираем локальный встроенный компонент."
      },
      {
        "before": "return local ",
        "after": " remote",
        "options": [
          "||",
          "==",
          "&&"
        ],
        "correct": 2,
        "explain": "Требуются обе проверки."
      }
    ],
    "partial": "package practice\n\ntype LocalAccess struct { Enabled bool }\nfunc (a LocalAccess) Allowed() bool { return a.Enabled }\ntype RemoteAccess struct { Approved bool }\nfunc (a RemoteAccess) Allowed() bool { return a.Approved }\ntype AccessSummary struct { LocalAccess; RemoteAccess }\ntype AccessDecision interface { Allowed() bool }\n\nfunc (s AccessSummary) Allowed() bool {\n    local := s.LocalAccess.Allowed()\n    remote := s.RemoteAccess.Allowed()\n    // TODO: верни true только если обе проверки дали true\n    _, _ = local, remote\n    return false\n}\n",
    "bug": "package practice\n\ntype LocalAccess struct { Enabled bool }\nfunc (a LocalAccess) Allowed() bool { return a.Enabled }\ntype RemoteAccess struct { Approved bool }\nfunc (a RemoteAccess) Allowed() bool { return a.Approved }\ntype AccessSummary struct { LocalAccess; RemoteAccess }\ntype AccessDecision interface { Allowed() bool }\n\nfunc (s AccessSummary) Allowed() bool {\n    local := s.LocalAccess.Allowed()\n    remote := s.RemoteAccess.Allowed()\n    return local || remote\n}\n",
    "hints": [
      "У обоих встроенных типов есть Allowed. Нужно объявить Allowed на AccessSummary.",
      "Через s.LocalAccess можно выбрать первый встроенный объект.",
      "local := s.LocalAccess.Allowed()",
      "Получаем remote аналогично, через s.RemoteAccess.Allowed().",
      "local := s.LocalAccess.Allowed()\nremote := s.RemoteAccess.Allowed()\nreturn local && remote"
    ],
    "related": [
      [
        "advanced-embedding",
        "Встраивание структур"
      ],
      [
        "advanced-method-set",
        "Method set"
      ]
    ],
    "production": "В составном объекте могут совпасть имена методов нескольких компонентов. Явный выбор поля делает намерение понятным. Упражнение иллюстрирует композицию и AND-условие, а не полноценную систему авторизации.",
    "interview": "Что произойдёт, если два встроенных типа имеют метод с одним именем на одинаковой глубине?"
  },
  "advanced-component-composition": {
    "frames": [
      [
        "Сборка",
        [
          "validator=V",
          "publisher=P"
        ],
        "NewPublishWorkflow(V,P)",
        "Конструктор связывает компоненты."
      ],
      [
        "Вход",
        [
          "text=\"event\""
        ],
        "V.Validate(text)",
        "Первая операция — валидация."
      ],
      [
        "Ветка ошибки",
        [
          "Validate → error",
          "Publish calls=0"
        ],
        "return err",
        "Fail fast: следующий компонент не вызывается."
      ],
      [
        "Ветка успеха",
        [
          "Validate → nil",
          "P.Publish(text)"
        ],
        "return publisher error",
        "Делегируем публикацию после успешной проверки."
      ]
    ],
    "steps": [
      [
        "Определить два контракта",
        "type WorkflowValidator interface { Validate(string) error }\ntype WorkflowPublisher interface { Publish(string) error }",
        "Валидация и публикация — две разные обязанности. Каждому компоненту нужен только один метод."
      ],
      [
        "Хранить компоненты в полях",
        "type PublishWorkflow struct {\n    validator WorkflowValidator\n    publisher WorkflowPublisher\n}",
        "Поля именованные, а не встроенные. Сервис сам определяет публичные методы, не продвигая методы зависимостей."
      ],
      [
        "Принять зависимости в конструкторе",
        "func NewPublishWorkflow(validator WorkflowValidator, publisher WorkflowPublisher) *PublishWorkflow {",
        "Обе реализации передаём извне. Конструктор не выполняет бизнес-операции."
      ],
      [
        "Сохранить компоненты",
        "    return &PublishWorkflow{validator: validator, publisher: publisher}\n}",
        "Литерал заполняет два поля. & возвращает указатель на созданный workflow."
      ],
      [
        "Объявить операцию сервиса",
        "func (w *PublishWorkflow) Publish(text string) error {",
        "w — receiver, через него получаем доступ к обоим компонентам. text — исходные данные."
      ],
      [
        "Выполнить валидацию",
        "    if err := w.validator.Validate(text); err != nil {\n        return err\n    }",
        "Вызываем Validate один раз, объявляем err в if. При ошибке return завершает весь метод, поэтому публикация не начнётся."
      ],
      [
        "Делегировать публикацию",
        "    return w.publisher.Publish(text)\n}",
        "Сюда попадаем только после успешной валидации. Явно выбираем поле publisher, передаём text и возвращаем исходный error."
      ]
    ],
    "blocks": [
      "Делегировать публикацию",
      "Выполнить валидацию",
      "Объявить операцию сервиса",
      "Сохранить компоненты",
      "Принять зависимости в конструкторе",
      "Хранить компоненты в полях",
      "Определить два контракта"
    ],
    "order": [
      6,
      5,
      4,
      3,
      2,
      1,
      0
    ],
    "blanks": [
      {
        "before": "if err := w.",
        "after": ".Validate(text); err != nil {",
        "options": [
          "publisher",
          "validator",
          "Publish"
        ],
        "correct": 1,
        "explain": "Сначала вызываем валидатор."
      },
      {
        "before": "return w.publisher.",
        "after": "(text)",
        "options": [
          "Validate",
          "PublishWorkflow",
          "Publish"
        ],
        "correct": 2,
        "explain": "Делегируем издателю."
      }
    ],
    "partial": "package practice\n\ntype WorkflowValidator interface { Validate(string) error }\ntype WorkflowPublisher interface { Publish(string) error }\ntype PublishWorkflow struct { validator WorkflowValidator; publisher WorkflowPublisher }\n\nfunc NewPublishWorkflow(validator WorkflowValidator, publisher WorkflowPublisher) *PublishWorkflow {\n    return &PublishWorkflow{validator: validator, publisher: publisher}\n}\n\nfunc (w *PublishWorkflow) Publish(text string) error {\n    if err := w.validator.Validate(text); err != nil {\n        return err\n    }\n    // TODO: передай исходный text издателю и верни его error\n    return nil\n}\n",
    "bug": "package practice\n\ntype WorkflowValidator interface { Validate(string) error }\ntype WorkflowPublisher interface { Publish(string) error }\ntype PublishWorkflow struct { validator WorkflowValidator; publisher WorkflowPublisher }\n\nfunc NewPublishWorkflow(validator WorkflowValidator, publisher WorkflowPublisher) *PublishWorkflow {\n    return &PublishWorkflow{validator: validator, publisher: publisher}\n}\n\nfunc (w *PublishWorkflow) Publish(text string) error {\n    _ = w.validator.Validate(text)\n    return w.publisher.Publish(text)\n}\n",
    "hints": [
      "Композиция здесь означает хранение двух независимых зависимостей в именованных полях.",
      "Конструктор возвращает &PublishWorkflow{validator: validator, publisher: publisher}.",
      "Начни Publish с if err := w.validator.Validate(text); err != nil { return err }.",
      "После успешной проверки явно вызови метод поля publisher.",
      "return w.publisher.Publish(text)"
    ],
    "related": [
      [
        "advanced-dependency-injection",
        "Передача зависимостей"
      ],
      [
        "advanced-interface-adapter",
        "Функциональные адаптеры"
      ],
      [
        "advanced-embedding-conflict",
        "Конфликты при embedding"
      ]
    ],
    "production": "В backend-сервисах компоненты валидации, сохранения и публикации событий часто соединяют через именованные поля и явные вызовы. Здесь проверяем последовательность и fail-fast; транзакционность, ретраи и outbox требуют отдельных контрактов.",
    "interview": "Почему именованные поля часто предпочтительнее embedding для зависимостей сервиса?"
  },
  "advanced-batch-partial-success": {
    "frames": [
      [
        "Вход",
        [
          "A",
          "B",
          "C"
        ],
        "okIDs=[]; failures=[]",
        "B завершится ошибкой."
      ],
      [
        "A",
        [
          "A"
        ],
        "okIDs=[A]",
        "Первый успех."
      ],
      [
        "B",
        [
          "B"
        ],
        "failures=[item 1 (B): offline]",
        "Сохраняем причину и продолжаем."
      ],
      [
        "C",
        [
          "C"
        ],
        "okIDs=[A,C]",
        "Следующий элемент обработан."
      ],
      [
        "Выход",
        [
          "A",
          "C"
        ],
        "return okIDs, errors.Join(failures...)",
        "Успехи и ошибки доступны вызывающему коду."
      ]
    ],
    "steps": [
      [
        "Создать список успехов",
        "okIDs := make([]string, 0, len(ids))",
        "Длина ноль, потому что пока нет успешных операций."
      ],
      [
        "Создать список ошибок",
        "var failures []error",
        "Nil-срез поддерживает append; отдельный накопитель сохраняет все причины."
      ],
      [
        "Перебрать ID",
        "for i, id := range ids {",
        "Индекс нужен для диагностики, id для вызова операции."
      ],
      [
        "Проверить результат операции",
        "    if err := deliver(id); err != nil {",
        "Вызываем callback один раз; err доступна внутри if."
      ],
      [
        "Сохранить причину",
        "        failures = append(failures, fmt.Errorf(\"item %d (%s): %w\", i, id, err))",
        "%w сохраняет причину, append возвращает обновлённый срез."
      ],
      [
        "Продолжить пакет",
        "        continue\n    }",
        "continue пропускает текущую итерацию, но не завершает цикл."
      ],
      [
        "Сохранить успех",
        "    okIDs = append(okIDs, id)\n}",
        "Сюда попадаем только при успешном вызове."
      ],
      [
        "Вернуть результаты",
        "return okIDs, errors.Join(failures...)",
        "... раскрывает срез ошибок; Join без причин возвращает nil."
      ]
    ],
    "blocks": [
      "Вернуть результаты",
      "Сохранить успех",
      "Продолжить пакет",
      "Сохранить причину",
      "Проверить результат операции",
      "Перебрать ID",
      "Создать список ошибок",
      "Создать список успехов"
    ],
    "order": [
      7,
      6,
      5,
      4,
      3,
      2,
      1,
      0
    ],
    "blanks": [
      {
        "before": "fmt.Errorf(\"item: ",
        "after": "\", err)",
        "options": [
          "%v",
          "%w",
          "%d"
        ],
        "correct": 1,
        "explain": "%w сохраняет исходную причину."
      },
      {
        "before": "",
        "after": " // действие при ошибке",
        "options": [
          "continue",
          "return nil, err",
          "break"
        ],
        "correct": 0,
        "explain": "Продолжаем пакет."
      }
    ],
    "partial": "package practice\n\nfunc ProcessDeliveryBatch(ids []string, deliver func(string) error) ([]string, error) {\nokIDs := make([]string, 0, len(ids))\nvar failures []error\nfor i, id := range ids {\n if err := deliver(id); err != nil {\n  // TODO: добавь ошибку с индексом, ID и исходной причиной\n  _, _ = i, err\n  continue\n }\n okIDs = append(okIDs,id)\n}\nreturn okIDs, errors.Join(failures...)\n}\n",
    "bug": "package practice\n\nfunc ProcessDeliveryBatch(ids []string, deliver func(string) error) ([]string, error) {\nokIDs := make([]string, 0, len(ids))\nvar failures []error\nfor i, id := range ids {\n    if err := deliver(id); err != nil {\n        failures = append(failures, fmt.Errorf(\"item %d (%s): %w\", i, id, err))\n        break\n    }\n    okIDs = append(okIDs, id)\n}\nreturn okIDs, errors.Join(failures...)\n}\n",
    "hints": [
      "Длина ноль, потому что пока нет успешных операций.",
      "okIDs := make([]string, 0, len(ids))",
      "var failures []error",
      "Перебрать ID → Проверить результат операции → Сохранить причину → Продолжить пакет → Сохранить успех → Вернуть результаты",
      "okIDs := make([]string, 0, len(ids))\nvar failures []error\nfor i, id := range ids {\n    if err := deliver(id); err != nil {\n        failures = append(failures, fmt.Errorf(\"item %d (%s): %w\", i, id, err))\n        continue\n    }\n    okIDs = append(okIDs, id)\n}\nreturn okIDs, errors.Join(failures...)"
    ],
    "related": [
      [
        "advanced-join-errors",
        "Повторить базовую задачу"
      ],
      [
        "advanced-generic-transform-error",
        "Сравнить с fail-fast"
      ]
    ],
    "production": "Независимые операции доставки могут завершаться частично успешно. Повтор всего пакета требует идемпотентности.",
    "interview": "Чем continue отличается от break и return?"
  },
  "advanced-generic-transform-error": {
    "frames": [
      [
        "Вход",
        [
          "7",
          "bad",
          "9"
        ],
        "out=[0,0,0]",
        "Преобразуем строки в числа."
      ],
      [
        "Успех",
        [
          "7"
        ],
        "out=[7,0,0]",
        "Первый результат записан."
      ],
      [
        "Ошибка",
        [
          "bad"
        ],
        "return nil, wrapped error",
        "Останавливаемся на индексе 1."
      ],
      [
        "Выход",
        [
          "9 не обработан"
        ],
        "result=nil",
        "Частичный результат не возвращается."
      ]
    ],
    "steps": [
      [
        "Создать результат",
        "out := make([]R, len(values))",
        "R — выходной тип. При успехе длина известна заранее."
      ],
      [
        "Перебрать вход",
        "for i, v := range values {",
        "i — индекс, v — элемент типа T."
      ],
      [
        "Вызвать преобразование",
        "    converted, err := convert(v)",
        "Callback возвращает значение R и error."
      ],
      [
        "Остановиться при ошибке",
        "    if err != nil {\n        return nil, fmt.Errorf(\"item %d: %w\", i, err)\n    }",
        "return завершает функцию, nil исключает выдачу частичных данных, %w сохраняет причину."
      ],
      [
        "Записать результат",
        "    out[i] = converted\n}",
        "Срез уже имеет нужную длину, поэтому записываем по индексу."
      ],
      [
        "Вернуть полный результат",
        "return out, nil",
        "Все элементы успешно обработаны."
      ]
    ],
    "blocks": [
      "Вернуть полный результат",
      "Записать результат",
      "Остановиться при ошибке",
      "Вызвать преобразование",
      "Перебрать вход",
      "Создать результат"
    ],
    "order": [
      5,
      4,
      3,
      2,
      1,
      0
    ],
    "blanks": [
      {
        "before": "fmt.Errorf(\"item: ",
        "after": "\", err)",
        "options": [
          "%v",
          "%w",
          "%d"
        ],
        "correct": 1,
        "explain": "%w сохраняет исходную причину."
      },
      {
        "before": "",
        "after": " // действие при ошибке",
        "options": [
          "continue",
          "return nil, err",
          "break"
        ],
        "correct": 1,
        "explain": "Завершаем функцию."
      }
    ],
    "partial": "package practice\n\nfunc TransformChecked[T any, R any](values []T, convert func(T) (R, error)) ([]R, error) {\nout := make([]R,len(values))\nfor i,v := range values {\n converted,err := convert(v)\n if err != nil {\n  // TODO: оберни ошибку с индексом через %w\n  return nil,err\n }\n out[i]=converted\n}\nreturn out,nil\n}\n",
    "bug": "package practice\n\nfunc TransformChecked[T any, R any](values []T, convert func(T) (R, error)) ([]R, error) {\nout := make([]R, len(values))\nfor i, v := range values {\n    converted, err := convert(v)\n    if err != nil {\n        continue\n    }\n    out[i] = converted\n}\nreturn out, nil\n}\n",
    "hints": [
      "R — выходной тип. При успехе длина известна заранее.",
      "out := make([]R, len(values))",
      "for i, v := range values {",
      "Вызвать преобразование → Остановиться при ошибке → Записать результат → Вернуть полный результат",
      "out := make([]R, len(values))\nfor i, v := range values {\n    converted, err := convert(v)\n    if err != nil {\n        return nil, fmt.Errorf(\"item %d: %w\", i, err)\n    }\n    out[i] = converted\n}\nreturn out, nil"
    ],
    "related": [
      [
        "advanced-generic-map",
        "Повторить базовую задачу"
      ],
      [
        "advanced-batch-partial-success",
        "Сравнить с partial success"
      ]
    ],
    "production": "Для полностью валидного DTO или конфигурации нужен полный результат. Fail-fast не откатывает внешние действия.",
    "interview": "Когда выбирать fail-fast вместо частичного успеха?"
  },
  "concurrency-start-goroutine": {
    "frames": [
      [
        "Вызов",
        [
          "G1: StartBackgroundWork",
          "work: готов"
        ],
        "work ещё не вызван",
        "Передаём функцию, не результат её вызова."
      ],
      [
        "Запуск",
        [
          "G1: go work()",
          "G2: runnable"
        ],
        "Создана G2",
        "Планировщик может запустить G2 до или после возврата G1."
      ],
      [
        "Возврат",
        [
          "G1: продолжает",
          "G2: выполняет work"
        ],
        "Нет ожидания",
        "Это один возможный порядок; завершение G2 не гарантировано к моменту возврата."
      ],
      [
        "Завершение",
        [
          "G2: done"
        ],
        "work завершилась",
        "Для ожидания нужен явный сигнал или WaitGroup."
      ]
    ],
    "steps": [
      [
        "Получить callback",
        "work func()",
        "Функция приходит как аргумент. Её тело ещё не выполнено."
      ],
      [
        "Запустить горутину",
        "go work()",
        "go вычисляет функцию и аргументы в вызывающей горутине, а тело выполняется конкурентно."
      ],
      [
        "Вернуть управление",
        "// конец функции",
        "Не ждём work. Планировщик не гарантирует, какая горутина продолжит первой."
      ]
    ],
    "blocks": [
      "Вернуть управление",
      "Запустить горутину",
      "Получить callback"
    ],
    "order": [
      2,
      1,
      0
    ],
    "blanks": [
      {
        "before": "",
        "after": " work()",
        "options": [
          "go",
          "defer",
          "return"
        ],
        "correct": 0,
        "explain": "go запускает вызов конкурентно."
      },
      {
        "before": "go ",
        "after": "()",
        "options": [
          "work",
          "nil",
          "close"
        ],
        "correct": 0,
        "explain": "Вызываем переданный callback."
      }
    ],
    "partial": "package practice\n\nfunc StartBackgroundWork(work func()) {\n\t// TODO: запусти work в отдельной горутине\n}\n",
    "bug": "package practice\n\nfunc StartBackgroundWork(work func()) {\n\twork()\n}\n",
    "hints": [
      "Нужно вызвать callback, но не в текущей горутине.",
      "В Go отдельный конкурентный вызов начинается с ключевого слова go.",
      "Напиши вызов work() после go.",
      "Не добавляй Wait, Sleep или повторный вызов.",
      "go work()"
    ],
    "related": [
      [
        "concurrency-done-signal",
        "Повторить запуск горутины"
      ],
      [
        "race",
        "Связь с синхронизацией"
      ]
    ],
    "production": "Фоновая работа должна иметь владельца жизненного цикла. Не запускай неконтролируемую горутину на каждый HTTP-запрос: нужны отмена, лимиты и политика ошибок.",
    "interview": "Гарантирует ли go, что новая горутина начнёт или завершит работу до возврата?"
  },
  "concurrency-done-signal": {
    "frames": [
      [
        "Создание",
        [
          "done: open",
          "G1: ready"
        ],
        "done := make(chan struct{})",
        "Нет сообщения о завершении."
      ],
      [
        "Работа",
        [
          "G2: work()",
          "done: open"
        ],
        "G1 получает done",
        "Получатель может ждать <-done."
      ],
      [
        "Завершение",
        [
          "G2: return",
          "done: closed"
        ],
        "defer close(done)",
        "Закрытие происходит только после возврата work."
      ],
      [
        "Получение сигнала",
        [
          "G1: unblocked",
          "done: closed"
        ],
        "_, ok := <-done → ok=false",
        "Все ожидающие чтения могут продолжить."
      ]
    ],
    "steps": [
      [
        "Создать сигнал",
        "done := make(chan struct{})",
        "struct{} не содержит данных. Канал нужен только как сигнал."
      ],
      [
        "Запустить исполнителя",
        "go func() {",
        "Анонимная функция выполняется в отдельной горутине и захватывает done и work."
      ],
      [
        "Запланировать закрытие",
        "    defer close(done)",
        "Закрытие произойдёт при выходе из этой функции, после work. Закрывает владелец сигнала."
      ],
      [
        "Выполнить работу",
        "    work()\n}()",
        "Скобки () вызывают анонимную функцию; без них go statement невалиден."
      ],
      [
        "Вернуть канал",
        "return done",
        "<-chan struct{} позволяет получателю читать, но не закрывать канал. <-done ожидает завершения."
      ]
    ],
    "blocks": [
      "Вернуть канал",
      "Выполнить работу",
      "Запланировать закрытие",
      "Запустить исполнителя",
      "Создать сигнал"
    ],
    "order": [
      4,
      3,
      2,
      1,
      0
    ],
    "blanks": [
      {
        "before": "done := make(",
        "after": " )",
        "options": [
          "chan struct{}",
          "struct{}",
          "[]struct{}"
        ],
        "correct": 0,
        "explain": "Создаём канал сигнала."
      },
      {
        "before": "defer ",
        "after": "(done)",
        "options": [
          "close",
          "delete",
          "len"
        ],
        "correct": 0,
        "explain": "Закрытие сигнализирует о завершении."
      }
    ],
    "partial": "package practice\n\nfunc RunWithDone(work func()) <-chan struct{} {\n\tdone := make(chan struct{})\n\tgo func() {\n\t    work()\n\t    // TODO: закрой done после выполнения\n\t}()\n\treturn done\n}\n",
    "bug": "package practice\n\nfunc RunWithDone(work func()) <-chan struct{} {\n\tdone := make(chan struct{})\n\tclose(done)\n\tgo work()\n\treturn done\n}\n",
    "hints": [
      "Сначала создай канал без полезной нагрузки.",
      "Верни канал только для чтения.",
      "Запусти анонимную функцию через go func(){...}().",
      "Внутри неё зарегистрируй defer close(done), затем вызови work.",
      "done := make(chan struct{})\ngo func(){defer close(done);work()}()\nreturn done"
    ],
    "related": [
      [
        "concurrency-start-goroutine",
        "Повторить запуск горутины"
      ],
      [
        "race",
        "Связь с синхронизацией"
      ]
    ],
    "production": "Сигнал закрытия удобно использовать для ожидания завершения worker-а. Для остановки обычно нужен отдельный сигнал отмены: done сообщает о фактическом завершении, а не просит остановиться.",
    "interview": "Почему закрытый done-канал лучше одиночной отправки для нескольких ожидающих?"
  },
  "concurrency-result-channel": {
    "frames": [
      [
        "Вход",
        [
          "work → 42",
          "out: cap=1"
        ],
        "len=0",
        "Создаём место для одного результата."
      ],
      [
        "Вычисление",
        [
          "G2: work()",
          "G1: продолжает"
        ],
        "out: open, len=0",
        "Работа выполняется конкурентно."
      ],
      [
        "Отправка",
        [
          "out: [42]",
          "G2: done"
        ],
        "close(out), len=1",
        "Даже без читателя единственное значение помещается в буфер."
      ],
      [
        "Чтение",
        [
          "v=42, ok=true",
          "len=0"
        ],
        "следующее чтение: 0,false",
        "Закрытие не удаляет накопленные данные."
      ]
    ],
    "steps": [
      [
        "Создать буфер",
        "out := make(chan int, 1)",
        "Ёмкость 1 позволяет сохранить один результат без готового получателя."
      ],
      [
        "Запустить вычисление",
        "go func() {",
        "Вызов возвращает канал, пока вычисление может продолжаться."
      ],
      [
        "Запланировать закрытие",
        "    defer close(out)",
        "Получатель увидит конец потока после получения единственного значения."
      ],
      [
        "Отправить результат",
        "    out <- work()\n}()",
        "Сначала вычисляется work(), затем результат записывается в канал. Ноль тоже допустим."
      ],
      [
        "Вернуть поток",
        "return out",
        "Получатель читает значение; после опустошения закрытого канала ok=false."
      ]
    ],
    "blocks": [
      "Вернуть поток",
      "Отправить результат",
      "Запланировать закрытие",
      "Запустить вычисление",
      "Создать буфер"
    ],
    "order": [
      4,
      3,
      2,
      1,
      0
    ],
    "blanks": [
      {
        "before": "out := make(chan int, ",
        "after": ")",
        "options": [
          "0",
          "1",
          "2"
        ],
        "correct": 1,
        "explain": "Контракт требует ёмкость ровно 1."
      },
      {
        "before": "out ",
        "after": " work()",
        "options": [
          "<-",
          "=",
          "->"
        ],
        "correct": 0,
        "explain": "Оператор <- отправляет результат."
      }
    ],
    "partial": "package practice\n\nfunc ComputeAsync(work func() int) <-chan int {\n\tout := make(chan int, 1)\n\tgo func() {\n\t    defer close(out)\n\t    // TODO: отправь результат callback\n\t}()\n\treturn out\n}\n",
    "bug": "package practice\n\nfunc ComputeAsync(work func() int) <-chan int {\n\tout := make(chan int)\n\tgo func() {\n\t    defer close(out)\n\t    out <- work()\n\t}()\n\treturn out\n}\n",
    "hints": [
      "Нужен канал с одним местом для результата.",
      "Создай out через make(chan int, 1).",
      "Внутри go func(){...}() зарегистрируй defer close(out).",
      "Отправь результат вызова work() через out <- work().",
      "out := make(chan int,1)\ngo func(){defer close(out);out<-work()}()\nreturn out"
    ],
    "related": [
      [
        "concurrency-start-goroutine",
        "Повторить запуск горутины"
      ],
      [
        "race",
        "Связь с синхронизацией"
      ]
    ],
    "production": "Буфер на один результат предотвращает зависание отправителя после завершения вычисления, если читатель ушёл. Но он не отменяет само вычисление и не подходит для бесконечного потока.",
    "interview": "Почему буфер 1 подходит для одноразового результата?"
  },
  "concurrency-wait-group": {
    "frames": [
      [
        "Регистрация",
        [
          "A",
          "B",
          "C"
        ],
        "wg=3",
        "Регистрируем всех работников до запуска."
      ],
      [
        "Запуск",
        [
          "G-A: running",
          "G-B: running",
          "G-C: running"
        ],
        "wg=3; G1: Wait",
        "Один из возможных порядков."
      ],
      [
        "B завершилась",
        [
          "A: running",
          "B: done",
          "C: running"
        ],
        "wg=2",
        "Done уменьшает счётчик."
      ],
      [
        "Все завершились",
        [
          "A: done",
          "B: done",
          "C: done"
        ],
        "wg=0; Wait returns",
        "Возвращаем управление после всех callback."
      ]
    ],
    "steps": [
      [
        "Создать счётчик",
        "var wg sync.WaitGroup",
        "Zero value WaitGroup готов к использованию."
      ],
      [
        "Зарегистрировать задачи",
        "wg.Add(len(jobs))",
        "Add выполняется до запуска, иначе Wait может увидеть ноль слишком рано."
      ],
      [
        "Перебрать операции",
        "for _, job := range jobs {",
        "Берём callback из среза, индекс не нужен."
      ],
      [
        "Запустить работника",
        "    go func(fn func()) {",
        "Передадим callback параметром, чтобы привязать конкретную функцию к вызову."
      ],
      [
        "Отметить завершение",
        "        defer wg.Done()\n        fn()\n    }(job)\n}",
        "Done уменьшает счётчик после окончания callback, а не перед ним."
      ],
      [
        "Дождаться всех",
        "wg.Wait()",
        "Wait возвращается при нулевом счётчике. Он не защищает общую изменяемую память."
      ]
    ],
    "blocks": [
      "Дождаться всех",
      "Отметить завершение",
      "Запустить работника",
      "Перебрать операции",
      "Зарегистрировать задачи",
      "Создать счётчик"
    ],
    "order": [
      5,
      4,
      3,
      2,
      1,
      0
    ],
    "blanks": [
      {
        "before": "wg.Add(",
        "after": " )",
        "options": [
          "len(jobs)",
          "1",
          "0"
        ],
        "correct": 0,
        "explain": "Одна регистрация на callback."
      },
      {
        "before": "defer wg.",
        "after": "()",
        "options": [
          "Done",
          "Wait",
          "Add"
        ],
        "correct": 0,
        "explain": "Уменьшаем счётчик после работы."
      }
    ],
    "partial": "package practice\n\nfunc RunAllWork(jobs []func()) {\n\tvar wg sync.WaitGroup\n\twg.Add(len(jobs))\n\tfor _, job := range jobs {\n\t    go func(fn func()) {\n\t        defer wg.Done()\n\t        fn()\n\t    }(job)\n\t}\n\t// TODO: дождись всех операций\n}\n",
    "bug": "package practice\n\nfunc RunAllWork(jobs []func()) {\n\tfor _, job := range jobs { job() }\n}\n",
    "hints": [
      "Нужен sync.WaitGroup для учёта завершения.",
      "Зарегистрируй len(jobs) до запуска.",
      "Передавай job параметром в анонимную горутину.",
      "Внутри defer wg.Done(); после цикла wg.Wait().",
      "var wg sync.WaitGroup\nwg.Add(len(jobs))\nfor _,job:=range jobs{go func(fn func()){defer wg.Done();fn()}(job)}\nwg.Wait()"
    ],
    "related": [
      [
        "concurrency-start-goroutine",
        "Повторить запуск горутины"
      ],
      [
        "race",
        "Связь с синхронизацией"
      ]
    ],
    "production": "WaitGroup удобен для небольшого фиксированного набора независимых операций. Для тысяч задач нужен лимит; для ошибок и отмены — дополнительный механизм.",
    "interview": "Почему WaitGroup не заменяет Mutex?"
  },
  "concurrency-loop-arguments": {
    "frames": [
      [
        "Вход",
        [
          "i=0:v=2",
          "i=1:v=5",
          "i=2:v=3"
        ],
        "out=[0,0,0]; wg=3",
        "Пусть transform удваивает число."
      ],
      [
        "Запуск",
        [
          "G0(0,2)",
          "G1(1,5)",
          "G2(2,3)"
        ],
        "out=[0,0,0]",
        "Аргументы вычислены при каждом go-вызове."
      ],
      [
        "Один возможный порядок",
        [
          "G1: done",
          "G2: done",
          "G0: running"
        ],
        "out=[0,10,6]; wg=1",
        "Порядок завершения произвольный."
      ],
      [
        "Результат",
        [
          "G0: done",
          "wg=0"
        ],
        "out=[4,10,6]",
        "Wait завершён; порядок входа сохранён."
      ]
    ],
    "steps": [
      [
        "Выделить результат",
        "out := make([]int, len(values))",
        "Каждому входному индексу соответствует отдельное место; append не нужен."
      ],
      [
        "Зарегистрировать работы",
        "var wg sync.WaitGroup\nwg.Add(len(values))",
        "WaitGroup обеспечивает завершение всех записей до чтения результата."
      ],
      [
        "Получить индекс и значение",
        "for i, v := range values {",
        "Индекс сохраняет порядок независимо от порядка завершения горутин."
      ],
      [
        "Передать аргументы",
        "    go func(index, value int) {",
        "Явные параметры делают привязку понятной в любой версии Go; Go 1.22+ также создаёт отдельные range-переменные при := при соответствующей версии языка."
      ],
      [
        "Записать результат",
        "        defer wg.Done()\n        out[index] = transform(value)\n    }(i, v)\n}",
        "Каждая горутина пишет в отдельный элемент заранее выделенного среза. Заголовок среза не меняется."
      ],
      [
        "Дождаться и вернуть",
        "wg.Wait()\nreturn out",
        "Читаем результат после завершения всех записей. Никакой гарантии порядка выполнения callback нет."
      ]
    ],
    "blocks": [
      "Дождаться и вернуть",
      "Записать результат",
      "Передать аргументы",
      "Получить индекс и значение",
      "Зарегистрировать работы",
      "Выделить результат"
    ],
    "order": [
      5,
      4,
      3,
      2,
      1,
      0
    ],
    "blanks": [
      {
        "before": "go func(index, value int){ ... }(",
        "after": " )",
        "options": [
          "i,v",
          "v,i",
          "0,0"
        ],
        "correct": 0,
        "explain": "Передаём текущую пару индекса и значения."
      },
      {
        "before": "out[",
        "after": "] = transform(value)",
        "options": [
          "index",
          "value",
          "0"
        ],
        "correct": 0,
        "explain": "Индекс задаёт позицию результата."
      }
    ],
    "partial": "package practice\n\nfunc MapInGoroutines(values []int, transform func(int) int) []int {\n\tout := make([]int,len(values))\n\tvar wg sync.WaitGroup\n\twg.Add(len(values))\n\tfor i,v:=range values {\n\t    go func(index,value int){\n\t        defer wg.Done()\n\t        // TODO: запиши результат transform(value) по index\n\t        _ = index; _ = value\n\t    }(i,v)\n\t}\n\twg.Wait()\n\treturn out\n}\n",
    "bug": "package practice\n\nfunc MapInGoroutines(values []int, transform func(int) int) []int {\n\tout := make([]int,len(values))\n\tvar wg sync.WaitGroup\n\twg.Add(len(values))\n\tfor i,v:=range values {\n\t    go func(index,value int){\n\t        defer wg.Done()\n\t        out[index] = transform(values[0])\n\t    }(i,v)\n\t}\n\twg.Wait()\n\treturn out\n}\n",
    "hints": [
      "Выдели выходной срез нужной длины заранее.",
      "Для каждой горутины передай i и v отдельными параметрами.",
      "Регистрируй WaitGroup до запуска; внутри defer Done.",
      "Записывай результат в out[index], а не append.",
      "out:=make([]int,len(values))\nvar wg sync.WaitGroup\nwg.Add(len(values))\nfor i,v:=range values{go func(index,value int){defer wg.Done();out[index]=transform(value)}(i,v)}\nwg.Wait()\nreturn out"
    ],
    "related": [
      [
        "concurrency-start-goroutine",
        "Повторить запуск горутины"
      ],
      [
        "race",
        "Связь с синхронизацией"
      ]
    ],
    "production": "Для небольших независимых преобразований индекс помогает сохранить порядок. Для большой партии используй ограниченную конкурентность; callback обязан самостоятельно защищать общие зависимости.",
    "interview": "Почему отдельные индексы можно записывать без mutex, а общий append — нет?"
  },
  "concurrency-unbuffered": {
    "frames": [
      [
        "Подготовка",
        [
          "G1: ready",
          "ch: cap=0",
          "done: open"
        ],
        "value=42",
        "Создаём канал и отдельный сигнал."
      ],
      [
        "Ожидание",
        [
          "G1: send 42",
          "G2: receive"
        ],
        "ch: rendezvous",
        "Отправка и получение синхронизируются. До готовности другой стороны операция ждёт."
      ],
      [
        "Передача",
        [
          "G2: 42",
          "G1: close(ch)"
        ],
        "ch: closed",
        "Получатель видит значение, затем конец потока."
      ],
      [
        "Завершение",
        [
          "G2: return",
          "done: closed"
        ],
        "G1: return",
        "Вызывающая функция ждёт завершения callback."
      ]
    ],
    "steps": [
      [
        "Создать канал",
        "ch := make(chan int)",
        "make создаёт канал ёмкостью 0. Отправка требует готового получателя; значение не хранится в очереди."
      ],
      [
        "Создать сигнал завершения",
        "done := make(chan struct{})",
        "Этот канал сообщает, что callback вернулся. Закрытие сигнала не переносит полезные данные."
      ],
      [
        "Запустить получателя",
        "go func() {\n    defer close(done)\n    receive(ch)\n}()",
        "Если вызвать receive синхронно, он будет ждать отправку, до которой вызывающая функция не дошла. go позволяет обеим сторонам встретиться."
      ],
      [
        "Передать значение",
        "ch <- value",
        "Оператор <- слева от значения означает отправку. При cap=0 отправитель ждёт получателя."
      ],
      [
        "Закрыть поток",
        "close(ch)",
        "Больше отправок не будет. Получатель, читающий range, сможет выйти."
      ],
      [
        "Дождаться callback",
        "<-done",
        "Закрытие done выполняется после возврата receive. Теперь функция гарантирует завершение callback."
      ]
    ],
    "blocks": [
      "Дождаться callback",
      "Закрыть поток",
      "Передать значение",
      "Запустить получателя",
      "Создать сигнал завершения",
      "Создать канал"
    ],
    "order": [
      5,
      4,
      3,
      2,
      1,
      0
    ],
    "blanks": [
      {
        "before": "ch := make(",
        "after": " )",
        "options": [
          "chan int",
          "[]int",
          "chan int, 1"
        ],
        "correct": 0,
        "explain": "Нужен канал без буфера."
      },
      {
        "before": "ch ",
        "after": " value",
        "options": [
          "<-",
          "=",
          "->"
        ],
        "correct": 0,
        "explain": "Отправка выполняется оператором <-."
      },
      {
        "before": "",
        "after": "done",
        "options": [
          "<-",
          "close(",
          "go "
        ],
        "correct": 0,
        "explain": "Чтение сигнала ждёт завершения."
      }
    ],
    "partial": "package practice\n\nfunc ExchangeValue(value int, receive func(<-chan int)) {\n\tch := make(chan int)\n\tdone := make(chan struct{})\n\tgo func() {\n\t    defer close(done)\n\t    receive(ch)\n\t}()\n\t// TODO: передай value\n\tclose(ch)\n\t<-done\n}\n",
    "bug": "package practice\n\nfunc ExchangeValue(value int, receive func(<-chan int)) {\n\tch := make(chan int, 1)\n\tdone := make(chan struct{})\n\tgo func(){defer close(done);receive(ch)}()\n\tch <- value\n\tclose(ch)\n\t<-done\n}\n",
    "hints": [
      "Создай канал int без буфера и сигнал done.",
      "Запусти receive(ch) в отдельной горутине.",
      "В горутине используй defer close(done).",
      "Отправь value, закрой ch, затем дождись <-done.",
      "ch:=make(chan int)\ndone:=make(chan struct{})\ngo func(){defer close(done);receive(ch)}()\nch<-value\nclose(ch)\n<-done"
    ],
    "related": [
      [
        "concurrency-done-signal",
        "Повторить передачу и завершение"
      ],
      [
        "channel-merge",
        "Связь с production"
      ]
    ],
    "production": "Небуферизованный канал создаёт естественное обратное давление: производитель не опережает готовность потребителя. Для реального бесконечного потока добавляют отмену и владелец закрытия должен быть определён заранее.",
    "interview": "Чем небуферизованный канал отличается от канала ёмкостью один?"
  },
  "concurrency-buffer-events": {
    "frames": [
      [
        "Начало",
        [
          "[ ]",
          "[ ]",
          "[ ]"
        ],
        "len=0; cap=3",
        "Вход: 4, 0, 9."
      ],
      [
        "Первая отправка",
        [
          "4",
          "[ ]",
          "[ ]"
        ],
        "len=1; cap=3",
        "Осталось два места."
      ],
      [
        "Заполнение",
        [
          "4",
          "0",
          "9"
        ],
        "len=3; cap=3",
        "Четвёртая отправка без чтения блокировалась бы."
      ],
      [
        "Закрытие",
        [
          "4",
          "0",
          "9"
        ],
        "closed; len=3",
        "Все значения ещё доступны."
      ],
      [
        "Дочитали",
        [
          "[ ]",
          "[ ]",
          "[ ]"
        ],
        "len=0; cap=3; ok=false",
        "Ёмкость не меняется после чтения и закрытия."
      ]
    ],
    "steps": [
      [
        "Определить ёмкость",
        "out := make(chan int, len(events))",
        "len(events) задаёт количество мест. Отправка каждого из N элементов завершится без читателя, пока в буфере есть место."
      ],
      [
        "Перебрать вход",
        "for _, event := range events {",
        "range идёт по срезу в порядке индексов. Индекс здесь не нужен."
      ],
      [
        "Заполнить очередь",
        "    out <- event\n}",
        "Каждая отправка увеличивает число ожидающих значений. Буфер не расширяется автоматически."
      ],
      [
        "Закрыть канал",
        "close(out)",
        "Закрытие запрещает дальнейшую отправку, но не стирает очередь."
      ],
      [
        "Вернуть поток",
        "return out",
        "Получатель читает сохранённые значения; после опустошения канала чтение возвращает zero value и ok=false."
      ]
    ],
    "blocks": [
      "Вернуть поток",
      "Закрыть канал",
      "Заполнить очередь",
      "Перебрать вход",
      "Определить ёмкость"
    ],
    "order": [
      4,
      3,
      2,
      1,
      0
    ],
    "blanks": [
      {
        "before": "out := make(chan int, ",
        "after": ")",
        "options": [
          "len(events)",
          "0",
          "1"
        ],
        "correct": 0,
        "explain": "Нужно место для каждого события."
      },
      {
        "before": "",
        "after": "(out)",
        "options": [
          "close",
          "delete",
          "clear"
        ],
        "correct": 0,
        "explain": "Закрываем поток перед возвратом."
      }
    ],
    "partial": "package practice\n\nfunc BufferEvents(events []int) <-chan int {\n\tout := make(chan int, len(events))\n\tfor _, event := range events {\n\t    _ = event\n\t    // TODO: отправь событие\n\t}\n\tclose(out)\n\treturn out\n}\n",
    "bug": "package practice\n\nfunc BufferEvents(events []int) <-chan int {\n\tout := make(chan int, len(events)+1)\n\tfor _, event := range events { out <- event }\n\tclose(out)\n\treturn out\n}\n",
    "hints": [
      "Сначала выдели буфер на все элементы.",
      "Используй make(chan int, len(events)).",
      "Перебери events через range, отправляя каждый элемент.",
      "После цикла закрой out и верни его.",
      "out:=make(chan int,len(events))\nfor _,v:=range events{out<-v}\nclose(out)\nreturn out"
    ],
    "related": [
      [
        "concurrency-unbuffered",
        "Повторить передачу и завершение"
      ],
      [
        "select-first",
        "Связь с production"
      ]
    ],
    "production": "Полное буферизование подходит для небольшого известного пакета. Для большого потока буфер ограничивают по ресурсам и определяют поведение при заполнении; len не является надёжным условием для конкурентной отправки.",
    "interview": "Что происходит с накопленными значениями при close buffered channel?"
  },
  "concurrency-collect-events": {
    "frames": [
      [
        "Поток",
        [
          "in: 7",
          "in: 0",
          "in: 7"
        ],
        "out=[]",
        "Производитель отправляет события и закрывает вход."
      ],
      [
        "Чтение 7",
        [
          "in: 0",
          "in: 7"
        ],
        "out=[7]",
        "Добавляем первое значение."
      ],
      [
        "Чтение 0",
        [
          "in: 7"
        ],
        "out=[7,0]",
        "Ноль не означает закрытие."
      ],
      [
        "Конец",
        [
          "in: closed & empty"
        ],
        "out=[7,0,7]",
        "range заканчивается после последнего значения."
      ]
    ],
    "steps": [
      [
        "Создать результат",
        "out := make([]int, 0)",
        "Пустой, но не nil срез удовлетворяет контракту даже для пустого потока."
      ],
      [
        "Читать поток",
        "for event := range in {",
        "range над каналом получает по одному значению и завершает цикл только после закрытия и исчерпания. Пустой открытый канал заставляет ждать."
      ],
      [
        "Сохранить значение",
        "    out = append(out, event)\n}",
        "append возвращает обновлённый срез. Любое полученное значение, включая 0 и дубликаты, является частью потока."
      ],
      [
        "Вернуть результат",
        "return out",
        "Выход из range означает, что поток закрыт и полностью дочитан. Получатель не закрывает чужой канал."
      ]
    ],
    "blocks": [
      "Вернуть результат",
      "Сохранить значение",
      "Читать поток",
      "Создать результат"
    ],
    "order": [
      3,
      2,
      1,
      0
    ],
    "blanks": [
      {
        "before": "for event := ",
        "after": " in {",
        "options": [
          "range",
          "select",
          "close"
        ],
        "correct": 0,
        "explain": "range дочитывает канал."
      },
      {
        "before": "out = append(out, ",
        "after": ")",
        "options": [
          "event",
          "0",
          "in"
        ],
        "correct": 0,
        "explain": "Сохраняем фактическое значение."
      }
    ],
    "partial": "package practice\n\nfunc CollectEvents(in <-chan int) []int {\n\tout := make([]int, 0)\n\tfor event := range in {\n\t    _ = event\n\t    // TODO: добавь событие в out\n\t}\n\treturn out\n}\n",
    "bug": "package practice\n\nfunc CollectEvents(in <-chan int) []int {\n\tout := make([]int, 0)\n\tfor event := range in {\n\t    if event != 0 {out=append(out,event)}\n\t}\n\treturn out\n}\n",
    "hints": [
      "Создай пустой срез int.",
      "Используй for event := range in.",
      "В теле добавляй каждый event через append.",
      "Не проверяй event==0 и не закрывай вход.",
      "out:=make([]int,0)\nfor event:=range in{out=append(out,event)}\nreturn out"
    ],
    "related": [
      [
        "concurrency-unbuffered",
        "Повторить передачу и завершение"
      ],
      [
        "channel-pipeline",
        "Связь с production"
      ]
    ],
    "production": "Сбор конечного потока удобен для ограниченных партий. Для бесконечной подписки range без context может зависнуть навсегда, а накопление всех событий может исчерпать память.",
    "interview": "Когда завершается for v := range ch?"
  },
  "concurrency-receive-value": {
    "frames": [
      [
        "Открытый буфер",
        [
          "in: [0,8]"
        ],
        "value=?, ok=?",
        "Ноль является обычным отправленным значением."
      ],
      [
        "Первое чтение",
        [
          "in: [8]"
        ],
        "value=0; ok=true",
        "Данные получены."
      ],
      [
        "После close",
        [
          "in: [8]"
        ],
        "value=8; ok=true",
        "Закрытый канал всё ещё отдаёт накопленное."
      ],
      [
        "Исчерпание",
        [
          "in: closed, empty"
        ],
        "value=0; ok=false",
        "Теперь ноль синтетический: отправленного значения нет."
      ]
    ],
    "steps": [
      [
        "Выполнить чтение",
        "value, ok := <-in",
        "Comma-ok даёт два результата. value — полученное значение; ok=true значит, что значение реально отправлено, даже если оно равно нулю."
      ],
      [
        "Вернуть оба результата",
        "return value, ok",
        "При закрытом исчерпанном канале Go возвращает 0,false. Не нужно самостоятельно угадывать статус по значению или длине буфера."
      ]
    ],
    "blocks": [
      "Вернуть оба результата",
      "Выполнить чтение"
    ],
    "order": [
      1,
      0
    ],
    "blanks": [
      {
        "before": "value, ok := ",
        "after": "in",
        "options": [
          "<-",
          "->",
          "close("
        ],
        "correct": 0,
        "explain": "Оператор чтения расположен перед каналом."
      },
      {
        "before": "return value, ",
        "after": "",
        "options": [
          "ok",
          "value != 0",
          "len(in)>0"
        ],
        "correct": 0,
        "explain": "Используем фактический признак от операции чтения."
      }
    ],
    "partial": "package practice\n\nfunc ReceiveValue(in <-chan int) (int, bool) {\n\tvalue, ok := <-in\n\t// TODO: верни фактический признак получения\n\t_ = ok\n\treturn value, false\n}\n",
    "bug": "package practice\n\nfunc ReceiveValue(in <-chan int) (int, bool) {\n\tvalue := <-in\n\treturn value, value != 0\n}\n",
    "hints": [
      "Операция чтения умеет вернуть два значения.",
      "Напиши value, ok := <-in.",
      "ok не зависит от численного значения.",
      "Верни оба результата без дополнительных условий.",
      "value,ok:=<-in\nreturn value,ok"
    ],
    "related": [
      [
        "concurrency-unbuffered",
        "Повторить передачу и завершение"
      ],
      [
        "select-first",
        "Связь с production"
      ]
    ],
    "production": "Comma-ok позволяет корректно отличить отключение источника событий от валидного сообщения с zero value. В select закрытый канал остаётся готовым к чтению; его нужно обработать отдельно.",
    "interview": "Чем value=0,ok=true отличается от value=0,ok=false?"
  },
  "concurrency-produce-events": {
    "frames": [
      [
        "Подготовка",
        [
          "G1: consumer",
          "G2: producer",
          "out: cap=0"
        ],
        "events=[3,0,5]",
        "Разделяем доступ по направлениям."
      ],
      [
        "Отправка",
        [
          "G2: dst <- 3",
          "G1: <-out"
        ],
        "received=[3]",
        "Обе стороны синхронизируются."
      ],
      [
        "Последующие значения",
        [
          "G2: 0,5",
          "G1: range"
        ],
        "received=[3,0,5]",
        "Порядок одного отправителя сохраняется."
      ],
      [
        "Конец",
        [
          "G2: close(dst)",
          "G1: range ends"
        ],
        "out: closed",
        "Получатель не закрывает выход."
      ]
    ],
    "steps": [
      [
        "Создать канал",
        "out := make(chan int)",
        "Канал без буфера синхронизирует каждую отправку с получением."
      ],
      [
        "Запустить производителя",
        "go func(dst chan<- int) {",
        "Параметр chan<- int разрешает отправку и закрытие, но запрещает чтение. Передача out этому параметру сужает доступ."
      ],
      [
        "Закрыть при завершении",
        "    defer close(dst)",
        "Единственный производитель знает, когда отправок больше не будет."
      ],
      [
        "Перебрать события",
        "    for _, event := range events {",
        "Читаем входной срез в порядке индексов; вызывающий код не должен менять его конкурентно."
      ],
      [
        "Отправить данные",
        "        dst <- event\n    }\n}(out)",
        "Передаём все значения, включая нули. Если читатель не читает, отправка блокируется."
      ],
      [
        "Вернуть доступ получателю",
        "return out",
        "Возвращаемый <-chan int запрещает отправку и close со стороны вызывающего. Закрытие — обязанность производителя."
      ]
    ],
    "blocks": [
      "Вернуть доступ получателю",
      "Отправить данные",
      "Перебрать события",
      "Закрыть при завершении",
      "Запустить производителя",
      "Создать канал"
    ],
    "order": [
      5,
      4,
      3,
      2,
      1,
      0
    ],
    "blanks": [
      {
        "before": "go func(dst ",
        "after": " ) {",
        "options": [
          "chan<- int",
          "<-chan int",
          "[]int"
        ],
        "correct": 0,
        "explain": "Производителю нужен send-only канал."
      },
      {
        "before": "defer ",
        "after": "(dst)",
        "options": [
          "close",
          "clear",
          "delete"
        ],
        "correct": 0,
        "explain": "Закрывает владелец отправки."
      }
    ],
    "partial": "package practice\n\nfunc ProduceEvents(events []int) <-chan int {\n\tout := make(chan int)\n\tgo func(dst chan<- int) {\n\t    defer close(dst)\n\t    for _, event := range events {\n\t        _ = event\n\t        // TODO: отправь event в dst\n\t    }\n\t}(out)\n\treturn out\n}\n",
    "bug": "package practice\n\nfunc ProduceEvents(events []int) <-chan int {\n\tout := make(chan int)\n\tgo func(dst chan<- int) {\n\t    for _, event := range events {dst<-event}\n\t    // забыли close(dst)\n\t}(out)\n\treturn out\n}\n",
    "hints": [
      "Создай out := make(chan int).",
      "Запусти go func(dst chan<- int){...}(out).",
      "Внутри зарегистрируй defer close(dst).",
      "Перебери events и отправляй каждый через dst <- event.",
      "out:=make(chan int)\ngo func(dst chan<- int){defer close(dst);for _,v:=range events{dst<-v}}(out)\nreturn out"
    ],
    "related": [
      [
        "concurrency-unbuffered",
        "Повторить передачу и завершение"
      ],
      [
        "channel-pipeline",
        "Связь с production"
      ]
    ],
    "production": "Направленные каналы документируют ownership на уровне типов. Для production-потока требуется отмена, если потребитель может прекратить чтение раньше конца; это отдельная следующая тема.",
    "interview": "Можно ли закрыть send-only канал и почему нельзя закрыть receive-only?"
  },
  "concurrency-select-ready": {
    "frames": [
      [
        "Вход",
        [
          "a: empty",
          "b: [42]"
        ],
        "select ждёт готовность",
        "a открыт, но данных нет. b уже содержит значение."
      ],
      [
        "Выбор",
        [
          "a: not ready",
          "b: ready"
        ],
        "case v,ok := <-b",
        "Ветка b готова, поэтому выполняется чтение b."
      ],
      [
        "Результат",
        [
          "v=42",
          "source=b",
          "ok=true"
        ],
        "return 42,\"b\",true",
        "Функция читает ровно один элемент."
      ],
      [
        "Другой сценарий",
        [
          "a: ready",
          "b: ready"
        ],
        "любая готовая ветка",
        "Порядок веток в исходнике не устанавливает приоритет."
      ]
    ],
    "steps": [
      [
        "Описать ожидание",
        "select {",
        "select ждёт готовности одной из коммуникаций. Это не последовательная проверка первого канала, затем второго."
      ],
      [
        "Обработать первый источник",
        "case v, ok := <-a:\n    return v, \"a\", ok",
        "Чтение получает значение и статус. Имя источника задаётся контрактом; при закрытии возвращаем false."
      ],
      [
        "Обработать второй источник",
        "case v, ok := <-b:\n    return v, \"b\", ok\n}",
        "Вторая ветка симметрична. Если обе готовы, Go выбирает одну готовую операцию псевдослучайно, а не по порядку case."
      ]
    ],
    "blocks": [
      "Обработать второй источник",
      "Обработать первый источник",
      "Описать ожидание"
    ],
    "order": [
      2,
      1,
      0
    ],
    "blanks": [
      {
        "before": "",
        "after": " {",
        "options": [
          "select",
          "switch",
          "range"
        ],
        "correct": 0,
        "explain": "select работает с коммуникациями каналов."
      },
      {
        "before": "case v, ok := ",
        "after": "b:",
        "options": [
          "<-",
          "->",
          "close("
        ],
        "correct": 0,
        "explain": "Два результата чтения включают статус."
      },
      {
        "before": "return v, \"b\", ",
        "after": "",
        "options": [
          "ok",
          "true",
          "v!=0"
        ],
        "correct": 0,
        "explain": "Передаём фактический статус чтения."
      }
    ],
    "partial": "package practice\n\nfunc ReceiveEither(a, b <-chan int) (int, string, bool) {\n\tselect {\n\tcase v, ok := <-a:\n\t    return v, \"a\", ok\n\tcase v, ok := <-b:\n\t    // TODO: верни правильное имя второго источника\n\t    return v, \"a\", ok\n\t}\n}\n",
    "bug": "package practice\n\nfunc ReceiveEither(a, b <-chan int) (int, string, bool) {\n\tselect {\n\tcase v := <-a:\n\t    return v, \"a\", true\n\tcase v := <-b:\n\t    return v, \"b\", true\n\t}\n}\n",
    "hints": [
      "Нужен select, а не два последовательных чтения.",
      "Добавь case v, ok := <-a.",
      "Верни v, \"a\", ok; сделай симметричную ветку b.",
      "Не добавляй default: функция должна ждать готовую операцию.",
      "select {\ncase v,ok:=<-a: return v,\"a\",ok\ncase v,ok:=<-b: return v,\"b\",ok\n}"
    ],
    "related": [
      [
        "concurrency-receive-value",
        "Повторить comma-ok"
      ],
      [
        "select-first",
        "Связь с context и production"
      ]
    ],
    "production": "Два независимых источника событий можно обслуживать одним select. Для постоянного цикла нужно дополнительно отключать закрытые каналы и учитывать отмену, иначе готовый закрытый канал может создавать busy loop.",
    "interview": "Есть ли приоритет у первого case в select?"
  },
  "concurrency-try-send": {
    "frames": [
      [
        "Свободное место",
        [
          "out: [7, _]",
          "value=8"
        ],
        "cap=2; len=1",
        "Отправка готова."
      ],
      [
        "Успех",
        [
          "out: [7,8]"
        ],
        "return true",
        "Событие действительно записано."
      ],
      [
        "Переполнение",
        [
          "out: [7,8]",
          "value=9"
        ],
        "default → false",
        "Нет места; очередь не изменяется."
      ],
      [
        "Отключённый выход",
        [
          "out=nil"
        ],
        "default → false",
        "Операция с nil не готова."
      ]
    ],
    "steps": [
      [
        "Начать select",
        "select {",
        "Нужна одна операция с возможностью немедленного отказа, а не ожидание свободного места."
      ],
      [
        "Попытаться отправить",
        "case out <- value:\n    return true",
        "Если коммуникация готова, select выполняет её и возвращаем true. Для небуферизованного канала требуется готовый получатель."
      ],
      [
        "Обработать перегрузку",
        "default:\n    return false\n}",
        "default выбирается только если ни одна коммуникация не готова. Это не отправка и не отмена уже выполненной отправки."
      ]
    ],
    "blocks": [
      "Обработать перегрузку",
      "Попытаться отправить",
      "Начать select"
    ],
    "order": [
      2,
      1,
      0
    ],
    "blanks": [
      {
        "before": "case out ",
        "after": " value:",
        "options": [
          "<-",
          "=",
          "->"
        ],
        "correct": 0,
        "explain": "Отправка — канал слева от <-."
      },
      {
        "before": "",
        "after": " :\n    return false",
        "options": [
          "default",
          "else",
          "case false"
        ],
        "correct": 0,
        "explain": "default позволяет не ждать."
      }
    ],
    "partial": "package practice\n\nfunc TrySendEvent(out chan<- int, value int) bool {\n\tselect {\n\tcase out <- value:\n\t    // TODO: сообщи об успешной отправке\n\t    return false\n\tdefault:\n\t    return false\n\t}\n}\n",
    "bug": "package practice\n\nfunc TrySendEvent(out chan<- int, value int) bool {\n\tif len(out) < cap(out) {\n\t    return true\n\t}\n\treturn false\n}\n",
    "hints": [
      "Нужна неблокирующая попытка, не проверка len.",
      "Используй select с одной отправкой.",
      "В case out <- value верни true.",
      "Добавь default с return false.",
      "select {case out<-value:return true;default:return false}"
    ],
    "related": [
      [
        "concurrency-receive-value",
        "Повторить comma-ok"
      ],
      [
        "select-first",
        "Связь с context и production"
      ]
    ],
    "production": "Для необязательной телеметрии можно отклонять событие при переполнении и считать потери. Для бизнес-событий silent drop часто недопустим: нужен явный отказ, повтор или надёжная очередь. default не защищает от panic при отправке в закрытый канал.",
    "interview": "Почему if len(ch)<cap(ch) не заменяет select с default?"
  },
  "concurrency-try-receive": {
    "frames": [
      [
        "Данные",
        [
          "in: [0]",
          "open"
        ],
        "0,true,false",
        "Получили реальный ноль."
      ],
      [
        "Временно пуст",
        [
          "in: []",
          "open"
        ],
        "0,false,false",
        "default, можно продолжить другую работу."
      ],
      [
        "Закрыт",
        [
          "in: []",
          "closed"
        ],
        "0,false,true",
        "Чтение готово, но значения больше нет."
      ],
      [
        "Nil",
        [
          "in=nil"
        ],
        "0,false,false",
        "Ветка чтения отключена."
      ]
    ],
    "steps": [
      [
        "Описать попытку",
        "select {",
        "Одна операция чтения с альтернативой default не ждёт появления будущих данных."
      ],
      [
        "Получить значение и статус",
        "case v, ok := <-in:",
        "Comma-ok нужен, потому что закрытый канал также готов к чтению."
      ],
      [
        "Распознать закрытие",
        "    if !ok {\n        return 0, false, true\n    }",
        "ok=false означает, что закрытый канал исчерпан. Это отдельное состояние, не пустой открытый буфер."
      ],
      [
        "Вернуть данные",
        "    return v, true, false",
        "Даже v=0 является полученным событием, если ok=true."
      ],
      [
        "Распознать ожидание",
        "default:\n    return 0, false, false\n}",
        "Если чтение не готово, никаких данных не получено. Nil канал попадает сюда тоже."
      ]
    ],
    "blocks": [
      "Распознать ожидание",
      "Вернуть данные",
      "Распознать закрытие",
      "Получить значение и статус",
      "Описать попытку"
    ],
    "order": [
      4,
      3,
      2,
      1,
      0
    ],
    "blanks": [
      {
        "before": "case v, ",
        "after": " := <-in:",
        "options": [
          "ok",
          "err",
          "cap"
        ],
        "correct": 0,
        "explain": "Второй результат чтения — bool."
      },
      {
        "before": "return 0, false, ",
        "after": " // канал закрыт",
        "options": [
          "true",
          "false",
          "ok"
        ],
        "correct": 0,
        "explain": "Третий флаг отмечает закрытие."
      }
    ],
    "partial": "package practice\n\nfunc TryReceiveEvent(in <-chan int) (int, bool, bool) {\n\tselect {\n\tcase v, ok := <-in:\n\t    if !ok {\n\t        // TODO: отличи закрытие от отсутствия данных\n\t        return 0,false,false\n\t    }\n\t    return v,true,false\n\tdefault:\n\t    return 0,false,false\n\t}\n}\n",
    "bug": "package practice\n\nfunc TryReceiveEvent(in <-chan int) (int, bool, bool) {\n\tselect {\n\tcase v := <-in:\n\t    return v,true,false\n\tdefault:\n\t    return 0,false,false\n\t}\n}\n",
    "hints": [
      "У функции три разных исхода, не два.",
      "Используй select и comma-ok в ветке чтения.",
      "При !ok верни 0,false,true.",
      "При данных верни v,true,false; в default — 0,false,false.",
      "select {case v,ok:=<-in:if !ok{return 0,false,true};return v,true,false;default:return 0,false,false}"
    ],
    "related": [
      [
        "concurrency-receive-value",
        "Повторить comma-ok"
      ],
      [
        "select-first",
        "Связь с context и production"
      ]
    ],
    "production": "Неблокирующая проверка полезна в отдельных циклах обслуживания и тестах. Не строй бесконечный цикл из default без ожидания: он будет потреблять CPU. Обычно лучше блокирующий select с отменой.",
    "interview": "Чем пустой открытый канал отличается от закрытого при неблокирующем чтении?"
  },
  "concurrency-disable-closed": {
    "frames": [
      [
        "Два источника",
        [
          "a:[1]",
          "b:[0,2]"
        ],
        "first=[]; second=[]",
        "a и b независимо становятся готовы."
      ],
      [
        "a завершился",
        [
          "a: closed",
          "b: [0,2]"
        ],
        "first=[1]; a=nil",
        "Чтение конца a отключает его ветку."
      ],
      [
        "Остался b",
        [
          "a: disabled",
          "b: [2]"
        ],
        "second=[0]",
        "Цикл продолжает работать, пока хотя бы один канал доступен."
      ],
      [
        "Оба завершены",
        [
          "a=nil",
          "b=nil"
        ],
        "first=[1]; second=[0,2]",
        "Условие цикла false, возвращаем результаты."
      ]
    ],
    "steps": [
      [
        "Подготовить два результата",
        "first, second := make([]int, 0), make([]int, 0)",
        "Храним результаты раздельно: порядок между независимыми источниками не определён."
      ],
      [
        "Продолжать пока есть источник",
        "for a != nil || b != nil {",
        "Логическое ИЛИ означает, что достаточно одного действующего канала. Nil — маркер отсутствующего источника."
      ],
      [
        "Начать select",
        "    select {",
        "Читаем только готовые коммуникации; без default цикл не крутится на пустых открытых каналах."
      ],
      [
        "Обработать a",
        "    case v, ok := <-a:\n        if !ok {\n            a = nil\n            continue\n        }\n        first = append(first, v)",
        "После исчерпания a присваиваем nil локальной переменной. Закрытый канал был постоянно готов, nil никогда не готов. continue не позволяет записать синтетический ноль."
      ],
      [
        "Обработать b",
        "    case v, ok := <-b:\n        if !ok {\n            b = nil\n            continue\n        }\n        second = append(second, v)\n    }\n}",
        "Вторая ветка работает симметрично. Изменение локальной переменной не закрывает канал и не меняет переменную вызывающего."
      ],
      [
        "Вернуть результаты",
        "return first, second",
        "Оба источника теперь nil, цикл завершён. Пустой результат не nil."
      ]
    ],
    "blocks": [
      "Вернуть результаты",
      "Обработать b",
      "Обработать a",
      "Начать select",
      "Продолжать пока есть источник",
      "Подготовить два результата"
    ],
    "order": [
      5,
      4,
      3,
      2,
      1,
      0
    ],
    "blanks": [
      {
        "before": "for a != nil ",
        "after": " b != nil {",
        "options": [
          "||",
          "&&",
          "=="
        ],
        "correct": 0,
        "explain": "Нужно дочитать даже один оставшийся источник."
      },
      {
        "before": "if !ok { a = ",
        "after": "; continue }",
        "options": [
          "nil",
          "b",
          "a"
        ],
        "correct": 0,
        "explain": "Nil отключает ветку select."
      },
      {
        "before": "first = append(first, ",
        "after": ")",
        "options": [
          "v",
          "0",
          "b"
        ],
        "correct": 0,
        "explain": "Сохраняем реальные значения источника a."
      }
    ],
    "partial": "package practice\n\nfunc DrainTwoSources(a, b <-chan int) ([]int, []int) {\n\tfirst,second:=make([]int,0),make([]int,0)\n\tfor a!=nil || b!=nil {\n\t select {\n\t case v,ok:=<-a:\n\t  if !ok { a=nil;continue }\n\t  // TODO: сохрани событие первого источника\n\t  _=v\n\t case v,ok:=<-b:\n\t  if !ok {b=nil;continue}\n\t  second=append(second,v)\n\t }\n\t}\n\treturn first,second\n}\n",
    "bug": "package practice\n\nfunc DrainTwoSources(a, b <-chan int) ([]int, []int) {\n\tfirst,second:=make([]int,0),make([]int,0)\n\tfor a!=nil && b!=nil {\n\t select {\n\t case v,ok:=<-a:\n\t  if !ok {a=nil;continue}\n\t  first=append(first,v)\n\t case v,ok:=<-b:\n\t  if !ok {b=nil;continue}\n\t  second=append(second,v)\n\t }\n\t}\n\treturn first,second\n}\n",
    "hints": [
      "Два независимых результата и два локальных указателя на каналы.",
      "Цикл продолжается пока a!=nil || b!=nil.",
      "В каждом case читай v,ok.",
      "При !ok отключай только этот источник через nil и continue.",
      "first,second:=make([]int,0),make([]int,0)\nfor a!=nil||b!=nil{select{case v,ok:=<-a:if !ok{a=nil;continue};first=append(first,v);case v,ok:=<-b:if !ok{b=nil;continue};second=append(second,v)}}\nreturn first,second"
    ],
    "related": [
      [
        "concurrency-receive-value",
        "Повторить comma-ok"
      ],
      [
        "select-first",
        "Связь с context и production"
      ]
    ],
    "production": "При объединении источников в одном цикле отключение закрытого канала предотвращает постоянное срабатывание его ветки. Для неограниченных потоков нужен дополнительный case отмены; эта задача ограничена конечными входами.",
    "interview": "Зачем присваивать закрытому каналу nil в select?"
  },
  "concurrency-timer-wait": {
    "frames": [
      [
        "Старт",
        [
          "in: empty",
          "timer: armed"
        ],
        "timeout=50ms",
        "Создаём одноразовый таймер."
      ],
      [
        "Событие раньше",
        [
          "in: [12]",
          "timer: not ready"
        ],
        "return 12,nil; Stop",
        "Готова ветка входа."
      ],
      [
        "Альтернативный исход",
        [
          "in: empty",
          "timer.C: ready"
        ],
        "0, DeadlineExceeded",
        "Ожидание ограничено таймером."
      ],
      [
        "Закрытие входа",
        [
          "in: closed",
          "timer: armed"
        ],
        "0, event channel closed",
        "Это отдельная причина завершения."
      ]
    ],
    "steps": [
      [
        "Обработать невалидный бюджет",
        "if timeout <= 0 {\n    return 0, context.DeadlineExceeded\n}",
        "Контракт задаёт немедленный отказ без чтения. Так готовое значение не выигрывает случайно у уже истёкшего бюджета."
      ],
      [
        "Создать таймер",
        "timer := time.NewTimer(timeout)",
        "Timer предоставляет канал C, который становится готов после истечения интервала. Это одноразовый таймер, не ticker."
      ],
      [
        "Запланировать остановку",
        "defer timer.Stop()",
        "Если получим событие раньше, больше не нужен активный таймер. Здесь нет Reset или повторного чтения C; Stop выполняется на всех путях."
      ],
      [
        "Ожидать событие",
        "select {\ncase v, ok := <-in:",
        "При входных данных читаем реальное значение и статус канала."
      ],
      [
        "Обработать закрытие и успех",
        "    if !ok {\n        return 0, errors.New(\"event channel closed\")\n    }\n    return v, nil",
        "Закрытие источника отличается от таймаута и не считается успешным нулевым событием."
      ],
      [
        "Обработать истечение",
        "case <-timer.C:\n    return 0, context.DeadlineExceeded\n}",
        "Таймер ограничивает ожидание коммуникации. Если обе ветки готовы, select не гарантирует приоритет таймера."
      ]
    ],
    "blocks": [
      "Обработать истечение",
      "Обработать закрытие и успех",
      "Ожидать событие",
      "Запланировать остановку",
      "Создать таймер",
      "Обработать невалидный бюджет"
    ],
    "order": [
      5,
      4,
      3,
      2,
      1,
      0
    ],
    "blanks": [
      {
        "before": "timer := time.",
        "after": "(timeout)",
        "options": [
          "NewTimer",
          "NewTicker",
          "Sleep"
        ],
        "correct": 0,
        "explain": "Нужен одноразовый таймер с каналом."
      },
      {
        "before": "defer timer.",
        "after": "()",
        "options": [
          "Stop",
          "Reset",
          "Close"
        ],
        "correct": 0,
        "explain": "Останавливаем ненужный таймер при выходе."
      },
      {
        "before": "case <-timer.",
        "after": " :",
        "options": [
          "C",
          "Done",
          "Err"
        ],
        "correct": 0,
        "explain": "Timer.C — канал события таймера."
      }
    ],
    "partial": "package practice\n\nfunc ReceiveBeforeTimeout(in <-chan int, timeout time.Duration) (int, error) {\n\tif timeout<=0 {return 0,context.DeadlineExceeded}\n\ttimer:=time.NewTimer(timeout)\n\tdefer timer.Stop()\n\tselect {\n\tcase v,ok:=<-in:\n\t if !ok{return 0,errors.New(\"event channel closed\")}\n\t return v,nil\n\tcase <-timer.C:\n\t // TODO: верни причину таймаута\n\t return 0,nil\n\t}\n}\n",
    "bug": "package practice\n\nfunc ReceiveBeforeTimeout(in <-chan int, timeout time.Duration) (int, error) {\n\tif timeout<=0{return 0,nil}\n\ttimer:=time.NewTimer(timeout)\n\tdefer timer.Stop()\n\tselect {\n\tcase v:=<-in:return v,nil\n\tcase <-timer.C:return 0,context.DeadlineExceeded\n\t}\n}\n",
    "hints": [
      "Для timeout<=0 обработай отказ до select.",
      "Создай time.NewTimer(timeout), defer timer.Stop().",
      "В select читай in через comma-ok.",
      "Ветка <-timer.C возвращает context.DeadlineExceeded.",
      "if timeout<=0{return 0,context.DeadlineExceeded}\ntimer:=time.NewTimer(timeout);defer timer.Stop()\nselect{case v,ok:=<-in:if !ok{return 0,errors.New(\"event channel closed\")};return v,nil;case <-timer.C:return 0,context.DeadlineExceeded}"
    ],
    "related": [
      [
        "concurrency-receive-value",
        "Повторить comma-ok"
      ],
      [
        "select-first",
        "Связь с context и production"
      ]
    ],
    "production": "Локальный таймер подходит для ограниченного ожидания одного события. Для цепочки вызовов обычно передают context с общим deadline, чтобы не начинать новый полный бюджет на каждой зависимости. Таймер не прекращает чужую работу автоматически.",
    "interview": "Чем time.NewTimer отличается от time.Sleep в задаче ожидания канала?"
  },
  "concurrency-safe-store": {
    "frames": [
      [
        "Начало",
        [
          "G1:Set(a,0)",
          "G2:Get(a)"
        ],
        "values=nil; mutex свободен",
        "Обе горутины используют один объект."
      ],
      [
        "Запись",
        [
          "G1: lock",
          "G2: waiting"
        ],
        "values=map[a:0]",
        "Создание и запись под одним mutex."
      ],
      [
        "Освобождение",
        [
          "G1: unlock",
          "G2: lock"
        ],
        "values=map[a:0]",
        "Читатель получает доступ."
      ],
      [
        "Чтение",
        [
          "G2: Get(a)"
        ],
        "0,true",
        "Ноль — значение, а не отсутствие."
      ]
    ],
    "steps": [
      [
        "Объявить состояние",
        "type SafeStore struct {mu sync.Mutex; values map[string]int}",
        "Mutex и map принадлежат одному объекту. Нулевой mutex готов, а нулевая map равна nil. Pointer receiver не копирует блокировку."
      ],
      [
        "Захватить блокировку записи",
        "func (s *SafeStore) Set(key string,value int){\n s.mu.Lock()\n defer s.mu.Unlock()",
        "Lock ждёт освобождения mutex. defer гарантирует Unlock при выходе из метода."
      ],
      [
        "Инициализировать map",
        " if s.values==nil {s.values=make(map[string]int)}",
        "Проверка и создание защищены той же блокировкой, иначе два писателя могут заменить map."
      ],
      [
        "Записать значение",
        " s.values[key]=value\n}",
        "Мутация внутри критической секции."
      ],
      [
        "Защитить чтение",
        "func (s *SafeStore) Get(key string)(int,bool){\n s.mu.Lock()\n defer s.mu.Unlock()",
        "Даже чтение конфликтует с конкурентной записью. Используем тот же mutex."
      ],
      [
        "Вернуть данные и статус",
        " v,ok:=s.values[key]\n return v,ok\n}",
        "Чтение nil map безопасно. Comma-ok различает отсутствующий ключ и сохранённый ноль."
      ]
    ],
    "blocks": [
      "Вернуть данные и статус",
      "Защитить чтение",
      "Записать значение",
      "Инициализировать map",
      "Захватить блокировку записи",
      "Объявить состояние"
    ],
    "order": [
      5,
      4,
      3,
      2,
      1,
      0
    ],
    "blanks": [
      {
        "before": "s.mu.",
        "after": "()",
        "options": [
          "Lock",
          "Done",
          "Add"
        ],
        "correct": 0,
        "explain": "Lock входит в критическую секцию."
      },
      {
        "before": "defer s.mu.",
        "after": "()",
        "options": [
          "Unlock",
          "Wait",
          "Lock"
        ],
        "correct": 0,
        "explain": "Освобождаем тот же mutex."
      },
      {
        "before": "v,ok := s.values[",
        "after": "]",
        "options": [
          "key",
          "value",
          "0"
        ],
        "correct": 0,
        "explain": "Comma-ok сообщает наличие ключа."
      }
    ],
    "partial": "package practice\n\ntype SafeStore struct {mu sync.Mutex; values map[string]int}\nfunc (s *SafeStore) Set(key string,value int){\n s.mu.Lock()\n defer s.mu.Unlock()\n if s.values==nil {s.values=make(map[string]int)}\n // TODO: запиши значение\n}\nfunc (s *SafeStore) Get(key string)(int,bool){\n s.mu.Lock()\n defer s.mu.Unlock()\n v,ok:=s.values[key]\n return v,ok\n}\n",
    "bug": "package practice\n\ntype SafeStore struct {mu sync.Mutex; values map[string]int}\nfunc (s *SafeStore) Set(key string,value int){\n s.mu.Lock()\n defer s.mu.Unlock()\n if s.values==nil {s.values=make(map[string]int)}\n s.values[key]=value\n}\nfunc (s *SafeStore) Get(key string)(int,bool){\n s.mu.Lock()\n defer s.mu.Unlock()\n v:=s.values[key]\n return v,v!=0\n}\n",
    "hints": [
      "Нужны map и mutex внутри одного объекта.",
      "Оба метода — pointer receiver; Lock и defer Unlock в каждом.",
      "В Set создай map при nil под блокировкой.",
      "В Get используй comma-ok.",
      "Set: Lock → defer Unlock → make при nil → запись. Get: Lock → defer Unlock → v,ok := s.values[key] → return v,ok."
    ],
    "related": [
      [
        "race",
        "Повторить data race"
      ],
      [
        "concurrency-wait-group",
        "Ожидание группы операций"
      ]
    ],
    "production": "Подходит для небольшого in-memory реестра. Mutex не защищает другие процессы и не заменяет транзакции БД. Избегай долгих RPC под блокировкой.",
    "interview": "Почему чтение map тоже нужно защищать?"
  },
  "concurrency-rwmutex": {
    "frames": [
      [
        "Исходное состояние",
        [
          "host=A",
          "port=1"
        ],
        "R1 и R2 читают",
        "Оба держат RLock."
      ],
      [
        "Писатель ждёт",
        [
          "R1: reading",
          "R2: reading",
          "W: waiting"
        ],
        "Update(B,2)",
        "Lock ждёт окончания чтений."
      ],
      [
        "Запись",
        [
          "W: Lock",
          "R3: waiting"
        ],
        "host=B; port=2",
        "Оба поля обновлены под Lock."
      ],
      [
        "Снимок",
        [
          "R3: RLock"
        ],
        "B,2",
        "Смешанная пара A,2 не наблюдается."
      ]
    ],
    "steps": [
      [
        "Хранить пару и RWMutex",
        "type ConfigStore struct {mu sync.RWMutex; host string; port int}",
        "Поля образуют единый снимок. RWMutex разрешает совместные чтения, писатель требует эксклюзивного доступа."
      ],
      [
        "Захватить эксклюзивный доступ",
        "func (s *ConfigStore) Update(host string,port int){\n s.mu.Lock()\n defer s.mu.Unlock()",
        "Пока писатель держит Lock, ни читатель, ни другой писатель не входит в защищённую область."
      ],
      [
        "Обновить пару",
        " s.host=host\n s.port=port\n}",
        "Обе записи под одной блокировкой. Читатель не видит промежуточную комбинацию."
      ],
      [
        "Захватить доступ на чтение",
        "func (s *ConfigStore) Snapshot()(string,int){\n s.mu.RLock()\n defer s.mu.RUnlock()",
        "Читатели могут держать RLock одновременно, если нет препятствующего писателя."
      ],
      [
        "Вернуть снимок",
        " return s.host,s.port\n}",
        "Копируем скалярные значения до освобождения блокировки."
      ]
    ],
    "blocks": [
      "Вернуть снимок",
      "Захватить доступ на чтение",
      "Обновить пару",
      "Захватить эксклюзивный доступ",
      "Хранить пару и RWMutex"
    ],
    "order": [
      4,
      3,
      2,
      1,
      0
    ],
    "blanks": [
      {
        "before": "s.mu.",
        "after": "() // чтение",
        "options": [
          "RLock",
          "Lock",
          "RUnlock"
        ],
        "correct": 0,
        "explain": "RLock допускает совместные чтения."
      },
      {
        "before": "defer s.mu.",
        "after": "()",
        "options": [
          "RUnlock",
          "Unlock",
          "Done"
        ],
        "correct": 0,
        "explain": "Освобождение соответствует RLock."
      },
      {
        "before": "s.mu.",
        "after": "() // запись",
        "options": [
          "Lock",
          "RLock",
          "RUnlock"
        ],
        "correct": 0,
        "explain": "Запись требует эксклюзивного Lock."
      }
    ],
    "partial": "package practice\n\ntype ConfigStore struct {mu sync.RWMutex; host string; port int}\nfunc (s *ConfigStore) Update(host string,port int){\n s.mu.Lock()\n defer s.mu.Unlock()\n s.host=host\n // TODO: обнови второе поле\n}\nfunc (s *ConfigStore) Snapshot()(string,int){\n s.mu.RLock()\n defer s.mu.RUnlock()\n return s.host,s.port\n}\n",
    "bug": "package practice\n\ntype ConfigStore struct {mu sync.RWMutex; host string; port int}\nfunc (s *ConfigStore) Update(host string,port int){\n s.mu.Lock()\n defer s.mu.Unlock()\n s.host=host\n s.port=port\n}\nfunc (s *ConfigStore) Snapshot()(string,int){\n s.mu.Lock()\n defer s.mu.Unlock()\n return s.host,s.port\n}\n",
    "hints": [
      "Используй sync.RWMutex для обоих полей.",
      "Update: Lock, defer Unlock.",
      "Измени host и port под одной блокировкой.",
      "Snapshot: RLock, defer RUnlock, возврат обоих полей.",
      "Update: Lock → два присваивания → Unlock. Snapshot: RLock → return s.host,s.port → RUnlock."
    ],
    "related": [
      [
        "race",
        "Повторить data race"
      ],
      [
        "concurrency-wait-group",
        "Ожидание группы операций"
      ]
    ],
    "production": "Read-heavy конфигурация может выиграть от RWMutex, но он не автоматически быстрее Mutex. Измеряй contention. Не пытайся повысить RLock до Lock без освобождения.",
    "interview": "Почему RWMutex не всегда быстрее Mutex?"
  },
  "concurrency-atomic-counter": {
    "frames": [
      [
        "Начало",
        [
          "G1:+2",
          "G2:+3"
        ],
        "value=0",
        "Два независимых прибавления."
      ],
      [
        "Один возможный порядок",
        [
          "G1:Add(2)"
        ],
        "value=2; return 2",
        "Одна атомарная операция."
      ],
      [
        "Вторая операция",
        [
          "G2:Add(3)"
        ],
        "value=5; return 5",
        "Обновления не теряются."
      ],
      [
        "Чтение",
        [
          "Load()"
        ],
        "5",
        "После завершения обеих операций итог равен 5."
      ]
    ],
    "steps": [
      [
        "Объявить атомарное поле",
        "type AtomicCounter struct {value atomic.Int64}",
        "Тип из sync/atomic предоставляет атомарные операции. Zero value равен нулю. Не копируй после использования."
      ],
      [
        "Выполнить сложение",
        "func (c *AtomicCounter) Add(delta int64)int64{\n return c.value.Add(delta)\n}",
        "Add делает read-modify-write одной атомарной операцией и возвращает новое значение, в отличие от раздельных Load и Store."
      ],
      [
        "Прочитать значение",
        "func (c *AtomicCounter) Value()int64{\n return c.value.Load()\n}",
        "Все чтения также атомарные. Снимок может измениться сразу после возврата."
      ]
    ],
    "blocks": [
      "Прочитать значение",
      "Выполнить сложение",
      "Объявить атомарное поле"
    ],
    "order": [
      2,
      1,
      0
    ],
    "blanks": [
      {
        "before": "value atomic.",
        "after": "",
        "options": [
          "Int64",
          "Mutex",
          "WaitGroup"
        ],
        "correct": 0,
        "explain": "Типизированный атомарный int64."
      },
      {
        "before": "return c.value.",
        "after": "(delta)",
        "options": [
          "Add",
          "Store",
          "Load"
        ],
        "correct": 0,
        "explain": "Add возвращает новое значение."
      },
      {
        "before": "return c.value.",
        "after": "()",
        "options": [
          "Load",
          "Add",
          "Swap"
        ],
        "correct": 0,
        "explain": "Load атомарно читает поле."
      }
    ],
    "partial": "package practice\n\ntype AtomicCounter struct {value atomic.Int64}\nfunc (c *AtomicCounter) Add(delta int64)int64{\n return c.value.Add(delta)\n}\nfunc (c *AtomicCounter) Value()int64{\n // TODO: атомарно прочитай значение\n return 0\n}\n",
    "bug": "package practice\n\ntype AtomicCounter struct {value atomic.Int64}\nfunc (c *AtomicCounter) Add(delta int64)int64{\n return c.value.Add(delta)-delta\n}\nfunc (c *AtomicCounter) Value()int64{return c.value.Load()}\n",
    "hints": [
      "Импорт sync/atomic есть в общей заготовке.",
      "Поле value имеет тип atomic.Int64.",
      "Add делегирует c.value.Add(delta).",
      "Value использует c.value.Load().",
      "return c.value.Add(delta) // Add\nreturn c.value.Load() // Value"
    ],
    "related": [
      [
        "race",
        "Повторить data race"
      ],
      [
        "concurrency-wait-group",
        "Ожидание группы операций"
      ]
    ],
    "production": "Подходит для независимых метрик. Для инварианта нескольких полей или check-then-act одного атомарного чтения недостаточно.",
    "interview": "Почему Load()+Store() не эквивалентны Add()?"
  },
  "concurrency-once": {
    "frames": [
      [
        "Первый Get",
        [
          "G1: Do(load A)",
          "G2: Do(load B)"
        ],
        "once: not done",
        "Одна горутина начинает loader."
      ],
      [
        "Инициализация",
        [
          "G1: load A",
          "G2: waiting"
        ],
        "value ещё не опубликовано",
        "Другой вызов ждёт."
      ],
      [
        "Завершение",
        [
          "G1: value=A",
          "G2: unblocked"
        ],
        "once: done",
        "Оба возвращают A."
      ],
      [
        "Повтор",
        [
          "G3: Get(load C)"
        ],
        "return A",
        "Loader C не вызывается."
      ]
    ],
    "steps": [
      [
        "Хранить Once и результат",
        "type LazyConfig struct {once sync.Once; value string}",
        "Once хранит факт выполнения независимо от строки. Пустая строка — валидный результат."
      ],
      [
        "Объявить метод",
        "func (c *LazyConfig) Get(load func()string)string{",
        "Loader передаётся как функция; pointer receiver сохраняет один экземпляр Once."
      ],
      [
        "Выполнить инициализацию",
        " c.once.Do(func(){\n  c.value=load()\n })",
        "Do выполняет функцию один раз на экземпляр. Конкурентные вызовы ждут окончания инициализации."
      ],
      [
        "Вернуть результат",
        " return c.value\n}",
        "Возврат из Do синхронизирован с завершением инициализации."
      ]
    ],
    "blocks": [
      "Вернуть результат",
      "Выполнить инициализацию",
      "Объявить метод",
      "Хранить Once и результат"
    ],
    "order": [
      3,
      2,
      1,
      0
    ],
    "blanks": [
      {
        "before": "c.once.",
        "after": "(func(){",
        "options": [
          "Do",
          "Add",
          "Lock"
        ],
        "correct": 0,
        "explain": "Once.Do выполняет инициализацию один раз."
      },
      {
        "before": "c.value = ",
        "after": "()",
        "options": [
          "load",
          "Get",
          "close"
        ],
        "correct": 0,
        "explain": "Сохраняем результат loader."
      }
    ],
    "partial": "package practice\n\ntype LazyConfig struct {once sync.Once; value string}\nfunc (c *LazyConfig) Get(load func()string)string{\n c.once.Do(func(){\n  // TODO: вызови load и сохрани результат\n })\n return c.value\n}\n",
    "bug": "package practice\n\ntype LazyConfig struct {once sync.Once; value string}\nfunc (c *LazyConfig) Get(load func()string)string{\n if c.value==\"\" {c.value=load()}\n return c.value\n}\n",
    "hints": [
      "Нужен sync.Once, не проверка пустой строки.",
      "Храни once и value в одном объекте.",
      "Вызови c.once.Do с анонимной функцией.",
      "Внутри сохрани c.value = load(), затем верни c.value.",
      "c.once.Do(func(){c.value=load()})\nreturn c.value"
    ],
    "related": [
      [
        "race",
        "Повторить data race"
      ],
      [
        "concurrency-wait-group",
        "Ожидание группы операций"
      ]
    ],
    "production": "Once подходит для неизменяемой инициализации. Для повторной попытки после ошибки или обновления нужен другой механизм. После panic в Do Once считает вызов выполненным.",
    "interview": "Почему проверка value==\"\" не заменяет sync.Once?"
  },
  "concurrency-quota": {
    "frames": [
      [
        "Начало",
        [
          "G1: reserve 4",
          "G2: reserve 4"
        ],
        "remaining=5",
        "Оба хотят одну квоту."
      ],
      [
        "G1 под Lock",
        [
          "check 4<=5",
          "remaining -=4"
        ],
        "remaining=1; true",
        "Проверка и запись неразделимы."
      ],
      [
        "G2 под Lock",
        [
          "check 4>1"
        ],
        "remaining=1; false",
        "Второй видит новый остаток."
      ],
      [
        "Ошибка подхода",
        [
          "check отдельно",
          "act отдельно"
        ],
        "оба могли увидеть 5",
        "Даже отдельно защищённые обращения допускают логическую гонку."
      ]
    ],
    "steps": [
      [
        "Хранить общий остаток",
        "type QuotaStore struct {mu sync.Mutex; remaining int}",
        "Инвариант: остаток неотрицателен. Один mutex защищает все обращения."
      ],
      [
        "Создать начальное состояние",
        "func NewQuotaStore(limit int)*QuotaStore{\n if limit<0 {limit=0}\n return &QuotaStore{remaining:limit}\n}",
        "Отрицательный лимит нормализуем. Объект пока не опубликован, Lock не нужен."
      ],
      [
        "Проверить аргумент",
        "func (q *QuotaStore) ReserveQuota(amount int)bool{\n if amount<=0{return false}",
        "Проверка параметра не обращается к общей памяти."
      ],
      [
        "Войти в критическую секцию",
        " q.mu.Lock()\n defer q.mu.Unlock()",
        "Нельзя освобождать mutex между проверкой остатка и уменьшением."
      ],
      [
        "Проверить и уменьшить",
        " if amount>q.remaining{return false}\n q.remaining-=amount\n return true\n}",
        "Равенство допустимо. Проверка предотвращает отрицательный остаток, действие выполняется до Unlock."
      ],
      [
        "Прочитать остаток",
        "func (q *QuotaStore) Remaining()int{\n q.mu.Lock()\n defer q.mu.Unlock()\n return q.remaining\n}",
        "Чтение тоже защищаем. Это снимок, не разрешение на будущее резервирование."
      ]
    ],
    "blocks": [
      "Прочитать остаток",
      "Проверить и уменьшить",
      "Войти в критическую секцию",
      "Проверить аргумент",
      "Создать начальное состояние",
      "Хранить общий остаток"
    ],
    "order": [
      5,
      4,
      3,
      2,
      1,
      0
    ],
    "blanks": [
      {
        "before": "if amount ",
        "after": " q.remaining {return false}",
        "options": [
          ">",
          ">=",
          "<"
        ],
        "correct": 0,
        "explain": "Равенство допустимо."
      },
      {
        "before": "q.remaining ",
        "after": " amount",
        "options": [
          "-=",
          "+=",
          "=="
        ],
        "correct": 0,
        "explain": "Успех уменьшает остаток."
      },
      {
        "before": "defer q.mu.",
        "after": "()",
        "options": [
          "Unlock",
          "Lock",
          "Done"
        ],
        "correct": 0,
        "explain": "Освобождаем после всей операции."
      }
    ],
    "partial": "package practice\n\ntype QuotaStore struct {mu sync.Mutex; remaining int}\nfunc NewQuotaStore(limit int)*QuotaStore{\n if limit<0{limit=0}\n return &QuotaStore{remaining:limit}\n}\nfunc (q *QuotaStore) ReserveQuota(amount int)bool{\n if amount<=0{return false}\n q.mu.Lock()\n defer q.mu.Unlock()\n if amount>q.remaining{return false}\n // TODO: уменьши остаток\n return true\n}\nfunc (q *QuotaStore) Remaining()int{q.mu.Lock();defer q.mu.Unlock();return q.remaining}\n",
    "bug": "package practice\n\ntype QuotaStore struct {mu sync.Mutex; remaining int}\nfunc NewQuotaStore(limit int)*QuotaStore{\n if limit<0{limit=0}\n return &QuotaStore{remaining:limit}\n}\nfunc (q *QuotaStore) ReserveQuota(amount int)bool{\n if amount<=0{return false}\n q.mu.Lock()\n defer q.mu.Unlock()\n if amount>=q.remaining{return false}\n q.remaining-=amount\n return true\n}\nfunc (q *QuotaStore) Remaining()int{q.mu.Lock();defer q.mu.Unlock();return q.remaining}\n",
    "hints": [
      "Остаток и mutex принадлежат одному объекту.",
      "Нормализуй limit и отклоняй неположительный amount.",
      "Lock перед чтением остатка.",
      "Под той же блокировкой проверь amount>remaining и вычти amount.",
      "if amount<=0{return false}\nq.mu.Lock();defer q.mu.Unlock()\nif amount>q.remaining{return false}\nq.remaining-=amount\nreturn true"
    ],
    "related": [
      [
        "race",
        "Повторить data race"
      ],
      [
        "concurrency-wait-group",
        "Ожидание группы операций"
      ]
    ],
    "production": "Резервирование квоты требует атомарной проверки и изменения. Для нескольких инстансов нужен механизм согласованности общего хранилища, например транзакция или условный UPDATE.",
    "interview": "Может ли race condition существовать без data race?"
  }
};
