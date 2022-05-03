import type { WishlistData } from '@/contracts/api'
import type { Video, WishlistActions } from '@/contracts/video'

import Logger from '@/assets/vendor/Logger'
import { wishlist } from '@/api/video'
import { Messages } from '@/contracts/response'
import { useUserData } from '@/store/userDataStore'
import { useNotificationBus } from '@/store/notificationBusStore'

const userData = useUserData()
const notifications = useNotificationBus()

export async function useWishlistAction(videoId: Video['id'], action: WishlistActions): Promise<void> {
  if (!userData.user)
    throw null

  const msg: Messages = action == 'add' ? Messages.VIDEO_WISHLIST_ADDED : Messages.VIDEO_WISHLIST_DELETED
  const payload: WishlistData = {
    videoId,
    userId: userData.user.id,
  }

  try {
    await wishlist(payload, action)

    notifications.addNotification({
      msg,
      type: 'success',
    })
  } catch (err: any) {
    notifications.addNotification({
      msg: Messages.ERR,
      type: 'error',
    })

    throw Logger.error(err)
  }
}