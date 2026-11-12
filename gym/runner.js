/*
 * GoForge browser runner. Code is sent to the official Go Playground only
 * after the user chooses to run. GitHub Pages never executes Go programs.
 */
(function (root, factory) {
  const api = factory();
  if (typeof module === 'object' && module.exports) module.exports = api;
  if (root) root.GoForgeRunner = api;
})(typeof window !== 'undefined' ? window : null, function () {
  'use strict';
  const endpoint = 'https://play.golang.org/compile';
  const maximumBytes = 230000;

  // This is a targeted top-level declaration scanner for GoForge kata stubs,
  // not a general-purpose Go parser.
  function declarationHeaders(code) {
    const re = /^(func\s+(?:\(\s*(?:[A-Za-z_]\w*\s+)?(\*?[A-Za-z_]\w*)\s*\)\s*)?([A-Za-z_]\w*)|type\s+([A-Za-z_]\w*))/gm;
    const found = [];
    let m;
    while ((m = re.exec(code))) {
      found.push({
        start: m.index,
        key: m[4] ? 'type:' + m[4] : 'func:' + (m[2] || '') + ':' + m[3],
      });
    }
    return found;
  }

  function topLevelEnd(text, start) {
    let depth = 0, hasBrace = false, quote = '', line = false, block = false;
    for (let i = start; i < text.length; i++) {
      const c = text[i], next = text[i + 1];
      if (line) { if (c === '\n') line = false; continue; }
      if (block) { if (c === '*' && next === '/') { block = false; i++; } continue; }
      if (quote) {
        if (c === '\\' && quote !== String.fromCharCode(96)) { i++; continue; }
        if (c === quote) quote = '';
        continue;
      }
      if (c === '/' && next === '/') { line = true; i++; continue; }
      if (c === '/' && next === '*') { block = true; i++; continue; }
      if (c === '"' || c === "'" || c === String.fromCharCode(96)) { quote = c; continue; }
      if (c === '{') { depth++; hasBrace = true; continue; }
      if (c === '}') {
        depth--;
        if (hasBrace && depth === 0) return i + 1;
      }
      if (c === '\n' && !hasBrace) {
        const firstLine = text.slice(start, i);
        if (/^type\s+\w+\s+(?!struct\b|interface\b)/.test(firstLine)) return i;
      }
    }
    if (!hasBrace) {
      const end = text.indexOf('\n', start);
      return end < 0 ? text.length : end;
    }
    throw new Error('Не удалось найти конец объявления Go.');
  }

  function stripTargetDeclarations(base, starter) {
    const keys = new Set(declarationHeaders(starter).map(x => x.key));
    if (!keys.size) throw new Error('В заготовке задачи не найдена функция или тип.');
    const remove = [];
    for (const d of declarationHeaders(base)) {
      if (keys.has(d.key)) remove.push({ start: d.start, end: topLevelEnd(base, d.start), key: d.key });
    }
    const removed = new Set(remove.map(x => x.key));
    for (const key of keys) if (!removed.has(key)) throw new Error('Не удалось подготовить тест: отсутствует ' + key);
    remove.sort((a, b) => b.start - a.start);
    let result = base;
    for (const d of remove) result = result.slice(0, d.start) + result.slice(d.end);
    return result;
  }

  function packageMain(code) {
    return code.replace(/^\s*package\s+practice\b/m, 'package main');
  }

  function importsOf(src) {
    const found = [];
    src = src.replace(/^\s*import\s*\(([\s\S]*?)\)\s*/gm, (_, inner) => {
      for (const line of inner.split('\n')) {
        const m = line.match(/^\s*"([^"]+)"\s*(?:\/\/.*)?$/);
        if (m) found.push(m[1]);
      }
      return '\n';
    });
    src = src.replace(/^\s*import\s+"([^"]+)"\s*/gm, (_, name) => {
      found.push(name);
      return '\n';
    });
    return { code: src, paths: found };
  }

  function selectedTestProgram(source, testName) {
    const headers = declarationHeaders(source);
    const map = new Map(headers.map(h => [h.key, h]));
    // Extra test-only types are declared in kata_test.go, not kata.go.
    const dependencies = {
      TestCloseWithError: ['type:gymCloser', 'func:*gymCloser:Close'],
      TestWithinTx: [
        'type:fakeGymTx', 'type:fakeGymDB',
        'func:*fakeGymTx:Commit', 'func:*fakeGymTx:Rollback',
        'func:*fakeGymDB:BeginTx',
      ],
    };
    const keys = ['func::' + testName, ...(dependencies[testName] || [])];
    const declarations = [];
    for (const key of keys) {
      const item = map.get(key);
      if (!item) throw new Error('Не найдена тестовая зависимость: ' + key);
      declarations.push(source.slice(item.start, topLevelEnd(source, item.start)));
    }
    const body = declarations.join('\n\n');
    const imports = [...source.matchAll(/^\s*"([^"]+)"\s*$/gm)].map(x => x[1]);
    const used = imports.filter(path => {
      const alias = path.split('/').pop();
      return new RegExp('\\b' + alias + '\\.').test(body);
    });
    if (!used.includes('testing')) used.unshift('testing');
    return 'package main\n\nimport (\n' +
      [...new Set(used)].map(x => '\t"' + x + '"').join('\n') +
      '\n)\n\n' + body + '\n';
  }

  function buildSource(task, draft, testName, kataGo, kataTestGo) {
    if (!task || typeof task.starter !== 'string' || !/^[A-Za-z_]\w*$/.test(testName || '')) throw new Error('Некорректная задача.');
    if (typeof draft !== 'string' || !draft.trim()) throw new Error('Напиши решение перед запуском.');
    if (typeof kataGo !== 'string' || typeof kataTestGo !== 'string') throw new Error('Файлы тестов не загружены.');
    if (!kataTestGo.includes('func ' + testName + '(')) throw new Error('Тест задачи не найден: ' + testName);

    let base = stripTargetDeclarations(kataGo, task.starter);
    let user = packageMain(draft).replace(/^\s*package\s+main\b/, '');
    const imports = importsOf(user);
    user = imports.code.trim();
    if (!user) throw new Error('В редакторе нет реализации Go.');
    // Combine into ONE Go file: the student's functions then see the same
    // imports as local gym/practice/kata.go, avoiding per-file import errors.
    const existing = new Set([...base.matchAll(/^\s*"([^"]+)"\s*$/gm)].map(x => x[1]));
    const additional = [...new Set(imports.paths.filter(x => !existing.has(x)))];
    if (additional.length) {
      const declaration = '\nimport (\n' + additional.map(x => '\t"' + x + '"').join('\n') + '\n)\n';
      const match = base.match(/\bimport\s*\([\s\S]*?\)/);
      if (!match) throw new Error('В файле GoForge не найден import block.');
      const pos = match.index + match[0].length;
      base = base.slice(0, pos) + declaration + base.slice(pos);
    }
    const keepImports = '\n// Keep standard imports available when the selected kata stub\n' +
      '// was the only remaining reference to one of them.\n' +
      'var (\n _ = json.NewDecoder\n _ = strings.TrimSpace\n _ = errors.New\n _ = fmt.Sprintf\n _ = io.EOF\n _ = sync.Mutex{}\n _ = http.MethodGet\n _ = time.Time{}\n _ = context.Background\n)\n';
    const source = packageMain(base) + keepImports + '\n// User solution\n' + user + '\n';

    // The Playground discovers TestX only in implicit prog.go. Select one
    // test plus its minimal helper declarations to avoid build timeouts.
    const tests = selectedTestProgram(kataTestGo, testName);
    const archive = tests + '\n-- solution.go --\n' + source + '\n';
    if (new TextEncoder().encode(archive).length > maximumBytes) throw new Error('Слишком большой код для онлайн-запуска.');
    return archive;
  }

  function summarize(result) {
    if (!result || typeof result !== 'object') throw new Error('Неверный ответ Go Playground.');
    const messages = Array.isArray(result.Events) ? result.Events.map(e => String(e.Message || '')).join('') : '';
    const errors = String(result.Errors || '');
    const vetErrors = String(result.VetErrors || '');
    const output = [errors, vetErrors, messages].filter(Boolean).join('\n').trim();
    const passed = result.IsTest === true &&
      Number(result.Status) === 0 && Number(result.TestsFailed) === 0 &&
      !errors && !vetErrors && /(?:^|\n)PASS(?:\s|\n|$)/.test(messages);
    return {
      passed,
      output: output || (passed ? 'PASS' : 'Go Playground не вернул подробный вывод.'),
      status: result.Status,
      testsFailed: result.TestsFailed,
      isTest: result.IsTest === true,
    };
  }

  async function run(task, draft, testName, options = {}) {
    const request = options.fetch || fetch;
    const base = options.base || './practice/';
    const [goResponse, testResponse] = await Promise.all([
      request(base + 'kata.go', { cache: 'no-store' }),
      request(base + 'kata_test.go', { cache: 'no-store' }),
    ]);
    if (!goResponse.ok || !testResponse.ok) throw new Error('Не удалось загрузить тестовые файлы GoForge.');
    const archive = buildSource(task, draft, testName, await goResponse.text(), await testResponse.text());
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 45000);
    try {
      const resp = await request(endpoint, {
        method: 'POST', mode: 'cors',
        // Form encoding is a CORS-simple request and avoids OPTIONS preflight
        // (the upstream service supports this official Playground protocol).
        headers: { 'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8' },
        body: new URLSearchParams({ body: archive, version: '2', withVet: 'true' }),
        signal: controller.signal,
      });
      if (!resp.ok) throw new Error('Go Playground вернул HTTP ' + resp.status + '.');
      return summarize(await resp.json());
    } catch (error) {
      if (error && error.name === 'AbortError') throw new Error('Превышено время ожидания Go Playground.');
      throw error;
    } finally {
      clearTimeout(timeout);
    }
  }

  return { run, buildSource, summarize, stripTargetDeclarations, declarationHeaders, selectedTestProgram, endpoint };
});
