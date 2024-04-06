const { app, BrowserWindow } = require('electron/main')
const path = require('node:path')
const isDev = process.argv.includes("--dev")

function createWindow() {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
    },
  });
  
  
  if(isDev){
    win.loadURL("http://localhost:4200")
    win.webContents.openDevTools()
  }
  else{
    win.loadFile(path.join(__dirname, "/dist/moi-application-manager/browser/index.html"));
  }
}

app.whenReady().then(() => {
  createWindow();

  app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});