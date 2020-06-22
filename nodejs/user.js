const request = require('request');
const fs = require('fs');
const path = require('path');
const {query} = require('./mysql');

const mysqlTable = "wx_user";
const appid = 'wxfdcd2b6f1795fdf2';
const secret = 'b2d4e3e742279f754273467f17a94fde';

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
  const sqls = [];
  sqls.push('UPDATE '+mysqlTable+' SET nickName="'+data.nickName+'", avatarUrl="'+data.avatarUrl+'", gender="'+data.gender+'", country="'+data.country+'", province="'+data.province+'", city="'+data.city+'", language="'+data.language+'" WHERE openid="'+data.openid+'"');
  const res = await query(sqls.join(';'));
  return res;
}

const getUserByOpenid = async (openid) => {
  const sql = 'SELECT * FROM '+mysqlTable+' WHERE `openid` = ?';
  const args = [openid];
  const res = await query(sql, args);
  return res;
}

module.exports = {
  addUser,
  updUser,
  getUserByOpenid,
  login
}