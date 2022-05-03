// * Types
import type { Ref } from 'vue'
import type { AxiosResponse } from 'axios'
import type { Genre } from '@/contracts/genre'
import type { Paginate } from '@/contracts/api'
import type { Response } from '@/contracts/response'
import type { UnparsedVideo } from '@/contracts/video'
// * Types

import Logger from '@/assets/vendor/Logger'
import { reactive, ref } from 'vue'
import { getGenre } from '@/api/genre'
// import { checkQuery } from '@/helpers'
import { searchVideo } from '@/api/video'
import { DEFAULT_GENRE } from '@/config/genre'
import { useUserData } from '@/store/userDataStore'

const userData = useUserData()

export default class {
  public totalResults: Ref<number> = ref(0)
  public isLoaded: Ref<boolean> = ref(false)
  public showShowMoreBtn: Ref<boolean> = ref(true)

  public movies: UnparsedVideo[] = reactive([])
  public item: Genre = reactive({ ...DEFAULT_GENRE })

  /**
   * * Private properties
   */

  private page: Ref<number> = ref(1) 
  private lastPage: number = 1

  public async nextPage(): Promise<void> {
    if (this.page.value < this.lastPage) {
      this.page.value++

      try {
        await this.getMovies()
      } catch (err: any) {
        return err
      }
    }
  }

  public async getItem(slug: Genre['slug']): Promise<void> {
    try {
      const query: AxiosResponse<Response<Genre>> = await getGenre(slug)
      // checkQuery(query)

      this.item = query.data.body!
      this.setLoaded(true)
    } catch (err: any) {
      return Logger.error(err)
    }

    try {
      this.getMovies()
    } catch (err: any) {
      return err
    }
  }

  /**
   * * Private methods
   */

  private async getMovies(): Promise<void> {
    try {
      const query: AxiosResponse<Response<Paginate<UnparsedVideo>>> = await searchVideo({ page: this.page.value, genres: [ this.item.id ] }, userData.user?.id)
      // checkQuery(query)

      this.lastPage = query.data.body!.meta.lastPage
      this.totalResults.value = query.data.body!.meta.total

      for (const item of query.data.body!.data) {
        this.movies.push(item)
      }

      if (this.page.value == this.lastPage)
        this.showShowMoreBtn.value = false
    } catch (err: any) {
      return Logger.error(err)
    }
  } 
  
  private setLoaded(val: boolean): void {
    this.isLoaded.value = val
  }
}