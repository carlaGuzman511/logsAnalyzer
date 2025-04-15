from flask import Flask, render_template
from parsers.apache_parser import parse_apache_log
from parsers.vsftpd_parser import parse_vsftpd_log
from log_utils import *
app = Flask(__name__)

@app.route('/')
def index():
    parse_apache_logs('logs/access_log')
    apache_access_log = parse_apache_log('logs/access_log')
    vsftpd_logs = parse_vsftpd_log('logs/vsftpd.log')
    return render_template('index.html', apache_access_log=apache_access_log, vsftpd_logs=vsftpd_logs)

def get_apache_summary():
    return {
        "last_entry": "2025-04-14 12:32:11",
        "status_counts": {
            "200": 1240,
            "404": 33,
            "500": 5,
            "400": 1
        }
    }

if __name__ == '__main__':
    app.run(debug=True)
