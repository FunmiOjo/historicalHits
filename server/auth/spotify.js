const passport = require('passport')
const router = require('express').Router()
const SpotifyStrategy = require('passport-spotify').Strategy
const {User} = require('../db/models')
const queryString = require('query-string')

module.exports = router

if (!process.env.SPOTIFY_CLIENT_ID || !process.env.SPOTIFY_CLIENT_SECRET) {
  console.log('Spotify client ID / secret not found. Skipping Spotify OAuth.')
} else {
  const spotifyConfig = {
    clientID: process.env.SPOTIFY_CLIENT_ID,
    clientSecret: process.env.SPOTIFY_CLIENT_SECRET,
    callbackURL: process.env.SPOTIFY_CALLBACK
  }

  const strategy = new SpotifyStrategy(
    spotifyConfig,
    (accessToken, refreshToken, expires_in, profile, done) => {
      console.log('PROFILE, ', profile)
      User.findOrCreate({
        where: {
          spotifyId: profile.id,
          spotifyAccessToken: accessToken
        }
      })
        .then(([user]) => done(null, user))
        .catch(error => console.error(error))
    }
  )

  passport.use(strategy)

  router.get('/', passport.authenticate('spotify'))

  router.get(
    '/callback',
    passport.authenticate('spotify', {
      failureRedirect: '/login',
      scope: ['user-read-email', 'user-read-private']
    }),
    function(req, res) {
      // Successful authentication, redirect home.
      res.redirect('/home')
    }
  )

  // router.get(
  //   '/callback',
  //   passport.authenticate('spotify', {
  //     successRedirect: `https://accounts.spotify.com/authorize?` + queryString.stringify({
  //       client_id: process.env.SPOTIFY_CLIENT_ID,
  //       response_type: 'code',
  //       grant_type: 'authorization_code',
  //       redirect_uri: '/home'
  //     }),
  //     failureRedirect: '/login'
  //   })
  // )
}
