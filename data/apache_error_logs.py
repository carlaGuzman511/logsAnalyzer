from peewee import Model, CharField, DateTimeField
from database import db  # your db from above

class ErrorLog(Model):
    ip = CharField()
    timestamp = DateTimeField()
    method = CharField()
    url = CharField()
    status_code = CharField()

    class Meta:
        database = db
