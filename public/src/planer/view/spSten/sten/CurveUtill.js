
import { Position } from '../../Calc.js';

// для отрисовки кривых
export function CurveUtill () {
	var self = this;

	/**
	* Отрисовка дуги по двум точкам (p, p2) и смещения кривой (curvature)
	* @param {Point} p - начало линии.
	* @param {Point} p2 - конец линии.
	* @param {number} curvature - смещение кривой от отрезка.
	* @param {number} ofsRadius[0] - смещение отрисовки кривой от центра.
	* @param {number} ofsLen[0] - сдвиг точки (p) по дуге.
	* @param {number} ofsLen1[0] - сдвиг точки (p2) по дуге.
	*/
	this.drawArc = function (g, p, p2, curvature, ofsRadius, ofsLen, ofsLen1, isRevers) {
		if (isRevers) {
			var pt = p;
			p = p2;
			p2 = pt;

			pt = ofsLen;
			ofsLen = ofsLen1;
			ofsLen1 = pt;
			// ofsRadius = -(ofsRadius || 0);
			ofsLen = -(ofsLen || 0);
			ofsLen1 = -(ofsLen1 || 0);
			curvature = -(curvature || 0);
		}
		p = p.copy();
		p2 = p2.copy();
		var pc = self.getCenterCircle(p, p2, curvature);
		if (!pc) return;

		var side = curvature > 0 ? -1 : 1;
		self.moveLineByCircle(p, p2, pc, ((ofsLen || 0) * side), ((ofsLen1 || 0) * side));

		var startAngle = calc.getAngle(p, pc) - Math.PI;
		var endAngle = calc.getAngle(p2, pc) - Math.PI;
		var radius = calc.getDistance(pc, p) + (ofsRadius || 0);

		g.arc(pc.x, pc.y, radius, startAngle, endAngle, curvature > 0);
	};

	this.getCenterCircle = function (p, p2, curvature) {
		var p1 = self.getPerpendPoint(p, p2, curvature);
		return calc.getCenterCircle(p, p1, p2);
	};

	var pp = new Position();
	this.getPerpendPoint = function (p, p2, offset) {
		var angle = calc.getAngle(p, p2) + (90 * calc.DEG2RAD);
		calc.getVector(offset, angle, pp);
		pp.x += (p.x + p2.x) / 2;
		pp.y += (p.y + p2.y) / 2;
		pp.x = calc.okrugNumber(pp.x);
		pp.y = calc.okrugNumber(pp.y);
		return pp;
	};

	this.moveLineByCircle = function (p, p2, pc, ofsLen, ofsLen1) {
		calc.rotationPointByLength(p, ofsLen, pc);
		calc.rotationPointByLength(p2, ofsLen1, pc);
	};


	this.movePoint = function (p, length, pc) {
		var angle = calc.getAngle(p, pc);
		var v = calc.getVector(length, angle);
		p.x += v.x;
		p.y += v.y;
	};

	this.drawLine = function (g, p, length, pc, ofsLen) {
		self.movePoint(p, -length / 2, pc);
		calc.rotationPointByLength(p, ofsLen, pc);
		g.moveTo(p.x, p.y);
		calc.rotationPointByLength(p, -ofsLen, pc);
		self.movePoint(p, length, pc);
		calc.rotationPointByLength(p, ofsLen, pc);
		g.lineTo(p.x, p.y);
		calc.rotationPointByLength(p, -ofsLen, pc);
		self.movePoint(p, -length / 2, pc);
	};

	this.drawLineCurv = function (g, p, length, pc, ofsLen, ofsRadius) {
		var pp = p.copy();
		var radius = ofsRadius || 0;

		calc.rotationPointByLength(pp, ofsLen, pc);

		self.movePoint(pp, -length / 2 + radius, pc);
		g.moveTo(pp.x, pp.y);
		self.movePoint(pp, length, pc);
		g.lineTo(pp.x, pp.y);
		self.movePoint(pp, -length / 2 + radius, pc);

		calc.rotationPointByLength(pp, -ofsLen, pc);
	};

	// todo

	this.getCurvPositionSten = function (sten, lenToCurv, bwidth) {
		var posCurv = sten.lineRange.getPositionByLength(lenToCurv);
		var rotCurve = sten.lineRange.getAngleByPoint(posCurv, bwidth);
		var curvature = calc.okrugNumber(sten.lineRange.getCurvatureByWidth(bwidth));
		return {position: posCurv, angel: rotCurve, curvature: curvature};
	};

	this.convertCurvePosBlok = function (posCurv, rotCurve, bwidth) {
		posCurv = posCurv.copy();
		// rotCurve -= sten._rotation;
		// calc.rotationPoint(posCurv, -sten._rotation, sten.position);
		var rotCenter = new Position(posCurv.x + bwidth / 2, posCurv.y);
		calc.rotationPoint(rotCenter, rotCurve, posCurv);
		calc.rotationPoint(posCurv, -rotCurve, rotCenter);
		// posCurv.x -= sten.position.x;
		// posCurv.y -= sten.position.y;
		return posCurv;
	};

}
