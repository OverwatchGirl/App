const {RDV,Patient} = require('../config')
const {Op} = require ('sequelize')

function getRdvs(event, arg) {
    RDV.findAll({raw : true, include: [{
      model: Patient
    }]}).then(rdvs => {
      
      event.returnValue =rdvs;
    }).catch((err)=>console.log(err))
    
  }
 
  // function getRdvsByPatient(event, arg) {
  //   patientId = 1
  //   RDV.findAll({where: {patientId:patientId}}).then(rdvs => {
      
  //     event.returnValue =rdvs;
  //   }).catch((err)=>console.log(err))
    
  // }

  function getCurrentDayRdvs(event, arg) {
  
    let startDate  = new Date()
    startDate = new Date(startDate.getFullYear(),startDate.getMonth(),startDate.getDate(),00,00,0,1)
    const endDate  = new Date(startDate.getFullYear(),startDate.getMonth(),startDate.getDate(),25,59,0,1)
    console.log(startDate,endDate)
    RDV.findAll({
      where: {
          Date: {[Op.between]: [startDate, endDate], }
        },
        raw : true,
        include: [{
          model: Patient
        }]
    }).then(rdvs => {
         event.returnValue = rdvs
    }).catch((err) => console.log(err))
  }

  
module.exports = {getRdvs,getCurrentDayRdvs}