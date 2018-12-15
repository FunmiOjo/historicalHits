const axios = require('axios')
const {getDateSeparatedByHyphens, getRandomPosition} = require('../utils')

const getSongInfo = async () => {
  const date = getDateSeparatedByHyphens(new Date())
  const position = getRandomPosition()
  try {
    const {data: songInfo} = await axios.get(
      `http://localhost:5000/rb?date=${date}&position=${position}`
    )
    return {...songInfo, date, position}
  } catch (error) {
    console.error(error)
  }
}

module.exports = {getSongInfo}
