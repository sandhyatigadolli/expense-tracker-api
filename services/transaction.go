package services

import (
	"expense-tracker-api/models"
	"expense-tracker-api/repositories"
)

func GetAllTransactions(userID uint) ([]models.Transaction, error) {

	return repositories.GetAllTransactions(userID)

}

func CreateTransaction(transaction *models.Transaction) error {

	return repositories.CreateTransaction(transaction)

}

func GetTransactionByID(id string, userID uint) (models.Transaction, error) {

	return repositories.GetTransactionByID(id, userID)

}

func UpdateTransaction(transaction *models.Transaction) error {

	return repositories.UpdateTransaction(transaction)

}

func DeleteTransaction(transaction *models.Transaction) error {

	return repositories.DeleteTransaction(transaction)

}

func GetMonthlySummary(userID uint) ([]models.Transaction, error) {

	return repositories.GetMonthlySummary(userID)

}

