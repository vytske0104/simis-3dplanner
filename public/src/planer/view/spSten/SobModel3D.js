
	
	
export class SobModel3D  {
    constructor(par,fun) { 
    	var self=this;    
		this.type = 'SobModel3D';
		this.par=par;
		this.fun=fun;



		this._veiwType=this.par._veiwType;
        this._active=false;
		


		this.visi3D=this.par.par.visi3D




		this.out = function (e) { 
           /* if(self.par.par.bactive==false)return  


            if(e)if(e.target){
                if(e.target.sten){  
                    if(self.mPanel1.parent!=undefined) self.mPanel1.parent.remove(self.mPanel1)

                    self.sten=undefined
                    if(self.object!=undefined){//разруливаем тоскаемый элемент                    
                        if(self.object.parent!=undefined){  
                                        
                            e.target.sten.remove(self.object); 
                            var l=self.getLink(self.object.object)                        
                            self.glaf.dragPic.start(32, l, null,null,true);
                            self.dragPriceScane();  
                            

                        }
                        if(self.object.outDrag)self.object.outDrag()
                    }
                }
            }*/

            self.fun("visi3d");    
            window.document.body.style.cursor = "auto";
        }

        var blok,stage
        this.over = function (e) {           
       
            
            blok=self.poiscParam(e.target,"objClik");
          
            if(blok!=null){                    
                window.document.body.style.cursor = "pointer";  
                self.fun("visi3d");  
            }
        }

        

        this.down = function (e) {


            
          	if(e==null){
                return
            }
        	if(e.target==null){
                if(e.originalEvent){
                    if(e.originalEvent.button==0){
                        self.fun("clearActive")
                    }
                }
                return
            }

        	
        	if(e.originalEvent)if(e.originalEvent){
        		if(e.originalEvent.button!=0)return
				
        	}	
        	blok=self.poiscParam(e.target,"objClik");
        	if(blok!=null){
        		stage=self.poiscParam(e.target,"objStage");
        		if(stage!=null){        			
        			self.par.par.menu.mObject.setObject(blok)
        		}
        		self.fun("visi3d");  
        	}

        }


        this.poiscParam = function (o,p) {
            if(o[p]!=undefined)return o[p];
            if(o.parent!=undefined)return this.poiscParam(o.parent, p)
            return null;
        } 

        


	}


   

    set active(value) {
        if(this._active!=value){
            this._active= value;
            if(this._active){
                this.visi3D.addChildMouse(this.par.content3d);
                this.visi3D.addEvent("out", this.out);        
                this.visi3D.addEvent("over", this.over);
                this.visi3D.addEvent("down", this.down);
            }else{
                this.visi3D.removeChildMouse(this.par.content3d);
                this.visi3D.removeEvent("out", this.out);        
                this.visi3D.removeEvent("over", this.over);
                this.visi3D.removeEvent("down", this.down);
                this.fun("clearActive");
            }

            

        }
    }    
    get active() { return  this._active;}



    set veiwType(value) {
        if(this._veiwType!=value){
            this._veiwType= value;

            if(this._veiwType==0){
                this.active=true;

            }else{
                this.active=false;

            }

        }
    }    
    get veiwType() { return  this._veiwType;}

}


