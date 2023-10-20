package controllers

import (
	"errors"
	"fmt"
	"log"
	"net/http"
	"os"
	"time"

	"github.com/gin-gonic/gin"
	"github.com/golang-jwt/jwt/v5"
	"github.com/osvaldodmvs/angular_api/backend/initializers"
	"github.com/osvaldodmvs/angular_api/backend/models"
	"golang.org/x/crypto/bcrypt"
	"gorm.io/gorm"
)

func SignUp(c *gin.Context) {
	var userData models.User

	if err := c.Bind(&userData); err != nil {
		//if the json is not valid, return a bad request
		log.Println("Error binding JSON: ", err)
		c.JSON(http.StatusBadRequest, gin.H{"message": "Error binding JSON"})
		return
	}

	hashedPassword, err := bcrypt.GenerateFromPassword([]byte(userData.Password), 10)

	if err != nil {
		//if there is an error, print it and return a bad request
		log.Println("Error hashing password: ", err)
		c.JSON(http.StatusBadRequest, gin.H{"message": "Error hashing password"})
		return
	}

	user := models.User{Email: userData.Email, Password: string(hashedPassword), Balance: float64(0)}
	result := initializers.DB.Create(&user)

	if result.Error != nil {
		//if there is an error, print it and return a bad request
		log.Println("Error creating user: ", result.Error)
		c.JSON(http.StatusBadRequest, gin.H{"message": "Error creating user"})
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"message": "User created successfully",
	})
}

func Login(c *gin.Context) {
	var userData models.User

	if err := c.Bind(&userData); err != nil {
		//if the json is not valid, return a bad request
		log.Println("Error binding JSON: ", err)
		c.JSON(http.StatusBadRequest, gin.H{"message": "Error binding JSON"})
		return
	}

	var user models.User

	result := initializers.DB.First(&user, "email = ?", userData.Email)

	if result.Error != nil {
		if errors.Is(result.Error, gorm.ErrRecordNotFound) {
			//id not found
			c.JSON(http.StatusNotFound, gin.H{"message": "Resource not found"})
		} else {
			//400 for other errors
			c.JSON(http.StatusBadRequest, gin.H{"message": "Bad request"})
		}
		return
	}

	err := bcrypt.CompareHashAndPassword([]byte(user.Password), []byte(userData.Password))

	if err != nil {
		log.Println("Invalid e-mail or password: ", err)
		c.JSON(http.StatusBadRequest, gin.H{"message": "Invalid e-mail or password"})
		return
	}

	token := jwt.NewWithClaims(jwt.SigningMethodHS256, jwt.MapClaims{
		"subject":    user.ID,
		"email":      user.Email,
		"expiration": time.Now().Add(time.Hour * 24).Unix(),
	})

	tokenString, err := token.SignedString([]byte(os.Getenv("SECRET_KEY")))

	if err != nil {
		log.Println("Error creating token: ", err)
		c.JSON(http.StatusBadRequest, gin.H{"message": "Error creating token"})
		return
	}
	c.SetSameSite(http.SameSiteLaxMode)
	c.SetCookie("jwt", tokenString, 3600*24, "", "", false, true)

	c.JSON(http.StatusOK, gin.H{
		"message": "Success",
	})
}

func Logout(c *gin.Context) {
	c.SetSameSite(http.SameSiteLaxMode)
	c.SetCookie("jwt", "", -1, "", "", false, true)

	c.JSON(http.StatusOK, gin.H{
		"message": "Logged out successfully",
	})
}

func Operation(c *gin.Context) {
	tokenString, err := c.Cookie("jwt")

	log.Println(tokenString)

	var existingUser models.User

	if err != nil {
		c.JSON(401, gin.H{"message": "Unauthorized"})
		c.AbortWithStatus(http.StatusUnauthorized)
	}

	token, err := jwt.Parse(tokenString, func(token *jwt.Token) (interface{}, error) {
		if _, ok := token.Method.(*jwt.SigningMethodHMAC); !ok {
			return nil, fmt.Errorf("unexpected signing method: %v", token.Header["alg"])
		}

		return []byte(os.Getenv("SECRET_KEY")), nil
	})

	if claims, ok := token.Claims.(jwt.MapClaims); ok && token.Valid {
		if time.Now().Unix() > int64(claims["expiration"].(float64)) {
			c.AbortWithStatus(http.StatusUnauthorized)
		}

		initializers.DB.First(&existingUser, claims["subject"])

		if existingUser.ID == 0 {
			c.AbortWithStatus(http.StatusUnauthorized)
		}

	} else {
		fmt.Println(err)
		c.AbortWithStatus(http.StatusUnauthorized)
	}

	var movementData models.Movement

	if err := c.Bind(&movementData); err != nil {
		//if the json is not valid, return a bad request
		log.Println("Error binding JSON: ", err)
		c.JSON(http.StatusBadRequest, gin.H{"message": "Error binding JSON"})
		return
	}

	if movementData.Amount <= 0 {
		c.JSON(http.StatusBadRequest, gin.H{"message": "Invalid amount"})
		return
	}

	if movementData.Operation == "deposit" {
		existingUser.Balance += movementData.Amount
	} else if movementData.Operation == "withdraw" {
		existingUser.Balance -= movementData.Amount
		if existingUser.Balance < 0 {
			c.JSON(http.StatusBadRequest, gin.H{"message": "Insufficient funds"})
			return
		}
	} else {
		c.JSON(http.StatusBadRequest, gin.H{"message": "Invalid operation"})
		return
	}

	result := initializers.DB.Save(&existingUser)

	if result.Error != nil {
		log.Println("Error updating user: ", result.Error)
		c.JSON(http.StatusBadRequest, gin.H{"message": "Error updating user"})
		return
	}

	movement := models.Movement{UserID: existingUser.ID, Operation: movementData.Operation, Amount: movementData.Amount}
	result = initializers.DB.Create(&movement)

	if result.Error != nil {
		log.Println("Error creating movement: ", result.Error)
		c.JSON(http.StatusBadRequest, gin.H{"message": "Error creating movement"})
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"message": "Operation completed successfully",
	})

}

func Movements(c *gin.Context) {
	tokenString, err := c.Cookie("jwt")

	var existingUser models.User

	if err != nil {
		c.JSON(401, gin.H{"message": "Unauthorized"})
		c.AbortWithStatus(http.StatusUnauthorized)
	}

	token, err := jwt.Parse(tokenString, func(token *jwt.Token) (interface{}, error) {
		if _, ok := token.Method.(*jwt.SigningMethodHMAC); !ok {
			return nil, fmt.Errorf("unexpected signing method: %v", token.Header["alg"])
		}

		return []byte(os.Getenv("SECRET_KEY")), nil
	})

	if claims, ok := token.Claims.(jwt.MapClaims); ok && token.Valid {
		if time.Now().Unix() > int64(claims["expiration"].(float64)) {
			c.AbortWithStatus(http.StatusUnauthorized)
		}

		initializers.DB.First(&existingUser, claims["subject"])

		if existingUser.ID == 0 {
			c.AbortWithStatus(http.StatusUnauthorized)
		}

	} else {
		fmt.Println(err)
		c.AbortWithStatus(http.StatusUnauthorized)
	}

	var movements []models.Movement

	result := initializers.DB.Where("user_id = ?", existingUser.ID).Find(&movements)

	if result.Error != nil {
		log.Println("Error getting movements: ", result.Error)
		c.JSON(http.StatusBadRequest, gin.H{"message": "Error getting movements"})
		return
	}

	var userBalance float64
	initializers.DB.Model(&existingUser).Select("balance").Scan(&userBalance)

	c.JSON(http.StatusOK, gin.H{
		"movements": movements,
		"balance":   userBalance,
	})
}
