


export class MPreloader  {
    constructor(par, link, group) {
    	this.type="MPreloader";
		var self=this;
		this.par=par
		this.link= link   
		this._active= false;
        this._preload=0;

        this.dCont=new DCont();
        if(this.par)if(this.par.dCont)this.par.dCont.add(this.dCont)

        this._text=""


        this.label=new DLabel(this.dCont, 0,0, this._text)
        this.label.textAlign="center"
        this.label.visible=false


        this.tvPreLoader=undefined;
        this.panel=undefined;
        this.div
		this.init=function(){
            
            if(this.dCont1!=undefined)return  

            this.dCont1=new DCont();    
            this.div = this.dCont1.div;


            this.panel=new DPanel(this.dCont1)
            this.panel.alpha=0.5


            this.fun=function(p, p1){
                trace(p, p1)
            }          

            if(group){
                mhbd.getKeyId(group, link, function(e){                    
                    self.icon=mhbd.getLink(e.icon);
                    self.tvPreLoader = new TVPreLoader(self, self.icon)
                    self.tvPreLoader.active=self.active
                    self.sizeWindow()
                })
            }else{
                self.icon=self.link;
                self.tvPreLoader = new TVPreLoader(self, self.link)
                self.tvPreLoader.active=self.active
            }
            


            
            
            this.sizeWindow()
        }

        this.cont
        this.setdCont=function(cont){
            this.cont=cont;
            this.cont.add(this.dCont)
        }
         
        this.update=function(cont){
            if(this._active==true){
                if(this.tvPreLoader)this.tvPreLoader.upDate()
            }
        }

        var w,h,s
        this.sizeWindow = function(_w,_h,_s){
            if(_w){
                w=_w;
                h=_h;
                s=_s;
            }

            if(this._active==true){
                this.panel.width=w;
                this.panel.height=h;
                if(this.tvPreLoader){
                    
                    this.tvPreLoader.sizeWindow(w,h,s)

                    if(this._text==""){
                        this.label.visible=false
                    }else{
                        this.label.visible=true;
                        this.label.y=h/2+50;
                        this.label.width=w
                    }
                    

                    
                    trace(">>>>>>>>>>>>>",w,h,s,this.label.y,this._text)

                }
            }
        }
        trace("this._activethis._activethis._activethis._active=====sdfsdfsdfsdfsdfdsf=========",this._active)
    }

    set preload(value) {
        if(this._preload!=value){
            this._preload= value;
            if(this.tvPreLoader)this.tvPreLoader.progress=value          
        }
    }    
    get preload() { return  this._preload;}


    set text(value) {
        if(this._text!=value){
            this._text= value;
            this.label.text=this._text
            this.sizeWindow()        
        }
    }    
    get text() { return  this._text;}



    set active(value) {
        if(this._active!=value){
            this._active= value;
             trace("this._activethis._activethis._activethis._active==============",this._active)
            this.init();
                    
            if(this.tvPreLoader)this.tvPreLoader.active=value;
            if(this._active==true){
                this.dCont.add(this.dCont1)
                this.sizeWindow()
            }else{
                this.dCont.remove(this.dCont1)
                this.text=""
            }  
          
        }
    }    
    get active() { return  this._active;}
}














export class TVPreLoader  {
    constructor(par,linkPreload,fun) {          
        this.type="TVPreLoader";
        var self=this;
        this.fun=fun; 
        this.par=par; 
        this.linkPreload=linkPreload;

        this._activeMouse=false;  

        this._active=false;
        this._visible=false;
        this._alpha=0;
        this._color="#222222";
        this._color1="#ffffff";


        this._width=100;
        this._height=10;
        this._otstup=2;


        this.alphaPlus=0.05

        this.div= document.createElement('div');
        this.div.style.position = 'fixed';
        this.div.style.top = '0px';
        this.div.style.left = '0px';
        if(self.par)this.par.div.appendChild(this.div);
        this.div.style.visibility =  'hidden';


        this.divFon= document.createElement('div');
        this.divFon.style.position = 'fixed';
        this.divFon.style.top = '0px';
        this.divFon.style.left = '0px';        
        this.div.appendChild(this.divFon);

        this.w=100;
        this.h=100;
        this.s=100;

        var _mat

        this.divFon.style.width=(this.w-2)+"px";
        this.divFon.style.height=(this.h-2)+"px";
        this.divFon.style.background=this._color;
        this.divFon.style.opacity = 0.75;

        this.div.style.pointerEvents="none"; 

        this.img
      
        if(this.linkPreload!=undefined){
            
            this.div2= document.createElement('div');
            this.div2.style.position = 'fixed';
            this.div2.style.top = '0px';
            this.div2.style.left = '0px';
            this.div.appendChild(this.div2);

            this.div3= document.createElement('div');
            this.div3.style.position = 'fixed';
            this.div3.style.top = '0px';
            this.div3.style.left = '0px';
            this.div2.appendChild(this.div3);



            this.img = new Image();
            this.img.style.position = 'fixed';
            this.img.style.pointerEvents = 'none';
            this.img.width=64;
            this.img.height=64;
            self.img.style.top = '-32px';
            self.img.style.left = '-32px';
            this.img.onload = function(){
                this.onload=undefined
                if(self.fun)self.fun("compliteImagePre",this)
            }; 
            this.div3.appendChild(this.img);           
            this.img.src = this.linkPreload;




            _mat = 'scaleX(1) scaleY(1) translate('+Math.round(this.w/2)+'px, '+Math.round(this.h/2)+'px)';
            self.div2.style["transform"] = _mat;
            self.div2.style["ms-transform"] = _mat;
            self.div2.style["webkit-transform"] = _mat;
        } else{
            this.div2= document.createElement('div');
            this.div2.style.position = 'fixed';
            this.div2.style.top = '0px';
            this.div2.style.left = '0px';   
            this.div2.style.width=  (this._width+this._otstup*2) +"px";
            this.div2.style.height=  (this._height+this._otstup*2) +"px"; 
            this.div2.style.background = this._color1;  
            this.div2.style.borderRadius = this._height + 'px';
            this.div.appendChild(this.div2);

            this.div3= document.createElement('div');
            this.div3.style.position = 'fixed';
            this.div3.style.top = this._otstup+'px';
            this.div3.style.left = this._otstup+'px';

            this.div3.style.width=  (this._width) +"px";
            this.div3.style.height=  (this._height) +"px"; 
            this.div3.style.background = this._color; 
            this.div3.style.borderRadius = this._height + 'px';
            this.div2.appendChild(this.div3);


        }



        var deg=0;
        this.upDate=function(){        
            if(this._active==false)return




           /* let bb=false
            if(this._active==true){
                if(this._alpha<1){
                    this.alpha+=this.alphaPlus
                }

                if(this.linkPreload!=undefined){
                    if(this.linkPreload!=undefined){
                        bb=true                                  
                    }
                }
            }else{
                if(this._alpha>0){
                    if(this.linkPreload!=undefined)bb=true;   
                    this.alpha-=this.alphaPlus;
                    if(this.alpha<=0){
                        this.visible=false;                        
                    }
                }
            }
*/
            if(this.linkPreload){
                //if(self.par)self.par.render();
                deg+=1
                self.div3.style.webkitTransform = 'rotate('+deg+'deg)'; 
                self.div3.style.mozTransform    = 'rotate('+deg+'deg)'; 
                self.div3.style.msTransform     = 'rotate('+deg+'deg)'; 
                self.div3.style.oTransform      = 'rotate('+deg+'deg)'; 
                self.div3.style.transform       = 'rotate('+deg+'deg)';   
            }else{
                deg++;
                if(deg>10){
                    let ppp=(100-self._progress)/4*Math.random();
                    self.progress+=ppp;
                    deg-=Math.round(Math.random()*30);
                }                
            }
        }


        /*var deg=0;
        this.upDate=function(){
            


            let bb=false
            if(this._active==true){
                if(this._alpha<1){
                    this.alpha+=this.alphaPlus
                }

                if(this.linkPreload!=undefined){
                    if(this.linkPreload!=undefined){
                        bb=true                                  
                    }
                }
            }else{
                if(this._alpha>0){
                    if(this.linkPreload!=undefined)bb=true;   
                    this.alpha-=this.alphaPlus;
                    if(this.alpha<=0){
                        this.visible=false;                        
                    }
                }
            }

            if(bb){                
                if(self.par)self.par.render();
                deg+=1
                self.div3.style.webkitTransform = 'rotate('+deg+'deg)'; 
                self.div3.style.mozTransform    = 'rotate('+deg+'deg)'; 
                self.div3.style.msTransform     = 'rotate('+deg+'deg)'; 
                self.div3.style.oTransform      = 'rotate('+deg+'deg)'; 
                self.div3.style.transform       = 'rotate('+deg+'deg)';   
            }


        }*/




       
        this.sizeWindow=function(w,h,s){
            if(w){
                this.w=w;
                this.h=h;
                this.s=s;
            }
            this.divFon.style.width=(this.w)+"px";
            this.divFon.style.height=(this.h)+"px";

            if(this.linkPreload!=undefined){
                _mat = 'scaleX(1) scaleY(1) translate('+Math.round(this.w/2)+'px, '+Math.round(this.h/2)+'px)';
                self.div2.style["transform"] = _mat;
                self.div2.style["ms-transform"] = _mat;
                self.div2.style["webkit-transform"] = _mat;               
            }else{

                self.div2.style.left= (this.w/2-this._width/2)+'px';
                self.div3.style.left= (this.w/2-this._width/2+this._otstup)+'px';

                self.div2.style.top= (this.h/2-this._height/2)+'px';
                self.div3.style.top= (this.h/2-this._height/2+this._otstup)+'px';
               
               
            }

        }


    } 
    set activeMouse(value) {
        if (this._activeMouse != value) {
            this._activeMouse = value;            
            this.div.style.pointerEvents=value==false?"none":"auto";                                         
        }             
    }
    get activeMouse() { return this._activeMouse; } 

    set progress(value) {
        if (this._progress != value) {
            this._progress = value;            
            if(!this.linkPreload){
                this.div3.style.width=  Math.round(this._width*(this._progress/100)) +"px";
            }                                        
        }             
    }
    get progress() { return this._progress; } 



    set color(value) {
        if (this._color != value) {
            this._color = value;
            this.divFon.style.background=this._color;            
            if(!this.linkPreload){
                this.div3.style.background = this._color;  
            }                                        
        }             
    }
    get color() { return this._color; }  

    set color1(value) {
        if (this._color1 != value) {
            this._color1 = value; 
            if(!this.linkPreload){
                this.div2.style.background = this._color1;  
            }
            this.sizeWindow()                                      
        }             
    }
    get color1() { return this._color1; }  

    set width(value) {
        if (this._width != value) {
            this._width = value; 
            if(!this.linkPreload){
                this.div3.style.width=  (this._width) +"px";
                this.div2.style.width=  (this._width+this._otstup*2) +"px";
            }            
            this.sizeWindow();                                       
        }             
    }
    get width() { return this._width; }  

    set height(value) {
        if (this._height != value) {
            this._height = value;  
            if(!this.linkPreload){
                this.div3.style.height=  (this._height) +"px"; 
                this.div2.style.height=  (this._height+this._otstup*2) +"px"; 
            }      

            this.sizeWindow();                                        
        }             
    }
    get height() { return this._height; }  






    set active(value) {
       // if (this._active != value) {
            this._active = value;
            this.progress =0

            if(this._active==true){
                
                this.visible = true
            }else{
                this.visible = false
            } 


        //}             
    }
    get active() { return this._active; } 

    set alpha(value) {
        if (this._alpha != value) {
            this._alpha = value; 
            this.div.style.opacity = value;                              
        }             
    }
    get alpha() { return this._alpha; } 

    set visible(value) {

        this._visible = value;
        if(this._visible==true){
            this.div.style.visibility ='visible'
        }else{
            this.div.style.visibility ='hidden'
        }  
             
    }
    get visible() { return this._visible; } 
}


