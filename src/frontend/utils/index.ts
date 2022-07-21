export const formatNumber = (value: number, fractions: number = 0) =>
  value.toLocaleString(undefined, {
    maximumFractionDigits: fractions,
  })
