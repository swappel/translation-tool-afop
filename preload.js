const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('api', {
   sendToNative: (channel, data) => {
       const validChannels = ['translate-request', 'ping'];
       if (validChannels.includes(channel)) {
           return ipcRenderer.invoke(channel, data);
       }
       return Promise.reject(new Error(`Invalid IPC channel: ${channel}`));
   },

    onNativeEvent: (channel, callback) => {
       const validChannels = ['translate-response', 'translation-progress'];
       if (validChannels.includes(channel)) {
           const subscription = (event, ...args) => callback(...args);
           ipcRenderer.on(channel, subsccription);

           return () => ipcRenderer.removeListener(channel, subscription);
       }
    }
});