package suites

import (
	"errors"
	"fmt"
	"github.com/ruxxzebre/combinatorix_labs/events"
	"github.com/ruxxzebre/combinatorix_labs/events/operations"
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
	NumsDividingBy2 := int(math.Floor(lessThan / 2))
	NumsDividingBy3 := int(math.Floor(lessThan / 3))
	NumsDividingBy2And3 := NumsDividingBy2 + NumsDividingBy3
	NumsNotDividingBy2 := lessThan - NumsDividingBy2
	NumsNotDividingBy3 := lessThan - NumsDividingBy3

	notDividingBy2 := events.NewEvent("Not div by 2", NumsNotDividingBy2, lessThan)
	notDividingBy3 := events.NewEvent("Not div by 3", NumsNotDividingBy3, lessThan)
	dividingBy2 := events.NewEvent("Div by 2", NumsDividingBy2, lessThan)
	dividingBy3 := events.NewEvent("Div by 3", NumsDividingBy3, lessThan)
	dividingBy2And3 := events.NewEvent("Div by 2 and 3", NumsDividingBy2And3, lessThan)

	NeitherDividingBy2Nor3 := events.CombineEvents(
		"1. Neither div by 2 nor 3",
		operations.Addition,
		notDividingBy3,
		notDividingBy3)
	EitherDividingBy2ORr3 := events.CombineEvents(
		"2. Either div by 2 or 3",
		operations.Multiplication,
		notDividingBy2,
		notDividingBy3)
	DividingBy2_3Or2And3 := events.CombineEvents(
		"3. Div by 2, 3 or 2 and 3",
		operations.Multiplication,
		dividingBy2And3,
		dividingBy2,
		dividingBy3,
	)

	fmt.Println(NeitherDividingBy2Nor3)
	fmt.Println(EitherDividingBy2ORr3)
	fmt.Println(DividingBy2_3Or2And3)
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
