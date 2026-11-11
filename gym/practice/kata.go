package practice

import (
 "context"
 "errors"
 "fmt"
 "io"
 "encoding/json"
 "strings"
 "sync"
)

func UniqueUsers(ids []string) []string { return nil }

type Event struct{ ID, Status string }
func Active(events []Event) []Event { return nil }

func WithContext(err error) error { return err }

type CreateEventRequest struct {
 Title string `json:"title"`
 OwnerID string `json:"owner_id"`
}
func DecodeEvent(r io.Reader) (CreateEventRequest, error) {
 _ = json.NewDecoder
 _ = strings.TrimSpace
 _ = errors.New
 return CreateEventRequest{}, nil
}

func Page(ids []string, offset, limit int) []string { return nil }

func Retry(ctx context.Context, fn func() error) error {
 _ = ctx; _ = fn
 return nil
}

type Counter struct { value int; mu sync.Mutex }
func (c *Counter) Inc() { c.value++ }
func (c *Counter) Value() int { return c.value }

type MyError struct {}
func (*MyError) Error() string { return "failed" }
func MaybeError(fail bool) error {
 var e *MyError
 if fail { e=&MyError{} }
 return e
}

var _ = fmt.Sprintf
