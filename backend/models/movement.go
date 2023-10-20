package models

import "gorm.io/gorm"

type Movement struct {
	gorm.Model
	UserID    uint
	Operation string  `json:"operation" form:"operation" binding:"required"`
	Amount    float64 `json:"amount" form:"amount" binding:"required"`
}
