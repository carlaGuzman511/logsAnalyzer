from flask import Flask, jsonify, request
import os
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
    

    return "hello WOrld!"

@app.route('/api/logs/apache/access', methods=['POST'])
def load_apache_access():
    uploaded_file = request.files.get('file')
    if not uploaded_file:
        return jsonify({'error': 'No file uploaded'}), 400

    content = uploaded_file.read().decode('utf-8')
    lines = content.splitlines()

    parsed_logs = [parse_access_log_line(line) for line in lines if line.strip()]
    
    return jsonify(parsed_logs)

@app.route('/api/logs/apache/error', methods=['POST'])
def load_apache_error():
    uploaded_file = request.files.get('file')
    if not uploaded_file:
        return jsonify({'error': 'No file uploaded'}), 400

    content = uploaded_file.read().decode('utf-8')
    lines = content.splitlines()

    parsed_logs = [parse_error_log_line(line) for line in lines if line.strip()]
    
    return jsonify(parsed_logs)

@app.route('/api/logs/ftp', methods=['POST'])
def load_ftp():
    uploaded_file = request.files.get('file')
    if not uploaded_file:
        return jsonify({'error': 'No file uploaded'}), 400

    content = uploaded_file.read().decode('utf-8')
    lines = content.splitlines()

    parsed_logs = [parse_vsftpd_log_line(line) for line in lines if line.strip()]
    
    return jsonify(parsed_logs)

@app.route('/api/logs/apache/access')
def get_apache_access():
    process_log_file('/var/log/apache2/access_log', parse_access_log_line, ApacheAccessLog, 'apache_access_log.state')

    return jsonify(get_apache_access_logs())

@app.route('/api/logs/apache/error')
def get_apache_error():
    process_log_file('/var/log/apache2/error_log', parse_error_log_line, ApacheErrorLog, 'apache_error_log.state')

    return jsonify(get_apache_error_logs())

@app.route('/api/logs/ftp')
def get_ftp():
    process_log_file('/var/log/vsftpd.log', parse_vsftpd_log_line, FtpLog, 'vsftpd_log.state')
    
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
    start_date = request.args.get('start_date')
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

def get_log_position(state_file):
    try:
        with open(state_file, 'r') as f:
            return int(f.read())
    except (FileNotFoundError, ValueError):
        return 0

def update_log_position(state_file, position):
    with open(state_file, 'w') as f:
        f.write(str(position))

def process_log_file(filepath, parser_func, model_class, state_file):
    position = get_log_position(state_file)
    
    with open(filepath, 'r') as f:
        line_count = sum(1 for _ in f)
        print('line_count', line_count, filepath)
        f.seek(position)
        for line in f:
            parsed = parser_func(line)
            if parsed:
                model_class.create(**parsed)
        update_log_position(state_file, f.tell())

if __name__ == '__main__':
    app.run(debug=True)
