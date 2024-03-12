const { getList, getDetail, newBlog, updateBlog, deleteBlog } = require('../controller/blogController')
const { SuccessModel, ErrorModel } = require('../model/resModel')
const handleBlogRouter = (req, res) => {
    const id = req.query.id || ''

    //命中list路由
    if (req.method == 'GET' && req.path == '/api/blog/list') {
        const author = req.query.author || ''
        const keyword = req.query.keyword || ''
        const result = getList(author, keyword)
        return result.then(listData => {
            return new SuccessModel(listData)
        })
        // const listData = getList(author, keyword)
        // return new SuccessModel(listData)
    }
    //命中detail路由
    if (req.method == 'GET' && req.path == '/api/blog/detail') {
        // const detailData = getDetail(id)
        // return new SuccessModel(detailData)
        const result = getDetail(id)
        return result.then(detailData => {
            return new SuccessModel(detailData)
        })
    }
    //命中新增路由
    if (req.method == 'POST' && req.path == '/api/blog/new') {
        // const data = newBlog(req.body)
        // return new SuccessModel(data)
        req.body.author = '张三' //假数据，待开发登陆时替换为真数据
        const result = newBlog(req.body)
        return result.then(data => {
            return new SuccessModel(data)
        })
    }
    //命中修改路由
    if (req.method == 'POST' && req.path == '/api/blog/update') {
        const result = updateBlog(id, req.body)
        //这里的id 是通过query传递的，但我觉得应该放在body 随着 blog内容一起传递
        // {
        //     id: xxx,
        //     title: xxx,
        //     content: xxx
        //     ....
        // }
        return result.then(data => {
            if (data) {
                return new SuccessModel()
            } else {
                return new ErrorModel('更新失败')
            }
        })
    }
    //命中删除路由
    if (req.method == 'POST' && req.path == '/api/blog/delete') {
        const author = '张三'
        const result = deleteBlog(id,author)
        return result.then(data => {
            if (data) {
                return new SuccessModel()
            } else {
                return new ErrorModel('删除失败')
            }
        })
        
    }
}

module.exports = handleBlogRouter