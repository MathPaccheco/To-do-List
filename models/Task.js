 const { DataTypes} = require ("sequelize");
 const sequelize = require ("../config/database");

 const Task = sequelize.define("Task", {
    tittle: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    description: {
        type: DataTypes.TEXT,
        allowNull: true,
    },
    status: {
        type: DataTypes.STRING,
        defaultValue : "pendente",
    },
 });

 module.exports = Task;