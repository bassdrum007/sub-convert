export function style(): string {
    return `
    <style>
        /* 全局主题变量 */
        :root {
            /* Dark Theme (default) */
            --primary-color: #6c5ce7;
            --primary-hover: #a29bfe;
            --primary-active: #5a4bd1;
            --text-primary: #f0f0f5;
            --text-secondary: #9898a8;
            --text-disabled: #5a5a6e;
            --border-color: rgba(255,255,255,0.08);
            --border-hover: rgba(255,255,255,0.15);
            --background: rgba(255,255,255,0.03);
            --background-secondary: rgba(255,255,255,0.05);
            --background-disabled: rgba(255,255,255,0.04);
            --shadow: rgba(0, 0, 0, 0.3);
            --radius: 10px;
            --transition: all 0.2s cubic-bezier(0.645, 0.045, 0.355, 1);
        }

        /* Light Theme */
        :root[theme='light'] {
            --primary-color: #6c5ce7;
            --primary-hover: #5a4bd1;
            --primary-active: #4a3cc7;
            --text-primary: #1a1a2e;
            --text-secondary: #6b6b80;
            --text-disabled: #a0a0b0;
            --border-color: rgba(0,0,0,0.1);
            --border-hover: rgba(0,0,0,0.18);
            --background: #ffffff;
            --background-secondary: #f8f8fc;
            --background-disabled: #f0f0f5;
            --shadow: rgba(0, 0, 0, 0.08);
        }
    </style>
    `;
}
