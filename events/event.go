package events

import (
	"fmt"
	"github.com/ruxxzebre/combinatorix_labs/events/format"
)

var DefaultFormat format.ProbabilityFormat = ""

func ChangeDefaultFormat(format format.ProbabilityFormat) {
	DefaultFormat = format
}

type Event struct {
	name          string
	occurCount    int
	totalOutcomes int
	probability   float32
	format        format.ProbabilityFormat
}

func (r *Event) ChangeOccurCount(count int) {
	r.occurCount = count
	r.probability = float32(r.occurCount) / float32(r.totalOutcomes)
	r.ChangeProbabilityFormat(r.format)
}

func (r *Event) ChangeProbabilityFormat(format format.ProbabilityFormat) {
	r.format = format
}

func (r Event) String() string {
	return fmt.Sprintf("Probability of '%v' events is %v%v", r.name, r.probability, r.format)
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
