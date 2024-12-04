import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,

  // Cấu hình rewrite proxy cho API
  async rewrites() {
    return [
      {
        source: '/api/:path*',  // Định nghĩa đường dẫn để proxy API
        destination: 'http://localhost:5005/:path*',  // API backend của bạn
      },
    ];
  },

  // Cấu hình khác nếu cần (ví dụ, hỗ trợ hình ảnh, cấu hình khác...)
};

export default nextConfig;
