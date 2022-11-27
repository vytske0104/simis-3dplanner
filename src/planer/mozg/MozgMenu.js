



export class MozgMenu {
    constructor(par, fun) { 
        this.type="MozgMenu";
        var self=this;
        this.par=par;
        this.fun=fun;
        this.param=this.par.param;
        this.dCont1=new DCont(); 
        this.par.dCont.add(this.dCont1)
        this.otstup=this.param.otstup
        this._active=false;
        this.dCont=undefined;

        this.dragActive=undefined;//отробатывает после актива
      
        this.facade=this.par.par.view.facade;
     

        //инициализация заменибельна
        this.init=function(){            
            if(this.dCont!=undefined)return
            this.dCont = new DCont();
            var p=new  DPanel(this.dCont, this.otstup + this.param.wh,this.otstup) 
            var l=new DLabel(p,5,5,"Еще не начинал работу по "+this.type)  
            l.width=90;
            l.fontSize=10;
        }

    
        //Система на смену размеров экрана
        var w,h,s;
        this.ww=100;
        this.hh=100;
        this.ss=1;
        this.sizeWindow = function(_w,_h,_s){  
            if(_w){
                this.ww= _w;
                this.hh= _h;
                this.ss= _s;   
            }           
            this.sizeWDrag()
        }


        this.sizeWDrag = function(){ 

        }

    }   


    set active(value) {       
        if (this._active != value) {
            this._active = value;
            if(this._active==true){
                this.init();               
                this.dCont1.add(this.dCont);
            }else{               
                this.dCont1.remove(this.dCont);
            }
            if(this.dragActive)this.dragActive(); 
        }
    }
    get active() {
        return this._active;
    }
}



