import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import dotenv from 'dotenv'

dotenv.config()
const app = express();
const PORT =process.env.PORT || 3200;
app.use(express.json())
app.use(cookieParser())
app.use(cors())
import authRouter from './routers/auth.js';
import postsRouter from './routers/posts.js';
// import multer from "multer";

import ImageKit from 'imagekit';




const imagekit = new ImageKit({
  urlEndpoint: 'https://ik.imagekit.io/c9ufptlb9',
  publicKey: 'public_7RFZgYOyot8n5BfxVPlwgnV/kws=',
  privateKey: 'private_FSIzRJ6Dv4WNXZwchWKf+J3riT0='
});

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept");
  next();
});


app.get('/auth', function (req, res) {
  var result = imagekit.getAuthenticationParameters();
  res.send(result);
});

// const storage=multer.diskStorage({
//     destination:function(req,file,cb){
//         cb(null,'../client/public/postImages')
//     },
//     filename:function(req,file,cb){
//         cb(null,Date.now()+'.'+'jpg')
//     }
// })

// const upload=multer({storage:storage})

// app.post('/api/upload',upload.single('file'),function (req,res){
//     let file=req.file;
//     res.status(200).json(file)
// })

app.use('/api/auth', authRouter);
app.use('/api/posts', postsRouter);


app.listen(PORT, () => {
  console.log(`server is running on port number: ${PORT}`)
})