const ipc = require('electron').ipcRenderer;
const {Patient,RDV} = require('./config')

function loadRdvs(){
  console.log('jhekjh');

    const rdvs = ipc.sendSync('getSpecRdvs')
    const rdvsItems = rdvs.reduce((html,r)=>{
      table = document.getElementById("tablerdv1") ;
        html +=`
             ${addHtmlTableRow(table , r)}
                     
        `
         return html
    }, '');

    const rdvList = document.getElementById('rdvList1');
    rdvList.innerHTML = rdvsItems;
    console.log('jhekjh');
    console.log(rdvs);
}
document.addEventListener("DOMContentLoaded", function(){
  console.log('jhekjh');
    loadRdvs();
  //  ipc.on('updatedPatients',loadPatients)
});


// function clearTable(table) {
//   var rowCount = table.rows.length;
//   for (var i = rowCount - 1; i > 0; i--) {
//       table.deleteRow(i);
//   }
// }

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




module.exports = { loadRdvs}
