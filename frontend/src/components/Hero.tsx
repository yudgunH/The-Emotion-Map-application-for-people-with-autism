import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card"; // Import Card từ shadcn

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
      <main className="container mx-auto max-w-5xl py-12">
        <h2 className="text-3xl font-bold text-center mb-12">Chúng Tôi Có Gì?</h2>

        <div className="grid md:grid-cols-3 gap-8">
          {/* Card for Service Section */}
          <Card>
            <CardHeader>
              <CardTitle>Theo dõi và phát triển</CardTitle>
              <CardDescription>
                EmoCare cung cấp những hỗ trợ hiệu quả cho trẻ em tự kỷ và các rối loạn về phát triển như ADHD, chậm phát triển và các vấn đề tâm lý khác.
              </CardDescription>
            </CardHeader>
            <CardFooter>
              <Button variant="link" className="p-0">Tìm hiểu thêm →</Button>
            </CardFooter>
          </Card>

          {/* Card for Resources Section */}
          <Card>
            <CardHeader>
              <CardTitle>Thực hiện kiểm tra</CardTitle>
              <CardDescription>
                EmyCare đưa ra các bài kiểm tra giúp bạn đánh giá được cảm xúc của bản thân.
              </CardDescription>
            </CardHeader>
            <CardFooter>
              <Button variant="link" className="p-0">Tìm hiểu thêm →</Button>
            </CardFooter>
          </Card>

          {/* Card for Education Section */}
          <Card>
            <CardHeader>
              <CardTitle>Kết Nối Với Cộng Đồng</CardTitle>
              <CardDescription>
                Educare trở giúp bạn kết nối với các chuyên gia, gia đình và cộng đồng, giúp bạn nhận được sự hỗ trợ từ người thân thiết.
              </CardDescription>
            </CardHeader>
            <CardFooter>
              <Button variant="link" className="p-0">Tìm hiểu thêm →</Button>
            </CardFooter>
          </Card>
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
