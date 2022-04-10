// * Types
import type { Ref } from 'vue'
import type { IconsTypes } from '@/contracts/fonts'
import type { Types } from '@/contracts/notification'
// * Types

import { ref } from 'vue'

export default class {
  private type: Ref<Types> = ref('success')

  /**
   * * Public methods
   */

  public getType(): keyof typeof IconsTypes {
    switch (this.type.value) {
      case 'success':
        return 'SUCCESS'

      case 'error':
        return 'ERROR'
    
      default:
        return 'SUCCESS'
    }
  }

  public setType(val: Types): void {
    this.type.value = val
  }
}