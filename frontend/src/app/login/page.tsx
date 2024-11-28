"use client"

import Image from "next/image"
import Link from "next/link"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export default function LoginPage() {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <main className="flex flex-1">
        <div className="hidden lg:flex lg:w-1/2 items-center justify-center p-12">
          <Image src="/login_and_register.png" alt="Children Playing" width={800} height={800} />
        </div>
        <div className="w-full lg:w-1/2 flex items-center justify-center p-8">
          <div className="w-full max-w-md space-y-8">
            <h2 className="text-3xl font-bold text-center text-gray-900">Đăng Nhập</h2>
            <form className="space-y-6">
              <div className="space-y-2">
                <Input
                  id="email"
                  type="email"
                  placeholder="Email"
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                />
              </div>
              <div className="space-y-2">
                <Input
                  id="password"
                  type="password"
                  placeholder="Mật khẩu"
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                />
              </div>
              <div className="text-right">
                <Link href="#" className="text-sm text-purple-600 hover:underline">
                  Quên mật khẩu?
                </Link>
              </div>
              <Button type="submit" className="w-full bg-red-500 hover:bg-red-600 text-white py-2 rounded-md">
                Đăng nhập
              </Button>
            </form>
            
            <div className="text-center text-sm">
              Bạn chưa có tài khoản?{" "}
              <Link href="/register" className="text-red-500 hover:underline">
                Đăng ký
              </Link>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

