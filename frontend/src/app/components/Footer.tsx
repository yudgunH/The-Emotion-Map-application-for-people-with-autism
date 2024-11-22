// components/ui/Footer.tsx
'use client'

import { GrInstagram } from "react-icons/gr";
import { FaFacebook } from "react-icons/fa6";
import { FaYoutube } from "react-icons/fa6";

const Footer = () => {
  return (
    <footer className="w-full bg-gray-100 p-8 mt-8">
      <div className="flex flex-col md:flex-row justify-between items-center">
        <div className="space-y-2 mb-4 lg:mb-0">
          <h3 className="font-bold text-gray-900">Hỗ Trợ Quản Lý Cảm Xúc</h3>
          <p>Sách hướng dẫn phát triển kỹ năng xã hội và cảm xúc</p>
          <p>Email: 220200xx@hcmue.edu.vn</p>
          <p>Website: emocare.abcyz</p>
          <p>Hotline: 0978561234 (tư vấn cả ngày) hoặc 06123456789 (hỗ trợ kỹ thuật)</p>
        </div>
        <div className="flex md:flex-row items-center gap-12">
          <span>Follow us</span>
          <FaFacebook size={50} color="#4267B2"/>
          <GrInstagram size={50} color="#E1306C"/>
          <FaYoutube size={50} color="#FF0000"/>
        </div>
      </div>
    </footer>
  )
}

export default Footer
