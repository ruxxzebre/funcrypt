package main

import (
	"errors"
	"fmt"
	"os"
	"strconv"
)

func Lab1_1() {
	whiteBalloons := 3
	blackBalloons := 7
	totalBalloons := 10
	event := newEvent("Balloons", whiteBalloons, totalBalloons)
	_ = event.ChangeProbabilityFormat(Percentage)

	fmt.Printf("White baloons: ")
	fmt.Println(event)

	event.ChangeOccurCount(blackBalloons)
	fmt.Printf("Black baloons: ")
	fmt.Println(event)
}

func Lab1_2() {
	// doesn't really matter how much is Coin10, the ration always be the same
	Coin10 := 1
	Coin2 := Coin10 * 3
	totalCoins := Coin10 + Coin2
	event := newEvent("Coins", Coin10, totalCoins)
	_ = event.ChangeProbabilityFormat(Percentage)

	fmt.Println(event)
}

func Lab1_3() {
	cubesQuantity := 1000
	cubeSides := 3
	event := newEvent("Cubes", 1, cubesQuantity*cubeSides)
	_ = event.ChangeProbabilityFormat(Percentage)
	for i := 1; i <= 3; i++ {
		fmt.Printf("Edges: %v. %v\n", i, event)
		event.ChangeOccurCount(i + 1)
	}
}

// func() or interface{}
var Tasks = map[int]func(){
	1: Lab1_1,
	2: Lab1_2,
	3: Lab1_3,
}

func runTask(num int) error {
	// if Tasks contains num
	if task, ok := Tasks[num]; ok {
		task()
		return nil
	}
	return errors.New("Undefined task: " + strconv.Itoa(num))
}

func main() {
	fmt.Printf("Pass the number of task (can be from 1 to %v): ", len(Tasks))
	var input string
	_, err := fmt.Scanln(&input)
	if err != nil {
		fmt.Print("Something bad happened when scanning, sorry!")
		os.Exit(1)
	}
	taskNum, err := strconv.Atoi(input)
	if err == nil {
		if err = runTask(taskNum); err == nil {
			fmt.Printf("Fine!\n")
		} else {
			fmt.Println("Maybe try to pass an integer?")
		}
	} else {
		fmt.Printf("%v\n", err)
	}
}
