export class Settings {
  constructor(public startTime: Date = new Date(),
              public endTime: Date = new Date(),
              public recalcCostDelaySec: number = 0) {
  }
}
