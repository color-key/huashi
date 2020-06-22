const Koa = require('koa');
const router = require('koa-router')();
const bodyParser = require('koa-bodyparser');
const koaBody = require('koa-body');
const request = require('request');
const fs = require('fs');
const path = require('path');
const {save3DFiles} = require('./face');
const {addUser, getUserByOpenid, login, updUser} = require('./user');
const {addShoppingCar, getShoppingCar, addOrderNumber, getOrder} = require('./shopping-car');

const app = new Koa();
app.use(bodyParser());

router.post('/face', async (ctx, next) => {
  const face1 = ctx.request.body.face1;
  const face2 = ctx.request.body.face2;
  const face3 = ctx.request.body.face3;
  const userId = ctx.request.body.userId;
  const res = await save3DFiles({userId, face1, face2, face3});
  ctx.response.type = 'application/json';
  ctx.response.body = res;
});

router.post('/login', async (ctx, next) => {
  const code = ctx.request.body.code;
  const userInfo = ctx.request.body.userInfo;
  const res = await login({code, userInfo});
  ctx.response.type = 'application/json';
  ctx.response.body = res;
});

router.get('/test', async (ctx, next) => {
  ctx.response.body = `<h1>Hello World!</h1>`;
});

router.post('/user/add', async (ctx, next) => {
  const nickName = ctx.request.body.nickName;
  const avatarUrl = ctx.request.body.avatarUrl;
  const gender = ctx.request.body.gender;
  const country = ctx.request.body.country;
  const province = ctx.request.body.province;
  const city = ctx.request.body.city;
  const language = ctx.request.body.language;
  const openid = ctx.request.body.openid;
  const res = await addUser({nickName, avatarUrl, gender, country, province, city, language, openid});
  ctx.response.type = 'application/json';
  ctx.response.body = res;
});

router.post('/user/upd', async (ctx, next) => {
  const res = await updUser(ctx.request.body);
  ctx.response.type = 'application/json';
  ctx.response.body = res;
});

router.get('/user/getByOpenid/:openid', async (ctx, next) => {
  const { openid } = ctx.params
  const res = await getUserByOpenid(openid);
  ctx.response.type = 'application/json';
  ctx.response.body = res;
});

router.post('/shopping-car/add', async (ctx, next) => {
  const res = await addShoppingCar(ctx.request.body);
  ctx.response.type = 'application/json';
  ctx.response.body = res;
});

router.get('/shopping-car/:openid', async (ctx, next) => {
  const { openid } = ctx.params
  const res = await getShoppingCar(openid);
  ctx.response.type = 'application/json';
  ctx.response.body = res;
});

router.post('/order/add', async (ctx, next) => {
  const res = await addOrderNumber(ctx.request.body);
  ctx.response.type = 'application/json';
  ctx.response.body = res;
});

router.get('/order/:openid', async (ctx, next) => {
  const { openid } = ctx.params
  const res = await getOrder(openid);
  ctx.response.type = 'application/json';
  ctx.response.body = res;
});

app.use(router.routes());
app.listen(3000);
console.log('app started at port 3000...');