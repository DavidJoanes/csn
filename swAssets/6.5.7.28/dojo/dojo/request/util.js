define(["exports","../errors/RequestError","../errors/CancelError","../Deferred","../io-query","../_base/array","../_base/lang","../promise/Promise","../has"],function(exports,RequestError,CancelError,Deferred,ioQuery,array,lang,Promise,has){function isArrayBuffer(value){return has("native-arraybuffer")&&value instanceof ArrayBuffer
}function isBlob(value){return has("native-blob")&&value instanceof Blob
}function isFormElement(value){if(typeof HTMLFormElement!=="undefined"){return value instanceof HTMLFormElement
}else{value.tagName==="FORM"
}}function isFormData(value){return has("native-formdata")&&value instanceof FormData
}function shouldDeepCopy(value){return value&&typeof value==="object"&&!isFormData(value)&&!isFormElement(value)&&!isBlob(value)&&!isArrayBuffer(value)
}exports.deepCopy=function(target,source){for(var name in source){var tval=target[name],sval=source[name];
if(tval!==sval){if(shouldDeepCopy(sval)){if(Object.prototype.toString.call(sval)==="[object Date]"){target[name]=new Date(sval)
}else{if(lang.isArray(sval)){target[name]=exports.deepCopyArray(sval)
}else{if(tval&&typeof tval==="object"){exports.deepCopy(tval,sval)
}else{target[name]=exports.deepCopy({},sval)
}}}}else{target[name]=sval
}}}return target
};
exports.deepCopyArray=function(source){var clonedArray=[];
for(var i=0,l=source.length;
i<l;
i++){var svalItem=source[i];
if(typeof svalItem==="object"){clonedArray.push(exports.deepCopy({},svalItem))
}else{clonedArray.push(svalItem)
}}return clonedArray
};
exports.deepCreate=function deepCreate(source,properties){properties=properties||{};
var target=lang.delegate(source),name,value;
for(name in source){value=source[name];
if(value&&typeof value==="object"){target[name]=exports.deepCreate(value,properties[name])
}}return exports.deepCopy(target,properties)
};
var freeze=Object.freeze||function(obj){return obj
};
function okHandler(response){return freeze(response)
}function dataHandler(response){return response.data!==undefined?response.data:response.text
}exports.deferred=function deferred(response,cancel,isValid,isReady,handleResponse,last){var def=new Deferred(function(reason){cancel&&cancel(def,response);
if(!reason||!(reason instanceof RequestError)&&!(reason instanceof CancelError)){return new CancelError("Request canceled",response)
}return reason
});
def.response=response;
def.isValid=isValid;
def.isReady=isReady;
def.handleResponse=handleResponse;
function errHandler(error){error.response=response;
throw error
}var responsePromise=def.then(okHandler).otherwise(errHandler);
if(exports.notify){responsePromise.then(lang.hitch(exports.notify,"emit","load"),lang.hitch(exports.notify,"emit","error"))
}var dataPromise=responsePromise.then(dataHandler);
var promise=new Promise();
for(var prop in dataPromise){if(dataPromise.hasOwnProperty(prop)){promise[prop]=dataPromise[prop]
}}promise.response=responsePromise;
freeze(promise);
if(last){def.then(function(response){last.call(def,response)
},function(error){last.call(def,response,error)
})
}def.promise=promise;
def.then=promise.then;
return def
};
exports.addCommonMethods=function addCommonMethods(provider,methods){array.forEach(methods||["GET","POST","PUT","DELETE"],function(method){provider[(method==="DELETE"?"DEL":method).toLowerCase()]=function(url,options){options=lang.delegate(options||{});
options.method=method;
return provider(url,options)
}
})
};
exports.parseArgs=function parseArgs(url,options,skipData){var data=options.data,query=options.query;
if(data&&!skipData){if(typeof data==="object"&&(!(has("native-xhr2"))||!(isArrayBuffer(data)||isBlob(data)))){options.data=ioQuery.objectToQuery(data)
}}if(query){if(typeof query==="object"){query=ioQuery.objectToQuery(query)
}if(options.preventCache){query+=(query?"&":"")+"request.preventCache="+(+(new Date))
}}else{if(options.preventCache){query="request.preventCache="+(+(new Date))
}}if(url&&query){url+=(~url.indexOf("?")?"&":"?")+query
}return{url:url,options:options,getHeader:function(headerName){return null
}}
};
exports.checkStatus=function(stat){stat=stat||0;
return(stat>=200&&stat<300)||stat===304||stat===1223||!stat
}
});
//# sourceURL=/swAssets/6.5.7.28/dojo/dojo/request/util.js