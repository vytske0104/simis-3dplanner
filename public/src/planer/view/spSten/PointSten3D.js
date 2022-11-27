

/**
* Отображение точки
* @class
*/

import { TLabel } from '../../../t3d/TStyle.js';

export function PointSten3D (_spPointSten) {
	var self = this;

	this.par=_spPointSten
	this._mast=_spPointSten._mast
	this._height = _spPointSten.stage._height;
	this._height1 = _spPointSten.stage._height1;
	this._life = false;
	this._activ = false;
	this._active = false;
	this._alpha = 1;
	this._tipVisi = 0;			// наведенный ли
	this._activMouse = undefined;
	this._pointVisi = true;


	this.visi3D=_spPointSten.stage.visi3D
	this.delph=this.par.par.delph
	
	this.minH =this.par.par.minH
	this.size = 2//this.delph//6//this.size;				// размер центра без наведения
	this.size1 = 13//this.delph//7//this.size/2;				// размер центра с наведения

	this.funDragMenu=undefined
	this.content3d= new THREE.Object3D();
	this.content3dNa= new THREE.Object3D();
	this.content3d.add(this.content3dNa)

    this.mesh=new THREE.Mesh(_spPointSten.stage.cylinderGeometry, _spPointSten.stage.cylinderMaterial)        
    
    this.mesh.name="PointSten";
    this.mesh.objGlob=_spPointSten;    
    this.mesh.rotation.x=Math.PI/2;
    


    this.mesh1=new THREE.Mesh(_spPointSten.stage.cylinderGeometry, _spPointSten.stage.cylinderMaterial)        
    this.content3dNa.add(this.mesh1);
    this.mesh1.name="PointSten";
    this.mesh1.objGlob=_spPointSten;    
    this.mesh1.rotation.x=Math.PI/2;



   	
    this.dragHH = function () {
    	let hh = this._height+this._height1    
    	this.mesh1.scale.set(this.size1*this._mast,this.size,this.size1*this._mast)    	
    	this.mesh1.position.z=-this.minH-(this.size)/2-15//-hh-(this.size)/2-5 

    	/*this.mesh.scale.set(this.size1,hh,this.size1)    
    	this.mesh.position.z=-(hh)/2 */

    	
    }
    this.dragHH()

	this.drag = function () {
		this.content3d.position.x=_spPointSten.position.x;
		this.content3d.position.y=_spPointSten.position.y;

		if(this.funDragMenu!==undefined)this.funDragMenu()
	};

	this.life = true;
	this.activMouse = true;
}
PointSten3D.prototype = {

	set active (v) {
		if (this._active == v) return;
		this._active = v;
		if(this._active==false){
			this.mesh.material=this.mesh.objGlob.stage.cylinderMaterial
			this.mesh1.material=this.mesh.objGlob.stage.cylinderMaterial
		}else{
			this.mesh.material=this.mesh.objGlob.stage.cylinderMaterialActive
			this.mesh1.material=this.mesh.objGlob.stage.cylinderMaterialActive
		}
		
	},
	get active () {
		return this._active;
	},

	set mast (v) {
		if (this._mast == v) return;
		this._mast = v;
		
		this.mesh1.scale.set(this.size1*this._mast,this.size,this.size1*this._mast)  
		
	},
	get mast () {
		return this._mast;
	},



	set life (v) {
		if (this._life == v) return;
		this._life = v;		
		this.content3d.visible = v;	
		if(this._life==true)this.activMouse	=true
	},
	get life () {
		return this._life;
	},

	set activMouse (v) {
		if (this._activMouse == v) return;
		this._activMouse = v;
		if(v)visi3D.event3DArr.addChild(this.content3d);
		else visi3D.event3DArr.removeChild(this.content3d);
	},
	get activMouse () {
		return this._activMouse;
	},

	set height (v) {
		if (this._height == v) return;
		this._height = v;
		this.dragHH()
	},
	get height () {
		return this._height;
	}

};
