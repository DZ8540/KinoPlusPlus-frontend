// * Types
import type { Ref } from 'vue'
// * Types

import { ref } from 'vue'

export default class {
  public totalResults: Ref<number> = ref(0)

  public setTotalResults(val: number): void {
    this.totalResults.value = val
  }
}