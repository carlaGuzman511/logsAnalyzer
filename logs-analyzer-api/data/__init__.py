from .database import db
from .tables.apache_access_log import ApacheAccessLog
from .tables.apache_error_log import ApacheErrorLog
from .tables.ftp_log import FtpLog

def create_tables():
    db.connect()
    db.create_tables([ApacheAccessLog, ApacheErrorLog, FtpLog])
    print("Tables created.")

if __name__ == "__main__":
    create_tables()
