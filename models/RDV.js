const {DataTypes} = require('sequelize');
const {db} = require('./../config') 
'use strict';
module.exports = (db, DataTypes) => {
    const RDV = db.define('rdv', {
        // attributes
        Objet: {
            type: DataTypes.STRING,
        },
        Date: {
            type: DataTypes.DATE
        },
    },
    {
        sequelize : db,
        modelName: 'rdvs'
        // options
});

  
  return RDV;
};
