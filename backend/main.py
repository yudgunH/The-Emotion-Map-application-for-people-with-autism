# built-in dependencies
from typing import Union

# 3rd party dependencies
from flask import Flask, request, jsonify, render_template
from flask_socketio import SocketIO, emit
from flask_cors import CORS
import speech_recognition as sr
import numpy as np

# project dependencies
from deepface import DeepFace
from deepface.commons import image_utils

import openai


# Khởi tạo Flask app và SocketIO
app = Flask(__name__)
CORS(app, supports_credentials=True)  # Cho phép tất cả các nguồn truy cập
socketio = SocketIO(app, cors_allowed_origins="*")  # Chỉ định nguồn được phép

recognizer = sr.Recognizer()

# Hàm gọi API ChatGPT để nhận gợi ý
def chat_call(message):
    openai.api_key = "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"

    response = openai.ChatCompletion.create(
        model="gpt-4o",  # Choose the GPT model
        messages=[
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
        message = f"Bạn là một trợ lý ảo giúp người dùng tự kỷ cải thiện kỹ năng giao tiếp. Người dùng đang giao tiếp với một người có cảm xúc {dominant_emotion}. Hãy cung cấp hai gợi ý cụ thể và dễ thực hiện để người dùng có thể tiếp tục giao tiếp hiệu quả. Hãy đảm bảo rằng lời khuyên của bạn nhẹ nhàng, hỗ trợ và phù hợp với người dùng tự kỷ. (Vui lòng trả lời không quá 2 gạch đầu dòng)"
        # advice = chat_call(message)
        print(dominant_emotion)
        return jsonify({"emotion": dominant_emotion}), 200

    except Exception as err:
        return {"exception": str(err)}, 500

# Socket event để xử lý nhận dạng giọng nói
@socketio.on('start_recognition')
def handle_start_recognition():
    try:
        while True:
            with sr.Microphone() as source:
                print("Listening...")
                audio = recognizer.listen(source)
            text = recognizer.recognize_google(audio, language="vi-VN")
            print(text)
            emit('recognized_text', {'text': text})
    except sr.UnknownValueError:
        emit('recognized_text', {'text': "Sorry, I could not understand the audio."})
    except sr.RequestError as e:
        emit('recognized_text', {'text': f"Recognition service error: {e}"})

if __name__ == '__main__':
    socketio.run(app, debug=True, port=5005)
