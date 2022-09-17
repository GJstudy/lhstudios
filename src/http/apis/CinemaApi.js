import myAxios from '../MyAxios'
import BASEURL from '../BaseUrl'

const cinemaApi={
  /**
   * 添加影院接口post
   * @param {Object} params 详见接口
   */ 
  add(params){
    return myAxios.post(BASEURL+'/cinema/add',params)  
  },
  /**
   * 查询影院接口
   */
  queryAllTags(){
    return myAxios.get(BASEURL+'/cinema/tags')
  },
  /**
   * 查询所有影院
   */
  list(){
    return myAxios.get(BASEURL+'/cinemas')
  },
  /**
   * 删除影院接口
   */
  delete(params){
    return myAxios.post(BASEURL+'/cinema/del',params)
  },
  /**
   * 通过id查询电影院
   */
  queryById(params){
    return myAxios.get(BASEURL+'/cinema/query',params)
  },
  /**
   * 通过id更新影院信息
   */
  update(params){
    return myAxios.post(BASEURL+'/cinema/update',params)
  }
}

export default cinemaApi;