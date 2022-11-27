

//import { TLabel } from '../../../../t3d/TStyle.js';

export class TComp3But {
	constructor(c3d, fun, gB, gB1, mat, mat1,mat2) {
		this.type="TComp3But";
        var self=this;
       	this.c3d=c3d
        this.fun=fun;
        this._mast=1
        this.gB=gB//Сединдре геометри
        this.uuid = calc.generateRendom(2)
        if(!gB){
        	this.gB= new THREE.BoxBufferGeometry(10,10,10)
        }

        this.gB1=gB1//Сединдре геометри
        if(!gB1){
        	this.gB1= new THREE.BoxBufferGeometry(1,10,1)
        }
        

        if(mat)this._material=mat;
        else this._material=new THREE.MeshBasicMaterial({color:0x0000ff});
        if(mat1)this._material1=mat1;
        else this._material1=new THREE.MeshBasicMaterial({color:0x00ff00}); 

        if(mat2)this._material2=mat2;
        else this._material2=new THREE.MeshBasicMaterial({color:0xff0000}); 
        
   
        this._boolKill=false;
        this._life=true;
        this._otstup=10;
        this._otstupZ=3;
        this._scale=5;

   		this.content3d=new THREE.Object3D();
        this.c3d.add(this.content3d);        

        this.content3d.objGlob=this

        this.dragFun=null

        /*let aa=new THREE.AxesHelper(20);
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

			this.button=new TCBut(this, this.gB, this._material,this._material1)
			this.button1=new TCBut(this, this.gB1, this._material,this._material1)
			this.button2=new TCBut(this, this.gB1, this._material,this._material1)

            this.button.idArr=0;
            this.button1.idArr=1;
            this.button2.idArr=2;
            this.arrButton.push(this.button, this.button1,this.button2)

			this.button1.mesh.position.x=this._otstup;	
			this.button2.mesh.position.x=this._otstup;	
			this.button2.rotationZ=Math.PI;	

			this.button.mesh.scale.set(this._scale,this._scale,this._scale)
           	this.button1.mesh.scale.set(this._scale,this._scale,this._scale)
           	this.button2.mesh.scale.set(this._scale,this._scale,this._scale)   
        }

        this.dragMat=function(){
            for (var i = 0; i < this.arrButton.length; i++) {
                this.arrButton[i].dragMat();
            }
        }

        
		this.init()	
	}

    set mast(v) {        
        if(this._mast!=v){ 
            this._mast=v;
            let mm=  this._mast*facade._mastYmn       
            this.button.mast=mm;
            this.button1.mast=mm;
            this.button2.mast=mm;

            this.button1.mesh.position.x=this._otstup*mm;   
            this.button2.mesh.position.x=this._otstup*mm;
        }  
    }   
    get mast() { return  this._mast;}

    
	set scale(v) {        
        if(this._scale!=v){ 
            this._scale=v; 
            this.button.setScale(this._scale) 
            this.button1.setScale(this._scale)
            this.button2.setScale(this._scale)   

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

    set boolKill(v) {        
        if(this._boolKill!=v){ 
            this._boolKill=v;
            this.dragMat()
                
        }       
    }   
    get boolKill() { return  this._boolKill;}

    

    set otstup(v) {        
        if(this._otstup!=v){ 
            this._otstup=v; 
            this.button1.mesh.position.x=this._otstup*this._mast;	
			this.button2.mesh.position.x=this._otstup*this._mast;
           	this.drag();     
        }       
    }   
    get otstup() { return  this._otstup;}

    set otstupZ(v) {        
        if(this._otstupZ!=v){ 
            this._otstupZ=v;             
            this.drag();     
        }       
    }   
    get otstupZ() { return  this._otstupZ;}   


}

export class TCBut {
	constructor(par, gB, mat, mat1) {
		this.type="TCBut";
        var self=this;
        this.notZbros=false
        this._z=0;
     	this._rotationX=0;
     	this._rotationZ=0;

        this._mast=par._mast;

        this._active=false;

        this.par=par;
        this.gB=gB;
        this.mat=mat;
        this.mat1=mat1;

        this.content3d=new THREE.Object3D();
        this.par.content3d.add(this.content3d); 

        this.content3d1=new THREE.Object3D();
        this.content3d.add(this.content3d1);


        this.mesh=new THREE.Mesh(gB, mat);//центр
        this.mesh.rotation.z=-Math.PI/2	
		this.content3d1.add(this.mesh);
        this.mesh.button=this

		this.drag=function(){        	
        	this.content3d.position.z=-this._z - this.par._otstupZ;
            if(this.par.dragFun)this.par.dragFun()
        }


        this.dragMat=function(){
            if(this.par._boolKill==true){
                this.mesh.material = this.par._material2
            }else{
                if(this._active==false){
                    this.mesh.material = this.mat
                }else{
                    this.mesh.material = this.mat1
                }   
            }
             
        }	

        this.scal=1
        this.setScale=function(_scale) {
            this.scal=_scale
            this.mesh.scale.set(this.scal*this._mast,this.scal*this._mast,this.scal*this._mast);

        }  

         

    }

   
    set mast(v) {        
        if(this._mast!=v){           
            this._mast=v; 
            this.mesh.scale.set(this.scal*this._mast,this.scal*this._mast,this.scal*this._mast);
            visi3D.intRend=1;   
        }       
    }   
    get mast() { return  this._mast;} 


    set active(v) {        
        if(this._active!=v){ 
            if(this.notZbros==true) v=true
            this._active=v;
            this.dragMat();
            
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
    
    set rotationX(v) {        
        if(this._rotationX!=v){ 
            this._rotationX=v; 
            this.content3d1.rotation.y= v;
           	this.drag();     
        }       
    }   
    get rotationX() { return  this._rotationX;} 
    
    set rotationZ(v) {        
        if(this._rotationZ!=v){ 
            this._rotationZ=v;
            this.content3d.rotation.z= v;
           	this.drag();     
        }       
    }   
    get rotationZ() { return  this._rotationZ;} 
    


}
       