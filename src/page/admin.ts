import { style } from './style/style';
import { layout } from './style/layout';

export function showAdminPage(): string {
  return `
<!DOCTYPE html>
<html lang="zh-CN" theme="dark">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>使用记录 · 007e Admin</title>
  ${style()}
  ${layout()}
  <style>
    .admin-table { width: 100%; border-collapse: collapse; font-size: 12px; margin-top: 16px; }
    .admin-table th { text-align: left; padding: 10px 8px; border-bottom: 1px solid var(--border-color); color: var(--text-secondary); font-weight: 600; font-size: 11px; text-transform: uppercase; letter-spacing: 0.5px; }
    .admin-table td { padding: 10px 8px; border-bottom: 1px solid rgba(255,255,255,0.04); color: var(--text-primary); word-break: break-all; max-width: 300px; }
    .admin-table tr:hover td { background: rgba(255,255,255,0.03); }
    .admin-table .time { white-space: nowrap; color: var(--text-secondary); font-size: 11px; }
    .admin-table .ip { white-space: nowrap; font-family: monospace; font-size: 11px; color: var(--primary-color); }
    .admin-table .url-cell { font-size: 11px; max-width: 200px; overflow: hidden; text-overflow: ellipsis; }
    .admin-table .short-cell a { color: var(--primary-color); text-decoration: none; font-size: 11px; }
    .pagination { display: flex; justify-content: center; align-items: center; gap: 12px; margin-top: 20px; }
    .pagination button { padding: 6px 16px; border: 1px solid var(--border-color); border-radius: 8px; background: rgba(255,255,255,0.04); color: var(--text-primary); cursor: pointer; font-size: 13px; }
    .pagination button:hover { border-color: var(--primary-color); color: var(--primary-color); }
    .pagination button:disabled { opacity: 0.3; cursor: not-allowed; }
    .pagination span { color: var(--text-secondary); font-size: 13px; }
    .stats { display: flex; gap: 24px; margin-bottom: 16px; }
    .stat { padding: 12px 20px; background: rgba(255,255,255,0.04); border-radius: 10px; border: 1px solid var(--border-color); }
    .stat .num { font-size: 28px; font-weight: 700; color: var(--primary-color); }
    .stat .label { font-size: 11px; color: var(--text-secondary); margin-top: 2px; text-transform: uppercase; letter-spacing: 1px; }
    main { max-width: 960px !important; }
    main > section { padding: 24px 32px 32px !important; }
  </style>
</head>
<body>
  <main>
    <header>
      <span class="header__title">使用记录</span>
      <span class="header__subtitle">Usage Logs · 007e</span>
    </header>
    <section>
      <div class="stats">
        <div class="stat"><div class="num" id="total-count">-</div><div class="label">Total</div></div>
      </div>
      <table class="admin-table">
        <thead>
          <tr>
            <th>时间</th>
            <th>IP</th>
            <th>订阅链接</th>
            <th>生成类型</th>
            <th>生成的链接</th>
          </tr>
        </thead>
        <tbody id="log-body">
          <tr><td colspan="5" style="text-align:center;padding:40px;color:var(--text-secondary)">加载中...</td></tr>
        </tbody>
      </table>
      <div class="pagination" id="pager"></div>
    </section>
  </main>
  <script>
    let page = 1;
    const pageSize = 20;

    async function load(pageNum) {
      page = pageNum;
      document.getElementById('log-body').innerHTML = '<tr><td colspan="5" style="text-align:center;padding:40px;color:var(--text-secondary)">加载中...</td></tr>';
      try {
        const res = await fetch('/api/logs?page=' + page + '&pageSize=' + pageSize);
        const data = await res.json();
        document.getElementById('total-count').textContent = data.total || 0;

        const tbody = document.getElementById('log-body');
        if (!data.items || data.items.length === 0) {
          tbody.innerHTML = '<tr><td colspan="5" style="text-align:center;padding:40px;color:var(--text-secondary)">暂无记录</td></tr>';
        } else {
          tbody.innerHTML = data.items.map(log => {
            const time = new Date(log.created_at + 'Z').toLocaleString('zh-CN', {timeZone:'Asia/Shanghai'});
            const shortLink = log.short_url ? '<a href="' + log.short_url + '" target="_blank">短链</a>' : '-';
            const subLink = log.sub_url ? '<a href="' + log.sub_url + '" target="_blank" style="color:var(--primary-color);font-size:11px">打开</a>' : '-';
            return '<tr>' +
              '<td class="time">' + time + '</td>' +
              '<td class="ip">' + (log.ip || '-') + '</td>' +
              '<td class="url-cell" title="' + (log.url || '') + '">' + (log.url || '-').substring(0, 60) + '</td>' +
              '<td>' + (log.target || '-') + '</td>' +
              '<td>' + subLink + ' ' + shortLink + '</td>' +
              '</tr>';
          }).join('');
        }

        const totalPages = Math.ceil((data.total || 1) / pageSize);
        document.getElementById('pager').innerHTML =
          '<button ' + (page <= 1 ? 'disabled' : '') + ' onclick="load(' + (page-1) + ')">← 上一页</button>' +
          '<span>' + page + ' / ' + totalPages + '</span>' +
          '<button ' + (page >= totalPages ? 'disabled' : '') + ' onclick="load(' + (page+1) + ')">下一页 →</button>';
      } catch(e) {
        document.getElementById('log-body').innerHTML = '<tr><td colspan="5" style="text-align:center;padding:40px;color:var(--text-secondary)">加载失败: ' + e.message + '</td></tr>';
      }
    }
    load(1);
  </script>
</body>
</html>`;
}
