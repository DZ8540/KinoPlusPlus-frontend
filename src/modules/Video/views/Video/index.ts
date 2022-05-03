// * Types
import type { AxiosResponse } from 'axios'
import type { User } from '@/contracts/user'
import type { Response } from '@/contracts/response'
import type { UnparsedVideo, Video, WishlistActions } from '@/contracts/video'
// * Types

import Logger from '@/assets/vendor/Logger'
import { Duration } from 'luxon'
import { getVideo } from '@/api/video'
import { useUserData } from '@/store/userDataStore'
import { useWishlistAction } from '@/composables/wishlist'
// import { checkQuery } from '@/helpers'

const userData = useUserData()

export default class {
  public async getItem(slug: Video['slug']): Promise<Video> {
    const currentUserId: User['id'] | undefined = userData.user?.id

    try {
      const query: AxiosResponse<Response<UnparsedVideo>> = await getVideo(slug, currentUserId)
      // checkQuery(query)

      return this.parseItem(query.data.body!)
    } catch (err: any) {
      throw Logger.error(err)
    }
  }

  public async wishlistAction(videoId: Video['id'], action: WishlistActions): Promise<void> {
    await useWishlistAction(videoId, action)
  }

  /**
   * * Private methods
   */

  private parseItem(item: UnparsedVideo): Video {
    if (!item.genres)
      throw new Error('Genres is undefined!')

    const duration: string = Duration.fromISOTime(item.duration).toFormat("h 'hour' mm 'minutes'")
    const rating: string = item.rating.replace('.', ',')
    const ageLimit: string = `+${item.ageLimit}`
    const wishlistStatus: boolean = item.wishlistStatus ?? false

    return {
      ...item,
      duration,
      rating,
      ageLimit,
      wishlistStatus,
    }
  }
}