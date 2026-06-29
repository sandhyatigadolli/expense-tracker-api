package repositories

import (
	"expense-tracker-api/config"
	"expense-tracker-api/models"
)

func GetAllTransactions(userID uint) ([]models.Transaction, error) {

	var transactions []models.Transaction

	err := config.DB.
		Where("user_id = ?", userID).
		Find(&transactions).Error

	return transactions, err
}

func CreateTransaction(transaction *models.Transaction) error {

	return config.DB.Create(transaction).Error

}

func GetTransactionByID(id string, userID uint) (models.Transaction, error) {

	var transaction models.Transaction

	err := config.DB.
		Where("id = ? AND user_id = ?", id, userID).
		First(&transaction).Error

	return transaction, err
}

func UpdateTransaction(transaction *models.Transaction) error {

	return config.DB.Save(transaction).Error

}

func DeleteTransaction(transaction *models.Transaction) error {

	return config.DB.Delete(transaction).Error

}

func GetMonthlySummary(userID uint) ([]models.Transaction, error) {

	var transactions []models.Transaction

	err := config.DB.
		Where("user_id = ?", userID).
		Find(&transactions).Error

	return transactions, err
}