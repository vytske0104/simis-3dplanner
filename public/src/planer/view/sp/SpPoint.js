


/**
* Базовый клас для точек
* @class
*/
export function SpPoint (_stage) {
	var self = this;
	this.type = 'SpPoint';
	this.tipe = 'SpPoint';
	this.stage = _stage;
	this._life = true;
	this.size2 = 10;
	this.size3 = 0.001;	// размер при выделении
	this._uuid = calc.generateUUID();
	
	this.arrSHronBaza = [];
	this.arrSHron = [];
	this.arrPol = [];

	this.arrIdSten = [];
	this.arrSten = [];

	this.arrayClass = [];// базовые классы

	var kol = 0;
	var sHron;
	this.creatSHron = function () {
		for (var i = 0; i < this.arrSHronBaza.length; i++) {
			if (this.arrSHronBaza[i].life == false) {
				this.arrSHronBaza[i].life = true;
				return this.arrSHronBaza[i];
			}
		}
		this.arrSHronBaza.push(new SHron(this));
		return this.arrSHronBaza[this.arrSHronBaza.length - 1];
	};


	var p;
	/**
    * Добавить линию в точку
    * @param {Splice} sten - линия которую нужно добавить
    * @param {boolean} _storona - true добавляемо начало линии или false конец
    */
	this.addSplice = function (sten, _storona) { // @
		p = 99999;
		for (var i = 0; i < this.arrSHron.length; i++) {
			if (this.arrSHron[i].sten.idArr == sten.idArr) {
				p = i;
			}
		}
		if (p == 99999) {
			sHron = this.creatSHron();
			sHron.sten = sten;
			sHron.storona = _storona;
			this.arrSHron.push(sHron);
			self.arrIdSten.push(sten.idArr);
			if (_storona == true)sten.addPoint = this;
			else sten.addPoint1 = this;
			this.life = true;
			this.drag();
		}
		this.stage.render();
		if(self.doFunRend!=undefined)self.doFunRend();
	};

	/**
    * Удалить линию из точку
    * @param {Splice} sten - линия которую нужно добавить
    */
	this.removeSplice = function (sten) {
		console.warn("remove``@@@@",this.idArr)
		p = -1;
		for (var i = 0; i < this.arrSHron.length; i++) {
			if (this.arrSHron[i].sten.idArr == sten.idArr) {
				p = i;
			}
		}

		if (p != -1) {
			var rez = this.arrSHron[p];
			this.arrSHron.splice(p, 1);
			rez.clear();
			this.arrIdSten.splice(p, 1);
			this.drag();
			return rez;
		}
		this.stage.render();
		if(self.doFunRend!=undefined)self.doFunRend();
		return null;
	};


	


	this.addPol = function (pol) { // @
		this.arrPol.push(pol);
		this.stage.render()		
	};



	/**
    * Удалить линию из точку
    * @param {Splice} sten - линия которую нужно добавить
    */
	this.removePol = function (pol) {
		var r=null
		for (var i = 0; i < this.arrPol.length; i++) {
			if(pol.idArr==this.arrPol[i].idArr){
				this.arrPol.splice(i,1)
				if(r==null)r=0
				r++;
				pol.removePoint(this)
				i=0;
			}
		}
		if(this.arrSHron.length==0)if(this.arrPol.length==0)this.clear()
		this.stage.render()		
		return r;
	};



	this._heightNew=0
	this.dragHeight
	this.drag = function () {
		
		kol = this.arrSHron.length;
		for (var ii = 0; ii < kol; ii++) {
			this.arrSHron[ii].sten.calculateOld = this.arrSHron[ii].sten.calculate;
			this.arrSHron[ii].sten.calculate = true;
			if(this.arrSHron[ii].sten.height>this._heightNew)this._heightNew=this.arrSHron[ii].sten.height
		}

		this.setPointNotDrag(this.position);

		var arrPoint = this.getConectedPoint();
		for (var i = 0; i < arrPoint.length; i++) {
			arrPoint[i].korektSH();
		}

		this.dragView();

		for (var ii = 0; ii < kol; ii++) {
			this.arrSHron[ii].sten.calculate = this.arrSHron[ii].sten.calculateOld;
			this.arrSHron[ii].sten.drag();
		}
		
		for (var i = 0; i < this.arrPol.length; i++) {		
			this.arrPol[i].drag()
			if(this.arrPol[i].height>this._heightNew)this._heightNew=this.arrPol[i].height;
		}
		if(this.dragHeight)this.dragGG()	

			

		
		this.stage.render()	

	};

	this.dragGG = function () {
		this._heightNew=0
		for (var ii = 0; ii < kol; ii++) {
			if(this.arrSHron[ii].sten.height>this._heightNew)this._heightNew=this.arrSHron[ii].sten.height
		}
		
		for (var i = 0; i < this.arrPol.length; i++) {				
			if(this.arrPol[i].height>this._heightNew)this._heightNew=this.arrPol[i].height;
		}
		
		if(this.dragHeight)this.dragHeight()
	}


	this.dragView = function () {
		for (var ii = 0; ii < this.arrayClass.length; ii++) {
			if (this.arrayClass[ii].drag) this.arrayClass[ii].drag();
		}
	};
	function saveStateSten (p, arrStenToDrag) {
		if (!p) return;
		for (var i = 0; i < p.arrSHron.length; i++) {
			arrStenToDrag.push(p.arrSHron[i].sten);
		}
	}
	function saveStatePoint (p, arrPoint) {
		if (!p) return;
		for (var i = 0; i < p.arrSHron.length; i++) {
			if (p.arrSHron[i].sten._addPoint) {
				arrPoint.push(p.arrSHron[i].sten._addPoint);
			}
			if (p.arrSHron[i].sten._addPoint1) {
				arrPoint.push(p.arrSHron[i].sten._addPoint1);
			}
		}
	}
	function filterUuid (arr) {
		for (var i = 0; i < arr.length; i++) {
			var isFound = false;
			for (var j = 0; j < arr.length; j++) {
				if (i === j) continue;
				if (arr[j].uuid === arr[i].uuid) {
					isFound = true;
					break;
				}
			}
			if (isFound) {
				arr.splice(i--, 1);
			}
		}
	}
	var isKorectRun = false;
	// кориктеровка углов в хронителе
	this.korektSH = function () {
		if (isKorectRun) return;
		isKorectRun = true;
		korektArrSHron(true);
		for (var ii = 0; ii < this.arrSHron.length; ii++) {
			this.arrSHron[ii].korektAngel();
		}
		this.arrSHron.sort(sortRotarion);

		
		for (var ii = 0; ii < this.arrSHron.length; ii++) {

			this.stage.spCalc.korektSHObject(this, ii);
		}
		korektArrSHron(false);
		isKorectRun = false;
	};
	var prevArrSHron = null;

	function korektArrSHron (isStart) {
		if (isStart) { // коректируем масив хронов
			prevArrSHron = self.arrSHron.slice();
			self.arrSHron = self.arrSHron.filter(function (shron) {
				var d = shron.sten.tip === 0 ? shron.sten._delph / 2 : shron.sten._delph;
				shron.sten.visible = shron.sten._distans > d;
				return shron.sten.visible;
			});
		} else { // вернули обрано
			self.arrSHron = prevArrSHron;
			for (var i = 0; i < self.arrSHron.length; i++) {
				var d = self.arrSHron[i].sten.tip === 0 ? self.arrSHron[i].sten._delph / 2 : self.arrSHron[i].sten._delph;
				self.arrSHron[i].sten.visible = self.arrSHron[i].sten._distans > d;
			}
			prevArrSHron = null;
		}
	}

	function sortRotarion (o, b) {
		return o.rotation - b.rotation;
	}

	// ставим позицию точки не драгим нечего
	this.setPointNotDrag = function (point) {
		kol = self.arrSHron.length;
		self.position._x = point.x;
		self.position._y = point.y;
		for (var ii = 0; ii < kol; ii++) {
			var old = self.arrSHron[ii].sten.calculate;
			self.arrSHron[ii].sten.calculate = true;
			if (self.arrSHron[ii].storona == true) {
				self.arrSHron[ii].sten.position._x = point.x;
				self.arrSHron[ii].sten.position._y = point.y;
			} else {
				self.arrSHron[ii].sten.position1._x = point.x;
				self.arrSHron[ii].sten.position1._y = point.y;
			}
			self.arrSHron[ii].sten.drag();
			self.arrSHron[ii].sten.calculate = old;
		}
	};

	this.getConectedPoint = function (arrPointSearch) {
		arrPointSearch = arrPointSearch || [this];
		var arrPoint = [];
		for (var i = 0; i < arrPointSearch.length; i++) {
			saveStatePoint(arrPointSearch[i], arrPoint);
		}
		filterUuid(arrPoint);
		return arrPoint;
	};
	this.getConectedSten = function (arrPoint) {
		arrPoint = arrPoint || [this];
		var arrSten = [];
		for (var i = 0; i < arrPoint.length; i++) {
			saveStateSten(arrPoint[i], arrSten);
		}
		filterUuid(arrSten);
		return arrSten;
	};
	this.funDragVokrug
	this.dragVokrug = function () {

		var arrPoint = this.getConectedPoint();
		var arrSten = this.getConectedSten(arrPoint);

		for (var i = 0; i < arrPoint.length; i++) {
			arrPoint[i].korektSH();
			arrPoint[i].dragView();
		}

		for (var i = 0; i < arrSten.length; i++) {
			arrSten[i].drag();
		}
		if(this.funDragVokrug)this.funDragVokrug(arrPoint,arrSten)
	};

	this.doFunRend==undefined
	this.drawposit = function () {
	
		if(self.doFunRend!=undefined)self.doFunRend()
			
		if (self.calculate) return;
		self.drag();
	};
	this.position = new PositionFun(0, 0, this.drawposit);

	this.restart = function () {
	};


	// почистить точку
	this.clear = function () {
		if (!this.life) return;
		if (this.arrSHron.length == 2) {
			
			this.arrStep = [];
			var add = this.stage.spCalc.getSten2AddPoint(this.arrSHron[0].sten, this);
			var add1 = this.stage.spCalc.getSten2AddPoint(this.arrSHron[1].sten, this);

			if (this.getClonSten(-1, add, add1) != -1) { // есть стенка между
				st1 = this.removeSplice(this.arrSHron[1].sten);
				st = this.removeSplice(this.arrSHron[0].sten);
				st1.sten.clear();
				st.sten.clear();
			} else {
				var l = null;
				var l1 = null;
				if (this.arrSHron[0].sten._addPoint.idArr == this.idArr) {
					add = this.arrSHron[0].sten._addPoint1;
				} else {
					add = this.arrSHron[0].sten._addPoint;
				}
				var st1 = this.removeSplice(this.arrSHron[1].sten);
				var st = this.removeSplice(this.arrSHron[0].sten);

				if (st1.sten._addPoint.idArr == this.idArr) {
					add.addSplice(st1.sten, true);
					if ((st1.sten.tip === 1) && (st.sten.tip === 1))st1.sten.lineRange.p2.setPoint(st.sten._addPoint1.position);
				} else {
					add.addSplice(st1.sten, false);
					if ((st1.sten.tip === 1) && (st.sten.tip === 1))st1.sten.lineRange.p2.setPoint(st.sten._addPoint.position);
				}
				st1.sten.addPoint1.drag();
				st1.sten.addPoint.drag();
				this.life = false;
				st.sten.clear();
			}
		} else {
			this.arrStep = [];
			for (var i = this.arrSHron.length - 1; i >= 0; i--) {
				var st = this.removeSplice(this.arrSHron[i].sten);
				if (st.sten != null) {
					if ((st.sten.addPoint.idArr == this.idArr) || (st.sten.addPoint1.idArr == this.idArr)) {
						st.life = false;
						st.sten.clear();
					}
				}
			}
		}

		for (var ii = 0; ii < this.arrayClass.length; ii++) {
			if (typeof (this.arrayClass[ii].clear) === 'function') this.arrayClass[ii].clear();
		}

		for (var i = 0; i < this.arrPol.length; i++) {		
			if(this.arrPol[i])this.removePol(this.arrPol[i])
		}

		this.life = false;
		this.stage.render()	
	};

	// почистить точку если она свободна(пустая не скем не связана)
	this.clearFree = function () {
		if (this.arrSHron.length == 0 && this.arrPol.length==0) {
			this.clear();
		}

	};


	// возврощает номер стенки относительно двух точек
	this.getClonSten = function (stenId, add, add1) {
		if ((add) && (add1)) {
			for (var i = 0; i < this.stage.arrSplice.length; i++) {
				var splice = this.stage.arrSplice[i];
				if (!splice.life) continue;
				if (splice.idArr === stenId) continue;
				if (!splice.addPoint) continue;
				if (!splice.addPoint1) continue;

				if ((splice.addPoint.idArr === add.idArr) && (splice.addPoint1.idArr === add1.idArr)) return i;
				if ((splice.addPoint1.idArr === add.idArr) && (splice.addPoint.idArr === add1.idArr)) return i;
			}
		}
		return -1;
	};

	/// ----
	var isDraving;
	// c приходящей снимаем все точки
	/**
    * Слить точки(перекинуть все связи из _point в this и почистить _point )
    * @param {SpPoint} _point - точка которую нужно слить с текущей
    */
	this.slitie = function (_point) {
		if (this.life == false || _point.life == false) return;

		var stenToPoint = null;
		for (var i = _point.arrSHron.length - 1; i >= 0; i--) {
			for (var j = 0; j < this.arrSHron.length; j++) {
				if (this.arrSHron[j].sten.idArr == _point.arrSHron[i].sten.idArr) {
					if (this.arrSHron[j].sten._distans < 2/*aidPointStatic.radius /this._mashtab */) { // todo глобал хрн
						stenToPoint = this.arrSHron[j].sten;
						break;
					}
				}
			}
		}
		if (stenToPoint) { // если есть стенка между сливаемыми точками
			var o = {};
			for (var i = _point.arrSHron.length - 1; i >= 0; i--) {
				if (stenToPoint.idArr == _point.arrSHron[i].sten.idArr) {
					o.sten = _point.arrSHron[i].sten;
					o.storona = _point.arrSHron[i].storona;
				}
			}
			_point.removeSplice(stenToPoint);

			for (var i = this.arrSHron.length - 1; i >= 0; i--) {
				if (stenToPoint.idArr == this.arrSHron[i].sten.idArr) {
					o.sten = this.arrSHron[i].sten;
					o.storona = this.arrSHron[i].storona;
				}
			}
			this.removeSplice(stenToPoint);
		}

		// стены удаляемой точки
		var arrSHronDeletePoint = [];
		for (var i = _point.arrSHron.length - 1; i >= 0; i--) {
			arrSHronDeletePoint.push(_point.arrSHron[i]);
		}

		for (var i = 0; i < arrSHronDeletePoint.length; i++) {
			_point.removeSplice(arrSHronDeletePoint[i].sten);
		}

		for (var i = 0; i < arrSHronDeletePoint.length; i++) {
			this.addSplice(arrSHronDeletePoint[i].sten, arrSHronDeletePoint[i].storona);
		}

		if (stenToPoint) {
			stenToPoint.clear();
		}
		_point.clear();
	};
	this.arrDistRadom = [];// по два id, distans
	this.miniDist = -1;
	this.miniId = -1;
	this.miniOkSlit = -1;
	this.testDistRadom = function (arrNotPoint) { // @
		this.arrDistRadom = [];
		this.miniDist = 99999999999999999;
		this.miniId = -1;
		this.miniOkSlit = -1;
		for (var ii = 0; ii < this.stage.arrPoint.length; ii++) {
			if (arrNotPoint) {
				var isContinue = false;
				for (var jj = 0; jj < arrNotPoint.length; jj++) {
					if (arrNotPoint[jj].idArr == this.stage.arrPoint[ii].idArr) {
						isContinue = true;
						break;
					}
				}
				if (isContinue) continue;
			}

			if (this.idArr == ii) this.arrDistRadom.push(-1);
			else {
				if (this.stage.arrPoint[ii].life == false) this.arrDistRadom.push(-1);
				else {

					this.arrDistRadom.push(calc.getDistance(this.position, this.stage.arrPoint[ii].position));
					if (this.miniDist > this.arrDistRadom[this.arrDistRadom.length - 1]) {
						this.miniDist = this.arrDistRadom[this.arrDistRadom.length - 1];
						this.miniId = ii;
						if (this.miniDist < aidPointStatic.radius/* /this._mashtab */) {
							this.miniOkSlit = ii;
						}
					}
				}
			}
		}
	};

	// находиться ли этот ним в связях с этой точкой
	this.isGroup = function (num) {

		for (var i = 0; i < this.arrSHron.length; i++) {
			if (this.arrSHron[i].sten.addPoint) {
				if (this.arrSHron[i].sten.addPoint.idArr == this.idArr) {
					if (this.arrSHron[i].sten.addPoint1) {
						if (this.arrSHron[i].sten.addPoint1.idArr == num) {
							return true;
						}
					}
				}
			}
			if (this.arrSHron[i].sten.addPoint1) {
				if (this.arrSHron[i].sten.addPoint1.idArr == this.idArr) {
					if (this.arrSHron[i].sten.addPoint) {
						if (this.arrSHron[i].sten.addPoint.idArr == num) {
							return true;
						}
					}
				}
			}
		}
		return false;
	};
	this.finaldrag = function () {
		var arrSHron = this.arrSHron.slice();
		for (var i = arrSHron.length - 1; i >= 0; i--) {
			for (var j = 0; j < this.arrSHron.length; j++) {
				if (this.arrSHron[j].sten.idArr == arrSHron[i].sten.idArr) {
					if (arrSHron[i].sten.life) this.stage.korektSplice.paralelSten(arrSHron[i].sten);
					break;
				}
			}
		}

	};

	this.rectangle = new Rectangle();
	this.getRect = function () {
		this.rectangle.x = this.position.x - 10;
		this.rectangle.y = this.position.y - 10;
		this.rectangle.width = 20;
		this.rectangle.height = 20;
		return this.rectangle;
	};

	var rez, p1, p2;
	this.compare = function (_point) {
		rez = true;
		p1 = this.getObj();
		p2 = _point;

		if (calc.getDistance(p1.position, p2.position) > 0.1) rez = false;

		return rez;
	};
	var startObj;
	this.rememberState = function () {
		startObj = this.getObj();
		startObj.life = this.life;
	};
	this.saveChanges = function () {
		if (startObj) {
			if (!this.compare(startObj) || this.life != startObj.life) {
			}
		}
		startObj = null;
	};

	var boundRect = new Rectangle(-Infinity, -Infinity, Infinity, Infinity);
	this.getBoundRect = function () {
		boundRect.x = this.position.x - this.size3;
		boundRect.y = this.position.y - this.size3;
		boundRect.width = this.size3 * 2;
		boundRect.height = this.size3 * 2;
		return boundRect;
	};
}

SpPoint.prototype = {
	set uuid (v) {
		if (this._uuid === v) return;
		if (this.funUpdateUuid) this.funUpdateUuid(this._uuid, v);
		this._uuid = v;
	},
	get uuid () {
		return this._uuid;
	},
	getObj: function () {
		var o = {};
		o.type = this.type;
		o.idArr = this.idArr;
		o.position = this.position.getObj();
		return o;
	},
	setObj: function (o) {
		// this.type = o.type;
		this.position.setPoint(o.position);
	},

	restart: function (_point) {
	},

	set life (v) {
		if (this._life == v) return;
		this._life = v;

		for (var ii = 0; ii < this.arrayClass.length; ii++) {
			if (this.arrayClass[ii].life != undefined) this.arrayClass[ii].life = this._life;
		}

	},
	get life () {
		return this._life;
	}

};

/**
* Данные сойденения линии и точки
* @class
*/
function SHron (aidPoint) {
	this.life = true;
	this.sten = undefined;
	this.storona = true;
	this.aidPoint = aidPoint;
	this.rotation = 0;
	this.bp = 0;// Проходы по граням для полов
	this.bp1 = 0;
	this.linePosition = new LinePosition();
	this.korektAngel = function () {
		// this.rotation=this.sten._rotation%Math.PI;
		this.linePosition.p.setPoint(this.aidPoint.position);

		if (this.storona == true) {
			this.linePosition.p1.setPoint(this.sten.position1);
			// this.rotation=this.sten._rotation//%Math.PI*2;
		} else {
			// this.rotation=this.sten._rotation//%Math.PI*2;
			this.linePosition.p1.setPoint(this.sten.position);
		}
		this.linePosition.angel = calc.getAngle(this.linePosition.p, this.linePosition.p1);
		this.rotation = this.linePosition.angel + Math.PI;
	};

	this.clear = function () {
		this.life = false;
	};
}
