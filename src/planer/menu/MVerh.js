



export class MVerh  {
    constructor(par, fun) {         
        this.type="MVerh";
        var self=this;
        this.par=par;
        this.fun=fun;
        this.param=this.par.param;
        this.dCont1=new DCont(); 
        this.par.dCont.add(this.dCont1)
        this.otstup=this.param.otstup
        this._active=false;



        this.down=function(){
         

        }  

        this.panel

        this.init=function(){
            
            if(this.dCont!=undefined)return
            this.dCont = new DCont(); 
          
            if(window.localS.object.debug!==true)return
            

            this.button=new DButton(this.dCont,0,this.otstup,"TĘSTI",function(){

            }); 

            this.button.height= this.param.wh;
            this.button.width= 150;
            this.button.color= this.param.colorActive; 

           new MXZ(this)


        }



    
        var w,h,s;
        this.sizeWindow = function(_w,_h,_s){  
            if(_w){
                w= _w;
                h= _h; 
                s= _s              
            }
            if(this.button) {
                //this.panel.width= w/s-this.otstup*2; 
                this.dCont.x = w/s-this.otstup-this.button.width
            }        
        }
    }

    set active(value) {       
        if (this._active != value) {
            this._active = value;
            if(this._active==true){
                this.init()               
                this.dCont1.add(this.dCont)
            }else{               
                this.dCont1.remove(this.dCont)
            } 
        }
    }
    get active() {
        return this._active;
    }

    set indexStep(value) {       
        if (this._indexStep != value) { 
            this._indexStep = value;
            this.init();
            var p=-1;
            for (var i = 0; i < this.gallery.array.length; i++) {
                if(this.gallery.array[i].object.tId*1==value){
                    p=i;
                    break
                }
            } 
            this.gallery.index=p;            
        }
    }
    get indexStep() {
        return this._indexStep;
    }
}





export class MXZ  {
    constructor(par,fun) {          
        this.type="MXZ";
        var self=this;
        this.par=par
        this.fun=fun
        this.param=this.par.param;

        this.otstup=this.param.otstup;
        this.otstup1=this.param.otstup;
        this.wh=this.param.wh;
        this.width=150;
        this.height=40;
       

        this.dCont=new DCont(par.dCont);
        this.dCont.y=this.param.wh+this.otstup*3;   
        
       

        this.label=new DLabel(this.dCont,this.otstup,0)
        this.label.activMouse=false
        this.label.width=this.width-this.otstup*2;
        this.label.textAlign ="center";
       // this.label.color=dcmParam.colorText
        
        if(window.localS.object.debug==true){
            this.label1=new DLabel(this.dCont,this.otstup,dcmParam.fontSize+this.otstup*2)
            this.label1.activMouse=false
            this.label1.width=this.width;
            this.label1.textAlign ="center"
        }

        window.mxz=this;

        this.funFDO=function(){ 
            
            
            var a=0;
            for (var i = 0; i < self.sp.arrSplice.length; i++) {
                if(self.sp.arrSplice[i].life==true){
                    if(self.sp.arrSplice[i].boolAree==true){
                        a+=self.sp.arrSplice[i].arrayClass[0].arrGrani[0].area
                    }                      
                }
            }
            var p=0;
            for (var i = 0; i < self.sp.worldBlok.array.length; i++) {
                if(self.sp.worldBlok.array[i].life==true){
                    if(self.sp.worldBlok.array[i].prase!==undefined){
                        p+=self.sp.worldBlok.array[i].prase
                    }
                }
            }
            self.label.text=Math.round(a/1000)+" m²"
            if(window.localS.object.debug==true)self.label1.text=Math.round(p*100)/100+" $"


              

        }

        setTimeout(function() {
            self.sp=facade.sp;
            self.sp.funFDO=self.funFDO;
            self.funFDO();
        }, 10);
    }
}