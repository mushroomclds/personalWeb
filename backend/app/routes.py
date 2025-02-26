from flask import Blueprint, jsonify, request
from oracle_db import db
from logging_config import logger
api = Blueprint('api', __name__)

# @api.after_request
# def after_request(response):
#   response = jsonify({'status': 'success'})
#   response.headers.add('Access-Control-Allow-Origin', '*')
#   response.headers.add('Access-Control-Allow-Headers', 'Content-Type,Authorization')
#   response.headers.add('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS')
#   return response

@api.route('/api/users', methods=['GET'])
def get_users():
    users = User.query.all()
    users_list = [{"id": user.id, "name": user.name, "email": user.email} for user in users]
    return jsonify(users_list) #sends back the list of users in JSON format

@api.route('/api/users', methods=['POST'])
def add_user():
    data = request.json
    new_user = User(name=data['name'], email=data['email'])
    db.session.add(new_user)
    db.session.commit()
    return jsonify({"message": "User added successfully!", "id": new_user.id}), 201 #sends back status of success with the id of the new user

@api.route('/api/data', methods=['POST'])
def post_data():
    content = request.json
    return jsonify({'received': content, 'status': 'success'}), 201 #sends back status of success with the content received

@api.route('/api/testOracle', methods=['POST'])
def post_oracle_data():
    content = request.json
    result = db.execute_query("SELECT column_name, data_type, data_length \
    FROM user_tab_columns \
    WHERE table_name = 'USER_FAVORITE_COLORS'")
    return jsonify({'received': content, 'status': 'success'}), 201 #sends back status of success with the content received

@api.route('/api/FaveColorInput', methods=['POST']) 
def post_fave_color():
    content = request.json
    logger.info(f"Received data: {content}")
    color = content.get('color')  # Access the color value from the JSON object
    user_id = 1  # Assuming you also want a user_id in the JSON object
    
    # Insert the data into the USER_FAVORITE_COLORS table
    insert_query = """
    INSERT INTO ADMIN.USER_FAVORITE_COLORS (USER_ID, FAVORITE_COLOR)
    VALUES (:user_id, :color)
    """
    db.execute_query(insert_query, {'user_id': user_id, 'color': color})

    # Now query the table to verify the insert (optional)
    select_query = "SELECT * FROM ADMIN.USER_FAVORITE_COLORS"
    result = db.execute_query(select_query, fetch_all=True)

    return jsonify({'received': content, 'status': 'success'}), 201 #sends back status of success with the content received
