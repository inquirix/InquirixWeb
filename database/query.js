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

/**
 * @param data Place the variables_names you want to input here | name | password | email | bio | interest | state | city | sex | join_date | session_id | socket_id | user_id |
 * @type string
 * @example "data param input : 'name password email' "
 * @param inputData Place the desired values in corrisponding order to what you put into data
 * @example "inputData param input : 'Jeremy 123456! dude@example.com' "
 * @param table The that you want to add the data to
 * 
 * @description This function will access information in the databas and input it
 */

exports.storeData = (data, inputData, table) => {
    let store = data.split(" ");
    let inputDataArr = inputData.split(" ");
    let columns = [];
    let columnsStr = "";
    let dataarr = [];
    let inputDataStr = "";

    for(let vars of store){
        if(vars == store[store.length - 1]){
            columns.push(`${vars}`)
        }else{
            columns.push(`${vars},`)
        }
    }

    columns[0] = "(" + columns[0];
    columns[columns.length - 1] += ")"

    for(let column of columns){
        columnsStr += column + " ";
    }

    for(let data of inputDataArr){
        if(data == inputDataArr[inputDataArr.length - 1]){
            dataarr.push(`${data}`);
        }else{
            dataarr.push(`${data},`);
        }
    }

    dataarr[0] = "(" + inputDataArr[0];
    dataarr[inputDataArr.length - 1] += ")";
    
    for(let data of dataarr){
        inputDataStr += data + " ";
    }

    let sql = `INSERT INTO ${table} ${columnsStr}VALUES ${inputDataStr} `
    console.log(sql);

    connection.query(sql, function(err, results){
        if(err) throw err;
        console.log(results);
    })
}