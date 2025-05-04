export function getDaysInMonth(year, month) {
  return new Date(year, month, 0).getDate();
}

export function getDayOfWeek(year, month) {
  const d = new Date(year, month - 1, 1);
  let num = d.getDay();
  if (num === 0) num = 7; // 星期天
  return num;
}
