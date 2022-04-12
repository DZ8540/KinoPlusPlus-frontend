// * Types
import type { Ref } from 'vue'
import type { AxiosResponse } from 'axios'
import type { Actor } from '@/contracts/actor'
import type { Response } from '@/contracts/response'
import type { UnparsedVideo, Video } from '@/contracts/video'
// * Types

import Logger from '@/assets/vendor/Logger'
import { Duration } from 'luxon'
import { reactive, ref } from 'vue'
import { getVideo } from '@/api/video'
// import { checkQuery } from '@/helpers'
import { DEFAULT_VIDEO } from '@/config/video'

export default class {
  public isLoaded: Ref<boolean> = ref(true)

  public actors: Actor[] = reactive([])
  public displayGenres: Video['genres'] = reactive([])
  public item: Video = reactive({ ...DEFAULT_VIDEO })

  public setLoaded(val: boolean): void {
    this.isLoaded.value = val
  }

  public setActors(actors: Actor[]): void {
    this.actors = actors
  }

  public async getItem(slug: Video['slug']): Promise<void> {
    try {
      const query: AxiosResponse<Response<UnparsedVideo>> = await getVideo(slug)
      console.log(query)
      // checkQuery(query)

      this.item = this.parseItem(query.data.body!)
      this.setLoaded(false)
    } catch (err: any) {
      return Logger.error(err)
    }
  }

  /**
   * * Private methods
   */

  private parseItem(item: UnparsedVideo): Video {
    const duration: string = Duration.fromISOTime(item.duration).toFormat("h 'hour' mm 'minutes'")
    const rating: string = item.rating.replace('.', ',')
    const ageLimit: string = `+${item.ageLimit}`

    for (let i = 0; i < item.genres.length; i++) {
      const currentGenre: Video['genres'][number] = item.genres[i]
      const indexForConditionArrLength: number = i + 1

      if (indexForConditionArrLength < item.genres.length) {
        const displayName: string = `${currentGenre.name}, `
        currentGenre.name = displayName
      }

      this.displayGenres.push(currentGenre)
    }

    return {
      ...item,
      duration,
      rating,
      ageLimit,
    }
  }
}