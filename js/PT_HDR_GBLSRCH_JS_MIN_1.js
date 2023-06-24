var addEvent = function(el, evname, func) {
 if (el.attachEvent) { 
 el.attachEvent("on" + evname, func); } else if (el.addEventListener) { 
 el.addEventListener(evname, func, true); }
}

var removeEvent = function(el, evname, func) {
 if (el.detachEvent) { 
 el.detachEvent("on" + evname, func); } else if (el.removeEventListener ) { 
 el.removeEventListener(evname, func, true); }
}

var hideSrchDropDownI = function(evt){ 
 var evtSource = getEO(window.event || evt);  var flag = checkOrigin(evtSource,"pthdrDivDropDownListI","pthdrSrchLookupI"); if (flag!=true){
 document.getElementById("pthdrDivDropDownListI").style.display ="none"; }
}


var hideSrchDropDown = function(evt){
 var evtSource = getEO(window.event || evt);  var flag =checkOrigin(evtSource,"pthdrDivDropDownList","pthdrSrchLookup"); if (flag!=true){
 document.getElementById("pthdrDivDropDownList").style.display ="none"; }

}

var hideSrchGrpList = function(evt) {

 var selSrchGrpEl = ptUtil.id("selsrchgrpspan"); var selSrchGrpElParent = ptUtil.id("selsrchgrp"); var srchListElParent = ptUtil.id("srchgrplistdiv"); var srchListEl = ptUtil.id("ipthdr2srchlist"); var eTgt = getEO(evt);  if (srchListEl && srchListEl != "undefined" && eTgt && eTgt != "undefined" && 
 eTgt.id != selSrchGrpEl.id && eTgt.id != selSrchGrpElParent.id && 
 eTgt.id != srchListEl.id && eTgt.id != srchListElParent.id) {
 if (srchListElParent.style.display == "block") {
 srchListElParent.style.display = "none";  removeEvent(document, "click", hideSrchGrpList);   if ( document.getElementById("ptifrmtgtframe"))
 removeEvent(document.getElementById("ptifrmtgtframe").contentWindow.document, "click", hideSrchGrpList); }
 }

}

function showI() {
 var elem_divDropDown = document.getElementById("pthdrDivDropDownListI"); elem_divDropDown.style.width = Number(document.getElementById("pthdr2srchedit").clientWidth)+ Number(document.getElementById("pthdrSrchLookupI").clientWidth)+3+"px"; elem_divDropDown.style.position = "absolute";  if (elem_divDropDown.style.display == "block")
 elem_divDropDown.style.display = "none"; else
 elem_divDropDown.style.display = "block";<!-- if (document.getElementById("ptifrmtgtframe")!=null){ addEvent(document.getElementById("ptifrmtgtframe").contentWindow.document, "click", hideSrchDropDownI); }-->

 <!-- Related content frame is there by default in the frames template. But this frame has no src. So when arrFrames[i].name tries to read it an exception occurs. This is 'Access Denied' exception is caught in the exception handler -->
 try{ 
 var arrFrames = top.frames; if (arrFrames.length!=0){
 for (var i = 0; i < arrFrames.length; i++) { 
 addEvent(arrFrames[i].frameElement.contentWindow.document, "click", hideSrchDropDownI); <!-- IE g= parent.document.getElementById(arrFrames[i].name); addEvent(g.contentWindow.document, "click", hideSrchDropDown); --> 
 }
 }
 }catch(err){ }
}


function show() {
 var elem_divDropDown = document.getElementById("pthdrDivDropDownList"); elem_divDropDown.style.width = Number(document.getElementById("searchfieldhdr").clientWidth)+ Number(document.getElementById("pthdrSrchLookup").clientWidth)+2+"px"; elem_divDropDown.style.position = "absolute"; if (elem_divDropDown.style.display == "block")
 elem_divDropDown.style.display = "none"; else
 elem_divDropDown.style.display = "block";  <!-- Related content frame is there by default in the frames template. But this frame has no src. So when arrFrames[i].name tries to read it an exception occurs. This is 'Access Denied' exception is caught in the exception handler -->
 try{ 
 var arrFrames = top.frames; if (arrFrames.length!=0){
 for (var i = 0; i < arrFrames.length; i++) { 
 addEvent(arrFrames[i].frameElement.contentWindow.document, "click", hideSrchDropDown); <!-- IE g= parent.document.getElementById(arrFrames[i].name); addEvent(g.contentWindow.document, "click", hideSrchDropDown); --> 
 }
 }
 }catch(err){ }
}


var getEO = function(evt){
 var browserName=navigator.appName;  if (browserName=="Microsoft Internet Explorer")
 {
 return evt.srcElement; }
 else
 {
 return evt.target; }


}


function checkOrigin(evtSource,elemDropDownList, elemCatgLookup){
 while (evtSource!=null){
 if (evtSource.id==elemDropDownList || evtSource.id==elemCatgLookup)
 return true; else
 evtSource = evtSource.parentNode; }
 return false;}


function buildDropDownI(catgName,catgId){
 if (catgName != ""){
 var arrCatgName = catgName.split("#"); var arrCatgId = catgId.split("#"); var dropDownHtml="<table class='pthdrDropDownListbg' role='presentation'>"; var elem_divDropDown = document.getElementById("pthdrDivDropDownListI"); var parent = document.getElementsByTagName("body")[0]; addEvent(parent, "click", hideSrchDropDownI); addEvent(elem_divDropDown, "click", validateAll);  for(i = 0; i < arrCatgName.length; i++){

 dropDownHtml=dropDownHtml +"<tr><td><input name='srchChkbox[]' id='pthdrSrchCatgCb"+i+"' value="+arrCatgId[i]+" type='checkbox' onclick='checkAll(this.id);'></td><td class='pthdrdropdowntd1'><label id='pthdrSrchCatgLbl' for='cb"+i+"' >"+arrCatgName[i]+"</label></td></tr>"; }
 if (i>20) {
 elem_divDropDown.style.overflow = "auto"; elem_divDropDown.style.height=(20)+"em"
 }
 elem_divDropDown.innerHTML=dropDownHtml+"</table>"; }
}


function buildDropDown(catgName,catgId){ 
 if (catgName != ""){
 var arrCatgName = catgName.split("#"); var arrCatgId = catgId.split("#"); var dropDownHtml="<table class='pthdrDropDownListbg' role='presentation'>"; var elem_divDropDown = document.getElementById("pthdrDivDropDownList"); var parent = document.getElementsByTagName("body")[0]; addEvent(parent, "click", hideSrchDropDown); addEvent(elem_divDropDown, "click", validateAll); for(i = 0; i < arrCatgName.length; i++){
 dropDownHtml=dropDownHtml +"<tr><td><input name='srchChkbox[]' id='pthdrSrchCatgCb"+i+"' value="+arrCatgId[i]+" type='checkbox' onclick='checkAll(this.id);'></td><td class='pthdrdropdowntd'><label id='pthdrSrchCatgLbl' for='cb"+i+"' >"+arrCatgName[i]+"</label></td></tr>"; }
 if (i>=20) {
 elem_divDropDown.style.overflow = "auto"; elem_divDropDown.style.height=(20)+"em"
 }
 elem_divDropDown.innerHTML=dropDownHtml+"</table>"; } 
}


function checkAll(chkId){
 checkboxArr=document.getElementsByName("srchChkbox[]"); if (checkboxArr[0].checked && chkId == "pthdrSrchCatgCb0"){ 
 for (i=0;i<checkboxArr.length;++ i){
 checkboxArr[i].checked=true; }
 }

 if (checkboxArr[0].checked==false && chkId=="pthdrSrchCatgCb0"){ 
 for (i=0;i<checkboxArr.length;++ i){
 checkboxArr[i].checked=false; }
 }
}


function validateAll(){
 var boolAllChkboxesChecked= true; checkboxArr=document.getElementsByName("srchChkbox[]"); if (checkboxArr[0].checked == true){
 for (i=1;i<checkboxArr.length;i++){
 if (checkboxArr[i].checked == false){
 boolAllChkboxesChecked = false; break;  }
 }
 }

 if (boolAllChkboxesChecked == false){
 checkboxArr[0].checked = false; }

}


function AddSrchCatgParam(){
 document.getElementById("pthdrSrchCatg").value = document.getElementById("srchgrplist").value;}

function SetSearchGroup(selSrchGrpName){
 if (!document.getElementById("srchgrplist")) return; document.getElementById("selsrchgrp").setAttribute("aria-expanded", "false"); var selectedIdx; var spanObj = document.getElementById("selsrchgrpspan"); document.getElementById("srchgrplist").value = selSrchGrpName; selectedIdx = document.getElementById("srchgrplist").selectedIndex;    var ul = document.getElementById("ipthdr2srchlist");  var liNodes = ul.getElementsByTagName("li"); var selectedLiNode = liNodes.item(selectedIdx);   if (typeof spanObj.innerText != "undefined") 
 spanObj.innerText = selectedLiNode.innerText;  else
 spanObj.textContent = selectedLiNode.textContent; SetFocusOnSGEdit();}


function updSrchGrpList() {
 
 var compCatDescr = ""; var compCat = ""; var isHomePage = searchGbl.isHomepage ? "Y" : ""; var srchGrp = "";  if (isHomePage != "Y") {
 if (top.document.getElementById("srchgrplist"))
 srchGrp=top.document.getElementById("srchgrplist").value; if (top.document.getElementById("ptus_component"))
 compCatDescr = top.document.getElementById("ptus_component").value;  if (top.document.getElementById("ptus_searchcategoryname"))
 compCat = top.document.getElementById("ptus_searchcategoryname").value;  var srchGrpDiv = ptUtil.id("srchgrplistdiv"); if (srchGrpDiv) {
 var baseURI = ""; try {
 if (typeof(Storage) !== "undefined") {
 if (sessionStorage.pBsUrl) {
 baseURI = sessionStorage.pBsUrl; } else {
  var backCookie = backNavigation.getCookieValue();   if (backCookie && backCookie.url) { 
  var sUrl = backCookie.url; sessionStorage.pBsUrl = getptBaseURIFromUrl(sUrl); } else {
 sessionStorage.pBsUrl = getptBaseURI(); }
 baseURI = sessionStorage.pBsUrl; }
 }
 } catch (e) {
  var backCookie = backNavigation.getCookieValue();  if (backCookie && backCookie.url) { 
  var sUrl = backCookie.url; baseURI = getptBaseURIFromUrl(sUrl); }
 }

 var qryStr = "SEARCH_GROUP=" + encodeURIComponent(srchGrp) 
 + "&PTUS_COMPONENT=" + encodeURIComponent(compCatDescr) + "&PTUS_COMPONENTCAT=" + encodeURIComponent(compCat)
 + "&PTUS_ISHOMEPAGE=" + encodeURIComponent(isHomePage); var ajaxURL = baseURI + "s/WEBLIB_PTIFRAME.ISCRIPT1.FieldFormula.IScript_PT_GetSrchGrp?" + qryStr; var listLoader = new net2.ContentLoader(ajaxURL,null,null,"GET",
 function () {
 var srchGrpList = this.req.responseText;  if ((srchGrpList != "") && (srchGrpList.indexOf("srchgrplist") > -1)) {
 srchGrpDiv.innerHTML = srchGrpList; updSrchGroup(); }
  },null,null,"application/x-www-form-urlencoded"); listLoader = null; }
 }
}

function updSrchGroup(){
 if (!document.getElementById("srchgrplist")) return;  var selectedIdx; var spanObj = document.getElementById("selsrchgrpspan"); selectedIdx = document.getElementById("srchgrplist").selectedIndex; var ul = document.getElementById("ipthdr2srchlist");  var liNodes = ul.getElementsByTagName("li"); var selectedLiNode = liNodes.item(selectedIdx);  if (selectedLiNode)
 selectedLiNode = selectedLiNode.children[0]; if (selectedLiNode)
 selectedLiNode = selectedLiNode.children[0];   if (typeof spanObj.innerText != "undefined") 
 spanObj.innerText = selectedLiNode.innerText;  else
 spanObj.textContent = selectedLiNode.textContent;} 

function DoFocusOnDropDown(listItem) {
 if (listItem) {
 var aElem = listItem.getElementsByTagName("a");  if (typeof aElem[0] != "undefined")
 aElem[0].focus(); }
}

function SetFocusOnSGEdit() {
 
 var ul = document.getElementById("ipthdr2linksgbl"); var liNodes; if (ul && ul.tagName.toLowerCase() == "ul") { 
 
 liNodes = ul.getElementsByTagName("li")[0]; DoFocusOnDropDown(liNodes); } else if (document.getElementById("selsrchgrp")) { 
 
 var tdNode = document.getElementById("selsrchgrp").parentNode;  if (tdNode && tdNode.tagName.toLowerCase() == "td")
 DoFocusOnDropDown(tdNode); }
}

function onKeyPressSG(e) {
 
 var keyCode = ptUtil.getKeyCode(e); if (keyCode == 40 || keyCode == 38|| keyCode == 32) 
 ToggleSrchGrpList();}

function onKeyPressSelectSG(e, sgName) {
 
 var keyCode = ptUtil.getKeyCode(e); if (keyCode == 32) {
 SetSearchGroup(sgName); ToggleSrchGrpList(); }
}

function onKeyPressDropDown(e) {
 
 var tgt = getEO(e);  var keyCode = ptUtil.getKeyCode(e); var srchListDiv = document.getElementById("srchgrplistdiv");  var bubble = true;  var item;   if (keyCode == 40) { 
 if (tgt.nodeName.toLowerCase() == "a" && tgt.parentNode.parentNode.id == "ipthdr2srchlist") {
 item = (browserInfoObj2.isIE && browserInfoObj2.version < 9)? tgt.parentNode.nextSibling : tgt.parentNode.nextElementSibling;  if (item)
 DoFocusOnDropDown(item) ; else
 DoFocusOnDropDown(tgt); } else if (tgt.nodeName.toLowerCase() == "li" && tgt.parentNode.id == "ipthdr2srchlist") {
 item = (browserInfoObj2.isIE && browserInfoObj2.version < 9)? tgt.nextSibling : tgt.nextElementSibling; if (item)
 DoFocusOnDropDown(item) ; else
 DoFocusOnDropDown(tgt); }
 bubble = false; }
 else if (keyCode == 38) {  
 if (tgt.nodeName.toLowerCase() == "a" && tgt.parentNode.parentNode.id == "ipthdr2srchlist") {
 item = (browserInfoObj2.isIE && browserInfoObj2.version < 9)? tgt.parentNode.previousSibling : tgt.parentNode.previousElementSibling;  if (item)
 DoFocusOnDropDown(item) ; else
 DoFocusOnDropDown(tgt); } else if (tgt.nodeName.toLowerCase() == "li" && tgt.parentNode.id == "ipthdr2srchlist") {
 item = (browserInfoObj2.isIE && browserInfoObj2.version < 9)? tgt.previousSibling : tgt.previousElementSibling; if (item)
 DoFocusOnDropDown(item) ; else
 DoFocusOnDropDown(tgt); } 
 bubble = false;  }
 else if (keyCode == 36) { 
 if (tgt.nodeName.toLowerCase() == "a" && tgt.parentNode.parentNode.id == "ipthdr2srchlist") {
 item = firstChildValid(tgt.parentNode.parentNode); DoFocusOnDropDown(item); } else if (tgt.nodeName.toLowerCase() == "li" && tgt.parentNode.id == "ipthdr2srchlist") {
 item = firstChildValid(tgt.parentNode); DoFocusOnDropDown(item);  } 
 bubble = false;  } 
 else if (keyCode == 35) { 
 if (tgt.nodeName.toLowerCase() == "a" && tgt.parentNode.parentNode.id == "ipthdr2srchlist") {
 item = lastChildValid(tgt.parentNode.parentNode); DoFocusOnDropDown(item); } else if (tgt.nodeName.toLowerCase() == "li" && tgt.parentNode.id == "ipthdr2srchlist") {
 item = lastChildValid(tgt.parentNode); DoFocusOnDropDown(item);  }
 bubble = false;  }
 else if (keyCode == 9) { 
 var aElem;  if (tgt.nodeName.toLowerCase() == "a" && tgt.parentNode.parentNode.id == "ipthdr2srchlist") {
 aElem = tgt; if (aElem.attributes.getNamedItem("onclick"))
 aElem.onclick();  } else if (tgt.nodeName.toLowerCase() == "li" && tgt.parentNode.id == "ipthdr2srchlist") {
 aElem = tgt.getElementsByTagName("a"); if (typeof aElem[0] != "undefined" && aElem[0].attributes.getNamedItem("onclick"))
 aElem[0].onclick();  }
 if (ptUtil.isShiftKey(e))
 SetFocusOnSGEdit(); else 
 document.getElementById("pthdr2srchedit").focus(); hideSrchGrpList(e);  bubble = false;  }

 return bubble;}

function GBLDoKeyDown(e) {
 
 var keyCode = ptUtil.getKeyCode(e); var srchListDiv = document.getElementById("srchgrplistdiv");   if (keyCode == 27 && srchListDiv.style.display == "block")
 ToggleSrchGrpList();}

function ToggleSrchGrpList() {
 var aSelsrchgrp = document.getElementById("selsrchgrp"); var srchListDiv = document.getElementById("srchgrplistdiv"); var tgtFrm = document.getElementById("ptifrmtgtframe"); if (srchListDiv.style.display == "none") {
 aSelsrchgrp.setAttribute("aria-expanded", "true"); srchListDiv.style.display = "block";  selectedIdx = document.getElementById("srchgrplist").selectedIndex; ul = document.getElementById("ipthdr2srchlist");  liNodes = ul.getElementsByTagName("li"); selectedLiNode = liNodes.item(selectedIdx); DoFocusOnDropDown(selectedLiNode);   ptEvent.add(document, "click", hideSrchGrpList);  ptEvent.add(document, "keydown", GBLDoKeyDown); ptEvent.add(srchListDiv, "keydown", onKeyPressDropDown);   if (tgtFrm)
 ptEvent.add(tgtFrm.contentWindow.document, "click", hideSrchGrpList); }
 else {
 aSelsrchgrp.setAttribute("aria-expanded", "false"); srchListDiv.style.display = "none";  ptEvent.remove(document, "click", hideSrchGrpList);  ptEvent.remove(document, "keydown", GBLDoKeyDown); ptEvent.remove(srchListDiv, "keydown", onKeyPressDropDown);  if ( tgtFrm)
 ptEvent.remove(tgtFrm.contentWindow.document, "click", hideSrchGrpList); SetFocusOnSGEdit(); }
 
 return false;}
 
<!-- Functions to start universal search -->
function DoSearch(srchType, srchURL, isSaveWarning, bcKey){
 var srchParm=""; var srchKey=""; var srchGrp=""; var dfltTxt=""; var selectedIdx; var selectedTxt; var rtnList; var openURL=""; var tgt="_parent"; var cancelFn; var isHomePage=searchGbl.isHomepage ? "Y" : ""; var compSrchCat=""; var srchSite=""; var tgtSite=""; var srchKeyFld; var stayInWorkCenter="Y"; srchKeyFld = document.getElementById("pthdr2srchedit"); if (srchKeyFld)
 srchKey=srchKeyFld.value; if (typeof(bcKey) != "undefined" && bcKey != null) {
 srchKey=bcKey; document.getElementById("pthdrDfltSrchTxt").value = "N"; }
 if (document.getElementById("srchgrplist"))
 srchGrp=document.getElementById("srchgrplist").value; if (document.getElementById("pthdrDfltSrchTxt"))
 dfltTxt=document.getElementById("pthdrDfltSrchTxt").value;  srchKey = srchKey.replace(/^\s+|\s+$/g,'');  if (dfltTxt == "Y") {
 clickclear(srchKeyFld, "Search"); dfltTxt = "N"; srchKey = ""; }

 srchParm = srchParm + "SEARCH_TEXT=" + encodeURIComponent(srchKey); srchParm = srchParm + "&SEARCH_GROUP=" + encodeURIComponent(srchGrp); srchParm = srchParm + "&DEFAULT_SRCHTXT=" + encodeURIComponent(dfltTxt); srchParm = srchParm + "&PTUS_ISHOMEPAGE=" + encodeURIComponent(isHomePage); if (document.getElementById("ptus_component"))
 srchParm = srchParm + "&PTUS_COMPONENT=" + encodeURIComponent(document.getElementById("ptus_component").value); if (document.getElementById("ptus_componenturl"))
 srchParm = srchParm + "&PTUS_COMPONENTURL=" + encodeURIComponent(document.getElementById("ptus_componenturl").value); if (document.getElementById("ptus_searchcategoryname")) {
 compSrchCat = document.getElementById("ptus_searchcategoryname").value; srchParm = srchParm + "&PTUS_COMPONENTCAT=" + encodeURIComponent(compSrchCat); }
 if (srchType == "BASIC") 
 srchParm = srchParm + "&SEARCH_TYPE=BASIC" + "&ADVSRCH=N"; else if(srchType == "SEARCHAGAIN")
 srchParm = srchParm + "&SEARCH_TYPE=SEARCHAGAIN" + "&ADVSRCH=N"; else
 srchParm = srchParm + "&SEARCH_TYPE=ADVANCE" + "&ADVSRCH=Y"; bcUpdater.setStoredData(bcUpdater.isGlobalSearch, srchType); if (srchKey != "" && dfltTxt == "N")
 bcUpdater.setStoredData(bcUpdater.searchText, srchKey); else
 bcUpdater.setStoredData(bcUpdater.searchText, "-999999-");   if (document.getElementById("ptus_component") && (srchGrp == compSrchCat) && (compSrchCat != "")) {
 if (document.getElementById("ptus_componenturl")) { 
 srchParm = srchParm + "&COMPSRCH=Y"; openURL = document.getElementById("ptus_componenturl").value; }
 else
 return; }
 else {
 
 selectedIdx = document.getElementById("srchgrplist").selectedIndex; selectedTxt = document.getElementById("srchgrplist").options[selectedIdx].text; rtnList = selectedTxt.split(","); if (srchType == "BASIC" && rtnList[0] != "")
 openURL = rtnList[0]; else if ( srchType == "ADVANCE" && rtnList[1] != "")
 openURL = rtnList[1];  if (openURL == "") 
 openURL = srchURL;  }
 
 openURL += ((openURL.indexOf("?") > 0) ? "&" : "?") + srchParm; if (typeof ptalPage != 'undefined' && ptalPage) {  
 if (document.getElementById("ptus_searchctxttype").value == "W" && srchGrp != "PTUS_ALL") {
 openURL = openURL.replace('\/psp\/','\/psc\/'); tgt= "TargetContent";  }
 else
 stayInWorkCenter = "N";  }
 else if (isHomePage != "Y" && typeof parent.ptIframe != 'undefined') { 
 
 openURL = openURL.replace('\/psp\/','\/psc\/'); tgt= "TargetContent"; }
 else
 openURL = openURL.replace('\/psc\/','\/psp\/');   srchSite = String(srchURL).split("/"); tgtSite = String(openURL).split("/");  if ((srchSite.length > 3 && tgtSite.length > 3 && srchSite[2] != tgtSite[2]) || stayInWorkCenter == "N") {
 
 OpenCrefInUniNav(openURL, ""); } else if (typeof parent.ptIframeHdr !== 'undefined' && typeof parent.ptIframe !== 'undefined' &&  
 isHomePage != "Y" && !parent.ptUtil.isClassMember(this,"pthns")) { 
 parent.ptIframe.saveWarning(openURL, cancelFn, tgt);  } else if (typeof parent.ptIframe !== 'undefined' && isHomePage != "Y" && isSaveWarning) {
 tgt = "_top"; saveWarning("TargetContent", null, tgt, openURL);  } else {
 window.open(openURL, tgt);  } 
 searchProcessing(1) ; }

<!-- Functions to reset the default text after mouse clicks or keyup for IE/Chrome when onclick is not fired -->
function clickclear(thisfield, defaulttext){
 var dfltTextEle = document.getElementById("pthdrDfltSrchTxt"); if (dfltTextEle.value == "Y") {
 if (thisfield.value == defaulttext) 
 thisfield.value = "";  dfltTextEle.value="N"; }
}

function clickrecall(thisfield, defaulttext){
 if (thisfield.value == ""){
 thisfield.value = defaulttext; document.getElementById("pthdrDfltSrchTxt").value= "Y"; } 
} 


<!-- Function to prevent the searching of the default search text -->
function finalCheck(defaulttext) 
{
 if (document.getElementById("searchfieldhdr").value == defaulttext){
 document.getElementById("searchfieldhdr").value = "";  document.getElementById("pthdrDfltSrchTxt").value= "Y"; }
 else{
 document.getElementById("pthdrDfltSrchTxt").value= "N"; } 
}



var listFormat = false;var searchGbl = {
 isHomepage: /\/h\/\?tab=/.test(location), 
 searchEnabled : true, 
 pthNavExists : false, 
 IEquirksMode : false, 
 sForm : null, 
 prevDOM : null, 
 prevMEM : [], 
 allRows : [], 
 inputs : [], 
 MAX_RESULTS : 5, 
 titleID : "ptabnsrchtitleGblSrch", 
 prevPrefix : "ptabnprevGbl_", 
 prevObjNamePrefix : "ptabnponGbl_",
 promptImg : null, 
 bcPromptClass : "ptabnsrchpromptbc",
 navPromptClass : "ptabnsrchpromptnav",
 promptPrefix : "ptabnspGbl", 
 srDivPrefix : "ptabnsrGbl_", 
 srTblPrefix : "ptabntblGbl_", 
 container : null, 
 options : null, 
 srchAgainId : "ptabnsrchagainGblSrch",
 srchAgain : null, 
 favs : null, 
 win : null, 
 useTextContent : false, 
 xlatClass : "ptabnxlat", 
 isIE7 : false, 
 popup : null, 
 currResults : null, 
 customSearch : false, 
 sbWidth : 0, 
 dTblConPrefix : "ptabndd_",
 sKey : "pssrdatag", 
 tKey : "pssrt", 
 dataSplitKey : ";SPLITDATA;", 
 clientPersist : false, 
 prevEnableTitle : "",
 prevDisableTitle : "",
 nextEnableTitle : "",
 nextDisableTitle : "",
 prevHot : "",
 nextHot : "",
 resultDetails : "",
 firstResize : true, 
 firstOpen : true, 
 isAccessible : false, 
 waitDiv : null,
 isInitialized : false, 
 init : function () {
 
 pObjName = "GBL";  searchGbl.container = top.document.getElementById("ptabncontainerGblSrch");  if (searchGbl.container && searchGbl.container.style.display != "none") {
 searchGbl.container.style.display = "none";  }

 
 if (!top.document.getElementById("pthdr2gblsrchprompt")) { 
 searchGbl.searchEnabled = false;  return; }
 else searchGbl.searchEnabled = true; searchGbl.IEquirksMode = browserInfoObj2.isIE && document.compatMode != "CSS1Compat";  searchGbl.isIE7 = browserInfoObj2.isIE && !document.documentMode;  if (typeof(window.sessionStorage) !== "undefined") { 
 searchGbl.clientPersist = true; }
 
 
 if (typeof(pthNav) !== "undefined")
 searchGbl.pthNavExists = true; if (searchGbl.clientPersist) {
 
 
 
 try {
 sessionStorage.setItem("rstest","enabled"); var test = sessionStorage.getItem("rstest"); sessionStorage.removeItem("rstest"); } catch (e) { searchGbl.searchEnabled = false; }
 }

 if (!searchGbl.searchEnabled) { return; }

 searchGbl.favs = top.document.getElementById("ptiframatfcontent");  searchGbl.sForm = top.document.getElementById("ptabnGblSrch"); searchGbl.srchAgain = top.document.getElementById(searchGbl.srchAgainId); searchGbl.prevDOM = top.document.getElementById("ptabnprevresultsGblSrch"); searchGbl.promptImg = top.document.getElementById("pthdr2srchpromptdiv"); searchGbl.title = top.document.getElementById(searchGbl.titleID); searchGbl.popup = top.document.getElementById("ptpopup"); if (typeof(ptIframe) !== "undefined") {
 searchGbl.win = ptIframe; } else { 
 if (typeof(ptIframeHdr) !== "undefined") {
 searchGbl.win = ptIframeHdr; }
 }

 if (searchGbl.container) {
 searchGbl.options = {
 title : "Last Search Results", 
 focusEl : searchGbl.srchAgain,
 onOpen : searchGbl.open, 
 onClose : searchGbl.close, 
 onResize : searchGbl.resize,
 draggable : true
 }; }
 
 
 if (searchGbl.srchAgain) {
 ptEvent.add(searchGbl.srchAgain,"click",searchGbl.onClickSrchAgain);  }
 


 
 searchGbl.useTextContent = searchGbl.title.innerText ? false : true; searchGbl.sbWidth = searchGbl.getScrollBarWidth();  searchGbl.prevHot = " (Alt+,)"; searchGbl.nextHot = " (Alt+.)"; searchGbl.prevEnableTitle = "Show previous rows" + searchGbl.prevHot; searchGbl.prevDisableTitle = "Show previous rows (inactive button)" + searchGbl.prevHot; searchGbl.nextEnableTitle = "Show next rows" + searchGbl.nextHot; searchGbl.nextDisableTitle = "Show next rows (inactive button)" + searchGbl.nextHot; searchGbl.resultDetails = "%d-%d of %d"; if (typeof(ptNav2Info) !== "undefined"){
 searchGbl.isAccessible = ptNav2Info.accessSelectedTxt !== "" ? true : false;  }
 searchGbl.isInitialized = true;  if (browserInfoObj2.isIE && searchGbl.container && searchGbl.container.style.display != "none") {
 searchGbl.container.style.display = "none";  }

 searchGbl.initPersResultsGbl();   },

 
 onKeyPress : function (ev) {
 
 var key = (window.event) ? window.event.keyCode: ev.keyCode; if ((this.id == "pthdr2srchprompt_GBL" || (this.id.indexOf("PTSF_GLOBAL_SEARCH_GBL") > -1)) && key == 9) {
 var bubble = true; return bubble; }
 },
 
 initPersResultsGbl : function () { 

 if (!searchGbl.searchEnabled) { return; }

 
 
 
 
 if (!searchGbl.clientPersist) {

 var wsSearchDiv = top.document.getElementById("ptabnwssrGbl");  if (wsSearchDiv) {

 if (!searchGbl.useTextContent) {
 searchGbl.addResultsToDOM(wsSearchDiv.innerText); } else {
 searchGbl.addResultsToDOM(wsSearchDiv.textContent); }

 wsSearchDiv.parentNode.removeChild(wsSearchDiv); }
 else
 searchGbl.getData();  } else { 
 searchGbl.getData(); } 
 
 var waitDiv = top.document.getElementById("WAIT_empty"); if (waitDiv && searchGbl.pthNavExists) {
 searchGbl.waitDiv = waitDiv; }
 
 

 
 },

 
 
 add : function (actionURL,searchResults,customSearch) { 
 
 
 if (this.container && this.container.style.display != "none") {
 this.container.style.display = "none";  }
 
 if (!this.searchEnabled) { return; }
 pObjName = "GBL";  if (!actionURL || !searchResults) { return; }

 
 
 
 var promptIcon = top.document.getElementById("pthdr2srchprompt_GBL"); if (promptIcon && promptIcon.href.indexOf("opening") > -1) {
 var popup = top.document.getElementById("ptifrmpopup"); if (popup) {
 popup.style.display = "none"; searchGbl.win.popup.close(); }
 } 

 if (!searchGbl.isInitialized) { 
 this.init(); }

 
 this.clearForm();  var xContent = false; var PortalLocation = top.document.location.href; var URLArr= String(PortalLocation).split("/"); var SrchURLArr= String(actionURL).split("/"); if(URLArr.length >= 4 && SrchURLArr.length >= 4){
 if(URLArr[4] !== SrchURLArr[4]) {
 xContent = true; }
 }

 this.sForm.action = actionURL;  var srDiv;     if (browserInfoObj2.isIE && !document.documentMode) {
 var div = document.createElement("div"); div.innerHTML = searchResults.outerHTML;  srDiv = this.sForm.appendChild(div.firstChild); } else {
 srDiv = this.sForm.appendChild(searchResults); }

 var cId = pObjName;  srDiv.id = this.srDivPrefix + cId;  var srchType = top.document.getElementById("ptabnsrchtypeKW"); var srchMode = top.document.getElementById("ptabnsrchMode"); var srchCrit = top.document.getElementById("ptabnsrchCriteria"); var srchFilters = top.document.getElementById("ptabnsrchFilters"); if (srchType && srchMode && srchCrit && (typeof(srchType) != "undefined") && (typeof(srchMode) != "undefined") && (typeof(srchCrit) != "undefined")) {
 srchType.id = srchType.id + "_" + cId; srchMode.id = srchMode.id + "_" + cId; srchCrit.id = srchCrit.id + "_" + cId; }

 var ptabnsrchKeywords = top.document.getElementById("ptabnsrchKeywords"); if (ptabnsrchKeywords) {
 ptabnsrchKeywords.id = ptabnsrchKeywords.id + "Gbl"; }

 if (srchCrit && (typeof(srchCrit) != "undefined") && srchCrit.childNodes.length > 0) {
 for (var i = 0; i < srchCrit.childNodes.length; i++) {
 var idSC = srchCrit.childNodes[i].id; if (idSC.indexOf("ptabnsrchFld_") >= 0) {
 srchCrit.childNodes[i].id = idSC.replace("ptabnsrchFld_", "ptabnsrchFldGbl_"); }
 }
 }

 if (srchFilters && (typeof(srchFilters) != "undefined") && srchFilters.childNodes) {

 for (var i = 0; i < srchFilters.childNodes.length; i++) {
 var name1 = srchFilters.childNodes[i].id; var startLoc1 = name1.indexOf("ptabnsrchFilterCount"); var startLoc2 = name1.indexOf("ptabnsrchFilterIndex_"); var startLoc3 = name1.indexOf("ptabnsrchFilter_"); if (startLoc1 > -1) {
 srchFilters.childNodes[i].id = name1.replace("ptabnsrchFilterCount", "ptabnsrchFilterCountGbl"); }
 if (startLoc2 > -1) {
 srchFilters.childNodes[i].id = name1.replace("ptabnsrchFilterIndex", "ptabnsrchFilterIndexGbl"); }
 if (startLoc3 > -1) {
 srchFilters.childNodes[i].id = name1.replace("ptabnsrchFilter", "ptabnsrchFilterGbl"); }
 } 
 }

 if (srchFilters && (typeof(srchFilters) != "undefined")) srchFilters.id = srchFilters.id + "_" +cId; var ptabnsrchCorrectHistory = top.document.getElementById("ptabnsrchCorrectHistory"); var ptabnsrchIncludeHistory = top.document.getElementById("ptabnsrchIncludeHistory"); var ptabnsrchMatchCase = top.document.getElementById("ptabnsrchMatchCase"); var ptabnsrchViewAsGrid = top.document.getElementById("ptabnsrchViewAsGrid"); if (typeof(ptabnsrchIncludeHistory) != "undefined" && ptabnsrchCorrectHistory) {
 ptabnsrchCorrectHistory.id = ptabnsrchCorrectHistory.id + "_" + cId; }
 if (typeof(ptabnsrchIncludeHistory) != "undefined" && ptabnsrchIncludeHistory) {
 ptabnsrchIncludeHistory.id = ptabnsrchIncludeHistory.id + "_" + cId; }
 if (typeof(ptabnsrchMatchCase) != "undefined" && ptabnsrchMatchCase) {
 ptabnsrchMatchCase.id = ptabnsrchMatchCase.id + "_" + cId; }
 if (typeof(ptabnsrchViewAsGrid) != "undefined" && ptabnsrchViewAsGrid) {
 ptabnsrchViewAsGrid.id = ptabnsrchViewAsGrid.id + "_" + cId; }


 if (!top.document.getElementById("ptabndatalist")) 
 {
 listFormat = false;  var hTbl = top.document.getElementById("ptabnht"); if (!hTbl) { return; }
 hTbl.id += "_" + cId;  var hColGroup = top.document.getElementById("ptabnht_cg"); hColGroup.id += "_" + cId;  hTbl.parentNode.id += "_" + cId;    var dTbl = top.document.getElementById("ptabndt"); if (!dTbl) { return; }
 dTbl.id += "_" + cId;  var dColGroup = top.document.getElementById("ptabndt_cg"); dColGroup.id += "_" + cId;  dTbl.parentNode.id += "_" + cId;  var divContainer = dTbl.parentNode.parentNode.parentNode.parentNode;  if (divContainer) divContainer.style.width = "";   var actionUrlDiv = document.createElement("div"); actionUrlDiv.id = "actionURLGbl"; actionUrlDiv.style.display = "none"; actionUrlDiv.visibility = "hidden"; actionUrlDiv.innerHTML = actionURL; dTbl.parentNode.appendChild(actionUrlDiv);   if (xContent) {
 var xContentUrlDiv = document.createElement("div"); xContentUrlDiv.id = "xContentURLGbl"; xContentUrlDiv.style.display = "none"; xContentUrlDiv.visibility = "hidden"; xContentUrlDiv.innerHTML = top.document.location.href; dTbl.parentNode.appendChild(xContentUrlDiv); }

 
 var sType = document.createElement("div"); sType.id = "searchTypeGbl"; sType.style.display = "none"; sType.visibility = "hidden";  var compName = document.createElement("span"); compName.id = "compNameGbl"; compName.style.display = "none"; compName.visibility = "hidden"; if (this.pthNavExists && pthNav.portalObjName) compName.innerHTML = pthNav.portalObjName;   var titleKW = top.document.getElementById("pthdr2srchedit");  if (titleKW) {
 titleKW = titleKW.value; titleSpan = document.createElement("span"); titleSpan.id = "titleKWGbl"; titleSpan.style.display = "none"; titleSpan.visibility = "hidden"; titleSpan.innerHTML = titleKW; dTbl.parentNode.appendChild(titleSpan); }
 
 

 
 var srchGroup = top.document.getElementById("srchgrplist");  var srchGroupSel = "PTUS_ALL"; if (srchGroup) {
 for (var i=0; i < srchGroup.childNodes.length; i++) {
 if (srchGroup.childNodes[i].selected && srchGroup.childNodes[i].selected != false) {
 srchGroupSel = srchGroup.childNodes[i].value; }
 }
 if (srchGroupSel == "") srchGroupSel = "PTUS_ALL";   grpSpan = document.createElement("span"); grpSpan.id = "srchGroupGbl"; grpSpan.style.display = "none"; grpSpan.visibility = "hidden"; grpSpan.innerHTML = srchGroupSel; dTbl.parentNode.appendChild(grpSpan); }
 
 
 var srchParm = ""; var dfltTxt = "";  if (top.document.getElementById("pthdrDfltSrchTxt"))
 dfltTxt=top.document.getElementById("pthdrDfltSrchTxt").value;  srchParm = "&DEFAULT_SRCHTXT=" + dfltTxt;  if (top.document.getElementById("ptus_searchctxttype"))
 srchParm = srchParm + "&PTUS_SEARCHCTXTTYPE=" + top.document.getElementById("ptus_searchctxttype").value; if (top.document.getElementById("ptus_ishomepage"))
 srchParm = srchParm + "&PTUS_ISHOMEPAGE=" + top.document.getElementById("ptus_ishomepage").value; if (top.document.getElementById("ptus_component"))
 srchParm = srchParm + "&PTUS_COMPONENT=" + top.document.getElementById("ptus_component").value; if (top.document.getElementById("ptus_componenturl"))
 srchParm = srchParm + "&PTUS_COMPONENTURL=" + top.document.getElementById("ptus_componenturl").value; if (top.document.getElementById("ptus_searchcategoryname"))
 srchParm = srchParm + "&PTUS_COMPONENTCAT=" + top.document.getElementById("ptus_searchcategoryname").value;  parmSpan = document.createElement("span"); parmSpan.id = "paramGbl"; parmSpan.style.display = "none"; parmSpan.visibility = "hidden"; parmSpan.title = srchParm; dTbl.parentNode.appendChild(parmSpan);  if (this.sForm.action.indexOf("PTSF_GLOBAL_SEARCH") > -1) {
 sType.innerHTML = "gblPage"; }
 else {
 sType.innerHTML = "compPage"; }
 dTbl.parentNode.appendChild(sType); dTbl.parentNode.appendChild(compName); if (typeof(customSearch) === "undefined" || customSearch === "") {
 
 this.customSearch = false;  var ths = dTbl.tHead.rows[0].cells;  for (var i = 0, j = ths.length; i < j; i++) {
 dTbl.parentNode.parentNode.appendChild(this.addKey(ths[i])); ths[i].id = ths[i].id + "_GBL"; } 
 var persSrchInput = document.createElement("tHead");  persSrchInput.id = "SRCH_PERSIST"; dTbl.parentNode.parentNode.appendChild(this.addKey(persSrchInput)); } else { 

 this.customSearch = true; var jsData; if (window.JSON) { 
 try {
 customSearch = customSearch.replace(/\r\n/g, ' '); customSearch = customSearch.replace(/\n/g, ' '); jsData = JSON.parse(customSearch);  } catch(e) { alert(e); }
 } else {

 var validate = function () {
 return /^\{"ptCustomSearch":\[(?:\{"name":\s*"(?:[^"]|(:?\\"))*?"\s*,\s*"value":\s*"(?:[^"]|(:?\\"))*?"\})??(?:,\s*(?:\{"name":\s*"(?:[^"]|(:?\\"))*?"\s*,\s*"value":\s*"(?:[^"]|(:?\\"))*?"\}))*?\]\}$/.test(customSearch); }; if (validate()) {
 jsData = eval('(' + customSearch + ')'); } else {
 alert("parse error"); return; }
 }

 for (var i = 0; i < jsData.ptCustomSearch.length; i++) {
 dTbl.parentNode.parentNode.appendChild(this.addCustomKey(jsData.ptCustomSearch[i])); }
 
 
 
 var dataTable = top.document.getElementById("ptabndt_GBL"); var dataTableResults = ""; for (var h=0; h < dataTable.childNodes.length; h++) {
 if (dataTable.childNodes[h].nodeName.toLowerCase() == "tbody") { 
 dataTableResults = dataTable.childNodes[h]; if (dataTableResults) {
 for (var i=0; i < dataTableResults.childNodes.length; i++) { 
 for (var j=0; j < dataTableResults.childNodes[i].childNodes.length; j++) { 
 for (var k=0; k < dataTableResults.childNodes[i].childNodes[j].childNodes.length; k++) { 
 var resLink = dataTableResults.childNodes[i].childNodes[j].childNodes[k]; if (resLink.nodeName.toLowerCase() == "a" 
 && resLink.href.indexOf("ptCommonObj2.submitABNAction") > -1) {
 resLink.href = ""; }
 }
 }
 }
 }
 }
 }
 
 }
 
 
 var sBar = top.document.getElementById("ptabnsbc_"); if (sBar) {
 sBar.id += cId; var cNode; for (var i = 0; i < sBar.childNodes.length; i++) {
 cNode = sBar.childNodes[i]; if (typeof(cNode.id) !== "undefined") {
 cNode.id += cId; }
 }
 }

 
 if (browserInfoObj2.isIE) { 
 this.stripe(dTbl,"ptabnroweven"); }

 this.cloneResults(dTbl);  this.addPrompt(); }
 
 
 else { 
 
 listFormat = true; var dList = top.document.getElementById("ptabndatalist"); if (!dList) { return; }
 dList.id += "_" + cId;  dList.parentNode.id += "_" + cId;  dList.parentNode.className = "ptabnldivcont";  if (dList.childNodes[0].nodeType == 3) {
 listLength = dList.childNodes.length; var newDiv = document.createElement("div"); for (var i = 0, j = 0; i < listLength; i++, j++) {
 var dNode = dList.childNodes[j];  if (dNode.nodeType == 3) {
 dNode.nodeValue = ""; dNode.parentNode.removeChild[dNode]; }
 else {
 cNode = dNode.cloneNode(true); newDiv.appendChild(cNode); }
 }
 dList.innerHTML = newDiv.innerHTML; }
 
 
 var sType = document.createElement("span"); sType.id = "searchTypeGbl"; sType.style.display = "none"; sType.visibility = "hidden";  var compName = document.createElement("span"); compName.id = "compNameGbl"; compName.style.display = "none"; compName.visibility = "hidden"; if (this.pthNavExists && pthNav.portalObjName) compName.innerHTML = pthNav.portalObjName;   var titleKW; if (bcUpdater)
 titleKW = bcUpdater.getStoredData(bcUpdater.searchText); else {
 var advSrchKW; var basicSrchKW = top.document.getElementById("pthdr2srchedit"); if (frames['TargetContent']) {
 tgtFrame = frames['TargetContent']; advSrchKW = tgtFrame.document.getElementById("PTUS_ADV_SRCH_PTUS_KEYWORDS"); }
 if (advSrchKW)
 titleKW = advSrchKW.value; else if (basicSrchKW)
 titleKW = basicSrchKW.value; }
 if (titleKW) { 
 titleSpan = document.createElement("span"); titleSpan.id = "titleKWGbl"; titleSpan.style.display = "none"; titleSpan.visibility = "hidden"; titleSpan.innerHTML = titleKW; dList.parentNode.appendChild(titleSpan); }
 
 var srchGroupSel = ""; var srchGroup = top.document.getElementById("srchgrplist");  if (srchGroup) {
 for (var i=0; i < srchGroup.childNodes.length; i++) {
 if (srchGroup.childNodes[i].selected && srchGroup.childNodes[i].selected != false) {
 srchGroupSel = srchGroup.childNodes[i].value; }
 }
 
 if (srchGroupSel == "") srchGroupSel = "PTUS_ALL";   grpSpan = document.createElement("span"); grpSpan.id = "srchGroupGbl"; grpSpan.style.display = "none"; grpSpan.visibility = "hidden"; grpSpan.innerHTML = srchGroupSel; dList.parentNode.appendChild(grpSpan); }
 
 
 var srchParm = ""; var dfltTxt = "";  if (top.document.getElementById("pthdrDfltSrchTxt"))
 dfltTxt=top.document.getElementById("pthdrDfltSrchTxt").value;  srchParm = "&DEFAULT_SRCHTXT=" + dfltTxt;   RASpan = document.createElement("span"); RASpan.id = "RelatedActionsFlagPersGbl"; RASpan.style.display = "none"; RASpan.visibility = "hidden"; dList.parentNode.appendChild(RASpan);  if (top.document.getElementById("ptus_searchctxttype"))
 srchParm = srchParm + "&PTUS_SEARCHCTXTTYPE=" + top.document.getElementById("ptus_searchctxttype").value; if (top.document.getElementById("ptus_ishomepage"))
 srchParm = srchParm + "&PTUS_ISHOMEPAGE=" + top.document.getElementById("ptus_ishomepage").value; if (top.document.getElementById("ptus_component"))
 srchParm = srchParm + "&PTUS_COMPONENT=" + top.document.getElementById("ptus_component").value; if (top.document.getElementById("ptus_componenturl"))
 srchParm = srchParm + "&PTUS_COMPONENTURL=" + top.document.getElementById("ptus_componenturl").value; if (top.document.getElementById("ptus_searchcategoryname"))
 srchParm = srchParm + "&PTUS_COMPONENTCAT=" + top.document.getElementById("ptus_searchcategoryname").value; if (typeof ptalPage != 'undefined' && ptalPage) 
 srchParm = srchParm + "&PTUS_WORKCENTERID=" + ptalPage.id; else
 srchParm = srchParm + "&PTUS_WORKCENTERID=";  parmSpan = document.createElement("span"); parmSpan.id = "paramGbl"; parmSpan.style.display = "none"; parmSpan.visibility = "hidden"; parmSpan.title = srchParm; dList.parentNode.appendChild(parmSpan);  if (this.sForm.action.indexOf("PTSF_GLOBAL_SEARCH") > -1) {
 sType.innerHTML = "gblPage"; }
 else {
 sType.innerHTML = "compPage"; }
 dList.parentNode.appendChild(sType); dList.parentNode.appendChild(compName);    this.customSearch = false;    var sBar = top.document.getElementById("ptabnsbc_"); if (sBar) {
 sBar.id += cId; var cNode; for (var i = 0; i < sBar.childNodes.length; i++) {
 cNode = sBar.childNodes[i]; if (typeof(cNode.id) !== "undefined") {
 cNode.id += cId; cNode.className = "ptabnhide";  }
 }
 sBar.parentNode.className = "ptabnlsb";  }
 
 
 var n = 0; var m = 0; var relActStrSpans = ptUtil.getElemsByClass("relActString", dList, "span"); var tabIndex = 3 + dList.childNodes.length;  for (var i = 0; i < dList.childNodes.length; i++) {
 for (var j = 0; j < dList.childNodes[i].childNodes.length; j++) {
 if (dList.childNodes[i].childNodes[j].className == "ptabntitle") {
 var divCont = document.createElement("div"); divCont.className = "ptabnlistcontainer"; var titleInnerHtml = dList.childNodes[i].childNodes[j].innerHTML; divCont.innerHTML = titleInnerHtml;  while (dList.childNodes[i].childNodes[j].childNodes.length >= 1)
  {
  dList.childNodes[i].childNodes[j].removeChild(dList.childNodes[i].childNodes[j].firstChild);   } 

 
 dList.childNodes[i].childNodes[j].appendChild(divCont); dList.childNodes[i].childNodes[j].id = "persResultGbl$" + n; var relActLink = document.createElement("a"); relActLink.className = "relactionlink"; relActLink.id = "relatedActionsPersGbl$" + n;  relActLinkSpanId = "relatedActionsPersSpanGbl$" + n; relActLink.innerHTML = '<span  id=' + relActLinkSpanId + ' alt="Get Related Actions" ' + ' class="relactionimg">&nbsp;</span>'; relActLink = dList.childNodes[i].childNodes[j].appendChild(relActLink);   var relActStr = document.createElement("span"); if (relActStrSpans.length > 0) {
 relActStr = relActStrSpans[0]
 }
 relActStr.id = "relatedActionsPersGbl$" + n + "Str"; relActStr.className = "relActString"; relActStr.style.display = "none"; relActStr.style.visibility = "hidden"; dList.childNodes[i].childNodes[j].appendChild(relActStr);  if (relActStrSpans.length > 0) {
 var relActStrOld = lastChildValid(dList.childNodes[i].childNodes[j].childNodes[0]); if (relActStrOld && relActStrOld.className == "relActString") {
 relActStrOld.parentNode.removeChild(relActStrOld); }
 relActStrSpans.splice(0, 1); }

 n += 1;  for (var k = 0; k < dList.childNodes[i].childNodes[j].childNodes[0].childNodes.length; k++) {
 if (dList.childNodes[i].childNodes[j].childNodes[0].childNodes[k].className == "ptabnurl") {
 var urlNode = dList.childNodes[i].childNodes[j].childNodes[0].childNodes[k]; var url = urlNode.innerHTML; url = url.replace(/\&amp;/g,'&');  var linkNode = dList.childNodes[i].childNodes[j].childNodes[0].childNodes[0].childNodes[0];  linkNode.id = "srchRsltUrlPersGbl$" + m; linkNode.tabIndex = tabIndex + 1; relActLink.href = "javascript:getOneSrchRsltRelatedActions('" + url + "', '" + relActLink.id + "', " + m + ");"; linkNode.setAttribute("ra", url);  relActLink.tabIndex = tabIndex + 2; linkNode.href = url;  urlNode.parentNode.removeChild(urlNode);  m += 1; }
 }
 }

 tabIndex += 1;  }
 } 
 

 
 
 this.cloneResultsList(dList); this.addEvents(dList,this.customSearch);   this.addPrompt(); }

 },

 handleNextRows : function (s,sr,node) {

 
 var prev = top.document.getElementById("ptabnpi_" + s.currResults.objName); if (prev && parent.ptUtil.isClassMember(prev,"ptabnprevimgD")) {
 parent.ptUtil.swapClass(prev,"ptabnprevimgD","ptabnprevimg"); prev.title = s.prevEnableTitle; var first = top.document.getElementById("ptabnf_" + s.currResults.objName);  if (first) {
 first.className = "PSSRCHRESULTSHYPERLINK"; first.href = ""; }
 }

 if (typeof(sr.currMin) === "undefined") {
 sr.currMin = "1"; }

 
 var nChunkSize = parseInt(sr.chunkSize); var nCurrMin = parseInt(sr.currMin) + nChunkSize; var nPageSize = nCurrMin + nChunkSize - 1;  var pageSize; if (nPageSize > parseInt(sr.totalResults)) {
 pageSize = sr.totalResults; } else {
 pageSize = String(nPageSize); }

 sr.currMin = String(nCurrMin); var srSpan = top.document.getElementById("ptabnns_" + sr.objName); if (srSpan) {
 srSpan.firstChild.data = s.resultDetails.format(sr.currMin,pageSize,sr.totalResults); }

 
 
 
 if (parseInt(pageSize) === parseInt(sr.totalResults)) {

 var last = top.document.getElementById("ptabnl_" + s.currResults.objName);  if (last) {
 last.className = "PSSRCHRESULTSHYPERLINKD"; last.removeAttribute("href"); }

 parent.ptUtil.swapClass(node,"ptabnnextimg","ptabnnextimgD"); node.title = s.nextDisableTitle; }
 
 var viewPage = parseInt(nPageSize / nChunkSize - 1);  var dTbl = top.document.getElementById("ptabndt_" + sr.objName); if (dTbl) {
 for (var i = 0; i < dTbl.tBodies.length; i++) {
 dTbl.tBodies[i].className = "ptabnhide";  }
 dTbl.tBodies[viewPage].className = "";  }

 
 if (browserInfoObj2.isIE && s.IEquirksMode) {
 s.win.popup.resize(); }

 },

 handlePrevRows : function (s,sr,node) {

 
 var next = top.document.getElementById("ptabnni_" + s.currResults.objName); if (next && parent.ptUtil.isClassMember(next,"ptabnnextimgD")) {
 parent.ptUtil.swapClass(next,"ptabnnextimgD","ptabnnextimg"); next.title = s.nextEnableTitle; var last = top.document.getElementById("ptabnl_" + s.currResults.objName);  if (last) {
 last.className = "PSSRCHRESULTSHYPERLINK"; last.href = ""; }
 }

 if (typeof(sr.currMin) === "undefined") {
 sr.currMin = "1"; }

 
 var nChunkSize = parseInt(sr.chunkSize); var nCurrMin = parseInt(sr.currMin) - nChunkSize;  if (nCurrMin < 1) { nCurrMin = 1; }

 var nPageSize = nCurrMin + nChunkSize - 1; sr.currMin = String(nCurrMin); var srSpan = top.document.getElementById("ptabnns_" + sr.objName); if (srSpan) {
 srSpan.firstChild.data = s.resultDetails.format(sr.currMin,String(nPageSize),sr.totalResults); }

 
 
 if (nCurrMin === 1) {

 var first = top.document.getElementById("ptabnf_" + s.currResults.objName);  if (first) {
 first.className = "PSSRCHRESULTSHYPERLINKD"; first.removeAttribute("href"); }

 parent.ptUtil.swapClass(node,"ptabnprevimg","ptabnprevimgD"); node.title = s.prevDisableTitle; }

 var viewPage = parseInt(nPageSize / nChunkSize - 1);  var dTbl = top.document.getElementById("ptabndt_" + sr.objName); if (dTbl) {
 for (var i = 0; i < dTbl.tBodies.length; i++) {
 dTbl.tBodies[i].className = "ptabnhide";  }
 dTbl.tBodies[viewPage].className = "";  }

 
 if (browserInfoObj2.isIE && s.IEquirksMode) {
 s.win.popup.resize(); }

 },
 
 handlePages : function (s,sr,node,id) {
 
 

 if (typeof(sr.currMin) === "undefined") {
 sr.currMin = "1"; }

 
 var nChunkSize = parseInt(sr.chunkSize); var nCurrMin = parseInt(sr.currMin) + nChunkSize; var nPageSize = nCurrMin + nChunkSize - 1;  var pageSize; if (nPageSize > parseInt(sr.totalResults)) {
 pageSize = sr.totalResults; } else {
 pageSize = String(nPageSize); }

 sr.currMin = String(nCurrMin);   var dList = top.document.getElementById("ptabndatalist_" + sr.objName);  var nPages = dList.childNodes.length 
 
 
 var pageId = id.lastIndexOf("_");  pageId = id.substring(pageId); pageId = pageId.split("_"); pageNum = parseInt(pageId[1]);   pType = id.split("_"); pType = pType[0];   currPage = parseInt(pageNum);   var viewPage = ""; if (pType == "prev" && currPage != 0) viewPage = currPage - 1; else if (pType == "next" && currPage != nPages - 1) viewPage = currPage + 1; else if (pType == "prev" || pType == "next") viewPage = currPage;  else { 
 viewPage = pageNum; }
 
 
 if (dList) {
 for (var i = 0; i < dList.childNodes.length; i++) {
 dList.childNodes[i].className = "ptabnhide";  }
 dList.childNodes[viewPage].className = "";  }
 

 var pageContainer = top.document.getElementById("ptabnlpgCont_" + s.currResults.objName);    ellips = parent.ptUtil.getElemsByClass("ptabnellip", pageContainer); for (var i = 0; i < ellips.length; i++) {
 pageContainer.removeChild(ellips[i]); }
 
 
 for (i = 1; i <= nPages; i++){
 pageContainer.childNodes[i-1].className = "ptabnpage"; }
 
 var prevLink = top.document.getElementById("ptabnppageid_" + s.currResults.objName); var nextLink = top.document.getElementById("ptabnnpageid_" + s.currResults.objName); prevLink.className = "ptabnnppage ptabnppage"; nextLink.className = "ptabnnppage ptabnnpage";   var totPgNumShown = parseInt(7);     if (totPgNumShown < nPages) {
 var p = parseInt(viewPage) + 1;  var n = (totPgNumShown - 2);  var n = (n - 1)/2;     for (i = 2; i < nPages; i++){
 pageContainer.childNodes[i-1].className = "ptabnphide"; }
 
 
 
 
 var ellip1 = document.createElement("span"); ellip1.className = "ptabnellip"; ellip1.innerHTML = "...";  var ellip2 = document.createElement("span"); ellip2.className = "ptabnellip"; ellip2.innerHTML = "...";  if (p-n > 2 && p+n < nPages - 1) {
 for (var i=p-n; i<=p+n; i++) {
 pageContainer.childNodes[i-1].className = "ptabnpage"; }
 pageContainer.childNodes[viewPage].className = "ptabnpcurr";  pageContainer.insertBefore(ellip1, pageContainer.childNodes[p-n-1]); pageContainer.insertBefore(ellip2, pageContainer.childNodes[p+n+1]);  }
 else if (p <= 1 + totPgNumShown - 2){ 
 for (var i=2; i<= 1 + totPgNumShown - 2; i++) { 
 pageContainer.childNodes[i-1].className = "ptabnpage"; }
 if (viewPage == 0) {
 prevLink.className = "ptabnnppage ptabnppageD";  }
 pageContainer.childNodes[viewPage].className = "ptabnpcurr"; pageContainer.insertBefore(ellip1, pageContainer.childNodes[1 + totPgNumShown - 2]);  }
 else { 
 for (var i = nPages - (totPgNumShown - 2); i<=nPages - 1; i++) {
 pageContainer.childNodes[i-1].className = "ptabnpage"; }
 if (viewPage == nPages - 1) {
 nextLink.className = "ptabnnppage ptabnnpageD";  }
 pageContainer.childNodes[viewPage].className = "ptabnpcurr"; pageContainer.insertBefore(ellip1, pageContainer.childNodes[nPages - (totPgNumShown - 2) - 1]);  }
 }
 else { 
 if (viewPage == 0) {
 pageContainer.childNodes[viewPage].className = "ptabnpcurr"; prevLink.className = "ptabnnppage ptabnppageD";  }
 else if (viewPage == nPages - 1) {
 pageContainer.childNodes[viewPage].className = "ptabnpcurr"; nextLink.className = "ptabnnppage ptabnnpageD";  }
 else pageContainer.childNodes[viewPage].className = "ptabnpcurr"; }

 
 if (browserInfoObj2.isIE && s.IEquirksMode) {
 s.win.popup.resize(); }

 
 var RASpan = top.document.getElementById("RelatedActionsFlagPersGbl"); if (RASpan) {
 RASpan.value = "true";  getAllRelatedActions(); RASpan.value = "false"; }

 },
 
 
 onClickSearchBar : function (e) {

 if (!e.target) { return; }

 if (e.type == "keydown") {
 var key = (window.event) ? window.event.keyCode: e.keyCode; if (key != const_keyCode.ENTER) { return true; }
 }
 
 var tgtPrefix = ""; if (typeof(e.target.id) !== "undefined") {
 tgtPrefix = e.target.id.split("_",1)[0];  if (tgtPrefix === "ptabnsbc") { return; }
 }

 var s = searchGbl; var elType = e.target.nodeName.toLowerCase();  var viewAllHandler = function (node) {
 
 var tBodies = s.sForm.getElementsByTagName("table")[1].tBodies; if (node.name === "ptabnviewall") {

 
 for (var i = 0; i < tBodies.length; i++) {
 tBodies[i].className = ""; }

 
 var sib = node.nextSibling; while(sib) {
 if (sib.nodeName.toLowerCase() === "a" || sib.nodeName.toLowerCase() === "div") {
 if (sib.className === "PSSRCHRESULTSHYPERLINK") {
 sib.className = "PSSRCHRESULTSHYPERLINKD"; sib.removeAttribute("href"); } else if (parent.ptUtil.isClassMember(sib,"ptabnprevimg")) {
 parent.ptUtil.swapClass(sib,"ptabnprevimg","ptabnprevimgD"); sib.title = s.prevDisableTitle; } else if (parent.ptUtil.isClassMember(sib,"ptabnnextimg")) {
 parent.ptUtil.swapClass(sib,"ptabnnextimg","ptabnnextimgD"); sib.title = s.nextDisableTitle; }
 }
 sib = sib.nextSibling;  }

 
 node.name = "ptabnviewchunk"; node.firstChild.style.display = "none"; node.lastChild.style.display = "inline";  sr.currMin = "1"; var srDetails = top.document.getElementById("ptabnns_" + s.currResults.objName); if (srDetails) {
 srDetails.firstChild.data = s.resultDetails.format(sr.currMin,sr.totalResults,sr.totalResults); }

 } else { 

 
 for (var i = tBodies.length - 1; i > 0; i--) {
 tBodies[i].className = "ptabnhide"; }

 
 var next = top.document.getElementById("ptabnni_" + s.currResults.objName); var last = top.document.getElementById("ptabnl_" + s.currResults.objName);  if (next) { 
 parent.ptUtil.swapClass(next,"ptabnnextimgD","ptabnnextimg"); next.title = s.nextEnableTitle; }

 if (last) { 
 last.className = "PSSRCHRESULTSHYPERLINK"; last.href = ""; }

 node.name = "ptabnviewall"; node.lastChild.style.display = "none"; node.firstChild.style.display = "inline";  sr.currMin = "1"; var srDetails = top.document.getElementById("ptabnns_" + s.currResults.objName); if (srDetails) {
 srDetails.firstChild.data = s.resultDetails.format(sr.currMin,sr.chunkSize,sr.totalResults); }
 }

 
 s.win.popup.resize(); }; var sr = s.currResults; if (typeof(sr.currMin) === "undefined") {
 sr.currMin = "1"; }

 
 if (elType === "span") {
 if (e.target.parentNode.id.split("_",1)[0] === "ptabnva") {
 viewAllHandler(e.target.parentNode); }
 return false; }

 if (elType === "a") {
 if (tgtPrefix === "ptabnva") { 
 viewAllHandler(e.target); return false; } 
 if (e.target.parentNode.id.split("_",1)[0] === "ptabnlpgCont") { 
 s.handlePages(s,sr,e.target,e.target.id); }
 else if (!parent.ptUtil.isClassMember(e.target,"PSSRCHRESULTSHYPERLINKD")){

 if (tgtPrefix === "ptabnf") { 
 
 
 var next = top.document.getElementById("ptabnni_" + s.currResults.objName); if (next && parent.ptUtil.isClassMember(next,"ptabnnextimgD")) {
 parent.ptUtil.swapClass(next,"ptabnnextimgD","ptabnnextimg"); next.title = s.nextEnableTitle; var last = top.document.getElementById("ptabnl_" + sr.objName);  if (last) {
 last.className = "PSSRCHRESULTSHYPERLINK"; last.href = ""; s.srchAgain.focus(); }
 }

 
 sr.currMin = "1"; var srSpan = top.document.getElementById("ptabnns_" + sr.objName); if (srSpan) {
 srSpan.firstChild.data = s.resultDetails.format(sr.currMin,sr.chunkSize,sr.totalResults); }

 
 e.target.className = "PSSRCHRESULTSHYPERLINKD"; e.target.removeAttribute("href"); var prevImg = top.document.getElementById("ptabnpi_" + sr.objName); if (prevImg) {
 parent.ptUtil.swapClass(prevImg,"ptabnprevimg","ptabnprevimgD"); prevImg.title = s.prevDisableTitle; }
 
 

 if (!listFormat) {
  var dTbl = top.document.getElementById("ptabndt_" + sr.objName);  if (dTbl) {
  for (var i = 1; i < dTbl.tBodies.length; i++) {
  dTbl.tBodies[i].className = "ptabnhide";  }
 dTbl.tBodies[0].className = "";   }
 }
 else { 
  var dTbl = top.document.getElementById("ptabndatalist_" + sr.objName);   if (dTbl) {
 for (var i = 1; i < dTbl.childNodes.length; i++) {
  dTbl.childNodes[i].className = "ptabnhide";  }
 dTbl.childNodes[0].className = "";   }
 }
 
 
 if (browserInfoObj2.isIE && s.IEquirksMode) {
 s.win.popup.resize(); }

 } else if (tgtPrefix === "ptabnl") { 

 
 var prev = top.document.getElementById("ptabnpi_" + s.currResults.objName); if (prev && parent.ptUtil.isClassMember(prev,"ptabnprevimgD")) {
 parent.ptUtil.swapClass(prev,"ptabnprevimgD","ptabnprevimg"); prev.title = s.prevEnableTitle; var first = top.document.getElementById("ptabnf_" + sr.objName);  if (first) {
 first.className = "PSSRCHRESULTSHYPERLINK"; first.href = ""; s.srchAgain.focus(); }
 }

 
 var nTotalResults = parseInt(sr.totalResults),
 nChunkSize = parseInt(sr.chunkSize),
 modRtn = nTotalResults % nChunkSize; if (modRtn === 0) {
 sr.currMin = String(nTotalResults - nChunkSize + 1); } else {
 sr.currMin = String(nTotalResults - modRtn + 1); }

 var srSpan = top.document.getElementById("ptabnns_" + sr.objName); if (srSpan) {
 srSpan.firstChild.data = s.resultDetails.format(sr.currMin,sr.totalResults,sr.totalResults); }

 
 e.target.className = "PSSRCHRESULTSHYPERLINKD"; e.target.removeAttribute("href"); var nextImg = top.document.getElementById("ptabnni_" + sr.objName); if (nextImg) {
 parent.ptUtil.swapClass(nextImg,"ptabnnextimg","ptabnnextimgD"); nextImg.title = s.nextDisableTitle; }

 
 if (!listFormat) {
  var dTbl = top.document.getElementById("ptabndt_" + sr.objName);  if (dTbl) {
 for (var i = 0; i < dTbl.tBodies.length - 1; i++) {
  dTbl.tBodies[i].className = "ptabnhide";  }
 dTbl.tBodies[i].className = "";   }
 }
 
 else {
  var dTbl = top.document.getElementById("ptabndatalist_" + sr.objName);   if (dTbl) {
 for (var i = 0; i < dTbl.childNodes.length - 1; i++) {
  dTbl.childNodes[i].className = "ptabnhide";  }
 dTbl.childNodes[i].className = "";   }
 }
 
 
 if (browserInfoObj2.isIE && s.IEquirksMode) {
 s.win.popup.resize(); }

 } 
 }

 } else if (elType === "div") {
 if (tgtPrefix === "ptabnpi" && !parent.ptUtil.isClassMember(e.target,"ptabnprevimgD")) { 
 s.handlePrevRows(s,sr,e.target); } else if (tgtPrefix === "ptabnni" && !parent.ptUtil.isClassMember(e.target,"ptabnnextimgD")) { 
 s.handleNextRows(s,sr,e.target); }
 else if (tgtPrefix === "ptabnnpageid") {
 var dList = top.document.getElementById("ptabndatalist_" + sr.objName);   var currPage = 0; for (i = 0; i < dList.childNodes.length; i++) {
 if (dList.childNodes[i].className != "ptabnhide") {
 s.handlePages(s,sr,e.target,"next_" + i); break; }
 }
 } 
 else if (tgtPrefix === "ptabnppageid") {
 var dList = top.document.getElementById("ptabndatalist_" + sr.objName);   var currPage = 0; for (i = 0; i < dList.childNodes.length; i++) {
 if (dList.childNodes[i].className != "ptabnhide") {
 s.handlePages(s,sr,e.target,"prev_" + i); break; }
 }
 } 
 }

 return false; },

 
 onMouseOverRA : function (e) {
 if ((e.target.className == "ptabntitle" && e.target.id.indexOf("persResult") > -1) || (e.target.className == "ptabnlist" && e.target.id.indexOf("UrlPersGbl") > -1) || (e.target.parentNode.className == "ptabnlistcontainer")) {
 var relActId = ""; var elem = e.target; if (e.target.parentNode.className == "ptabnlistcontainer")
 elem = e.target.parentNode.parentNode; relActId = elem.id.split("Gbl$");  showRelatedActionsImage(e, "relatedActionsPersGbl$" + relActId[1], 1); }
 },
 
 
 onMouseOutRA : function (e) {
 if ((e.target.className == "ptabntitle" && e.target.id.indexOf("persResult") > -1) || (e.target.className == "ptabnlist" && e.target.id.indexOf("UrlPersGbl") > -1) || (e.target.parentNode.className == "ptabnlistcontainer")){
 var relActId = ""; var elem = e.target; if (e.target.parentNode.className == "ptabnlistcontainer")
 elem = e.target.parentNode.parentNode; relActId = elem.id.split("Gbl$");  removeRelatedActionsImage(e, "relatedActionsPersGbl$" + relActId[1], relActId[1]); }
 },
 
 
 clearForm : function () {
 if (!this.sForm) return;  var resTbl = this.sForm.getElementsByTagName("table")[1]; if (!resTbl) {
 resTbl = this.sForm.getElementsByTagName("ul")[0];  if (!resTbl){ return }; }

 
 var n = resTbl.parentNode.parentNode;   n = n.parentNode.removeChild(n);   for (var i = 0; i < this.prevMEM.length; i++) {

 
 if (!this.prevMEM[i].results.firstChild) {
 
 
 this.prevMEM[i].results.appendChild(n); break; }
 }
 
 },
 
 
 cloneResults : function (resTbl) {

 
 var clone = resTbl.parentNode.parentNode.cloneNode(true);  var dTbl = clone.getElementsByTagName("table")[1];  this.addEvents(dTbl,this.customSearch);  var textArea = document.createElement("textarea"); textArea.className = "ptabnhide"; textArea.id = "ptabnconfig_" + pObjName;  var lbl = " ";  if (this.pthNavExists) { 
 
 var mru = top.document.getElementById(pthNav.mruLiIdPrefix + pthNav.portalObjName);  var isABNSearch = false; var abnParams = ""; var abnPortalPath = ""; var abnMRU = top.document.getElementById(pthNav.bcAncPrefix + pthNav.portalObjName);  if (abnMRU && (pthNav.abn.isABNFldr(abnMRU.parentNode) || pthNav.abn.isCref(abnMRU.parentNode))) {
 isABNSearch = true; }

 if (mru && !isABNSearch) {
 
 lbl = mru.firstChild.innerText ? mru.firstChild.innerText :
 mru.firstChild.textContent; } 
 else {

 
 if (isABNSearch) {
 var bcAnc = abnMRU; lbl = bcAnc.innerText ? bcAnc.innerText : bcAnc.textContent;  var bcScrollUl = top.document.getElementById(pthNav.bcScrollId); var last = bcScrollUl.children.length - 1; var currBC = bcScrollUl.children[last]; while (!pthNav.abn.isPortalFldr(currBC)) {
 currBC = bcScrollUl.children[last-=1]; }

 mru = currBC; currBC.className += " ptabnpromptbcsn";  var liEl = top.document.getElementById(currBC.id.slice(pthNav.bcLiPrefix.length)); abnPortalPath = pthNav.abn.getPathParams(liEl); abnParams = bcAnc.href.split("?")[1]; this.addABNParams(clone,abnParams); }
 }
 }
 
 if (lbl == " ") {
 
 mru = null; if (searchGbl.pthNavExists && top.document.getElementById("searchTypeGbl").innerHTML == "compPage") {
 var bcLiEl = ptUtil.id(pthNav.bcCrefPrefix + pthNav.portalObjName); if (bcLiEl && firstChildValid(bcLiEl).nodeType != 3) {
 lbl = bcLiEl.childNodes[0].innerHTML; }
 else {
 lbl = "Search Results"; }
 }
 else if (searchGbl.pthNavExists && top.document.getElementById("searchTypeGbl").innerHTML != "compPage") {
 if (window.frames && window.frames["TargetContent"]) {
 var srchNode = window.frames["TargetContent"].document.getElementById("ACE_PTSF_GSRCH_INP_PTPP_GROUP_BOX"); }
 else {
 var srchNode = top.document.getElementById("ACE_PTSF_GSRCH_INP_PTPP_GROUP_BOX"); }
 var srchResultsFor = parent.ptUtil.getElemsByClass("PTSRCHRSLTLABEL", srchNode, "span"); if (srchResultsFor.length > 0 && srchResultsFor[0].parentNode.id.indexOf("PTSF_GSRCH_INP_PTUS_LABEL") > -1) {
 lbl = "Search Results for" + " " + '"' + document.getElementById("pthdr2srchedit").value + '"'; }
 else {
 lbl = "Search Results";  }
 }
 else {
 lbl = "Search Results";  }
 }
 
 dTbl.summary += " " + lbl;  var customSearch = this.customSearch ? "1" : "0";  var isABN = isABNSearch ? "1" : "0";  textArea.innerHTML = pObjName + ","
 + lbl + ","
 + parent.ptUtil.getElemsByClass("ptabnchunksize",resTbl.parentNode.parentNode,"span")[0].firstChild.nodeValue + ","
 + parent.ptUtil.getElemsByClass("ptabntotal",resTbl.parentNode.parentNode,"span")[0].firstChild.nodeValue + ","
 + this.sForm.action + ","
 + customSearch + ","
 + isABN + ","
 + abnParams + ","
 + encodeURIComponent(abnPortalPath); clone.appendChild(textArea);  var resultsFrag = document.createDocumentFragment(); resultsFrag.appendChild(clone);   var prevResults = document.createElement("div"); prevResults.id = this.prevPrefix + pObjName; prevResults.className = "ptabnprev"; prevResults.appendChild(resultsFrag);  this.store(prevResults,mru); },

 
 cloneResultsList : function (resList) {

 
 var clone = resList.parentNode.parentNode.cloneNode(true);  var dList = clone.getElementsByTagName("ul")[0]; var tabIndex = 3;  if (dList.childNodes.length > 1) {
 var prevLink = document.createElement("div"); prevLink.className = "ptabnnppage ptabnppageD"; prevLink.id = "ptabnppageid_" + pObjName; prevLink.tabIndex = 2; var nextLink = document.createElement("div"); nextLink.className = "ptabnnppage ptabnnpage"; nextLink.id = "ptabnnpageid_" + pObjName; var prevLinkInner = ("&nbsp;");  var nextLinkInner = ("&nbsp;"); prevLink.innerHTML = prevLinkInner; nextLink.innerHTML = nextLinkInner;  var nPages = dList.childNodes.length; var pageContainer = document.createElement("span"); pageContainer.className = "ptabnlpgc"; var pageContId = "ptabnlpgCont_" + pObjName; pageContainer.id = pageContId; var pageSpans = ""; for (i = 0; i < nPages; i++) {
 pageNum = i + 1; pageSpans += ("<a class='ptabnpage' id='ptabnpageid" + pObjName + '_' + i + "'" + " " + "tabindex=" + tabIndex + ">" + pageNum + "</a>");  tabIndex += 1; }
 nextLink.tabIndex = tabIndex; pageContainer.innerHTML = pageSpans;   dList.parentNode.parentNode.childNodes[0].childNodes[0].appendChild(prevLink); dList.parentNode.parentNode.childNodes[0].childNodes[0].appendChild(pageContainer); dList.parentNode.parentNode.childNodes[0].childNodes[0].appendChild(nextLink); }
 
 this.addEvents(dList,this.customSearch);   var textArea = document.createElement("textarea"); textArea.className = "ptabnhide"; textArea.id = "ptabnconfig_" + pObjName;  var lbl = " ";  if (this.pthNavExists) {
 
 var mru = top.document.getElementById(pthNav.mruLiIdPrefix + pthNav.portalObjName); var isABNSearch = false; var abnParams = ""; var abnPortalPath = ""; var abnMRU = top.document.getElementById(pthNav.bcAncPrefix + pthNav.portalObjName); if (abnMRU && (pthNav.abn.isABNFldr(abnMRU.parentNode) || pthNav.abn.isCref(abnMRU.parentNode))) {
 isABNSearch = true; }

 if (mru && !isABNSearch) {
 
 lbl = mru.firstChild.innerText ? mru.firstChild.innerText :
 mru.firstChild.textContent; } else {

 
 if (isABNSearch) {
 var bcAnc = abnMRU; lbl = bcAnc.innerText ? bcAnc.innerText : bcAnc.textContent;  var bcScrollUl = top.document.getElementById(pthNav.bcScrollId); var last = bcScrollUl.children.length - 1; var currBC = bcScrollUl.children[last]; while (!pthNav.abn.isPortalFldr(currBC)) {
 currBC = bcScrollUl.children[last-=1]; }

 mru = currBC; currBC.className += " ptabnpromptbcsn";  var liEl = top.document.getElementById(currBC.id.slice(pthNav.bcLiPrefix.length)); abnPortalPath = pthNav.abn.getPathParams(liEl); abnParams = bcAnc.href.split("?")[1]; this.addABNParams(clone,abnParams); } 
 }
 }
 if (lbl == " ") {
 
 mru = null; if (top.document.getElementById("searchTypeGbl").innerHTML == "compPage") {
 var bcLiEl = ptUtil.id(pthNav.bcCrefPrefix + pthNav.portalObjName); if (bcLiEl && firstChildValid(bcLiEl).nodeType != 3) {
 lbl = bcLiEl.childNodes[0].innerHTML; }
 else {
 lbl = "Search Results"; }
 }
 else if (top.document.getElementById("searchTypeGbl").innerHTML != "compPage") {
 if (window.frames && window.frames["TargetContent"]) {
 var srchNode = window.frames["TargetContent"].document.getElementById("ACE_PTSF_GSRCH_INP_PTPP_GROUP_BOX"); }
 else {
 var srchNode = top.document.getElementById("ACE_PTSF_GSRCH_INP_PTPP_GROUP_BOX"); }
 var srchResultsFor = parent.ptUtil.getElemsByClass("PTSRCHRSLTLABEL", srchNode, "span"); if (srchResultsFor.length > 0 && srchResultsFor[0].parentNode.id.indexOf("PTSF_GSRCH_INP_PTUS_LABEL") > -1) {
 if (document.getElementById("titleKWGbl") !== 'undefined' && document.getElementById("titleKWGbl") !== null)
 lbl = "Search Results for" + " " + '"' + document.getElementById("titleKWGbl").innerHTML + '"'; else
 lbl = "Search Results for" + " "; }
 else {
 lbl = "Search Results";  }
 }
 else {
 lbl = "Search Results";  }
 } 
 
 dList.summary += " " + lbl;  var customSearch = this.customSearch ? "1" : "0";  var isABN = isABNSearch ? "1" : "0";  textArea.innerHTML = pObjName + ","
 + lbl + ","
 + parent.ptUtil.getElemsByClass("ptabnchunksize",resList.parentNode.parentNode,"span")[0].firstChild.nodeValue + ","
 + parent.ptUtil.getElemsByClass("ptabntotal",resList.parentNode.parentNode,"span")[0].firstChild.nodeValue + ","
 + this.sForm.action + ","
 + customSearch + ","
 + isABN + ","
 + abnParams + ","
 + encodeURIComponent(abnPortalPath); clone.appendChild(textArea);   var resultsFrag = document.createDocumentFragment(); resultsFrag.appendChild(clone);   var prevResults = document.createElement("div"); prevResults.id = this.prevPrefix + pObjName; prevResults.className = "ptabnprev"; prevResults.appendChild(resultsFrag);  this.store(prevResults,mru);  },
 
 
 addABNParams : function (resTbl,qs) {

 var q,p,pos,key,val,klc; q = qs; p = q.split("&"); for (var i = 0; i < p.length; i++) {
 pos = p[i].indexOf("="); if (pos > 0) {
 key = p[i].substring(0,pos); klc = key.toLowerCase(); if (klc !== "isfolder" && klc !== "pt_fname" && klc !== "abnnode") {
 val = p[i].substring(pos+1); resTbl.appendChild(this.addCustomKey({name:key, value:val})); }
 }
 }
 },

 
 store : function (results,mru) {

 if (this.prevMEM.length !== 0) {

 
 var prevResults = parent.ptUtil.getElemsByClass("ptabnprev",this.prevDOM,"div");   var resultExists = top.document.getElementById(results.id); if (resultExists) {
 
 var objName = results.id.slice(this.prevPrefix.length); for (var i = 0; i < this.prevMEM.length; i++) {
 if (this.prevMEM[i].objName === objName) {
 this.prevMEM.splice(i,1); break; }
 }
 
 resultExists.parentNode.removeChild(resultExists);   if (this.currResults) {
 this.currResults.firstOpen = true; }

 } else if (this.prevMEM.length === this.MAX_RESULTS) {
 this.prevDOM.removeChild(prevResults[this.MAX_RESULTS - 1]); this.prevMEM.pop(); }

 
 
 prevResults = parent.ptUtil.getElemsByClass("ptabnprev",this.prevDOM,"div");  if (this.prevMEM.length !== 0) {
 results = this.prevDOM.insertBefore(results,prevResults[0]); } else {
 results = this.prevDOM.appendChild(results); }
 
 } else { 
 results = this.prevDOM.appendChild(results); var mrsD = top.document.getElementById("pthnavmrsdummy"); if (mrsD) { mrsD.parentNode.removeChild(mrsD); }
 }

 searchGbl.replaceIDs(results, "_prevDupGbl", "add"); this.updateInMemList(results);   this.mrs.update(mru); if (!this.clientPersist) {

 

 
 
 
 var list = "";   div = document.createElement("div"); var clone = this.prevDOM.cloneNode(true); div.appendChild(clone); data = div.innerHTML; this.persistResultsToServer(pObjName,list,data); } else {
 this.persistResultsOnClient(); }
 },

 updateInMemList : function (results) {

 if (!results) { return; }

 var sr = {}; var configText = results.firstChild.lastChild;  if (configText) {
 var configList = configText.value.split(","); sr.results = results; sr.objName = configList[0]; sr.label = configList[1]; sr.chunkSize = configList[2]; sr.totalResults = configList[3]; sr.actionURL = configList[4]; sr.customSearch = configList[5] === "1" ? true : false; sr.isABN = configList[6] === "1" ? true : false; sr.abnParams = configList[7]; sr.abnPortalPath = configList[8]; }

 
 if (this.prevMEM.length !== 0) {
 this.prevMEM.unshift(sr); } else {
 this.prevMEM.push(sr); }
 },

 addResultsToDOM : function (results) {

 if (!results || !this.prevDOM) { return; }
 if (this.clientPersist) {
 results = decodeURIComponent(results);  }
 
 results = results.split(this.dataSplitKey); var sList = results[0];  var sData = results[1];   var par = this.prevDOM.parentNode; par.removeChild(this.prevDOM); parent.ptUtil.appendNodeFromHTML(par,sData);  this.prevDOM = top.document.getElementById("ptabnprevresultsGblSrch");  searchGbl.replaceIDs(this.prevDOM, "_prevDupGbl", "remove");  results = parent.ptUtil.getElemsByClass("ptabnprev",this.prevDOM,"div"); var tbl;    for (var i = results.length - 1; i >= 0; i--) {

 
 this.updateInMemList(results[i]);   tbl = results[i].getElementsByTagName("table")[1]; if (!tbl) {
 tbl = results[i].getElementsByTagName("ul")[0];  }
 this.addEvents(tbl,this.prevMEM[0].customSearch); }

 
 if (top.document.getElementById("ptabnsrGbl_GBL"))
 this.resultsPromptCheck(); },

 
 getResultsFromDOM : function () {

 list = "";   div = document.createElement("div"); var clone = this.prevDOM.cloneNode(true); div.appendChild(clone); data = div.innerHTML; return list + this.dataSplitKey + data; },

 
 
 persistResultsOnClient : function () {

 if (this.clientPersist) {
 this.tokenCheck();  sessionStorage.removeItem(this.sKey);  sessionStorage.setItem(this.sKey,encodeURIComponent(this.getResultsFromDOM()));  }
 },

 persistResultsToServer : function (objName,list,results) {
 objName = "GBL";  list = "TESTGBL";  div = document.createElement("div"); var clone = this.prevDOM.cloneNode(true);  if (clone) {
 div.appendChild(clone); results = div.innerHTML; var ajaxURL = document.location.href + "&cmd=setSearch"; var params = "&pssrkey=" + objName + "&pssrlist=" +
 encodeURIComponent(list) +
 "&pssrdata=" + encodeURIComponent(results);  var sLoader = new net2.ContentLoader(ajaxURL,null,null,"post",
 function(){},null,params,
 "application/x-www-form-urlencoded"); }
 },

 
 getData : function () {


 
 if (this.clientPersist) {
 this.tokenCheck(); this.addResultsToDOM(sessionStorage.getItem(this.sKey)); } else { 

 var ajaxURL = document.location.href + "&cmd=getSearchGbl";  var sLoader = new net2.ContentLoader(ajaxURL,null,null,"post",
 function(){
 if (searchGbl.pthNavExists) {
 if (pthNav.checkSignonResponse(this.req.getResponseHeader("RespondingWithSignonPage"))) {
 return; }
 }
 
 var respHTML = this.req.responseText; if (respHTML !== "no results") {
 searchGbl.addResultsToDOM(respHTML);  }else if (searchGbl.pthNavExists) {
 if (pthNav.fldr.openEvent != null) {
 
 var tWait = searchGbl.isIE7 ? 100 : 0; setTimeout(function(){fldr.firstChild.focus();},tWait); pthNav.fldr.openEvent = null;  }
 }
 },
 null,"&pssrdata=pssrdata","application/x-www-form-urlencoded"
 ); sLoader = null; }
 },

 
 
 tokenCheck : function () {

 if (!this.clientPersist) { return; }

 var ct = this.getCookieVal("PS_TOKEN");  if (sessionStorage.length !== 0) {
 var st = sessionStorage.getItem(this.tKey);  if (st && st !== ct) {
 sessionStorage.removeItem(this.tKey); sessionStorage.setItem(this.tKey,ct); } 
 } else {
 sessionStorage.setItem(this.tKey,ct); }
 },

 
 
 clearData : function (cmd) {

 if (!this.searchEnabled) { return; }

 
 if (this.clientPersist) {
 try {
 sessionStorage.removeItem(this.sKey); sessionStorage.removeItem(this.tKey); } catch (e) {}
 }
 if (typeof(cmd) === "undefined") { return; } 

 
 
 
 
 if (!this.clientPersist && cmd === "sl") {
 var ajaxURL = document.location.href + "&cmd=clearSearch"; var sLoader = new net2.ContentLoader(ajaxURL,null,null,"post",
 function(){},null,null,"application/x-www-form-urlencoded"); sLoader = null; }

 
 if (this.pthNavExists) {
 var prmpt = top.document.getElementById(this.promptPrefix + "_" + pthNav.bcCrefPrefix + pObjName); if (prmpt) { prmpt.parentNode.removeChild(prmpt); }
 }
 
 
 this.clearForm();   var n, mrsRoot = top.document.getElementById("pthnavmrsroot");  if (mrsRoot) {
 n = mrsRoot.lastChild; while (n) {
 n.parentNode.removeChild(n); n = mrsRoot.lastChild; }
 }

 
 this.prevDOM = top.document.getElementById("ptabnprevresultsGblSrch");  if (this.prevDOM) {
 n = this.prevDOM.lastChild; while (n) {
 n.parentNode.removeChild(n); n = this.prevDOM.lastChild; }
 }

 
 this.prevMEM = []; this.currResults = null; },

 
 addPrompt : function () {

 var objName = pObjName;  if (!this.isAccessible) {

 var nav = top.document.getElementById("pthdr2gblsrchprompt");  if (typeof nav == "undefined" || !nav)
 return;  var promptExists = false; for (var i=0; i < nav.childNodes.length; i++) {
 if (nav.childNodes[i].id == this.promptImg.id + "_GBL") promptExists = true; }
 if (!promptExists) {
 var spaceEl = nav.childNodes[0];  if (spaceEl) nav.removeChild(spaceEl); this.createPrompt(nav);  }
 }
 },

 
 createPrompt : function (liEl) {

 if (!liEl) { return; }

 var clone = this.promptImg.cloneNode(true); clone.id = this.promptImg.id + "_GBL";  clone.firstChild.id += "_GBL";  clone.style.display = "block";  ptEvent.add(clone.firstChild,"keydown",this.onKeyPress);   ptEvent.add(clone.firstChild,"click",this.onClickPrompt); liEl.appendChild(clone); },

 
 
 
 mrs : {
 list : [],
 MAX_MRS: 5,
 mrsLiIdPrefix: "pthnavmrsGbl_", 

 
 
 
 
 init : function () {
 
 },

 
 update : function (liEl) {
 
 } 
 }, 
 
 
 onClickPrompt : function (e) {

 var s = searchGbl; var waitDiv = s.waitDiv;  if (waitDiv) {
 waitDiv.style.zIndex = 10000; waitDiv.style.display = "block"; }

 var self = this; setTimeout(function(){
 if (this.pthNavExists)
 pthNav.closeNav();   var id; if (self.nodeName.toLowerCase() === "li") {
 id = self.id;  } else if ((self.nodeName.toLowerCase() === "a") && (self.id == "ptabn_SRCHPROMPT_GBL")){ 
 id = parent.ptUtil.getGrandParent(self).id;  } else {
 id = self.parentNode.id; }

 
 s.updateForm(id);  if (typeof(s.win.popup) === "undefined") { 
 var popup = top.document.getElementById("ptifrmpopup"); if (popup) {
 s.win.popup = new ptPopup(popup,s.options); }
 }
 s.win.popup.open(s.options); if (waitDiv) {
 waitDiv.style.display = "none"; waitDiv.style.zIndex = ""; }
 else 
 ptLoadingStatus_empty(0);  },0); return false; },

 
 updateForm : function (id) {
 
 
 
 var objName = "GBL"; if (this.currResults && objName === this.currResults.objName && 
 (typeof(this.currResults.firstOpen) !== "undefined" && 
 !this.currResults.firstOpen)) {
 return; }

 this.clearForm();  for (var i = 0; i < this.prevMEM.length; i++) {
 if (this.prevMEM[i].objName === objName) {

 
 
 this.currResults = this.prevMEM[i]; var n = this.prevMEM[i].results.firstChild;    n = this.sForm.appendChild(n.parentNode.removeChild(n));  this.sForm.action = this.currResults.actionURL;  var newLbl; if (!this.isAccessible) {
 newLbl = this.currResults.label; } else {
 newLbl = "Recent search results for" + " " + this.currResults.label; }
 this.title.firstChild.nodeValue = newLbl; break; }
 }
 },

 getPromptObjName : function (id) {

 var objName; if (this.pthNavExists) {
 
 if (id.indexOf(pthNav.crefLiIdPrefix) > -1) {
 if (id.indexOf(pthNav.favLiIdPrefix) === -1) { 
 objName = id.slice(pthNav.crefLiIdPrefix.length); } else { 
 objName = id.slice(pthNav.favLiIdPrefix.length); }
 } else if (id.indexOf(pthNav.mruLiIdPrefix) > -1) { 
 objName = id.slice(pthNav.mruLiIdPrefix.length); } else if (id.indexOf(this.mrs.mrsLiIdPrefix) > -1) { 
 objName = id.slice(this.mrs.mrsLiIdPrefix.length); } else if (id.indexOf(pthNav.bcCrefPrefix) > -1) { 
 objName = id.slice(pthNav.bcCrefPrefix.length);  } else if (id.indexOf(pthNav.bcLiPrefix) > -1) { 
 objName = id.slice(pthNav.bcLiPrefix.length);  } else { objName = ""; }
 return objName; }
 },


 
 
 resultsPromptCheck : function () {

 if (this.isAccessible || typeof this.promptImg == "undefined" || !this.promptImg) 
 return;    var mrsId = pObjName;  var list = this.mrs.list; var bcLiEl = top.document.getElementById("pthdr2gblsrchprompt");   if (this.promptImg) var clone = this.promptImg.cloneNode(true); if (clone && bcLiEl) {
 clone.id = this.promptImg.id + "_" + "GBL";  clone.style.display = "block"; clone.firstChild.id += "_GBL"
 
 
 ptEvent.add(clone,"click",this.onClickPrompt);  ptEvent.add(clone.firstChild,"click",this.onClickPrompt); ptEvent.add(clone.firstChild,"keydown", this.onKeyPress);   var nav = top.document.getElementById("pthdr2gblsrchprompt"); var promptExists = false;  if (nav && nav.childNodes) {
 for (var i=0; i < nav.childNodes.length; i++) {
 if (nav.childNodes[i].id == this.promptImg.id + "_GBL") promptExists = true; }
 }
 if (!promptExists) {
 var spaceEl = bcLiEl.childNodes[0];  if (spaceEl) bcLiEl.removeChild(spaceEl); bcLiEl.appendChild(clone)
 }
 }
 },

 
 
 addKey : function (th) {
 var inp; try {
 
 inp = document.createElement("<input type='hidden' name='" + th.id + "' />"); } catch(e) {
 
 inp = document.createElement("input"); inp.type = "hidden"; inp.name = th.id; }
 
 
 
 if (parent.ptUtil.isClassMember(th,this.xlatClass)) {
 inp.className = this.xlatClass; }
 return inp; },

 addCustomKey : function (th) {
 var inp; try {
 
 inp = document.createElement("<input type='hidden' name='" + th.name + "' />"); } catch(e) {
 
 inp = document.createElement("input"); inp.type = "hidden"; inp.name = th.name; }
 
 inp.value = th.value; return inp; },

 
 addEvents : function (node,customSearch) {

 
 if (node.nodeName.toLowerCase() === "table") { 

 
 ptEvent.add(node,"click",this.onClickKey);   if (node.tBodies.length > 1) {

 var searchBar = node.parentNode.parentNode.firstChild.firstChild; if (searchBar) {
 ptEvent.add(searchBar,"click",this.onClickSearchBar); ptEvent.add(searchBar,"keydown",this.onClickSearchBar);  }
 }
 } 
 
 else if (node.nodeName.toLowerCase() === "ul") {
 if (!customSearch) {
 ptEvent.add(node,"click",this.onClickKey); }
  ptEvent.add(node,"mouseover",this.onMouseOverRA);  ptEvent.add(node,"mouseout",this.onMouseOutRA);   if (node.childNodes.length > 1) {

 var searchBar = node.parentNode.parentNode.firstChild.firstChild; if (searchBar) {
 ptEvent.add(searchBar,"click",this.onClickSearchBar);  }
 
 var pageBar = top.document.getElementById("ptabnlpgCont_" + pObjName); if (pageBar) {
 for (i = 0; i < pageBar.childNodes.length; i++) {
 ptEvent.add(pageBar.childNodes[i],"click",this.onClickSearchBar);  }
 }
 
 var prevPage = top.document.getElementById("ptabnppageid_" + pObjName);  if (prevPage) {
 ptEvent.add(prevPage,"click",this.onClickSearchBar);  }
 
 var nextPage = top.document.getElementById("ptabnnpageid_" + pObjName);  if (nextPage) {
 ptEvent.add(nextPage,"click",this.onClickSearchBar);  }
 }
 } 
 }, 

 
 
 
 stripe : function (dTbl,eClass) {

 
 
 
 if (!listFormat) {
 for (var i = 0, j = dTbl.tBodies.length; i < j; i++) {
 for (var k = 1, l = dTbl.tBodies[i].rows.length; k < l; k += 2) {
 dTbl.tBodies[i].rows[k].className = eClass; }
 }
 }
 else {
 for (var i = 0, j = dTbl.childNodes.length; i < j; i++) {
 for (var k = 1, l = dTbl.childNodes[i].childNodes.length; k < l; k += 2) {
 var listItem = dTbl.childNodes[i].childNodes[k]; listItem.className = listItem.className + " " + eClass;  }
 }
 }
 },

 
 stayInWorkCenter : function () {
 var curWorkCenterId = ptalPage.id; var lastWorkCenterId = ""; var lastSrchCtxtType = ""; var lastSrchGroup = ""; var srchGrp = top.document.getElementById("srchGroupGbl"); var srchParam = top.document.getElementById("paramGbl"); if (srchGrp && srchParam) {
 srchGrp = srchGrp.innerHTML; srchParam = srchParam.title; }
 else {
 srchGrp = ""; srchParam = ""; }

 if (srchParam != "" && srchGrp != "") {
 lastSrchGroup = srchGrp.split("?SEARCH_GROUP=")[1]; lastWorkCenterId = srchParam.split("PTUS_WORKCENTERID=")[1]; lastSrchCtxtType = srchParam.split("PTUS_SEARCHCTXTTYPE=")[1].slice(0,1); }
 if (curWorkCenterId != "" && curWorkCenterId == lastWorkCenterId && lastSrchCtxtType == "W" && lastSrchGroup != "PTUS_ALL")
 return true; else 
 return false; },

 
 
 onClickKey : function (e) {

 
 
 if ((e.target.nodeName.toLowerCase() !== "a" && e.target.parentNode.nodeName.toLowerCase() !== "a") 
 || e.target.id.indexOf("relatedActionsPers") >= 0 || e.target.parentNode.id.indexOf("relatedActionsPers") >= 0) {
 return;  }
 
 var s = searchGbl;  var eTarget = e.target; if (e.target.nodeName.toLowerCase() !== "a" && e.target.parentNode.nodeName.toLowerCase() == "a") { 
 eTarget = e.target.parentNode; }
 
 if (s.customSearch) { 
 s.doSubmitABN(eTarget.name); }
 
 var url = top.document.getElementById("actionURLGbl"); if (url) 
 s.currResults.actionURL = url.innerHTML;  if (!listFormat && !s.customSearch) { 
 var tr = eTarget.parentNode.parentNode; var tds = tr.cells; var inputs = s.sForm.getElementsByTagName("input"); inputs[0].value = s.getLinkVal(tds[0],
 parent.ptUtil.isClassMember(inputs[0],s.xlatClass));  for (var i = 1, j = tds.length+1; i < j; i++) {
 
 if (tds[i] && !parent.ptUtil.isClassMember(tds[i],"ptabnblank")) { 
 
 if (!parent.ptUtil.isClassMember(inputs[i],s.xlatClass)) {
 inputs[i].value = tds[i].firstChild.nodeValue; } else {
 if ((tds[i].childNodes.length > 1) && (tds[i].lastChild.tagName == 'SPAN')) {
 
 
 inputs[i].value = !s.useTextContent ? tds[i].lastChild.innerText : tds[i].lastChild.textContent; }
 }
 }
 if (inputs[i].name == "SRCH_PERSIST") { 
 inputs[i].value = "Y"; }
 }
 }
 if (listFormat) { 
 var dList = top.document.getElementById("ptabndatalist_" + s.currResults.objName);   var inputs = s.sForm.getElementsByTagName("input"); inputsLen = inputs.length; if (inputs) {
 for (var i = 0; i < inputsLen; i++) {
 inputs[0].parentNode.removeChild(inputs[0]);  } 
 }
 
 
 var url = eTarget.href;  var urlDataPos = url.indexOf("?", 0); if (urlDataPos < 0) {
 var urlBase = url;  }
 else {
 var urlData = url.substring(urlDataPos + 1);  var urlBase = url.substring(0, urlDataPos);  var urlDataAr = new Array(); urlDataAr = urlData.split("&");  urlDataAr.push("SRCH_PERSIST=Y");   for (var i = 0; i < urlDataAr.length; i++) {
 var urlDataItem = new Array(); urlDataItem = urlDataAr[i].split("=");  var input = document.createElement("input"); input.type = "hidden"; input.name = urlDataItem[0];  input.value = urlDataItem[1];  dList.parentNode.appendChild(input); }
 }
 
 s.currResults.actionURL = urlBase;  }
 var openCref = function() {
 openSrchRsltURL(url); }; if (top.document.getElementById("searchTypeGbl").innerHTML == "gblPage") {
 if (typeof ptalPage != 'undefined' && ptalPage) {
 if (searchGbl.stayInWorkCenter() == true) {
 var cancelFn;   url = url.replace('\/psp\/','\/psc\/'); s.win.popup.close(); parent.ptIframe.saveWarning(url, cancelFn, "TargetContent"); } else
 parent.ptIframe.saveWarning(url, cancelFn, "_top"); }
 else if (!searchGbl.isHomepage && !parent.ptUtil.isClassMember(this,"pthns") && typeof(ptIframe) !== "undefined"){
 parent.ptIframe.saveWarning(urlBase, openCref, "_parent", "", function(){s.win.popup.close();}); }
 else 
  openSrchRsltURL(url); }
 else
 s.doSubmitABN(); return false; },

 
 doSubmitABN : function (piaName) {

 var s = searchGbl; var searchType = top.document.getElementById("searchTypeGbl"); searchType = searchType.innerHTML; var submitSearch = function () {
 if (searchGbl.pthNavExists) { 
 pthNav.closeNav(); }
 if (!s) {
 var s = searchGbl; }
 
 
 var setPspUrl = function (s) {
 var formAction = s.currResults.actionURL; var pspLoc = formAction.indexOf("/psc/"); if (pspLoc > -1) {
 formAction = formAction.replace("\/psc\/","\/psp\/"); }
 s.sForm.action = formAction; if (s.currResults.isABN) { 
 s.sForm.action += decodeURIComponent(s.currResults.abnPortalPath); }
 s.sForm.target = "_self"; };  s.win.popup.close();   if (typeof(piaName) !== "undefined") {
 s.sForm.ICAction.value = piaName; s.sForm.ICResubmit.value = 0; if (s.currResults.isABN) {

 var srDiv = top.document.getElementById(s.srDivPrefix + s.currResults.objName); if (srDiv) {
 srDiv.appendChild(s.addCustomKey({name:"pt_fname", value:piaName})); srDiv.appendChild(s.addCustomKey({name:"abnnode", value:piaName})); srDiv.appendChild(s.addCustomKey({name:"PERSABNSRCH", value:1}));  }
 }
 }

 
 var xContent = false; var PortalLocation = top.document.location.href; var URLArr= String(PortalLocation).split("/"); var SrchURLArr= String(s.sForm.action).split("/"); if(URLArr.length >= 4 && SrchURLArr.length >= 4){
 if(URLArr[4] !== SrchURLArr[4]) {
 xContent = true; }
 }

 var searchType = top.document.getElementById("searchTypeGbl").innerHTML
 
 
 
 if (typeof(ptIframe) !== "undefined" && searchType == "compPage" && searchGbl.pthNavExists) { 
 try {
 var formName = pthNav.iframe.contentWindow.document.forms[0].name; if (!/empty/.test(formName)) { 
 var procFunc = pthNav.iframe.contentWindow["processing_" + formName]; procFunc.call(procFunc,1,3000); }
 } catch (ex) {}

 
 if (!s.currResults.isABN && searchGbl.pthNavExists && pthNav.abn.search.searchEnabled) {
 var t = pthNav.abn.search; var compName = top.document.getElementById("compNameGbl"); if (t && compName) {
 var tgt = top.document.getElementById(t.mrs.mrsLiIdPrefix + compName.innerHTML)
 }
 if (compName && !searchGbl.isHomepage && tgt) { 
 ptNav2Info.selectedId = pthNav.crefLiIdPrefix + compName.innerHTML; pthNav.iframeUpdate(s.currResults.actionURL,false, tgt.firstChild); if (typeof(ptalPage) !== 'undefined' && ptalPage && searchGbl.stayInWorkCenter() !== true)
 setPspUrl(s);  }
 else {
 if (xContent) { 
 var xContentURL = top.document.getElementById("xContentURLGbl"); if (xContentURL) {
 s.currResults.actionURL = xContentURL.innerHTML; }
 }
 setPspUrl(s); }
 } 
 else { 
 if (typeof ptalPage != 'undefined' && ptalPage && searchGbl.stayInWorkCenter() == true) {
 s.sForm.target = "TargetContent"; }
 else {
 var xContentURL = top.document.getElementById("xContentURLGbl"); if (xContent && xContentURL) {
 s.currResults.actionURL = xContentURL.innerHTML; }
 setPspUrl(s); }
 }
 s.sForm.submit(); } else { 

 if (typeof ptalPage != 'undefined' && ptalPage && searchGbl.stayInWorkCenter() == true) {
 s.sForm.target = "TargetContent"; }
 else {
 if (searchGbl.isHomepage) { 
 ptLoadingStatus_empty(1);  }
 var xContentURL = top.document.getElementById("xContentURLGbl"); if (xContent && xContentURL) {
 s.currResults.actionURL = xContentURL.innerHTML; }
 setPspUrl(s); }
 s.sForm.submit(); }
 };   if (!searchGbl.isHomepage && searchType == "compPage" && typeof(ptIframe) !== "undefined" && ptNav2Info.saveWarn === "Y") {
 ptIframe.saveWarning(s.sForm.action,submitSearch,s.sForm.target,"",function(){s.win.popup.close();}); } else {
 submitSearch(); }

 },

 
 getLinkVal : function (tdEl,usesXlatVal) {

 if (!tdEl) { return ""; }

 var ancLbl; if (tdEl.firstElementChild) {

 if (!usesXlatVal) {
 ancLbl = tdEl.firstElementChild.firstChild.nodeValue; } else {
 
 ancLbl = tdEl.lastElementChild.textContent; }
 } else {

 if (!usesXlatVal) {
 ancLbl = tdEl.firstChild.firstChild.nodeValue;   var firstElChild = tdEl.firstChild; while(firstElChild && firstElChild.nodeType !== 1 ) {
 firstElChild = firstElChild.nextSibling; }
 
 if (firstElChild) {
 
 ancLbl = firstElChild.innerText ? firstElChild.innerText
 : firstElChild.textContent; }
 } else {
 var xlatSpan = this.getLastChild(tdEl); ancLbl = !searchGbl.useTextContent ?
 xlatSpan.innerText :
 xlatSpan.textContent; }
 }
 return ancLbl; },

 
 getLastChild : function (node) {

 var lastChild; if (node.lastElementChild) {
 lastChild = node.lastElementChild; } else {
 lastChild = node.lastChild; while (lastChild && lastChild.nodeType !== 1) {
 lastChild = lastChild.previousSibling; }
 }
 return lastChild; },


 
 
 replaceIDs : function (node, idName, mode) {

 if (!node || !idName || !mode) {
 return; }

 if (node.childNodes) {
 for (var i=0; i <node.childNodes.length; i++) {
 var child = node.childNodes[i]; searchGbl.replaceIDs(child, idName, mode); if (typeof(child.id) != "undefined" && child.id != null && child.id.replace(/\s+/g, '') != "") {
 if (mode == "add") {
 child.id = child.id + idName; }
 if (mode == "remove") {
 var idIndex = child.id.indexOf(idName); if (idIndex >= 0) {
 child.id = child.id.substring(0, idIndex); }
 }
 }
 }
 }
 },


 

 onClickSrchAgain : function (e) {
 
 var s = searchGbl; var noCurResults = false;    var currenttarget = e.currentTarget || e.srcElement; if (currenttarget.id == "ptabnsrchagainGblSrch") {
 bcUpdater.setStoredData(bcUpdater.isGlobalSearch, "REFINESEARCH"); }
 else {
 bcUpdater.setStoredData(bcUpdater.isGlobalSearch, "SEARCHAGAIN"); }

 var isBC = false; if (currenttarget.id.indexOf("pthnavbccrefanc") > -1 && typeof currenttarget.parentNode != 'undefined' && currenttarget.parentNode != null) {
 if (ptUtil.isClassMember(currenttarget.parentNode,"ptglbsearch")) {
 isBC = true; }
 }

 
 if (typeof(s.currResults) == "undefined" || s.currResults == null) {
 s.updateForm(); if (typeof(s.currResults) == "undefined" || s.currResults == null) {
 noCurResults = true; }
  }

 
 var srchKW = top.document.getElementById("titleKWGbl"); if (srchKW && srchKW.firstChild) {
 srchKW = srchKW.firstChild.nodeValue; }
 else { 
 if (s.container) {
 searchGbl.replaceIDs(s.container, "_prevDupGbl", "remove"); srchKW = top.document.getElementById("titleKWGbl"); if (srchKW && srchKW.firstChild) {
 srchKW = srchKW.firstChild.nodeValue; }
 }
 }

 
 
 
 
 if (isBC) {
 if (typeof currenttarget.firstChild !== "undefined" && currenttarget.firstChild !==null) {
 
 var srchTxt = bcUpdater.decodeString(currenttarget.firstChild.nodeValue); }
 var isAdvSrchPage = false; if (frames['TargetContent']) {
 tgtFrame = frames['TargetContent']; if (tgtFrame.document.getElementById("PTUS_ADV_SRCH_PTUS_SRCH_CRITERIA") || tgtFrame.document.getElementById("collapseSrchCriteria")) {
 isAdvSrchPage = true; }
 }
 if (srchTxt) {
 srchTxt = srchTxt.substring(1, srchTxt.length-1);  if (srchTxt == "...") {
 srchTxt = null; if (isAdvSrchPage) {
 
 if (currenttarget.href.indexOf("PTSF_GLOBAL_SEARCH") < 0) { 
 currenttarget.href = document.URL; }
 return; }
 }

 
 if (noCurResults || (srchTxt != srchKW)) {
 var hdrItem = top.document.getElementById("pthdrSrchHref").parentNode.innerHTML; var onCl = hdrItem.indexOf("http"); var car = hdrItem.indexOf("PTSF_GLOBAL_SEARCH.GBL");  var searchUrl = hdrItem.substr(onCl,car-onCl+22);  if (typeof(ptNav2Info) !== "undefined") {
 var saveWarn = ptNav2Info.saveWarn; }
 else {
 var saveWarn = ""; }

 
 if (srchTxt != srchKW) { srchTxt = srchKW; }
 
 DoSearch('BASIC', searchUrl, saveWarn, srchTxt); return; }
 }
 }

 
 if (noCurResults) {
 return; }

 
 if (!s.customSearch) {
 var inputs = s.sForm.getElementsByTagName("input"); for (var i = 0, j = inputs.length; i < j; i++) {
 inputs[i].value = ""; }
 }

 s.win.popup.close();  if (s.pthNavExists)
 pthNav.closeNav();   var sType = top.document.getElementById("searchTypeGbl"); if (sType) sType = sType.innerHTML;   if (sType == "gblPage") {
 
 var hdrItem = top.document.getElementById("pthdrSrchHref").parentNode.innerHTML; var onCl = hdrItem.indexOf("http"); var car = hdrItem.indexOf("PTSF_GLOBAL_SEARCH.GBL");  var searchUrl = hdrItem.substr(onCl,car-onCl+22);  var srchGrp = top.document.getElementById("srchGroupGbl"); var srchParam = top.document.getElementById("paramGbl");    var ptabnsrchCorrectHistory = top.document.getElementById("ptabnsrchCorrectHistory _" + s.currResults.objName); var ptabnsrchIncludeHistory = top.document.getElementById("ptabnsrchIncludeHistory_" + s.currResults.objName); var ptabnsrchMatchCase = top.document.getElementById("ptabnsrchMatchCase_" + s.currResults.objName); var ptabnsrchViewAsGrid = top.document.getElementById("ptabnsrchViewAsGrid_" + s.currResults.objName); var paramVarArray = new Array(ptabnsrchCorrectHistory, ptabnsrchIncludeHistory, ptabnsrchMatchCase, ptabnsrchViewAsGrid); var paramNameArray = new Array("ICCorrectHistory", "ICIncludeHistory", "ICMatchCase", "ICViewAsGrid"); var srchOptions = "&"; for (var i = 0; i < paramNameArray.length; i++) {
 if (paramVarArray[i] && paramVarArray[i].innerHTML == "Y") {
 srchOptions += paramNameArray[i] + "=Y"; }
 }
 
 if (srchGrp && srchParam) {
 srchGrp = srchGrp.innerHTML; srchParam = srchParam.title; }
 else {
 srchGrp = ""; srchKW = ""; srchParam = ""; }
 
 srchGrp = "?SEARCH_GROUP=" + srchGrp; srchKW = "&SEARCH_TEXT=" + encodeURIComponent(srchKW);  openURL = searchUrl+srchGrp+srchKW + "&SEARCH_TYPE=SEARCHAGAIN" + srchParam + srchOptions;  var openCref = function() {
 OpenCrefInUniNav(openURL, ""); }; if (typeof ptalPage != 'undefined' && ptalPage && searchGbl.stayInWorkCenter() == true) {
 var cancelFn;   openURL = openURL.replace('\/psp\/','\/psc\/'); parent.ptIframe.saveWarning(openURL, cancelFn, "TargetContent"); }
 else if (!searchGbl.isHomepage && !parent.ptUtil.isClassMember(this,"pthns") && typeof(ptIframe) !== "undefined"){
 parent.ptIframe.saveWarning(openURL, openCref, "_parent", "", function(){s.win.popup.close();}); }
 else 
 OpenCrefInUniNav(openURL, ""); }

 
 
 
 else { 
 
 var srchType = top.document.getElementById("ptabnsrchtypeKW_" + s.currResults.objName); var srchMode = top.document.getElementById("ptabnsrchMode_" + s.currResults.objName);  var srchCrit = top.document.getElementById("ptabnsrchCriteria_" + s.currResults.objName); var srchFilters = top.document.getElementById("ptabnsrchFilters_" + s.currResults.objName);  var ptabnsrchCorrectHistory = top.document.getElementById("ptabnsrchCorrectHistory _" + s.currResults.objName);  var ptabnsrchIncludeHistory = top.document.getElementById("ptabnsrchIncludeHistory_" + s.currResults.objName);  var ptabnsrchMatchCase = top.document.getElementById("ptabnsrchMatchCase_" + s.currResults.objName);  var ptabnsrchViewAsGrid = top.document.getElementById("ptabnsrchViewAsGrid_" + s.currResults.objName); var paramVarArray = new Array(ptabnsrchCorrectHistory, ptabnsrchIncludeHistory, ptabnsrchMatchCase, ptabnsrchViewAsGrid); var paramNameArray = new Array("ICCorrectHistory", "ICIncludeHistory", "ICMatchCase", "ICViewAsGrid"); var srchOptions = "&"; for (var i = 0; i < paramNameArray.length; i++) {
 if (paramVarArray[i] && paramVarArray[i].innerHTML == "Y") {
 srchOptions += "&" + paramNameArray[i] + "=Y"; }
 }

 var nSrchFldIndex = 0;  var kw="&ICSesSrchTxt=";  var elmTpkwG = top.document.getElementById("ptabnsrchKeywordsGbl"); if (srchType && (typeof(srchType) != "undefined") && (srchType.innerHTML == "Y") && (srchCrit.childNodes.length > 0) && elmTpkwG) {
  nSrchFldIndex = 1;  if (elmTpkwG && elmTpkwG.firstChild) {
  kw = "&ICSesSrchTxt=" + encodeURIComponent("" + elmTpkwG.firstChild.nodeValue);  } 
 }
 
 var srchCritStr = ""; if (srchCrit && (typeof(srchCrit) != "undefined") && srchCrit.childNodes.length > nSrchFldIndex) {
 for (var i = nSrchFldIndex; i < srchCrit.childNodes.length; i++) {
 var val = ""; if (srchCrit.childNodes[i].firstChild) {
 val = srchCrit.childNodes[i].firstChild.nodeValue; }
 var name1 = srchCrit.childNodes[i].id; var startLoc = name1.indexOf("ptabnsrchFldGbl_"); if (startLoc == 0) {
 name1 = name1.substring(startLoc + 16); srchCritStr += "&" + name1 + "=" + encodeURIComponent("" + val); }
 }
 }
 
 var srchFilStr = ""; var srchFilCountEx = 0; if (srchFilters && (typeof(srchFilters) != "undefined") && srchFilters.childNodes.length > 0) {
 var srchFilCount = srchFilters.childNodes[0]; if (srchFilCount && srchFilCount.id == "ptabnsrchFilterCountGbl") {
 srchFilCount = srchFilCount.innerHTML; srchFilStr = "&" + "FT_count" + "=" + srchFilCount; srchFilCountEx = 1; }
 for (var i = srchFilCountEx, n = 0; i < srchFilters.childNodes.length; i++, n++) {
 var val = srchFilters.childNodes[i].innerHTML; var name1 = srchFilters.childNodes[i].id;  var startLoc1 = name1.indexOf("ptabnsrchFilterIndexGbl_"); var startLoc2 = name1.indexOf("ptabnsrchFilterGbl_");  if (startLoc1 > -1) {
 name1 = name1.substring(startLoc1 + 24); srchFilStr += "&" + "FT_" + name1 + "=" + encodeURIComponent("" + val); }
 if (startLoc2 > -1) {
 name1 = name1.substring(startLoc2 + 19); srchFilStr += "&" + "FT_" + name1 + "=" + encodeURIComponent("" + val); }
 }
 }

 var srchT = "SRCHTYPEKW=N"; var srchM = "SRCHMODE=0"; if (srchMode && srchType) {
 srchType = srchType.innerHTML; srchMode = srchMode.innerHTML; srchT = "SRCHTYPEKW=" + srchType; srchM = "SRCHMODE=" + srchMode; }
 
 var urlStr = s.currResults.actionURL + "?" + srchT + "&" + srchM+kw+srchCritStr+srchFilStr+srchOptions;  if (typeof ptalPage != 'undefined' && ptalPage && searchGbl.stayInWorkCenter() == true) { 
 var cancelFn;   urlStr = urlStr.replace('\/psp\/','\/psc\/');  parent.ptIframe.saveWarning(urlStr, cancelFn, "TargetContent"); }
 else if (typeof(ptIframe) !== "undefined" && s.pthNavExists) {
 if (!s.currResults.isABN) {
 
 
 
 var t = pthNav.abn.search; var compName = top.document.getElementById("compNameGbl"); if (t) {
 var tgt = top.document.getElementById(t.mrs.mrsLiIdPrefix + compName.innerHTML)
 }
 if (compName && !searchGbl.isHomepage && tgt) { 
 ptNav2Info.selectedId = pthNav.crefLiIdPrefix + compName.innerHTML; pthNav.iframeUpdate(urlStr,false,tgt); } 
 else {
 OpenCrefInUniNav(urlStr,""); }

 } 
 else {
 OpenCrefInUniNav(urlStr,""); }
 }
 else 
 OpenCrefInUniNav(urlStr,""); }
 return false; },

 open : function () {
 
 pObjName = "GBL";  var s = searchGbl;    var promptIcon = top.document.getElementById("pthdr2srchprompt_GBL"); if (promptIcon) {
 promptIcon.href = "opening"; }
 
 
 if (s.container && s.container.style.display == "none") {
 s.container.style.display = "";  }
 
 
 
 
 if (typeof(s.currResults.firstOpen) === "undefined") {
 s.currResults.firstOpen = true; }

 
 
 if (s.container) {
 searchGbl.replaceIDs(s.container, "_prevDupGbl", "remove"); if (s.container.parentNode.id !== "ptpopupcontent") {
 var popupContent = top.document.getElementById("ptpopupcontent"); if (popupContent) {
 s.container = popupContent.insertBefore(s.container,popupContent.firstChild); }
 }
 
 
 var dList = top.document.getElementById("ptabndatalist_" + s.currResults.objName); if (dList) {
 listFormat = true; }
 else listFormat = false;    var configText = top.document.getElementById("ptabnconfig_" + pObjName);  if (configText) {
 var configList = configText.value.split(","); s.objName = configList[0]; s.label = configList[1]; s.chunkSize = configList[2]; s.totalResults = configList[3]; s.actionURL = configList[4]; s.customSearch = configList[5] === "1" ? true : false; s.isABN = configList[6] === "1" ? true : false; s.abnParams = configList[7]; s.abnPortalPath = configList[8]; }
 
 

 
 if (s.favs) {
 s.favs.style.display = "none"; }

 
 ptEvent.add(document,"keydown",s.doKeyDown); s.isResize = false;    if (s.firstOpen) {
 if (s.isIE7 && !s.IEquirksMode) {
 bM = parseInt(parent.ptUtil.getCSSValue(s.container,"marginBottom")); bM = isNaN(bM) ? 0 : bM; s.sForm.style.marginBottom = bM + "px"; } else {
 s.sForm.style.margin = "0"; }
 }
 parent.ptUtil.swapClass(s.container,"ptabnconthide","ptabncontshow");   if (s.currResults.firstOpen) {

 
 var d = parent.ptUtil.winSize(); s.currResults.currVPHeight = d.height; s.currResults.currVPWidth = d.width;         if (!listFormat) {
 var dTable = top.document.getElementById("ptabndt_" + s.currResults.objName);  if (dTable.tBodies.length > 1) {

 
 
 if (browserInfoObj2.isIE && (s.isIE7 || s.IEquirksMode)) {
 var firstAnc = dTable.tBodies[0].getElementsByTagName("a")[0]; ptEvent.add(firstAnc,"focus",function(e){
 if (!e.target) { return; }

 var tBody = this.parentNode.parentNode.parentNode; if (tBody.className === "ptabnhide") {
 var dTbl = tBody.parentNode; var viewTbody; for (var i = 0; i < dTbl.tBodies.length; i++) {
 if (dTbl.tBodies[i].className !== "ptabnhide") {
 viewTbody = dTbl.tBodies[i]; break; }
 }
 var firstAnc = viewTbody.getElementsByTagName("a")[0]; firstAnc.focus(); }
 }); }

 var popHeight = s.win.popup.getPopupHeight(); var popWidth = s.win.popup.getPopupWidth(); if (popHeight < s.currResults.currVPHeight &&
 popWidth < s.currResults.currVPWidth) {
 for (var i = 1; i < dTable.tBodies.length; i++) {
 dTable.tBodies[i].className = "ptabnhide";  }
 }
 s.win.popup.resize(); }
 }
 else {
 var dList = top.document.getElementById("ptabndatalist_" + s.currResults.objName);  if (dList.childNodes.length > 1) {
 var popHeight = s.win.popup.getPopupHeight(); var popWidth = s.win.popup.getPopupWidth(); if ((popHeight < s.currResults.currVPHeight && 
 popWidth < s.currResults.currVPWidth) || browserInfoObj2.isiPad) { 
 for (var i = 1; i < dList.childNodes.length; i++) {
 dList.childNodes[i].className = "ptabnhide";  }
 s.win.popup.resize();  }
 }
 if (dList.childNodes.length > 1) {
 var nPages = dList.childNodes.length; var pageContainer = top.document.getElementById("ptabnlpgCont_" + s.currResults.objName); var totPgNumShown = 7; if (totPgNumShown < nPages) {
 for (var i = totPgNumShown; i < nPages; i++){
 pageContainer.childNodes[i-1].className = "ptabnphide"; }
 var ellip = document.createElement("span"); ellip.className = "ptabnellip"; ellip.innerHTML = "..."; pageContainer.insertBefore(ellip, pageContainer.childNodes[nPages - 1]); }
 pageContainer.childNodes[0].className = "ptabnpcurr"; if (dList.childNodes[0].className == "ptabnhide") { 
 dList.childNodes[0].className = ""; }
 var prevLink = top.document.getElementById("ptabnppageid_" + s.currResults.objName); prevLink.className = "ptabnnppage ptabnppageD";  }
 
 }
 }

 if (listFormat && !s.currResults.firstOpen && !browserInfoObj2.isiPad) {
 s.win.popup.resize();  }
 }
 if (s.firstOpen) {
 s.firstOpen = false; }
 
 
 if (listFormat) {
 var RASpan = top.document.getElementById("RelatedActionsFlagPersGbl"); if (RASpan) {
 RASpan.value = "true";  getAllRelatedActions(); RASpan.value = "false"; }
 }
 
 
 return false; },


 close : function () {
 
 var s = searchGbl;   if (s.container && s.container.style.display != "none") {
 s.container.style.display = "none";  }

 
 
 
 
 
 var promptIcon = top.document.getElementById("pthdr2srchprompt_GBL"); if (promptIcon) {
 if (promptIcon.href.indexOf("opening") > -1) {
 promptIcon.href = promptIcon.href.substring(0, promptIcon.href.indexOf("opening")); }
 }

 
 if (listFormat) {
 var currPage = 0;  var oId = s.currResults.objName;  var dList = top.document.getElementById("ptabndatalist_" +oId);    for (var i = 0, y = 0; i < dList.childNodes.length; i++) {
 if (dList.childNodes[i].className != "ptabnhide" && y == 0) {
 currPage = i; y = 1; }
 }

 
 var removeChildSafe = function (el) {
 
 while(el.childNodes.length > 0) {
 removeChildSafe(el.childNodes[el.childNodes.length-1]); }
 el.parentNode.removeChild(el); }

 
 var relActs = ptUtil.getElemsByClass("relactionlink", dList.childNodes[currPage], "a")
 if (relActs !== null) {
 for (var i = 0; i < relActs.length; i++) {
 var pLength = relActs[i].parentNode.childNodes.length; var pNode = relActs[i].parentNode; var x = 0; for (var y =0; y < pLength; y++) {
 var child = pNode.childNodes[x]; if  (child.id.indexOf("DROPDOWN") > -1) {
 removeChildSafe(child); }
 else 
 x = x + 1;  }
 }
 
 if (pNode) {
 pNode.style.display = "none"; pNode.style.display = "block"; pNode.style.display = ""; }
 }
 }

 if (s.isResize) {

 var frag = document.createDocumentFragment(); var inMemContPar = s.container.parentNode; var inMemCont = inMemContPar.removeChild(s.container); inMemCont = frag.appendChild(inMemCont); parent.ptUtil.swapClass(inMemCont,"ptabncontshow","ptabnconthide");  if (!listFormat) {
 var tables = inMemCont.getElementsByTagName("table"); var hTable = tables[0];  var dTable = tables[1];   dTable.style.width = "100%";  dTable.parentNode.style.width = "auto";  dTable.parentNode.style.height = "auto"; dTable.tHead.rows[0].className = ""; hTable.parentNode.style.display = "none"; }
 s.container = inMemContPar.insertBefore(inMemCont,inMemContPar.firstChild); } else {
 parent.ptUtil.swapClass(s.container,"ptabncontshow","ptabnconthide"); }

 
 ptEvent.remove(document,"keydown",s.doKeyDown); if (s.favs) { 
 s.win.popup.setCenter(true); s.favs.style.display = "block"; }
 
 
 return false; },

 
 doKeyDown : function (e) {

 
 
 var s = searchGbl; var tgtId = e.target.id; if (tgtId === s.srchAgainId || typeof(e.target.name) !== "undefined") {

 
 var keyCode = parent.ptUtil.getKeyCode(e); var isShiftKey = parent.ptUtil.isShiftKey(e); var isAltKey = parent.ptUtil.isAltKey(e); if (keyCode == 9) { 
 if (!isShiftKey) {

 if (e.target && typeof(e.target.name) !== "undefined") {
 
 if (e.target.name === "ptabnSEARCH_RESULTLAST") {
 s.srchAgain.focus(); return false;  } else if (e.target.name === "ptabnSEARCH_RESULTSECTIONLAST") {
 var viewAll = top.document.getElementById("ptabnva_" + s.currResults.objName); if (viewAll) {
 
 if (parent.ptUtil.getCSSValue(viewAll.lastChild,"display") === "none") {
 s.srchAgain.focus(); return false; }
 }
 }
 }
 } else { 
 if (tgtId === s.srchAgainId) { 
 return false; }

 }
 } else if (keyCode == 27) { 
 if (tgtId === s.srchAgainId ||
 e.target.name.indexOf("ptabn") !== -1) {
 s.win.popup.close(); return false; }

 } else if (isAltKey) {

 var sr = s.currResults; if (keyCode === 190) { 

 var nextImg = top.document.getElementById("ptabnni_" + sr.objName); if(!parent.ptUtil.isClassMember(nextImg,"ptabnnextimgD")) {
 s.handleNextRows(s,sr,nextImg); return false; }
 } else if (keyCode === 188) { 

 var prevImg = top.document.getElementById("ptabnpi_" + sr.objName); if(!parent.ptUtil.isClassMember(prevImg,"ptabnprevimgD")) {
 s.handlePrevRows(s,sr,prevImg); return false; }
 }
 }
 } 
 return true; },

 
 
 
 
 
 resize : function (pWidth,pHeight,sbAction) {

 var s = searchGbl; s.isResize = true;  if (!listFormat) {
 var oId = s.currResults.objName; var dTable = top.document.getElementById("ptabndt_" + oId);  var hTable = top.document.getElementById("ptabnht_" + oId);  if (typeof(sbAction) !== "undefined") { 

 
 
 if ((dTable.offsetHeight + dTable.parentNode.offsetTop + s.containerBottomOffset) > pHeight) { 
 if (s.currResults.isVertScroll) { return; } 
 if (!s.currResults.isHorScroll) {
 dTable.parentNode.style.width = dTable.parentNode.offsetWidth + s.sbWidth + "px"; }
 dTable.parentNode.style.height = pHeight - s.currResults.dTblTopOff - s.containerBottomOffset + "px"; s.currResults.isVertScroll = true; } else {
 if (!s.currResults.isVertScroll) { return; } 

 if (!s.currResults.isHorScroll) {
 dTable.parentNode.style.width = "auto"; }
 dTable.parentNode.style.height = "auto"; s.currResults.isVertScroll = false; } 
 return; }

 
 dTable.style.width = "auto"; hTable.parentNode.style.display = "block"; var htColGroup = top.document.getElementById("ptabnht_cg_" + oId); var dtColGroup = top.document.getElementById("ptabndt_cg_" + oId);   var dCols = dTable.tHead.rows[0].cells; var c, colWidth, colWidths = [];  for (var i = 0; i < dCols.length; i++) {
 
 if (parent.ptUtil.isClassMember(dCols[i],"ptabnhide")) {
 colWidths.push("0"); continue; }

 if (browserInfoObj2.isIE && (s.IEquirksMode || s.isIE7) && !browserInfoObj2.isEdge) {

 
 
 c = dCols[i]; if (c.currentStyle !== 'undefined' && c.currentStyle) {
 colWidth = c.offsetWidth - (c.offsetWidth - c.clientWidth) -
 parseInt(c.currentStyle.paddingRight) -
 parseInt(c.currentStyle.paddingLeft) + "px"; } else {
 colWidth = c.offsetWidth - (c.offsetWidth - c.clientWidth) + "px"; }
 } else {
 colWidth = dCols[i].offsetWidth + "px"; }
 colWidths.push(colWidth); }

 
 var sbHeight = 0; if (s.container.offsetWidth > pWidth) {
 s.currResults.isHorScroll = true; sbHeight = s.sbWidth; } else {
 s.currResults.isHorScroll = false; }

 
 var sbWidth = 0; if ((s.container.offsetHeight + s.container.offsetTop + sbHeight) > pHeight) {
 s.currResults.isVertScroll = true; sbWidth = s.sbWidth; s.currResults.pNodeWidth = dTable.parentNode.offsetWidth + sbWidth + "px";  if (!s.currResults.isHorScroll && ((s.container.offsetWidth + sbWidth) > pWidth)) {
 s.currResults.isHorScroll = true; }
 } else {
 s.currResults.isVertScroll = false; }

 
 if (s.currResults.firstOpen) {
 for (var i = 1; i < dTable.tBodies.length; i++) {
 dTable.tBodies[i].className = "ptabnhide";  }

 
 if ((s.container.offsetHeight + s.container.offsetTop + sbHeight) < pHeight) {
 s.currResults.isVertScroll = false; }

 
 if (document.documentElement.getBoundingClientRect) {
 s.currResults.dTblTopOff = dTable.getBoundingClientRect().top; s.currResults.dTblLeftOff = dTable.getBoundingClientRect().left; } else { 
 var endId = s.container.offsetParent.offsetParent.id; var curTop = 0; var obj = dTable; if (obj.offsetParent) {
 while (obj.offsetParent && obj.offsetParent.id !== endId) {
 curTop += obj.offsetTop; obj = obj.offsetParent; }
 }
 s.currResults.dTblTopOff = curTop; }
 }

 
 var frag = document.createDocumentFragment(); var inMemContPar = s.container.parentNode; var inMemCont = inMemContPar.removeChild(s.container); var inMemForm = inMemCont.getElementsByTagName("form")[0]; inMemCont = frag.appendChild(inMemCont); var tables = inMemForm.getElementsByTagName("table"); var dTable = tables[1];  var hTable = tables[0];  var htColGroup = hTable.childNodes[0]; var dtColGroup = dTable.childNodes[0]; for (var w = 0; w < colWidths.length; w++) {
 
 if (colWidths[w] !== "0") {
 htColGroup.childNodes[w].style.width = colWidths[w]; dtColGroup.childNodes[w].style.width = colWidths[w]; }
 }

 
 
 var newTHead = dTable.tHead.cloneNode(true); hTable.deleteTHead(); hTable.appendChild(newTHead); searchGbl.replaceIDs(hTable.tHead, "_ht", "add");  dTable.tHead.rows[0].className = "ptabndthidetr";  if (s.firstResize) { 
 

 
 var c = inMemCont; var tB, bB, tP, bP, tM, bM; bB = parseInt(parent.ptUtil.getCSSValue(c,"borderBottomWidth")); bP = parseInt(parent.ptUtil.getCSSValue(c,"paddingBottom")); bM = parseInt(parent.ptUtil.getCSSValue(c,"marginBottom")); bB = isNaN(bB) ? 0 : bB; bP = isNaN(bP) ? 0 : bP; bM = isNaN(bM) ? 0 : bM; s.containerBottomOffset = bB + bP + bM;  var tB, bB, tP, bP, tM, bM; bR = parseInt(parent.ptUtil.getCSSValue(c,"borderRightWidth")); pR = parseInt(parent.ptUtil.getCSSValue(c,"paddingRight")); mR = parseInt(parent.ptUtil.getCSSValue(c,"marginRight")); bR = isNaN(bR) ? 0 : bR; pR = isNaN(pR) ? 0 : pR; mR = isNaN(mR) ? 0 : mR; s.containerRightOffset = bR + pR + mR; }

 
 if (s.currResults.firstOpen) {
 s.currResults.firstOpen = false; hTable.summary = dTable.summary; }

 
 if (s.currResults.isVertScroll) {
 dTable.parentNode.style.height = pHeight - s.currResults.dTblTopOff - s.containerBottomOffset - sbHeight + "px"; } else {
 dTable.parentNode.style.height = "auto"; }

 var newWidth;   if (s.currResults.isHorScroll) {
 dTable.style.tableLayout = "fixed"; hTable.style.tableLayout = "fixed"; var newWidth = pWidth - s.currResults.dTblLeftOff - sbWidth - s.containerRightOffset + "px"; dTable.style.width = newWidth; hTable.style.width = newWidth; dTable.parentNode.style.width = newWidth; hTable.parentNode.style.width = newWidth; } else {

 hTable.style.tableLayout = "auto"; hTable.style.width = "auto"; hTable.parentNode.style.width = "auto"; dTable.style.tableLayout = "auto"; dTable.style.width = "auto"; dTable.parentNode.style.width = "auto"; if (s.currResults.isVertScroll) {
 dTable.parentNode.style.width = s.currResults.pNodeWidth; }
 }
 
 
 
 s.container = inMemContPar.insertBefore(inMemCont,inMemContPar.firstChild); s.sForm = document.ptabnGblSrch;  if (s.currResults.isVertScroll || s.currResults.isHorScroll) {
 return false; } else {
 return true; }
 }
 
 
 else if (listFormat) {
 
 var oId = s.currResults.objName; var dList = top.document.getElementById("ptabndatalist_" +oId);  var currPage = 0;  if (typeof(sbAction) !== "undefined" && !browserInfoObj2.isiPad) { 

 
 
 if ((dList.offsetHeight + dList.parentNode.offsetTop + s.containerBottomOffset) > pHeight) { 
 if (s.currResults.isVertScroll) { return; } 
 if (!s.currResults.isHorScroll) {
 dList.parentNode.style.width = dList.parentNode.offsetWidth + s.sbWidth + "px"; }
 dList.parentNode.style.height = pHeight - s.currResults.dTblTopOff - s.containerBottomOffset + "px"; s.currResults.isVertScroll = true; } else {
 if (!s.currResults.isVertScroll) { return; } 

 if (!s.currResults.isHorScroll) {
 dList.parentNode.style.width = "auto"; }
 dList.parentNode.style.height = "auto"; s.currResults.isVertScroll = false; } 
 return; }

 
 for (var i = 0, y = 0; i < dList.childNodes.length; i++) {
 if (dList.childNodes[i].className != "ptabnhide" && y == 0) {
 currPage = i; y = 1; }
 else dList.childNodes[i].className = "";  }
 
 if (s.currResults.firstOpen) currPage = 0; dList.style.width = "auto";  dList.parentNode.style.display = "block";  var sbHeight = 0; if (s.container.offsetWidth > pWidth) {
 s.currResults.isHorScroll = true; sbHeight = s.sbWidth; } else {
 s.currResults.isHorScroll = false; }

 
 var sbWidth = 0; if ((s.container.offsetHeight + s.container.offsetTop + sbHeight) > pHeight) {
 s.currResults.isVertScroll = true; sbWidth = s.sbWidth; s.currResults.pNodeWidth = dList.parentNode.offsetWidth + sbWidth + "px";  if (!s.currResults.isHorScroll && ((s.container.offsetWidth + sbWidth) > pWidth)) {
 s.currResults.isHorScroll = true; }
 } else {
 s.currResults.isVertScroll = false; }


 for (var i = 0; i < dList.childNodes.length; i++) {
 dList.childNodes[i].className = "ptabnhide";  }
 dList.childNodes[currPage].className = "";    if (s.currResults.firstOpen) {
 
 
 if ((s.container.offsetHeight + s.container.offsetTop + sbHeight) < pHeight) {
 s.currResults.isVertScroll = false; }

 
 if (document.documentElement.getBoundingClientRect) {
 s.currResults.dTblTopOff = dList.getBoundingClientRect().top; s.currResults.dTblLeftOff = dList.getBoundingClientRect().left; } else { 
 var endId = s.container.offsetParent.offsetParent.id; var curTop = 0; var obj = dList; if (obj.offsetParent) {
 while (obj.offsetParent && obj.offsetParent.id !== endId) {
 curTop += obj.offsetTop; obj = obj.offsetParent; }
 }
 s.currResults.dTblTopOff = curTop; }
 }

 
 var frag = document.createDocumentFragment(); var inMemContPar = s.container.parentNode; var inMemCont = inMemContPar.removeChild(s.container); var inMemForm = inMemCont.getElementsByTagName("form")[0]; inMemCont = frag.appendChild(inMemCont);  if (s.firstResize) { 

 
 var c = inMemCont; var tB, bB, tP, bP, tM, bM; bB = parseInt(parent.ptUtil.getCSSValue(c,"borderBottomWidth")); bP = parseInt(parent.ptUtil.getCSSValue(c,"paddingBottom")); bM = parseInt(parent.ptUtil.getCSSValue(c,"marginBottom")); bB = isNaN(bB) ? 0 : bB; bP = isNaN(bP) ? 0 : bP; bM = isNaN(bM) ? 0 : bM; s.containerBottomOffset = bB + bP + bM;  var tB, bB, tP, bP, tM, bM; bR = parseInt(parent.ptUtil.getCSSValue(c,"borderRightWidth")); pR = parseInt(parent.ptUtil.getCSSValue(c,"paddingRight")); mR = parseInt(parent.ptUtil.getCSSValue(c,"marginRight")); bR = isNaN(bR) ? 0 : bR; pR = isNaN(pR) ? 0 : pR; mR = isNaN(mR) ? 0 : mR; s.containerRightOffset = bR + pR + mR; }

 
 if (s.currResults.firstOpen) {
 s.currResults.firstOpen = false; }

 
 if (s.currResults.isVertScroll) {
 if (pHeight - s.currResults.dTblTopOff - s.containerBottomOffset - sbHeight > 0) {
 dList.parentNode.style.height = pHeight - s.currResults.dTblTopOff - s.containerBottomOffset - sbHeight + "px"; }
 } else {
 dList.parentNode.style.height = "auto"; }

 var newWidth;   if (s.currResults.isHorScroll) {
 dList.style.tableLayout = "fixed";  var newWidth = pWidth - s.currResults.dTblLeftOff - sbWidth - s.containerRightOffset + "px"; dList.style.width = newWidth; dList.parentNode.style.width = newWidth; } else {
 dList.parentNode.style.width = s.currResults.pNodeWidth; }

 

 var RASpan = top.document.getElementById("RelatedActionsFlagPersGbl"); var RAImgWidth = 0; if (RASpan && RASpan.value == "true") {
 RAImgWidth = 20; }
 dList.parentNode.style.width = (parseInt(dList.parentNode.style.width.split("px")[0]) + RAImgWidth).toString() + "px";  var divContainer = dList.parentNode.parentNode.parentNode.parentNode; divContainer.style.width = dList.parentNode.style.width;    s.container = inMemContPar.insertBefore(inMemCont,inMemContPar.firstChild); s.sForm = document.ptabnGblSrch; if (s.currResults.isVertScroll || s.currResults.isHorScroll) {
 return false; } else {
 return true; }
 }
 },

 getScrollBarWidth : function() {

 var sbWidth = 0; var db = document.body; if (browserInfoObj2.isIE) {

 var ta1 = document.createElement("textarea"); ta1.cols = "10"; ta1.rows = "2"; ta1.className = "ptabntatest"; var ta2 = ta1.cloneNode(); ta2.style.overflow = "hidden"; db.appendChild(ta1); db.appendChild(ta2); sbWidth = ta1.offsetWidth - ta2.offsetWidth; db.removeChild(db.lastChild);  db.removeChild(db.lastChild);  } else {

 var oDiv, iDiv, wNoScroll = 0, wScroll = 0;  oDiv = document.createElement('div'); oDiv.className = "ptabndtest";  iDiv = document.createElement("div"); iDiv.style.width = "100%"; iDiv.style.height = "200px";  oDiv.appendChild(iDiv); db.appendChild(oDiv);  wNoScroll = iDiv.offsetWidth;  oDiv.style.overflow = "auto";  wScroll = iDiv.offsetWidth; db.removeChild(db.lastChild); sbWidth = wNoScroll - wScroll; }
 return sbWidth; },

 getCookieVal : function (cName) {
 
 var s, e, rv = "", ac = document.cookie; if (ac.length > 0) {
 s = ac.indexOf(cName + "="); if (s !== -1) {
 s += cName.length + 1;  e = ac.indexOf(";",s); if (e === -1) { e = document.cookie.length; }
 rv = decodeURIComponent(ac.substring(s,e)); }
 }
 return rv; },

 isRSEnabledOnBC : function (liEl) {
 return liEl && parent.ptUtil.isClassMember(this.getLastChild(liEl),this.bcPromptClass); }
 };if (typeof(ptEvent) !== "undefined" && !searchGbl.sForm) {
 ptEvent.load(searchGbl.init);}
