package main

import (
	"expense-tracker-api/config"
	"expense-tracker-api/handlers"
	"expense-tracker-api/middleware"

	"github.com/gin-gonic/gin"

	swaggerFiles "github.com/swaggo/files"
	ginSwagger "github.com/swaggo/gin-swagger"

	_ "expense-tracker-api/docs"

	"github.com/gin-contrib/cors"
)

// @title Expense Tracker API
// @version 1.0
// @description Expense Tracker Backend using Go, Gin, MySQL and JWT
// @host localhost:8082
// @BasePath /

func main() {

	config.LoadEnv()

	config.ConnectDatabase()

	r := gin.Default()

	r.Use(cors.New(cors.Config{
		AllowOrigins: []string{"http://localhost:5173"},
		AllowMethods: []string{
			"GET",
			"POST",
			"PUT",
			"DELETE",
			"OPTIONS",
		},
		AllowHeaders: []string{
			"Origin",
			"Content-Type",
			"Authorization",
		},
	}))

	r.POST("/register", handlers.Register)
	r.POST("/login", handlers.Login)

	authorized := r.Group("/")
	authorized.Use(middleware.AuthMiddleware())

	authorized.POST("/transactions", handlers.CreateTransaction)
authorized.GET("/transactions", handlers.GetTransactions)
authorized.GET("/transactions/:id", handlers.GetTransactionByID)
authorized.PUT("/transactions/:id", handlers.UpdateTransaction)
authorized.DELETE("/transactions/:id", handlers.DeleteTransaction)

authorized.GET("/summary", handlers.GetTransactionSummary)
authorized.GET("/category-summary", handlers.GetCategorySummary)
authorized.GET("/monthly-summary", handlers.GetMonthlySummary)
	r.GET("/swagger/*any", ginSwagger.WrapHandler(swaggerFiles.Handler))

	r.Run(":8082")
}
