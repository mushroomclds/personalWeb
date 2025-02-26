from oracle_db import db

class OracleTableManager:
    """Manages table creation in Oracle Database."""

    def table_exists(self, table_name):
        """Checks if a table exists in the Oracle database."""
        query = """
            SELECT COUNT(*) FROM all_tables WHERE table_name = :table_name
        """
        result = db.execute_query(query, {"table_name": table_name.upper()}, fetch_all=False)
        return result and result[0] > 0

    def create_tables(self):
        """Creates necessary tables if they do not exist."""
        tables = {
            "users": """
                CREATE TABLE users (
                    id NUMBER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
                    name VARCHAR2(100) NOT NULL,
                    email VARCHAR2(100) UNIQUE NOT NULL
                )
            """
        }

        try:
            for table_name, create_sql in tables.items():
                if not self.table_exists(table_name):
                    print(f"Creating table: {table_name}")
                    db.execute_query(create_sql)
                else:
                    print(f"Table already exists: {table_name}")

            print("Table creation process completed.")

        except Exception as e:
            print(f"Error: {e}")

if __name__ == "__main__":
    manager = OracleTableManager()
    print(manager.table_exists("USER_FAVORITE_COLORS"))
