package main

import (
	"github.com/osvaldodmvs/angular_api/backend/initializers"
	"github.com/osvaldodmvs/angular_api/backend/models"
)

func init() {
	initializers.LoadEnv()
	initializers.ConnectToDB()
}

func main() {
	initializers.DB.AutoMigrate(&models.User{})
}
