define(["exports","require","../has"],function(exports,require,has){var defId=has("config-requestProvider"),platformId;
if(has("host-browser")||has("host-webworker")){platformId="./xhr"
}else{if(has("host-node")){platformId="./node"
}}if(!defId){defId=platformId
}exports.getPlatformDefaultId=function(){return platformId
};
exports.load=function(id,parentRequire,loaded,config){require([id=="platform"?platformId:defId],function(provider){loaded(provider)
})
}
});
//# sourceURL=/swAssets/6.5.7.28/dojo/dojo/request/default.js