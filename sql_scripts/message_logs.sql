CREATE DATABASE logreader;
USE logreader;

CREATE TABLE system_messages_log (
    id SERIAL PRIMARY KEY,
    log_time TIMESTAMP,
    hostname TEXT,
    service TEXT,
    message TEXT,
    raw_line TEXT,  -- Optional: full original log line
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
