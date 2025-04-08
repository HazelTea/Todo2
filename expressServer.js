import express from 'express'
import cors from 'cors'
import path from "path"
import { fileURLToPath } from 'url'
import dbFunctions from './db.js'

const app = express()

dbFunctions.setup()
app.use(express.json())
app.use(cors())

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.get('/', (req, res) => {
  res.sendFile(`${__dirname}/index.html`)
})

app.get('/tasks', (req,res) => {
    dbFunctions.getTasks(res)
})

app.post('/tasks',(req,res) => {
    const title = req.query.title
    const desc = req.query.description
    dbFunctions.createTask(res,title,desc)
})

app.delete('/tasks',(req,res) => {
    const id = req.query.id
    dbFunctions.removeTaskById(res,id)
})

app.listen(3000,() => {
    console.log(`Server is listening on port: 3000`)
})