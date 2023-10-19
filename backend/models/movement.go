package models

import "gorm.io/gorm"

type Movement struct {
	gorm.Model
	UserID    uint    `json:"user_id" form:"user_id" binding:"required"`
	Operation string  `json:"operation" form:"operation" binding:"required"`
	Amount    float64 `json:"amount" form:"amount" binding:"required"`
}
