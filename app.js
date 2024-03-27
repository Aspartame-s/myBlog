const { resolve } = require('path')
const querystring = require('querystring')
const handleBlogRouter = require('./src/router/blogRouter')
const handleUserRouter = require('./src/router/userRouter')
const {set, get} = require('./src/db/redis')

const SESSION_DATA = {}

//设置cookie到期时间
const getCookieExpires = () => {
    const d = new Date()
    d.setTime(d.getTime() + (24 * 60 * 60 * 1000))
    return d.toGMTString()
}

//处理post data
const getPostData = (req) => {
    const promise = new Promise((resolve, reject) => {
        if (req.method !== 'POST') {
            resolve({})
            return
        }
        if (req.headers['content-type'] !== 'application/json') {
            resolve({})
            return
        }
        let postData = ''
        req.on('data', chunk => {
            postData += chunk.toString()
        })
        req.on('end', () => {
            if (!postData) {
                resolve({})
                return
            }
            resolve(
                JSON.parse(postData)
            )
        })
    })
    return promise
}

const serverHandle = (req, res) => {
    //设置返回格式
    res.setHeader('Content-type', 'application/json')
    const url = req.url
    //处理path
    req.path = url.split('?')[0]
    //解析query
    req.query = querystring.parse(url.split('?')[1])

    //解析cookie
    req.cookie = {}
    const cookieStr = req.headers.cookie || ''
    cookieStr.split(';').forEach(item => {
        if (!item) {
            return
        }
        const arr = item.split('=')
        const key = arr[0].trim()
        const val = arr[1].trim()
        req.cookie[key] = val
    })

    //解析session
    // let userId = req.cookie.userid
    // let needSetCookie = false
    // if (userId) {
    //     if (!SESSION_DATA[userId]) {
    //         SESSION_DATA[userId] = {}
    //     }
    // } else {
    //     needSetCookie = true
    //     userId = `${Date.now()}_${Math.random()}`
    //     SESSION_DATA[userId] = {}
    // }
    // req.session = SESSION_DATA[userId]
    let needSetCookie = false
    let userId = req.cookie.userid
    if (!userId) {
        needSetCookie = true
        userId = `${Date.now()}_${Math.random()}`
        //初始化 redis 中session 的值
        set(userId, {})
    }

    //获取redis中session的值
    req.sessionId = userId
    get(req.sessionId).then(sessionData => {
        if (sessionData == null) {
            //初始化 redis 中session 的值
            set(req.sessionId, {})
            req.session = {}
        } else {
            req.session = sessionData
        }
        return getPostData(req)
    })
        //处理 post data
        .then(postData => {
            console.log(needSetCookie)
            req.body = postData
            //处理blog路由
            // const blogData = handleBlogRouter(req, res)
            // if (blogData) {
            //     res.end(JSON.stringify(blogData))
            //     return
            // }
            const blogResult = handleBlogRouter(req, res)
            if (blogResult) {
                blogResult.then(blogData => {
                    if (needSetCookie) {
                        res.setHeader('Set-Cookie', `userid=${userId}; path=/; httpOnly; expires=${getCookieExpires()}`)
                    }
                    res.end(JSON.stringify(blogData))
                })
                return
            }
            //处理user路由
            const userResult = handleUserRouter(req, res)
            if (userResult) {
                userResult.then(userData => {
                    if (needSetCookie) {
                        res.setHeader('Set-Cookie', `userid=${userId}; path=/; httpOnly; expires=${getCookieExpires()}`)
                    }
                    res.end(JSON.stringify(userData))
                })
                return
            }
            //404
            res.writeHead(404, { 'Content-type': 'text/plain' })
            res.write('404 not found\n')
            res.end()
        })

}

module.exports = serverHandle