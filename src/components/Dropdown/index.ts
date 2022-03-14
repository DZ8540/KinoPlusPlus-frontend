// * Types
import type UIkit from 'uikit'
import type { Ref } from 'vue'
// * Types

import { reactive, ref } from 'vue'

export default class {
  public options: UIkit.UIkitDropdownOptions = {}
  
  private isArrowActive: Ref<boolean> = ref(false)

  public arrowClassNames: any[] = reactive(['Dropdown__arrow', { 'Dropdown__arrow--active': this.isArrowActive }])

  public setArrowToActive(): void {
    this.isArrowActive.value = true
  }

  public unsetArrowToActive(): void {
    this.isArrowActive.value = false
  }

  public setOptions(options: UIkit.UIkitDropdownOptions): void {
    this.options = options
  }
}