import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import axios from 'axios'
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
    const {id, date} = data
    this.setState({
      id,
      date
    })
  }

  render() {
    const {email} = this.props
    const {date, id} = this.state
    return (
      <div>
        <h3>Welcome, {email}</h3>
        <h4>{date}</h4>
        <iframe
          src={`https://open.spotify.com/embed/track/${id}`}
          width="300"
          height="380"
          frameBorder="0"
          allowtransparency="true"
          allow="encrypted-media"
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
