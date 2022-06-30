const { db, DataTypes } = require('../utils/db.util')

//Create model

const Task = db.define('task', {
    id: {
        primaryKey: true,
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
    },
    userId: {
        type: DataTypes.INTEGER,
        allowNull:false,
    },
    title:{
        type: DataTypes.STRING,
        allowNull: false,
    },
    startDate:{
        type: DataTypes.DATE,
        allowNull: false,                
    },
    limitDate:{
        type: DataTypes.DATE,
        allowNull: false,
    },
    finishDate:{
        type: DataTypes.DATE,   
        allowNull: true,
        defaultValue:"01-01-0001"               
    },
    status:{
        type: DataTypes.STRING,
        defaultValue: 'active',
        allowNull: false,
    },
});

module.exports = { Task }