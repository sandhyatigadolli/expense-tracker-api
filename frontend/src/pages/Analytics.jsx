import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import api from "../services/api";

import ExpensePieChart from "../components/ExpensePieChart";
import MonthlyBarChart from "../components/MonthlyBarChart";
import IncomeExpenseLineChart from "../components/IncomeExpenseLineChart";

import "../styles/Dashboard.css";

function Analytics() {

    const [categorySummary, setCategorySummary] = useState({});
    const [monthlySummary, setMonthlySummary] = useState([]);

    useEffect(() => {

        fetchCategorySummary();
        fetchMonthlySummary();

    }, []);

    const fetchCategorySummary = async () => {

        const token = localStorage.getItem("token");

        const response = await api.get("/category-summary", {

            headers: {

                Authorization: `Bearer ${token}`

            }

        });

        setCategorySummary(response.data);

    };

    const fetchMonthlySummary = async () => {

        const token = localStorage.getItem("token");

        const response = await api.get("/monthly-summary", {

            headers: {

                Authorization: `Bearer ${token}`

            }

        });

        setMonthlySummary(response.data);

    };

    return (

        <div className="dashboard-container">

            <div className="dashboard-card">

                <Link
                    to="/dashboard"
                    className="analytics-btn"
                >
                    ← Back to Dashboard
                </Link>
                <br/>

                <h1 className="dashboard-title">
                    Analytics
                </h1>

                <div className="charts-section">

                    <ExpensePieChart
                        data={categorySummary}
                    />

                    <MonthlyBarChart
                        data={monthlySummary}
                    />

                    <IncomeExpenseLineChart
                        data={monthlySummary}
                    />

                </div>

            </div>

        </div>

    );

}

export default Analytics;