define(["./_base/kernel","./has","require","./sniff","./_base/lang","./_base/array","./_base/config","./ready","./_base/declare","./_base/connect","./_base/Deferred","./_base/json","./_base/Color","./has!dojo-firebug?./_firebug/firebug","./has!host-browser?./_base/browser","./has!dojo-sync-loader?./_base/loader"],function(kernel,has,require,sniff,lang,array,config,ready){if(config.isDebug){require(["./_firebug/firebug"])
}has.add("dojo-config-require",1);
if(has("dojo-config-require")){var deps=config.require;
if(deps){deps=array.map(lang.isArray(deps)?deps:[deps],function(item){return item.replace(/\./g,"/")
});
if(kernel.isAsync){require(deps)
}else{ready(1,function(){require(deps)
})
}}}return kernel
});
//# sourceURL=/swAssets/6.5.7.28/dojo/dojo/main.js