// * Types
import type { Ref } from 'vue'
import type { Video, UnparsedVideo } from '@/contracts/video'
// * Types

import { Duration } from 'luxon'
import { reactive, ref } from 'vue'
import { DEFAULT_VIDEO } from '@/config/video'

export default class {
  public isInWishList: Ref<boolean> = ref(false)
  public isInLaterList: Ref<boolean> = ref(false)
  
  public item: Video = reactive({ ...DEFAULT_VIDEO })

  public setLaterList(val: boolean): void {
    this.isInLaterList.value = val
  }

  public setWishList(val: boolean): void {
    this.isInWishList.value = val
  }

  public setItem(item: UnparsedVideo): void {
    this.item = this.parseItem(item)
  }

  /**
   * * Private methods
   */

  private parseItem(item: UnparsedVideo): Video {
    const duration: string = Duration.fromISOTime(item.duration).toFormat("mm 'minutes'")
    const rating: string = item.rating.replace('.', ',')
    const ageLimit: string = `+${item.ageLimit}`

    return {
      ...item,
      duration,
      rating,
      ageLimit,
    }
  }
}