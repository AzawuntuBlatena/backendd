const multer  = require('multer')
const path=require('path');
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'uploads/')
    },
    filename: function (req, file, cb) {
      let ext =path.extname(file.originalname)
      cb(null, Date.now() + ext)
    }
  })
  
  const upload = multer({ 
    storage: storage,
    fileFilter:function(req,file,callback){
        if( file.mimetype == "application/pdf" ||  file.mimetype == "image/jpeg" ||  file.mimetype == "image/png")
        {
            callback(null,true)
        }
        else{
            console.log(file.mimetype);
            callback(null,false); 
        }
        console.log(file);
    },
    // limits:{
    //     fileSize:1024 * 1024 * 2
    // }
})
module.exports=upload