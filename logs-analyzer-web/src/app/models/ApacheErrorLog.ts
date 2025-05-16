export interface ApacheErrorLog {
    id: number,
    ip: string,
    timestamp: string,
    method: string,
    url: string,
    message: string,
    status_code: string,
}