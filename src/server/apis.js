import Axios from './axios'

class Api extends Axios {
  // 游戏详情
  async gameDetail (params = {}) {
    return this.axios('POST', '/api/l/owresource/gameDetail', params)
  }
  // 推荐资讯列表
  async getListRecommend (params = {}) {
    return this.axios('POST', '/api/l/owresource/getListRecommend', params)
  }
  // 推荐资讯详情
  async getInfoDetail (params = {}) {
    return this.axios('POST', '/api/l/owresource/getInfoDetail', params)
  }
  // 视频列表
  async getVideoList (params = {}) {
    return this.axios('POST', '/api/l/owresource/getVideoList', params)
  }
  // 视频详情
  async getVideoDetail (params = {}) {
    return this.axios('POST', '/api/l/owresource/getVideoDetail', params)
  }
  // 图⽚列表
  async getImageGetList (params = {}) {
    return this.axios('POST', '/api/l/owresource/getImageGetList', params)
  }
  // 图片详情
  async getImageDetailWithPreNext (params = {}) {
    return this.axios('POST', '/api/l/owresource/getImageDetailWithPreNext', params)
  }
  // 轮播
  async getSlots (params = {}) {
    return this.axios('POST', '/api/l/owresource/getSlots', params)
  }
}

export default new Api()
