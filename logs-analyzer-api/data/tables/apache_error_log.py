from peewee import Model, CharField, DateTimeField
from ..database import db

class ApacheErrorLog(Model):
    ip = CharField()
    timestamp = DateTimeField()
    method = CharField()
    url = CharField()
    status_code = CharField()
    message = CharField()

    class Meta:
        database = db
  