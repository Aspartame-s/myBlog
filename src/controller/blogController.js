//获取博客列表
const getList = (author, keyword) => {
    return [
        {
            id: 1,
            title: '标题A',
            content: '内容A',
            createTime: '1705648303567',
            author: 'zhangsan'
        },
        {
            id: 2,
            title: '标题B',
            content: '内容B',
            createTime: '1705648801505',
            author: 'lisi'
        },
    ]
}
//获取博客详情
const getDetail = (id) => {
    return {
        id: 1,
        title: '标题A',
        content: '内容A',
        createTime: '1705648303567',
        author: 'zhangsan'
    }
}
//新建博客
const newBlog = (blogData = {}) => {
    //blogData 是post接口的 body参数
    return {
        id: 3
    }
}
//更新博客
const updateBlog = (id, blogData = {}) => {
    return true
}
//删除博客
const deleteBlog = (id) => {
    return true
}

module.exports = {
    getList,
    getDetail,
    newBlog,
    updateBlog,
    deleteBlog
}