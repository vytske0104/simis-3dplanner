



import { MVisi3D } from '../visi3D/MVisi3D.js';
import { PM } from '../pm/PM.js';

/*
import { Scane3d } from './veiw/Scane3d.js';

import { Mozg } from './mozg/Mozg.js';*/


import { SceneSB } from '../visi3D/SceneSB.js'

//import { RedactCode } from './mozg/redactCode/RedactCode.js'

import { Menu } from './menu/Menu.js';
import { View } from './view/View.js';
import { Mozg } from './mozg/Mozg.js';

import { FManager } from './fManager/FManager.js';

export class Glaf  {
  	constructor(par) {  		
  		this.type="Glaf";
  		var self=this;        
        this.scale=1;		
        this.content3d=new THREE.Object3D();
        this.par=par;
        this.param=this.par.param 

        this._indexStep =-1;

     
        this.contHTML= document.createElement('div');
        this.contHTML.style.position = 'fixed';
        this.contHTML.style.top = '0px';         //drflgkjdflg  dasdasdf dasgfadsgf ads z dasgfda            fgh
        this.contHTML.style.left = '0px';
        par.contentHTML.appendChild(this.contHTML); 

        var o=mhbd.getKeyId("scenes3d",2)
        var oSp=o.json
        
       
        var alpha =oSp.scene.visi3D.alphaAd 
        //порезаный от пикси вювер        
		this.visi3D = new MVisi3D(this.contHTML, null, dcmParam.mobile, true, true, true, alpha);		
	 	this.visi3D.yes3d = true;       	
		this.visi3D.groupObject.add(this.content3d);
        window.visi3D=this.visi3D;
        //this.visi3D.utility.pointZdvig.active=true
        

        this.sceneSB=new SceneSB(this.visi3D);
        

        window.pm=new PM(visi3D,null,this.param);
        

        for (var i = 0; i <  this.sceneSB.array.length; i++) {
            if (oSp.scene[this.sceneSB.array[i].name] === undefined) {
                oSp.scene[this.sceneSB.array[i].name] = {};                
            }            
            this.sceneSB.array[i].setBasa(oSp.scene[this.sceneSB.array[i].name]);
        } 

 
        this.dCont = new DCont(par.contentHTML);

        this.menu  = new Menu(this, function(s, p, p1){            
            if(s=="indexStep"){
                window.localS.object.info.indexStep=p;
                window.localS.save();
                self.indexStep=p;
            }            
        });

        this.view  = new View(this, function(s, p, p1){
           /* if(s=="galUuid")self.menu.mLeftGal.galUuid(p, p1) 
            if(s=="testIndex")self.menu.mLeftGal.testIndex();*/ 
        });        

        this.fManager  = new FManager(this, function(s, p, p1){
           /* if(s=="galUuid")self.menu.mLeftGal.galUuid(p, p1) 
            if(s=="testIndex")self.menu.mLeftGal.testIndex();*/ 
        });




        this.fManager.addMenu(this.menu) 
        this.fManager.addFloor(this.view.facade)   
        //this.fManager.index=0 


        

        this.mozg = new Mozg(this, function(s, p, p1){
                                        
        })

        this.visi3D.fun_drag = function () {
            
            self.view.facade.fun_rotationZ()    
        }

        if(dcmParam.mobile==true){
            dcmParam.addFunMove(visi3D.getFunMouseMove())
        }
        //this.getFunMouseMove
     

        this.setModel = function (s,p,p1) {
            this.mozg.setModel(s,p,p1);
            
        }

		this.update = function () {
            this.view.upDate()
			this.visi3D.upDate()            
		}




        //расчет окна
        var w,h,s;
  		this.sizeWindow = function(_w,_h,_s){  
            if(_w){
                w = _w;
                h = _h;
                s = _s;   
            }
  			this.scale=s;
            this.dCont.scale=s;
            this.visi3D.sizeWindow(0,0,w,h)
            this.menu.sizeWindow(w,h,s);
            this.mozg.sizeWindow(w,h,s);
            this.fManager.sizeWindow(w,h,s);      
  		}


        this.openId = function (id) {            
            $.ajax({
                url: "resources/date/save/"+id+"/config.json",
                success: function function_name(data) {                         
                    var oo;
                    if(typeof data === "string") {
                        var conf = JSON.parse(data)
                        oo = conf;
                    } else oo = data;                    
                    self.view.facade.setObj(oo)
                    if(self.indexStep==0){                        
                        setTimeout(function() {
                           self.mozg.array[0].dragScan() 
                       }, 10);
                        
                    }                                                
                },
                error:function function_name(data) {
                    console.error("Что то случилось с конфигом")
                }
            });

        }


        
        var a= window.location.href.split("?id=")
        if(a.length==2 && a[1]*1){                
            self.openId(a[1]*1)
        }else{
            self.view.facade.roomPlus(-200,-200,400,400)
        }
        setTimeout(function() {
            if(self._indexStep==0)self.mozg.array[0].dragScan(0)
        }, 0);

        

        this.saveP=function(){ 
            window.localS.object.info.visi3D = visi3D.getObj() 
            window.localS.save();    
        }

        this.sah=0
        this.savePosit=function(){
            this.sah++;
            var s=this.sah;
            setTimeout(function() {
                if(self.sah==s)self.saveP()
            }, 100);
        }

        visi3D.fun_Positioin=function(){
            self.savePosit();
            self.fManager.dragCenter.fun_Positioin();
        }  

        this.keydown=function(sob,event,boolCTRL){
             
            this.fManager.keydown(sob,event,boolCTRL);
            this.menu.keydown(sob,event,boolCTRL);
        }
        
        this.keyup=function(sob,event,boolCTRL){

            this.fManager.keyup(sob,event,boolCTRL);
            this.menu.keyup(sob,event,boolCTRL);
        }




        if(window.localS.object.info.indexStep==undefined)window.localS.object.info.indexStep=0;
        this.indexStep=window.localS.object.info.indexStep;

        if(window.localS.object.info.visi3D==undefined)window.localS.object.info.visi3D=visi3D.getObj() 
        visi3D.setObj(window.localS.object.info.visi3D);


        
        this.view.facade.sp.funFDO1=function(){
           
           self.saveTime()
        }

        var sp,st,s,pp
        this.save=function(){ 
            let o={}
            o.array=[]
            sp=this.view.facade.sp
            var a=0
            var distans=0
            var a1=0
            var a2=0
           
            for (var i = 0; i < sp.arrSplice.length; i++) {
                if(sp.arrSplice[i].life==true){
                    if(sp.arrSplice[i].boolAree==true){
                        a+=sp.arrSplice[i].arrayClass[0].arrGrani[0].area

                        let oo={}
                        oo.area=sp.arrSplice[i].arrayClass[0].arrGrani[0].area;
                        oo.distans=sp.arrSplice[i].ss3d.tCompArrow.distans;

                        oo.windows=sp.arrSplice[i].windows.getInfo()

                        oo.osi=sp.arrSplice[i].razmeru.getInfo()
                        


                        s=sp.arrSplice[i];
                        for (var j = 0; j < s.addPoint1.arrSHron.length; j++) {
                            if(s.addPoint1.arrSHron[j].sten.uuid!=s.uuid){
                                pp=s.addPoint1.arrSHron[j].sten.addPoint1
                            }
                        }
                        if(pp==undefined)return
                        
                        oo.angel=-Math.round(calc.getTreeAngel(
                            s.addPoint.position,
                            s.addPoint1.position,
                            pp.position)*180/Math.PI)

                        if(Math.abs(Math.abs(oo.angel)-90)<2){
                            
                            if(oo.angel>0){
                                a1+=1
                            }else{
                                a2+=1
                            }
                        }


                        o.array.push(oo)
                        distans+=oo.distans;
                    }                      
                }
            }
            o.a1=a1
            o.a2=a2
            o.area=a
            o.distans=distans
            trace("object LosalSave==",o);        
            localSInfo.object=o;
            localSInfo.save()
              
        }





        this.sah=0
        this.saveTime=function(){
            this.sah++;
            var s=this.sah;
            setTimeout(function() {
                if(self.sah==s)self.save()
            }, 100);
        }  


        //обрывалка mouseMove/////////////

        this.touchmove=function(e){            
            e.preventDefault();

            visi3D.position3d.stageMoveNew(e);
            visi3D.event3DArr.mousemove(e);
            dragPic.mousemove(e);

            e.stopPropagation();
        }
        if (dcmParam.mobile==true){            
            window.addEventListener('touchmove', this.touchmove, { passive: false, capture: true });
            this.visi3D.position3d.div.removeEventListener('touchmove', this.visi3D.position3d.stageMoveNew, { passive: false, capture: true });
            window.removeEventListener('touchmove', this.visi3D.event3DArr.mousemove);
            window.removeEventListener("touchmove", dragPic.mousemove);            
           // window.removeEventListener("touchmove", this.galleres.array[1].mousemove); 
            //window.removeEventListener("touchmove", this.menuDiv.mani.minMani.galleryMani.mousemove);             
        }
/*
       //великая грабля с событиями 
        this.touchmove=function(e){            
            e.preventDefault();

            self.visi3D.position3d.stageMoveNew(e);
            self.visi3D.event3DArr.mousemove(e);
            self.dragPic.mousemove(e);
            self.scane2d.stens.korektSten.mousemoveBig(e);
            self.galleres.array[1].mousemove(e)
            self.menuDiv.mani.minMani.galleryMani.mousemove(e)
            e.stopPropagation();
        }        
        if (dcmParam.mobile==true){            
            window.addEventListener('touchmove', this.touchmove, { passive: false, capture: true });
            this.visi3D.position3d.div.removeEventListener('touchmove', this.visi3D.position3d.stageMoveNew, { passive: false, capture: true });
            window.removeEventListener('touchmove', this.visi3D.event3DArr.mousemove);
            window.removeEventListener("touchmove", this.dragPic.mousemove);            
            window.removeEventListener("touchmove", this.galleres.array[1].mousemove); 
            window.removeEventListener("touchmove", this.menuDiv.mani.minMani.galleryMani.mousemove);             
        }

*/

        //////////////////////////////////////




  	}
    set indexStep(value) {       
        if (this._indexStep != value) { 
            this._indexStep = value;

            this.menu.indexStep=this._indexStep;
            this.mozg.indexStep=this._indexStep;
            this.fManager.index=this._indexStep;
        }
    }
    get indexStep() {
        return this._indexStep;
    }
}