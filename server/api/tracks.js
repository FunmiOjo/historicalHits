const router = require('express').Router()
const {getTrackInfo} = require('../spotify')

router.get('/rb', async (req, res, next) => {
  try {
    const trackInfo = await getTrackInfo()
    res.json(trackInfo)
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
