import { EmotionChart } from "@/components/emotion-chart"
import { QuizList } from "@/components/quiz-list"

export default function EmotionTracker() {
  return (
    <div className="container mx-auto py-6 space-y-6">
      <EmotionChart />
      <QuizList />
    </div>
  )
}

