import type UIkit from 'uikit'
import { reactive } from 'vue'

export default class {
  public options: UIkit.UIkitDropOptions = reactive({})

  public setOptions(options: UIkit.UIkitDropOptions): void {
    this.options = options
  }
}