// * Types
import type { Video, WishlistActions } from '@/contracts/video'
// * Types

import { useWishlistAction } from '@/composables/wishlist'

export default class {
  public async wishlistAction(videoId: Video['id'], action: WishlistActions): Promise<void> {
    await useWishlistAction(videoId, action)
  }
}