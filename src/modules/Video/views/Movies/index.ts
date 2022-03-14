import Logger from '@/assets/vendor/Logger'
import type UIkit from 'uikit'
import type { AxiosResponse } from 'axios'
import type { Genre } from '@/contracts/genre'
import type { Paginate } from '@/contracts/api'
import type { Response } from '@/contracts/response'
import type { UnparsedVideo } from '@/contracts/video'
import { checkQuery } from '@/helpers'
import { showOnMainPage } from '@/api/genre'
import { reactive, ref, type Ref } from 'vue'
import { newest, popular, searchVideo } from '@/api/video'

type LoadObjects = 'newest' | 'popular' | 'genres'
type MainPageGenre = {
  title: Genre['name'],
  videos: UnparsedVideo[],
}

export default class {
  public slideshowOptions: UIkit.UIkitSliderOptions = { autoplay: true, center: true }

  public isLoadedNewest: Ref<boolean> = ref(false)
  public isLoadedPopular: Ref<boolean> = ref(false)
  public isLoadedGenres: Ref<boolean> = ref(false)

  public newest: UnparsedVideo[] = reactive([])
  public popular: UnparsedVideo[] = reactive([])
  public genres: MainPageGenre[] = reactive([])

  public async getNewest(): Promise<void> {
    try {
      const query: AxiosResponse<Response<UnparsedVideo[]>> = await newest()
      checkQuery(query)

      this.newest = query.data.body!
      this.setLoaded('newest', true)
    } catch (err: any) {
      return Logger.error(err)
    }
  }

  public async getPopular(): Promise<void> {
    try {
      const query: AxiosResponse<Response<UnparsedVideo[]>> = await popular()
      checkQuery(query)
      
      this.popular = query.data.body!
      this.setLoaded('popular', true)
    } catch (err: any) {
      return Logger.error(err)
    }
  }

  public async getAllGenres(): Promise<void> {
    let query: AxiosResponse<Response<Genre[]>>

    try {
      query = await showOnMainPage()
      checkQuery(query)
    } catch (err: any) {
      return Logger.error(err)
    }

    try {
      for (const genre of query.data.body!) {
        const genreData: MainPageGenre = {
          title: genre.name,
          videos: [],
        }

        const videosQuery: AxiosResponse<Response<Paginate<UnparsedVideo>>> = await searchVideo({ genres: [ genre.id ], page: 1 })
        checkQuery(videosQuery)

        genreData.videos = videosQuery.data.body!.data
        this.genres.push(genreData)
      }

      this.setLoaded('genres', true)
    } catch (err: any) {
      return Logger.error(err)
    }
  }

  /**
   * * Private methods
   */

  private setLoaded(object: LoadObjects, val: boolean): void {
    if (object == 'newest')
      this.isLoadedNewest.value = val
    else if (object == 'popular')
      this.isLoadedPopular.value = val
    else
      this.isLoadedGenres.value = val
  }
}