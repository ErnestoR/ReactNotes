import React from 'react'

class Search extends React.Component {
  setRef(ref) {
    this.usernameRef = ref
  }

  handleSubmit() {
    const newSearch = this.usernameRef.value

    //clear textfield
    this.usernameRef.value = ''

    this.props.history
      .pushState(null, '/profile/' + newSearch)
  }

  render() {
    return (
      <div className="col-sm-12">
        <form onSubmit={() => this.handleSubmit()}>
          <div className="form-group col-sm-7">
            <input type="text" className="form-control" ref={(ref) => this.setRef(ref)}/>
          </div>
          <div className="form-group col-sm-5">
            <button type="submit" className="btn btn-block btn-primary">Search Github</button>
          </div>
        </form>
      </div>
    )
  }
}

export default Search
