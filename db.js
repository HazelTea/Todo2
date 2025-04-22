import mysql from 'mysql2'

const args = {
    host: "localhost",
    user: "root",
    password: "2222",
}

const dbConnectArgs = {
    ...args,
    database: "db"
}

var mysqlCon = mysql.createConnection(args);

async function runSetup() {
  mysqlCon.connect(function(err) {
    if (err) throw err;
    console.log("Connected. Creating database.")
    mysqlCon.query("CREATE DATABASE db;",(err) => {
          if (err.errno == 1007) console.error("Database already exists!")
          var con = mysql.createConnection(dbConnectArgs)
          con.connect((err) => {
              if (err) throw err;
              console.log("Connected to the database. Creating the tasks table")
              con.query("CREATE TABLE tasks (id INT AUTO_INCREMENT PRIMARY KEY, title VARCHAR(255), description VARCHAR(255))",(err, result) => {
                  if (err.errno == 1050) console.error("Tasks Table already created!")
                  console.log("finished db setup.")
                  return true
              })
          })
      })
  });
}

const dbCon = mysql.createConnection(dbConnectArgs)

const dbFunctions = {
  setup() {
    console.log("Setting up!")
    runSetup()
  },

  getTasks(res) {
    dbCon.commit()
    dbCon.query("SELECT * FROM tasks", (err,result) => {
      console.log(result)
      res.json(result)
    })
  },

  getTask(res,id) {
    dbCon.query(`SELECT * FROM tasks WHERE (id = ${id}) `,(err,result) => {
      if (err) throw err
      res.json(result)
    })
  },

  createTask(res,title,desc) {
    dbCon.query(`INSERT INTO tasks (title, description) VALUES ('${title}', '${desc}')`,(err,result) => {
      if (err) return err
      this.getTasks(res)
    })
  },

  removeTaskById(res,id) {
    console.log(id)
    dbCon.query(`DELETE FROM tasks WHERE (id = ${id});`,(err,result) => {
      if (err) return err
      this.getTasks(res)
    })
  }
}

export default dbFunctions