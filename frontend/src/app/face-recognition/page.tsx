"use client";
import React, { useState, useRef } from "react";
import axios from "axios";
import Webcam from "react-webcam";

const BASE_URL = "http://localhost:5005";

const Home: React.FC = () => {
  const [capturedImage, setCapturedImage] = useState<string | null>(null);
  const [result, setResult] = useState<string>("");
  const webcamRef = useRef<Webcam>(null);

  const convertBase64ToFile = (base64: string): File | null => {
    try {
      const arr = base64.split(",");
      const mime = arr[0].match(/:(.*?);/)?.[1];
      const bstr = atob(arr[1]);
      let n = bstr.length;
      const u8arr = new Uint8Array(n);
      while (n--) {
        u8arr[n] = bstr.charCodeAt(n);
      }
      return mime ? new File([u8arr], "captured_image.png", { type: mime }) : null;
    } catch (error) {
      console.error("Error converting Base64 to File:", error);
      return null;
    }
  };

  const callApi = async (endpoint: string, payload: object) => {
    try {
      const response = await axios.post(`${BASE_URL}/${endpoint}`, payload, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      setResult(JSON.stringify(response.data, null, 2)); // Định dạng đẹp cho kết quả
    } catch (error: any) {
      setResult(`Error: ${error.message}`);
      console.error("Error details:", error);
    }
  };

  const handleCapture = () => {
    const imageSrc = webcamRef.current?.getScreenshot();
    if (imageSrc) {
      setCapturedImage(imageSrc);
    } else {
      alert("Không thể chụp ảnh. Vui lòng thử lại.");
    }
  };

  const handleRetake = () => {
    setCapturedImage(null);
    setResult("");
  };

  const handleAnalyze = async () => {
    if (!capturedImage) {
      return alert("Vui lòng chụp một bức ảnh trước khi phân tích.");
    }
    try {
      // Chuyển đổi Base64 sang File
      const file = convertBase64ToFile(capturedImage);
      if (!file) {
        return alert("Không thể chuyển đổi ảnh.");
      }

      // Chuyển đổi File sang Base64 (nếu API yêu cầu định dạng này)
      const reader = new FileReader();
      reader.onloadend = async () => {
        const imgBase64 = reader.result as string;
        const payload = {
          img: imgBase64, // Định dạng đúng yêu cầu của API
          detector_backend: "opencv",
        };
        await callApi("analyze", payload);
      };
      reader.readAsDataURL(file);
    } catch (error: any) {
      setResult(`Error: ${error.message}`);
      console.error("Error details:", error);
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>DeepFace API Demo - Phân tích Cảm xúc</h1>
      
      <div style={{ marginBottom: "20px" }}>
        {!capturedImage ? (
          <div>
            <Webcam
              audio={false}
              ref={webcamRef}
              screenshotFormat="image/png"
              width={400}
              videoConstraints={{
                facingMode: "user",
              }}
            />
            <div style={{ marginTop: "10px" }}>
              <button onClick={handleCapture}>Chụp Ảnh</button>
            </div>
          </div>
        ) : (
          <div>
            <img src={capturedImage} alt="Captured" style={{ width: "400px" }} />
            <div style={{ marginTop: "10px" }}>
              <button onClick={handleAnalyze}>Phân Tích Cảm Xúc</button>
              <button onClick={handleRetake} style={{ marginLeft: "10px" }}>
                Chụp Lại
              </button>
            </div>
          </div>
        )}
      </div>

      <div>
        <h3>Kết Quả</h3>
        <pre>{result}</pre>
      </div>
    </div>
  );
};

export default Home;
