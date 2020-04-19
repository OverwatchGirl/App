const ipc = require('electron').ipcRenderer;

const showRDV = document.getElementById('btn_afficher');
var date = document.getElementById('date_spec');


showRDV.addEventListener('click', function(){

  var data = {
         
		'date' : date.value,
	   
  }
    
  ipc.sendSync('openRdvSpec', data);
  
})
