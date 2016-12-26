import React from 'react'
import ReBase from 're-base'

import Repos from './Github/Repos'
import UserProfile from './Github/UserProfile'
import Notes from './Notes/Notes'
import getGithubInfo from '../utils/Helpers'

const config = {
  apiKey            : "AIzaSyDdeQ8AtrrudUjinXjqMyQFvz3bMFVaR4s",
  authDomain        : "github-notes-73898.firebaseapp.com",
  databaseURL       : "https://github-notes-73898.firebaseio.com",
  storageBucket     : "github-notes-73898.appspot.com",
  messagingSenderId : "905501702840"
}

const base = ReBase.createClass(config)

class Profile extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      notes : [],
      bio   : {},
      repos : []
    }
  }

  componentDidMount() {
    //Firebase.initializeApp(config)
    this.init(this.props.params.username)
  }

  componentWillReceiveProps(newProps) {
    //this.unbind('notes')
    base.removeBinding(this.ref)

    this.init(newProps.params.username)
  }

  init(username) {
    // var childRef = Firebase.database().ref(username)
    // this.bindAsArray(childRef, 'notes')
    this.ref = base.bindToState(username, {
      context : this,
      asArray : true,
      state   : 'notes'
    })

    getGithubInfo(username)
      .then((data) => {
        this.setState({
          bio   : data.bio,
          repos : data.repos
        })
      })
  }

  componentWillUnmount() {
    base.removeBinding(this.ref)
  }

  handleAddNotes(newNote) {
    base.post(this.props.params.username, {
      data : this.state.notes.concat(newNote)
    })
  }

  render() {
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
            addNote={(newNote) => this.handleAddNotes(newNote)}/>
        </div>
      </div>
    )

  }
}

export default Profile
