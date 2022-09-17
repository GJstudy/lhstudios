const express=require('express')
const app=express()
const port=9000
const response=require('./utils/Response.js')

// 处理跨域
const cors=require('cors')
app.use(cors({
  origin:"*"
}))

// 配置multer中间件
const multer=require('multer')
// 配置uuid不重复的变量名
const uuid=require('uuid')
const uploadTools=multer({
  storage:multer.diskStorage({//该存储方案将会把文件直接存入磁盘
    destination:(req,file,callback)=>{
      callback(null,'static')
    },
    filename:(req,file,callback)=>{
      // 通过file，获取原始文件名
      let name=file.originalname
      // 截取源文件的后缀
      let ext=name.substr(name.lastIndexOf('.'))
      // 生成一个随机文件名，调用callback返回即可
      let newName=uuid.v4()+ext
      callback(null,newName)
    }
  })
})

// 配置静态资源托管文件夹 static,这样可直接通过http://ip:port/文件名  访问static目录下的资源
app.use(express.static('static'))

app.post('/upload',uploadTools.single('file'),(req,resp)=>{
  // uploadTools.array('file')将会把file字段中传输的文件数据通过uploadTools接收并保存
  // multer中间件将会把文件信息存入：req.files
  let url="http://127.0.0.1:9000/"+req.file.filename
  console.log(req.file)
  resp.send(response.ok(url))
})

app.listen(port,()=>{
  console.log('上传文件服务已启动')
})