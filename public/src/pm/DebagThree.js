
var Stats=function(){var n=Date.now(),p=n,g=0,q=Infinity,r=0,h=0,t=Infinity,u=0,v=0,w=0,f=document.createElement("div");window.onload=function(){document.getElementById("stats").style.top=document.documentElement.clientHeight-100+"px"};f.id="stats";f.addEventListener("mousedown",function(b){b.preventDefault();x(++w%2)},!1);f.style.cssText="position:fixed; width:65px; height: 40px;border-width: 3px 3px 1px 1px;border-style: solid;border-color: rgb(255, 255, 255);border-image: initial; opacity:0.9;cursor:pointer";
var a=document.createElement("div");a.id="fps";a.style.cssText="padding:0 0 3px 3px;text-align:left;background-color:#002";f.appendChild(a);var k=document.createElement("div");k.id="fpsText";k.style.cssText="color:#0ff;font-family:Helvetica,Arial,sans-serif;font-size:7px;font-weight:bold;line-height:10px";k.innerHTML="FPS";a.appendChild(k);var c=document.createElement("div");c.id="fpsGraph";c.style.cssText="position:relative;width:54px;height:27px;background-color:#0ff";for(a.appendChild(c);54>c.children.length;){var l=
document.createElement("span");l.style.cssText="display:block; width:1px;height:22px;float:left;background-color:#113";c.appendChild(l)}var d=document.createElement("div");d.id="ms";d.style.cssText="padding:0 0 3px 3px;text-align:left;background-color:#020;display:none";f.appendChild(d);var m=document.createElement("div");m.id="msText";m.style.cssText="color:#0f0;font-family:Helvetica,Arial,sans-serif;font-size:7px;font-weight:bold;line-height:10px";m.innerHTML="MS";d.appendChild(m);var e=document.createElement("div");
e.id="msGraph";e.style.cssText="position:relative;width:57px;height:27px;background-color:#0f0";for(d.appendChild(e);57>e.children.length;)l=document.createElement("span"),l.style.cssText="display:block;width:1px;height:22px;float:left;background-color:#131",e.appendChild(l);var x=function(b){w=b;switch(w){case 0:a.style.display="block";d.style.display="none";break;case 1:a.style.display="none",d.style.display="block"}};return{REVISION:11,domElement:f,setMode:x,begin:function(){n=Date.now()},end:function(){var b=
Date.now();g=b-n;q=Math.min(q,g);r=Math.max(r,g);m.textContent=g+" MS ("+q+"-"+r+")";var a=Math.min(25,25-g/200*25);e.appendChild(e.firstChild).style.height=a+"px";v++;b>p+1E3&&(h=Math.round(1E3*v/(b-p)),t=Math.min(t,h),u=Math.max(u,h),k.textContent=h+" FPS ("+t+"-"+u+")",a=Math.min(25,25-h/100*25),c.appendChild(c.firstChild).style.height=a+"px",p=b,v=0);return b},update:function(){n=this.end()}}};









function DebagThree(dCont, x, y, scene,visi3D) { 	
	this.type="DebagThree";
	var self=this;

    this.scene=scene;
    this.visi3D=visi3D;


    this.dCont=new DCont(dCont);
    this.dCont.x=x;
    this.dCont.y=y;
    this.width=200

    this._active=false 


    this.w=new DWindow(this.dCont, this.widthBig+this.otstup, this.whv," ",function(){        
        self.active=!this.minimize;
    });
    this.w.button.height= this.w.width=28;
    this.w.minimize=!this._active;
    this.content=this.w.content;
    this.w.height=200;





    if(this.visi3D!=undefined){
        new DCheckBox(this.content,70,0,"alwaysRender",function(){
            self.visi3D.alwaysRender=this.value
        }).value=self.visi3D.alwaysRender;
    }
    this.aL=[]
    for (var i = 0; i < 6; i++) {
        this.aL[i]=new DLabel(this.content,2,80+i*20," ");
        this.aL[i].width=this.width;
    }




    this.bTest=new DButton(this.content, 2, 48," Test Info",function(){     
        self.dragMod()
    });
    this.bTest.width=this.width-4;
    this.bTest.visible=false
    this.w.height=80;

    this.c3d;
    this.setObj=function(c3d){
        this.c3d=c3d;
        this.bTest.visible=true
        this.w.height=240;
    }

    this.aObj=[]
    this.aMesh=[]

    this.aGeo=[]

    this.aMat=[]
    this.aTex=[]


    this.dragMod=function(){
        this.aGeo=[]
        this.aMat=[]
        this.aTex=[]
        this.aL[0].text="obj  ..      ="+getObj(this.c3d, 0)
        this.aL[1].text="Mesh ..      ="+getMesh(this.c3d)
        this.aL[2].text="Triang  ..   ="+getTrian(this.c3d)
        this.aL[3].text="Geometry..   ="+this.aGeo.length
        this.aL[4].text="Material..   ="+this.aMat.length

        for (var i = 0; i < this.aMat.length; i++) {
         
            for (var s in this.aMat[i]) {
                
                if(this.aMat[i][s] instanceof THREE.Texture){
                  
                    bbbb=false
                    for (var j = 0; j < self.aTex.length; j++) {

                        if(self.aTex[j].uuid==this.aMat[i][s].uuid){
                            bbbb=true
                        }
                    }

                    if(bbbb==false)self.aTex.push(this.aMat[i][s])
                }
                
            }
        }
        this.aL[5].text="Texture..   ="+this.aTex.length
    }


    function getTrian (c3d){
        var r=0;        
        if(c3d.geometry!=undefined){ 
        
            if(c3d.geometry.index!=undefined){
                if(c3d.geometry.index!=undefined){
                    r+=c3d.geometry.index.count/3;
                }
            }            
        }


        if(c3d.children){
            for (var i = 0; i < c3d.children.length; i++) {
                r+=getTrian(c3d.children[i]);
            }
        }
        return r;
    }



    var bbbb=true
    function getMesh (c3d){
        var r=0;
        if(c3d.geometry!=undefined){
            r++;
            bbbb=false
            for (var i = 0; i < self.aGeo.length; i++) {
                if(self.aGeo[i].uuid==c3d.geometry.uuid){
                    bbbb=true
                }
            }
            if(bbbb==false)self.aGeo.push(c3d.geometry)
        }

        if(c3d.material!=undefined){ 
            bbbb=false
            for (var i = 0; i < self.aMat.length; i++) {
                if(self.aMat[i].uuid==c3d.material.uuid){
                    bbbb=true
                }
            }
            if(bbbb==false)self.aMat.push(c3d.material)
        }


        if(c3d.children){
            for (var i = 0; i < c3d.children.length; i++) {
                r+=getMesh(c3d.children[i]);
            }
        }
        return r;
    }

    function getObj (c3d, rr){
        var r=rr+1;      
        if(c3d.children){
            for (var i = 0; i < c3d.children.length; i++) {
                r+=getMesh(c3d.children[i], 0);
            }
        }
        return r;
    }




    var stats = new Stats();

    stats.domElement.style.position = 'fixed'; /// ///////////////////
    //stats.domElement.style.top = this._height - 80 + 'px'; // set the position //
    //stats.domElement.style.left = '5px';
    //stats.domElement.style.zIndex = '3'; /// ///////////////////


    this.content.div.appendChild(stats.domElement);

    function animate() {
        requestAnimationFrame( animate );
        if(self.active==true) self.upDate()

    }

    this.upDate=function(){
        
        stats.update();
    }   


    animate() 


    Object.defineProperty(this, "active", {
        set: function (value) {           
            this._active=value;               
            this.w.minimize=!this._active;
            if(this._active==true){
                this.w.width=this.width
                this.w.text="fdgh"
            }else{
                this.w.width=32;
                this.w.text=" "
            }
        },
        get: function () {
            return this._active;
        }
    });
}  




