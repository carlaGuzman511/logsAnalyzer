from peewee import MySQLDatabase

db = MySQLDatabase(
    'logs_db',
    user='aso',
    password='aso',
    host='localhost',
    port=3306
)
