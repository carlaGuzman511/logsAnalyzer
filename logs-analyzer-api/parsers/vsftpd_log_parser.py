import re
from datetime import datetime

vsftpd_regex = re.compile(
    r'^(?P<timestamp>\w{3}\s+\w{3}\s+\d{1,2}\s+\d{2}:\d{2}:\d{2}\s+\d{4})\s+'
    r'(?:vsftpd\s+)?'
    r'\[pid\s+(?P<pid>\d+)\]\s*'
    r'(?:\[(?P<user>[^\]]+)\])?\s*'
    r'(?:(?P<action>[^:]+):)?\s*'   
    r'(?:Client\s+"(?P<ip>[\d.]+)")?'
    r'(?:,\s+"(?P<message>[^"]*)")?'
    r'(?:,\s+"(?P<extra_message>[^"]*)")?'
    r'.*'
)

vsftpd_internal_regex = re.compile(
    r'^(?P<timestamp>\w{3}\s+\w{3}\s+\d{1,2}\s+\d{2}:\d{2}:\d{2}\s+\d{4})\s+vsftpd\s+\[pid\s+(?P<pid>\d+)\]:\s+"(?P<user>[^"]+)"\s+from\s+"(?P<ip>[\d.]+)":\s+(?P<message>.+)$'
)

def parse_vsftpd_log_line(line):
    line = line.strip()
    try:
        match = vsftpd_regex.match(line)
        if match:
            data = match.groupdict()
            return {
                'timestamp': datetime.strptime(data['timestamp'], '%a %b %d %H:%M:%S %Y'),
                'pid': data['pid'],
                'user': data.get('user'),
                'action': data.get('action'),
                'ip_address': data.get('ip'),
                'message': data.get('message'),
                'extra_message': data.get('extra_message'),
            }
        else:
            match = vsftpd_internal_regex.match(line)
            if match:
                data = match.groupdict()
                return {
                    'timestamp': datetime.strptime(data['timestamp'], '%a %b %d %H:%M:%S %Y'),
                    'pid': data['pid'],
                    'user': data.get('user'),
                    'ip_address': data.get('ip'),
                    'message': data['message'],
                }
        
            else:
                print("No match:", line)

    except Exception as e:
        print("Error:", e)
