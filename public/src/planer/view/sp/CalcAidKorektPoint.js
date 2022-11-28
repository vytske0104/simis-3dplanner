


import { BlaXZNaDva} from './BlaXZNaDva.js';

import {LinePosition} from './SpCalc.js';
/**
* Для расчетов пересечений линий, алгоритмы пересечений линий
* @class
*/
export function CalcAidKorektPoint (cAid) {
	var self = this;
	var point, point2, arr;
	var angel, an2, otDin, di, di1;

	var debug = undefined;// включение дебагера / и должен быть включен в cAid

	this.setDebug=function(dp){
		debug=dp
	}
	/**
	* Получить пересечения двух линий
	* @param {BlaXZNaDva} bla - данные линий 1
	* @param {BlaXZNaDva} blaX - данные линий 2
	* @return {LinePosition} точка
	*/
	this.getPeresek = function (bla, blaX) {


		if ((bla.tip == 0) && (blaX.tip == 0)) { /// ровная ровная
			return setPointLineLine(bla, blaX);
		}

		if ((bla.tip == 0) && (blaX.tip == 1)) {	// ровная круглая
			return setPointLineCurve(bla, blaX);
		}

		if ((bla.tip == 1) && (blaX.tip == 0)) {	// круглая ровная
			return setPointCurveLine(bla, blaX);
		}

		if ((bla.tip == 1) && (blaX.tip == 1)) { // круглая круглая
			return setPointCurveCurve(bla, blaX);
		}

		throw new Error('err type bla=' + bla.tip + ' blaX=' + blaX.tip);
	};

	function setPointLineLine (bla, blaX) {
		var lineP = new LinePosition();

		if ((bla.tip == 0) && (blaX.tip == 0)) { /// ровная ровная
			lineP.p.setPoint(bla.p1);
			lineP.p1.setPoint(bla.p1);
			lineP.p2.setPoint(bla.p2);

			otDin = bla.otstup;
			if (otDin < bla.dist12 * 2)otDin = bla.dist12 * 2;
			if (otDin < blaX.dist12 * 2)otDin = blaX.dist12 * 2;
			bla.dragOtstup(otDin);
			blaX.dragOtstup(otDin);

			angel = calc.getTreeAngel(bla.p, bla.p1, blaX.p);

			/*if (debug) {
				
				debug.dPoint(lineP.p1, 15, 0xff00ff);
				debug.dPoint(lineP.p, 7, 0x0000ff);
				debug.dLine(lineP.p, blaX.maxp1, 0x0000ff, 3);
			}*/

			// if(Math.abs(Math.round(angel*1000))
			if (Math.abs(Math.round(angel * 100)) == 314) { // паралели
				lineP.p.setPoint(bla.p1);
				return lineP;
			}

			if (Math.abs(Math.round((bla.angel - blaX.angel) * 100)) == 0) { // паралели
				lineP.p.setPoint(bla.p1);
				return lineP;
			}

			point = calc.getPointOfIntersection(bla.p, bla.maxp1, blaX.maxp, blaX.maxp1);
			if (point != null) {
				point2 = calc.getPointOfIntersection(bla.p, bla.p1, blaX.p, blaX.p3);
				if (point2 != null) {
					lineP.p.setPoint(point2);
					lineP.p1.setPoint(point2);
					return lineP;
				}
				lineP.p.setPoint(point);
				lineP.p1.setPoint(point);
				return lineP;
			}
			if (bla.dist12 > blaX.dist12) {
				// стенка в нутри другой стенки
				point = calc.getPointOfIntersection(bla.p, bla.maxp, blaX.p, blaX.maxp);
				if (point != null) {
					lineP.p1.setPoint(bla.p2);
					return lineP;
				}
			}

			// больше чем другая стенка то будет пересечение по
			point = calc.getPointOfIntersection(bla.p1, bla.p2, blaX.maxp, blaX.maxp1);
			if (point != null) {
				lineP.p1.setPoint(point);
				lineP.p.setPoint(bla.p1);
				return lineP;
			}

			point2 = calc.getPointOfIntersection(bla.p, bla.p1, blaX.p, blaX.p3);
			if (point2 != null) {
				lineP.p.setPoint(point2);
				lineP.p1.setPoint(point2);
				return lineP;
			}

			point = calc.getPointOfIntersection(bla.p, bla.maxSp1, blaX.p1, blaX.p2);
			if (point != null) {
				lineP.p.setPoint(point);
				lineP.p1.setPoint(point);
				return lineP;
			}

			point = calc.getPointOfIntersection(bla.p, bla.maxSp1, blaX.p1, blaX.maxp1);
			if (point != null) {
				lineP.p.setPoint(point);
				lineP.p1.setPoint(point);
				return lineP;
			}

			point = calc.getPointOfIntersection(bla.p, bla.maxSp1, blaX.p1, blaX.maxSp1);
			if (point != null) {

				lineP.p.setPoint(bla.maxp1);
				lineP.p1.set((bla.maxp1.x + blaX.maxp1.x) / 2, (bla.maxp1.y + blaX.maxp1.y) / 2);

				point2 = calc.getPointOfIntersection(bla.p1, bla.maxp1, blaX.p1, blaX.maxp1);
				if (point2 != null) {
					lineP.p1.setPoint(point2);
					lineP.p.setPoint(point2);
				}
				return lineP;
			}
			return lineP;
		}

	}
	function setPointCurveLine (bla, blaX) {
		var maxDist = Math.min(bla.dis / 2, blaX.dis / 2);// точка пересечения между прямой и круглой будет не больше диста// Math.min(Math.abs(bla.lineRange.radius) , Math.abs(blaX.lineRange.radius) );
		var lineP = new LinePosition();

		if ((bla.tip == 1) && (blaX.tip == 0)) {	// круглая ровная
			lineP.p.setPoint(blaX.p);
			lineP.p1.setPoint(blaX.p1);
			lineP.p2.setPoint(blaX.p2);

			otDin = blaX.otstup;
			if (otDin < bla.dist12 * 2)otDin = bla.dist12 * 2;
			if (otDin < blaX.dist12 * 2)otDin = blaX.dist12 * 2;

			blaX.dragOtstup(otDin);
			// angel=calc.getTreeAngel(blaX.p, blaX.p1, bla.lineRange.p1);
			// an2=calc.getTreeAngel(blaX.p, blaX.p1, bla.lineRange.p2);
			arr = calc.getLineCircleIntersectionPoints(blaX.maxp1, blaX.p, bla.lineRange.pOCent, bla.lineRange.radius, true);
			if (arr.length > 1) { // переваричиваем точки пересечения ближе к началу lineP.p1
				if (calc.getDistance(lineP.p1, arr[0]) > calc.getDistance(lineP.p1, arr[1])) {
					arr.reverse();
				}
			}

			/*if (debug) {
				debug.dPoint(blaX.maxp1, 6, 0x0000ff);
				debug.dPoint(lineP.p1, 15, 0xff00ff);
				debug.dPoint(lineP.p, 7, 0x0000ff);
				debug.dLine(lineP.p, blaX.maxp1, 0x0000ff, 3);
				debug.dPoint(bla.lineRange.pOCent, bla.lineRange.radius, 0x0000ff, 8);
			}*/

			// if (calc.getDistance(bla.p1,bla.p) >= Math.abs(blaX.lineRange.radius) ) {
			// 	maxDist = otDin*4
			// }
			if (arr.length != 0 && calc.getDistance(arr[0], lineP.p1) < maxDist) { // рядом
				/*if (debug) {
					drawArr(arr);
					debug.dPoint(arr[0], 8, 0x00ffff);
				}*/
				lineP.p.setPoint(arr[0]);
				lineP.p1.setPoint(arr[0]);
				return lineP;
			}
			lineP.p.setPoint(blaX.p1);
			// lineP.p1.set((blaX.p1.x+bla.lineRange.p.x)/2,(blaX.p1.y+bla.lineRange.p.y)/2);
		}

		return lineP;
	}
	function setPointLineCurve (bla, blaX) {
		var maxDist = Math.min(bla.dis / 2, blaX.dis / 2);// точка пересечения между прямой и круглой будет не больше диста// Math.min(Math.abs(bla.lineRange.radius) , Math.abs(blaX.lineRange.radius) );
		var lineP = new LinePosition();

		if ((bla.tip == 0) && (blaX.tip == 1)) {	// ровная круглая
			lineP.p.setPoint(bla.p);
			lineP.p1.setPoint(bla.p1);
			lineP.p2.setPoint(bla.p2);

			otDin = bla.otstup;
			if (otDin < bla.dist12 * 2)otDin = bla.dist12 * 2;
			if (otDin < blaX.dist12 * 2)otDin = blaX.dist12 * 2;
			bla.dragOtstup(otDin);
			// angel=calc.getTreeAngel(bla.p, bla.p1, blaX.lineRange.p1);
			// an2=calc.getTreeAngel(bla.p, bla.p1, blaX.lineRange.p2);
			arr = calc.getLineCircleIntersectionPoints(bla.maxp1, bla.p, blaX.lineRange.pOCent, blaX.lineRange.radius);
			if (arr.length > 1) { // переваричиваем точки пересечения ближе к началу lineP.p1
				if (calc.getDistance(lineP.p1, arr[0]) > calc.getDistance(lineP.p1, arr[1])) {
					arr.reverse();
				}
			}

			/*if (debug) {
				debug.dPoint(lineP.p1, 15, 0xff00ff);
				debug.dPoint(bla.maxp1, 6, 0x0000ff);
				debug.dPoint(lineP.p, 7, 0x0000ff);
				debug.dLine(lineP.p, bla.maxp1, 0x0000ff, 3);
				debug.dPoint(blaX.lineRange.pOCent, blaX.lineRange.radius, 0x0000ff, 8);
			}*/

			// if (calc.getDistance(bla.p1,bla.p) >= Math.abs(blaX.lineRange.radius) ) {
			// 	maxDist = otDin*4
			// }
			if (arr.length != 0 && calc.getDistance(arr[0], lineP.p1) < maxDist) { // рядом
				/*if (debug) {
					drawArr(arr);
					debug.dPoint(arr[0], 8, 0x00ffff);
				}*/
				lineP.p.setPoint(arr[0]);
				lineP.p1.setPoint(arr[0]);
				return lineP;
			}
			lineP.p.setPoint(bla.p1);
			// lineP.p1.set((bla.p1.x+blaX.lineRange.p.x)/2,(bla.p1.y+blaX.lineRange.p.y)/2);
		}
		return lineP;
	}

	function setPointCurveCurve (bla, blaX) {
		var maxDist = Math.min(bla.dis / 2, blaX.dis / 2);// точка пересечения между прямой и круглой будет не больше диста// Math.min(Math.abs(bla.lineRange.radius) , Math.abs(blaX.lineRange.radius) );
		var lineP = new LinePosition();

		if ((bla.tip == 1) && (blaX.tip == 1)) { // круглая круглая

			otDin = blaX.otstup;
			if (otDin < bla.dist12 * 2)otDin = bla.dist12 * 2;
			if (otDin < blaX.dist12 * 2)otDin = blaX.dist12 * 2;

			lineP.p.setPoint(bla.lineRange.p);
			lineP.p1.setPoint(bla.lineRange.p);
			lineP.p2.setPoint(bla.lineRange1.p);

			arr = calc.getCircleCircleIntersectionPoints(bla.lineRange.pOCent, bla.lineRange.radius, blaX.lineRange.pOCent, blaX.lineRange.radius);
			/*if (debug) {
				debug.dPoint(bla.lineRange.pOCent, bla.lineRange.radius, 0x0000ff, 8);
				debug.dPoint(blaX.lineRange.pOCent, blaX.lineRange.radius, 0x0000ff, 8);
			}*/
			if (arr.length != 0) { // рядом
				if (arr.length == 1) {
					/*if (debug) {
						debug.dPoint(arr[0], 8, 0x00ffff);
					}*/
					lineP.p.setPoint(arr[0]);
					lineP.p1.setPoint(arr[0]);
					// this.dPoint(arr[0], 10, 0xff0000);
					return lineP;
				} else {

					di = calc.getDistance(lineP.p2, arr[0]);
					di1 = calc.getDistance(lineP.p2, arr[1]);


					if (di < di1) {
						dis = di;
						point = arr[0];
					} else {
						dis = di1;
						point = arr[1];
					}

					/*if (debug) {
						drawArr(arr);
						debug.dPoint(arr[0], 8, 0x00ffff);
						debug.dPoint(lineP.p2, 10, 0xf0ffff);
					}*/
					if (dis < (bla.delph + blaX.delph) && dis < maxDist) {
						lineP.p.setPoint(point);
						lineP.p1.setPoint(point);
					}
					// debug.dPoint(point, 10, 0xff0000);/**/
				}
			}

			if (bla.dist12 > blaX.dist12) {

			}
		}
		return lineP;
	}


	function drawArr (arr) {
		arr.forEach(function (p) {
			//debug.dPoint(p, Math.random() * 5 + 6, 0xffffff * Math.random());
		});
	}
}
