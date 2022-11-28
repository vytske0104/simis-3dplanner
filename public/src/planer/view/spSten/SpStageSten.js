import { SpliceSten } from './sten/SpliceSten.js';//Стенка
import { SpPointSten } from './SpPointSten.js';//точка стены
import { SpStage } from './../sp/SpStage.js';//Родитель стейджа
import { WorldBlok } from './worldBlok/WorldBlok.js';//хронитель обьектов
import { SpPolygon } from './polygon/SpPolygon.js';//полы
import {TriangulateShape} from './polygon/TriangulateShape.js';//Просчет треугольнков
import { TC3Big } from './sten/TC3Big.js';//Общий подемник точек и там метожды
import { OsiPoint } from './sten/OsiPoint.js';// Оси направлений

import { Info33But } from './sten/Info33But.js';// Оси направлений
/**
* Мир для сращалок дорог
* @class
* @extends SpStage
*/
export function SpStageSten (par,  fun) {
	SpStage.call(this);
	var self = this;


	this.type = 'SpStageSten';	
	this.par=par;
	this.param=par.param

	this.tipSplice = 'SpliceSten';
	this.tipPoint = 'SpPointSten';

	this._idArr=-1;
	this.fun = fun;
	this.uuid=calc.generateRendom(2);
	this._boolMax=true;
	this._lineOpor = false;
	this._activeVephPoint = false;
	this._offset = 0;
	this._delph = 20;
	this._height=par._height+par._height2;	
	this.minH = 50;//Для опуска на 0 шаге
	this._boolMinH = false;//стены на высоту, обьекты прячем

	this._razVisi=true;
	this._razWindow=false;

	this._mast=1

	this.cylinderGeometry = new THREE.CylinderGeometry( 1,1,1,22)
	this.boxGeometry = new THREE.BoxGeometry( 1,1,1)
	this.sphereGeometry = new THREE.SphereGeometry( 0.5, 16, 16 )

	this.coneGeometry =new THREE.ConeGeometry( 0.25, 1, 16 );
	this.cylinderMaterial = window.pm.matDop.getIDObj(6)
	this.materialVerh1 = this.cylinderMaterialActive = window.pm.matDop.getIDObj(7)


	this.arrMat=[
		window.pm.matDop.getIDObj(4),//стена лицевая
		window.pm.matDop.getIDObj(5),//стена внутрения
		window.pm.matDop.getIDObj(1),//стена лицевая
		window.pm.matDop.getIDObj(10),//стена внутрения
	]

	/*trace("this.arrMat",this.arrMat[0])
	//visi3D.render()
	var m=new THREE.MeshPhongMaterial()
	trace("this.arrMat",m.clone())*/

	this.arrMatAlpha=[]
	//setTimeout(function() {
	for (var i = 0; i < self.arrMat.length; i++) {
		self.arrMat[i].userData={}		
		var m=self.arrMat[i].clone()
		m.transparent=true;
        m.opacity=0.5;
		this.arrMatAlpha[i]=m
	}

	//}, 1000);
	

	/*this.arrMatAlpha=[
		window.pm.matDop.getIDObj(7),//стена лицевая
		window.pm.matDop.getIDObj(8),//стена внутрения
	]*/
	



    this.content3d = new THREE.Object3D();
    this.par.content3d.add(this.content3d)
    this.content3dPoint = new THREE.Object3D();
    this.content3d.add(this.content3dPoint);
    this.content3dPol = new THREE.Object3D();
    this.content3d.add(this.content3dPol);

    this.content3dBox= new THREE.Object3D();
    this.content3d.add(this.content3dBox);
    this.content3d.objStage=this


    this.tc3Big=new TC3Big(this);
    this.osiPoint=new OsiPoint(this);
	this.info33But=new Info33But(this);
	this.worldBlok=new WorldBlok(this);
	this.triangulateShape=new TriangulateShape()


	this.getPoint=function(str){ return new SpPointSten(this);}
	this.getSplice=function(str){return new SpliceSten(this);}
	this.getPol=function(str){ return new SpPolygon(this,str);}


	this.getInfo=function(a){ 
		for (var i = 0; i < this.arrSplice.length; i++) {
			if (this.arrSplice[i].life == false) continue;
			this.arrSplice[i].getInfo(a);
		}	

		for (var i = 0; i < this.arrPol.length; i++) {
			if (this.arrPol[i].life == false) continue;
			this.arrPol[i].getInfo(a);
		}
        this.worldBlok.getInfo(a)          
	}
	
	this.render=function(){	
		if(this.par.renderDebag)this.par.renderDebag()
	}


	//возврощает габаритный контейнер
	this.getRect=function(aPoint, aSten, avp, aLine){ 

		if(aPoint==undefined){
			aPoint=[];
			for (var i = 0; i < this.arrPoint.length; i++) {			
				if (this.arrPoint[i].life==false) continue;					
				aPoint.push(this.arrPoint[i])											
			}
		}
		if(aSten==undefined){
			aSten=[];
			for (var i = 0; i < this.arrSplice.length; i++) {
				if (this.arrSplice[i].life == false) continue;				
				aSten.push(this.arrSplice[i])
			}
		}

		if(avp==undefined){
			avp=[];
			for (var i = 0; i < this.avp.length; i++) {
				if (this.avp[i].life == false) continue;				
				avp.push(this.avp[i])
			}
		}


		var r={x:9999999,y:999999,x1:-9999999,y1:-9999999,w:0,h:0}
		for (var i = 0; i < avp.length; i++) {
			korRect(r,avp[i].position)	
		}
		for (var i = 0; i < aPoint.length; i++) {
			korRect(r,aPoint[i].position)	
		}
		for (var i = 0; i < aSten.length; i++) {
			aSten[i].poiskGran();
			korRect(r,aSten[i].arrGran[0]);
			korRect(r,aSten[i].arrGran[1]);
			korRect(r,aSten[i].arrGran[2]);
			korRect(r,aSten[i].arrGran[3]);
		}

		for (var i = 0; i < aLine.length; i++) {			
			korRect(r,aLine[i].pT);
		}
		r.w=r.x1-r.x
		r.h=r.y1-r.y
		return r;
	}
	function korRect(r,p){
		if(r.x>p.x)r.x=p.x;
		if(r.y>p.y)r.y=p.y;
		if(r.x1<p.x)r.x1=p.x;
		if(r.y1<p.y)r.y1=p.y;	
	}

	this.bigDrag=function(b){		
		for (var i = 0; i < this.arrSplice.length; i++) {
			if (this.arrSplice[i].life==false) continue;				
			this.arrSplice[i].dragPost();
		}
		for (var i = 0; i < this.arrPoint.length; i++) {			
			if (this.arrPoint[i].life==false) continue;					
			this.arrPoint[i].dragPost();											
		}	

        for (var i = 0; i < this.arrPol.length; i++) {			
			if (this.arrPol[i].life==false) continue;					
			this.arrPol[i].dragPost();	

		}		
		//this.worldBlok.bigDrag()

		if(b){
			setTimeout(function() {
				for (var i = 0; i < self.arrPol.length; i++) {			
					if (self.arrPol[i].life==false) continue;					
					self.arrPol[i].dragTime();											
				}
			}, 1);
		}		
	}



	this.arrFun=[];
	this.arrObj=[];
	this.addObjFun=function(o){
		for (let i = 0; i < this.arrObj.length; i++) {
			if(this.arrObj[i]._uuid==o._uuid){
				return;
			}
		}		
		this.arrObj.push(o);
	}
	self.funFDO
	self.funFDO1
	var bb=false
	this.doRender=function(){
		if(self.arrObj.length==0)return false;	
		bb=false
		for (let i = 0; i < self.arrObj.length; i++) {
			self.arrObj[i].dragPost();
			if(self.arrObj[i].type=="SpliceSten")bb=true
		}

		//if(bb==true)self.worldBlok.doRSten()
		self.arrObj.length=0;
		self.tc3Big.drag();
		if(self.funFDO)self.funFDO();
		if(self.funFDO1)self.funFDO1();

		return true;	
	}	



	this.arrFun1=[];
	this.arrObj1=[];
	this.addObjFun1=function(o){		
		for (let i = 0; i < this.arrObj1.length; i++) {
			if(this.arrObj1[i]._uuid==o._uuid){
				return;
			}
		}		
		this.arrObj1.push(o);
	}

	this.doRender1=function(){
		if(self.arrObj1.length==0)return false;	
		for (let i = 0; i < self.arrObj1.length; i++) {			
			self.arrObj1[i].dragPost();			
		}
		self.arrObj1.length=0;
		return true;	
	}
}


SpStageSten.prototype = Object.create(SpStage.prototype);
SpStageSten.prototype.constructor = SpStageSten;

SpStageSten.prototype.getObj = function (_activ) {
	var o = SpStage.prototype.getObj.call(this, _activ);	
	o.height=this._height;
	//o.worldBlok=this.worldBlok.getObj();
	return o;
};
SpStageSten.prototype.setObj = function (o) {	
	SpStage.prototype.setObj.call(this, o);
	if(o.name!=undefined)this.name=o.name;		
	//if(o.worldBlok!=undefined)this.worldBlok.setObj(o.worldBlok);	
	this.bigDrag(true)	
	this.osiPoint.redrag()  	
};


SpStageSten.prototype.craetSplice1 = function () {	
	var s=SpStage.prototype.craetSplice1.call(this);
	return s
};

SpStageSten.prototype.craetPoint = function () {	
	var s=SpStage.prototype.craetPoint.call(this);	
	return s
};

SpStageSten.prototype.craetPol = function (type) {	
	var s=SpStage.prototype.craetPol.call(this,type);	
	return s
};

SpStageSten.prototype.craetVP = function () {
	var s=SpStage.prototype.craetVP.call(this);	
	return s
};


SpStageSten.prototype.clear = function () {	
	var s=SpStage.prototype.clear.call(this);	
	return s
};


Object.defineProperties(SpStageSten.prototype, {



	mast: {
		set: function (value) {	
			if(this._mast!=value)	{		
				this._mast = value;	
				
				this.info33But.mast = value;
				this.tc3Big.mast = value;	
				this.worldBlok.mast = value;		
	            for (var i = 0; i < this.arrSplice.length; i++) {	
	            	this.arrSplice[i].mast=this._mast;								
				}
				for (var i = 0; i < this.arrPoint.length; i++) {			
									
					this.arrPoint[i].mast=this._mast*facade._mastYmn;											
				}
			}			
		},
		get: function () {			
		 	return this._mast;
		}
	},

	razVisi: {
		set: function (value) {	
			if(this._razVisi!=value)	{		
				this._razVisi = value;			
	            for (var i = 0; i < this.arrSplice.length; i++) {	
	            	this.arrSplice[i].razmeru.razVisi=this._razVisi;								
				}
				
			}			
		},
		get: function () {			
		 	return this._razVisi;
		}
	},

	razWindow: {
		set: function (value) {	
			if(this._razWindow!=value)	{		
				this._razWindow = value;			
	            for (var i = 0; i < this.arrSplice.length; i++) {	
	            	this.arrSplice[i].razmeru.boolWindow=this._razWindow;								
				}
				
			}			
		},
		get: function () {			
		 	return this._razWindow;
		}
	},

	lineOpor: {
		set: function (value) {	
			if(this._lineOpor!=value)	{		
				this._lineOpor = value;			
	            for (var i = 0; i < this.arrSplice.length; i++) {	
	            	this.arrSplice[i].lineOpor=this._lineOpor;								
				}
				for (var i = 0; i < this.arrPoint.length; i++) {
					this.arrPoint[i].lineOpor=this._lineOpor;	
				}
			}			
		},
		get: function () {			
		 	return this._lineOpor;
		}
	},

	activeVephPoint: {
		set: function(value) {
			if (this._activeVephPoint != value) {
				this._activeVephPoint = value;
				for (var i = 0; i < this.arrSplice.length; i++) {
					this.arrSplice[i].activeVephPoint = this._activeVephPoint;
				}
			}
		},
		get: function() {
			return this._activeVephPoint;
		}
	},


	boolMinH: {
		set: function(value) {
			if (this._boolMinH != value) {
				this._boolMinH = value;
				for (var i = 0; i < this.arrSplice.length; i++) {
					this.arrSplice[i].boolMinH = this._boolMinH;
				}
			}
		},
		get: function() {
			return this._boolMinH;
		}
	},

	height: {
		set: function(value) {
			for (var i = 0; i < this.arrSplice.length; i++) {
				if (this.arrSplice[i]._boolHHH == false) this.arrSplice[i].height = value;
				this.arrSplice[i].draw1();
			}
			var pp, ppOld
			ppOld = Math.round(this._height)
			pp = Math.round(value)
			for (var i = 0; i < this.avp.length; i++) {
				if (this.avp[i].position.z >= ppOld) {
					//this.avp[i].position.z=pp
				}
			}
			for (var i = 0; i < this.arrPoint.length; i++) {
				if (this.arrPoint[i].position.z >= ppOld) {
					this.arrPoint[i].position.z = pp
				}
			}

			for (var i = 0; i < this.arrPoint.length; i++) {
				if (!this.arrPoint[i].life) continue;
				this.arrPoint[i].dragGG();
			}
			this._height = value;
		},
		get: function() {
			return this._height;
		}
	},
});


