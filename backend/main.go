package main

import (
	"github.com/gin-gonic/gin"
	"github.com/osvaldodmvs/angular_api/backend/controllers"
	"github.com/osvaldodmvs/angular_api/backend/initializers"
	// "github.com/osvaldodmvs/angular_api/backend/middleware"
)

func init() {
	initializers.LoadEnv()
	initializers.ConnectToDB()
}

func main() {
	r := gin.Default()

	r.LoadHTMLGlob("templates/**/*")
	r.Static("/assets", "./assets")

	r.GET("/", controllers.Home)
	r.GET("/signup", controllers.SignUpPage)
	r.POST("/signup", controllers.SignUp)
	r.GET("/login", controllers.LoginPage)
	r.POST("/login", controllers.Login)

	r.Run()
}
