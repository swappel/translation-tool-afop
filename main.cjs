const { app, BrowserWindow, ipcMain, dialog } = require('electron');
const path = require('path');

const addonPath = app.isPackaged
    ? path.join(process.resourcesPath, 'FoPTransApp_Final.node')
    : path.resolve(__dirname, './backend/build/Release/FoPTransApp_Final.node');

const nativeAddon = require(addonPath);

function createWindow() {
    const mainWindow = new BrowserWindow({
        width: 1200,
        height: 800,
        webPreferences: {
            preload: path.join(__dirname, 'preload.js'),
            nodeIntegration: false,
            contextIsolation: true,
        },
        name: "A:FoP Localization Tool",
        title: "A:FoP Localization Tool",
        autoHideMenuBar: true,
        windowStatePersistence: true
    });

    if (process.env.NODE_ENV === 'development') {
        mainWindow.loadURL('http://localhost:5173');
    } else {
        mainWindow.loadFile(path.join(__dirname, 'dist', 'index.html'));
    }
}

app.whenReady().then(() => {
    ipcMain.handle('load-files', async (event, paths) => {
        const { locpackPath, locpackbinPath } = paths;

        try {
            const result = nativeAddon.loadFiles(locpackPath, locpackbinPath);
            return { success: true, result };
        } catch (error) {
            console.error(error.message);
            return { success: false, error: error.message };
        }
    });

    ipcMain.handle('get-total-lines', async () => {
        try {
            const total = nativeAddon.getTotalLines();
            return { success: true, total };
        } catch (error) {
            console.error(error.message);
            return { success: false, error: error.message };
        }
    });

    ipcMain.handle('verify-files', async (event) => {
        const webContents = event.sender;

        return new Promise((resolve) => {
            try {
                nativeAddon.verifyFiles(
                    (currentLine) => {
                        if (webContents && !webContents.isDestroyed()) {
                            webContents.send('translation-progress', currentLine);
                        }
                    },
                    (result) => {
                        resolve(result);
                    }
                );
            } catch (error) {
                console.error(error.message);
                resolve({ success: false, error: error.message });
            }
        });
    });

    ipcMain.handle('select-file', async (event, extension) => {
        const { canceled, filePaths } = await dialog.showOpenDialog({
            properties: ['openFile'],
            filters: [
                { name: `${extension.toUpperCase()} Files`, extensions: [extension]}
            ]
        });

        if (canceled) {
            return null;
        } else {
            return filePaths[0];
        }
    });

    ipcMain.handle('get-lines-range', async (event, { startIndex, count }) => {
        try {
            const lines = nativeAddon.getLinesRange(startIndex, count);
            return { success: true, lines };
        } catch (error) {
            console.error("Failed to fetch range:", error.message);
            return { success: false, error: error.message };
        }
    });

    ipcMain.handle('save-change', async (event, lineData) => {
        try {
            const result = nativeAddon.saveChangeToCache(lineData);
            return { success: true, result };
        } catch (error) {
            console.error(error.message);
            return { success: false, error: error.message };
        }
    });

    ipcMain.handle('select-save-location', async  (event) => {
        const { canceled, filePaths } = await dialog.showOpenDialog({
            properties: ['promptToCreate'],
            filters: [
                { name: ".LOCPACK/BIN Files", extensions: ["locpack", "locpackbin"]}
            ]
        });

        if (canceled) {
            return null;
        } else {
            return filePaths[0];
        }
    });

    ipcMain.handle('save-to-files', async (event, path) => {
       try {
           const result = nativeAddon.saveToFiles(path);
           return { success: true, result };
       } catch (error) {
           console.error(error.message);
           return { success: false, error: error.message };
       }
    });

    createWindow();

    app.on('activate', () => {
        if (BrowserWindow.getAllWindows().length === 0) createWindow();
    });

    app.on('window-all-closed', () => {
        if (process.platform !== 'darwin') app.quit();
    });
});