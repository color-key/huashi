const {query} = require('./mysql');

const mysqlTable = "wx_user";

const addUser = async (data) => {
  const sql = 'INSERT INTO '+mysqlTable+' (nickName, avatarUrl, gender, country, province, city, language, openid) VALUES (?,?,?,?,?,?,?,?)';
  const args = [data.nickName, data.avatarUrl, data.gender, data.country, data.province, data.city, data.language, data.openid];
  const res = await query(sql, args);
  console.log(res);
}

addUser({
  "nickName": "123",
  "avatarUrl": "123123",
  "gender": "123123",
  "country": "123123",
  "province": "123123",
  "city": "123123",
  "language": "123123",
  "openid": "1231231"
});