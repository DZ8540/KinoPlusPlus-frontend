import type { Ref } from 'vue'
import type { AxiosResponse } from 'axios'
import type { Paginate } from '@/contracts/api'
import type { Response } from '@/contracts/response'
import type { UnparsedVideo } from '@/contracts/video'

import { reactive, ref } from 'vue'
import { getUserWishlist } from '@/api/user'
import { useUserData } from '@/store/userDataStore'
import { useNotificationBus } from '@/store/notificationBusStore'

const userData = useUserData()
const notifications = useNotificationBus()

export default class {
  public totalCount: Ref<number> = ref(0)
  public lastPage: Ref<number> = ref(0)
  public wishlist: UnparsedVideo[] = reactive([])
  public isWishListLoaded: Ref<boolean> = ref(false)

  /**
   * * Private properties
   */

  private readonly limit: number = 20

  /**
   * * Public methods
   */

  public async getWishlist(page: number): Promise<void> {
    try {
      const response: AxiosResponse<Response<Paginate<UnparsedVideo>>> = await getUserWishlist(userData.user!.id, { page, limit: this.limit })
      const body: Paginate<UnparsedVideo> = response.data.body!

      this.totalCount.value = body.meta.total
      this.lastPage.value = body.meta.lastPage

      this.wishlist.push(...body.data)
      this.isWishListLoaded.value = true
    } catch (err: any) {
      notifications.addNotification({
        msg: err.message,
        type: 'error',
      })
    }
  }
}