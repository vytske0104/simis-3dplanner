
import { SpStageSten } from './spSten/SpStageSten.js';
import { KorektRect } from './spSten/colozi/korektRect/KorektRect.js';
import { KorektLine } from './spSten/colozi/korektRect/KorektLine.js';

import { WordHelp3D} from './plus/WordHelp3D.js'; 
import { TCompArrow} from './spSten/sten/TCompArrow.js';

import { TComp3But} from './spSten/sten/TComp3But.js';
import { TComp3But2} from './spSten/sten/TComp3But2.js';

export class Facade  {
  	constructor(par, fun) {  		
        this.type="Facade";
        var self=this;
        this.par=par;
        this.fun=fun;
        this.param=this.par.param;
        this.content3d=new THREE.Object3D();
        this.par.content3d.add(this.content3d);

        window.facade=this;
        this.boolLoad = false;
        

        this.korektRect = new KorektRect();
        this.korektLine = new KorektLine();

        this._height=7300;
                
        this._height1=0;
        this._height2=0;
        this._height3=55;

        /*let aa=new THREE.AxesHelper(200);
        this.content3d.add(aa);*/

        //this.content3d..z=this._height+this._height1;
        this.aDefolt=[13,13,13];
       // this.content2d = new PIXI.Container();


        this.sobSP=function(s,p,p1){

        }


        this.sp= new SpStageSten(this, this.sobSP);

        this.wordHelp3D= new WordHelp3D(this.content3d, window.pm.matDop.getIDObj(25));
        window.wH3D=this.wordHelp3D;
       /* this.bazaMod = new BazaMod(this, this.pm);
        this.content3d.add(this.bazaMod.content3d)*/


      /*  this.bazaMod = new BazaMod(this, this.pm);
        this.content3d.add(this.bazaMod.content3d)*/



        this.polDin;

        this.clear=function(){
            this.sp.clear()
            visi3D.intRend=1;
        }


        this.roomPlus=function(x,y,w,h){

            
            var point=this.sp.craetPoint();
            var point1=this.sp.craetPoint();
            var point2=this.sp.craetPoint();
            var point3=this.sp.craetPoint();
           
            point.position.x=x-w/2;
            point.position.y=y-h/2;

            point1.position.x=x+w/2;
            point1.position.y=y-h/2;

            point2.position.x=x+w/2;
            point2.position.y=y+h/2;

            point3.position.x=x-w/2;
            point3.position.y=y+h/2;

            var sten=this.sp.craetSplice1();
            point.addSplice(sten, true);
            point1.addSplice(sten, false);

            var sten1=this.sp.craetSplice1();
            point1.addSplice(sten1, true);
            point2.addSplice(sten1, false);


            var sten2=this.sp.craetSplice1();
            point2.addSplice(sten2, true);
            point3.addSplice(sten2, false);

            var sten3=this.sp.craetSplice1();
            point3.addSplice(sten3, true);
            point.addSplice(sten3, false);

            this.polDin=this.sp.craetPol();
            this.polDin.addPoint(point);
            this.polDin.addPoint(point1);
            this.polDin.addPoint(point2);
            this.polDin.addPoint(point3);
            
            
            visi3D.intRend=1;
        }

      /* var axesHelper=new THREE.AxesHelper(333)
        this.content3d.add(axesHelper)*/

        this.mast1=10;
        this.maxMast=3;        
        this._mastYmn=1.5;
        this.mastDev=0;


        var p2;
        this.fun_rotationZ = function () {
            this.sp.tc3Big.fun_rotationZ();

            
            let p=visi3D.zume/(visi3D.position3d.maxZum-visi3D.position3d.minZum)-0.04
            let pp=this.mast1
            if(dcmParam.mobile==true)pp=this.mast1+this.mastDev;

            if(p<0)p=0;
            let p1=1+p*pp;
            if(p1>this.maxMast)p1=this.maxMast;

            this.sp.mast=p1;
            //trace(">>",visi3D.zume,p,p1) 

            //this.content3d
            //p2=visi3D.utility.get2Point(axesHelper)
           

            //trace(p2)
        }


        this.upDate=function(){            
            this.sp.doRender();                
        }


        this.setObj=function(o){                
            if(o.sp) {
                this.boolLoad = true;
                this.clear();
                this.sp.setObj(o.sp);
                this.boolLoad = false;
            }
            
            for (var i = 0; i < this.sp.arrPol.length; i++) {
                if(this.sp.arrPol[i].life==true){
                    this.polDin=this.sp.arrPol[i]
                    break;
                }
            }  
            visi3D.intRend=1;
        }

        this.getObj=function(){
            var o={}            
            o.sp=this.sp.getObj();            
            o.visi3D= visi3D.getObj()       
            return o;
        }
                   

  	}
}
