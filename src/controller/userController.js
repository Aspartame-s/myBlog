const {exec, escape} = require('../db/mysql')
const login = (username, password) => {
    // if(username == 'zhangsan' && password == '123456') {
    //     return true
    // }
    // return false
    username = escape(username)
    password = escape(password)
    let sql = `select username, realname from users where username=${username} and password=${password}`
    console.log(sql)
    return exec(sql).then(rows => {
        return rows[0] || {}
    })
}

module.exports = {
    login
}