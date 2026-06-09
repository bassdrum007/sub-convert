export function layout(): string {
    return `
        <style>
            html,
            body {
                margin: 0;
                padding: 0;
                box-sizing: border-box;
                min-height: 100vh;
                background: linear-gradient(135deg, #0f0f1a 0%, #1a1a2e 50%, #16213e 100%);
            }

            body {
                font-family: -apple-system, BlinkMacSystemFont, 'SF Pro Text', 'SF Pro Icons', 'Helvetica Neue', Arial, sans-serif;
                color: var(--text-primary);
                display: flex;
                justify-content: center;
                align-items: flex-start;
                padding: 40px 16px;
                flex-direction: column;
            }

            /* 主卡片 — 毛玻璃效果 */
            main {
                width: 100%;
                max-width: 680px;
                margin: 0 auto;
                background: rgba(255,255,255,0.04);
                backdrop-filter: blur(20px);
                -webkit-backdrop-filter: blur(20px);
                border: 1px solid var(--border-color);
                border-radius: 16px;
                box-shadow: 0 8px 32px rgba(0,0,0,0.3), 0 0 0 1px rgba(255,255,255,0.05) inset;
            }

            main > header {
                display: flex;
                justify-content: center;
                align-items: center;
                gap: 8px;
                border-bottom: none;
                padding: 28px 28px 0;
                flex-direction: column;
            }

            main > header > .header__icon {
                width: 42px;
                height: 42px;
                cursor: pointer;
                transition: var(--transition);
                opacity: 0.85;
            }

            main > header > .header__icon svg {
                width: 100%;
                height: 100%;
            }

            main > header > .header__icon svg path {
                fill: var(--text-primary);
            }

            main > header > .header__icon:hover svg path {
                fill: var(--primary-color);
            }

            main > header > .header__title {
                font-size: 22px;
                font-weight: 700;
                color: var(--text-primary);
                letter-spacing: 0.5px;
            }

            main > header > .header__subtitle {
                font-size: 11px;
                color: var(--text-secondary);
                letter-spacing: 1.5px;
                text-transform: uppercase;
                margin-top: -2px;
                opacity: 0.7;
            }

            /* 主题切换按钮 */
            main > header > .header__theme {
                position: absolute;
                top: 16px;
                right: 20px;
                padding: 5px 12px;
                border-radius: 20px;
                border: 1px solid var(--border-color);
                background: rgba(255,255,255,0.06);
                color: var(--text-primary);
                cursor: pointer;
                font-size: 12px;
                transition: var(--transition);
                display: flex;
                align-items: center;
                gap: 6px;
                backdrop-filter: blur(10px);
            }

            main > header > .header__theme:hover {
                border-color: var(--primary-color);
                color: var(--primary-color);
                background: rgba(10,132,255,0.1);
            }

            main > header > .header__theme::before {
                content: '';
                width: 16px;
                height: 16px;
                background-image: var(--theme-icon);
                background-size: contain;
                background-repeat: no-repeat;
                transition: var(--transition);
            }

            :root[theme='dark'] main > header > .header__theme::before {
                background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='%23ffffff'%3E%3Cpath d='M12 3a9 9 0 1 0 9 9c0-.46-.04-.92-.1-1.36a5.389 5.389 0 0 1-4.4 2.26 5.403 5.403 0 0 1-3.14-9.8c-.44-.06-.9-.1-1.36-.1z'/%3E%3C/svg%3E");
            }

            :root:not([theme='dark']) main > header > .header__theme::before {
                background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='%23000000'%3E%3Cpath d='M12 7c-2.76 0-5 2.24-5 5s2.24 5 5 5 5-2.24 5-5-2.24-5-5-5zM2 13h2c.55 0 1-.45 1-1s-.45-1-1-1H2c-.55 0-1 .45-1 1s.45 1 1 1zm18 0h2c.55 0 1-.45 1-1s-.45-1-1-1h-2c-.55 0-1 .45-1 1s.45 1 1 1zM11 2v2c0 .55.45 1 1 1s1-.45 1-1V2c0-.55-.45-1-1-1s-1 .45-1 1zm0 18v2c0 .55.45 1 1 1s1-.45 1-1v-2c0-.55-.45-1-1-1s-1 .45-1 1zM5.99 4.58a.996.996 0 0 0-1.41 0 .996.996 0 0 0 0 1.41l1.06 1.06c.39.39 1.03.39 1.41 0s.39-1.03 0-1.41L5.99 4.58zm12.37 12.37a.996.996 0 0 0-1.41 0 .996.996 0 0 0 0 1.41l1.06 1.06c.39.39 1.03.39 1.41 0a.996.996 0 0 0 0-1.41l-1.06-1.06zm1.06-10.96a.996.996 0 0 0 0-1.41.996.996 0 0 0-1.41 0l-1.06 1.06c-.39.39-.39 1.03 0 1.41s1.03.39 1.41 0l1.06-1.06zM7.05 18.36a.996.996 0 0 0 0-1.41.996.996 0 0 0-1.41 0l-1.06 1.06c-.39.39-.39 1.03 0 1.41s1.03.39 1.41 0l1.06-1.06z'/%3E%3C/svg%3E");
            }

            main > section {
                padding: 24px 28px 32px;
            }

            /* 高级选项 flex-wrap 布局 */
            [key="advanced"] {
                display: flex !important;
                flex-wrap: wrap !important;
                gap: 4px 10px !important;
            }
            [key="advanced"] sub-checkbox {
                font-size: 12px !important;
                line-height: 1.2 !important;
            }

            /* 操作按钮区域居中 */
            .sub-form-item__actions {
                display: flex !important;
                justify-content: center !important;
                align-items: center !important;
                gap: 16px !important;
                margin-top: 28px !important;
                padding-right: 0 !important;
            }
        </style>`;
}
