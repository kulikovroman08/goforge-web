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

func TestDefaultRetries(t *testing.T) {
 if got := DefaultRetries(0); got != 3 { t.Errorf("got %v, want 3", got) }
 if got := DefaultRetries(-2); got != 3 { t.Errorf("got %v, want 3", got) }
 if got := DefaultRetries(5); got != 5 { t.Errorf("got %v, want 5", got) }
}

func TestSum(t *testing.T) {
 if got := Sum([]int{2,3,-1}); got != 4 { t.Errorf("got %v, want 4", got) }
 if got := Sum(nil); got != 0 { t.Errorf("got %v, want 0", got) }
 if got := Sum([]int{-2,-3}); got != -5 { t.Errorf("got %v, want -5", got) }
}

func TestCountPositive(t *testing.T) {
 if got := CountPositive([]int{-1,0,2,5}); got != 2 { t.Errorf("got %v, want 2", got) }
 if got := CountPositive(nil); got != 0 { t.Errorf("got %v, want 0", got) }
 if got := CountPositive([]int{0,-3}); got != 0 { t.Errorf("got %v, want 0", got) }
}

func TestClampLimit(t *testing.T) {
 if got := ClampLimit(0,0); got != 0 { t.Errorf("got %v, want 0", got) }
 if got := ClampLimit(-2,10); got != 1 { t.Errorf("got %v, want 1", got) }
 if got := ClampLimit(50,10); got != 10 { t.Errorf("got %v, want 10", got) }
 if got := ClampLimit(4,10); got != 4 { t.Errorf("got %v, want 4", got) }
}

func TestSwapInts(t *testing.T) {
 a,b:=10,20
 if !SwapInts(&a,&b)||a!=20||b!=10{t.Fatal(a,b)}
 if SwapInts(nil,&b)||b!=10{t.Fatal("nil a")}
 if SwapInts(&a,nil)||a!=20{t.Fatal("nil b")}
 if !SwapInts(&a,&a)||a!=20{t.Fatal("same pointer")}
}

func TestMaxValue(t *testing.T) {
 for _,tc:=range []struct{in []int; want int; ok bool}{{nil,0,false},{[]int{-5,-2,-8},-2,true},{[]int{0},0,true},{[]int{1,9,2},9,true}} {v,ok:=MaxValue(tc.in);if v!=tc.want||ok!=tc.ok{t.Fatalf("%v: got %d,%v",tc.in,v,ok)}}
}

func TestReverseCopy(t *testing.T) {
 in:=[]int{1,2,3};out:=ReverseCopy(in);if !reflect.DeepEqual(out,[]int{3,2,1})||!reflect.DeepEqual(in,[]int{1,2,3}){t.Fatal(in,out)};out[0]=9;if in[2]!=3{t.Fatal("alias")};if len(ReverseCopy(nil))!=0{t.Fatal("empty")}
}

func TestConcatInts(t *testing.T) {
 a:=make([]int,2,8);a[0],a[1]=1,2;b:=[]int{3,4};out:=ConcatInts(a,b);if !reflect.DeepEqual(out,[]int{1,2,3,4}){t.Fatal(out)};out[0],out[2]=9,9;if a[0]!=1||b[0]!=3{t.Fatal("alias")};if len(ConcatInts(nil,nil))!=0{t.Fatal("empty")}
}

func TestFirstRepeat(t *testing.T) {
 for _,tc:=range []struct{in []int;want int;ok bool}{{[]int{4,2,2,4},2,true},{[]int{0,0},0,true},{[]int{1,2},0,false},{nil,0,false}} {v,ok:=FirstRepeat(tc.in);if v!=tc.want||ok!=tc.ok{t.Fatal(tc,v,ok)}}
}

func TestBatchInts(t *testing.T) {
 in:=[]int{1,2,3,4,5};out:=BatchInts(in,2);if !reflect.DeepEqual(out,[][]int{{1,2},{3,4},{5}}){t.Fatal(out)};_ = append(out[0],99);if out[1][0]!=3||in[2]!=3{t.Fatal("append overwrote next batch")};if len(BatchInts(in,0))!=0||len(BatchInts(nil,2))!=0||len(BatchInts(in,-1))!=0{t.Fatal("invalid or empty")};if got:=BatchInts(in, int(^uint(0)>>1));len(got)!=1||len(got[0])!=5{t.Fatal(got)}
}

func TestIntFrequency(t *testing.T) {
 if got:=IntFrequency([]int{2,-1,2,0});!reflect.DeepEqual(got,map[int]int{2:2,-1:1,0:1}){t.Fatal(got)};if got:=IntFrequency(nil);got==nil||len(got)!=0{t.Fatal("empty",got)};if got:=IntFrequency([]int{7,7,7});got[7]!=3{t.Fatal(got)}
}

func TestLookupQuota(t *testing.T) {
 q:=map[string]int{"alice":0,"bob":5};for _,tc:=range []struct{m map[string]int;u string;v int;ok bool}{{q,"alice",0,true},{q,"bob",5,true},{q,"charlie",0,false},{nil,"alice",0,false}}{v,ok:=LookupQuota(tc.m,tc.u);if v!=tc.v||ok!=tc.ok{t.Fatal(tc,v,ok)}};if !reflect.DeepEqual(q,map[string]int{"alice":0,"bob":5}){t.Fatal("modified map")}
}

func TestStringStats(t *testing.T) {
 for _,tc:=range []struct{s string;b,r int}{{"Aя🙂",7,3},{"",0,0},{"abc",3,3},{string([]byte{0xff}),1,1},{"e\u0301",3,2}}{b,r:=StringStats(tc.s);if b!=tc.b||r!=tc.r{t.Fatal(tc,b,r)}}
}

func TestParsePort(t *testing.T) {
 for _,s:=range []string{"1","8080","65535"}{v,e:=ParsePort(s);if e!=nil||fmt.Sprint(v)!=s{t.Fatal(s,v,e)}}
 for _,s:=range []string{"abc","","0","-1","65536","999999999999999999999999"," 80"}{v,e:=ParsePort(s);if e==nil||v!=0{t.Fatal(s,v,e)}}
}

func TestToByte(t *testing.T) {
 for _,tc:=range []struct{n int;want byte;ok bool}{{0,0,true},{255,255,true},{200,200,true},{256,0,false},{-1,0,false},{1000,0,false}}{v,ok:=ToByte(tc.n);if v!=tc.want||ok!=tc.ok{t.Fatal(tc,v,ok)}}
}

func TestRotateArray(t *testing.T) {
 a:=[3]int{10,20,30};out:=RotateArray(a);if out!=([3]int{30,10,20})||a!=([3]int{10,20,30}){t.Fatal(a,out)};if RotateArray([3]int{-1,0,2})!=([3]int{2,-1,0}){t.Fatal("rotation")}
}

func TestApplyInts(t *testing.T) {
 in:=[]int{1,2,3};out:=ApplyInts(in,func(x int)int{return x*2});if !reflect.DeepEqual(out,[]int{2,4,6})||!reflect.DeepEqual(in,[]int{1,2,3}){t.Fatal(in,out)};out[0]=99;if in[0]!=1{t.Fatal("alias")};if len(ApplyInts(in,nil))!=0||len(ApplyInts(nil,func(x int)int{return x}))!=0{t.Fatal("empty")};if got:=ApplyInts(in,func(x int)int{return -x});!reflect.DeepEqual(got,[]int{-1,-2,-3}){t.Fatal(got)}
}

func TestEffectiveLimit(t *testing.T) {
 for _,tc:=range []struct{in,want int}{{7,7},{0,20},{-1,20},{1,1},{30,30}}{if got:=EffectiveLimit(tc.in);got!=tc.want{t.Fatal(tc,got)}}
}

func TestNewCounter(t *testing.T) {
 a,b:=NewCounter(10),NewCounter(100);if a==nil||b==nil{t.Fatal("nil counter")};if a()!=11||a()!=12||b()!=101||a()!=13||b()!=102{t.Fatal("state or independence")};if NewCounter(-1)()!=0{t.Fatal("start")}
}

func TestSumAll(t *testing.T) {
 if SumAll(10,2,3)!=15||SumAll(10)!=10||SumAll(-2,2,-1)!=-1{t.Fatal("sum")};nums:=[]int{2,3};if SumAll(1,nums...)!=6||!reflect.DeepEqual(nums,[]int{2,3}){t.Fatal("spread")};if SumAll(5,([]int)(nil)...)!=5{t.Fatal("nil")}
}

func TestStatusClass(t *testing.T) {
 for _,tc:=range []struct{code int;want string}{{99,"invalid"},{100,"informational"},{199,"informational"},{200,"success"},{299,"success"},{300,"redirect"},{399,"redirect"},{400,"client_error"},{499,"client_error"},{500,"server_error"},{599,"server_error"},{600,"invalid"},{-1,"invalid"}}{if got:=StatusClass(tc.code);got!=tc.want{t.Fatal(tc,got)}}
}

func TestIndexOf(t *testing.T) {
 for _,tc:=range []struct{v []int;target,want int}{{[]int{8,3,5,3},3,1},{[]int{0},0,0},{nil,5,-1},{[]int{4,1},7,-1},{[]int{4,1},1,1}}{if got:=IndexOf(tc.v,tc.target);got!=tc.want{t.Fatal(tc,got)}}
}

func TestLowerBoundIndex(t *testing.T) {
 for _,tc:=range []struct{v []int;target,want int}{{[]int{1,3,3,3,8},3,1},{[]int{1,3},2,-1},{nil,2,-1},{[]int{1},1,0},{[]int{1,3},9,-1},{[]int{1,3},0,-1},{[]int{2,2,2},2,0}}{if got:=LowerBoundIndex(tc.v,tc.target);got!=tc.want{t.Fatal(tc,got)}}
}

func TestRemoveAtCopy(t *testing.T) {
 in:=[]int{10,20,30,40};out,ok:=RemoveAtCopy(in,1);if !ok||!reflect.DeepEqual(out,[]int{10,30,40})||!reflect.DeepEqual(in,[]int{10,20,30,40}){t.Fatal(in,out,ok)};out[0]=99;if in[0]!=10{t.Fatal("alias")};if out,ok:=RemoveAtCopy([]int{1},0);!ok||len(out)!=0{t.Fatal(out,ok)};for _,i:=range []int{-1,4}{if out,ok:=RemoveAtCopy(in,i);ok||out!=nil{t.Fatal(i,out,ok)}}
}

func TestTransposeInts(t *testing.T) {
 in:=[][]int{{1,2,3},{4,5,6}};out,ok:=TransposeInts(in);if !ok||!reflect.DeepEqual(out,[][]int{{1,4},{2,5},{3,6}}){t.Fatal(out,ok)};out[0][0]=99;if in[0][0]!=1{t.Fatal("alias")};if out,ok:=TransposeInts([][]int{{1},{2,3}});ok||out!=nil{t.Fatal(out,ok)};for _,m:=range [][][]int{nil,{{},{}}}{if out,ok:=TransposeInts(m);!ok||len(out)!=0{t.Fatal(out,ok)}}
}

func TestBubbleSortInts(t *testing.T) {
 for _,tc:=range []struct{in,want []int}{{[]int{5,2,4},[]int{2,4,5}},{[]int{3,3,-1},[]int{-1,3,3}},{nil,nil},{[]int{1},[]int{1}},{[]int{4,3,2,1},[]int{1,2,3,4}}}{BubbleSortInts(tc.in);if !reflect.DeepEqual(tc.in,tc.want){t.Fatal(tc)}}
}

func TestInsertionSortInts(t *testing.T) {
 for _,tc:=range []struct{in,want []int}{{[]int{4,2,3},[]int{2,3,4}},{[]int{3,-1,3},[]int{-1,3,3}},{nil,nil},{[]int{1},[]int{1}},{[]int{4,3,2,1},[]int{1,2,3,4}}}{InsertionSortInts(tc.in);if !reflect.DeepEqual(tc.in,tc.want){t.Fatal(tc)}}
}

func TestSortedIntsCopy(t *testing.T) {
 in:=[]int{7,2,5,-1,2};out:=SortedIntsCopy(in);if !reflect.DeepEqual(out,[]int{-1,2,2,5,7})||!reflect.DeepEqual(in,[]int{7,2,5,-1,2}){t.Fatal(in,out)};out[0]=99;if in[0]!=7||in[3]!=-1{t.Fatal("alias")};if len(SortedIntsCopy(nil))!=0{t.Fatal("empty")}
}

func TestMergeSortedInts(t *testing.T) {
 for _,tc:=range []struct{a,b,want []int}{{[]int{1,4},[]int{2,3,5},[]int{1,2,3,4,5}},{[]int{1,1},[]int{1},[]int{1,1,1}},{nil,[]int{2},[]int{2}},{[]int{1,2},nil,[]int{1,2}}}{got:=MergeSortedInts(tc.a,tc.b);if !reflect.DeepEqual(got,tc.want){t.Fatal(tc,got)}};a,b:=[]int{1},[]int{2};out:=MergeSortedInts(a,b);out[0],out[1]=9,9;if a[0]!=1||b[0]!=2{t.Fatal("alias")};if len(MergeSortedInts(nil,nil))!=0{t.Fatal("empty")}
}

func TestInsertAtCopy(t *testing.T) {
 in:=[]int{10,20,30};out,ok:=InsertAtCopy(in,1,99);if !ok||!reflect.DeepEqual(out,[]int{10,99,20,30})||!reflect.DeepEqual(in,[]int{10,20,30}){t.Fatal(in,out,ok)};out[0]=0;if in[0]!=10{t.Fatal("alias")};for _,tc:=range []struct{v []int;i,x int;want []int}{{nil,0,7,[]int{7}},{[]int{1},1,2,[]int{1,2}},{[]int{1},0,2,[]int{2,1}}}{out,ok:=InsertAtCopy(tc.v,tc.i,tc.x);if !ok||!reflect.DeepEqual(out,tc.want){t.Fatal(tc,out,ok)}};for _,i:=range []int{-1,4}{out,ok:=InsertAtCopy(in,i,0);if ok||out!=nil{t.Fatal(i,out,ok)}}
}

func TestIntersectInts(t *testing.T) {
 a,b:=[]int{3,1,3,2},[]int{2,3};if got:=IntersectInts(a,b);!reflect.DeepEqual(got,[]int{3,2}){t.Fatal(got)};if !reflect.DeepEqual(a,[]int{3,1,3,2})||!reflect.DeepEqual(b,[]int{2,3}){t.Fatal("modified inputs")};if got:=IntersectInts([]int{1,1},[]int{1,1});!reflect.DeepEqual(got,[]int{1}){t.Fatal(got)};if len(IntersectInts([]int{1},[]int{2}))!=0||len(IntersectInts(nil,b))!=0{t.Fatal("empty")}
}

func TestDifferenceInts(t *testing.T) {
 a,b:=[]int{3,1,3,2,4},[]int{1,4};if got:=DifferenceInts(a,b);!reflect.DeepEqual(got,[]int{3,2}){t.Fatal(got)};if !reflect.DeepEqual(a,[]int{3,1,3,2,4})||!reflect.DeepEqual(b,[]int{1,4}){t.Fatal("modified inputs")};if got:=DifferenceInts([]int{1,1},nil);!reflect.DeepEqual(got,[]int{1}){t.Fatal(got)};if len(DifferenceInts([]int{1},[]int{1}))!=0||len(DifferenceInts(nil,b))!=0{t.Fatal("empty")}
}

func TestMergeQuotas(t *testing.T) {
 a,b:=map[string]int{"x":5,"y":2},map[string]int{"x":0,"z":7};out:=MergeQuotas(a,b);if !reflect.DeepEqual(out,map[string]int{"x":0,"y":2,"z":7}){t.Fatal(out)};out["y"]=99;out["z"]=99;if !reflect.DeepEqual(a,map[string]int{"x":5,"y":2})||!reflect.DeepEqual(b,map[string]int{"x":0,"z":7}){t.Fatal("alias",a,b)};if out:=MergeQuotas(nil,nil);out==nil||len(out)!=0{t.Fatal("empty",out)};if out:=MergeQuotas(nil,b);!reflect.DeepEqual(out,b){t.Fatal(out)}
}

func TestGroupByLength(t *testing.T) {
 in:=[]string{"a","go","b","go","я",""};want:=map[int][]string{1:{"a","b"},2:{"go","go","я"},0:{""}};out:=GroupByLength(in);if !reflect.DeepEqual(out,want){t.Fatal(out)};out[1][0]="changed";if in[0]!="a"{t.Fatal("alias")};if out:=GroupByLength(nil);out==nil||len(out)!=0{t.Fatal("empty",out)}
}

func TestRemoveLowQuotas(t *testing.T) {
 q:=map[string]int{"a":1,"b":3,"c":5};if got:=RemoveLowQuotas(q,3);got!=1||!reflect.DeepEqual(q,map[string]int{"b":3,"c":5}){t.Fatal(got,q)};if RemoveLowQuotas(nil,3)!=0{t.Fatal("nil")};q=map[string]int{"a":-1,"b":0};if got:=RemoveLowQuotas(q,1);got!=2||len(q)!=0{t.Fatal(got,q)};if RemoveLowQuotas(q,1)!=0{t.Fatal("empty")}
}

func TestCloneGroups(t *testing.T) {
 in:=map[string][]int{"a":{1,2},"nil":nil,"empty":{}};out:=CloneGroups(in);if !reflect.DeepEqual(in,out){t.Fatal(in,out)};out["a"][0]=99;out["new"]=[]int{8};if in["a"][0]!=1||len(in)!=3{t.Fatal("alias",in)};if out["nil"]!=nil||out["empty"]==nil{t.Fatal("nil contract")};if out:=CloneGroups(nil);out==nil||len(out)!=0{t.Fatal(out)};shared:=[]int{5};cl:=CloneGroups(map[string][]int{"x":shared,"y":shared});cl["x"][0]=8;if cl["y"][0]!=5||shared[0]!=5{t.Fatal("shared")}
}

func TestSortedQuotaKeys(t *testing.T) {
 q:=map[string]int{"z":7,"a":2,"m":0,"":1};want:=[]string{"","a","m","z"};for i:=0;i<5;i++{if got:=SortedQuotaKeys(q);!reflect.DeepEqual(got,want){t.Fatal(got)}};if !reflect.DeepEqual(q,map[string]int{"z":7,"a":2,"m":0,"":1}){t.Fatal("modified")};if len(SortedQuotaKeys(nil))!=0{t.Fatal("nil")}
}

func TestRecursiveSum(t *testing.T) {
 for _,tc:=range []struct{in []int;want int}{{nil,0},{[]int{4},4},{[]int{2,3,4},9},{[]int{-3,2},-1},{[]int{0,0},0}}{if got:=RecursiveSum(tc.in);got!=tc.want{t.Fatal(tc,got)}}
}

func TestDivideParts(t *testing.T) {
 for _,tc:=range []struct{a,b,q,r int;ok bool}{{7,3,2,1,true},{-7,3,-2,-1,true},{7,-3,-2,1,true},{0,4,0,0,true},{7,0,0,0,false}}{q,r,ok:=DivideParts(tc.a,tc.b);if q!=tc.q||r!=tc.r||ok!=tc.ok{t.Fatal(tc,q,r,ok)}}
}

func TestFinalScore(t *testing.T) {
 for _,tc:=range []struct{base,bonus,want int}{{10,3,13},{0,5,5},{3,-2,1},{2,0,2}}{if got:=FinalScore(tc.base,tc.bonus);got!=tc.want{t.Fatal(tc,got)}}
}

func TestAddToValue(t *testing.T) {
 x:=10;if !AddToValue(&x,3)||x!=13{t.Fatal(x)};if !AddToValue(&x,-5)||x!=8{t.Fatal(x)};if AddToValue(nil,1){t.Fatal("nil")};if !AddToValue(&x,0)||x!=8{t.Fatal(x)}
}

func TestFindIntPointer(t *testing.T) {
 in:=[]int{8,3,3};p:=FindIntPointer(in,3);if p!=&in[1]{t.Fatal("wrong address")};*p=99;if !reflect.DeepEqual(in,[]int{8,99,3}){t.Fatal(in)};if FindIntPointer(in,7)!=nil||FindIntPointer(nil,1)!=nil{t.Fatal("missing")}
}

func TestReverseRunes(t *testing.T) {
 for _,tc:=range []struct{s,want string}{{"Aя🙂","🙂яA"},{"abc","cba"},{"",""},{"я","я"},{"e\u0301","\u0301e"},{string([]byte{0xff,65}),"A\uFFFD"}}{if got:=ReverseRunes(tc.s);got!=tc.want{t.Fatal(tc,got)}}
}

func TestIsRunePalindrome(t *testing.T) {
 for _,tc:=range []struct{s string;want bool}{{"топот",true},{"🙂a🙂",true},{"Abba",false},{"abba",true},{"abc",false},{"",true},{"я",true},{"a a",true},{"a a ",false},{"\u00e9e\u0301",false}}{if got:=IsRunePalindrome(tc.s);got!=tc.want{t.Fatal(tc,got)}}
}

func TestCountOccurrences(t *testing.T) {
 for _,tc:=range []struct{s,n string;want int}{{"aaaaa","aa",2},{"я-я-я","я",3},{"ababa","aba",1},{"abc","",0},{"abc","x",0},{"","a",0},{"Aaa","a",2},{"abc","abc",1}}{if got:=CountOccurrences(tc.s,tc.n);got!=tc.want{t.Fatal(tc,got)}}
}

func TestAppendInt(t *testing.T) {
 s:=[]int{1,2};if !AppendInt(&s,3)||!reflect.DeepEqual(s,[]int{1,2,3}){t.Fatal(s)};var n []int;if !AppendInt(&n,5)||!reflect.DeepEqual(n,[]int{5}){t.Fatal(n)};if AppendInt(nil,1){t.Fatal("nil pointer")};spare:=make([]int,1,4);spare[0]=7;if !AppendInt(&spare,8)||!reflect.DeepEqual(spare,[]int{7,8}){t.Fatal(spare)}
}

func TestNormalizeSpaces(t *testing.T) {
 for _,tc:=range []struct{s,want string}{{"  Go\t backend\n","Go backend"},{"a\u00a0b\u2003c","a b c"},{"\t \n",""},{"",""},{"Hello,  WORLD","Hello, WORLD"},{"one","one"}}{if got:=NormalizeSpaces(tc.s);got!=tc.want{t.Fatal(tc,got)}}
}

func TestRuneFrequency(t *testing.T) {
 for _,tc:=range []struct{s string;want map[rune]int}{{"яAя🙂",map[rune]int{'я':2,'A':1,'🙂':1}},{"Aa ",map[rune]int{'A':1,'a':1,' ':1}},{"",map[rune]int{}},{string([]byte{0xff,0xfe}),map[rune]int{'\uFFFD':2}},{"e\u0301",map[rune]int{'e':1,'\u0301':1}}}{if got:=RuneFrequency(tc.s);!reflect.DeepEqual(got,tc.want){t.Fatal(tc,got)}}
}

func TestAreRuneAnagrams(t *testing.T) {
 for _,tc:=range []struct{a,b string;want bool}{{"кот","ток",true},{"aab","abb",false},{"🙂я","я🙂",true},{"Ab","ba",false},{"","",true},{"a","",false},{"","a",false},{"aa","a",false},{"a b","ba ",true},{"\u00e9","e\u0301",false},{string([]byte{0xff}),"\uFFFD",true}}{if got:=AreRuneAnagrams(tc.a,tc.b);got!=tc.want{t.Fatal(tc,got)}}
}

func TestCloneQuotaConfig(t *testing.T) {
 n:=10;in:=QuotaConfig{Name:"api",Limit:&n};out:=CloneQuotaConfig(in);if out.Name!="api"||out.Limit==nil||out.Limit==in.Limit||*out.Limit!=10{t.Fatal(out)};*out.Limit=99;if n!=10{t.Fatal("alias")};out=CloneQuotaConfig(QuotaConfig{Name:"empty"});if out.Name!="empty"||out.Limit!=nil{t.Fatal(out)}
}

func TestSumIntTree(t *testing.T) {
 root:=&IntTree{Value:5,Left:&IntTree{Value:2,Right:&IntTree{Value:-1}},Right:&IntTree{Value:7}};if got:=SumIntTree(root);got!=13{t.Fatal(got)};if SumIntTree(nil)!=0||SumIntTree(&IntTree{Value:-4})!=-4{t.Fatal("base cases")};if root.Left.Right.Value!=-1||root.Right.Value!=7{t.Fatal("modified tree")}
}

func TestEqualNames(t *testing.T) {
 for _,tc:=range []struct{a,b string;want bool}{{"Go","gO",true},{"Я","я",true},{"Σ","ς",true},{"K","K",true},{"Go"," Go",false},{"ß","SS",false},{"é","e\u0301",false},{"","",true},{"a","b",false}}{if got:=EqualNames(tc.a,tc.b);got!=tc.want{t.Fatal(tc,got)}}
}

func TestLimitedWindow(t *testing.T) {
 in:=[]int{10,20,30,40,50};out,ok:=LimitedWindow(in,1,3);if !ok||!reflect.DeepEqual(out,[]int{20,30})||cap(out)!=2{t.Fatal(out,ok,cap(out))};out[0]=21;if in[1]!=21{t.Fatal("expected shared elements")};out=append(out,99);if in[3]!=40{t.Fatal("overwritten tail")};for _,p:=range [][2]int{{-1,2},{2,1},{0,6}}{v,ok:=LimitedWindow(in,p[0],p[1]);if ok||v!=nil{t.Fatal(p,v,ok)}};v,ok:=LimitedWindow(nil,0,0);if !ok||len(v)!=0||cap(v)!=0{t.Fatal(v,ok)}
}

func TestRepeatLabel(t *testing.T) {
 for _,tc:=range []struct{s string;n int;want string}{{"go",3,"go,go,go"},{"я",2,"я,я"},{"x",1,"x"},{"",3,",,"},{"x",0,""},{"x",-2,""}}{if got:=RepeatLabel(tc.s,tc.n);got!=tc.want{t.Fatal(tc,got)}}
}

func TestTruncateUTF8Bytes(t *testing.T) {
 for _,tc:=range []struct{s string;n int;want string}{{"AяB",2,"A"},{"AяB",3,"Aя"},{"🙂x",3,""},{"🙂x",4,"🙂"},{"abc",2,"ab"},{"я",1,""},{"",5,""},{"abc",0,""},{"abc",-1,""},{"я",100,"я"}}{if got:=TruncateUTF8Bytes(tc.s,tc.n);got!=tc.want{t.Fatalf("%q limit %d: %q != %q",tc.s,tc.n,got,tc.want)}}
}

func TestKeepPositiveInPlace(t *testing.T) {
 in:=[]int{-1,3,0,5};out:=KeepPositiveInPlace(in);if !reflect.DeepEqual(out,[]int{3,5})||&out[0]!=&in[0]{t.Fatal(in,out)};out[0]=9;if in[0]!=9{t.Fatal("not shared")};if len(KeepPositiveInPlace(nil))!=0||len(KeepPositiveInPlace([]int{0,-1}))!=0{t.Fatal("empty")};if got:=KeepPositiveInPlace([]int{2,1,2});!reflect.DeepEqual(got,[]int{2,1,2}){t.Fatal(got)}
}

func TestDetachByteWindow(t *testing.T) {
 in:=[]byte("ABCDEF");out,ok:=DetachByteWindow(in,2,4);if !ok||string(out)!="CD"||cap(out)!=2{t.Fatal(out,ok)};out[0]='X';if string(in)!="ABCDEF"{t.Fatal("alias",in)};in[3]='Y';if string(out)!="XD"{t.Fatal(out)};for _,p:=range [][2]int{{-1,2},{4,3},{0,7}}{v,ok:=DetachByteWindow(in,p[0],p[1]);if ok||v!=nil{t.Fatal(p,v,ok)}};v,ok:=DetachByteWindow(nil,0,0);if !ok||v==nil||len(v)!=0||cap(v)!=0{t.Fatal(v,ok)}
}

func TestTwoSumIndices(t *testing.T) {
 for _,tc:=range []struct{v []int;target,i,j int;ok bool}{{[]int{3,1,4,2},5,1,2,true},{[]int{3,3},6,0,1,true},{[]int{3},6,-1,-1,false},{[]int{1,1,4},5,0,2,true},{[]int{-2,5,4},3,0,1,true},{nil,0,-1,-1,false},{[]int{0,0},0,0,1,true}}{i,j,ok:=TwoSumIndices(tc.v,tc.target);if i!=tc.i||j!=tc.j||ok!=tc.ok{t.Fatal(tc,i,j,ok)}}
}

func TestFirstUniqueRune(t *testing.T) {
 for _,tc:=range []struct{s string;r rune;ok bool}{{"яAя🙂A",'🙂',true},{"aabb",0,false},{"",0,false},{"abac",'b',true},{"\x00aa",0,true},{"Aa",'A',true},{string([]byte{0xff,65,0xfe}),'A',true}}{r,ok:=FirstUniqueRune(tc.s);if r!=tc.r||ok!=tc.ok{t.Fatal(tc,r,ok)}}
}

func TestMaxWindowSum(t *testing.T) {
 for _,tc:=range []struct{v []int;k,want int;ok bool}{{[]int{2,1,5,3,2},3,10,true},{[]int{-5,-2,-7},2,-7,true},{[]int{9,1,2},2,10,true},{[]int{2,3},2,5,true},{[]int{-5,-1},1,-1,true},{nil,1,0,false},{[]int{1},0,0,false},{[]int{1},2,0,false},{[]int{1},-1,0,false}}{got,ok:=MaxWindowSum(tc.v,tc.k);if got!=tc.want||ok!=tc.ok{t.Fatal(tc,got,ok)}}
}

func TestSummarizeEventStatuses(t *testing.T) {
 in:=[]string{" Active ","cancelled","ACTIVE"," ","Pending"};order,counts:=SummarizeEventStatuses(in);if !reflect.DeepEqual(order,[]string{"active","cancelled","pending"})||!reflect.DeepEqual(counts,map[string]int{"active":2,"cancelled":1,"pending":1}){t.Fatal(order,counts)};if !reflect.DeepEqual(in,[]string{" Active ","cancelled","ACTIVE"," ","Pending"}){t.Fatal("modified input")};order[0]="x";if in[0]!=" Active "{t.Fatal("alias")};for _,v:=range [][]string{nil,{"","\t","\u00a0"}}{order,counts:=SummarizeEventStatuses(v);if order==nil||counts==nil||len(order)!=0||len(counts)!=0{t.Fatal(order,counts)}};order,counts=SummarizeEventStatuses([]string{" Я ","я","A","a"});if !reflect.DeepEqual(order,[]string{"я","a"})||!reflect.DeepEqual(counts,map[string]int{"я":2,"a":2}){t.Fatal(order,counts)}
}

func TestServiceQuotaWithLimit(t *testing.T) {
 q:=ServiceQuota{Limit:10};r:=q.WithLimit(20);if r.Limit!=20||q.Limit!=10{t.Fatal(q,r)};for _,n:=range []int{0,-1}{if got:=q.WithLimit(n);got!=q{t.Fatal(got)}};q.SetLimit(30);if q.Limit!=30{t.Fatal(q)}
}

func TestNewServiceProfile(t *testing.T) {
 p:=NewServiceProfile("u1","Go",true);if p.ID!="u1"||p.Name!="Go"||!p.IsActive()||!p.ProfileMeta.Active{t.Fatal(p)};q:=NewServiceProfile("","",false);if q.ID!=""||q.Name!=""||q.IsActive(){t.Fatal(q)}
}

type gymNameRepo struct { name string; err error; calls int; id string }
func (r *gymNameRepo) FindName(id string)(string,error){r.calls++;r.id=id;return r.name,r.err}
func TestLoadUserName(t *testing.T) {
 cause:=errors.New("missing");r:=&gymNameRepo{name:"Alice"};name,err:=LoadUserName(r,"42");if name!="Alice"||err!=nil||r.calls!=1||r.id!="42"{t.Fatal(name,err,r)};r=&gymNameRepo{name:"partial",err:cause};name,err=LoadUserName(r,"99");if name!=""||err==nil||err==cause||!errors.Is(err,cause)||r.calls!=1||r.id!="99"||!strings.Contains(err.Error(),"load user"){t.Fatal(name,err,r)}
}

func TestValueKind(t *testing.T) {
 type UserID int;var p *int;for _,tc:=range []struct{v any;want string}{{nil,"nil"},{"hi","string"},{42,"int"},{true,"bool"},{UserID(42),"other"},{p,"other"},{[]int{1},"other"},{int64(2),"other"}}{if got:=ValueKind(tc.v);got!=tc.want{t.Fatal(tc,got)}}
}

func TestExtractServiceCode(t *testing.T) {
 e:=&ServiceCodeError{Code:404};var nilErr *ServiceCodeError;for _,tc:=range []struct{err error;code int;ok bool}{{e,404,true},{fmt.Errorf("load: %w",e),404,true},{errors.Join(errors.New("other"),e),404,true},{&ServiceCodeError{Code:0},0,true},{errors.New("service code 404"),0,false},{nil,0,false},{nilErr,0,false}}{code,ok:=ExtractServiceCode(tc.err);if code!=tc.code||ok!=tc.ok{t.Fatal(code,ok,tc.code,tc.ok)}}
}

func TestResetIfNeeded(t *testing.T) {
 c:=&ResetCounter{Count:5};if !ResetIfNeeded(c)||c.Count!=0{t.Fatal(c)};if ResetIfNeeded(c)||ResetIfNeeded(nil){t.Fatal("unexpected reset")};c.Count=-2;if !ResetIfNeeded(c)||c.Count!=0{t.Fatal(c)}
}

type gymLabelStore struct { value,written string; readErr,writeErr error; reads,writes int }
func (s *gymLabelStore) ReadLabel()(string,error){s.reads++;return s.value,s.readErr}
func (s *gymLabelStore) WriteLabel(v string)error{s.writes++;s.written=v;return s.writeErr}
func TestCopyLabel(t *testing.T) {
 cause:=errors.New("failed");for _,tc:=range []struct{value string;readErr,writeErr,want error;writes int}{{"go",nil,nil,nil,1},{"",nil,nil,nil,1},{"partial",cause,nil,cause,0},{"go",nil,cause,cause,1}}{s:=&gymLabelStore{value:tc.value,readErr:tc.readErr,writeErr:tc.writeErr};if got:=CopyLabel(s);got!=tc.want||s.reads!=1||s.writes!=tc.writes||(s.writes==1&&s.written!=tc.value){t.Fatal(got,s,tc)}}
}

func TestWrapOperation(t *testing.T) {
 if WrapOperation("load",nil)!=nil{t.Fatal("nil")};cause:=errors.New("timeout");got:=WrapOperation("load",cause);var target *OperationError;if !errors.As(got,&target)||target==nil||target.Op!="load"||target.Cause!=cause||!errors.Is(got,cause)||got.Error()!="load: timeout"{t.Fatal(got,target)}
}

func TestLabelErrorStatus(t *testing.T) {
 for _,tc:=range []struct{err error;want int}{{nil,200},{ErrLabelMissing,404},{fmt.Errorf("load: %w",ErrLabelMissing),404},{ErrLabelConflict,409},{fmt.Errorf("save: %w",ErrLabelConflict),409},{errors.Join(ErrLabelConflict,ErrLabelMissing),404},{errors.New("label missing"),500},{errors.New("unknown"),500}}{if got:=LabelErrorStatus(tc.err);got!=tc.want{t.Fatal(tc.err,got,tc.want)}}
}

func TestReadStringValue(t *testing.T) {
 type Label string;type Alias=string;var p *string;for _,tc:=range []struct{v any;s string;ok bool}{{"Go","Go",true},{"","",true},{Alias("alias"),"alias",true},{42,"",false},{nil,"",false},{p,"",false},{Label("Go"),"",false},{[]byte("Go"),"",false}}{s,ok:=ReadStringValue(tc.v);if s!=tc.s||ok!=tc.ok{t.Fatal(tc,s,ok)}}
}

func TestCombineOperationErrors(t *testing.T) {
 operation:=errors.New("write failed");cleanup:=&ServiceCodeError{Code:42}
 if CombineOperationErrors(nil,nil)!=nil { t.Fatal("expected nil") }
 if CombineOperationErrors(operation,nil)!=operation || CombineOperationErrors(nil,cleanup)!=cleanup { t.Fatal("single cause identity") }
 got:=CombineOperationErrors(operation,cleanup)
 var typed *ServiceCodeError
 if !errors.Is(got,operation)||!errors.Is(got,cleanup)||!errors.As(got,&typed)||typed!=cleanup { t.Fatal("lost cause",got) }
 joined,ok:=got.(interface{Unwrap() []error});if !ok { t.Fatal("expected multiple causes") }; causes:=joined.Unwrap();if len(causes)!=2||causes[0]!=operation||causes[1]!=cleanup { t.Fatal("cause order",causes) }
}

func TestDeferredReleaseOrder(t *testing.T) {
 for _, tc := range []struct{ in, want []string }{
  {[]string{"A","B","C"}, []string{"C","B","A"}},
  {[]string{"A","A"}, []string{"A","A"}},
  {nil, []string{}},
  {[]string{}, []string{}},
 } {
  before := append([]string(nil), tc.in...)
  got := DeferredReleaseOrder(tc.in)
  if !reflect.DeepEqual(got, tc.want) { t.Fatal(tc.in, got, tc.want) }
  if len(tc.in)>0 && !reflect.DeepEqual(tc.in,before) { t.Fatal("input changed") }
 }
}

func TestDeferredStatusTrace(t *testing.T) {
 for _, tc := range []struct{ initial, final string }{{"pending","done"},{"A","A"},{"","done"},{"start",""},{"",""}} {
  got := DeferredStatusTrace(tc.initial,tc.final)
  if !reflect.DeepEqual(got,[]string{tc.initial,tc.final}) { t.Fatal(tc,got) }
 }
}

func TestPanicUnwindTrace(t *testing.T) {
 for i:=0;i<2;i++ { if got:=PanicUnwindTrace(); !reflect.DeepEqual(got,[]string{"inner","outer","recovered"}) { t.Fatal(got) } }
}

func TestRunProtectedWork(t *testing.T) {
 cause:=errors.New("failed")
 calls:=0
 if got:=RunProtectedWork(func()error{calls++;return nil});got!=nil||calls!=1{t.Fatal(got,calls)}
 if got:=RunProtectedWork(func()error{calls++;return cause});got!=cause||calls!=2{t.Fatal(got,calls)}
 if got:=RunProtectedWork(func()error{calls++;panic("boom")});got==nil||got.Error()!="work panic: boom"||calls!=3{t.Fatal(got,calls)}
 if got:=RunProtectedWork(func()error{calls++;panic(cause)});!errors.Is(got,cause)||calls!=4{t.Fatal(got,calls)}
 if got:=RunProtectedWork(func()error{panic(42)});got==nil||got.Error()!="work panic: 42"{t.Fatal(got)}
 if got:=RunProtectedWork(nil);got==nil{t.Fatal("nil callback panic lost")}
}

func TestFilterValues(t *testing.T) {
 in:=[]int{3,2,4,1}; var calls []int
 got:=FilterValues(in,func(v int)bool{calls=append(calls,v);return v%2==0})
 if !reflect.DeepEqual(got,[]int{2,4})||!reflect.DeepEqual(calls,[]int{3,2,4,1})||!reflect.DeepEqual(in,[]int{3,2,4,1}){t.Fatal(got,calls,in)}
 got[0]=99;if in[1]!=2{t.Fatal("alias")}
 if v:=FilterValues([]string(nil),nil);v==nil||len(v)!=0{t.Fatal(v)}
 if v:=FilterValues([][]int{{1},{},{2,3}},func(x []int)bool{return len(x)>1});!reflect.DeepEqual(v,[][]int{{2,3}}){t.Fatal(v)}
 if v:=FilterValues([]int{1},func(int)bool{return false});v==nil||len(v)!=0{t.Fatal(v)}
}

func TestSumSigned(t *testing.T) {
 type Quantity int64
 type Count int
 if got:=SumSigned([]int{5,-2,4});got!=7{t.Fatal(got)}
 if got:=SumSigned([]int64{-5,2});got!=-3{t.Fatal(got)}
 if got:=SumSigned([]Quantity{5,-2});reflect.TypeOf(got)!=reflect.TypeOf(Quantity(0))||got!=3{t.Fatal(got)}
 if got:=SumSigned([]Count{-2,-3});got!=-5{t.Fatal(got)}
 if got:=SumSigned([]Quantity(nil));got!=0{t.Fatal(got)}
}

func TestCloneNamedSlice(t *testing.T) {
 type Labels []string
 in:=Labels{"go","api"};got:=CloneNamedSlice(in)
 if reflect.TypeOf(got)!=reflect.TypeOf(in)||!reflect.DeepEqual(got,in){t.Fatal(got)}
 got[0]="changed";if in[0]!="go"{t.Fatal("alias")}
 if v:=CloneNamedSlice(Labels(nil));v!=nil{t.Fatal(v)}
 if v:=CloneNamedSlice(Labels{});v==nil||len(v)!=0{t.Fatal(v)}
 n:=7;ptrs:=[]*int{&n};cp:=CloneNamedSlice(ptrs);if cp[0]!=ptrs[0]{t.Fatal("not shallow")};cp[0]=nil;if ptrs[0]==nil{t.Fatal("alias")}
}

func TestGroupValues(t *testing.T) {
 in:=[]string{"go","api","db","go"};var calls []string
 got:=GroupValues(in,func(v string)int{calls=append(calls,v);return len(v)})
 if !reflect.DeepEqual(got,map[int][]string{2:{"go","db","go"},3:{"api"}})||!reflect.DeepEqual(calls,in){t.Fatal(got,calls)}
 got[2][0]="changed";if in[0]!="go"{t.Fatal("alias")}
 if v:=GroupValues([]string(nil),(func(string)int)(nil));v==nil||len(v)!=0{t.Fatal(v)}
 type item struct{ ID int; Status string }
 if v:=GroupValues([]item{{1,"ok"},{2,"ok"},{3,"bad"}},func(x item)string{return x.Status});len(v["ok"])!=2||v["ok"][1].ID!=2{t.Fatal(v)}
}

func TestTransformValues(t *testing.T) {
 in:=[]int{7,12,-1};var calls []int
 got:=TransformValues(in,func(v int)string{calls=append(calls,v);return fmt.Sprint(v)})
 if !reflect.DeepEqual(got,[]string{"7","12","-1"})||!reflect.DeepEqual(calls,in)||!reflect.DeepEqual(in,[]int{7,12,-1}){t.Fatal(got,calls,in)}
 if v:=TransformValues([]int(nil),(func(int)string)(nil));v==nil||len(v)!=0{t.Fatal(v)}
 same:=TransformValues(in,func(v int)int{return v});same[0]=99;if in[0]!=7{t.Fatal("alias")}
}

func TestCommonDistinct(t *testing.T) {
 first:=[]string{"b","a","b","c"};second:=[]string{"a","b","b"}
 got:=CommonDistinct(first,second)
 if !reflect.DeepEqual(got,[]string{"b","a"})||!reflect.DeepEqual(first,[]string{"b","a","b","c"})||!reflect.DeepEqual(second,[]string{"a","b","b"}){t.Fatal(got,first,second)}
 got[0]="x";if first[0]!="b"{t.Fatal("alias")}
 if v:=CommonDistinct([]int(nil),[]int{1});v==nil||len(v)!=0{t.Fatal(v)}
 type Key struct{ID int}
 if v:=CommonDistinct([]Key{{2},{1},{2}},[]Key{{1},{2}});!reflect.DeepEqual(v,[]Key{{2},{1}}){t.Fatal(v)}
}

func TestDeliveryDependency(t *testing.T) {
 cause:=errors.New("offline")
 var messages []string
 s:=NewDeliveryService(DeliverySenderFunc(func(text string)error{messages=append(messages,text);return cause}))
 if s==nil{t.Fatal("nil service")}
 if err:=s.Deliver("hello");err!=cause{t.Fatal(err)}
 if err:=s.Deliver("");err!=cause{t.Fatal(err)}
 if !reflect.DeepEqual(messages,[]string{"hello",""}){t.Fatal(messages)}
 calls:=0
 other:=NewDeliveryService(DeliverySenderFunc(func(text string)error{calls++;if text!="other"{t.Fatal(text)};return nil}))
 if other==nil||other.Deliver("other")!=nil||calls!=1||len(messages)!=2{t.Fatal("dependency not isolated")}
}

func TestAdaptEventHandler(t *testing.T) {
 cause:=errors.New("callback failed");var received []string
 h:=AdaptEventHandler(func(event string)error{received=append(received,event);return cause})
 if h==nil||len(received)!=0{t.Fatal("adapter must not call callback")}
 if err:=h.Handle("created");err!=cause{t.Fatal(err)}
 if err:=h.Handle("");err!=cause{t.Fatal(err)}
 if !reflect.DeepEqual(received,[]string{"created",""}){t.Fatal(received)}
 var direct EventHandler=EventHandlerFunc(func(string)error{return nil})
 if direct.Handle("ok")!=nil{t.Fatal("unexpected error")}
}

func TestSafeValueEqual(t *testing.T) {
 type Box struct{ V any }
 var p *int
 for _,tc:=range []struct{a,b any; equal,ok bool}{
 {nil,nil,true,true},{nil,[]int{},false,true},{7,7,true,true},{7,8,false,true},
 {7,int64(7),false,true},{[]int{1},"1",false,true},{[]int{1},[]int{1},false,false},
 {map[string]int{},map[string]int{},false,false},{func(){},func(){},false,false},
 {Box{[]int{1}},Box{[]int{1}},false,false},{Box{7},Box{7},true,true},
 {Box{7},Box{[]int{1}},false,false},{p,nil,false,true},{p,p,true,true},
 }{equal,ok:=SafeValueEqual(tc.a,tc.b);if equal!=tc.equal||ok!=tc.ok{t.Fatal(tc,equal,ok)}}
}

func TestCaptureQuotaReaders(t *testing.T) {
 q:=&MethodQuota{Limit:10};snapshot,live:=CaptureQuotaReaders(q)
 if snapshot==nil||live==nil{t.Fatal("missing readers")}
 if snapshot()!=10||live()!=10{t.Fatal("initial values")}
 q.Limit=25;if snapshot()!=10||live()!=25{t.Fatal("receiver capture",snapshot(),live())}
 other:=&MethodQuota{Limit:3};s2,l2:=CaptureQuotaReaders(other)
 if s2==nil||l2==nil{t.Fatal("missing second readers")}
 other.Limit=-2;if s2()!=3||l2()!=-2||live()!=25{t.Fatal("independent receivers")}
}

func TestApplyMetricDeltas(t *testing.T) {
 c:=&MetricCounter{Value:10};in:=[]int{2,-3,5}
 got:=ApplyMetricDeltas(c,in)
 if !reflect.DeepEqual(got,[]int{12,9,14})||c.Value!=14||!reflect.DeepEqual(in,[]int{2,-3,5}){t.Fatal(got,c.Value,in)}
 if v:=ApplyMetricDeltas(c,nil);v==nil||len(v)!=0||c.Value!=14{t.Fatal(v,c.Value)}
 other:=&MetricCounter{Value:-2}
 if v:=ApplyMetricDeltas(other,[]int{0,-4});!reflect.DeepEqual(v,[]int{-2,-6})||other.Value!=-6||c.Value!=14{t.Fatal(v,other.Value,c.Value)}
}

func TestAccessSummaryAllowed(t *testing.T) {
 for _,tc:=range []struct{local,remote,want bool}{{true,true,true},{true,false,false},{false,true,false},{false,false,false}} {
  s:=AccessSummary{LocalAccess:LocalAccess{Enabled:tc.local},RemoteAccess:RemoteAccess{Approved:tc.remote}}
  var decision AccessDecision=s
  if got:=decision.Allowed();got!=tc.want{t.Fatal(tc,got)}
  if s.Enabled!=tc.local||s.Approved!=tc.remote{t.Fatal("input changed")}
 }
}

func TestPublishWorkflow(t *testing.T) {
 invalid:=errors.New("invalid")
 failed:=errors.New("publish failed")
 for _,tc:=range []struct{text string; validateErr,publishErr,want error; calls []string}{
 {"event",nil,nil,nil,[]string{"validate:event","publish:event"}},
 {"bad",invalid,nil,invalid,[]string{"validate:bad"}},
 {"event",nil,failed,failed,[]string{"validate:event","publish:event"}},
 {"",nil,nil,nil,[]string{"validate:","publish:"}},
 } {
  var calls []string
  v:=WorkflowValidatorFunc(func(text string)error{calls=append(calls,"validate:"+text);return tc.validateErr})
  p:=WorkflowPublisherFunc(func(text string)error{calls=append(calls,"publish:"+text);return tc.publishErr})
  w:=NewPublishWorkflow(v,p)
  if w==nil||len(calls)!=0{t.Fatal("constructor must only store dependencies")}
  if got:=w.Publish(tc.text);got!=tc.want||!reflect.DeepEqual(calls,tc.calls){t.Fatal(tc,got,calls)}
 }
}

func TestProcessDeliveryBatch(t *testing.T) {
 e1,e2:=errors.New("offline"),errors.New("denied")
 ids:=[]string{"A","B","C","B"}; var calls []string
 got,err:=ProcessDeliveryBatch(ids,func(id string)error{calls=append(calls,id);if id=="B"{if len(calls)==2{return e1};return e2};return nil})
 if !reflect.DeepEqual(got,[]string{"A","C"})||!reflect.DeepEqual(calls,ids)||!reflect.DeepEqual(ids,[]string{"A","B","C","B"})||!errors.Is(err,e1)||!errors.Is(err,e2){t.Fatal(got,err,calls)}
 joined,ok:=err.(interface{Unwrap() []error});if !ok{t.Fatal(err)}
 causes:=joined.Unwrap();if len(causes)!=2||causes[0].Error()!="item 1 (B): offline"||causes[1].Error()!="item 3 (B): denied"{t.Fatal(causes)}
 got[0]="X";if ids[0]!="A"{t.Fatal("alias")}
 if v,e:=ProcessDeliveryBatch(nil,nil);v==nil||len(v)!=0||e!=nil{t.Fatal(v,e)}
 if v,e:=ProcessDeliveryBatch([]string{"X"},func(string)error{return nil});!reflect.DeepEqual(v,[]string{"X"})||e!=nil{t.Fatal(v,e)}
}

func TestTransformChecked(t *testing.T) {
 cause:=errors.New("invalid"); in:=[]string{"7","bad","9"};var calls []string
 got,err:=TransformChecked(in,func(v string)(int,error){calls=append(calls,v);if v=="bad"{return 123,cause};return 7,nil})
 if got!=nil||!errors.Is(err,cause)||err.Error()!="item 1: invalid"||!reflect.DeepEqual(calls,[]string{"7","bad"})||!reflect.DeepEqual(in,[]string{"7","bad","9"}){t.Fatal(got,err,calls)}
 values:=[]int{2,4};v,e:=TransformChecked(values,func(n int)(int,error){return n*2,nil});if e!=nil||!reflect.DeepEqual(v,[]int{4,8}){t.Fatal(v,e)};v[0]=99;if values[0]!=2{t.Fatal("alias")}
 if v,e:=TransformChecked([]int(nil),(func(int)(string,error))(nil));v==nil||len(v)!=0||e!=nil{t.Fatal(v,e)}
}
