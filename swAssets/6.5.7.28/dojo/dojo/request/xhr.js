define(["../errors/RequestError","./watch","./handlers","./util","../has"],function(RequestError,watch,handlers,util,has){has.add("native-xhr",function(){return typeof XMLHttpRequest!=="undefined"
});
has.add("dojo-force-activex-xhr",function(){return has("activex")&&window.location.protocol==="file:"
});
has.add("native-xhr2",function(){if(!has("native-xhr")||has("dojo-force-activex-xhr")){return
}var x=new XMLHttpRequest();
return typeof x["addEventListener"]!=="undefined"&&(typeof opera==="undefined"||typeof x["upload"]!=="undefined")
});
has.add("native-formdata",function(){return typeof FormData!=="undefined"
});
has.add("native-blob",function(){return typeof Blob!=="undefined"
});
has.add("native-arraybuffer",function(){return typeof ArrayBuffer!=="undefined"
});
has.add("native-response-type",function(){return has("native-xhr")&&typeof new XMLHttpRequest().responseType!=="undefined"
});
has.add("native-xhr2-blob",function(){if(!has("native-response-type")){return
}var x=new XMLHttpRequest();
x.open("GET","https://dojotoolkit.org/",true);
x.responseType="blob";
var responseType=x.responseType;
x.abort();
return responseType==="blob"
});
var nativeResponseTypes={"blob":has("native-xhr2-blob")?"blob":"arraybuffer","document":"document","arraybuffer":"arraybuffer"};
function handleResponse(response,error){var _xhr=response.xhr;
response.status=response.xhr.status;
try{response.text=_xhr.responseText
}catch(e){}if(response.options.handleAs==="xml"){response.data=_xhr.responseXML
}var handleError;
if(error){this.reject(error)
}else{try{handlers(response)
}catch(e){handleError=e
}if(util.checkStatus(_xhr.status)){if(!handleError){this.resolve(response)
}else{this.reject(handleError)
}}else{if(!handleError){error=new RequestError("Unable to load "+response.url+" status: "+_xhr.status,response);
this.reject(error)
}else{error=new RequestError("Unable to load "+response.url+" status: "+_xhr.status+" and an error in handleAs: transformation of response",response);
this.reject(error)
}}}}var isValid,isReady,addListeners,cancel;
if(has("native-xhr2")){isValid=function(response){return !this.isFulfilled()
};
cancel=function(dfd,response){response.xhr.abort()
};
addListeners=function(_xhr,dfd,response,uploadProgress){function onLoad(evt){dfd.handleResponse(response)
}function onError(evt){var _xhr=evt.target;
var error=new RequestError("Unable to load "+response.url+" status: "+_xhr.status,response);
dfd.handleResponse(response,error)
}function onProgress(transferType,evt){response.transferType=transferType;
if(evt.lengthComputable){response.loaded=evt.loaded;
response.total=evt.total;
dfd.progress(response)
}else{if(response.xhr.readyState===3){response.loaded=("loaded" in evt)?evt.loaded:evt.position;
dfd.progress(response)
}}}function onDownloadProgress(evt){return onProgress("download",evt)
}function onUploadProgress(evt){return onProgress("upload",evt)
}_xhr.addEventListener("load",onLoad,false);
_xhr.addEventListener("error",onError,false);
_xhr.addEventListener("progress",onDownloadProgress,false);
if(uploadProgress&&_xhr.upload){_xhr.upload.addEventListener("progress",onUploadProgress,false)
}return function(){_xhr.removeEventListener("load",onLoad,false);
_xhr.removeEventListener("error",onError,false);
_xhr.removeEventListener("progress",onDownloadProgress,false);
_xhr.upload.removeEventListener("progress",onUploadProgress,false);
_xhr=null
}
}
}else{isValid=function(response){return response.xhr.readyState
};
isReady=function(response){return 4===response.xhr.readyState
};
cancel=function(dfd,response){var xhr=response.xhr;
var _at=typeof xhr.abort;
if(_at==="function"||_at==="object"||_at==="unknown"){xhr.abort()
}}
}function getHeader(headerName){return this.xhr.getResponseHeader(headerName)
}var undefined,defaultOptions={data:null,query:null,sync:false,method:"GET"};
function xhr(url,options,returnDeferred){var isFormData=has("native-formdata")&&options&&options.data&&options.data instanceof FormData;
var response=util.parseArgs(url,util.deepCreate(defaultOptions,options),isFormData);
url=response.url;
options=response.options;
var hasNoData=!options.data&&options.method!=="POST"&&options.method!=="PUT";
if(has("ie")<=10){url=url.split("#")[0]
}var remover,last=function(){remover&&remover()
};
var dfd=util.deferred(response,cancel,isValid,isReady,handleResponse,last);
var _xhr=response.xhr=xhr._create();
if(!_xhr){dfd.cancel(new RequestError("XHR was not created"));
return returnDeferred?dfd:dfd.promise
}response.getHeader=getHeader;
if(addListeners){remover=addListeners(_xhr,dfd,response,options.uploadProgress)
}var data=typeof(options.data)==="undefined"?null:options.data,async=!options.sync,method=options.method;
try{_xhr.open(method,url,async,options.user||undefined,options.password||undefined);
if(options.withCredentials){_xhr.withCredentials=options.withCredentials
}if(has("native-response-type")&&options.handleAs in nativeResponseTypes){_xhr.responseType=nativeResponseTypes[options.handleAs]
}var headers=options.headers,contentType=(isFormData||hasNoData)?false:"application/x-www-form-urlencoded";
if(headers){for(var hdr in headers){if(hdr.toLowerCase()==="content-type"){contentType=headers[hdr]
}else{if(headers[hdr]){_xhr.setRequestHeader(hdr,headers[hdr])
}}}}if(contentType&&contentType!==false){_xhr.setRequestHeader("Content-Type",contentType)
}if(!headers||!("X-Requested-With" in headers)){_xhr.setRequestHeader("X-Requested-With","XMLHttpRequest")
}if(util.notify){util.notify.emit("send",response,dfd.promise.cancel)
}_xhr.send(data)
}catch(e){dfd.reject(e)
}watch(dfd);
_xhr=null;
return returnDeferred?dfd:dfd.promise
}xhr._create=function(){throw new Error("XMLHTTP not available")
};
if(has("native-xhr")&&!has("dojo-force-activex-xhr")){xhr._create=function(){return new XMLHttpRequest()
}
}else{if(has("activex")){try{new ActiveXObject("Msxml2.XMLHTTP");
xhr._create=function(){return new ActiveXObject("Msxml2.XMLHTTP")
}
}catch(e){try{new ActiveXObject("Microsoft.XMLHTTP");
xhr._create=function(){return new ActiveXObject("Microsoft.XMLHTTP")
}
}catch(e){}}}}util.addCommonMethods(xhr);
return xhr
});
//# sourceURL=/swAssets/6.5.7.28/dojo/dojo/request/xhr.js