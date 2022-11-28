
import { Blok } from './Blok.js';
/*
import { Unik_Vent } from './unik/Unik_Vent.js';
import { Unik_Durka} from './unik/Unik_Durka.js';


import { Unik_Steps } from './unik/Unik_Steps.js';
import { Unik_Durka_Window } from './unik/Unik_Durka_Window.js';
import { Unik_Durka_Door } from './unik/Unik_Durka_Door.js';
//import { Unik_Dumohod } from './unik/Unik_Dumohod.js';
import { Unik_Durka_Peremuska } from './unik/Unik_Durka_Peremuska.js';


import { Unik_Ykrashlka} from './unik/Unik_Ykrashlka.js';
import { Unik_Ykrashlka_Povedenie} from './unik/Unik_Ykrashlka_Povedenie.js';*/

export class BInSten extends Blok {  
  	constructor(par,obj,fun) { 
        super(par,obj,fun); 		
  		this.type="BInSten";
  		var self=this;
        this.par=par;

  

              
        this.amDelph=false;

  
        
        this.c3d=undefined
        this.funInit=function(){ 
           
            if(this.obj.bool[0]==1){
                this.amDelph=true
                this.width=220;
            }


            pm.getId(this.obj.id,function(c3){
                self.c3d=c3;
                self.content3d.add(c3)
                if(self.c3d)self.c3d.notEvent=!self.bEvewnt;
                self.dragWHD()
                visi3D.intRend=1
            })                  
        }

        this.bEvewnt=true
        this.dONotEvent=function(b){
            trace(this.bEvewnt, b)
           /* if(this.bEvewnt==b){
                return
            }*/
            this.bEvewnt=b;            
            if(self.c3d)self.c3d.notEvent=this.bEvewnt;
            this.boxHelper.notEvent=this.bEvewnt;            
        }  



        this.dragWHD=function(w,h,d){  
            if(w!==undefined){
                this._width=w;
                this._height=h;
                this._delph=d;
            }      
            //this.box.scale.set(this.rect[3],this.rect[4],this.rect[5]);
            this.box.scale.set(this.rect[3],20,this.rect[5]);

            if(self.c3d){
                let sx =this.rect[3]/this.obj.mod.r[3];
                let sy =this.rect[4]/this.obj.mod.r[4];
                let sz = this.rect[5]/this.obj.mod.r[5];                
                self.c3d.scale.set(sx,sy,sz);


                if(this.amDelph!==false){
                    var d=this.obj.mod.r[5]*sy
                    self.c3d.position.y=-d+10
                    //this.box.position.y=-d+10



                }
                
            }
            this.dragObjHA(this.boxHelper,this.rect);
        }

        this.dragObjHA=function(bH, a){ 

            if(this.amDelph!==false){

                if(a[3]>0 && a[4]>0 && a[5]>0){            
                    bH.width=a[3];
                    bH.position.x=a[0]+a[3]/2;
                    
                    bH.depth=a[4];
                    bH.position.y=-(a[1]+a[4]/2);
                
                    bH.height=a[5];
                    bH.position.z=-a[2]-a[5]/2;                 
                } 

                return
            }


            if(a[3]>0 && a[4]>0 && a[5]>0){            
                bH.width=a[3];
                bH.position.x=a[0]+a[3]/2;
                
                bH.depth=a[4];
                bH.position.y=a[1]+a[4]/2;
            
                bH.height=a[5];
                bH.position.z=-a[2]-a[5]/2;                 
            }        
        }



        this.postParent=function(){            
            if(self.amDelph==true){
                self.delph=100                     
            }
        }
        

        this.drawActive=function(){
                   
            
        }

        this.drawGateau=function(g){
            
        }


        //перехват
        var hhh
        this.redrahHHH=function(h,h1){
           

        }
     



        this.funSetObj=function(o){
           

        }


        this.funGetObj=function(o){
            

        }

        this.setColorObjects=function(_id, _id1, _o, _o1){
       
           
        }


        this.dragp20Color=function(type, obj, bUnikKill){ 
           
        }

        this.postClear=function(){ 
            
        }

    }


    set delph(value) {
        if(this._delph!=value){
            this._delph= value;
            this.rect[4]= value;
            
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