package main

import (
	"encoding/json"
	"log"
	"net/http"
	"time"
)

type MonthlyPlan struct {
	Month          string  `json:"month"`
	TargetReturn   float64 `json:"targetReturn"`
	TargetAmount   float64 `json:"targetAmount"`
	CurrentAmount  float64 `json:"currentAmount"`
	CurrentReturn  float64 `json:"currentReturn"`
	StartDate      string  `json:"startDate"`
	EndDate        string  `json:"endDate"`
	SpecialTargets string  `json:"specialTargets,omitempty"`
}

type PlanData struct {
	MonthlyPlans []MonthlyPlan `json:"monthlyPlans"`
	OverallGoal  float64       `json:"overallGoal"`
	StartAmount  float64       `json:"startAmount"`
	EndDate      string        `json:"endDate"`
}

func main() {
	http.HandleFunc("/api/plans", handlePlans)
	log.Println("Server starting on :8080")
	log.Fatal(http.ListenAndServe(":8080", nil))
}

func handlePlans(w http.ResponseWriter, r *http.Request) {
	plans := PlanData{
		MonthlyPlans: []MonthlyPlan{
			{
				Month:          "March",
				TargetReturn:   24.0,
				TargetAmount:   1000.0,
				CurrentAmount:  30.0,
				CurrentReturn:  0.0,
				StartDate:      "2024-03-01",
				EndDate:        "2024-03-31",
				SpecialTargets: "需要连续17次操作不失误",
			},
			{
				Month:         "April",
				TargetReturn:  12.0,
				TargetAmount:  30000.0,
				CurrentAmount: 1000.0,
				CurrentReturn: 0.0,
				StartDate:     "2024-04-01",
				EndDate:       "2024-04-30",
			},
			{
				Month:         "May",
				TargetReturn:  6.0,
				TargetAmount:  182000.0,
				CurrentAmount: 30000.0,
				CurrentReturn: 0.0,
				StartDate:     "2024-05-01",
				EndDate:       "2024-05-31",
			},
		},
		OverallGoal:  3000000.0,
		StartAmount:  30.0,
		EndDate:      "2024-09-03",
	}

	w.Header().Set("Content-Type", "application/json")
	w.Header().Set("Access-Control-Allow-Origin", "*")
	json.NewEncoder(w).Encode(plans)
}