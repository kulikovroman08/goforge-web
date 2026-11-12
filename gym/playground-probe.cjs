// One-off upstream capability probe for the official Go Playground.
// Run manually: node gym/playground-probe.cjs
(async () => {
  const source = '-- check_test.go --\npackage main\nimport "testing"\nfunc TestExample(t *testing.T) { if 2+2 != 4 {t.Fatal("fail")} }\n';
  const response = await fetch('https://go.dev/_/compile', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', 'Origin': 'https://kulikovroman08.github.io' },
    body: JSON.stringify({ Body: source, WithVet: true }),
    signal: AbortSignal.timeout(22000),
  });
  console.log('HTTP:', response.status, 'CORS:', response.headers.get('access-control-allow-origin'));
  const output = await response.text();
  console.log('RESPONSE:', output.slice(0, 2400));
  if (!response.ok) process.exitCode = 1;
})().catch(err => { console.error(err); process.exitCode = 1; });
