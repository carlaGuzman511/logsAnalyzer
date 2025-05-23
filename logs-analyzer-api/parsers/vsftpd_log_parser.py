import re
from datetime import datetime

vsftpd_regex = re.compile(
    r'^(?P<timestamp>\w{3}\s+\w{3}\s+\d{1,2}\s+\d{2}:\d{2}:\d{2}\s+\d{4})\s+'       # Fecha
    r'(?:vsftpd\s+)?'
    r'\[pid\s+(?P<pid>\d+)\]\s*'                                                   # PID
    r'(?:\[(?P<user>[^\]]+)\])?\s*'                                                # Usuario opcional
    r'(?:(?P<action>[A-Z ]+):)?\s*'                                                # Acción (FTP command, OK LOGIN, etc.)
    r'(?:Client\s+"(?P<ip>[\d.]+)")?'                                              # IP opcional (para logs con "Client")
    r'(?:,\s+"(?P<message>[^"]*)")?'                                               # Mensaje principal entre comillas (opcional)
    r'(?:,\s+"(?P<extra_message>[^"]*)")?'                                         # Mensaje adicional entre comillas (opcional)
    r'.*'                                                                          # Captura cualquier resto (para líneas multilinea del tipo "211-Features")
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
                print(line)
    except Exception as e:
        print(f"Error parsing line: {e}")
