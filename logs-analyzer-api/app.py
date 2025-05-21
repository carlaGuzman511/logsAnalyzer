from flask import Flask, jsonify, request
# from .parsers.apache_parser import parse_apache_log
# from .parsers.vsftpd_parser import parse_vsftpd_log
# from apscheduler.schedulers.background import BackgroundScheduler
# from .log_utils import *
# from .data.database import db
from data.tables.apache_access_log import ApacheAccessLog
from data.tables.apache_error_log import ApacheErrorLog
from data.tables.ftp_log import FtpLog
from parsers.access_log_parser import parse_access_log_line
from parsers.error_log_parser import parse_error_log_line
from parsers.vsftpd_log_parser import parse_vsftpd_log_line
from data.queries import get_apache_access_logs, get_apache_access_logs_reports
from data.queries import get_apache_error_logs, get_apache_error_logs_reports
from data.queries import get_vsftpd_logs, get_ftp_logs_reports
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

@app.route('/')
def index():
    # process_log_file('/var/log/apache2/access_log', parse_access_log_line, ApacheAccessLog)
    # process_log_file('/var/log/apache2/error_log', parse_error_log_line, ApacheErrorLog)
    # process_log_file('/var/log/vsftpd.log', parse_vsftpd_log_line, FtpLog)
    
    # apache_access_log = parse_apache_log('/var/log/apache2/access_log')
    # apache_error_log = parse_apache_log('/var/log/apache2/error_log')
    # vsftpd_logs = parse_vsftpd_log('/var/log/vsftpd.log')
    # return render_template('index.html', apache_access_log=apache_access_log, apache_error_log=apache_error_log, vsftpd_logs=vsftpd_logs)

    return "hello WOrld!"

@app.route('/api/logs/apache/access')
def get_apache_access():
    # process_log_file('/var/log/apache2/access_log', parse_access_log_line, ApacheAccessLog)

    return jsonify(get_apache_access_logs())

@app.route('/api/logs/apache/error')
def get_apache_error():
    #process_log_file('/var/log/apache2/error_log', parse_error_log_line, ApacheErrorLog)

    return jsonify(get_apache_error_logs())

@app.route('/api/logs/ftp')
def get_ftp():
    # process_log_file('/var/log/vsftpd.log', parse_vsftpd_log_line, FtpLog)
    
    return jsonify(get_vsftpd_logs())

@app.route('/api/logs/apache/access/reports')
def get_apache_access_reports():
    field = request.args.get('report')
    labels, data = get_apache_access_logs_reports(field)

    return jsonify({
        'labels': labels,
        'data': data
    })

@app.route('/api/logs/apache/error/reports')
def get_apache_error_reports():
    start_date = request.args.get('start_date')  # e.g., '2025-05-01'
    end_date = request.args.get('end_date')  
    data = get_apache_error_logs_reports(start_date, end_date)

    return jsonify({
        'labels': "",
        'data': data
    })


@app.route('/api/logs/ftp/reports')
def get_ftp_reports():
    field = request.args.get('report')
    labels, data = get_ftp_logs_reports(field)

    return jsonify({
        'labels': labels,
        'data': data
    })

def process_log_file(filepath, parser_func, model_class):
    with open(filepath, 'r') as f:
        for line in f:
            parsed = parser_func(line)
            if parsed:
                model_class.create(**parsed)

if __name__ == '__main__':
    app.run(debug=True)
