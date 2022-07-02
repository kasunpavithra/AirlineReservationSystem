const multer=require('multer')
const path=require('path')
const storage=multer.diskStorage({
    destination:(req,file,callback)=>{
        callback(null,'../client/src/images')
    },
    filename: (req,file,callback)=>{
        callback(null,file.fieldname+'-'+Date.now()+path.extname(file.originalname))
    }

})
const upload = multer({storage:storage})

module.exports =upload