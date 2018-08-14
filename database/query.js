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
 * @example getData("name email password", 567)
 * @returns  an array of data
 */

exports.getData = (data, userId) => {
    return new Promise((res, rej) => {
        let search = data.split(" ");
        let dataArr = [];
        search.join(" ");
        let sql = `SELECT ${search} FROM users WHERE user_id = ${userId}`;

        let queryDB = () => {
            return new Promise((res, rej) => {
                connection.query(sql, function(err, results){
                    if(err) throw err;
                    // console.log(results);
                    dataArr = Object.values(results[0]);
                    // console.log(dataArr);
                    res();
                })
            })
        }
        queryDB().then(() => {
            res(dataArr);
        })
    })
}

/**
 * @param data Place the variables_names you want to input here | name | password | email | bio | interest | state | city | sex | join_date | session_id | socket_id | user_id |
 * @type string
 * @param inputData Place the desired values in corrisponding order to what you put into data
 * @param table The that you want to add the data to
 * 
 * @description This function will access the database and input data into it
 * @example storeData('name email password user_id', "'Jeremy' 'jsbparson@gmail.com' '12345' 609", "users"))
 * @returns nothing
 */

exports.storeData = (data, inputData, table) => {
    return new Promise((res, rej) => {
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
        
        let queryDB = () => {
            return new Promise((res, rej) => {
                connection.query(sql, function(err, results){
                    if(err) throw err;
                    console.log(results);
                    res();
                })
            })
        }
        
        queryDB().then(() => {
            res(true)
        });
    })
    
}

/**
 * @param dataToChange Place the var names of the data you want to change here  | name | password | email | bio | interest | state | city | sex | join_date | session_id | socket_id | user_id | //Format: "data data data"
 * @param newData Corrosponding to the inputs of dataToChange, if the enwdata is a string use single qoutes inside double qoutes.
 * @param condition States a condition that restrains the amount of data teh query gets
 * @param table The table name
 * 
 * @example changeData("name email password", "'bob' 'bob@example.org' 'bobby123'","name = 'jeremy', 'users'")
 * @returns nothing
 */

exports.changeData = (dataToChange, newData, condition, table) => {
    return new Promise((res, rej) => {
        let varsArr = dataToChange.split(" ");
        let newerData = newData.split(" ");
        let varsStr = "";
        let i = 0;
    
        for(let vars of varsArr){
            if(vars == varsArr[varsArr.length - 1]){
                varsStr += `${vars} = ${newerData[i]}`
            }else{
                varsStr += `${vars} = ${newerData[i]}, `
            }
            i++;
        }
        
    let queryDB = () => {
        return new Promise((res, rej) => {
            let sql = `UPDATE ${table} SET ${varsStr} WHERE ${condition}`
            console.log(sql);
            connection.query(sql, function(err, results){
                if(err) throw err;
                console.log(results);
                res();
            })
        })
    }

    queryDB().then(() => {
        res(true);
    })
        
    })
    
}

/**
 * @param password Put the password of the user
 * @param name Put the name of the user
 * @description this will get the id of the user based off of there password and name
 * @example getId("'bobby213'", "'bob'")
 * @returns Id of user
 */

exports.getId = (password, name) => {
    return new Promise((res, rej) => {
        let search = "user_id";
        let sql = `SELECT ${search} FROM users WHERE name = ${name} AND password = ${password}`;
    
        console.log(sql);

        let queryDB = () => {
            return new Promise((res, rej) => {
                connection.query(sql, function(err, results){
                    if(err) throw err;
                    console.log(results);
                    res(results[0].user_id);
                })
            })
            
        }

        queryDB().then((data) => {
            res(data)
        })
        
    })
}


/**
 * @param password Put the password of the user
 * @param name Put the name of the user
 * @description This will check the user database to see if a user indeed does exist
 * @returns true or false
 */

exports.verifyUser = (password, name) => {
    return new Promise((res, req) => {
    let exists = false;
        
        let search = "user_id";
        
        let sql = `SELECT ${search} FROM users WHERE name = '${name}' AND password = '${password}'`;        
        
        let queryDB = () => {
            return new Promise((res, req) => {
                connection.query(sql, function(err, results){
                    if(err) throw err;
                    if(results[0] === undefined){
                        exists = false;
                    }else{
                        exists = true;
                    }
                    res();
            })
        })    
    }
        let returnData = () => {
                res(exists);
        }

        queryDB().then(returnData);
    })
}