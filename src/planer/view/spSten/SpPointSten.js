
import { SpPoint } from './../sp/SpPoint.js';
//import { PTButton } from './PTButton.js';
import {PointSten3D } from './PointSten3D.js';

/**
* Данные для точек дороги
* @class
* @extends SpPoint
*/
export function SpPointSten (_stage) {
	SpPoint.call(this);
	var self = this;
	this.type = 'SpPointSten';
	this.tipe = 'SpPointSten';
	this.stage = _stage;
	this.par = _stage;
	this._height = 150//_stage._height;

	this._mast = _stage._mast;

	this._active=false
	this._activMouse=_stage._amPoint
	this._lineOpor=this.par._lineOpor;

	this._mashtabNa=this.par._mashtabNa

	this.arrayClass.push(new PointSten3D(this));// визализируем стену
	_stage.content3dPoint.add(this.arrayClass[0].content3d);

	this.arrayClass[0].content3dNa.visible=this._lineOpor

    this.funDragMenu=undefined;
	


    this.funDragVokrug=function(a,a1){   
   
    	for (var i = 0; i < a1.length; i++) {    	
    		a1[i].dragPost();
    	}
    }



    this.dragPost=function(){ 
    	this.dragVokrug();
		if(this.funDragMenu!=undefined)this.funDragMenu();
		
	}



	this.doFunRend=function(){ 
		this.par.addObjFun(this);
	}





	this.getTypeConnect = function () {
		var res = ['AidPoint'];
		if (this.arrIdSten.length > 0) {
			res.push('Sten');
		}
		return res;
	};

	
}
SpPointSten.prototype = Object.create(SpPoint.prototype);
SpPointSten.prototype.constructor = SpPointSten;

SpPointSten.prototype.getObj = function () {
	var o = SpPoint.prototype.getObj.call(this);
	o.type = this.type;

	return o;
};
SpPointSten.prototype.setObj = function (o) {
	SpPoint.prototype.setObj.call(this, o);

	// if(o.type != undefined) this.type = o.type;
};


Object.defineProperties(SpPointSten.prototype, {
	// Отображение точек


	mast: {
		set: function (value) {
			if (this._mast == value) return;
			this._mast = value;		
			this.arrayClass[0].mast=this._mast
		},
		get: function () { return this._mast; }
	},



	lineOpor: {
		set: function (value) {
			if (this._lineOpor == value) return;
			this._lineOpor = value;		
			this.arrayClass[0].content3dNa.visible=this._lineOpor
		},
		get: function () { return this._lineOpor; }
	},

	active: {
		set: function (value) {
			if (this._active == value) return;
			this._active = value;
			//this.stAct.sahAct=value ? 40: 0;
			/*this.button.active=this._active*/
			for (var ii = 0; ii < this.arrayClass.length; ii++) {
				if ('active' in this.arrayClass[ii]) this.arrayClass[ii].active = this._active;
			}
		},
		get: function () { return this._active; }
	},

	height: {
		set: function (value) {
			if (this._height == value) return;
			this._height = value;
			for (var ii = 0; ii < this.arrayClass.length; ii++) {
				if ('height' in this.arrayClass[ii]) this.arrayClass[ii].height = this._height;
			}
		},
		get: function () { return this._height; }
	},
	activMouse: {
		set: function (value) {
			if (this._activMouse == value) return;
			this._activMouse = value;
			for (var ii = 0; ii < this.arrayClass.length; ii++) {
				if ('activMouse' in this.arrayClass[ii]) this.arrayClass[ii].activMouse = this._activMouse;
			}
		},
		get: function () { return this._activMouse; }
	},
	life: {
		set: function (value) {
			if (this._life == value) return;
			this._life = value;	
			
			for (var ii = 0; ii < this.arrayClass.length; ii++) {
				if ('life' in this.arrayClass[ii]) this.arrayClass[ii].life = this._life;
			}		
		},
		get: function () { return this._life; }
	},

	


	mashtabNa: {
		set: function (value) {	
			if(this._mashtabNa!=value)	{
				this._mashtabNa = value;
				//this.graphics.scale.set(this._mashtabNa,this._mashtabNa)
				
			}			
		},
		get: function () {			
		 	return this._mashtabNa;
		}
	},

});





