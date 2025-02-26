from logging_config import logger
from flask import Flask, jsonify
from flask_cors import CORS
from oracle_db import db
from routes import api
from create_tables import OracleTableManager

app = Flask(__name__)

CORS(app)
# CORS(app, resources={r"/api/*": {
#     "origins": "http://127.0.0.1:4200",
#     "methods": ["GET", "POST", "OPTIONS"],
#     "allow_headers": ["Content-Type", "Authorization"]
# }})

# Register routes after db initialization
app.register_blueprint(api)

oracleManager = OracleTableManager()

@app.route('/')
def home():
    """Route to test Oracle DB connection."""
    try:
        query = "SELECT 'Hello from Oracle DB' FROM dual"
        result = db.execute_query(query, fetch_all=False)

        if result:
            logger.info("Successful DB query execution.")
            return jsonify({"message": result[0]})
        else:
            logger.warning("DB query returned no data.")
            return jsonify({"error": "No data returned"}), 500

    except Exception as e:
        logger.error(f"Database error: {e}", exc_info=True)
        return jsonify({"error": str(e)}), 500

if __name__ == '__main__':
    with app.app_context():  # Ensure the app context is set for database operations
        if db.test_connection() and not oracleManager.table_exists("USER_FAVORITE_COLORS"):
            logger.info("Creating missing tables...")
            # oracleManager.create_tables()  
            
    logger.info("Starting Flask application...")
    app.run(debug=True, host='0.0.0.0', port=5000)
