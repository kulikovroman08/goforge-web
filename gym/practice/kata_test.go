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
 "fmt"
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

func TestMapServiceError(t *testing.T) {
 cases:=[]struct{name string;err error;want RPCCode}{
  {"ok",nil,RPCOK},
  {"not found",fmt.Errorf("load: %w",ErrEventNotFound),RPCNotFound},
  {"invalid",ErrInvalidRequest,RPCInvalidArgument},
  {"cancel",context.Canceled,RPCCanceled},
  {"deadline",context.DeadlineExceeded,RPCDeadlineExceeded},
  {"internal",errors.New("password=secret: db unavailable"),RPCInternal},
 }
 for _,tc:=range cases {t.Run(tc.name,func(t *testing.T){
  got:=MapServiceError(tc.err)
  if got.Code!=tc.want{t.Fatalf("code=%q want %q",got.Code,tc.want)}
  if tc.err!=nil&&got.Message==""{t.Fatal("missing safe status message")}
  if strings.Contains(got.Message,"password")||strings.Contains(got.Message,"secret"){t.Fatal("leaked internal details")}
 })}
}
func TestBuildEventsPageQuery(t *testing.T){
 ts:=time.Date(2026,11,12,10,0,0,0,time.UTC)
 sql,args,err:=BuildEventsPageQuery("tenant-1",time.Time{},"",20)
 if err!=nil{t.Fatal(err)}
 if !strings.Contains(sql,"WHERE tenant_id = $1")||!strings.Contains(sql,"ORDER BY created_at DESC, id DESC")||!strings.Contains(sql,"LIMIT $2"){t.Fatalf("unexpected SQL: %s",sql)}
 if len(args)!=2||args[0]!="tenant-1"||args[1]!=20{t.Fatalf("unexpected args: %v",args)}
 sql,args,err=BuildEventsPageQuery("tenant-1",ts,"event-7",50)
 if err!=nil{t.Fatal(err)}
 if !strings.Contains(sql,"(created_at, id) < ($2, $3)")||!strings.Contains(sql,"LIMIT $4") {t.Fatalf("cursor SQL: %s",sql)}
 if len(args)!=4||args[0]!="tenant-1"||args[1]!=ts||args[2]!="event-7"||args[3]!=50{t.Fatalf("cursor args: %v",args)}
 for _,c:=range []struct{tenant string;at time.Time;id string;limit int}{
  {"",time.Time{},"",10},{"t",time.Time{},"",0},{"t",time.Time{},"",101},
  {"t",ts,"",10},{"t",time.Time{},"id",10},
 } {
  if _,_,err:=BuildEventsPageQuery(c.tenant,c.at,c.id,c.limit);err==nil{t.Fatalf("accepted invalid request %#v",c)}
 }
 evil:="tenant' OR 1=1 --"
 sql,args,err=BuildEventsPageQuery(evil,time.Time{},"",10)
 if err!=nil||strings.Contains(sql,evil)||len(args)!=2||args[0]!=evil{t.Fatalf("possible interpolated SQL: %s %v %v",sql,args,err)}
}
func TestHandleAndCommit(t *testing.T){
 msg:=StreamMessage{ID:"event-1"}
 var order []string
 handle:=func(context.Context,StreamMessage)error{order=append(order,"handle");return nil}
 commit:=func(context.Context)error{order=append(order,"commit");return nil}
 if err:=HandleAndCommit(context.Background(),msg,handle,commit);err!=nil{t.Fatal(err)}
 if !reflect.DeepEqual(order,[]string{"handle","commit"}){t.Fatalf("wrong order %v",order)}
 order=nil;bad:=errors.New("failed to process")
 if err:=HandleAndCommit(context.Background(),msg,func(context.Context,StreamMessage)error{order=append(order,"handle");return bad},commit);!errors.Is(err,bad){t.Fatalf("lost handle error %v",err)}
 if len(order)!=1||order[0]!="handle"{t.Fatalf("committed failed message: %v",order)}
 order=nil;commitErr:=errors.New("commit failed")
 if err:=HandleAndCommit(context.Background(),msg,handle,func(context.Context)error{order=append(order,"commit");return commitErr});!errors.Is(err,commitErr){t.Fatalf("commit err=%v",err)}
 if !reflect.DeepEqual(order,[]string{"handle","commit"}){t.Fatalf("bad order %v",order)}
 ctx,cancel:=context.WithCancel(context.Background());cancel();order=nil
 if err:=HandleAndCommit(ctx,msg,handle,commit);!errors.Is(err,context.Canceled){t.Fatalf("cancel err=%v",err)}
 if len(order)!=0{t.Fatalf("callbacks called after cancel %v",order)}
 if err:=HandleAndCommit(context.Background(),msg,nil,commit);err==nil{t.Fatal("nil handler accepted")}
}
func TestBuildLogLine(t *testing.T){
 cases:=[]struct{parts []string;want string}{
  {nil,""},{[]string{""},""},{[]string{"a","b","c"},"a|b|c"},
  {[]string{"a","","b"},"a||b"},{[]string{"Я","🙂"},"Я|🙂"},
 }
 for _,tc:=range cases{if got:=BuildLogLine(tc.parts);got!=tc.want{t.Errorf("got %q, want %q",got,tc.want)}}
}
func BenchmarkBuildLogLine(b *testing.B){
 parts:=[]string{"event-service","tenant-123","event-created","trace-abc","success"}
 b.ReportAllocs()
 for i:=0;i<b.N;i++{benchmarkLogSink=BuildLogLine(parts)}
}
var benchmarkLogSink string

func TestUniqueValues(t *testing.T) {
 ints:=UniqueValues([]int{2,1,2,3,1});if !reflect.DeepEqual(ints,[]int{2,1,3}){t.Fatalf("ints=%v",ints)}
 words:=UniqueValues([]string{"a","b","a"});if !reflect.DeepEqual(words,[]string{"a","b"}){t.Fatalf("strings=%v",words)}
 if got:=UniqueValues([]int(nil));len(got)!=0{t.Fatalf("empty=%v",got)}
}
func TestEvictExpired(t *testing.T) {
 now:=time.Date(2026,11,12,12,0,0,0,time.UTC)
 cache:=map[string]CacheEntry{
  "old":{Value:[]byte("old"),ExpiresAt:now.Add(-time.Second)},
  "exact":{Value:[]byte("exact"),ExpiresAt:now},
  "future":{Value:[]byte("future"),ExpiresAt:now.Add(time.Second)},
 }
 got:=EvictExpired(cache,now)
 if got!=2||len(cache)!=1 {t.Fatalf("removed=%d cache=%v",got,cache)}
 if string(cache["future"].Value)!="future" {t.Fatalf("remaining cache=%v",cache)}
 if EvictExpired(nil,now)!=0{t.Fatal("nil cache")}
}
func TestRunLimited(t *testing.T) {
 var active,maxActive,completed atomic.Int32
 var jobs []func(context.Context)error
 for i:=0;i<20;i++ {jobs=append(jobs,func(context.Context)error {
  n:=active.Add(1);for {old:=maxActive.Load();if n<=old||maxActive.CompareAndSwap(old,n){break}}
  time.Sleep(time.Millisecond)
  active.Add(-1);completed.Add(1);return nil
 })}
 if err:=RunLimited(context.Background(),2,jobs);err!=nil{t.Fatal(err)}
 if completed.Load()!=20||maxActive.Load()>2{t.Fatalf("completed=%d max=%d",completed.Load(),maxActive.Load())}
 bad:=errors.New("dependency failure")
 if err:=RunLimited(context.Background(),2,[]func(context.Context)error{func(context.Context)error{return bad}});!errors.Is(err,bad){t.Fatalf("lost err=%v",err)}
 canceled,cancel:=context.WithCancel(context.Background());cancel()
 var called atomic.Int32
 if err:=RunLimited(canceled,1,[]func(context.Context)error{func(context.Context)error{called.Add(1);return nil}});!errors.Is(err,context.Canceled){t.Fatalf("cancel=%v",err)}
 if called.Load()!=0{t.Fatalf("callback called %d times",called.Load())}
 if err:=RunLimited(context.Background(),0,nil);err==nil{t.Fatal("limit=0 accepted")}
}
func TestSquarePipeline(t *testing.T) {
 ctx,cancel:=context.WithTimeout(context.Background(),time.Second)
 defer cancel()
 input:=make(chan int,3);input<-1;input<-2;input<-3;close(input)
 out:=SquarePipeline(ctx,input)
 var got []int
 for {
  select {
   case v,ok:=<-out:
    if !ok {goto done}
    got=append(got,v)
   case <-ctx.Done():t.Fatal("pipeline blocked")
  }
 }
 done:
 if !reflect.DeepEqual(got,[]int{1,4,9}){t.Fatalf("got=%v",got)}
 doneInput:=make(chan int);close(doneInput)
 closedOut:=SquarePipeline(context.Background(),doneInput)
 select {
 case _,ok:=<-closedOut:if ok{t.Fatal("unexpected element after closure")}
 case <-time.After(time.Second):t.Fatal("did not close output")
 }
 blocked:=make(chan int,1);blocked<-8
 cctx,stop:=context.WithCancel(context.Background())
 output:=SquarePipeline(cctx,blocked)
 time.Sleep(time.Millisecond*10)
 stop()
 select {
 case _,ok:=<-output:if ok{t.Fatal("unexpected value after cancellation")}
 case <-time.After(time.Second):t.Fatal("blocked sender failed to exit")
 }
}
type fakeGymTx struct { log *[]string; commitErr error; rollbackErr error }
func (t *fakeGymTx) Commit() error { *t.log=append(*t.log,"commit");return t.commitErr }
func (t *fakeGymTx) Rollback() error { *t.log=append(*t.log,"rollback");return t.rollbackErr }
type fakeGymDB struct { log *[]string; tx *fakeGymTx; beginErr error }
func (d *fakeGymDB) BeginTx(ctx context.Context)(Tx,error){
 *d.log=append(*d.log,"begin")
 if d.beginErr!=nil{return nil,d.beginErr}
 return d.tx,nil
}
func TestWithinTx(t *testing.T) {
 t.Run("success",func(t *testing.T){
  var log []string;tx:=&fakeGymTx{log:&log};db:=&fakeGymDB{log:&log,tx:tx}
  err:=WithinTx(context.Background(),db,func(context.Context,Tx)error{log=append(log,"work");return nil})
  if err!=nil{t.Fatal(err)}
  if !reflect.DeepEqual(log[:3],[]string{"begin","work","commit"}){t.Fatalf("order=%v",log)}
 })
 t.Run("work fails",func(t *testing.T){
  var log []string;bad:=errors.New("sql error");db:=&fakeGymDB{log:&log,tx:&fakeGymTx{log:&log}}
  err:=WithinTx(context.Background(),db,func(context.Context,Tx)error{log=append(log,"work");return bad})
  if !errors.Is(err,bad){t.Fatalf("lost error %v",err)}
  if !reflect.DeepEqual(log,[]string{"begin","work","rollback"}){t.Fatalf("calls=%v",log)}
 })
 t.Run("commit fails",func(t *testing.T){
  var log []string;bad:=errors.New("commit failed");db:=&fakeGymDB{log:&log,tx:&fakeGymTx{log:&log,commitErr:bad}}
  if err:=WithinTx(context.Background(),db,func(context.Context,Tx)error{return nil});!errors.Is(err,bad){t.Fatalf("commit=%v",err)}
 })
 t.Run("cancel before begin",func(t *testing.T){
  var log []string;ctx,stop:=context.WithCancel(context.Background());stop()
  db:=&fakeGymDB{log:&log,tx:&fakeGymTx{log:&log}}
  if err:=WithinTx(ctx,db,func(context.Context,Tx)error{return nil});!errors.Is(err,context.Canceled){t.Fatalf("cancel=%v",err)}
  if len(log)!=0{t.Fatalf("began after cancel: %v",log)}
 })
}
