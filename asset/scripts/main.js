
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
  var hm = document.createElement("script");
  hm.src = "https://hm.baidu.com/hm.js?dc2a1a0f208fdb13266eebc8b6278cb3";
  var s = document.getElementsByTagName("script")[0]; 
  s.parentNode.insertBefore(hm, s);
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
  var localS = window.localStorage;
  var routePath = window.location.pathname;
  var queryParams = window.location.search;
  //第一次进入没有设置过语言环境，选用浏览器的语言
  if( localS.getItem('lang') == null || localS.getItem('lang') == "" ){
	  var lang = window.navigator.language || window.navigator.browserLanguage ;
	  localS.setItem('lang', lang);
  } else {
	  var lang = localS.getItem('lang');
  }
  //判断语言类型
  var isZhReg = /zh/i;
  var isZhLang = false;
  if(isZhReg.test(lang)){
	  isZhLang = true;
  }

  
  //判断路径类型
  var routeIsEn = routePath.indexOf('/en') !== -1 || queryParams.indexOf('language=en') !== -1;
  //博客详情页不做自动跳转
  var isBlogDetailReg = /\d[1-9]/;
  if(isBlogDetailReg.test(routePath) ){
	  return;
  }
  
  if(isZhLang && routeIsEn){  //中文语言环境 又输入的是英文路径
	  //博客页面地址需要单独处理
	  if (routePath.indexOf('/en/blog') == -1){
		  location_path = routePath.replace("/en", '');
		  if( location_path == ""){
			  location_path = "/";
		  }
		  window.location = location_path ;
	  }else{
		  window.location = routePath.replace('/en/blog', '/category/blog');
	  }
  }else if( !isZhLang && !routeIsEn ){ //英文语言环境 又输入的是中文路径
	  //博客页面地址需要单独处理,博客详情页面不跳转
	  if (routePath.indexOf('/category/blog') == -1 ){
		  window.location = '/en' + routePath;
	  }else if(routePath.indexOf('/category/blog') !== -1){
		  window.location = routePath.replace('/category/blog','/en/blog');
	  }
  }

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