(function() {
    'use strict';

    angular
        .module('app.invoices')
        .controller("InvoicesInvoiceController", InvoicesInvoiceController);

    /* @ngInject */
    function InvoicesInvoiceController() {
        var vm = this;

        activate();

        function activate() {
            vm.news = _.sortBy([{
                "date": "2015-01-01",
                "content": "Tempor ut qui non mollit qui.",
                "title": "ea enim veniam laboris ullamco",
                "url": "http://google.com"
            }, {
                "date": "2015-01-01",
                "content": "Officia id nulla nulla id ipsum minim.",
                "title": "cillum aute deserunt labore est",
                "url": "http://google.com"
            }, {
                "date": "2015-01-01",
                "content": "Ullamco ut voluptate aliqua laboris nostrud.",
                "title": "velit occaecat adipisicing tempor sit",
                "url": "http://google.com"
            }, {
                "date": "2015-01-01",
                "content": "Ipsum nisi non adipisicing ex aute veniam.",
                "title": "non do ipsum et cillum",
                "url": "http://google.com"
            }], 'date');
        }


    }

}());
