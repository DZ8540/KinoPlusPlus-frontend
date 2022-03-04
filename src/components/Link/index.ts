import { reactive } from 'vue'
import { castFontClass } from '@/config/fonts'

export default class {
  defaultClassNames: string[] = reactive(['Link', 'Font', 'transition'])

  addClassName(className: string): void {
    this.defaultClassNames.push(castFontClass(className))
  }
}