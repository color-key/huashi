/**
 * Create by fay on 5/18/20 11:07 下午
 */
var currentIsPcPath = window.location.pathname.startsWith("/pc");
if (navigator.userAgent.match(/(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i)) {
  if (currentIsPcPath) {
    window.location.href = '/m';
  }
} else {
  if (!currentIsPcPath) {
    window.location.href = 'http://www.tianlad.com/';
  }
}