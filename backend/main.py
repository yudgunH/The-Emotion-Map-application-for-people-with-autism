# built-in dependencies
from typing import Union

# 3rd party dependencies
from flask import Flask, request, jsonify
from flask_cors import CORS
import numpy as np

# project dependencies
from deepface import DeepFace
from deepface.commons import image_utils




flask = Flask(__name__)
CORS(flask)

# pylint: disable=no-else-return, broad-except




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


# built-in dependencies
from typing import Union

# 3rd party dependencies
from flask import Flask, request, jsonify
from flask_cors import CORS
import numpy as np

# project dependencies
from deepface import DeepFace
from deepface.commons import image_utils




flask = Flask(__name__)
CORS(flask)

# pylint: disable=no-else-return, broad-except




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

        # Extract the dominant emotion
        dominant_emotion = demographies[0]['dominant_emotion']
        return str(dominant_emotion), 200

    except Exception as err:
        return {"exception": str(err)}, 500



if __name__ == "__main__":
    flask.run(debug=True, port=5005)



if __name__ == "__main__":
    flask.run(debug=True, port=5005)
