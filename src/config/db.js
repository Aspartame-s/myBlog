const env = process.env.NODE_ENV; //获取环境变量

let MYSQL_CONFIG

if(env == 'dev') {
    MYSQL_CONFIG = {
        host: 'localhost',
        user: 'root',
        password: 'password',
        port: '3306',
        database: 'Blog'
    }
}

if(env == 'production') {
    MYSQL_CONFIG = {
        host: 'localhost',
        user: 'root',
        password: 'password',
        port: '3306',
        database: 'Blog'
    }
}

module.exports = {
    MYSQL_CONFIG
}