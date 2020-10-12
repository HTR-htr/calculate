let electron = require('electron')
let app = electron.app
let BrowserWindow = electron.BrowserWindow

let mainWindow = null
app.on('ready',()=>{
    let mainWindow = new BrowserWindow({
        width:500,
        height:650,
        webPreferences:{
            nodeIntegration:true,    //支持node的功能
            enableRemoteModule:true //支持remote
        }
    })
    mainWindow.webContents.openDevTools()
    mainWindow.loadFile('index.html')
    
    //关闭事件。主窗口设置为null
    mainWindow.on('closed',()=>{
        mainWindow = null
    })
})
//开发设置热更新
// try {
//     require('electron-reloader')(module);
// } catch (_) { }
