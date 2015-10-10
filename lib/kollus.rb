require 'net/http'
require 'json'

class Kollus
  def initialize(account_id, account_key, api_token)
    @id = account_id
    @key = account_key
    @token = api_token
  end

  def media(media_content_key, media_profile_key = nil, awt_code = nil, expire_time = 7200, play_list = nil)
    api_uri = URI('http://api.kr.kollus.com/0/media_auth/media_token/get_media_link_by_userid?access_token=' + @token)
    params = {
      client_user_id: @id,
      security_key: @key,
      media_content_key: media_content_key,
      media_profile_key: media_profile_key,
      awt_code: awt_code,
      expire_time: expire_time,
      play_list: play_list
    }

    response = Net::HTTP.post_form(api_uri, params)
    # TODO: Error handling

    response = JSON.parse response.body
    # TODO: Error handling

    unless response['error'] == 0
      # TODO: Error handling
      return false
    end

    response['result']['media_token']
  end

  def upload_uri(title = nil, expire_time = 600, encrypted = true, audio = false)
    api_uri = URI('http://api.kr.kollus.com/0/media_auth/upload/create_url.json?access_token=' + @token)
    params = {
      # 값의 범위는 0 < expire_time <= 21600 입니다. 빈값을 보내거나 항목 자체를 제거하면 기본 600초로 설정됩니다.
      expire_time: expire_time,
      # 업로드한 파일이 속할 카테고리의 키(API를 이용하여 확득 가능)입니다. 빈값을 보내 거나 항목 자체를 제거하면 '없음'에 속합니다.
      category_key: 'bw2z2ngbkatkqx77',
      # 입력한 제목을 컨텐츠의 제목으로 강제지정합니다. 이 값을 보내지 않거나 빈값으로 보내면 기본 적으로 파일명이 제목으로 사용됩니다.
      title: title,
      # 0은 일반 업로드, 1은 암호화 업로드입니다. 암호화 업로드시 파일이 암호화 되어 Kollus의 전용 플레이어로만 재생됩니다.
      is_encryption_upload: encrypted ? 1 : 0,
      # 0은 비디오 업로드, 1은 음원 파일 업로드입니다.
      is_audio_upload: audio ? 1 : 0,
      # 파일의 분할 업로드를 지원하기 위한 값입니다. 추후 제공될 기능이며, 현재는 동작하지 않습니다.
      is_multipart_upload: 0
    }

    response = Net::HTTP.post_form(api_uri, params)
    # TODO: Error handling

    response = JSON.parse response.body
    # TODO: Error handling

    unless response['error'] == 0
      # TODO: Error handling
      return false
    end

    response['result']['upload_url']
  end
end
