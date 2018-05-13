const bootstrap = require('couchdb-bootstrap')
const argv = require('yargs').argv
const configCDB = {}

const config = {
  'demo-message': {
    _design: {
      myapp: {
        views: {
          'count-channels': {
            map: function (doc) {
              emit(doc["|a"], null)
            },
            reduce: "_count"
          }
        }
      }
    }
  }
}

bootstrap({
    url: "http://s2.cgeosoft.com:5984",
    requestDefaults: {
      auth: {
        user: 'admin',
        pass: 'ubreza#5'
      }
    }
  },
  config,
  function (error, response) {
    if (error) {
      throw error
    }
    console.log(response)
  })
