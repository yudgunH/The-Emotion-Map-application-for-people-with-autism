"use client";
import { useState, useEffect, useRef } from 'react';
import { Camera } from 'lucide-react';
import { Button } from "@/components/ui/button";

export default function EmotionDetector() {
  const [emotion, setEmotion] = useState<number>(0.8); // 0-1 scale for emotion
  const [cameraActive, setCameraActive] = useState(false);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  // SVG gauge parameters
  const radius = 40;
  const strokeWidth = 8;
  const normalizedValue = Math.min(Math.max(emotion, 0), 1);
  const circumference = 2 * Math.PI * radius;
  const arc = circumference * (normalizedValue - 0.5); // -0.5 to center the gauge
  const rotation = -90; // Rotate to start from the bottom

  // Color interpolation based on emotion value
  const getColor = (value: number) => {
    if (value < 0.3) return '#ef4444'; // red
    if (value < 0.7) return '#eab308'; // yellow
    return '#22c55e'; // green
  };

  // Handle camera stream
  useEffect(() => {
    let stream: MediaStream | null = null;

    if (cameraActive) {
      // Request camera access
      navigator.mediaDevices.getUserMedia({ video: true })
        .then((mediaStream) => {
          stream = mediaStream;
          if (videoRef.current) {
            videoRef.current.srcObject = mediaStream;
          }
        })
        .catch((err) => {
          console.error('Error accessing camera: ', err);
        });
    } else {
      // Stop all video tracks when camera is turned off
      if (videoRef.current && videoRef.current.srcObject) {
        const stream = videoRef.current.srcObject as MediaStream;
        stream.getTracks().forEach((track) => track.stop());
      }
      if (videoRef.current) {
        videoRef.current.srcObject = null;
      }
    }

    // Cleanup on component unmount or camera state change
    return () => {
      if (stream) {
        stream.getTracks().forEach((track) => track.stop());
      }
    };
  }, [cameraActive]);

  return (
    <div className="max-w-[1080px] mx-auto p-4 space-y-4">
      <h1 className="text-xl font-semibold text-center">Kiểm tra cảm xúc</h1>

      {/* Camera/Preview Area */}
      <div className="relative w-full h-[540px] bg-gray-100 rounded-lg overflow-hidden">
        {cameraActive ? (
          <video
            ref={videoRef}
            className="w-full h-full object-cover"
            autoPlay
            playsInline
            muted
          />
        ) : (
          <div className="flex items-center justify-center h-full">
            <Camera className="w-16 h-16 text-gray-400" />
          </div>
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
            {emotion >= 0.7
              ? 'Cảm xúc bạn thật tích cực'
              : emotion >= 0.3
              ? 'Cảm xúc bình thường'
              : 'Cảm xúc tiêu cực'}
          </p>
          <p className="text-sm text-gray-600">
            Chúc bạn một ngày tốt lành ❤️❤️❤️
          </p>
        </div>
      </div>

      {/* Controls */}
      <div className="flex justify-center">
        <Button
          onClick={() => setCameraActive(!cameraActive)}
          className="bg-primary hover:bg-primary/90"
        >
          {cameraActive ? 'Tắt Camera' : 'Bật Camera'}
        </Button>
      </div>
    </div>
  );
}
