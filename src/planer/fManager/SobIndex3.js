
import { SobIndex } from './SobIndex.js';


export class SobIndex3  extends SobIndex {
    constructor(par,fun) {
        super();            
        this.type="SobIndex0";
  		var self=this;
        this.par=par;
        this.fun=fun;

        this.setActive = function () { 
            //this.par.floor.sp.activMouse=false;

            this.par.floor.sp.activMouse=true;
            this.par.floor.visiPoint= false; 
            this.par.floor.bazaMod.activMouse= true;
            this.par.floor.bazaMod.activeRadius= false;
       
        }

        this.move = function (e) { 

        }

        this.out = function (e) {   
            //trace(e)
        }

        this.over = function (e) {   
            
        }

        var sten, pol,point, gObj
        this.down = function (e) {  
            point=null;
            sten=null;
            pol=null;
            if(e.target){  
                
                
                if(e.target.name=="Pol3D"){ 
                    pol=e.target.gObj;                    
                    self.par.activOne(pol);
                    return;
                }

                if(e.target.name=="PointSten"){                    
                    point=e.target.objGlob;
                    self.par.activOne(point);                                     
                    return;
                }  

                if(e.target.name=="Sten3D"){                     
                    sten=self.getSten(e.target)  
                    self.par.activOne(sten);  
                    self.par.visi3D.intRend=1;
                    return;
                } 
                trace(">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>",e.target.name)

                gObj=self.getParName(e.target,"gObj");//чо за обьект наведения  
                trace(">>>>>>",gObj)               
                if(gObj!=null) {
                    if(gObj.type=="Blok"){
                        trace(">>",gObj)
                        self.par.activOne(gObj);                                     
                        return;
                    }
              
                }


                           
            }
            self.par.activOne(null);
        }
      

        this.clear=function(){
            
        }
        
    }
}
