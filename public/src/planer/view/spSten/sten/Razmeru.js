
import { TCompArrow } from './TCompArrow.js';

///Размеры внизу стенки
export class Razmeru {
	constructor(par, fun) {
		this.type="Razmeru";
        var self=this;
       	this.par=par
        this.fun=fun;
        this._mast = par._mast;
        this._razVisi = par.par.razVisi;
        
   		this.content3d=new THREE.Object3D();
        this.par.content3d.add(this.content3d);        
        this.content3d.visible=this._razVisi;
       
        this.otstup=30;

        this.content3d.position.y=-this.par.delph/2
        if(par.par.param.mobile==true){
            this.content3d.position.z=-10
        }
        
        
        this._boolWindow=par.par.razWindow;//показывать размеры окно


        var mm=window.pm.matDop.getIDObj(24)
        this.array=[];
        this.get=function(){
            for (var i = 0; i < this.array.length; i++) {
                if(this.array[i].life==false){
                    this.array[i].life = true
                    return this.array[i]
                }
            }

            let o=new TCompArrow(this.content3d,function(s,p){

            },null,
            mm, 
            mm, 
            mm,
            mm,
            mm,
            );
            

           /* o.activeButton=true;*/
            o.sten=this.par;
            o.zdvih=-20;   
            o.bDurka=false;
            o.bVerh=false
            o.bRotation=true;
            //o.radius=5;
            o.mast=this._mast*facade._mastYmn;

            
            o.idArr=this.array.length;
            this.array.push(o)
            return o;
        }


        this.clear=function(){
            for (var i = 0; i < this.array.length; i++) {
                this.array[i].life=false;
            }
        }



        this.sss=function(a,b){
            return a-b
        }

        this.dA=function(a){
            for (var i = 0; i < a.length; i++) {
                a[i]=Math.round(a[i]*100)/100
            }
            for (var i = 0; i < a.length; i++) {
                for (var j = a.length - 1; j > i; j--) {
                    if(a[i]==a[j]){
                        a.splice(j,1)
                    }
                }
            }
            a.sort(this.sss)           
        }

        var arrp=[]
        this.xx=0;
        this.xx1=0;
        this.dist=0;
        var x,x1,dist,d,tt;
        this.aaD=[]
        this.aaY1=[]
        this.aaX1=[]
        this.draw=function(){
            this.aaD.length=0
            this.aaY1.length=0
            this.aaX1.length=0
            if(this._razVisi==false){
                this.clear();

                x= this.par.arrPosit[5]._x;
                x1= this.par.arrPosit1[0]._x;
                dist= this.par._distans+x1+x;

                
                tt= this.get();
                tt.content3d.position.x=-x;
                tt.distans=dist; 
                return
            }

            this.clear();
                         
            x= this.par.arrPosit[5]._x;
            x1= this.par.arrPosit1[0]._x;
            dist= this.par._distans+x1+x;

            this.xx=x;
            this.xx1=x1;
            this.dist=dist;

            this.content3d.position.x=-x; 
            

            //if(this.par.idArr==0){
                if(this.par.sVephPoint.array.length>=2){
                    

                    //arrp.push(this.par.sVephPoint.array[i].point.x+this.xx)
                    this.aaY1.push(this.par.sVephPoint.array[0].posit.z)
                    this.aaX1.push(0);

                    for (var i = this.par.sVephPoint.array.length - 1; i >= 0; i--) { 
                        if(this.par.sVephPoint.array[i].point.x!=0){

                            this.aaX1.push(this.par.sVephPoint.array[i].point.x+this.xx)
                            this.aaY1.push(this.par.sVephPoint.array[i].posit.z)
                        }
                    }
                    this.aaX1.push(this.dist)
                    this.aaY1.push(this.par.sVephPoint.array[this.par.sVephPoint.array.length - 1].posit.z)


                }
            //}




            if(this._boolWindow==false){
                arrp.length=0;
                arrp.push(0,dist);
                for (var i = this.par.sVephPoint.array.length - 1; i >= 0; i--) { 
                    if(this.par.sVephPoint.array[i].point.x!=0)
                        arrp.push(this.par.sVephPoint.array[i].point.x+this.xx)
                }

                this.dA(arrp);
                for (var i = 0; i < arrp.length-1; i++) {
                    d=arrp[i+1]-arrp[i];
                    tt= this.get();
                    tt.content3d.position.x=arrp[i];
                    tt.distans=d;  
                }
                 
            }else{
                arrp.length=0;
                arrp.push(0,dist);
                for (var i = this.par.windows.arrBlok.length - 1; i >= 0; i--) { 
                    arrp.push(this.par.windows.arrBlok[i].boxColizi.rectCollisMeshdy._x+x)
                    arrp.push(this.par.windows.arrBlok[i].boxColizi.rectCollisMeshdy._x+this.par.windows.arrBlok[i].boxColizi.rectCollisMeshdy.width+x)
                }
                this.dA(arrp);
                for (var i = 0; i < arrp.length-1; i++) {
                    d=arrp[i+1]-arrp[i];
                    tt= this.get();
                    tt.content3d.position.x=arrp[i];
                    tt.distans=d;  
                }
            }
            
        }



        this.setWidth=function(num){
            this.dragIter(num,0)
            this.par.draw1()
        }
        var x,x1,ww,ww1,ww2,ss,distans
        var point={x:0, y:0}
        var point1={x:0, y:0}
        var point2={x:0, y:0}
        this.dragIter=function(num, sah){
            if(sah>3)return

            
            x=this.par.arrPosit[1].x;
            x1=this.par.arrPosit1[5].x;
            ww=x+x1;
            ww1=-ww+this.par._distans

            if(Math.round(ww1)==Math.round(num))return;

            ww2=(num-ww1)/2*0.7;
            point.x=(this.par.addPoint.position.x+this.par.addPoint1.position.x)/2
            point.y=(this.par.addPoint.position.y+this.par.addPoint1.position.y)/2

            calc.getVector(this.par._distans/2+ww2,this.par._rotation-Math.PI, point1)

            point2.x=point.x+point1.x;
            point2.y=point.y+point1.y;  
            this.par.addPoint.position.setPoint(point2)

            calc.getVector(this.par._distans/2+ww2,this.par._rotation, point1)

            point2.x=point.x+point1.x;
            point2.y=point.y+point1.y;

            this.par.addPoint1.position.setPoint(point2)

            this.dragIter(num,sah+1)

        }

        var point={x:0,y:0}
        var point1={x:0,y:0}

        let xxx
        this.getInfo=function(){
            var a=[]
            xxx=0
            for (var i = 0; i < this.aaX1.length-1; i++) {
                
                let o={}
                o.width=this.aaX1[i+1]-this.aaX1[i];
                o.x=this.aaX1[i]
                o.height=this.aaY1[i]
                o.height1=this.aaY1[i+1]

                point.x=this.aaX1[i];
                point.y=this.aaY1[i];

                point1.x=this.aaX1[i+1];
                point1.y=this.aaY1[i+1];

                o.angle=-calc.getAngle(point,point1) *180/Math.PI 

                a.push(o)

                xxx=o.width
               
            }
           

            return a;
        }


    }

    set mast(v) {        
        if(this._mast!=v){ 
            this._mast=v;
            this.content3d.position.z=-10*this._mast
            
            for (var i = 0; i < this.array.length; i++) {
                this.array[i].mast=this._mast*facade._mastYmn;
            }          
            this.draw();
        }       
    }   
    get mast() { return  this._mast;}

    set razVisi(v) {        
        if(this._razVisi!=v){ 
            this._razVisi=v;          
            //this.content3d.visible=v;            
           // if(v)
                this.draw()
        }       
    }   
    get razVisi() { return  this._razVisi;}
    
    set boolWindow(v) {        
        if(this._boolWindow!=v){ 
            this._boolWindow=v;
            this.draw();    
        }       
    }   
    get boolWindow() { return  this._boolWindow;}

    
}


export class LineOsi {
    constructor(par) {
        this.type="LineOsi";
        var self=this;
        this.par=par;      
        var sp=this.par.par;

        this.arrayX=[];
        this.arrayY=[];
        var aAll=[]

        this.redrag=function(){
            aAll.length=0;
            this.arrayX.length=0;
            this.arrayY.length=0;
           
            for (var i = 0; i < sp.arrSplice.length; i++) {
                if(sp.arrSplice[i].life==true){                   
                    for (var j = 1; j < sp.arrSplice[i].sVephPoint.array.length-1; j++) {
                        aAll.push(sp.arrSplice[i].sVephPoint.array[j]);
                    }
                }
            }
            for (var i = 0; i < aAll.length; i++) {
                this.setArr(true,aAll[i],this.arrayX)
                this.setArr(false,aAll[i],this.arrayY)
            }                       
        }


        this.setArr=function(xBool,p,a){
            let b=-1;
            for (var i = 0; i < a.length; i++) {
                if(a[i][0].par.par.uuid===p.par.par.uuid)continue
                if(Math.abs(a[i][0].tComp3But.button.z-p.tComp3But.button.z)<0.001){ 
                    if(xBool){                                          
                        if(Math.abs(a[i][0].posit.x-p.posit.x)<0.001){
                            b=i;                            
                            break;
                        }
                    }
                    else{
                        if(Math.abs(a[i][0].posit.y-p.posit.y)<0.001){
                            b=i;
                            break;
                        }
                    }
                }                
            }
            if(b!=-1){
                a[b].push(p)
            }else{
                a.push([p])
            }
        }
    }
}



//одна из осей, как вертивальная так и горизонтальная
export class Osi {
    constructor(par, fun) {
        this.type="Osi";
        var self=this;
        this.par=par
        this.fun=fun;
        this._life=true;
        this._xBool=true;
        this._size=3;
        this._zdvigZ=20;

        this._active=false

        this.mat=window.pm.matDop.getIDObj(6)
        this.mat1=window.pm.matDop.getIDObj(7)
        this.mat2=window.pm.matDop.getIDObj(8)

        this.bta=true;

        this.content3d=new THREE.Object3D();
        this.par.content3d.add(this.content3d);  
        this.c3d=this.par.content3d;
        this.content3d.objGlob=this;
        
        this.mesh=new THREE.Mesh(this.par.par.cylinderGeometry,this.mat);//центр
        this.content3d.add(this.mesh);
        this.mesh.scale.x=this._size;
        this.mesh.scale.z=this._size;
        this.mesh.position.z=-this._zdvigZ
        visi3D.event3DArr.addChild(this.mesh);

/*
        let aa=new THREE.AxesHelper(100);
        this.content3d.add(aa);*/

        this.arrPoint=[];


        this.position=new PositionFun(0,0,0,function(){
            self.content3d.position.set(this.x,this.y,-this.z)
        })

        var sp=this.par.par;
        var poi={x:0,y:0} 
        var poi1={x:0,y:0}
        var z1,z2,rez;
        var p
        var sahP2=0
        var arrP2=[]
        this.setx_y_z=function(x,y,z){
            if(this._xBool==true){
                poi.y=99999999;
                poi1.y=-99999999;
                poi.x=x;                
                poi1.x=x;

            }else{
                poi.x=99999999;
                poi1.x=-99999999;
                poi.y=y;                
                poi1.y=y;

            }
           



           
            sahP2=0
            for (var i = 0; i < sp.arrSplice.length; i++) {
                if(sp.arrSplice[i]._life==true){
                    rez=calc.getPointOfIntersection(poi,poi1,sp.arrSplice[i]._addPoint.position,sp.arrSplice[i]._addPoint1.position)
                    if(rez){
                        if(arrP2[sahP2]==undefined){
                            arrP2[sahP2]={x:0,y:0,point:null,sten:null} 
                        }
                        arrP2[sahP2].x=rez.x;
                        arrP2[sahP2].y=rez.y;
                        arrP2[sahP2].dist=calc.getDistance(sp.arrSplice[i]._addPoint.position,rez)
                        arrP2[sahP2].prosent=arrP2[sahP2].dist/sp.arrSplice[i]._distans
                        arrP2[sahP2].point=null;
                        arrP2[sahP2].sten=sp.arrSplice[i];
                        sahP2++;
                    }    
                }
            }

            if(sahP2>=2){ 
                for (var i = 0; i < this.arrPoint.length; i++) {
                    this.arrPoint[i].xzB=false;
                }

                for (var i = 0; i < sahP2; i++) {
                    p=this.getPointToArr(arrP2[i].sten)
                    if(p!==null){
                        arrP2[i].point=p;
                        p.xzB=true;
                    }
                }

                for (var i =  this.arrPoint.length - 1; i >= 0; i--) {
                    if(this.arrPoint[i].xzB==false){
                        this.arrPoint[i].kill();
                        this.arrPoint.splice(i,1)
                    }
                } 
                for (var i = 0; i < sahP2; i++) { 
                    if(arrP2[i].point==null){
                        let _gp=arrP2[i].sten.sVephPoint.getPoint();                    
                        arrP2[i].sten.sVephPoint.addGP(_gp);                    
                        arrP2[i].point=_gp;
                        this.arrPoint.push(_gp);
                    } 
                    arrP2[i].point.prosent=arrP2[i].prosent;
                    arrP2[i].point.drag();          
                }



            }

            for (var i = 0; i < this.arrPoint.length; i++) {               
                z1=this.arrPoint[i].tComp3But.button.z-this.arrPoint[i].tComp3But.button1.z
                z2=this.arrPoint[i].tComp3But.button.z-this.arrPoint[i].tComp3But.button2.z
                this.arrPoint[i].tComp3But.button.z=z;
                this.arrPoint[i].tComp3But.button1.z=z+z1;
                this.arrPoint[i].tComp3But.button2.z=z+z2;
                this.arrPoint[i].drag();
                this.arrPoint[i].par.par.par.addObjFun(this.arrPoint[i].par.par.addPoint)
                this.arrPoint[i].par.par.par.addObjFun(this.arrPoint[i].par.par.addPoint1)
            }
            this.drag();
        }  

        //есди в стенке эта точка возврощаем ее 
        this.getPointToArr=function(sten){
            for (var i = 0; i < this.arrPoint.length; i++) {
                if(this.arrPoint[i].par.par.uuid==sten.uuid){
                    return this.arrPoint[i];
                }
            }
            return null;
        }



        this.isPoint=function(p){
           /* for (var i = 0; i < this.arrPoint.length; i++) {
                trace("===",i,this.arrPoint[i].par.par.uuid,p.par.par.uuid)
                if(this.arrPoint[i].par.par.uuid==p.par.par.uuid) return true;
            }*/

            for (var i = 0; i < this.arrPoint.length; i++) {
                if(this.arrPoint[i].uuid==p.uuid)return true;
            }
            return false;
        }

        this.setArrPoint=function(arr){
            this.arrPoint=arr;
            this.drag();    
        }


        var arp=[]
        var wwhh
        this.drag=function(){
            if(this._xBool==true){                
                arp.length=0;
                for (var i = 0; i < this.arrPoint.length; i++)arp.push(this.arrPoint[i].posit.y)
                arp.sort(this.sort);
                wwhh=arp[arp.length-1]-arp[0]
                this.position.x=this.arrPoint[0].posit.x;
                this.position.z=this.arrPoint[0].tComp3But.button.z;
                this.position.y=arp[0]+(wwhh)/2;             
                this.mesh.scale.y=wwhh;
                this.mesh.rotation.z=0;
            }else{
                arp.length=0;
                for (var i = 0; i < this.arrPoint.length; i++)arp.push(this.arrPoint[i].posit.x)
                arp.sort(this.sort);
                wwhh=arp[arp.length-1]-arp[0]
                this.position.y=this.arrPoint[0].posit.y;
                this.position.z=this.arrPoint[0].tComp3But.button.z;
                this.position.x=arp[0]+(wwhh)/2;             
                this.mesh.scale.y=wwhh;
                this.mesh.rotation.z=Math.PI/2;

            }
        } 

        this.sort=function(a,b){
            return a-b;
        }


    }


    set active(v) {        
        if(this._active!=v){ 
            this._active=v;            
            if(this._active==true){
                this.mesh.material=this.mat1
            }else{
                this.mesh.material=this.mat
            } 
            visi3D.intRend=1 
        }       
    }   
    get active() { return  this._active;}

    set xBool(v) {        
        if(this._xBool!=v){ 
            this._xBool=v;            
              
        }       
    }   
    get xBool() { return  this._xBool;}

    set life(v) {        
        if(this._life!=v){ 
            this._life=v; 
            this.bta=true           
            if(this._life==true){
                this.c3d.add(this.content3d);
                visi3D.event3DArr.addChild(this.mesh);
            
            } else{
                this.c3d.remove(this.content3d);
                visi3D.event3DArr.removeChild(this.mesh);
            }     
        }       
    }   
    get life() { return  this._life;}

}
       










/**
 * Описывает точку.
 * @class
 * @param [_x=0] {number} кордината
 * @param [_y=0] {number} кордината
 * @param [_z=0] {number} кордината
 */
export function PositionFun (_x, _y, _z, _fun) {
    /** {number} кордината */
    this._x = _x || 0;
    /** {number} кордината */
    this._y = _y || 0;
    /** {number} кордината */
    this._z = typeof _z !== 'function' ? (_z || 0) : 0;

    this.fun = typeof _z === 'function' ? _z : _fun;

    this.set = function (_x, _y, _z) {
        this._x = _x || 0;
        this._y = _y || 0;
        this._z = _z || 0;
        if (this.fun) this.fun();

    };
    this.setPoint = function (p) {
        this._x = p.x;
        this._y = p.y;
        this._z = p.z;
        if (this.fun) this.fun();
    };

    this.getObj = function () {
        var o = {};
        o.x = this._x;
        o.y = this._y;
        o.z = this._z;
        return o;
    };

    this.copy = function () {
        return new PositionFun(this._x, this._y, this._z);
    };
}
PositionFun.prototype = {
    set x (v) {
        // if(this._x==v)return;
        this._x = v;
        if (this.fun) this.fun();
    },
    get x () {
        return this._x;
    },

    set y (v) {
        // if(this._y==v)return;
        this._y = v;
        if (this.fun) this.fun();
    },
    get y () {
        return this._y;
    },
    set z (v) {
        // if(this._z==v)return;
        this._z = v;
        if (this.fun) this.fun();
    },
    get z () {
        return this._z;
    }
};






