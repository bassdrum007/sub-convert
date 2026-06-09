import type { ShortUrl, UsageLog } from '../types';
import type { IUrlRepository } from './types';
import { generateShortCode } from './types';

export class D1UrlRepository implements IUrlRepository {
    constructor(private readonly db: D1Database) {}

    async add(long_url: string, baseUrl: string): Promise<ShortUrl> {
        const code = generateShortCode();
        const short_url = `${baseUrl}/${code}`;

        const result = await this.db
            .prepare('INSERT INTO short_url (short_code, short_url, long_url) VALUES (?, ?, ?) RETURNING id')
            .bind(code, short_url, long_url)
            .first<{ id: number }>();

        if (!result?.id) {
            throw new Error('Failed to create short URL');
        }

        return { id: result.id, short_code: code, short_url, long_url };
    }

    async deleteByCode(code: string): Promise<void> {
        await this.db.prepare('DELETE FROM short_url WHERE short_code = ?').bind(code).run();
    }

    async getByCode(code: string): Promise<ShortUrl | null> {
        return await this.db
            .prepare('SELECT id, short_code, short_url, long_url FROM short_url WHERE short_code = ?')
            .bind(code)
            .first<ShortUrl>();
    }

    async getList(page: number, pageSize: number): Promise<{ total: number; items: ShortUrl[] }> {
        const offset = (page - 1) * pageSize;
        const [total, items] = await Promise.all([
            this.db.prepare('SELECT COUNT(*) as count FROM short_url').first<{ count: number }>(),
            this.db
                .prepare('SELECT id, short_code, short_url, long_url FROM short_url LIMIT ? OFFSET ?')
                .bind(pageSize, offset)
                .all<ShortUrl>()
        ]);

        return {
            total: total?.count || 0,
            items: items?.results || []
        };
    }

    async logUsage(data: { url: string; sub_url: string; short_url: string; target: string; config: string; protocol: string; advanced: string; ip: string; user_agent: string }): Promise<void> {
        await this.db
            .prepare('INSERT INTO usage_log (url, sub_url, short_url, target, config, protocol, advanced, ip, user_agent) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)')
            .bind(data.url, data.sub_url, data.short_url, data.target, data.config, data.protocol, data.advanced, data.ip, data.user_agent)
            .run();
    }

    async getUsageLogs(page: number, pageSize: number): Promise<{ total: number; items: UsageLog[] }> {
        const offset = (page - 1) * pageSize;
        const [total, items] = await Promise.all([
            this.db.prepare('SELECT COUNT(*) as count FROM usage_log').first<{ count: number }>(),
            this.db
                .prepare('SELECT * FROM usage_log ORDER BY created_at DESC LIMIT ? OFFSET ?')
                .bind(pageSize, offset)
                .all<UsageLog>()
        ]);
        return { total: total?.count || 0, items: items?.results || [] };
    }

}
