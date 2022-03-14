// * Types
import type UIkit from 'uikit'
import type { Ref } from 'vue'
import type { Value } from '@/contracts/select'
// * Types

import { reactive, ref } from 'vue'

export default class {
  public options: UIkit.UIkitNavbarOptions = {}
  
  public searchDropBoundaryClassName: Ref<string> = ref('SearchDropBoundaryBind')
  
  public langs: Value[] = reactive([])

  public setOptions(options: UIkit.UIkitNavbarOptions): void {
    this.options = options
  }

  public setLangs(langs: string[]): void {
    for (const key in langs) {
      this.langs.push({ value: key, text: langs[key] })
    }
  }
}