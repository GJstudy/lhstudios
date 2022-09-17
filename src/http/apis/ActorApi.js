import myAxios from '../MyAxios'
import BASEURL from '../BaseUrl'

const actorApi={
  /**
   * 查询演员列表接口
   * @param
   * params:封装了请求参数的对象，{page：1，pagesize：100}
   * @returns 
   */
  list(params){
    // return axios.get(`/movie-actors?page=${page}&pagesize=${pagesize}`)
    return myAxios.get(BASEURL+'/movie-actors',params)
  },
  /**
   * 添加演员接口post
   * @param {Object} params {actorName:xxx,actorAvatar}
   */ 
  add(params){
    return myAxios.post(BASEURL+'/movie-actor/add',params)
    
  },
  /**
   * 通过演员id删除演员接口
   * @param {Object} params {id:1} 
   */
  delete(params){
    return myAxios.post(BASEURL+'/movie-actor/del',params)
  },
  /**
   * 通过演员姓名字段模糊搜索演员列表
   * @param {object} params {name:'xxx'}
   */
  listByName(params){
    return myAxios.post(BASEURL+'/movie-actors/name',params)
  },
  /**
   * 通过movieid，查询演员列表
   */
  listByMovieId(params){
    return myAxios.get(BASEURL+'/movie-actors/movieid',params)
  }
}

export default actorApi;