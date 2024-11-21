// components/ui/Header.tsx
'use client'

import { Button } from '@/components/ui/button'
import Image from 'next/image'

const Header = () => {
  return (
    <header className="w-full flex justify-between items-center p-4 border-b">
      <div className="flex items-center">
        <Image src="/placeholder.svg?height=50&width=50" alt="Logo" width={50} height={50} />
        <span className="ml-2 text-xl font-bold">eCare</span>
      </div>
      <div className="flex items-center gap-4">
        <span>Chế Độ Màu</span>
        <Button variant="outline">Đăng Nhập</Button>
        <Button>Đăng Ký</Button>
      </div>
    </header>
  )
}

export default Header
