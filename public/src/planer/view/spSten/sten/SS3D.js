
import { PlaneXZ } from '../../plus/PlaneXZ.js';
import { TCompArrow} from './TCompArrow.js';

import { TLabel } from '../../../../t3d/TStyle.js';
export class SS3D  {
  	constructor(par,fun) {  		
  		this.type="SS3D";
        var self=this;
        this.par=par;

        this._height=par._height;
		
        this._life= par._life;
        this._boolMinH=par._boolMinH;
        this._active = false;
        this._mast= par._mast;
        var sahh=0;
        this.aVKol=0
        this._mashtabText=8;

        this._distans=0;
        this._delph=0;
		this._rotation=0;

		this._lineOpor=this.par._lineOpor//Состояние управления опорных точке и линий


		this._color=this.par._color;
		this._color1=this.par._color1;
		this._color2=this.par._color2;
		this._color3=this.par._color3;
		this._color4=this.par._color4;

		this._boolLitel=true;

		this.korektRect=this.par.par.par.korektRect;
		this.korektLine=this.par.par.par.korektLine;


       /* this.content3d = new THREE.Object3D();
        this.par.par.content3d.add(this.content3d);*/

	    this.cont3d = new THREE.Object3D();
	    this.par.cont3dSten.add(this.cont3d);

	    this.cont3dL = new THREE.Object3D();
	    this.par.cont3dSten.add(this.cont3dL); 

	    this.cont3d.objClik=this.par;

		self.tLabel
	    if(window.localS.object.debug==true){
		    
		    setTimeout(function() {
			    self.tLabel=new TLabel(self.cont3d,10,0,"id:"+self.par.idArr);
			    self.tLabel.fontSize=18
			    self.tLabel.cont3d.position.z=self._height-40;
			    self.tLabel.cont3d.position.y=-30
			    self.tLabel.cont3d.position.x=30	
			    self.tLabel.cont3d.rotation.y=Math.PI		
		    }, 10);
		}


	    this.tCompArrow=new TCompArrow(this.cont3d,function(s,p){

        },null,
        window.pm.matDop.getIDObj(24), 
        window.pm.matDop.getIDObj(6), 
        window.pm.matDop.getIDObj(7),
        window.pm.matDop.getIDObj(26),
        window.pm.matDop.getIDObj(27),
        );
	    this.tCompArrow.content3d.visible=this._lineOpor;

        this.tCompArrow.activeButton=true;
	    this.tCompArrow.sten=this.par;  
	    this.tCompArrow.bDurka=false;
	    this.tCompArrow.bDurka=false;
	    this.tCompArrow.bRotation=false;
	    this.tCompArrow.radius=5//*this.par.par.param.mastab;

	    this.tCompArrow.boolText=false
	    this.tCompArrow.mast=this._mast
	    
	    setTimeout(function() {
	    	visi3D.objShadow(self.tCompArrow.content3d,false)
	    	visi3D.intRend=1
	    }, 0);


        

       	var p= parseInt("11100001000", 2);
       	var p1=parseInt("00011111111", 2);
   		
       	this.pS={x:0,y:0,w:100,h:100}//Параметры текстурировнаия и начало энного




        this.dragPost=function(){
        	this.draw1();
        }

        var pZ=0
        if(this.par.par.param.mobile==true)pZ=-10

        var x,x1
		this.draw1 = function () {
			this._distans=this.par._distans;
			this._delph=this.par._delph;
			this._rotation=this.par._rotation;
			
            this.cont3d.position.z=-(this._height)
       		
            
            

            this.tCompArrow.content3d.position.z=-this.cont3d.position.z-this.par.par.minH-10+pZ;
   			this.tCompArrow.content3d.position.y=-this.par._delph/2;

   			
			x=this.par.arrPosit[4].x;
			x1=this.par.arrPosit1[1].x;
			this.tCompArrow.content3d.position.x=-x
			this.tCompArrow.distans=this._distans+(x+x1);

   			
   			



            this.cont3d.visible=this.par.par._boolMax;
            this.cont3dL.visible=!this.par.par._boolMax;
            if(this.par.par._boolMax==true){
				this.drawGrani();
				this.drawVerg();
            }else{
            	this.drawLittel();
            	this.par.par.addObjFun1(this.par);
            }

            if(self.tLabel){
            	var s="id:"+self.par.idArr+" x "+Math.round(self.par.position.x)	+" y "+Math.round(self.par.position.y)
            	self.tLabel.text=s;	
            }
		}


		this.drawLittel = function () {
			/*this.lineSegments.scale.set(this._distans,(this._height),1);
			this.lineSegments.position.x=this._distans/2;
			this.lineSegments.position.z=-(this._height)/2;*/
		}
		
		//this.vergLittel=new VergLittel(this, window.pm.matDop.getIDObj(1))//105

		this.vergLittel=new VergPoint(this)//, window.pm.matDop.getIDObj(1))//105

		
		this.arrGrani=[];//этажа
		this.arrGrani[0]=new SGrani(this,0)//,window.pm.matDop.getIDObj(4),0);
		this.arrGrani[1]=new SGrani(this,1)//,window.pm.matDop.getIDObj(5),1);
		//this.arrGrani[2]=new SGrani(this,0,window.pm.matDop.getIDObj(2),2);
		//this.arrGrani[3]=new SGrani(this,1,window.pm.matDop.getIDObj(3),3);
		for (var i = 0; i < this.arrGrani.length; i++)this.arrGrani[i].idArr=i
		this.arrGrani[0].boolInvert	=true
		this.arrGrani[1].boolInvert	=true

		for (var i = 0; i < this.arrGrani.length; i++) {
    		this.arrGrani[i].cont3d1.visible=!this._boolMinH;
    	}

		
		this.arrGrani[0].arr[2].vergLittel=this.vergLittel


		this.aMlR=[{l:0,r:0},{l:0,r:0},{l:0,r:0}];

		this.app=[{x:-10000,y:0,z:0},{x:10000,y:0,z:0}];
		this.app1=[{x:-10000,y:0,z:0},{x:10000,y:0,z:0}];

		var m

		this.hhh
		this.drawVerg= function () {
			this.hhh=this.height

			this.aMlR[0].l=this.hhh;
			this.aMlR[0].r=this.hhh;

			this.aMlR[1].l=this.hhh;
			this.aMlR[1].r=this.hhh;

			
			this.arrGrani[0].dragGeometry(this.aMlR[0],true);						
			this.arrGrani[1].dragGeometry(this.aMlR[1],true);	

			/////////////////////////
			//this.arrGrani[2].dragGeometry(this.aMlR[0],false);				
			//this.arrGrani[3].dragGeometry(this.aMlR[1],false);

			

			m=this.aMlR[0].l;
			if(m<this.aMlR[1].l)m=this.aMlR[1].l
			this.aMlR[2].l=m


			m=this.aMlR[0].r;
			if(m<this.aMlR[1].r)m=this.aMlR[1].r;
			this.aMlR[2].r=m;

			if(this.aMlR[2].r==this.hhh)this.aMlR[2].r=0
			if(this.aMlR[2].l==this.hhh)this.aMlR[2].l=0	

			this.app[0].y=this.app[1].y=this.aMlR[2].l;
			this.app1[0].y=this.app1[1].y=this.aMlR[2].r;






			this.arrGrani[0].dragGMin(this.app,this.app1)	
			this.arrGrani[1].dragGMin(this.app,this.app1)
			/////////////////////////
			//this.arrGrani[2].dragGMin(this.app,this.app1)			
			//this.arrGrani[3].dragGMin(this.app,this.app1)



			//if(this.par.idArr==2){
				this.vergLittel.setGrani(this.arrGrani[0],this.arrGrani[1]);
			//}




		}



		this.drawGrani = function () {
			//if(this.par.idArr!=0)return;
			

			
			//Порядок важен	
			this.arrGrani[0].dragPost();
			this.arrGrani[1].dragPost();
			//this.arrGrani[0].setGrani1(this.arrGrani[1]);//!!! переворачиваем 			


			//this.arrGrani[2].dragPost();
			//this.arrGrani[3].dragPost();
			//this.arrGrani[2].setGrani1(this.arrGrani[3]);//!!! переворачиваем 

			//this.par.par.metodRezolk.setSten(this.par);


			


			
		}

		var bbbb
		this.setMat = function (m,m1,tov,tov1,bool,o) {
			

/*
			bbbb=false

			if(this.arrGrani[0]._material.uuid!=m.uuid || bool==true ){				
				this.arrGrani[0].material=m;
				
			}

			if(tov.d3Width!==this.arrGrani[0].d3Width || this.arrGrani[0].d3Height!==tov.d3Height){
				
				this.arrGrani[0].d3Width=tov.d3Width;
				this.arrGrani[0].d3Height=tov.d3Height;		
				bbbb=true	
					
			}

			if(this.arrGrani[1]._material.uuid!=m1.uuid  || bool==true ){
				this.arrGrani[1].material=m1
			
				
			}

			if(tov1.d3Width!==this.arrGrani[1].d3Width || this.arrGrani[1].d3Height!==tov1.d3Height){
				this.arrGrani[1].d3Width=tov1.d3Width;
				this.arrGrani[1].d3Height=tov1.d3Height;
				bbbb=true	
				
			}	
*/


			
			if(bbbb==true){
				self.par.par.addObjFun(self.par)
			}
		}


		
		this.setMat1 = function (m,m1,tov,tov1,bool) {
			bbbb=false;

			if(m)
			if(this.arrGrani[2]._material.uuid!=m.uuid || bool==true ){	

				this.arrGrani[2].material=m;

			}


			if(tov.d3Width!==this.arrGrani[2].d3Width || this.arrGrani[2].d3Height!==tov.d3Height){
				
				this.arrGrani[2].d3Width=tov.d3Width;
				this.arrGrani[2].d3Height=tov.d3Height;		
				bbbb=true	
					
			}



			if(m1)
			if(this.arrGrani[3]._material.uuid!=m1.uuid  || bool==true ){	

				this.arrGrani[3].material=m1
				this.arrGrani[3].d3Width=tov1.d3Width;
				this.arrGrani[3].d3Height=tov1.d3Height;
			}

			if(tov1.d3Width!==this.arrGrani[3].d3Width || this.arrGrani[3].d3Height!==tov1.d3Height){
				this.arrGrani[3].d3Width=tov1.d3Width;
				this.arrGrani[3].d3Height=tov1.d3Height;
				bbbb=true	
				
			}	

			if(bbbb==true){				
				self.par.par.addObjFun(self.par)
			}
		}


		var h,h1
		this.redrahHHH = function () {
			h=this._height;//+Math.random()*100;
			h1=0;
			
			
			this.arrGrani[0].h=this.arrGrani[1].h=h
			this.arrGrani[1].y=this.arrGrani[0].y = 0
			//this.arrGrani[2].h=h1
			//this.arrGrani[2].y=h
			//this.arrGrani[3].h=h1
			//this.arrGrani[3].y=h
		}
		this.redrahHHH()


		this.testMaterial= function () {	
			
		}  
		this.testMaterial();


		var bbbbbb;
		// Набрасываем на объекты тени
		this.objShadow = function (obj, bol) {
			if (bol == undefined) bol = true;
			bbbbbb = true;
			if (obj.material) {
				if (obj.material.transparent == true && obj.material.opacity < 1) {
					bbbbbb = false;
				}
			}
			if (bbbbbb == true) {
				obj.castShadow = bol;
				obj.receiveShadow = bol;
			}

			if (obj.children != undefined) {
				for (var i = 0; i < obj.children.length; i++) {
					if (obj.children != undefined) {
						this.objShadow(obj.children[i], bol);
					} else {
						bbbbbb = true;
						if (obj.children[i].material) {
							if (obj.material.transparent == true && obj.material.opacity < 1) {
								bbbbbb = false;
							}
						}

						if (bbbbbb == true) {
							obj.children[i].castShadow = bol;
							obj.children[i].receiveShadow = bol;
						}
					}
				}
			}
		};
		this.objShadow(this.cont3d,true)
    }

    set height(value) {
        if(this._height!=value){
            this._height= value;
            
        	this.redrahHHH()
        }
    }    
    get height() { return  this._height;}  



	set mast(value) {
        if(this._mast!=value){
            this._mast= value;
        	/*for (var i = 0; i < this.arrGrani.length; i++) {
        		this.arrGrani[i].cont3d1.visible=!this._mast;
        	}
        	this.vergLittel.mast=this._mast;*/
        	this.tCompArrow.mast=this._mast
        }
    }    
    get mast() { return  this._mast;} 

    set boolMinH(value) {
        if(this._boolMinH!=value){
            this._boolMinH= value;
        	for (var i = 0; i < this.arrGrani.length; i++) {
        		this.arrGrani[i].cont3d1.visible=!this._boolMinH;
        	}
        	this.vergLittel.boolMinH=this._boolMinH;
        }
    }    
    get boolMinH() { return  this._boolMinH;} 
     	

    set active(value) {
        if(this._active!=value){
            this._active= value;
           	this.vergLittel.active=this._active
          /*  if(!value)this.vergLittel.material= window.pm.matDop.getIDObj(1)
            else this.vergLittel.material= window.pm.matDop.getIDObj(10)*/
        
        }
    }    
    get active() { return  this._active;}

    set life(value) {
        if(this._life!=value){
            this._life= value;                      
        }
    }    
    get life() { return  this._life;}


    set lineOpor(value) {
        if(this._lineOpor!=value){
            this._lineOpor= value; 
            this.tCompArrow.content3d.visible=this._lineOpor;                     
        }
    }    
    get lineOpor() { return  this._lineOpor;}
 

}


export class SGrani{
	constructor( par , sahTextur, material, idArr) {
		this.type = 'SGrani';	
		this.par=par;
		this.sahTextur=sahTextur;//Повороты текстур
		this.y=0;
		this.h=300;
		this.arrPosit=this.par.par.arrPosit;
		this.arrPosit1=this.par.par.arrPosit1;
		this._distans=0;
		this._material=material
		this._renderOrder=0
		this.korektRect=this.par.korektRect
		
	    this.cont3d1 = new THREE.Object3D();
	    this.par.cont3d.add(this.cont3d1);

	    this.cont3d = new THREE.Object3D();
	    this.cont3d1.add(this.cont3d);

	  	this.boolVergDrag=false 
	  	this.idArr=idArr 

	  	this.rect={x:0,y:0,w:800,h:300};

	  	this.boolInvert=false;

	  	this.area=0;


	  	this.d3Width=512;
	  	this.d3Height=512;


	    this.arrP=[new THREE.Vector3(),new THREE.Vector3(),new THREE.Vector3(),new THREE.Vector3(),new THREE.Vector3(),new THREE.Vector3()]
	    this.arrPGlob=[new THREE.Vector3(),new THREE.Vector3(),new THREE.Vector3(),new THREE.Vector3(),new THREE.Vector3(),new THREE.Vector3()]
	    this.arr=[];	
		for (var i = 0; i < 5; i++) {
			this.arr[i]=new GronSten(this);
			this.arr[i].idArr=i;
			this.arr[i].setName("gronSten", i, this.idArr);
		}

		this.clearAL=function(){
			for (var i = 0; i < 5; i++) {
				this.arr[i].clearAL()
			}
			
		}



		var a,d,a1
		var poin=new THREE.Vector3()
		var pNull=new THREE.Vector3()
		this.invertToGlob=function(){
			a=this.par._rotation;
			poin.x=par.par.position._x;
			poin.y=par.par.position._y;
			
			for (var i = 0; i < this.arrP.length; i++) {
				a1=calc.getAngle(pNull,this.arrP[i])
				d=calc.getDistance(pNull,this.arrP[i])

				calc.getVector(d,a1+a, this.arrPGlob[i])
				this.arrPGlob[i].x+=poin.x;
				this.arrPGlob[i].y+=poin.y;				
			}
		}
		
		this.dragPost=function(){
			this._distans=this.par.par._distans;
			if(this.sahTextur==0){				
				this.arrP[0].set(-this.arrPosit[2].x,this.arrPosit[2].y,0);
				this.arrP[1].set(-this.arrPosit[1].x,this.arrPosit[1].y,0);
				this.arrP[2].set(-this.arrPosit[0].x,this.arrPosit[0].y,0);				
				this.arrP[3].set(this.arrPosit1[5].x+this._distans, this.arrPosit1[5].y,0);
				this.arrP[4].set(this.arrPosit1[4].x+this._distans, this.arrPosit1[4].y,0);
				this.arrP[5].set(this.arrPosit1[3].x+this._distans, this.arrPosit1[3].y,0);
			}
			if(this.sahTextur==1){
				this.arrP[5].set(this.arrPosit1[2].x+this._distans,this.arrPosit1[2].y,0);
				this.arrP[4].set(this.arrPosit1[1].x+this._distans,this.arrPosit1[1].y,0);
				this.arrP[3].set(this.arrPosit1[0].x+this._distans,this.arrPosit1[0].y,0);
				this.arrP[2].set(-this.arrPosit[5].x,this.arrPosit[5].y,0);
				this.arrP[1].set(-this.arrPosit[4].x,this.arrPosit[4].y,0);				
				this.arrP[0].set(-this.arrPosit[3].x,this.arrPosit[3].y,0);
			}
			this.sahW=0;
			for (var i = 0; i < 5; i++) {
				this.arr[i].setPosit(this.arrP[i],this.arrP[i+1])
				
				if(this.arr[i].dist==0){
					if(this.arr[i].mesh.visible!=false)this.arr[i].mesh.visible=false					
				}else{
					if(this.arr[i].mesh.visible!=true)this.arr[i].mesh.visible=true
				}
				this.arr[i].rendSahTextur=this.sahTextur
			}

			if(this.sahTextur==0){
				for (var i = 0; i < 5; i++) {
					this.arr[i].pS.y=0;
					this.arr[i].pS.w=this.d3Width;
					this.arr[i].pS.h=this.d3Height;
					this.arr[i].pS.x=this.sahW;										
					if(i>=2)this.sahW+=this.arr[i].dist					
					
				}
			}

			if(this.sahTextur==1){
				for (var i =4 ; i >=0; i--) {
					if(i<=1){
						this.sahW+=(this.arr[i].dist)//%this.arr[i].pS.w;
					
					}					
					this.arr[i].pS.y=0;
					this.arr[i].pS.w=this.d3Width;
					this.arr[i].pS.h=this.d3Height;
					this.arr[i].pS.x=-this.sahW;	
				}
			}
			if(this.boolInvert==true)this.invertToGlob()
		}

		this.setGrani1=function(grani){
			grani.arr[3].redragP();
			grani.arr[4].redragP();
			grani.arr[3].rendSahTextur=this.sahTextur;
			grani.arr[4].rendSahTextur=this.sahTextur;
			grani.arr[3].pS.x=this.sahW;
			grani.arr[4].pS.x=this.sahW+grani.arr[3].dist;


			this.arr[0].redragP();
			this.arr[1].redragP();

			this.arr[0].rendSahTextur=grani.sahTextur;
			this.arr[1].rendSahTextur=grani.sahTextur;

			this.arr[0].pS.x=-this.arr[0].dist-grani.sahW;
			this.arr[1].pS.x=-this.arr[0].dist-this.arr[1].dist-grani.sahW;
		}
		this.sahW=0

		var arrNull=[]
		var arrNa=[]

		this.dragGeometry=function(o,bbb){

			this.area=0;
			if(this.h==0){
				this.cont3d.visible=false
				return
			}else{
				this.cont3d.visible=true
			}

			this.korektRect.boolDebug=true;
			this.boolVergDrag=false;

			this.korektRect.colizY = 0;


			

			for (var i = 0; i < 5; i++) {
				if(this.par.par.idArr==2)if(this.idArr==1)if(i==2){
					
					this.korektRect.boolDebug=true;

				}	
				/*if(this.arr[i].vergLittel!=undefined){
					this.korektRect.boolDebug=true;	
					
				}*/
				//this.korektRect.rect=this.rect

				if(this.arr[i].dist!=0){
					if(i==2){									
						this.korektRect.colizX=-this.arrP[i].x;
						

						arrNa=arrNull;
						//if(this.idArr==1){						
						arrNa=this.par.par.sVephPoint.getOsi(this.idArr)							
						
						

						this.arr[i].setNaRect(
						0,
						this.par.par.windows.arrBlok,
						this.h,
						this.y,null,this.arrP[i].x,
						arrNa);

						this.area=this.korektRect.area;
						
						
						/*if(bbb==true){
							if(o.l>(this.par.hhh-this.korektRect.minL))o.l=(this.par.hhh-this.korektRect.minL);
						}else{*/
						if(this.korektRect.minL!==99999){	
							//if(this.korektRect.minL!=this.korektRect.rect.y){
							if(this.korektRect.minL!=this.korektRect.rect.y){
								o.l=this.korektRect.minL;
							
							}
						}

						if(this.korektRect.minR!==99999){
							if(this.korektRect.minR!=this.korektRect.rect.y){
								o.r=this.korektRect.minR;
							}
						}
						
						
					
					}
					else{						
					}
					if(this.arr[i].boolVergDrag==true)this.boolVergDrag=true;
				}
				this.korektRect.boolDebug=false;
			}				
		}

		var yy,hh
		var gsObj
		this.dragGMin=function(ap,ap1){
			//this.area=0;	

			this.korektRect.colizY = 0;
			this.korektRect.boolDebug=false;

			
			for (var i = 0; i < 5; i++) {

				

				if(this.arr[i].dist!=0){
					if(i!=2){					
						
						this.arr[i].clearAL()							
						gsObj=this.arr[i].getLine();//обьекты линий на стенвх
						yy=this.y
						hh=this.h
						
						if(i<3){							
							hh=yy=this.par.par.sVephPoint.getOsi(3)								
						}else{
							hh=yy=this.par.par.sVephPoint.getOsi(2)							
						}
						if(hh==0){
							yy=this.y
							hh=this.h
						}
						
						hh=-(hh-this.par.par.par._height)

						
						this.arr[i].setNaRect(
						0,null,
						hh,
						yy,null,0);

					}
					if(this.arr[i].boolVergDrag==true)this.boolVergDrag=true;
				}
				this.korektRect.boolDebug=false;
			}		
		}

	}
	set material(value) {		
        if(this._material!==value){
            this._material= value;
           
            for (var i = 0; i < 5; i++) {
                this.arr[i].material= value;
            }          
        }
    }    
    get material() { return  this._material;}
	
	set renderOrder(value) {		
        if(this._renderOrder!==value){
            this._renderOrder= value;
           
           	for (var i = 0; i < this.arr.length; i++) {
                this.arr[i].mesh.renderOrder= value;
            }            
        }
    }    
    get renderOrder() { return  this._renderOrder;}


}




export class GronSten {
    constructor( par ) {
    	var self = this;
		this.type = 'GronSten';	
		this.par=par;
		this.geometry=new PlaneXZ();	
		this.rendSahTextur=0
		this.idArr=-1
		this._material=par._material

		this.vergLittel=undefined

		this.mesh=new THREE.Mesh(this.geometry,this._material)//this.par.par.par.par.mat);	
		this.mesh.rotation.x=Math.PI/2;


		this.cont3d = new THREE.Object3D();
	    this.par.cont3d.add(this.cont3d);
		this.cont3d.add(this.mesh);

		
		this.p=new THREE.Vector3();
		this.p1=new THREE.Vector3();
		

		this.arrLine=[];
		this.arrLineCesh=[]	

	
		this.setName=function(name, idArr, idArrPar){

			this.mesh.name=name;
			this.mesh.idArr=idArr;
			this.mesh.idArrPar=idArrPar;
		}

		this.clearAL=function(){
			this.arrLine.length=0;			
		}

		this.getLine=function(){
			if(this.arrLineCesh[this.arrLine.length]==undefined){
				this.arrLineCesh[this.arrLine.length]={p:{x:0,y:0},p1:{x:0,y:-100}}
			}		
			this.arrLine.push(this.arrLineCesh[this.arrLine.length])		
			return this.arrLine[this.arrLine.length-1];
		}



		//////////////////////////////////////////1
		this.arrLine1=[];
		this.arrLineCesh1=[]	

		this.clearAL1=function(){
			this.arrLine1.length=0;			
		}

		this.getLine1=function(){
			if(this.arrLineCesh1[this.arrLine1.length]==undefined){
				this.arrLineCesh1[this.arrLine1.length]={p:{x:0,y:0,z:0},p1:{x:0,y:-100,z:0}}
			}		
			this.arrLine1.push(this.arrLineCesh1[this.arrLine1.length])		
			return this.arrLine1[this.arrLine1.length-1];
		}

		//////////////////////////////////////////2
		this.arrLine2=[];
		this.arrLineCesh2=[]	

		this.clearAL2=function(){
			this.arrLine2.length=0;			
		}

		this.getLine2=function(){
			if(this.arrLineCesh2[this.arrLine2.length]==undefined){
				this.arrLineCesh2[this.arrLine2.length]={p:{x:0,y:0,z:0},p1:{x:0,y:-100,z:0}}
			}		
			this.arrLine2.push(this.arrLineCesh2[this.arrLine2.length])		
			return this.arrLine2[this.arrLine2.length-1];
		}

		/////////////////////






		
		var ppe=new THREE.Vector3()
		var ppe1=new THREE.Vector3()
		var ppzzz=new THREE.Vector3()
		var ppNull=new THREE.Vector3()

		var pRez={p:ppe,p1:ppe1}


		var a,d, a1, d1
		var t,t1,bbb
		this.isLocalToGlob=function(_p,_p1){			
			bbb=false;

			if(this.par.sahTextur==1&&(this.idArr==4||this.idArr==3)){
				bbb=true;
			}
			if(this.par.sahTextur==0&&(this.idArr==0||this.idArr==1)){
				bbb=true;
			}
			if(bbb==true){	
				t1=this.par.arrPGlob[this.idArr];
				t=this.par.arrPGlob[this.idArr+1];
			}else{
				t=this.par.arrPGlob[this.idArr];
				t1=this.par.arrPGlob[this.idArr+1];
			}
			

			ppzzz.x=_p.x-t.x;
			ppzzz.y=_p.y-t.y;

			a=calc.getAngle(ppNull,ppzzz);
			d=calc.getDistance(ppNull,ppzzz);
			calc.getVector(d,0,ppe);
			ppe.z=this.par.par.par._height+_p.z;

			
			ppzzz.x=_p1.x-t.x;
			ppzzz.y=_p1.y-t.y;

			a=calc.getAngle(ppNull,ppzzz);
			d=calc.getDistance(ppNull,ppzzz);
			calc.getVector(d,0,ppe1);
			ppe1.z=this.par.par.par._height+_p1.z;		
			return pRez
		}






		this.rect={x:0,y:0,w:700,h:300};

		this.dist=0;
		this.angel=0;

		this.pS={x:0,y:0,w:1000,h:100}

		this.setPosit=function(_p,_p1){
			this.p=_p;
			this.p1=_p1;

			this.setPRed()

		}
		var pp
		this.redragP=function(){
			pp=this.p
			this.p=this.p1
			this.p1= pp
			this.setPRed();
		}

		this.setPRed=function(){
			this.angel=calc.getAngle(this.p,this.p1);
			this.dist=calc.getDistance(this.p,this.p1);
			this.cont3d.position.x=this.p.x;
			this.cont3d.position.y=this.p.y;
			this.cont3d.rotation.z=this.angel;
		}

		this.boolVergDrag=false
		



		this.old_x;
		this.old_coliz;
		this.old_h;
		this._y
		this._nGeom
		this._xSm

		var xSm
		this.setNaRect=function(_x,_coliz,_h,_y,_nGeom,_xSm,arrNa){		
			this.boolVergDrag=false

			this.old_x=_x;
			this.old_coliz=_coliz;
			this.old_h=_h;
			this._y=_y;
			this._nGeom=_nGeom;
			this._xSm=_xSm;


			/*if(this.par.par.par.idArr==0&&this.arrLine[0].p1.y!=220){
				this.arrLine=[{p:{x:22,y:-20},p1:{x:590,y:220}}];
			}*/

			xSm=0;
			if(_xSm!=undefined)xSm=_xSm;
			
			this.rect.y=_y;
			this.rect.h=_h;
			//this.rect.x=xSm;
			//this.mesh.position.x=-xSm;

			this.rect.w=this.dist;


			//this.mesh.position.z=-_h;
			this.par.korektRect.rect=this.rect;	

			this.par.korektRect.coliz=_coliz;

			/*if(this.par.korektRect.boolDebug==true){
				
				let pp={p:{x:0,y:0},p1:{x:300,y:310}}
				this.par.korektRect.arrLine=[pp]
			}else{
				this.par.korektRect.arrLine=this.arrLine;
			}*/

			if(arrNa)this.par.korektRect.arrLine=arrNa;
			else this.par.korektRect.arrLine=[];
			//if(this.par.par.par.boolObr==false){
				//this.par.korektRect.arrLine=this.arrLine;
			//}else{
			//	this.par.korektRect.arrLine=[];
			//}
			


			
			
			this.par.korektRect.pS=this.pS;
			this.par.korektRect.korektGrid();

			this.par.korektRect.setGeom(this.geometry, this.rendSahTextur);
			
			this.korektLine();

			this.boolVergDrag=this.par.korektRect.boolVergDrag;

			if(this.vergLittel!==undefined)this.vergLittel.drawWindow(this.par.korektRect, _xSm);

			
		}

		var ssss=0

		var line,ll
		this.korektLine=function(){	
			if(this.par.par.idArr>=2)return
			this.clearAL1();
			this.clearAL2();

			

			if(this.dist!=0){

				if(this.idArr==2){
					line= this.par.korektRect.getLine1();
				
							
					for (var i = 0; i < line.length; i++) {
						ll=this.getLine1()
						ll.p.x=line[i].p.x+this.p.x;
						ll.p.z=line[i].p.y;
						ll.p.y= this.p.y;
						ll.p1.x=line[i].p1.x+this.p.x;
						ll.p1.z=line[i].p1.y;
						ll.p1.y= this.p.y;
					}
				}

			}
		}


		this.point=new THREE.Vector3()
		this.pNull=new THREE.Vector3()
		var dd
		this.povorot=function(p, pOt, angel){	
		
			dd=p.x;
			calc.getVector(dd,-angel,this.point)

			this.point.x+=pOt.x;
			this.point.y+=pOt.y;	

		}


    }


    set material(value) {		
        if(this._material!==value){
            this._material= value;
            this.mesh.material=this._material;            
        }
    }    
    get material() { return  this._material;}

}




export class VergPoint{
    constructor( par , material) {
    	var self = this;
		this.type = 'VergPoint';	
		this.par=par;
		this.geometry=new PlaneXZ();
		var geometry	=this.geometry
		this.rendSahTextur=0;
		this._active=false;
		this._boolMinH=par._boolMinH;

		this.korektLine=this.par.korektLine;

		
		this.mesh=new THREE.Mesh(this.geometry)
		this.par.cont3d.add(this.mesh)
		this.normalPosit=new THREE.Vector3(0,1,0)

		this.mat=par.par.par.arrMat[2]
		this.mat1=par.par.par.arrMat[3]
		

		/*this.geometry1=new PlaneXZ();
		this._material1=material;
		this.mesh1=new THREE.Mesh(this.geometry1,this._material1)
		this.par.cont3d.add(this.mesh1)*/



		/*this.arrLine=[];
		this.arrLineCesh=[]	

		this.clearAL=function(){
			this.arrLine.length=0;			
		}

		this.getLine=function(){
			if(this.arrLineCesh[this.arrLine.length]==undefined){
				this.arrLineCesh[this.arrLine.length]={p:{x:0,y:0,z:0},p1:{x:0,y:-100,z:0}}
			}		
			this.arrLine.push(this.arrLineCesh[this.arrLine.length])		
			return this.arrLine[this.arrLine.length-1];
		}*/
		this.arrPoint=[]
		var sah=0 
		this.getPoint=function(x,y,z){
			if(this.arrPoint[sah]==undefined){
				this.arrPoint[sah]=new THREE.Vector3()
			}
			this.arrPoint[sah].set(x,y,z)	
			sah++;	
						
			return this.arrPoint[sah-1];
		}
	
		this.triangulateShape=this.par.par.par.triangulateShape3D;
		
		var delph2=this.par.par._delph/2
		var vertices = [];
        var uv = [];
        var normal = [];

        this.svp=undefined;
        this.arrDin=[]	
        var pp
		//var i,j,k,line,ll,ggg,bb

		this.setGrani=function(gran,gran1){	
			
			delph2=this.par.par._delph/2
			if(this.svp==undefined)this.svp=this.par.par.sVephPoint
			vertices.length=0
            uv.length=0  
            normal.length=0 

			sah=0;
			this.arrDin.length=0;

			x=this.par.par.arrPosit[5].x;
			x2=this.par.par.arrPosit[1].x;

            x1=this.par.par.arrPosit1[1].x;            
            x3=this.par.par.arrPosit1[5].x;
          
			if(this.svp.arrOsi.length==0)return

			if(this.svp.arrOsi.length>=2){
				for (var i = 0; i < this.svp.arrOsi.length-1; i++) {
					if(i==0){
						this.arrDin.push(this.getPoint(this.svp.arrOsi1[i].p.x-x2,  delph2, this.svp.arrOsi[i].p.y));
						this.arrDin.push(this.getPoint(this.svp.arrOsi[i].p1.x, delph2, this.svp.arrOsi[i].p1.y));
						this.arrDin.push(this.getPoint(this.svp.arrOsi[i].p1.x, -delph2, this.svp.arrOsi[i].p1.y));

						this.arrDin.push(this.getPoint(this.svp.arrOsi1[i].p.x-x2,  delph2, this.svp.arrOsi[i].p.y));
						this.arrDin.push(this.getPoint(this.svp.arrOsi[i].p1.x, -delph2, this.svp.arrOsi[i].p1.y));
						this.arrDin.push(this.getPoint(this.svp.arrOsi2[i].p.x-x, -delph2, this.svp.arrOsi2[i].p.y));
					}else{
						this.arrDin.push(this.getPoint(this.svp.arrOsi[i].p.x,delph2, this.svp.arrOsi[i].p.y));
						this.arrDin.push(this.getPoint(this.svp.arrOsi[i].p1.x,delph2, this.svp.arrOsi[i].p1.y));
						this.arrDin.push(this.getPoint(this.svp.arrOsi[i].p1.x,-delph2, this.svp.arrOsi[i].p1.y));

						this.arrDin.push(this.getPoint(this.svp.arrOsi[i].p.x,-delph2, this.svp.arrOsi[i].p.y));
						this.arrDin.push(this.getPoint(this.svp.arrOsi[i].p.x,delph2, this.svp.arrOsi[i].p.y));
						this.arrDin.push(this.getPoint(this.svp.arrOsi[i].p1.x,-delph2, this.svp.arrOsi[i].p1.y));
					}
				}

				this.arrDin.push(this.getPoint(this.svp.arrOsi[i].p.x,delph2, this.svp.arrOsi[i].p.y));
				this.arrDin.push(this.getPoint(this.svp.arrOsi[i].p1.x+x3,delph2, this.svp.arrOsi[i].p1.y));
				this.arrDin.push(this.getPoint(this.svp.arrOsi[i].p1.x+x1,-delph2, this.svp.arrOsi[i].p1.y));


				this.arrDin.push(this.getPoint(this.svp.arrOsi[i].p.x,-delph2, this.svp.arrOsi[i].p.y));
				this.arrDin.push(this.getPoint(this.svp.arrOsi[i].p.x,delph2, this.svp.arrOsi[i].p.y));
				this.arrDin.push(this.getPoint(this.svp.arrOsi[i].p1.x+x1,-delph2, this.svp.arrOsi[i].p1.y));




			}else{
				var i=0
				this.arrDin.push(this.getPoint(this.svp.arrOsi1[i].p.x-x2,  delph2, this.svp.arrOsi[i].p.y));
				this.arrDin.push(this.getPoint(this.svp.arrOsi[i].p1.x+x3, delph2, this.svp.arrOsi[i].p1.y));
				this.arrDin.push(this.getPoint(this.svp.arrOsi[i].p1.x+x1, -delph2, this.svp.arrOsi[i].p1.y));

				this.arrDin.push(this.getPoint(this.svp.arrOsi1[i].p.x-x2,  delph2, this.svp.arrOsi[i].p.y));
				this.arrDin.push(this.getPoint(this.svp.arrOsi[i].p1.x+x1, -delph2, this.svp.arrOsi[i].p1.y));
				this.arrDin.push(this.getPoint(this.svp.arrOsi2[i].p.x-x, -delph2, this.svp.arrOsi2[i].p.y));



			}
		


			
			this.drahKontur()
			

			geometry.setAttribute( 'position', new THREE.Float32BufferAttribute( vertices, 3 ) );
			geometry.setAttribute( 'normal', new THREE.Float32BufferAttribute( normal, 3 ) ); 
            geometry.setAttribute( 'uv', new THREE.Float32BufferAttribute( uv, 2 ) );
            geometry.computeBoundingBox();
            geometry.computeBoundingSphere();

		}

		var mx,mx1,my,my1,ww,hh,x,x1,x2,x3,os, mmZ;
		this.drahKontur=function(){
			mx=99999999;
			my=99999999;
			mx1=-99999999;
			my1=-99999999;
			for (var i = 0; i < this.arrDin.length; i++) {
				if(mx>this.arrDin[i].x)mx=this.arrDin[i].x;
				if(my>this.arrDin[i].y)my=this.arrDin[i].y;
				if(mx1<this.arrDin[i].x)mx1=this.arrDin[i].x;
				if(my1<this.arrDin[i].y)my1=this.arrDin[i].y;	
			}
			ww=mx1-mx;
			hh=my1-my;
			mmZ= this.par._height-50
			for (var i = 0; i < this.arrDin.length; i+=3) {
				if(this._boolMinH==false){
					vertices.push(this.arrDin[i].x,  this.arrDin[i].y,    this.arrDin[i].z);
            		vertices.push(this.arrDin[i+1].x,  this.arrDin[i+1].y,    this.arrDin[i+1].z);
            		vertices.push(this.arrDin[i+2].x,  this.arrDin[i+2].y,    this.arrDin[i+2].z); 
				}else{
            		vertices.push(this.arrDin[i].x,  this.arrDin[i].y,    mmZ);
            		vertices.push(this.arrDin[i+1].x,  this.arrDin[i+1].y,   mmZ);
            		vertices.push(this.arrDin[i+2].x,  this.arrDin[i+2].y,    mmZ); 					
				}
				





            	uv.push((this.arrDin[i].x-mx)/ww,  (this.arrDin[i].y-my)/hh);
            	uv.push((this.arrDin[i+1].x-mx)/ww,  (this.arrDin[i+1].y-my)/hh);
            	uv.push((this.arrDin[i+2].x-mx)/ww,  (this.arrDin[i+2].y-my)/hh); 

            	normal.push(0,  1, 0);
            	normal.push(0,  1, 0);
            	normal.push(0,  1, 0);  
			}

			
		}



		this.drahThree=function(){
			this.triangulateShape.start(this.arrDin);

			
			
		}



		this.drawWindow=function(kR,xxx){
			
			//this.mesh1.position.x=xxx
			//kR.setGeomBool1(this.geometry1, this.par.par._delph);
		}

		this.dragMat=function(){     		
	     	if(this._active!==true){
	     		this.mesh.material=this.mat
	     	}else{
	     		this.mesh.material=this.mat1
	     	}
	    }
		

	}
	set material(value) {		
        if(this._material!==value){
            this._material= value;
            this.mesh.material=this._material;            
        }
    }    
    get material() { return  this._material;}

    set boolMinH(value) {
        if(this._boolMinH!=value){
            this._boolMinH= value;
        	this.setGrani()
        }
    }    
    get boolMinH() { return  this._boolMinH;} 

    set active(value) {
        if(this._active!=value){
            this._active= value;
           	this.dragMat()
          /*  if(!value)this.vergLittel.material= window.pm.matDop.getIDObj(1)
            else this.vergLittel.material= window.pm.matDop.getIDObj(10)*/
        
        }
    }    
    get active() { return  this._active;}

}










export class VergLittel{
    constructor( par , material) {
    	var self = this;
		this.type = 'VergLittel';	
		this.par=par;
		this.geometry=new PlaneXZ();	
		this.rendSahTextur=0;

		this.korektLine=this.par.korektLine;

		this._material=material;
		this.mesh=new THREE.Mesh(this.geometry,this._material)
		this.par.cont3d.add(this.mesh)
		this.normalPosit=new THREE.Vector3(0,1,0)


		this.geometry1=new PlaneXZ();
		this._material1=material;
		this.mesh1=new THREE.Mesh(this.geometry1,this._material1)
		this.par.cont3d.add(this.mesh1)



		this.arrLine=[];
		this.arrLineCesh=[]	

		this.clearAL=function(){
			this.arrLine.length=0;			
		}

		this.getLine=function(){
			if(this.arrLineCesh[this.arrLine.length]==undefined){
				this.arrLineCesh[this.arrLine.length]={p:{x:0,y:0,z:0},p1:{x:0,y:-100,z:0}}
			}		
			this.arrLine.push(this.arrLineCesh[this.arrLine.length])		
			return this.arrLine[this.arrLine.length-1];
		}




		var i,j,k,line,ll,ggg,bb
		this.setGrani=function(gran,gran1){	
			this.clearAL();
			//return
			bb=false
			if(gran.boolVergDrag==false&&gran1.boolVergDrag==false)bb=true


			if(this.par.par.windows.array.length!=0)bb=false	

			if(bb==true){
				i=0
				for (j = 0; j < this.par.arrGrani[i].arr.length; j++) {
					line=this.par.arrGrani[i].arr[j];
					
					if(line.dist!=0){
						ll=this.getLine()
						ll.p.x=line.p.x
						ll.p.y=line.p.y
						ll.p.z=line.p.z
						ll.p1.x=line.p1.x
						ll.p1.y=line.p1.y
						ll.p1.z=line.p1.z
					}

				}
				i=1
				for (j = 0; j < this.par.arrGrani[i].arr.length; j++) {
					line=this.par.arrGrani[i].arr[j];
					
					if(line.dist!=0){
						ll=this.getLine()
						ll.p.x=line.p.x
						ll.p.y=line.p.y
						ll.p.z=line.p.z
						ll.p1.x=line.p1.x
						ll.p1.y=line.p1.y
						ll.p1.z=line.p1.z
					}
				}
			}else{
				for (i = 0; i < 2; i++) {
					for (j = 0; j < this.par.arrGrani[i].arr.length; j++) {
						for (k = 0; k < this.par.arrGrani[i].arr[j].arrLine1.length; k++) {
							line=this.par.arrGrani[i].arr[j].arrLine1[k]			
							ll=this.getLine()
							ll.p.x=line.p.x
							ll.p.y=line.p.y
							ll.p.z=line.p.z
							ll.p1.x=line.p1.x
							ll.p1.y=line.p1.y
							ll.p1.z=line.p1.z
						}
					}
				}

			}

			
			
			


			this.korektLine.offset=this.par.par._offset


			this.korektLine.arrLine=this.arrLine;
			this.korektLine.start()


			this.korektLine.setGeom(this.geometry);
			

			

			



		}	


		this.drawWindow=function(kR,xxx){
			
			this.mesh1.position.x=xxx
			kR.setGeomBool1(this.geometry1, this.par.par._delph);
		}
		

	}
	set material(value) {		
        if(this._material!==value){
            this._material= value;
            this.mesh.material=this._material;            
        }
    }    
    get material() { return  this._material;}
}






