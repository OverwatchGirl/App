const ipc = require('electron').ipcRenderer;

const addRDV = document.getElementById('AddRdv');

addRDV.addEventListener('click', function(){
      const reply = ipc.sendSync('AddRdv');
      console.log(reply);
})
