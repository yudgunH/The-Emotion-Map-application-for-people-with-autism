'use client'

import { useState } from "react"
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Switch } from "@/components/ui/switch"
import { UserDropdown } from "@/components/user-dropdown"

const Header = () => {
  const [isDynamic, setIsDynamic] = useState(true)
  const pathname = usePathname()

  const navItems = [
    { href: '/', label: 'Trang chủ' },
    { href: '/face-recognition', label: 'Kiểm tra cảm xúc' },
    { href: '/development', label: 'Nhật ký cảm xúc' },
    { href: '/guidance', label: 'Hướng dẫn can thiệp' },
  ]

  return (
    <header className="w-full bg-gray-100 flex items-center p-4 border-b">
      <div className="flex justify-start items-center flex-grow">
        <Link href="/">
          <Image src="/logo.png" alt="Logo" width={100} height={100} />
        </Link>
      </div>
      
      <nav className="flex items-center gap-11 pr-5">
        {navItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={`transition-colors ${
              pathname === item.href
                ? 'text-[#FE4E51] hover:text-[#00cccc]'
                : 'text-gray-600 hover:text-gray-300'
            }`}
          >
            {item.label}
          </Link>
        ))}
      </nav>

      <div className="flex items-center gap-4">
        <div className="flex items-center space-x-2 rounded-full bg-purple-100 px-2 py-1">
          <Switch
            id="color-mode"
            checked={isDynamic}
            onCheckedChange={setIsDynamic}
            className="data-[state=checked]:bg-purple-600"
          />
          <span className="text-xs font-medium text-purple-600">{isDynamic ? 'Động' : 'Trầm'}</span>
        </div>
        <UserDropdown />
      </div>
    </header>
  )
}

export default Header

