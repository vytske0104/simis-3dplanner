


export class NMBaze  {
  	constructor(par,fun) {  		
  		this.type="NMBaze";
        this.typeNa="NMBaze";
  		var self=this;
        this.par=par
        this.fun=fun
        this.param=this.par.param;

        this.width=this.param.wh+this.param.otstup;
        this.height=this.param.wh+this.param.otstup;

        this.dCont1=new DCont(par.dCont1);
        this.dCont=undefined
        
        this.postSO=undefined;
        this.postIn=undefined;
        this.bool=true;




        this.init=function(){
            if(this.dCont!=undefined)return;
            this.dCont=new DCont();
            this.panel=new DPanel(this.dCont)
            this.panel.width= this.width;
            this.panel.height= this.height

            if(this.postIn!=undefined)this.postIn();
            this.sizeWindow() 
        }



        this.object=undefined;
        this.setObject=function(obj){
            this.object=obj;  
            this.active=true;
            if(this.postSO)this.postSO()
            this.sizeWindow()        
        }

        this.killObj=function(){
            if(this.object.clear){
                if(dcmParam.getFocus()!=null)return
                this.object.clear();
                this.active=false;
            }
        }

        this.boolCTRL=false;
        this.keydown=function(sob,event,boolCTRL){
            
            if(event.keyCode==8 || event.keyCode==46){
                this.killObj();
            }
            
            if(boolCTRL!==undefined)this.boolCTRL=boolCTRL
        }
        
        this.keyup=function(sob,event,boolCTRL){
            if(boolCTRL!==undefined)this.boolCTRL=boolCTRL
        }


        var w,h,s;
        this.sizeWindow = function(_w,_h,_s){  
            if(_w){
                w= _w;
                h= _h;
                s= _s;   
            }
            if( this.dCont &&  this.dCont.parent){

                if(dcmParam.mobile==true){
                    this.dCont.y=h/s-this.height//-this.param.otstup*2
                    this.dCont.x=(w/s-(this.width-this.param.otstup*2))/2
                }else{
                    this.dCont.y=this.param.otstup
                    this.dCont.x=w/s-this.param.sizeBase
                }
                
            }
        }
  	}

    set active(value) {       
        if (this._active != value) {
            this._active = value;
            if(this._active==true){
                this.init();               
                this.dCont1.add(this.dCont)
                this.sizeWindow() 
            }else{               
                this.dCont1.remove(this.dCont)
            } 
        }
    }
    get active() {
        return this._active;
    }

}
