'use client'

import React from 'react'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"

interface InstructionsDialogProps {
  isOpen: boolean
  onClose: () => void
}

export function InstructionsDialog({ isOpen, onClose }: InstructionsDialogProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Hướng dẫn sử dụng</DialogTitle>
          <DialogDescription>
            Cách sử dụng tính năng hỗ trợ giao tiếp
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4">
          <p>1. Nhập câu hỏi hoặc vấn đề của bạn vào hộp thoại.</p>
          <p>2. Hệ thống sẽ phân tích và đưa ra gợi ý để hỗ trợ giao tiếp của bạn.</p>
          <p>3. Bạn có thể tiếp tục đặt câu hỏi hoặc yêu cầu làm rõ nếu cần.</p>
          <p>4. Để đóng hộp thoại trò chuyện, nhấn nút "Hỗ trợ giao tiếp" một lần nữa.</p>
          <p>5. Sử dụng micro của thiết bị để thu thập giọng nói và thông tin hội thoại của người dùng.</p>  
          <p>6. Đưa ra lời khuyên về cách ứng xử cho tình huống hiện tại của người tự kỷ.</p>        
        </div>
        <Button onClick={onClose} className="mt-4">Đóng</Button>
      </DialogContent>
    </Dialog>
  )
}

