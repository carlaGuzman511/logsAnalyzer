from peewee import Model, CharField, DateTimeField
from database import db  # your db from above

class ApacheLog(Model):
    ip = CharField()
    timestamp = DateTimeField()
    method = CharField()
    url = CharField()
    status_code = CharField()

    class Meta:
        database = db
