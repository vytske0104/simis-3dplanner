
///управления осями
export class Info33But {
	constructor(par, fun) {
		this.type="Info33But";
        var self=this;
       	this.par=par
        this.fun=fun;

        this._mast=this.par._mast

        this.tC3B

        this.tC3BL
        this.tC3BR

        this._active=false;
   		this.content3d=new THREE.Object3D();
        this.par.content3d.add(this.content3d);        
        this.content3d.visible=this._active;
        /*let aa1=new THREE.AxesHelper(3160);
        this.content3d.add(aa1);*/


        this.razmer = new Razmer(this);
        this.razmer1 = new Razmer(this);

        this.drag=function(){
            if(this._active==false)return;
            if(!this.tC3B)return; 


        }

 

        var eR={tC3BL:null, tC3BR:null}


        var gp,sten,a,d,index,as
        this.dragLR=function(_tC3B){//крайние точки
            //left
            eR.tC3BL=null;
            eR.tC3BR=null;

            gp=_tC3B.gronPoint;
            index=-1;
            for (var i = 0; i < gp.par.array.length; i++) {
                if(gp.par.array[i].uuid==gp.uuid){
                    index=i
                    break
                }
              
            }  
            eR.tC3BL=_tC3B.gronPoint.par.array[index+1].tComp3But;
            
            if(index!=0 && index!=-1){
                eR.tC3BR=_tC3B.gronPoint.par.array[index-1].tComp3But;
                return eR
            }else{ 
                for (var i = 0; i < this.par.arrSplice.length; i++) {
                    as=this.par.arrSplice[i].sVephPoint.array
                    for (var j = 1; j < as.length; j++) {
                        if(as[j].uuid==gp.uuid){
                            
                            eR.tC3BR=as[j-1].tComp3But;
                            return eR
                        }
                    }
                }
            }
           
            return eR
        }


        var eee
        this.setObject=function(tC3B){
            


            if(tC3B){                
                if(this.tC3B){
                   if(this.tC3B.uuid!=tC3B.uuid){
                        this.tC3B.dragFun=null
                        this.tC3B.button.active=false
                        this.tC3B.button1.active=false
                        this.tC3B.button2.active=false
                   } 
                }

                this.tC3B=tC3B;
                this.tC3B.button.active=true
                this.tC3B.button1.active=true
                this.tC3B.button2.active=true

                this.tC3B.dragFun=this.drag;

                this.tC3BL=undefined;
                this.tC3BR=undefined;

                eee=this.dragLR(this.tC3B);
               
                this.tC3BL=eee.tC3BL;
                this.tC3BR=eee.tC3BR;
                
                
             
                
                this.razmer.setPS(this.tC3B,this.tC3BL,1,2);
                this.razmer1.setPS(this.tC3BR,this.tC3B,1,2);

                if(menuBig)menuBig.setObject(tC3B);
                

                this.active=true;
                this.drag();
            }else{
                if(this.tC3B){
                    this.tC3B.button.active=false
                    this.tC3B.button1.active=false
                    this.tC3B.button2.active=false
                    this.tC3B.dragFun=null 

                }
                if(menuBig)menuBig.setObject(null);
                this.active=false
                this.tC3B=tC3B;

            }
           
        }


        this.drag=function(){
            if(this._active==false)return;

            eee=self.dragLR(self.tC3B);
            self.razmer.isTB(self.tC3B, eee.tC3BL);

            self.razmer1.isTB(eee.tC3BR, self.tC3B);

            self.razmer.drag();
            self.razmer1.drag();
        }


        this.clear=function(){
            
        }

    }

    set mast(v) {        
        if(this._mast!=v){ 
            this._mast=v; 

            this.razmer.mast=v;
            this.razmer1.mast=v;

        }       
    }   
    get mast() { return  this._mast;}



    set active(v) {        
        if(this._active!=v){ 
            this._active=v;
            this.content3d.visible=v; 
            this.razmer.active=v;
            this.razmer1.active=v;

        }       
    }   
    get active() { return  this._active;}
}


import { TCompArrow } from './TCompArrow.js';
import { TLabel } from '../../../../t3d/TStyle.js';


///управления осями
export class Razmer {
    constructor(par) {
        this.type="Razmer";
        var self=this;
        this.par=par     

        this._mast=this.par._mast

        this._active=false;
        this.content3d=new THREE.Object3D();
        this.par.content3d.add(this.content3d);        
        this.content3d.visible=this._active;

        this.rPont2=new RPoint2(this);

        this.vector=new THREE.Vector3();
        this.vector1=new THREE.Vector3();

        this.korect=function(){
            this.rPont2.setPoints(this.vector,this.vector1);
        }



        this.drag=function(){            
            if(!pb || !pb1){
                this.active=false
                return
            }else{
                this.active=true
            }
            this.korPoint(pb, this.vector,pi)
            this.korPoint(pb1, this.vector1,pi1)
            this.korect();
        }


        var vv=new THREE.Vector3();
        var vv1=new THREE.Vector3();
        var vvNull=new THREE.Vector3();
        var gp,sten,a,d
        this.korPoint=function(p,v,_pi){
            gp=p.gronPoint;
            sten=gp.par.par;            
            if(gp.prosent==0){//угловая точка
                vv.x=-sten.arrPosit[5].x;
                vv.y=-10;

                a=calc.getAngle(vvNull,vv)
                d=calc.getDistance(vvNull,vv)
            }else{
                a=-Math.PI/2;
                d=10
            }
            calc.getVector(d,a+sten._rotation,vv1)

            v.x=gp.posit.x+vv1.x;
            v.y=gp.posit.y+vv1.y;
            v.z=p.arrButton[_pi].z; 
            
        };

        var pb=null;
        var pb1=null;

        var pi=0;
        var pi1=0;
        this.setPS=function(p,p1,_pi,_pi1){
            pb=p;
            pb1=p1;
            pi=_pi;
            pi1=_pi1;           

            
        }

        this.isTB=function(p,p1){
           
            let b=false;
            if(!pb1 && p1)b=true;
            if(pb1 && !p1)b=true;
            
            
            
            if(!b){
                if(pb1 && p1){
                   

                    if(pb1.uuid !== p1.uuid){
                        b=true;
                        
                       
                    } 
                }
            }

            if(b){
                this.setPS(p,p1,pi,pi1);
            }
            
           
        }





    }

    set mast(v) {        
        if(this._mast!=v){ 
            this._mast=v;

           
            this.rPont2.mast=v;

        }       
    }   
    get mast() { return  this._mast;}
    


    set active(v) {        
        if(this._active!=v){ 
            this._active=v;
            this.content3d.visible=v; 
            

        }       
    }   
    get active() { return  this._active;}
}




///управления осями
export class RPoint2 {
    constructor(par) {
        this.type="RPoint2";
        var self=this;
        this.par=par;
        this._mast=this.par._mast
        this.content3d=new THREE.Object3D();
        this.par.content3d.add(this.content3d);

        this.array=[]
        this.array1=[]
        this.matA1=window.pm.matDop.getIDObj(24)
        this.matA1A=window.pm.matDop.getIDObj(26)
        this._boolA1=true;
        this._fontSize=12;
        this.tLabel
        this.tLabel1

        var mm,aa,aa1
        this.init=function(){
            if(mm!=undefined)return
           /* aa=new THREE.AxesHelper(220);
            this.content3d.add(aa);

            aa1=new THREE.AxesHelper(60);
            this.content3d.add(aa1);*/


            
            for (var i = 0; i < 3; i++) {
                var o=new TCompArrow(this.content3d,function(s,p){

                },null, this.matA1,  this.matA1,  this.matA1,this.matA1,this.matA1);                       
                
                if(i!==2){
                    o.bRotZ=1; 
                    o.content3d.rotation.x=-Math.PI/2
                    o.content3d.rotation.z=-Math.PI/2 
                }else{
                    o.content3d.rotation.x=-Math.PI/2
                    o.bVerh=false; 
                    o.bRotation=true; 
                    o.c3dLabelYY.rotation.z=Math.PI
                }                  
                o.bDurka=false;
                o.mast=this.mast*facade._mastYmn;
                //o.otstup=ott
                if(i==1)o.bVerh=false;                         
                this.array.push(o);
            }

            this.tLabel=new TLabel(this.content3d,0,0,"xz")
            this.tLabel1=new TLabel(this.content3d,0,0,"xz1") 

            this.tLabel.fontSize=this._fontSize*facade._mastYmn;
            this.tLabel1.fontSize=this._fontSize*facade._mastYmn;

            this.tLabel.cont3d.rotation.z=Math.PI;
            this.tLabel.cont3d.rotation.x=Math.PI/2;

            this.tLabel1.cont3d.rotation.z=Math.PI;
            this.tLabel1.cont3d.rotation.x=Math.PI/2;


            this.tLabel.material=this.matA1;
            this.tLabel1.material=this.matA1;
            

        }
        

        this.init()

        var ott=10
        var dist,ang,minH,dzz,angg,aa9;
        var point,point1

        var _pp={x:0,y:0}
        var _ppNull={x:0,y:0}
        this.setPoints=function(p,p1){
            point=p;
            point1=p1;

            dist=calc.getDistance(p,p1);
            ang=calc.getAngle(p,p1);
            
            this.content3d.position.x=p.x;
            this.content3d.position.y=p.y;

           // aa1.position.x=dist;/**/
            this.content3d.rotation.z=ang;



            this.array[1].content3d.position.x=dist

            minH=point.z;
            if(point1.z<minH)minH=point1.z;

            dzz=point1.z-point.z


            if(p.z==p1.z){//на одном уровне
                this.boolA1=false;
                
                
            }else{ 
                this.boolA1=true;

            }     

            this.array[0].content3d.position.z=-point.z                
            this.array[1].content3d.position.z=-point1.z
            this.array[1].content3d.position.x=dist
            
            this.array[0].distans=point.z;
            this.array[1].distans=point1.z;

            if(dzz<0){                   
                this.array[2].content3d.position.z=-point.z
                this.array[2].distans=Math.sqrt(-dzz*-dzz+dist*dist);
                _pp.x=dist;
                _pp.y=-dzz;
                angg=calc.getAngle(_ppNull,_pp);
                this.array[2].content3d.rotation.z=-angg
                aa9=Math.round(angg*(180/Math.PI))
                this.tLabel.text=-aa9+"°"
                this.tLabel1.text=aa9+"°"

            }else{ 
                this.array[2].content3d.position.z=-point.z                   
                this.array[2].distans=Math.sqrt(dzz*dzz+dist*dist);
                _pp.x=dist;
                _pp.y=dzz;
                angg=calc.getAngle(_ppNull,_pp);
                this.array[2].content3d.rotation.z=angg

                aa9=Math.round(angg*(180/Math.PI))
                this.tLabel.text=-aa9+"°"
                this.tLabel1.text=aa9+"°"
            }



            this.tLabel.cont3d.position.z=-point.z+ott;
            this.tLabel.cont3d.position.x=this.tLabel.width+ott;

            this.tLabel1.cont3d.position.z=-point1.z+ott;
            this.tLabel1.cont3d.position.x=dist-ott;
            
            
            this.tLabel.cont3d.position.y=10-10*this._mast*facade._mastYmn
            this.tLabel1.cont3d.position.y=10-10*this._mast*facade._mastYmn  
            
        }
    }

    set mast(v) {        
        if(this._mast!=v){ 
            this._mast=v;
            
            for (var i = 0; i < this.array.length; i++) {
                this.array[i].mast=v*facade._mastYmn;
                this.array[i].tLabel.cont3d.position.z=-10+10*this._mast*facade._mastYmn
            }

            this.tLabel.fontSize=this._fontSize*this._mast*facade._mastYmn;
            this.tLabel1.fontSize=this._fontSize*this._mast*facade._mastYmn;
            

        }       
    }   
    get mast() { return  this._mast;}

    set boolA1(v) {        
        if(this._boolA1!=v){ 
            this._boolA1=v;
            if(this._boolA1){
              
                for (var i = 0; i < this.array.length; i++) {
                    this.array[i].tLabel.material=this.matA1;
                    this.array[i].a[0].material=this.matA1;
                    this.array[i].a[1].material=this.matA1;
                    this.array[i].a[2].material=this.matA1;
                }
                this.tLabel.material=this.matA1;
                this.tLabel1.material=this.matA1;
            }else{
                for (var i = 0; i < this.array.length; i++) {
                    this.array[i].tLabel.material=this.matA1A;
                    this.array[i].a[0].material=this.matA1A;
                    this.array[i].a[1].material=this.matA1A;
                    this.array[i].a[2].material=this.matA1A;
                }
                this.tLabel.material=this.matA1A;
                this.tLabel1.material=this.matA1A;
               
            }
           /* for (var i = 0; i < this.array1.length; i++) {
                this.array1[i].content3d.visible=this._boolA1;
            }*/
            visi3D.intRend=1

        }       
    }   
    get boolA1() { return  this._boolA1;}

}