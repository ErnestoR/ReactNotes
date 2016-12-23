var React = require('react')

var UserProfile = React.createClass({
  propTypes : {
    username : React.PropTypes.string.isRequired,
    bio      : React.PropTypes.string.isRequired
  },

  render : function () {
    return (
      <div>
        <p> User Profile! </p>
        <p>{this.props.username}</p>
        <p>Bio: {this.props.bio.name}</p>
      </div>
    )
  }
})

module.exports = UserProfile
