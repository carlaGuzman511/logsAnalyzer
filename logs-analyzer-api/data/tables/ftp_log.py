from peewee import Model, CharField, DateTimeField, TextField
from ..database import db

class FtpLog(Model):
    timestamp = DateTimeField(null=True)
    pid = CharField(null=True)
    user = CharField(null=True)
    action = CharField(null=True)
    ip_address = CharField(null=True)
    message = TextField(null=True)
    extra_message = TextField(null=True)

    class Meta:
        database = db
