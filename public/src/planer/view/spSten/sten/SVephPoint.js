

import { TComp3But } from './TComp3But.js';
import { TCompArrow} from './TCompArrow.js';
import { PlaneXZ } from '../../plus/PlaneXZ.js';
export class SVephPoint  {
  	constructor(par,fun) {  		
  		this.type="SVephPoint";
        var self=this;
        this.par=par;
        this._mast=par._mast;
        this.fun=fun;
        this.array=[];
        this.arrayCesh=[];
        this._activeVisi=false
        this.c3d=this.par.cont3dSten
  		this.content3d = new THREE.Object3D();
  		this.sGPoint=undefined
        this.fGPoint=undefined

        this._hPoint=300;    

        this.cont3dL = new THREE.Object3D();
        this.cont3dL.position.y=-0.5;
        this.content3d.add(this.cont3dL); 
        /*this.planeXZ=new PlaneXZ()
        this.lineSegments = new THREE.LineSegments(
            this.planeXZ,
            new THREE.LineBasicMaterial( { color: 0x68ace2, linewidth: 10})
        )
        this.cont3dL.add(this.lineSegments);
        this.cont3dL.scale.z=-1
        this.lineSegments.rotation.x=Math.PI/2;*/

        this.sob=function(s,p){

        }	


        this.getPoint=function(){
        	for (var i = 0; i < this.arrayCesh.length; i++) {
        		if(this.arrayCesh[i].active==false){
        			//this.array.push(this.arrayCesh[i])
        			this.arrayCesh[i].active=true;
        			return this.arrayCesh[i]
        		}
        	}
        	let gp=new GronPoint(this, this.sob);
            gp.idArr=this.arrayCesh.length
        	this.arrayCesh.push(gp);

        	
        	gp.active=true;
        	return gp;
        }

        //var pp=this.getPoint();



        this.draw1 = function () {           
            this.drawKorektArray();
            let stenn=this.get2Sten(true)  
            if(stenn){//корекция угла ночальной
                let addPoint=stenn.addPoint;
                if(this.sGPoint){                   
                    let ang=calc.getTreeAngel(
                        this.par.addPoint1.position,
                        this.par.addPoint.position,
                        addPoint.position
                        )                   
                    this.sGPoint.tComp3But.button2.rotationZ=ang
                    
                }                
            }
            this.drawBig();
            
        }

           


        this.disttt
        var p,p1,line
        this.drawBig = function () {
           // this.planeXZ.clear();   
            this.clearOsi();         



            //позиционируем линии            
            for (var i = 0; i < this.array.length-1; i++) {   
                let _point={x:0,y:0,z:0}
                let _point1={x:0,y:0,z:0}
                let _point2={x:0,y:0,z:0}

                let b=false;
                let b1=false;
                if(i==0)b=true;
                


                this.array[i].drag()

                _point.x=this.array[i].point.x;
                _point.y=this.array[i].point.y;

                _point1.x=this.array[i+1].point1.x;
                _point1.y=this.array[i+1].point1.y;

                _point2.x=this.array[i].point1.x;
                _point2.y=this.array[i].point1.y;

                if(i==this.array.length-2){
                    _point1.x=this.par._distans
                    b1=true;
                }

                this.array[i].korectXY()

                let dist=calc.getDistance(_point,_point1)
                let angel=calc.getAngle(_point,_point1)
                this.disttt=dist

                this.array[i].tCompArrow.distans=dist; 

                this.array[i].tCompArrow.content3d.rotation.y=angel;

                if(angel==0){
                    this.array[i].tCompArrow.bMat3=true
                }else{
                    this.array[i].tCompArrow.bMat3=false
                }



                this.array[i].tComp3But.button1.rotationX=angel;
                
                this.array[i+1].tComp3But.button2.rotationX=-angel;

                
                this.plus3Point(_point,_point1,_point2,b, b1)
                

                  
                /*this.planeXZ.addLine(                
                    _point,
                    _point2
                )
                this.planeXZ.addLine(                
                    _point,
                    _point1
                )*/
            }
           // this.planeXZ.upDate();
        }
        
        this.sGPoint = this.getPoint();
        this.sGPoint.bForst=true
        this.sGPoint.tComp3But.button.mesh.scale.z=27

        //Коректируем модель array               
        this.drawKorektArray = function () {
            /*if(this.sGPoint==undefined){
                this.sGPoint = this.getPoint();                
            }*/
            let stenn=this.get2Sten(false)

            if(!stenn)return;

            if(this.fGPoint==undefined){                             
                this.fGPoint=stenn.sVephPoint.sGPoint; 
            }else{
                if(stenn.sVephPoint.sGPoint.uuid!=this.fGPoint.uuid)this.fGPoint=stenn.sVephPoint.sGPoint; 
            }
            this.sGPoint.idAp = -1 
            this.array.length=0;
            if(this.sGPoint!==undefined){               
                this.array.push(this.sGPoint);
            } 
            this.arrGP.sort(function(a,b){
                return a.prosent-b.prosent
            })
            for (var i = 0; i < this.arrGP.length; i++) {               
               this.array.push(this.arrGP[i]);
               this.arrGP[i].idAp = i               
            }
            if(this.fGPoint!==undefined){               
                this.array.push(this.fGPoint);                
            }             
        }


        //Получаем стенку противоположну от  true 0 первая точка от центра false 1
        this.get2Sten = function (bool) {
            if(bool==true){
                if(this.par.addPoint){
                    for (var i = this.par.addPoint.arrSHron.length - 1; i >= 0; i--) {                       
                        if(this.par.addPoint.arrSHron[i].sten.uuid!=this.par.uuid){                          
                            return this.par.addPoint.arrSHron[i].sten;
                        }
                    }                    
                }
            }else{
                if(this.par.addPoint1){
                    for (var i = this.par.addPoint1.arrSHron.length - 1; i >= 0; i--) {                       
                        if(this.par.addPoint1.arrSHron[i].sten.uuid!=this.par.uuid){                          
                            return this.par.addPoint1.arrSHron[i].sten;
                        }
                    }                    
                }
            }

            return null;
        }


        this.arrGP=[];
        this.addGP=function(gPont){
            this.removeGP(gPont);
            this.arrGP.push(gPont);
        }
        this.removeGP=function(gPont){
            var p =-1
            for (var i = 0; i < this.arrGP.length; i++) {
                if(this.arrGP[i].uuid==gPont.uuid){
                    p=i;
                    break
                }
            }
            if(p!=-1){
                let aa=this.arrGP.splice(p,1)[0];
                aa.life=false;

                for (var i = this.array.length - 1; i >= 0; i--) {
                    if(this.array[i].uuid==aa.uuid){
                        this.array.splice(i,1); 
                    }
                }


                return aa
            }
            return null;
        }


        //добовляет новую точку в длину этой точки
        this.addPointCenter = function (gPoint) {
            
            var p=-1
            for (var i = 0; i < this.array.length-1; i++) {
                if(this.array[i].uuid==gPoint.uuid){
                    p=i;
                    break

                }
            }
            if(p==-1)return null

            let gp=this.array[p];
            let gp1=this.array[p+1];

            let pp=gp.prosent;
            let pp1=gp1.prosent;
            if(p==this.array.length-2)pp1=1;
            let ppm=pp+(pp1-pp)/2


            let z=gp.point.y;
            let z1=gp1.point1.y;
            let zm=z+(z1-z)/2

            
           
            let _gp=this.getPoint();
            _gp.prosent=ppm;

            _gp.tComp3But.button.z=zm
            _gp.tComp3But.button1.z=zm
            _gp.tComp3But.button2.z=zm


            
            this.addGP(_gp);                
            this.par.par.addObjFun(this.par.addPoint)
            this.drawBig()
            return _gp
        }


////////////////////////////////////////
////////////////////////////////////////
////////////////////////////////////////
////////////////////////////////////////
        this.arrOsi=[];
        this.arrOsi1=[];
        this.arrOsi2=[];
        this.arrOsiCesh=[];

        this.getCeshOsi = function(){
            for (var i = 0; i < this.arrOsiCesh.length; i++) {
                if(this.arrOsiCesh[i].a==false){
                    this.arrOsiCesh[i].a=true;
                    return this.arrOsiCesh[i]
                }
            }
            let oo={p:{x:0,y:0},p1:{x:600,y:310},a:true};
            this.arrOsiCesh.push(oo)
            return oo
        }


        var arrNa1=[]
        this.getOsi = function(tip){

            if(tip==1){
                
                return this.arrOsi1
            }
            if(tip==0){
                return this.arrOsi2
            }
            if(tip==3){
                if(!this.arrOsi1[0]) return 0
                return this.arrOsi1[0].p.y
            }
            if(tip==2){
                if(!this.arrOsi1[this.arrOsi1.length-1]) return 0
                return this.arrOsi1[this.arrOsi1.length-1].p1.y
            }

            return arrNa1
        }


        this.clearOsi = function(){
            this.arrOsi.length=0;
            this.arrOsi1.length=0;
            this.arrOsi2.length=0;
            for (var i = 0; i < this.arrOsiCesh.length; i++) {
                this.arrOsiCesh[i].a = false;
            }
        }


        var x,x1,ww,ss
        this.plus3Point = function(_point, _point1, _point2, b, b1){
            

            //центр
            line=this.getCeshOsi()
            line.p.x=_point.x;
            line.p.y=this.par._height-_point.y;
            line.p1.x=_point1.x;
            line.p1.y=this.par._height-_point1.y;
            if(this.arrOsi.length>=1){
                if(this.arrOsi[this.arrOsi.length-1]){ 
                    if(this.arrOsi[this.arrOsi.length-1].p1.y!==line.p.y){                        
                        let l2=this.getCeshOsi()
                        l2.p.x=this.arrOsi[this.arrOsi.length-1].p1.x;
                        l2.p.y=this.arrOsi[this.arrOsi.length-1].p1.y;
                        l2.p1.x=line.p.x;
                        l2.p1.y=line.p.y;
                        this.arrOsi.push(l2);
                    }
                }
            }


            this.arrOsi.push(line);

            


            //внешния
            x=this.par.arrPosit[5].x;
            x1=this.par.arrPosit1[1].x;
            ww=x+x1;
            ss=1+ww/this.par._distans
            

            line=this.getCeshOsi()
            line.p.x=x+_point.x;
            line.p.y=this.par._height-_point.y;
            line.p1.x=x+_point1.x;
            line.p1.y=this.par._height-_point1.y;            
            this.arrOsi1.push(line);
            if(b==true)line.p.x=0
            if(b1==true)line.p1.x+=x1    



            //внутрения
            x=this.par.arrPosit[1].x;
            x1=this.par.arrPosit1[5].x;
            ww=x+x1;
            ss=1+ww/this.par._distans
           

            line=this.getCeshOsi()
            line.p.x=x+_point.x;
            line.p.y=this.par._height-_point.y;
            line.p1.x=x+_point1.x;
            line.p1.y=this.par._height-_point1.y;
            this.arrOsi2.push(line);

            if(b==true)line.p.x=0
            if(b1==true)line.p1.x+=x1  
        }




////////////////////////////////////////
////////////////////////////////////////


        this.setObj=function(o){                
            if(o==undefined) return
            this.sGPoint.setObj(o.sGPoint)    
            for (var i = 0; i < o.arrGP.length; i++) {
                let _gp=this.getPoint();
                _gp.setObj(o.arrGP[i]); 
                this.addGP(_gp); 
            }
              
        }

        this.getObj=function(){
            var o={}
            o.sGPoint=this.sGPoint.getObj()
            o.arrGP=[]
            for (var i = 0; i < this.arrGP.length; i++) {
                o.arrGP.push(this.arrGP[i].getObj())
            }      
            return o;
        }

        
        
        this.activeVephPoint=this.par._activeVephPoint;
    }

    set mast(v) {        
        if(this._mast!=v){ 
            this._mast=v;            
            for (var i = 0; i < this.arrayCesh.length; i++) {                                   
                this.arrayCesh[i].mast=v;                 
            }     
        }       
    }   
    get mast() { return  this._mast;} 



    set activeVephPoint(v) {        
        if(this._activeVephPoint!=v){ 
            this._activeVephPoint=v;            
           	if(this._activeVephPoint==true){
           		this.c3d.add(this.content3d);
           	} else{
           		this.c3d.remove(this.content3d);
           	}     
        }       
    }   
    get activeVephPoint() { return  this._activeVephPoint;}   
}



export class GronPoint  {
  	constructor(par,fun) {  		
  		this.type="GronPoint";
        var self=this;
        this.par=par;
        this.fun=fun;
        this.idArr=-1;
        this.idAp=-1;
        this._mast=this.par._mast
        this._mastYM=2
        this.bProsent=true;
        this.prosent=0;
        this.boolKill=false

        this.point={x:0, y:0, z:0}
        this.point1={x:0, y:0, z:0}

        this.bForst=false
        
     
        this.uuid=calc.generateRendom(2);
        this._life=true;
        this.c3d=this.par.content3d;
        this.content3d = new THREE.Object3D();
	    this.par.content3d.add(this.content3d);
        this.tComp3But=new TComp3But(this.content3d,function(s,p){

        },
        this.par.par.par.sphereGeometry, 
        this.par.par.par.coneGeometry,
        window.pm.matDop.getIDObj(6),//пасивна
        window.pm.matDop.getIDObj(7),//активна
        window.pm.matDop.getIDObj(23)//на удоление
        )

        
        var hh=this.par._hPoint
       
        this.tComp3But.button.z=hh;
        this.tComp3But.button1.z=hh;
        this.tComp3But.button2.z=hh;
        this.tComp3But.gronPoint = this;
        this.tComp3But.scale=13*this.par.par.par.param.mastab
        this.tComp3But.otstup=20*this.par.par.par.param.mastab   
        this.tComp3But.otstupZ=20*this.par.par.par.param.mastab

        this.tComp3But.mast=this._mast*facade._mastYmn 



        this.tCompArrow=new TCompArrow(this.content3d,function(s,p){

        },null,
        window.pm.matDop.getIDObj(24), 
        window.pm.matDop.getIDObj(6),
        window.pm.matDop.getIDObj(7),
        window.pm.matDop.getIDObj(26),
        window.pm.matDop.getIDObj(27),
        );

        this.tCompArrow.content3d.visible=this._lineOpor;
        this.tCompArrow.otstup=2;
        this.tCompArrow.activeButton=true;
        this.tCompArrow.gPoint=this;
        this.tCompArrow.gPoint=this; 
        this.tCompArrow.boolText=false;
        this.tCompArrow.mast=this._mast 
        var pZ=0
        if(this.par.par.par.param.mobile==true)pZ=-10
        
        //this.tCompArrow.bDurka=false;
        this.tCompArrow.bRotation=false; 

        this.drag=function(){
            this.tComp3But.content3d.position.x=this.par.par._distans*this.prosent;
            this.tCompArrow.content3d.position.x=this.par.par._distans*this.prosent;

            this.point.x=this.tComp3But.content3d.position.x;
            this.point1.x=this.tComp3But.content3d.position.x;

            this.point.y=this.tComp3But.button1.z;
            this.point1.y=this.tComp3But.button2.z;

            this.tCompArrow.content3d.position.z=-this.point.y-this.tComp3But.otstupZ//+pZ;
            this.korectXY()
        }




        this.kill=function(){
            this.par.removeGP(this)
        }

        //коректируем позиции х.у для точек
        this.posit={x:0,y:0,z:0}
        this.korectXY=function(){
            if(this.par.par.addPoint==undefined)return
            if(this.par.par.addPoint1==undefined)return   
            let a = calc.getAngle(this.par.par.addPoint.position,this.par.par.addPoint1.position);
            let d = this.point.x;
            calc.getVector(d, a, this.posit)
            this.posit.x+=this.par.par.addPoint.position.x;
            this.posit.y+=this.par.par.addPoint.position.y;
            this.posit.z=this.tComp3But.button.z
        }

        //замена всех з
        this.setZZ=function(z){
            this.tComp3But.button.z=z;
            this.tComp3But.button1.z=z;
            this.tComp3But.button2.z=z;
            this.drag()
           
        }

        this.clear=function(){
            this.par.removeGP(this);
            this.par.draw1()
           /* if(this.arrSplice[i].life==true){ 
                    let nn= this.arrSplice[i].sVephPoint.array.length-2;
                    
                    for (var j = nn; j >= 1; j--) {                        
                        this.arrSplice[i].sVephPoint.removeGP(this.arrSplice[i].sVephPoint.array[j])
                        this.arrSplice[i].sVephPoint.array.splice(j,1);                        
                    }
                }*/
        }


        this.setObj=function(o){                
            if(o==undefined) return
            this.prosent=  o.prosent;
            this.tComp3But.button.z=o.z; 
            this.tComp3But.button1.z=o.z1;
            this.tComp3But.button2.z=o.z2;   
        }

        this.getObj=function(){
            var o={}
            o.prosent=this.prosent;
            o.z=this.tComp3But.button.z; 
            o.z1=this.tComp3But.button1.z; 
            o.z2=this.tComp3But.button2.z;    
            return o;
        }

        this.setProsent=function(n){
            this.prosent=n
        }

        this.setX=function(x,prosentOld,allPoint){
            //if(this.prosent==0)return;


            let prose=prosentOld-x/this.par.par._distans
            



            if(this.bForst==false){
                if(prose<0){
                    this.tComp3But.boolKill=true
                    prose=0;
                }
                

                if(prose>1){
                    this.tComp3But.boolKill=true
                    prose=1;
                }
            }else{
                prose=0
            }



            this.prosent=prose
            
        }

        this.setXESH=function(x){
            trace("xxx",x)
        }

        //this.tComp3But.scale=33
    }


    set mast(v) {        
        if(this._mast!=v){ 
            this._mast=v;            
            this.tCompArrow.mast=this._mast;
            this.tComp3But.mast=this._mast;      
        }       
    }   
    get mast() { return  this._mast;}


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

