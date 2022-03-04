import type UIkit from 'uikit'
import type { AxiosResponse } from 'axios'
import type { Nav } from '@/contracts/tabs'
import { newest, popular } from '@/api/video'
import { reactive, ref, type Ref } from 'vue'
import type { Response } from '@/contracts/response'
import type { UnparsedVideo } from '@/contracts/video'

export default class {
  public isLoadedNewest: Ref<boolean> = ref(true)
  public isLoadedContent: Ref<boolean> = ref(true)
  public newest: UnparsedVideo[] = reactive([])
  public popular: UnparsedVideo[] = reactive([])
  public slideshowOptions: UIkit.UIkitSliderOptions = { autoplay: true, center: true }
  public navs: Nav[] = [
    { tabType: 'anchor', text: 'News', to: '/other#' },
    { tabType: 'anchor', text: 'Movies', to: { name: 'homeMovies' } },
    { tabType: 'anchor', text: 'Serials', to: '/other#' },
  ]

  public async getNewest(): Promise<void> {
    let query: AxiosResponse<Response<UnparsedVideo[]>> = await newest()
    
    if ((query.data.status == 200) && query.data.body) {
      this.newest = query.data.body
      this.setLoaded('newest', false)
    }
  }

  public async getPopular(): Promise<void> {
    let query: AxiosResponse<Response<UnparsedVideo[]>> = await popular()
    
    if ((query.data.status == 200) && query.data.body) {
      this.popular = query.data.body
      this.setLoaded('content', false)
    }
  }

  private setLoaded(object: 'newest' | 'content', val: boolean): void {
    if (object == 'newest')
      this.isLoadedNewest.value = val
    else if (object == 'content')
      this.isLoadedContent.value = val
  }
}