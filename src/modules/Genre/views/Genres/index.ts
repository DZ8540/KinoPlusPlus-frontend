// * Types
import type { AxiosResponse } from 'axios'
import type { Response } from '@/contracts/response'
import type { AggregateGenre } from '@/contracts/genre'
// * Types

import Logger from '@/assets/vendor/Logger'
import { checkQuery } from '@/helpers'
import { allGenres } from '@/api/genre'
import { reactive, ref, type Ref } from 'vue'

export default class {
  public isLoadedGenres: Ref<boolean> = ref(false)
  
  public genres: AggregateGenre[] = reactive([])

  public async getAllGenres(): Promise<void> {
    try {
      const query: AxiosResponse<Response<AggregateGenre[]>> = await allGenres()
      checkQuery(query)

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