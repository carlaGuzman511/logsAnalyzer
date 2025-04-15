CREATE DATABASE logreader;
USE logreader;

CREATE TABLE apache_access_logs (
    id SERIAL PRIMARY KEY,
    ip_address INET,
    ident TEXT,
    user_id TEXT,
    log_time TIMESTAMP,
    method TEXT,
    path TEXT,
    http_version TEXT,
    status_code INTEGER,
    response_size INTEGER,
    raw_line TEXT,  -- optional: store original line
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
