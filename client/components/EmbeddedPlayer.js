import React from 'react'

const EmbeddedPlayer = ({id, date, position, genre}) => {
  if (id) {
    return (
      <div className="player-wrapper">
        <h4 className="song-info">
          {genre}: #{position + 1} on {date}
        </h4>
        <iframe
          src={`https://open.spotify.com/embed/track/${id}`}
          width="300"
          height="380"
          frameBorder="0"
          allowtransparency="true"
          allow="encrypted-media"
          className="player"
        />
      </div>
    )
  } else {
    return (
      <ul>
        <li />
        <li />
        <li />
        <li />
        <li />
        <li />
      </ul>
    )
  }
}

export default EmbeddedPlayer
