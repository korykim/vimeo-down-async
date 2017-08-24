 **This is Vimeo video downloading script!**
---
>The script may not be used in China, unless you have prepared vpn!
---
```
var vimeos=require('vimeo-down-async');

vimeos.vimeodownloading('216002858','./')
//vimeos.vimeodownloading('https://vimeo.com/216002858','./')
```

>node app.js

---
```
var vimeos=require('vimeo-down-async');
var argv = require('process');
var RegEx=require('regex-match-all');

var myArgs = process.argv.slice(2);
var mp4_id=RegEx.match(/\d+/,myArgs[0]).toString();

vimeos.vimeodownloading(mp4_id,myArgs[1],myArgs[2])
```
> node app.js 216002858 ./ h  --> Downloading Hight quality Video

> node app.js 216002858 ./    --> Downloading default quality Video


node app.js VideoID Savefolder quality

---
>quality option

1. hight_quality(1080P)-> h

1. medium_quality(720P)-> m

1. standard_quality(540p)-> s

1. low_quality(360P)-> l
---
```
var vimeos=require('vimeo-down-async');
var argv = require('process');
var RegEx=require('regex-match-all');

var myArgs = process.argv.slice(2);
var exp=myArgs[0];
switch (exp) {
  case 'g':
    var mp4_id=RegEx.match(/\d+/,myArgs[1]).toString();
     vimeos.getvimeoquality(mp4_id)
    break;
  case 'd':
      var mp4_id=RegEx.match(/\d+/,myArgs[1]).toString();
      vimeos.vimeodownloading(mp4_id,myArgs[2],myArgs[3])
    break;
  case '-h':
       console.log('(1) node app.js g 216002858  => Get vimeo quality '+'\r\n'
      +'(2) node script.js d ./ h => Downloading wimeo video! '+'\r\n');
    break;
  default:
    console.log('please input (node script.js -h) in command!');
}

```
---
>node app.js g 216002858 (Get vimeo video quality info)

---
>node app.js d 216002858 ./mp4 h (Downloading hight quality video to mp4 folder)
---
**Just enjoy it!**

![Hight_quality](https://github.com/korykim/images/blob/master/vimeo-h.png)
![medium_quality](https://github.com/korykim/images/blob/master/vimeo-m.png)
![standard_quality](https://github.com/korykim/images/blob/master/vimeo-s.png)
![low_quality](https://github.com/korykim/images/blob/master/vimeo-l.png)
![total_quality](https://github.com/korykim/images/blob/master/total.png)
