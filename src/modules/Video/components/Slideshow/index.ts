// * Types
import type { UnparsedVideo } from '@/contracts/video'
// * Types

import type UIkit from 'uikit'
import { reactive } from 'vue'

export default class {
  public options: UIkit.UIkitSliderOptions = {}
  
  public items: UnparsedVideo[] = reactive([])

  public setOptions(options: UIkit.UIkitSliderOptions): void {
    this.options = options
  }

  public setItems(items: UnparsedVideo[]): void {
    this.items = items
  }
}