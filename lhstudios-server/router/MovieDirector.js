/**定义电影演员的相关接口*/

const express=require('express')
// 通过router对象定义接口来实现业务
const router=express.Router()
// 引入joi模块
const Joi=require('joi')
const response=require('../utils/Response.js')

// 引入mysql连接池
const pool=require('../utils/db.js')

/**
 * 查询所有演员接口
 * @param
 * page：1 当前页码
 * pagesize：10  每页条目数
 * @return：
 * {code:200,msg:'ok',data:[{演员obj}]
 */
 router.get('/movie-directors',(req,resp)=>{
  // 获取请求参数
  let {page,pagesize}=req.query
  // TODO 服务器端表单验证  如果验证通过那么继续后续业务  如果验证不通过，则直接返回参数异常
  let schema=Joi.object({
    page:Joi.number().required(),//page必须是数字，必填
    pagesize:Joi.number().integer().max(100).required()//pagesize必须是不大于100的数字，必填
  })
  let {error,value}=schema.validate(req.query)
  if(error){
    resp.send(response.error(400,error))
    return;//结束
  }
  // 查询数据库 movie_director
  let startIndex=(page-1)*10
  let size=parseInt(pagesize)
  let sql="select * from movie_director limit ?,?"
  pool.query(sql,[startIndex,size],(error,result)=>{
    if(error){
      resp.send(response.error(500,error))
      throw error;
    }
    // 将结果封装，返回给客户端
    resp.send(response.ok(result))
  })
})

/**
 * 添加演员接口
 * @param:
 * directorName:演员名字
 * directorAvatar:演员头像路径
 * @returns：
 * {code：200，msg：‘ok’}
 */
router.post('/movie-director/add',(req,resp)=>{
  let {directorName,directorAvatar}=req.body //post请求在req.body
  // 表单验证
  let schema=Joi.object({
    directorName:Joi.string().required(),//必填
    directorAvatar:Joi.string().required() //必填
  })
  let {error,value}=schema.validate(req.body)
  if(error){
    resp.send(response.error(400,error))
    return;
  }
  // 表单验证通过，执行添加操作
  let sql='insert into movie_director (director_name,director_avatar) values (?,?)'
  pool.query(sql,[directorName,directorAvatar],(error,result)=>{
    if(error){
      resp.send(response.error(500,error))
      throw error;
    }
    // 将结果封装，返回给客户端
    resp.send(response.ok())
  })
})

/**
 * 删除演员接口
 * @params
 * id  演员id
 * @return
 * {code：200，msg:'ok'}
 */
router.post('/movie-director/del',(req,resp)=>{
  let {id}=req.body
  // 表单验证
  let schema=Joi.object({
    id:Joi.string().required(),//必填
  })
  let {error,value}=schema.validate(req.body)
  if(error){
    resp.send(response.error(400,error))
    return;
  }
  // 执行删除业务
  let sql='delete from movie_director where id=?'
  pool.query(sql,[id],(error,result)=>{
    if(error){
      resp.send(response.error(500,error))
      throw error;
    }
    // 将结果封装，返回给客户端
    resp.send(response.ok())
  })
})

/**
 * 姓名模糊查询演员
 * @params
 * name 演员姓名关键字
 * @return
 * {code:200,msg:'ok',data}
 */
router.post('/movie-directors/name',(req,resp)=>{
  let {name}=req.body
  // 表单验证
  let schema=Joi.object({
    name:Joi.string().required(),//必填
  })
  let {error,value}=schema.validate(req.body)
  if(error){
    resp.send(response.error(400,error))
    return;
  }
  // 执行模糊查询
  let sql='select * from movie_director where director_name like ?'
  pool.query(sql,[`%${name}%`],(error,result)=>{
    if(error){
      resp.send(response.error(500,error))
      throw error;
    }
    // 将结果封装，返回给客户端
    resp.send(response.ok(result))
  })

})

// 将router对象导出
module.exports=router