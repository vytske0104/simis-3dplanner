

import { MOBaza } from './MOBaza.js';

export class MOTComp3But extends MOBaza {
  	constructor(par,fun) {  
        super(par,fun);
  		this.type="MOTCompArrow";
        this.typeNa="TComp3But";
  		var self=this;       

        this.dCont=new DCont(par.dCont);

        
        this.button=undefined;
        this.slid
        this.slid1
        this.bool=true
        this.array=[]
        this.postIn = function(){
           
            this.window.title="MOTCompArrow(DEBAG)"
          

            this.pObject=new DParamObject(this.window.content,this.otstup,this.otstup,function(){          
                visi3D.intRend=1
            },1);
            this.pObject.width=this.window.width-this.otstup*2
            this.pObject.otstup=this.otstup;

            for (var i = 0; i < 4; i++) {
                this.array[i]=new DParamObject(this.window.content,this.otstup,this.otstup,function(){          
                    visi3D.intRend=1
                },1)
                this.array[i].width=this.window.width-this.otstup*2
                this.array[i].otstup=this.otstup;
            }
        }

        
        
        this.drag=function(){
            if(self.bool!=false){
                /*this.pObject.addObject(self.object);
                this.pObject1.addObject(self.object.position);
                this.pObject2.addObject(self.object.position1);
                
                this.pObject1.w.y=this.pObject.finalHeight+this.otstup*2
                this.pObject2.w.y=this.pObject1.finalHeight+this.otstup+this.pObject1.w.y

                this.window.height=this.pObject2.w.y+this.pObject1.finalHeight+this.otstup+32*/

                this.array[0].addObject(self.object);
                this.array[1].addObject(self.object.button);
                this.array[2].addObject(self.object.button1);
                this.array[3].addObject(self.object.button2);

                var yy=this.otstup
                for (var i = 0; i < this.array.length; i++) {
                    this.array[i].w.y=yy;
                    yy+=this.array[i].finalHeight+this.otstup;
                }

                this.window.height=yy+this.otstup+32

              
            }            
        }

       

        this.postSO=function(){ 
            this.bool=true           
            //this.object.arrayClass[0].funDragMenu=this.drag
            this.drag()
        }
        this.clear=function(){
            if(this.object!=undefined){
                this.bool=true
                //this.object.arrayClass[0].funDragMenu=undefined;
            }
            this.active=false
        }

        this.sizeWindow = function(w,h,s){ 
            this.dCont.x=w/s-this.width       
        }
  	}

    set index(value) {
        if(this._index!=value){
            this._index= value;
                  
        }
    }  

}
