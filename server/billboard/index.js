const axios = require('axios')
const {getDateSeparatedByHyphens, getRandomPosition} = require('../utils')

const date = getDateSeparatedByHyphens(new Date())
const position = getRandomPosition()

const getSongInfo = async () => {
  try {
    const {data: songInfo} = await axios.get(
      `http://localhost:5000/rb?date=${date}&position=${position}`
    )
    return songInfo
  } catch (error) {
    console.error(error)
  }
}

module.exports = {getSongInfo}
