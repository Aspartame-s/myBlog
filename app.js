const serverHandle = (req, res) => {
    //设置返回格式
    res.setHeader('Content-type', 'application/json')
    const data = {
        name: 'jth',
        length: 18,
        env: process.env.NODE_ENV
    }
    res.end(JSON.stringify(data))
}

module.exports = serverHandle