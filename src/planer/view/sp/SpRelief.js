/** @module planer/sp */

/**
* Таскание линий точек алгоритмы прилипания(привязок)
* @class
*/
function SpRelief (_spStage) {
	var self = this;
	this.spStage = _spStage;
	var point;
	var sten;
	var stenStart;
	this.korektPoint = null;
	this.korektPoint2 = null;
	this.point;

	this.vectMouse = new THREE.Vector2();
	this.vect = new THREE.Vector2();
	this.vect1 = new THREE.Vector2();
	this.vect2 = new THREE.Vector2();
	this.vect3 = new THREE.Vector2();
	this.vect4 = new THREE.Vector2();
	this.vect5 = new THREE.Vector2();
	this.vect6 = new THREE.Vector2();
	this.vectNull = new Position();

	this.isDragging = false; // Переменная отвечающая таскаем ли мы что true - таскаем, false - не таскаем
	this.tip = 0;
	this.activ = false;
	this.vkl = true;
	this.boolAlt = false;
	this.snapping = 0;// привязка к осям
	this.snappingPoint = 1;// слитие точкек 0 - не сливать, 1 - сливать

	this._dedagTime = false;// true//

	this.numStart = -1;

	this.veXZ = new THREE.Vector2();

	this.rez4 = new THREE.Vector3();
	this.pointRadius = 400;


	// какая привязка сработала
	var objStik = {
		boolX: false,
		boolY: false
	};
	var line = new LinePosition();	// для расчетов привязок горизонталей вертикалей
	var arrStickPosition = [new Position(), new Position(), new Position(), new Position()];	// точки к которым можно прилипнуть для расчетов привязок горизонталей вертикалей

	/// масивы для привязок
	this.arrArrPoint = [this.spStage.arrPoint];
	this.arrArrSplice = [this.spStage.arrSplice];

	var veee;
	var localPos = new Position();
	/*var graphics = new PIXI.Graphics();// графика для дебага привязок
	graphics.hitArea = new PIXI.Rectangle();
	graphics.alpha = 0.3;
	// sFloor.arrFloor[0].contDebug.addChild(graphics);
	this.graphics = graphics;
	graphics.visible = this._dedagTime;*/

	var arrDownOpor = [];

	// todo убарать глобали
	var stage = pl102.stage;
	var radiusPoint = aidPointStatic.radius;


	function isTouchEvents () {
		return pl102.isTouchEvents;
	}

	function isMouseEvents () {
		return pl102.isMouseEvents;
	}

	function testAngel (adPoint) {
		return self.spStage.spCalc.testAngel(adPoint);// центровка относительно перегибов стен
	}

	// --

	function getLocalIsStage (p) {
		return self.spStage.getLocalIsStage(p);
	}


	this.stageMove = function (e) {
		localPos = getLocalIsStage();

		graphics.clear();
		graphics.beginFill(0xcccccc);
		drawCircle(localPos, 1);

		if (self.tip == 0) { // тащим точку
			self.point.calculate = true;
			self.vect3 = localPos;
			self.vect5.x = (self.vectMouseLocal.x - localPos.x);
			self.vect5.y = (self.vectMouseLocal.y - localPos.y);
			testDrah(self.vect5, self.pointRadius / 6 * self._mashtab);
			calc.okrugPoint(self.vect3, sFloor.okrug);
			self.point.setPointNotDrag(self.vect3);
			if (self.vkl == true) {
				if (self.snapping != 0) {

					self.point.testDistRadom();

					if (self.point.miniOkSlit != -1) { // есть точка рядом
						self.korektPoint = self.spStage.arrPoint[self.point.miniOkSlit];
						self.point.setPointNotDrag(self.spStage.arrPoint[self.point.miniOkSlit].position);
					} else {

						self.korectPoint();
						var stik = self.getStickPos(self.point); // привязка к осям
						self.point.setPointNotDrag(stik);

						// центровка относительно перегибов стен
						stik = testAngel(self.point);
						if (stik) self.point.setPointNotDrag(stik);

						veee = self.isGranSten(self.point.position, -aidPointStatic.radius / 2, -1, self.point.arrIdSten);

						if (veee != null) {
							self.point.setPointNotDrag(veee);
						}
					}
				}
			}
			self.point.calculate = false;
			self.point.dragVokrug();
		}

		if (self.tip == 1) { // тащим стенку
			if (aBMouse.isDragging) return;
			self.vect5.x = (self.vectMouseLocal.x - localPos.x);
			self.vect5.y = (self.vectMouseLocal.y - localPos.y);

			objStik.boolX = objStik.boolY = false;
			testDrah(self.vect5);

			self.vect3.x = self.vect.x - self.vect5.x;
			self.vect3.y = self.vect.y - self.vect5.y;
			self.vect2.x = self.vect1.x - self.vect5.x;
			self.vect2.y = self.vect1.y - self.vect5.y;
			setStenPosit();


			// пока привязок нет
			if (self.snapping != 0) {
				if (self.boolAlt) {
					hardStickPositionPerpendSten();
				} else {
					stickPositionAidPointSten();// прилипания точек стены к стенам
					stickPositionStenVertHor();// проверяем прилипания вертикалей горизонталей стенки
					stickPositionAidPointVertHor();// проверяем прилипания вертикалей горизонталей точек стенки
				}
			}
			sten.wasChanged = true;

			for (var i = 0; i < arrDownOpor.length; i++) {
				sten.arrOpor[i].x = arrDownOpor[i].x - self.vect5.x;
				sten.arrOpor[i].y = arrDownOpor[i].y - self.vect5.y;
			}
			if (sten.addPoint != undefined) {
				sten.addPoint.setPointNotDrag(sten.position);
			}
			if (sten.addPoint1 != undefined) {
				sten.addPoint1.setPointNotDrag(sten.position1);
			}
			sten.dragVokrug();
		}

		if (self.tip == 2) { // тащим рект
			self.vect3 = localPos;
			calc.okrugPoint(self.vect3, sFloor.okrug);
			self.point.position.set(self.vect3.x, self.vect3.y);
			if (self.snapping != 0) {
				var stik = self.getStickPos(self.arrP[2].position, self.arrP); // привязка к осям
				self.arrP[2].position.set(stik.x, stik.y);
				var veee = self.isGranSten(self.arrP[2].position, -radiusPoint / 2);// привязка к стенкам
				if (veee != null) {
					self.arrP[2].position.set(veee.x, veee.y);
					veee = null;
				}
			}
			self.arrP[1].position.set(self.arrP[2].position.x, self.arrP[0].position.y);
			self.arrP[3].position.set(self.arrP[0].position.x, self.arrP[2].position.y);
			self.arrP[0].drag();
			self.arrP[2].drag();
		}

		if (self.tip == 3) { // тащим кривую стенку
			self.vect3 = localPos;
			calc.okrugPoint(self.vect3, sFloor.okrug);
			sten.lineRange.setCurvFromPoint(self.vect3);
			sten.wasChanged = true;
			sten.dragVokrug();
		}
	};

	this.update = function () {
		// self.boolRend=true;
	};

	function testDrah (v, d) {
		if (d == undefined)d = self.pointRadius / 2 * self._mashtab;
		drawCircle(self.vectMouseLocal, d);
		if (self.numStart == -1) {
			var dd = calc.getDistance(self.vectNull, v);
			if (dd > d) {
				self.numStart = 0;
			}
		}

	}


	this.mouseStorona;
	this.dividedBool = 0;
	var tmpChanged;

	/** Завершает таскание точек, стен, изгибов, рисование ректа стен
	* @param {Event} e - событие */
	this.stageUp = function (e) {
		if (sFloor.dragMode.activ) {
			return;
		}
		self.isDragging = false;

		main.boolCreat = true;
		self.dividedBool = 0;
		this.korektPoint = null;
		this.korektPoint2 = null;

		offSob();
		dataChangeSp.clear();

		if (e && e.data.originalEvent.button == 1) {

			return;
		}
		if (e && e.data.originalEvent.button == 2) { // отмена


			if (self.tip === 2) { // рект стен
				self.spStage.spMouse.stopStenRect(true);
			}
			if (self.tip === 0) {
				self.spStage.spMouse.stopSten(true);
			}
			self.drawingSten = null;
			return;
		}

		if (self.tip === 0) { // точка
			addSpToCheckFromPoint(self.point);
			var resultSlit = self.slitTestPoint(self.point);
			if (resultSlit !== -1) { // Сливаем из текущей в попавщую
				self.point = self.spStage.arrPoint[resultSlit];
			}
			setUp(self.point);
			commitCommandSp(self.tip, self.drawingSten || self.point);
			self.drawingSten = null;
			if (self.funDin != undefined)self.funDin();
		}
		if (self.tip == 1) { // стенка
			setUp(sten);
			commitCommandSp(self.tip, self.drawingSten);
			self.drawingSten = null;
		}

		if (self.tip == 2) { // рект стен
			self.spStage.spMouse.stopStenRect();
			commitCommandSp(self.tip);
		}

		if (self.tip == 3) { // искривление стенки
			commitCommandSp(self.tip);
		}
	};

	var arrSpToCheck = [];
	function addSpToCheckFromPoint (p) {
		for (var i = 0; i < p.arrSHron.length; i++) {
			arrSpToCheck.push(p.arrSHron[i].sten);
		}
	}

	function setUp (p) {
		var arrSt = getArrSpConnect(p);
		for (var i = 0; i < arrSt.length; i++) {
			self.setUpSten(arrSt[i]);
		}
	}

	function getArrSpConnect (param) {
		var arrSt = [];
		if (param instanceof SpPoint) {
			for (var i = 0; i < arrSpToCheck.length; i++) {
				arrSt.push(arrSpToCheck[i]);
			}
			arrSpToCheck = [];
			var arrSHron = param.arrSHron;
			for (var i = arrSHron.length - 1; i >= 0; i--) {
				arrSt.push(arrSHron[i].sten);
			}
		} else {
			arrSt.push(param);
			for (var i = param._addPoint.arrSHron.length - 1; i >= 0; i--) {
				arrSt.push(param._addPoint.arrSHron[i].sten);
			}
			for (var i = param._addPoint1.arrSHron.length - 1; i >= 0; i--) {
				arrSt.push(param._addPoint1.arrSHron[i].sten);
			}
		}
		arrSt = arrSt.filter(filterUnik);

		return arrSt;
	}
	function filterUnik (item, index, arr) { // фильтр уникальные значения
		return arr.indexOf(item) === index;
	}

	var dataChangeSp = new DataChangeSp();

	function commitCommandSp (tip, param) {
		return commandMaker.commitCommandSp(tip, param, dataChangeSp);
	}
	function startCommandSp (tip, param) {
		return commandMaker.startCommandSp(tip, param);
	}

	/** Завершает таскание стены
	* @param {Sten} sten - стена */
	this.setUpSten = function (sten) { // закончить таскать стену (пробить или слить ее точки проверить ее на паралель)
		// var arrPd = [];
		if (!sten.life) return;
		// sten.funUp();

		self.slitTestPoint(sten.addPoint);
		self.slitTestPoint(sten.addPoint1);

		var r = self.spStage.korektSplice.paralelSten(sten);
		dataChangeSp.add(r);

	};

	this.drawingSten = null;// стена которая рисуется

	this.startSten = function (_x, _y, _point, fun) {

		this.setConfigDataStartSten(_point); // Задать конфиг дата при старте стен
		self.drawingSten = this.spStage.craetSplice();

		var point;
		if (!_point) {
			point = this.spStage.craetPoint();
			point.position.x = _x;
			point.position.y = _y;
			point.addSplice(self.drawingSten, true);
			_point = point;
		} else {
			_point.addSplice(self.drawingSten, true);
		}
		point = this.spStage.craetPoint();
		point.position.x = _x;
		point.position.y = _y;
		point.addSplice(self.drawingSten, false);
		this.dragPoint(point, fun);
		this.korektPoint2 = _point;

		self.spStage.activObjSplice = self.drawingSten.idArr;
	};

	// Задать конфиг дата при старте стен
	this.setConfigDataStartSten = function (_point) {
		// `Р 1985.v(4) В Generic после замены текстуры, продолжать рисовать тем же образцом. Будет работать для дорог, заборов
		if (_point) {
			var splice = this.spStage.arrSplice[_point.arrIdSten[0]];
			if (splice) {
				this.spStage.configureConf(splice);
			}
		} else {
			if (this.spStage.tipSplice === 'SpliceTabletop') {
				this.spStage.configData.rotationTexture = 0;
			}
		}
		this.spStage.configData.tip = 0;	// в любом случае кривизну выключаем
	};


	this.korektP = {position: {x: 0, y: 0}};
	this.arrKorektP = [];
	this.sahAKP = 0;
	/** Начинаем таскать точку
	* @param {AidPoint} _point - точка, которую тащим
	* @param {function} fun - выполнится когда перестанем таскать
	*/
	this.dragPoint = function (_point, fun, finTip) {
		self.isDragging = true;

		this.korektPoint2 = null;
		this.korektPoint = null;
		self.tip = 0;
		self.funDin = fun;

		this.point = _point;
		if (this.drawingSten) {
			this.drawingSten.drawingPoint = this.point;
		}
		startCommandSp(self.tip, this.drawingSten || this.point);
		this.vectMouse.x = pl102.global.x;
		this.vectMouse.y = pl102.global.y;
		this.vect.x = this.point.position.x;
		this.vect.y = this.point.position.y;

		main.boolCreat = false;
		this.vectMouseLocal = getLocalIsStage();
		this.korektP.position.x = this.vectMouseLocal.x;
		this.korektP.position.y = this.vectMouseLocal.y;
		this.korektPoint2 = this.korektP;

		this.startNaAKP();

		onSob();
	};


	this.startNaAKP = function () {
		this.sahAKP = 0;
		this.numStart = -1;

		for (var i = 0; i < this.point.arrSHron.length; i++) {
			if (this.point.arrSHron[i].sten._addPoint != undefined) {
				if (this.point.arrSHron[i].sten._addPoint.idArr !== this.point.idArr) {
					this.arrKorektP[this.sahAKP] = this.point.arrSHron[i].sten._addPoint;
					this.sahAKP++;
				}
			}
			if (this.point.arrSHron[i].sten._addPoint1 != undefined) {
				if (this.point.arrSHron[i].sten._addPoint1.idArr !== this.point.idArr) {
					this.arrKorektP[this.sahAKP] = this.point.arrSHron[i].sten._addPoint1;
					this.sahAKP++;
				}
			}
		}
	};


	/** Начинает таскать стену
	* @param {Sten} _sten - стена, которую начаинаем таскать */
	this.dragSten = function (_sten) {

		self.isDragging = true;

		self.tip = 1;
		sten = _sten;
		startCommandSp(self.tip, sten);
		// sten.rememberState();
		stenStart = _sten._rotation;
		this.vectMouse.x = pl102.global.x;
		this.vectMouse.y = pl102.global.y;
		this.vect.x = sten.position.x;
		this.vect.y = sten.position.y;
		this.vect1.x = sten.position1.x;
		this.vect1.y = sten.position1.y;
		this.vectMouseLocal = getLocalIsStage();
		main.boolCreat = false;
		this.vectMouseLocal = getLocalIsStage();
		this.sahAKP = 0;
		this.numStart = -1;
		onSob();

		arrDownOpor.length = 0;
		for (var i = 0; i < sten.arrOpor.length; i++) {
			arrDownOpor[i] = sten.arrOpor[i].copy();
		}
	};

	/** Начинает таскать изгиб стены
	* @param {Sten} _sten - стена, изгиб которой таскаем */
	this.dragCurve = function (_sten) {

		self.isDragging = true;

		self.tip = 3;
		sten = _sten;
		startCommandSp(self.tip, sten);
		// sten.rememberState();
		this.vectMouse.x = pl102.global.x;
		this.vectMouse.y = pl102.global.y;
		this.vect.x = sten.lineRange.p2.x;
		this.vect.y = sten.lineRange.p2.y;
		this.vectMouseLocal = getLocalIsStage();
		onSob();
	};


	this.arrP;
	this.arSt;

	/** Начинаем таскать несколько точек
	* @param {Array<AidPoint>} _arrPoint - массив точек, которые тащим
	* @param {number} _tip
	* @param {function} fun - выполнится когда перестанем таскать */
	this.dragArrPoint = function (_arrPoint, _tip, fun, arSt) {
		self.isDragging = true;
		self.tip = _tip;
		self.funDin = fun;
		this.arrP = _arrPoint;
		this.vectMouse.x = pl102.global.x;
		this.vectMouse.y = pl102.global.y;

		if (_tip == 2) {
			this.point = _arrPoint[2];
			this.vect.x = this.point.position.x;
			this.vect.y = this.point.position.y;
		}

		this.vectMouseLocal = getLocalIsStage();
		main.boolCreat = false;
		onSob();
		self.stageMove();
	};

	function onSob () {
		if (isMouseEvents()) {
			stage.on('mouseup', self.stageUp);
			stage.on('mousemove', self.stageMove);
		}

		if (isTouchEvents()) {
			stage.on('touchend', self.stageUp);
			stage.on('touchmove', self.stageMove);
		}
		self.activ = true;
	}
	function offSob () {
		if (isMouseEvents()) {
			stage.off('mouseup', self.stageUp);
			stage.off('mousemove', self.stageMove);
		}
		if (isTouchEvents()) {
			stage.off('touchend', self.stageUp);
			stage.off('touchmove', self.stageMove);
		}
		self.activ = false;
	}

	var arrSten = [];

	/** Начинает рисовать квадрат из стен и точек
	* @param {AidPoint} [addP] - точка, с которой начли рисовать */
	this.startStenRect = function (addP) {
		// Метка на удаление сохранок, вдруг стены удалятся
		if (self.snappingPoint === 0 && addP instanceof SpPoint) {
			addP = new Position(addP.position.x, addP.position.y);
		}
		var arr = [];
		if (addP == undefined || !(addP instanceof SpPoint)) {
			arr[0] = this.spStage.craetPoint();
		} else {
			arr[0] = addP;
		}
		arr[1] = this.spStage.craetPoint();
		arr[2] = this.spStage.craetPoint();
		arr[3] = this.spStage.craetPoint();

		if (addP) {
			if (!(addP instanceof SpPoint)) {
				arr[0].position.set(addP.x, addP.y);
			}
		} else {
			arr[0].position.setPoint(getLocalIsStage());
		}
		// при отрисовке ректа кривые не рисуем
		// this.floor.configData.curve = false;

		arr[1].position.set(arr[0].x + 1, arr[0].y);
		arr[2].position.set(arr[0].x + 1, arr[0].y + 1);
		arr[3].position.set(arr[0].x, arr[0].y + 1);
		arrSten.length = 0;
		for (var i = 0; i < 3; i++) {
			sten = this.spStage.craetSplice();
			arr[i].addSplice(sten, true);
			arr[i + 1].addSplice(sten, false);
			arrSten[i] = sten;
			sten.activ = true;
		}
		sten = this.spStage.craetSplice();
		arr[0].addSplice(sten, false);
		arr[3].addSplice(sten, true);
		arrSten[i] = sten;
		sten.activ = true;

		var arrId = [];
		for (var i = 0; i < arrSten.length; i++) {
			arrId.push(arrSten[i].idArr);
		}

		this.dragArrPoint(arr, 2);
		startCommandSp(self.tip, arrSten);
		self.spStage.activObjSplice = arrId;
		// menuAll.tipMenu = 'MenuSten';
		// bigMenu.menuSten.addSten(arrSten);
	};


	/** Завершает рисование линии
	* @param {boolean} [isCencel] - true - если отменили рисование */
	this.stopSten = function (isCencel) {
		if (self.drawingSten && (isCencel || calc.getDistance(self.drawingSten.position, self.drawingSten.position1) < 20)) {
			self.drawingSten.clear();
			offSob();
		} else {
			offSob();
			if (self.drawingSten) {
				setUp(self.drawingSten);
				commitCommandSp(self.tip, self.drawingSten);
				self.drawingSten = null;
			}
		}
	};

	/** Завершает рисование квадрата из стен и точек
	* @param {boolean} [isCencel] - true - если отменили рисование */
	this.stopStenRect = function (isCencel) {
		if (isCencel) {
			clearStenRect();
		} else {
			var minDistSten = Infinity;
			for (var i = 0; i < self.arrP.length; i++) {
				minDistSten = Math.min(calc.getDistance(self.arrP[i].position, self.arrP[(i + 1) % self.arrP.length].position), minDistSten);
			}
			if (minDistSten < 20) {
				clearStenRect();
			} else {
				// for (var i = 0; i < self.arrP.length; i++) { // сливаем точки
				// 	self.slitTestPoint(self.arrP[i], self.arrP);
				// }

				for (var i = 0; i < arrSten.length; i++) {
					self.setUpSten(arrSten[i]);
					// self.spStage.korektSplice.paralelSten(arrSten[i]);
				}
				// if (self.floor.colBox.visiCB.activ) {
				// 	self.floor.colBox.visiCB.update();
				// 	for (var i = 0; i < arrSten.length; i++) {
				// 		arrSten[i].activ = false;
				// 	}
				// }
			}
		}
	};

	// this.arrPoz=[];//по два id, distans
	this.slitTestPoint = function (point, arrNotPoint) {
		point.testDistRadom(arrNotPoint);
		var rez = point.miniOkSlit;
		if (rez != -1) { // Сливаем из текущей в попавщую
			if (self.snappingPoint === 0) return -1;
			this.spStage.arrPoint[rez].slitie(point);
		}
		return rez;
	};

	var d;
	// Возарощает первую точку в радиусе или -1 если таковых нет
	this.getRadiusPoint = function (_p, _r, _aNot) {
		for (var i = 0; i < this.spStage.arrPoint.length; i++) {
			if (this.spStage.arrPoint[i].life != false) {
				d = calc.getDistance(_p, this.spStage.arrPoint[i].position);
				if (d < _r) {
					if (_aNot == undefined) {
						return i;
					} else {
						d = -1;
						for (var j = 0; j < _aNot.length; j++) {
							if (_aNot[j] == i)d = 1;
						}
						if (d == -1) return i;
					}
				}
			}
		}
		return -1;
	};

	// привязка диапазон
	this.offsetX = 20;
	this.offsetY = 20;
	this.stickPos = new Position();
	this.stickPosMin = new Position();
	var dx = 0;
	var dy = 0;
	var mindx = 0;
	var mindy = 0;
	this.getStickPos = function (_p, offsetArrPoint, radiusMaxs, arrPointNotRadius) {
		if (_p.position) this.stickPos.set(_p.position.x, _p.position.y);
		else this.stickPos.set(_p.x, _p.y);
		this.stickPosMin.set(this.stickPos.x, this.stickPos.y);
		var propusk = false;
		var radius = Infinity;
		mindy = mindx = Infinity;
		radiusMaxs = radiusMaxs || Infinity;

		for (var indexArr in this.arrArrPoint) {
			var arrPoint = this.arrArrPoint[indexArr];

			for (var i = 0; i < arrPoint.length; i++) {
				propusk = false;
				if (arrPoint[i].life == false) continue; // пропускаем мертвые точки
				if (arrPoint[i].idArr == _p.idArr) continue;// пропускаем если это мы

				if (offsetArrPoint) {
					for (var j = 0; j < offsetArrPoint.length; j++) {
						if (arrPoint[i].idArr == offsetArrPoint[j].idArr) {
							propusk = true;
							break;
						}
					}
				}
				if (propusk) continue;

				dx = Math.abs(this.stickPos.x - arrPoint[i].position.x);
				dy = Math.abs(this.stickPos.y - arrPoint[i].position.y);

				radius = radiusMaxs;
				if (radius !== Infinity && arrPointNotRadius) {
					for (var j = 0; j < arrPointNotRadius.length; j++) {
						if (arrPoint[i].idArr == arrPointNotRadius[j].idArr) {
							radius = Infinity;
							break;
						}
					}
				}

				if (dx < radius && dy < radius) { // если мы в диапазоне
					if (dx < this.offsetX && dx < mindx) { // смотрим куда ближе  чтоб прилипнуть
						this.stickPosMin.x = arrPoint[i].position.x;
						mindx = dx;
					}
					if (dy < this.offsetY && dy < mindy) {
						this.stickPosMin.y = arrPoint[i].position.y;
						mindy = dy;
					}
				}
			}

		}


		this.stickPos.set(this.stickPosMin.x, this.stickPosMin.y);
		return this.stickPos;
	};

	// очистка стен ректа
	function clearStenRect () {
		for (var i = 0; i < arrSten.length; i++) {
			arrSten[i].clear();
		}
		for (var i = 0; i < self.arrP.length; i++) { // удаляем точки
			if (self.arrP[i].arrSHron.length == 0 && self.arrP[i].arrPol.length == 0) { // если они свободны
				self.arrP[i].clear();
			}
		}
		arrSten.length = 0;
		// Убираем лишние сохранки
	}

	function drawCircle (p, size) {
		if (self.dedagTime == false) return;
		graphics.lineStyle(1, 1);
		graphics.drawCircle(p.x, p.y, size || 2);
	}

	function drawLine (p, p1, size) {
		if (self.dedagTime == false) return;
		graphics.lineStyle();
		p = p.copy();
		p1 = p1.copy();
		size = size || 1;
		calc.korektToLine(p, p1, 0, -size);
		graphics.moveTo(p.x, p.y);
		graphics.lineTo(p1.x, p1.y);
		calc.korektToLine(p, p1, 0, size * 2);
		graphics.lineTo(p1.x, p1.y);
		graphics.lineTo(p.x, p.y);
		graphics.closePath();
	}

	function hardStickPositionPerpendSten () {
		var maxOffsetLine = 9999999;// длинна линий
		//  перпендикуляр к стене
		var angel = sten._rotation + Math.PI / 2;
		calc.getVector(maxOffsetLine, angel, line.p);
		calc.getVector(-maxOffsetLine, angel, line.p1);
		moveLine(line, self.vectMouseLocal);
		var pLine = calc.isPointInLin(line.p, line.p1, localPos, maxOffsetLine, 0);
		drawLine(line.p, line.p1, maxOffsetLine);
		drawCircle(pLine);
		self.vect5.x = (self.vectMouseLocal.x - pLine.x);
		self.vect5.y = (self.vectMouseLocal.y - pLine.y);

		self.vect3.x = self.vect.x - self.vect5.x;
		self.vect3.y = self.vect.y - self.vect5.y;
		self.vect2.x = self.vect1.x - self.vect5.x;
		self.vect2.y = self.vect1.y - self.vect5.y;
		setStenPosit();
	}

	function stickPositionAidPointSten () { // прилипание точек стен к другим точкам и стенкам// true было прилипание
		self.vect6.x = 99999999;


		sten.addPoint.testDistRadom();
		sten.addPoint1.testDistRadom();
		if (sten.addPoint.miniOkSlit != -1) { // есть точка рядом
			self.vect6.x = sten.addPoint.position.x - self.spStage.arrPoint[sten.addPoint.miniOkSlit].position.x;
			self.vect6.y = sten.addPoint.position.y - self.spStage.arrPoint[sten.addPoint.miniOkSlit].position.y;
			drawCircle(self.spStage.arrPoint[sten.addPoint.miniOkSlit].position);
		} else {
			veee = self.isGranSten(sten.addPoint.position, -aidPointStatic.radius / 2, -1, sten.addPoint.arrIdSten);
			if (veee != null) { //	есть стена рядом
				drawCircle(veee);
				drawLine(self.spStage.arrPoint[veee.w].position, self.spStage.arrPoint[veee.w].position1);

				self.vect6.x = sten.addPoint.position.x - veee.x;
				self.vect6.y = sten.addPoint.position.y - veee.y;
			}
		}
		if (sten.addPoint1.miniOkSlit != -1) { // есть точка рядом
			self.vect6.x = sten.addPoint1.position.x - self.spStage.arrPoint[sten.addPoint1.miniOkSlit].position.x;
			self.vect6.y = sten.addPoint1.position.y - self.spStage.arrPoint[sten.addPoint1.miniOkSlit].position.y;
			drawCircle(self.spStage.arrPoint[sten.addPoint1.miniOkSlit].position);
		} else {
			veee = self.isGranSten(sten.addPoint1.position, -aidPointStatic.radius / 2, -1, sten.addPoint1.arrIdSten);
			if (veee != null) {	//	есть стена рядом
				drawCircle(veee);
				drawLine(self.spStage.arrSplice[veee.w].position, self.spStage.arrSplice[veee.w].position1);
				self.vect6.x = sten.addPoint1.position.x - veee.x;
				self.vect6.y = sten.addPoint1.position.y - veee.y;
			}
		}

		if (self.vect6.x != 99999999) {
			self.vect3.x -= self.vect6.x * 1;
			self.vect3.y -= self.vect6.y * 1;
			self.vect2.x -= self.vect6.x * 1;
			self.vect2.y -= self.vect6.y * 1;
			setStenPosit();
			objStik.boolX = objStik.boolY = true;
		}


		return self.vect6.x != 99999999;
	}


	function stickPositionStenVertHor () { // прилипаем позиции вертикали горизонтали // true было прилипание
		var maxOffsetLine = 9999999;// длинна линий
		var stickDist = 20 * self.mashtab * 2;	// дистанция прилипания
		var localDownPos = self.vectMouseLocal;			// нажатие мышы
		var countPos = 0;
		var pLine = null;
		var bestPosition = new Position(Infinity, Infinity);
		for (var i = 0; i < arrStickPosition.length; i++) {
			arrStickPosition[i].set(Infinity, Infinity);
		}

		if (self.numStart == -1 || self.numStart == 0 || self.numStart == 2) {
			if (!objStik.boolY) {
				//  горизонталь
				line.p.set(-maxOffsetLine, localDownPos.y);
				line.p1.set(maxOffsetLine, localDownPos.y);
				line.p.x += localDownPos.x;
				line.p1.x += localDownPos.x;

				drawLine(line.p, line.p1, stickDist);
				pLine = calc.isPointInLin(line.p, line.p1, localPos, stickDist, 0);
				if (pLine) {
					arrStickPosition[countPos++].set(pLine.x, pLine.y);
					objStik.boolY = true;
					bestPosition.y = pLine.y;
					if (self.numStart == 0)self.numStart = 2;
				}
			}
		}

		if (!objStik.boolX) {
			//  вертикаль
			line.p.set(localDownPos.x, -maxOffsetLine);
			line.p1.set(localDownPos.x, maxOffsetLine);
			line.p.y += localDownPos.y;
			line.p1.y += localDownPos.y;
			drawLine(line.p, line.p1, stickDist);
			pLine = calc.isPointInLin(line.p, line.p1, localPos, stickDist, 0);
			if (pLine) {
				arrStickPosition[countPos++].set(pLine.x, pLine.y);
				objStik.boolX = true;
				bestPosition.x = pLine.x;
				if (self.numStart == 0)self.numStart = 1;
			}
		}


		if (!objStik.boolX && !objStik.boolY) {
			// если стена под наклоном
			if ((sten._rotation % (Math.PI / 2)) != 0) {
				/* //  перпендикуляр к стене
				var angel = sten._rotation + Math.PI / 2;
				calc.getVector(maxOffsetLine, angel, line.p);
				calc.getVector(-maxOffsetLine, angel, line.p1);
				moveLine(line, localDownPos);

				drawLine(line.p, line.p1, stickDist);
				pLine = calc.isPointInLin(line.p, line.p1, localPos, stickDist, 0);
				if (pLine && !objStik.boolX && !objStik.boolY) {
					arrStickPosition[countPos++].set(pLine.x, pLine.y);
					objStik.boolX = objStik.boolY = true;
				} */

				// вдоль к стене
				/* if (self.numStart == -1 || self.numStart == 0 || self.numStart == 3) {
					angel = sten._rotation;
					calc.getVector(maxOffsetLine, angel, line.p);
					calc.getVector(-maxOffsetLine, angel, line.p1);
					moveLine(line, localDownPos);
					drawLine(line.p, line.p1, stickDist);
					pLine = calc.isPointInLin(line.p, line.p1, localPos, stickDist, 0);
					if (pLine && !objStik.boolX && !objStik.boolY) {
						arrStickPosition[countPos++].set(pLine.x, pLine.y);
						objStik.boolX = objStik.boolY = true;
						if (self.numStart == 0)self.numStart = 3;
					}
				} */
			}
		}

		arrStickPosition.sort(function (a, b) { // todo вынести функцию
			return calc.getDistance(a, localPos) - calc.getDistance(b, localPos);
		});

		if (countPos > 0) {
			if (bestPosition.x !== Infinity && bestPosition.y !== Infinity) {
				arrStickPosition[0].set(bestPosition.x, bestPosition.y);
			}
			drawCircle(arrStickPosition[0]);

			self.vect5.x = (localDownPos.x - arrStickPosition[0].x);
			self.vect5.y = (localDownPos.y - arrStickPosition[0].y);
			self.vect3.x = self.vect.x - self.vect5.x;
			self.vect3.y = self.vect.y - self.vect5.y;
			self.vect2.x = self.vect1.x - self.vect5.x;
			self.vect2.y = self.vect1.y - self.vect5.y;
			setStenPosit();
		}
		return (countPos > 0);
	}

	function stickPositionAidPointVertHor () { // прилипать точками к вертикалям горизонталям других точек
		var localDownPos = self.vectMouseLocal; // нажатие мышы
		var prevOffset = new Position(self.offsetX, self.offsetY);
		self.offsetX = self.offsetY = 10;

		var ax = [];
		var ay = [];
		var offsetArrPoint = [sten._addPoint, sten._addPoint1];
		// привязка к осям
		var pp = self.getStickPos(sten._addPoint, offsetArrPoint);
		if (sten._addPoint.position.x - pp.x != 0) ax.push(sten._addPoint.position.x - pp.x);
		if (sten._addPoint.position.y - pp.y != 0) ay.push(sten._addPoint.position.y - pp.y);
		pp = self.getStickPos(sten._addPoint1, offsetArrPoint);
		if (sten._addPoint1.position.x - pp.x != 0) ax.push(sten._addPoint1.position.x - pp.x);
		if (sten._addPoint1.position.y - pp.y != 0) ay.push(sten._addPoint1.position.y - pp.y);
		if (ax.length > 0 || ay.length > 0) {
			ax.sort(toZero);
			ay.sort(toZero);
			if (!objStik.boolX) {
				localPos.x += -(ax[0] || 0);
				self.vect5.x = (localDownPos.x - localPos.x);
				self.vect3.x = self.vect.x - self.vect5.x;
				self.vect2.x = self.vect1.x - self.vect5.x;
				objStik.boolX = true;
			}
			if (!objStik.boolY) {
				localPos.y += -(ay[0] || 0);
				self.vect5.y = (localDownPos.y - localPos.y);
				self.vect3.y = self.vect.y - self.vect5.y;
				self.vect2.y = self.vect1.y - self.vect5.y;
				objStik.boolY = true;
			}

			setStenPosit();
		}

		self.offsetX = prevOffset.x;
		self.offsetY = prevOffset.y;
		return (ax.length > 0 || ay.length > 0);
	}

	function toZero (a, b) {
		return Math.abs(a) - Math.abs(b);
	}

	function setStenPosit () {
		sten.position._x = self.vect3.x;
		sten.position._y = self.vect3.y;
		sten.position1._x = self.vect2.x;
		sten.position1._y = self.vect2.y;
		sten.addPoint.position._x = self.vect3.x;
		sten.addPoint.position._y = self.vect3.y;
		sten.addPoint1.position._x = self.vect2.x;
		sten.addPoint1.position._y = self.vect2.y;
	}

	function moveLine (_line, _vector) {
		_line.p.x += _vector.x;
		_line.p.y += _vector.y;
		_line.p1.x += _vector.x;
		_line.p1.y += _vector.y;
	}

	var bX, bY, bxy, b;
	var position1 = new Position();
	var rez = new THREE.Vector3(0, 0, 0);
	var rez2 = new THREE.Vector3(0, 0, 0);


	var p = new Position();
	var dAp = null;

	var xx, yy, ll;
	this.korectPoint = function (dist) { //, boolSten, boolStenOt
		if (dist == undefined)dist = 750 / 1;// aidPointStatic.radiusMaxs;
		dist *= this._mashtab;
		bX = 999999;
		bY = 999999;


		position1.setPoint(self.point.position);
		var i;
		var b;
		var distance = aidPointStatic.radius * self._mashtab * 2;


		drawCircle(position1, 25);


		// проемся по опорным точкам
		if (this.korektPoint2 != null) {
			ll = 0;
			if (self.numStart == -1) {
				drawCircle(this.korektPoint2.position, 33);
				line.p.set(this.korektPoint2.position.x + 10000, this.korektPoint2.position.y);
				line.p1.set(this.korektPoint2.position.x - 10000, this.korektPoint2.position.y);
				drawLine(line.p, line.p1, distance);

				line.p.set(this.korektPoint2.position.x, this.korektPoint2.position.y + 10000);
				line.p1.set(this.korektPoint2.position.x, this.korektPoint2.position.y - 10000);
				drawLine(line.p, line.p1, distance);
				fillBxBy(position1, this.korektPoint2.position, distance);
			}
			if (self.numStart == 0) {
				fillBxBy(position1, this.korektPoint2.position, distance);
				if (bY != 999999)self.numStart = 2;
				if (bX != 999999)self.numStart = 1;
			}
			if (self.numStart == 1) {
				fillBxBy(position1, this.korektPoint2.position, distance, 1);
				line.p.set(this.korektPoint2.position.x, this.korektPoint2.position.y + 10000);
				line.p1.set(this.korektPoint2.position.x, this.korektPoint2.position.y - 10000);
				drawLine(line.p, line.p1, distance);
			}
			if (self.numStart == 2) {
				fillBxBy(position1, this.korektPoint2.position, distance, 2);
				line.p.set(this.korektPoint2.position.x + 10000, this.korektPoint2.position.y);
				line.p1.set(this.korektPoint2.position.x - 10000, this.korektPoint2.position.y);
				drawLine(line.p, line.p1, distance);
			}

		}

		if (this.korektPoint != null) {
			drawCircle(this.korektPoint2.position, 44);
			fillBxBy(position1, this.korektPoint.position, distance);
		}

		if (this.sahAKP != 0) {
			for (var i = 0; i < this.sahAKP; i++) {
				dAp = this.arrKorektP[i];
				// drawCircle(this.korektPoint2.position,33);
				line.p.set(dAp.position.x + 10000, dAp.position.y);
				line.p1.set(dAp.position.x - 10000, dAp.position.y);
				drawLine(line.p, line.p1, distance);

				line.p.set(dAp.position.x, dAp.position.y + 10000);
				line.p1.set(dAp.position.x, dAp.position.y - 10000);
				drawLine(line.p, line.p1, distance);
				fillBxBy(position1, dAp.position, distance);
			}
		}

		var b = true;
		var ii = -1;
		for (i = 0; i < self.point.arrDistRadom.length; i++) {
			if (self.point.arrDistRadom[i] > aidPointStatic.radius) {
				b = false;
				if (self.point.arrDistRadom[i] < dist)b = true;
				if (b == false) {
					b = self.point.isGroup(i);

				}
				if (b == true) {
					if (self.point.arrDistRadom[i] < self.pointRadius) {
						fillBxBy(position1, self.spStage.arrPoint[i].position, distance);
						ii = i;
					}
				}
			}
		}

		if (bX != 999999)self.point.position.x = bX;
		if (bY != 999999)self.point.position.y = bY;

		// центровка относительно перегибов стен
		rez2 = testAngel(self.point);
		if (rez2 != null) {
			self.point.position.setPoint(rez2);
		}

		if (ii != -1) {
			drawCircle(self.point.position, self.pointRadius);
		}
	};

	function fillBxBy (point, point1, distance, _num) {
		if (_num == undefined)_num = 0;
		if (_num == 0 || _num == 1) {
			if (bX == 999999 && (calc.diffNum(point.x, point1.x) < distance)) {
				bX = point1.x;
			}
		}
		if (_num == 0 || _num == 2) {
			if (bY == 999999 && (calc.diffNum(point.y, point1.y) < distance)) {
				bY = point1.y;
			}
		}
	}

	var oD;
	/** Проверяет, пересекается ли точка со стенами
	* @param {Position} _point - позиции точки, которую проверяем
	* @param {number} _dist - расстояние от центра точки до ее грани
	* @param {number} _otstup - отступ
	* @param {Array} _arrIdSten - массив id стен для проверки
	* @return {null | boolen} */
	this.isGranSten = function (_point, _dist, _otstup, _arrIdSten) {
		if (_dist == undefined)_dist = 0;
		if (_otstup == undefined)_otstup = -1;
		if (_arrIdSten == undefined)_arrIdSten = [];

		rez = null;
		for (var indexArr in this.arrArrSplice) {

			var arrSplice = this.arrArrSplice[indexArr];

			for (var i = 0; i < arrSplice.length; i++) {
				if (!arrSplice[i].life) continue;

				b = true;
				for (var j = 0; j < _arrIdSten.length; j++) {
					if (_arrIdSten[j] == arrSplice[i].idArr) {
						b = false;
						break;
					}
				}
				if (!b) continue;

				if (_otstup == -1)oD = arrSplice[i]._delph / 2;
				else oD = _otstup;

				rez = arrSplice[i].isPointInLin(_point, oD, _dist);
				if (rez != null && Math.abs(rez.z) > _dist) {
					rez.w = i;
					return rez;
				}
			}


		}


		return rez;
	};


	var rez = new THREE.Vector3(0, 0, 0);

	/** Проверяет, пересекается ли точка с какой либо стеной
	* @param {Position} _point - позиции точки, которую проверяем
	* @param {number} _dist - расстояние от центра точки до ее грани
	* @param {number} _otstup - отступ
	* @return {null | boolen} */
	this.testLineSten = function (_point, _dist, _otstup) {
		rez = null;
		var arrSplice = this.spStage.arrSplice;

		for (var i = 0; i < arrSplice.length; i++) {
			if (!arrSplice[i].life) continue;

			b = true;
			for (var j = 0; j < _point.arrSHron.length; j++) {
				if (_point.arrSHron[j].sten.idArr == arrSplice[i].idArr) {
					b = false;
					break;
				}
			}
			if (!b) continue;

			rez = arrSplice[i].isPointInLin(_point.position, _otstup, _dist);
			if (rez != null) {
				rez.w = i;
				break;
			}
		}

		return rez;
	};

	/** Делит стену на две стены
	* @param {Sten} _sten - стена которую делим
	* @param {AidPoint} [_point] - точка, которая делит стену
	* @param {number} [retSten] - (true) возвращает новую стену; (false) разделившую точку
	* @return {Sten | AidPoint} */
	this.dividedSten = function (_sten, _point, retSten) {
		return _sten.dividedSten(_point, retSten);
	};

	this._mashtab = 1;


}
SpRelief.prototype = {
	set mashtab (v) {
		if (this._mashtab == v) return;
		this._mashtab = 1 / v;
	},
	get mashtab () {
		return this._mashtab;
	},
	set dedagTime (v) {
		if (this._dedagTime == v) return;
		this._dedagTime = v;
		// this.graphics.visible = v;
		sFloor.arrFloor[0].contDebug.addChild(this.graphics);
	},
	get dedagTime () {
		return this._dedagTime;
	}
// ######################################################################################################
};
