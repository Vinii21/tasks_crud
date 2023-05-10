const db = require("../utils/database")
const {DataTypes} = require("sequelize")

const TODOS = db.define("todos", {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    title: {
        type: DataTypes.STRING(60),
        allowNull: false
    },
    description: {
        type: DataTypes.STRING(280),
        allowNull: false
    },
    completed: {
        type: DataTypes.BOOLEAN,
        allowNull: false
    }
})

module.exports = TODOS;