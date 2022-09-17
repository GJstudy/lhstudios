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
 * 添加影院接口
 * @param:
 * cinema_name/address/province/city/district/longitude/latitude/tags
 * @returns：
 * {code：200，msg：‘ok’}
 */
router.post('/cinema/add',(req,resp)=>{
  let {cinema_name,address,province,city,district,longitude,latitude,tags}=req.body //post请求在req.body
  // 表单验证
  let schema=Joi.object({
    cinema_name:Joi.string().required(),//必填
    address:Joi.string().required(), //必填
    province:Joi.string().required(), //必填
    city:Joi.string().required(), //必填
    district:Joi.string().required(), //必填
    longitude:Joi.number().required(), //必填
    latitude:Joi.number().required(), //必填
    tags:Joi.string().required(), //必填
  })
  let {error,value}=schema.validate(req.body)
  if(error){
    resp.send(response.error(400,error))
    return;
  }
  // 表单验证通过，执行添加操作
  let sql=`insert into movie_cinema (cinema_name,address,province,city,district,longitude,latitude,tags) values (?,?,?,?,?,?,?,?)`
  pool.query(sql,[cinema_name,address,province,city,district,longitude,latitude,tags],(error,result)=>{
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
router.get('/cinema/tags',(req,resp)=>{
  let sql='select * from movie_cinema_tag'
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
 * 查询所有影院
 * @return
 */
router.get('/cinemas',(req,resp)=>{
  let sql='select * from movie_cinema'
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
 * 删除影院接口
 * @params
 * id  影院id
 * @return
 * {code：200，msg:'ok'}
 */
 router.post('/cinema/del',(req,resp)=>{
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
  let sql='delete from movie_cinema where id=?'
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
 * 通过id查询影院
 * @param：
 * id:电影id
 * @return
 * {code:200,msg:'ok',data:{}}
 */
 router.get('/cinema/query',(req,resp)=>{
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
  let sql='select * from movie_cinema where id=?'
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

/**
 * 修改影院接口
 * @param:
 * id/cinema_name/address/province/city/district/longitude/latitude/tags
 * @returns：
 * {code：200，msg：‘ok’}
 */
 router.post('/cinema/update',(req,resp)=>{
  let {id,cinema_name,address,province,city,district,longitude,latitude,tags}=req.body //post请求在req.body
  // 表单验证
  let schema=Joi.object({
    id:Joi.string().required(),//必填
    cinema_name:Joi.string().required(),//必填
    address:Joi.string().required(), //必填
    province:Joi.string().required(), //必填
    city:Joi.string().required(), //必填
    district:Joi.string().required(), //必填
    longitude:Joi.number().required(), //必填
    latitude:Joi.number().required(), //必填
    tags:Joi.string().required(), //必填
  })
  let {error,value}=schema.validate(req.body)
  if(error){
    resp.send(response.error(400,error))
    return;
  }
  // 表单验证通过，执行添加操作
  let sql=`update movie_cinema set cinema_name=?,address=?,province=?,city=?,district=?,longitude=?,latitude=?,tags=? where id=?`
  pool.query(sql,[cinema_name,address,province,city,district,longitude,latitude,tags,id],(error,result)=>{
    if(error){
      resp.send(response.error(500,error))
      throw error;
    }
    // 将结果封装，返回给客户端
    resp.send(response.ok())
  })
})


// 将router对象导出
module.exports=router