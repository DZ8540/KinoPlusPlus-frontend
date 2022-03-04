import { reactive } from 'vue'
import { IconsTypes } from '@/contracts/fonts'
import { castIconClass, ICONS } from '@/config/fonts'

export default class {
  public defaultClassNames: string[] = reactive(['Icon', 'transition', 'Font__text'])

  public addNewClassNames(...iconsTypesKeys: (keyof typeof IconsTypes)[]): void {
    for (let item of iconsTypesKeys) {
      switch (item) {
        case 'ARROW_BOTTOM':
        case 'ARROW_TOP':
        case 'ARROW_RIGHT':
          this.defaultClassNames.push(castIconClass(ICONS[IconsTypes['ARROW']]))
          this.defaultClassNames.push(castIconClass(ICONS[IconsTypes[item]]))
          break
      
        default:
          this.defaultClassNames.push(castIconClass(ICONS[IconsTypes[item]]))
          break
      }
    }
  }
}