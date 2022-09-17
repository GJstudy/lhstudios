const joi=require('joi')
const schema=joi.object({
  username:joi.string().min(3).max(30),
  pagesize:joi.number().integer().min(10).max(100)
})
const {error,value}=schema.validate({username:'zss',pagesize:'12'})
console.log(error);
console.log(value); // { username: 'zss', pagesize: 12 }