import type { AppBindings } from '../bindings';
import { Hono } from 'hono';
import { showPage } from '../page/page';
import { showAdminPage } from '../page/admin';

export const pageRoute = new Hono<AppBindings>();

pageRoute.get('/', c => {
    return showPage(c.req.raw, c.env);
});

pageRoute.get('/admin', c => c.html(showAdminPage()));
pageRoute.get('/favicon.ico', c => c.body(null, 204));
