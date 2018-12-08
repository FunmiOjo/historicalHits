const router = require('express').Router()
const axios = require('axios')
const {getDateSeparatedByHyphens, getRandomPosition} = require('../utils')

router.get('/rb', async (req, res, next) => {
  try {
    const date = getDateSeparatedByHyphens()
    const position = getRandomPosition()
    const {data: songInfo} = await axios.get(
      `http://localhost:5000/rb?date=${date}&position=${position}`
    )

    res.json(songInfo)
  } catch (error) {
    next(error)
  }
})

module.exports = router
