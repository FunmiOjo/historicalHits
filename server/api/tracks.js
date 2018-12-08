const router = require('express').Router()
const axios = require('axios')
const {User} = require('../db/models')

const {getDateSeparatedByHyphens, getRandomPosition} = require('../utils')

router.get('/rb', async (req, res, next) => {
  try {
    const date = getDateSeparatedByHyphens()
    const position = getRandomPosition()
    const {data: songInfo} = await axios.get(
      `http://localhost:5000/rb?date=${date}&position=${position}`
    )

    const user = await User.findOne({
      where: {
        spotifyId: 'diosmeda'
      }
    })

    res.json(songInfo)

    const {spotifyAccessToken} = user
    const header = `Authorization: Bearer ${spotifyAccessToken}`
    const {title, artist} = songInfo.song
    console.log('TITLE: ', title, 'ARTIST: ', artist)
    const {data: possibleTracks} = await axios.get(
      `https://api.spotify.com/v1/search?q=name:${title}%20artist:${artist}&type=track`,
      {headers: {header}}
    )

    res.json(possibleTracks)
  } catch (error) {
    next(error)
  }
})

module.exports = router
