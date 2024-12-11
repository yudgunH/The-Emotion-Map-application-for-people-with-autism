"use client";

import React, { useState, useRef, useEffect } from "react";
import { Send, Mic, MicOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import axios from "axios";
import io from "socket.io-client";

type MySocket = ReturnType<typeof io>;

interface Message {
  id: number;
  text: string;
  sender: "user" | "bot";
}

interface ChatboxProps {
  isOpen: boolean;
}

export default function Chatbox({ isOpen }: ChatboxProps) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputMessage, setInputMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const [socket, setSocket] = useState<MySocket | null>(null);

  const userId = 1;

  useEffect(() => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTop = scrollAreaRef.current.scrollHeight;
    }
  }, [messages]);

  useEffect(() => {
    if (isOpen && messages.length === 0) {
      const initialBotMessage: Message = {
        id: Date.now(),
        text: "Xin chào Phan Hưng, bạn cần tôi hỗ trợ gì?",
        sender: "bot",
      };
      setMessages([initialBotMessage]);
    }
  }, [isOpen, messages]);

  useEffect(() => {
    // Kết nối tới server socket.io
    const newSocket = io("http://localhost:5005");
    setSocket(newSocket);

    // Lắng nghe sự kiện recognized_text từ server
    newSocket.on("recognized_text", (data: { text: string }) => {
      setInputMessage(data.text);
    });

    // Xử lý kết nối và ngắt kết nối
    newSocket.on("connect", () => console.log("Đã kết nối tới server SocketIO"));
    newSocket.on("disconnect", () =>
      console.log("Mất kết nối tới server SocketIO")
    );

    // Dọn dẹp socket khi component unmount
    return () => {
      newSocket.disconnect();
    };
  }, []);

  const handleSendMessage = async () => {
    if (inputMessage.trim() === "") return;

    const userMessage: Message = {
      id: Date.now(),
      text: inputMessage,
      sender: "user",
    };

    setMessages((prevMessages) => [...prevMessages, userMessage]);
    setInputMessage("");
    setIsLoading(true);

    try {
      const response = await axios.post("http://localhost:5005/chatbox", {
        user_id: userId,
        message: inputMessage,
      });

      const { reply } = response.data;

      const botMessage: Message = {
        id: Date.now() + 1,
        text: reply,
        sender: "bot",
      };

      setMessages((prevMessages) => [...prevMessages, botMessage]);
    } catch (error: any) {
      console.error("Error sending message:", error);
      const errorMessage: Message = {
        id: Date.now() + 1,
        text: "Đã có lỗi xảy ra khi gửi tin nhắn. Vui lòng thử lại sau.",
        sender: "bot",
      };
      setMessages((prevMessages) => [...prevMessages, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const toggleListening = () => {
    if (!isListening) {
      startListening();
    } else {
      stopListening();
    }
  };

  const startListening = () => {
    setIsListening(true);
    if (socket) {
      socket.emit("start_recognition");
    }

    const botMessage: Message = {
      id: Date.now(),
      text: "Bắt đầu lắng nghe cuộc trò chuyện",
      sender: "bot",
    };
    setMessages((prevMessages) => [...prevMessages, botMessage]);
  };

  const stopListening = () => {
    setIsListening(false);
    if (socket) {
      socket.emit("stop_recognition");
    }

    const botMessage: Message = {
      id: Date.now(),
      text: "Dừng lắng nghe cuộc trò chuyện",
      sender: "bot",
    };
    setMessages((prevMessages) => [...prevMessages, botMessage]);
  };

  return (
    <div
      className={`fixed top-0 right-0 h-full w-[400px] bg-stone-600 transition-transform duration-300 ease-in-out ${
        isOpen ? "translate-x-0" : "translate-x-full"
      }`}
    >
      <div className="flex flex-col h-full">
        <div className="p-4 border-b border-stone-500">
          <h3 className="text-lg font-semibold text-white">Hỗ trợ giao tiếp</h3>
        </div>

        <ScrollArea className="flex-grow p-4" ref={scrollAreaRef}>
          <div className="space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${
                  message.sender === "user" ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`max-w-[80%] rounded-lg p-3 ${
                    message.sender === "user"
                      ? "bg-stone-700 text-white"
                      : "bg-stone-500 text-white"
                  }`}
                >
                  {message.text}
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className="max-w-[80%] rounded-lg p-3 bg-stone-500 text-white">
                  Đang tải...
                </div>
              </div>
            )}
          </div>
        </ScrollArea>

        <div className="p-4 border-t border-stone-500">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSendMessage();
            }}
            className="flex gap-2"
          >
            <Input
              type="text"
              placeholder="Nhập tin nhắn..."
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              className="flex-grow bg-stone-700 border-stone-500 text-white placeholder:text-stone-400"
              disabled={isLoading}
            />
            <Button
              type="button"
              size="icon"
              className="bg-stone-700 hover:bg-stone-800 text-white"
              onClick={toggleListening}
              disabled={isLoading}
            >
              {isListening ? <MicOff className="h-4 w-4" /> : <Mic className="h-4 w-4" />}
            </Button>
            <Button
              type="submit"
              size="icon"
              className="bg-stone-700 hover:bg-stone-800 text-white"
              disabled={isLoading}
            >
              <Send className="h-4 w-4" />
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}
