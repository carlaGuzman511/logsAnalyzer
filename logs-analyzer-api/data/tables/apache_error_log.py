from peewee import Model, CharField, DateTimeField
from ..database import db

class ApacheErrorLog(Model):
    timestamp = DateTimeField(null=True)
    module = CharField(null=True)
    level = CharField(null=True)
    pid = CharField(null=True)
    client_ip = CharField(null=True)
    error_code = CharField(null=True)
    message = CharField(null=True)
    class Meta:
        database = db
  