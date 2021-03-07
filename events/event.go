package events

import (
	"fmt"
)

type ProbabilityFormat string
type InvalidProbabilityFormat struct {
	Name ProbabilityFormat
}

func (e InvalidProbabilityFormat) Error() string {
	return fmt.Sprintf("%v - is invalid probability format", e.Name)
}

const (
	Percentage ProbabilityFormat = "percentage"
	Float      ProbabilityFormat = "float"
)

type Event struct {
	name          string
	occurCount    int
	totalOutcomes int
	probability   float32
	format        ProbabilityFormat
	formatPostfix string
}

func (r *Event) ChangeOccurCount(count int) {
	r.occurCount = count
	r.probability = float32(r.occurCount) / float32(r.totalOutcomes)
	_ = r.ChangeProbabilityFormat(r.format)
}

func (r *Event) ChangeProbabilityFormat(format ProbabilityFormat) error {
	switch format {
	case Percentage:
		if r.probability > 1.0 {
			r.probability *= 100
			r.formatPostfix = "%"
		}
	case Float:
		if r.probability > 1.0 {
			r.probability /= 100
			r.formatPostfix = ""
		}
	default:
		return InvalidProbabilityFormat{format}
	}
	r.format = format
	return nil
}

func (r Event) String() string {
	return fmt.Sprintf("Probability of '%v' events is %v%v", r.name, r.probability, r.formatPostfix)
}

func NewEvent(name string, occurCount int, totalOutcomes int) *Event {
	return &Event{
		name:          name,
		occurCount:    occurCount,
		totalOutcomes: totalOutcomes,
		probability:   float32(occurCount) / float32(totalOutcomes),
		format:        Float,
		formatPostfix: "",
	}
}
