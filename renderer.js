const ipc = require('electron').ipcRenderer;

// const getPatients = document.getElementById('getPatients');
// const getRdvs = document.getElementById('getRdvs');
// const getRdvsByPatient = document.getElementById('getRdvsByPatient');
const getCurrentDayRdvs = document.getElementById('getCurrentDayRdvs');
table = document.getElementById("tableRDV");            


// getPatients.addEventListener('click', function(){
//     const reply = ipc.sendSync('getPatients');
//     console.log(reply);
    
// getRdvs.addEventListener('click', function(){
//     const reply = ipc.sendSync('getRdvs');
//     console.log(reply);
    
// })

// getRdvsByPatient.addEventListener('click', function(){
//     const reply = ipc.sendSync('getRdvsByPatient');
//     console.log(reply);
    
// })
var rIndex 
getCurrentDayRdvs.addEventListener('onload', function(){
    const reply = ipc.sendSync('getCurrentDayRdvs')
    console.log('hjhghgjh')
    console.log(reply)
    })

//add row
function addHtmlTableRow()
{
// get the table by id
// create a new row and cells
// get value from input text
// set the values into row cell's
var newRow = table.insertRow(table.length),
    cell1 = newRow.insertCell(0),
    cell2 = newRow.insertCell(1),
    cell3 = newRow.insertCell(2),
    cell4 = newRow.insertCell(4),
    codePatRdv = "x"
    codeRdv= "dx"
    timeRdv = "fv"
    objetRdv ="vf"

cell1.innerHTML = codePatRdv;
cell2.innerHTML = codeRdv;
cell3.innerHTML = timeRdv;
cell4.innerHTML = objetRdv;
// call the function to set the event to the new row
//selectedRowToInput();
}
// display selected row data into input text
// function selectedRowToInput()
// {

// for(var i = 1; i < table.rows.length; i++)
// {
//     table.rows[i].onclick = function()
//     {
//       // get the seected row index
//       rIndex = this.rowIndex;
//       document.getElementById("fname").value = this.cells[0].innerHTML;
//       document.getElementById("lname").value = this.cells[1].innerHTML;
//       document.getElementById("age").value = this.cells[2].innerHTML;
//     };
// }
// }
// selectedRowToInput();

// function editHtmlTbleSelectedRow()
// {
// var fname = document.getElementById("fname").value,
//     lname = document.getElementById("lname").value,
//     age = document.getElementById("age").value;
// if(!checkEmptyInput()){
// table.rows[rIndex].cells[0].innerHTML = fname;
// table.rows[rIndex].cells[1].innerHTML = lname;
// table.rows[rIndex].cells[2].innerHTML = age;
// }
// }

// function removeSelectedRow()
// {
// table.deleteRow(rIndex);
// // clear input text
// document.getElementById("fname").value = "";
// document.getElementById("lname").value = "";
// document.getElementById("age").value = "";
// }
