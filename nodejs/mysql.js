const mysql = require("mysql");

const baseOptions = {
  host: "121.36.218.101",
  port: "3306",
  user: "root",
  password:"Mysql@8848",
  database: "huashi",
}

const query = (sql, args) => {
  const connection = mysql.createConnection(baseOptions);
  connection.connect();
  return new Promise((resolve) => {
    try {
      connection.query(sql, args, (err, result) => {
        resolve({success: err ? false : true, result, err});
        connection.end();
      });
    } catch (error) {
      resolve({success: false, result: undefined, error});
      connection.end();
    }
  })
}

const multipleQuery = (sql) => {
  const connection = mysql.createConnection({
    ...baseOptions,
    multipleStatements: true
  })
  connection.connect();
  return new Promise((resolve) => {
    try {
      connection.query(sql, (err, results, fields) => {
        console.info('sql:', sql);
        console.info('query:', results);
        resolve({success: err ? false : true, results, err});
        connection.end();
      });
    } catch (error) {
      resolve({success: false, results: undefined, error});
      connection.end();
    }
  })
}

module.exports = {
  query,
  multipleQuery
}