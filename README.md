kollus-ruby [![version][]][rubygems]
========
[kollus](http://kollus.com) API written in **ruby**

```ruby
require 'kollus'

kollus = Kollus.new 'test', 'catenoid-sample', '1234567890abcdef' # Use your own one

# 동영상 플레이하기
sample = kollus.media '7MscjbVl'

sample.url        # http://v.kr.kollus.co...61|V1.0
sample.download   # http://v.kr.kollus.co...61|V1.0&download
sample.token      # D9C34B694FF4728E430E5E0..

# 동영상 업로드
upload = kollus.upload

upload.url        # http://upload.kr.kollus.com/20150101-abcd1234
upload.key        # 20150101-abcd1234
upload.expires_at # 2015-01-01 06:00:00 +0900
```

Getting Started
--------
Install the gem with:
```console
gem install kollus
```

Or you can add it to your Gemfile with:
```ruby
gem 'kollus'
```

You can simply drop this gem into your ruby web application.

```ruby
## Controller

# Use your own one
account_id = 'mycompany'
account_key = 'mycompany-key'
api_token = 'abcdef0123456789'

kollus = Kollus.new account_id, account_key, api_token

@media1 = kollus.media '7MscjbVl'
@media2 = kollus.media 'Kcrbjc2S'
@upload = kollus.upload
```

```erb
<%# View %>

<a href="<%= @media1.url %>">동영상 보러가기</a>
<a href="<%= @media2.download %>">동영상 다운받기</a>

<form action="<%= @upload.url %>" method="POST" enctype="multipart/form-data">
  <input type="file" name="upload-file">
  <input type="submit" value="동영상 업로드">
</form>
```

Please look at the [sample application](sample) for the working example of kollus-ruby.

#### How to run sample application
```sh
gem install sinatra thin

cd sample
cp secret.yml.example secret.yml
vim secret.yml
# Type your own API token

RACK_ENV=production ./run
```

[version]: https://img.shields.io/gem/v/kollus.svg
[rubygems]: https://rubygems.org/gems/kollus
