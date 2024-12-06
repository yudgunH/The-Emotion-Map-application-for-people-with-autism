

# built-in dependencies
from typing import Union

# 3rd party dependencies
from flask import Flask, request, jsonify
from flask_cors import CORS
import numpy as np

# project dependencies
from deepface import DeepFace
from deepface.commons import image_utils

import openai


flask = Flask(__name__)
CORS(flask)


def chat_call(message):
    openai.api_key = "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"

# Make the API call
    response = openai.ChatCompletion.create(
        model="gpt-3.5-turbo",  # Choose the GPT model
        messages=[
            {"role": "user", "content": message}
        ]
    )
    # Extract and print the response
    reply = response['choices'][0]['message']['content']
    return reply



def extract_image_from_request(img_key: str) -> Union[str, np.ndarray]:

    if request.files:
        # request.files is instance of werkzeug.datastructures.ImmutableMultiDict
        # file is instance of werkzeug.datastructures.FileStorage
        file = request.files.get(img_key)

        if file is None:
            raise ValueError(f"Request form data doesn't have {img_key}")

        if file.filename == "":
            raise ValueError(f"No file uploaded for '{img_key}'")

        img = image_utils.load_image_from_file_storage(file)

        return img
    # Check if the request is coming as base64, file path or url from json or form data
    elif request.is_json or request.form:
        input_args = request.get_json() or request.form.to_dict()

        if input_args is None:
            raise ValueError("empty input set passed")

        # this can be base64 encoded image, and image path or url
        img = input_args.get(img_key)

        if not img:
            raise ValueError(f"'{img_key}' not found in either json or form data request")

        return img

    # If neither JSON nor file input is present
    raise ValueError(f"'{img_key}' not found in request in either json or form data")


@flask.route("/analyze", methods=["POST"])
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
        message = f"Giả sử bạn là người tự kỉ, người đối diện bạn đang có vẻ {dominant_emotion} . Bạn có thể làm gì tiếp để giao tiếp với người đối diện. (Chú ý: Trả lời không quá 2 gạch đầu dòng)"
        advice  = chat_call(message)
        return jsonify({"emotion": dominant_emotion, "advice": advice}), 200

    except Exception as err:
        return {"exception": str(err)}, 500



if __name__ == "__main__":
    flask.run(port=5005)



