





export class LineWird {
  	constructor(par) {    		
  		this.type="LineWird";
        var self=this;
        this.par=par

        this.array=[]


        this.sob=function(s,p){

        }

        var blok
        this.get=function(){
 			for (var i = 0; i <  this.array.length; i++) {
 				if( this.array[i].parent==undefined)continue

 				return	this.array[i]
 			}

 			blok=new LWBlok(this, this.sob)
 			blok.idArr=this.array.length
 			this.array.push(blok)

 			return blok;
        }

    }
}


export class LWBlok {
  	constructor(par, fun) {    		
  		this.type="LWBlok";
        var self=this;
        this.par=par;
        this.fun=fun;

        this._parent=undefined;





    }

    set parent(value) {  

		if(this._parent!=undefined && value!=undefined){
			if(this._parent.idArr===value.idArr){
				return
			}
		}
    	if(this._parent == value){
    		return
    	} 

        this._parent= value;
        
    }    
    get parent() { return  this._parent;}
}