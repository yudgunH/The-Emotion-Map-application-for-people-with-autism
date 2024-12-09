# built-in dependencies
from typing import Union

# 3rd party dependencies
from flask import Flask, request, jsonify, render_template
from flask_socketio import SocketIO, emit
from flask_cors import CORS
import speech_recognition as sr
import numpy as np
import time
# project dependencies
from deepface import DeepFace
from deepface.commons import image_utils

import openai


# Khởi tạo Flask app và SocketIO
app = Flask(__name__)
CORS(app, supports_credentials=True)  # Cho phép tất cả các nguồn truy cập
socketio = SocketIO(app, cors_allowed_origins="*", async_mode='threading')

recognizer = sr.Recognizer()

openai.api_key = "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"

def chat_call(message):

    # Định nghĩa vai trò system
    system_message = {
        "role": "system",
        "content": "Bạn là một trợ lý ảo giúp người dùng tự kỷ cải thiện kỹ năng giao tiếp. Hãy cung cấp hai gợi ý cụ thể và dễ thực hiện để người dùng có thể tiếp tục giao tiếp hiệu quả. Hãy đảm bảo rằng lời khuyên của bạn nhẹ nhàng, hỗ trợ và phù hợp với người dùng tự kỷ. (Vui lòng trả lời không quá 2 gạch đầu dòng)"
    }

    response = openai.ChatCompletion.create(
        model="gpt-4o",  # Choose the GPT model
        messages=[
            system_message,  # Thêm system vào đầu hội thoại
            {"role": "user", "content": message}
        ]
    )
    reply = response['choices'][0]['message']['content']
    return reply

# Hàm để lấy ảnh từ request
def extract_image_from_request(img_key: str) -> Union[str, np.ndarray]:
    if request.files:
        file = request.files.get(img_key)
        if file is None:
            raise ValueError(f"Request form data doesn't have {img_key}")
        if file.filename == "":
            raise ValueError(f"No file uploaded for '{img_key}'")
        img = image_utils.load_image_from_file_storage(file)
        return img
    elif request.is_json or request.form:
        input_args = request.get_json() or request.form.to_dict()
        if input_args is None:
            raise ValueError("empty input set passed")
        img = input_args.get(img_key)
        if not img:
            raise ValueError(f"'{img_key}' not found in either json or form data request")
        return img
    raise ValueError(f"'{img_key}' not found in request in either json or form data")

# Route để phân tích cảm xúc từ ảnh
@app.route("/analyze", methods=["POST"])
def analyze():
    input_args = request.get_json() or request.form.to_dict()

    try:
        img = extract_image_from_request("img")
    except Exception as err:
        return {"exception": str(err)}, 400

    try:
        demographies = DeepFace.analyze(
            img_path=img,
            actions="emotion",
            detector_backend=input_args.get("detector_backend", "opencv"),
            enforce_detection=input_args.get("enforce_detection", True),
            align=input_args.get("align", True),
            anti_spoofing=input_args.get("anti_spoofing", False),
        )
        dominant_emotion = demographies[0]['dominant_emotion']
        message = f"Người dùng đang giao tiếp với một người có cảm xúc {dominant_emotion}"
        advice = chat_call(message)
        print(dominant_emotion)
        return jsonify({"emotion": dominant_emotion, "advice": advice}), 200

    except Exception as err:
        return {"exception": str(err)}, 500
    


# Socket event để xử lý nhận dạng giọng nói
@socketio.on('start_recognition')
def handle_start_recognition():
    while True:
        try:
            with sr.Microphone() as source:
                print("Listening...")
                # Điều chỉnh ngưỡng năng lượng để phát hiện âm thanh
                recognizer.energy_threshold = 300  # Tùy chỉnh ngưỡng phù hợp với môi trường
                recognizer.pause_threshold = 1  # Khoảng thời gian phát hiện dừng nói (mặc định là 0.8 giây)
                
                # Lắng nghe và ghi nhận âm thanh
                audio = recognizer.listen(source, timeout=None)

                # Thêm thời gian chờ sau khi người dùng dừng nói
               # time.sleep(5)  # Chờ thêm 5 giây trước khi ngắt microphone

            text = recognizer.recognize_google(audio, language="vi-VN")
            print(text)
            emit('recognized_text', {'text': text})
        except sr.UnknownValueError:
            print("Ko hieeur")
            emit('recognized_text', {'text': "Sorry, I could not understand the audio."})
        except sr.RequestError as e:
            emit('recognized_text', {'text': f"Recognition service error: {e}"})



conversations = {}

@app.route("/chatbox", methods=["POST"])
def chatbox():
    try:
        input_args = request.get_json() or request.form.to_dict()
        user_id = input_args.get("user_id")  # Xác định người dùng
        user_message = input_args.get("message")
        
        if not user_id or not user_message:
            return {"error": "Both 'user_id' and 'message' are required."}, 400

        if user_id not in conversations:
            conversations[user_id] = [{"role": "system", "content": "Bạn là một trợ lý thân thiện giúp người dùng tự kỷ cải thiện giao tiếp."}]

        conversations[user_id].append({"role": "user", "content": user_message})

        response = openai.ChatCompletion.create(
            model="gpt-3.5-turbo",
            messages=conversations[user_id]
        )
        
        reply = response['choices'][0]['message']['content']

        conversations[user_id].append({"role": "assistant", "content": reply})
        print(conversations[user_id])
        return jsonify({"user_message": user_message, "reply": reply, "history": conversations[user_id]}), 200

    except Exception as err:
        return {"error": str(err)}, 500




if __name__ == '__main__':
    socketio.run(app, debug=True, port=5005, use_reloader=False)

