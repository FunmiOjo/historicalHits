const axios = require('axios')
const {User} = require('../db/models')
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

const getPossibleTracks = async ({title, artist}) => {
  const {spotifyAccessToken, spotifyRefreshToken} = await getTokens()
  try {
    const header = {Authorization: `Bearer ${spotifyAccessToken}`}
    const {data: possibleTracks} = await axios.get(
      `https://api.spotify.com/v1/search?q=${title}%20artist:${stripFeatures(
        artist
      )}&type=track&limit=1`,
      {headers: header}
    )
    console.log('POSSIBLE TRACKS', possibleTracks)
    return possibleTracks
  } catch (error) {
    console.error(error)
    if (error.response.status === 401) {
      const {access_token: newAccessToken} = await getNewAccessToken(
        spotifyRefreshToken
      )
      await updateAccessToken(newAccessToken)
      throw new Error('Access token was refreshed.  Redirect to /api/tracks/rb')
    } else {
      console.error(error)
    }
  }
}

module.exports = {getPossibleTracks}
