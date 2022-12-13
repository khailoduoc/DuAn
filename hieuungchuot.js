if  ((document.getElementById) && 
        window.addEventListener || window.attachEvent){
        
        (function(){
        
        //Configure here...
        
        var xCol = "#ff0000";
        var yCol = "#008000";
        var zCol = "#0000ff";
        var n = 6;   //number of dots per trail.
        var t = 40;  //setTimeout speed.
        var s = 0.2; //effect speed.
        
        //End.
        
        var r,h,w;
        var d = document;
        var my = 10;
        var mx = 10;
        var stp = 0;
        var evn = 360/3;
        var vx = new Array();
        var vy = new Array();
        var vz = new Array();
        var dy = new Array();
        var dx = new Array();
        
        var pix = "px";
        
        var strictmod = ((document.compatMode) && 
        document.compatMode.indexOf("CSS") != -1);
        
        
        var domWw = (typeof window.innerWidth == "number");
        var domSy = (typeof window.pageYOffset == "number");
        var idx = d.getElementsByTagName('div').length;
        
        for (i = 0; i < n; i++){
        var dims = (i+1)/2;
        d.write('<div id="x'+(idx+i)+'" style="position:absolute;'
        +'top:0px;left:0px;width:'+dims+'px;height:'+dims+'px;'
        +'background-color:'+xCol+';font-size:'+dims+'px"><\/div>'
        
        +'<div id="y'+(idx+i)+'" style="position:absolute;top:0px;'
        +'left:0px;width:'+dims+'px;height:'+dims+'px;'
        +'background-color:'+yCol+';font-size:'+dims+'px"><\/div>'
        
        +'<div id="z'+(idx+i)+'" style="position:absolute;top:0px;'
        +'left:0px;width:'+dims+'px;height:'+dims+'px;'
        +'background-color:'+zCol+';font-size:'+dims+'px"><\/div>');
        }
        
        if (domWw) r = window;
        else{ 
          if (d.documentElement && 
          typeof d.documentElement.clientWidth == "number" && 
          d.documentElement.clientWidth != 0)
          r = d.documentElement;
         else{ 
          if (d.body && 
          typeof d.body.clientWidth == "number")
          r = d.body;
         }
        }
        
        
        function winsize(){
        var oh,sy,ow,sx,rh,rw;
        if (domWw){
          if (d.documentElement && d.defaultView && 
          typeof d.defaultView.scrollMaxY == "number"){
          oh = d.documentElement.offsetHeight;
          sy = d.defaultView.scrollMaxY;
          ow = d.documentElement.offsetWidth;
          sx = d.defaultView.scrollMaxX;
          rh = oh-sy;
          rw = ow-sx;
         }
         else{
          rh = r.innerHeight;
          rw = r.innerWidth;
         }
        h = rh; 
        w = rw;
        }
        else{
        h = r.clientHeight; 
        w = r.clientWidth;
        }
        }
        
        
        function scrl(yx){
        var y,x;
        if (domSy){
         y = r.pageYOffset;
         x = r.pageXOffset;
         }
        else{
         y = r.scrollTop;
         x = r.scrollLeft;
         }
        return (yx == 0)?y:x;
        }
        
        
        function mouse(e){
        var msy = (domSy)?window.pageYOffset:0;
        if (!e) e = window.event;    
         if (typeof e.pageY == 'number'){
          my = e.pageY - msy + 16;
          mx = e.pageX + 6;
         }
         else{
          my = e.clientY - msy + 16;
          mx = e.clientX + 6;
         }
        if (my > h-65) my = h-65;
        if (mx > w-50) mx = w-50;
        }
        
        
        
        function assgn(){
        for (j = 0; j < 3; j++){
         dy[j] = my + 50 * Math.cos(stp+j*evn*Math.PI/180) * Math.sin((stp+j*25)/2) + scrl(0) + pix;
         dx[j] = mx + 50 * Math.sin(stp+j*evn*Math.PI/180) * Math.sin((stp+j*25)/2) * Math.sin(stp/4) + pix;
        }
        stp+=s;
        
        for (i = 0; i < n; i++){
         if (i < n-1){
          vx[i].top = vx[i+1].top; vx[i].left = vx[i+1].left; 
          vy[i].top = vy[i+1].top; vy[i].left = vy[i+1].left;
          vz[i].top = vz[i+1].top; vz[i].left = vz[i+1].left;
         } 
         else{
          vx[i].top = dy[0]; vx[i].left = dx[0];
          vy[i].top = dy[1]; vy[i].left = dx[1];
          vz[i].top = dy[2]; vz[i].left = dx[2];
          }
         }
        setTimeout(assgn,t);
        }
        
        
        function init(){
        for (i = 0; i < n; i++){
         vx[i] = document.getElementById("x"+(idx+i)).style;
         vy[i] = document.getElementById("y"+(idx+i)).style;
         vz[i] = document.getElementById("z"+(idx+i)).style;
         }
        winsize();
        assgn();
        }
        
        
        if (window.addEventListener){
         window.addEventListener("resize",winsize,false);
         window.addEventListener("load",init,false);
         document.addEventListener("mousemove",mouse,false);
        }  
        else if (window.attachEvent){
         window.attachEvent("onload",init);
         document.attachEvent("onmousemove",mouse);
         window.attachEvent("onresize",winsize);
        } 
        
        })();
        }//End.