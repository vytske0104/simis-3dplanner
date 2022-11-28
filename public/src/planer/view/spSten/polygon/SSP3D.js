

import { PlaneXZ } from '../../plus/PlaneXZ.js';
//отрисовка стен

export class SSP3D  {
  	constructor(par,fun) {  		
  		this.type="SSP3D";
        var self=this;
        this.par=par;
        this._active = false;
        

        this.content3d = new THREE.Object3D();
        this.par.content3d.add(this.content3d);

        this.cont3d = new THREE.Object3D();
        this.content3d.add(this.cont3d);

        this.cont3dL = new THREE.Object3D();
        this.content3d.add(this.cont3dL); 


        this.planeXZ=new PlaneXZ();



    	this.lineSegments = new THREE.LineSegments(
            this.planeXZ,
            this.par.par.lineBasicMaterial1
        )
        this.cont3dL.add(this.lineSegments);

      
    }

	set active(value) {
        if(this._active!=value){
            this._active= value;            

        }
    }    
    get active() { return  this._active;}

    set life(value) {
        if(this._life!=value){
            this._life= value;
            
                       
        }
    }    
    get life() { return  this._life;}
}


