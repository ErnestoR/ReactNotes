var React  = require('react')
var Router = require('react-router')

var Search = React.createClass({
  mixins : [Router.History],

  setRef       : function (ref) {
    this.usernameRef = ref
  },
  handleSubmit : function () {
    var newSearch = this.usernameRef.value

    //clear textfield
    this.usernameRef.value = '';

    this.history
      .pushState(null, '/profile/' + newSearch)
  },
  render       : function () {
    return (
      <div className="col-sm-12">
        <form onSubmit={this.handleSubmit}>
          <div className="form-group col-sm-7">
            <input type="text" className="form-control" ref={this.setRef}/>
          </div>
          <div className="form-group col-sm-5">
            <button type="submit" className="btn btn-block btn-primary">Search Github</button>
          </div>
        </form>
      </div>
    )
  }
})

module.exports = Search;
