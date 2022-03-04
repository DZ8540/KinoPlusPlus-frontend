import { reactive, ref, type Ref } from 'vue'

export default class {
  public isActive: Ref<boolean> = ref(false)
  public defaultClassNames = reactive(['Tab', 'Font', 'Font__regular', 'Font__text', 'transition', { 'Tab--active': this.isActive.value }])

  public setActive(val: boolean): void {
    this.isActive.value = val
  }
}