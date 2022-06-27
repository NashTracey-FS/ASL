const { LoginToken } = require('../models/index')

const isAuthenticated = async (request,response,next)=>{
  if(typeof request.headers.token !== "undefined"){
    const token = await LoginToken.findeOne({
        where:{token: request.headers.token}
    })
    if (token){
        next()
        return
    }
  }

  if(typeof request.session.access_token !== "undefined"){
    next()
    return
  }
  response.send('Log In First!')
}
  module.exports = isAuthenticated