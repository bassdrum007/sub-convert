import { Hono } from 'hono';
import type { AppBindings } from '../bindings';

export const logRoute = new Hono<AppBindings>();

logRoute.post('/api/log', async (c) => {
    const repo = c.get('repo');
    if (!repo) return c.json({ error: 'DB not available' }, 503);

    const body = await c.req.json<{
        url: string;
        sub_url?: string;
        short_url?: string;
        target?: string;
        config?: string;
        protocol?: string;
        advanced?: string;
    }>();

    if (!body.url) return c.json({ error: 'Missing url' }, 400);

    const ip = c.req.header('cf-connecting-ip') || c.req.header('x-forwarded-for') || 'unknown';
    const ua = c.req.header('user-agent') || '';

    await repo.logUsage({
        url: body.url,
        sub_url: body.sub_url || '',
        short_url: body.short_url || '',
        target: body.target || '',
        config: body.config || '',
        protocol: body.protocol || '',
        advanced: body.advanced || '',
        ip,
        user_agent: ua
    });

    return c.json({ success: true });
});

logRoute.get('/api/logs', async (c) => {
    const repo = c.get('repo');
    if (!repo) return c.json({ error: 'DB not available' }, 503);

    const page = parseInt(c.req.query('page') || '1');
    const pageSize = parseInt(c.req.query('pageSize') || '20');

    const logs = await repo.getUsageLogs(page, pageSize);
    return c.json(logs);
});
