import re

def parse_apache_log(filepath):
    log_entries = []
    pattern = re.compile(r'(\d+\.\d+\.\d+\.\d+) - - \[(.*?)\] "(.*?)" (\d+) (\d+)')

    with open(filepath) as f:
        for line in f:
            match = pattern.match(line)
            if match:
                ip, date, request, status, size = match.groups()
                log_entries.append({
                    'ip': ip,
                    'date': date,
                    'request': request,
                    'status': status,
                    'size': size
                })
    return log_entries
