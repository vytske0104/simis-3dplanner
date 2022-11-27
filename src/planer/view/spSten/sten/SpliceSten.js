
//дополнение к стенам

import { Splice } from './../../sp/Splice.js';
import { Windows } from './Windows.js';
import { SS3D } from './SS3D.js';
import { SVephPoint } from './SVephPoint.js';
import { Razmeru } from './Razmeru.js';

export function SpliceSten (_stage) {
	Splice.call(this,_stage);
	var self = this;
	this.type = 'SpliceSten';
	this.tipe = 'Splice';
	this.stage = _stage;
	this.par = _stage;
	this._boolText = true;
	this._active = false;
	this.idUi=Math.round(Math.random()*1000);
	this._uuid=calc.generateRendom(2);
	this._mast=_stage._mast;
	this.sUi = -1;
	this._offset=_stage._offset;
	this._bChaz=false;
	this.tip=0;
	this._boolAree=true;
	this._boolMinH=this.par._boolMinH;	
	this._height=_stage._height;
	this._lineOpor=this.par._lineOpor//Состояние управления опорных точке и линий
	this._activeVephPoint=this.par._activeVephPoint//Точки резалки 
	this._delph = this.par._delph;// толщина линии

	this._height = this.stage._height;

	this.content3d = new THREE.Object3D();
    this.par.content3d.add(this.content3d);
	this.cont3dSten = new THREE.Object3D();
    this.content3d.add(this.cont3dSten);
    this.content3d.objGlob=this;
    visi3D.event3DArr.addChild(this.cont3dSten);

    this.ss3d=new SS3D(this);//3d стенка
    this.sVephPoint=new SVephPoint(this);//точки на 
	this.windows=new Windows(this);//отрисовываем окна

	this.razmeru=new Razmeru(this);//размеры снизу

	//впихиваем в родителя там надо
    this.arrayClass.push(this.ss3d);
    this.arrayClass.push(this.sVephPoint);   
    this.arrayClass.push(this.windows);
    this.arrayClass.push(this.razmeru);

    //докидуем окна
    this.addBlok = function(blok){      	
    	if(blok==undefined)return -1;    	
    	return this.windows.addBlok(blok);   	
    }


    //removeBlok окна
    this.removeBlok = function(blok){
    	if(blok==undefined)return -1;
    	return this.windows.removeBlok(blok);   	
    }


    this.numBlok=0
    var numBlok
	this.draw1 = function (b) {
		this.windows.draw()	
		this.sVephPoint.draw1();
		this.ss3d.draw1();
		this.razmeru.draw();
		this.par.render();
	}

	this.dragPost=function(){
		this.content3d.position.x=this.position.x;
		this.content3d.position.y=this.position.y;
		this.content3d.rotation.z=this._rotation;		
		this.ss3d.dragPost();
		this.draw1();
		this.stage.render();		
	}

	
	this.dragMat=function(){     		
     	if(this._boolAree){
     		this.ss3d.arrGrani[0].material = this.par.arrMat[0]
     		this.ss3d.arrGrani[1].material = this.par.arrMat[1] 
     		this.ss3d.vergLittel.mat= this.par.arrMat[2] 
     		this.ss3d.vergLittel.mat1= this.par.arrMat[3]  
     		
     		this.ss3d.arrGrani[0].renderOrder=0
     		this.ss3d.arrGrani[1].renderOrder=0
     	}else{
     		this.ss3d.arrGrani[0].material = this.par.arrMatAlpha[0]
     		this.ss3d.arrGrani[1].material = this.par.arrMatAlpha[1]
     		this.ss3d.vergLittel.mat= this.par.arrMatAlpha[2] 
     		this.ss3d.vergLittel.mat1= this.par.arrMatAlpha[3]
     		this.ss3d.arrGrani[0].renderOrder=1
     		this.ss3d.arrGrani[1].renderOrder=1
     	}
     	this.ss3d.vergLittel.dragMat()     	
    }
    this.dragMat()

/*

                    let pppp={x:0,y:0}
                    pppp.x=(sten.addPoint.position.x+sten.addPoint1.position.x)/2
                    pppp.y=(sten.addPoint.position.y+sten.addPoint1.position.y)/2

                   

                    point=self.par.floor.sp.craetPoint();                    
                    let pa=self.par.floor.polDin.array;


                    var p=-1
                    for (var i = 0; i < pa.length; i++) {
                        if(pa[i].uuid==sten.addPoint1.uuid){                           
                            p=i;
                            break
                        }
                    }
                    if(p!=-1)self.par.floor.polDin.addPoint(point,p);
                    


                    var p=self.getPosEv3DSten(e);  
                    var p1= calc.isPointInLin(sten.addPoint.position,sten.addPoint1.position,e.point,1000,1000);                   
                    var sten1=self.par.floor.sp.craetSplice1();
                    
                    
                    //point.position.setPoint(p1);  
                    point.position.setPoint(pppp);                   
                    sten.addPoint.addSplice(sten1,true);
                    sten.addPoint.removeSplice(sten);
                    point.addSplice(sten, true);
                    point.addSplice(sten1,false); 

                    */

    this.delim=function(){
    	let pppp={x:0,y:0}
        pppp.x=(this.addPoint.position.x+this.addPoint1.position.x)/2;
        pppp.y=(this.addPoint.position.y+this.addPoint1.position.y)/2;

        let point=self.par.craetPoint(); 

        let pa=self.par.par.polDin.array;

        var sten1=self.par.craetSplice1();
        sten1.boolAree=this.boolAree    	        
        var p=-1
        for (var i = 0; i < pa.length; i++) {
            if(pa[i].uuid==this.addPoint1.uuid){                           
                p=i;
                break
            }
        }
        if(p!=-1)self.par.par.polDin.addPoint(point,p);            
        //point.position.setPoint(p1);  
        point.position.setPoint(pppp);                   
        this.addPoint.addSplice(sten1,true);
        this.addPoint.removeSplice(this);
        point.addSplice(this, true);
        point.addSplice(sten1,false);

        return sten1
    }

	this.korectOffset=function(){
		
	}
}
SpliceSten.prototype = Object.create(Splice.prototype);
SpliceSten.prototype.constructor = SpliceSten;

SpliceSten.prototype.getObj = function () {
	var o = Splice.prototype.getObj.call(this);
	o.type = this.type;
	o.windows = this.windows.getObj();
	o.sVephPoint = this.sVephPoint.getObj();
	return o;
};
SpliceSten.prototype.setObj = function (o) {
	Splice.prototype.setObj.call(this, o);	
	if (o.boolHHH!== undefined ) this.boolHHH=o.boolHHH;
	if (o.boolObr!== undefined ) this.boolObr=o.boolObr;
	if (o.sVephPoint !== undefined) this.sVephPoint.setObj(o.sVephPoint);	
	if (o.windows !== undefined) this.windows.setObj(o.windows);	
};
SpliceSten.prototype.compare = function (_sten) {
	var rez = true;
	if (!Splice.prototype.compare(this, _sten)) rez = false;
	return rez;
};
SpliceSten.prototype.setSten = function (_sten) {
	Splice.prototype.setSten.call(this, _sten);
};
SpliceSten.prototype.restart = function () {
	Splice.prototype.restart(this);

};

SpliceSten.prototype.drag = function () {
	Splice.prototype.drag.call(this);
	this.stage.addObjFun(this);
	
};
Object.defineProperties(SpliceSten.prototype, {	
	
	mast: {
		set: function (value) {	
			if(this._mast!=value)	{		
				this._mast = value;	
				this.sVephPoint.mast = value;		
	            this.ss3d.mast = value;
	            this.razmeru.mast = value;
			}			
		},
		get: function () {			
		 	return this._mast;
		}
	},


	lineOpor: {
		set: function (value) {	
			if(this._lineOpor!=value)	{		
				this._lineOpor = value;			
	            this.ss3d.lineOpor = value;
			}			
		},
		get: function () {			
		 	return this._lineOpor;
		}
	},

	boolAree: {//читаеться площадь
		set: function (value) {	
			if(this._boolAree!=value)	{		
				this._boolAree = value;	
				this.dragMat()	
	         	this.par.addObjFun(this)
			}			
		},
		get: function () {			
		 	return this._boolAree;
		}
	},

	activeVephPoint: { //показывать верхушку
		set: function (value) {	
			if(this._activeVephPoint!=value)	{		
				this._activeVephPoint = value;			
	            this.sVephPoint.activeVephPoint = value;
			}			
		},
		get: function () {			
		 	return this._activeVephPoint;
		}
	},

	height: {
		set: function (value) {
			if (this._height === value) return;			
			this._height = value;
			this._setAllParam('height', this._height);

		},
		get: function () { return this._height; }
	},

	boolMinH: { // прижать к полу
		set: function (value) {
			if (this._boolMinH === value) return;			
			this._boolMinH = value;	
				
			this._setAllParam('boolMinH', this._boolMinH);
		},
		get: function () { return this._boolMinH; }
	},	

	active: {
		set: function (value) {
			if (this._active === value) return;			
			this._active = value;
			

			this._setAllParam('active', this._active);
		},
		get: function () { return this._active; }
	},

	activMouse: {
		set: function (value) {
			if (this._activMouse == value) return;
			this._activMouse = value;	
			if(value)visi3D.event3DArr.addChild(this.cont3dSten);
			else visi3D.event3DArr.removeChild(this.cont3dSten);

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
			if(this._life==true){
				this.par.content3d.add(this.content3d);
			}
			else {
				this.boolAree=true
				if(this.content3d.parent!=undefined)this.content3d.parent.remove(this.content3d);
			}
		},
		get: function () { return this._life; }
	},
});



