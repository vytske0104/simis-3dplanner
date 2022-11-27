function DataLineSp () {
	this.type = 'DataLineSp';
	var self = this;

	this.stage = new SpStage();

	this.getLineData = function (_arrPoint, _depth) {
		this.stage.clear();
		var arrLine = [];
		var point = this.stage.craetPoint();

		for (var i = 0; i < _arrPoint.length - 1; i++) {
			var splice = this.stage.craetSplice();
			splice.delph = _depth;
			var line = this.getLine();

			point.position.x = _arrPoint[i].x;
			point.position.y = _arrPoint[i].y;
			point.addSplice(splice, true);
			point.dragVokrug();
			point.drag();

			point = this.stage.craetPoint();
			point.position.x = _arrPoint[i + 1].x;
			point.position.y = _arrPoint[i + 1].y;
			point.addSplice(splice, false);
			point.dragVokrug();
			point.drag();

			line.splice = splice;
			arrLine.push(line);
		}

		for (var i = 0; i < arrLine.length; i++) {
			this.updateLine(arrLine[i]);
		}

		return arrLine;
	};

	this.getLine = function () {
		return new Line();
	};

	this.updateLine = function (line) {
		var array = this.getArrPoint(line.splice);
		if (line.splice.bolPosit) {
			line.lineSide.arrPoint[0].set(array[1].x, array[1].y);
		} else {
			line.lineSide.arrPoint[0].set(array[0].x, array[0].y);
		}
		line.lineSide.arrPoint[1].set(array[2].x, array[2].y);
		line.lineSide.arrPoint[2].set(array[2].x, array[2].y);

		line.lineSide.arrPoint1[0].set(array[2].x, array[2].y);
		line.lineSide.arrPoint1[1].set(array[3].x, array[3].y);

		line.lineSide.arrPoint2[0].set(array[3].x, array[3].y);
		line.lineSide.arrPoint2[1].set(array[3].x, array[3].y);

		if (line.splice.bolPosit1) {
			line.lineSide.arrPoint2[2].set(array[4].x, array[4].y);
		} else {
			line.lineSide.arrPoint2[2].set(array[5].x, array[5].y);
		}

		if (line.splice.bolPosit) {
			line.lineSide1.arrPoint[0].set(array[7].x, array[7].y);
		} else {
			line.lineSide1.arrPoint[0].set(array[6].x, array[6].y);
		}
		line.lineSide1.arrPoint[1].set(array[8].x, array[8].y);
		line.lineSide1.arrPoint[2].set(array[8].x, array[8].y);

		line.lineSide1.arrPoint1[0].set(array[8].x, array[8].y);
		line.lineSide1.arrPoint1[1].set(array[9].x, array[9].y);

		line.lineSide1.arrPoint2[0].set(array[9].x, array[9].y);
		line.lineSide1.arrPoint2[1].set(array[9].x, array[9].y);

		if (line.splice.bolPosit1) {
			line.lineSide1.arrPoint2[2].set(array[10].x, array[10].y);
		} else {
			line.lineSide1.arrPoint2[2].set(array[11].x, array[11].y);
		}

		line.updateProject();

		return line;
	};

	var p = new Position();
	this.getArrPoint = function (_splice) {
		var array = [];// TODO FIXED
		var arr = _splice.arrPosit;// набор точек для отрисовки левого края стены [
		var arr1 = _splice.arrPosit1;// набор точек для отрисовки правого края стены ]

		p.set(-arr[2].x, arr[2].y);
		array.push(p.copy());

		p.set(-arr[1].x, arr[1].y);
		array.push(p.copy());

		p.set(-arr[0].x, arr[0].y);
		array.push(p.copy());

		p.set(arr1[5].x + _splice._distans, arr1[5].y);
		array.push(p.copy());

		p.set(arr1[4].x + _splice._distans, arr1[4].y);
		array.push(p.copy());

		p.set(arr1[3].x + _splice._distans, arr1[3].y);
		array.push(p.copy());

		p.set(-arr[3].x, arr[3].y);
		array.push(p.copy());

		p.set(-arr[4].x, arr[4].y);
		array.push(p.copy());

		p.set(-arr[5].x, arr[5].y);
		array.push(p.copy());

		p.set(arr1[0].x + _splice._distans, arr1[0].y);
		array.push(p.copy());

		p.set(arr1[1].x + _splice._distans, arr1[1].y);
		array.push(p.copy());

		p.set(arr1[2].x + _splice._distans, arr1[2].y);
		array.push(p.copy());

		return array;
	};
}

function LineSide () {
	this.arrPoint = [new Position(), new Position(), new Position()];// начало угол
	this.arrPoint1 = [new Position(), new Position()];// средина
	this.arrPoint2 = [new Position(), new Position(), new Position()];// конец угол
}

function Line () {
	this.lineSide = new LineSide();// одна сторона
	this.lineSide1 = new LineSide();// вторая сторона
}

Line.prototype.updateProject = function () {
	var ots = Math.max(this.lineSide.arrPoint[2].x, this.lineSide1.arrPoint[2].x);
	this.lineSide.arrPoint[2].x = ots;
	this.lineSide1.arrPoint[2].x = ots;
	this.lineSide.arrPoint1[0].x = ots;
	this.lineSide1.arrPoint1[0].x = ots;
	var ots1 = Math.min(this.lineSide1.arrPoint2[0].x, this.lineSide.arrPoint2[0].x);
	this.lineSide.arrPoint2[0].x = ots1;
	this.lineSide1.arrPoint2[0].x = ots1;
	this.lineSide.arrPoint1[1].x = ots1;
	this.lineSide1.arrPoint1[1].x = ots1;

};