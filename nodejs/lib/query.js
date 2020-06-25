/**
* 获取传递的参数
* @param {string}name -参数名
* @returns {*} -返回参数值或者null
*/
const getQueryString = (req, name) => {
  const url = req.url;
  const search = req.url.substr(url.indexOf('?'));
  const reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i');
  const r = search.substr(1).match(reg);
  if (r !== null) {return decodeURI(r[2]);} return null;
}

module.exports = {
  getQueryString
}
