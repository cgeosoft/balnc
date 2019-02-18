const {
  app,
  protocol,
  BrowserWindow
} = require('electron');
const protocolServe = require('electron-protocol-serve');

// Create the protocol
const protocolServeName = protocolServe({
  cwd: 'dist',
  app,
  protocol
});

// The protocol we created needs to be registered
protocol.registerStandardSchemes([protocolServeName], {
  secure: true
});

// After registering protocol and schema, you can use it to serve your app to your window
app.on('ready', () => {
  mainWindow = new BrowserWindow();

  mainWindow.loadURL('serve://dist'); // Will serve index.html from the folder you specified
});
