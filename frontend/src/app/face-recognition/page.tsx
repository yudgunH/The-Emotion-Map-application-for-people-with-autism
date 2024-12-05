"use client";
import React, { useState } from "react";
import axios from "axios";

const BASE_URL = "http://localhost:5005";

const Home: React.FC = () => {
  const [img, setImg] = useState<File | null>(null);
  const [img1, setImg1] = useState<File | null>(null);
  const [img2, setImg2] = useState<File | null>(null);
  const [result, setResult] = useState<string>("");

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, setImage: (file: File | null) => void) => {
    const file = e.target.files?.[0];
    setImage(file || null);
  };

  const convertFileToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = reject;
      reader.readAsDataURL(file); // Tự động thêm "data:image/...;base64,"
    });
  };

  const callApi = async (endpoint: string, payload: object) => {
    try {
      const response = await axios.post(`${BASE_URL}/${endpoint}`, payload, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      setResult(response.data); // Hiển thị kết quả trả về
    } catch (error: any) {
      setResult(`Error: ${error.message}`);
      console.error("Error details:", error);
    }
  };

  const handleRepresent = async () => {
    if (!img) return alert("Please upload an image for represent.");
    const imgBase64 = await convertFileToBase64(img);
    const payload = {
      img: imgBase64, // Định dạng đúng yêu cầu của API
      model_name: "VGG-Face",
      detector_backend: "opencv",
    };
    await callApi("represent", payload);
  };

  const handleVerify = async () => {
    if (!img1 || !img2) return alert("Please upload both images for verification.");
    const img1Base64 = await convertFileToBase64(img1);
    const img2Base64 = await convertFileToBase64(img2);
    const payload = {
      img1: img1Base64,
      img2: img2Base64,
      model_name: "VGG-Face",
      detector_backend: "opencv",
    };
    await callApi("verify", payload);
  };

  const handleAnalyze = async () => {
    if (!img) return alert("Please upload an image for analysis.");
    const imgBase64 = await convertFileToBase64(img);
    const payload = {
      img: imgBase64,
      detector_backend: "opencv",
    };
    await callApi("analyze", payload);
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>DeepFace API Demo</h1>
      <div>
        <h3>Represent</h3>
        <input type="file" onChange={(e) => handleFileChange(e, setImg)} />
        <button onClick={handleRepresent}>Submit</button>
      </div>

      <div>
        <h3>Verify</h3>
        <input type="file" onChange={(e) => handleFileChange(e, setImg1)} />
        <input type="file" onChange={(e) => handleFileChange(e, setImg2)} />
        <button onClick={handleVerify}>Submit</button>
      </div>

      <div>
        <h3>Analyze</h3>
        <input type="file" onChange={(e) => handleFileChange(e, setImg)} />
        <button onClick={handleAnalyze}>Submit</button>
      </div>

      <div>
        <h3>Result</h3>
        <pre>{result}</pre>
      </div>
    </div>
  );
};

export default Home;
