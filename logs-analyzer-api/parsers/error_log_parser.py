import re
from datetime import datetime

apache_error_regex = re.compile(
    r'^\[(?P<timestamp>[^\]]+)\]\s+'                                
    r'(?:\[(?P<module>[^\]:]+):(?P<level>[^\]]+)\]\s+)?'           
    r'(?:\[pid (?P<pid>\d+)\]\s+)?'                                 
    r'(?:\[client (?P<client_ip>[\d.:]+)\]\s+)?'                    
    r'(?P<message>.+)$'                                             
)
apache_plain_error_regex = re.compile(
    r'^(?P<error_code>AH\d{5}):\s(?P<message>.+)$'
)
error_code_regex = re.compile(r'^(?P<error_code>AH\d{5}):')

def parse_error_log_line(line):
    line = line.strip()
    try:
        match = apache_error_regex.match(line)
        if match:
            data = match.groupdict()

            error_code_match = error_code_regex.match(data['message'])
            error_code = error_code_match.group('error_code') if error_code_match else None
            return {
                'timestamp': datetime.strptime(data['timestamp'], '%a %b %d %H:%M:%S.%f %Y') if data['timestamp'] else None,
                'module': data.get('module'),
                'level': data.get('level'),
                'pid': data.get('pid'),
                'client_ip': data.get('client_ip'),
                'message': data.get('message'),
                'error_code': error_code
            }

        match = apache_plain_error_regex.match(line)
        if match:
            data = match.groupdict()
            return {
                'timestamp': None,
                'module': None,
                'level': None,
                'pid': None,
                'client_ip': None,
                'message': data['message'],
                'error_code': data['error_code']
            }

        print("No match:", line)

    except Exception as e:
        print("Error:", e)
