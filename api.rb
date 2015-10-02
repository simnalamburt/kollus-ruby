require 'net/http'
require 'json'

def kollus_media_link_by_userid_api(api_token, security_key, media_content_key, media_profile_key, awt_code, client_user_id, expire_time = 7200, play_list = nil)
  api_uri = URI('http://api.kr.kollus.com/0/media_auth/media_token/get_media_link_by_userid?access_token=' + api_token)
  params = {
    'client_user_id' => client_user_id,
    'security_key' => security_key,
    'media_content_key' => media_content_key,
    'media_profile_key' => media_profile_key,
    'awt_code' => awt_code,
    'expire_time' => expire_time,
    'play_list' => play_list
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
