'use client'

import React, { useState, useRef } from 'react'
import axios from 'axios'
import Webcam from 'react-webcam'
import { RefreshCw } from 'lucide-react'
import { Button } from "@/components/ui/button"

const BASE_URL = "http://localhost:5005"

export default function EmotionDetector() {
  const [capturedImage, setCapturedImage] = useState<string | null>(null)
  const [emotion, setEmotion] = useState<string>("neutral")
  const [loading, setLoading] = useState<boolean>(false)
  const [result, setResult] = useState<string>("")
  const [showGauge, setShowGauge] = useState<boolean>(false)
  const webcamRef = useRef<Webcam>(null)

  const handleCapture = () => {
    const imageSrc = webcamRef.current?.getScreenshot()
    if (imageSrc) {
      setCapturedImage(imageSrc)
      setShowGauge(false)
    } else {
      alert("Không thể chụp ảnh. Vui lòng thử lại.")
    }
  }

  const handleRetake = () => {
    setCapturedImage(null)
    setResult("")
    setEmotion("neutral")
    setShowGauge(false)
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
      const response = await axios.post(`${BASE_URL}/analyze`, payload, {
        headers: {
          "Content-Type": "application/json",
        },
      })

      console.log("Response data:", response.data)
      setResult(JSON.stringify(response.data, null, 2))

      // Giả sử dữ liệu trả về không phải là mảng mà là object
      if (response.data && response.data.dominant_emotion) {
        const domEmotion = response.data.dominant_emotion.toLowerCase()
        console.log("Dominant emotion:", domEmotion)
        setEmotion(domEmotion)
        setShowGauge(true)
      } else {
        setEmotion("neutral")
        setShowGauge(true)
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
    <div className="max-w-md mx-auto p-4 space-y-4">
      <h1 className="text-xl font-semibold text-center">Kiểm tra cảm xúc</h1>

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
