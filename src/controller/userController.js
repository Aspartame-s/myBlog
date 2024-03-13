const {exec} = require('../db/mysql')
const loginCheck = (username, password) => {
    // if(username == 'zhangsan' && password == '123456') {
    //     return true
    // }
    // return false
    let sql = `select username, realname from users where username='${username}' and password='${password}'`
    return exec(sql).then(rows => {
        console.log(rows)
        return rows[0] || {}
    })
}

module.exports = {
    loginCheck
}