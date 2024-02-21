const {loginCheck} = require('../controller/userController')
const { SuccessModel, ErrorModel } = require('../model/resModel')

const handleUserRouter = (req, res) => {
    if(req.method == 'POST' && req.path == '/api/user/login') {
        const {username, password} = req.body
        const result = loginCheck(username, password)
        if(result) {
            return new SuccessModel()
        }else {
            return new ErrorModel('登录失败，请检查用户名和密码')
        }
    }
}

module.exports = handleUserRouter