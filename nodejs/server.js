const Koa = require('koa');
const router = require('koa-router')();
const bodyParser = require('koa-bodyparser');
const koaBody = require('koa-body');
const request = require('request');
const fs = require('fs');
const path = require('path');

const app = new Koa();
app.use(bodyParser());

router.post('/face', async (ctx, next) => {
  const face1 = ctx.request.body.face1;
  const face2 = ctx.request.body.face2;
  const face3 = ctx.request.body.face3;
  const userId = ctx.request.body.userId;
  console.log(face1);
  // console.log(face2);
  // console.log(face3);
  // let filePath = path.join(__dirname, 'public/upload/') + `/${file.name}`;
  // // 创建可写流
  // const upStream = fs.createWriteStream(filePath);
  // // 可读流通过管道写入可写流
  // reader.pipe(upStream);
  const form = {
    "api_key": "YD1bDeVM08o4KxxdMC3XXSgv9I-6jvIo",
    "api_secret": "-I4XVTxuEKMzuOmriXEyvjN_DEb-hvsb",
    "image_base64_1": face1,
    "image_base64_2": face2,
    "image_base64_3": face3,
    "texture": "1",
    "mtl": "1",
  };
  // formData.append("api_key", "YD1bDeVM08o4KxxdMC3XXSgv9I-6jvIo");
  // formData.append("api_secret", "-I4XVTxuEKMzuOmriXEyvjN_DEb-hvsb");
  // formData.append("image_base64_1", face1);
  // formData.append("image_base64_2", face2);
  // formData.append("image_base64_3", face3);
  // formData.append("texture", "1");
  // formData.append("mtl", "1");
  const res = await new Promise((resolve) => {
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
          resolve(true);
        } catch (error) {
          resolve({success: false, error});
        }
      }else{
        resolve({success: false, error});
      }
    })
  })
  ctx.response.type = 'application/json';
  ctx.response.body = res;
});

router.get('/test', async (ctx, next) => {
  ctx.response.body = `<h1>Hello World!</h1>`;
});

app.use(router.routes());
app.listen(3000);
console.log('app started at port 3000...');