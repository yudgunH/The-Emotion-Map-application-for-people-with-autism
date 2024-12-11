'use client'

import React, { useState, useRef, useCallback } from 'react'
import axios from 'axios'
import Webcam from 'react-webcam'
import { Button } from "@/components/ui/button"
import { CameraIcon, FlipVerticalIcon as FlipCameraIcon } from 'lucide-react'
import Chatbox from '@/components/Chatbox'

const BASE_URL = "http://localhost:5005"

export default function EmotionDetector() {
  const [emotion, setEmotion] = useState<string>("neutral")
  const [loading, setLoading] = useState<boolean>(false)
  const [result, setResult] = useState<string>("")
  const [showGauge, setShowGauge] = useState<boolean>(false)
  const [isChatboxOpen, setIsChatboxOpen] = useState<boolean>(false)
  const [facingMode, setFacingMode] = useState<"user" | "environment">("user")
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

  const handleCameraFlip = useCallback(() => {
    setFacingMode(prevState => 
      prevState === "user" ? "environment" : "user"
    )
  }, [])

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
              facingMode: facingMode,
              width: { ideal: 1280 },
              height: { ideal: 720 },
            }}
            className="w-full h-full object-cover"
          />
          <Button
            onClick={handleCameraFlip}
            className="absolute bottom-2 right-2 bg-white/50 hover:bg-white/75 text-black"
            size="icon"
          >
            <FlipCameraIcon className="h-4 w-4" />
          </Button>
        </div>

        <div className="flex justify-center space-x-2">
          <Button
            onClick={handleCaptureAndAnalyze}
            disabled={loading}
            className="bg-green-500 hover:bg-green-600 text-white"
          >
            {loading ? (
              "Đang phân tích..."
            ) : (
              <>
                <CameraIcon className="mr-2 h-4 w-4" />
                Chụp Ảnh và Phân Tích
              </>
            )}
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
            <div className="text-5xl">
              {getEmotionInfo(emotion).emoji}
            </div>

            <div className="text-center space-y-1">
              <p className="font-medium text-lg">
                {getEmotionInfo(emotion).text}
              </p>
            </div>
          </div>
        )}

        <div className="mt-4">
          <h3 className="text-lg font-semibold mb-2">Lời khuyên chi tiết</h3>
          {loading ? (
            <p className="text-center">Đang phân tích...</p>
          ) : (
            <div className="bg-gray-100 p-4 rounded-lg text-sm overflow-x-auto">
              <p className="whitespace-pre-wrap">{result}</p>
            </div>
          )}
        </div>
      </div>
      <Chatbox isOpen={isChatboxOpen} />
    </div>
  )
}

