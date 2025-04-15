from peewee import MySQLDatabase

db = MySQLDatabase(
    'logsdb',  # Your database name
    user='youruser',
    password='yourpassword',
    host='localhost',
    port=3306
)
