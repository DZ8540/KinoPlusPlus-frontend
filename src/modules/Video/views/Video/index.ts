import Logger from '@/assets/vendor/Logger'
import type { AxiosResponse } from 'axios'
import type { Actor } from '@/contracts/actor'
import type { Response } from '@/contracts/response'
import type { UnparsedVideo, Video } from '@/contracts/video'
import { Duration } from 'luxon'
import { getVideo } from '@/api/video'
import { checkQuery } from '@/helpers'
import { reactive, ref, type Ref } from 'vue'
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
      let query: AxiosResponse<Response<UnparsedVideo>> = await getVideo(slug)
      checkQuery(query)

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
    let duration: string = Duration.fromISOTime(item.duration).toFormat("h 'hour' mm 'minutes'")
    let rating: string = item.rating.replace('.', ',')
    let ageLimit: string = `+${item.ageLimit}`

    for (let i = 0; i < item.genres.length; i++) {
      const genre: Video['genres'][number] = item.genres[i]
      const indexForConditionArrLength: number = i + 1

      if (indexForConditionArrLength < item.genres.length) {
        const displayName: string = `${genre.name}, `
        genre.name = displayName
      }

      this.displayGenres.push(genre)
    }

    return {
      ...item,
      duration,
      rating,
      ageLimit,
    }
  }
}