// import mysql from "mysql2"

// const args = {
//     host: "localhost",
//     user: "root",
//     password: "2222",
// }

// const dbConnectArgs = {
//     ...args,
//     database: "db"
// }


// var dbCon = mysql.createConnection(args);

// dbCon.connect(function(err) {
//   if (err) throw err;
//   console.log("Connected. Creating database.")
//   dbCon.query("CREATE DATABASE db;",(err) => {
//         if (err.errno == 1007) console.error("Database already exists!")
//         var con = mysql.createConnection(dbConnectArgs)
//         con.connect((err) => {
//             if (err) throw err;
//             console.log("Connected to the database. Creating the tasks table")
//             con.query("CREATE TABLE tasks (id INT AUTO_INCREMENT PRIMARY KEY, title VARCHAR(255), description VARCHAR(255))",(err, result) => {
//                 if (err.errno == 1050) console.error("Tasks Table already created!")
//                 console.log("finished db setup.")
//             })
//         })
//     })
// });

// const dbFuncs = {
//     test: async () => {
//         const connection = mysql.createConnection(dbConnectArgs)
//         connection.connect(() => console.log("BRRR!"))
//     }
// }

// export default dbFuncs


import mysql from 'mysql2'
import express from 'express'
import cors from 'cors'
const app = express()

app.use(express.json())
app.use(cors())

app.get('/', (req, res) => {
  res.json('hello worldaaa')
})

app.listen(3000,() => {
    console.log(`Server is listening on port: 3000`)
})