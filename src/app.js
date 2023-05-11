const express = require("express")
require("dotenv").config()
const db = require("./utils/database")
const TODOS = require("./models/todos.models")

const app = express()

app.set("view engine", "ejs")
app.use(express.static("public"), express.json())

db.authenticate()
    .then(()=>console.log("Base de datos Conectada"))
    .catch(error=>console.error(error))

db.sync()
    .then(()=>console.log("Base de datos sincronizada"))
    .catch((error)=>console.error(error))

const PORT = process.env.PORT || 3000;

app.get("/", (req, res)=>{
    res.render("index")
})

app.get("/api/v1/todos", async (req, res)=>{
    try{
       const todos = await TODOS.findAll({
        attributes: {
            exclude: ["createdAt","updatedAt"]
        }
       });
       res.json(todos)
    } catch (error) {
        res.status(400).json(err)
    }
})

app.get("/api/v1/todos/:id", async (req, res)=>{
    try{
        const {id} = req.params;
        const todo = await TODOS.findByPk(id, {
            attributes: {
                exclude: ["createdAt","updatedAt"]
            }
        })
        res.json(todo)
    } catch (error) {
        res.status(400).json(err)
    }
})

app.post("/api/v1/todos", async (req, res)=>{
    try{
        const newTodo = req.body;
        await TODOS.create(newTodo);
        res.status(201).send()
    } catch (error) {
        res.status(400).json(err)
    }
})

app.put("/api/v1/todos/:id", async (req, res)=>{
    try{
        const {id} = req.params;
        const {title, description, completed} = req.body;
        await TODOS.update(
            {title, description, completed},
            {
                where: {id}
            }
        );
        res.status(204).send();
    } catch (error) {
        res.status(400).json(err)
    }
})

app.delete("/api/v1/todos/:id", async (req, res)=>{
    try{
        const {id} = req.params;
        await TODOS.destroy({
            where: {id}
        })
        res.status(204).send()
    } catch (error) {
        res.status(400).json(error)
    }
})

app.listen(PORT, ()=>{
    console.log(`Servidor iniciado en el puerto ${PORT}`)
})