import type UIkit from 'uikit'
import { reactive } from 'vue'
import type { UnparsedVideo } from '@/contracts/video'

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