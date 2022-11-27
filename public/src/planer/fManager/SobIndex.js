

import { Calc } from './Calc.js';


export class SobIndex  {
  	constructor(par,fun) {  		
  		this.type="SobIndex";
  		var self=this;
        this.par=par;
        this.fun=fun;

        this.mozgMenu=undefined;

        this._sah=0

        this.calcXZ = new Calc();

        this.setActive = function () { 
            this.par.floor.sp.activMouse=true;
            this.par.floor.visiPoint= true; 
           /* this.par.floor.bazaMod.activMouse= false;
            this.par.floor.bazaMod.activeRadius= false  */          
        }


        this.move = function (e) { 

        }

        this.out = function (e) {   
            
        }

        this.over = function (e) {   
            
        }

        this.down = function (e) {            
           
        }
        this.up = function (e) {            
           
        }

        this.getGObj = function (e,key) {
            var k="objGlob"
            if(key!=undefined)k=key;            
            if(e && e.target) return getG(e.target,k)
            return null
        }
        function getG(c3d,key) {                        
            if(c3d[key]) return c3d[key];
            if(c3d.parent) return getG(c3d.parent,key );
            return null    
        }

        this.clear=function(){
            this._sah=0
        }

        var arrPoint,arrSplice
        var bool
        this.clearActive=function(){
            //this.floor.sp.activMouse
            bool=false 
              
            arrPoint=this.par.floor.sp.arrPoint
            arrSplice=this.par.floor.sp.arrSplice
            for (var i = 0; i < arrPoint.length; i++) {                
                if (!arrPoint[i].life) continue;
                if (arrPoint[i].active !== bool){
                    arrPoint[i].active =bool
                }
            } 

            for (var i = 0; i < arrSplice.length; i++) {
                if (!arrSplice[i].life) continue;
                if (arrSplice[i].active !== bool){
                    arrSplice[i].active =bool
                }                
            }           
        }


        this.distSten=20;

        this.getPosEv3D=function(e){
            var rezult=new THREE.Vector3()
            rezult.set(-this.par.whSize/2+this.par.whSize*e.uv.x,-(-this.par.whSize/2+this.par.whSize*e.uv.y),0)  
            return rezult
        }

        var po=new THREE.Vector2()
        var po1=new THREE.Vector2()
        var sten

        this.getSten=function(c3d){           
            return this.getParName(c3d,"sten")            
        }

        this.getParName=function(c3d,name){            
            if(c3d[name]!=undefined)return c3d[name];
            if(c3d.parent!=undefined)return this.getParName(c3d.parent,name);
            return null
        }


        this.getPosEv3DSten=function(e){
            var rezult=new THREE.Vector3()            
            sten=this.getSten(e.target)
            
            if(sten==null)return null

            
            rezult.z=2
            po1.x=e.point.x;
            po1.y=e.point.z;

            if(calc.getDistance(po1,sten.position)<25){
                rezult.z=0;
                rezult.x=sten.position.x;
                rezult.y=sten.position.y;
                return rezult
            }

            if(calc.getDistance(po1,sten.position1)<25){
                rezult.z=1;
                rezult.x=sten.position1.x;
                rezult.y=sten.position1.y;
                return rezult
            }

            

            
            po=calc.isPointInLin(sten.position,sten.position1,po1,100,100)
            //trace("FIXE 1",po, sten)
            rezult.z=2
            rezult.x=po.x;
            rezult.y=po.y;


            return rezult
        }


        this.getDistSten=function(_sten, _point){
            var rezult=-1;
            po1.x=_point.x;
            po1.y=_point.z;

            po=calc.isPointInLin(_sten.position,_sten.position1,po1,11111,11111)
            rezult=calc.getDistance(_sten.position,po)
            

            return rezult
        }




        ////////////////////////////////////
        var aStPo=[]
        var positionOld=new THREE.Vector3() 
        var aPointOld
        var arrPPos=[]
        var arrPSt=[]
        this.startAP=function(aPoint,aPoint1){
            aPointOld=aPoint
            if(aPoint){
                positionOld.x=aPoint.position.x;
                positionOld.y=aPoint.position.y;   
            }else{
                positionOld.x=9999999999;
                positionOld.y=9999999999;   
            }
            
            
            arrPPos.length=0
            for (var i = 0; i < this.par.floor.sp.arrPoint.length; i++) {
                if (!this.par.floor.sp.arrPoint[i].life) continue;
                if (aPoint && this.par.floor.sp.arrPoint[i]._uuid==aPoint._uuid) {                    
                    continue;
                }
                if(aPoint1){
                    if (this.par.floor.sp.arrPoint[i]._uuid==aPoint1._uuid) {                    
                        continue;
                    } 
                }
                arrPPos.push(this.par.floor.sp.arrPoint[i])
            }
            


            arrPSt.length=0
            var b;
            for (var i = 0; i < this.par.floor.sp.arrSplice.length; i++) {
                if (!this.par.floor.sp.arrSplice[i].life) continue;
                b=true
                for (var j = 0; j < aPoint.arrSHron.length; j++) {                    
                    if (aPoint.arrSHron[j].sten._uuid==this.par.floor.sp.arrSplice[i]._uuid) { 
                        b=false
                        
                    } 
                }                
                if(b==true)arrPSt.push(this.par.floor.sp.arrSplice[i])
            }
            


            //arrSplice=this.par.floor.sp.arrSplice
        }

        /*this.oS={}
        this.oS.kol=0;
        this.oS.array=[];
        this.plusOS=function(s,p,p1){
            if(this.oS.array[this.oS.kol]==undefined)this.oS.array[this.oS.kol]={
                s:"tip",
                v:new THREE.Vector3(),
                v1:new THREE.Vector3(),
            }              
            this.oS.kol++;
            return this.oS.array[this.oS.kol-1]
        }*/
        var vect=new THREE.Vector3();
        var vect1=new THREE.Vector3();
        var zz=-75    
        var ot=10;

        var bx,by
        this.korektAP=function(point){
            wH3D.clear()//подсказка
            bx=false;
            by=false;
            point.x=Math.round(point.x*10)/10;
            point.y=Math.round(point.y*10)/10;

            if(positionOld.x-ot<point.x && positionOld.x+ot>point.x){                
                point.x=positionOld.x;
                bx=true
            }
            if(positionOld.y-ot<point.y && positionOld.y+ot>point.y){                
                point.y=positionOld.y;
                by=true
            }
            point.obj=undefined


            



            for (var i = 0; i < arrPPos.length; i++) {                
                if(calc.getDistance(point,arrPPos[i].position)<ot*1.01){
                    point.x=arrPPos[i].position.x;
                    point.y=arrPPos[i].position.y;
                    point.obj=arrPPos[i]                    
                    return
                }

                if(arrPPos[i].position.x-ot<point.x && arrPPos[i].position.x+ot>point.x){                   
                    point.x=arrPPos[i].position.x
                    bx=true
                }
                if(arrPPos[i].position.y-ot<point.y && arrPPos[i].position.y+ot>point.y){                
                    point.y=arrPPos[i].position.y
                    by=true
                }
            }

           /* for (var i = 0; i < arrPSt.length; i++) {                
                po=calc.isPointInLin(arrPSt[i].position,arrPSt[i].position1,point,ot,ot)
                if(po!=null){
                    point.x= po.x;
                    point.y= po.y;
                    point.obj=arrPSt[i]
                    return
                } 
            }*/


            if(bx){
                vect.z=zz;
                vect.x=point.x;
                vect.y=point.y;
                vect1.z=zz;
                vect1.x=point.x;
                vect1.y=point.y+10;
                wH3D.setLine(vect,vect1,null,null,20000)
            }

            if(by){
                vect.z=zz;
                vect.x=point.x;
                vect.y=point.y;
                vect1.z=zz;
                vect1.x=point.x+10;
                vect1.y=point.y;
                wH3D.setLine(vect,vect1,null,null,20000)                
            }

        }


        /////////////////////////////////////
        this.keydown=function(sob,event,boolCTRL){
            
            
        }
        
        this.keyup=function(sob,event,boolCTRL){
            
        }
    }
}



