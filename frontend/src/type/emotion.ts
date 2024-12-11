export interface EmotionQuiz {
    title: string
    score: string
    emotionRating: {
      label: string
      color: string
    }
    date: string
    status: "Hoàn thành" | "Chưa hoàn thành"
  }
  
  export interface ChartData {
    date: string
    values: number[]
  }
  
  