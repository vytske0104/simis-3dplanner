
function DataChangeSp () {
	this.arrNewSplice = [];
	this.arrDividedSplice = [];
	this.arrClearSplice = [];

	this.clear = function () {
		this.arrNewSplice = [];
		this.arrDividedSplice = [];
		this.arrClearSplice = [];
	};

	this.add = function (dcs) {
		this.arrNewSplice = this.arrNewSplice.concat(dcs.arrNewSplice);
		this.arrDividedSplice = this.arrDividedSplice.concat(dcs.arrDividedSplice);
		this.arrClearSplice = this.arrClearSplice.concat(dcs.arrClearSplice);
		this.update();
	};

	this.update = function () {
		var i;
		var ind;
		for (i = 0; i < this.arrNewSplice.length; i++) {
			ind = this.arrClearSplice.indexOf(this.arrNewSplice[i]);
			if (ind !== -1) {
				this.arrClearSplice.splice(ind, 1);
			}
		}
		for (i = 0; i < this.arrNewSplice.length; i++) {
			ind = this.arrDividedSplice.indexOf(this.arrNewSplice[i]);
			if (ind !== -1) {
				this.arrDividedSplice.splice(ind, 1);
			}
		}
		for (i = 0; i < this.arrNewSplice.length; i++) {
			if (!this.arrNewSplice[i].life) {
				this.arrNewSplice.splice(i--, 1);
			}
		}
		for (i = 0; i < this.arrDividedSplice.length; i++) {
			if (!this.arrDividedSplice[i].life) {
				this.arrDividedSplice.splice(i--, 1);
			}
		}
	};

}
