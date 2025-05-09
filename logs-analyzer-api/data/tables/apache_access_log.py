from peewee import Model, CharField, DateTimeField, IntegerField
from ..database import db 

class ApacheAccessLog(Model):
    ip_address = CharField()
    timestamp = DateTimeField()
    method = CharField()
    path = CharField()
    status_code = IntegerField()
    user_agent = CharField()

    class Meta:
        database = db
