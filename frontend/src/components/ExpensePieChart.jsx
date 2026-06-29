import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const COLORS = [
  "#00C49F",
  "#FF8042",
  "#0088FE",
  "#FFBB28",
  "#AF19FF",
  "#FF4560",
];

function ExpensePieChart({ data }) {

  // Convert API object into array
  const chartData = Object.entries(data).map(([category, amount]) => ({
    category,
    amount,
  }));

  return (
    <div className="chart-card">

      <h2>Expense by Category</h2>

      {chartData.length === 0 ? (
        <p>No expense data available</p>
      ) : (
        <ResponsiveContainer width="100%" height={350}>
          <PieChart>

            <Pie
              data={chartData}
              dataKey="amount"
              nameKey="category"
              cx="50%"
              cy="50%"
              outerRadius={110}
              label
            >
              {chartData.map((entry, index) => (
                <Cell
                  key={index}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>

            <Tooltip />

            <Legend />

          </PieChart>
        </ResponsiveContainer>
      )}

    </div>
  );
}

export default ExpensePieChart;