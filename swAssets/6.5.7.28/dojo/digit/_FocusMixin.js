define(["./focus","./_WidgetBase","dojo/_base/declare","dojo/_base/lang"],function(focus,_WidgetBase,declare,lang){lang.extend(_WidgetBase,{focused:false,onFocus:function(){},onBlur:function(){},_onFocus:function(){this.onFocus()
},_onBlur:function(){this.onBlur()
}});
return declare("dijit._FocusMixin",null,{_focusManager:focus})
});
//# sourceURL=/swAssets/6.5.7.28/dojo/dijit/_FocusMixin.js