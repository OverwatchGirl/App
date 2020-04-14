const {RDV,Patient} = require('../config')


function getRdvs(event, arg) {
    RDV.findAll().then(rdvs => {
      
      event.returnValue =rdvs;
    }).catch((err)=>console.log(err))
    
  }
  function getRdvsByPatient(event, arg) {
    patientId = 1
    RDV.findAll({where: {patientId:patientId}}).then(rdvs => {
      
      event.returnValue =rdvs;
    }).catch((err)=>console.log(err))
    
  }

  function getCurrentDayRdvs(event, arg) {
    currentDate = Date.now()
    RDV.findAll({where: {Date:currentDate}}).then(rdvs => {
      
      event.returnValue =rdvs;
    }).catch((err)=>console.log(err))
    
  }

  function addRDV(event, arg) {
    objet = "rdv3"
    DateA = new Date('2020-12-17T03:24:00');
    patientId = 1
    Patient.findOne({where: {id:patientId}}).then((patientFound)=>{
        if (patientFound) {
            RDV.create({
                title: title,
                Date: DateA,
                patientId: patientId
            
              }).then(rdv => {
                event.returnValue = rdv;
              });
        }
        else event.returnValue = 'error'

    })
  }

module.exports = {getRdvs,addRDV,getRdvsByPatient,getCurrentDayRdvs}