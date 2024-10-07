import psycopg2
import pandas as pd

# Database connection parameters
db_params = {
    "dbname": "employee_db",  # Replace with your database name
    "user": "postgres",  # Replace with your username
    "password": "123",  # Replace with your password
    "host": "localhost",  # Replace with your host (default is localhost)
    "port": "5432",  # Default PostgreSQL port
}

# Connect to the database
try:
    conn = psycopg2.connect(**db_params)
    print("Connection established!")
except Exception as e:
    print(f"Error connecting to the database: {e}")


# Fetch table names
def fetch_table_names(conn):
    with conn.cursor() as cursor:
        cursor.execute("""
            SELECT table_name
            FROM information_schema.tables
            WHERE table_schema='public'
        """)
        tables = cursor.fetchall()
    return [table[0] for table in tables]


# Export table content to CSV
def export_table_to_csv(conn, table_name):
    # Use double quotes around table name to handle case sensitivity
    query = f'SELECT * FROM "{table_name}";'
    df = pd.read_sql(query, conn)
    df.to_csv(f"{table_name}.csv", index=False)
    print(f"Exported {table_name} to {table_name}.csv")


# Get table names and export contents
tables = fetch_table_names(conn)
print("Tables in the database:", tables)
for table in tables:
    export_table_to_csv(conn, table)

# Close the connection
conn.close()
print("Connection closed!")
