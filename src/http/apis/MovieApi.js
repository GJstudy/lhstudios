import myAxios from '../MyAxios'
import BASEURL from '../BaseUrl'

const movieApi={
  /**
   * 添加导演接口post
   * @param {Object} params 详见接口
   */ 
  add(params){
    return myAxios.post(BASEURL+'/movie-info/add',params)  
  },

  /**
   * 查询电影类型接口
   */
  listAllMovieTypes(){
    return myAxios.get(BASEURL+'/movie-types')
  },
  /**
   * 查询所有电影
   * @params {object} page.pagesize
   */
  list(params){
    return myAxios.get(BASEURL+'/movie-infos',params)
  },
  /**
   * 删除所选电影信息
   * @params {object} params {id:xxx}
   */
  del(params){
    return myAxios.post(BASEURL+'/movie-info/del',params)
  },
  /**
   * 加载当前id的电影信息
   * @params {object} params {id:xxx}
   */
  queryById(params){
    return myAxios.get(BASEURL+'/movie-info/query',params)
  },
  /**
   * 更新当前id的电影信息
   * @params {object} params {id:xxx}
   */
   update(params){
    return myAxios.post(BASEURL+'/movie-info/update',params)
  },
  /**
   * 为电影绑定演员列表
   * @param {object} params {movie_id:'1',actor_ids:'1,2,3'}
   */
  bindActors(params){
    return myAxios.post(BASEURL+'/movie-info/bind-actors',params)
  },
  /**
   * 通过电影名称模糊查询电影
   */
  listByName(params){
    return myAxios.post(BASEURL+'/movie-infos/name',params)
  }
}

export default movieApi;