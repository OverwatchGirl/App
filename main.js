const electron = require('electron');
const url = require('url');
const path = require('path');

const {app, BrowserWindow, Menu, ipcMain} = electron;

let mainWindow;
let addRdvWindow;
let addPatWindow;

// Listen for the app to be ready
app.on('ready', function(){
//create new Window
  mainWindow = new BrowserWindow({});
  //load html into window
  mainWindow.loadURL(url.format({
  	pathname: path.join(__dirname, 'mainWindow.html'),
  	protocol: 'file:',
  	slashes: true
  }));

  // Build menu from template
  const mainMenu = Menu.buildFromTemplate(mainMenuTemplate);
  //insert menu
  Menu.setApplicationMenu(mainMenu);

});

//Handle create add window

function createAddRdvWindow(){
	//create new Window
  addWindow = new BrowserWindow({
  	width: 800,
  	height: 500,
  	title:'Ajouter un randez-vous'
  });
  //load html into window
  addWindow.loadURL(url.format({
  	pathname: path.join(__dirname, 'addRdvWindow.html'),
  	protocol: 'file:',
  	slashes: true
  }));

}
function createAddPatWindow(){
	//create new Window
  addWindow = new BrowserWindow({
  	width: 800,
  	height: 500,
  	title:'Ajouter un patient'
  });
  //load html into window
  addWindow.loadURL(url.format({
  	pathname: path.join(__dirname, 'addPatWindow.html'),
  	protocol: 'file:',
  	slashes: true
  }));

  ///Carbage collection handle
  addWindow.on('close', function(){
  	addWindow = null;
  });

}

// catch Rdv:add
ipcMain.on('Rdv:add', function(e, Rdv){
	mainWindow.webConetnts.send('Rdv:add', Rdv);
	addWindow.close();

});
// catch Pat:add
ipcMain.on('Pat:add', function(e, pat){
	mainWindow.webConetnts.send('Pat:add', Pat);
	addWindow.close();

});

//create a meanu template
const mainMenuTemplate = [
{

	label: 'Randez-vous',
	submenu :[
	{
		label: 'Liste'      
	},
	{
		label: 'Ajouter',
		click(){
			createAddRdvWindow();
		}      
	},
	{
		label: 'Modifier'
	},
	{
		label: 'Supprimer'
	}

	]
},
{

	label: 'Patient',
	submenu :[
	{
		label: 'Liste'      
	},
	{
		label: 'Ajouter',
		click(){
			createAddPatWindow();
		}     
	},
	{
		label: 'Modifier Données'
	},
	{
		label: 'Supprimer'
	}

	]
},
{
    label: 'Quitter',
    click(){
    	app.quit();
    }
    }


];

