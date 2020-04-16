const ipc = require('electron').ipcRenderer;

const addPatient = document.getElementById('AddPatient');

addPatient.addEventListener('click', function(){
      const reply = ipc.sendSync('AddPatient');
      console.log(reply);
})
