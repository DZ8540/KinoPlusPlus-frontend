// * Types
import type { Ref } from 'vue'
// * Types

import { ref } from 'vue'

export default class {
  public isNotCorrect: Ref<boolean> = ref(false)

  public setNotCorrectValue(val: boolean): void {
    this.isNotCorrect.value = val
  }
}