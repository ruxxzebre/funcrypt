package suites

import "fmt"

func runSuite2(num int) {
	fmt.Print(num)
}

func lab21() {

}

var tasks2 = map[int]func(){
	1: lab21,
}
