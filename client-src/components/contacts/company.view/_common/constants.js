(function () {
  'use strict'

  angular
        .module('app.contacts')
        .constant('CompanyTabs', [{
          heading: {
            icon: 'bars',
            title: 'Overview'
          },
          route: 'app.contacts.company.overview'
        }, {
          heading: {
            icon: 'money',
            class: 'hidden-xs',
            title: 'Transactions'
          },
          route: 'app.contacts.company.transactions'
        }, {
          heading: {
            icon: 'files-o',
            class: 'hidden-xs',
            title: 'Files'
          },
          route: 'app.contacts.company.files'
        }, {
          heading: {
            icon: 'map-o',
            class: 'hidden-xs',
            title: 'Map'
          },
          route: 'app.contacts.company.map'
        }])
}())
