const fs = require('fs');
const path = require('path');
const {
  updShoppingCarOptometrySheet
} = require('./shopping-car');

const uploadFile = async (ctx) => {
  try{
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
    const shoppingCarRes = await updShoppingCarOptometrySheet({id: shoppingCarId, optometrySheet: shoppingCarId+'.'+type});
    return shoppingCarRes;
  }catch(error){
    return {success: false, error};
  }
  
}

module.exports = {
  uploadFile
}