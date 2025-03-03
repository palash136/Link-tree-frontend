import React from "react";
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";

const pieData = [
  { name: "YouTube", value: 520 },
  { name: "Facebook", value: 220 },
  { name: "Instagram", value: 180 },
  { name: "Other", value: 110 }
];

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

export function PieChartWithPaddingAngle() {
  return (
    <ResponsiveContainer width="100%" height={250}>
      <PieChart>
        <Pie
          data={pieData}
          cx="50%"
          cy="50%"
          innerRadius={60}
          outerRadius={80}
          fill="#8884d8"
          paddingAngle={5}
          dataKey="value"
        >
          {pieData.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
      </PieChart>
    </ResponsiveContainer>
  );
}
export default PieChartWithPaddingAngle;

