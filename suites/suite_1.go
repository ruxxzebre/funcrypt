package suites

import (
	"errors"
	"fmt"
	"github.com/ruxxzebre/combinatorix_labs/events"
	"log"
	"strconv"
)

const suite1TaskAmount = 5

func lab1_1() {
	whiteBalloons := 3
	blackBalloons := 7
	totalBalloons := 10
	event := events.NewEvent("Balloons", whiteBalloons, totalBalloons)
	_ = event.ChangeProbabilityFormat(events.Percentage)

	fmt.Printf("White baloons: ")
	fmt.Println(event)

	event.ChangeOccurCount(blackBalloons)
	fmt.Printf("Black baloons: ")
	fmt.Println(event)
}

func lab1_2() {
	// doesn't really matter how much is Coin10, the ration always be the same
	Coin10 := 1
	Coin2 := Coin10 * 3
	totalCoins := Coin10 + Coin2
	event := events.NewEvent("Coins", Coin10, totalCoins)
	_ = event.ChangeProbabilityFormat(events.Percentage)

	fmt.Println(event)
}

func lab1_3() {
	cubesQuantity := 1000
	cubeSides := 3
	event := events.NewEvent("Cubes", 1, cubesQuantity*cubeSides)
	_ = event.ChangeProbabilityFormat(events.Percentage)
	for i := 1; i <= 3; i++ {
		fmt.Printf("Edges: %v. %v\n", i, event)
		event.ChangeOccurCount(i + 1)
	}
}

func lab1_4() {
	// Chosen number
}

func lab1_5() {
	// TODO!
	condition := func(initial int, conditions ...int) []int {
		intarr := []int{}
		for i := 0; i < initial; i++ {
			for _, cond := range conditions {
				if i%cond == 0 {
					intarr = append(intarr, i)
				}
			}
		}
		return intarr
	}
	firstCondition := condition(10, 2, 3)
	secondCondition := condition(10, 2, 3)
	thirdCondition := condition(10, 2, 3)

	result := [][]int{firstCondition, secondCondition, thirdCondition}
	fmt.Println(result)
}

var tasks = map[int]func(){
	1: lab1_1,
	2: lab1_2,
	3: lab1_3,
	4: lab1_4,
	5: lab1_5,
}

func runSuite1(num int) {
	err := runTask(num)
	if err != nil {
		log.Fatal(err)
	}
}

func runTask(num int) error {
	// if Tasks contains num
	if task, ok := tasks[num]; ok {
		task()
		return nil
	}
	return errors.New("Undefined task: " + strconv.Itoa(num))
}
