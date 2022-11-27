


/**
* Базовый клас для точек
* @class
*/
export function SpPol (_stage) {
	var self = this;
	this.type = 'SpPol';
	this.tipe = 'SpPol';
	this.stage = _stage;
	this.par = _stage;
	this._life = true;
	this.idArr=-1;
	

	this._uuid = calc.generateUUID();

	this.array=[]
	this.arrayClass=[]

	var kol = 0;
	var sHron;


	var p;

	this.addPoint = function (point, sah) { // @	
		var p=this.array.length
		if(sah!=undefined){
			if(sah<p){
				p=sah
			}
		}
		
		this.array.splice(p, 0, point);	

		point.addPol(this)		
		this.drag();

		this.stage.render()

	};


	this.removePoint = function (point) {
		var r=0
		
		for (var i = 0; i < this.array.length; i++) {
			if (this.array[i].idArr == point.idArr) {
				p = i;				
				this.array.splice(i, 1);
				point.removePol(this);	
				r++
			}
		}		
		if(r!=0){
			this.drag();
			this.testKill();
		}	
		this.stage.render();
		return r;
	};

	this.drag = function () {


	};

	this.clear = function () {
		
		for (var i = this.array.length-1; i >=0 ; i--) {
			if(this.array[i])this.array[i].removePol(this);
		}		
		this.life=false
		this.stage.render()
	};


	this.testKill = function () {
		if(this.array.length<=2){
			this.clear()
			
		}
	};

	function _setAllParam (nameParam, value) {
		//console.warn(nameParam, value,self.arrayClass)
		for (var ii = 0; ii < self.arrayClass.length; ii++) {			
			if (nameParam in self.arrayClass[ii]) self.arrayClass[ii][nameParam] = value;
		}
	}

	this._setAllParam = _setAllParam;
}

SpPol.prototype = {
	set uuid (v) {
		if (this._uuid === v) return;		
	},
	get uuid () {
		return this._uuid;
	},
	getObj: function () {
		var o = {};
		o.array=[] 
		for (var i = 0; i < this.array.length; i++) {
			o.array.push({
				x:this.array[i].position.x,
				y:this.array[i].position.y,
				z:this.array[i].position.z,
				tipe:this.array[i].tipe,
				uuid:this.array[i].uuid
			})			
		}
		/*o.type = this.type;
		o.idArr = this.idArr;
		o.position = this.position.getObj();*/
		return o;
	},
	setObj: function (o) {
		
		for (var i = 0; i < o.array.length; i++) {			
			var p=this.stage.getPointXY(o.array[i]);
			this.addPoint(p);
		}
		this.drag();
	},


	set life (v) {
		if (this._life == v) return;
		this._life = v;
	},
	get life () {
		return this._life;
	}

};
