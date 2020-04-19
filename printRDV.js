const ipc = require('electron').ipcRenderer;

function getPatientAppointment(){
    var app = ipc.sendSync('getRdvPrint');
    console.log(app);
    document.getElementById('nom').innerHTML = app['patient.Nom']
    document.getElementById('prenom').innerHTML = app['patient.Prenom']
    document.getElementById('ddn').innerHTML = app['patient.DateOfBirth'].split(' ')[0]
    document.getElementById('drdv').innerHTML = app.Date.split(' ')[0] 
    document.getElementById('hrdv').innerHTML = app.Date.split(' ')[1].split(':')[0] + ':' +  app.date.split(' ')[1].split(':')[1]
    document.getElementById('trdv').innerHTML = app.Objet
     

}


document.addEventListener("DOMContentLoaded", function(){
    getPatientAppointment()
});


