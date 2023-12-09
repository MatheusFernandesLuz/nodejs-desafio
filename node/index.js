const express = require("express")
const mysql = require("mysql")

const app = express();
const port = 3000
const config = {
  host: 'db',
  user: 'root',
  password: 'root',
  database: 'nodedb'
};

app.get('/', (req, res) => {

  var connection = mysql.createConnection(config)
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