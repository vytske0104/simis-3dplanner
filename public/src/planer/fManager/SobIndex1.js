

import { SobIndex } from './SobIndex.js';


export class SobIndex1  extends SobIndex {
  	constructor(par,fun) {
        super();      		
  		this.type="SobIndex1";
  		var self=this;
        this.par=par;
        this.fun=fun;

        this.dot=2;

        var gObj
        this.out = function (e) {            
            gObj=this.getGObj(e);
            if(gObj){ 

                if(gObj.type =="Osi"){   
                    gObj.active=false;
                    window.document.body.style.cursor = "auto"; 
                }

                if(gObj.type =="TComp3But"){ 
                   
                    if(e.target.button){
                       // e.target.button.active=false;
                        if(!e.target.button.active){
                           window.document.body.style.cursor = "auto";  
                        }                        
                    }
                }

                if(gObj.type =="TCompArrow"){  
                    gObj.active=false;               
                    window.document.body.style.cursor = "auto";                     
                } 
            }
           
        }

        this.over = function (e) {   
            gObj=this.getGObj(e);
            if(gObj){
                if(gObj.type =="Osi"){   
                    gObj.active=true;
                    window.document.body.style.cursor = "pointer"; 
                }

                if(gObj.type =="TComp3But"){
                                        
                    if(e.target.button){
                        //e.target.button.active=true;
                        window.document.body.style.cursor = "pointer"; 
                    }
                } 

                if(gObj.type =="TCompArrow"){
                    gObj.active=true;                  
                    window.document.body.style.cursor = "pointer";  

                }                 
            }
        }

        var arr,dd,bbb,idArr;
        var po={x:0,y:0}
        var po1={x:0,y:0}
        this.drahPoint = function (){   

            if(tc3b.type =="Osi"){ 
                let zx=pSt.z-self.par.tukalka.valueY;
                let zx1=self.korektADOsi(zx, tc3b);
                

                

                tc3b.setx_y_z(pSt.x+self.par.tukalka.valueX*mX, pSt.y-self.par.tukalka.valueX*mX, zx1)
                
               
                return;
            }


            if(tc3b.gronPoint.type=="TC3Big"){//это общий драгер  
                if(tb.idArr==0){
                    let z=oStc.z2-self.par.tukalka.valueY                    
                    tc3b.gronPoint.moveDrag(z,tb.idArr)
                    visi3D.intRend=1; 
                }else{
                    let z=oStc.zAct-self.par.tukalka.valueY                    
                    tc3b.gronPoint.moveDrag(z,tb.idArr)
                    visi3D.intRend=1;  
                }

                return;
            }

            if(tc3b)tc3b.boolKill = false

            if(tb.idArr==0){
                let zz=self.par.tukalka.valueY
                if(oStc.z2-zz<25)zz=-(25 - oStc.z2)

                
                let zx=oStc.z-zz;
                let zx1=self.korektAD(zx, oStc.gObj);    


                tc3b.button.z=zx1;
                tc3b.button1.z=oStc.z1-zz+(zx1-zx);
                tc3b.button2.z=oStc.z2-zz+(zx1-zx);

                var xx=self.par.tukalka.valueX*mX;                
                
                self.korektXY(xx, oStc.prosentOld,tc3b.gronPoint);
                
                
                

                
            }else{
                let z=oStc.zAct-self.par.tukalka.valueY
                for (var i = oStc.az.length - 1; i >= 0; i--) {
                    if(Math.abs(oStc.az[i]-z)<self.dot)z=oStc.az[i]
                }
                if(z<25)z=25;
                z=self.korektAD(z, oStc.gObj);

                tb.z=z
                self.korektVusota(oStc.gObj);

                 
            }
            self.par.dragMenu();  

           
            if(tc3b.gronPoint.idAp!=-1){

                idArr=tc3b.gronPoint.idAp+1
                bbb=false;
                arr=tc3b.gronPoint.par.array;

                po.x=tc3b.gronPoint.point.x;
                po.y=tc3b.gronPoint.point.y;
                if(po.y<tc3b.gronPoint.point1.y)po.y=tc3b.gronPoint.point1.y



                po1.x=arr[idArr-1].point.x
                po1.y=arr[idArr-1].point.y;
                if(po1.y<arr[idArr-1].point1.y)po1.y=arr[idArr-1].point1.y
                dd=calc.getDistance(po,po1)
                if(dd<20)bbb=true;
               
                po1.x=arr[idArr+1].point.x


               
                
                po1.y=arr[idArr+1].point.y;
                if(po1.y<arr[idArr+1].point1.y)po1.y=arr[idArr+1].point1.y
                dd=calc.getDistance(po,po1) 
                if(po1.x!==0)//FIXE последния точка заблочена хере его знает где дистанция по х
                    if(dd<20)bbb=true;



                
                if(bbb)tc3b.boolKill=bbb;

                tc3b.gronPoint.par.par.par.osiPoint.dragPoint(tc3b.gronPoint)
            }
              

            tc3b.gronPoint.par.par.par.addObjFun(tc3b.gronPoint.par.par.addPoint)
            tc3b.gronPoint.par.par.par.addObjFun(tc3b.gronPoint.par.par.addPoint1)
            visi3D.intRend=1; 
        }

        this.stopPoint = function () {
            wH3D.clear()//подсказка
            if(tc3b.type =="Osi"){  
                return;
            }



            if(tc3b && tc3b.gronPoint.tComp3But!=undefined && tc3b.gronPoint.tComp3But.boolKill==true){
                tc3b.gronPoint.kill()
                tc3b.gronPoint.par.par.par.addObjFun(tc3b.gronPoint.par.par.addPoint)
                tc3b.gronPoint.par.par.par.addObjFun(tc3b.gronPoint.par.par.addPoint1)
                self.par.activOne(null);
            }


            tb.notZbros=false 
           
            if(tb.type!=="TCBut")tb.active=false

            if(oStc && oStc.gObj){
                self.korektVusota(oStc.gObj)
            }
            if(tc3b.gronPoint.par.par.par.osiPoint)tc3b.gronPoint.par.par.par.osiPoint.redrag()  
              
   

        }




        this.korektVusota = function (_po) {

            let z=_po.button1._z;
            if(_po.button2._z>z)  z=_po.button2._z
            if(_po.button._z!=z)_po.button.z=z
        }

        var mX=1;
        var pX,pX1;
        var az=[0,0,0]
        var oStc={z:0,z1:0,z2:0}
        var tc3b,tb,_tb;
        var pSt={x:0,y:0,z:0}
        var bt
        var bd=false
        this.down = function (e) { 
            bt=false
            _tb=null
            bd=true
            gObj=this.getGObj(e);
            if(gObj){
                if(gObj.type=="SpliceSten"){                     
                    facade.sp.info33But.setObject(null);
                    self.par.activOne(gObj);  
                    self.par.visi3D.intRend=1; 
                    return;
                }


                if(gObj.type =="Osi"){
                    facade.sp.info33But.setObject(null);   
                    self.par.activOne(gObj);
                    self.dby()
                    var a=0
                    
                    mX=1;
                    pX=(visi3D.rotationZ%(Math.PI*2))*180/Math.PI
                    
                    if(gObj.xBool==true){

                        if(pX>=-270 && pX<=-90  ){
                            a+=Math.PI
                            mX=-1;
                           
                        }
                    }else{
                        a=Math.PI/2
                        mX=1;
                        if(pX<=-180  ){
                            a+=Math.PI
                            mX=-1;
                            
                        }
                    }
                  


                    pSt.x=gObj.position.x;
                    pSt.y=gObj.position.y;
                    pSt.z=gObj.position.z;
                    tc3b=gObj

                    self.par.tukalka.start(
                        self.par.content3d,
                        new THREE.Vector3(e.point.x,e.point.z,-e.point.y),
                        self.drahPoint,
                        self.stopPoint,
                        - Math.PI/2,
                        null,
                        a//-visi3D.rotationZ
                    )
                    bd=false
                }


                if(gObj.type =="TCompArrow"){ 
                    facade.sp.info33But.setObject(null);
                    self.par.activOne(gObj);
                    let gp=gObj.gPoint.par.addPointCenter(gObj.gPoint)
                    gObj=gp.tComp3But;
                    _tb=gp.tComp3But.button;
                    gp.tComp3But.button.active=true;

                    bt=true
                }


                if(gObj.type =="TComp3But"){


                    if(self.boolCTRL==true){

                    }

                    
                    //self.par.activOne(gObj);
                    tc3b=gObj;
                    tb= _tb
                    if(!_tb){
                       tb=e.target.button; 
                    }
                    oStc.z=gObj.button.z;
                    oStc.z1=gObj.button1.z;
                    oStc.z2=gObj.button2.z;
                    oStc.az=[oStc.z, oStc.z1, oStc.z2]
                    oStc.gObj= gObj;

                    oStc.zAct=tb.z;

                    oStc.act=tb; 

                    this.dby()

                    oStc.prosentOld=tc3b.gronPoint.prosent
                    tb.notZbros=true 

                    if(tc3b.gronPoint.type=="TC3Big"){//это общий драгер
                        tc3b.gronPoint.startDrag()

                    } else{
                        facade.sp.info33But.setObject(gObj);
                        if(bt){
                            tc3b.gronPoint.par.par.par.addObjFun(tc3b.gronPoint.par.par.addPoint)
                            setTimeout(function() {
                                facade.sp.info33But.setObject(gObj);
                                visi3D.intRend=1
                            }, 0);
                        }
                    }


                    var a=-visi3D.rotationZ
                    if(tc3b.gronPoint.idArr!==0){                        
                        mX=-1;
                        pX=((-tc3b.gronPoint.par.par._rotation)%(Math.PI*2))
                        pX1=((-visi3D.rotationZ+tc3b.gronPoint.par.par._rotation)%(Math.PI*2))*180/Math.PI

                        a=pX;

                        

                      
                        if(pX1>=-90 && pX1<=90){
                            
                        }else{
                            
                            mX=1;
                            a=pX+Math.PI 
                        }
                                           
                    }

                    
                    if(tc3b.gronPoint.type=="TC3Big"){//это общий драгер
                        a=-visi3D.rotationZ
                    } 


                    
                    self.par.tukalka.start(
                        self.par.content3d,
                        new THREE.Vector3(e.point.x,e.point.z,-e.point.y),
                        self.drahPoint,
                        self.stopPoint,
                        - Math.PI/2,
                        null,
                        a
                    )
                    bd=false
                } 
            }
            if(bd!=false){
                self.par.dragCenter.setMouse(e)
            }
        }

        this.boolCTRL=false;
        this.keydown=function(sob,event,boolCTRL){
            
            if(boolCTRL!==undefined)this.boolCTRL=boolCTRL
        }
        
        this.keyup=function(sob,event,boolCTRL){
            if(boolCTRL!==undefined)this.boolCTRL=boolCTRL
        }


        //////////////////////////////////////
        //////////////////////////////////////


        var vv=new THREE.Vector3();
        var vv1=new THREE.Vector3();

        var _vv=new THREE.Vector3();
        var _vv1=new THREE.Vector3();
        var _vv3
        var dd1,dd,xxx,dddd,dddd2,ddx,ddy
        var gp,gp2,dd2
        this.korektXY = function (x, prosentOld, gronPoint) {
            let prose=prosentOld-x/gronPoint.par.par._distans
            


            vv1.x=gronPoint.par.par._distans*prose
            vv1.y=0
            vv=wH3D.getPointGlobSten(gronPoint.par.par,0,0,vv1);
            dddd=999
            dd1=99999;
            for (var i = 0; i < allPoint.length; i++) {
                if(allPoint[i].par.par.uuid==gronPoint.par.par.uuid)continue
                if(allPoint[i].uuid==gronPoint.uuid)continue
                ddx=Math.abs(vv.x-allPoint[i].posit.x)
                ddy=Math.abs(vv.y-allPoint[i].posit.y)
                if(ddy>5){
                    if(ddx<10 && Math.abs(ddx)>0.01)   
                    if(ddx<10){
                        if(dd1>ddx){
                            _vv.x=allPoint[i].posit.x
                            _vv.y=allPoint[i].posit.y-999999
                            _vv1.x=allPoint[i].posit.x
                            _vv1.y=allPoint[i].posit.y+900000
                            _vv3= calc.getPointOfIntersection(
                                gronPoint.par.par._addPoint.position,
                                gronPoint.par.par._addPoint1.position,
                                _vv,
                                _vv1
                                )
                            
                            if(_vv3){                            
                                dd1=ddx;
                                gp=allPoint[i];
                                dddd=calc.getDistance(_vv3,gronPoint.par.par._addPoint.position)
                                prose=dddd/gronPoint.par.par._distans
                                
                            }
                            
                        }
                    }
                }
            }
            //ищу х оси
            dd2=99999;
            for (var i = 0; i < allPoint.length; i++) {
                if(allPoint[i].par.par.uuid==gronPoint.par.par.uuid)continue
                if(allPoint[i].uuid==gronPoint.uuid)continue
                ddx=Math.abs(vv.x-allPoint[i].posit.x)
                ddy=Math.abs(vv.y-allPoint[i].posit.y)
                if(ddx>5){
                    if(ddy<10 && Math.abs(ddy)>0.01){                        
                        if(dd2>ddy){
                            _vv.x=allPoint[i].posit.x-999999
                            _vv.y=allPoint[i].posit.y
                            _vv1.x=allPoint[i].posit.x+900000
                            _vv1.y=allPoint[i].posit.y
                            _vv3= calc.getPointOfIntersection(
                                gronPoint.par.par._addPoint.position,
                                gronPoint.par.par._addPoint1.position,
                                _vv,
                                _vv1
                                )
                            
                            if(_vv3){                            
                                dd2=ddy;
                                gp2=allPoint[i];
                                dddd2=calc.getDistance(_vv3,gronPoint.par.par._addPoint.position)
                                prose=dddd2/gronPoint.par.par._distans                               
                            }
                            
                        }
                    }
                } 
            }
            




            if(gronPoint.bForst==false){
                if(prose<0){
                    gronPoint.tComp3But.boolKill=true
                    prose=0;
                } 
                if(prose>1){
                    gronPoint.tComp3But.boolKill=true
                    prose=1;
                }
            }else{
                prose=0
            }

            tc3b.gronPoint.setProsent(prose)

            if(dd1!=99999){
                tc3b.gronPoint.drag()
                vv.x=tc3b.gronPoint.posit.x;
                vv.y=tc3b.gronPoint.posit.y;
                vv.z=-tc3b.gronPoint.posit.z-20;

                vv1.x=gp.posit.x;
                vv1.y=gp.posit.y;
                vv1.z=-gp.posit.z-20;
                wH3D.setLine(vv, vv1)
            }

            if(dd2!=99999){
                tc3b.gronPoint.drag()
                vv.x=tc3b.gronPoint.posit.x;
                vv.y=tc3b.gronPoint.posit.y;
                vv.z=-tc3b.gronPoint.posit.z-20;

                vv1.x=gp2.posit.x;
                vv1.y=gp2.posit.y;
                vv1.z=-gp2.posit.z-20;
                wH3D.setLine(vv, vv1)
            }

            return prose
        }


        //////////////////////////////////////
        //////////////////////////////////////

        var gfh 
        this.korektADOsi = function (z, _osi) {
            zz=z;
            wH3D.clear()//подсказка
            zz=z;
            dd1=99999
            for (var i = 0; i < ad.length; i++) {
                dd=Math.abs(ad[i]-z);
                if(dd<10){
                    if(dd1>dd){
                        zz=ad[i];
                        dd1=dd
                    }
                }
            }
            if(dd1!==99999){
                wH3D.setYSP(zz+20,0)
            }

            
            return zz; 
        }




        var zz,dd,dd1,bb;
        this.korektAD = function (z, _gObj) {
            zz=z;
            dd1=99999
            for (var i = 0; i < ad.length; i++) {
                dd=Math.abs(ad[i]-z);
                if(dd<10){
                    if(dd1>dd){
                        zz=ad[i];
                        dd1=dd
                    }
                }
            }
            wH3D.clear()//подсказка
            

            if(dd1!=99999){
                wH3D.setYSP(zz+20,0)
            }else{
                zz=this.korektADSten(zz, _gObj.gronPoint);
            }

            

           // trace(z, ad)
            return zz
        }

        //пересечения на внутрекниъх стенах
        var app=[];
        var rr,rdd1,rdd2,ppp, arxz
        var rpp={x:0, y:0}
        var rpp1={x:0, y:0}
        var _rpp={x:0, y:0}
        var _rpp1={x:0, y:0}
        var __rpp={x:0, y:0}
        var __rpp1={x:0, y:0}
        var _W_rpp={x:0, y:0}
        var _W_rpp1={x:0, y:0}

        var _rpNull={x:0, y:0}
        var a,d;
        this.korektADSten = function (z, gPoint) {
            let zx=z;
            app.length=0;
            var p=-1;
            arxz=gPoint.par.array
            for (var i = 0; i < arxz.length; i++) {
                if(arxz[i].uuid==gPoint.uuid){
                    p=i;

                }
            }
            if(arxz[p-1]!=undefined && arxz[p+1]!=undefined){//по центру
                app.push(p+1, p-1)
            }
            if(arxz[p-2]!=undefined && arxz[p-1]!=undefined){//с ночала
                app.push(p-2, p-1)
            }
            if(arxz[p+2]!=undefined && arxz[p+1]!=undefined){//с конца
                app.push(p+2, p+1)
            }
            rpp.x=rpp1.x=gPoint.point.x;
            rpp.y=99999999;
            rpp1.y=-9999999;



            rdd2=9999;
            
            for (var i = 0; i < app.length; i+=2) {
                _rpp.x=arxz[app[i]].point.x;
                if(app[i]==arxz.length-1)_rpp.x=gPoint.par.par._distans
                _rpp1.x=arxz[app[i+1]].point.x;
                
                _rpp.y=arxz[app[i]].point.y;              
                _rpp1.y=arxz[app[i+1]].point.y;

                this.korektToLine(_rpp,_rpp1,_W_rpp,_W_rpp1)
                
                rr=calc.getPointOfIntersection(_W_rpp,_W_rpp1,rpp,rpp1)
                
                if(rr){
                    
                    rdd1=Math.abs(rr.y-zx);
                    if(rdd1<20){
                        if(rdd1<rdd2){
                            rdd2= rdd1;
                            ppp=i;
                            zx=rr.y;  
                            __rpp.x=_rpp.x
                            __rpp1.x=_rpp1.x

                            __rpp.y=_rpp.y
                            __rpp1.y=_rpp1.y
                        }
                    }
                    
                }
            }

            if(rdd2!=9999){//показываем линии
                calc.getVector(__rpp.x, gPoint.par.par._rotation,rpp)
                rpp.x+=gPoint.par.par._addPoint.position.x;
                rpp.y+=gPoint.par.par._addPoint.position.y;
                rpp.z=-__rpp.y-20

                calc.getVector(__rpp1.x, gPoint.par.par._rotation,rpp1)
                rpp1.x+=gPoint.par.par._addPoint.position.x;
                rpp1.y+=gPoint.par.par._addPoint.position.y;
                rpp1.z=-__rpp1.y-20                
                wH3D.setLine(rpp,rpp1,null,null,9959)
            }



            
            return zx
        }
        var a,d,ds;
        var prp2={x:0,y:0}
        var prpNN={x:0,y:0}
        this.korektToLine = function (p,p1, _p,_p1) {            
            _p.x=p.x;
            _p.y=p.y;
            _p1.x=p1.x;
            _p1.y=p1.y;
            let num=900
            prp2.x=(_p.x+_p1.x)/2;
            prp2.y=(_p.y+_p1.y)/2;
            d=calc.getDistance(prp2,prpNN)
            ds=(dd+num)/dd
            _p.x=(_p.x-prp2.x)*ds+prp2.x;
            _p.y=(_p.y-prp2.y)*ds+prp2.y;

            _p1.x=(_p1.x-prp2.x)*ds+prp2.x;
            _p1.y=(_p1.y-prp2.y)*ds+prp2.y;
        }




        var allPoint=[]
        var ad=[];
        var sp,xz       
        this.dby = function () {
            ad.length=0;
            allPoint.length=0;
            sp=facade.sp;
            for (var i = 0; i < sp.arrSplice.length; i++) {
                if(sp.arrSplice[i].life==true){
                    xz=sp.arrSplice[i].sVephPoint.array
                    for (var j = 0; j < xz.length; j++) {
                        ad.push(xz[j].tComp3But.button.z)
                        ad.push(xz[j].tComp3But.button1.z)
                        ad.push(xz[j].tComp3But.button2.z)
                        allPoint.push(xz[j])
                    }                    
                }
            }
            for (var i = 0; i < ad.length; i++) {
                for (var j = ad.length - 1; j > i; j--) {
                    if(ad[i]==ad[j]){
                        ad.splice(j,1)
                    }
                }
            }
            
            for (var i = 0; i < allPoint.length; i++) {
                for (var j = allPoint.length - 1; j > i; j--) {
                    if(allPoint[i].uuid==allPoint[j].uuid){
                        allPoint.splice(j,1)
                    }
                }
            }   

        } 

    }
}    
        