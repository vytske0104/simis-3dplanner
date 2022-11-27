
import { Blok } from './Blok.js';
import { BInSten } from './BInSten.js';
import { BInLes } from './BInLes.js';

//import {MBFond} from './MBFond.js';
import { TCompArrow } from '../sten/TCompArrow.js';

import { BoxHelper } from './BoxHelper.js';

export class WorldBlok  {
    constructor(par,fun) {          
        this.type="WorldBlok";
        var self=this;
        this.par=par;
        this.fun=fun;
        this._mast = this.par._mast;
        this._activeObject = null;
        this._visiBox=false;

        this.uuid=calc.generateRendom(2);

        this.boxGeometry = new THREE.BoxGeometry( 1,1,1);

        this.array = [];
        this.content3d = new THREE.Object3D();
        this.par.content3d.add(this.content3d);

        this.wbVisiActiv=new WBVisiActiv(this)


        this.sobBlok=function(s,p,p1){

        }


        this.getBlok=function(id){  
            let o= mhbd.getKeyId("objects3d",id)            
            if(o.obj==undefined && o.json!==undefined )o.obj=o.json;           
            for (var i = 0; i < this.array.length; i++) {
                if(this.array[i].life==true)continue;
                if(this.array[i].id==id){
                    return this.array[i];
                }
            }     

            let blok=undefined;
                    
           
            if(o.json.str[0]=="BInSten") blok = new BInSten(this,o,this.sobBlok);//в стенах
            if(o.json.str[0]=="BInLes") blok = new BInLes(this,o,this.sobBlok);//в стенах    
            
            if(blok==undefined) blok = new Blok(this,o,this.sobBlok);

            blok.worldBlok=this;
            blok.idArr=this.array.length;
            this.array.push(blok);

            return blok;
        }


        this.render=function(){  
            this.par.render();
        }
    }
    set activeObject(value) {      
        if(this._activeObject!==value){
            this._activeObject = value;           
            for (var i = 0; i < this.array.length; i++) {
                if(this._activeObject && this._activeObject.uuid==this.array[i].uuid){                   
                    this._activeObject.active = true;                    
                }else{
                    this.array[i].active= false;
                }                
            }
            this.wbVisiActiv.activeObject = value; 
        }
    }    
    get activeObject() { return  this._activeObject;}


    set activeMouse(value) {      
        if(this._activeMouse!=value){
            this._activeMouse= value;
            for (var i = 0; i < this.array.length; i++) {
                this.array[i].activeMouse= value;
            }
        }
    }    
    get activeMouse() { return  this._activeMouse;}
    
    set visiBox(value) {      
        if(this._visiBox!=value){
            this._visiBox= value;

            for (var i = 0; i < this.array.length; i++) {
                this.array[i].visiBox= value;

            }
        }
    }    
    get visiBox() { return  this._visiBox;}

    set mast(value) {      
        if(this._mast!=value){
            this._mast= value;
            this.wbVisiActiv.mast= value;
            for (var i = 0; i < this.array.length; i++) {
                this.array[i].mast= value;
            }
        }
    }    
    get mast() { return  this._mast;}

  
}



export class WBVisiActiv  {
    constructor(par,fun) {          
        this.type="WBVisiActiv";
        var self=this;
        this.par=par;
        this._mast= par._mast;
        this.fun=fun;
        this._activeObject = null;


        this.content3d = new THREE.Object3D();
        this.content3d.position.z=10
      /*  let aa=new THREE.AxesHelper(2000);
        this.content3d.add(aa);*/

        this.array=[];
        var mm=window.pm.matDop.getIDObj(7)//24

        for (var i = 0; i < 4; i++) {
            let o=new TCompArrow(this.content3d,function(s,p){} ,null, mm, mm,mm,mm,mm,);
            o.idArr=i;
            this.array.push(o); 
            o.bRotation=true; 
            o.otstup=2
            // /* o.activeButton=true;*/
            // o.sten=this.par;
            // //o.zdvih=-50;   
            // //o.bDurka=false;
            // //o.bVerh=false
            // o.bRotation=true;
            // //o.radius=5;
            
            o.mast=this._mast*facade._mastYmn
        }
        this.array[2].bRotation=false
        this.array[2].bRotZ=1
        
        this.array[3].bRotation=false
        this.array[3].bRotZ=3




        this.drag=function(blok){
            this.move(blok);
            
        }


        var x,x1,dist
        var pont={x:0,y:0};
        var pont1={x:0,y:0};
        var aRez=[]
        this.korekt=function(){
            if(this.blok.parent==undefined){
                this.content3d.visible=false
                return;
            }
            this.content3d.visible=true

            //left 
            this.array[0].content3d.rotation.x=-Math.PI/2;
            this.array[0].content3d.rotation.z=Math.PI;
            pont.x=this.blok.boxColizi.rectCollisMeshdy.x//+this.razmeru.xx;
            pont.y = pont1.y = this.blok._y;
            pont1.x=-99999;
            aRez=this.blok.parent.collision.colozi.collLine.getRey(pont,pont1,this.blok.heightSten,[this.blok.boxColizi.rectCollisMeshdy])
            if(aRez.length!==0){
                dist=pont.x-aRez[0].x
                if(Math.abs(aRez[0].x)<0.01)dist+=this.razmeru.xx
                this.array[0].content3d.position.x=pont.x+this.razmeru.xx;
                this.array[0].content3d.position.z=-pont.y;
                this.array[0].distans=dist;
                if(dist>20){
                    this.array[0].content3d.visible=true;
                }else{
                    this.array[0].content3d.visible=false; 
                }                
            }else{
                this.array[0].content3d.visible=false;
            }

            //rigth
            this.array[1].content3d.rotation.x=-Math.PI/2;
            this.array[1].content3d.rotation.z=Math.PI;
            pont.x=this.blok.boxColizi.rectCollisMeshdy.x+this.blok.boxColizi.rectCollisMeshdy.width//+this.razmeru.xx;
            pont.y = pont1.y = this.blok._y;
            pont1.x=+99999;
            aRez=this.blok.parent.collision.colozi.collLine.getRey(pont,pont1,this.blok.heightSten,[this.blok.boxColizi.rectCollisMeshdy])
            if(aRez.length!==0){
                dist=aRez[0].x-pont.x;                
                if(Math.abs(aRez[0].x-this.blok.parent.par._distans)<0.01){
                    dist+=this.razmeru.xx1
                    this.array[1].content3d.position.x=aRez[0].x+this.razmeru.xx+this.razmeru.xx1;
                }else{
                    this.array[1].content3d.position.x=aRez[0].x+this.razmeru.xx;
                }

                this.array[1].content3d.position.z=-pont.y;
                this.array[1].distans=dist;
                if(dist>20){
                    this.array[1].content3d.visible=true;
                }else{
                    this.array[1].content3d.visible=false; 
                }                
            }else{
                this.array[1].content3d.visible=false;
            }

            //up
            this.array[2].content3d.rotation.x=-Math.PI/2;
            this.array[2].content3d.rotation.z=Math.PI/2;
            pont1.x=pont.x=this.blok.boxColizi.rectCollisMeshdy.x+this.blok.boxColizi.rectCollisMeshdy.width/2//+this.razmeru.xx;
            pont.y = this.blok.heightSten-this.blok.boxColizi.rectCollisMeshdy.y
            pont1.y = pont.y+99999;
            


            aRez=this.blok.parent.collision.colozi.collLine.getRey(pont,pont1,this.blok.heightSten,[this.blok.boxColizi.rectCollisMeshdy])
            
            if(aRez.length!==0){
                dist=aRez[0].y-pont.y;                
                this.array[2].content3d.position.x=pont.x+this.razmeru.xx;
                this.array[2].content3d.position.z=-pont.y;
                this.array[2].distans=dist;
                if(dist>20){
                    this.array[2].content3d.visible=true;
                }else{
                    this.array[2].content3d.visible=false; 
                }                
            }else{
                this.array[2].content3d.visible=false;
            } 

            //down
            this.array[3].content3d.rotation.x=-Math.PI/2;
            this.array[3].content3d.rotation.z=-Math.PI/2;
            pont1.x=pont.x=this.blok.boxColizi.rectCollisMeshdy.x+this.blok.boxColizi.rectCollisMeshdy.width/2//+this.razmeru.xx;
            pont.y = this.blok.heightSten-this.blok.boxColizi.rectCollisMeshdy.y-this.blok.boxColizi.rectCollisMeshdy.height
            pont1.y = pont.y-99999;
            


            aRez=this.blok.parent.collision.colozi.collLine.getRey(pont,pont1,this.blok.heightSten,[this.blok.boxColizi.rectCollisMeshdy])
            
            if(aRez.length!==0){
                dist=pont.y-aRez[0].y;                
                this.array[3].content3d.position.x=pont.x+this.razmeru.xx;
                this.array[3].content3d.position.z=-pont.y;
                this.array[3].distans=dist;
                if(dist>20){
                    this.array[3].content3d.visible=true;
                }else{
                    this.array[3].content3d.visible=false; 
                }                
            }else{
                this.array[3].content3d.visible=false;
            }
        }


        this.razmeru
        this.move = function(blok){
            this.blok=blok

            if(this.blok){}else{
                if(this.content3d.parent!=undefined){                    
                    this.content3d.parent.remove(this.content3d);
                }
                return
            }

            if(blok.parent==undefined){
                if(this.content3d.parent!=undefined){                    
                    this.content3d.parent.remove(this.content3d);
                }
            }else{
                if(this.content3d.parent==undefined){
                    this.razmeru=blok.parent.par.razmeru
                    this.razmeru.content3d.add(this.content3d)
                }

                if(this.content3d.parent.uuid!=blok.parent.par.razmeru.content3d.uuid){
                    this.razmeru=blok.parent.par.razmeru;
                    this.razmeru.content3d.add(this.content3d);

                    //blok.parent.par.content3d.add(this.content3d)
                    
                }

                this.korekt();
            } 
        }


    }


    set mast(value) {      
        if(this._mast!==value){
            this._mast = value;           
            for (var i = 0; i < this.array.length; i++) {
                this.array[i].mast = value; 
            }
        }
    }    
    get mast() { return  this._mast;}

    set activeObject(value) {      
        if(this._activeObject!==value){
            this._activeObject = value;           
            this.drag(this._activeObject) 
        }
    }    
    get activeObject() { return  this._activeObject;}
}