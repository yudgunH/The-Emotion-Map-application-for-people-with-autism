'use client'

import React, { useState, useRef } from 'react'
import axios from 'axios'
import Webcam from 'react-webcam'
import { Button } from "@/components/ui/button"
import Chatbox from '@/components/Chatbox'

const BASE_URL = "http://localhost:5005"

export default function EmotionDetector() {
  const [emotion, setEmotion] = useState<string>("neutral")
  const [loading, setLoading] = useState<boolean>(false)
  const [result, setResult] = useState<string>("")
  const [showGauge, setShowGauge] = useState<boolean>(false)
  const [isChatboxOpen, setIsChatboxOpen] = useState<boolean>(false)
  const webcamRef = useRef<Webcam>(null)

  const handleCaptureAndAnalyze = async () => {
    const imageSrc = webcamRef.current?.getScreenshot()
    if (!imageSrc) {
      alert("Không thể chụp ảnh. Vui lòng thử lại.")
      return
    }

    setLoading(true)
    try {
      const payload = {
        img: imageSrc,
        detector_backend: "opencv",
      }

      const response = await axios.post(`${BASE_URL}/analyze`, payload, {
        headers: {
          "Content-Type": "application/json",
        },
      })

      console.log("Response data:", response.data)
      if (response.data && typeof response.data === "object") {
        const domEmotion = response.data.emotion.toLowerCase()
        const adviceText = response.data.advice
        setEmotion(domEmotion)
        setShowGauge(true)
        setResult(adviceText)
      } else {
        setEmotion("neutral")
        setShowGauge(true)
        setResult("Không xác định cảm xúc.")
      }
    } catch (error: any) {
      setResult(`Error: ${error.message}`)
      console.error("Error details:", error)
    } finally {
      setLoading(false)
    }
  }

  const radius = 40
  const strokeWidth = 8
  const circumference = 2 * Math.PI * radius

  const getColor = (emotion: string) => {
    switch (emotion) {
      case 'happy': return '#22c55e'
      case 'surprise': return '#3b82f6'
      case 'neutral': return '#f59e0b'
      case 'sad': return '#6b7280'
      case 'angry': return '#ef4444'
      case 'fear': return '#8b5cf6'
      case 'disgust': return '#10b981'
      default: return '#6b7280'
    }
  }

  const getEmotionInfo = (emotion: string) => {
    switch (emotion) {
      case 'happy': return { emoji: '😊', text: 'Hạnh phúc' }
      case 'neutral': return { emoji: '😐', text: 'Bình thường' }
      case 'surprise': return { emoji: '😮', text: 'Ngạc nhiên' }
      case 'sad': return { emoji: '😢', text: 'Buồn' }
      case 'angry': return { emoji: '😠', text: 'Tức giận' }
      case 'fear': return { emoji: '😨', text: 'Sợ hãi' }
      case 'disgust': return { emoji: '🤢', text: 'Ghê tởm' }
      default: return { emoji: '😐', text: 'Không xác định' }
    }
  }

  return (
    <div className={`flex transition-all duration-300 ease-in-out ${isChatboxOpen ? 'mr-[400px]' : ''}`}>
      <div className="flex-1 max-w-xl mx-auto p-4 space-y-4">
        <h1 className="text-xl font-semibold text-center">Kiểm tra cảm xúc</h1>

        <div className="relative aspect-[4/3] bg-gray-100 rounded-lg overflow-hidden">
          <Webcam
            audio={false}
            ref={webcamRef}
            screenshotFormat="image/png"
            videoConstraints={{
              facingMode: "user",
              width: { ideal: 1280 },
              height: { ideal: 720 },
            }}
            className="w-full h-full object-cover"
          />
        </div>

        <div className="flex justify-center space-x-2">
          <Button
            onClick={handleCaptureAndAnalyze}
            disabled={loading}
            className="bg-green-500 hover:bg-green-600 text-white"
          >
            {loading ? "Đang phân tích..." : "Chụp Ảnh và Phân Tích"}
          </Button>
          <Button
            onClick={() => setIsChatboxOpen(!isChatboxOpen)}
            variant="outline"
            className="bg-stone-600 hover:bg-stone-700 text-white"
          >
            Hỗ trợ giao tiếp
          </Button>
        </div>

        {showGauge && (
          <div className="flex flex-col items-center space-y-2">
            <svg width="100" height="60" className="transform -rotate-180">
              <path
                d={`M ${50 - radius}, 50 a ${radius},${radius} 0 1,1 ${radius * 2},0`}
                fill="none"
                stroke="#e5e7eb"
                strokeWidth={strokeWidth}
              />
              <path
                d={`M ${50 - radius}, 50 a ${radius},${radius} 0 1,1 ${radius * 2},0`}
                fill="none"
                stroke={getColor(emotion)}
                strokeWidth={strokeWidth}
                strokeDasharray={circumference}
                strokeDashoffset={circumference / 2}
                className="transition-all duration-500"
              />
            </svg>

            <div className="text-5xl">
              {getEmotionInfo(emotion).emoji}
            </div>

            <div className="text-center space-y-1">
              <p className="font-medium text-lg">
                {getEmotionInfo(emotion).text}
              </p>
              <p className="text-sm text-gray-600">
                Cảm ơn bạn đã sử dụng ứng dụng của chúng tôi!
              </p>
            </div>
          </div>
        )}

        <div className="mt-4">
          <h3 className="text-lg font-semibold mb-2">Lời khuyên chi tiết</h3>
          {loading ? (
            <p className="text-center">Đang phân tích...</p>
          ) : (
            <pre className="bg-gray-100 p-4 rounded-lg text-sm overflow-x-auto">
              {result}
            </pre>
          )}
        </div>
      </div>
      <Chatbox isOpen={isChatboxOpen} />
    </div>
  )
}
