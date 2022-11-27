
import { Body } from '../colozi/Body.js';
import { Shape } from '../colozi/Shape.js';


import { RectCollis } from './../collision/CollisionRect.js';
import { BoxHelper } from './BoxHelper.js';

import { TLabel } from '../../../../t3d/TStyle.js';

export class Blok  {
    constructor(par,obj,fun) {          
        this.type="Blok";
        var self=this;
        this.par=par;
        this.objBase=obj;
        this.obj=obj.obj;
        this.fun=fun;
        this.worldBlok=null//задаеться в создателе
        this.id=obj.id;        
        this.icon=mhbd.getLink(obj.icon);

        this.gateau=null
        this.heightSten=this.par.par.height
        
        this.typeStr="BInSten"
        this.typeStr1=this.obj.str[1]

        this.idArr=-1;
        this._active=false;
        this.sizeLine = this.par.par.sizeLine;
       




        this._width=100;
        this._height=100;
        this._delph=100;
        
        this.boolSten=true;




        this.boxHelper=undefined
        this._life=true;
        this._parent=undefined;

        this.unik=undefined;
        this.uuid=calc.generateRendom(2);

        this._visiBox=this.par._visiBox;

       
        this.content3d = new THREE.Object3D();
        this.cont3d = new THREE.Object3D();
        this.content3d.add(this.cont3d)

        this.cont3dL = new THREE.Object3D();

        this.content3d.objBlok=this;


        if(window.localS.object.debug==true){
            setTimeout(function() {
                var t=new TLabel(self.content3d,-15,0,""+self.idArr)
                t.cont3d.rotation.x=-Math.PI/2 
            }, 0);
            
        }
        
        this.box = new THREE.Mesh(this.par.boxGeometry, window.pm.matDop.getIDObj(14))//, this.mO.matRed);
        this.cont3d.add(this.box);
        this.box.layers.set(31);


        /*let aa=new THREE.AxesHelper(20);
        this.content3d.add(aa);*/

        this.boxHelper=new BoxHelper(2, window.pm.matDop.getIDObj(6))
        if(this._visiBox==true)this.content3d.add(this.boxHelper);


        this.funInit=undefined
       //this.body=undefined;
        this.shape=undefined;

        

     
        
   

        this.init = function(){            

            this.rect=[
                this.obj.mod.r[0],
                this.obj.mod.r[1],
                this.obj.mod.r[2],
                this.obj.mod.r[3],
                this.obj.mod.r[4],
                this.obj.mod.r[5]
            ];
           
            // огроничители для блока на стенам
            this.coliziStop = {
                x: -9999,
                y: 0,
                z: 0,
                width: 9999,
                height: 9999,
                depth: 122
            };
            this.collisionOffset=0
            this.inOgr=true

            
            // Создаюм колизии, для стен
            this.boxColizi = new RectCollis(
                this.rect[0],
                this.rect[2],
                this.rect[3],
                this.rect[5]
            );
            this.boxColizi.parent = this;
            this.boxColizi.coliziStop=this.coliziStop
            this.boxColizi.rectCollisMeshdy.coliziStop=this.coliziStop

            this.boxColizi.boolSten=this.boolSten

            this.boxCurvColizi = new RectCollis();
            this.boxCurvColizi.parent = this;

            this.rectSten = {
                ir:Math.random(),
                parent:this,            
                x: this.rect[0],
                y: this.rect[2],
                width:this.rect[3],
                height: this.rect[5]
            };


            this._width=this.rect[3];
            this._height=this.rect[5];
            this._delph=this.rect[4];
            this.offset=0 
            
            
            

            this.dragWHD();
            if(this.funInit!=undefined)this.funInit();
        }

        //notEvent

        this.resetSize = function(){ 

        }

        this.clear= function(){ 
            if(this._parent!=undefined)this._parent.removeBlok(this);
            this.life=false;
            if(this.postClear)this.postClear()
        }
        
        this.fuNsetPosition=undefined

        this.vector;
        this.setPosition=function(x,y,z){ 
            
           

            //if(self._parent.type=="Windows"){ 
                
                

                if(x!=undefined)self.boxColizi.position.x = x;
                if(y!=undefined)self.boxColizi.position.y = self.heightSten-y;
                if(self._parent!=undefined) {
                    
                    self._parent.onUpdateBlokPosition(self);
                   // self._parent.notColosiOne=true;
                }


                //self.content3d.position.x = self.boxColizi.__x-self.rect[0];
                //self.content3d.position.y = 0;
                //self.content3d.position.z = -self.heightSten+(self.boxColizi.rectCollisMeshdy.y-self.rect[2]);

                if(x!=undefined)this._x=x;
                if(y!=undefined)this._y=y;
                if(z!=undefined)this._z=z;
                             
                this.render(); 
               
            //}

            if(this._active)this.worldBlok.wbVisiActiv.drag(this);


            if(this.fuNsetPosition!=undefined)this.fuNsetPosition()
        }

        this.tipDrab=0;
        this._x=0;
        this._y=0;
        this._z=0;
        this.setReal=function(x,y,z){
            this._x=x;
            this._y=y;
            this._z=z;

            
            
            //self.content2d.x=x;
            //self.content2d.y=y;

            /*self.content3d.position.x=x;            
            self.content3d.position.y=y;*/

            //this.body.position.set(x,y);
            if(this._parent)if(this._parent.drawDeb)this._parent.drawDeb();            
        }

        this.drag = function(){            
            //self.content2d.x=self.body.position.x;
            //self.content2d.y=0;

            //self.content3d.position.x=self.body.position.x;            
            //self.content3d.position.z=-self.body.position.y;
        }
        self.funDO2=undefined
        this.dragObj2 = function () {
            if(self._parent){
                self.content3d.position.x = self.boxColizi.rectCollisMeshdy.x-self.rect[0];
                //self.content3d.position.y = 0;
                self.content3d.position.z = -self.heightSten+(self.boxColizi.rectCollisMeshdy.y-self.rect[2]);
            }
            if(self.funDO2)self.funDO2()

          
            this.render() 
        }


        this.redrahHHH=function(h,h1){  
            
        }

        this.copy=function(){  
            var blok=this.par.par.worldBlok.getBlok(this.obj.id);
            blok.init();
            var oi= this.getObj();           
            oi.x+=oi.width;            
            blok.setObj(oi);

            
            return blok
           
        }

        
        this.render=function(){            
            if(self._parent){
                self._parent.renderDo()                
                visi3D.intRend=1;
            }
        }
        
        this.dragWHD=function(w,h,d){
            //console.warn(":::",w,h,d)  
            if(w!==undefined){
                this._width=w;
                this._height=h;
                this._delph=d;                
            }

            this.box.scale.set(this.rect[3],this.rect[5],this.rect[4]);
            if(this.boxHelper){
                this.dragObjHA(this.boxHelper,this.rect);
            }
        }

        this.dragObjHA=function(bH, a){                
            if(a[3]>0 && a[4]>0 && a[5]>0){            
                bH.width=a[3];
                bH.position.x=a[0]+a[3]/2;                
                bH.depth=a[4];
                bH.position.y=a[1]+a[4]/2;            
                bH.height=a[5];
                bH.position.z=-a[2]-a[5]/2;                 
            }        
        }

        this.funSetObj=undefined
        this.funGetObj=undefined


        var oInfo={}
        oInfo.type=this.type;
        oInfo.obj=this.obj;
        oInfo.par=this;
        this.getInfo=function(a){ 
            a.push(oInfo)
        } 

        this.getInfoObj=function(a){ 
           let o={}
           o.width=this._width;
           o.height=this._height;
           o.delph=this._delph;


           o.x=self.boxColizi.rectCollisMeshdy.x
           o.y=self.heightSten-self.boxColizi.rectCollisMeshdy.y
           return o
        } 


        this.drawGateau=function(g){

        }

        this.funDrahParent=undefined
        this.drahParent=function(){
         
            if(self.funDrahParent!==undefined){
                self.funDrahParent();
            }
        }


        this.funMouseUp=undefined
        this.funMouseDown=undefined

        this.setObj=function(o){
            
            if(o.uuid)this.uuid=o.uuid

            this.width=o.w||o.width;
            this.height=o.h||o.height;
            this.delph=o.d||o.delph; 


            if(o.rotBool)  this.rotBool=o.rotBool;  
            this.setPosition(o.x,o.y,o.z); 
            if(this.funSetObj)this.funSetObj(o) 
            
                  
            this.dragWHD();          
            
        }
        this.getObj=function(){
            var o={}
           // o.uuid=this.uuid;
            o.id=this.id;
            o.x= this._x;
            o.y= this._y;
            o.z= this._z;
            o.width= this._width;
            o.height= this._height;
            o.delph= this._delph;
            o.rotBool= this._rotBool;

         
           
            if(this.funGetObj)this.funGetObj(o);
         
            return  o
        }



   




          

        //this.boolMax=this.par.boolMax;
        this.drawActive=undefined

        this.funBoolMax=undefined

    }

    set boolMax(value) {
        if(this._boolMax!=value){
            this._boolMax= value; 

          /*
            if(value==true){
                 if(this.cont3dL.parent!==undefined)this.content3d.remove(this.cont3dL);
                 this.content3d.add(this.cont3d);

            }else{
                if(this.cont3d.parent!==undefined)this.content3d.remove(this.cont3d);
                this.content3d.add(this.cont3dL);
            }*/
            if(this.funBoolMax!=undefined)this.funBoolMax()
        }
    }    
    get boolMax() { return  this._boolMax;}


    set active(value) {
        
        if(this._active!=value){
            this._active= value;      
            
            if(value==true){
                this.boxHelper.material = window.pm.matDop.getIDObj(7)
            }else{
                this.boxHelper.material= window.pm.matDop.getIDObj(6)
            }
           
            this.par.render();


            if(this.drawActive!=undefined)this.drawActive();                   
        }
    }    
    get active() { return  this._active;}   


    set width(value) {
        if(this._width!=value){
            this._width= value;
            this.rect[3]= value;
            this.boxColizi.width = value;
            this.rect[0]=-value/2;
            this.boxColizi.x =-value/2;
           
            
                             
            this.dragWHD(); 
            this.boxColizi.position.x = this._x;                      
        }
    }    
    get width() { return  this._width;}   

    set height(value) {
        if(this._height!=value){
            this._height= value;
            this.rect[5]= value;

            this.boxColizi.height = value;
            this.rect[2]=-value/2;
            this.boxColizi.y =-value/2;
            this.boxColizi.sy =-value/2;
            this.dragWHD();
            this.boxColizi.position.x = this._x;
        }
    }    
    get height() { return  this._height;}   

    set delph(value) {
        if(this._delph!=value){
            this._delph= value;
            this.rect[4]= value;
            this.dragWHD();         
        }
    }    
    get delph() { return  this._delph;} 


    set visiBox(value) {      
        if(this._visiBox!=value){
            this._visiBox= value;
            
            if(this._visiBox==true)this.content3d.add(this.boxHelper);
            else this.content3d.remove(this.boxHelper);
        }
    }    
    get visiBox() { return  this._visiBox;}



    set life(value) {
        if(this._life!=value){         
            this._life= value;   
            if(this._parent!=undefined){
                if(this._parent.removeBlok!=undefined){
                    this._parent.removeBlok(this)
                }
            }
                      
        }
    }    
    get life() { return  this._life;}







    set parent(value) {
        if(this._parent!=value){
            this.parentOld=this._parent
            this.render()
            this._parent= value;
            if(this._active)this.worldBlok.wbVisiActiv.drag(this);
            if(value==undefined){
                this._life=false;
                this.boolMax = undefined; 
            }else{
                this._life=true;
                if(this._parent.sizeLine)this.sizeLine=this._parent.sizeLine

                this.boolMax = this._parent.boolMax; 

            }
            this.par.render();

           
            if(this.postParent!=undefined)this.postParent()
        }
    }    
    get parent() { return  this._parent;}

}