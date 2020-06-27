const {query} = require('./mysql');
const {getQueryString} = require('./lib/query');
const moment = require('moment');
const shortid = require('shortid');
const crypto = require('crypto');

const mysqlTable = "manager";

const addManager = async (data) => {
  data.token = shortid.generate();
  const sql = 'INSERT INTO '+mysqlTable+' SET ?';
  const args = data;
  const res = await query(sql, args);
  return res;
}

const updPassword = async (data) => {
  const sql = 'UPDATE '+mysqlTable+' SET password="'+data.password+'" WHERE id="'+data.id+'" and password="'+data.oldPassword+'"';
  const res = await query(sql);
  return res;
}

const login = async (data) => {
  const hash = crypto.createHash('sha256');
  hash.update(data.password);
  const pwd = hash.digest('hex');
  console.log(pwd);
  const sql = 'SELECT id,username,creation_datetime,token FROM '+mysqlTable+' WHERE `username` = ? and `password` = ?';
  const args = [data.username, pwd];
  const res = await query(sql, args);
  return res;
}

const findManagerByToken = async (data) => {
  const sql = 'SELECT id,username,creation_datetime,token FROM '+mysqlTable+' WHERE `token` = ?';
  const args = [data.token];
  const res = await query(sql, args);
  return res;
}

const findManager = async (ctx) => {
  const username = getQueryString(ctx.request, 'username');
  const queryDataStr = ' username like "%'+username+'%"';
  const sql = 'SELECT id,username,creation_datetime FROM '+mysqlTable+' WHERE'+queryDataStr;
  const args = [];
  const res = await query(sql, args);
  if(res.success){
    res.result.map((item) => {
      item.creation_datetime = moment(item.creation_datetime).format('YYYY/MM/DD HH:mm');
    })
  }
  return res;
}

module.exports = {
  login,
  updPassword,
  addManager,
  findManager,
  findManagerByToken
}