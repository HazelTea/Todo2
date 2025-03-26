var mysql = require('mysql2');

const args = {
    host: "localhost",
    user: "root",
    password: "2222",
}

const dbConnectArgs = {
    ...args,
    database: "db"
}


var dbCon = mysql.createConnection(args);

dbCon.connect(function(err) {
  if (err) throw err;
  console.log("Connected.")
  dbCon.query("CREATE DATABASE db;",(err) => {
        if (err.errno == 1007) console.error("Database already exists!")
        var con = mysql.createConnection(dbConnectArgs)
        con.connect((err) => {
            if (err) throw err;
            con.query("SELECT * FROM tasks", (err,result,fields) => {
                if (err) throw err;
                console.log(result)
            })
        })
    })
});