import re
from datetime import datetime

access_log_pattern = re.compile(r'(?P<ip>[\d.]+) - - \[(?P<timestamp>.*?)\] "(?P<method>\w+) (?P<path>.*?) HTTP/.*?" (?P<status>\d+) .* "(.*?)" "(?P<user_agent>.*?)"')

def parse_access_log_line(line):
    try:
        match = access_log_pattern.match(line)
        if match:
            data = match.groupdict()
            return {
                'ip_address': data['ip'],
                'timestamp': datetime.strptime(data['timestamp'], '%d/%b/%Y:%H:%M:%S %z'),
                'method': data['method'],
                'path': data['path'],
                'status_code': int(data['status']),
                'user_agent': data['user_agent'],
            }
    except Exception:
        print(Exception.args)
