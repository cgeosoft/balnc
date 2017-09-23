const blncCore = require("blnc-main-core")
const blncConfig = require("blnc-main-config")
const blncStorage = require("blnc-main-storage")
const blncAccounts = require("blnc-main-accounts")
const express = require('express')
const path = require('path')
const app = express()

app.get('/', function (req, res) {
    res.sendFile(blncCore.views.main)
    console.log(blncCore.views.main)
})

app.listen(3000, function () {
    console.log('Example app listening on port 3000!')
})