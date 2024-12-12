"use client"

import { Line, LineChart, ResponsiveContainer, XAxis, YAxis, Tooltip, Legend } from "recharts"

const data = [
  { date: "10/06/2024", tiêu_cực: 30, tích_cực: 10, bình_thường: 35 },
  { date: "11/06/2024", tiêu_cực: 70, tích_cực: 30, bình_thường: 40 },
  { date: "12/06/2024", tiêu_cực: 65, tích_cực: 65, bình_thường: 20 },
  { date: "13/06/2024", tiêu_cực: 60, tích_cực: 60, bình_thường: 15 },
  { date: "14/06/2024", tiêu_cực: 20, tích_cực: 40, bình_thường: 10 },
  { date: "15/06/2024", tiêu_cực: 10, tích_cực: 20, bình_thường: 5 },
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
          <Line type="monotone" dataKey="tiêu_cực" stroke="#8884d8" />
          <Line type="monotone" dataKey="tích_cực" stroke="#82ca9d" />
          <Line type="monotone" dataKey="bình_thường" stroke="#ffc658" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}
