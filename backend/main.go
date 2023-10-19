package main

import (
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

	r.GET("/api/", controllers.Home)
	r.GET("/api/signup", controllers.SignUpPage)
	r.POST("/api/signup", controllers.SignUp)
	r.GET("/api/login", controllers.LoginPage)
	r.POST("/api/login", controllers.Login)

	r.Run()
}
