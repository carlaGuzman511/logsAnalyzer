export interface ApacheErrorLog {
    id: number,
    timestamp: string,
    module: string,
    level: string,
    pid: string,
    client_ip: string,
    error_code: string,
    message: string,
}