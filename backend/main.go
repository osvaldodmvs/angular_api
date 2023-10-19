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
	config.AllowAllOrigins = true
	r.Use(cors.New(config))

	r.GET("/", controllers.Home)
	r.GET("/api/signup", controllers.SignUpPage)
	r.POST("/api/signup", controllers.SignUp)
	r.GET("/api/login", controllers.LoginPage)
	r.POST("/api/login", controllers.Login)

	r.Run()
}
