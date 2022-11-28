
import { SobIndex } from './SobIndex.js';


export class SobIndex4  extends SobIndex {
    constructor(par,fun) {
        super();            
        this.type="SobIndex4";
  		var self=this;
        this.par=par;
        this.fun=fun;

        this.setActive = function () { 
            //this.par.floor.sp.activMouse=false;
/*
            this.par.floor.sp.activMouse=true;
            this.par.floor.visiPoint= false; 
            this.par.floor.bazaMod.activMouse= true;
            this.par.floor.bazaMod.activeRadius= false;
            */
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
           
        }
      

        this.clear=function(){
            
        }
        
    }
}
