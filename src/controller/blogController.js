const {exec} = require('../db/mysql')
//获取博客列表
const getList = (author, keyword) => {
    let sql = `select * from blogs where 1=1 `
    if(author) {
        sql += `and author='%${author}%' `
    }
    if(keyword) {
        sql += `and title like '%${keyword}%' `
    }
    sql += `order by createtime desc`

    return exec(sql)
}
//获取博客详情
const getDetail = (id) => {
    let sql = `select * from blogs where id='${id}'`
    return exec(sql).then(row => {
        return row[0]
    })
}
//新建博客
const newBlog = (blogData = {}) => {
    //blogData 是post接口的 body参数
    const {title, content, author} = blogData
    const createTime = Date.now()
    let sql = `insert into blogs (title, content, createtime, author) values ('${title}', '${content}', ${createTime}, '${author}')`
    return exec(sql).then(insertData => {
        return {
            id: insertData.insertId
        }
    })
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