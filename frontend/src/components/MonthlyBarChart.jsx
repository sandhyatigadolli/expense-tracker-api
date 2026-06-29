import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

function MonthlyBarChart({ data }) {
  return (
    <div className="chart-card">
      <h2>Monthly Income & Expense</h2>

      {data.length === 0 ? (
        <p>No monthly data available</p>
      ) : (
        <ResponsiveContainer width="100%" height={350}>
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />

            <XAxis dataKey="month" />

            <YAxis />

            <Tooltip />

            <Legend />

            <Bar dataKey="income" fill="#00C49F" />

            <Bar dataKey="expense" fill="#FF4560" />
          </BarChart>
        </ResponsiveContainer>
      )}
    </div>
  );
}

export default MonthlyBarChart;