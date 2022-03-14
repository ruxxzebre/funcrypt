package events

import (
	"fmt"
)

type ProbabilityFormat func(float32) string

var DefaultFormat = func(x float32) string { return fmt.Sprintf("%v", x) }

func ChangeDefaultFormat(format ProbabilityFormat) {
	DefaultFormat = format
}

type Event struct {
	name          string
	occurCount    int
	totalOutcomes int
	probability   float32
	format        ProbabilityFormat
}

func (r *Event) ChangeOccurCount(count int) {
	r.occurCount = count
	r.probability = float32(r.occurCount) / float32(r.totalOutcomes)
	r.ChangeProbabilityFormat(r.format)
}

func (r *Event) ChangeProbabilityFormat(format ProbabilityFormat) {
	r.format = format
}

func (r Event) String() string {
	return fmt.Sprintf("Probability of '%v' events is %v", r.name, r.format(r.probability))
}

func NewEvent(name string, occurCount int, totalOutcomes int) *Event {
	return &Event{
		name:          name,
		occurCount:    occurCount,
		totalOutcomes: totalOutcomes,
		probability:   float32(occurCount) / float32(totalOutcomes),
		format:        DefaultFormat,
	}
}

func CombineEvents(name string, op func(...float32) float32, events ...*Event) *Event {
	var probability float32
	for _, event := range events {
		probability = op(event.probability, probability)
	}
	return &Event{
		name:          name,
		occurCount:    1,
		totalOutcomes: 1,
		probability:   probability,
		format:        DefaultFormat,
	}
}
