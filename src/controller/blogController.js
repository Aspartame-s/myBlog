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

const getDetail = (id) => {
    return {
        id: 1,
        title: '标题A',
        content: '内容A',
        createTime: '1705648303567',
        author: 'zhangsan'
    }
}

module.exports = {
    getList,
    getDetail
}