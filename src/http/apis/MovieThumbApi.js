import myAxios from '../MyAxios'
import BASEURL from '../BaseUrl'

const movieThumbApi={
  /**
   * 添加剧照接口post
   * @param {Object} params 详见接口
   */ 
  add(params){
    return myAxios.post(BASEURL+'/movie-thumb/add',params)  
  },

  /**
   * 删除所选电影信息
   * @params {object} params {id:xxx}
   */
  delete(params){
    return myAxios.post(BASEURL+'/movie-thumb/del',params)
  },
  /**
   * 通过电影ID查询剧照列表
   * @params {object} params {id:xxx}
   */
  listByMovieId(params){
    return myAxios.get(BASEURL+'/movie-thumbs/movieid',params)
  },
}

export default movieThumbApi;