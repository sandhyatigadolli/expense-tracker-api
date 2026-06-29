import "../styles/dashboard.css";

function TransactionModal({
  show,
  onClose,
  onSubmit,
  amount,
  setAmount,
  category,
  setCategory,
  description,
  setDescription,
  type,
  setType,
  date,
  setDate,
  editingId,
}) {
  if (!show) return null;

  return (
    <div className="modal-overlay">
      <div className="modal">

        <h2>
          {editingId ? "Edit Transaction" : "Add Transaction"}
        </h2>

        <select
          value={type}
          onChange={(e) => setType(e.target.value)}
        >
          <option value="income">Income</option>
          <option value="expense">Expense</option>
        </select>

        <input
          type="number"
          placeholder="Amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />

        <input
          type="text"
          placeholder="Category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        />

        <input
          type="text"
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />

        <div className="modal-buttons">

          <button
            className="submit-btn"
            onClick={onSubmit}
          >
            {editingId ? "Update" : "Save"}
          </button>

          <button
            className="delete-btn"
            onClick={onClose}
          >
            Cancel
          </button>

        </div>

      </div>
    </div>
  );
}

export default TransactionModal;