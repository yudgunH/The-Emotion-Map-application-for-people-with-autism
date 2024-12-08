import Link from "next/link"
import { ArrowLeft, Clock, Book, Users, Activity } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

export default function InterventionGuidePage() {
  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <Link href="/feature1" className="flex items-center text-blue-600 hover:underline mb-6">
        <ArrowLeft className="mr-2" size={20} />
        Quay lại
      </Link>

      <h1 className="text-3xl font-bold mb-6">Hướng dẫn can thiệp cho phụ huynh</h1>

      <p className="text-lg mb-8">
        Dưới đây là một số hướng dẫn và chiến lược can thiệp để hỗ trợ con bạn phát triển các kỹ năng quan trọng:
      </p>

      <div className="grid md:grid-cols-2 gap-6 mb-8">
        <Card>
          <CardHeader className="bg-[#f2c2c2] text-white">
            <CardTitle className="flex items-center">
              <Clock className="mr-2" />
              Can thiệp sớm
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-2">
            <p>Can thiệp sớm là chìa khóa để hỗ trợ sự phát triển của trẻ tự kỷ. Bắt đầu các liệu pháp và hỗ trợ càng sớm càng tốt.</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="bg-[#a39714] text-white">
            <CardTitle className="flex items-center">
              <Book className="mr-2" />
              Giáo dục cá nhân hóa
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-2">
            <p>Làm việc với các chuyên gia để phát triển một kế hoạch giáo dục cá nhân hóa phù hợp với nhu cầu cụ thể của con bạn.</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="bg-[#289489] text-white">
            <CardTitle className="flex items-center">
              <Users className="mr-2" />
              Kỹ năng xã hội
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-2">
            <p>Tập trung vào việc dạy và thực hành các kỹ năng xã hội thông qua các hoạt động tương tác và trò chơi có cấu trúc.</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="bg-[#942f28] text-white">
            <CardTitle className="flex items-center">
              <Activity className="mr-2" />
              Quản lý hành vi
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-2">
            <p>Học cách quản lý hành vi thách thức và khuyến khích hành vi tích cực thông qua các kỹ thuật can thiệp hành vi.</p>
          </CardContent>
        </Card>
      </div>

      <Accordion type="single" collapsible className="mb-8">
        <AccordionItem value="item-1">
          <AccordionTrigger>Chiến lược giao tiếp</AccordionTrigger>
          <AccordionContent>
            <ul className="list-disc pl-5 space-y-2">
              <li>Sử dụng hình ảnh và biểu tượng để hỗ trợ giao tiếp</li>
              <li>Khuyến khích việc sử dụng ngôn ngữ thông qua các hoạt động hàng ngày</li>
              <li>Thực hành kỹ năng lắng nghe và đáp ứng</li>
              <li>Sử dụng công nghệ hỗ trợ giao tiếp khi cần thiết</li>
            </ul>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="item-2">
          <AccordionTrigger>Phát triển kỹ năng vận động</AccordionTrigger>
          <AccordionContent>
            <ul className="list-disc pl-5 space-y-2">
              <li>Tham gia các hoạt động thể chất phù hợp với khả năng của trẻ</li>
              <li>Thực hành các kỹ năng vận động tinh như vẽ, cắt, và xếp hình</li>
              <li>Khuyến khích trẻ tham gia vào các công việc nhà đơn giản</li>
              <li>Sử dụng các trò chơi và hoạt động sensory để cải thiện nhận thức cơ thể</li>
            </ul>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="item-3">
          <AccordionTrigger>Hỗ trợ cảm xúc và tự điều chỉnh</AccordionTrigger>
          <AccordionContent>
            <ul className="list-disc pl-5 space-y-2">
              <li>Dạy trẻ nhận biết và đặt tên cho cảm xúc</li>
              <li>Tạo ra một môi trường an toàn và dự đoán được</li>
              <li>Sử dụng các kỹ thuật thư giãn như hít thở sâu hoặc đếm số</li>
              <li>Thiết lập thói quen và lịch trình hàng ngày</li>
            </ul>
          </AccordionContent>
        </AccordionItem>
      </Accordion>

      <div className="bg-blue-100 p-6 rounded-lg">
        <h2 className="text-xl font-semibold mb-4">Cần hỗ trợ thêm?</h2>
        <p className="mb-4">Nếu bạn cần thêm thông tin hoặc hỗ trợ cá nhân, đừng ngần ngại liên hệ với chúng tôi.</p>
        <Button>Liên hệ chuyên gia</Button>
      </div>
    </div>
  )
}