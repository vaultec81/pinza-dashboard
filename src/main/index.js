import path from 'path';
import {app, BrowserWindow} from 'electron';
import pinzaManager from './pinzaManager'

const entryUrl = process.env.NODE_ENV === 'development'
  ? 'http://localhost:6789/index.html'
  : `file://${path.join(__dirname, 'index.html')}`;

let window = null;

app.on('ready', () => {
  window = new BrowserWindow({width: 800, height: 600, webPreferences: {
    webSecurity: false,
    nodeIntegration: true
  }});
  window.loadURL(entryUrl);
  window.on('closed', () => window = null);
});

app.on('window-all-closed', () => {
  if(process.platform !== 'darwin') {
    app.quit();
  }
});
new pinzaManager();