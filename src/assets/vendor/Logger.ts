const MODE: string = import.meta.env.MODE

// * I know about DI, but this way is fast!
export default class Logger {
  public static log(...logInfo: any[]): void {
    try {
      this.checkMode()

      console.log(...logInfo)
    } catch (_err: Error | any) {}
  }

  public static info(...info: any[]): void {
    try {
      this.checkMode()

      console.info(...info)
    } catch (_err: Error | any) {}
  }

  public static error(...err: any[]): void {
    try {
      this.checkMode()

      console.error(...err)
    } catch (_err: Error | any) {}
  }

  /**
   * * Private methods
   */

  private static checkMode(): void {
    if (MODE == 'production')
      throw new Error()
  }
}