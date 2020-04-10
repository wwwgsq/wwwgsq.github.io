
/**
 * 判断是否为移动端
 */
function isInMobile() {
  return /Android|webOS|iPhone|iPod|BlackBerry/i.test(window.navigator.userAgent);
}

/**
 * 添加百度统计
 */
var _hmt = _hmt || [];
(function() {
})();

/**
 * 在某些页面，头部导航栏不需要跟随页面滚动。
 */
(function() {
  var pathName = window.location.pathname.slice(1);
  var noStickHeaderReg = /(products|creator|cocos2dx|3d)/i;
  var navbar = document.getElementById('cocos-header-navbar')
  
  if(pathName && noStickHeaderReg.test(pathName)) {
    navbar.className = navbar.className.replace('navbar-sticky', '')
  }
})();

/**
 * 检测英文版跳转
 */
(function() {

})();

/**
 * 移动端替换图片
 */
;(function() {
  var isMobile = isInMobile();
  var imgs;
  var mobileHeight;

  if(isMobile) {
    imgs = document.querySelectorAll('.has-mobile');

    for(var i = 0; i < imgs.length; i++) {
      mobileHeight = imgs[i].getAttribute('data-mobile-height');
      if(mobileHeight) {
        imgs[i].style.height = mobileHeight;
      }
    }
  }
})();

/**
 * 延迟加载，将图片的src改为data-src
 */
// ;(function() {
//   var imgList = document.querySelectorAll('.lazyLoadImg img')
//   var imgItem;
  
//   for(var i = 0; i < imgList.length; i++) {
//     imgItem = imgList[i];
//     imgItem.setAttribute('data-src', imgItem.getAttribute('src'));
//     imgItem.setAttribute('src', '');
//   }
// })();

/**
 * 联系我们中的下拉框保持和输入框间距一致，但是原生输入框和移动框有点区别，所以替换一下
 */

;(function() {
  var isMobile = isInMobile();
  var selectorDom = document.querySelectorAll('.form-control.select');

  if(isMobile) {
      selectorDom.forEach(function(selector, index) {
        selector.className = selector.className + ' is-mobile';
      })
  }
})();