const router = require('express').Router()
const {getSongInfo} = require('../billboard')
const {getPossibleTracks} = require('../spotify')

router.get('/rb', async (req, res, next) => {
  try {
    const songInfo = await getSongInfo()
    const {title, artist} = songInfo.song
    const possibleTracks = await getPossibleTracks({
      title,
      artist
    })
    const {name, href, uri, preview_url, id} = possibleTracks.tracks.items[0]
    res.json({name, href, uri, preview_url, id})
  } catch (error) {
    console.error(error)
    if (
      error.message ===
      'Access token was refreshed.  Redirect to /api/tracks/rb'
    ) {
      res.redirect('/api/tracks/rb')
    } else {
      next(error)
    }
  }
})

module.exports = router
