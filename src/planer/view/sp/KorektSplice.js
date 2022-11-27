import { Rectangle } from './Calc.js';



/**
* Утилита с разными полезными функ для линии убрать паралели итд
* @class
*/
export function KorektSplice (stage) {
	var self = this;

	this.filterRect = undefined;

	this.stage = stage;

	/**
	* Убрать паралели линии
	* @param {Splice} линии паралели которой нужно убрать
	*/
	var _rect = new Rectangle();
	this.filterRect = undefined;

	this.paralelSten = function (splice) {
		// window.console.time('paralelSten');
		// 1 находим линии которые контачал с приходящей линией
		// 2 собираем точки
		// 3 проставить точки на стены
		// 4 найти паралели
		// 4.1 выбрать линии которые не нужно удалять
		// 5 удалить лишние паралели
		self.filterRect = undefined;
		if (splice) {
			_rect.setRect(splice.getRect());
			self.filterRect = _rect;
		}
		// 1
		var arrSplice = getArrSpliceParalel(splice);// линии которые в паралели


		// 2
		var arrPoint = getArrPointFromSplice(arrSplice);


		// 3
		var resSetWal = setArrPointWalls(arrPoint, splice);// линии что создались при постанове точек


		// 4 находим паралели
		var arrParalelSplice = getArrParalelConnect(splice);// тут паралели выбираем линии контачат

		if (arrParalelSplice.length <= 1) {
			return resSetWal;// нету паралельный линий
		}

		// 4.1 выбираем из всех одинаковых паралелей один кидаем в arrNotClearObj
		var arrNotClearObj = getArrNotClearObj(arrParalelSplice, splice);//   которые останутся после слития


		// 5 чистим паралели кроме arrNotClearObj
		var arrClearSplice = clearParalel(arrParalelSplice, arrNotClearObj);
		resSetWal.arrClearSplice = arrClearSplice;

		return resSetWal;
		// window.console.timeEnd('paralelSten');
	};

	function clearParalel (arrParalelSplice, arrNotClearObj) {
		var arrClearSplice = [];
		for (var i = 0; i < arrParalelSplice.length; i++) {
			if (inArrFromId(arrParalelSplice[i], arrNotClearObj)) continue; // если линия есть в масиве которые не нужно удалять
			if (arrClearSplice.indexOf(arrParalelSplice[i]) === -1) {
				arrParalelSplice[i].rememberState();
				arrParalelSplice[i].clear();
				arrClearSplice.push(arrParalelSplice[i]);
			}
		}
		return arrClearSplice;
	}

	function getArrNotClearObj (arrParalelSplice, splice) {
		var arrNotClearObj = [];

		for (var i = 0; i < arrParalelSplice.length; i++) {
			if (splice.idArr === arrParalelSplice[i].idArr) continue;
			if (inArrOnePosition(arrParalelSplice[i], arrNotClearObj)) continue;
			arrNotClearObj.push(arrParalelSplice[i]);
		}
		return arrNotClearObj;
	}

	function setArrPointWalls (arrPoint, splice) {
		var res = new DataChangeSp();
		for (var i = 0; i < arrPoint.length; i++) {
			var r = self.setPointWalls(arrPoint[i].position, self.filterRect, splice);
			res.add(r);
		}
		return res;
	}

	function getArrParalelConnect (splice) { // находим паралельные линии(находятся в одних позициях точек)
		var arrParalelSplice = [];
		var arrSplice = getArrSpliceParalel(splice);

		for (var i = 0; i < arrSplice.length; i++) {
			for (var j = 0; j < arrSplice.length; j++) {
				if (arrSplice[i].idArr === arrSplice[j].idArr) continue;
				if (isOnePosition(arrSplice[i], arrSplice[j])) {
					arrParalelSplice.push(arrSplice[i]);
				}
			}
		}
		return arrParalelSplice;
	}

	function getArrSpliceParalel (splice) { // получить паралельные линии splice включая ее
		return getArrSplice().filter(filterInRect).filter(filterParalelSten, splice);
	}
	function filterParalelSten (s) { // this нужно передать линию
		return/* (this.idArr !== s.idArr) && */calc.isParalel(this.position, this.position1, s.position, s.position1, 3 * calc.DEG2RAD);
	}
	function getArrPointFromSplice (arrSplice) {
		var arrPoint = [];
		for (var i = 0; i < arrSplice.length; i++) {
			if (arrSplice[i].addPoint) arrPoint.push(arrSplice[i].addPoint);
			if (arrSplice[i].addPoint1) arrPoint.push(arrSplice[i].addPoint1);
		}
		return arrPoint.filter(filterUnik);
	}
	function isOnePosition (s, s1) { // одинаковые позиции
		return ((s.addPoint.idArr === s1.addPoint.idArr && s.addPoint1.idArr === s1.addPoint1.idArr) ||
				(s.addPoint.idArr === s1.addPoint1.idArr && s.addPoint1.idArr === s1.addPoint.idArr));
	}
	function inArrOnePosition (obj, arr) { // уже добавлен обект с такими позициями
		for (var i = 0; i < arr.length; i++) {
			if (isOnePosition(obj, arr[i])) return true;
		}
	}
	function inArrFromId (obj, arr) { // уже добавлен обект с такими id
		for (var i = 0; i < arr.length; i++) {
			if (obj.idArr === arr[i].idArr) return true;
		}
	}
	function filterUnik (item, index, arr) { // фильтр уникальные значения
		return arr.indexOf(item) === index;
	}

	var radiusSlit = 5;

	/**
	* Поставить точки пересечений линий
	* @param {Rectangle} [rect] - не обязательно границы где нужны пересечения
	*/
	this.setIntersectStenPoint = function (rect) {
		var res = new DataChangeSp();
		var arrIntersect = this.getPointOfIntersectionSten(rect);
		for (var i = 0; i < arrIntersect.length; i++) {
			var r = self.setPointWalls(arrIntersect[i], rect);
			res.add(r);
		}
		return res;
	};

	/**
	* Получить точки пересечений стен
	* @param {Rectangle} [rect] - не обязательно границы где нужны пересечения
	* @return {Array<Position>} масив пересечений стен
	*/
	this.getPointOfIntersectionSten = function (rect) {
		// window.console.time('getPointOfIntersectionSten');
		self.filterRect = rect;
		var arrSplice = getArrSplice().filter(filterInRect);
		var arrPoint = [];
		// проверяем каждую стену с каждой на пересечение
		for (var i = 0; i < arrSplice.length; i++) {
			for (var j = i; j < arrSplice.length; j++) {
				if (!checkIntersectionSten(arrSplice[i], arrSplice[j])) continue;	// если стены не нужно проверять между собой

				arrPoint = getStenIntersection(arrSplice[i], arrSplice[j]).concat(arrPoint);
			}
		}
		slitPosition(arrPoint);// сливаем позиции
		// window.console.timeEnd('getPointOfIntersectionSten');
		return arrPoint;
	};

	/**
	* Поставить точку на линию (разделить линию)
	* @param {Position} position - координата где нужно поставить точку на стене
	* @return {Array<Splice>} масив созданых и разделенных линий при постановке точки
	*/
	this.setPointWalls = function (position, rect, splice) {
		// window.console.time('setPointWalls');
		var newSplice = null;
		var res = new DataChangeSp();

		self.filterRect = rect;
		var p = craetPoint();
		p.position.set(position.x, position.y);
		var arrSplice = getArrSplice().filter(filterInRect).filter(function (s) {
			return s.isPointInLin(p.position, s.delph / 4, s.delph / 4) != null &&
			(calc.getDistance(p.position, s.addPoint.position) > radiusSlit && calc.getDistance(p.position, s.addPoint1.position) > radiusSlit);
		});

		for (var j = 0; j < arrSplice.length; j++) {
			arrSplice[j].rememberState();

			newSplice = arrSplice[j].dividedSten(p, true);

			res.arrNewSplice.push(newSplice);
			res.arrDividedSplice.push(arrSplice[j]);

			slitTestPoint(p);
		}
		clearFree(p);// убираем точку если она не понадобилась
		// window.console.timeEnd('setPointWalls');
		res.update();
		return res;
	};


	// сливаем позиции
	function slitPosition (arrPoint) {
		// убираем близкие точки
		for (var i = 0; i < arrPoint.length; i++) {
			for (var j = 0; j < arrPoint.length; j++) {
				if (i == j) continue;
				if (calc.getDistance(arrPoint[i], arrPoint[j]) < radiusSlit) {
					arrPoint.splice(i, 1);
					i = 0;
					break;
				}
			}
		}
		// прилипаем к существующим точкам
		var index = -1;
		for (var i = 0; i < arrPoint.length; i++) {
			index = getRadiusPoint(arrPoint[i], radiusSlit);
			if (index != -1) arrPoint[i].set(getArrPoint()[index].position.x, getArrPoint()[index].position.y);
		}
	}

	// нужно ли проверять пересечения для этих стен true - нужно
	function checkIntersectionSten (sten, sten1) {
		var res = true;
		if (res && (sten.idArr == sten1.idArr)) res = false;																// тажа самая стена
		if (res && (!sten.addPoint || !sten.addPoint1 || !sten1.addPoint || !sten1.addPoint1)) res = false;	// если нету позиции точки стенки
		if (res && (sten.addPoint.idArr == sten1.addPoint.idArr || sten.addPoint.idArr == sten1.addPoint1.idArr)) res = false; // одна  продолжает вторую
		if (res && (sten.addPoint1.idArr == sten1.addPoint.idArr || sten.addPoint1.idArr == sten1.addPoint1.idArr)) res = false; // одна  продолжает вторую
		return res;
	}

	function filterInRect (item) {
		if (!item.life) return false;
		if (self.filterRect && !calc.isIntersectionRect(self.filterRect, item.getRect())) return false;// не входит в область
		return true;
	}

	// -----
	function clearFree (addPoint) {
		addPoint.clearFree();
	}
	function slitTestPoint (addPoint) {
		var old = self.stage.spRelief.snappingPoint;
		self.stage.spRelief.snappingPoint = 1;
		self.stage.spRelief.slitTestPoint(addPoint);
		self.stage.spRelief.snappingPoint = old;
	}
	function craetPoint () {
		return self.stage.craetPoint();
	}
	function getArrSplice () {
		return self.stage.arrSplice;
	}
	function getArrPoint () {
		return self.stage.arrPoint;
	}
	function getRadiusPoint (p, radiusSlit) {
		return self.stage.spRelief.getRadiusPoint(p, radiusSlit);
	}
	// получить пересечения для двух стен
	function getStenIntersection (sten, sten1) {
		var arrPoint = [];
		var intersect = null;
		if (sten.tip == 0 && sten1.tip == 0) { // две ровные стены максимум одна точка пересечения
			intersect = calc.getPointOfIntersection(sten.addPoint.position, sten.addPoint1.position, sten1.addPoint.position, sten1.addPoint1.position);
			if (intersect != null) {
				arrPoint.push(new Position(intersect.x, intersect.y));
			}
		} else if (sten.tip == 1 && sten1.tip == 0) { // первая кривая вторая ровная /может быть две точки или одна
			var arrPositSten = sten.lineRange.arrPosit;
			for (var i = 0; i < arrPositSten.length - 1; i++) { // проходим по линии
				intersect = calc.getPointOfIntersection(arrPositSten[i], arrPositSten[i + 1], sten1.addPoint.position, sten1.addPoint1.position);
				if (intersect != null) {
					arrPoint.push(new Position(intersect.x, intersect.y));
				}
			}
		} else if (sten.tip == 0 && sten1.tip == 1) { // вторая кривая первая ровная /может быть две точки или одна
			var arrPositSten = sten1.lineRange.arrPosit;
			for (var i = 0; i < arrPositSten.length - 1; i++) { // проходим по линии
				intersect = calc.getPointOfIntersection(sten.addPoint.position, sten.addPoint1.position, arrPositSten[i], arrPositSten[i + 1]);
				if (intersect != null) {
					arrPoint.push(new Position(intersect.x, intersect.y));
				}
			}
		} else if (sten.tip == 1 && sten1.tip == 1) { // две кривые стены /может две или одна точка
			var arrPositSten = sten.lineRange.arrPosit;
			var arrPositSten1 = sten1.lineRange.arrPosit;
			for (var i = 0; i < arrPositSten.length - 1; i++) { // проходим по линии двух стен
				for (var j = 0; j < arrPositSten1.length - 1; j++) {
					intersect = calc.getPointOfIntersection(arrPositSten1[j], arrPositSten1[j + 1], arrPositSten[i], arrPositSten[i + 1]);
					if (intersect != null) {
						arrPoint.push(new Position(intersect.x, intersect.y));
					}
				}
			}
		}

		if (sten.tip > 1 || sten1.tip > 1) {
			window.console.warn('нужно добавить для этого типа пересечения', sten.tip, sten1.tip);
		}

		return arrPoint;
	}
	// -----
}
