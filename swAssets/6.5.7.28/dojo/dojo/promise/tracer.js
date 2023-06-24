define(["../_base/lang","./Promise","../Evented"],function(lang,Promise,Evented){var evented=new Evented;
var emit=evented.emit;
evented.emit=null;
function emitAsync(args){setTimeout(function(){emit.apply(evented,args)
},0)
}Promise.prototype.trace=function(){var args=lang._toArray(arguments);
this.then(function(value){emitAsync(["resolved",value].concat(args))
},function(error){emitAsync(["rejected",error].concat(args))
},function(update){emitAsync(["progress",update].concat(args))
});
return this
};
Promise.prototype.traceRejected=function(){var args=lang._toArray(arguments);
this.otherwise(function(error){emitAsync(["rejected",error].concat(args))
});
return this
};
return evented
});
//# sourceURL=/swAssets/6.5.7.28/dojo/dojo/promise/tracer.js