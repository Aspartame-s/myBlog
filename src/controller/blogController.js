const {exec, escape} = require('../db/mysql')
const xss = require('xss')
//获取博客列表
const getList = (author, keyword) => {
    console.log(author)
    author = escape(author)
    // keyword = escape(keyword)
    let sql = `select * from blogs where 1=1 `
    if(author) {
        sql += `and author=${author} `
    }
    if(keyword) {
        sql += `and title like '%${keyword}%' `
    }
    sql += `order by createtime desc`
    console.log(sql)
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
    let {title, content, author} = blogData
    const createTime = Date.now()
    title = xss(escape(title))
    console.log(title)
    content = xss(escape(content))
    author = escape(author)
    let sql = `insert into blogs (title, content, createtime, author) values (${title}, ${content}, ${createTime}, ${author})`
    return exec(sql).then(insertData => {
        return {
            id: insertData.insertId
        }
    })
}
//更新博客
const updateBlog = (id, blogData = {}) => {
    // return true
    const {title, content} = blogData
    title = escape(title)
    content = escape(content)
    let sql = `update blogs set title=${title}, content=${content} where id='${id}'`
    return exec(sql).then(updateData => {
        if(updateData.affectedRows > 0) {
            return true
        }
        return false
    })
}
//删除博客
const deleteBlog = (id, author) => {
    let sql = `delete from blogs where id='${id}' and author='${author}'`
    console.log(sql)
    return exec(sql).then(deleteData => {
        if(deleteData.affectedRows > 0) {
            return true
        }
        return false
    })
}

module.exports = {
    getList,
    getDetail,
    newBlog,
    updateBlog,
    deleteBlog
}