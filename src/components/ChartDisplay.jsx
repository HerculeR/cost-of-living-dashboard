// src/components/ChartDisplay.jsx
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

function ChartDisplay({ data }) {
  // 1. 把对象形式的数据转换成数组
  const chartData = [
    { name: "Rent", value: data.rent },
    { name: "Food", value: data.food },
    { name: "Transport", value: data.transport },
    { name: "Misc", value: data.misc },
  ];

  return (
    <div style={{ width: "100%", height: 300, marginTop: "1.5rem" }}>
      <ResponsiveContainer>
        <BarChart data={chartData}>
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="value" fill="#4e79a7" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

export default ChartDisplay;
