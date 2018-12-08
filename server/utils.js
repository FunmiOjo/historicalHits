const getTodaysDate = () => {
  const todaysDate = new Date()
  return todaysDate
}

const getRandomPosition = () => {
  const position = Math.floor(Math.random() * 24)
  return position
}

const getRandomYear = () => {
  const date = new Date()
  const currentYear = date.getFullYear()
  const maxYearsToAdd = currentYear - 1958
  const yearsToAdd = Math.floor(Math.random() * maxYearsToAdd)
  return 1958 + yearsToAdd
}

const getSeparatedDate = date => {
  const month = date.getMonth() + 1
  const day = date.getDate()
  return {
    month: month > 9 ? month : `0${month}`,
    day: day > 9 ? day : `0${day}`,
    year: getRandomYear()
  }
}

const getDateSeparatedByHyphens = () => {
  const date = getSeparatedDate(getTodaysDate())
  return `${date.year}-${date.month}-${date.day}`
}

const getPosition = () => {
  const date = getSeparatedDate(getTodaysDate())
  return (date.month + date.day) % 24
}

module.exports = {
  getDateSeparatedByHyphens,
  getPosition,
  getRandomPosition,
  getRandomYear
}
