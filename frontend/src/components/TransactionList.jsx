import "../styles/dashboard.css";

function TransactionList({ transactions, onEdit, onDelete }) {
  if (transactions.length === 0) {
    return (
      <div className="transaction-card">
        <p className="empty-state">No Transactions Found</p>
      </div>
    );
  }

  return (
    <div className="transaction-card">
      <h2 className="transaction-title">Recent Transactions</h2>

      <table className="transaction-table">
        <thead>
          <tr>
            <th>Type</th>
            <th>Category</th>
            <th>Description</th>
            <th>Date</th>
            <th>Amount</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {transactions.map((transaction) => (
            <tr key={transaction.id}>
              <td>
                <span
                  className={
                    transaction.type === "income"
                      ? "income-badge"
                      : "expense-badge"
                  }
                >
                  {transaction.type}
                </span>
              </td>

              <td>{transaction.category}</td>

              <td>{transaction.description}</td>

              <td>
                {new Date(transaction.date).toLocaleDateString()}
              </td>

              <td
                className={
                  transaction.type === "income"
                    ? "income-text"
                    : "expense-text"
                }
              >
                ₹{transaction.amount}
              </td>

              <td>
                <button
                  className="edit-btn"
                  onClick={() => onEdit(transaction)}
                >
                  Edit
                </button>

                <button
                  className="delete-btn"
                  onClick={() => onDelete(transaction.id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default TransactionList;