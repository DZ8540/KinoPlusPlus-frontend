import { reactive } from 'vue'

export default class {
  public classNames: string[] = reactive(['List__li'])

  private withDotsClassName: string = 'List__li__withoutDot'

  public withoutDots(val: boolean): void {
    if (val)
      this.classNames.push(this.withDotsClassName)
  }
}