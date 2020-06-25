const {findManagerByToken} = require('./manager');

const auth = async (ctx, callback) => {
  let authed = false;
  if(ctx.request.header.cookie){
    const cookieArr = ctx.request.header.cookie.split(';');
    const hasUser = cookieArr.filter(item => item.trim().indexOf('current-user=')===0);
    if(hasUser.length>0){
      const userEncode = hasUser[0].trim().substr('current-user='.length);
      const user = JSON.parse(decodeURIComponent(userEncode));
      const res = await findManagerByToken({token: user.token});
      if(res.success && res.result[0]){
        authed = true;
      }
    }
  }
  // if(authed){
  //   callback(ctx);
  // }else{
  //   // ctx.response.status = 401;
  //   ctx.response.type = 'application/json';
  //   ctx.response.body = {};
  // }
  return authed;
}

module.exports = {
  auth
}
