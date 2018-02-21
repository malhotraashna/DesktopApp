
const electron = require('electron');
const url = require('url');
const path = require('path');

const {app, BrowserWindow, Menu, ipcMain} = electron;

let mainWindow;

//Listen for app to be ready
app.on('ready', function(){
    console.log('app on');
    //create window
    mainWindow = new BrowserWindow({});
    //load html into the window
    mainWindow.loadURL(url.format({
        pathname: path.join(__dirname, 'test1.html'),
        protocol: 'file:',
        slashes: true
    }));

    //build menu from template
    //const mainMenu = Menu.buildFromTemplate(menuTemplate);
    //insert menu
    //Menu.setApplicationMenu(mainMenu);

    ipcMain.on('asynchronous-message', (event, arg) => {
        console.log('display on');
        event.sender.send('asynchronous-reply', 'pong')
      })
});

//create menu template
const menuTemplate = [{
    label: 'File'
    }
];



  ipcMain.on('synchronous-message', (event, arg) => {
    console.log('display on');
    event.returnValue = 'pong'
  })