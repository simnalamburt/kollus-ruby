kollus-ruby [![version][]][rubygems]
========
[kollus](http://kollus.com) API written in **ruby**

```ruby
require 'kollus'

token = '1234567890abcdef' # Use your own one
kollus = Kollus.new 'test', 'catenoid-sample', token

# 샘플 동영상 토큰
sample = kollus.media '7MscjbVl'

# 업로드 요청을 보낼 경로
upload_uri = kollus.upload_uri
```

Install the gem:
```
gem install kollus
```

#### How to run sample code
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
