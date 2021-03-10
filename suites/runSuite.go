package suites

import (
	"errors"
	"fmt"
	"github.com/ruxxzebre/combinatorix_labs/events"
	"math"
)

type suiteValue struct {
	run   func(int)
	tasks map[int]func()
}

var suites = map[int]suiteValue{
	1: {runSuite1, tasks1},
	2: {runSuite2, tasks2},
}

func RunSuite(suite, task int) error {
	var Percentage = func(x float32) string {
		if x < 1.0 {
			return fmt.Sprintf("%v%%", math.Floor(float64(x*100)))
		}
		return fmt.Sprintf("%v%", x)
	}
	events.ChangeDefaultFormat(Percentage)
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
