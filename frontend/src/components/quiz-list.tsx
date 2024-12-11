import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
  } from "@/components/ui/table"
  import { Badge } from "@/components/ui/badge"
  import { Button } from "@/components/ui/button"
  
  const quizzes = [
    {
      title: "Quản lý cảm xúc cơ bản",
      score: "85/100",
      emotionRating: { label: "Vui", color: "bg-green-500" },
      date: "2023-05-15",
      status: "Hoàn thành",
    },
    {
      title: "Đối phó với stress",
      score: "70/100",
      emotionRating: { label: "Tự tin", color: "bg-yellow-500" },
      date: "2023-05-20",
      status: "Hoàn thành",
    },
    {
      title: "Kiểm soát cơn giận",
      score: "N/A",
      emotionRating: { label: "Tức giận", color: "bg-red-500" },
      date: "2023-05-28",
      status: "Chưa hoàn thành",
    },
    {
      title: "Xây dựng sự tự tin",
      score: "90/100",
      emotionRating: { label: "Tự tin", color: "bg-blue-500" },
      date: "2023-05-31",
      status: "Hoàn thành",
    },
    {
      title: "Đối mặt với nỗi sợ",
      score: "75/100",
      emotionRating: { label: "Lo âu", color: "bg-purple-500" },
      date: "2023-06-05",
      status: "Hoàn thành",
    },
  ]
  
  export function QuizList() {
    return (
      <div className="w-full p-4 border rounded-lg bg-white mt-4">
        <h2 className="text-xl font-semibold mb-4">Quản lý Cảm xúc - Danh sách Quiz</h2>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Tên Quiz</TableHead>
              <TableHead>Điểm số</TableHead>
              <TableHead>Đánh giá cảm xúc</TableHead>
              <TableHead>Thời gian làm bài</TableHead>
              <TableHead>Trạng thái</TableHead>
              <TableHead>Chi tiết</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {quizzes.map((quiz, index) => (
              <TableRow key={index}>
                <TableCell>{quiz.title}</TableCell>
                <TableCell>{quiz.score}</TableCell>
                <TableCell>
                  <Badge className={`${quiz.emotionRating.color} text-white`}>
                    {quiz.emotionRating.label}
                  </Badge>
                </TableCell>
                <TableCell>{quiz.date}</TableCell>
                <TableCell>
                  <Badge variant={quiz.status === "Hoàn thành" ? "default" : "secondary"}>
                    {quiz.status}
                  </Badge>
                </TableCell>
                <TableCell>
                  <Button variant="ghost" size="sm">
                    Xem
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    )
  }
  
  