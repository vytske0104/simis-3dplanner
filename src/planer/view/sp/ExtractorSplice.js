/** @module planer/sp */
/**
* Вырыватель {Splice} линий
* @constructor
*/
function ExtractorSplice () {
	var self = this;
	var arrPoint;


	/**
	* Разорвать линии и сойденить разрывы
	* @param {Array<Splice>} _arrSplice линии которые нужно разделить
	* @return {Array<Splice>} новые линии которые создались(сойденение разрывов)
	*/
	this.extractArrSpliceAndConect = function (_arrSplice) { //
		if (!_arrSplice[0]) return;// нечего рвать

		arrPoint = self.extractArrSplice(_arrSplice);

		var arrNewSplice = [];
		var delphNewSplice = 20;

		for (var i = 0; i < arrPoint.length - 1; i += 2) {
			var oldPoint = arrPoint[i];
			var newPoint = arrPoint[i + 1];

			delphNewSplice = oldPoint.arrSHron[0].sten.delph;

			var sten = getNewSplice();
			sten.delph = delphNewSplice;
			arrNewSplice.push(sten);
			oldPoint.addSplice(sten, false);
			newPoint.addSplice(sten, true);
			newPoint.dragVokrug();
		}

		return arrNewSplice;
	};

	/**
	* Разорвать линии
	* @param {Array<Splice>} _arrSplice линии которые нужно разделить
	* @return {Array<SpPoint>} возвращаем масив точек которы разделили [старая точка, новая точка, старая точка, новая точка, ...]
	*/
	this.extractArrSplice = function (_arrSplice) { // вырвать стены
		if (!_arrSplice[0]) return;// нечего рвать
		// берем функции создания точки и линии от той сцены где находится линия
		getNewPoint = _arrSplice[0].stage.craetPoint.bind(_arrSplice[0].stage);
		getNewSplice = _arrSplice[0].stage.craetSplice.bind(_arrSplice[0].stage);

		var arrSplice = _arrSplice;		// стены которые нужно вырвать
		var arrPointToCheck = getArrPointToCheck(arrSplice);	// точки которые нужно разделение

		var arrDataExtract = [];
		for (var i = 0; i < arrPointToCheck.length; i++) {
			arrDataExtract[i] = getArrDataExtractSplice(arrPointToCheck[i], arrSplice);
		}

		executeExtract(arrDataExtract);

		var arrPointResult = [];
		for (var indexArrData = 0; indexArrData < arrDataExtract.length; indexArrData++) {
			for (var indexData = 0; indexData < arrDataExtract[indexArrData].length; indexData++) {
				var des = arrDataExtract[indexArrData][indexData];
				if (!isFindPair(des.oldPoint, des.newPoint, arrPointResult)) {
					arrPointResult.push(des.oldPoint, des.newPoint);
				}
			}
		}
		return arrPointResult;
	};


	/**
	* Разорвать и соеденить линии разных сцен(миров)
	* @param {{}} o - o[typeStage].arrSplice = []  обект из масисов линий которые нужно разделить
	* @return {Array<Splice>} новые линии которые создались(сойденение разрывов)
	*/
	this.extractObjArrSpliceAndConect = function (o) {
		var arrNewSplice = [];
		for (var i in o) {
			if (o[i].arrSplice.length == 0) continue;
			arrNewSplice = arrNewSplice.concat(self.extractArrSpliceAndConect(o[i].arrSplice));
		}
		return arrNewSplice;
	};


	function isFindPair (_old, _new, arr) {
		for (var i = 0; i < arr.length - 1; i += 2) {
			if (_old.idArr == arr[i].idArr && _new.idArr == arr[i + 1].idArr) {
				return true;
			}
		}
		return false;
	}


	function executeExtract (arrDataExtract) {

		for (var indexArrData = 0; indexArrData < arrDataExtract.length; indexArrData++) {
			var newPoint = getNewPoint();
			for (var indexData = 0; indexData < arrDataExtract[indexArrData].length; indexData++) {
				var des = arrDataExtract[indexArrData][indexData];
				des.newPoint = newPoint;
				newPoint.position.set(des.oldPoint.position.x, des.oldPoint.position.y);

				des.oldPoint.removeSplice(des.sten);
				newPoint.addSplice(des.sten, des.storona);
			}
		}

	}


	function getArrDataExtractSplice (aidPoint, arrSplice) {
		var resData = [];
		for (var i = 0; i < arrSplice.length; i++) {
			var shron = getSHron(arrSplice[i].idArr, aidPoint);
			if (shron) {
				var des = new DataExtractSplice();
				des.sten = shron.sten;
				des.storona = shron.storona;
				des.oldPoint = aidPoint;
				resData.push(des);
			}
		}
		return resData;
	}

	function getSHron (idSplice, aidPoint) {
		for (var i = 0; i < aidPoint.arrSHron.length; i++) {
			if (aidPoint.arrSHron[i].sten.idArr == idSplice) {
				return aidPoint.arrSHron[i];
			}
		}
		return null;
	}

	var getNewPoint = function () {
		return sFloor.arrFloor[0].aidArr.craetPoint();
	};
	var getNewSplice = function () {
		return sFloor.arrFloor[0].craetSplice();
	};

	function isFreeAidPoint (aidPoint, arrSplice) { // свободна ли точка (нужно ли точку разделять)
		if (!aidPoint || !arrSplice) return;
		var arrSplicePoint = [];
		for (var i = 0; i < aidPoint.arrSHron.length; i++) {
			arrSplicePoint.push(aidPoint.arrSHron[i].sten);
		}

		var index = -1;
		for (var i = 0; i < arrSplice.length; i++) {
			index = arrSplicePoint.indexOf(arrSplice[i]);
			if (index !== -1) {
				arrSplicePoint.splice(index, 1);
			}
		}
		return arrSplicePoint.length === 0 && aidPoint.arrPol.length === 0;
	}

	function getArrPointToCheck (arrSplice) { // достать точки которые нужно проверить на разделение
		var res = [];
		var isAddedPoint;
		for (var i = 0; i < arrSplice.length; i++) {

			isAddedPoint = ((res.indexOf(arrSplice[i]._addPoint) === -1) && (!isFreeAidPoint(arrSplice[i]._addPoint, arrSplice)));
			if (isAddedPoint) {
				res.push(arrSplice[i]._addPoint);
			}

			isAddedPoint = ((res.indexOf(arrSplice[i]._addPoint1) === -1) && (!isFreeAidPoint(arrSplice[i]._addPoint1, arrSplice)));
			if (isAddedPoint) {
				res.push(arrSplice[i]._addPoint1);
			}
		}
		return res;
	}


	function DataExtractSplice () {
		this.sten = null;
		this.storona = null;
		this.oldPoint = null;
		this.newPoint = null;
	}
}
