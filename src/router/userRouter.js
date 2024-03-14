const { login } = require('../controller/userController')
const { SuccessModel, ErrorModel } = require('../model/resModel')

const handleUserRouter = (req, res) => {
    if (req.method == 'GET' && req.path == '/api/user/login') {
        // const { username, password } = req.body
        const { username, password } = req.query
        const result = login(username, password)
        return result.then(data => {
            if (data.username) {
                res.setHeader('Set-Cookie', `username=${username}; path=/; httpOnly`)
                return new SuccessModel()
            }
            return new ErrorModel('登录失败，请检查用户名和密码')
        })
    }

    if(req.method == 'GET' && req.path == '/api/user/login-test') {
        if(req.cookie.username) {
            return Promise.resolve(new SuccessModel({
                username: req.cookie.username
            }))
        }
        return Promise.resolve(new ErrorModel('尚未登录'))
    }
}

module.exports = handleUserRouter