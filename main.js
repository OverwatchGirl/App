
const electron = require('electron');
const url = require('url');
const path = require('path');
const {getPatients} = require('./controllers/patientController')
const {getRdvs,getCurrentDayRdvs} = require('./controllers/rdvController')
const {Op} = require ('sequelize')
const fs = require ('fs')
const os = require ('os')
const shell= electron.shell;
const dialog = require('electron').dialog;
const {Patient,RDV} = require('./config')


const {app, BrowserWindow, Menu} = electron;
const ipc = electron.ipcMain;

let mainWindow;

app.allowRendererProcessReuse = false;

// Listen for the app to be ready
var mainWindowP;
app.on('ready', function(){
//create new Window
  mainWindowP = new BrowserWindow({});
  //load html into window
  mainWindowP.loadURL(url.format({
	  pathname: path.join(__dirname, 'mainWindow.html'),
	  preload: path.join(__dirname, 'preload.js'),

  	protocol: 'file:',
	  slashes: true,
	  webPreferences: {
		nodeIntegration: true
	  }
  }));
  // Build menu from template
  const mainMenu = Menu.buildFromTemplate(mainMenuTemplate);
  //insert menu
  Menu.setApplicationMenu(mainMenu);
});

//Handle create add window

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

var addWindow
function createDisplayRdvWindow(){
	//create new Window
  addWindow1 = new BrowserWindow({
  	width: 800,
  	height: 500,
  	title:'Afficher la liste des rendez-vous'
  });
  //load html into window
  addWindow1.loadURL(url.format({
  	pathname: path.join(__dirname, 'displayRdvWindow.html'),
  	protocol: 'file:',
  	slashes: true
  }));

  ///Carbage collection handle
  addWindow1.on('close', function(){
  	addWindow1 = null;
  });

}
function createDisplayPatWindow(){
	//create new Window
  addWindow = new BrowserWindow({
  	width: 800,
  	height: 500,
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

function createShowRdvSpec(){
	//create new Window
  addWindow = new BrowserWindow({
  	width: 800,
  	height: 500,
  	title:'Afficher les rendez-vous d"un patient'
  });
  //load html into window
  addWindow.loadURL(url.format({
  	pathname: path.join(__dirname, 'showRdvSpec.html'),
  	protocol: 'file:',
  	slashes: true
  }));

  ///Carbage collection handle
  addWindow.on('close', function(){
  	addWindow = null;
  });
}


ipc.on('getPatients',getPatients)
ipc.on('getRdvs',getRdvs)
ipc.on('AddPatient',(event,arg) => {
		nom = arg ['nom'];
		prenom = arg ['prenom'];
		date = arg ['date'];
		email = arg ['email'];
		tel = arg ['tel'];
		info = arg ['info'];
	Patient.create({
		Nom: nom,
		Prenom: prenom,
		DateOfBirth: date,
		InfoMed: info,
		Telephone: tel,
		AdresseMail : email
	  }).then(patient => {
		event.returnValue = patient;
	  });
})
var id_pat;
ipc.on('ajouterRDV',(event,arg) => {
	
	addWindow = new BrowserWindow({
		width: 800,
		height: 500,
		title:'Ajouter un rendez-vous'
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
	id_pat = arg ['id'];
	event.returnValue = id_pat;
	
	
})


ipc.on('addRDV', (event,arg) => {


	date = arg ['date'].split('-');
	heure = arg ['heure'].split(':');
	objet = arg ['objet'];

    date = date.map(e => parseInt(e))
    heure = heure.map(e => parseInt(e))
    datetime = new Date(date[0], date[1] - 1, date[2], heure[0] + 1, heure[1], 0)
	
	Patient.findOne({where: {id : id_pat}}).then((patientFound)=>{
		if (patientFound) {
			RDV.create({
				Objet: objet,
				Date: datetime, 
				patientId: patientFound.id
			  }).then(rdv => {
				event.returnValue = rdv;
			  });
		}
		else event.returnValue = 'error'

	});
	mainWindowP.reload();
	addWindow1.reload();


})


var id_pat_rdv;
ipc.on('displayRDV', (event,arg) => {
	addWindow = new BrowserWindow({
		width: 800,
		height: 500,
		title:'Afficher les rendez-vous d"un patient'
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
	id_pat_rdv = arg ['id'];
	event.returnValue = id_pat_rdv;

})

ipc.on('getRdvsByPatient',(event,arg) => {

	RDV.findAll({where: {patientId: id_pat_rdv}, raw : true,
		  include: [{
			model: Patient
		  }]}).then(rdvs => {
		
		event.returnValue =rdvs;
	  }).catch((err)=>console.log(err))
	  
  })

var id_rdv;
  ipc.on('modifierRDV', (event,arg) => {
	addWindow1.close();
	addWindow = new BrowserWindow({
		width: 800,
		height: 500,
		title:'Afficher les rendez-vous d"un patient'
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
	id_rdv = arg ['id'];
	event.returnValue = id_rdv;

})

ipc.on('getRdvById', (event,arg) => {
	RDV.findOne({ where: { id: id_rdv }, raw: true }).then(rdv => {

		event.returnValue = rdv;
	  }).catch((err) => console.log(err))
})

ipc.on('editRDV', (event,arg) => {
	date = arg ['date'].split('-');
	heure = arg ['heure'].split(':');
	objet = arg ['objet'];

    date = date.map(e => parseInt(e))
    heure = heure.map(e => parseInt(e))
    datetime = new Date(date[0], date[1] - 1, date[2], heure[0] + 1, heure[1], 0)
	
		
		RDV.findOne({
			where: { id: id_rdv // deletes all pugs whose age is 7
				}
		  }).then((rdvfound) => {
			if (rdvfound) {
			  RDV.update(
				{
				  Objet: objet,
				  Date: datetime,
				},
				{
				  where: {
					id: id_rdv
				  }
				}).then(() => {
				//   getPatientAppointmentWin.send('updatedAppPatient')
				  event.returnValue = 'update successfully'
				}).catch((err) => event.returnValue = 'error')
			}
			else {
			  event.returnValue = 'Appointment not found'
			}
		  })
		  mainWindowP.reload();
		})



ipc.on('deleteRDV',(event,arg) => {
	idRDV= arg ['id'];
	RDV.destroy(
		{
		  where: {
			id: idRDV
		  },
	
		}).then(() => event.returnValue = 'delete successfully')
		.catch((err) => event.returnValue = 'error')
		mainWindowP.reload();
})


ipc.on('getCurrentDayRdvs',getCurrentDayRdvs)


var date_spec
ipc.on('openRdvSpec', (event,arg) => {
	mainWindowS = new BrowserWindow({
		width: 800,
		height: 500,
		title:'Modifier les données dun patient'
	});
	//load html into window
	mainWindowS.loadURL(url.format({
		pathname: path.join(__dirname, 'RdvSpec.html'),
		protocol: 'file:',
		slashes: true
	}));
	///Carbage collection handle
	mainWindowS.on('close', function(){
		mainWindowS = null;
	});
	date_spec = arg['date']; 
	event.returnValue = date_spec;


})

ipc.on('getSpecRdvs', (event, arg)=>{
	var parts = date_spec.split('-');
	var startDate = new Date(parts[0], parts[1] - 1, parts[2],00,00,0,1); 
	const endDate = new Date(parts[0], parts[1] - 1, parts[2],25,59,0,1); 

    RDV.findAll({where: {
          Date: { [Op.between]: [startDate, endDate], }
        },raw : true,
      include: [{
      model: Patient
    }]
  }).then(rdvs => {

	  event.returnValue = rdvs;
	  console.log(rdvs);
	}).catch((err) => console.log(err))
	
  })
var id_rdv_print ; 
var printWindow;
  ipc.on ('printRDV', (event,arg) => {
	printWindow = new BrowserWindow({
		width: 800,
		height: 500,
		title:'Modifier les données dun patient'
	});
	//load html into window
	printWindow.loadURL(url.format({
		pathname: path.join(__dirname, 'printRDV.html'),
		protocol: 'file:',
		slashes: true
	}));
	///Carbage collection handle
	printWindow.on('close', function(){
		printWindow = null;
	});
	id_rdv_print = arg['id']; 
	event.returnValue = date_spec;


})


ipc.on('getRdvPrint', (event,arg) => {

	RDV.findOne({ where: { id: id_rdv_print }, raw: true, include: [{
		model: Patient
	  }] }).then(rdv => {

		event.returnValue = rdv;
		
	  }).catch((err) => console.log(err))


})

ipc.on('print-to-pdf', function (event) {
	console.log('ksddkq');
    printWindow.webContents.print({ printBackground: true, landscape: true }, function (error, data) {
      if (error) appointmentWin.close()
	})
	console.log('iiih');
  })


//create a meanu template
const mainMenuTemplate = [
{

	label: 'Rendez-vous',
	submenu :[
	{
		label: 'Liste', 
		click(){
			createDisplayRdvWindow();
		} 

	},
	{
		label: 'Afficher RDV par date', 
		click(){
			createShowRdvSpec();
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
	
	]
},
{
    label: 'Quitter',
    click(){
    	app.quit();
    }
    }


];

