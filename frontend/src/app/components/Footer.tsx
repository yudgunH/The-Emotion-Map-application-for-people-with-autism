// components/ui/Footer.tsx
'use client'

const Footer = () => {
  return (
    <footer className="w-full bg-gray-100 p-8 mt-8">
      <div className="flex flex-col md:flex-row justify-between items-center">
        <div className="text-center md:text-left">
          <h2 className="text-lg font-bold">Hỗ Trợ Quản Lý Cảm Xúc</h2>
          <p>Sách hướng dẫn phát triển kỹ năng xã hội và cảm xúc</p>
          <p>Email: 220208xx@vnu.edu.vn</p>
          <p>Website: emocare.abcyxz</p>
          <p>Hotline: 0987654321 (tư vấn xã hội) hoặc 0123456789 (hỗ trợ gia đình)</p>
        </div>
        <div className="flex gap-4 mt-4 md:mt-0">
          <span>Follow us</span>
          <a href="#" className="text-blue-500">Facebook</a>
          <a href="#" className="text-pink-500">Instagram</a>
          <a href="#" className="text-red-500">YouTube</a>
        </div>
      </div>
    </footer>
  )
}

export default Footer
