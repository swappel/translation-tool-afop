export interface ElectronAPI {
    sendToNative: (channel: string, data?: any) => Promise<any>;
    onNativeEvent: (channel: string, callback: (...args: any[]) => void) => () => void;
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