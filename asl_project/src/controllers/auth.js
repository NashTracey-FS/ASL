const express = require('express')
const router = express.Router()
const axios = require('axios')
const queryString = require('querystring')
const { LoginToken } = require('../models/index')


const client_id = "f9126f0ebd7e06020173"
const client_secret = "6681904f7f0371705350bb369cfc627477a268db"

router.get("/login", (req, res) => {
    res.render('auth/login')
  })
  
  router.get('/callback', async (req, res) => {
    const { code } = req.query
    const response = await axios.post('https://github.com/login/oauth/access_token', {
      code,
      client_id,
      client_secret
    })
    const { access_token } = queryString.parse(response.data)
    req.session.access_token = access_token
    const loginToken = await LoginToken.create({ token: access_token })
    res.redirect('http://localhost:3333?token=' + access_token)
  })
  
  router.get('/token', async (req, res) => {
    const token = await LoginToken.findOne({where: {
      token: req.headers.token
    }})
    if (token) {
      req.session.access_token = req.headers.token
      res.json(token)
    } else {
      res.json({ token: false })
    }
  })
  
  module.exports = router