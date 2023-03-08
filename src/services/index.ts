import { ImageItem } from '@/types'
import { request } from './request'
class Service {
  public getImages(search: string, page: number) {
    // todo 修改 search  参数适配
    return request.get<Array<ImageItem>>('')
  }
}

export const service = new Service()
