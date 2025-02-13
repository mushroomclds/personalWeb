import os
from flask import Flask, jsonify
from flask_cors import CORS
from database import db  # Import db from the new module
from routes import api

app = Flask(__name__)
CORS(app)

# MySQL Database Configuration
user = os.getenv('DATABASE_USER')
password = os.getenv('DATABASE_PASSWORD')
host = os.getenv('DATABASE_HOST')
port = os.getenv('DATABASE_PORT')
database = os.getenv('DATABASE_NAME')

app.config['SQLALCHEMY_DATABASE_URI'] = f'mysql+mysqlconnector://{user}:{password}@{host}:{port}/{database}'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

# Initialize SQLAlchemy with app
db.init_app(app)

# Register routes after db initialization
app.register_blueprint(api)

@app.route('/')
def home():
    return jsonify({"message": "Welcome to the Angular-Python app!"})

if __name__ == '__main__':
    with app.app_context():  # Ensure the app context is set for database operations
        db.create_all()  # Create tables if they don’t exist
    app.run(debug=True, host='0.0.0.0')