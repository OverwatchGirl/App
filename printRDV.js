const ipc = require('electron').ipcRenderer;

function getPatientAppointment(){
    const RDV = ipc.sendSync('getRdvPrint');
    document.getElementById('nom').innerHTML = RDV['patient.Nom'];
    document.getElementById('prenom').innerHTML = RDV['patient.Prenom'];
    document.getElementById('ddn').innerHTML = RDV['patient.DateOfBirth'].split(' ')[0];
    document.getElementById('drdv').innerHTML = RDV.Date.split(' ')[0];
    document.getElementById('hrdv').innerHTML = RDV.Date.split(' ')[1];
    document.getElementById('trdv').innerHTML = RDV.Objet;
     

}


document.addEventListener("DOMContentLoaded", function(){
    getPatientAppointment()
});


