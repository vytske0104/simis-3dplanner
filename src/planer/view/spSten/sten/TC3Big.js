

import { TLabel } from '../../../../t3d/TStyle.js';
import { TComp3But2} from './TComp3But2.js';
export class TC3Big {
	constructor(par, fun) {
		this.type="TC3Big";
        var self=this;
       	this.par=par
        this.fun=fun;
        this._mastYmn=1.5
        this._mast=this.par._mast
        this._visible=false;
   		this.content3d=new THREE.Object3D();
        this.par.content3d.add(this.content3d);        
        this.content3d.visible=this._visible;
        

        this.cont3d = new THREE.Object3D();
        this.content3d.add(this.cont3d);

        this.cont3d1 = new THREE.Object3D();
        this.cont3d.add(this.cont3d1);          
        this.cont3d1.objGlob=this;

        this.cont3d2 = new THREE.Object3D();
        this.cont3d.add(this.cont3d2); 

        this.mesh=new THREE.Mesh(this.par.boxGeometry,window.pm.matDop.getIDObj(7))
        //this.par.content3dBox.add(this.mesh)
        this.mesh.layers.set(31);    
        this.par.content3dBox.add(this.mesh)


        this.metoduRofa=new MetoduRofa(this);
        this.metoduStan=new MetoduStan(this);


        this.rectSten={x:0,x1:0,x2:0,y:0,y1:0,y2:0,w:0,h:0};
		
        this.tComp3But2=new TComp3But2(this.cont3d1,function(s,p){
          
        },this.par.cylinderGeometry, this.par.coneGeometry,window.pm.matDop.getIDObj(6),window.pm.matDop.getIDObj(7))
        
        this.tComp3But2.scale=30*this._mast;
        this.tComp3But2.gronPoint=this

        this._mast=this.par._mast
        this._fontSize=14

        this.tLabel=new TLabel(this.cont3d2,10,0,"-");
        this.tLabel1=new TLabel(this.cont3d2,10,0,"-");
        this.tLabel.fontSize=this._fontSize*this.par._mast
        this.tLabel1.fontSize=this._fontSize*this.par._mast
        this.tLabel1.cont3d.rotation.x=-Math.PI/2
        this.tLabel.cont3d.rotation.x=-Math.PI/2

        //при начале драга записываем проценты точек
        this.bool0=false
        this.startDrag = function () {
            this.dragRect();
            this.bool0=false 
            if(this.rectSten.d>0) this.bool0=true 
            for (var i = 0; i < this.par.arrSplice.length; i++) {
                if(this.par.arrSplice[i].life==true){
                    for (var j = 0; j < this.par.arrSplice[i].sVephPoint.array.length; j++) {
                        
                        if(!this.bool0){
                            this.par.arrSplice[i].sVephPoint.array[j].point.pz=0;
                            this.par.arrSplice[i].sVephPoint.array[j].point.pz1=0;
                            continue;
                        }
                        let pz=(this.par.arrSplice[i].sVephPoint.array[j].point.y-this.rectSten.z)/this.rectSten.d
                        if(isNaN(pz)==true)pz=0;
                        this.par.arrSplice[i].sVephPoint.array[j].point.pz=pz;

                        let pz1=(this.par.arrSplice[i].sVephPoint.array[j].point1.y-this.rectSten.z)/this.rectSten.d
                        if(isNaN(pz1)==true)pz1=0;
                        this.par.arrSplice[i].sVephPoint.array[j].point.pz1=pz1;
                        
                    }
                }
            }
            
        }

        this.moveDrag = function (z,idArr) {
            if(idArr==0){
                let zz=z
                if(zz<25)zz=25
                this.tComp3But2.arrButton[1].z=zz+this.rectSten.d;
                this.tComp3But2.arrButton[2].z=zz; 
                this.moveDrag2()                
            }
            

            if(idArr==1 || idArr==2){
                if(this.bool0==false){
                    this.tComp3But2.arrButton[1].z=z;
                    this.tComp3But2.arrButton[2].z=z;
                    this.moveDrag2();
                }else{
                    let zz=z
                    if(idArr==1){
                        if(zz<this.tComp3But2.arrButton[2].z)zz=this.tComp3But2.arrButton[2].z
                        if(zz>9999)zz=9999;
                        this.tComp3But2.arrButton[1].z=zz;
                    }
                    if(idArr==2){
                        if(zz>this.tComp3But2.arrButton[1].z)zz=this.tComp3But2.arrButton[1].z;
                        if(zz<25)zz=25;
                        this.tComp3But2.arrButton[2].z=zz;    
                    }
                    this.moveDrag2();
                }
            }            
        }

        this.moveDrag2 = function () {
            let pp
            if(this.bool0==false){
                for (var i = 0; i < this.par.arrSplice.length; i++) {
                    if(this.par.arrSplice[i].life==true){
                        for (var j = 0; j < this.par.arrSplice[i].sVephPoint.array.length; j++) {
                            pp=this.par.arrSplice[i].sVephPoint.array[j]
                            pp.tComp3But.button.z=this.tComp3But2.arrButton[1].z;
                            pp.tComp3But.button1.z=this.tComp3But2.arrButton[1].z;
                            pp.tComp3But.button2.z=this.tComp3But2.arrButton[1].z;
                            pp.drag()
                        }
                    }
                }
            }else{
                let dd=this.tComp3But2.arrButton[1].z-this.tComp3But2.arrButton[2].z

                for (var i = 0; i < this.par.arrSplice.length; i++) {
                    if(this.par.arrSplice[i].life==true){
                        for (var j = 0; j < this.par.arrSplice[i].sVephPoint.array.length; j++) {
                            pp=this.par.arrSplice[i].sVephPoint.array[j]
                            let pz=pp.point.pz*dd+this.tComp3But2.arrButton[2].z;
                            let pz1=pp.point.pz1*dd+this.tComp3But2.arrButton[2].z;
                           // pp.tComp3But.button.z=this.tComp3But2.arrButton[1].z;
                            let pzz=pz
                            if(pz1>pzz)pzz=pz1
                            pp.tComp3But.button.z=pzz;    
                            pp.tComp3But.button1.z=pz;
                            pp.tComp3But.button2.z=pz1;
                            pp.drag()
                        }
                    }
                }
            }

            for (var i = 0; i < this.par.arrSplice.length; i++) {
                if(this.par.arrSplice[i].life==true){
                    this.par.arrSplice[i].par.addObjFun(this.par.arrSplice[i])
                }
            }


            this.moveDrag3();
        }

        this.moveDrag3 = function () {
            this.tLabel.cont3d.position.z=-this.tComp3But2.arrButton[2].z;
            this.tLabel1.cont3d.position.z=-this.tComp3But2.arrButton[1].z-15;
            
            let t=""+Math.round(this.tComp3But2.arrButton[2].z)
            let t1=""+Math.round(this.tComp3But2.arrButton[1].z)

            this.tLabel1.text=t1
            if(t==t1){
                this.tLabel.cont3d.visible=false;
            }else{
                this.tLabel.cont3d.visible=true;
                this.tLabel.text=t
            }
            
            this.par.osiPoint.dragOsi()
        }

        this.fun_rotationZ = function () {
            this.content3d.rotation.z=visi3D.rotationZ;
            
        }

        this.drag=function(){        	
            this.dragRect();

            this.tComp3But2.button1.z=this.rectSten.z1;
            this.tComp3But2.button2.z=this.rectSten.z;

            this.content3d.position.x=this.rectSten.x2;
            this.content3d.position.y=this.rectSten.y2;

            let wh=this.rectSten.w/2;
            if(wh<this.rectSten.h/2)wh=this.rectSten.h/2;
            wh+=100;

            this.cont3d.position.x = wh+155; 
            this.moveDrag3()
            ////////////////////
            
            let whd=60
            this.mesh.position.x=this.rectSten.x2;
            this.mesh.position.y=this.rectSten.y2;
            this.mesh.position.z=-this.rectSten.z1/2;
            this.mesh.scale.set(200,200,200)
            this.mesh.scale.set(this.rectSten.w+whd,this.rectSten.h+whd,this.rectSten.z1+whd)
            /////////////////////
        }	

        this.dragRXYZmin=function(r){ 
            r.x=999.999999999999;
            r.x1=-999999999999999;
            r.y=999999999999999;
            r.y1=-999999999999999;

            r.z=999999999999999;
            r.z1=-999999999999999;
            r.d=0;
        }
        this.dragRWHD=function(r){ 
            r.w=r.x1-r.x;
            r.x2=r.x+r.w/2;
            r.h=r.y1-r.y;
            r.y2=r.y+r.h/2;            
            r.d=r.z1-r.z;  
        }


        this.dragRect=function(){
            this.dragRXYZmin(this.rectSten) 
            for (var i = 0; i < this.par.arrSplice.length; i++) {
                if(this.par.arrSplice[i].life==true){

                    if(this.rectSten.x>this.par.arrSplice[i]._addPoint.position._x)this.rectSten.x=this.par.arrSplice[i]._addPoint.position._x
                    if(this.rectSten.x1<this.par.arrSplice[i]._addPoint.position._x)this.rectSten.x1=this.par.arrSplice[i]._addPoint.position._x                   
                
                    if(this.rectSten.y>this.par.arrSplice[i]._addPoint.position._y)this.rectSten.y=this.par.arrSplice[i]._addPoint.position._y
                    if(this.rectSten.y1<this.par.arrSplice[i]._addPoint.position._y)this.rectSten.y1=this.par.arrSplice[i]._addPoint.position._y                   
                    
                    for (var j = 0; j < this.par.arrSplice[i].sVephPoint.array.length; j++) {
                        if(this.rectSten.z > this.par.arrSplice[i].sVephPoint.array[j].point.y)this.rectSten.z = this.par.arrSplice[i].sVephPoint.array[j].point.y
                        if(this.rectSten.z1 < this.par.arrSplice[i].sVephPoint.array[j].point.y)this.rectSten.z1 = this.par.arrSplice[i].sVephPoint.array[j].point.y                       
                    
                        if(this.rectSten.z > this.par.arrSplice[i].sVephPoint.array[j].point1.y)this.rectSten.z = this.par.arrSplice[i].sVephPoint.array[j].point1.y
                        if(this.rectSten.z1 < this.par.arrSplice[i].sVephPoint.array[j].point1.y)this.rectSten.z1 = this.par.arrSplice[i].sVephPoint.array[j].point1.y                       
                        
                    }   


                }
            }
            this.dragRWHD(this.rectSten)
        } 




        ///////////////////////////////////////////////////////////
        ///////////////////////////////////////////////////////////
        this.korectLineRoof=function(bool, arr){            
            this.metoduRofa.korectLineRoof(bool, arr);
            this.par.osiPoint.redrag();
        }

        this.redragRect=function(angel, arr){            
            this.metoduStan.redragRect(angel, arr)
        }



        this.setRect=function(rect){
            this.metoduStan.setRect(rect)
        }

        this.setMinMax=function(min,max, bool, arr){
            this.metoduRofa.setMinMax(min,max, bool, arr)
        }
        
	}
    set mast(v) {        
        if(this._mast!=v){ 
            this._mast=v;                      
            this.tLabel.fontSize=this._fontSize*this.par._mast*facade._mastYmn
            this.tLabel1.fontSize=this._fontSize*this.par._mast*facade._mastYmn
            this.tComp3But2.scale=30*this._mast;
            this.tLabel.x=10*this.par._mast*facade._mastYmn
            this.tLabel1.x=10*this.par._mast*facade._mastYmn

        }       
    }   
    get mast() { return  this._mast;}

	set visible(v) {        
        if(this._visible!=v){ 
            this._visible=v;
            this.content3d.visible=v; 
            this.drag()
            if(v)visi3D.event3DArr.addChild(this.cont3d1);
            else visi3D.event3DArr.removeChild(this.cont3d1);

        }       
    }   
    get visible() { return  this._visible;}

	set life(v) {        
        if(this._life!=v){ 
            this._life=v;            
           	if(this._life){
           		this.c3d.add(this.content3d);
           	} else{
           		this.c3d.remove(this.content3d);
           	}     
        }       
    }   
    get life() { return  this._life;}

}

export class TCBut {
	constructor(par, gB, mat, mat1, tip) {
		this.type="TCBut";
        var self=this;
        this.notZbros=false
        this._z=0;
        this._active=false;
        this.tip=tip;

        this.par=par;
        this.gB=gB;
        this.mat=mat;
        this.mat1=mat1;

        this.content3d=new THREE.Object3D();
        this.par.content3d.add(this.content3d); 

        this.content3d1=new THREE.Object3D();
        this.content3d.add(this.content3d1);


        this.mesh=new THREE.Mesh(gB, mat);//центр
        
		this.content3d1.add(this.mesh);
        this.mesh.button=this;

        
        this.dist=52 
        this.s2=0.1

		this.drag=function(){
            if(tip==0){

            }else{
                this.content3d.position.z=-this._z; //- this.par._otstupZ;
                this.par.dragO()  
            }       	
        	     
        }

        this.dragScale=function(){            

            if(tip==0){
                this.mesh.rotation.x=-Math.PI/2;           
                this.mesh.scale.set(this._scale*this.s2,this.dist,this._scale*this.s2)
                this.mesh.position.z=this.dist/2-this.par.button2._z;
            }

            if(tip==1){
                this.mesh.rotation.x=-Math.PI/2; 
          
                this.mesh.position.z=-this._scale/2;
                this.mesh.scale.set(this._scale,this._scale,this._scale)
            }
            if(tip==2){
                this.mesh.rotation.x=Math.PI/2; 
               
                this.mesh.position.z=this._scale/2;
                this.mesh.scale.set(this._scale,this._scale,this._scale)
            }

        }  



    }





    set active(v) {        
        if(this._active!=v){ 
            if(this.notZbros==true) v=true
            this._active=v;
            
            if(this._active==false){
                this.mesh.material = this.mat
            }else{
                this.mesh.material = this.mat1
            } 
            visi3D.intRend=1;   
        }       
    }   
    get active() { return  this._active;} 


    set z(v) {        
        if(this._z!=v){ 
            this._z=v; 
            this.content3d.position.z=-this._z-this.par._otstupZ;
        
           	this.drag();     
        }       
    }   
    get z() { return  this._z;}

    set scale(v) {        
        if(this._scale!=v){ 
            this._scale=v; 
           
        
            this.dragScale();     
        }       
    }   
    get scale() { return  this._scale;}    

}






export class MetoduStan {
    constructor(par) {
        this.type="MetoduStan";
        var self=this;
        this.par=par;

        var pointStart;
        var point;
        var point1;
        var pointDin;

        var ppp={x:0,y:0}
        var pppNull={x:0,y:0}
        var d,a
        this.rectSten=this.par.rectSten;
        this.redragRect=function(angle, arr){  
            this.par.dragRect()
            this.rectSten=this.par.rectSten;
            this.par.par.clear();
            var sp=this.par.par;
            var _sx=this.rectSten.w/100;
            var _sy=this.rectSten.h/100;
            this.polDin=sp.craetPol();

            for (var i = 0; i < arr.length; i+=2) {
                pointDin=sp.craetPoint();

                ppp.x=arr[i]*_sx;
                ppp.y=arr[i+1]*_sy;

                d=calc.getDistance(pppNull,ppp);
                a=calc.getAngle(pppNull,ppp);
                calc.getVector(d,a+angle,ppp);

                

                ppp.x+=this.rectSten.x2;
                ppp.y+=this.rectSten.y2;

                pointDin.position.x= ppp.x;
                pointDin.position.y= ppp.y;             
                if(i==0){
                    pointStart=pointDin
                    this.polDin.addPoint(pointDin);
                }else{
                    point=pointDin;
                    let sten=sp.craetSplice1();
                    point.addSplice(sten, false);
                    point1.addSplice(sten, true);

                    this.polDin.addPoint(point);

                }
                point1=pointDin;
            }
            let sten=sp.craetSplice1();
            pointStart.addSplice(sten, false);
            point1.addSplice(sten, true);
            visi3D.intRend=1; 
        }

        this.setRect=function(rect){  
            this.par.dragRect()
            this.rectSten=this.par.rectSten;           
            let sw=rect.width/this.rectSten.w
            let sh=rect.height/this.rectSten.h
            var sp=this.par.par;
            
            for (var i = 0; i < sp.arrPoint.length; i++) {
                if(sp.arrPoint[i].life==false)continue
                sp.arrPoint[i].position.set(
                    sp.arrPoint[i].position.x*sw,
                    sp.arrPoint[i].position.y*sh
                )    
            }

            this.rectSten=this.par.rectSten;
            let sx=this.rectSten.x-rect.x;
            let sy=this.rectSten.y-rect.y;

            for (var i = 0; i < sp.arrPoint.length; i++) {
                if(sp.arrPoint[i].life==false)continue
                sp.arrPoint[i].position.set(
                    sp.arrPoint[i].position.x-sx,
                    sp.arrPoint[i].position.y-sy
                )    
            }            
        }   

    }
}











export class MetoduRofa {
    constructor(par) {
        this.type="MetoduRofa";
        var self=this;
        this.par=par

        var minZ,maxZ,hhhZ; 

        this.rectSten=this.par.rectSten
        this.arrSplice=this.par.par.arrSplice

        this.korectLineRoof=function(bool, arr){            
            this.par.dragRect()
            this.rectSten=this.par.rectSten
            this.clearPoint2()
            if(this.rectSten.d==0){
                minZ=this.rectSten.z-50;
                if(minZ<25)minZ=25;
                maxZ=minZ+100;    
            }else{
                minZ=this.rectSten.z;
                maxZ=this.rectSten.z1;
            }
            hhhZ=maxZ-minZ            
            this.cratePoint2(bool, arr)//докидуем точки по осям
            this.korectXY();
            this.korectZ(bool, arr)
        }

        this.setMinMax=function(min, max, bool, arr){  
            trace("setMinMax==",min, max)

            this.par.dragRect()
            this.rectSten=this.par.rectSten
            this.clearPoint2()
            
            minZ=min;
            maxZ=max;
            
            hhhZ=maxZ-minZ            
            this.cratePoint2(bool, arr)//докидуем точки по осям
            this.korectXY();
            this.korectZ(bool, arr)

        }
       
        var ppp,p1,zz,zz1
        this.korectZ=function(bool, arr){
            for (var i = 0; i < this.arrSplice.length; i++) {
                if(this.arrSplice[i].life==true){  
                    let nn= this.arrSplice[i].sVephPoint.array.length-1;                                   
                    for (var j = 0; j < nn; j++) { 
                        ppp=this.arrSplice[i].sVephPoint.array[j].posit
                        
                        if(bool==false){//поднимаем по X
                            p1=(ppp.x-this.rectSten.x)/this.rectSten.w
                        }else{
                            p1=(ppp.y-this.rectSten.y)/this.rectSten.h
                        }

                        zz=this.getZ(p1,arr)
                        zz1=minZ+hhhZ*zz;
                        this.arrSplice[i].sVephPoint.array[j].setZZ(zz1)
                    }
                    this.par.par.addObjFun(this.arrSplice[i])
                }
            }
        }


        //возвращаем по проценту, процент подьема
        var uu,uu1,uu2,uu3,uu4,yy,yy1,yy2
        this.getZ=function(n, arr){
            for (var i = 2; i < arr.length; i+=2) {
                uu=arr[i-2]/100;
                uu1=arr[i]/100;
                yy=arr[i-1];
                yy1=arr[i+1];
                yy2=yy1-yy;
                if(n>=uu){                    
                    if(n<=uu1){
                        uu2=uu1-uu;//длина промежутка процента
                        uu3=(n-uu)/uu2//процет между точками
                        uu4=yy2*uu3+yy                        
                        return uu4/100;                       
                    }
                }   
            }
            return 0
        }


        //коректируем позиции х.у для точек
        this.korectXY=function(){
            for (var i = 0; i < this.arrSplice.length; i++) {
                if(this.arrSplice[i].life==true){  
                    let nn= this.arrSplice[i].sVephPoint.array.length-1;                                   
                    for (var j = 0; j < nn; j++) {                        
                        this.arrSplice[i].sVephPoint.array[j].korectXY()
                    }
                }
            }
        }


        this.clearPoint2=function(){
            for (var i = 0; i < this.arrSplice.length; i++) {
                if(this.arrSplice[i].life==true){ 
                    let nn= this.arrSplice[i].sVephPoint.array.length-2;
                    
                    for (var j = nn; j >= 1; j--) {  
                        this.arrSplice[i].sVephPoint.array[j].kill()
                        //this.arrSplice[i].sVephPoint.removeGP(this.arrSplice[i].sVephPoint.array[j])
                        //this.arrSplice[i].sVephPoint.array.splice(j,1);                        
                    }
                }
            }
        }

        var poi={x:0,y:0} 
        var poi1={x:0,y:0}
        var rez,dis,dis1,ppm
        this.cratePoint2=function(b, arr){
            for (var j = 2; j < arr.length-2; j+=2) {                
                if(b==false){
                    poi.y=99999999;
                    poi1.y=-99999999;
                    poi.x=this.rectSten.x+(this.rectSten.w)*arr[j]/100;                
                    poi1.x=poi.x;
                }else{
                    poi.x=99999999;
                    poi1.x=-99999999;
                    poi.y=this.rectSten.y+(this.rectSten.h)*arr[j]/100;                
                    poi1.y=poi.y;
                }                
                for (var i = 0; i < this.arrSplice.length; i++) {
                    if(this.arrSplice[i].life==true){ 
                        rez=calc.getPointOfIntersection(poi,poi1,this.arrSplice[i]._addPoint.position,this.arrSplice[i]._addPoint1.position)
                        
                        if(rez){
                            
                            dis=calc.getDistance(this.arrSplice[i]._addPoint.position, rez)
                            dis1=calc.getDistance(this.arrSplice[i]._addPoint.position, this.arrSplice[i]._addPoint1.position)
                            ppm=dis/dis1
                            
                            let _gp=this.arrSplice[i].sVephPoint.getPoint();
                            _gp.prosent=ppm;
                            _gp.drag()

                            this.arrSplice[i].sVephPoint.array.splice(1,0,_gp);
                            this.arrSplice[i].sVephPoint.addGP(_gp);

                        }
                    }
                }                
            }
        }


    }
}


       