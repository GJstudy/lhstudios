/**定义影院的相关接口*/

const express=require('express')
// 通过router对象定义接口来实现业务
const router=express.Router()
// 引入joi模块
const Joi=require('joi')
const response=require('../utils/Response.js')

// 引入mysql连接池
const pool=require('../utils/db.js')


/**
 * 添加放映厅接口
 * @param:
 * 
 * @returns：
 * {code：200，msg：‘ok’}
 */
router.post('/cinema-room/add',(req,resp)=>{
  let {movie_cinema_id,room_name,room_type}=req.body //post请求在req.body
  // 表单验证
  let schema=Joi.object({
    movie_cinema_id:Joi.string().required(),//必填
    room_name:Joi.string().required(), //必填
    room_type:Joi.string().required(), //必填
  })
  let {error,value}=schema.validate(req.body)
  if(error){
    resp.send(response.error(400,error))
    return;
  }
  // 表单验证通过，执行添加操作
  let sql=`insert into movie_cinema_room (movie_cinema_id,room_name,room_type) values (?,?,?)`
  pool.query(sql,[movie_cinema_id,room_name,room_type],(error,result)=>{
    if(error){
      resp.send(response.error(500,error))
      throw error;
    }
    // 将结果封装，返回给客户端
    resp.send(response.ok())
  })
})

/**
 * 查询所有电影院的标签
 */
router.get('/cinema-room/types',(req,resp)=>{
  let sql='select * from movie_cinema_room_type'
  pool.query(sql,(error,result)=>{
    if(error){
      resp.send(response.error(500,error))
      throw error;
    }
    // 将结果封装，返回给客户端
    resp.send(response.ok(result))
  })
})

/**
 * 查询当前电影院的所有放映厅
 * @return
 */
router.get('/cinema-rooms/cinemaid',(req,resp)=>{
  let {cinema_id}=req.query
   // 表单验证
   let schema=Joi.object({
    cinema_id:Joi.string().required(),//必填
  })
  let {error,value}=schema.validate(req.query)
  if(error){
    resp.send(response.error(400,error))
    return;
  }
  let sql='select * from movie_cinema_room where movie_cinema_id=?'
  pool.query(sql,[cinema_id],(error,result)=>{
    if(error){
      resp.send(response.error(500,error))
      throw error;
    }
    // 将结果封装，返回给客户端
    resp.send(response.ok(result))
  })
})

/**
 * 删除影院接口
 * @params
 * id  影院id
 * @return
 * {code：200，msg:'ok'}
 */
 router.post('/cinema-room/del',(req,resp)=>{
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
  let sql='delete from movie_cinema_room where id=?'
  pool.query(sql,[id],(error,result)=>{
    if(error){
      resp.send(response.error(500,error))
      throw error;
    }
    // 将结果封装，返回给客户端
    resp.send(response.ok())
  })
})

router.post('/cinema-room/edit-seat-template',(req,resp)=>{
  let {id,seat_template,room_size}=req.body //post请求在req.body
  // 表单验证
  let schema=Joi.object({
    id:Joi.string().required(),//必填
    seat_template:Joi.string().required(), //必填
    room_size:Joi.string().required(), //必填
  })
  let {error,value}=schema.validate(req.body)
  if(error){
    resp.send(response.error(400,error))
    return;
  }

  // 执行sql任务
  let sql='update movie_cinema_room set seat_template=?,room_size=? where id=?'
  pool.query(sql,[seat_template,room_size,id],(error,result)=>{
    if(error){
      resp.send(response.error(500,error))
      throw error;
    }
    // 将结果封装，返回给客户端
    resp.send(response.ok())
  })
})

/**
 * 通过id查询放映厅
 * @param：
 * id:放映厅id
 * @return
 * {code:200,msg:'ok',data:{}}
 */
 router.get('/cinema-room/query',(req,resp)=>{
  let {id}=req.query
  // 表单验证
  let schema=Joi.object({
    id:Joi.string().required(),//必填
  })
  let {error,value}=schema.validate(req.query)
  if(error){
    resp.send(response.error(400,error))
    return;
  }

  // 执行查询业务
  let sql=`select 
    mcr.room_name cinema_room_name,
    mcr.room_size cinema_room_size,
    mcr.movie_cinema_id cinema_id,
    mcr.room_type cinema_room_type,
    mc.cinema_name cinema_name
  from movie_cinema_room mcr join movie_cinema mc on mcr.movie_cinema_id=mc.id where mcr.id=?`
  pool.query(sql,[id],(error,result)=>{
    if(error){
      resp.send(response.error(500,error))
      throw error;
    }
    // 将结果封装，返回给客户端
    if(result && result.length==0){
      // 没查到
    resp.send(response.ok(null))
    }else{
      resp.send(response.ok(result[0]))
    }
  })
})


// 将router对象导出
module.exports=router