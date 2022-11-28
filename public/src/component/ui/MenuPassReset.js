/*
Логин изере меню

*/

export class MenuPassReset {
	constructor(par, fun) {
		this.type = "MenuPassReset";
		this.fun = fun
		this.par = par
		
		var self = this;
		this.param = par.param;
		this.dCont = new DCont();
		this.pan = undefined;

		this._active = false;
		this.win;

		this._activeNot=true

		this.emailLabel;
		this.emailInput;
		this.sendButton;
		this.components = [];

		this.init = function () {
			if (this.pan != undefined) return
			this.pan = new DPanel(this.dCont, 0, 0);
			this.pan.alpha = 0.5

			if (dcmParam.mobile == false) {
				this.pan.div.addEventListener("mousedown", function () {
					if(self._activeNot==false)return
					self.active = false
				});
			} else {
				this.pan.div.addEventListener("touchend", function () {
					if(self._activeNot==false)return
					self.active = false
				});
			}

			var otstup = this.param.otstup;

			this.win = new DPanel(this.dCont, 100, 100)
			this.win.content.y = 32;
			this.win.borderRadius=this.param.borderRadius;			
        	this.win.glowColor=this.param.glowColor;
        	this.win.glowSah=this.param.glowSah;
			this.win.width = this.param.sizeBase2 
			this.win.boolLine=false;

			this.winCloseBtn = new DButton(this.win, 2, 2, "", function () {
				self.active = false
			})

			mhbd.getKeyId("group1", 19, function (e) {
				self.winCloseBtn.link = e.icon;
			})
			this.winCloseBtn.width = this.winCloseBtn.height = 32 - 4
			this.winCloseBtn.x = this.win.width - this.winCloseBtn.width - 2
			this.winCloseBtn.boolFond = false;

			this.winCloseBtn.visible=this._activeNot

			this.emailLabel = new DLabel(this.win.content, 0, 0, "email:")
			this.emailLabel.activMouse = false
			this.emailLabel.fontSize = this.fsLitel
			this.emailInput = new DInput(this.win.content, 0, 0, "", function () {
			});
			this.emailInput.funEnter = function () {
				this.sendEmailCallback
			}
			this.emailInput.timeFun = 1

			this.errorLabel = new DLabel(this.win.content, 0, 0, "");
			this.errorLabel.color = "#ff0000";
			this.errorLabel.activMouse = false;

			this.sendButton = new DButton(this.win.content, 0, 0, "Отправить", this.sendEmailCallback);

			this.components = [
				this.errorLabel,
				this.emailLabel,
				this.emailInput,
				this.sendButton,
			];

			this.components.forEach(component => {
				component.width = this.param.sizeBase2 - this.param.otstup * 2;
			});

			this.sizeWindow();
		}

		this.redrawComponents = function() {
			var xx = this.param.otstup;
			var yy = this.param.otstup;

			this.components.forEach(component => {
				component.x = xx;
				component.y = yy;
				if (component.getRect && typeof(component.getRect) == "function") {
					yy += component.getRect().height + this.param.otstup
				} else {
					yy += component.height + this.param.otstup;
				}
			});
			this.win.height = yy + this.win.content.y;
		};

		this.sendEmailCallback = function () {
			if (!self.emailInput.value) {
				self.setErrorToLabel("Укажите адрес электронной почты!")
				return;
			}
			
			$.ajax({
				url: "/api/v1/password_reset/",
				method: "POST",
				data: JSON.stringify({
					email: self.emailInput.value
				}),
				contentType: "application/json; charset=utf-8",
				success: function (response) {
					alert("Письмо для восстановления было отправлено на почту.")
				},
				error:function (response) {
					console.error(response.responseJSON)
					self.setErrorToLabel(JSON.stringify(response.responseJSON));
				}
			});
		};

		this.setErrorToLabel = function(gotError) {
			this.errorLabel.value = gotError;
			this.redrawComponents();
		};

		var w, h, s;
		this.sizeWindow = function (_w, _h, _s) {
			if (_w) {
				w = _w;
				h = _h;
				s = _s;
			}
			if (this.pan == undefined) {
				return;
			}
			this.pan.width = w / s;
			this.pan.height = h / s;
			this.win.x = (w / s - this.win.width) / 2;
			this.win.y = (h / s - this.win.height) / 2;
			this.redrawComponents();
		}
	}

	set activeNot(_val) {
		if (_val == this._activeNot) return;
		this._activeNot = _val;

		if(this.winCloseBtn)this.winCloseBtn.visible=this._activeNot
	};

	get activeNot() {
		return this._activeNot;
	}

	set active(_val) {
		if (_val == this._active) return;
		this._active = _val;

		if (this._active) {
			this.par.dCont.add(this.dCont)
		} else {
			this.par.dCont.remove(this.dCont)
		}
		this.init()
	};

	get active() {
		return this._active;
	}
}
