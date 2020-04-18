const { Patient } = require('../config')



function getPatients(event, arg) {
  Patient.findAll({raw : true}).then(patients => {

    event.returnValue = patients;
  }).catch((err) => console.log(err))

}

function addPatient(event, arg) {
  
  Patient.create({
    Nom: arg[0],
    Prenom: [1],
    DateOfBirth: arg[2],
    InfoMed: arg[3],
    Telephone: arg[4]
  }).then(patient => {
    event.returnValue = patient;
  });

}


module.exports = { getPatients, addPatient }