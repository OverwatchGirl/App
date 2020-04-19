const ipc = require('electron').ipcRenderer;

function loadrdv(){
    const rdv = ipc.sendSync('getRdvById')
    document.getElementById('objet_rdv').value = rdv.Objet
    document.getElementById('date_rdv').value = rdv.Date.split(' ')[0]
    document.getElementById('time_rdv').value = rdv.Date.split(' ')[1]
}
document.addEventListener("DOMContentLoaded", function(){
    loadrdv()
});
const editRDV = document.getElementById('edit_rdv');

editRDV.addEventListener('click', function(){
var date = document.getElementById('date_rdv');
var heure = document.getElementById('time_rdv');
var objet = document.getElementById('objet_rdv');

    var data = {
          
          'date' : date.value,
          'heure' : heure.value,
          'objet' : objet.value,
    }
 ipc.sendSync('editRDV', data);
 })
 

