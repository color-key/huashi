const mysql = require("mysql");

const query = (sql, args) => {
  const connection = mysql.createConnection({
    host: "121.36.218.101",
    port: "3306",
    user: "root",
    password:"Mysql@8848",
    database: "huashi",
  })
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

module.exports = {
  query
}