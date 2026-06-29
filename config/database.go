package config

import (
	"fmt"
	"os"
	"time"

	"expense-tracker-api/models"

	"gorm.io/driver/mysql"
	"gorm.io/gorm"
)

var DB *gorm.DB

func ConnectDatabase() {
	dbUser := os.Getenv("DB_USER")
	dbPassword := os.Getenv("DB_PASSWORD")
	dbHost := os.Getenv("DB_HOST")
	dbPort := os.Getenv("DB_PORT")
	dbName := os.Getenv("DB_NAME")

	dsn := fmt.Sprintf(
		"%s:%s@tcp(%s:%s)/%s?charset=utf8mb4&parseTime=True&loc=Local",
		dbUser,
		dbPassword,
		dbHost,
		dbPort,
		dbName,
	)

	var err error

	for i := 1; i <= 10; i++ {
		DB, err = gorm.Open(mysql.Open(dsn), &gorm.Config{})

		if err == nil {
			fmt.Println("✅ Connected to MySQL!")
			break
		}

		fmt.Printf("Waiting for MySQL... (%d/10)\n", i)
		time.Sleep(3 * time.Second)
	}

	if err != nil {
		panic(fmt.Sprintf("Database connection failed: %v", err))
	}

	DB.AutoMigrate(
		&models.User{},
		&models.Transaction{},
	)
}