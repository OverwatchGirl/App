const {RDV,Patient} = require('../config')
const {Op} = require ('sequelize')

function getRdvs(event, arg) {
    RDV.findAll({raw : true, include: [{
      model: Patient
    }]}).then(rdvs => {
      
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
  
    let startDate  = new Date()
    startDate = new Date(startDate.getFullYear(),startDate.getMonth(),startDate.getDate(),00,00,0,1)
    const endDate  = new Date(startDate.getFullYear(),startDate.getMonth(),startDate.getDate(),25,59,0,1)
    console.log(startDate,endDate)
    RDV.findAll({
      where: {
          date: {[Op.between]: [startDate, endDate], }
        },
        raw : true,
        include: [{
          model: Patient
        }]
    }).then(rdvs => {
         event.returnValue = rdvs
    }).catch((err) => console.log(err))
  }

  function addRDV(event, arg) {
    objet = "rdv3"
    DateA = new Date('2020-12-17T03:24:00');
    patientId = 1
    Patient.findOne({where: {id:patientId}}).then((patientFound)=>{
        if (patientFound) {
            RDV.create({
                Objet: objet,
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