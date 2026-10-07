const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('api', {
   sendToNative: (channel, data) => {
       const validChannels = [
           'select-file', 'load-files', 'get-total-lines', 'verify-files'
       ];
       if (validChannels.includes(channel)) {
           return ipcRenderer.invoke(channel, data);
       }
       return Promise.reject(new Error(`Invalid IPC channel: ${channel}`));
   },

    loadFiles: (locpackPath, locpackbinPath) => {
        return ipcRenderer.invoke('load-files', { locpackPath, locpackbinPath });
    },

    getTotalLines: () => {
      return ipcRenderer.invoke('get-total-lines');
    },

    verifyFiles: () => {
       return ipcRenderer.invoke('verify-files');
    },

    getLinesRange: (startIndex, count) => {
        return ipcRenderer.invoke('get-lines-range', { startIndex, count });
    },

    onNativeEvent: (channel, callback) => {
       const validChannels = ['translate-response', 'translation-progress'];
       if (validChannels.includes(channel)) {
           const subscription = (event, ...args) => callback(...args);
           ipcRenderer.on(channel, subscription);

           return () => ipcRenderer.removeListener(channel, subscription);
       }
    }
});