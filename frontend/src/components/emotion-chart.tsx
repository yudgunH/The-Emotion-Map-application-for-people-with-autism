"use client"

import { Line, LineChart, ResponsiveContainer, XAxis, YAxis, Tooltip, Legend } from "recharts"

const data = [
  { date: "10/06/2024", value1: 30, value2: 10, value3: 35 },
  { date: "11/06/2024", value1: 70, value2: 30, value3: 40 },
  { date: "12/06/2024", value1: 65, value2: 65, value3: 20 },
  { date: "13/06/2024", value1: 60, value2: 60, value3: 15 },
  { date: "14/06/2024", value1: 20, value2: 40, value3: 10 },
  { date: "15/06/2024", value1: 10, value2: 20, value3: 5 },
]

export function EmotionChart() {
  return (
    <div className="w-full h-[400px] p-4 border rounded-lg bg-white">
      <h2 className="text-xl font-semibold mb-4">Biểu Đồ Lịch Sử Cảm Xúc</h2>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
          <XAxis dataKey="date" />
          <YAxis domain={[0, 100]} />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="value1" stroke="#8884d8" />
          <Line type="monotone" dataKey="value2" stroke="#82ca9d" />
          <Line type="monotone" dataKey="value3" stroke="#ffc658" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}

