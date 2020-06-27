const request = require('request');
const fs = require('fs');
const path = require('path');
const archiver = require('archiver');

const errors = {
  'IMAGE_ERROR_UNSUPPORTED_FORMAT: image_base64_1': '正脸的图像无法解析',
  'IMAGE_ERROR_UNSUPPORTED_FORMAT: image_base64_2': '左脸的图像无法解析',
  'IMAGE_ERROR_UNSUPPORTED_FORMAT: image_base64_3': '右脸的图像无法解析',
  'INVALID_IMAGE_SIZE: image_base64_1': '正脸的图像尺寸不符合',
  'INVALID_IMAGE_SIZE: image_base64_2': '左脸的图像尺寸不符合',
  'INVALID_IMAGE_SIZE: image_base64_3': '右脸的图像尺寸不符合',
  'INVALID_IMAGE_URL': '上传的图像文件无法解析',
  'IMAGE_FILE_TOO_LARGE: image_base64_1': '正脸的图像文件太大，不能超过2M',
  'IMAGE_FILE_TOO_LARGE: image_base64_2': '左脸的图像文件太大，不能超过2M',
  'IMAGE_FILE_TOO_LARGE: image_base64_3': '右脸的图像文件太大，不能超过2M',
  'IMAGE_DOWNLOAD_TIMEOUT': '上传图片超时',
  'NO_FACE_FOUND: image_base64_1': '没有检测到正脸',
  'NO_FACE_FOUND: image_base64_2': '没有检测到左脸',
  'NO_FACE_FOUND: image_base64_3': '没有检测到右脸',
  'MULTIPLE_FACE_FOUND: image_base64_1': '正脸的图像中出现多个人脸',
  'MULTIPLE_FACE_FOUND: image_base64_2': '左脸的图像中出现多个人脸',
  'MULTIPLE_FACE_FOUND: image_base64_3': '右脸的图像中出现多个人脸',
  '': '人脸识别失败'
};

const save3DFiles = ({userId, face1, face2, face3}) => {
  const form = {
    "api_key": "oJLTb2ldY2YJK_HhtQR_l56ktD15dz6S",
    // "api_key": "YD1bDeVM08o4KxxdMC3XXSgv9I-6jvIo",
    "api_secret": "B6FtoG4LjPnrgCdvokKNsmEjovZH82KB",
    // "api_secret": "-I4XVTxuEKMzuOmriXEyvjN_DEb-hvsb",
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
          let objPath = path.join(basePath, '/face.obj');
          let mtlPath = path.join(basePath, '/face.mtl');
          let jpgPath = path.join(basePath, '/tex.jpg');
          let face1Path = path.join(basePath, '/face1');
          let face2Path = path.join(basePath, '/face2');
          let face3Path = path.join(basePath, '/face3');
          if(fs.existsSync(basePath)){
            console.log(1);
            if(fs.existsSync(objPath)) fs.unlinkSync(objPath);
            if(fs.existsSync(mtlPath)) fs.unlinkSync(mtlPath);
            if(fs.existsSync(jpgPath)) fs.unlinkSync(jpgPath);
            if(fs.existsSync(face1Path)) fs.unlinkSync(face1Path);
            if(fs.existsSync(face2Path)) fs.unlinkSync(face2Path);
            if(fs.existsSync(face3Path)) fs.unlinkSync(face3Path);
          }else{
            fs.mkdirSync(basePath);
          }
          fs.writeFileSync(objPath, Buffer.from(obj_file, 'base64'));
          fs.writeFileSync(mtlPath, Buffer.from(mtl_file, 'base64'));
          fs.writeFileSync(jpgPath, Buffer.from(texture_img, 'base64'));
          fs.writeFileSync(face1Path, Buffer.from(face1, 'base64'));
          fs.writeFileSync(face2Path, Buffer.from(face2, 'base64'));
          fs.writeFileSync(face3Path, Buffer.from(face3, 'base64'));
          resolve({success: true, error});
        } catch (error) {
          resolve({success: false, error: errors['']});
        }
      }else{
        const err = JSON.parse(body);
        resolve({success: false, error: errors[err.error_message]||errors['']});
      }
    })
  })
}

const archiver3DFiles = (id) => {
  return new Promise((resolve) => {
    const name1 = 'face.obj';
    const name2 = 'face.mtl';
    const name3 = 'tex.jpg';
    const name4 = 'face1';
    const name5 = 'face2';
    const name6 = 'face3';
    const targetPath = path.join(__dirname, 'public/face/'+id);
    const targetPath1 = path.join(targetPath, '/'+name1);
    const targetPath2 = path.join(targetPath, '/'+name2);
    const targetPath3 = path.join(targetPath, '/'+name3);
    const targetPath4 = path.join(targetPath, '/'+name4);
    const targetPath5 = path.join(targetPath, '/'+name5);
    const targetPath6 = path.join(targetPath, '/'+name6);
    const output = fs.createWriteStream(targetPath + '/face.zip');
    const archive = archiver('zip', {
      zlib: { level: 9 } // Sets the compression level.
    });
    output.on('close', function() {
      console.log(archive.pointer() + ' total bytes');
      console.log('archiver has been finalized and the output file descriptor has closed.');
      resolve({success: true});
    });
    output.on('end', function() {
      console.log('Data has been drained');
      resolve({success: false});
    });
    archive.on('warning', function(err) {
      if (err.code === 'ENOENT') {
      } else {
        resolve({success: false, err});
      }
    });
    
    archive.on('error', function(err) {
      resolve({success: false, err});
    });
    archive.pipe(output);
    archive.append(fs.createReadStream(targetPath1), { name: name1 });
    archive.append(fs.createReadStream(targetPath2), { name: name2 });
    archive.append(fs.createReadStream(targetPath3), { name: name3 });
    archive.append(fs.createReadStream(targetPath4), { name: name4 });
    archive.append(fs.createReadStream(targetPath5), { name: name5 });
    archive.append(fs.createReadStream(targetPath6), { name: name6 });
    archive.finalize();
  })
}

module.exports = {
  save3DFiles,
  archiver3DFiles
}