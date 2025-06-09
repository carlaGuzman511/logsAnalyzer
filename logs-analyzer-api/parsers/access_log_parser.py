import re
from datetime import datetime

access_log_pattern = re.compile(r'(?P<ip>[\d.]+) - - \[(?P<timestamp>.*?)\] "(?P<method>\w+) (?P<path>.*?) HTTP/.*?" (?P<status>\d+) .* "(.*?)" "(?P<user_agent>.*?)"')
access_log_internal = re.compile(
    r'^(?P<ip>\d{1,3}(?:\.\d{1,3}){3}) - - '
    r'\[(?P<timestamp>[\w:/]+) (?P<timezone>[+\-]\d{4})\] '
    r'"(?P<request>.*?)" (?P<status>\d{3}) (?P<size>-|\d+) '
    r'"(?P<referrer>.*?)" "(?P<user_agent>.*?)"$'
)
access_log_ipv6 = re.compile(
    r'^(?P<ip>[a-fA-F0-9:]+) - - '
    r'\[(?P<timestamp>[\w:/]+) (?P<timezone>[+\-]\d{4})\] '
    r'"(?P<method>\w+) (?P<path>.*?) HTTP/.*?" '
    r'(?P<status>\d{3}) (?P<size>\d+) '
    r'"(?P<referrer>.*?)" "(?P<user_agent>.*?)"$'
)
access_log_ipv6_internal = re.compile(
    r'^(?P<ip>[a-fA-F0-9:]+) - - '
    r'\[(?P<timestamp>[\w:/]+) (?P<timezone>[+\-]\d{4})\] '
    r'"(?P<method>\w+) (?P<path>\*|.*?) HTTP/.*?" '
    r'(?P<status>\d{3}) (?P<size>-|\d+) '
    r'"(?P<referrer>.*?)" "(?P<user_agent>.*?)"$'
)

# user_agent_regex = re.compile(
#     r'Mozilla\/5\.0 \((?:[^;]+;\s)?(?P<os>[^;]+);[^)]+\).*? (?P<browser>[\w]+\/[\d.]+)'
# )
user_agent_regex = re.compile(
    r'\((?:[^;]+;\s)?(?P<os>[^;]+);[^)]+\).* (?P<browser>(Firefox|Chrome|Edge|Safari|Opera|MSIE|Trident)\/[\d.]+)$'
)

def parse_access_log_line(line):
    try:
        match = access_log_pattern.match(line)
        if match:
            data = match.groupdict()
            ua = data['user_agent']
            os, browser = None, None

            ua_match = user_agent_regex.search(ua)
            if ua_match:
                os = ua_match.group('os')
                browser = ua_match.group('browser')

            return {
                'ip_address': data['ip'],
                'timestamp': datetime.strptime(data['timestamp'], '%d/%b/%Y:%H:%M:%S %z'),
                'method': data['method'],
                'path': data['path'],
                'status_code': int(data['status']),
                'user_agent': ua,
                'os': os,
                'browser': browser
            }

        for pattern in [access_log_internal, access_log_ipv6, access_log_ipv6_internal]:
            match = pattern.match(line)
            if match:
                data = match.groupdict()
                ua = data['user_agent']
                os, browser = None, None

                ua_match = user_agent_regex.search(ua)
                if ua_match:
                    os = ua_match.group('os')
                    browser = ua_match.group('browser')

                return {
                    'ip_address': data['ip'],
                    'timestamp': datetime.strptime(f"{data['timestamp']} {data['timezone']}", '%d/%b/%Y:%H:%M:%S %z'),
                    'method': data.get('method', '-'),
                    'path': data.get('path', '-'),
                    'status_code': int(data['status']),
                    'response_size': data['size'],
                    'referrer': data['referrer'],
                    'user_agent': ua,
                    'os': os,
                    'browser': browser
                }

        print("No match:", line)

    except Exception as e:
        print("Error:", e)
