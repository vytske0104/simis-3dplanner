
import { SobIndex } from './SobIndex.js';


export class SobIndex0  extends SobIndex {
    constructor(par,fun) {
        super();            
        this.type="SobIndex0";
  		var self=this;
        this.par=par;
        this.fun=fun;

        this._sah=0

        var point,posit,posit1
        var arrPosit=[];
        var positDin=new THREE.Vector3();
        var positDin1=new THREE.Vector3();
        var positDin2=new THREE.Vector3();
        var startPoint=new THREE.Vector3();
        var goodPoint=new THREE.Vector3();
        var aps=[new THREE.Vector3(),new THREE.Vector3(),new THREE.Vector3()]
        var apsOs=[new THREE.Vector3(),new THREE.Vector3()]

        this.move = function (e) { 

        }

       

        var dragBool=true


        this.drahPoint = function (){             
            if(pol) { 
                for (var i = 0; i < pol.array.length; i++) {
                    let v= new THREE.Vector3()
                    v.x=arrPosit[i].x+self.par.tukalka.valueX
                    v.y=arrPosit[i].y+self.par.tukalka.valueY
                    pol.array[i].position.setPoint(v)
                    /*pol.array[i].position.set(
                        arrPosit[i].x+self.par.tukalka.valueX,
                        arrPosit[i].y+self.par.tukalka.valueY,
                    )*/

                    pol.array[i].dragVokrug();
                    pol.array[i].drag(); 
                }
                self.par.visi3D.intRend=1;
            }

            if(point) {
                self.dragPoint()                 
            }

            if(sten) { 
                positDin.x=goodPoint.x+self.par.tukalka.valueX;
                positDin.y=goodPoint.y+self.par.tukalka.valueY;
                self.dragSten() 
            }
        }

        this.stopPoint = function () { 
            // 
            if(point) {
                positDin.x=posit.x+self.par.tukalka.valueX;
                positDin.y=posit.y+self.par.tukalka.valueY;
                self.korektAP(positDin)

                if(positDin.obj!=undefined){
                    if(positDin.obj.type=="SpPointSten"){
                        positDin.obj.slitie(point)
                    }
                    if(positDin.obj.type=="SpliceSten"){
                        positDin.obj.dividedSten(point,true)
                    }                    
                }                
            }
            wH3D.clear() 
        }
    
    
        this.out = function (e) {            
            gObj=this.getGObj(e);
            if(gObj){ 
                if(gObj.active!=undefined){
                   // gObj.active=false;
                    visi3D.intRend=1;
                }
                if(gObj.type=="TCompArrow" ){ 
                    gObj.active=false;
                }
                window.document.body.style.cursor = "auto"; 
            }
        }

        this.over = function (e) {   
            gObj=this.getGObj(e);
            if(gObj){ 
                //if(gObj.active!=undefined){
                   // 
                    visi3D.intRend=1;
                    if(gObj.type=="TCompArrow" ){ 
                        gObj.active=true;
                          
                    }
                    window.document.body.style.cursor = "pointer";
                    
                //}
            }
        }




        var sten, pol, gObj,posy
        this.down = function (e) {  
            point=null;
            sten=null;
            pol=null;
            gObj=this.getGObj(e);
            
            if(gObj){ 
                
                if(gObj.type =="TCompArrow"){ 
                    sten=gObj.sten
                    trace("!!!!!!!!!!!!!!TCompArrow!!!!!!!!!!!!")
                    if(sten==undefined){

                        self.par.activOne(gObj);
                        return
                    }


                    let s1=sten.delim()
                    trace(s1);
                    point=s1.addPoint1
                    //return 
                    posy=e.point.y;
                    /*

                    let pppp={x:0,y:0}
                    pppp.x=(sten.addPoint.position.x+sten.addPoint1.position.x)/2
                    pppp.y=(sten.addPoint.position.y+sten.addPoint1.position.y)/2

                    

                    point=self.par.floor.sp.craetPoint();                    
                    let pa=self.par.floor.polDin.array;


                    var p=-1
                    for (var i = 0; i < pa.length; i++) {
                        if(pa[i].uuid==sten.addPoint1.uuid){                           
                            p=i;
                            break
                        }
                    }
                    if(p!=-1)self.par.floor.polDin.addPoint(point,p);
                    


                    var p=self.getPosEv3DSten(e);  
                    var p1= calc.isPointInLin(sten.addPoint.position,sten.addPoint1.position,e.point,1000,1000);                   
                    var sten1=self.par.floor.sp.craetSplice1();
                    
                    
                    //point.position.setPoint(p1);  
                    point.position.setPoint(pppp);                   
                    sten.addPoint.addSplice(sten1,true);
                    sten.addPoint.removeSplice(sten);
                    point.addSplice(sten, true);
                    point.addSplice(sten1,false); 

                    */
                    self.par.planDrag.setZ(posy)


                    //драгер точки
                    posit=new THREE.Vector3(point.position.x,point.position.y)                   
                    self.par.tukalka.start(
                        self.par.content3d,
                        new THREE.Vector3(e.point.x,e.point.z,-e.point.y),
                        self.drahPoint,
                        self.stopPoint
                    )
                    self.par.visi3D.intRend=1;
                    
                    self.startAP(point);
                    dragBool=true; 
                    sten=null;
                    /////////////////

                    self.par.activOne(gObj);
                    return; 
                } 


                if(gObj.type=="SpPointSten"){
                                       
                    point=gObj;
                    self.par.activOne(point);

                    if(e.originalEvent.touches==undefined)if(e.originalEvent.button!=0)return
                    posit=new THREE.Vector3(point.position.x,point.position.y)  

                    goodPoint.copy(posit); 
                    startPoint.copy(posit);                 
                    self.par.tukalka.start(
                        self.par.content3d,
                        new THREE.Vector3(e.point.x,e.point.z,-e.point.y),
                        self.drahPoint,
                        self.stopPoint
                    )
                    self.par.visi3D.intRend=1;
                    
                    self.startAP(point)
                    dragBool=true                    
                    return;
                }  

                if(gObj.type=="SpliceSten"){                     
                    sten=gObj; 
                    self.par.activOne(sten);  
                    self.par.visi3D.intRend=1;                         
                    if(e.originalEvent.touches==undefined)if(e.originalEvent.button!=0)return;
                    posit=new THREE.Vector3(sten.position.x,sten.position.y);
                    //posit1=new THREE.Vector3(sten.position1.x,sten.position1.y);

                    aps[0].copy(sten.position);
                    aps[1].copy(sten.position1);
                    aps[2].x=((sten.position.x+sten.position1.x)/2);
                    aps[2].y=((sten.position.y+sten.position1.y)/2);
                    //

                    goodPoint.copy(aps[2]);
                    startPoint.copy(aps[2]);  
                    posit.copy(aps[2]);
                    ddd=sten._distans/2
                    rrr=sten._rotation
                    this.setPosVV(9999,aps[2],apsOs[0],Math.PI/2+rrr)
                    this.setPosVV(9999,aps[2],apsOs[1],-Math.PI/2+rrr)

                    //self.startAP(sten.addPoint,sten.addPoint1) 

                    self.par.tukalka.start(
                        self.par.content3d,
                        new THREE.Vector3(e.point.x,e.point.z,-e.point.y),
                        self.drahPoint,
                        self.stopPoint
                    ) 
                    dragBool=true
                    return;
                }   

                           
            }
            self.par.activOne(null);
        }

        this.clear=function(){
            this._sah=0;
        }



        /////////////тест модели//////////////
        var a,d,ds;

        var prp2={x:0,y:0}
        var prpNN={x:0,y:0}
        this.korektToLine = function (p,p1, num) {            
            
            prp2.x=(p.x+p1.x)/2;
            prp2.y=(p.y+p1.y)/2;
            d=calc.getDistance(prp2,prpNN)
            ds=(d+num)/d

            p.x=(p.x-prp2.x)*ds+prp2.x;
            p.y=(p.y-prp2.y)*ds+prp2.y;

            p1.x=(p1.x-prp2.x)*ds+prp2.x;
            p1.y=(p1.y-prp2.y)*ds+prp2.y;
        }

        this.korArr=function(n,n1){
            if(n<0){
                n+=n1;
                return this.korArr(n,n1)
            }
            if(n>=n1){
                n-=n1;
                return this.korArr(n,n1)
            }

            return n
        }

        var ee={x:0,y:0} 
        var ee1={x:0,y:0}
        var _ee={x:0,y:0} 
        var _ee1={x:0,y:0} 
        var _eexz={x:0,y:0}
        var _eeDD=0    
        var t,t1,t2,_t,_t1,rez,kol,a
        var aaadd,f,f1,_f,_f1
        this.isGoodPoint=function(ap){
            //точки рядом
            kol=ap.length;
            _eexz.x=0
            _eexz.y=0
            _eeDD=0 

            for (var i = 0; i < ap.length; i++) {
                for (var j = i+1; j < ap.length; j++) {
                    d=calc.getDistance(ap[i],ap[j]);
                    if(d<50)return false;
                }                
            }           

            aaadd=0
            for (var i = 0; i < ap.length; i++) {
                t=ap[this.korArr(i-1,kol)]
                t1=ap[this.korArr(i,kol)]
                t2=ap[this.korArr(i+1,kol)]
                
                a=Math.round(calc.getTreeAngel(t,t1,t2)*180/Math.PI);
                aaadd+=a;
                if(Math.abs(a)<5)return false;//нахрен мелкие углы      
            }
            if(aaadd>0)return false;//модель вывернута

           
            for (var i = 0; i < ap.length; i++) {
                f=this.korArr(i-1,kol)
                f1=i;              
                t=ap[f];               
                t1=ap[f1];
                for (var j = 0; j < ap.length-3; j++) {                    
                    _f=this.korArr(i+1,kol)
                    _f1=this.korArr(i+2,kol)                    
                    _t=ap[_f];
                    _t1=ap[_f1]; 
                    rez=calc.getPointOfIntersection(t,t1,_t,_t1);
                    if(rez){                        
                        return false;//линии пересекаються                        
                    }
                    rez=calc.isPointInLin(t,t1,_t,30,0);
                    if(rez){
                        return false;//линии пересекаються   
                    }
                    rez=calc.isPointInLin(t,t1,_t1,30,0);
                    if(rez){
                        return false;//линии пересекаються                        
                    }
                } 
            }
            return true;
        }

        this.dragPoint = function(){
            positDin.x=posit.x+self.par.tukalka.valueX;
            positDin.y=posit.y+self.par.tukalka.valueY;
            //self.korektAP(positDin);
            positDin1.x=goodPoint.x;
            positDin1.y=goodPoint.y;

            this.privazka([positDin],[point])
            
            this.privazkaFinal([positDin],[point])

            this.dragWWW(positDin, positDin1, 0, 5, 0,true); 
            this.korektAAA(positDin,true)
            if(this.isGoodPoint(aaa)==true){
                goodPoint.x= positDin.x;
                goodPoint.y= positDin.y;   
            }
            point.position.setPoint(positDin)
            point.dragVokrug();
            point.drag();            
            self.par.visi3D.intRend=1;
        }



        var aaa=[]
        var _vec=new THREE.Vector3();
        var _vec1=new THREE.Vector3();
        this.dragSten=function(){
            positDin.x=posit.x+self.par.tukalka.valueX;
            positDin.y=posit.y+self.par.tukalka.valueY;
            
            this.setPosVV(ddd,positDin,vec,rrr+Math.PI) 
            this.setPosVV(ddd,positDin,vec1,rrr) 
            
            this.privazka([vec,positDin,vec1],[sten.addPoint1,sten.addPoint])
            this.privazkaOs(positDin,apsOs)
            this.privazkaFinal([vec,positDin,vec1],[sten.addPoint1,sten.addPoint])

            positDin1.x=goodPoint.x;
            positDin1.y=goodPoint.y;  
            this.dragWWW(positDin, positDin1, 0, 5, 0); 

            this.korektAAA(positDin)
            if(this.isGoodPoint(aaa)==true){
                goodPoint.x= positDin.x;
                goodPoint.y= positDin.y;   
            }
                    
            this.setPosSten(positDin);
        }
        var vecds=new THREE.Vector3()
        var vecds1=new THREE.Vector3()
        this.dragWWW=function(p,p1,sah,kolSah,kolB,bool){           
            kolB++;
            if(kolB>10)return

            this.korektAAA(p,bool)
            let bb=this.isGoodPoint(aaa);

            if(bb==false){//первая в недоступной зоне
                vecds.x=(p.x+p1.x)/2;
                vecds.y=(p.y+p1.y)/2;
                this.korektAAA(vecds,bool);
                let bb1=this.isGoodPoint(aaa);

                if(bb1==false){//недоступной зоне                    
                    p.x=vecds.x;
                    p.y=vecds.y;                    
                    this.dragWWW(p,p1,sah+1,kolSah,kolB,bool)
                }else{
                    p1.x=vecds.x;
                    p1.y=vecds.y; 
                    if(sah>kolSah)return;
                    this.dragWWW(p,p1,sah,kolSah,kolB,bool)
                }
            }            
        }
        var stenDinn
        this.korektAAA=function(p,bool){
            if(bool){
                stenDinn=null;
                for (var i = 0; i < self.par.floor.sp.arrSplice.length; i++) {
                    if(self.par.floor.sp.arrSplice[i].life==true){
                        if(self.par.floor.sp.arrSplice[i].addPoint.uuid==point.uuid){
                            stenDinn=self.par.floor.sp.arrSplice[i];
                        }
                    }
                }
                if(stenDinn){
                    aaa.length=0; 
                    _vec.x=p.x;
                    _vec.y=p.y;      
                    aaa.push(_vec);
                    _vec1.x=stenDinn.addPoint1.position.x;
                    _vec1.y=stenDinn.addPoint1.position.y;      
                    aaa.push(_vec1);
                    this.dragSRR(stenDinn);
                    
                }
            }else{
                stenDinn=sten
                this.setPosVV(ddd,p,_vec,rrr+Math.PI) 
                this.setPosVV(ddd,p,_vec1,rrr);
                aaa.length=0;       
                aaa.push(_vec,_vec1);
                this.dragSRR(sten);  
            }  
        }



        var ad,ad1,ss
        this.dragSRR=function(s){
            ad=s.addPoint1;
            ad1=null            
            for (var i = 0; i < ad.arrSHron.length; i++) {
                if(ad.arrSHron[i].sten.uuid!=s.uuid){
                    ad1=ad.arrSHron[i].sten.addPoint1;
                    ss=ad.arrSHron[i].sten;
                    break
                }
            }
            if(ad1!=null){
                if(ad1.uuid!=stenDinn.addPoint.uuid){
                    aaa.push(ad1.position); 
                    this.dragSRR(ss)
                } 
            } 
        }


        var ddd,rrr
        var a,d
        var vec=new THREE.Vector3()
        var vec1=new THREE.Vector3()
        this.setPosSten = function(p){            
            this.setPosVV(ddd,p,vec,rrr+Math.PI)            
            sten.addPoint.position.setPoint(vec)
            sten.addPoint.dragVokrug();
            sten.addPoint.drag();
            this.setPosVV(ddd,p,vec,rrr)  
            sten.addPoint1.position.setPoint(vec)
            sten.addPoint1.dragVokrug();
            sten.addPoint1.drag();

        }

        this.setPosVV = function(_d,p,v,ap){
            calc.getVector(_d,ap,v)
            v.x+=p.x;
            v.y+=p.y;
        }     

        //////////////////привязки///////////////////////    

        var vecpp={x:0,y:0,x1:0,y1:0,xz:0,yz:0};
        var ps,poAd,dsd,bb
        this.privazka = function(arr,arrAP){
            vecpp.x1=99999;
            vecpp.y1=99999;
            vecpp.xz=0;
            vecpp.yz=0;
            for (var j = 0; j < arr.length; j++) {
                ps=arr[j]
                for (var i = 0; i < this.par.floor.sp.arrPoint.length; i++) {
                    if (!this.par.floor.sp.arrPoint[i].life) continue;
                    bb=true;

                    for (var k = 0; k < arrAP.length; k++) {
                        if(this.par.floor.sp.arrPoint[i].uuid==arrAP[k].uuid)bb=false;
                    }
                    if(bb==false)continue;

                    poAd=this.par.floor.sp.arrPoint[i].position;
                    dsd=Math.abs(ps.x-poAd.x)
                    if(dsd<20){
                        if(vecpp.x1>dsd){
                           
                            vecpp.x1=dsd;
                            vecpp.x=poAd.x;
                            vecpp.xz=ps.x-poAd.x
                        }
                    }
                    dsd=Math.abs(ps.y-poAd.y);
                    
                    if(dsd<20){                        
                        if(vecpp.y1>dsd){
                            vecpp.y1=dsd;
                            vecpp.y=poAd.y;
                            vecpp.yz=ps.y-poAd.y
                        }
                    }
                }
                if(point){
                    dsd=Math.abs(ps.x-startPoint.x)
                    if(dsd<20){
                        if(vecpp.x1>dsd){
                           
                            vecpp.x1=dsd;
                            vecpp.x=startPoint.x;
                            vecpp.xz=ps.x-startPoint.x
                        }
                    }
                    dsd=Math.abs(ps.y-startPoint.y);
                    
                    if(dsd<20){                        
                        if(vecpp.y1>dsd){
                            vecpp.y1=dsd;
                            vecpp.y=startPoint.y;
                            vecpp.yz=ps.y-startPoint.y
                        }
                    }
                }               
            } 



                   
        } 

        
        this.privazkaOs = function(ps,_apsOs){
            rez=calc.isPointInLin(_apsOs[0],_apsOs[1],ps,30,0);        
            if(rez){
                dsd=Math.abs(ps.x-rez.x)
                if(dsd<20){
                    if(vecpp.x1>dsd){                       
                        vecpp.x1=dsd;
                        vecpp.x=rez.x;
                        vecpp.xz=ps.x-rez.x;
                    }
                }
                dsd=Math.abs(ps.y-rez.y)
                if(dsd<20){
                    if(vecpp.y1>dsd){                       
                        vecpp.y1=dsd;
                        vecpp.y=rez.y;
                        vecpp.yz=ps.y-rez.y;
                    }
                }
            }
        }

        var zz=-75    
        var ot=10;
        var vect=new THREE.Vector3();
        var vect1=new THREE.Vector3();
        var bvc
        this.privazkaFinal = function(arr,arrAP){ 
            bvc=false;
            if(vecpp.xz!==0 || vecpp.yz!==0)bvc=true;
            wH3D.clear()//подсказка
            if(bvc==false)return
            for (var j = 0; j < arr.length; j++) {
                arr[j].x-= vecpp.xz
                arr[j].y-= vecpp.yz
            } 

            for (var j = 0; j < arr.length; j++) {
                ps=arr[j]
                for (var i = 0; i < this.par.floor.sp.arrPoint.length; i++) {
                    if (!this.par.floor.sp.arrPoint[i].life) continue;
                    bb=true;

                    for (var k = 0; k < arrAP.length; k++) {
                        if(this.par.floor.sp.arrPoint[i].uuid==arrAP[k].uuid)bb=false;
                    }
                    if(bb==false)continue;

                    poAd=this.par.floor.sp.arrPoint[i].position;
                    dsd=Math.abs(ps.x-poAd.x)
                    if(dsd<0.02){
                        vect.z=zz;
                        vect.x=ps.x;
                        vect.y=ps.y;
                        vect1.z=zz;
                        vect1.x=ps.x;
                        vect1.y=ps.y+10;
                        wH3D.setLine(vect,vect1,null,null,20000)                        
                    }
                    dsd=Math.abs(ps.y-poAd.y)
                    if(dsd<0.02){
                        vect.z=zz;
                        vect.x=ps.x;
                        vect.y=ps.y;
                        vect1.z=zz;
                        vect1.x=ps.x+10;
                        vect1.y=ps.y;
                        wH3D.setLine(vect,vect1,null,null,20000)                        
                    }
                }

                if(point){
                    dsd=Math.abs(ps.x-startPoint.x)
                    if(dsd<0.02){
                        vect.z=zz;
                        vect.x=ps.x;
                        vect.y=ps.y;
                        vect1.z=zz;
                        vect1.x=ps.x;
                        vect1.y=ps.y+10;
                        wH3D.setLine(vect,vect1,null,null,20000)                        
                    }
                    dsd=Math.abs(ps.y-startPoint.y)
                    if(dsd<0.02){
                        vect.z=zz;
                        vect.x=ps.x;
                        vect.y=ps.y;
                        vect1.z=zz;
                        vect1.x=ps.x+10;
                        vect1.y=ps.y;
                        wH3D.setLine(vect,vect1,null,null,20000)                        
                    }
                }
                
            }
            if(arr[1]){
                rez=calc.isPointInLin(apsOs[0],apsOs[1],arr[1],1,0);

                if(rez){
                    vect.z=zz;
                    vect.x=apsOs[0].x;
                    vect.y=apsOs[0].y;
                    vect1.z=zz;
                    vect1.x=apsOs[1].x;
                    vect1.y=apsOs[1].y;
                    wH3D.setLine(vect,vect1,null,null,20)    
                }
                    
            }

        }
    }
}
