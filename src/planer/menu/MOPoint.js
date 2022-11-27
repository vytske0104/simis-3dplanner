

import { MOBaza } from './MOBaza.js';

export class MOPoint extends MOBaza {
  	constructor(par,fun) {  
        super(par,fun);
  		this.type="MOPoint";
        this.typeNa="SpPointSten";
  		var self=this;       

        this.dCont=new DCont(par.dCont);

        
        this.button=undefined;
        this.slid
        this.slid1
        this.bool=true
        this.postIn=function(){
           
            this.window.title="Point(DEBAG)"
           /* this.button=new DButton(this.window.content,this.otstup1,this.otstup1,"",function(){
                self.bool=false
                self.object.clear();                
            });
            this.button.width=this.button.height=this.wh;*/
            var yy=this.otstup

            this.slid=new DSliderBig(this.window.content, this.otstup,yy, function(s){ 
                self.bool=false
                self.object.position.x=self.slid.value;
                self.object.dragPost()
                visi3D.intRend=1
            }, "x",  -this.whSize/2, this.whSize/2)
            this.slid.width=this.width-this.otstup*2
            this.slid.okrug=1

            this.slid.funChange=function(){
                self.bool=true
                self.drag()
            }
            yy+=this.slid.height+this.otstup

            this.slid1=new DSliderBig(this.window.content, this.otstup,yy, function(s){ 
                self.bool=false
                self.object.position.y=self.slid1.value
                self.object.dragPost()
                visi3D.intRend=1

            }, "y",  -this.whSize/2, this.whSize/2)
            this.slid1.width=this.width-this.otstup*2
            yy+=this.slid.height+this.otstup

            this.window.height=yy+32
            this.slid1.okrug=1;

            this.slid1.funChange=function(){
                self.bool=true
                self.drag()
            }
        }

        
        
        this.drag=function(){
            if(self.bool!=false){
                trace("###")

                self.slid.value=Math.round(self.object.position.x)
                //self.slid.min=self.slid.value-this.whSize/2
                //self.slid.max=self.slid.value+this.whSize/2
                self.slid1.value=Math.round(self.object.position.y)
                //self.slid1.min=self.slid1.value-this.whSize/2
                //self.slid1.max=self.slid1.value+this.whSize/2
            }            
        }

       

        this.postSO=function(){ 
            this.bool=true           
            this.object.arrayClass[0].funDragMenu=this.drag
            this.drag()
        }
        this.clear=function(){
            if(this.object!=undefined){
                this.bool=true
                this.object.arrayClass[0].funDragMenu=undefined;
            }
            this.active=false;
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
