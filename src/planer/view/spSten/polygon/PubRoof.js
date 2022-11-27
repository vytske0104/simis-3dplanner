

import { PubBase } from './PubBase.js';
import {TShape3D} from './TShape3D.js';


import {MatLW} from './line/MatLW.js';

export class PubRoof  extends PubBase {
  	constructor(par,fun) {  
        super(par,fun);  		
  		this.type="PubRoof";
        var self=this;
        this.par=par;


        this.triangulateShape=new TShape3D();

        this.triangulateShape = this.par.triangulateShape;
        this.graphics=this.par.ssPolygon2d.graphics;
        this.color=0x9acedf;

        this.grap = new PIXI.Graphics();
        this.par.ssPolygon2d.content2d.addChild(this.grap);

        this.grap1 = new PIXI.Graphics();
        this.par.ssPolygon2d.content2d.addChild(this.grap1);

        this.grap2 = new PIXI.Graphics();
        this.par.ssPolygon2d.content2d.addChild(this.grap2);

      

        this._delph=1

        this._rotation=0;
        this._scale=1;
        this._active=this.par._active
        //this.grap.visible=this._active
       // this.grap1.visible=this._active


        /////////////////////////////////////////


        this.matLW=new MatLW(this);

        var sas,sasUUID,bbbb
        this.keyG="gateauRoofPol"
        this.uuidDin="null";
        this.objDin = null;
        
        //крыша             //перекрытия        //стяжка
        this.arrKye=[   "gateauRoofPol",    "gateauOverlapPol", "gateauScreedPol"]; 
       /* this.draw1Color=function(r,b){           
            if(r==this.keyG){
                if(this.uuidDin!=this.par.gateauObj[this.keyG].uuid){
                    
                    this.uuidDin=this.par.gateauObj[this.keyG].uuid;
                    this.objDin=this.par.gateauObj[this.keyG]                 
                    if(this.objDin.mat){
                        if(this.objDin.mat.uuid!==this._material.uuid){
                            this.material=this.objDin.mat
                        }                        
                    }

                    if(this.objDin.mat1){
                        if(this.objDin.mat1.uuid!==this._material1.uuid){
                            this.material1=this.objDin.mat1
                        }                        
                    }

                    this.par.rect.w=this.objDin.tovarFace.d3Width;
                    this.par.rect.h=this.objDin.tovarFace.d3Height;

                    this._delph=this.objDin.delph;
             
                    
                    this.graniXZ.addGateau(this.par.gateauObj[this.keyG]);  
                    this.par.dragNaTriang();
                    this.draw1();
                }
            }
        }*/

        /////////////////////////////////////////


        this.arrBla=[]
        this.getTri = function () {
            this.arrBla.length=0  
         
            if(this.aPUuid.length==3){
                for (var i = 0; i < this.par.array.length; i++) {
                    
                    for (var j = 0; j < this.aPUuid.length; j++) {
                        if(this.par.array[i].uuid==this.aPUuid[j]){
                            this.arrBla.push(this.par.array[i]);
                            j=4;
                        }
                    }                    
                }
                
                if(this.arrBla.length==3)return;           
            }
            this.arrBla.length=0  
            if(this.par.array.length>=3){
                this.arrBla.push(this.par.array[0],this.par.array[1],this.par.array[2])
            }
            
            
        }  



        this.draw2d = function () { 

        	this.par.ssPolygon2d.stAct.draw1()
			this.graphics.clear();
            //this.graphics.lineStyle( 1, 0xffffff*Math.random(), this._alpha/2);
            //this.graphics.drawRect( this.par.rectBig.x, this.par.rectBig.y, this.par.rectBig.w, this.par.rectBig.h)

			this.graphics.beginFill(this.color, this._alpha);		
			this.graphics.lineStyle( this.par.par._sizeLine, this.par.par._colorLine_, this._alpha);
			if(this.par.array.length!=0){
				this.graphics.moveTo(this.par.array[0].position.x,this.par.array[0].position.y);
				for (var i = 1; i < this.par.array.length; i++) {
					this.graphics.lineTo(this.par.array[i].position.x,this.par.array[i].position.y);
				}
				this.graphics.lineTo(this.par.array[0].position.x,this.par.array[0].position.y);
			}
            
            if(this.arrBla.length==0)this.getTri() 
            if(this.par.array.length>=3){ 
                this.grap1.clear();
                this.grap1.lineStyle( 3, 0xffffff, this._alpha);
                this.grap1.beginFill(0x008cba, this._alpha/2); 

                this.grap1.moveTo(this.arrBla[0].position.x,this.arrBla[0].position.y);
                this.grap1.lineTo(this.arrBla[1].position.x,this.arrBla[1].position.y);
                this.grap1.lineTo(this.arrBla[2].position.x,this.arrBla[2].position.y);
                this.grap1.lineTo(this.arrBla[0].position.x,this.arrBla[0].position.y);
            } 


            
            this.grap.x = this.point1.x;
            this.grap.y = this.point1.y;

             
            

        }

        this.draw2dAP = function () { 
            this.grap2.clear()

            
            var rr=20
            var cc=0xc7edfc

            for (var i = 0; i < this.arrBla.length; i++) {
                cc=0xc7edfc
                rr=20; 

                if(i<apd.length){
                   // rr=10
                }

                if(i===apd.length){
                    rr=30; 
                    //cc=0xf28044   
                }

                this.grap2.lineStyle( 3, 0xffffff, 1);
                this.grap2.beginFill(cc, 1);
                this.grap2.drawCircle(this.arrBla[i].position.x,this.arrBla[i].position.y,rr)               
            }


            for (var i = 0; i < this.par.array.length; i++) {
                for (var j = 0; j < apd.length; j++) {
                    if(this.par.array[i].uuid==apd[j]){
                        rr=15; 
                        cc=0xf28044  
                        this.grap2.lineStyle( 3, 0xffffff, 1);
                        this.grap2.beginFill(cc, 1);
                        this.grap2.drawCircle(this.par.array[i].position.x,this.par.array[i].position.y,rr) 
                    }
                }
            }




           
        }

        ////////////////////////////////////////////////////

		this.kol=0
        this.arrPoint=[];
        this.draw3d = function () {	
        	if(this.par.array.length>=2){
        		this.par.ssP3d.lineSegments.visible = true;
        		this.par.ssP3d.planeXZ.clearPoint()
        		this.kolPointDrag();        		
        		for (var i = 0; i < this.kol; i++) {                    
                    if(i!=this.kol-1){
                        this.par.ssP3d.planeXZ.addLine(this.arrPoint[i],this.arrPoint[i+1]);
                    }else{
                        this.par.ssP3d.planeXZ.addLine(this.arrPoint[i],this.arrPoint[0]);
                    }
                }
                this.par.ssP3d.planeXZ.upDate()
        	}else{
        		this.par.ssP3d.lineSegments.visible=false;
        	}
        }


		this.kolPointDrag = function () {
            //if(p20.veiwType!=0)return;
            this.kol=this.par.array.length;
            for (var i = 0; i < this.par.array.length; i++) {

                if(this.arrPoint[i]==undefined)this.arrPoint[i]=new THREE.Vector3();
                this.arrPoint[i].x=this.par.array[i].position.x;
                this.arrPoint[i].y=this.par.array[i].position.y;
                this.arrPoint[i].z=-this.par.array[i].position.z;
            }
        } 


        this.point=new THREE.Vector3()
        this.point1=new THREE.Vector3()
        this.point2=new THREE.Vector3()
        var aaa,xx,yy,zz,ii,minZ,maxZ,dddZ,pro,rottt,dd2,dd3;
        this.korektRotScal= function () {
            

           
            aaa=this.par.array; 
            xx=0;
            yy=0;
            zz=0; 
            minZ=99999999  
            maxZ=-99999999
            for (ii = 0; ii < aaa.length; ii++) {
                xx+=aaa[ii].position._x
                yy+=aaa[ii].position._y
                zz+=aaa[ii].position._z
                if(aaa[ii].position._z<minZ)minZ=aaa[ii].position._z;
                if(aaa[ii].position._z>maxZ)maxZ=aaa[ii].position._z;
            }
            this.point1.x=xx/aaa.length
            this.point1.y=yy/aaa.length
            this.point1.z=zz/aaa.length

            dddZ=0
            for (ii = 0; ii < aaa.length; ii++) {
                dddZ+=aaa[ii].position._z-minZ
            }
            this.point2.x=0
            this.point2.y=0
            this.point2.z=0
            for (ii = 0; ii < aaa.length; ii++) {
                pro=(aaa[ii].position._z-minZ)/dddZ
                this.point2.x+=aaa[ii].position._x*pro
                this.point2.y+=aaa[ii].position._y*pro
                this.point2.z+=aaa[ii].position._z*pro
            }

            rottt=calc.getAngle(this.point1,this.point2)-Math.PI/2;
            if(isNaN(rottt)==false){                
                this.rotation=calc.getAngle(this.point1,this.point2)+Math.PI/2
                dd2=Math.sqrt(Math.pow((this.point1.x - this.point2.x), 2) + Math.pow((this.point1.y - this.point2.y), 2))
                dd3=Math.sqrt(Math.pow((this.point1.x - this.point2.x), 2) + Math.pow((this.point1.y - this.point2.y), 2)+ Math.pow((this.point1.z - this.point2.z), 2))                   
                this.scale=dd2/dd3

               
            }else{
                this.rotation=0
                this.scale=1
            }

            

            
                    
        }


    
        var a, b, c, f, h, m, o, s;
        function calcRoofPointHeight(p0, p1, p2, tp) {            
            // определим третью координату наших точек плоскости - высоту
            a = tp.position._x - p0.position._x; // 
            b = tp.position._y - p0.position._y;
            c = p1.position._x - p0.position._x;
            f = p1.position._y - p0.position._y;
            h = p1.position._z - p0.position._z;
            m = p2.position._x - p0.position._x;
            o = p2.position._y - p0.position._y;
            s = p2.position._z - p0.position._z; 
            return (c * b * s + a * h * o - a * f * s - b * h * m) / (c * o - m * f) + p0.position._z;
        }


        var zz,b
        this.doD1 = function () {
            
          
            if(this.par.array.length>=3){
                if(this.arrBla.length==0)this.getTri()

                for (var i = 0; i < this.par.array.length; i++) {
                   
                    b=true
                    for (var j = 0; j < this.arrBla.length; j++) {
                        if(this.arrBla[j].uuid==this.par.array[i].uuid){
                            j=999
                            b=false
                        }
                    }

                    if(b){
                        zz=calcRoofPointHeight(this.arrBla[0],this.arrBla[1],this.arrBla[2],this.par.array[i])
                        this.par.array[i].position._z=zz 
                    }
                    
            
                }
            }
            this.korektRotScal();
        }



        this.draw1 = function () {
            this.point.x=this.triangulateShape.centerShape.x*1;            
            this.point.y=this.triangulateShape.centerShape.y*1;
            


            this.draw2d();           

            this.par._delph=this._delph;

            //this.cont3d.position.z=-this.par._height1
            //this.cont3dL.position.z=-this.par._height1

            this.cont3d.visible=this.par.par._boolMax;
            this.cont3dL.visible=!this.par.par._boolMax;
            if(this.par.par._boolMax==true){                
                this.drawBig();
                //this.drawLittel();
            }else{
                this.drawLittel();
                this.par.par.addObjFun1(this.par);
            }
        }


        var tt
        this.draw2dStrelka = function (g,t,d,o) { 

            if(o==undefined)o=t
            tt=o/2+o

            g.moveTo(0,d/2)
            g.lineTo(tt,d/2-tt)
            g.lineTo(t/2,d/2-tt)
            g.lineTo(t/2,-d/2)
            g.lineTo(-t/2,-d/2)
            g.lineTo(-t/2,d/2-tt)
            g.lineTo(-tt,d/2-tt)
            g.lineTo(0,d/2)
            g.endFill()
        }

        this.grap.beginFill(0xffffff, 1);         
        this.draw2dStrelka(this.grap,1,100,4)
        this.grap1.alpha=0.25





        this.kol=0
        this.arrPoint=[];
        this.drawLittel = function () { 
            
            if(this.par.array.length>=2){
                this.matLW.drag()
       


                this.par.ssP3d.lineSegments.visible = true;
                this.par.ssP3d.planeXZ.clearPoint()
                this.kolPointDrag(); 
                //this.kol=  this.arrPoint.length             
                for (var i = 0; i < this.kol; i++) {                    
                    if(i!=this.kol-1){
                        this.par.ssP3d.planeXZ.addLine(this.arrPoint[i],this.arrPoint[i+1]);
                    }else{
                        this.par.ssP3d.planeXZ.addLine(this.arrPoint[i],this.arrPoint[0]);
                    }
                }
                this.par.ssP3d.planeXZ.upDate()
            }else{
                this.par.ssP3d.lineSegments.visible=false;
            }
        }

        this.drawBig = function () { 
            this.korZZZZ(); 
            this.graniXZ.upData(this.par.array);
            this.updateMesh(); 
            this.updateMesh1(); 
        }


        function calcRoofPointHeight2(p0, p1, p2, tp) {            
            // определим третью координату наших точек плоскости - высоту
            a = tp.x - p0.position._x; // 
            b = tp.y - p0.position._y;
            c = p1.position._x - p0.position._x;
            f = p1.position._y - p0.position._y;
            h = p1.position._z - p0.position._z;
            m = p2.position._x - p0.position._x;
            o = p2.position._y - p0.position._y;
            s = p2.position._z - p0.position._z; 
            return (c * b * s + a * h * o - a * f * s - b * h * m) / (c * o - m * f) + p0.position._z;
        }

        var vectV=new THREE.Vector3(0,0,1)
        var vectN=new THREE.Vector3(0,0,-1)
        var vectB=new THREE.Vector3(0,1,0)
        var rnd
        var _zzz


        this.korZZZZ= function (tri,zz, bool) {
            for (var i = 0; i < this.triangulateShape.lTri; i++) {
                this.korZZZZ2(this.triangulateShape.aTri[i], 0,true)
            }
        }
        this.korZZZZ2= function (tri) {
            if(this.arrBla.length==3){
                _zzz=calcRoofPointHeight2(this.arrBla[0],this.arrBla[1],this.arrBla[2],tri.p)
                tri.p.z=-_zzz 
                _zzz=calcRoofPointHeight2(this.arrBla[0],this.arrBla[1],this.arrBla[2],tri.p1)
                tri.p1.z=-_zzz 
                _zzz=calcRoofPointHeight2(this.arrBla[0],this.arrBla[1],this.arrBla[2],tri.p2)
                tri.p2.z=-_zzz 
            }
        }


        
        //this.arrBla


        this.arrColor=[0xff0000,0x00ff00,0x0000ff]; 
        var pp
        this.dragPointAct=function(b){
            if(b){
                for (var i = 0; i < this.par.array.length; i++) {
                    pp=-1;
                    for (var j = 0; j < this.arrBla.length; j++) {
                        if(this.par.array[i].uuid===this.arrBla[j].uuid){
                            pp=j;
                            break
                        }
                    }
                    if(pp==-1){
                        this.par.array[i].button.colorXZ=null;
                    }else{
                        this.par.array[i].button.colorXZ= this.arrColor[pp];
                    }                    
                }
            }else{
                for (var i = 0; i < this.par.array.length; i++) {
                    this.par.array[i].button.colorXZ=null
                } 
            }
            
        }




        this.postActive=function(){
            this.grap.clear()
            if(this._active==true){
                this.grap1.alpha=0.75
                this.grap.beginFill(0xffffff, 1);         
                this.draw2dStrelka(this.grap,10,100)
                this.grap.beginFill(0x008cba, 1);         
                this.draw2dStrelka(this.grap,8,100-2)

                this.dragPointAct(true);

            }else{
                this.grap.beginFill(0xffffff, 1);         
                this.draw2dStrelka(this.grap,1,100,4)
                this.grap1.alpha=0.25

                this.dragPointAct();
            }
        }

        var pOld
        this.startOporPoint=function(num){  
            self.arrBla[num].button.colorXZ=null
            pOld=self.arrBla[num];

        

            for (var i = 0; i < this.par.array.length; i++) {
                if(this.par.array[i].button.colorXZ!=null){
                    this.par.array[i].animat(500);
                }                
            }

            p20.par.menu.mDragScane.sobIndex[0].funDinReturn=this.funDinRPint;
            //self.draw2dAP(); 
        }

        var ppp
        this.funDinRPint=function(s,p,e){ 
            if(s=="downVP"){ 
                ppp=null 

                for (var i = 0; i < self.par.array.length; i++) {                    
                    if(self.par.array[i].button.colorXZ==null){
                        if(self.par.array[i].uuid==p.uuid){
                            ppp=self.par.array[i];
                            break;
                        }                        
                    }
                }

                if(ppp!==null){
                    for (var i = 0; i < self.arrBla.length; i++) {
                        if(self.arrBla[i].uuid==pOld.uuid){
                            self.arrBla.splice(i,1,ppp);                            
                            self.postActive(true);
                            break;
                        }
                    }
                    self.aPUuid.length=0;
                    apd.length=0;
                    for (var i = 0; i < self.arrBla.length; i++) {
                        apd[i]=self.aPUuid[i]=self.arrBla[i].uuid;
                    }                  
                } else{
                    self.postActive(true);
                }               
            }

            p20.par.menu.mDragScane.sobIndex[0].funDinReturn=undefined;         

            setTimeout(function() {
                p20.par.menu.mObject.setObject(self.par)
                self.par.draw1(); 
                p20.render();
            }, 10);            
            self.drawBig();                  
            p20.render();
            
        }



        this.funDinReturn=function(s,p,e){            
            if(s=="downVP"){                
                for (var i = 0; i < apd.length; i++) {
                    if(apd[i]==p.uuid){
                        p20.par.menu.setMessage("Уже внесли в список", "То есть мы уже тыкали по этой кнопке")
                        return true;
                    }
                }
                

                for (var i = 0; i < self.par.array.length; i++) {                    
                    if(self.par.array[i].uuid==p.uuid){                        
                        apd.push(p.uuid)
                        self.draw2dAP(); 
                        if(apd.length==3){
                            self.stopOpor()
                        }
                        return true;
                    }
                }
                p20.par.menu.setMessage("Не эта точка не катит", "Надо тыкнуть по трем точкам на ВЫБРОНОЙ крыше")                
                return true
            }
            p20.par.menu.setMessage("Не попали по точкам", "Надо тыкнуть по трем точкам на выбраной крыше")

            return true
        }

        this.boolOp=false
        this.stopOpor=function(){  
            this.boolOp=false
            for (var i = 0; i < apd.length; i++) {
                this.aPUuid[i]=apd[i];
            }
            p20.par.menu.mDragScane.sobIndex[0].funDinReturn=undefined;
            this.getTri(); 
            this.draw2d(); 
            if(this.par.funDragMenu!=undefined){
                this.par.funDragMenu()
            }   
            this.grap2.clear()        
            p20.render();


        }

        this.aPUuid=[]
        this.aPUuidOld=[]
        var apd=[]

        this.startOpor=function(){
            this.boolOp=true

            for (var i = 0; i < this.aPUuid.length; i++) {
                this.aPUuidOld[i]=this.aPUuid[i];
            }

            this.aPUuid.length=0
            apd.length=0
            p20.par.menu.mDragScane.sobIndex[0].funDinReturn=this.funDinReturn;
            for (var i = 0; i < this.par.array.length; i++) {
                this.par.array[i].animat(500);
            }
            self.draw2dAP(); 

        }



        











        this.getObj=function(){
            var o={}
            o.aPUuid=this.aPUuid;
            if(this.par.gateauObj[this.keyG].uuid!==this.uuidDin){                
                o.gateau=p20Gateau.getSaveObj(this.objDin)
            }
            return o
        }    

        this.setObj=function(o){
            if(o==undefined)return

            if(o.aPUuid)if(o.aPUuid.length==3){
                this.aPUuid=o.aPUuid;
                this.getTri(); 
                this.draw2d();
                  
            }  

            if(o.gateau!=undefined){
                p20Gateau.korektGateau(o.gateau)  
                this.setColorNova(this.keyG,o.gateau, true)               
            }

            this.matLW.drag();

          
        }

	}


    set scale(value) { 
        if(this._scale!=value) {
            this._scale= value;  
            this.par.hhh = value;        
        }     
        
    }    
    get scale() { return  this._scale;}


    set rotation(value) { 
        if(this._rotation!=value) {
            this._rotation= value;
            this.par.rrr=this._rotation
            this.grap.rotation=this._rotation//*Math.PI/180
        }     
        
    }    
    get rotation() { return  this._rotation;}


    set material(value) {        
        this._material= value;
        this.mesh3d.material=this._material;
    }    
    get material() { return  this._material;}

    set material1(value) {        
        this._material1= value;
        this.mesh3d1.material=this._material1;
    }    
    get material1() { return  this._material1;}

}