const ipc = require('electron').ipcRenderer;

const afficherRDV = document.getElementById('afficherRDV');
var nom_patient = document.getElementById('nom_pat');
var pre_patient = document.getElementById('pre_pat');



function loadRdvsByPatient(){
  
	var patient = Patient.findOne({raw : true, where: {Nom:nom_patient.value, Prenom:pre_patient.value}}).then(patient => {

		event.returnValue = patient;
	  }).catch((err) => console.log(err))
  var data =  {
    'id' : patient.id , 
  }

  const rdvs = ipc.sendSync('getRdvsByPatient', data);
  const rdvsItems = rdvs.reduce((html,r)=>{
      table = document.getElementById("table") ;
      html +=`
           ${addHtmlTableRow(table , r)}
                   
      `
       return html
  }, '');

  const rdvList = document.getElementById('rdvList');
  rdvList.innerHTML = rdvsItems;

}

afficherRDV.addEventListener("click", function(){
  loadRdvsByPatient();
//  ipc.on('updatedPatients',loadPatients)
});

function addHtmlTableRow(table ,RDV)
{ 
var newRow = table.insertRow(-1);
var cell1 = newRow.insertCell(0);
var cell2 = newRow.insertCell(1);
var cell3 = newRow.insertCell(2);
var cell4 = newRow.insertCell(3);
var cell5 = newRow.insertCell(4);

cell1.innerHTML = RDV['patient.Nom'];
cell2.innerHTML = RDV['patient.Prenom'];
cell3.innerHTML = RDV.Date.split(' ')[0];
cell4.innerHTML = RDV.Date.split(' ')[1];
cell5.innerHTML = RDV.Objet;


}

