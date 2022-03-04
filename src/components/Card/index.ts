import { Duration } from 'luxon'
import { reactive, ref, type Ref } from 'vue'
import { DEFAULT_VIDEO } from '@/config/video'
import type { Video, UnparsedVideo } from '@/contracts/video'

export default class {
  public item: Video = reactive({
    ...DEFAULT_VIDEO
  })
  public isInLaterList: Ref<boolean> = ref(false)
  public isInWishList: Ref<boolean> = ref(false)

  public setLaterList(val: boolean): void {
    this.isInLaterList.value = val
  }

  public setWishList(val: boolean): void {
    this.isInWishList.value = val
  }

  public setItem(item: UnparsedVideo): void {
    this.item = this.parseItem(item)
  }

  private parseItem(item: UnparsedVideo): Video {
    let duration: string = Duration.fromISOTime(item.duration).toFormat("mm 'minutes'")
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