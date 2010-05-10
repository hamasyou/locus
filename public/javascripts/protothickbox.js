/*
 * Thickbox 3.1 - One Box To Rule Them All.
 * By Cody Lindley (http://www.codylindley.com)
 * Copyright (c) 2007 cody lindley
 * Licensed under the MIT License: http://www.opensource.org/licenses/mit-license.php
 * 
 * Protothickbox 3.1
 * Modified By Spookies Labs(http://labs.spookies.co.jp)
 * depends on prototype.js 1.6 or later + effects.js
*/
var tb_pathToImage = "/images/loadingAnimation.gif";

//on page load call tb_init
document.observe('dom:loaded', function(){   
		   tb_init('a.thickbox');
		   tb_init('area.thickbox');
		   tb_init('input.thickbox');
		   imgLoader = new Image();// preload image
		   imgLoader.src = tb_pathToImage;
		 });

//add thickbox to href & area elements that have a class of .thickbox
function tb_init(domChunk){
  $$(domChunk).each(function(el) {
		      el.observe('click', function(e) {
				   var t = el.title || el.name || null;
				   var a = el.href || el.alt;
				   var g = el.rel || false;
				   tb_show(t,a,g);
				   el.blur();
				   Event.stop(e);
				   return false;
				 });
		    });
}

//function called when the user clicks on a thickbox link
function tb_show(caption, url, imageGroup) {
  try {
    if (typeof document.body.style.maxHeight === "undefined") {//if IE 6
      $(document.body).setStyle({height: "100%", width: "100%"});
      if (!$("TB_HideSelect")) {//iframe to hide select elements in ie6
	$(document.body).insert("<iframe id='TB_HideSelect'></iframe><div id='TB_overlay'></div><div id='TB_window'></div>");
	$("TB_overlay").observe('click', tb_remove);
      }
    } else {//all others
      if (!$("TB_overlay")){
	$(document.body).insert("<div id='TB_overlay'></div><div id='TB_window'></div>");
	$("TB_overlay").observe('click', tb_remove);
      }
    }
    
    if (tb_detectMacXFF()){
      $("TB_overlay").addClassName("TB_overlayMacFFBGHack");//use png overlay so hide flash
    } else {
      $("TB_overlay").addClassName("TB_overlayBG");//use background and opacity
    }
    
    if (caption===null){caption="";}
    $(document.body).insert("<div id='TB_load'><img src='"+imgLoader.src+"' /></div>");//add loader to the page
    $('TB_load').show();//show loader
    $('TB_load').style.display = 'block';
    var baseURL;
    if (url.indexOf("?") != -1){ //ff there is a query string involved
      baseURL = url.substr(0, url.indexOf("?"));
    } else { 
      baseURL = url;
    }
    
    var urlString = /\.jpg$|\.jpeg$|\.png$|\.gif$|\.bmp$/;
    var urlType = baseURL.toLowerCase().match(urlString);

    if (urlType == '.jpg' || urlType == '.jpeg' || urlType == '.png' || urlType == '.gif' || urlType == '.bmp'){//code to show images
      
      TB_PrevCaption = "";
      TB_PrevURL = "";
      TB_PrevHTML = "";
      TB_NextCaption = "";
      TB_NextURL = "";
      TB_NextHTML = "";
      TB_imageCount = "";
      TB_FoundURL = false;
      if (imageGroup){
	TB_TempArray = $$("a[rel="+imageGroup+"]");
	for (TB_Counter = 0; ((TB_Counter < TB_TempArray.length) && (TB_NextHTML === "")); TB_Counter++) {
	  var urlTypeTemp = TB_TempArray[TB_Counter].href.toLowerCase().match(urlString);
	  if (!(TB_TempArray[TB_Counter].href == url)) {						
	    if (TB_FoundURL) {
	      TB_NextCaption = TB_TempArray[TB_Counter].title;
	      TB_NextURL = TB_TempArray[TB_Counter].href;
	      TB_NextHTML = "<span id='TB_next'>&nbsp;&nbsp;<a href='#'>Next &gt;</a></span>";
	    } else {
	      TB_PrevCaption = TB_TempArray[TB_Counter].title;
	      TB_PrevURL = TB_TempArray[TB_Counter].href;
	      TB_PrevHTML = "<span id='TB_prev'>&nbsp;&nbsp;<a href='#'>&lt; Prev</a></span>";
	    }
	  } else {
	    TB_FoundURL = true;
	    TB_imageCount = "Image " + (TB_Counter + 1) +" of "+ (TB_TempArray.length);											
	  }
	}
      }

      imgPreloader = new Image();
      imgPreloader.onload = function(){		
	imgPreloader.onload = null;
	
	// Resizing large images - orginal by Christian Montoya edited by me.
	var pagesize = tb_getPageSize();
	var x = pagesize[0] - 150;
	var y = pagesize[1] - 150;
	var imageWidth = imgPreloader.width;
	var imageHeight = imgPreloader.height;
	if (imageWidth > x) {
	  imageHeight = imageHeight * (x / imageWidth); 
	  imageWidth = x; 
	  if (imageHeight > y) { 
	    imageWidth = imageWidth * (y / imageHeight); 
	    imageHeight = y; 
	  }
	} else if (imageHeight > y) { 
	  imageWidth = imageWidth * (y / imageHeight); 
	  imageHeight = y; 
	  if (imageWidth > x) { 
	    imageHeight = imageHeight * (x / imageWidth); 
	    imageWidth = x;
	  }
	}
	// End Resizing
	
	TB_WIDTH = imageWidth + 30;
	TB_HEIGHT = imageHeight + 60;
	$("TB_window").insert("<a href='' id='TB_ImageOff' title='Close'><img id='TB_Image' src='"+url+"' width='"+imageWidth+"' height='"+imageHeight+"' alt='"+caption+"'/></a>" + "<div id='TB_caption'>"+caption+"<div id='TB_secondLine'>" + TB_imageCount + TB_PrevHTML + TB_NextHTML + "</div></div><div id='TB_closeWindow'><a href='#' id='TB_closeWindowButton' title='Close'>close</a> or Esc Key</div>"); 		
	
	$("TB_closeWindowButton").observe('click', tb_remove);
	
	if (!(TB_PrevHTML === "")) {
	  function goPrev(){
	    $(document).stopObserving("click",goPrev);
	    $("TB_window").remove();
	    $(document.body).insert("<div id='TB_window'></div>");
	    tb_show(TB_PrevCaption, TB_PrevURL, imageGroup);
	    return false;	
	  }
	  $("TB_prev").observe('click', goPrev);
	}
	
	if (!(TB_NextHTML === "")) {		
	  function goNext(){
	    $("TB_window").remove();
	    $(document.body).insert("<div id='TB_window'></div>");
	    tb_show(TB_NextCaption, TB_NextURL, imageGroup);				
	    return false;	
	  }
	  $("TB_next").observe('click', goNext);
	  
	}

	document.onkeydown = function(e){ 	
	  if (e == null) { // ie
	    keycode = event.keyCode;
	  } else { // mozilla
	    keycode = e.which;
	  }
	  if (keycode == 27){ // close
	    tb_remove();
	  } else if (keycode == 190){ // display previous image
	    if (!(TB_NextHTML == "")){
	      document.onkeydown = "";
	      goNext();
	    }
	  } else if (keycode == 188){ // display next image
	    if (!(TB_PrevHTML == "")){
	      document.onkeydown = "";
	      goPrev();
	    }
	  }	
	};
	
	tb_position();
	$("TB_load").remove();
	$("TB_ImageOff").observe('click', tb_remove);
	$("TB_window").setStyle({display:"block"}); //for safari using css instead of show
      };
      
      imgPreloader.src = url;
    } else {//code to show html
      var queryString = url.replace(/^[^\?]+\??/,'');
      var params = tb_parseQuery( queryString );

      TB_WIDTH = (params['width']*1) + 30 || 630; //defaults to 630 if no paramaters were added to URL
      TB_HEIGHT = (params['height']*1) + 40 || 440; //defaults to 440 if no paramaters were added to URL
      ajaxContentW = TB_WIDTH - 30;
      ajaxContentH = TB_HEIGHT - 45;
      
      if (url.indexOf('TB_iframe') != -1){// either iframe or ajax window		
	urlNoQuery = url.split('TB_');
	if ($("TB_iframeContent")) $("TB_iframeContent").remove();
	if (params['modal'] != "true"){//iframe no modal
	  $("TB_window").insert("<div id='TB_title'><div id='TB_ajaxWindowTitle'>"+caption+"</div><div id='TB_closeAjaxWindow'><a href='#' id='TB_closeWindowButton' title='Close'>close</a> or Esc Key</div></div><iframe frameborder='0' hspace='0' src='"+urlNoQuery[0]+"' id='TB_iframeContent' name='TB_iframeContent"+Math.round(Math.random()*1000)+"' onload='tb_showIframe()' style='width:"+(ajaxContentW + 29)+"px;height:"+(ajaxContentH + 17)+"px;' > </iframe>");
	} else {//iframe modal
	  $("TB_overlay").stopObserving();
	  $("TB_window").insert("<iframe frameborder='0' hspace='0' src='"+urlNoQuery[0]+"' id='TB_iframeContent' name='TB_iframeContent"+Math.round(Math.random()*1000)+"' onload='tb_showIframe()' style='width:"+(ajaxContentW + 29)+"px;height:"+(ajaxContentH + 17)+"px;'> </iframe>");
	}
      } else {// not an iframe, ajax
	if ($("TB_window").getStyle("display") != "block"){
	  if (params['modal'] != "true"){//ajax no modal
	    $("TB_window").insert("<div id='TB_title'><div id='TB_ajaxWindowTitle'>"+caption+"</div><div id='TB_closeAjaxWindow'><a href='#' id='TB_closeWindowButton'>close</a> or Esc Key</div></div><div id='TB_ajaxContent' style='width:"+ajaxContentW+"px;height:"+ajaxContentH+"px'></div>");
	  } else {//ajax modal
	    $("TB_overlay").stopObserving();
	    $("TB_window").insert("<div id='TB_ajaxContent' class='TB_modal' style='width:"+ajaxContentW+"px;height:"+ajaxContentH+"px;'></div>");	
	  }
	} else {//this means the window is already up, we are just loading new content via ajax
	  $("TB_ajaxContent").style.width = ajaxContentW +"px";
	  $("TB_ajaxContent").style.height = ajaxContentH +"px";
	  $("TB_ajaxContent").scrollTop = 0;
	  $("TB_ajaxWindowTitle").update(caption);
	}
      }
      
      if ($("TB_closeWindowButton")) $("TB_closeWindowButton").observe('click', tb_remove);
      
      if (url.indexOf('TB_inline') != -1){	
	$("TB_ajaxContent").insert($('#' + params['inlineId']).children());
	$("TB_window").observe('unload', function () {
				 alert('unload');
				 $('#' + params['inlineId']).insert( $("TB_ajaxContent").children() ); // move elements back when you're finished
			       });
	tb_position();
	$("TB_load").remove();
	$("TB_window").setStyle({display:"block"}); 
      } else if (url.indexOf('TB_iframe') != -1){
	tb_position();
	if (Prototype.Browser.WebKit){//safari needs help because it will not fire iframe onload
	  $("TB_load").remove();
	  $("TB_window").setStyle({display:"block"});
	}
      } else {
	new Ajax.Updater("TB_ajaxContent",
			 url,
			 { parameters: {random: new Date().getTime()},
			   onComplete: function(){
			     tb_position();
			     $("TB_load").remove();
			     tb_init("#TB_ajaxContent a.thickbox");
			     $("TB_window").setStyle({display:"block"});
			   }});
      }
    }
    if (!params || !params['modal']){
      document.onkeyup = function(e){ 	
	if (e == null) { // ie
	  keycode = event.keyCode;
	} else { // mozilla
	  keycode = e.which;
	}
	if (keycode == 27){ // close
	  tb_remove();
	}	
      };
    }
    
  } catch(e) {
    alert($H(e).inspect());
    throw e;
    //nothing here
  }
}

//helper functions below
function tb_showIframe(){
  $("TB_load").remove();
  $("TB_window").setStyle({display:"block"});
}

function tb_remove() {
  //$("TB_imageOff").stopObserving("click");
  if ($("TB_closeWindowButton")) {
    $("TB_closeWindowButton").stopObserving("click");
  }
  new Effect.Fade("TB_window", {duration: 0.5});
  ['TB_window','TB_overlay','TB_HideSelect'].each(function(el) {
						    if ($(el)) {
						      $(el).stopObserving().remove();
						    }
						  });
  if ($("TB_load")) $("TB_load").remove();
  if (typeof document.body.style.maxHeight == "undefined") {//if IE 6
    $(document.body).setStyle({height: "auto", width: "auto"});
//    $(document.html).setStyle("overflow","");
  }
  document.onkeydown = "";
  document.onkeyup = "";
  return false;
}

function tb_position() {
  $("TB_window").setStyle({marginLeft: '-' + parseInt((TB_WIDTH / 2),10) + 'px', width: TB_WIDTH + 'px'});
  var version = (navigator.userAgent.toLowerCase().match( /.+(?:rv|it|ra|ie)[\/: ]([\d.]+)/ ) || [])[1];
  if ( !(Prototype.Browser.IE && version < 7)) { // take away IE6
    if ($("TB_window")) $("TB_window").setStyle({marginTop: '-' + parseInt((TB_HEIGHT / 2),10) + 'px'});
  }
}

function tb_parseQuery ( query ) {
  var Params = {};
  if ( ! query ) {return Params;}// return empty object
  var Pairs = query.split(/[;&]/);
  for ( var i = 0; i < Pairs.length; i++ ) {
    var KeyVal = Pairs[i].split('=');
    if ( ! KeyVal || KeyVal.length != 2 ) {continue;}
    var key = unescape( KeyVal[0] );
    var val = unescape( KeyVal[1] );
    val = val.replace(/\+/g, ' ');
    Params[key] = val;
  }
  return Params;
}

function tb_getPageSize(){
  var de = document.documentElement;
  var w = window.innerWidth || self.innerWidth || (de&&de.clientWidth) || document.body.clientWidth;
  var h = window.innerHeight || self.innerHeight || (de&&de.clientHeight) || document.body.clientHeight;
  arrayPageSize = [w,h];
  return arrayPageSize;
}

function tb_detectMacXFF() {
  var userAgent = navigator.userAgent.toLowerCase();
  if (userAgent.indexOf('mac') != -1 && userAgent.indexOf('firefox')!=-1) {
    return true;
  }
}


