const querystring = require('querystring')
const handleBlogRouter = require('./src/router/blogRouter')
const handleserRouter = require('./src/router/userRouter')
const serverHandle = (req, res) => {
    //设置返回格式
    res.setHeader('Content-type', 'application/json')
    const url = req.url
    //处理path
    req.path = url.split('?')[0]
    //处理query
    req.query = querystring.parse(url.split('?')[1])
    //处理blog路由
    const blogData = handleBlogRouter(req, res)
    if (blogData) {
        res.end(JSON.stringify(blogData))
        return
    }
    //处理user路由
    const userData = handleserRouter(req, res)
    if (userData) {
        res.end(JSON.stringify(userData))
        return
    }
    //404
    res.writeHead(404, { 'Content-type': 'text/plain' })
    res.write('404 not found\n')
    res.end()
}

module.exports = serverHandle