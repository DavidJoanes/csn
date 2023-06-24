define(["./has"],function(has){if(has("host-browser")){var n=navigator,dua=n.userAgent,dav=n.appVersion,tv=parseFloat(dav);
has.add("air",dua.indexOf("AdobeAIR")>=0);
has.add("wp",parseFloat(dua.split("Windows Phone")[1])||undefined);
has.add("msapp",parseFloat(dua.split("MSAppHost/")[1])||undefined);
has.add("khtml",dav.indexOf("Konqueror")>=0?tv:undefined);
has.add("edge",parseFloat(dua.split("Edge/")[1])||undefined);
has.add("opr",parseFloat(dua.split("OPR/")[1])||undefined);
has.add("webkit",!has("wp")&&!has("edge")&&parseFloat(dua.split("WebKit/")[1])||undefined);
has.add("chrome",!has("edge")&&!has("opr")&&parseFloat(dua.split("Chrome/")[1])||undefined);
has.add("android",!has("wp")&&parseFloat(dua.split("Android ")[1])||undefined);
has.add("safari",dav.indexOf("Safari")>=0&&!has("wp")&&!has("chrome")&&!has("android")&&!has("edge")&&!has("opr")?parseFloat(dav.split("Version/")[1]):undefined);
has.add("mac",dav.indexOf("Macintosh")>=0);
has.add("quirks",document.compatMode=="BackCompat");
if(!has("wp")&&dua.match(/(iPhone|iPod|iPad)/)){var p=RegExp.$1.replace(/P/,"p");
var v=dua.match(/OS ([\d_]+)/)?RegExp.$1:"1";
var os=parseFloat(v.replace(/_/,".").replace(/_/g,""));
has.add(p,os);
has.add("ios",os)
}has.add("bb",(dua.indexOf("BlackBerry")>=0||dua.indexOf("BB10")>=0)&&parseFloat(dua.split("Version/")[1])||undefined);
has.add("trident",parseFloat(dav.split("Trident/")[1])||undefined);
has.add("svg",typeof SVGAngle!=="undefined");
if(!has("webkit")){if(dua.indexOf("Opera")>=0){has.add("opera",tv>=9.8?parseFloat(dua.split("Version/")[1])||tv:tv)
}if(dua.indexOf("Gecko")>=0&&!has("wp")&&!has("khtml")&&!has("trident")&&!has("edge")){has.add("mozilla",tv)
}if(has("mozilla")){has.add("ff",parseFloat(dua.split("Firefox/")[1]||dua.split("Minefield/")[1])||undefined)
}if(document.all&&!has("opera")){var isIE=parseFloat(dav.split("MSIE ")[1])||undefined;
var mode=document.documentMode;
if(mode&&mode!=5&&Math.floor(isIE)!=mode){isIE=mode
}has.add("ie",isIE)
}has.add("wii",typeof opera!="undefined"&&opera.wiiremote)
}}return has
});
//# sourceURL=/swAssets/6.5.7.28/dojo/dojo/sniff.js