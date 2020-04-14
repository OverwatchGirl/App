const electron = require("electron");
const path = require('path')
const url = require ('url')
const {getPatients,addPatient} = require('./controllers/patientController')
const {getRdvs,addRDV,getRdvsByPatient,getCurrentDayRdvs} = require('./controllers/rdvController')

const dialog = require('electron').dialog;
const {Patient,RDV} = require('./config')

const {app, BrowserWindow, Menu, ipcMain} = electron;
const ipc = electron.ipcMain;

let mainWindow;
let addRdvWindow;
let addPatWindow;
app.allowRendererProcessReuse = false;

// Listen for the app to be ready
app.on('ready', function(){
//create new Window
  mainWindow = new BrowserWindow({});
  //load html into window
  mainWindow.loadURL(url.format({
	  pathname: path.join(__dirname, 'mainWindow.html'),
	  preload: path.join(__dirname, 'preload.js'),
  	protocol: 'file:',
  	slashes: true
  }));

  // Build menu from template
  const mainMenu = Menu.buildFromTemplate(mainMenuTemplate);
  //insert menu
  Menu.setApplicationMenu(mainMenu);

});

ipc.on('getPatients',getPatients)
ipc.on('getRdvs',getRdvs)
ipc.on('addPatient',addPatient)
ipc.on('addRDV',addRDV)
ipc.on('getRdvsByPatient',getRdvsByPatient)
ipc.on('getCurrentDayRdvs',getCurrentDayRdvs)

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
  ///Carbage collection handle
  addWindow.on('close', function(){
  	addWindow = null;
  });

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
function createEditRdvWindow(){
	//create new Window
  addWindow = new BrowserWindow({
  	width: 800,
  	height: 500,
  	title:'Modifier un randez-vous'
  });
  //load html into window
  addWindow.loadURL(url.format({
  	pathname: path.join(__dirname, 'editRdvWindow.html'),
  	protocol: 'file:',
  	slashes: true
  }));
  ///Carbage collection handle
  addWindow.on('close', function(){
  	addWindow = null;
  });
}
function createEditPatWindow(){
	//create new Window
  addWindow = new BrowserWindow({
  	width: 800,
  	height: 500,
  	title:'Modifier les données dun patient'
  });
  //load html into window
  addWindow.loadURL(url.format({
  	pathname: path.join(__dirname, 'editPatWindow.html'),
  	protocol: 'file:',
  	slashes: true
  }));

  ///Carbage collection handle
  addWindow.on('close', function(){
  	addWindow = null;
  });

}
function createDeletePatWindow(){
	//create new Window
  addWindow = new BrowserWindow({
  	width: 200,
  	height: 300,
  	title:'Supprimer un patient'
  });
  //load html into window
  addWindow.loadURL(url.format({
  	pathname: path.join(__dirname, 'deletePatWindow.html'),
  	protocol: 'file:',
  	slashes: true
  }));

  ///Carbage collection handle
  addWindow.on('close', function(){
  	addWindow = null;
  });

}
function createDeleteRdvWindow(){
	//create new Window
  addWindow = new BrowserWindow({
  	width: 200,
  	height: 300,
  	title:'Supprimer un randez-vous'
  });
  //load html into window
  addWindow.loadURL(url.format({
  	pathname: path.join(__dirname, 'deleteRdvWindow.html'),
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
		label: 'Modifier',
		click(){
			createEditRdvWindow();
		}  
	},
	{
		label: 'Supprimer',
		click(){
			createDeleteRdvWindow();
		} 
	},

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
		label: 'Modifier',
		click(){
			createEditPatWindow();
		} 
	},
	{
		label: 'Randez-vous'      
	},
	{
		label: 'Supprimer',
		click(){
			createDeletePatWindow();
		} 
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

