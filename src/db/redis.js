const redis = require('redis')
const { REDIS_CONFIG } = require('../config/db')

//创建客户端
const redisClient = redis.createClient(REDIS_CONFIG.port, REDIS_CONFIG.host);

//建立连接
(async function () {
    await redisClient.connect().then(() => console.log('redis connect success!')).catch(console.error)
})()

//set
async function set(key, val) {
    let objVal
    if (typeof val === 'object') {
        objVal = JSON.stringify(val)
    } else {
        objVal = val
    }
    await redisClient.set(key, objVal)
}

//get
async function get(key) {
    try {
        let val = await redisClient.get(key)

        if (val == null) return val

        try {
            val = JSON.parse(val)
        } catch (err) { }

        return val
    } catch (err) {
        throw (err)
    }
}

module.exports = {
    get, set
}