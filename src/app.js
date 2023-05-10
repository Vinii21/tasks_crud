const express = require("express")
require("dotenv").config()
const db = require("./utils/database")
const TODOS = require("./models/todos.models")

const app = express()

db.authenticate()
    .then(()=>console.log("Base de datos Conectada"))
    .catch(error=>console.error(error))

db.sync()
    .then(()=>console.log("Base de datos sincronizada"))
    .catch((error)=>console.error(error))

const PORT = process.env.PORT || 3000;

app.get("/", (req, res)=>{
    res.send("Servidor iniciado")
})

app.listen(PORT, ()=>{
    console.log(`Servidor iniciado en el puerto ${PORT}`)
})