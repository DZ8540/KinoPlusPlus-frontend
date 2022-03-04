import { reactive } from 'vue'
import type { Actor } from '@/contracts/actor'
import { DEFAULT_ACTOR } from '@/config/actor'

export default class {
  public item: Actor = reactive({
    ...DEFAULT_ACTOR
  })

  public setItem(item: Actor): void {
    this.item = item
  }
}