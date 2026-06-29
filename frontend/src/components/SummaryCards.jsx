import "../styles/dashboard.css";

function SummaryCards({ summary }) {
  return (
    <div className="summary-container">
      <div className="summary-box income-card">
        <p>Income</p>
        <h2>₹{summary.income}</h2>
      </div>

      <div className="summary-box expense-card">
        <p>Expense</p>
        <h2>₹{summary.expense}</h2>
      </div>

      <div className="summary-box balance-card">
        <p>Balance</p>
        <h2>₹{summary.balance}</h2>
      </div>
    </div>
  );
}

export default SummaryCards;