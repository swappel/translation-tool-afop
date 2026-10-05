const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');

function createWindow() {
    const mainWindow = new BorderWindow({
       width: 1200,
       height: 800,
       webPreferences: {
           preload: path.join(__dirname, 'preload.js'),
           nodeIntegration: false,
           contextIsolation: true,
       },
    });

    if (process.env.NODE_ENV === 'development') {
        mainWindow.loadURL('http://localhost:5173');
    } else {
        mainWindow.loadFile(path.join(__dirname, 'dist', 'index.html'));
    }
}

app.whenReady().then(() => {
    createWindow();

    app.on('activate', () => {
       if (BrowserWindow.getAllWindows().length === 0) createWindow();
    });

    app.on('window-all-closed', () => {
        if (process.platform !== 'darwin') app.quit();
    });

    ipcMain.handle('ping', async (event, arg) => {
       return 'pong';
    });
})