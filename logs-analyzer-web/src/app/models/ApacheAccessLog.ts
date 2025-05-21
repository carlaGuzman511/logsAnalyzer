export interface ApacheAccessLog {
    id: number,
    ip_address: string,
    timestamp: string,
    method: string,
    path: string,
    status_code: string,
    user_agent: string,
}
