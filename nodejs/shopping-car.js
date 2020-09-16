const {query, multipleQuery} = require('./mysql');
const fs = require('fs');
const path = require('path');
const shortid = require('shortid');
const moment = require('moment');
const {getQueryString} = require('./lib/query');

const mysqlTable = "shopping_cart";

const saveFiles = (openid, id) => {
  const storePath = path.join(__dirname, 'public/face/'+openid);
  const targetPath = path.join(__dirname, 'public/face/'+id);
  fs.mkdirSync(targetPath);
  let gltfPath = path.join(storePath, 'face.gltf');
  let objPath = path.join(storePath, 'face.obj');
  let mtlPath = path.join(storePath, 'face.mtl');
  let jpgPath = path.join(storePath, 'tex.jpg');
  let face1Path = path.join(storePath, 'face1');
  let face2Path = path.join(storePath, 'face2');
  let face3Path = path.join(storePath, 'face3');

  let gltfTargetPath = path.join(targetPath, 'face.gltf');
  let objTargetPath = path.join(targetPath, 'face.obj');
  let mtlTargetPath = path.join(targetPath, 'face.mtl');
  let jpgTargetPath = path.join(targetPath, 'tex.jpg');
  let face1TargetPath = path.join(targetPath, 'face1');
  let face2TargetPath = path.join(targetPath, 'face2');
  let face3TargetPath = path.join(targetPath, 'face3');
  
  if(fs.existsSync(gltfPath)) fs.copyFileSync(gltfPath, gltfTargetPath);
  fs.copyFileSync(objPath, objTargetPath);
  fs.copyFileSync(mtlPath, mtlTargetPath);
  fs.copyFileSync(jpgPath, jpgTargetPath);
  fs.copyFileSync(face1Path, face1TargetPath);
  if(fs.existsSync(face2Path)) fs.copyFileSync(face2Path, face2TargetPath);
  if(fs.existsSync(face3Path)) fs.copyFileSync(face3Path, face3TargetPath);
}

const addShoppingCar = async (data) => {
  const openid = data.openid;
  const sql = 'INSERT INTO '+mysqlTable+' SET ?';
  const args = {
    "creation_datetime": new Date(),
    "active_flag": 0,
    "deleted_flag": 0,
    "update_datetime": new Date(),
    "axial_left": data.axialLeft,
    "axial_right": data.axialRight,
    "cyl_mirror_left": data.cylMirrorLeft,
    "cyl_mirror_right": data.cylMirrorRight,
    "frame_model": data.frameModel,
    "gender": data.gender,
    "interpupillary_distance": data.interpupillaryDistance,
    "mobile": data.mobile,
    "name": data.name,
    "point_pupil_left": data.pointPupilLeft,
    "point_pupil_right": data.pointPupilRight,
    "prism_left": data.prismLeft,
    "prism_right": data.prismRight,
    "remark": data.remark,
    "wx_user_id": openid,
    "optometry_sheet": false,
  };
  const res = await query(sql, args);
  if(res.success){
    const id = res.result.insertId;
    console.log(id);
    saveFiles(openid, id);
  }
  return res;
}

const updShoppingCar = async (data) => {
  const sql = 'UPDATE '+mysqlTable+' SET ?'+' WHERE id='+data.id;
  const args = {
    "update_datetime": new Date(),
    "axial_left": data.axialLeft,
    "axial_right": data.axialRight,
    "cyl_mirror_left": data.cylMirrorLeft,
    "cyl_mirror_right": data.cylMirrorRight,
    "frame_model": data.frameModel,
    "gender": data.gender,
    "interpupillary_distance": data.interpupillaryDistance,
    "mobile": data.mobile,
    "name": data.name,
    "point_pupil_left": data.pointPupilLeft,
    "point_pupil_right": data.pointPupilRight,
    "prism_left": data.prismLeft,
    "prism_right": data.prismRight,
    "remark": data.remark,
    "optometry_sheet": data.optometrySheet,
  };
  const res = await query(sql, args);
  return res;
}

const getShoppingCar = async (openid) => {
  const sql = 'SELECT * FROM '+mysqlTable+' WHERE `wx_user_id` = ? and order_no is null order by creation_datetime desc';
  const args = [openid];
  const res = await query(sql, args);
  return res;
}

const getShoppingCarById = async (id) => {
  const sql = 'SELECT * FROM '+mysqlTable+' WHERE `id` = ? and order_no is null order by creation_datetime desc';
  const args = [id];
  const res = await query(sql, args);
  return res;
}

const removeShoppingCar = async (data) => {
  const sql = 'DELETE FROM '+mysqlTable+' WHERE `id` = ?';
  const args = [data.id];
  const res = await query(sql, args);
  return res;
}

const getOrder = async (openid, ctx) => {
  const orderNo = getQueryString(ctx.request, 'orderNo') || '';
  const username = getQueryString(ctx.request, 'username') || '';
  const queryDataStr = ' and order_no like "%'+orderNo+'%" and name like "%'+username+'%"';
  let sql, args;
  if(openid === 'find'){
    sql = 'SELECT * FROM '+mysqlTable+' WHERE order_no is not null';
    args = [];
  }else{
    sql = 'SELECT * FROM '+mysqlTable+' WHERE `wx_user_id` = ? and order_no is not null';
    args = [openid];
  }
  const orderQueryString = ' order by creation_datetime desc';
  const res = await query(sql+queryDataStr+orderQueryString, args);
  if(res.success){
    res.result.map((item) => {
      item.creation_datetime = moment(item.creation_datetime).format('YYYY/MM/DD HH:mm');
    })
  }
  return res;
}

const addOrderNumber = async (data) => {
  const ids = data.ids.split(',');
  const address = data.address;
  const sqls = [];
  ids.map((id) => {
    sqls.push('UPDATE '+mysqlTable+' SET order_no="'+shortid.generate()+'", address=\''+address+'\' WHERE id='+id);
  })
  const res = await multipleQuery(sqls.join(';'));
  return res;
}

const updOrderStatus = async (data) => {
  const sql = 'UPDATE '+mysqlTable+' SET status="'+data.status+'" WHERE id='+data.id;
  const res = await query(sql);
  return res;
}

const updOrderLogisticsNo = async (data) => {
  const sql = 'UPDATE '+mysqlTable+' SET status="SEND", logistics_no="'+data.logistics_no+'" WHERE id='+data.id;
  const res = await query(sql);
  return res;
}

module.exports = {
  addShoppingCar,
  getShoppingCar,
  getShoppingCarById,
  addOrderNumber,
  getOrder,
  updShoppingCar,
  updOrderStatus,
  removeShoppingCar,
  updOrderLogisticsNo
}