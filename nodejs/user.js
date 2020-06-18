const request = require('request');
const fs = require('fs');
const path = require('path');
const {query} = require('./mysql');

const mysqlTable = "wx_user";
const appid = 'wxd3b42cce45afe0d0';
const secret = 'bb7e7d305eb1dadd8386e63fecb69ed2';

const login = ({code, userInfo}) => {
  const data = "?appid="+appid+"&secret="+secret+"&js_code="+code+"&grant_type=authorization_code";
  return new Promise((resolve) => {
    request.get({url: 'https://api.weixin.qq.com/sns/jscode2session'+data}, function(error, response, body) {
      if (!error && response.statusCode == 200) {
        const res = JSON.parse(body);
        const openid = res.openid;
        userInfo.openid = openid;
        getUserByOpenid(openid).then(getUserByOpenidRes => {
          if(getUserByOpenidRes.success){
            const data = getUserByOpenidRes.result[0];
            if(data){
              resolve({success: true, result: {openid}});
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

const getUserByOpenid = async (openid) => {
  const sql = 'SELECT * FROM '+mysqlTable+' WHERE `openid` = ?';
  const args = [openid];
  const res = await query(sql, args);
  return res;
}

module.exports = {
  addUser,
  getUserByOpenid,
  login
}