'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardContent } from "@/components/ui/card"
import { cn } from "@/lib/utils"
import Link from 'next/link'

export default function Page() {
  const [selectedIndex, setSelectedIndex] = useState<number>(2)

  const menuItems = [
    "Tự kỷ là gì",
    "Theo dõi và sàng lọc phát triển là gì",
    "Vì sao theo dõi và sàng lọc phát triển lại quan trọng",
    "Chậm phát triển là gì",
    "Quản lý cảm xúc quan trọng như thế nào đối với người tự kỷ",
  ]

  const [contents, setContents] = useState<string[]>([
    "Tự kỷ (Autism Spectrum Disorder - ASD) là một rối loạn phát triển thần kinh kéo dài suốt đời, ảnh hưởng đến cách một người giao tiếp, tương tác xã hội và xử lý thông tin từ môi trường xung quanh. Tự kỷ không phải là một bệnh, mà là một trạng thái phát triển khác biệt, biểu hiện ở mức độ khác nhau và dưới nhiều dạng (phổ tự kỷ).\n\nĐặc điểm của người tự kỷ\n- Khó khăn trong giao tiếp và tương tác xã hội\n- Hành vi lặp lại và sở thích đặc biệt\n- Khả năng thích nghi với thay đổi thấp\n- Nhạy cảm hoặc kém nhạy cảm với các kích thích giác quan",
    "Theo dõi phát triển là quá trình quan sát trẻ lớn lên để xem liệu trẻ có đạt các mốc phát triển thông thường khi chơi, học, nói, vận động và ứng xử với người khác.\n\nSàng lọc phát triển là việc đánh giá cẩn thận hơn sự phát triển của trẻ, để xác định liệu trẻ có nguy cơ rối loạn phát triển hay không\n\nBác sỹ, y tá hoặc các cán bộ chuyên môn có thể hỏi bạn một số câu hỏi hoặc nói chuyện và chơi với con bạn trong buổi khám để kiểm tra cách con bạn học, nói, cư xử và vận động. Bản thân bạn là người chăm sóc cũng có thể tự làm được một số bảng kiểm sàng lọc. Sàng lọc phát triển sẽ giúp bạn biết được con bạn có cần gặp bác sĩ chuyên khoa hay không vì trong nhiều trường hợp xét nghiệm máu và các xét nghiệm sinh học khác không giúp chẩn đoán được chậm phát triển",
    "Nếu không phát hiện sớm chậm phát triển ở trẻ, trẻ sẽ không được nhận những hỗ trợ cần thiết trong giai đoạn sớm. Điều này làm cho trẻ gặp khó khăn khi đến trường. Ở Mỹ, có 17% trẻ bị khiếm khuyết về mặt phát triển hoặc hành vi như tự kỷ, khuyết tật trí tuệ (còn được gọi là chậm phát triển trí tuệ) hoặc Tăng động giảm chú ý (ADHD).\n\nBên cạnh đó, nhiều trẻ còn bị chậm phát triển về ngôn ngữ và những lĩnh vực khác. Tuy nhiên, chưa đến một nửa những trẻ này được phát hiện trước khi vào cấp 1. Trẻ cần được phát hiện và nhận hỗ trợ càng sớm càng tốt để có thể đi học được.",
    "Các thể hiện về nhận thức, cảm xúc, và kỹ năng như mỉm cười, với tay, chỉ tay, vẫy tay “tạm biệt”, bước đi đầu tiên được gọi là những mốc phát triển. Trẻ sẽ thể hiện và đạt được các mốc phát triển này thông qua các hoạt động hàng ngày như: chơi, ăn, học, nói, cư xử và vận động.\n\nKhi trẻ của bạn không đạt được những mốc phát triển tại cùng thời điểm như những trẻ em khác có cùng độ tuổi, thì có thể coi là chậm phát triển.\n\nCác rối loạn phát triển hay gặp bao gồm rối loạn phổ tự kỷ, chậm phát triển toàn diện (còn được gọi là chậm phát triển trí tuệ),khó khăn về học,tăng động giảm chú ý(ADHD). Con bạn có thể không khỏi hay hết rối loạn phát triển/chậm phát triển, nhưng với sự hỗ trợ, can thiệp sớm và đúng cách, dựa trên các phương pháp có kiểm chứng khoa học, con bạn có thể phát triển tốt hơn, tối đa tiềm năng của chính con.",
    "Người tự kỷ thường nhạy cảm với môi trường xung quanh, dễ bị kích thích bởi âm thanh, ánh sáng, hoặc sự thay đổi không mong đợi.Kỹ năng quản lý cảm xúc giúp họ giảm căng thẳng và duy trì trạng thái ổn định hơn.\n\nKhả năng nhận biết và điều chỉnh cảm xúc của bản thân giúp người tự kỷ hiểu rõ hơn cảm xúc của người khác. Điều này quan trọng để xây dựng mối quan hệ và cải thiện kỹ năng giao tiếp, vì họ có thể học cách phản ứng phù hợp với các tình huống xã hội.\n\nKhi không kiểm soát được cảm xúc, người tự kỷ có thể biểu hiện những hành vi không mong muốn như tự làm đau bản thân hoặc có hành vi hung hăng. Quản lý cảm xúc giúp giảm thiểu những hành vi này và cải thiện chất lượng cuộc sống.",
  ])

  const handleMenuItemClick = (index: number) => {
    setSelectedIndex(index)
  }

  const handleContentUpdate = (newContent: string) => {
    setContents((prevContents) => {
      const updatedContents = [...prevContents]
      updatedContents[selectedIndex] = newContent
      return updatedContents
    })
  }

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Theo dõi và phát triển</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-[500px_1fr] gap-6">
        <div className="space-y-1">
          {menuItems.map((item, index) => (
            <Button
              key={index}
              variant={index === selectedIndex ? "destructive" : "secondary"}
              className={cn(
                "w-full justify-start text-left h-auto py-3 px-4 text-base font-normal",
                index === selectedIndex && "bg-[#F87171] hover:bg-[#F87171]/90 text-white font-medium"
              )}
              onClick={() => handleMenuItemClick(index)}
            >
              {item}
              <span className="ml-auto">›</span>
            </Button>
          ))}
        </div>

        <div className="bg-white rounded-lg shadow-lg p-6 border">
          <div 
            contentEditable
            className="prose max-w-none whitespace-pre-wrap"
            suppressContentEditableWarning
            onBlur={(e) => handleContentUpdate(e.currentTarget.textContent || '')}
          >
            {contents[selectedIndex]}
          </div>
        </div>
      </div>

      <div className="mt-12">
        <h2 className="text-xl font-bold mb-6">Hãy cho tôi biết bạn là ai ?</h2>
        <p className="text-gray-600 mb-6">Để giúp chúng tôi đưa ra lời khuyên phù hợp</p>
        
        <div className="grid md:grid-cols-2 gap-6">
          <Card>
            <CardHeader 
                className={cn(
                "bg-[#277d23] text-white font-semibold text-center rounded-t-[30px] rounded-b-none border-none border",
                "flex justify-center items-center"
                )}
            >
                Người quản lý cảm xúc
            </CardHeader>
            <CardContent 
                className="bg-gray-200 text-center rounded-b-[20px] p-6 border border-t-0 border-[#ccc]"
            >
                <p className="mb-4">Bạn là người tự kiểm tra và quản lý cảm xúc cá nhân</p>
                <Link href='/face-recognition'>
                  <Button variant="secondary" className="bg-[#40E0D0] hover:bg-[#40E0D0]/90 text-white px-4 py-2 rounded-full">
                  Nhận những lời khuyên
                  </Button>
                </Link>
            </CardContent>
            </Card>

            <Card>
            <CardHeader 
                className={cn(
                "bg-[#4B0082] text-white font-semibold text-center rounded-t-[30px] rounded-b-none border-none border",
                "flex justify-center items-center"
                )}
            >
                Phụ Huynh
            </CardHeader>
            <CardContent 
                className="bg-gray-200 text-center rounded-b-[20px] p-6 border border-t-0 border-[#ccc]"
            >
                <p className="mb-4">Bạn là phụ huynh của trẻ tự kỷ</p>
                <Link href={'/guidance'}>
                  <Button variant="secondary" className="bg-[#40E0D0] hover:bg-[#40E0D0]/90 text-white px-4 py-2 rounded-full">
                  Hướng dẫn can thiệp
                  </Button>
                </Link>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
