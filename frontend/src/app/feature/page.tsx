'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardContent } from "@/components/ui/card"
import { cn } from "@/lib/utils"

export default function Page() {
  const [selectedIndex, setSelectedIndex] = useState<number>(2)

  const menuItems = [
    "Theo dõi và sáng lọc phát triển là gì",
    "Vì sao theo dõi và sáng lọc phát triển lại quan trọng",
    "Chậm phát triển là gì",
    "Quản lý cảm xúc quan trọng như thế nào đối với người tự kỷ",
    "Tự kỷ là gì"
  ]

  const [contents, setContents] = useState<string[]>([
    "Nội dung cho mục 1",
    "Nội dung cho mục 2",
    "Nội dung cho mục 3",
    "Nội dung cho mục 4",
    "Nội dung cho mục 5"
  ])

  const handleMenuItemClick = (index: number) => {
    setSelectedIndex(index)
  }

  const handleContentUpdate = (newContent: string) => {
    setContents((prevContents) => {
      const updatedContents = [...prevContents]
      updatedContents[selectedIndex] = newContent
      return updatedContents
    })
  }

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Theo dõi và phát triển</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-[500px_1fr] gap-6">
        <div className="space-y-1">
          {menuItems.map((item, index) => (
            <Button
              key={index}
              variant={index === selectedIndex ? "destructive" : "secondary"}
              className={cn(
                "w-full justify-start text-left h-auto py-3 px-4 text-base font-normal",
                index === selectedIndex && "bg-[#F87171] hover:bg-[#F87171]/90 text-white font-medium"
              )}
              onClick={() => handleMenuItemClick(index)}
            >
              {item}
              <span className="ml-auto">›</span>
            </Button>
          ))}
        </div>

        <div className="bg-white rounded-lg shadow-lg p-6 border">
          <div 
            contentEditable
            className="prose max-w-none whitespace-pre-wrap"
            suppressContentEditableWarning
            onBlur={(e) => handleContentUpdate(e.currentTarget.textContent || '')}
          >
            {contents[selectedIndex]}
          </div>
        </div>
      </div>

      <div className="mt-12">
        <h2 className="text-xl font-bold mb-6">Hãy cho tôi biết bạn là ai ?</h2>
        <p className="text-gray-600 mb-6">Để giúp chúng tôi đưa ra lời khuyên phù hợp</p>
        
        <div className="grid md:grid-cols-2 gap-6">
          <Card>
            <CardHeader 
                className={cn(
                "bg-[#277d23] text-white font-semibold text-center rounded-t-[30px] rounded-b-none border-none border",
                "flex justify-center items-center"
                )}
            >
                Người quản lý cảm xúc
            </CardHeader>
            <CardContent 
                className="bg-gray-200 text-center rounded-b-[20px] p-6 border border-t-0 border-[#ccc]"
            >
                <p className="mb-4">Bạn là người tự kiểm tra và quản lý cảm xúc cá nhân</p>
                <Button variant="secondary" className="bg-[#40E0D0] hover:bg-[#40E0D0]/90 text-white px-4 py-2 rounded-full">
                Nhận những lời khuyên
                </Button>
            </CardContent>
            </Card>

            <Card>
            <CardHeader 
                className={cn(
                "bg-[#4B0082] text-white font-semibold text-center rounded-t-[30px] rounded-b-none border-none border",
                "flex justify-center items-center"
                )}
            >
                Phụ Huynh
            </CardHeader>
            <CardContent 
                className="bg-gray-200 text-center rounded-b-[20px] p-6 border border-t-0 border-[#ccc]"
            >
                <p className="mb-4">Bạn là phụ huynh của trẻ tự kỷ</p>
                <Button variant="secondary" className="bg-[#40E0D0] hover:bg-[#40E0D0]/90 text-white px-4 py-2 rounded-full">
                Hướng dẫn can thiệp
                </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
