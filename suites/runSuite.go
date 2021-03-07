package suites

import (
	"errors"
	"fmt"
)

const suitesAmount = 2

func RunSuite(suite, task int) error {
	switch suite {
	case 1:
		runSuite1(task)
		return nil
	case 2:
		runSuite2(task)
		return nil
	}
	return errors.New("unknown suite")
}

func GetTaskAmount(suite int) (int, error) {
	switch suite {
	case 1:
		return suite1TaskAmount, nil
	case 2:
		return suite2TaskAmount, nil
	}
	return 0, errors.New("unknown suite")
}

func GetSuiteAmount() int {
	return suitesAmount
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
