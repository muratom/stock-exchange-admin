export class Stock {
  constructor(public name?: string,
              public symbol?: string,
              public price?: number,
              public amount?: number,
              public maxStep?: number,
              public distributionLaw?: "Uniform" | "Normal") {}
}

export function getUniformRandom(maxStep: number): number {
  let num = Math.random();
  // Scale
  num *= 2 * maxStep;
  // Shift
  num -= maxStep;
  return num;
}

export function getNormalRandom(maxStep: number): number {
  // Box-Muller transformation (uniform -> normal)
  let num = Math.sqrt( -2.0 * Math.log(1 - Math.random()) ) * Math.cos( 2.0 * Math.PI * Math.random())

  num = num / 10.0 + 0.5 // Translate to 0 -> 1
  if (num > 1 || num < 0) {
    num = getNormalRandom(maxStep) // resample between 0 and 1 if out of range
  } else {
    num *= 2 * maxStep;
    num -= maxStep;
  }

  return num
}
