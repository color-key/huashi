const request = require('request');
const fs = require('fs');
const path = require('path');
const {query} = require('./mysql');
const {getQueryString} = require('./lib/query');
const moment = require('moment');

const mysqlTable = "wx_user";
//天蕾测试
// const appid = 'wxfdcd2b6f1795fdf2';
// const secret = 'b2d4e3e742279f754273467f17a94fde';
//huashi
const appid = 'wx299ba757572dbc41';
const secret = '0121eb22da01c16b491f4e1ee0147d4e';

const login = ({code, userInfo}) => {
  const data = "?appid="+appid+"&secret="+secret+"&js_code="+code+"&grant_type=authorization_code";
  return new Promise((resolve) => {
    request.get({url: 'https://api.weixin.qq.com/sns/jscode2session'+data}, function(error, response, body) {
      if (!error && response.statusCode == 200) {
        const res = JSON.parse(body);
        const openid = res.openid;
        userInfo.openid = openid;
        console.log(body, response);
        getUserByOpenid(openid).then(getUserByOpenidRes => {
          if(getUserByOpenidRes.success){
            const data = getUserByOpenidRes.result[0];
            if(data){
              updUser(userInfo).then(updUserRes => {
                if(updUserRes.success){
                  resolve({success: true, result: {openid}});
                }else{
                  resolve(updUserRes);
                }
              })
            }else{
              addUser(userInfo).then(addUserRes => {
                if(addUserRes.success){
                  resolve({success: true, result: {openid}});
                }else{
                  resolve(addUserRes);
                }
              })
            }
          }else{
            resolve(getUserByOpenidRes);
          }
        });
      }else{
        resolve({success: false, result: undefined, error});
      }
    })
  })
}

const addUser = async (data) => {
  const sql = 'INSERT INTO '+mysqlTable+' SET ?';
  const args = data;
  const res = await query(sql, args);
  return res;
}

const updUser = async (data) => {
  const sql = 'UPDATE '+mysqlTable+' SET nickName="'+data.nickName+'", avatarUrl="'+data.avatarUrl+'", gender="'+data.gender+'", country="'+data.country+'", province="'+data.province+'", city="'+data.city+'", language="'+data.language+'" WHERE openid="'+data.openid+'"';
  const res = await query(sql);
  return res;
}

const updUserStatus = async (data) => {
  const sql = 'UPDATE '+mysqlTable+' SET status="'+data.status+'" WHERE id="'+data.id+'"';
  const res = await query(sql);
  return res;
}

const updUserAddress = async (data) => {
  const telNumber = JSON.parse(data.address).telNumber;
  const sql = 'UPDATE '+mysqlTable+' SET address=\''+data.address+'\', mobile=\''+telNumber+'\' WHERE openid="'+data.id+'"';
  const res = await query(sql);
  return res;
}

const getUserByOpenid = async (openid) => {
  const sql = 'SELECT * FROM '+mysqlTable+' WHERE `openid` = ?';
  const args = [openid];
  const res = await query(sql, args);
  return res;
}

const getUser = async (ctx) => {
  const nickName = getQueryString(ctx.request, 'nickName');
  const queryDataStr = ' nickName like "%'+nickName+'%"';
  const sql = 'SELECT * FROM '+mysqlTable+' WHERE'+queryDataStr;
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
  addUser,
  updUser,
  updUserStatus,
  getUserByOpenid,
  login,
  getUser,
  updUserAddress
}