const { Sequelize, DataTypes } = require('sequelize');
const PatientModel = require('./models/Patient')
const RDVModel = require('./models/RDV')

const db = new Sequelize({
    dialect: 'sqlite',
    storage: './db/mydb.sqlite'
});
db
    .authenticate()
    .then(() => {
        console.log('Connection has been established successfully.');
    })
    .catch(err => {
        console.error('Unable to connect to the database:', err);
    });

const Patient = PatientModel(db, DataTypes)
const RDV = RDVModel(db, DataTypes)

RDV.belongsTo(Patient)
Patient.hasMany(RDV)

db.sync({ force: false })
  .then(() => {
    console.log(`Database & tables created!`)
  })


module.exports = {Patient,RDV};