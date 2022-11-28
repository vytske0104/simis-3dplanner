

import { SobIndex } from './SobIndex.js';


export class SobIndex2  extends SobIndex {
  	constructor(par,fun) {
        super();      		
  		this.type="SobIndex2";
  		var self=this;
        this.par=par;
        this.fun=fun;

        var blok=undefined;
        var posZdvig={x:0,y:0}
        var pos = {x:0,y:0,o:null,dist:0};
        var sp = {x:0,y:0,x1:0,y1:0,s:0,o:null};
        var blok = undefined;

        this.sp=this.par.par.view.facade.sp;


        this.up=function(e){  
            if(blok!=undefined){
               
                if(blok.dONotEvent)blok.dONotEvent(null)
                blok=undefined;
                window.dragPic.stop();
                visi3D.position3d.pause=false
                
                wH3D.clear()
            }
        }

        this.over=function(e){  
            if(blok!=undefined){

            }
        }


        this.korektP2=function(x, y, y1, _x1){
            
            point1.x=x//e.point.x+pointZdvig.x;
            point1.y=y//e.point.z+pointZdvig.y;                        
            pp=calc.isPointInLin(
                gObj.addPoint.position,
                gObj.addPoint1.position,
                point1,
                1000001,0
            )
            var d=this.calcXZ.getDistance(pp,gObj.addPoint.position)
            point2.x=d+_x1
            point2.y=y1//e.point.y
        }


        var pp
        var point1={x:0,y:0}
        var point={x:0,y:0}
        var point2={x:0,y:0}
        var granSten,gObj,sten

        var pointZdvig={x:20,y:20}

        this.move=function(e){             
            //return

            if(blok!=undefined){ 
                gObj=this.getGObj(e);
                
                if(gObj && gObj.type=="SpliceSten"){               
                    self.korektP2(e.point.x, e.point.z, e.point.y+pointZdvig.y, pointZdvig.x);
                    //trace(pointZdvig,point2)

                    
                    if(blok.parent==undefined){ 
                        blok.setPosition(point2.x, point2.y, 0);
                        
                        gObj.addBlok(blok);

                        
                        //blok.parent.clearYBig()

                        if(blok.parent!==undefined){
                            blok.parent.clearYBig();
                            blok.parent.dragOsi(blok);

                            window.dragPic.stop(); 
                        } else{
                            if(window.dragPic.active==false){
                                window.dragPic.start(48,blok.icon,blok,this.upDrag,1)
                            }                            
                        }                       
                    } 

                    if(blok.parent!==undefined){
                        
                        if(blok.parent.par.uuid!=gObj.uuid){
                            pointZdvig.x=0;
                            pointZdvig.y=0;
                            self.korektP2(e.point.x, e.point.z, e.point.y+pointZdvig.y, pointZdvig.x)

                            blok.parent.par.removeBlok(blok);

                            
                            gObj.addBlok(blok);
                            if(blok.parent!==undefined){
                                blok.parent.clearYBig()
                                blok.parent.dragOsi(blok);
                            }
                        }                       
                    }

                    if(blok.parent!==undefined){                       
                        blok.parent.korectOsi(point2, blok);                        
                        blok.setPosition(point2.x, point2.y, 0);
                    }
                    
                        
                }else{
                    if(blok.parent!==undefined){
                        if(e.target.name=="ManMouse3D"){                            
                            window.dragPic.start(48,blok.icon,blok,this.upDrag,1)
                            blok.parent.par.removeBlok(blok);
                            visi3D.intRend=1;
                            pointZdvig.x=0;
                            pointZdvig.y=0;
                        }                
                    }                    
                }

                visi3D.intRend=1;
            }
        }


        var blokTuk
        this.down=function(e){ 
            pointZdvig.x=0;
            pointZdvig.y=0; 

            gObj=this.getGObj(e);
            blokTuk=this.getGObj(e,"objBlok"); 
            //
            
                      
            if(blokTuk!=null){                
                blok=blokTuk;

                if(self.boolCTRL){
                    var blokNN=blok.copy()
                    blok.parent.addBlok(blokNN);  

                    if(blokNN.parent) {
                        blok=blokNN
                    } 
                }
               
                self.korektP2(e.point.x, e.point.z, e.point.y,0);                

                pointZdvig.x=(blok._x-point2.x);
                pointZdvig.y=(blok._y-point2.y);

                if(blok.dONotEvent) blok.dONotEvent(true);

                visi3D.event3DArr.mouseRay();
                let eq=visi3D.event3DArr.event3D;
                let gObj1=this.getGObj(eq);
                
                if(gObj1)if(gObj1.idArr===gObj.idArr){
                    self.korektP2(eq.point.x, eq.point.z, eq.point.y,0); 
                    pointZdvig.x=(blok._x-point2.x);
                    pointZdvig.y=(blok._y-point2.y);
                }

                blok.parent.dragOsi();
                visi3D.position3d.pause=true;
                self.sp.worldBlok.activeObject=blok;
                self.par.activOne(blok);


            }
        }



        this.sobSP=function(s,p,e){
               
            posZdvig.x=0
            posZdvig.y=0

           

            if(s=="creatObjDin"){               
                visi3D.position3d.pause=true;
                blok=self.sp.worldBlok.getBlok(p);
                blok.init();
                self.par.activOne(blok);
                self.sp.worldBlok.activeObject = blok;
                window.dragPic.start(48,blok.icon,blok,this.upDrag,1)              
                if(blok.funMouseDown)blok.funMouseDown();                
                return
            }
        }




        this.upDrag=function(){

        }
    }
}

