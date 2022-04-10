// * Types
import type { Ref } from 'vue'
import type { AxiosResponse } from 'axios'
import type { Response } from '@/contracts/response'
import type { AggregateGenre } from '@/contracts/genre'
// * Types

import { reactive, ref } from 'vue'
import { allGenres } from '@/api/genre'
// import { checkQuery } from '@/helpers'
import Logger from '@/assets/vendor/Logger'

export default class {
  public isLoadedGenres: Ref<boolean> = ref(false)
  
  public genres: AggregateGenre[] = reactive([])

  public async getAllGenres(): Promise<void> {
    try {
      const query: AxiosResponse<Response<AggregateGenre[]>> = await allGenres()
      // checkQuery(query)

      this.genres = query.data.body!
      this.setLoaded(true)
    } catch (err: any) {
      return Logger.error(err)
    }
  }

  /**
   * * Private methods
   */

  private setLoaded(val: boolean): void {
    this.isLoadedGenres.value = val
  }
}