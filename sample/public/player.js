/**
 * kollus Player 모바일 전용플레이어 호출
 *
 * kollus Player 모바일 전용플레이어 연동 시 스트리밍, 다운로드 호출을 위한 method 입니다.
 *
 * @access	public
 * @param	string		method		    스트리밍, 다운로드 구분 (path : 스트리밍, download : 다운로드
 * @param	string		media_token     암호화 모듈을 통해 생성된 media_token
 * @return	void
 */
function call_player(method, media_token) {
  var useragent_lowercase = navigator.userAgent.toLocaleLowerCase(), device, chrome25, kitkat_webview;

  Appable.ios(function() {
    device = 'ios';
  }).android(function() {
    device = 'android';
  });

  var $iframe = $('<iframe />').hide();
  var clicked_at = +new Date();

  $('body').append($iframe);

  setTimeout(function() {
    if(device == 'ios') {
      // 플레이어 미설치시 앱스토어로 리다이렉션
      check_iOS();

      $iframe.attr('src', "kollus://" + method + "?url=http://v.kr.kollus.com/si?key=" + media_token);
    } else {
      chrome25 = useragent_lowercase.search('chrome') > -1 && navigator.appVersion.match(/Chrome\/\d+.\d+/)[0].split('/')[1] > 25;
      kitkat_webview = useragent_lowercase.indexOf('naver') != -1 || useragent_lowercase.indexOf('daum') != -1;

      // chrome25 버전 이하는 iframe의 src에 general schema link를 주입하고
      // 이상 버전은 intent 링크를 사용
      // 이때 kitkat webview에서는 chrome25 이하 버전과 동일하게 동작함
      if(chrome25 && !kitkat_webview) {
        window.top.location.href = "intent://" + method + "?url=http://v.kr.kollus.com/si?key=" + media_token + "#Intent;package=com.kollus.media;scheme=kollus;end;";
      } else {
        // 플레이어 미설치시 앱스토어로 자동으로 리다이렉션
        setTimeout(function() {
          if(+new Date - clicked_at < 2000) {
            window.location.href = 'market://details?id=com.kollus.media';
          }
        }, 1500);

        $iframe.attr('src', "kollus://" + method + "?url=http://v.kr.kollus.com/si?key=" + media_token);
      }
    }
  }, 1);
}

/**
 * kollus 모바일 전용플레이어 멀티 다운로드 호출
 *
 * kollus 모바일 전용플레이어 멀티 다운로드를 위한 method 입니다.
 *
 * @access	public
 * @return	void
 */
function start_downloads() {
  var chk_info = document.media_form;
  var count = 0;
  var url_list = "";

  for (i = 0; i < chk_info.length; i++) {
    if (chk_info[i].checked == true) {
      if (count == 0) {
        url_list += "?url=";
      }
      if (count > 0) {
        url_list += "&url=";
      }
      url_list += chk_info[i].value;
      count += 1;
    }
  }

  if (count == 0) {
    alert("다운로드 항목을 선택해 주세요.");
    return;
  }

  var useragent_lowercase = navigator.userAgent.toLocaleLowerCase(), device, chrome25, kitkat_webview;

  Appable.ios(function() {
    device = 'ios';
  }).android(function() {
    device = 'android';
  });

  var $iframe = $('<iframe />').hide();
  var clicked_at = +new Date();

  $('body').append($iframe);

  setTimeout(function() {
    if(device == 'ios') {
      // 플레이어 미설치시 앱스토어로 리다이렉션
      check_iOS();

      $iframe.attr('src', "kollus://download" + url_list);
    } else {
      chrome25 = useragent_lowercase.search('chrome') > -1 && navigator.appVersion.match(/Chrome\/\d+.\d+/)[0].split('/')[1] > 25;
      kitkat_webview = useragent_lowercase.indexOf('naver') != -1 || useragent_lowercase.indexOf('daum') != -1;

      // chrome25 버전 이하는 iframe의 src에 general schema link를 주입하고
      // 이상 버전은 intent 링크를 사용
      // 이때 kitkat webview에서는 chrome25 이하 버전과 동일하게 동작함
      if(chrome25 && !kitkat_webview) {
        window.location.href = "intent://download" + url_list + "#Intent;package=com.kollus.media;scheme=kollus;end;";
      } else {
        // 플레이어 미설치시 앱스토어로 자동으로 리다이렉션
        setTimeout(function() {
          if(+new Date - clicked_at < 2000) {
            window.location.href = 'market://details?id=com.kollus.media';
          }
        }, 1500);

        $iframe.attr('src', "kollus://download" + url_list);
      }
    }
  }, 1);
}

function check_iOS() {
  // iOS app 설치 확인 Sample
  var clicked_at = +new Date;

  setTimeout(function () {
    if (+new Date - clicked_at < 2000) {
      window.location.href = "https://itunes.apple.com/app/id760006888";
    }
  }, 1500);
}
