import React from "react";
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  BarChart, Bar, Legend, PieChart, Pie, Cell
} from "recharts";

const formatYAxis = (tick) => `${tick / 1000}K`;

export function LineGraph({ data = [] }) {
  return (
    <ResponsiveContainer width="100%" height={250}>
      <LineChart data={data.length ? data : [{ name: "No Data", value: 0 }]}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis tickFormatter={formatYAxis} />
        <Tooltip />
        <Line type="monotone" dataKey="value" stroke="#0088FE" strokeWidth={3} />
      </LineChart>
    </ResponsiveContainer>
  );
}

export function BarGraph({ data = [] }) {
  return (
    <ResponsiveContainer width="100%" height={250}>
      <BarChart data={data.length ? data : [{ name: "No Data", value: 0 }]}>
        <XAxis dataKey="name" />
        <YAxis tickFormatter={formatYAxis} />
        <Tooltip />
        <Legend />
        <Bar dataKey="value" fill="#00C49F" barSize={40} />
      </BarChart>
    </ResponsiveContainer>
  );
}

export function LinksBarGraph({ data = [] }) {
  return (
    <ResponsiveContainer width="100%" height={250}>
      <BarChart data={data.length ? data : [{ name: "No Data", value: 0 }]}>
        <XAxis dataKey="name" />
        <YAxis tickFormatter={formatYAxis} />
        <Tooltip />
        <Legend />
        <Bar dataKey="value" fill="#0088FE" barSize={40} />
      </BarChart>
    </ResponsiveContainer>
  );
}

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#A28BF5", "#FF6363"];

export function PieGraph({ data = [] }) {
  return (
    <ResponsiveContainer width="100%" height={250}>
      <PieChart>
        <Tooltip />
        <Pie
          data={data.length ? data : [{ name: "No Data", value: 1 }]}
          dataKey="value"
          nameKey="name"
          cx="50%"
          cy="50%"
          outerRadius={80}
          fill="#8884d8"
          label
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
      </PieChart>
    </ResponsiveContainer>
  );
}
