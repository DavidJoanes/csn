define(["./Deferred","./promise/Promise"],function(Deferred,Promise){return function when(valueOrPromise,callback,errback,progback){var receivedPromise=valueOrPromise&&typeof valueOrPromise.then==="function";
var nativePromise=receivedPromise&&valueOrPromise instanceof Promise;
if(!receivedPromise){if(arguments.length>1){return callback?callback(valueOrPromise):valueOrPromise
}else{return new Deferred().resolve(valueOrPromise)
}}else{if(!nativePromise){var deferred=new Deferred(valueOrPromise.cancel);
valueOrPromise.then(deferred.resolve,deferred.reject,deferred.progress);
valueOrPromise=deferred.promise
}}if(callback||errback||progback){return valueOrPromise.then(callback,errback,progback)
}return valueOrPromise
}
});
//# sourceURL=/swAssets/6.5.7.28/dojo/dojo/when.js