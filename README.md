# slider puzzle validator

drag puzzle for captcha validation

### usage
clone it, and run 
```
npm start
```
then open 127.0.0.1:3000
### use client by browserify or webpack

```
import sliderPuzzle from 'slider-puzzle-captcha'

let div = document.querySelector('.slider-puzzle')
let removeSliderHandler = sliderPuzzle(div)
// when no need, remove listeners from div
// removeSliderHandler()
```

### test
```
npm test
npm run test:client
```

### dist
```
npm run dist
```

### server
use pm2 to start src/server/index.js
do not forget change src/config.js allowIps to include your request server ip
```
npm i pm2 -g // if no pm2 in global
npm run production
```

## custom
edit src/config.js and run
```
npm run dist
```

## api
api can be customized by edit config.js

get /captcha
return Object {bg: String, puzzle-bg: String, puzzle: String, token: String, ok: Bool}

post /validate
post body {token: String, x: Number}
return Object {ok: Bool}
