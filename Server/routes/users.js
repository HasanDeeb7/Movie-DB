const express = require("express");
const router = express.Router();


const users = [{ id: 1, username: "John", password: 12345 }, {id:2, username: 'Josh', password: 6789}];


function CheckByUsername(username){
  return users.some(obj => obj.username == username)
}

router.use((req, res, next)=>{
  const auth = req.headers.authorization
  if(!auth){
    return res.status(403).json({message: 'Forbidden'})
  }
  const credentials = Buffer.from(auth.substring(6), 'base64').toString('ascii')
  const [username, password] = credentials.split(':')
  if(!CheckByUsername(username)){
    return res.status(403).json({message: 'Username doesn\'t exist'})
  }else{
    const object = users.find(obj =>{
      if(obj.username === username){return obj}
    })
    if(object.password == password){
      next()
    }else{
      return res.json({status: 403, message: 'check your credentials'})
    }
  }
})

module.exports = router