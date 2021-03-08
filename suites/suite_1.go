package suites

import (
	"errors"
	"fmt"
	"github.com/ruxxzebre/combinatorix_labs/events"
	"log"
	"math"
	"strconv"
)

func lab11() {
	whiteBalloons := 3
	blackBalloons := 7
	totalBalloons := 10
	event := events.NewEvent("Balloons", whiteBalloons, totalBalloons)

	fmt.Printf("White baloons: ")
	fmt.Println(event)

	event.ChangeOccurCount(blackBalloons)
	fmt.Printf("Black baloons: ")
	fmt.Println(event)
}

func lab12() {
	// doesn't really matter how much is Coin10, the ration always be the same
	Coin10 := 1
	Coin2 := Coin10 * 3
	totalCoins := Coin10 + Coin2
	event := events.NewEvent("Coins", Coin10, totalCoins)

	fmt.Println(event)
}

func lab13() {
	cubesQuantity := 1000
	cubeSides := 3
	event := events.NewEvent("Cubes", 1, cubesQuantity*cubeSides)

	for i := 1; i <= 3; i++ {
		fmt.Printf("Edges: %v. %v\n", i, event)
		event.ChangeOccurCount(i + 1)
	}
}

func lab14() {
	const lessThan = 10
	notDividingBy2And3 := lessThan - math.Floor(lessThan/2-lessThan/3)
	fmt.Println(notDividingBy2And3)
}

func lab15() {
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

var tasks1 = map[int]func(){
	1: lab11,
	2: lab12,
	3: lab13,
	4: lab14,
	5: lab15,
}

func runSuite1(num int) {
	err := runTask(num)
	if err != nil {
		log.Fatal(err)
	}
}

func runTask(num int) error {
	if task, ok := tasks1[num]; ok {
		task()
		return nil
	}
	return errors.New("Undefined task: " + strconv.Itoa(num))
}
