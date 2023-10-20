package main

import (
	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
	"github.com/osvaldodmvs/angular_api/backend/controllers"
	"github.com/osvaldodmvs/angular_api/backend/initializers"
	_ "github.com/osvaldodmvs/angular_api/backend/middleware"
)

func init() {
	initializers.LoadEnv()
	initializers.ConnectToDB()
}

func main() {
	r := gin.Default()

	config := cors.DefaultConfig()
	config.AllowOrigins = []string{"http://localhost:4200"}
	config.AllowCredentials = true
	config.AddAllowHeaders("Authorization")
	r.Use(cors.New(config))

	r.POST("/api/signup", controllers.SignUp)
	r.POST("/api/login", controllers.Login)
	r.POST("/api/logout", controllers.Logout)
	r.POST("/api/operation", controllers.Operation)
	r.GET("/api/movements", controllers.Movements)
	r.Run()
}
