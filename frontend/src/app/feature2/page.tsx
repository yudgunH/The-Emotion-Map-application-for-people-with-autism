import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import Image from "next/image"

export default function InterventionGuide() {
  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-2xl font-semibold mb-6">Hướng dẫn can thiệp</h1>
      
      <Accordion type="single" collapsible className="space-y-4">
        <AccordionItem value="section-1" className="border rounded-lg bg-[#F0F8FF]">
          <AccordionTrigger className="px-4 hover:no-underline hover:bg-gray-50">
            <span className="text-left">
              1. Tìm hiểu về tự kỷ, trẻ bị tự kỷ và dấu hiệu của bệnh tự kỷ
            </span>
          </AccordionTrigger>
          <AccordionContent className="px-4 pb-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="space-y-2">
                <Image
                  src="/feature2_1.jpg"
                  alt="Child playing"
                  width={200}
                  height={100}
                  className="rounded-lg"
                />
                <p className="text-sm text-center">Sự hiểu biết trong cách trẻ có tự kỷ đáp ứng cảm nhận thế giới xung quanh</p>
              </div>
              <div className="space-y-2">
                <Image
                  src="/feature2_2.jpg"
                  alt="Child learning"
                  width={200}
                  height={100}
                  className="rounded-lg"
                />
                <p className="text-sm text-center">Sự hiểu biết trong cách trẻ có tự kỷ học tập và phát triển</p>
              </div>
              <div className="space-y-2">
                <Image
                  src="/feature2_3.jpg"
                  alt="Child communicating"
                  width={200}
                  height={100}
                  className="rounded-lg"
                />
                <p className="text-sm text-center">Trẻ em thích chơi đồ vật</p>
              </div>
              <div className="space-y-2">
                <Image
                  src="/feature2_4.jpg"
                  alt="Parent and child"
                  width={200}
                  height={100}
                  className="rounded-lg"
                />
                <p className="text-sm text-center">Giao tiếp giữa gia đình và trẻ bị tự kỷ</p>
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="section-2" className="border rounded-lg bg-[#F0F8FF]">
          <AccordionTrigger className="px-4 hover:no-underline hover:bg-gray-50">
            <span className="text-left">
              2. Xây dựng chương trình can thiệp
            </span>
          </AccordionTrigger>
          <AccordionContent className="px-4 pb-4">
            <div className="border rounded-lg overflow-hidden">
              <Image
                src="/feature2_5.png"
                alt="Mục tiêu can thiệp"
                width={600}
                height={300}
                className="w-full h-auto"
              />
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  )
}

