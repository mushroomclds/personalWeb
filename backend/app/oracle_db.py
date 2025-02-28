import os
import oracledb
from dotenv import load_dotenv
from logging_config import logger

class OracleDB:
    """Class for managing Oracle Database connections."""

    def __init__(self):
        """Initialize database connection settings from environment variables."""

        # Load environment variables from .env file
        load_dotenv()
        self.user = os.getenv('DATABASE_USER')
        self.password = os.getenv('DATABASE_PASSWORD')
        self.dsn = os.getenv('DATABASE_DSN')  # Must match an entry in tnsnames.ora
        self.tns_admin = "/opt/oracle/instantclient_23_7"
        # self.tns_admin = os.getenv('TNS_ADMIN') # Set TNS_ADMIN for Oracle Wallet (if required)
        # logger.info(f"Loaded DATABASE_USER: {self.user} \n Loaded DATABASE_DSN: {self.dsn} \
        #     \n Loaded TNS_ADMIN: {self.tns_admin}" )
        if self.tns_admin:
            oracledb.init_oracle_client(lib_dir=self.tns_admin)

    def get_connection(self):
        """Returns a new Oracle database connection."""
        try:
            return oracledb.connect(user=self.user, password=self.password, dsn=self.dsn)
        except Exception as e:
            print(f"Error connecting to Oracle DB: {e}")
            return None

    def test_connection(self):
        """Tests the Oracle database connection."""
        logger.info("Testing Oracle DB connection...")
        conn = self.get_connection()
        if conn:
            print("Oracle DB connection successful.")
            conn.close()
        else:
            print("Oracle DB connection failed.")

    def execute_query(self, query, params=None, fetch_all=True):
        """Executes a SQL query and returns the result."""
        conn = self.get_connection()
        if not conn:
            return None

        try:
            cursor = conn.cursor()
            cursor.execute(query, params or {})
            conn.commit()  # Commit the transaction after executing the query
            
            logger.info(f"Executed query: {query}")
            
            if fetch_all:
                result = cursor.fetchall()
            else:
                result = cursor.fetchone()

            logger.info(f"Query result: {result}")
            return result

        except Exception as e:
            logger.error(f"Database query error: {e}")
            return None
        finally:
            cursor.close()
            conn.close()

db = OracleDB()

if __name__ == "__main__":
    db = OracleDB()
    test_connection()
    
