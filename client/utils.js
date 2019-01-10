const convertMonthNumberToName = monthNumber => {
  const monthMap = {
    1: 'January',
    2: 'February',
    3: 'March',
    4: 'April',
    5: 'May',
    6: 'June',
    7: 'July',
    8: 'August',
    9: 'September',
    10: 'October',
    11: 'November',
    12: 'December'
  }
  return monthMap[monthNumber]
}

export const convertDateToLongFormat = dateWithHyphens => {
  const separatedDates = dateWithHyphens.split('-')
  const month = convertMonthNumberToName(Number(separatedDates[1]))
  const day = separatedDates[2]
  const year = separatedDates[0]
  return `${month} ${day}, ${year}`
}
