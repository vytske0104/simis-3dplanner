

import { TLabel } from '../../../../t3d/TStyle.js';

export class TCompArrow {
	constructor(c3d, fun, gB, mat, mat1, mat2, mat3, mat4) {
		this.type="TCompArrow";
        var self=this;
       	this.c3d=c3d
        this.fun=fun;
        this.gB=gB//Сединдре геометри
        if(!gB){
        	this.gB= new THREE.BoxBufferGeometry(1,1,1)
        }
        if(mat)this._material=mat;
        else this._material=new THREE.MeshBasicMaterial({color:0x000000});   
        if(mat1)this._material1=mat1;
        else this._material1=new THREE.MeshBasicMaterial({color:0xaaaaaa}); 
        if(mat2)this._material2=mat2;
        else this._material2=new THREE.MeshBasicMaterial({color:0xff0000});
        
        this._material3=undefined;
        if(mat3)this._material3=mat3;

        this._bMat3=false;

        this._mast=1
      
        this._boolText=true;
        this._activeButton=false;
        this._life=true;
        this._gage=0.2;
        this._fontSize=12;
        this._distans=0;
        this._otstup=15;
        this._bDurka=true;
        this._bVerh=true;
        this._bRotation=true;
        this._bRotZ=0;
        this._zdvih = 0;


        this._radius=1

        this.dragss=function(){self.drag()}
        var ww,hhe
        this.drag=function(){        	
        	let dist=this._distans;
        	if(this._distans==0)return
        	ww=	this.tLabel.width;
        	if(this._bRotZ==1 || this._bRotZ==3)ww= this._fontSize*this._mast

        	this.c3dL.position.x=-this.tLabel.width/2;


        	let dist1=dist-ww-this._otstup*2
        	let dist2=dist1/2;
        	

        	this.c3dLabel.position.x=dist/2;

        	if(this._bDurka==true){
        		this.a[1].visible=true
        		this.c3dLabel.position.y=this._zdvih*this._mast;;
	        	this.a[0].scale.y=dist2
	        	this.a[0].position.x=dist2/2;
	        	this.a[1].scale.y=dist2
	        	this.a[1].position.x=dist-dist2/2;        		
        	}else{
        		this.a[1].visible=false
        		this.a[0].scale.y=dist;
	        	this.a[0].position.x=dist/2;

                
                if(this._bRotZ==1 || this._bRotZ==3){
                    hhe=this.tLabel.width/2+this._otstup
                    if(this._bVerh==true){
                        this.c3dLabel.position.y=hhe;
                    }else{
                        this.c3dLabel.position.y=-hhe;
                    }

                }else{
                    if(this._bVerh==true){
                        this.c3dLabel.position.y=this._fontSize+this._zdvih*this._mast;;
                    }else{
                        this.c3dLabel.position.y=-this._fontSize+this._zdvih*this._mast;;
                    }
                }
                

	        	
	        	//this.c3dLabel.position.y=-22
        	}

        	this.a[0].position.y=this._zdvih;
        	this.a[1].position.y=this._zdvih;

        	if(this.a[5]!=undefined){
        		this.a[5].position.x=dist;
        	}	



        	if(this._activeButton == true){				
				this.a[2].scale.set(this._fontSize*this._mast,this.tLabel.width,  2)	
				this.a[3].scale.set(this._fontSize*this._mast+2,this.tLabel.width+this._otstup,  0.2)
			}

			
        }	

        this.position=new PositionFun(0,0,0,this.dragss);
        this.position1=new PositionFun(0,0,0,this.dragss);



        this.content3d=new THREE.Object3D();
        this.c3d.add(this.content3d); 
        this.c3dLabelYY=new THREE.Object3D();
        this.c3dLabel=new THREE.Object3D();

        this.c3dL=new THREE.Object3D();
        this.content3d.add(this.c3dLabel);
        this.c3dLabel.add(this.c3dLabelYY);

        this.c3dLabelYY.add(this.c3dL);




        /*let aa=new THREE.AxesHelper(20);
    	this.content3d.add(aa);*/

        this.tLabel=undefined
		this.a=[];
        this.init=function(){ 

			this.a[0]=new THREE.Mesh(this.gB, this._material);//центр
			this.a[0].rotation.z=Math.PI/2;
			this.content3d.add(this.a[0]);

			this.a[1]=new THREE.Mesh(this.gB, this._material);//право			
			this.a[1].rotation.z=Math.PI/2;
			this.content3d.add(this.a[1]);

			this.a[2]=new THREE.Mesh(this.gB, this._material);//право			
			this.a[2].rotation.z=Math.PI/2;
			this.c3dLabel.add(this.a[2]);
			this.a[2].visible=false;
			this.a[2].objGlob=this;
			this.a[2].layers.set(31);

			this.a[3]=new THREE.Mesh(this.gB, this._material1);//право			
			this.a[3].rotation.z=Math.PI/2;
			this.c3dLabel.add(this.a[3]);
			this.a[3].visible=false;

	
			this.tLabel=new TLabel(this.c3dL,0,0,"Text");

			this.c3dLabel.rotation.x=Math.PI;


			this.tLabel.gage=this._gage;
			this.tLabel.fontSize=this._fontSize*this._mast;
			
			this.c3dL.position.y=this._fontSize*this._mast/2;
			this.c3dL.position.x=-this.tLabel.width/2;

			if(mat4)this.tLabel.material=mat4;
			else this.tLabel.material=this._material;

			
        }

        this.dragMat=function(){
            
            if(this._active==false){
                this.a[3].material = this._material1
            }else{
                this.a[3].material = this._material2
            }   
            
             
        }

        this.getDistance = function (p1, p2) {			
			return Math.sqrt(Math.pow((p1.x - p2.x), 2) + Math.pow((p1.y - p2.y), 2) + Math.pow((p1.z - p2.y), 2));
		};

		this.dragText = function () {
			this.tLabel.text=Math.round(this._distans)+"";
		}
		this.init()	
	}





	set zdvih(v) { 

        if(this._zdvih!=v){ 
            this._zdvih=v;            
           	if(this.a[4]==undefined){
           		this.a[4]=new THREE.Mesh(this.gB, this._material);//право			
				this.content3d.add(this.a[4]);
				
				this.a[5]=new THREE.Mesh(this.gB, this._material);//право			
				this.content3d.add(this.a[5]);
           	} 
           	if(this._zdvih==0){
           		this.a[4].visible=this.a[5].visible=false;
           	}else{
           		this.a[4].visible=this.a[5].visible=true;
           		this.a[4].scale.y=this._zdvih
           		this.a[5].scale.y=this._zdvih

           		this.a[4].position.y=this._zdvih/2
           		this.a[5].position.y=this._zdvih/2
           	}

           	this.drag();		

        }       
    }   
    get zdvih() { return  this._zdvih;}

    set boolText(v) { 

        if(this._boolText!=v){ 
            this._boolText=v;            
            this.c3dL.visible=v  
        }       
    }   
    get boolText() { return  this._boolText;}
    


    

	set radius(v) { 

        if(this._radius!=v){ 
            this._radius=v;            
           	this.a[0].scale.x=  v;
           	this.a[0].scale.z=  v; 
           	this.a[1].scale.x=  v;
           	this.a[1].scale.z=  v;   
        }       
    }   
    get radius() { return  this._radius;}

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

    set otstup(v) {        
        if(this._otstup!=v){ 
            this._otstup=v; 
           	this.drag();     
        }       
    }   
    get otstup() { return  this._otstup;}

    set bMat3(v) {        
        if(this._bMat3!=v){ 
            this._bMat3=v; 
            if(this._material3 ){
            	if(this._bMat3){
            		this.a[0].material=this._material3 
					this.a[1].material=this._material3 
            	}else{
            		this.a[0].material=this._material 
            		this.a[1].material=this._material 
            	}
            }
           	 
        }       
    }   
    get bMat3() { return  this._bMat3;}


	/*set gage(v) {        
        if(this._gage!=v){ 
            this._gage=v; 
           	    
        }       
    }   
    get gage() { return  this._gage;}*/

    set active(v) {        
        if(this._active!=v){ 
           //if(this.notZbros==true) v=true
            this._active=v;
            this.dragMat();
            
            visi3D.intRend=1;   
        }       
    }   
    get active() { return  this._active;} 

    set mast(v) { 

        if(this._mast!=v){ 
            this._mast=v;            
            this.tLabel.fontSize=this._fontSize*this._mast; 
            this.c3dL.position.y=(this._fontSize*this._mast)/2;

            this.drag(); 
        }       
    }   
    get mast() { return  this._mast;}
 
	set fontSize(v) {        
        if(this._fontSize!=v){ 
            this._fontSize=v;
            this.tLabel.fontSize=this._fontSize*this._mast; 
            this.c3dL.position.y=this._fontSize*this._mast/2;
           	this.drag();    
        }       
    }   
    get fontSize() { return  this._fontSize;}

	set distans(v) {        
        if(this._distans!=v){ 
            this._distans=v;
            this.dragText()

           	this.drag();    
        }       
    }   
    get distans() { return  this._distans;}

    set activeButton(v) {        
        if(this._activeButton!=v){ 
            this._activeButton=v;
            this.a[2].visible=v;
            this.a[3].visible=v;
            if(v){
            	visi3D.addChildMouse(this.a[2])
            }else{
            	visi3D.removeChildMouse(this.a[2])
            }
           	this.drag();    
        }       
    }   
    get activeButton() { return  this._activeButton;}



    set bDurka(v) {        
        if(this._bDurka!=v){ 
            this._bDurka=v;
           	this.drag();    
        }       
    }   
    get bDurka() { return  this._bDurka;} 


    set bVerh(v) {        
        if(this._bVerh!=v){ 
            this._bVerh=v;
           	this.drag();    
        }       
    }   
    get bVerh() { return  this._bVerh;} 


    set bRotation(v) {        
        if(this._bRotation!=v){ 
            this._bRotation=v;
           	if(this._bRotation==true){
           		this.c3dLabel.rotation.z=0;  
           	}else{
           		this.c3dLabel.rotation.z=Math.PI; 
           	}  
        }       
    }   
    get bRotation() { return  this._bRotation;}  

    set bRotZ(v) {        
        if(this._bRotZ!=v){ 
            this._bRotZ=v;
            this.c3dLabelYY.rotation.z=Math.PI/2*v;  
           	this.drag(); 

           	
        }       
    }   
    get bRotZ() { return  this._bRotZ;}  



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