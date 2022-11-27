

import { Facade } from './Facade.js';

export class View  {
  	constructor(par, fun) {  		
  		this.type="View";
        var self=this;
        this.par=par;
        this.fun=fun;
        this.param=this.par.param;
        this.content3d=new THREE.Object3D();
        this.par.content3d.add(this.content3d)
        this.array=[]  


        this.init = function(){
            this.facade=new Facade(this, function(s,p,p1){

            })
            this.cylinderGeometry = new THREE.CylinderBufferGeometry( 100000,100,10,32)
            this.cylinderGeometry = new THREE.CylinderBufferGeometry( 10000, 10000, 100, 32)
            this.meshPlan = new THREE.Mesh(this.cylinderGeometry, window.pm.matDop.getIDObj(9));
            this.meshPlan.rotation.x=Math.PI/2
            this.meshPlan.position.z=50;
            this.content3d.add(this.meshPlan)
            visi3D.objShadow(this.meshPlan) 
        }

        this.upDate=function(){            
            this.facade.upDate();                
        }

        var w,h,s;
        this.sizeWindow = function(_w,_h,_s){  
            if(_w){
                w= _w;
                h= _h;
                s= _s;   
            }           
        }
        this.init();

  	}

    set index(value) {       
        if (this._index != value) {           
            this._index = value;
            
        }
    }
    get index() {
        return this._index;
    }
}
