


import { SpPoint } from './SpPoint.js';
import { Position } from './Calc.js';
import { PositionFun } from './Calc.js';
import { Rectangle, Calc } from './Calc.js';
/** @module planer/sp */
/**
* баззоывй элемент линия срощалок
* @class
*/
export function Splice (_stage) {
	var self = this;
	
	this.type = 'Splice';
	this.tipe = 'Splice';
	this.stage = _stage;
	this.idArr = -1;
	this._life = true;
	this._delph = 20;// толщина линии
	this.delphMin = 1;
	this.delphMax = 10000000;
	this._tip = 0;// 0-линия 1-кривая 2-безье
	this.arrOpor = [];// для 1 и 2

	
	this._uuid = _stage.spCalc.generateUUID();

	this.arrayClass = [];// базовые классы
	var ii;

	this.arrPosit = [new Position(), new Position(), new Position(), new Position(), new Position(), new Position()];	// сойденение линии
	this.arrPosit1 = [new Position(), new Position(), new Position(), new Position(), new Position(), new Position()];	// второе сойденение линии
	this.bolPosit = false; // есть ли сойденение в начале
	this.bolPosit1 = false; // есть ли сойденение в конце


	this._addPoint;
	this._addPoint1;

	this._rotation = 0;
	this._distans = 0;
	this._oporPointVisi = true;

	this.rectangle = new Rectangle();

	this.drawposit = function () {
		self.drag();
	};
	this.position = new PositionFun(0, 0, this.drawposit);
	this.position1 = new PositionFun(0, 0, this.drawposit);

	this._distans0 = 0;
	this._distans1 = 0;

	this.dL0 = 0;
	this.dL1 = 0;
	this.dR0 = 0;
	this.dR1 = 0;

	this.updateDistans01 = function () {

		if (this.tip === 1) {
			this.lineRange.korectPoint2(this._delph / 2, this.arrPosit[5], this.arrPosit1[5]);// коректируем точки в lineRange одна сторона
			this._distans0 = 0;
			for (var i = 1; i < this.lineRange.sahAngel; i++) {
				this._distans0 += calc.getDistance(this.lineRange.arrPosit[i - 1], this.lineRange.arrPosit[i]);
			}
			this.lineRange.korectPoint2(this._delph / 2, this.arrPosit[0], this.arrPosit1[0]);// коректируем точки в lineRange одна сторона
			this._distans1 = 0;
			for (var i = 1; i < this.lineRange.sahAngel; i++) {
				this._distans1 += calc.getDistance(this.lineRange.arrPosit[i - 1], this.lineRange.arrPosit[i]);
			}
		} else {
			this.dL0 = this.arrPosit[0].x;
			if (this.dL0 < this.arrPosit[1].x) this.dL0 = this.arrPosit[1].x;
			this.dL1 = this.arrPosit1[5].x;
			if (this.dL1 < this.arrPosit1[4].x) this.dL1 = this.arrPosit1[4].x;

			this.dR0 = this.arrPosit[5].x;
			if (this.dR0 < this.arrPosit[4].x) this.dR0 = this.arrPosit[4].x;
			this.dR1 = this.arrPosit1[0].x;
			if (this.dR1 < this.arrPosit1[1].x) this.dR1 = this.arrPosit1[1].x;

			this._distans0 = this._distans + this.dL0 + this.dL1;
			this._distans1 = this._distans + this.dR0 + this.dR1;
		}

	};


	this.clear = function () {
		// delete (this.startObj);
		this.arrState.length = 0;
		if (this.addPoint) {
			this.addPoint.removeSplice(this);
			this.addPoint.clearFree();
			
		}
		if (this.addPoint1) {
			this.addPoint1.removeSplice(this);
			this.addPoint1.clearFree();

		}

		this.addPoint = undefined;
		this.addPoint1 = undefined;
		_callAllFun('clear');
		if(this.postClear)this.postClear()
		this.life = false;
		this.stage.render();
	};


	var _p1;
	var _s1;
	var rez;
	var rez2;
	var rez4;
	var typeSlit = -1;
	// Херачим стенку на две половины, относительно точки, bool =true подгоняем точку под сену ==false стены под точку
	// если точки нет, то пляшем от глобальных координат
	this.dividedSten = function (_point, retSten) { // @
		if (_point) if (!(_point instanceof SpPoint)) return;
		if (_point) if (_point.life == false) return _point;
		if (_point == undefined) {
			var pp = position2dFlor.getLocalIsStage();// todo глобал хрн
			if (this._tip == 0) {
				rez = calc.isPointInLin(this.position, this.position1, pp, 9000000, 9000000);
				_point = this.stage.craetPoint();
				_point.position.x = rez.x;
				_point.position.y = rez.y;
			} else if (this._tip == 1) {
				// создаем точку и берем координаты курсора при клике
				_point = this.stage.craetPoint();
				_point.position.x = pp.x;
				_point.position.y = pp.y;
				// получаем кординаты точки относительно центра стены
				rez2 = this.isPointInLin(_point.position);
				_point.position.x = rez2.x;
				_point.position.y = rez2.y;
			}
		}
		// if (!this.startObj) this.startObj = this.getObj();
		_callAllFun('beforDivid');
		if (this._tip == 0) {
			_p1 = this.addPoint1;
			_p1.removeSplice(this);
			_point.addSplice(this, false);
			_s1 = this.stage.craetSplice();
			_s1.setSten(this);
			_point.addSplice(_s1, true);
			_p1.addSplice(_s1, false);
			_point.drag();
		} else if (this._tip == 1) {
			var l0 = this.lineRange.getLR(_point.position, 0);
			var l1 = this.lineRange.getLR(_point.position, 1);
			_p1 = this.addPoint1;
			_p1.removeSplice(this);
			_point.addSplice(this, false);
			this.lineRange.setLR(l0);
			_s1 = this.stage.craetSplice();
			_s1.setSten(this);
			_point.addSplice(_s1, true);
			_p1.addSplice(_s1, false);
			_s1.lineRange.setLR(l1);
			_point.position.x += 0.000001;// для корректной отрисковки стен в точках соеденения FIXE
			_point.dragVokrug();// драгим все точки разделяемой стены для отрисковки
			// _point.drag();
		}
		_callAllFun('afterDivid', _s1);
		this.stage.render()
		if (retSten == true) return _s1;
		return _point;
	};


	// обновился тип линии нужно создать ресы для нее
	this.restartTip = function () {

		if (this._tip == 1) { // если это с одной точкой
			if (!this.lineRange) this.lineRange = new LineRange(40);// для расчетов

			if (this.arrOpor.length == 0) { // создаем опору если ее нет
				this.arrOpor.push(new Position());
			}
			this.lineRange.p.setPoint(this.position);
			this.lineRange.p1.setPoint(this.position1);
			// this.lineRange.p2.set((this.position.x + this.position1.x) / 2, (this.position.y + this.position1.y) / 2);
			this.lineRange.upDate();
			this.arrOpor[0].setPoint(this.lineRange.p2);
		}

		if (this._tip == 2) { // если это todo
			if (!this.arrOpor[0]) {
				this.arrOpor[0] = new Position();
			}
			if (!this.arrOpor[1]) {
				this.arrOpor[1] = new Position();
			}
			// this.arrOpor[0].set((this.position.x + this.position1.x) / 2, (this.position.y + this.position1.y) / 2)
			// this.arrOpor[1].set((this.position.x + this.position1.x) / 2 + 20, (this.position.y + this.position1.y) / 2+20)
		}
	};


	function _callAllFun (nameFun, p, p1, p2, p3) {
		for (var ii = 0; ii < self.arrayClass.length; ii++) {
			if (typeof (self.arrayClass[ii][nameFun]) === 'function') {
				self.arrayClass[ii][nameFun](p, p1, p2, p3);
			}
		}
	}
	function _setAllParam (nameParam, value) {
		//console.warn(nameParam, value,self.arrayClass)
		for (var ii = 0; ii < self.arrayClass.length; ii++) {			
			if (nameParam in self.arrayClass[ii]) self.arrayClass[ii][nameParam] = value;
		}
	}

	this._setAllParam = _setAllParam;
	this._callAllFun = _callAllFun;


	this.isPointInLin = function (pTest, dist, otstup, isRound) {
		dist = (dist === undefined) ? 9000000 : dist;
		otstup = (otstup === undefined) ? 9000000 : otstup;

		var resultPoint = null;
		if (this._tip == 0) {
			if (isRound) {
				resultPoint = calc.isPointInLin(this.position, this.position1, pTest, dist, 0);
				var p = new Position();
				p.setPoint(pTest);
				if (resultPoint) {
					p.setPoint(resultPoint);
				}
				if (!resultPoint) {
					if (calc.getDistance(this.position, p) < calc.getDistance(this.position1, p)) {
						resultPoint = this.position;
					} else {
						resultPoint = this.position1;
					}
				}
			} else {
				resultPoint = calc.isPointInLin(this.position, this.position1, pTest, dist, otstup);
			}
		} else if (this._tip == 1) {
			resultPoint = this.lineRange.getPointInLineRange(pTest, dist, otstup, isRound);
		} else {
			window.console.warn('хз как isPointInLin', this._tip);
		}

		_callAllFun('isPointInLin', pTest, dist, otstup, resultPoint);

		return resultPoint;
	};

	this.getBoundRect = this.getRect = function () {
		this.rectangle.x = Infinity;
		this.rectangle.y = Infinity;
		this.rectangle.width = -Infinity;
		this.rectangle.height = -Infinity;

		if (this._tip == 0) {
			for (var i = 0; i < this.arrPosit.length; i++) {
				setMMPoint(-this.arrPosit[i].x, this.arrPosit[i].y, false);
			}
			for (var i = 0; i < this.arrPosit1.length; i++) {
				setMMPoint(this.arrPosit1[i].x + this._distans, this.arrPosit1[i].y, false);
			}
		} else if (this._tip == 1) {

			this.lineRange.korectPoint2(this._delph / 2);

			setMMPoint(this.lineRange.arrPosit[0].x, this.lineRange.arrPosit[0].y, true);
			for (var i = 1; i < this.lineRange.sahAngel; i++) {
				setMMPoint(this.lineRange.arrPosit[i].x, this.lineRange.arrPosit[i].y, true);
			}
			if (this.bolPosit1 == true) {
				setMMPoint(this.arrPosit1[4].x, this.arrPosit1[4].y, true);
				setMMPoint(this.arrPosit1[3].x, this.arrPosit1[3].y, true);
				setMMPoint(this.arrPosit1[2].x, this.arrPosit1[2].y, true);
				setMMPoint(this.arrPosit1[1].x, this.arrPosit1[1].y, true);
				setMMPoint(this.arrPosit1[0].x, this.arrPosit1[0].y, true);
			}

			this.lineRange.korectPoint2(-this._delph / 2);

			for (i = this.lineRange.sahAngel - 1; i >= 0; i--) {
				setMMPoint(this.lineRange.arrPosit[i].x, this.lineRange.arrPosit[i].y, true);
			}
			if (this.bolPosit == true) {
				setMMPoint(this.arrPosit[0].x, this.arrPosit[0].y, true);
				setMMPoint(this.arrPosit[1].x, this.arrPosit[1].y, true);
				setMMPoint(this.arrPosit[2].x, this.arrPosit[2].y, true);
				setMMPoint(this.arrPosit[3].x, this.arrPosit[3].y, true);
				setMMPoint(this.arrPosit[4].x, this.arrPosit[4].y, true);
			}
		} else {
			window.console.warn('хз как getRect', this._tip);
		}
		this.rectangle.width = this.rectangle.width - this.rectangle.x;
		this.rectangle.height = this.rectangle.height - this.rectangle.y;

		_callAllFun('getRect', this.rectangle);

		return this.rectangle;
	};

	this.isColLine = function (_p, _p1) {
		var resCol = false;
		if (this._tip == 0) {
			return calc.getPointOfIntersection(this.position, this.position1, _p, _p1);
		} else if (this._tip == 1) {
			this.lineRange.korectPoint2(0);
			for (var i = 1; i < this.lineRange.sahAngel - 1; i++) {
				resCol = calc.getPointOfIntersection(this.lineRange.arrPosit[i], this.lineRange.arrPosit[i + 1], _p, _p1);
				if (resCol) return true;
			}
		} else {
			window.console.warn('хз как isColLine', this._tip);
		}
		return false;
	};

	var arrPoint = [new Position(), new Position(), new Position(), new Position()];
	this.isColRect = function (_r) {
		arrPoint[0].set(_r.x, _r.y);
		arrPoint[1].set(_r.x + _r.width, _r.y);
		arrPoint[2].set(_r.x + _r.width, _r.y + _r.height);
		arrPoint[3].set(_r.x, _r.y + _r.height);

		if (calc.isInTriangle(arrPoint[0], arrPoint[1], arrPoint[2], this.position)) return true;
		if (calc.isInTriangle(arrPoint[0], arrPoint[3], arrPoint[2], this.position)) return true;
		if (calc.isInTriangle(arrPoint[0], arrPoint[1], arrPoint[2], this.position1)) return true;
		if (calc.isInTriangle(arrPoint[0], arrPoint[3], arrPoint[2], this.position1)) return true;

		for (var i = 0; i < arrPoint.length; i++) {
			if (this.isColLine(arrPoint[i], arrPoint[(i + 1) % arrPoint.length])) return true;
		}
		return false;
	};


	var startObj, rez;
	this.arrState = [];
	this.rememberState = function () {
		this.startObj = this.getObj();
		if (!calc.compare(this.startObj, this.arrState[this.arrState.length - 1] || {})) {
			this.arrState.push(this.startObj);
		}
		// startObj.life = this.life;
	};
	this.getLastState = function () {
		return this.arrState.pop();
	};

	this.saveChanges = function () {
		rez = false;

		return rez;
	};
	this.compareLastState = function () {

	};

	var point = new Position();
	var point1 = new Position();
	var pointNull = new Position();
	var px, py, d, a, a1;
	function setMMPoint (_x, _y, _bc) {
		if (_bc == false) {
			point.x = _x;
			point.y = _y;
			d = calc.getDistance(pointNull, point);
			a = calc.getAngle(pointNull, point);
			a1 = a + self._rotation;
			calc.getVector(d, a1, point1);
			point1.x += self.position.x;
			point1.y += self.position.y;
			px = point1.x;
			py = point1.y;
		} else {
			px = _x;
			py = _y;
		}
		self.rectangle.x = Math.min(self.rectangle.x, px);
		self.rectangle.y = Math.min(self.rectangle.y, py);
		self.rectangle.width = Math.max(self.rectangle.width, px);
		self.rectangle.height = Math.max(self.rectangle.height, py);
	}

	this.dragVokrug = function () {
		var arrPointToDrag = [];
		var arrStenToDrag = [];
		saveStatePoint(this._addPoint, arrPointToDrag);
		saveStatePoint(this._addPoint1, arrPointToDrag);
		filterUuid(arrPointToDrag);
		for (var i = 0; i < arrPointToDrag.length; i++) {
			saveStateSten(arrPointToDrag[i], arrStenToDrag);
		}
		filterUuid(arrStenToDrag);

		for (var i = 0; i < arrStenToDrag.length; i++) {
			arrStenToDrag[i].calculate = true;
		}
		for (var i = 0; i < arrPointToDrag.length; i++) {
			arrPointToDrag[i].drag();
		}
		for (var i = 0; i < arrPointToDrag.length; i++) {
			arrPointToDrag[i].drag();
		}
		for (var i = 0; i < arrStenToDrag.length; i++) {
			arrStenToDrag[i].calculate = false;
			arrStenToDrag[i].drag();
		}
	};

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
	function saveStateSten (p, arrStenToDrag) {
		if (!p) return;
		for (var i = 0; i < p.arrSHron.length; i++) {
			arrStenToDrag.push(p.arrSHron[i].sten);
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

	this.getArrConectedSplice = function () {
		var res = {};
		res.arr = getUuidConectSten(this.addPoint);
		res.arr1 = getUuidConectSten(this.addPoint1);
		return res;
	};

	function getUuidConectSten (p) {
	
		var arr = [];
		if(p)
		for (var i = 0; i < p.arrSHron.length; i++) {
			var sten = p.arrSHron[i].sten;
			// if (sten.uuid === self.uuid) continue;
			arr.push(sten.uuid);
		}
		return arr;
	}
}

Splice.prototype = {
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
		o.delph = this.delph;
		o.tip = this.tip;

		o.position = this.addPoint ? this.addPoint.position.getObj() : this.position.getObj();
		o.position1 = this.addPoint1 ? this.addPoint1.position.getObj() : this.position1.getObj();
		o.connected = this.getArrConectedSplice();
		if (this.lineRange) o.position2 = this.lineRange.p2.getObj();

		if (this.tip != 0) {
			o.arrOpor = [];
			for (var i = 0; i < this.arrOpor.length; i++) {
				o.arrOpor.push({x: this.arrOpor[i].x, y: this.arrOpor[i].y});
			}
		}
		o.uuid = this.uuid;
		return o;
	},
	setObj: function (o) {
		// this.type = o.type;
		if (o.uuid !== undefined) this.uuid = o.uuid;
		this.clear();
		if (o.delph !== undefined) this._delph = o.delph;
		if (o.position !== undefined) this.position.setPoint(o.position);
		if (o.position1 !== undefined) this.position1.setPoint(o.position1);
		if (o.connected !== undefined) this.connected = o.connected;

		this.stage.stenInPoint(this);// ??

		if (o.curve !== undefined) {
			this.tip = o.curve ? 1 : 0;// поддержка старой логики
		}
		if (o.tip !== undefined) {
			this.tip = o.tip;
		}

		if (o.position2 && this.tip === 1) {
			this.lineRange.setTwoPoint(this.position, this.position1);
			this.lineRange.setCurvFromPoint(o.position2);
		}

		if (o.arrOpor != undefined) {
			for (var i = 0; i < o.arrOpor.length; i++) {
				if (!this.arrOpor[i]) {
					this.arrOpor[i] = new Position();
				}

				this.arrOpor[i].set(o.arrOpor[i].x, o.arrOpor[i].y);
			}
		}

		if (this._addPoint != undefined) this._addPoint.drag();
		if (this._addPoint1 != undefined) this._addPoint1.drag();
		this.life = true;
		this.drag();
	},
	setSten: function (_sten) {
		if (_sten.tip !== undefined) this.tip = _sten.tip;
		if (_sten.lineRange !== undefined && this.lineRange !== undefined) this.lineRange.setLR(_sten.lineRange);
		if (_sten.position !== undefined) this.position.setPoint(_sten.position);
		if (_sten.position1 !== undefined) this.position1.setPoint(_sten.position1);
		if (_sten.delph !== undefined) this.delph = _sten.delph;
	},
	restart: function (_sten) {
	},
	compare: function (o, _sten) {

		rez = true;
		s1 = o.getObj();
		s2 = _sten;
		if (o.delph != s2.delph) rez = false;

		if (calc.getDistance(s1.position, s2.position) > 0.1) rez = false;
		if (s1.position2 && s2.position2) {
			if (calc.getDistance(s1.position2, s2.position2) > 0.1) rez = false;
		}
		if (o.tip != s2.tip) rez = false;
		return rez;
	},

	drag: function () {
		
		this._rotation = this.stage.spCalc.getAngle(this.position, this.position1);
		this._distans = this.stage.spCalc.getDistance(this.position, this.position1);
		
		
		if (this.tip == 1) {

			this.lineRange.p.setPoint(this.position);
			this.lineRange.p1.setPoint(this.position1);
			this.lineRange.upDate();

			this.arrOpor[0].set(this.lineRange.pint90.x, this.lineRange.pint90.y);
		}

		if (this.calculate) return;

		this._callAllFun('drag');

		if (this.funDragOne) this.funDragOne();
	},


	clone: function (_position) {
		var newSten = this.stage.craetSplice();
		var point = this.stage.craetPoint();
		var point1 = this.stage.craetPoint();
		point.position.set(this.position.x, this.position.y);
		point1.position.set(this.position1.x, this.position1.y);
		var o = this.getObj();
		updateUuidObj(o);
		o.uuid = newSten.uuid;
		newSten.setObj(o);
		newSten.addPoint.removeSplice(newSten);
		newSten.addPoint1.removeSplice(newSten);
		point.addSplice(newSten, true);
		point1.addSplice(newSten, false);
		if (_position) {
			point.position.x += _position.x;
			point.position.y += _position.y;
			point1.position.x += _position.x;
			point1.position.y += _position.y;
		}

		function updateUuidObj (o) {
			if (o.uuid !== undefined) {
				o.uuid = calc.generateUUID();
			}
			for (var key in o) {
				if (typeof o[key] === 'object') {
					updateUuidObj(o[key]);
				}
			}
		}
		return newSten;
	},

	set addPoint (v) {
		if (this._addPoint == v) return;
		this._addPoint = v;
		if (this._addPoint1 != undefined && this._addPoint != undefined) {
			if (this._addPoint1.idArr == this._addPoint.idArr) {
				this.clear();
			}
		}
	},
	get addPoint () {
		return this._addPoint;
	},


	set addPoint1 (v) {
		if (this._addPoint1 == v) return;
		this._addPoint1 = v;
		if (this._addPoint != undefined && this._addPoint1 != undefined) {
			if (this._addPoint.idArr == this._addPoint1.idArr) {
				this.clear();
			}
		}
	},
	get addPoint1 () {
		return this._addPoint1;
	},
	set delph (v) {
		if (this._delph == v) return;
		this._delph = v;
		//this._delph = (Math.min((Math.max(this.delphMin, this._delph) || this._delph), this.delphMax) || (Math.max(this.delphMin, this._delph) || this._delph));
		this._setAllParam('delph', this._delph);
		if (this._addPoint != undefined) this._addPoint.drag();
		if (this._addPoint1 != undefined) this._addPoint1.drag();

	},
	get delph () {
		return this._delph;
	},
	set tip (v) {
		if (this._tip == v) return;
		this._tip = v;
		this.calculate = true;
		this.restartTip();
		this._setAllParam('tip', this._tip);
		if (this._addPoint != undefined) this._addPoint.drag();
		if (this._addPoint1 != undefined) this._addPoint1.drag();
		this.calculate = false;
		this.drag();
	},
	get tip () {
		return this._tip;
	},
	set life (v) {
		if (this._life == v) return;
		this._life = v;
		this._setAllParam('life', this._life);
		//this._setAllParam('shadow', this._life);
	},
	get life () {
		return this._life;
	},

	set activMouse (v) {
		if (this._activMouse == v) return;
		this._activMouse = v;
		this._setAllParam('activMouse', this._activMouse);
	},
	get activMouse () {
		return this._activMouse;
	},

	set oporPointVisi (v) {
		if (this._oporPointVisi == v) return;
		this._oporPointVisi = v;
		this._setAllParam('oporPointVisi', this._oporPointVisi);
	},
	get oporPointVisi () {
		return this._oporPointVisi;
	},

	set distans0 (v) {
		if (this._distans0 === v) return;

		var p = this.position.copy();
		var p1 = this.position1.copy();

		calc.korektToLine(p, p1, (v - this._distans0) / 2, 0);

		if (this.addPoint) {
			this.addPoint.position.setPoint(p);
			this.addPoint1.position.setPoint(p1);
			this.addPoint.dragVokrug();
			this.addPoint1.dragVokrug();
		}
	},
	get distans0 () {
		this.updateDistans01();
		return this._distans0;
	},

	set distans1 (v) {
		if (this._distans1 === v) return;

		var p = this.position.copy();
		var p1 = this.position1.copy();

		calc.korektToLine(p, p1, (v - this._distans1) / 2, 0);

		if (this.addPoint) {
			this.addPoint.position.setPoint(p);
			this.addPoint1.position.setPoint(p1);
			this.addPoint.dragVokrug();
			this.addPoint1.dragVokrug();
		}
	},
	get distans1 () {
		this.updateDistans01();
		return this._distans1;
	},
	set visible (v) {
		if (this._visible === v) return;
		this._visible = v;
		this._setAllParam('visible', this._visible);
	},
	get visible () {
		return this._visible;
	}
};
