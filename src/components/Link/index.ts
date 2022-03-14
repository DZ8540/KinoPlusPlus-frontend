import { reactive } from 'vue'
import { castFontClass } from '@/config/fonts'

export default class {
  public defaultClassNames: string[] = reactive(['Link', 'Font', 'transition'])

  public addClassName(className: string): void {
    this.defaultClassNames.push(castFontClass(className))
  }
}