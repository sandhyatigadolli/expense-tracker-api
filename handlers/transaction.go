package handlers

import (
	"fmt"
	"net/http"

	"expense-tracker-api/config"
	"expense-tracker-api/models"
	"expense-tracker-api/services"

	"github.com/gin-gonic/gin"
)

func CreateTransaction(c *gin.Context) {
	fmt.Println("===== CreateTransaction called =====")

	var req models.TransactionRequest

	if err := c.ShouldBindJSON(&req); err != nil {
		fmt.Println("Bind Error:", err)

		c.JSON(http.StatusBadRequest, gin.H{
			"error": err.Error(),
		})
		return
	}
	fmt.Println("Request received:", req)

	userID, _ := c.Get("userID")

	transaction := models.Transaction{
		UserID:      userID.(uint),
		Type:        req.Type,
		Amount:      req.Amount,
		Category:    req.Category,
		Description: req.Description,
		Date: req.Date,
	}

	if err := services.CreateTransaction(&transaction); err != nil {

		c.JSON(http.StatusInternalServerError, gin.H{
			"error": err.Error(),
		})
		return
	}

	c.JSON(http.StatusCreated, transaction)
}

func GetTransactions(c *gin.Context) {

	userID, _ := c.Get("userID")

	transactions, err := services.GetAllTransactions(userID.(uint))

	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{
			"error": err.Error(),
		})
		return
	}

	c.JSON(http.StatusOK, transactions)
}

func GetTransactionByID(c *gin.Context) {

	userID, _ := c.Get("userID")

	transaction, err := services.GetTransactionByID(
		c.Param("id"),
		userID.(uint),
	)

	if err != nil {

		c.JSON(http.StatusNotFound, gin.H{
			"error": "Transaction not found",
		})

		return
	}

	c.JSON(http.StatusOK, transaction)
}

func UpdateTransaction(c *gin.Context) {

	var transaction models.Transaction

	userID, _ := c.Get("userID")

	if err := config.DB.
		Where("id = ? AND user_id = ?", c.Param("id"), userID).
		First(&transaction).Error; err != nil {

		c.JSON(http.StatusNotFound, gin.H{
			"error": "Transaction not found",
		})
		return
	}

	var updatedTransaction models.Transaction

	if err := c.ShouldBindJSON(&updatedTransaction); err != nil {

		c.JSON(http.StatusBadRequest, gin.H{
			"error": err.Error(),
		})
		return
	}

	transaction.Type = updatedTransaction.Type
	transaction.Amount = updatedTransaction.Amount
	transaction.Category = updatedTransaction.Category
	transaction.Description = updatedTransaction.Description
	transaction.Date = updatedTransaction.Date

	if err := services.UpdateTransaction(&transaction); err != nil {

		c.JSON(http.StatusInternalServerError, gin.H{
			"error": err.Error(),
		})
		return
	}

	c.JSON(http.StatusOK, transaction)
}

func DeleteTransaction(c *gin.Context) {

	var transaction models.Transaction

	userID, _ := c.Get("userID")

	if err := config.DB.
		Where("id = ? AND user_id = ?", c.Param("id"), userID).
		First(&transaction).Error; err != nil {

		c.JSON(http.StatusNotFound, gin.H{
			"error": "Transaction not found",
		})
		return
	}

	if err := services.DeleteTransaction(&transaction); err != nil {

		c.JSON(http.StatusInternalServerError, gin.H{
			"error": err.Error(),
		})
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"message": "Transaction deleted successfully",
	})
}

func GetTransactionSummary(c *gin.Context) {

	userID, _ := c.Get("userID")

	var transactions []models.Transaction

	config.DB.
		Where("user_id = ?", userID).
		Find(&transactions)

	var income float64
	var expense float64

	for _, transaction := range transactions {

		if transaction.Type == "income" {
			income += transaction.Amount
		} else if transaction.Type == "expense" {
			expense += transaction.Amount
		}
	}

	c.JSON(http.StatusOK, gin.H{
		"income":  income,
		"expense": expense,
		"balance": income - expense,
	})
}

func GetCategorySummary(c *gin.Context) {

	userID, _ := c.Get("userID")

	var transactions []models.Transaction

	config.DB.
		Where("user_id = ?", userID).
		Find(&transactions)

	summary := make(map[string]float64)

	for _, transaction := range transactions {

		if transaction.Type == "expense" {
			summary[transaction.Category] += transaction.Amount
		}
	}

	fmt.Println(summary)

	c.JSON(http.StatusOK, summary)
}


func GetMonthlySummary(c *gin.Context) {

	userID, _ := c.Get("userID")

	transactions, err := services.GetMonthlySummary(userID.(uint))
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{
			"error": err.Error(),
		})
		return
	}

	monthlyMap := make(map[string]*models.MonthlySummary)

	for _, transaction := range transactions {

		month := transaction.Date.Format("Jan")

		if _, exists := monthlyMap[month]; !exists {
			monthlyMap[month] = &models.MonthlySummary{
				Month: month,
			}
		}

		if transaction.Type == "income" {
			monthlyMap[month].Income += transaction.Amount
		} else {
			monthlyMap[month].Expense += transaction.Amount
		}
	}

	var summary []models.MonthlySummary

	for _, value := range monthlyMap {
		summary = append(summary, *value)
	}

	c.JSON(http.StatusOK, summary)
}

