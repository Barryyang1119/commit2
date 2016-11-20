function getClass(selector,obj){
if(typeof selector!="string"){
 return false;
} 
obj=obj||document;           	
  if(obj.getElementsByClassName){
return obj.getElementsByClassName(selector);
}else{
  var alls=obj.getElementsByTagName("*");
  var arr=[];
  for (var i = 0; i < alls.length; i++) {
     if(checkClass(alls[i].className,selector)){
     	arr.push(alls[i]);
     }
  };
  return arr;
}
}
function checkClass(longstr,str){
    var arr=longstr.split(" ");
    for (var i = 0; i < arr.length; i++) {
    	if(arr[i]==str){
    		return true;
    	}
    };
    return false;
}
function getText(obj,val){
  if(val==undefined){
  if(obj.textContent){
     return obj.textContent;
  }else{
    return obj.innerText;
  }
}else{
  if(typeof obj.textContent=="string"){
     obj.textContent=val;
  }else{
    obj.innerText=val;
  }
}
}
function getStyle(obj,attr){
if(window.getComputedStyle){
return getComputedStyle(obj,null)[attr]
}else{
return obj.currentStyle[attr] 
}
}
function $(selector,obj){
  obj=obj||document;
  if(typeof selector=="string"){
 selector=selector.replace(/^\s+|\s+$/g,"") 
    if(selector.charAt(0)=="."){
      return getClass(selector.slice(1))
    }else if(selector.charAt(0)=="#"){
      return obj.getElementById(selector.slice(1))
    }else if(/^[a-z|1-6]{1,10}$/g.test(selector)){
      return obj.getElementsByTagName(selector)
    }    
  }else if(typeof selector=="function") {
    // window.onload=function(){
    //   selector();
    // }
  addEvent(window,"load",selector)
  }  
}
function getChilds(obj,type){
  type=type==undefined?false:type;
  var aa=obj.childNodes;
  var arr=[];
  for (var i = 0; i < aa.length; i++){
    if(type==false){
    if(aa[i].nodeType==1){
    arr.push(aa[i]) 
    } 
  }else{
    if(aa[i].nodeType==1||(aa[i].nodeType==3&&trim(aa[i].nodeValue)!="")){
      arr.push(aa[i])
    }
  }
  }; 
  return arr;            
}
function trim(str){
  return str.replace(/^\s*|\s*$/g,"")
}
function getFirst(obj){
   return getChilds(obj)[0];
}
function getLast(obj){
  return getChilds(obj)[getChilds(obj).length-1]
}
function getNext(obj){
  var next=obj.nextSibling;
  if(next==null){
    return null;
  }
  while(next.nodeType!=1){
    next=next.nextSibling;
    if(next==null){
      return null;
    }
  }
  return next;
}
function getPrevious(obj){
  var pre=obj.previousSibling;
  if(pre==null){
    return null;
  }
  while(pre.nodeType!=1){
    pre=pre.previousSibling;
    if(pre==null){
      return null;
    }
  }
  return pre;
}
function getParent(obj){
  return obj.parentNode;
}
function addBefore(a,b){
  var parent=b.parentNode;
  parent.insertBefore(a,b);
}
function addAfter(a,b){
    var next=getNext(b);
    var parent=b.parentNode;
    if(next==null){
    parent.appendChild(a);
    }else{
    parent.insertBefore(a,next);
    } 
    }
function removeObj(obj){
      var parent=obj.parentNode;
      parent.removeChild(obj)
    }
function replaceObj(newobj,oldobj){
 var parent=oldobj.parentNode;
 parent.replaceChild(newobj,oldobj)
    } 
function cloneObj(obj,bull){
     bull=false||bull;
     return obj.cloneNode(bull);
    } 
function appendObj(parent,obj){
      parent.appendChild(obj);
}   
//获取任意一个元素相对于文档的位置left
function getLeft(obj){
     var newobj=obj.parentNode;
     var left=obj.offsetLeft;
     while(newobj.nodeName!="BODY"){
     if(getStyle(newobj,"position")!="static"){ 
      left=left+newobj.offsetLeft+parseInt(getStyle(newobj,"borderLeftWidth"))
      }
      newobj=newobj.parentNode;
     }
     return left;
} 

//获取任意一个元素相对于文档的位置top
function getTop(obj){
     var newobj=obj.parentNode;
     var top=obj.offsetTop;
while(newobj.nodeName!="BODY"){
if(getStyle(newobj,"position")!="static"){ 
      top=top+newobj.offsetTop+parseInt(getStyle(newobj,"borderTopWidth"))
      }
      newobj=newobj.parentNode;
     }
 return top;
} 
function addEvent(obj,event,fun){
   if(obj.addEventListener)
   obj.addEventListener(event,fun,false)
  else
    obj.attachEvent("on"+event,fun)
}
function removeEvent(obj,event,fun){
   if(obj.removeEventListener)
obj.removeEventListener(event,fun,false)
   else
    obj.detachEvent("on"+event,fun)
}
function offsetWindow(){
  var obj={};
  obj.height=document.documentElement.clientHeight;
  obj.width=document.documentElement.clientWidth;
  return obj;
}
function mousewheel(obj,fun1,fun2){         
 if(document.attachEvent){
obj.attachEvent("onmousewheel",scrollFn); //IE、 opera
}else if(document.addEventListener){
obj.addEventListener("mousewheel",scrollFn,false);
//chrome,safari -webkit
obj.addEventListener("DOMMouseScroll",scrollFn,false);
//firefox -moz-
}
function scrollFn(e){
    var ev=e||window.event;
     if(ev.detail==-3||ev.wheelDelta==120){
       fun1.call(obj)
     }else if(ev.detail==3||ev.wheelDelta==-120){
         fun2.call(obj)
     }
   }
   }

  //判断某个元素是否包含有另外一个元素
 function contains (parent,child) {
  if(parent.contains){
     return parent.contains(child) && parent!=child;
  }else{
    return (parent.compareDocumentPosition(child)===20);
  }
 }

 //判断鼠标是否真正的从外部移入，或者是真正的移出到外部；

  function checkHover (e,target) {
   if(getEvent(e).type=="mouseover"){
      return !contains(target,getEvent(e).relatedTarget || getEvent(e).fromElement)&&
    !((getEvent(e).relatedTarget || getEvent(e).fromElement)===target)
   }else{
    return !contains(target,getEvent(e).relatedTarget || getEvent(e).toElement)&&
    !((getEvent(e).relatedTarget || getEvent(e).toElement)===target)
    }
  }


//鼠标移入移除事件
/*
  obj   要操作的对象
  overfun   鼠标移入需要处理的函数
  outfun     鼠标移除需要处理的函数
*/
function hover (obj,overfun,outfun) {
    if(overfun){
      obj.onmouseover=function  (e) {
        if(checkHover(e,obj)){
           overfun.call(obj,[e]);
        }
      }
    }
    if(outfun){
      obj.onmouseout=function  (e) {
        if(checkHover(e,obj)){
           outfun.call(obj,[e]);
        }
      }
    }
} 
function getEvent(e){
  return e||window.event;
} 