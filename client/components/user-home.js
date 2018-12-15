import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import axios from 'axios'
import EmbeddedPlayer from './EmbeddedPlayer'
import {convertDateToLongFormat} from '../utils'

/**
 * COMPONENT
 */
export class UserHome extends Component {
  constructor() {
    super()
    this.state = {
      id: '',
      date: ''
    }
  }

  async componentDidMount() {
    const {data} = await axios.get('/api/tracks/rb')
    const {id, date, position} = data
    const formattedDate = convertDateToLongFormat(date)

    this.setState({
      id,
      date: formattedDate,
      position
    })
  }

  render() {
    const {date, id, position} = this.state
    return (
      <div>
        <EmbeddedPlayer
          id={id}
          date={date}
          position={position}
          genre="R&B/Hip-Hop"
        />
      </div>
    )
  }
}

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    email: state.user.email
  }
}

export default connect(mapState)(UserHome)

/**
 * PROP TYPES
 */
UserHome.propTypes = {
  email: PropTypes.string
}
