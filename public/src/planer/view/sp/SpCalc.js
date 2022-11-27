

import { CalcAidKorektPoint } from './CalcAidKorektPoint.js';
import { BlaXZNaDva} from './BlaXZNaDva.js';
/**
* калькулятор для стыков сращалок базовый линий линий
* @class
*/
export function SpCalc () {
	var self = this;
	var sten;
	var storona;

	var debug = false;
	var bXZva = new BlaXZNaDva(20);
	var bXZva1 = new BlaXZNaDva(20);

	/**
	* Для расчетов пересечений
	* @member {CalcAidKorektPoint}
	*/
	this.korektPoint = new CalcAidKorektPoint(this);

	// возвращает уникальный id
	this.generateUUID = (function () {
		// http://stackoverflow.com/questions/105034/how-to-create-a-guid-uuid-in-javascript/21963136#21963136
		var lut = [];
		for (var i = 0; i < 256; i++) {
			lut[ i ] = (i < 16 ? '0' : '') + (i).toString(16);
		}
		return function generateUUID () {
			var d0 = Math.random() * 0xffffffff | 0;
			var d1 = Math.random() * 0xffffffff | 0;
			var d2 = Math.random() * 0xffffffff | 0;
			var d3 = Math.random() * 0xffffffff | 0;
			var uuid = lut[ d0 & 0xff ] + lut[ d0 >> 8 & 0xff ] + lut[ d0 >> 16 & 0xff ] + lut[ d0 >> 24 & 0xff ] + '-' +
				lut[ d1 & 0xff ] + lut[ d1 >> 8 & 0xff ] + '-' + lut[ d1 >> 16 & 0x0f | 0x40 ] + lut[ d1 >> 24 & 0xff ] + '-' +
				lut[ d2 & 0x3f | 0x80 ] + lut[ d2 >> 8 & 0xff ] + '-' + lut[ d2 >> 16 & 0xff ] + lut[ d2 >> 24 & 0xff ] +
				lut[ d3 & 0xff ] + lut[ d3 >> 8 & 0xff ] + lut[ d3 >> 16 & 0xff ] + lut[ d3 >> 24 & 0xff ];
			// .toUpperCase() here flattens concatenated strings to save heap memory space.
			return uuid.toUpperCase();
		};
	}());

	var debug = undefined;// включение дебагера / и должен быть включен в cAid
	this.setDebug=function(dp){
		debug=dp;
		this.korektPoint.setDebug(dp)
	}


	this.getAngle = function (a, b) {
		b = b || rezNull;
		a = a || rezNull;
		return Math.atan2(b.y - a.y, b.x - a.x);
	};
	this.getDistance = function (p1, p2) {
		if (p1 == undefined) {
			return 0;
		}
		if (p2 == undefined) {
			p2 = rezNull;
		}
		p2 = p2 || rezNull;
		return Math.sqrt(Math.pow((p1.x - p2.x), 2) + Math.pow((p1.y - p2.y), 2));
	};



	var arrP = [
		new THREE.Vector2(0, 0),
		new THREE.Vector2(0, 0), // ночальные основного
		new THREE.Vector2(0, 0),
		new THREE.Vector2(0, 0), // ночальные с радиусом
		new THREE.Vector2(0, 0),
		new THREE.Vector2(0, 0), // ночальные с большим радиусом
		new THREE.Vector2(0, 0),
		new THREE.Vector2(0, 0), // конечнкая основная
		new THREE.Vector2(0, 0),
		new THREE.Vector2(0, 0), // конечнкая с радиусом
		new THREE.Vector2(0, 0),
		new THREE.Vector2(0, 0)/// конечнкая с большим радиусом
	];

	var position;
	var angel;


	// расчитывает на стене грани
	this.creatGrani2 = function (sHron, lP, lP2) {
		sten = sHron.sten;
		storona = sHron.storona;

		if (storona == false) {

			arrP[0].x = lP.p.x;
			arrP[0].y = lP.p.y;
			arrP[1].x = lP.p1.x;
			arrP[1].y = lP.p1.y;
			arrP[2].x = lP.p2.x;
			arrP[2].y = lP.p2.y;

			arrP[3].x = lP2.p2.x;
			arrP[3].y = lP2.p2.y;
			arrP[4].x = lP2.p1.x;
			arrP[4].y = lP2.p1.y;
			arrP[5].x = lP2.p.x;
			arrP[5].y = lP2.p.y;

			position = sHron.sten.position1;
			angel = -sten._rotation;
			sHron.sten.bolPosit1 = true;
			if (sHron.sten.tip == 0) {
				for (var i = 0; i < 6; i++) {
					arrP[i] = calc.povotorOtAngel(position, arrP[i], angel);
				}

				for (var i = 0; i < 6; i++) {
					sHron.sten.arrPosit1[i].set(arrP[i].x, arrP[i].y);
				}

			} else if (sHron.sten.tip == 1) {
				if (sHron.sten.lineRange.curvature > 0) {
					for (var i = 0; i < 6; i++) {
						sHron.sten.arrPosit1[i].set(arrP[i].x, arrP[i].y);
					}
				} else {
					for (var i = 0; i < 6; i++) {
						sHron.sten.arrPosit1[i].set(arrP[5 - i].x, arrP[5 - i].y);
					}
				}

			} else {
				window.console.warn('непонял как считить  ', sHron.sten.tip);
			}

		} else {

			arrP[0].x = lP.p.x;
			arrP[0].y = lP.p.y;
			arrP[1].x = lP.p1.x;
			arrP[1].y = lP.p1.y;
			arrP[2].x = lP.p2.x;
			arrP[2].y = lP.p2.y;

			arrP[3].x = lP2.p2.x;
			arrP[3].y = lP2.p2.y;
			arrP[4].x = lP2.p1.x;
			arrP[4].y = lP2.p1.y;
			arrP[5].x = lP2.p.x;
			arrP[5].y = lP2.p.y;



			position = sHron.sten.position;
			angel = -sten._rotation;
			sHron.sten.bolPosit = true;
			if (sHron.sten.tip == 0) {
				for (var i = 0; i < 6; i++) {
					arrP[i] = calc.povotorOtAngel(position, arrP[i], angel);
				}
				for (var i = 0; i < 6; i++) {
					sHron.sten.arrPosit[i].set(-arrP[i].x, arrP[i].y);
				}
			} else if (sHron.sten.tip == 1) {
				if (sHron.sten.lineRange.curvature > 0) {
					for (var i = 0; i < 6; i++) {
						sHron.sten.arrPosit[i].set(arrP[5 - i].x, arrP[5 - i].y);
					}
					
				} else {
					for (var i = 0; i < 6; i++) {
						sHron.sten.arrPosit[i].set(arrP[i].x, arrP[i].y);
					}
					
				}
			} else {
				window.console.warn('непонял как считить  ', sHron.sten.tip);
			}			
		}
		if(sHron.sten.offset!=0){
			sHron.sten.arrPosit[2].y=sHron.sten.arrPosit[3].y=0
			sHron.sten.arrPosit1[2].y=sHron.sten.arrPosit1[3].y=0
		}

	};


	var b1;
	var r =0// aidPointStatic.angelOtstup;


	var sHN;
	var sHron;
	var sHron1;
	var sHron2;

	var lPRet = new LinePosition();

	var lP = new LinePosition();
	var lP2 = new LinePosition();
	var kol;
	var aP;

	// ишем углы почти прямых стен

	var _off
	this.korektSHObject = function (_aP, num1) {
		//if(debug)debug.clearD();

		aP = _aP;
		kol = aP.arrSHron.length;
		sHron1 = aP.arrSHron[num1];// основная
		
		/*sHron1.sten.arrPosit[2].y=0;
		sHron1.sten.arrPosit[3].y=0;

		sHron1.sten.arrPosit1[2].y=0;
		sHron1.sten.arrPosit1[3].y=0;*/

		if (kol == 1) {//финал стены
			sHron1.sten.korectOffset()
			if (sHron1.sten.tip == 0) {
				
				if(debug){
					//debug.dLine(sHron1.sten.position,sHron1.sten.position1,0x00ff00,20)
				}
				_off=sHron1.sten.offset;				

				if (sHron1.storona == true) {
					sHron1.sten.bolPosit = false;
					sHron1.sten.arrPosit[0].set(0, sHron1.sten.delph / 2+_off);
					sHron1.sten.arrPosit[1].set(0, sHron1.sten.delph / 2+_off);
					sHron1.sten.arrPosit[2].set(0, _off);
					sHron1.sten.arrPosit[3].set(0, _off);
					sHron1.sten.arrPosit[4].set(0, -sHron1.sten.delph / 2+_off);
					sHron1.sten.arrPosit[5].set(0, -sHron1.sten.delph / 2+_off);

				} else {
					sHron1.sten.bolPosit1 = false;
					sHron1.sten.arrPosit1[0].set(0, -sHron1.sten.delph / 2+_off);
					sHron1.sten.arrPosit1[1].set(0, -sHron1.sten.delph / 2+_off);
					sHron1.sten.arrPosit1[2].set(0, _off);
					sHron1.sten.arrPosit1[3].set(0, _off);
					sHron1.sten.arrPosit1[4].set(0, sHron1.sten.delph / 2+_off);
					sHron1.sten.arrPosit1[5].set(0, sHron1.sten.delph / 2+_off);
				}
			} else if (sHron1.sten.tip == 1) {
				if (sHron1.storona == true) {
					sHron1.sten.bolPosit = true;
					sHron1.sten.arrPosit[0].setPoint(sHron1.sten.lineRange.p);
					sHron1.sten.arrPosit[1].setPoint(sHron1.sten.lineRange.p);
					sHron1.sten.arrPosit[2].setPoint(sHron1.sten.lineRange.p);
					sHron1.sten.arrPosit[3].setPoint(sHron1.sten.lineRange.p);
					sHron1.sten.arrPosit[4].setPoint(sHron1.sten.lineRange.p);
					sHron1.sten.arrPosit[5].setPoint(sHron1.sten.lineRange.p);
				} else {
					sHron1.sten.bolPosit1 = true;
					sHron1.sten.arrPosit1[0].setPoint(sHron1.sten.lineRange.p1);
					sHron1.sten.arrPosit1[1].setPoint(sHron1.sten.lineRange.p1);
					sHron1.sten.arrPosit1[2].setPoint(sHron1.sten.lineRange.p1);
					sHron1.sten.arrPosit1[3].setPoint(sHron1.sten.lineRange.p1);
					sHron1.sten.arrPosit1[4].setPoint(sHron1.sten.lineRange.p1);
					sHron1.sten.arrPosit1[5].setPoint(sHron1.sten.lineRange.p1);
				}
			} else {
				window.console.warn('непонял как считить  ', sHron1.sten.tip);
			}
		}

		if (kol > 1) {
			var num = 0;
			var num2 = 0;

			if (num1 == 0)num = aP.arrSHron.length - 1;
			else num = num1 - 1;// меньше угол

			if (num1 >= aP.arrSHron.length - 1)num2 = 0;	// больше угол
			else num2 = num1 + 1;
			sHron = aP.arrSHron[num];// основная
			sHron1 = aP.arrSHron[num1];// основная
			sHron2 = aP.arrSHron[num2];// основная

			sHron.sten.korectOffset()
			sHron1.sten.korectOffset()
			sHron2.sten.korectOffset()

			var nB = false;
			if (kol > 2) {
				sHron2 = aP.arrSHron[num];// основная
				sHron1 = aP.arrSHron[num1];// основная
				sHron = aP.arrSHron[num2];// основная
			} else {
				sHron = aP.arrSHron[num];// основная
				sHron1 = aP.arrSHron[num1];// основная
				sHron2 = aP.arrSHron[num2];// основная
			}

			lP = this.getLineStan2(sHron1, sHron, nB);
			nB = !nB;
			lP2 = this.getLineStan2(sHron1, sHron2, nB);
			this.creatGrani2(sHron1, lP, lP2);

			


			if(debug){
				/*debug.dLine(lP.p,lP.p1,0xff0000,22)
				debug.dLine(lP.p1,lP.p2,0xff5500,22)

				debug.dLine(lP2.p,lP2.p1,0x0000ff,22)
				debug.dLine(lP2.p1,lP2.p2,0x5500ff,22)*/
			}

			if (num1 == 0) {
				// return;
			}
		}

		for (var i = 0; i > aP.arrSHron.length; i++) {
			sHN=aP.arrSHron[i]
			sHN.sten.arrPosit[2].y=0;
			sHN.sten.arrPosit[3].y=0;
			sHN.sten.arrPosit1[2].y=0;
			sHN.sten.arrPosit1[3].y=0;

		}
	};

	this.getSten2AddPoint = function (sten, aP) {
		if (sten.addPoint != undefined) if (sten.addPoint.idArr == aP.idArr) if (sten.addPoint1 != undefined) return sten.addPoint1;
		if (sten.addPoint1 != undefined) if (sten.addPoint1.idArr == aP.idArr) if (sten.addPoint != undefined) return sten.addPoint;
		return null;
	};

	// ишем углы почти прямых стен
	var res3 = new THREE.Vector3(0, 0);
	this.testAngel = function (aP) {
		kol = aP.arrSHron.length;
		if (kol <= 1) return null;
		for (var i = 0; i < aP.arrSHron.length; i++) {

			for (var j = i + 1; j < aP.arrSHron.length; j++) {
				sHron = aP.arrSHron[i];
				sHron1 = aP.arrSHron[j];
				if (sHron.storona == false) { // напровляющия
					arrP[0].x = sHron.sten.position.x;
					arrP[0].y = sHron.sten.position.y;
					arrP[1].x = sHron.sten.position1.x;
					arrP[1].y = sHron.sten.position1.y;
				} else {
					arrP[0].x = sHron.sten.position1.x;
					arrP[0].y = sHron.sten.position1.y;
					arrP[1].x = sHron.sten.position.x;
					arrP[1].y = sHron.sten.position.y;
				}

				if (sHron1.storona == false) { // напровляющия
					arrP[2].x = sHron1.sten.position.x;
					arrP[2].y = sHron1.sten.position.y;
				} else {
					arrP[2].x = sHron1.sten.position1.x;
					arrP[2].y = sHron1.sten.position1.y;
				}
				angel = calc.getTreeAngel(arrP[0], arrP[1], arrP[2]);

				if (Math.abs(angel) > 3.0) { // рядом с прямым линией
					res3 = calc.isPointInLin(arrP[0], arrP[2], arrP[1], 5, 5);
					if (res3 != null) {
						return res3;
					}
				}
			}
		}
		return null;
	};

	var ob	
	this.getLineStan2 = function (sHron, sHron1, bool, offset, offset1) {
		bXZva.delph = sHron.sten.delph + (offset || 0);
		bXZva1.delph = sHron1.sten.delph + (offset1 || 0);
		bXZva.dis = calc.getDistance(sHron.sten.position, sHron.sten.position1);
		bXZva1.dis = calc.getDistance(sHron1.sten.position, sHron1.sten.position1);
		r = 5//aidPointStatic.angelOtstup;

		if (bXZva.delph / 2 + 1 > r)r = bXZva.delph + 1;
		if (bXZva1.delph / 2 + 1 > r)r = bXZva1.delph + 1;


		



		b1 = 1;
		if (bool == true)b1 = -1;
		if (sHron.sten.tip == 0) {
			if (sHron.storona == false) { // напровляющия
				arrP[0].x = arrP[0 + 2].x = arrP[0 + 4].x = sHron.sten.position.x;
				arrP[0].y = arrP[0 + 2].y = arrP[0 + 4].y = sHron.sten.position.y;
				arrP[1].x = arrP[1 + 2].x = arrP[1 + 4].x = sHron.sten.position1.x;
				arrP[1].y = arrP[1 + 2].y = arrP[1 + 4].y = sHron.sten.position1.y;
			} else {
				arrP[0].x = arrP[0 + 2].x = arrP[0 + 4].x = sHron.sten.position1.x;
				arrP[0].y = arrP[0 + 2].y = arrP[0 + 4].y = sHron.sten.position1.y;
				arrP[1].x = arrP[1 + 2].x = arrP[1 + 4].x = sHron.sten.position.x;
				arrP[1].y = arrP[1 + 2].y = arrP[1 + 4].y = sHron.sten.position.y;
			}

			calc.korektToLine(arrP[0], arrP[1], 0, -bXZva.delph / 2 * b1);
			
			bXZva.restertTip(0, arrP[0], arrP[1], arrP[2 + 1], sHron.sten);

			if(debug){
				if(sHron.sten.offset!=0){
					debug.clearD();
					bXZva.drawDebag(debug)
				}
				

			}
			
		} else if (sHron.sten.tip == 1) {
			if (bool == true) {
				if (sHron.storona == true) {
					if (sHron.sten.lineRange.curvature > 0) {
						bXZva.restertTip(1, sHron.sten.lineRange, -bXZva.delph / 2);
					} else {
						bXZva.restertTip(1, sHron.sten.lineRange, bXZva.delph / 2);
					}
				} else {
					if (sHron.sten.lineRange.curvature > 0) {
						bXZva.restertTip(1, sHron.sten.lineRange, bXZva.delph / 2, true);
					} else {
						bXZva.restertTip(1, sHron.sten.lineRange, -bXZva.delph / 2, true);
					}
				}
			} else {
				if (sHron.storona == true) {
					if (sHron.sten.lineRange.curvature > 0) {
						bXZva.restertTip(1, sHron.sten.lineRange, bXZva.delph / 2);
					} else {
						bXZva.restertTip(1, sHron.sten.lineRange, -bXZva.delph / 2);
					}
				} else {
					if (sHron.sten.lineRange.curvature > 0) {
						bXZva.restertTip(1, sHron.sten.lineRange, -bXZva.delph / 2, true);
					} else {
						bXZva.restertTip(1, sHron.sten.lineRange, bXZva.delph / 2, true);
					}
				}
			}
		} else {
			window.console.warn('непонял как считить  ', sHron.sten.tip);
		}


		if (sHron1.sten.tip == 0) {
			/// ////////////
			if (sHron1.storona == false) {
				arrP[0 + 6].x = arrP[0 + 8].x = arrP[0 + 10].x = sHron1.sten.position.x;
				arrP[0 + 6].y = arrP[0 + 8].y = arrP[0 + 10].y = sHron1.sten.position.y;
				arrP[1 + 6].x = arrP[1 + 8].x = arrP[1 + 10].x = sHron1.sten.position1.x;
				arrP[1 + 6].y = arrP[1 + 8].y = arrP[1 + 10].y = sHron1.sten.position1.y;
			} else {
				arrP[0 + 6].x = arrP[0 + 8].x = arrP[0 + 10].x = sHron1.sten.position1.x;
				arrP[0 + 6].y = arrP[0 + 8].y = arrP[0 + 10].y = sHron1.sten.position1.y;
				arrP[1 + 6].x = arrP[1 + 8].x = arrP[1 + 10].x = sHron1.sten.position.x;
				arrP[1 + 6].y = arrP[1 + 8].y = arrP[1 + 10].y = sHron1.sten.position.y;
			}
			calc.korektToLine(arrP[0 + 6], arrP[1 + 6], 0, bXZva1.delph / 2 * b1);
			

			if(debug){
				//debug.dLine(arrP[0 + 6],arrP[1 + 6],0x00ff00,22)
			}

			bXZva1.restertTip(0, arrP[0 + 6], arrP[1 + 6], arrP[1 + 2 + 6], sHron1.sten);
		} else if (sHron1.sten.tip == 1) {

			if (bool == true) {
				if (sHron1.storona == false) {
					if (sHron1.sten.lineRange.curvature > 0) {
						bXZva1.restertTip(1, sHron1.sten.lineRange, -bXZva1.delph / 2, true);
					} else {
						bXZva1.restertTip(1, sHron1.sten.lineRange, bXZva1.delph / 2, true);
					}
				} else {
					if (sHron1.sten.lineRange.curvature > 0) {
						bXZva1.restertTip(1, sHron1.sten.lineRange, bXZva1.delph / 2);
					} else {
						bXZva1.restertTip(1, sHron1.sten.lineRange, -bXZva1.delph / 2);
					}
				}
			} else {
				if (sHron1.storona == false) {
					if (sHron1.sten.lineRange.curvature > 0) {
						bXZva1.restertTip(1, sHron1.sten.lineRange, bXZva1.delph / 2, true);
					} else {
						bXZva1.restertTip(1, sHron1.sten.lineRange, -bXZva1.delph / 2, true);
					}
				} else {
					if (sHron1.sten.lineRange.curvature > 0) {
						bXZva1.restertTip(1, sHron1.sten.lineRange, -bXZva1.delph / 2);
					} else {
						bXZva1.restertTip(1, sHron1.sten.lineRange, bXZva1.delph / 2);
					}
				}
			}
		} else {
			window.console.warn('непонял как считить  ', sHron1.sten.tip);
		}

		lPRet = this.korektPoint.getPeresek(bXZva, bXZva1);




		return lPRet;
	};

}

export function LinePosition (_p, _p1) {
	this.p = _p || new Position();
	this.p1 = _p1 || new Position();
	this.p2 = new Position();
	this.status = 0;
	this.perpendik = true;
	this.angel = 0;
	this.set = function (_p, _p1) {
		this.p = _p || 0;
		this.p1 = _p1 || 0;
	};
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


/**
 * Описывает точку.
 * @class
 * @param [_x=0] {number} кордината
 * @param [_y=0] {number} кордината
 * @param [_z=0] {number} кордината
 */
export function PositionFun (_x, _y, _z, _fun) {
	/** {number} кордината */
	this._x = _x || 0;
	/** {number} кордината */
	this._y = _y || 0;
	/** {number} кордината */
	this._z = typeof _z !== 'function' ? (_z || 0) : 0;

	this.fun = typeof _z === 'function' ? _z : _fun;

	this.set = function (_x, _y, _z) {
		this._x = _x || 0;
		this._y = _y || 0;
		this._z = _z || 0;
		if (this.fun) this.fun();

	};
	this.setPoint = function (p) {
		this._x = p.x;
		this._y = p.y;
		this._z = p.z;
		if (this.fun) this.fun();
	};

	this.getObj = function () {
		var o = {};
		o.x = this._x;
		o.y = this._y;
		o.z = this._z;
		return o;
	};

	this.copy = function () {
		return new PositionFun(this._x, this._y, this._z);
	};
}
PositionFun.prototype = {
	set x (v) {
		// if(this._x==v)return;
		this._x = v;
		if (this.fun) this.fun();
	},
	get x () {
		return this._x;
	},

	set y (v) {
		// if(this._y==v)return;
		this._y = v;
		if (this.fun) this.fun();
	},
	get y () {
		return this._y;
	},
	set z (v) {
		// if(this._z==v)return;
		this._z = v;
		if (this.fun) this.fun();
	},
	get z () {
		return this._z;
	}
};
