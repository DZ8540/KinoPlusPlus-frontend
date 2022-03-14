// * Types
import type { Actor } from '@/contracts/actor'
// * Types

import { reactive } from 'vue'
import { DEFAULT_ACTOR } from '@/config/actor'

export default class {
  public item: Actor = reactive({ ...DEFAULT_ACTOR })

  public setItem(item: Actor): void {
    this.item = item
  }
}