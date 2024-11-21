'use client'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import Image from 'next/image'

export default function LoginPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white">
      <main className="flex flex-col md:flex-row items-center justify-center gap-8 p-8">
        <Image src="/placeholder.svg?height=300&width=300" alt="Children Illustration" width={300} height={300} />
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle className="text-center">Đăng Nhập</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Input placeholder="Email" />
            <Input type="password" placeholder="Mật khẩu" />
            <div className="flex justify-between items-center">
              <a href="#" className="text-sm text-blue-500">Quên mật khẩu?</a>
            </div>
            <Button className="w-full bg-red-500 text-white">Đăng nhập</Button>
            <div className="text-center">Hoặc</div>
            <Button className="w-full bg-blue-700 text-white">Đăng nhập bằng facebook</Button>
            <div className="text-center">
              Bạn chưa có tài khoản? <a href="#" className="text-red-500">Đăng ký</a>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  )
}

