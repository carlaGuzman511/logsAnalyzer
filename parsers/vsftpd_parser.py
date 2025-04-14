def parse_vsftpd_log(filepath):
    entries = []
    with open(filepath) as f:
        for line in f:
            entries.append({'line': line.strip()})
    return entries
