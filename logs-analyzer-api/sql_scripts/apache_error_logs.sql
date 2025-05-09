CREATE DATABASE logreader;
USE logreader;

CREATE TABLE apache_error_logs (
    id SERIAL PRIMARY KEY,
    log_time TIMESTAMP,
    module TEXT,
    severity TEXT,
    pid INTEGER,
    client_ip INET,
    client_port INTEGER,
    message TEXT,
    raw_line TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
