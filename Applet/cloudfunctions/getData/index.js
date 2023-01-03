// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

const db=cloud.database();

// 云函数入口函数
exports.main = async (event, context) => {
    var tab=event.tab;
    if(tab=='5A'||tab=='4A'||tab=='非45A')
    {
        return await
        db.collection("scenery")
        .where({
          level:tab,
        })
        .get()
    }
    else if(tab=='all')
    {
      let count=await db.collection("scenery").count();
      count=count.total;
      const batchTimes = Math.ceil(count/100)
      let tasks=[];
      for (let i = 0; i < batchTimes; i++) {
        const promise = db.collection("scenery").skip(i * 100).limit(100).get()
        tasks.push(promise)
      }
      return (await Promise.all(tasks)).reduce((acc, cur) => {
        return {
          data: acc.data.concat(cur.data),
        }
      })
    }
    else if(tab=='collection')
    {
      return await
        db.collection("collection")
        .where({
          username:event.username,
        })
        .get()
    }
    else if(tab=='history')
    {
      return await
        db.collection("history")
        .orderBy('createTime', 'desc')
        .where({
          username:event.username,
        })
        .get()
    }
    else if(tab=='input')
    {
      const _ = db.command
      return await
        db.collection("scenery")
        .where(
          // _.or([
            {//标题
              name: db.RegExp({ //使用正则查询，实现对搜索的模糊查询
                regexp: event.input,
                options: 'i', //大小写不区分
              }),
            },
          // ])
        )
          
        .get()
    }


}