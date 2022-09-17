import myAxios from '../MyAxios'
import BASEURL from '../BaseUrl'

const directorApi={
  /**
   * 查询导演列表接口
   * @param
   * params:封装了请求参数的对象，{page：1，pagesize：100}
   * @returns 
   */
  list(params){
    // return axios.get(`/movie-directors?page=${page}&pagesize=${pagesize}`)
    return myAxios.get(BASEURL+'/movie-directors',params)
  },

  /**
   * 添加导演接口post
   * @param {Object} params {directorName:xxx,directorAvatar}
   */ 
  add(params){
    return myAxios.post(BASEURL+'/movie-director/add',params)
    
  },
  
  /**
   * 通过导演id删除导演接口
   * @param {Object} params {id:1} 
   */
  delete(params){
    return myAxios.post(BASEURL+'/movie-director/del',params)
  },
  /**
   * 通过导演姓名字段模糊搜索导演列表
   * @param {object} params {name:'xxx'}
   */
  listByName(params){
    return myAxios.post(BASEURL+'/movie-directors/name',params)
  }
}

export default directorApi;