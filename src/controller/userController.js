const {exec} = require('../db/mysql')
const login = (username, password) => {
    // if(username == 'zhangsan' && password == '123456') {
    //     return true
    // }
    // return false
    let sql = `select username, realname from users where username='${username}' and password='${password}'`
    return exec(sql).then(rows => {
        return rows[0] || {}
    })
}

module.exports = {
    login
}