package main

import (
	"fmt"
	"github.com/ruxxzebre/combinatorix_labs/suites"
	"os"
	"strconv"
)

func main() {
	suiteMsg := suites.NewMsg("Pass the number of suite (can be from 1 to %v): ", suites.GetSuiteAmount())
	suiteMsg.Print()
	var suiteNumInput string
	_, err := fmt.Scanln(&suiteNumInput)
	suiteNum, _ := strconv.Atoi(suiteNumInput)

	if err != nil {
		fmt.Print("Something bad happened when scanning, sorry!")
		os.Exit(1)
	}

	_taskAm, _ := suites.GetTaskAmount(suiteNum)
	taskMsg := suites.NewMsg("Pass the number of task (can be from 1 to %v): ", _taskAm)
	taskMsg.Print()
	var taskNumInput string
	_, err = fmt.Scanln(&taskNumInput)
	taskNum, _ := strconv.Atoi(taskNumInput)

	if err != nil {
		fmt.Print("Something bad happened when scanning, sorry!")
		os.Exit(1)
	}

	if err = suites.RunSuite(suiteNum, taskNum); err == nil {
		fmt.Printf("Fine!\n")
	} else {
		fmt.Println("Maybe try to pass an integer?")
	}
}
