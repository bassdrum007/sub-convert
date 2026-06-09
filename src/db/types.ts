import type { ShortUrl, UsageLog } from '../types';

export interface IUrlRepository {
    add: (long_url: string, baseUrl: string) => Promise<ShortUrl>;
    deleteByCode: (code: string) => Promise<void>;
    getByCode: (code: string) => Promise<ShortUrl | null>;
    getList: (page: number, pageSize: number) => Promise<{ total: number; items: ShortUrl[] }>;
    logUsage: (data: { url: string; sub_url: string; short_url: string; target: string; config: string; protocol: string; advanced: string; ip: string; user_agent: string }) => Promise<void>;
    getUsageLogs: (page: number, pageSize: number) => Promise<{ total: number; items: UsageLog[] }>;
}

export function generateShortCode(): string {
    return crypto.randomUUID().substring(0, 8);
}
