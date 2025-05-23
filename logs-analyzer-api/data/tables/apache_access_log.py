from peewee import Model, CharField, DateTimeField, IntegerField
from ..database import db 

class ApacheAccessLog(Model):
    ip_address = CharField(null=True)
    timestamp = DateTimeField(null=True)
    method = CharField(null=True)
    path = CharField(null=True)
    status_code = IntegerField(null=True)
    user_agent = CharField(null=True)

    class Meta:
        database = db
