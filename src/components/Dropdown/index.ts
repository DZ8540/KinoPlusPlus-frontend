import type UIkit from 'uikit'
import { reactive, ref, type Ref } from 'vue'

export default class {
  private isArrowActive: Ref<boolean> = ref(false)

  public options: UIkit.UIkitDropdownOptions = {}
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