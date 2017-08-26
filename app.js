var vimeos=require('vimeo-down-async');
var argv = require('process');
var RegEx=require('regex-match-all');


var myArgs = process.argv.slice(2);

for(var i=0; i<myArgs.length;i++){
   if(myArgs[i]=='-p'){
     process.env.http_proxy = myArgs[i+1]
   }
};

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
