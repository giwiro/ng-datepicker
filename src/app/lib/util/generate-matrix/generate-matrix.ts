// Limit: max date of month (28, 30 or 31)
export function buildCalendarMatrix(doom: number, limit: number = 31): number[][] {
  const r = [];
  let i = doom;
  let n = 1;
  let row = 0;
  while (n <= limit) {
    if (!r[row]) {
      r[row] = [];
    }
    r[row][i] = n;
    n++;
    i++;
    if (i > 6) {
      row++;
      i = 0;
    }
  }
  return r;
}
