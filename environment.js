var _Environments = {
    production:  {BASE_URL: 'https://fast-bastion-78079.herokuapp.com', API_KEY: ''},
    staging:     {BASE_URL: 'http://localhost:3000', API_KEY: ''},
    development: {BASE_URL: 'http://localhost:3000', API_KEY: ''},
}

function getEnvironment() {
    if(process.env.NODE_ENV=="development"){
      return _Environments['development']
    }
    else {
      return _Environments['production']
    }
}

var Environment = getEnvironment()
module.exports = Environment
