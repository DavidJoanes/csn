define(["./Evented"],function(Evented){var hub=new Evented;
return{publish:function(topic,event){return hub.emit.apply(hub,arguments)
},subscribe:function(topic,listener){return hub.on.apply(hub,arguments)
}}
});
//# sourceURL=/swAssets/6.5.7.28/dojo/dojo/topic.js