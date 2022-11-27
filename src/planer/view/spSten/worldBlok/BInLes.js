
import { Blok } from './Blok.js';
import { RectCollis } from './../collision/CollisionRect.js';

export class BInLes extends Blok {  
  	constructor(par,obj,fun) { 
        super(par,obj,fun); 		
  		this.type="BInLes";
  		var self=this;
        this.par=par;

        this.cont3dMod = new THREE.Object3D();
        this.content3d.add(this.cont3dMod)
        this.cont3d.rotation.x=-Math.PI/2
              
        this.amDelph=false;
        this.praoo=1000
        this.prase=1000
        
        this.c3d=undefined
        this.funInit=function(){
            pm.getId(this.obj.id,function(c3){
                self.c3d=c3;
                self.c3d.position.y=self.rect[2]

                self.cont3d.add(c3);                
                self.dragWHD();
                
                self.dragModel()
                self.setOnMat(c3)
                visi3D.intRend=1;
                //this.cont3d
            })                  
        }




        this.init = function(){ 
            this.boolSten=false;    
            
            this.rect=[
                this.obj.mod.r[0],
                0,
                -this.obj.mod.r[4]/2,
                this.obj.mod.r[3],
                this.obj.mod.r[5],
                this.obj.mod.r[4]
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
        this._bool=false;
        this._sah=0;
        this._bLaft=true;

        var zz
        this.funDO2 = function(){
            zz=self.content3d.position.z-self.rect[2]            
            if(Math.round(zz)>=1){
                self.bool=false;
            }else{
                self.bool=true;
            } 


        }


        this.postParent=function(){ 
            
             if(self.amDelph==true){
                    //setTimeout(function() {

                      self.delph=100  
                    //}, 1000);
                    
                }
        }
        
        var co,co1
        var ca  
        this.dragModel=function(){


        
            this.prase=1000;
            if(this._bool==true)this.prase=this.prase*0.654;
            if(self._sah==0)this.prase=this.prase*1.254;
            if(self._sah==2)this.prase=this.prase*1.378;

            if(self.c3d==undefined) return;
            co=this.getName(self.c3d,"blok0_")
            co1=this.getName(self.c3d,"blok1_")




            
            if(this._bool==true){
                co.visible=false;
                co1.visible=true;
            }else{
                co.visible=true;
                co1.visible=false;
            }
            if(ca==undefined){
                ca=[];
                ca[0]=self.getName(co,"verh",true)
                ca[1]=self.getName(co1,"verh00")

                ca[2]=self.getName(co,"verh0_")
                ca[3]=self.getName(co1,"verh0_")

                ca[4]=self.getName(co,"verh1_")
                ca[5]=self.getName(co1,"verh1_")
            }
            
            for (var i = 0; i < 3; i++) {
                if(i==self._sah){
                    ca[i*2].visible= true
                    ca[i*2+1].visible= true   
                }else{
                    ca[i*2].visible= false
                    ca[i*2+1].visible= false 
                }
            }
            visi3D.intRend=1;
        }


        this.setOnMat=function(c3){
            if(c3.material){
                let col=1;

                if(c3.material.name && c3.material.name=="matXZ1_")col=1;
                if(c3.material.name && c3.material.name=="matXZ2_")col=2;
                if(c3.material.name && c3.material.name=="matXZ3_")col=3;
                c3.material=window.pm.matDop.getIDObj(19+col);
            }
            if(c3.children){
                for (var i = 0; i < c3.children.length; i++) {
                    this.setOnMat(c3.children[i])
                }
            }
        }

        this.getName=function(c3,name,bool){
            if(c3.name){
                if(bool){
                    if(c3.name==name){
                        return c3
                    }
                }else{
                    if(c3.name.indexOf(name)!==-1){
                        return c3
                    }  
                }
                
            }
            if(c3.children){
                for (var i = 0; i < c3.children.length; i++) {
                    let cc=this.getName(c3.children[i], name)
                    if(cc!=null) return c3.children[i]
                }
            }

            return null
        }



        this.dragWHD=function(w,h,d){
            //console.warn(":::",w,h,d)  
            if(w!==undefined){
                this._width=w;
                this._height=h;
                this._delph=d;                
            }
            this.content3d.position.y=-90;
            

            this.box.scale.set(this.rect[3],this.rect[5],this.rect[4]);            

            if(this.boxHelper){                
                this.dragObjHA(this.boxHelper,this.rect);
                this.boxHelper.position.y=0;
            }
        }

        this.postParent=function(){ 
            
            if(self.amDelph==true){
                self.delph=100
            }
        }



        this.funSetObj=function(o){

                  /* if(o.rotBool)  this.rotBool=o.rotBool;  
            if(this.funSetObj)this.funSetObj(o) 
            
            this.setPosition(o.x,o.y,o.z);       
            this.dragWHD(); */ 
            if(o.plus){
                this.bool=o.plus.bool;
                this.bLaft=o.plus.bLaft;
                this.sah=o.plus.sah;
            }        
            
        }

        this.funGetObj=function(o){

            o.plus={}
            o.plus.bool=this._bool;
            o.plus.bLaft=this._bLaft;
            o.plus.sah=this._sah;
        }
           
     
         



    }

    set bool(value) {
        if(this._bool!=value){
            this._bool= value;                      
            this.dragModel();
        }
    }    
    get bool() { return  this._bool;} 

    set sah(value) {
        if(this._sah!=value){
            this._sah= value;                      
            this.dragModel();
        }
    }    
    get sah() { return  this._sah;} 

    set bLaft(value) {
        if(this._bLaft!=value){
            this._bLaft= value;                      
            this.dragModel();
        }
    }    
    get bLaft() { return  this._bLaft;} 



    set delph(value) {
        if(this._delph!=value){
            this._delph= value;
            //this.rect[4]= value;
            this.dragWHD(); 
            
                    
        }
    }    
    get delph() { return  this._delph;}   
}


/*
export function BTAct (par) {
    var self = this;
    this.type = 'BTAct';
    this.par = par;
    this._sahAct=0;

    this._sahPlus=0;

  
    this.graphics = new PIXI.Graphics();
    this.par.content2d.addChild(this.graphics);
    this.graphics.alpha=this._sahAct/100;

    this.clear=function(){
        this.graphics.clear();
    }

    this.draw1=function(x,y,w,h){
        this.graphics.clear();
        this.graphics.beginFill(par.par.par.colorUI);
        if(w==undefined){
            this.graphics.drawRect(-this.par._width/2,-this.par._delph/2,this.par._width,this.par._delph);
        }else{
            this.graphics.drawRect(x,y,w,h);
        }
        this.graphics.endFill()
    }


    this.drawRect1=function(x,y,w,h){
        this.graphics.beginFill(par.par.par.colorUI);
        if(w!=undefined){
            this.graphics.drawRect(x,y,w,h);
        }
        this.graphics.endFill()
    }
    this.drawTriangle=function(x, y, x1, y1, x2, y2){
        this.graphics.lineStyle(0, 0x222222, 1);
        this.graphics.beginFill(par.par.par.colorUI);
        if(x!=undefined){
            this.graphics.moveTo(x, y)
            this.graphics.lineTo(x1, y1)
            this.graphics.lineTo(x2, y2)
            this.graphics.lineTo(x, y)
        }
        this.graphics.endFill()
    }

    this.corektSetGet=function(){
        this.graphics.alpha = (this._sahAct+this._sahPlus)/100; 
        this.par.par.render()

    }
}
BTAct.prototype = {

    set sahAct (v) {
        if (this._sahAct === v) return;         
        this._sahAct = v;
        this.corektSetGet()
    },
    get sahAct () {

        return this._sahAct;
    },

    set sahPlus (v) {
        if (this._sahPlus === v) return;        
        this._sahPlus = v;
        this.corektSetGet()
    },
    get sahPlus () {

        return this._sahPlus;
    },
}*/