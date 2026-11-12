// Temporary integration diagnostic: HTTP response format and browser CORS.
// This probes the official Go Playground only, not a third-party proxy.
(async () => {
  const source='-- main_test.go --\npackage main\nimport "testing"\nfunc TestExample(t *testing.T) { if 2+2 != 4 { t.Fatal("fail") } }\n';
  const paths=[
    ['https://play.golang.org/compile','form'],
    ['https://play.golang.org/compile','json'],
    ['https://go.dev/_/compile','form'],
    ['https://go.dev/compile','form'],
  ];
  for(const [url,kind] of paths){
    try {
      const response=await fetch(url,{
        method:'POST',
        headers:{
          Origin:'https://kulikovroman08.github.io',
          'Content-Type':kind==='form'?'application/x-www-form-urlencoded':'application/json',
        },
        body:kind==='form'?new URLSearchParams({body:source,version:'2',withVet:'true'}):JSON.stringify({Body:source,WithVet:true}),
        signal:AbortSignal.timeout(13000),
      });
      console.log(url,kind,'HTTP',response.status,'CORS',response.headers.get('access-control-allow-origin'),'BODY',(await response.text()).slice(0,1400));
    }catch(error){console.log(url,kind,'ERROR',String(error))}
  }
})();
