const {getList} = require('../controller/blogController')
const {SuccessModel, ErrorModel} = require('../model/resModel')
const handleBlogRouter = (req, res) => {
    //命中list路由
    if(req.method == 'GET' && req.path == '/api/blog/list') {
        const author = req.query.author || ''
        const keyword = req.query.keyword || ''
        const listData = getList(author, keyword)
        return new SuccessModel(listData)
    }
    //命中新增路由
    if(req.method == 'POST' && req.path == '/api/blog/new') {
        return {
            msg: '新增博客'
        }
    }
    //命中修改路由
    if(req.method == 'POST' && req.path == '/api/blog/modify') {
        return {
            msg: '修改博客'
        }
    }
    //命中删除路由
    if(req.method == 'POST' && req.path == '/api/blog/delete') {
        return {
            msg: '删除博客'
        }
    }
}

module.exports = handleBlogRouter