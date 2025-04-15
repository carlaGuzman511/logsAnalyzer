from flask import request, render_template
from log_utils import parse_apache_logs  # Your custom log parser

@app.route('/logs/apache')
def apache_logs():
    start_date = request.args.get('start')
    end_date = request.args.get('end')
    status_code = request.args.get('status')

    logs = parse_apache_logs('logs/access_log.log')

    # Apply filters
    if start_date:
        logs = [log for log in logs if log['date'] >= start_date]
    if end_date:
        logs = [log for log in logs if log['date'] <= end_date]
    if status_code:
        logs = [log for log in logs if log['status'] == int(status_code)]

    # Generate a simple report
    total = len(logs)
    errors = len([l for l in logs if l['status'] >= 400])
    top_ip = max(set(l['ip'] for l in logs), key=lambda ip: sum(1 for l in logs if l['ip'] == ip))

    report = {
        "total": total,
        "errors": errors,
        "top_ip": top_ip
    }

    return render_template('access_logs.html', logs=logs, report=report)
