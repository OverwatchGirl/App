
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
function createDisplayRdvWindow(){
	//create new Window
  addWindow = new BrowserWindow({
  	width: 200,
  	height: 300,
  	title:'Afficher la liste des randez-vous'
  });
  //load html into window
  addWindow.loadURL(url.format({
  	pathname: path.join(__dirname, 'displayRdvWindow.html'),
  	protocol: 'file:',
  	slashes: true
  }));

  ///Carbage collection handle
  addWindow.on('close', function(){
  	addWindow = null;
  });

}
function createDisplayPatWindow(){
	//create new Window
  addWindow = new BrowserWindow({
  	width: 200,
  	height: 300,
  	title:'Afficher la liste des patients'
  });
  //load html into window
  addWindow.loadURL(url.format({
  	pathname: path.join(__dirname, 'displayPatWindow.html'),
  	protocol: 'file:',
  	slashes: true
  }));

  ///Carbage collection handle
  addWindow.on('close', function(){
  	addWindow = null;
  });

}
function createShowRdvWindow(){
	//create new Window
  addWindow = new BrowserWindow({
  	width: 200,
  	height: 300,
  	title:'Afficher les randez-vous d"un patient'
  });
  //load html into window
  addWindow.loadURL(url.format({
  	pathname: path.join(__dirname, 'showRdvWindow.html'),
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
		label: 'Liste', 
		click(){
			createDisplayRdvWindow();
		} 

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
		label: 'Liste', 
		click(){
			createDisplayPatWindow();
		}       
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
		label: 'Randez-vous',
		click(){
			createShowRdvWindow();
		} 
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

