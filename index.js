const { app, Tray, Menu } = require('electron');
const rpc = require('discord-rpc');
const { exec } = require('child_process');
const os = require('os');
const path = require('path');
const CLIENT_ID = '1423651775281500311';
const rpcClient = new rpc.Client({ transport: 'ipc' });
let startTime = Date.now();
let tray = null;
let contextMenu = null;
let gameWasRunning = false;

function isReverse1999Running(callback) {
    if (os.platform() !== 'win32') {
        return callback(false);
    }
    exec('tasklist /FI "IMAGENAME eq reverse1999.exe" /FO CSV', (error, stdout) => {
        if (error) return callback(false);
        callback(stdout.includes('reverse1999.exe'));
    });
}
function setPresence(running) {
    if (running) {
        rpcClient.setActivity({
            details: 'Playing Reverse: 1999',
            state: 'Time Traveling Adventure',
            startTimestamp: startTime,
            largeImageKey: 'reverse_icon',
            largeImageText: 'Reverse: 1999',
            smallImageKey: 'user_icon',
            smallImageText: 'Exploring Mysteries'
        });
        if (tray) tray.setTitle('Reverse 1999 RPC: Active');
    } else {
        try {
            rpcClient.clearActivity();
        } catch (err) {
            console.log('Clear activity error:', err.message);
        }
        if (tray) tray.setTitle('Reverse 1999 RPC: Idle');
    }
}
app.on('uncaughtException', (err) => {
    console.log('Error caught:', err.message);
});
rpcClient.on('ready', () => {
    isReverse1999Running((running) => {
        if (running) startTime = Date.now();
        gameWasRunning = running;
        setPresence(running);
    });
    
    setInterval(() => {
        isReverse1999Running((running) => {
            // Cập nhật trạng thái RPC nhưng không tắt app
            if (running !== gameWasRunning) {
                if (running) {
                    console.log('Game started! Updating RPC...');
                    startTime = Date.now();
                } else {
                    console.log('Game closed. RPC will wait for next game start...');
                }
                setPresence(running);
                gameWasRunning = running;
            }
        });
    }, 2000);
});
rpcClient.login({ clientId: CLIENT_ID }).catch(console.error);
app.whenReady().then(() => {
    const iconPath = path.join(__dirname, 'icon.png');
    tray = new Tray(iconPath);
    contextMenu = Menu.buildFromTemplate([
        { label: 'Reverse 1999: Idle', enabled: false },
        { type: 'separator' },
        { label: 'Exit RPC', role: 'quit' }
    ]);
    tray.setContextMenu(contextMenu);
    tray.setToolTip('Reverse 1999 RPC Tool - Always Running');
    tray.setTitle('Reverse 1999 RPC');
    
    setInterval(() => {
        isReverse1999Running((running) => {
            if (contextMenu && contextMenu.items[0]) {
                contextMenu.items[0].label = `Reverse 1999: ${running ? 'Running' : 'Idle'}`;
            }
        });
    }, 5000);
});
app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') app.quit();
});
app.on('before-quit', () => {
    rpcClient.destroy();
});