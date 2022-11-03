const express = require('express');
const app = express();
const multer = require('multer');
const { formatWithOptions } = require('util');

app.set('view engine','pug');
app.set('views','./views');
app.use(express.json())

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './public/uploads/')
    },
    filename: function (req, file, cb) {
      cb(null, file.originalname )
    }
  })
const upload = multer({ storage: storage })

app.get('/api',async (req,res,next)=>{
    res.render('./form',{
        title : "form",
        path : './form'
    })
})
app.post('/api/fileanalyse',upload.single('file'),async (req,res,next)=>{
  res.send({
    name : req.file.originalname,
    type : req.file.mimetype,
    size : req.file.size
})
})




app.listen(3080,()=>{
    console.log('server is on')
})