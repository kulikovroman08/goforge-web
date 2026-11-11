package practice

import (
 "context"
 "errors"
 "reflect"
 "strings"
 "sync"
 "testing"
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
