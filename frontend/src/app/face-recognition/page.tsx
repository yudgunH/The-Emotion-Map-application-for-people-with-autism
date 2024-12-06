'use client'

import React, { useState, useRef, useEffect } from 'react'
import axios from 'axios'
import Webcam from 'react-webcam'
import { Camera, RefreshCw } from 'lucide-react'
import { Button } from "@/components/ui/button"

const BASE_URL = "http://localhost:5005"

export default function EmotionDetector() {
  const [capturedImage, setCapturedImage] = useState<string | null>(null)
  const [emotion, setEmotion] = useState<number>(0.5) // 0-1 scale for emotion
  const [loading, setLoading] = useState<boolean>(false)
  const [result, setResult] = useState<string>("")
  const webcamRef = useRef<Webcam>(null)

  const callApi = async (endpoint: string, payload: object) => {
    try {
      const response = await axios.post(`${BASE_URL}/${endpoint}`, payload, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      setResult(JSON.stringify(response.data, null, 2))
      // Assuming the API returns an emotion score between 0 and 1
      if (response.data.emotion && typeof response.data.emotion.score === 'number') {
        setEmotion(response.data.emotion.score)
      }
    } catch (error: any) {
      setResult(`Error: ${error.message}`)
      console.error("Error details:", error)
    }
  }

  const handleCapture = () => {
    const imageSrc = webcamRef.current?.getScreenshot()
    if (imageSrc) {
      setCapturedImage(imageSrc)
    } else {
      alert("Không thể chụp ảnh. Vui lòng thử lại.")
    }
  }

  const handleRetake = () => {
    setCapturedImage(null)
    setResult("")
    setEmotion(0.5)
  }

  const handleAnalyze = async () => {
    if (!capturedImage) {
      return alert("Vui lòng chụp một bức ảnh trước khi phân tích.")
    }
    setLoading(true)
    try {
      const payload = {
        img: capturedImage,
        detector_backend: "opencv",
      }
      await callApi("analyze", payload)
    } catch (error: any) {
      setResult(`Error: ${error.message}`)
      console.error("Error details:", error)
    } finally {
      setLoading(false)
    }
  }

  // SVG gauge parameters
  const radius = 40
  const strokeWidth = 8
  const normalizedValue = Math.min(Math.max(emotion, 0), 1)
  const circumference = 2 * Math.PI * radius
  const arc = circumference * (normalizedValue - 0.5) // -0.5 to center the gauge
  const rotation = -90 // Rotate to start from the bottom

  // Color interpolation based on emotion value
  const getColor = (value: number) => {
    if (value < 0.3) return '#ef4444' // red
    if (value < 0.7) return '#eab308' // yellow
    return '#22c55e' // green
  }

  return (
    <div className="max-w-md mx-auto p-4 space-y-4">
      <h1 className="text-xl font-semibold text-center">Kiểm tra cảm xúc</h1>
      
      {/* Camera/Preview Area */}
      <div className="relative aspect-[4/3] bg-gray-100 rounded-lg overflow-hidden">
        {!capturedImage ? (
          <Webcam
            audio={false}
            ref={webcamRef}
            screenshotFormat="image/png"
            videoConstraints={{
              facingMode: "user",
              width: { ideal: 1280 },
              height: { ideal: 720 }
            }}
            className="w-full h-full object-cover"
          />
        ) : (
          <img src={capturedImage} alt="Captured" className="w-full h-full object-cover" />
        )}
      </div>

      {/* Controls */}
      <div className="flex justify-center space-x-2">
        {!capturedImage ? (
          <Button onClick={handleCapture} className="bg-primary hover:bg-primary/90">
            Chụp Ảnh
          </Button>
        ) : (
          <>
            <Button 
              onClick={handleAnalyze} 
              disabled={loading}
              className="bg-green-500 hover:bg-green-600 text-white"
            >
              {loading ? "Đang phân tích..." : "Phân Tích Cảm Xúc"}
            </Button>
            <Button 
              onClick={handleRetake}
              disabled={loading}
              variant="outline"
              className="bg-gray-100 hover:bg-gray-200"
            >
              <RefreshCw className="w-4 h-4 mr-2" />
              Chụp Lại
            </Button>
          </>
        )}
      </div>

      {/* Emotion Gauge */}
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
            stroke={getColor(normalizedValue)}
            strokeWidth={strokeWidth}
            strokeDasharray={circumference}
            strokeDashoffset={circumference - arc}
            className="transition-all duration-500"
          />
        </svg>
        
        {/* Emoji */}
        <div className="text-3xl">
          {emotion >= 0.7 ? '😊' : emotion >= 0.3 ? '😐' : '😢'}
        </div>

        {/* Status Text */}
        <div className="text-center space-y-1">
          <p className="font-medium">
            {emotion >= 0.7 ? 'Cảm xúc bạn thật tích cực' : 
             emotion >= 0.3 ? 'Cảm xúc bình thường' : 
             'Cảm xúc tiêu cực'}
          </p>
          <p className="text-sm text-gray-600">
            Chúc bạn một ngày tốt lành ❤️❤️❤️
          </p>
        </div>
      </div>

      {/* Results */}
      <div className="mt-4">
        <h3 className="text-lg font-semibold mb-2">Kết Quả Chi Tiết</h3>
        {loading ? (
          <p className="text-center">Đang phân tích...</p>
        ) : (
          <pre className="bg-gray-100 p-4 rounded-lg text-sm overflow-x-auto">
            {result}
          </pre>
        )}
      </div>
    </div>
  )
}

