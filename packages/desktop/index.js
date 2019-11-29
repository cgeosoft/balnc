const { app, BrowserWindow } = require('electron')
const url = require("url");
const path = require("path");

let win;

function createWindow () {
  // Create the browser window.
  win = new BrowserWindow({
    width: 600, 
    height: 600,
    backgroundColor: '#ffffff',
    icon: `file://${__dirname}/app/assets/icons/apple-logo.png`
  })

  win.loadURL(
    url.format({
      pathname: path.join(__dirname, `/app/index.html`),
      protocol: "file:",
      slashes: true
    })
  );

  //// uncomment below to open the DevTools.
  // win.webContents.openDevTools()

  // Event when the window is closed.
  win.on('closed', function () {
    win = null
  })

  win.maximize()
  win.openDevTools()

}

// Create window on electron intialization
app.on('ready', createWindow)

// Quit when all windows are closed.
app.on('window-all-closed', function () {

  // On macOS specific close process
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', function () {
  // macOS specific close process
  if (win === null) {
    createWindow()
  }
})