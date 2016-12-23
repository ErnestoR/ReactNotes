var axios = require('axios')

function getGithubHeaders() {
  return {
    headers : {
      'Authorization' : 'token 15de9519d673540dc5a3cd9b8f38f77309fc345a'
    }
  }
}

function getRepos(username) {
  return axios.get('https://api.github.com/users/' + username + '/repos', getGithubHeaders())
}

function getUserInfo(username) {

  return axios.get('https://api.github.com/users/' + username, getGithubHeaders())
}

var helpers = {
  getGithubInfo : function (username) {
    return axios
      .all([getRepos(username), getUserInfo(username)])
      .then(axios.spread((repos, userInfo) => {

        return {
          repos : repos.data,
          bio   : userInfo.data
        }
      }))
  }
}

module.exports = helpers
