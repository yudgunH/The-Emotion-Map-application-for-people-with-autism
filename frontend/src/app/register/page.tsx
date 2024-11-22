import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function SignUp() {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <main className="flex flex-1">
        <div className="hidden lg:flex lg:w-1/2 items-center justify-center p-12">
          <Image src="/login_and_register.png" alt="Children Playing" width={800} height={800} />
        </div>
        <div className="w-full lg:w-1/2 flex items-center justify-center p-8">
          <div className="w-full max-w-md space-y-8">
            <h2 className="text-3xl font-bold text-center text-gray-900">Đăng Ký</h2>
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
              <div className="space-y-2">
                <Input
                  id="confirm-password"
                  type="password"
                  placeholder="Xác nhận mật khẩu"
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                />
              </div>
              <Button className="w-full bg-red-500 hover:bg-red-600" type="submit">
                Đăng ký
              </Button>
            </form>
            <div className="text-center text-sm text-gray-500">Hoặc</div>
            <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-md">
              Đăng nhập bằng facebook
            </Button>
            </div>
          </div>
      </main>
    </div>
  );
}
