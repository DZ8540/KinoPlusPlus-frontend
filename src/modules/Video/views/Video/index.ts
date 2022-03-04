import { Duration } from 'luxon'
import { getVideo } from '@/api/video'
import type { AxiosResponse } from 'axios'
import { reactive, ref, type Ref } from 'vue'
import { DEFAULT_VIDEO } from '@/config/video'
import type { Actor } from '@/contracts/actor'
import type { Response } from '@/contracts/response'
import type { UnparsedVideo, Video } from '@/contracts/video'

export default class {
  public item: Video = reactive({
    ...DEFAULT_VIDEO
  })
  public isLoaded: Ref<boolean> = ref(true)
  public actors: Actor[] = reactive([])

  public setItem(item: UnparsedVideo): void {
    this.item = this.parseItem(item)
  }

  public setLoaded(val: boolean): void {
    this.isLoaded.value = val
  }

  public setActors(actors: Actor[]): void {
    this.actors = actors
  }

  public async getItem(slug: Video['slug']): Promise<void> {
    let response: AxiosResponse<Response<UnparsedVideo>> = await getVideo(slug)

    if ((response.data.status == 200) && response.data.body) {
      this.setItem(response.data.body)
      this.setLoaded(false)
    }
  }

  private parseItem(item: UnparsedVideo): Video {
    let duration: string = Duration.fromISOTime(item.duration).toFormat("h 'hour' mm 'minutes'")
    let rating: string = item.rating.replace('.', ',')
    let ageLimit: string = `+${item.ageLimit}`

    return {
      ...item,
      duration,
      rating,
      ageLimit,
    }
  }
}