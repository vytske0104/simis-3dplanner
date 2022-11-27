
import { DebKR} from '../view/spSten/colozi/korektRect/menu/DebKR.js';
import { DebLine} from '../view/spSten/colozi/korektRect/menu/DebLine.js';
import { DDebug1} from '../view/spSten/collision/dDebug/DDebug.js';

/*import { DDebug } from '../../component/dDebug/DDebug.js';*/
export class MDebag  {
  	constructor(par,fun) {  		
  		this.type="MDebag";
  		var self=this;
        this.par=par
        this.fun=fun
        this.param=this.par.param;

        this.otstup=this.param.otstup;
        this.otstup1=this.param.otstup;
        this.wh=this.param.wh;
        this.width=this.param.sizeBase;
      

        this.dCont=new DCont(par.dCont);
        //this.dCont.y=this.otstup*4+this.param.wh;
        
        this.array=[];


        this.dragPic=this.par.dragPic//new DragPic(par.dCont)
        window.dDebug
        this.init=function(){

            window.dDebug=this.dDebug=new DDebug(this.dCont,0,0,"3dplaner_v2",this.param);
            //this.dDebug.dragBool = false;

            setTimeout(function() {
                par.dCont.add(dDebug)
            }, 10);
            var dd=dDebug.getDDcont()


            

            this.button=new DButton(dd, 2,0,"DebLine",function(){
                this.parent.remove(this);
                self.initDebLine()
            })
            
            this.button.width=200;

            this.button1=new DButton(dd,2,32,"DebKR",function(){
                
                self.initDebKR()
            })
         
            this.button1.width=200;

            /*setTimeout(function() {
                self.initDebKR();                
            }, 1000);*/

            this.button2=new DButton(dd, 2,64,"DDebug Collisi 2d",function(){                
                self.initDDebug();
            })
          
            this.button2.width=200;
           /* setTimeout(function() {
                self.initDDebug();                
            }, 1000);*/

            var ss=new DSliderBig(dd,300,0,function(){
                facade.mast1=this.value;
                facade.fun_rotationZ();
                visi3D.intRend=1
            },"mastab",1,50)
            ss.width=222;

            var ss1=new DSliderBig(dd,300,50,function(){
                facade.maxMast=this.value;
                facade.fun_rotationZ();
                visi3D.intRend=1
            },"max",1,7)
            ss1.width=222;

            var ss2=new DSliderBig(dd,300,100,function(){
                let pp=facade.sp._mast
                facade._mastYmn=this.value;
                facade.sp.mast=pp+0.002;
                facade.sp.mast=pp;
                facade.fun_rotationZ();
                
                
                
                visi3D.intRend=1
            },"mastabPlus",0.5,5)
            ss2.width=222;


            setTimeout(function() {
                ss.value=facade.mast1;
                ss1.value=facade.maxMast;
                ss2.value=facade._mastYmn;
            }, 100);    
            

        }

        this.initDDebug=function(){
            this.button2.parent.remove(this.button2);

            var dd=new DCont(this.dCont)  
           
            //dd.scale=0.5
            self.dDebug1=new DDebug1(dd);

            self.dDebug1.setArr(self.par.par.view.facade.sp.arrSplice,["windows","collision"])
            self.dDebug1.collisi=self.par.par.view.facade.sp.arrSplice[2].windows.collision;/**/
            

            self.par.par.view.facade.sp.addObjFun(self.par.par.view.facade.sp.arrSplice[2])
            

        }



        this.initDebKR=function(){
            this.button1.parent.remove(this.button1);

            var dd=new DCont(this.dCont)  
       
            //dd.scale=0.5
            self.debKR=new DebKR(dd, function(s,p){

            }, visi3D);
            
            var kr= this.par.par.view.facade.korektRect
            self.debKR.setKR(kr);           
            self.debKR.active=true;

            //self.par.par.view.facade.sp.addObjFun(self.par.par.view.facade.sp.arrSplice[2])
           

        }


        this.initDebLine=function(){           
            self.debLine=new DebLine(this.dCont, function(s,p){

            }, visi3D);
            self.debLine.active=true;
        }


        
        this.init()
     
        this.sizeWindow = function(w,h,s){  
                     
            if(window.dDebug)window.dDebug.sizeWindow(w, h, s)
        }
  	}

     

}
