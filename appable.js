(function(module) {
	if(typeof define === 'function' && define.amd) {
		define(module);
	} else {
		window.Appable = module();
	}
}(function() {
	var self = this,
		ua = navigator.userAgent,
		IS_IPAD = ua.match(/iPad/i) != null,
		IS_IPHONE = !IS_IPAD && ((ua.match(/iPhone/i) != null) || (ua.match(/iPod/i) != null)),
		IS_IOS = IS_IPAD || IS_IPHONE,
		IS_ANDROID = !IS_IOS && ua.match(/Android/i) != null,
		IS_BLACKBERRY = ua.match(/BlackBerry/i),
		IS_OPERAMINI = ua.match(/Opera Mini/i),
		IS_WINDOWMOBILE = ua.match(/IEMobile/i),
		IS_MOBILE = IS_IOS || IS_ANDROID || IS_BLACKBERRY || IS_OPERAMINI || IS_WINDOWMOBILE,
		IS_APPABLE = IS_IOS || IS_ANDROID,
		IS_CHROME = ua.match(/Chrome/i),
		IS_FIREFOX = ua.match(/Firefox/i),
		fired = false;
		
	return {
			isMobile: IS_MOBILE,
			isiOS: IS_IOS,
			isAndroid: IS_ANDROID,
			isFirefox: IS_FIREFOX,
			isChrome: IS_CHROME,
			appable: function(callback) {
				if(!fired && (IS_IOS || IS_ANDROID)) {
					fired = true;
					callback();
				}
				
				return this;
			},
			notAppable: function(callback) {
				if(!fired && !(IS_IOS || IS_ANDROID) && IS_MOBILE) {
					fired = true;
					callback();
				}
				
				return this;
			},
			mobile: function(callback) {
				if(!fired && IS_MOBILE) {
					fired = true;
					callback();
				}

				return this;				
			},
			notMobile: function(callback) {
				if(!fired && !IS_MOBILE) {
					fired = true;
					callback();
				}

				return this;
			},
			ios: function(callback) {
				if(!fired && IS_IOS) {
					fired = true;
					callback();
				}
				
				return this;
			},
			android: function(callback) {
				if(!fired && IS_ANDROID) {
					fired = true;
					callback();
				}
				
				return this;
			}
		};
}));