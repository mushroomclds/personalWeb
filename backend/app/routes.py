from flask import Blueprint, jsonify, request
from database import db  # Import db from the new database module
from models import User

api = Blueprint('api', __name__)

@api.route('/api/users', methods=['GET'])
def get_users():
    users = User.query.all()
    users_list = [{"id": user.id, "name": user.name, "email": user.email} for user in users]
    return jsonify(users_list)

@api.route('/api/users', methods=['POST'])
def add_user():
    data = request.json
    new_user = User(name=data['name'], email=data['email'])
    db.session.add(new_user)
    db.session.commit()
    return jsonify({"message": "User added successfully!", "id": new_user.id}), 201

@api.route('/api/data', methods=['POST'])
def post_data():
    content = request.json
    return jsonify({'received': content, 'status': 'success'}), 201