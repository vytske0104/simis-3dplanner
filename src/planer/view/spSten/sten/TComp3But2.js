

//import { TLabel } from '../../../../t3d/TStyle.js';

export class TComp3But2 {
	constructor(c3d, fun, gB, gB1, mat, mat1) {
		this.type="TComp3But";
        var self=this;
       	this.c3d=c3d
        this.fun=fun;
        this.gB=gB//Сединдре геометри
        if(!gB){
        	this.gB= new THREE.BoxBufferGeometry(10,10,10)
        }

        this.gB1=gB1//Сединдре геометри
        if(!gB1){
        	this.gB1= new THREE.BoxBufferGeometry(1,10,1)
        }
        

        if(mat)this._material=mat;
        else this._material=new THREE.MeshBasicMaterial({color:0xff0000});
        if(mat1)this._material1=mat1;
        else this._material1=new THREE.MeshBasicMaterial({color:0x00ff00}); 

        
   
        this._life=true;
        this._otstup=10;
        this._otstupZ=3;
        this._scale=5;

   		this.content3d=new THREE.Object3D();
        this.c3d.add(this.content3d);        

        this.content3d.objGlob=this



       /* let aa=new THREE.AxesHelper(20);
    	this.content3d.add(aa);*/


		this.button=null
		this.button1=null
		this.button2=null


        this.drag=function(){        	
        	this.button.drag();
            this.button1.drag();
            this.button2.drag();
        }	





     	this.arrButton=[]

        this.init=function(){ 

			this.button=new TCBut0(this, this.gB, this._material,this._material1,0)
			this.button1=new TCBut(this, this.gB1, this._material,this._material1,1)
			this.button2=new TCBut(this, this.gB1, this._material,this._material1,2)

            this.button.idArr=0;
            this.button1.idArr=1;
            this.button2.idArr=2;

            this.arrButton.push(this.button, this.button1,this.button2)

	
            this.button.scale=this._scale;
            this.button1.scale=this._scale;
            this.button2.scale=this._scale;
		   
        }

        this.dragO =function(){
            let zz=this.button1._z-this.button2._z;
            if(zz==0)zz=0.001
            this.button.dist=zz;
            
            this.button.dragScale()    
        }
        
		this.init()	
	}


	set scale(v) {        
        if(this._scale!=v){ 
            this._scale=v; 
            this.button.scale=this._scale;
            this.button1.scale=this._scale;
            this.button2.scale=this._scale;           
           /*	this.button.mesh.scale.set(this._scale,this._scale,this._scale)
           	this.button1.mesh.scale.set(this._scale,this._scale,this._scale)
           	this.button2.mesh.scale.set(this._scale,this._scale,this._scale) */


        }       
    }   
    get scale() { return  this._scale;}

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
                this.content3d.position.z=-this._z //- this.par._otstupZ;
                this.par.dragO()  
            }       	
        	     
        }

        this.dragScale=function(){            

            if(tip==0){
                this.mesh.rotation.x=-Math.PI/2;           
                this.mesh.scale.set(this._scale*this.s2,this.dist,this._scale*this.s2)
                this.mesh.position.z=-this.par.button1._z+this.dist/2;
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
  

export class TCBut0 extends TCBut  {
    constructor(par, gB, mat, mat1, tip) {
        super(par, gB, mat, mat1, tip);
        this.type="TCBut0";

    }
    set z(v) {        
        if(this._z!=v){ 
            this._z=v; 
              
        }       
    }   
    get z() { return  this._z;}
}
