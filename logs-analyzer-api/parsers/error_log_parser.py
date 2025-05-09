import re
from datetime import datetime

apache_error_regex = re.compile(
    r'^\[(?P<timestamp>[^\]]+)\]\s+'                                # Timestamp
    r'(?:\[(?P<module>[^\]:]+):(?P<level>[^\]]+)\]\s+)?'            # Optional module and log level
    r'(?:\[pid (?P<pid>\d+)\]\s+)?'                                 # Optional PID
    r'(?:\[client (?P<client_ip>[\d.:]+)\]\s+)?'                    # Optional client IP and port
    r'(?P<message>.+)$'                                             # Message
)

def parse_error_log_line(line):
    line = line.strip()
    try:
        match = apache_error_regex.match(line)
        if match:
            data = match.groupdict()
            return {
                'timestamp': datetime.strptime(data['timestamp'], '%a %b %d %H:%M:%S.%f %Y'),
                'module': data['module'],
                'level': data.get('level'),
                'pid': data.get('pid'),
                'client_ip': data.get('client_ip'),
                'message': data.get('message'),
            }
    except Exception as e:
        print(f"Error parsing line: {e}")
