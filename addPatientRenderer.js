const ipc = require('electron').ipcRenderer;

const addPatient = document.getElementById('AddPatient');
var nom = document.getElementById('nom_pat');
var prenom = document.getElementById('prenom_pat');
var DateBirth = document.getElementById('date_birth');
var email = document.getElementById('mail_pat');
var tel = document.getElementById('tel_pat');
var info = document.getElementById('info_pat');

addPatient.addEventListener('click', function(){
   var data = {
         'nom' :  nom.value,
         'prenom' : prenom.value,
         'date' : DateBirth.value,
         'email' : email.value,
         'tel' : tel.value,
         'info' : info.value,
   }
   console.log(data.nom);
ipc.sendSync('AddPatient', data);
})
