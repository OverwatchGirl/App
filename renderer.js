const ipc = require('electron').ipcRenderer;

const getPatients = document.getElementById('getPatients');
const getRdvs = document.getElementById('getRdvs');
const addPatient = document.getElementById('addPatient');
const addRDV = document.getElementById('addRDV');
const getRdvsByPatient = document.getElementById('getRdvsByPatient');
const getCurrentDayRdvs = document.getElementById('getCurrentDayRdvs');






getPatients.addEventListener('click', function(){
    const reply = ipc.sendSync('getPatients');
    console.log(reply);
    
})
addPatient.addEventListener('click', function(){
    const reply = ipc.sendSync('addPatient');
    console.log(reply);
    
})
getRdvs.addEventListener('click', function(){
    const reply = ipc.sendSync('getRdvs');
    console.log(reply);
    
})
addRDV.addEventListener('click', function(){
    const reply = ipc.sendSync('addRDV');
    console.log(reply);
    
})
getRdvsByPatient.addEventListener('click', function(){
    const reply = ipc.sendSync('getRdvsByPatient');
    console.log(reply);
    
})
getCurrentDayRdvs.addEventListener('click', function(){
    const reply = ipc.sendSync('getCurrentDayRdvs');
    console.log(reply);
    
})