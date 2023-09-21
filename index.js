
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