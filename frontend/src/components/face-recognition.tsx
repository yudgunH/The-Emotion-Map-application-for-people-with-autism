// pages/face-recognition.tsx
import React, { useRef, useEffect, useState } from 'react';

// Định nghĩa kiểu cho các biến state và các kiểu dữ liệu
interface FacialDb {
  [key: string]: string; // Giả sử facialDb là một đối tượng có key là string và value là string (base64 embeddings)
}

interface AnalysisResult {
  age: number;
  dominant_race: string;
  dominant_gender: string;
  dominant_emotion: string;
}

const FaceRecognitionPage: React.FC = () => {
  const facialRecognitionModel = process.env.NEXT_PUBLIC_FACE_RECOGNITION_MODEL || "Facenet";
  const faceDetector = process.env.NEXT_PUBLIC_DETECTOR_BACKEND || "opencv";
  const distanceMetric = process.env.NEXT_PUBLIC_DISTANCE_METRIC || "cosine";

  const serviceEndpoint = process.env.NEXT_PUBLIC_SERVICE_ENDPOINT;
  const antiSpoofing = process.env.NEXT_PUBLIC_ANTI_SPOOFING === "1";

  const videoRef = useRef<HTMLVideoElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  const [base64Image, setBase64Image] = useState<string>('');
  const [isVerified, setIsVerified] = useState<boolean | null>(null);
  const [identity, setIdentity] = useState<string | null>(null);
  const [isAnalyzed, setIsAnalyzed] = useState<boolean | null>(null);
  const [analysis, setAnalysis] = useState<string[]>([]);
  const [facialDb, setFacialDb] = useState<FacialDb>({});

  // Hàm lấy dữ liệu facialDb từ biến môi trường
  useEffect(() => {
    const loadFacialDb = async () => {
      const envVarsWithPrefix: FacialDb = {};
      for (const key in process.env) {
        if (key.startsWith("NEXT_PUBLIC_USER_")) {
          envVarsWithPrefix[key.replace("NEXT_PUBLIC_USER_", "")] = process.env[key] as string;
        }
      }
      return envVarsWithPrefix;
    };

    const fetchFacialDb = async () => {
      try {
        const loadedFacialDb = await loadFacialDb();
        setFacialDb(loadedFacialDb);
      } catch (error) {
        console.error('Error loading facial database:', error);
      }
    };

    fetchFacialDb();
  }, [facialDb]);

  // Hàm lấy stream từ camera
  useEffect(() => {
    let video = videoRef.current;
    if (video) {
      const getVideo = async () => {
        try {
          const stream = await navigator.mediaDevices.getUserMedia({ video: true });
          video.srcObject = stream;
          await video.play();
        } catch (err) {
          console.error("Error accessing webcam: ", err);
        }
      };
      getVideo();
    }
  }, []);

  // Hàm capture ảnh từ video
  const captureImage = (task: "verify" | "analyze") => {
    setIsVerified(null);
    setIdentity(null);

    const video = videoRef.current;
    const canvas = canvasRef.current;
    const context = canvas?.getContext('2d');

    if (video && canvas && context) {
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;

      context.drawImage(video, 0, 0, canvas.width, canvas.height);

      const base64Img = canvas.toDataURL('image/png');
      setBase64Image(base64Img);

      if (base64Image === null || base64Image === "") {
        return;
      }

      if (task === "verify") {
        verify(base64Image);
        console.log(`verification result is ${isVerified} - ${identity}`);
      } else if (task === "analyze") {
        analyze(base64Image);
      }
    }
  };

  // Hàm xác minh khuôn mặt
  const verify = async (base64Image: string) => {
    try {
      for (const key in facialDb) {
        const targetEmbedding = facialDb[key];

        const requestBody = JSON.stringify({
          model_name: facialRecognitionModel,
          detector_backend: faceDetector,
          distance_metric: distanceMetric,
          align: true,
          img1_path: base64Image,
          img2_path: targetEmbedding,
          enforce_detection: false,
          anti_spoofing: antiSpoofing,
        });

        const response = await fetch(`${serviceEndpoint}/verify`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: requestBody,
        });

        const data = await response.json();

        if (response.status !== 200) {
          console.log(data.error);
          setIsVerified(false);
          return;
        }

        if (data.verified === true) {
          setIsVerified(true);
          setIsAnalyzed(false);
          setIdentity(key);
          break;
        }
      }

      if (isVerified === null) {
        setIsVerified(false);
      }
    } catch (error) {
      console.error('Exception while verifying image:', error);
    }
  };

  // Hàm phân tích khuôn mặt
  const analyze = async (base64Image: string) => {
    const result: string[] = [];
    setIsAnalyzed(false);
    try {
      const requestBody = JSON.stringify({
        detector_backend: faceDetector,
        align: true,
        img_path: base64Image,
        enforce_detection: false,
        anti_spoofing: antiSpoofing,
      });

      const response = await fetch(`${serviceEndpoint}/analyze`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: requestBody,
      });

      const data = await response.json();

      if (response.status !== 200) {
        console.log(data.error);
        return;
      }

      for (const instance of data.results) {
        const summary = `${instance.age} years old ${instance.dominant_race} ${instance.dominant_gender} with ${instance.dominant_emotion} mood.`;
        console.log(summary);
        result.push(summary);
      }

      if (result.length > 0) {
        setIsAnalyzed(true);
        setIsVerified(null);
        setAnalysis(result);
      }
    } catch (error) {
      console.error('Exception while analyzing image:', error);
    }
    return result;
  };

  return (
    <div
      className="App"
      style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',
        textAlign: 'center',
        backgroundColor: '#282c34',
        color: 'white'
      }}
    >
      <header className="App-header">
        <h1>DeepFace React App</h1>
        {isVerified === true && <p style={{ color: 'green' }}>Verified. Welcome {identity}</p>}
        {isVerified === false && <p style={{ color: 'red' }}>Not Verified</p>}
        {isAnalyzed === true && <p style={{ color: 'green' }}>{analysis.join()}</p>}
        <video ref={videoRef} style={{ width: '100%', maxWidth: '500px' }} />
        <br /><br />
        <button onClick={() => captureImage('verify')}>Verify</button>
        <button onClick={() => captureImage('analyze')}>Analyze</button>
        <br /><br />
        <canvas ref={canvasRef} style={{ display: 'none' }} />
      </header>
    </div>
  );
};

export default FaceRecognitionPage;
