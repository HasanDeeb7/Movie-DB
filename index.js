
var express = require("express");
var app = express();
app.listen(5000);
app.get("/test", (req, res) => {
  res.send({status: 200, message:'ok'});
});
app.get("/time", (req, res) => {
  const date = new Date()
  const hours = date.getHours()
  const seconds = date.getSeconds()
  res.status(200).json({status: 200, message:`${hours} : ${seconds}`});
});
app.get("/hello/:id?",(req, res) =>{
  const id = req.params.id || 'there'
  res.status(200).json({status: 200, message : `hello, ${id}`})
})
app.get('/search', (req,res) =>{
  if(req.query.s){
    res.status(200).json({status: 200, message: 'ok', data: req.query.s})
  }else{
    res.status(500).json({status:500, message: 'you should provide a search'})
  }
})

app.get('/movies/:route', (req,res)=>{
  route = req.params.route
  switch(route){
    case 'create':
      res.send({message:'create'})
      break;
    case 'read':
      res.status(200).json({status:200, data: movies})
      break;
    case 'update':
      res.send({message:'update'})
      break;
    case 'delete':
      res.send({message:'delete'})
      break;
    default:
      res.status(400).json({status:400, message: 'Bad request'})
  }
})
const movies = [
  { title: 'Jaws', year: 1975, rating: 8 },
  { title: 'Avatar', year: 2009, rating: 7.8 },
  { title: 'Brazil', year: 1985, rating: 8 },
  { title: 'الإرهاب والكباب‎', year: 1992, rating: 6.2 }
]