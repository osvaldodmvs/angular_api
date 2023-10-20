package initializers

import (
	"log"
	"os"

	"gorm.io/driver/postgres"
	"gorm.io/gorm"
)

var DB *gorm.DB

func ConnectToDB() {
	var err error
	url := "host=" + os.Getenv("DB_HOST") + " user=" + os.Getenv("DB_USER") + " password=" + os.Getenv("DB_PASSWORD") + " dbname=" + os.Getenv("DB_NAME") + " port=5432"
	DB, err = gorm.Open(postgres.New(postgres.Config{DSN: url, PreferSimpleProtocol: true}), &gorm.Config{})

	if err != nil {
		log.Fatal("Failed to connect, error: ", err)
	} else {
		log.Println("Connected to database")
	}
}
