

/**
* Утилита для линий
* @class
*/
export function SpUtility () {
	var self = this;
	this.type = 'SpUtility';

	var arr = [];
	var arrSp = [];

	/**
	* Нахождение всех присойдененых линий.
    * @param {Splice} _splice - линия для которой нужно найти все присойдененые.
    * @return {Array<Splice>} присойдененые линии.
	*/
	this.connectLines = function (_splice) {
		arr.length = 0;
		arrSp.length = 0;
		arr = this.tune(_splice);

		for (var i = 0; i < arr.length; i++) {
			arrSp[i] = _splice.stage.arrSplice[arr[i]];
		}

		return arrSp;
	};


	var arrUseId = [];// по которым уже прошли
	var arrUseTestId = [];// по кторым нужно пробежатся
	var arrTempId; // массив id связаных линий с проверочной
	// возвращает массив линий соедененных между собой

	this.tune = function (_splice) {
		arrSplice = _splice.stage.arrSplice;

		arrUseId.length = 0;
		arrUseTestId.length = 0;

		arrUseId.push(_splice.idArr);

		arrTempId = uncleSplices(_splice);

		for (var i = 0; i < arrTempId.length; i++) {
			arrUseTestId.push(arrTempId[i]);
		}


		for (var i = 0; i < arrUseTestId.length; i++) {
			if (inArr(arrUseId, arrUseTestId[i]) == true) {
				arrUseId.push(arrUseTestId[i]);
				arrTempId = uncleSplices(arrSplice[arrUseTestId[i]]);
				for (var j = 0; j < arrTempId.length; j++) {
					arrUseTestId.push(arrTempId[j]);
				}
			}
		}

		return arrUseId;
	};

	function inArr (arr, a) {
		for (var j = 0; j < arr.length; j++) {
			if (arr[j] == a) {
				return false;
			}
		}
		return true;
	}


	var arrUncle;
	// возвращает id линий присоедененных к _splice
	function uncleSplices (_splice) {
		arrUncle = [];
		if (_splice._addPoint) {
			for (var i = 0; i < _splice._addPoint.arrSHron.length; i++) {
				if (_splice.idArr != _splice._addPoint.arrSHron[i].sten.idArr) {
					arrUncle.push(_splice._addPoint.arrSHron[i].sten.idArr);
				}
			}
		}

		if (_splice._addPoint1) {
			for (var i = 0; i < _splice._addPoint1.arrSHron.length; i++) {
				if (_splice.idArr != _splice._addPoint1.arrSHron[i].sten.idArr) {
					arrUncle.push(_splice._addPoint1.arrSHron[i].sten.idArr);
				}
			}
		}
		return arrUncle;
	}

}
