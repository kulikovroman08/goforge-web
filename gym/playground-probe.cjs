// Test official Go Playground execution response, not just HTTP status.
(async () => {
  for (const shouldFail of [false, true]) {
    const source = 'package main\nimport "testing"\nfunc TestExample(t *testing.T) { if answer != ' + (shouldFail ? '5' : '4') + ' { t.Fatal("unexpected result") } }\n-- exercise.go --\npackage main\nconst answer = 4\n';
    const response = await fetch('https://play.golang.org/compile', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Origin: 'https://kulikovroman08.github.io' },
      body: JSON.stringify({ Body: source, WithVet: true }),
      signal: AbortSignal.timeout(25000),
    });
    const payload = await response.json();
    console.log(shouldFail ? 'FAIL_CASE' : 'PASS_CASE', 'HTTP', response.status, 'CORS', response.headers.get('access-control-allow-origin'), 'BODY', JSON.stringify(payload).slice(0,2000));
    if (!response.ok || payload.IsTest !== true) throw Error('No real tests were executed');
  }
})().catch(err => { console.error(err); process.exitCode = 1; });
