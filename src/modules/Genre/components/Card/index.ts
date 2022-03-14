import type { AggregateGenre } from '@/contracts/genre'

import { reactive } from 'vue'
import { DEFAULT_GENRE } from '@/config/genre'

export default class {
  public item: AggregateGenre = reactive({
    ...DEFAULT_GENRE,
    moviesCount: 4,
  })

  public setItem(item: AggregateGenre): void {
    this.item = item
  }
}