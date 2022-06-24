const {app, BrowserWindow,ipcMain } = require('electron')
const path = require('path')
const url = require('url')
const { menu } = require("./menu");


// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let win
const isWindows = process.platform === "win32";

function createWindow () {
  // Create the browser window.
  win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
      // (NOT RECOMMENDED)
      // If true, we can skip attaching functions from ./menu-functions.js to window object in preload.js.
      // And, instead, we can use electron APIs directly in renderer.js
      // From Electron v5, nodeIntegration is set to false by default. And it is recommended to use preload.js to get access to only required Node.js apis.
      // nodeIntegration: true
    },
    frame: isWindows ? false : true 
  });


    const startUrl = process.env.ELECTRON_START_URL || url.format({
        pathname: path.join(__dirname, '/../build/index.html'),
        protocol: 'file:',
        slashes: true
    });
    win.loadURL(startUrl);

  // Emitted when the window is closed.
  win.on('closed', () => {
    win = null
  })
}

app.on('ready', createWindow)

// Quit when all windows are closed.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  if (win === null) {
    createWindow()
  }
})

ipcMain.on(`display-app-menu`, function(e, args) {
  if (isWindows && win) {
    menu.popup({
      window: win,
      x: args.x,
      y: args.y
    });
  }
});
