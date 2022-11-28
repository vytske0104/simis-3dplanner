import { Position } from './Calc.js';
/**
*Мат фукнкции для кривой
*/

export function LineRange (_sahAngel) {
	var self = this;
	this.sahAngel = _sahAngel || 10;
	var minCurv = 0.1;
	this.radius = 1;
	this.curvature = minCurv;
	this.p = new Position();// первая точка
	this.p1 = new Position(1, 0);// конечная точка
	this.p2 = new Position(0.5, 0.5);// середина
	this.pOCent = new Position();// центор
	this.pint90 = new Position();

	this.arrPosit = [];
	for (var i = 0; i < this.sahAngel; i++) {
		this.arrPosit[i] = new Position();
	}

	this.moveLineRange = function (dist) {
		movePointByPoint(this.p, this.pOCent, dist);
		movePointByPoint(this.p1, this.pOCent, dist);
		movePointByPoint(this.p2, this.pOCent, dist);
		this.updateFromCurvature(this.getCurrentCurvature());
	};

	// здвигаем точку p к p1 на растояние dist
	function movePointByPoint (p, p1, dist) {
		calc.getVector(calc.getDistance(p, p1) + dist, calc.getAngle(p1, p), p);
		p.x += p1.x;
		p.y += p1.y;
	}

	this.setTwoPoint = function (_p, _p1) {
		this.p.setPoint(_p);
		this.p1.setPoint(_p1);
		this.upDate();
	};

	this.getLR = function (point, num) {
		this.upDate();
		var lr = new LineRange(this.sahAngel);
		if (num === 0) {
			lr.p.setPoint(this.p);
			lr.p1.setPoint(point);
		}
		if (num === 1) {
			lr.p.setPoint(point);
			lr.p1.setPoint(this.p1);
		}

		lr.p2.set((lr.p.x + lr.p1.x) / 2, (lr.p.y + lr.p1.y) / 2);
		var aa = calc.getAngle(this.pOCent, lr.p2);
		calc.getVector(this.radius, aa, lr.p2);
		lr.p2.x += this.pOCent.x;
		lr.p2.y += this.pOCent.y;

		lr.updateFromCurvature(lr.getCurrentCurvature());
		return lr;
	};

	this.setLR = function (lr) {
		this.p.setPoint(lr.p);
		this.p1.setPoint(lr.p1);
		this.p2.setPoint(lr.p2);
		this.updateFromCurvature(this.getCurrentCurvature());
	};

	this.setCurvFromPoint = function (p2) {
		this.p2.setPoint(p2);
		this.updateFromCurvature(this.getCurrentCurvature());
	};

	this.getCurrentCurvature = function () {
		return calc.getDistancePointToLine(this.p, this.p1, this.p2);
	};

	// коректировка точек rangeRadius|number - отступ от центральной оси , р|{x,y} - точка где начинать р1|{x,y} - где заканчивать построение точек
	this.korectPoint2 = function (rangeRadius, p, p1) {
		rangeRadius = rangeRadius || 0;
		p = p || this.p;
		p1 = p1 || this.p1;
		calc.getArrPointCircle(this.pOCent, this.radius + rangeRadius, p, p1, this.sahAngel, this.curvature > 0, this.arrPosit);
	};

	this.upDate = function () {
		this.updateFromCurvature();
	};

	var rez3 = new Position();
	this.getPointInLineRange = function (p, dist, otstup, isRound) {
		otstup = otstup || 0;
		var distToPoint = calc.getDistance(p, this.pOCent);
		if (calc.diffNum(distToPoint, this.radius) > dist) {
			return null;
		}
		var lenP = this.getLengthPoint(p);
		var min = 0;
		var max = this.getLenght();
		if (lenP < min || lenP > max) {
			var minDif = Math.min(calc.diffNum(lenP, min), calc.diffNum(lenP, max));
			if (!isRound && otstup < minDif) {
				return null;
			}
			if (isRound) {
				if (calc.diffNum(lenP, min) < calc.diffNum(lenP, max)) {
					rez3.setPoint(this.p);
					return rez3;
				} else {
					rez3.setPoint(this.p1);
					return rez3;
				}
			}

		}

		calc.getVector(this.radius, calc.getAngle(this.pOCent, p), rez3);
		rez3.x += this.pOCent.x;
		rez3.y += this.pOCent.y;
		return rez3;
	};

	this.updateFromCurvature = function (curv) {
		this.curvature = roundToMaxCurve(curv || this.curvature);

		this.pint90.setPoint(getPerpendPoint(this.p, this.p1, this.curvature));

		this.p2.setPoint(this.pint90);

		var pc = calc.getCenterCircle(this.p, this.p1, this.p2);
		if (pc) {
			this.pOCent.setPoint(pc);
		} else {
			// console.warn('no found CenterCircle', this.p.copy(), this.p1.copy(), this.p2.copy());
		}
		this.radius = calc.getDistance(this.pOCent, this.p);

		this.korectPoint2();
	};

	function roundToMaxCurve (val) {
		var maxCurve = calc.getDistance(self.p, self.p1) / 2;
		val = calc.getValueBetween(val, -maxCurve, maxCurve);
		if (val <= 0 && val >= -minCurv) {
			val = -minCurv;
		} else if (val >= 0 && val <= minCurv) {
			val = minCurv;
		}
		return val;
	}

	var pp = new Position();
	function getPerpendPoint (p, p2, offset) {
		var angle = calc.getAngle(p, p2) + (90 * calc.DEG2RAD);
		calc.getVector(offset, angle, pp);
		pp.x += (p.x + p2.x) / 2;
		pp.y += (p.y + p2.y) / 2;
		pp.x = calc.okrugNumber(pp.x);
		pp.y = calc.okrugNumber(pp.y);
		return pp;
	}

	// получить длину на которой расположена точка по кривой
	this.getLengthPoint = function (posCurv, offset) {
		if (offset) {
			posCurv = new Position(posCurv.x, posCurv.y);
			calc.rotationPointByLength(posCurv, offset * ((this.curvature > 0) ? -1 : 1), this.pOCent);
		}
		var lenPoint = calc.getLenghtCircle(this.radius, this.pOCent, this.p, posCurv, (this.curvature > 0));
		var curvLen = this.getLenght();
		if (lenPoint > curvLen) {
			var circleLen = calc.getLenghtCircle(this.radius, this.pOCent);
			var gostLen = circleLen - curvLen;
			if (lenPoint > (curvLen + gostLen / 2)) {
				lenPoint = lenPoint - circleLen;
			}
		}
		return lenPoint;
	};

	// получить позицию на кривой относительно длинны
	this.getPositionByLength = function (lengthTo) {
		var pLine = new Position(this.p.x, this.p.y);
		calc.rotationPointByLength(pLine, lengthTo * ((this.curvature > 0) ? -1 : 1), this.pOCent);
		return pLine;
	};

	// получить угол точки с шириной
	this.getAngleByPoint = function (pt, width) {
		width = width * ((this.curvature > 0) ? -1 : 1);
		var arrIntersect = calc.getCircleCircleIntersectionPoints(this.pOCent, this.radius, pt, Math.abs(width));
		var intersect = width < 0 ? arrIntersect[0] : arrIntersect[1];
		return calc.getAngle(pt, intersect);
	};

	// получить длину кривой todo расчитывать при изменении кривой
	this.getLenght = function () {
		return calc.getLenghtCircle(this.radius, this.pOCent, this.p, this.p1, (this.curvature > 0));
	};

	// получить изгиб от ширины
	this.getCurvatureByWidth = function (width) {
		var curv = calc.getCurvatureByWidth(width, this.radius);
		if (curv === null) {
			curv = calc.getCurvatureByWidth((this.radius * 2) * (width < 0 ? -1 : 1), this.radius);
		}
		return (curv || 0) * ((this.curvature < 0) ? -1 : 1);
	};

	// получить ширину прямой относительно длины кривой
	this.getWidthByLengthTo = function (lengthTo) {
		var p = new Position(this.radius, 0);
		var p1 = new Position(this.radius, 0);
		calc.rotationPointByLength(p, lengthTo);
		return calc.getDistance(p, p1);
	};

	// получить длину кривой относительно прямой
	this.getLengthByWidth = function (width) {
		return calc.getLengthByWidth(width, (self.getCurvatureByWidth(width)));
	};

}
