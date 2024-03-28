const { login } = require('../controller/userController')
const { SuccessModel, ErrorModel } = require('../model/resModel')
const {set} = require('../db/redis')

const handleUserRouter = (req, res) => {
    if (req.method == 'POST' && req.path == '/api/user/login') {
        const { username, password } = req.body
        // const { username, password } = req.query
        const result = login(username, password)
        return result.then(data => {
            if (data.username) {
                console.log('req.session', req.session)
                req.session.username = data.username
                req.session.realname = data.realname
                set(req.sessionId, req.session)
                return new SuccessModel()
            }
            return new ErrorModel('登录失败，请检查用户名和密码')
        })
    }

    // if (req.method == 'GET' && req.path == '/api/user/login-test') {
    //     if (req.session.username) {
    //         return Promise.resolve(new SuccessModel({
    //             session: req.session
    //         }))
    //     }
    //     return Promise.resolve(new ErrorModel('尚未登录'))
    // }
}

module.exports = handleUserRouter