define(["dojo/_base/array","dojo/_base/config","dojo/_base/lang","../registry","../main"],function(array,config,lang,registry,dijit){var exports={};
array.forEach(["byId","getUniqueId","findWidgets","_destroyAll","byNode","getEnclosingWidget"],function(name){exports[name]=registry[name]
});
lang.mixin(exports,{defaultDuration:config["defaultDuration"]||200});
lang.mixin(dijit,exports);
return dijit
});
//# sourceURL=/swAssets/6.5.7.28/dojo/dijit/_base/manager.js