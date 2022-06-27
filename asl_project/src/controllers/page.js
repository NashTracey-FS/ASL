const express = require('express')
const pageCtrl = express.Router()
const { Question } = require('../model')

pageCtrl.use('/', async (request, response) => {
    response.render('pages/home')

})

module.exports = pageCtrl