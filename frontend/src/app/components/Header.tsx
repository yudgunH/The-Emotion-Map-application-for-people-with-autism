// components/ui/Header.tsx
'use client'

import { useState } from "react"
import Image from 'next/image'

import { Button } from '@/components/ui/button'
import { Switch } from "@/components/ui/switch"


const Header = () => {
  const [isDynamic, setIsDynamic] = useState(true)

  return (
    <header className="w-full flex justify-between items-center p-4 border-b">
      <div className="flex items-center">
        <Image src="/logo.png" alt="Logo" width={100} height={100} />
      </div>
      <div className="flex items-center gap-4">
        <span>Chế Độ Màu</span>
        <div className="flex items-center space-x-2 rounded-full bg-purple-100 px-2 py-1">
              <Switch
                id="color-mode"
                checked={isDynamic}
                onCheckedChange={setIsDynamic}
                className="data-[state=checked]:bg-purple-600"
              />
              <span className="text-xs font-medium text-purple-600">{isDynamic ? 'Động' : 'Trầm'}</span>
            </div>
        <Button variant="outline">Đăng Nhập</Button>
        <Button>Đăng Ký</Button>
      </div>
    </header>
  )
}

export default Header
