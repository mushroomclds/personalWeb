from flask import Blueprint, jsonify, request

api = Blueprint('api', __name__)

@api.route('/api/data', methods=['GET'])
def get_data():
    data = {
        'message': 'Hello from the Python backend!',
        'status': 'success'
    }
    return jsonify(data)

@api.route('/api/data', methods=['POST'])
def post_data():
    content = request.json
    return jsonify({'received': content, 'status': 'success'}), 201