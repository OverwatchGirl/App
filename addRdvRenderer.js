const ipc = require('electron').ipcRenderer;

const addRDV = document.getElementById('AddRDV');
var date = document.getElementById('date_rdv');
var heure = document.getElementById('time_rdv');
var objet = document.getElementById('objet_rdv');

addRDV.addEventListener('click', function(){

   var data = {
         
         'date' : date.value,
         'heure' : heure.value,
         'objet' : objet.value,
   }
ipc.sendSync('addRDV', data); 
})
