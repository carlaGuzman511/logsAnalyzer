CREATE DATABASE logreader;
USE logreader;

CREATE TABLE vsftpd_logs (
    id SERIAL PRIMARY KEY,
    log_time TIMESTAMP,
    pid INTEGER,
    username TEXT,
    status TEXT,
    message TEXT,
    client_ip INET,
    raw_line TEXT,  -- optional: store the full original line
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
