define(["./_base/kernel","require","./has","./_base/array","./_base/config","./_base/lang","./has!host-browser?./_base/xhr","./json","module"],function(dojo,require,has,array,config,lang,xhr,json,module){has.add("dojo-preload-i18n-Api",1);
has.add("dojo-v1x-i18n-Api",1);
var thisModule=dojo.i18n={},nlsRe=/(^.*(^|\/)nls)(\/|$)([^\/]*)\/?([^\/]*)/,getAvailableLocales=function(root,locale,bundlePath,bundleName){for(var result=[bundlePath+bundleName],localeParts=locale.split("-"),current="",i=0;
i<localeParts.length;
i++){current+=(current?"-":"")+localeParts[i];
if(!root||root[current]){result.push(bundlePath+current+"/"+bundleName);
result.specificity=current
}}return result
},cache={},getBundleName=function(moduleName,bundleName,locale){locale=locale?locale.toLowerCase():dojo.locale;
moduleName=moduleName.replace(/\./g,"/");
bundleName=bundleName.replace(/\./g,"/");
return(/root/i.test(locale))?(moduleName+"/nls/"+bundleName):(moduleName+"/nls/"+locale+"/"+bundleName)
},getL10nName=dojo.getL10nName=function(moduleName,bundleName,locale){return moduleName=module.id+"!"+getBundleName(moduleName,bundleName,locale)
},doLoad=function(require,bundlePathAndName,bundlePath,bundleName,locale,load){require([bundlePathAndName],function(root){var current=lang.clone(root.root||root.ROOT),availableLocales=getAvailableLocales(!root._v1x&&root,locale,bundlePath,bundleName);
require(availableLocales,function(){for(var i=1;
i<availableLocales.length;
i++){current=lang.mixin(lang.clone(current),arguments[i])
}var target=bundlePathAndName+"/"+locale;
cache[target]=current;
current.$locale=availableLocales.specificity;
load()
})
})
},normalize=function(id,toAbsMid){return/^\./.test(id)?toAbsMid(id):id
},getLocalesToLoad=function(targetLocale){var list=config.extraLocale||[];
list=lang.isArray(list)?list:[list];
list.push(targetLocale);
return list
},load=function(id,require,load){var match=nlsRe.exec(id),bundlePath=match[1]+"/",bundleName=match[5]||match[4],bundlePathAndName=bundlePath+bundleName,localeSpecified=(match[5]&&match[4]),targetLocale=localeSpecified||dojo.locale||"",loadTarget=bundlePathAndName+"/"+targetLocale,loadList=localeSpecified?[targetLocale]:getLocalesToLoad(targetLocale),remaining=loadList.length,finish=function(){if(!--remaining){load(lang.delegate(cache[loadTarget]))
}},split=id.split("*"),preloadDemand=split[1]=="preload";
if(has("dojo-preload-i18n-Api")){if(preloadDemand){if(!cache[id]){cache[id]=1;
preloadL10n(split[2],json.parse(split[3]),1,require)
}load(1)
}if(preloadDemand||(waitForPreloads(id,require,load)&&!cache[loadTarget])){return
}}else{if(preloadDemand){load(1);
return
}}array.forEach(loadList,function(locale){var target=bundlePathAndName+"/"+locale;
if(has("dojo-preload-i18n-Api")){checkForLegacyModules(target)
}if(!cache[target]){doLoad(require,bundlePathAndName,bundlePath,bundleName,locale,finish)
}else{finish()
}})
};
if(has("dojo-preload-i18n-Api")||has("dojo-v1x-i18n-Api")){var normalizeLocale=thisModule.normalizeLocale=function(locale){var result=locale?locale.toLowerCase():dojo.locale;
return result=="root"?"ROOT":result
},isXd=function(mid,contextRequire){return(has("dojo-sync-loader")&&has("dojo-v1x-i18n-Api"))?contextRequire.isXdUrl(require.toUrl(mid+".js")):true
},preloading=0,preloadWaitQueue=[],preloadL10n=thisModule._preloadLocalizations=function(bundlePrefix,localesGenerated,guaranteedAmdFormat,contextRequire){contextRequire=contextRequire||require;
function doRequire(mid,callback){if(isXd(mid,contextRequire)||guaranteedAmdFormat){contextRequire([mid],callback)
}else{syncRequire([mid],callback,contextRequire)
}}function forEachLocale(locale,func){var parts=locale.split("-");
while(parts.length){if(func(parts.join("-"))){return
}parts.pop()
}func("ROOT")
}function preloadingAddLock(){preloading++
}function preloadingRelLock(){--preloading;
while(!preloading&&preloadWaitQueue.length){load.apply(null,preloadWaitQueue.shift())
}}function cacheId(path,name,loc,require){return require.toAbsMid(path+name+"/"+loc)
}function preload(locale){locale=normalizeLocale(locale);
forEachLocale(locale,function(loc){if(array.indexOf(localesGenerated,loc)>=0){var mid=bundlePrefix.replace(/\./g,"/")+"_"+loc;
preloadingAddLock();
doRequire(mid,function(rollup){for(var p in rollup){var bundle=rollup[p],match=p.match(/(.+)\/([^\/]+)$/),bundleName,bundlePath;
if(!match){continue
}bundleName=match[2];
bundlePath=match[1]+"/";
if(!bundle._localized){continue
}var localized;
if(loc==="ROOT"){var root=localized=bundle._localized;
delete bundle._localized;
root.root=bundle;
cache[require.toAbsMid(p)]=root
}else{localized=bundle._localized;
cache[cacheId(bundlePath,bundleName,loc,require)]=bundle
}if(loc!==locale){function improveBundle(bundlePath,bundleName,bundle,localized){var requiredBundles=[],cacheIds=[];
forEachLocale(locale,function(loc){if(localized[loc]){requiredBundles.push(require.toAbsMid(bundlePath+loc+"/"+bundleName));
cacheIds.push(cacheId(bundlePath,bundleName,loc,require))
}});
if(requiredBundles.length){preloadingAddLock();
contextRequire(requiredBundles,function(){for(var i=requiredBundles.length-1;
i>=0;
i--){bundle=lang.mixin(lang.clone(bundle),arguments[i]);
cache[cacheIds[i]]=bundle
}cache[cacheId(bundlePath,bundleName,locale,require)]=lang.clone(bundle);
preloadingRelLock()
})
}else{cache[cacheId(bundlePath,bundleName,locale,require)]=bundle
}}improveBundle(bundlePath,bundleName,bundle,localized)
}}preloadingRelLock()
});
return true
}return false
})
}preload();
array.forEach(dojo.config.extraLocale,preload)
},waitForPreloads=function(id,require,load){if(preloading){preloadWaitQueue.push([id,require,load])
}return preloading
},checkForLegacyModules=function(){}
}if(has("dojo-v1x-i18n-Api")){var amdValue={},l10nCache={},evalBundle,syncRequire=function(deps,callback,require){var results=[];
array.forEach(deps,function(mid){var url=require.toUrl(mid+".js");
function load(text){if(!evalBundle){evalBundle=new Function("__bundle","__checkForLegacyModules","__mid","__amdValue","var define = function(mid, factory){define.called = 1; __amdValue.result = factory || mid;},"+"	   require = function(){define.called = 1;};"+"try{"+"define.called = 0;"+"eval(__bundle);"+"if(define.called==1)"+"return __amdValue;"+"if((__checkForLegacyModules = __checkForLegacyModules(__mid)))"+"return __checkForLegacyModules;"+"}catch(e){}"+"try{"+"return eval('('+__bundle+')');"+"}catch(e){"+"return e;"+"}")
}var result=evalBundle(text,checkForLegacyModules,mid,amdValue);
if(result===amdValue){results.push(cache[url]=amdValue.result)
}else{if(result instanceof Error){console.error("failed to evaluate i18n bundle; url="+url,result);
result={}
}results.push(cache[url]=(/nls\/[^\/]+\/[^\/]+$/.test(url)?result:{root:result,_v1x:1}))
}}if(cache[url]){results.push(cache[url])
}else{var bundle=require.syncLoadNls(mid);
if(!bundle){bundle=checkForLegacyModules(mid.replace(/nls\/([^\/]*)\/([^\/]*)$/,"nls/$2/$1"))
}if(bundle){results.push(bundle)
}else{if(!xhr){try{require.getText(url,true,load)
}catch(e){results.push(cache[url]={})
}}else{xhr.get({url:url,sync:true,load:load,error:function(){results.push(cache[url]={})
}})
}}}});
callback&&callback.apply(null,results)
};
checkForLegacyModules=function(target){for(var result,names=target.split("/"),object=dojo.global[names[0]],i=1;
object&&i<names.length-1;
object=object[names[i++]]){}if(object){result=object[names[i]];
if(!result){result=object[names[i].replace(/-/g,"_")]
}if(result){cache[target]=result
}}return result
};
thisModule.getLocalization=function(moduleName,bundleName,locale){var result,l10nName=getBundleName(moduleName,bundleName,locale);
if(l10nCache[l10nName]){return l10nCache[l10nName]
}load(l10nName,(!isXd(l10nName,require)?function(deps,callback){syncRequire(deps,callback,require)
}:require),function(result_){l10nCache[l10nName]=result_;
result=result_
});
return result
}
}return lang.mixin(thisModule,{dynamic:true,normalize:normalize,load:load,cache:cache,getL10nName:getL10nName})
});
//# sourceURL=/swAssets/6.5.7.28/dojo/dojo/i18n.js