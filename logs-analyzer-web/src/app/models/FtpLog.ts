export interface FtpLog {
    id: number,
    timestamp: string,
    pid: string,
    user: string,
    action: string,
    ip_address: string,
    message: string,
    extra_message: string,
}