const MODE: string = import.meta.env.MODE

// * I know about DI, but this way is fast!
export default class Logger {
  public static log(err: any): void {
    try {
      this.checkMode()

      console.log(err)
    } catch (err: Error | any) {}
  }

  public static info(err: any): void {
    try {
      this.checkMode()

      console.info(err)
    } catch (err: Error | any) {}
  }

  public static error(err: any): void {
    try {
      this.checkMode()

      console.error(err)
    } catch (err: Error | any) {}
  }

  /**
   * * Private methods
   */

  private static checkMode(): void {
    if (MODE == 'production')
      throw new Error()
  }
}