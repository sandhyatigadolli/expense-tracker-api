import "../styles/Dashboard.css";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "../services/api";
import SummaryCards from "../components/SummaryCards";
import TransactionList from "../components/TransactionList";
import TransactionModal from "../components/TransactionModal";
import exportPDF from "../utils/exportPDF";

function Dashboard() {
  const [transactions, setTransactions] = useState([]);
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();



  const [type, setType] = useState("expense");

const [date, setDate] = useState(
  new Date().toISOString().split("T")[0]
);
  
  const [summary, setSummary] = useState({
    total_expenses: 0,
    count: 0,
  });


  const handleExportPDF = () => {
  exportPDF(summary, transactions);
};

const handleLogout = () => {
  localStorage.removeItem("token");
  navigate("/");
};

 useEffect(() => {
  fetchTransactions();
  fetchSummary();
}, []);

  const fetchTransactions= async () => {
    try {
      const token = localStorage.getItem("token");

      const response = await api.get("/transactions", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setTransactions(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchSummary = async () => {
    try {
      const token = localStorage.getItem("token");

      const response = await api.get("/summary", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setSummary(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const saveTransaction = async () => {
  try {
    const token = localStorage.getItem("token");

    const transactionData = {
  type,
  amount: parseFloat(amount),
  category,
  description,
  date: new Date(date).toISOString(),
};
console.log("Sending:", transactionData);

    if (editingId) {
      await api.put(
        `/transactions/${editingId}`,
        transactionData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert("Transaction Updated!");
    } else {
      await api.post(
        "/transactions",
        transactionData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert("Transaction Added!");
    }

    // Reset form
    setAmount("");
    setCategory("");
    setDescription("");
    setType("expense");
    setDate(new Date().toISOString().split("T")[0]);
    setEditingId(null);

    setShowModal(false);

    fetchTransactions();
    fetchSummary();
  } catch (error) {
    console.error(error);
  }
};


const fetchCategorySummary = async () => {
  try {
    const token = localStorage.getItem("token");

    const response = await api.get("/category-summary", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    setCategorySummary(response.data);

  } catch (error) {
    console.error(error);
  }
};


const deleteTransaction = async (id) => {
  try {
    const token = localStorage.getItem("token");

    await api.delete(`/transactions/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    fetchTransactions();
    fetchSummary();
  } catch (error) {
    console.error(error);
  }
};

const fetchMonthlySummary = async () => {
  try {
    const token = localStorage.getItem("token");

    const response = await api.get("/monthly-summary", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    setMonthlySummary(response.data);

  } catch (error) {
    console.error(error);
  }
};

 const editTransaction = (transaction) => {
  console.log(transaction);

  setEditingId(transaction.id);
  setAmount(transaction.amount);
  setCategory(transaction.category);
  setDescription(transaction.description);
  setType(transaction.type);
  setDate(transaction.date.split("T")[0]);

  setShowModal(true);
};


  return (
    <div className="dashboard-container">
      <div className="dashboard-card">
        <div className="dashboard-header">

  <div>
    <h1 className="dashboard-title">
      Personal Finance Tracker
    </h1>

    <p className="dashboard-subtitle">
      Manage your income and expenses effortlessly
    </p>
  </div>

  <button
    className="logout-btn"
    onClick={handleLogout}
  >
    🚪 Logout
  </button>

</div>


        {/* Total Card - Centered */}
     <SummaryCards summary={summary} />
        
       <div className="action-buttons">
  <button
    className="action-btn add-btn"
    onClick={() => setShowModal(true)}
  >
    + Add Transaction
  </button>

  <button
    className="action-btn export-btn"
    onClick={handleExportPDF}
  >
    Export PDF
  </button>

  <Link to="/analytics">
    <button className="action-btn analytics-btn">
      View Analytics →
    </button>
  </Link>
</div>


        

        {/* Content Wrapper - Form Left, Expenses Right */}
        <div className="content-wrapper">
          {/* Left: Add Expense Form */}
          <div className="form-section">
            </div>
           
          </div>
<br/>
<br/>


          {/* Right: Expenses List */}
         <div className="expenses-section">
  <TransactionList
  transactions={transactions}
  onEdit={editTransaction}
  onDelete={deleteTransaction}
/>

<TransactionModal
  show={showModal}
  onClose={() => setShowModal(false)}
  onSubmit={saveTransaction}
  amount={amount}
  setAmount={setAmount}
  category={category}
  setCategory={setCategory}
  description={description}
  setDescription={setDescription}
  type={type}
  setType={setType}
  date={date}
  setDate={setDate}
  editingId={editingId}
/>
</div>
        </div>
        
      </div>
  );

}



export default Dashboard;