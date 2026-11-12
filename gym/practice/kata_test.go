package practice

import (
 "context"
 "errors"
 "reflect"
 "strings"
 "sync"
 "testing"
 "net/http"
 "net/http/httptest"
 "encoding/json"
 "time"
 "sync/atomic"
)

func TestUniqueUsers(t *testing.T) {
 got:=UniqueUsers([]string{"101","202","101","303","202"})
 if !reflect.DeepEqual(got,[]string{"101","202","303"}) { t.Fatalf("got %v",got) }
 if got:=UniqueUsers(nil);len(got)!=0 {t.Fatalf("empty: %v",got)}
}
func TestActive(t *testing.T){
 events:=[]Event{{"a","active"},{"b","cancelled"},{"c","active"}}
 got:=Active(events)
 if !reflect.DeepEqual(got,[]Event{{"a","active"},{"c","active"}}){t.Fatalf("got %v",got)}
 if events[1].Status!="cancelled" {t.Fatal("modified source")}
}
func TestWithContext(t *testing.T){
 cause:=errors.New("not found")
 if WithContext(nil)!=nil {t.Fatal("nil must remain nil")}
 got:=WithContext(cause)
 if !errors.Is(got,cause) {t.Fatalf("lost cause: %v",got)}
 if got==cause {t.Fatal("missing contextual wrapper")}
}
func TestDecodeEvent(t *testing.T){
 good,err:=DecodeEvent(strings.NewReader(`{"title":"Meeting","owner_id":"42"}`))
 if err!=nil||good.Title!="Meeting"||good.OwnerID!="42" {t.Fatalf("got %#v %v",good,err)}
 if _,err:=DecodeEvent(strings.NewReader(`{"title":"  "}`));err==nil {t.Fatal("empty title accepted")}
 if _,err:=DecodeEvent(strings.NewReader("{bad"));err==nil {t.Fatal("invalid JSON accepted")}
}
func TestPage(t *testing.T){
 ids:=[]string{"a","b","c","d"}
 if got:=Page(ids,1,2);!reflect.DeepEqual(got,[]string{"b","c"}) {t.Fatalf("got %v",got)}
 for _,v:=range [][2]int{{-1,2},{1,-1},{99,2}} {if got:=Page(ids,v[0],v[1]);len(got)!=0 {t.Fatalf("invalid bounds: %v",got)}}
}
func TestRetry(t *testing.T){
 n:=0;err:=Retry(context.Background(),func() error {n++;if n<2{return errors.New("temporary")};return nil})
 if err!=nil||n!=2 {t.Fatalf("err=%v n=%d",err,n)}
 ctx,cancel:=context.WithCancel(context.Background());cancel();n=0
 if err:=Retry(ctx,func() error {n++;return nil});!errors.Is(err,context.Canceled)||n!=0 {t.Fatalf("canceled: %v n=%d",err,n)}
 n=0;last:=errors.New("last")
 if err:=Retry(context.Background(),func() error {n++;return last});!errors.Is(err,last)||n!=3 {t.Fatalf("limit: %v n=%d",err,n)}
}
func TestCounter(t *testing.T){
 var c Counter;var wg sync.WaitGroup
 for i:=0;i<100;i++ {wg.Add(1);go func(){defer wg.Done();for j:=0;j<100;j++{c.Inc()}}()}
 wg.Wait();if got:=c.Value();got!=10000 {t.Fatalf("got %d",got)}
}
func TestMaybeError(t *testing.T){
 if err:=MaybeError(false);err!=nil {t.Fatalf("typed nil: %v",err)}
 if err:=MaybeError(true);err==nil {t.Fatal("missing error")}
}

func TestCountStatuses(t *testing.T) {
 input:=[]Event{{ID:"a",Status:"active"},{ID:"b",Status:"cancelled"},{ID:"c",Status:"active"}}
 want:=map[string]int{"active":2,"cancelled":1}
 got:=CountStatuses(input)
 if !reflect.DeepEqual(got,want){t.Fatalf("counts=%v want=%v",got,want)}
 if got:=CountStatuses(nil);got==nil||len(got)!=0{t.Fatalf("empty must be nonnil map: %v",got)}
 if input[0].Status!="active"{t.Fatal("mutated input")}
}

func TestTruncateRunes(t *testing.T) {
 cases:=[]struct{input string;max int;want string}{
  {"Привет",3,"При"},{"A🙂B",2,"A🙂"},{"abc",100,"abc"},
  {"Я",0,""},{"hello",-1,""},{"",5,""},
 }
 for _,c:=range cases {
  got:=TruncateRunes(c.input,c.max)
  if got!=c.want {t.Errorf("TruncateRunes(%q,%d)=%q want=%q",c.input,c.max,got,c.want)}
 }
}

func TestMergeInts(t *testing.T) {
 ctx,cancel:=context.WithTimeout(context.Background(),2*time.Second)
 defer cancel()
 a,b:=make(chan int),make(chan int)
 go func(){defer close(a);a<-1;a<-2}()
 go func(){defer close(b);b<-3}()
 out:=MergeInts(ctx,a,b)
 values:=make([]int,0,3)
 for {
  select {
   case v,ok:=<-out:
    if !ok {goto done}
    values=append(values,v)
   case <-ctx.Done():t.Fatal("merge failed to terminate before deadline")
  }
 }
 done:
 if len(values)!=3 {t.Fatalf("got %v; want three values",values)}
 seen:=map[int]int{}
 for _,v:=range values{seen[v]++}
 for _,v:=range []int{1,2,3}{if seen[v]!=1{t.Fatalf("lost or duplicate value %d: %v",v,values)}}
 cancelled,stop:=context.WithCancel(context.Background())
 inputs:=make(chan int)
 output:=MergeInts(cancelled,inputs,inputs)
 stop()
 select {
 case _,ok:=<-output:
  if ok{t.Fatal("unexpected value after cancellation")}
 case <-time.After(time.Second):t.Fatal("output did not close on cancellation")
 }
}

func TestHealthHandler(t *testing.T) {
 req:=httptest.NewRequest(http.MethodGet,"/health",nil)
 rec:=httptest.NewRecorder()
 HealthHandler(rec,req)
 resp:=rec.Result()
 defer resp.Body.Close()
 if resp.StatusCode!=http.StatusOK {t.Errorf("status=%d want=200",resp.StatusCode)}
 if ct:=resp.Header.Get("Content-Type");ct!="application/json" {t.Errorf("Content-Type=%q",ct)}
 var body map[string]string
 if err:=json.NewDecoder(resp.Body).Decode(&body);err!=nil {t.Fatalf("invalid JSON: %v",err)}
 if body["status"]!="ok" {t.Fatalf("response=%v",body)}
}

type gymCloser struct { calls int; err error }
func (c *gymCloser) Close() error { c.calls++; return c.err }

func TestUpdateEventStatus(t *testing.T) {
 event := Event{ID:"e1",Status:"active"}
 if err:=UpdateEventStatus(&event,"cancelled");err!=nil {t.Fatalf("unexpected err %v",err)}
 if event.Status!="cancelled" {t.Fatalf("not mutated: %#v",event)}
 if err:=UpdateEventStatus(&event,"unknown");err==nil {t.Fatal("invalid status accepted")}
 if event.Status!="cancelled" {t.Fatal("changed value after invalid status")}
 if err:=UpdateEventStatus(nil,"active");err==nil {t.Fatal("nil event accepted")}
}

func TestChatActivityApplyMessage(t *testing.T) {
 var a ChatActivity
 if !a.ApplyMessage(10) {t.Fatal("first message not accepted")}
 if a.LastMessageAt!=10||a.Unread!=1 {t.Fatalf("state %#v",a)}
 for _,at:=range []int64{10,9,0,-1} {
  if a.ApplyMessage(at) {t.Errorf("accepted stale timestamp %d",at)}
 }
 if a.LastMessageAt!=10||a.Unread!=1 {t.Fatalf("changed after stale event: %#v",a)}
 if !a.ApplyMessage(11)||a.LastMessageAt!=11||a.Unread!=2 {t.Fatalf("second message: %#v",a)}
 var nilActivity *ChatActivity
 if nilActivity.ApplyMessage(20) {t.Fatal("nil receiver accepted value")}
 copyValue:=a
 copyValue.ApplyMessage(12)
 if a.LastMessageAt!=11 {t.Fatal("value copy unexpectedly modified original")}
}

func TestCloseWithError(t *testing.T) {
 work:=errors.New("write failed")
 closing:=errors.New("flush failed")
 cases:=[]struct{name string;work,closing error}{
  {"success",nil,nil},{"work only",work,nil},{"close only",nil,closing},{"both",work,closing},
 }
 for _,tc:=range cases {t.Run(tc.name,func(t *testing.T){
  c:=&gymCloser{err:tc.closing}
  got:=CloseWithError(tc.work,c)
  if c.calls!=1 {t.Fatalf("close called %d times",c.calls)}
  if tc.work==nil&&tc.closing==nil {if got!=nil {t.Fatalf("wanted nil: %v",got)};return}
  if tc.work!=nil&&!errors.Is(got,tc.work) {t.Fatalf("lost work cause: %v",got)}
  if tc.closing!=nil&&!errors.Is(got,tc.closing) {t.Fatalf("lost close cause: %v",got)}
 })}
 if got:=CloseWithError(work,nil);!errors.Is(got,work) {t.Fatal("nil closer lost work error")}
}

func TestProcessJobs(t *testing.T) {
 if err:=ProcessJobs(context.Background(),nil,0,func(context.Context,int)error{return nil});err==nil {
  t.Fatal("zero workers should be an error")
 }
 if err:=ProcessJobs(context.Background(),nil,1,nil);err==nil {t.Fatal("nil fn should be an error")}
 var active atomic.Int32
 var maxActive atomic.Int32
 var total atomic.Int32
 tasks:=make([]int,24)
 for i:=range tasks {tasks[i]=i}
 err:=ProcessJobs(context.Background(),tasks,3,func(ctx context.Context,v int)error{
  n:=active.Add(1)
  for {old:=maxActive.Load();if n<=old||maxActive.CompareAndSwap(old,n){break}}
  time.Sleep(2*time.Millisecond)
  active.Add(-1)
  total.Add(1)
  return nil
 })
 if err!=nil {t.Fatalf("success jobs returned %v",err)}
 if total.Load()!=24 {t.Fatalf("processed %d of 24",total.Load())}
 if maxActive.Load()>3 {t.Fatalf("exceeded workers: %d",maxActive.Load())}
 bad:=errors.New("broken job")
 if err:=ProcessJobs(context.Background(),[]int{1,2,3,4},2,func(ctx context.Context,v int)error{return bad});!errors.Is(err,bad){
  t.Fatalf("lost worker error: %v",err)
 }
 ctx,cancel:=context.WithCancel(context.Background());cancel()
 var called atomic.Int32
 if err:=ProcessJobs(ctx,[]int{1},2,func(ctx context.Context,v int)error{
  called.Add(1);return nil
 });!errors.Is(err,context.Canceled) {t.Fatalf("cancel got %v",err)}
 if called.Load()!=0 {t.Fatalf("called on cancelled ctx: %d",called.Load())}
}

func TestRequestIDMiddleware(t *testing.T) {
 calls:=0
 next:=http.HandlerFunc(func(w http.ResponseWriter,r *http.Request){
  calls++
  if r.Header.Get("X-Request-ID")!="req-1"{t.Errorf("lost request ID")}
  w.WriteHeader(http.StatusCreated)
  _,_=w.Write([]byte("done"))
 })
 h:=RequestIDMiddleware(next)
 for _,id:=range []string{"","  "} {
  request:=httptest.NewRequest(http.MethodGet,"/v1/events",nil)
  if id!="" {request.Header.Set("X-Request-ID",id)}
  w:=httptest.NewRecorder();h.ServeHTTP(w,request)
  if w.Code!=http.StatusBadRequest {t.Errorf("missing id %q status=%d",id,w.Code)}
  if w.Header().Get("Content-Type")!="application/json" {t.Errorf("missing JSON content type")}
  var result map[string]string
  if err:=json.Unmarshal(w.Body.Bytes(),&result);err!=nil||result["error"]==""{t.Errorf("invalid JSON response: %s err=%v",w.Body.String(),err)}
 }
 if calls!=0 {t.Fatalf("next called %d times before validation",calls)}
 request:=httptest.NewRequest(http.MethodGet,"/v1/events",nil)
 request.Header.Set("X-Request-ID","req-1")
 w:=httptest.NewRecorder();h.ServeHTTP(w,request)
 if calls!=1||w.Code!=http.StatusCreated||w.Body.String()!="done" {
  t.Fatalf("next not forwarded: calls=%d status=%d body=%q",calls,w.Code,w.Body.String())
 }
}


func TestWaitMessage(t *testing.T) {
 ctx,cancel:=context.WithCancel(context.Background())
 defer cancel()
 ch:=make(chan string,1);ch<-"msg-42"
 got,err:=WaitMessage(ctx,ch)
 if err!=nil||got!="msg-42"{t.Fatalf("message=%q err=%v",got,err)}
 closed:=make(chan string);close(closed)
 if _,err:=WaitMessage(context.Background(),closed);err==nil{t.Fatal("closed channel should return error")}
 canceled,stop:=context.WithCancel(context.Background());stop()
 if _,err:=WaitMessage(canceled,make(chan string));!errors.Is(err,context.Canceled){t.Fatalf("cancel: %v",err)}
 expired,finish:=context.WithTimeout(context.Background(),time.Millisecond);defer finish()
 <-expired.Done()
 if _,err:=WaitMessage(expired,nil);!errors.Is(err,context.DeadlineExceeded){t.Fatalf("deadline: %v",err)}
}
func TestValidateCreateEvent(t *testing.T) {
 tests:=[]struct{name string;req CreateEventRequest;wantErr bool}{
  {"valid",CreateEventRequest{Title:"Planning",OwnerID:"42"},false},
  {"empty title",CreateEventRequest{Title:"",OwnerID:"42"},true},
  {"spaces title",CreateEventRequest{Title:" \t ",OwnerID:"42"},true},
  {"empty owner",CreateEventRequest{Title:"Planning",OwnerID:""},true},
  {"spaces owner",CreateEventRequest{Title:"Planning",OwnerID:"  "},true},
 }
 for _,tc:=range tests {
  t.Run(tc.name,func(t *testing.T){
   orig:=tc.req
   err:=ValidateCreateEvent(tc.req)
   if (err!=nil)!=tc.wantErr {t.Fatalf("error=%v expected error=%v",err,tc.wantErr)}
   if tc.req!=orig {t.Fatal("mutated request")}
  })
 }
}
func TestDetachedPrefix(t *testing.T) {
 source:=[]byte{1,2,3,4}
 result:=DetachedPrefix(source,2)
 if !reflect.DeepEqual(result,[]byte{1,2}) {t.Fatalf("prefix=%v",result)}
 source[0]=9
 if result[0]!=1 {t.Fatal("result aliases source")}
 result[1]=8
 if source[1]!=2 {t.Fatal("source aliases result")}
 full:=DetachedPrefix([]byte{1,2},99)
 if !reflect.DeepEqual(full,[]byte{1,2}){t.Fatalf("full=%v",full)}
 if got:=DetachedPrefix(source,-1);len(got)!=0{t.Fatalf("negative n=%v",got)}
}
func TestEventProcessor(t *testing.T) {
 var p EventProcessor
 if !p.Apply("evt-a") {t.Fatal("first event rejected")}
 if p.Apply("evt-a") {t.Fatal("duplicate applied")}
 if p.Apply("") {t.Fatal("empty ID applied")}
 if !p.Apply("evt-b") || p.Count()!=2 {t.Fatalf("count=%d",p.Count())}
 var count atomic.Int32
 var wg sync.WaitGroup
 for i:=0;i<100;i++ {
  wg.Add(1)
  go func(){defer wg.Done();if p.Apply("evt-race"){count.Add(1)}}()
 }
 wg.Wait()
 if count.Load()!=1||p.Count()!=3{t.Fatalf("applied=%d count=%d",count.Load(),p.Count())}
}
