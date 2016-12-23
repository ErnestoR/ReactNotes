var React          = require('react')
var Repos          = require('./Github/Repos')
var UserProfile    = require('./Github/UserProfile')
var Notes          = require('./Notes/Notes')
var ReactFireMixin = require('reactfire')
var Firebase       = require('firebase')

import getGithubInfo from '../utils/Helpers'

var config = {
  apiKey            : "AIzaSyDdeQ8AtrrudUjinXjqMyQFvz3bMFVaR4s",
  authDomain        : "github-notes-73898.firebaseapp.com",
  databaseURL       : "https://github-notes-73898.firebaseio.com",
  storageBucket     : "github-notes-73898.appspot.com",
  messagingSenderId : "905501702840"
}

var Profile = React.createClass({
  mixins : [ReactFireMixin],

  getInitialState : function () {
    return {
      notes : [],
      bio   : {},
      repos : []
    }
  },

  componentDidMount : function () {
    Firebase.initializeApp(config)
    this.init(this.props.params.username)
  },

  componentWillReceiveProps : function (newProps) {
    this.unbind('notes')
    this.init(newProps.params.username)
  },

  init : function (username) {
    var childRef = Firebase.database().ref(username)
    this.bindAsArray(childRef, 'notes')

    getGithubInfo(username)
      .then(function (data) {
        this.setState({
          bio   : data.bio,
          repos : data.repos
        })
      }.bind(this))
  },

  componentWillUnmount : function () {
    this.unbind('notes')
  },

  handleAddNotes : function (newNote) {
    Firebase.database()
      .ref(this.props.params.username)
      .child(this.state.notes.length)
      .set(newNote)
  },

  render : function () {
    return (
      <div className="row">
        <div className="col-md-4">
          <UserProfile
            username={this.props.params.username}
            bio={this.state.bio}/>
        </div>
        <div className="col-md-4">
          <Repos
            username={this.props.params.username}
            repos={this.state.repos}/>
        </div>
        <div className="col-md-4">
          <Notes
            username={this.props.params.username}
            notes={this.state.notes}
            addNote={this.handleAddNotes}/>
        </div>
      </div>
    )
  }
})

module.exports = Profile
