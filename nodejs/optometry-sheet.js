const fs = require('fs');
const path = require('path');

const uploadFile = (ctx) => {
  const shoppingCarId = ctx.request.body.shoppingCarId;
  const file = ctx.request.files.file;
  const arr = file.type.split('/');
  const type = arr[arr.length - 1];
  const basePath = path.join(__dirname, 'public/optometry-sheet');
  const filePath = path.join(basePath, '/'+shoppingCarId+'.'+type);
  if(fs.existsSync(basePath)){
    if(fs.existsSync(filePath)) fs.unlinkSync(filePath);
  }else{
    fs.mkdirSync(basePath);
  }
  const reader = fs.createReadStream(file.path);
  const upStream = fs.createWriteStream(filePath);
  reader.pipe(upStream);
}

module.exports = {
  uploadFile
}