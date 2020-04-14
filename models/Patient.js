const {DataTypes} = require('sequelize');
const {db} = require('./../config') 
'use strict';
module.exports = (db, DataTypes) => {
    const Patient = db.define('patient', {
        // attributes
        Nom: {
            type: DataTypes.STRING,
        },
        Prenom: {
            type: DataTypes.STRING 
        },
        DateOfBirth: {
            type: DataTypes.DATE
        },
        InfoMed: {
            type: DataTypes.STRING
        },
        Telephone: {
            type: DataTypes.STRING
        },
    },
    {
        sequelize : db,
        modelName: 'patients'
        // options
});
 
  return Patient;
};

