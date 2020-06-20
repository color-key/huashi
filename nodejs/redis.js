const request = require('request');
const fs = require('fs');
const path = require('path');

const appid = 'wxd3b42cce45afe0d0';
const secret = 'bb7e7d305eb1dadd8386e63fecb69ed2';

const login = ({code}) => {
  const data = "?appid="+appid+"&secret="+secret+"&js_code="+code+"&grant_type=authorization_code";
  return new Promise((resolve) => {
    request.get({url: 'https://api.weixin.qq.com/sns/jscode2session'+data}, function(error, response, body) {
      if (!error && response.statusCode == 200) {
        const res = JSON.parse(body);
        const openid = res.openid;
        resolve({success: true, openid});
      }else{
        resolve({success: false, error});
      }
    })
  })
}

module.exports = {
  save3DFiles
}