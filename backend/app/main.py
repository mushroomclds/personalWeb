from flask import Flask, jsonify
from flask_cors import CORS
from routes import api

app = Flask(__name__)
CORS(app)  # Enable CORS

@app.route('/')
def home():
    return jsonify({"message": "Welcome to the Angular-Python app!"})

app.register_blueprint(api)

if __name__ == '__main__':
    app.run(debug=True)