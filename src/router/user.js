const handleUserRouter = (req, res) => {
    if(req.method == 'POST' && req.path == '/api/user/login') {
        return {
            msg: '用户登录'
        }
    }
}

module.exports = handleUserRouter