package operations

func Addition(elems ...float32) float32 {
	var res float32 = 0.0
	for _, elem := range elems {
		res += elem
	}
	return res
}

func Multiplication(elems ...float32) float32 {
	var res float32 = 1.0
	for _, elem := range elems {
		if elem != 0 {
			res *= elem
		}
	}
	return res
}
