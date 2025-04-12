//Upload ảnh lên online
const cloudinary = require('cloudinary').v2;
const streamifier = require('streamifier');

cloudinary.config({
    cloud_name: "dxskot1nf",
    api_key: "147625819752181",
    api_secret: "-WZOSG_T3ncgbjAXQnIzvLUUWFQ"
})


module.exports.uploadonline = (req, res, next)=>{
    if(req.file){
    let streamUpload = (req) => {
        return new Promise((resolve, reject) => {
            let stream = cloudinary.uploader.upload_stream(
                (error, result) => {
                if (result) {
                    resolve(result);
                } else {
                    reject(error);
                }
                }
            );
            streamifier.createReadStream(req.file.buffer).pipe(stream);
        });
    };

    async function upload(req) {
        let result = await streamUpload(req);
        console.log(result.url);
        req.body[req.file.fieldname] = result.url;
        next();
    }
    upload(req);
    }
    else{
    next();            
    }
}
  