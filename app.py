from flask import Flask, render_template
from parsers.apache_parser import parse_apache_log
from parsers.vsftpd_parser import parse_vsftpd_log

app = Flask(__name__)

@app.route('/')
def index():
    apache_access_log = parse_apache_log('logs/access_log')
    vsftpd_logs = parse_vsftpd_log('logs/vsftpd.log')
    return render_template('index.html', apache_access_log=apache_access_log, vsftpd_logs=vsftpd_logs)

if __name__ == '__main__':
    app.run(debug=True)
