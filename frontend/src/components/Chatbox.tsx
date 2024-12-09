'use client'

import React, { useState, useRef, useEffect } from 'react'
import { Send } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import axios from 'axios' // Import axios

interface Message {
  id: number;
  text: string;
  sender: 'user' | 'bot';
}

interface ChatboxProps {
  isOpen: boolean;
}

export default function Chatbox({ isOpen }: ChatboxProps) {
  const [messages, setMessages] = useState<Message[]>([])
  const [inputMessage, setInputMessage] = useState('')
  const [isLoading, setIsLoading] = useState(false) // Trạng thái tải
  const scrollAreaRef = useRef<HTMLDivElement>(null)

  // Đặt userId cố định là 1
  const userId = 1;

  useEffect(() => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTop = scrollAreaRef.current.scrollHeight
    }
  }, [messages])

  const handleSendMessage = async () => {
    if (inputMessage.trim() === '') return

    const userMessage: Message = {
      id: Date.now(),
      text: inputMessage,
      sender: 'user'
    }
    setMessages(prevMessages => [...prevMessages, userMessage])
    setInputMessage('')
    setIsLoading(true) // Bắt đầu tải

    try {
      // Gửi yêu cầu đến API backend
      const response = await axios.post('http://localhost:5005/chatbox', {
        user_id: userId,
        message: inputMessage
      })

      const { reply } = response.data

      const botMessage: Message = {
        id: Date.now() + 1,
        text: reply,
        sender: 'bot'
      }

      setMessages(prevMessages => [...prevMessages, botMessage])
    } catch (error: any) {
      console.error("Error sending message:", error)
      const errorMessage: Message = {
        id: Date.now() + 1,
        text: "Đã có lỗi xảy ra khi gửi tin nhắn. Vui lòng thử lại sau.",
        sender: 'bot'
      }
      setMessages(prevMessages => [...prevMessages, errorMessage])
    } finally {
      setIsLoading(false) // Kết thúc tải
    }
  }

  return (
    <div 
      className={`fixed top-0 right-0 h-full w-[400px] bg-stone-600 transition-transform duration-300 ease-in-out ${
        isOpen ? 'translate-x-0' : 'translate-x-full'
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
                  message.sender === 'user' ? 'justify-end' : 'justify-start'
                }`}
              >
                <div
                  className={`max-w-[80%] rounded-lg p-3 ${
                    message.sender === 'user'
                      ? 'bg-stone-700 text-white'
                      : 'bg-stone-500 text-white'
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
              e.preventDefault()
              handleSendMessage()
            }}
            className="flex gap-2"
          >
            <Input
              type="text"
              placeholder="Nhập tin nhắn..."
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              className="flex-grow bg-stone-700 border-stone-500 text-white placeholder:text-stone-400"
              disabled={isLoading} // Vô hiệu hóa khi đang tải
            />
            <Button 
              type="submit" 
              size="icon"
              className="bg-stone-700 hover:bg-stone-800 text-white"
              disabled={isLoading} // Vô hiệu hóa khi đang tải
            >
              <Send className="h-4 w-4" />
            </Button>
          </form>
        </div>
      </div>
    </div>
  )
}
