import type { ParserType } from '../core/parser/types';

export type VpsMap = Map<string, ParserType>;
export type SubType = 'base64' | 'yaml' | 'json' | 'unknown';

export type ConvertTarget = 'clash' | 'clashr' | 'singbox' | (string & {});

export interface ShortUrl {
    id: number;
    short_code: string;
    short_url: string;
    long_url: string;
}

export * from './Clash';
export * from './Singbox';
export * from './V2Ray';

export interface UsageLog {
    id: number;
    url: string;
    sub_url: string;
    short_url: string;
    target: string;
    config: string;
    protocol: string;
    advanced: string;
    ip: string;
    user_agent: string;
    created_at: string;
}
