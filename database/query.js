const mysql = require('mysql');

const connection = mysql.createConnection({
    host     : '10.67.71.7',
    user     : 'root',
    password : '98835Piggy98835!',
    database : 'inquirix'
  });
/**
 * @param data data is string. Put te name of all the data you want to get
 * @param userId userId is the id of the user your looking for
 * @description data format - 'variable variable variable'
 */

exports.getData = (data, userId) => {
    let search = data.split(" ");
    search.join(" ");
    let sql = `SELECT ${search} FROM users WHERE user_id = ${userId}`;
    connection.query(sql, function(err, results){
        if(err) throw err;
        console.log(results);
    })
}

exports.storeData = (vars, inputData) => {
    let store = data.split(" ");
    let columns = [];
    
}