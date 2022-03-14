import type UIkit from 'uikit'
import { reactive, ref, type Ref } from 'vue'
import type { Actor } from '@/contracts/actor'
import type { UnparsedVideo } from '@/contracts/video'

export default class {
  public isWithShowMore: Ref<boolean> = ref(true)
  
  public items: UnparsedVideo[] | Actor[] = reactive([])
  public options: UIkit.UIkitSliderOptions = reactive({})
  public itemsCountClasses: string[] = reactive(['uk-slider-items'])

  public setOptions(options: UIkit.UIkitSliderOptions): void {
    this.options = options
  }

  public setItems(items: UnparsedVideo[] | Actor[]): void {
    this.items = items
  }

  public setWithShowMore(val: boolean): void {
    this.isWithShowMore.value = val
  }

  public setItemsCount(defaultCount: number, smallView: number, mobile: number): void {
    let defaultClass: string = `uk-child-width-1-${defaultCount}@m`
    let smallViewClass: string = `uk-child-width-1-${smallView}@s`
    let mobileClass: string = `uk-child-width-1-${mobile}`


    this.itemsCountClasses.push(defaultClass, smallViewClass, mobileClass)
  }
}