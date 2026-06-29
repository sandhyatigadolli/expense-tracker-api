package models

import "time"

type Transaction struct {
	ID          uint      `gorm:"primaryKey" json:"id"`
	UserID      uint      `json:"user_id"`
	Type        string    `gorm:"type:varchar(20);not null" json:"type"`
	Amount      float64   `gorm:"not null" json:"amount"`
	Category    string    `gorm:"type:varchar(100);not null" json:"category"`
	Description string    `gorm:"type:text" json:"description"`
	Date        time.Time `gorm:"not null" json:"date"`
	CreatedAt   time.Time `json:"created_at"`
}