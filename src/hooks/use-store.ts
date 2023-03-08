import { service } from '@/services'
import { ImageItem } from '@/types'
import Store from '@cloudlu/zustand-store'
class SearchStore extends Store.BaseStore<SearchStore> {
  /**
   * Cur page of search store
   */
  public curPage = 1
  public images: ImageItem[] = []

  @Store.loading()
  public async search(search: string, page: number) {
    try {
      const res = await service.getImages(search, page)
      this.set((state) => {
        state.images = [...state.images, ...res]
        state.curPage = page
      })
    } catch (e) {
      //
    }
  }
}

export const useSearchStore = Store.create(SearchStore)
