// -----------------------------------------------------------------------------------------------
// -----------------------------------------------------------------------------------------------
import { CollisionUtil } from './CollisionUtil.js';
import { CollLine} from './CollLine.js';

export  function CollisionDetection (par ) {
	this.par=par
	var self = this;
	this.collUtil = new CollisionUtil();
	this.collLine = new CollLine(this);
	this.activBox = {}; // активный бокс
	this.arrBox = []; // все боксы(мир)
	this.collisionBox = []; // боксы которые пересекаются
	this._isCollisionAvtive = false; // пересекается ли активный бокс
	this.dragBox; // таскалка
	this.disStick = 15; // дистанция прилипания/stick
	this.bigBox = {x: 0, y: 0, width: 100, height: 100}; // большой бокс
	this.tempBox = {x: 0, y: 0, width: 100, height: 100};
	this.isStick = false; // прилипать ли краями к краям?

	this.hideBox = []; // скрытые боксы (линии)
	this.offsetHideBox = 0; // отступ скрытых боксы (линий)
	this.arrPointX = []; // масив значений х, вертикали
	this.arrPointY = []; // масив значений у, горизонтали

	this.fun = null; // в updateWorld
	this.funErr = null; //
	var isCorrect = true;
	this.activ = true;
	var bool
	this.stopDrawDebug
	// коректируем позицию
	// b - true таскалки боксов(dragBox) , b - false активного бокса(activBox)
	this.correct = function (b) {
		
		if (!this.activ) return true;
		
		isCorrect = true;

		this.checkArrPoint();
		if (this.isStick) this.stick();// прилипалка
		// console.clear()
		/*bool=this.collLine.dragActiv();//пересечение на линии
		if(bool){
			this.activBox.y=this.collLine.sRect.y
			
		}*/
		bool=true
		if (this.bigBox) this.checkBigBox(); // если есть большая коробка проверяем и позиционируем с ней

		// this.activBox.coliziStop = this.getBox(100,70,150,150);
		this.moveBoxFromCollStop();
		
		this.collisionBox = this.getCollisionBox(this.activBox, this.arrBox, this.activBox);
		
		if ( this.collisionBox.length == 0) { // пересечений нет
			this._isCollisionAvtive = false;
			if (!this.isInBigBox(this.activBox)) {
				if (this.funErr) this.funErr(this.activBox);

				isCorrect = false;
			}

			/*if(this.collLine.dragActiv()){
				this.activBox.y=this.collLine.sRect.y
				isCorrect = false;
				return false;
			}else{
				
			}*/
			bool=false
			//return isCorrect;
		} else {
			this._isCollisionAvtive = true;
		}
		if(bool){	
			var pos = []; // возможные позиции
			
			this.findPosition1(pos);
			this.removePositFromHard(pos);
			
			if (pos.length == 0) {
				this.findPosition2(pos);
				// this.removePositFromHard(pos);
			}

			
			if (pos.length == 0) {
				if (this.funErr) this.funErr(this.activBox);
				isCorrect = false;
			}
		
			// ищем ближайщую позицию из возможных
			var res = this.collUtil.findMinPosition(pos, this.activBox); // ищем ближайщую позицию к activBox

			if (b) {
				this.dragBox.x = res.x;
				this.dragBox.y = res.y;
			} else {
				this.activBox.x = res.x;
				this.activBox.y = res.y;
			}
		}

/**/
		this.collLine.dragActiv();//пересечение на линии
		if(this.collLine.dragActiv()==true){
			if(window["facade"]!=undefined){
				if(facade.boolLoad == false){
					//trace("  @@@@!!!!!!!!!!!!!!!! "+this.activBox.y," ",this.bigBox.width)
					return false;
				}
			}
			
			/*if(this.collLine.startPoisk(this.activBox)==true){
				trace(this.activBox.x+"  @@@@!!!!!!!!!!!!!!!! "+this.activBox.y," ",this.bigBox.width)
				trace("@@@HH ",this.collLine.boxHH.b)
				trace("@@@WW ",this.collLine.boxWW.b)
				trace("@@@PP ",this.collLine.boxPP.x)

				
				return false;
			}*/
			//
			
			
		}else{
			this.activBox.x=this.collLine.boxPP.x
			this.activBox.y=this.collLine.boxPP.y
			
			
		}



		/**/
		//this.activBox.y=this.collLine.sRect.y
		
		
		return isCorrect;
		// if (!this.isInBigBox(this.activBox)) if (this.activBox.funErr) this.activBox.funErr();
		// console.clear()

		// if(this.isStick) this.stick();// прилипалка

	};

	this.getCollStop = function (isx, isFirst) {
		
		if (this.activBox.coliziStop) {
			if (isx) {
				if (isFirst) {
					return this.activBox.coliziStop.x;
				} else {
					return this.activBox.coliziStop.x + this.activBox.coliziStop.width;
				}
			} else {
				if (isFirst) {
					return this.activBox.coliziStop.y;
				} else {
					// проверка соответствия правельных параметров стопера по высоте
					var h = Math.max(this.activBox.coliziStop.height, this.activBox.height);
					if (this.activBox.coliziStop.height == 0) h = 0;
					return this.activBox.coliziStop.y + h;
				}
			}
		}

		return false;
	};

	this.moveBoxFromCollStop = function () {
		var x = this.getCollStop(true, true);
		if (x === false) return;
		var x1 = this.getCollStop(true, false);
		var y = this.getCollStop(false, true);
		var y1 = this.getCollStop(false, false);

		if (this.activBox.x + this.activBox.width > x1) {
			this.activBox.x = x1 - this.activBox.width;
		}
		if (this.activBox.x < x) {
			this.activBox.x = x;
		}
		if (this.activBox.y + this.activBox.height > y1) {
			this.activBox.y = y1 - this.activBox.height;
		}
		if (this.activBox.y < y) {
			this.activBox.y = y;
		}
	};

	// прилипать краями к краям
	this.stick = function () {
		this.collUtil.stickBox(this.activBox, this.arrBox, this.disStick);
	};

	// позиционируем бокс с миром если он в позиции большой коробки
	this.redactBox = function (box) {
		
		this.activBox = box;
		this.arrBox.push(box);
	
		var isCorrect = this.correct();
	
		this.arrBox.pop();
		// this.removeBoxInArr(this.arrBox, box);
		this.activBox = null;
		
		return isCorrect;
	};

	// удаляем позиции если они не соответствуют жестким позициям
	this.removePositFromHard = function (pos) {
		var x = this.getCollStop(true, true);
		if (x === false) return;
		var x1 = this.getCollStop(true, false);
		var y = this.getCollStop(false, true);
		var y1 = this.getCollStop(false, false);
		for (var i = 0; i < pos.length; i++) {
			if (pos[i] && okrugNumber(pos[i].y) < okrugNumber(y)) {
				pos.splice(i--, 1);
			} else if (pos[i] && okrugNumber(pos[i].y) > okrugNumber(y1)) {
				pos.splice(i--, 1);
			}
			if (pos[i] && okrugNumber(pos[i].x) < okrugNumber(x)) {
				pos.splice(i--, 1);
			} else if (pos[i] && okrugNumber(pos[i].x) > okrugNumber(x1)) {
				pos.splice(i--, 1);
			}

			if (Math.abs(Math.abs(y1) - Math.abs(y)) > 0) { // если активный бокс не привязан жестко к высоте тоесть coliziStop.height > 0
				if (pos[i] && pos[i].y + pos[i].height > y1) {
					pos.splice(i--, 1);
				}
			}
		}
	};
	function okrugNumber (p, num) {
		num = num || 100;
		return Math.round(p / num) * num;
	}
	// ищем позиции вторым способом ( слева права низ верх поиском в глубину)
	this.findPosition2 = function (pos) {
		var postemp = [];
		for (var i = 0; i < this.collisionBox.length; i++) {
			this.seeArrBox = [];
			this.findLevel = 0;
			postemp = this.freePosition(this.activBox, this.collisionBox[i], this.arrBox);
			for (var j = 0; j < postemp.length; j++) {
				pos.push(postemp[j]);
			}
		}
	};

	// ищем позиции первым способом ( вокруг активного бокса   )
	this.findPosition1 = function (pos) {
		var b = {};
		b.x = this.activBox.x;
		b.y = this.activBox.y;
		b.width = this.activBox.width;
		b.height = this.activBox.height;
		b.offset = 0;
		if (this.activBox.offset)b.offset = this.activBox.offset;

		for (var i = 0; i < this.collisionBox.length; i++) {
			var a = this.getAngleBox(b, this.collisionBox[i]);
			// console.clear()
			this.moveBoxFromCollBox(b, this.collisionBox[i], a);
			if (this.isInBigBox(b, 2)) { // если коробка внутри
				if (this.getCollisionBox(b, this.arrBox, this.activBox).length == 0) { // если колизий нету добавляем в возможные позиции
					pos.push(b);
				}
			}
		}


	};

	// двигаем бокс смотря какой угол
	this.moveBoxFromCollBox = function (box, boxCol, angle) {
		var c1 = {};//
		var c = {};//
		c.x = boxCol.x + boxCol.width / 2;
		c.y = boxCol.y + boxCol.height / 2;
		c1.x = boxCol.x - (boxCol.offset || 0);
		c1.y = boxCol.y - (boxCol.offset || 0);
		var a1 = this.getAngle(c, c1);// -135
		c1.x = boxCol.x + boxCol.width + (boxCol.offset || 0);
		c1.y = boxCol.y + boxCol.height + (boxCol.offset || 0);
		var a2 = this.getAngle(c, c1);// 45
		c1.x = boxCol.x + boxCol.width + (boxCol.offset || 0);
		c1.y = boxCol.y - (boxCol.offset || 0);
		var a3 = this.getAngle(c, c1);// -45
		c1.x = boxCol.x - (boxCol.offset || 0);
		c1.y = boxCol.y + boxCol.height + (boxCol.offset || 0);
		var a4 = this.getAngle(c, c1);// 135

		if (angle >= a3 && angle < a2) { // left
			box.x = (boxCol.x - box.width) - (box.offset || 0) - (boxCol.offset || 0); // (boxCol.x-(boxCol.offset||0)) - (box.width+(box.offset||0));
		}
		if (angle >= a2 && angle < a4) { // top
			box.y = (boxCol.y - box.height) - (box.offset || 0) - (boxCol.offset || 0);
		}
		if (angle >= a1 && angle < a3) { // bottom
			box.y = (boxCol.y + boxCol.height) + (box.offset || 0) + (boxCol.offset || 0);
		}
		if (angle >= a4 || angle < a1) { // right
			box.x = (boxCol.x + boxCol.width) + (box.offset || 0) + (boxCol.offset || 0);
		}


	};

	// достать угол между (центрами )боксами
	this.getAngleBox = function (box, box2) {
		var c1 = {};// box центр
		var c2 = {};// box2 центр
		c1.x = box.x + box.width / 2;
		c1.y = box.y + box.height / 2;
		c2.x = box2.x + box2.width / 2;
		c2.y = box2.y + box2.height / 2;
		return this.getAngle(c1, c2);
	};

	this.maxLevel = 1;
	this.findLevel = 0;
	this.seeArrBox = [];
	// свободные позиции поиском в глубину(по колизиям)
	// box - для нее ищем позиции
	// boxCol - вокруг этой коробки
	// arrBox - при поиске учитывать коробки
	this.freePosition = function (box, boxCol, arrBox) {
		this.findLevel++;

		this.seeArrBox.push(boxCol);
		var arrPosit = this.getPositionBox(box, boxCol); // возможные позиции коробки
		var freePos = []; // свободные позиции коробки
		var arrBoxCol = [];
		var tempCol = [];
		for (var i = 0; i < arrPosit.length; i++) {
			if (this.isInBigBox(arrPosit[i], 2)) { // если коробка внутри

				tempCol = this.getCollisionBox(arrPosit[i], arrBox, box);
				if (tempCol.length == 0) { // колизий нету добавляем позицию
					freePos.push(arrPosit[i]);
					// continue;
				}

				for (var j = 0; j < tempCol.length; j++) {
					if (arrBoxCol.indexOf(tempCol[j]) < 0) {
						arrBoxCol.push(tempCol[j]);
					}
				}
			}
		}

		if (this.activBox.coliziStop) {
			this.removePositFromHard(freePos);
		}

		if (freePos.length == 0) {
			if (this.findLevel > this.maxLevel) {
				// this.findLevel=0;
				return freePos;
			}

			for (var i = 0; i < arrBoxCol.length; i++) {
				if (this.equalsBox(this.seeArrBox, arrBoxCol[i])) continue;// если смотрели коробку , пропускаем
				var temp = this.freePosition(box, arrBoxCol[i], arrBox);
				for (var j = 0; j < temp.length; j++) {
					if (freePos.indexOf(temp[j]) < 0) {
						freePos.push(temp[j]);
					}
				}
			}

		}
		// this.findLevel=0;
		this.findLevel--;
		return freePos;
	};

	// взять позиции вокруг boxCol
	this.getPositionBox = function (box, boxCol) {

		return [
			// left
			this.getBox((boxCol.x - box.width) - (box.offset || 0) - (boxCol.offset || 0),
				box.y,
				box.width, box.height, box.offset, box.offset, box.offset, box.offset),
			// right
			this.getBox((boxCol.x + boxCol.width) + (box.offset || 0) + (boxCol.offset || 0),
				box.y,
				box.width, box.height, box.offset, box.offset, box.offset, box.offset),
			// top
			this.getBox(box.x,
				(boxCol.y - box.height) - (box.offset || 0) - (boxCol.offset || 0),
				box.width, box.height, box.offset, box.offset, box.offset, box.offset),
			// bottom
			this.getBox(box.x,
				(boxCol.y + boxCol.height) + (box.offset || 0) + (boxCol.offset || 0),
				box.width, box.height, box.offset, box.offset, box.offset, box.offset),
			// left-top
			this.getBox((boxCol.x - box.width) - (box.offset || 0) - (boxCol.offset || 0),
				(boxCol.y - box.height) - (box.offset || 0) - (boxCol.offset || 0),
				box.width, box.height, box.offset, box.offset, box.offset, box.offset),
			// right-top
			this.getBox((boxCol.x + boxCol.width) + (box.offset || 0) + (boxCol.offset || 0),
				(boxCol.y - box.height) - (box.offset || 0) - (boxCol.offset || 0),
				box.width, box.height, box.offset, box.offset, box.offset, box.offset),
			// right-bottom
			this.getBox((boxCol.x + boxCol.width) + (box.offset || 0) + (boxCol.offset || 0),
				(boxCol.y + boxCol.height) + (box.offset || 0) + (boxCol.offset || 0),
				box.width, box.height, box.offset, box.offset, box.offset, box.offset),
			// left-bottom
			this.getBox((boxCol.x - box.width) - (box.offset || 0) - (boxCol.offset || 0),
				(boxCol.y + boxCol.height) + (box.offset || 0) + (boxCol.offset || 0),
				box.width, box.height, box.offset, box.offset, box.offset, box.offset)
		];
	};

	this.getBox = function (x, y, width, height, offset) {
		return {
			x: x || 0,
			y: y || 0,
			width: width || 0,
			height: height || 0,
			offset: offset || 0,
			offset: offset || 0,
			offset: offset || 0,
			offset: offset || 0
		};
	};

	this.upData = function () {
		if (this.activBox == null) return;

		this.collisionBox = this.getCollisionBox(this.activBox, this.arrBox, this.activBox);
		if (this.collisionBox.length > 0) {
			this._isCollisionAvtive = true;
		} else {
			this._isCollisionAvtive = false;
		}
	};

	this.updateWorld = function () {
		var bool = false;
		for (var i = 0; i < this.arrBox.length; i++) {
			this.activBox = this.arrBox[i];
			bool = this.correct();
			if (!bool && this.fun) {
				this.fun(i);
			}
		}
	};

	// достаем пересеченые боксы
	// не учитываем скрытые бокты и ofsetBox
	this.getCollisionBox = function (box, arrBox, ofsetBox) {
		if (arrBox == undefined)arrBox = this.arrBox;
		var collisionBox = [];
		if (!box) return collisionBox;
		var b;
		for (var i = 0; i < arrBox.length; i++) {
			b = arrBox[i];
			if (box == b || ofsetBox == b) continue;
			if (this.offsetBox && this.offsetBox == b) continue;
			if (b.visible != undefined) {
				if (b.visible == false) {
					continue;
				}
			}
			if (this.collUtil.isCollisionRectangle(
				box.x - (box.offset || 0), box.y - (box.offset || 0),
				box.width + (box.offset || 0) + (box.offset || 0), box.height + (box.offset || 0) + (box.offset || 0),
				b.x - (b.offset || 0), b.y - (b.offset || 0),
				b.width + (b.offset || 0) + (b.offset || 0), b.height + (b.offset || 0) + (b.offset || 0))) {
				collisionBox.push(b);
			}
		}

		// ----
		for (var i = 0; i < this.hideBox.length; i++) {
			b = this.hideBox[i];
			if (box == b || ofsetBox == b) continue;
			if (this.offsetBox && this.offsetBox == b) continue;
			if (b.visible != undefined) {
				if (b.visible == false) {
					continue;
				}
			}
			if (this.collUtil.isCollisionRectangle(
				box.x - (box.offset || 0), box.y - (box.offset || 0),
				box.width + (box.offset || 0) + (box.offset || 0), box.height + (box.offset || 0) + (box.offset || 0),
				b.x - (b.offset || 0), b.y - (b.offset || 0),
				b.width + (b.offset || 0) + (b.offset || 0), b.height + (b.offset || 0) + (b.offset || 0))) {
				collisionBox.push(b);
			}
		}

		return collisionBox;
	};

	// добавление скрытых боксов из масива point x y
	this.checkArrPoint = function () {
		// this.hideBox = [];
		// for (var i = 0; i < this.arrPointX.length; i++) {
		//     this.hideBox.push(this.getBox(this.arrPointX[i], this.bigBox.y, 1, this.bigBox.height, this.offsetHideBox||0));
		// }
		// for (var i = 0; i < this.arrPointY.length; i++) {
		//     this.hideBox.push(this.getBox(this.bigBox.x, this.arrPointY[i], this.bigBox.width, 1, this.offsetHideBox||0));
		// }
	};

	// очистка точек вертикалей , горизонталей
	this.clearArrPoint = function () {
		this.arrPointX = [];
		this.arrPointY = [];
		this.hideBox = [];
	};

	// проверка с большой коробкой
	this.checkBigBox = function () {
		// проверяем колизии с большым боксом
		var arr = [];// коробки которые в нутри большой коробки
		// console.clear();
		for (var i = 0; i < this.arrBox.length; i++) {
			// лежит в коробке
			if (this.isInBigBox(this.arrBox[i])) {


			} else { // не лежит в большой коробке , проверяем пересечения что б потом поместить во внутрь
				// в колизии с большой коробкой
				if (this.isCollisionBigBox(this.arrBox[i])) {
					if (this.arrBox[i].x - (this.arrBox[i].offset || 0) < this.bigBox.x) {
						this.arrBox[i].x = this.bigBox.x + (this.arrBox[i].offset || 0);
					}
					if (this.arrBox[i].y - (this.arrBox[i].offset || 0) < this.bigBox.y) {
						this.arrBox[i].y = this.bigBox.y + (this.arrBox[i].offset || 0);
					}
					if (this.arrBox[i].x + this.arrBox[i].width + (this.arrBox[i].offset || 0) > this.bigBox.x + this.bigBox.width) {
						this.arrBox[i].x = this.bigBox.x + this.bigBox.width - (this.arrBox[i].width + (this.arrBox[i].offset || 0));
					}
					if (this.arrBox[i].y + this.arrBox[i].height + (this.arrBox[i].offset || 0) > this.bigBox.y + this.bigBox.height) {
						this.arrBox[i].y = this.bigBox.y + this.bigBox.height - (this.arrBox[i].height + (this.arrBox[i].offset || 0));
					}

					// if (this.fun) {
					//     // this.fun(i);
					// }

				} else { // коробка далеко и не прикасается к большой коробке
					if (this.activBox && this.activBox == this.arrBox[i]) {

						// if (this.fun) {
						//     this.fun(i);
						// }
					}
				}

			}
		}
	};
	// лежит в большой коробке
	this.isInBigBox = function (box, see) {

		if (!box) return true;

		return this.bigBox ? (this.collUtil.isPutIn(this.bigBox.x, this.bigBox.y, this.bigBox.width, this.bigBox.height,
			box.x - (box.offset || 0) + (see || 0), box.y - (box.offset || 0) + (see || 0), box.width + (box.offset || 0) + (box.offset || 0) - (see || 0), box.height + (box.offset || 0) + (box.offset || 0) - (see || 0))) : true;
	};
	// в колизии с большой коробке
	this.isCollisionBigBox = function (box) {
		if (!box) return false;
		return this.bigBox ? (this.collUtil.isCollisionRectangle(this.bigBox.x, this.bigBox.y, this.bigBox.width, this.bigBox.height,
			box.x - (box.offset || 0), box.y - (box.offset || 0), box.width + (box.offset || 0) + (box.offset || 0), box.height + (box.offset || 0) + (box.offset || 0))) : false;
	};

	this.equalsBox = function (arr, box) {
		for (var i = 0; i < arr.length; i++) {
			if (arr[i].x == box.x && arr[i].y == box.y && arr[i].width == box.width && arr[i].height == box.height) {
				return true;
			}
		}
		return false;
	};

	// Получение угла между двумя точками градусы
	this.getAngle = function (a, b) {
		return 180 * Math.atan2(b.y - a.y, b.x - a.x) / (Math.PI);
	};


	this.correctShahY = function (rect) {

	};


	this.offsetRect = 0;
	// растагиваем рект за края
	// rect - ( x, y, width, heigth)
	// curs     1_|_2
	//          4¯|¯3
	// jumpy - кратность(прыжок) по высоте и y
	this.checkRect = function (rect, curs, jumpy) {
		var addedOffset = false;
		var dis = 0;
		var res = 0;
		var startPoint = {};
		var angel = 0;
		var old = self.getBox(rect.x, rect.y, rect.width, rect.height);
		if (rect.offset == undefined) {
			addedOffset = true;
			rect.offset = this.offsetRect || 0;// добавили отступ , в низу удалим
		}
		curs = parseInt(curs);
		switch (curs) {
			case 0 : {
				var ac = this.activBox;
				this.offsetBox = ac;
				this.activBox = rect;
				this.arrBox.push(rect);
				this.correct();
				this.arrBox.pop();
				this.activBox = ac;
				this.offsetBox = false;
				break;
			}
			case 1: { // верх лево
				startPoint = {x: rect.x + rect.width, y: rect.y + rect.height};
				res = this.findAllBoxVect(startPoint, curs, rect);
				if (res.y !== false) {
					if (rect.y <= res.y) {
						dis = Math.abs(rect.y - res.y);
						rect.y = res.y;
						rect.height -= Math.abs(dis);
					}
				}

				if (res.x !== false) {
					if (rect.x <= res.x) {
						dis = Math.abs(rect.x - res.x);
						rect.x = res.x;
						rect.width -= Math.abs(dis);
					}
				}
				break;
			}
			case 2: { // вверх право
				startPoint = {x: rect.x, y: rect.y + rect.height};
				res = this.findAllBoxVect(startPoint, curs, rect);
				if (res.y !== false && !isNaN(res.y)) {
					if (rect.y <= res.y) {
						dis = Math.abs(rect.y - res.y);
						rect.y = res.y;
						rect.height -= Math.abs(dis);
					}
				}

				if (res.x !== false && !isNaN(res.x)) {
					if (rect.x + rect.width >= res.x) {
						dis = Math.abs(rect.x + rect.width - res.x);
						rect.width -= Math.abs(dis);
					}
				}
				break;
			}
			case 3: { // низ право
				startPoint = {x: rect.x, y: rect.y };
				res = this.findAllBoxVect(startPoint, curs, rect);

				if (res.y !== false && !isNaN(res.y)) {
					if (rect.y + rect.height >= res.y) {
						dis = Math.abs(rect.y + rect.height - res.y);
						rect.height -= Math.abs(dis);
					}
				}

				if (res.x !== false) {
					if (rect.x + rect.width >= res.x) {
						dis = Math.abs(rect.x + rect.width - res.x);
						rect.width -= Math.abs(dis);
					}
				}
				break;
			}
			case 4: { // низ лево
				startPoint = {x: rect.x + rect.width, y: rect.y };
				res = this.findAllBoxVect(startPoint, curs, rect);

				if (res.y !== false && !isNaN(res.y)) {
					if (rect.y + rect.height >= res.y) {
						dis = Math.abs(rect.y + rect.height - res.y);
						rect.height -= Math.abs(dis);
					}
				}

				if (res.x !== false && !isNaN(res.x)) {
					if (rect.x <= res.x) {
						dis = Math.abs(rect.x - res.x);
						rect.x = res.x;
						rect.width -= Math.abs(dis);
					}
				}
				break;
			}
			default : console.warn('curs не определен', curs);
		}

		if (jumpy) {
			var d = (rect.y + jumpy) % jumpy;
			rect.y = rect.y - d;
			if (curs > 0) {
				rect.height = rect.height - ((-d) || (rect.height + jumpy) % jumpy);
			}
		}

		if (addedOffset) {
			delete rect.offset;// удаляем отступ
		}

		return parseInt(rect.x) === parseInt(old.x) /* && parseInt(old.y) === parseInt(rect.y) */ && parseInt(rect.width) === parseInt(old.width);
	};


	// p - стартовая точка
	// curs - направление
	this.findAllBoxVect = function (p, curs, rect) {
		var arrBoxLuch = [];
		var arrX = [];
		var arrY = [];
		// находим боксы которые попадают в диапазон просмотра по направление curs
		for (var i = 0; i < this.arrBox.length; i++) {
			if (this.arrBox[i] == this.activBox) continue;
			if (this.checkBoxCurs(p.x, p.y, this.arrBox[i], curs)) {
				arrBoxLuch.push(this.arrBox[i]);
			}
		}

		// определяем куда относятся боксы к x или y
		this.sortBoxXY(arrX, arrY, arrBoxLuch, curs, rect);

		arrX.sort(function (b1, b2) { // сортируем по x
			return self.sortBoxCursor(b1, b2, curs, true);
		});
		arrY.sort(function (b1, b2) { // сортируем по y
			return self.sortBoxCursor(b1, b2, curs, false);
		});

		var res = {x: 0, y: 0};

		switch (curs) {
			case 1: { // верх лево
				if (arrX[0]) {
					res.x = arrX[0].x + arrX[0].width + (arrX[0].offset || 0) + (rect.offset || 0);
				} else {
					res.x = self.bigBox.x + (rect.offset || 0);
					var sx = this.getCollStop(true, true);
					if (sx != false) {
						res.x = sx;
					}
				}

				if (arrY[0]) {
					res.y = arrY[0].y + arrY[0].height + (arrY[0].offset || 0) + (rect.offset || 0);
				} else {
					res.y = self.bigBox.y + (rect.offset || 0);
				}

				return res;
			}
			case 2: { // верх право

				if (arrX[0]) {
					res.x = arrX[0].x - (arrX[0].offset || 0) - (rect.offset || 0);
				} else {
					res.x = self.bigBox.x + self.bigBox.width - (rect.offset || 0);
					var sx = this.getCollStop(true, false);
					if (sx != false) {
						res.x = sx;
					}
				}

				if (arrY[0]) {
					res.y = arrY[0].y + arrY[0].height + (arrY[0].offset || 0) + (rect.offset || 0);
				} else {
					res.y = self.bigBox.y + (rect.offset || 0);
				}

				return res;
			}
			case 3: { // низ право

				if (arrX[0]) {
					res.x = arrX[0].x - (arrX[0].offset || 0) - (rect.offset || 0);
				} else {
					res.x = self.bigBox.x + self.bigBox.width - (rect.offset || 0);
					var sx = this.getCollStop(true, false);
					if (sx != false) {
						res.x = sx;
					}
				}

				if (arrY[0]) {
					res.y = arrY[0].y - (arrY[0].offset || 0) - (rect.offset || 0);
				} else {
					res.y = self.bigBox.y + self.bigBox.height - (rect.offset || 0);
				}

				return res;

			}
			case 4: { // низ лево

				if (arrX[0]) {
					res.x = arrX[0].x + arrX[0].width + (arrX[0].offset || 0) + (rect.offset || 0);
				} else {
					res.x = self.bigBox.x + (rect.offset || 0);
					var sx = this.getCollStop(true, true);
					if (sx != false) {
						res.x = sx;
					}
				}

				if (arrY[0]) {
					res.y = arrY[0].y - (arrY[0].offset || 0) - (rect.offset || 0);
				} else {
					res.y = self.bigBox.y + self.bigBox.height - (rect.offset || 0);
				}

				return res;
			}
		}

	};

	// определяем куда относятся боксы к x или y
	this.sortBoxXY = function (arrX, arrY, arrBoxLuch, curs, rect) {
		var ax = 0;
		var ay = 0;
		for (var i = 0; i < arrBoxLuch.length; i++) {
			if (curs == 1) {
				if (rect.x + rect.width + (rect.offset || 0) <= arrBoxLuch[i].x + arrBoxLuch[i].width + (arrBoxLuch[i].offset || 0)) {
					ax = 1;
					ay = 0;
				} else if (rect.y + rect.height + (rect.offset || 0) <= (arrBoxLuch[i].y + arrBoxLuch[i].height + (arrBoxLuch[i].offset || 0))) {
					ax = 0;
					ay = 1;
				} else {
					ay = (rect.x - (rect.offset || 0)) - (arrBoxLuch[i].x + arrBoxLuch[i].width + (arrBoxLuch[i].offset || 0));
					ax = (rect.y - (rect.offset || 0)) - (arrBoxLuch[i].y + arrBoxLuch[i].height + (arrBoxLuch[i].offset || 0));
				}
			}
			if (curs == 2) {
				if (rect.x - (rect.offset || 0) >= arrBoxLuch[i].x - (arrBoxLuch[i].offset || 0)) {
					ax = 1;
					ay = 0;
				} else if (rect.y + rect.height + (rect.offset || 0) <= (arrBoxLuch[i].y + arrBoxLuch[i].height + (arrBoxLuch[i].offset || 0))) {
					ax = 0;
					ay = 1;
				} else {
					ax = (rect.x + rect.width + (rect.offset || 0)) - (arrBoxLuch[i].x - (arrBoxLuch[i].offset || 0));
					ay = (arrBoxLuch[i].y + arrBoxLuch[i].height + ((arrBoxLuch[i].offset || 0)) - (rect.y - (rect.offset || 0)));
				}
			}
			if (curs == 3) {
				if (rect.x - (rect.offset || 0) >= arrBoxLuch[i].x - (arrBoxLuch[i].offset || 0)) {
					ax = 1;
					ay = 0;
				} else if (rect.y - (rect.offset || 0) >= arrBoxLuch[i].y - (arrBoxLuch[i].offset || 0)) {
					ax = 0;
					ay = 1;
				} else {
					ax = (rect.x + rect.width + (rect.offset || 0)) - arrBoxLuch[i].x - (arrBoxLuch[i].offset || 0);
					ay = (rect.y + rect.height + (rect.offset || 0)) - arrBoxLuch[i].y - (arrBoxLuch[i].offset || 0);
				}
			}
			if (curs == 4) {
				if (rect.x + rect.width + (rect.offset || 0) <= arrBoxLuch[i].x + arrBoxLuch[i].width + (arrBoxLuch[i].offset || 0)) {
					ax = 1;
					ay = 0;
				} else if (rect.y - (rect.offset || 0) >= arrBoxLuch[i].y - (arrBoxLuch[i].offset || 0)) {
					ax = 0;
					ay = 1;
				} else {
					ax = (arrBoxLuch[i].x + arrBoxLuch[i].width + (arrBoxLuch[i].offset || 0)) - (rect.x - (rect.offset || 0));
					ay = (rect.y + rect.height + (rect.offset || 0)) - arrBoxLuch[i].y - (arrBoxLuch[i].offset || 0);
				}
			}

			if (ax < ay) {
				arrX.push(arrBoxLuch[i]);
			} else {
				arrY.push(arrBoxLuch[i]);
			}
		}


	};

	// определяем кто ближе из b1, b2 по направлению curs,
	// isx - смотрим по x
	this.sortBoxCursor = function (b1, b2, curs, isx) {
		switch (curs) {
			case 1: { // верх лево
				if (isx) {
					if (b1.x + b1.width + (b1.offset || 0) > b2.x + b2.width + (b2.offset || 0)) return -1;
					if (b1.x + b1.width + (b1.offset || 0) < b2.x + b2.width + (b2.offset || 0)) return 1;
					return 0;
				} else {
					if (b1.y + b1.height + (b1.offset || 0) > b2.y + b2.height + (b2.offset || 0)) return -1;
					if (b1.y + b1.height + (b1.offset || 0) < b2.y + b2.height + (b2.offset || 0)) return 1;
					return 0;
				}
			}
			case 2: { // вверх право
				if (isx) {
					if (b1.x - (b1.offset || 0) < b2.x - (b2.offset || 0)) return -1;
					if (b1.x - (b1.offset || 0) > b2.x - (b2.offset || 0)) return 1;
					return 0;
				} else {
					if (b1.y + b1.height + (b1.offset || 0) > b2.y + b2.height + (b2.offset || 0)) return -1;
					if (b1.y + b1.height + (b1.offset || 0) < b2.y + b2.height + (b2.offset || 0)) return 1;
					return 0;
				}
			}
			case 3: { // низ право
				if (isx) {
					if (b1.x - (b1.offset || 0) < b2.x - (b2.offset || 0)) return -1;
					if (b1.x - (b1.offset || 0) > b2.x - (b2.offset || 0)) return 1;
					return 0;
				} else {
					if (b1.y - (b1.offset || 0) < b2.y - (b2.offset || 0)) return -1;
					if (b1.y - (b1.offset || 0) > b2.y - (b2.offset || 0)) return 1;
					return 0;
				}
			}
			case 4: { // низ лево
				if (isx) {
					if (b1.x + b1.width + (b1.offset || 0) > b2.x + b2.width + (b2.offset || 0)) return -1;
					if (b1.x + b1.width + (b1.offset || 0) < b2.x + b2.width + (b2.offset || 0)) return 1;
					return 0;
				} else {
					if (b1.y - (b1.offset || 0) < b2.y - (b2.offset || 0)) return -1;
					if (b1.y - (b1.offset || 0) > b2.y - (b2.offset || 0)) return 1;
					return 0;
				}
			}
		}
	};

	// попадает ли бокс в диапазон
	this.checkBoxCurs = function (x, y, b, curs) {
		switch (curs) {
			case 1: { // верх лево
				if (b.x >= x) return false;// далеко с права
				if (b.y >= y - 1) return false;// с низу далеко
				return true;
			}
			case 2: { // вверх право
				if (b.x + b.width <= x) return false;// с лева далеко
				if (b.y >= y) return false;// с низу далеко
				return true;
			}
			case 3: { // низ право
				if (b.x + b.width <= x) return false;// с лева далеко
				if (b.y + b.height <= y) return false;// далеко с верху
				return true;
			}
			case 4: { // низ лево
				if (b.x >= x) return false;// далеко с права
				if (b.y + b.height <= y) return false;// далеко с верху
				return true;
			}
		}
	};

	this.getRey = function (p,p1) {
		return this.collLine.getRey(p,p1)
	}

}

CollisionDetection.prototype = {

	set isCollisionAvtive (v) {
		this._isCollisionAvtive = v;
	},

	get isCollisionAvtive () {
		this.upData();
		return this._isCollisionAvtive;
	}


};
