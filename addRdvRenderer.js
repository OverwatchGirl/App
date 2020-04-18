const ipc = require('electron').ipcRenderer;

const addRDV = document.getElementById('AddRDV');
var nom_patient = document.getElementById('nom_pat_rdv');
var pre_patient = document.getElementById('pre_pat_rdv');
var date = document.getElementById('date_rdv');
var heure = document.getElementById('time_rdv');
var objet = document.getElementById('objet_rdv');


addRDV.addEventListener('click', function(){

   var data = {
         'nom_pat' :  nom_patient.value,
         'pre_pat' :  pre_patient.value,
         'date' : date.value,
         'heure' : heure.value,
         'objet' : objet.value,
   }

ipc.sendSync('addRDV', data);
})
