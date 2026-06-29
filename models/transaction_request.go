package models

import "time"

type TransactionRequest struct {
	Type        string    `json:"type" binding:"required"`
	Amount      float64   `json:"amount" binding:"required"`
	Category    string    `json:"category" binding:"required"`
	Description string    `json:"description"`
	Date        time.Time `json:"date" binding:"required"`
}