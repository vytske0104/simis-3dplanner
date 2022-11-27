
import { CurveUtill } from './CurveUtill.js';
import { CollisionRect} from './../collision/CollisionRect.js';
//import { GeometrySten2} from './GeometrySten2.js';
/**
*Хронитель окон
*/
export function Windows (_sten, isNot3D) {
	var self = this;
	this.type = 'Windows';
	this.sten = _sten;
	this.par = _sten;
	this._height = this.sten._height;
	this._life = false;
	this._tip = this.sten.tip;

	this._boolMinH = this.par._boolMinH;


	var visi3D=_sten.stage.visi3D
	this._delph = this.sten._delph;
	this.arrBlok = [];
	this.idRandom=Math.random();

	this.windowsCollision = new WindowsCollision(this);
	this.collision = this.windowsCollision.collision;
	
	this.content3d = new THREE.Object3D();
	this.par.cont3dSten.add(this.content3d)

	this.content3d.visible=!this._boolMinH;

	this._col3d=_sten.col3d;
	this._col3d1=_sten.col3d1;

	this.notColosiOne=false
	//if (!isNot3D) {
		/*this.sten3DLine = new Sten3DLine(this);
		this.content3d.add(this.sten3DLine.content3d);*/
	//}

	//this.content2d = new PIXI.Container();
	//this.sten.content2d.addChild(this.content2d);
	/*if (sFloor.debug) {
		this.debagGraf = new PIXI.Graphics();
		this.content2d.addChild(this.debagGraf);
		this.debagGraf2 = new PIXI.Graphics();
		this.content2d.addChild(this.debagGraf2);
	}*/

	this.pressBlock = new PressBlock();

	this.isPress = true;
	this.isCompensateMove = true;// компенсировать сдвиг первой точки стены (сдвигаем блоки чтоб когда драгим первую точку стены они стояли как бы на месте)

	this.updateCollisionStop = function (blok) {
		self.windowsCollision.updateCollisionStop(blok);
	};

	this.onUpdateBlokPosition = function (blok) {
		self.windowsCollision.onUpdateBlokPosition(blok);
	};


	this.renderDo = function(){	    	
	    this.par.par.addObjFun(this.par)
	}


	//////////////////////////////////////
	//////////////////////////////////////	
	this.osX=[]
	this.osY=[]
	var  _osY=[]
	this.dragOsi = function (blokIgnor) {
		this.osX.length=0;
		this.osY.length=0;
		_osY.length=0;
		for (var i = 0; i < this.arrBlok.length; i++) {
			if(blokIgnor)if(blokIgnor.uuid==this.arrBlok[i].uuid)continue
			this.osX.push(this.arrBlok[i].boxColizi.rectCollisMeshdy.x,this.arrBlok[i].boxColizi.rectCollisMeshdy.x+this.arrBlok[i].boxColizi.rectCollisMeshdy.width)
		}
		for (var i = 0; i < this.par.par.arrSplice.length; i++) {
			if(this.par.par.arrSplice[i].life==true){
				this.par.par.arrSplice[i].windows.dragOsiYYY(_osY)
			}
		}
		this.arrKill(this.osX);
		this.arrKill(_osY);

		for (var i = 0; i < this.par.par.arrSplice.length; i++) {
			if(this.par.par.arrSplice[i].life==true){

				this.par.par.arrSplice[i].windows.osY=_osY;

			}
		}

	}
	this.dragOsiYYY = function (a) {
		for (var i = 0; i < this.arrBlok.length; i++) {
			a.push(this.arrBlok[i].heightSten-this.arrBlok[i].boxColizi.rectCollisMeshdy.y,this.arrBlok[i].heightSten-(this.arrBlok[i].boxColizi.rectCollisMeshdy.y+this.arrBlok[i].boxColizi.rectCollisMeshdy.height))
		}
	}

	this.arrKill = function (a) {
		for (var i = 0; i < a.length; i++) {
			for (var j = a.length - 1; j >= i+1; j--) {
				if(a[i]==a[j]){
					a.splice(j,1)
				}
			}			
		}
	}
	this.clearYBig = function () {
		for (var i = 0; i < this.par.par.arrSplice.length; i++) {
			if(this.par.par.arrSplice[i].life==true){
				this.par.par.arrSplice[i].windows.osX.length=0;
			}
		}
	}


	var arrHO=[]
	var arrHOX=[]
	this.ot=15	
	var xx,xx1,d,d1
	this.korectOsi = function (posit,blok) {
		arrHO.length=0
		arrHOX.length=0
		d=999
		xx=posit.x+blok.rect[0];
		xx1=posit.x+blok.rect[0]+blok.rect[3];
	
		for (var i = 0; i < this.osX.length; i++) {
			d1=Math.abs(this.osX[i]-xx)
			if(d1<this.ot){
				if(d1<d){
					d=d1;
					xx = this.osX[i];
					posit.x=xx-blok.rect[0];
					if(xx)arrHOX[0]=xx
				}	
			}
			d1=Math.abs(this.osX[i]-xx1)			
			if(d1<this.ot){
				if(d1<d){
					d=d1;
					xx1 = this.osX[i];
					posit.x=xx1-(blok.rect[0]+blok.rect[3]);
					if(xx1)arrHOX[0]=xx1
				}	
			}
		}
		

		d=999;
		xx=posit.y+blok.rect[2];
		xx1=posit.y+blok.rect[2]+blok.rect[5];
	
		for (var i = 0; i < this.osY.length; i++) {
			d1=Math.abs(this.osY[i]-xx)
			if(d1<this.ot){
				if(d1<d){
					d=d1;
					xx = this.osY[i];
					posit.y=xx-blok.rect[2];					
					//if(xx)arrHO[0]=xx;
				}	
			}
			d1=Math.abs(this.osY[i]-xx1);			
			if(d1<this.ot){
				if(d1<d){
					d=d1;
					xx1 = this.osY[i];
					posit.y=xx1-(blok.rect[2]+blok.rect[5]);
					//if(xx1)arrHO[1]=xx1;
				}	
			}
		}

		xx=posit.x+blok.rect[0];
		xx1=posit.x+blok.rect[0]+blok.rect[3];
	
		for (var i = 0; i < this.osX.length; i++) {
			d1=Math.abs(this.osX[i]-xx)
			if(d1<1){
				arrHOX[0]=this.osX[i];
			}
			
			d1=Math.abs(this.osX[i]-xx1)			
			if(d1<1){
				arrHOX[1]=this.osX[i];
			}
		}


		xx=posit.y+blok.rect[2];
		xx1=posit.y+blok.rect[2]+blok.rect[5];
		for (var i = 0; i < this.osY.length; i++) {
			d1=Math.abs(this.osY[i]-xx);
			if(d1<1){
				arrHO[0]=this.osY[i];
			}
			d1=Math.abs(this.osY[i]-xx1);
			if(d1<1){
				arrHO[1]=this.osY[i];
			}
		}

		
		
		wH3D.clear()//подсказка
		for (var i = 0; i < 2; i++) {
			if(arrHO[i])wH3D.setYSP(arrHO[i],1);
		}
		for (var i = 0; i < 2; i++) {
			if(arrHOX[i])wH3D.setXSP(arrHOX[i],blok.parent.par)
		}
	}

	//////////////////////////////////////
	//////////////////////////////////////	

	this.addBlok = function (_blok) {
		
		if (_blok.parent === this) {
			this.removeBlok(_blok)
		}
	

		let bbb = -1;


		if (_blok.parent && _blok.parent !== this) {
			_blok.parent.removeBlok(_blok);
		}


		_blok.depth = this.sten.delph;


		for (var i = 0; i < this.arrBlok.length; i++) {
			if (this.arrBlok[i].idArr === _blok.idArr) return false;
		}

		//this.press(_blok);
		self.updateCollisionStop(_blok); // задаем максимальные размеры блока

		var b = this.windowsCollision.addBlok(_blok);
		if (b) {
			
			this.arrBlok.push(_blok);
			
			_blok.parent = this;
			this.content3d.add(_blok.content3d);
				
			//this.content2d.addChild(_blok.content2d);

			/*if (this.sten3DLine) {
				
				this.sten3DLine.addBlok(_blok);
			}*/
			
			rotateBlokFromOldStenRotation(_blok);
			
			this.draw();
		}
		return b;
	};

	this.press = function (_blok) {
		if (!_blok || !this.isPress) return;
		_blok.resetSize();
		return this.pressBlock.press(_blok, this);
	};

	this.removeBlok = function (_blok) {
		
		let bbb = -1;
		for (var i = 0; i < this.arrBlok.length; i++) {
			if (this.arrBlok[i].idArr === _blok.idArr) {
				bbb = i;
				break;
			}
		}
		
		if (bbb !== -1) {
			
			this.arrBlok.splice(bbb, 1);
			this.content3d.remove(_blok.content3d);
			/*if (this.sten3DLine) {
				this.sten3DLine.removeBlok(_blok);
			}*/

			//this.content2d.removeChild(_blok.content2d);
			this.windowsCollision.removeBlok(_blok);
			_blok.parent = undefined;
			_blok.oldStenRotation = self.sten._rotation;
			this.draw();
			_blok.resetSize();
			return true;
		}
		return false;
	};


	this.getArrDurka = function () { // ф-я вовращает массив с кординатами уникальных блоков, для которых нужно вырезать дырки в стене
		var arrRect = self.pressBlock.getFreeArrBlokInWindow(self, null, -1);
		var res = [];
		for (var i = 0; i < arrRect.length; i++) {
			res.push(arrRect[i].x, arrRect[i].x + arrRect[i].width);
		}
		return res;
	};

	this.startDrag2d = function (_blok) {
		rulitObject.startDrag2d(_blok);
		rulitObject.startBlok(_blok);
		if (bigMenu.clikAB.activ === true)bigMenu.clikAB.activ = false;
	};

	this.dMin = 0;
	this.dMax = 0;
	this.dist = 0;

	this.updateDur = function () {
		
		/*if (this.sten3DLine) {

			this.sten3DLine.updateDur();
		}*/
		//this.sten.sten2D.draw();
	};

	this.drag = function () {

	}

	this.dragPost= function () {
		this.draw()
	}


	this.draw = function () {		
		visi3D.intRend = 1;		
		if(_sten._distans==0){			
			return;
		}
		

		this.delph = this.sten.delph;


		if (this.isCompensateMove) compensateMove();

		this.rashotDist();
		this.windowsCollision.collision.arrLine=this.par.sVephPoint.arrOsi;
		
		
			this.windowsCollision.drag();

		

		/*if (this.sten3DLine) {
			this.sten3DLine.drag();
		}*/

		this.updateDur();
		
	};


	this.rashotDist = function () {
		this.dMin = 9999999;
		this.dMax = 9999999;
		if (this.sten.tip === 0) {
			for (var i = 0; i < 6; i++) {
				this.dMin = Math.min(this.dMin, this.sten.arrPosit[i].x);
				this.dMax = Math.min(this.dMax, this.sten.arrPosit1[i].x);
			}
		} else {
			var lenCurv = this.sten.lineRange.getLenght();
			for (var i = 0; i < 6; i++) {
				this.dMin = Math.min(this.dMin, -this.sten.lineRange.getLengthPoint(this.sten.arrPosit[i]));
				this.dMax = Math.min(this.dMax, this.sten.lineRange.getLengthPoint(this.sten.arrPosit1[i]) - lenCurv);
			}
		}
		this.dist = this.sten._distans + this.dMin + this.dMax;
	};


	this.getObj = function () {
		var o = {};
		o.array=[]
     	for (var i = 0; i < this.arrBlok.length; i++) {
     		o.array.push(this.arrBlok[i].getObj())
     	}
		/*o.arr = [];
		for (var i = 0; i < this.arrBlok.length; i++) {
			o.arr.push(this.arrBlok[i].getObj());
		}*/
		return o;
	};

	this.setObj = function (o) {
		self.isPress = false;
		for (var i = 0; i < o.array.length; i++) {
			trace(i,o.array[i])
        	let blok= this.par.par.worldBlok.getBlok(o.array[i].id);
        	if(blok){
        		blok.init();
        		this.addBlok(blok);
        		blok.setObj(o.array[i]);
        	}
        } 

		/*for (var i = 0; i < o.arr.length; i++) {
			self.isPress = false;
			o.arr[i].intPolS = self.sten.idArr;

			var blok = this.sten.stage.par.bazaMod.get(o.arr[i].id)
			//var blok = bazObj.getBlok(o.arr[i]);
			blok.setObj(o.arr[i]);
			self.addBlok(blok);

		}*/

		self.isPress = true;
	};


	this.getInfo = function () {
		let a=[]
		for (var i = 0; i < this.arrBlok.length; i++) {
     		a.push(this.arrBlok[i].getInfoObj())
     	}
     	
		return a;
	}

	this.clear = function () {
		while (self.arrBlok.length > 0) {
			self.removeBlok(self.arrBlok[0]);
		}
	};


	var arrBloks = [];// массив для запоминания блоков на разделяемой стене
	this.beforDivid = function () {
		if (this.arrBlok.length === 0) return;
		for (var i = 0; i < this.arrBlok.length; i++) {
			arrBloks.push(this.arrBlok[i]);
		}
		this.clear();// очищаем стену от блоков
	};

	this.afterDivid = function (_newSten) {
		if (arrBloks.length === 0) return;
		var ppp;// координата, относительно которой будут смещаться блоки на новой стене при разделении
		arrBloks.forEach(function (blok) {
			if (self.sten.tip === 0) {
				// растояние от первой точки старой стены до первой точки новой стены
				ppp = self.sten._distans;

				if (blok.position.x > ppp) { // добавляем блок на стену за точкой
					ppp = blok.position.x - ppp;
					blok.position._x = ppp;
					blok.boxColizi.position.x = blok.position._x;
					_newSten.windows.addBlok(blok);
				} else { // добавляем блоки на стену перед точкой
					self.addBlok(blok);
				}
			} else {
				ppp = self.sten.lineRange.getLenght();
				if (blok.windowLength > ppp) {
					ppp = blok.windowLength - ppp;
					blok.windowLength = ppp;
					_newSten.windows.addBlok(blok);
				} else {
					self.addBlok(blok);
				}
			}
		});
		arrBloks.length = 0;// очищаем массив блоков
	};

	function okrug (num, num1) {
		num1 = num1 || 100;
		return parseInt(num * num1) / num1;
	}

	function getCorectAng (ang) {
		if (ang > Math.PI / 2) {
			ang -= Math.PI * 2;
		}
		ang = (ang + Math.PI / 2);
		return ang;
	}
	function rotateBlokFromOldStenRotation (_blok) {
		var ang = getCorectAng(self.sten._rotation);
		var ang1 = getCorectAng(_blok.oldStenRotation);
		if (ang === 0) {
			ang -= 0.0001;
		}
		if (Math.abs(ang) === Math.PI) {
			ang += 0.0001;
		}
		if (ang1 === 0) {
			ang1 -= 0.0001;
		}
		if (Math.abs(ang1) === Math.PI) {
			ang1 += 0.0001;
		}

		if (!((ang > 0 && ang1 > 0) || (ang < 0 && ang1 < 0)) || calc.diffNum(ang, ang1) >= Math.PI) {
			_blok.mirrorx *= -1;
			_blok.mirrory *= -1;
		}
		_blok.oldStenRotation = self.sten._rotation;
	}
	var posOld = new Position()
	var posOld1 = new Position()
	var distOld = null;
	function compensateMove () {
		if (distOld === null) {
			updateOldDist();
		}
		if (calc.getDistance(posOld1, self.sten.position1) > 0) {
			posOld1.setPoint(self.sten.position1);
			updateOldDist();
			return;
		}

		var dif;
		if (self.sten.tip === 0) {
			dif = okrug(self.sten._distans - distOld);
			updateOldDist();
			if (dif !== 0) {
				for (var i = 0; i < self.arrBlok.length; i++) {
					//trace(i,self.arrBlok[i])
					//self.arrBlok[i].position._x += dif;
					//self.arrBlok[i].boxColizi.position.x = self.arrBlok[i].position._x;
				}
			}
		} else {
			dif = okrug(self.sten.lineRange.getLenght() - distOld);
			updateOldDist();
			if (isNotMoveSten()) {
				dif *= 0.5;
			}
			if (dif !== 0) {
				for (var i = 0; i < self.arrBlok.length; i++) {
					self.arrBlok[i].windowLength += dif;
				}
			}
		}
		posOld.setPoint(self.sten.position);
	}
	function isNotMoveSten () {
		return calc.getDistance(posOld, self.sten.position) === 0 && calc.getDistance(posOld1, self.sten.position1) === 0;
	}

	function updateOldDist () {
		if (self.sten.tip === 0) {
			distOld = self.sten._distans;
		} else {
			distOld = self.sten.lineRange.getLenght();
		}
	}
}

Windows.prototype = {
	set life (v) {
		if (this._life === v) return;
		this._life = v;

		/*if (this.sten3DLine) {
			this.sten3DLine.life = this._life;
		}*/
	},
	get life () {
		return this._life;
	},



	set boolMinH (v) {
		if (this._boolMinH === v) return;
		this._boolMinH = v;
		this.content3d.visible=!this._boolMinH;
	},
	get boolMinH () {
		return this._boolMinH;
	},


	set delph (v) {
		if (this._delph === v) return;
		this._delph = v;

		/*if (this.sten3DLine) {
			this.sten3DLine.delph = this._delph;
		}*/

		for (var i = 0; i < this.arrBlok.length; i++) {
			this.arrBlok[i].depth = v;
		}
		this.draw();
	},
	get delph () {
		return this._delph;
	},

	set height (v) {
		if (this._height === v) return;
		this._height = v;
		/*if (this.sten3DLine) {
			this.sten3DLine.height = this._height;
		}*/
		this.draw();
	},
	get height () {
		return this._height;
	},


	set col3d (v) {
		if (this._col3d == v) return;		
		this._col3d = v;
		/*this.sten3DLine.arrMate[0]=this.sten.materialSten
		this.sten3DLine.arrMesh[0].material=this.sten.materialSten*/
	},
	get col3d () {
		return this._col3d;
	},


	set col3d1 (v) {
		if (this._col3d1 == v) return;
		this._col3d1 = v;
		/*this.sten3DLine.arrMate[1]=this.sten.materialSten1
		this.sten3DLine.arrMesh[1].material=this.sten.materialSten1*/
	},
	get col3d1 () {
		return this._col3d1;
	},


	set activ (v) {
		if (this._activ === v) return;
		this._activ = v;
		/*if (this.sten3DLine) {
			this.sten3DLine.activ = this._activ;
		}*/
		// this.draw();

	},
	get activ () {
		return this._activ;
	},

	set tip (v) {
		if (this._tip === v) return;
		this._tip = v;

		this.windowsCollision.tip = v;

		// this.draw();
	},
	get tip () {
		return this._tip;
	}

};


function WindowsCollision (wind) {
	var self = this;
	this.par = wind;
	this.wind = wind;
	this.sten = this.wind.sten;
	this.arrBlok = this.wind.arrBlok;

	var curveUtill = new CurveUtill();

	this.collision = new CollisionRect(this);
	this.collision.world.width = 100;

	this.curvCollision = new CollisionRect();
	this.curvCollision.world.width = 100;

	
	this.collision.colozi.activ = this.sten.tip === 0;
	this.curvCollision.colozi.activ = !(this.sten.tip === 0);

	this.collision.funDell = function funDell (i) {
		if (self.arrBlok[i]) {
			self.wind.removeBlok(self.arrBlok[i]);
		}
	};
	this.curvCollision.funDell = function funDellCurv (i) {
		if (self.arrBlok[i]) {
			self.wind.removeBlok(self.arrBlok[i]);
		}
	};

	this.addBlok = function (_blok) {
		self.updateCollisionStop(_blok);
		updateBoxCurvColizi(_blok);
	
		var b = this.collision.addRect(_blok.boxColizi);

		var b1 = this.curvCollision.addRect(_blok.boxCurvColizi);
		if (self.sten.tip === 1 && b1) {
			updateBlokWindowLengthFromColis(_blok);
			updatePositionCurvBlok(_blok);
		}
		return this.sten.tip === 0 ? b : b1;
	};

	this.removeBlok = function (_blok) {
		this.collision.removeRect(_blok.boxColizi);
		this.curvCollision.removeRect(_blok.boxCurvColizi);
		//if ('curvature' in _blok.blokKont.unik) _blok.blokKont.unik.curvature = 0;// todo вынести от сюда
	};

	this.onUpdateBlokPosition = function (blok) {
	
		if (self.sten.tip === 0) {
		
			self.collision.testRect(blok.boxColizi);
			

			
		} else if (self.sten.tip === 1) {
			updateBoxCurvColizi(blok);
		
			self.curvCollision.testRect(blok.boxCurvColizi);
			updateBlokWindowLengthFromColis(blok);
			updatePositionCurvBlok(blok);
		}

	
	};
	var dddd
	this.updateSizeColisWorld = function () {

		dddd=calc.getDistance(self.sten.position, self.sten.position1);

		self.collision.world.width = dddd;
		self.collision.world.height = self._height;
		if (self.sten.lineRange) {

			self.curvCollision.world.width = self.sten.lineRange.getLenght();		
			self.curvCollision.world.height = self._height;
		}
		this.collision.world.height = this.wind._height || 100;
		this.curvCollision.world.height = this.wind._height || 100;
	};

	this.updateCollisionStopBlok = function () {
		for (var i = 0; i < self.arrBlok.length; i++) {
			self.updateCollisionStop(self.arrBlok[i]); // задаем максимальные размеры блока
		}
	};

	this.updateCollisionStop = function (blok) {
		var coliziStop = blok.coliziStop;
		coliziStop.width = getCollisionWidth();
		coliziStop.width += (self.wind.dMin + self.wind.dMax);
		coliziStop.width -= blok.collisionOffset * 2;
		coliziStop.x = Math.abs(self.wind.dMin);
		coliziStop.x += blok.collisionOffset;


		if(blok.inOgr==true){
			coliziStop.y = blok.org1
			coliziStop.height = this.sten._height-blok.org-30			
		}
	};
	function getCollisionWidth () {
		if (self.sten.tip === 0) {
			return calc.getDistance(self.sten.position, self.sten.position1);
		} else {
			return self.sten.lineRange.getLenght();
		}
	}


	this.updatePosType = function () {
		if (this._tip === 0) {
			this.curvCollision.colozi.activ = false;
			for (var i = 0; i < this.arrBlok.length; i++) {
				this.arrBlok[i].position.x = this.arrBlok[i].windowLength !== undefined ? this.arrBlok[i].windowLength : this.arrBlok[i].position.x;
			}
			this.collision.colozi.activ = true;
		} else {
			this.collision.colozi.activ = false;
			for (var i = 0; i < this.arrBlok.length; i++) {
				this.arrBlok[i].windowLength = this.arrBlok[i].position.x;
			}
			this.curvCollision.colozi.activ = true;

			var arrBlokLine = this.wind.arrBlok.filter(function (blok) {
				return (!('curvature' in blok.blokKont.unik));
			});
			for (var i = 0; i < arrBlokLine.length; i++) {
				this.wind.removeBlok(arrBlokLine[i]);
			}
		}
	};

	this.drag = function () {
		this.updateSizeColisWorld();
		this.updateCollisionStopBlok();

		if (this.isChangedTip) {
			this.isChangedTip = false;
			this.updatePosType();
		}

		if (this.sten.tip === 0) {
			dragBlokLineSten();
		} else if (this.sten.tip === 1) { // curve
			dragBlokCurveSten();
		}

		
	};

	function dragBlokLineSten () {		
		self.collision.update();		
		for (var i = 0; i < self.arrBlok.length; i++) {
			var blok = self.arrBlok[i];
			if (!blok) continue;
			blok.angel = 0;
			//if ('curvature' in blok.blokKont.unik) blok.blokKont.unik.curvature = 0;// todo вынести от сюда
			/*let s=blok.position.y
			blok.position._y=-1*/
		

			//blok.position.y = 0;
			
			blok.dragObj2();
		}
	}

	function dragBlokCurveSten () {
		for (var i = 0; i < self.arrBlok.length; i++) {
			updateBoxCurvColizi(self.arrBlok[i]);
		}

		self.curvCollision.update();

		for (var i = 0; i < self.arrBlok.length; i++) {
			var blok = self.arrBlok[i];
			if (!blok) continue;
			updateBlokWindowLengthFromColis(blok);
			updatePositionCurvBlok(blok);
		}
	}

	// обновляем колизию блока относительно его кривизны
	function updateBoxCurvColizi (blok) {
		if (self.sten.tip === 0) {
			// blok.boxCurvColizi.width = blok.width;
		} else {
			blok.boxCurvColizi.width = self.sten.lineRange.getLengthByWidth(blok.width);
		}
		//if(blok.boxCurvColizi)blok.boxCurvColizi.position.set((blok.windowLength || 0), blok.position.z || blok.coliziStop.y);// todo coliziStop.y
	}

	function updateBlokWindowLengthFromColis (blok) {
		blok.windowLength = blok.boxCurvColizi.__x;
		blok.position._z = blok.boxCurvColizi.__y;
	}

	function updatePositionCurvBlok (blok) {
		var posO = curveUtill.getCurvPositionSten(self.sten, (blok.windowLength || 0), blok.width);
		var pos = curveUtill.convertCurvePosBlok(posO.position, posO.angel, blok.width);

		blok.angel = posO.angel;
		//blok.blokKont.unik.curvature = posO.curvature;
		blok.position._x = pos.x;
		blok.position._y = pos.y;
		blok.boxColizi.position.x = blok.position._x;
		blok.dragObj2();
		// blok.position.set(pos.x, pos.y);
	}

	


}
WindowsCollision.prototype = {
	set tip (v) {
		if (this._tip === v) return;
		this._tip = v;

		this.isChangedTip = true;
	},
	get tip () {
		return this._tip;
	}

};


function Sten3DLine (_windows) {
	var self = this;
	this.type = 'Sten3DLine';
	this.windows = _windows;
	this.sten = this.windows.sten;
	this._height = this.sten._height;
	var visi3D=this.windows.sten.stage.visi3D
	
	this._life = false;
	this._tip = this.sten.tip;

	this._delph = this.sten._delph;

	this.content3d = new THREE.Object3D();

	this.arrGSte = [];
	this.arrMesh = [];
	this.arrMate = [this.sten.materialSten1, this.sten.materialSten];

	this.addBlok = function (_blok) {
		//event3DArr.addChild(_blok.content3d);
		
		this.content3d.add(_blok.content3d);
		
		this.arrGSte[0]._arrBox.push(_blok.rectSten);
		this.arrGSte[1]._arrBox.push(_blok.rectSten);
		
		
		this.draw();
		
		
	};

	this.removeBlok = function (_blok) {
		console.warn("<<"+_blok.idArr)
		//event3DArr.removeChild(_blok.content3d);
		this.content3d.remove(_blok.content3d);
		let p=-1;

		for (let i = 0; i < this.arrGSte[0]._arrBox.length; i++) {
			if(this.arrGSte[0]._arrBox[i].parent.idArr==_blok.idArr){
				p=i
				break
			}
		}
		if(p!=-1){		
			this.arrGSte[0]._arrBox.splice(p, 1);
			this.arrGSte[1]._arrBox.splice(p, 1);
		}
		this.draw();
		
	};

	for (var i = 0; i < 2; i++) {
		this.arrGSte[i] = new GeometrySten2(); // верхняя передняя
		this.arrGSte[i].depth = 0;// this._delph/2;
		this.arrGSte[i].textureWidth = this.arrGSte[i].textureHeight = 270;
		this.arrGSte[i]._isInverse = i % 2 === 0;
		this.arrGSte[i].offsetDop = 50;
		this.arrMesh[i] = new THREE.Mesh(this.arrGSte[i], this.arrMate[i % 2]);
		this.arrMesh[i].rotation.x = Math.PI / 2;
		this.content3d.add(this.arrMesh[i]);
		this.arrMesh[i].type = 'Sten3D';
		this.arrMesh[i].name = 'Sten3D';
		this.arrMesh[i].name1 = 'Sten3D_'+i;
		this.arrMesh[i].sten = self.sten;
		this.arrMesh[i].position.y = i * this._delph - this._delph / 2;
	}

	//objShadow(this.content3d, true);

	this.updateDur = function () {	
		this.arrGSte[0].update();
		this.arrGSte[1].update();
		
	};

	this.drag = this.draw = function () {
		//if (visi3D.yes3d === false) return;
		
		this.delph = self.sten.delph;
		
		this.content3d.position.x = -this.windows.dMin;
		this.content3d.position.z = -this.windows._height;
		
		var x = -self.sten.arrPosit[5].x + this.windows.dMin;
		var x1 = (self.sten.arrPosit1[0].x + self.sten._distans) + this.windows.dMin;
		
		var x2 = -self.sten.arrPosit[0].x + this.windows.dMin;		
		var x12 = (self.sten.arrPosit1[5].x + self.sten._distans) + this.windows.dMin;

		
		this.arrGSte[0].setRect(okrug(x), 0, okrug(x1 - x), this.windows._height);
		
		this.arrGSte[1].setRect(okrug(x2), 0, okrug(x12 - x2), this.windows._height);
		
		this.updateDur();
		
		if (this.sten.tip === 0) {
			for (var i = 0; i < this.arrMesh.length; i++) {
				this.arrMesh[i].visible = true;
			}
		} else if (this.sten.tip === 1) { // curve
			for (var i = 0; i < this.arrMesh.length; i++) {
				this.arrMesh[i].visible = false;
			}
		}		
		visi3D.intRend = 1;
		
	};

	function okrug (num, num1) {
		num1 = num1 || 100;
		return parseInt(num * num1) / num1;
	}
}

Sten3DLine.prototype = {
	set life (v) {
		if (this._life === v) return;
		this._life = v;
		/*if (this._life === true) {

			this.visi3D.event3DArr.addChild(this.arrMesh[0]);
			this.visi3D.event3DArr.addChild(this.arrMesh[1]);
		} else {

			this.visi3D.event3DArr.removeChild(this.arrMesh[0]);
			this.visi3D.event3DArr.removeChild(this.arrMesh[1]);
		}*/
	},
	get life () {
		return this._life;
	},

	set delph (v) {
		if (this._delph === v) return;
		this._delph = v;
		for (var i = 0; i < 2; i++) {
			this.arrGSte[i].depth = 0;// v/2;
			this.arrMesh[i].position.y = i * v - v / 2;
		}
		this.draw();
	},
	get delph () {
		return this._delph;
	},

	set height (v) {
		if (this._height === v) return;
		this._height = v;
		this.draw();
	},
	get height () {
		return this._height;
	},

	set activ (v) {
		if (this._activ === v) return;
		this._activ = v;
		this.draw();

	},
	get activ () {
		return this._activ;
	}
};


/**
*прес для блоков / сжиматель блоков
*/
function PressBlock () {

	var self = this;
	var minWidth = 30;// минимальный размер блока при поиске свободных блоков

	this.press = function (blok, wind, isNotMoveBlok) {

		var p = getLocaPositionSten(wind, blok);

		var freeArrBlokInWindow = getFreeArrBlokInWindow(wind, blok);
		freeArrBlokInWindow.sort(function sortBlokToPoint (a, b) {
			var amin = Math.min(calc.diffNum(a.x, p.x), calc.diffNum(a.x + a.width, p.x));
			var bmin = Math.min(calc.diffNum(b.x, p.x), calc.diffNum(b.x + b.width, p.x));
			return amin - bmin;
		});

		var rectToBlok = freeArrBlokInWindow[0];
		if (!rectToBlok) return false;



		// округляем в меншую сторону чтоб небыло ошибки с collision
		rectToBlok.x = rectToBlok.x + 0.5;
		rectToBlok.width = rectToBlok.width - 1;

		var curvx = rectToBlok.x;
		if (wind.sten.tip !== 0) {
			convertCurveRect(wind, rectToBlok);
		}

		blok.updBreadthRect(rectToBlok);

		if (!isNotMoveBlok) {
			if (rectToBlok.width < blok.width) {
				blok.width = rectToBlok.width;
				blok.windowLength = curvx;
				blok.position._x = rectToBlok.x;
				blok.boxColizi.position.x = blok.position._x;
				return true;
			}
		}

	};

	function getLocaPositionSten (wind, blok) {
		var point = position2dFlor.getLocaPosition(pl102.global);
		var rez = wind.sten.isPointInLin(point, 100000, 100000);// точка на стене в глобале
		var p = new Position();// локальная позиция куда нужно поставить блок на стене

		if (wind.sten.tip === 0) {
			if (rez != null) {
				p.x = calc.getDistance(rez, wind.sten.position);
			} else {
				p.x = blok.position.x;
			}
		} else {
			if (rez != null) {
				p.x = wind.sten.lineRange.getLengthPoint(rez);
			} else {
				p.x = blok.windowLength;
			}
		}
		return p;
	}

	// возвращяет свободные места где может стать блок на стене wind не учитывая blok
	function getFreeArrBlokInWindow (wind, blok, _minWidth) {
		var arrRect = [];

		if (wind.arrBlok.length === 0) { // при пустой стене
			arrRect.push(new Rectangle(0, 0, getWidthWindow(wind), 0));
		} else {
			if (wind.sten.tip === 0) {
				arrRect = getArrRect(wind, blok);
			} else {
				arrRect = getArrCurvRect(wind, blok);
			}
		}

		// начало и конец нужно сздвинуть относительно здвигов стены
		for (var i = 0; i < arrRect.length; i++) {
			var rectToBlok = arrRect[i];
			if (rectToBlok.x === 0) {
				var otstup = Math.abs(wind.dMin);
				rectToBlok.x = otstup;
				rectToBlok.width -= otstup;
			}
			if (rectToBlok.width === getWidthWindow(wind) - rectToBlok.x) {
				rectToBlok.width -= Math.abs(wind.dMax);
			}
		}

		return arrRect.filter(function (element) {
			var w = element.width;
			if (wind.sten.tip !== 0) {
				w = wind.sten.lineRange.getWidthByLengthTo(w);
			}
			return w >= (_minWidth !== undefined ? _minWidth : minWidth);
		});
	}
	this.getFreeArrBlokInWindow = getFreeArrBlokInWindow;

	function getArrRect (wind, blok) {
		var x = 0;
		var x1 = 0;
		var arrRect = [];
		var arrBox = wind.arrBlok.slice().sort(sortBlokFromPosX);

		for (var i = 0; i < arrBox.length; i++) {
			if (arrBox[i] === blok) continue;// не считаем текущий блок

			x1 = arrBox[i].position.x;
			arrRect.push(new Rectangle(x, 0, x1 - x, 0));
			x = x1 + arrBox[i].width;
		}

		arrRect.push(new Rectangle(x, 0, getWidthWindow(wind) - x, 0));
		return arrRect;
	}

	function getArrCurvRect (wind, blok) {
		var x = 0;
		var x1 = 0;
		var arrRect = [];
		var arrBox = wind.arrBlok.slice().sort(sortBlokFromWindowLength);

		for (var i = 0; i < arrBox.length; i++) {
			if (arrBox[i] === blok) continue;// не считаем текущий блок

			x1 = arrBox[i].windowLength;
			arrRect.push(new Rectangle(x, 0, x1 - x, 0));
			x = x1 + wind.sten.lineRange.getLengthByWidth(arrBox[i].width);
		}

		arrRect.push(new Rectangle(x, 0, getWidthWindow(wind) - x, 0));
		return arrRect;
	}

	function convertCurveRect (wind, rect) {
		rect.width = wind.sten.lineRange.getWidthByLengthTo(rect.width);
		rect.x = wind.sten.lineRange.getWidthByLengthTo(rect.x);
	}

	function sortBlokFromPosX (a, b) {
		return a.position.x - b.position.x;
	}

	function sortBlokFromWindowLength (a, b) {
		return a.windowLength - b.windowLength;
	}

	function getWidthWindow (wind) {
		return wind.sten.tip === 0 ? wind.sten._distans : wind.sten.lineRange.getLenght();
	}


}



/**
 * Описывает точку.
 * @class
 * @param [_x=0] {number} кордината
 * @param [_y=0] {number} кордината
 * @param [_z=0] {number} кордината
 */
export function Position (_x, _y, _z) {
	/** {number} кордината */
	this._x = _x || 0;
	/** {number} кордината */
	this._y = _y || 0;
	/** {number} кордината */
	this._z = _z || 0;

	/** Установка значений.
     * @param [_z=0] {number} _x - Центр первой окружности.
     * @param [_z=0] {number} _y - Центр первой окружности.
     * @param {number} _z - Центр первой окружности.
     */
	this.set = function (_x, _y, _z) {
		this._x = _x || 0;
		this._y = _y || 0;
		if (_z !== undefined) this._z = _z;
	};
	this.setPoint = function (p) {
		this._x = p.x;
		this._y = p.y;
		if (p.z !== undefined) this._z = p.z;
	};

	this.getObj = function () {
		var o = {};
		o.x = this._x;
		o.y = this._y;
		o.z = this._z;
		return o;
	};
	this.copy = function () {
		return new Position(this._x, this._y, this._z);
	};
}
Position.prototype = {
	set x (v) {
		// if(this._x==v)return;
		this._x = v;
	},
	get x () {
		return this._x;
	},

	set y (v) {
		// if(this._y==v)return;
		this._y = v;
	},
	get y () {
		return this._y;
	},
	set z (v) {
		// if(this._z==v)return;
		this._z = v;
	},
	get z () {
		return this._z;
	}
};

