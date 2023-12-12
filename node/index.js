import express from "express";
import { createConnection } from "mysql";

const app = express();
const port = 3000

const config = {
  host: 'db',
  user: 'root',
  password: 'root',
  database: 'nodedb'
};

const connection = createConnection(config)

var sql = "CREATE DATABASE IF NOT EXISTS nodedb;"
connection.query(sql)

sql = `
  CREATE TABLE IF NOT EXISTS people (
    Id int AUTO_INCREMENT,
    Name varchar(255) NOT NULL,
    PRIMARY KEY (ID)
  );
`

connection.query(sql)

app.get('/', (req, res) => {
  var sql = `INSERT INTO people(name) values("Matheus")`
  connection.query(sql);

  sql = `SELECT name FROM nodedb.people;`
  connection.query(sql, (err, result, fields) => {

    if (err) throw error;

    const names = result.reduce(
      (accumulator, currentValue) => accumulator
        + currentValue.name + '\n', '');

    res.send('<h1>Full Cycle Rocks!</h1>' +
      '<h4>Nomes cadastrados:</h4>' + names)
  })
});

app.listen(port, () => {
  console.log(`Ouvindo na porta: ${port}`)
})