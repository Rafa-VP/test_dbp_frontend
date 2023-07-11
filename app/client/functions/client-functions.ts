export function isNumeric(value: string) {
  return /^-?\d+$/.test(value)
}

export function numberInRange(
  num: number,
  low: number,
  high: number
): boolean {
  return num >= low && num <= high
}
