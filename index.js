var express = require("express");
var app = express();
app.listen(5000);
const movieRouter = require('./routes/movies')

app.use('/movies', movieRouter)
const users = [{id: 1, username:'John', auth: true}]

// const checkAuth = (req,res,next) =>{
//   let id = req.params.id
//   if(id){
//     users[id - 1].auth ? next() : res.status(400).json({Stauts: 400, message: 'Permission denied'})
//     console.log('middleware')
//   }else{
//     res.send('error')
//   }
// }



