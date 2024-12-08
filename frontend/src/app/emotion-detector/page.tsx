// page.tsx
"use client";
import { useEffect, useState } from 'react';
// Import default thay vì import { io, Socket } từ socket.io-client
import io from 'socket.io-client';

// Tự suy ra type cho socket
type MySocket = ReturnType<typeof io>;

const SpeechPage = () => {
  const [socket, setSocket] = useState<MySocket | null>(null);
  const [recognizedText, setRecognizedText] = useState<string>('');
  const [isRecording, setIsRecording] = useState<boolean>(false);

  useEffect(() => {
    // Kết nối tới server socket.io
    const newSocket = io('http://localhost:5005');
    setSocket(newSocket);

    // Lắng nghe sự kiện recognized_text từ server
    newSocket.on('recognized_text', (data: { text: string }) => {
      setRecognizedText(data.text);
      setIsRecording(false);
    });

    // Dọn dẹp kết nối khi component unmount
    return () => {
      newSocket.disconnect();
    };
  }, []);

  const handleStartRecognition = () => {
    if (socket) {
      setIsRecording(true);
      // Gửi sự kiện start_recognition
      socket.emit('start_recognition');
    }
  };

  return (
    <div style={{ padding: '20px' }}>
      <h1>Nhận dạng giọng nói</h1>
      <button onClick={handleStartRecognition} disabled={isRecording}>
        {isRecording ? 'Đang ghi âm...' : 'Bắt đầu nhận dạng'}
      </button>
      {recognizedText && (
        <div style={{ marginTop: '20px' }}>
          <h2>Kết quả:</h2>
          <p>{recognizedText}</p>
        </div>
      )}
    </div>
  );
};

export default SpeechPage;
