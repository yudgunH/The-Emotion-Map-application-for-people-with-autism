import { Rocket } from 'lucide-react'
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import Link from "next/link"

interface InfoCardProps {
  title: string;
  description: string;
  link: string;
}

export default function InfoCard({ title, description, link }: InfoCardProps) {
  return (
    <
      Card className="max-w-md overflow-hidden border-none shadow-lg">
      {/* Custom curved header */}
      <CardHeader className="relative bg-red-500 text-white p-4 rounded-t-xl">
        <div className="flex items-center gap-2">
          <h3 className="text-xl font-medium">{title}</h3>
          <Rocket className="w-5 h-5" />
        </div>
        {/* Curved bottom edge */}
        <div className="absolute -bottom-4 left-0 right-0 h-4 bg-red-500">
          <div className="absolute bottom-0 left-0 right-0 h-4 bg-[#FFF5F5] rounded-t-[100%]" />
        </div>
      </CardHeader>
      
      <CardContent className="pt-6 pb-4 px-4 bg-[#FFF5F5]">
        <p className="text-gray-800 mb-4 leading-relaxed">
          {description}
        </p>
        <Link 
          href={link}
          className="text-gray-600 hover:text-gray-800 transition-colors inline-flex items-center"
        >
          Tìm hiểu thêm -&gt;
        </Link>
      </CardContent>
    </Card>
  )
}