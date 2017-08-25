var RegEx=require('regex-match-all');
var fs=require('fs');
var request = require('request');
var HDs=require('http-s-downloading');
var cheerio = require('cheerio');
var LineByLineReader = require('line-by-line');
var https=require('https');


var rename_mp4=function(paths){
lr = new LineByLineReader('vimeo_title.txt');
lr.on('line', function (line) {
  lr.pause();
  setTimeout(function () {
    var ids=RegEx.match(/\d+.mp4/,line).toString();
    var org=RegEx.match(/\>.*.mp4/,line).toString().replace('>','');
    if(paths=='./'){
      fs.rename(ids,org,function(err) {});
    }else{
      fs.rename(paths+'/'+ids,paths+'/'+org,function(err) {});
    }
    console.log('Rename Vimeo title '+line);
    lr.resume();
  }, 1000);
});
};

const Getvideosize = url => new Promise((resolve,reject)=> https.get(url,(res)=>{
  const { statusCode } = res;
   if (statusCode == 200) {
     var len = parseInt(res.headers['content-length'], 10)/1024/1024;
     if(len>=1000){
      var sizes=len/1024
      resolve(sizes.toFixed(2)+"GB");
     }else{
       resolve(len.toFixed(2)+"MB");
     }
   }else{
     reject('connect error!');
   }

}));

const GetDownloadInfo = url => new Promise((resolve, reject) => request.get({url,headers: {
        'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/55.0.2883.95 Safari/537.36'
    }},(err, response, body) => {
if (err) {
  reject(err);
} else {
  $ = cheerio.load(body);
  var vimeo_title1=$('title').text()+'.mp4'; //Org video titile
  var vimeo_title=RegEx.matchAll(/\d+/g,url).toString()+'.mp4'; //video id title
  var datas=RegEx.matchAll(/progressive.*\}\]\}/g,body).toString().replace('progressive":','').replace(']}',']');
  fs.writeFile('vimeo_title.txt',vimeo_title+' =>'+vimeo_title1+'\n',{flags:'w+',defaultEncoding:'utf8'}, function(err) {});
  resolve(datas);
}
}));


exports.getvimeoquality=function(urls){
  var vimeo_id=RegEx.match(/\d+/,urls).toString();
  var Downloding_Url='https://player.vimeo.com/video/'+vimeo_id;

  async function start(){
    try {
      var datas = await GetDownloadInfo(Downloding_Url);
      var obj = JSON.parse(datas);
      var keysArray = Object.keys(obj);
      for (var i = 0; i < keysArray.length; i++) {
        console.log('Vimeo Quality Result['+i.toString()+']: '+obj[i].quality+' => Size:'+await Getvideosize(obj[i].url))

      }
      return 'Total Quality Result: '+keysArray.length.toString()+' || 1080P -> h || 720P -> m || 540P -> s || 360P -> l'

    } catch (err) {
      console.log(err);
    }
  }
  start().then(code=>console.log(code));

}

exports.vimeodownloading=function(urls,paths,qualitys) {
var vimeo_id=RegEx.match(/\d+/,urls).toString();
var Downloding_Url='https://player.vimeo.com/video/'+vimeo_id

async function start(){
  try {
    var vimeo_title=vimeo_id+'.mp4';
    var datas = await GetDownloadInfo(Downloding_Url);
    var obj = JSON.parse(datas);
    var keysArray = Object.keys(obj);
    var hight_quality,medium_quality,standard_quality,low_quality
    var default_quality=obj[0].url.toString();

    for (var i = 0; i < keysArray.length; i++) {

      if(obj[i].quality=='1080p'){
        hight_quality=obj[i].url.toString();
      }

      if(obj[i].quality=='720p'){
        medium_quality=obj[i].url.toString();
      }

      if(obj[i].quality=='540p'){
        standard_quality=obj[i].url.toString();
      }

      if(obj[i].quality=='360p'){
        low_quality=obj[i].url.toString();
      }

    }
    var exp=qualitys;
    switch (exp) {
      case 'h':
          if (hight_quality) {
            await HDs.http_s_downloading(hight_quality,paths,vimeo_title)
            await rename_mp4(paths);
            return 'Start Downloding Vimeo! => '+vimeo_title;
          } else {
            await HDs.http_s_downloading(default_quality,paths,vimeo_title)
            await rename_mp4(paths);
            return 'Start Downloding Vimeo! => '+vimeo_title;
          }
        break;
      case 'm':
          if (medium_quality) {
            await HDs.http_s_downloading(medium_quality,paths,vimeo_title)
            await rename_mp4(paths);
            return 'Start Downloding Vimeo! => '+vimeo_title;
          } else {
            await HDs.http_s_downloading(default_quality,paths,vimeo_title)
            await rename_mp4(paths);
            return 'Start Downloding Vimeo! => '+vimeo_title;
          }
        break;
      case 's':
         if (standard_quality) {
           await HDs.http_s_downloading(standard_quality,paths,vimeo_title)
           await rename_mp4(paths);
           return 'Start Downloding Vimeo! => '+vimeo_title;
         } else {
           await HDs.http_s_downloading(default_quality,paths,vimeo_title)
           await rename_mp4(paths);
           return 'Start Downloding Vimeo! => '+vimeo_title;
         }
        break;
      case 'l':
          if (low_quality) {
            await HDs.http_s_downloading(low_quality,paths,vimeo_title)
            await rename_mp4(paths);
            return 'Start Downloding Vimeo! => '+vimeo_title;
          } else {
            await HDs.http_s_downloading(default_quality,paths,vimeo_title)
            await rename_mp4(paths);
            return 'Start Downloding Vimeo! => '+vimeo_title;
          }
        break;
      default:
        await HDs.http_s_downloading(default_quality,paths,vimeo_title)
        await rename_mp4(paths);
        return 'Start Downloding Vimeo! => '+vimeo_title;
    }

  } catch (err) {
    console.log(err);
  }
}
start().then(code => console.log(code));

}
