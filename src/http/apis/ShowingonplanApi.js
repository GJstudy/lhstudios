import myAxios from '../MyAxios'
import BASEURL from '../BaseUrl'

const showingonplanApi={
  
  /**
   * 添加排片计划
   * @param {Object} params 
   */ 
   add(params){
    return myAxios.post(BASEURL+'/plan/add',params)  
  },
  /**
   * 通过roomid，查询放映厅列表
   */
  queryByRoomId(params){
    return myAxios.get(BASEURL+'/plans/roomid',params)
  },

  // 删除该排片计划
  delete(params){
    return myAxios.post(BASEURL+'/plan/del',params)
  },
  // 发布该发片计划
  publish(params){
    return myAxios.post(BASEURL+'/plan/publish',params)
  },
  // 不发布该发片计划
  nopublish(params){
    return myAxios.post(BASEURL+'/plan/no-publish',params)
  }
  
}

export default showingonplanApi;