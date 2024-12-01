import { Rocket } from 'lucide-react'
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import Link from "next/link"

interface InfoCardProps {
  title: string;
  description: string;
  link: string;
  color?: string; 
}

export default function InfoCard({ title, description, link, color = "bg-red-500" }: InfoCardProps) {

  const textColor = color.includes("white") || color.includes("yellow") ? "text-gray-800" : "text-white";

  return (
    <Card className="overflow-hidden border-none shadow-lg hover:shadow-xl transition-shadow duration-300 flex flex-col min-h-[250px]">
      <CardHeader className={`relative ${color} ${textColor} p-4`}>
        <h3 className="text-lg font-medium leading-6">{title}</h3>
        <div className={`absolute -bottom-4 left-0 right-0 h-4 ${color}`}>
          <div className="absolute bottom-0 left-0 right-0 h-4 bg-white rounded-t-[100%]" />
        </div>
      </CardHeader>
      <CardContent className="flex-grow pt-6 px-4 bg-white">
        <p className="text-gray-600 text-sm leading-relaxed">
          {description}
        </p>
      </CardContent>
      <CardFooter className="bg-white pt-0 pb-4 px-4">
        <Link 
          href={link}
          className="inline-flex items-center text-sm text-gray-500 hover:text-gray-700 transition-colors"
        >
          Tìm hiểu thêm →
        </Link>
      </CardFooter>
    </Card>
  )
}

