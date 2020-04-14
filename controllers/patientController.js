const { Patient } = require('../config')

function getPatients(event, arg) {
  Patient.findAll().then(patiens => {

    event.returnValue = patiens;
  }).catch((err) => console.log(err))

}

function addPatient(event, arg) {
  Nom = "adel"
  Prenom = "namani"
  DateOfBirth = Date.now()
  InfoMed = "glefj"
  Telephone = "094823"
  Patient.create({
    Nom: Nom,
    Prenom: Prenom,
    DateOfBirth: DateOfBirth,
    InfoMed: InfoMed,
    Telephone: Telephone
  }).then(patient => {
    event.returnValue = patient;
  });

}


module.exports = { getPatients, addPatient }