import { Button } from "@/components/ui/button"

export default function LatestUpdates() {
  return (
    <div className="bg-gray-100 rounded-3xl p-8 md:p-12">
      <div className="max-w-6xl mx-auto">
        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row justify-center gap-4 mb-8">
          <Button 
            className="bg-[#40E0D0] hover:bg-[#3BC9BB] text-white rounded-full px-8 py-6 text-lg font-medium"
          >
            Hướng Dẫn Sử Dụng
          </Button>
          <Button 
            className="bg-[#40E0D0] hover:bg-[#3BC9BB] text-white rounded-full px-8 py-6 text-lg font-medium"
          >
            Câu Hỏi Thường Gặp
          </Button>
        </div>

        {/* Content Grid */}
        <div className="grid md:grid-cols-2 gap-8 items-start mt-8">
          {/* Latest Updates */}
          <div>
            <h2 className="text-2xl font-bold mb-6">Bài Mới Cập Nhật</h2>
            <div className="space-y-4">
              <div className="border-b border-gray-200 pb-3">
                <p className="text-gray-800">
                  Sách hướng dẫn phát triển kỹ năng xã hội và cảm xúc
                </p>
              </div>
              <div className="border-b border-gray-200 pb-3">
                <p className="text-gray-800">
                  Sách Hướng dẫn phát triển kỹ năng chơi
                </p>
              </div>
              <div className="border-b border-gray-200 pb-3">
                <p className="text-gray-800">
                  Sách Hướng dẫn hỗ trợ hành vi tích cực
                </p>
              </div>
              <div className="border-b border-gray-200 pb-3">
                <p className="text-gray-800">
                  Giới thiệu về cách sử dụng lực rõ hợp tầng động- giảm chú ý Vivaparent là hỗ trợ có giúp theo dõi quá trình điều trị cho trẻ tăng động - giảm chú ý
                </p>
              </div>
              <div className="pb-3">
                <p className="text-gray-800">
                  Hỗ trợ hành vi tích cực
                </p>
              </div>
            </div>
          </div>

          {/* Video Section */}
          <div className="aspect-video rounded-lg overflow-hidden bg-gray-100">
            <iframe
              className="w-full h-full"
              src="https://www.youtube.com/watch?v=-xDHRhAl69U&ab_channel=H%C6%B0ngNguy%E1%BB%85nDuy"
              title="Educational Video"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
        </div>
      </div>
    </div>
  )
}

