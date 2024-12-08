import openai

# Nhập API Key của bạn tại đây
openai.api_key = "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"

def chat_with_gpt(prompt):
    try:
        # Tạo yêu cầu đến OpenAI API để trả lời câu hỏi
        response = openai.Completion.create(
            model="gpt-4o-mini",  # Sử dụng mô hình GPT-4
            messages=[{
                "role": "user", 
                "content": prompt
            }],
            max_tokens=150,  # Giới hạn số lượng token (từ) trong câu trả lời
            temperature=0.7,  # Độ sáng tạo của câu trả lời (0.0 đến 1.0)
        )
        return response['choices'][0]['message']['content'].strip()  # Trả về câu trả lời đã được xử lý
    except Exception as e:
        return f"Đã có lỗi xảy ra: {e}"

def main():
    print("Chào bạn! Tôi là trợ lý AI của OpenAI.")
    print("Hãy nhập 'exit' để kết thúc cuộc trò chuyện.\n")
    
    while True:
        user_input = input("Bạn: ")  # Nhập câu hỏi từ người dùng
        
        if user_input.lower() == "exit":
            print("Tạm biệt! Hẹn gặp lại.")
            break
        
        response = chat_with_gpt(user_input)  # Gửi yêu cầu đến GPT
        print("AI: " + response)  # Hiển thị câu trả lời từ GPT

if __name__ == "_main_":
    main()