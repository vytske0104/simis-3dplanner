
///управления осями
export class OsiPoint {
	constructor(par, fun) {
		this.type="OsiPoint";
        var self=this;
       	this.par=par
        this.fun=fun;

        this._visible=false;
   		this.content3d=new THREE.Object3D();
        this.par.content3d.add(this.content3d);        
        this.content3d.visible=this._visible;

        //this.content3d.position.z=this.tComp3But2.scale=30*this.par.par.param.mastab;

        this.lineOsi=new LineOsi(this);//главный разруливатель
      

        this.array=[]
        this.get=function(){
            for (var i = 0; i < this.array.length; i++) {
                if(this.array[i].life==false){
                    this.array[i].life = true
                    return this.array[i]
                }
            }
            let o=new Osi(this);
            o.idArr=this.array.length;
            this.array.push(o)
            return o
        }


        this.clear=function(){
            for (var i = 0; i < this.array.length; i++) {
                this.array[i].life=false;
            }
        }


        //добавление осей
        this.korektOsi=function(){
            let b=false;
            for (var j = 0; j < this.array.length; j++) this.array[j].bta=false
            for (var i = 0; i < this.lineOsi.arrayX.length; i++) {//перебераем осевые по Х
                
                if(this.lineOsi.arrayX[i].length<=1)continue;//только если больше 2х включительно
                b=true;
                for (var j = 0; j < this.array.length; j++) {
                    if(this.array[j].life==false)continue;
                    if(this.array[j].xBool==false)continue;

                    if(this.array[j].isPoint(this.lineOsi.arrayX[i][0])==true){//такая ось уже есть
                        b=false;
                        this.array[j].bta=true;

                    }
                }
                if(b==true){
                    let os=this.get();                    
                    os.xBool=true;
                    os.setArrPoint(this.lineOsi.arrayX[i])
                }
            }

            for (var i = 0; i < this.lineOsi.arrayY.length; i++) {//перебераем осевые по Х
                if(this.lineOsi.arrayY[i].length<=1)continue;//только если больше 2х включительно
                b=true;
                for (var j = 0; j < this.array.length; j++) {
                    if(this.array[j].life==false)continue;
                    if(this.array[j].xBool==false)continue;

                    if(this.array[j].isPoint(this.lineOsi.arrayY[i][0])==true){//такая ось уже есть
                        b=false;
                        this.array[j].bta=true;

                    }
                }
                if(b==true){
                    let os=this.get();                    
                    os.xBool=false;
                    os.setArrPoint(this.lineOsi.arrayY[i])
                }
            }


            for (var j = 0; j < this.array.length; j++) {
                if(this.array[j].bta == false){
                    this.array[j].life = false
                }
            }
        }


        this.dragPoint=function(p){            
            for (var j = 0; j < this.array.length; j++) {
                if(this.array[j].life == false)continue;
                if(this.array[j].isPoint(p)==true){
              
                    this.array[j].life=false
                    return
                }
            }
        }

        this.dragOsi=function(){
            
            for (var i = 0; i < this.array.length; i++) {
                if(this.array[i].life == false)continue;
               // trace(i,"dragOsi",this.array[i])
                if(this.array[i].arrPoint[0]){
                    this.array[i].drag()
                    
                }
            }
        }

        //ищем оси
        this.redrag=function(){
            this.lineOsi.redrag()
            this.korektOsi()
            //this.lineOsiY.redrag()
        }
    }
    set visible(v) {        
        if(this._visible!=v){ 
            this._visible=v;
            this.content3d.visible=v; 
            /*this.drag()
            if(v)visi3D.event3DArr.addChild(this.cont3d1);
            else visi3D.event3DArr.removeChild(this.cont3d1);*/

        }       
    }   
    get visible() { return  this._visible;}
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
        this._zdvigZ=20*this.par.par.param.mastab;

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
        this.mesh.scale.x=this._size*this.par.par.param.mastab;
        this.mesh.scale.z=this._size*this.par.par.param.mastab;
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






