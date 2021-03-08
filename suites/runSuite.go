package suites

import (
	"errors"
	"fmt"
	"github.com/ruxxzebre/combinatorix_labs/events"
	"github.com/ruxxzebre/combinatorix_labs/events/format"
)

type suiteValue struct {
	run   func(int)
	tasks map[int]func()
}

var suites = map[int]suiteValue{
	1: {runSuite1, tasks_1},
	2: {runSuite2, tasks_2},
}

func RunSuite(suite, task int) error {
	events.ChangeDefaultFormat(format.Percentage)
	if suite, ok := suites[suite]; ok {
		suite.run(task)
		return nil
	}
	return errors.New("unknown suite")
}

func GetTaskAmount(suite int) (int, error) {
	if suite, ok := suites[suite]; ok {
		return len(suite.tasks), nil
	}
	return 0, errors.New("unknown suite")
	//return 0, errors.New("unknown suite")
}

func GetSuiteAmount() int {
	return len(suites)
}

type Msg struct {
	msg   string
	value int
}

func (s Msg) Print() {
	fmt.Printf(s.msg, s.value)
}

func NewMsg(msg string, value int) Msg {
	return Msg{
		msg:   msg,
		value: value,
	}
}
