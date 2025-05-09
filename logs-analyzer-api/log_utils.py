import re
from datetime import datetime

apache_log_pattern = re.compile(
    r'(?P<ip>\S+) \S+ \S+ \[(?P<date>.+?)\] "(?P<method>\S+) (?P<path>\S+) \S+" (?P<status>\d{3}) (?P<size>\d+)'
)


def parse_apache_logs(filepath):
    logs = []

    with open(filepath, 'r') as file:
        for line in file:
            match = apache_log_pattern.match(line)
            if match:
                log = match.groupdict()

                # Convert date string to datetime object
                log['date'] = datetime.strptime(log['date'], '%d/%b/%Y:%H:%M:%S %z')

                # Convert numeric fields
                log['status'] = int(log['status'])
                log['size'] = int(log['size'])

                logs.append(log)

    return logs
