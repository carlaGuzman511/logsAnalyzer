from .tables.apache_error_log import ApacheErrorLog
from .tables.ftp_log import FtpLog
from .tables.apache_access_log import ApacheAccessLog
from peewee import fn

def get_apache_access_logs():
    apache_access_logs = ApacheAccessLog.select().dicts()

    return list(apache_access_logs)
        
def get_apache_error_logs():
    apache_error_logs = ApacheErrorLog.select().dicts()

    return list(apache_error_logs)

def get_vsftpd_logs():
    ftp_log = FtpLog.select().dicts()

    return list(ftp_log)

def get_apache_access_logs_reports(field):
    apache_access_logs = ApacheAccessLog.select(getattr(ApacheAccessLog, field), fn.COUNT(ApacheAccessLog.id).alias('count')).group_by(getattr(ApacheAccessLog, field)).dicts()
    labels = [item[field] for item in apache_access_logs]
    data = [item['count'] for item in apache_access_logs]

    return labels, data
        
def get_apache_error_logs_reports(field):
    apache_error_logs = ApacheErrorLog.select(getattr(ApacheErrorLog, field),fn.COUNT(ApacheErrorLog.id).alias('count')).group_by(getattr(ApacheErrorLog, field)).dicts()
    labels = [item[field] for item in apache_error_logs]
    data = [item['count'] for item in apache_error_logs]

    return labels, data

def get_ftp_logs_reports(field):
    ftp_logs = FtpLog.select(getattr(FtpLog, field), fn.COUNT(FtpLog.id).alias('count')).group_by(getattr(FtpLog, field)).dicts()
    labels = [item[field] for item in ftp_logs]
    data = [item['count'] for item in ftp_logs]

    return labels, data

