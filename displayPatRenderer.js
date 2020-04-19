const ipc = require('electron').ipcRenderer;
const {Patient,RDV} = require('./config')

function loadPatients(){
    const patients = ipc.sendSync('getPatients')
    const patientsItems = patients.reduce((html,p)=>{
        table = document.getElementById("tablepat") ;
        html +=`
             ${addHtmlTableRow(table , p)}
                     
        `
         return html
    }, '');

    const patientList = document.getElementById('patientsList');
    patientList.innerHTML = patientsItems;

}

document.addEventListener("DOMContentLoaded", function(){
    loadPatients();
  //  ipc.on('updatedPatients',loadPatients)
});

function addHtmlTableRow(table ,Patient)
{ 
var newRow = table.insertRow(-1);
var cell1 = newRow.insertCell(0);
var cell2 = newRow.insertCell(1);
var cell3 = newRow.insertCell(2);
var cell4 = newRow.insertCell(3);
var cell5 = newRow.insertCell(4);
var cell6 = newRow.insertCell(5);
var cell7 = newRow.insertCell(6);
var cell8 = newRow.insertCell(7);


   
cell1.innerHTML = Patient.Nom;
cell2.innerHTML = Patient.Prenom;
cell3.innerHTML = Patient.DateOfBirth.split(' ')[0];
cell4.innerHTML = Patient.Telephone;
cell5.innerHTML = Patient.AdresseMail;
cell6.innerHTML = Patient.InfoMed;
cell7.innerHTML = html = ` <button type="button" onClick="ajouterRDV(${Patient.id})"> Ajouter </button> `
cell8.innerHTML = html = ` <button type="button" onClick="afficherRDV(${Patient.id})"> Afficher </button> `

}
function ajouterRDV(id) {
  var data = {
    'id' : id , 
  }
  ipc.sendSync('ajouterRDV',data);
}

function afficherRDV(id) {
  var data = {
    'id' : id , 
  }
  ipc.sendSync('afficherRDV',data);
}


module.exports = { loadPatients }
