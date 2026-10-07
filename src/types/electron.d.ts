export interface ElectronAPI {
    sendToNative: (channel: string, data?: any) => Promise<any>;
    loadFiles: (locpackPath: string, locpackbinPath: string) => Promise<{ success: boolean; result?: any; error?: string }>;
    getTotalLines: () => Promise<{ success: boolean, total?: number, error?: string }>
    verifyFiles: () => Promise<{ success: boolean, error?: string }>;
    onNativeEvent: (channel: string, callback: (...args: any[]) => void) => () => void;
    getLinesRange: (startIndex: number, count: number) => Promise<{ success: boolean; lines?: LocaleLineData[]; error?: string }>;
}

export interface LocaleLineData {
    hash: string;
    fields: number[];
    content: string;
}

declare global {
    interface Window {
        api: ElectronAPI
    }
}

/*
To call backend in window, use:

const handle... = async () => {
    const result = await window.api.sendToNative('translate-request', { original: "Hi there!", translated: "Kxì!" });

    ...
}
 */