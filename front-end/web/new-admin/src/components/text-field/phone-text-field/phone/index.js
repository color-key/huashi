
exports.checkTargetLocale = exports.check = void 0;

var _phone = require("./phone");
var checkTargetLocale = function checkTargetLocale(value) {
  var locale = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "CN";
  if (!_phone.phones[locale]) return true;
  return _phone.phones[locale].test(value);
};

exports.checkTargetLocale = checkTargetLocale;