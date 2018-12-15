const axios = require('axios')
const {User} = require('../db/models')
const {getSongInfo} = require('../billboard')

const {stripFeatures} = require('../utils')

const updateAccessToken = async accessToken => {
  const user = await User.findBySpotifyId('diosmeda')
  await user.update({
    spotifyAccessToken: accessToken
  })
}

const getTokens = async () => {
  try {
    const user = await User.findBySpotifyId('diosmeda')
    const {spotifyAccessToken, spotifyRefreshToken} = user
    return {spotifyAccessToken, spotifyRefreshToken}
  } catch (error) {
    console.error(error)
  }
}

const getNewAccessToken = async refreshToken => {
  const clientIdAndSecret = `${process.env.SPOTIFY_CLIENT_ID}:${
    process.env.SPOTIFY_CLIENT_SECRET
  }`
  const encodedClientIdAndSecret = Buffer.from(clientIdAndSecret).toString(
    'base64'
  )
  const header = {
    Authorization: `Basic ${encodedClientIdAndSecret}`,
    'Content-Type': 'application/x-www-form-urlencoded'
  }
  const {data} = await axios({
    method: 'post',
    url: 'https://accounts.spotify.com/api/token',
    params: {
      grant_type: 'refresh_token',
      refresh_token: refreshToken
    },
    headers: header
  })
  return data
}

const getTrackInfo = async () => {
  const songInfo = await getSongInfo()
  const {title, artist} = songInfo.song
  const {date, position} = songInfo
  const {spotifyAccessToken, spotifyRefreshToken} = await getTokens()
  try {
    const header = {Authorization: `Bearer ${spotifyAccessToken}`}
    const {data: possibleTracks} = await axios.get(
      `https://api.spotify.com/v1/search?q=${title}%20artist:${stripFeatures(
        artist
      )}&type=track&limit=1`,
      {headers: header}
    )
    if (possibleTracks.tracks.items.length > 0) {
      const {name, href, uri, preview_url, id} = possibleTracks.tracks.items[0]
      return {name, href, uri, preview_url, id, date, position}
    } else {
      throw new Error('Track not found')
    }
  } catch (error) {
    console.error(error)
    if (error.response && error.response.status === 401) {
      const {access_token: newAccessToken} = await getNewAccessToken(
        spotifyRefreshToken
      )
      await updateAccessToken(newAccessToken)
      throw new Error('Access token was refreshed.  Redirect to /api/tracks/rb')
    } else {
      console.error(error)
      throw error
    }
  }
}

module.exports = {getTrackInfo}
