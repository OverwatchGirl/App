const ipc1 = require('electron').ipcRenderer;
var delayInMilliseconds = 1000; //1 second

document.addEventListener("DOMContentLoaded", function(){
    setTimeout(function() {
        ipc1.send('print-to-pdf',event)
      }, delayInMilliseconds);
});


