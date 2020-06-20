const request = require('request');
const fs = require('fs');
const path = require('path');

const save3DFiles = ({userId, face1, face2, face3}) => {
  const form = {
    "api_key": "YD1bDeVM08o4KxxdMC3XXSgv9I-6jvIo",
    "api_secret": "-I4XVTxuEKMzuOmriXEyvjN_DEb-hvsb",
    "image_base64_1": face1,
    "image_base64_2": face2,
    "image_base64_3": face3,
    "texture": "1",
    "mtl": "1",
  };
  return new Promise((resolve) => {
    request.post({url:'https://api-cn.faceplusplus.com/facepp/v1/3dface', form}, function(error, response, body) {
      if (!error && response.statusCode == 200) {
        try {
          const storePath = path.join(__dirname, 'public/face');
          if(!fs.existsSync(storePath)){
            fs.mkdirSync(storePath);
          }
          const basePath = path.join(__dirname, 'public/face/'+userId);
          const res = JSON.parse(body);
          const obj_file = res.obj_file;
          const mtl_file = res.mtl_file;
          const texture_img = res.texture_img;
          let objPath = path.join(basePath, 'face.obj');
          let mtlPath = path.join(basePath, 'face.mtl');
          let jpgPath = path.join(basePath, 'tex.jpg');
          // console.log(filePath);
          // fs.readdirSync(basePath);
          if(fs.existsSync(basePath)){
            if(fs.existsSync(objPath)) fs.unlinkSync(objPath);
            if(fs.existsSync(mtlPath)) fs.unlinkSync(mtlPath);
            if(fs.existsSync(jpgPath)) fs.unlinkSync(jpgPath);
          }else{
            fs.mkdirSync(basePath);
          }
          // const upStream = fs.createWriteStream(filePath);
          fs.writeFileSync(objPath, Buffer.from(obj_file, 'base64'));
          fs.writeFileSync(mtlPath, Buffer.from(mtl_file, 'base64'));
          fs.writeFileSync(jpgPath, Buffer.from(texture_img, 'base64'));
          resolve({success: true, error});
        } catch (error) {
          resolve({success: false, error});
        }
      }else{
        resolve({success: false, error});
      }
    })
  })
}

module.exports = {
  save3DFiles
}