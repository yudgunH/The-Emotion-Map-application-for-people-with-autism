
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card"; // Import Card từ shadcn
import InfoCard from "@/components/Info-card";
export default function Page() {
  return (
    <div className="min-h-screen bg-background">

      {/* Hero Section */}
      <div className="relative h-[400px] overflow-hidden rounded-custom w-full">
        <Image
          src="/hero_img.png"
          alt="Hero image of child playing"
          width={1200}
          height={400}
          className="object-cover w-full"
          priority
        />
      </div>

      {/* Main Content */}
      <main className="container mx-auto max-w-5xl py-20">
        <h2 className="text-3xl font-bold text-center mb-20">Chúng Tôi Có Gì?</h2>

        <div className="grid md:grid-cols-3 gap-8">
          <InfoCard
            title="Theo dõi và phát triển"
            description="EmoCare cung cấp những bộ câu hỏi được các Hiệp hội y khoa khuyến cáo rộng rãi như ASQ®-3, M-CHAT-R, PSC, CSHQ để theo dõi sự phát triển của trẻ và phát hiện sớm các nguy cơ rối loạn phát triển."
            link="/info1"
            color="bg-red-500"
          />
          <InfoCard
            title="Hỗ trợ tư vấn sớm"
            description="EmoCare sẽ hỗ trợ bạn trong việc tư vấn sớm và chăm sóc trẻ em của mình thông qua các bài viết, video hướng dẫn và các chuyên gia tư vấn."
            link="/info2"
            color="bg-yellow-500"
          />
          <InfoCard
            title="Kết nối cộng đồng"
            description="EmoCare giúp bạn kết nối với cộng đồng cha mẹ khắp cả nước, chia sẻ kinh nghiệm và học hỏi từ những người khác."
            link="/info3"
            color="bg-blue-500"
          />
        </div>

        {/* Illustrations */}
        <div className="flex justify-center items-center gap-12 mt-16 mx-auto max-w-5xl">
          <Image
            src="/hero_img2.png"
            alt="Hero image of child playing"
            width={1200}
            height={400}
            className="object-cover w-full"
            priority
          />
        </div>
      </main>
    </div>
  );
}
