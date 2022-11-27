/*
Логин изере меню

*/

//import { SocialButtons } from "./SocialButtons.js";

export class MenuLogin {
	constructor(par, fun) {
		this.type = "MenuLogin";
		this.fun = fun
		this.par = par
		
		var self = this;
		this.param = par.param;
		this.dCont = new DCont();
		this.pan = undefined;

		this._active = false;
		this.win;

		this.errLbl;
		this.passLbl;
		this.passInput;
		this.emailLbl;
		this.emailInput;
		this.loginBtn;

		this.registerLabel;
		this.registerButton;

		this.resetPassLabel;
		this.resetPassButton;

		this.fsLitel=10
		this.arrDbgLbl = [];
		this.formCompArr = [];

		this._activeNot=true;

		this.init = function (token) {
			if (this.pan != undefined) return
			this.pan = new DPanel(this.dCont, 0, 0);
			this.pan.alpha = 0.5;

			if (dcmParam.mobile == false) {
				this.pan.div.addEventListener("mousedown", function () {
					trace(self._activeNot)
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
			this.win.content.y=32
			this.win.borderRadius=this.param.borderRadius;			
        	this.win.glowColor=this.param.glowColor;
        	this.win.glowSah=this.param.glowSah;
			this.win.width = this.param.sizeBase2 
			this.win.boolLine=false;

			this.ll= new DLabel(this.win,0,this.param.otstup*2,"Вход")
			this.ll.activMouse=false
			this.ll.textAlign="center"
			this.ll.bold=true
			this.pp = new DPanel(this.win,this.param.otstup,31)
			this.pp.boolLine=false;
			this.pp.width=this.win.width-this.param.otstup*2
			this.ll.width=this.win.width-this.param.otstup*2
			this.pp.height=1
			this.pp.color=dcmParam._colorText1

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

			this.emailLbl = new DLabel(this.win.content, 0, 0, "емеил:")
			this.emailLbl.activMouse = false
			this.emailLbl.fontSize = this.fsLitel
			this.emailInput = new DInput(this.win.content, 0, 0, "", function () {
				self.errLbl.visible = false;
				self.dragInputs()
			});
			this.emailInput.funEnter = function () {
				loginCallback()
			}
			this.emailInput.timeFun = 1

			this.passLbl = new DLabel(this.win.content, 0, 0, "пароль:")
			this.passLbl.activMouse = false
			this.passLbl.fontSize = this.fsLitel
			this.passInput = new DInput(this.win.content, 0, 0, "", function () {
				self.errLbl.visible = false;
				self.dragInputs()
			});
			this.passInput.funEnter = function () {
				loginCallback()
			}
			this.passInput.timeFun = 1
			this.passInput.object.setAttribute("type", "password")

			this.buttonEye = new DCheckBox(this.win.content, 0, 0, " ", function () {
                if(self.passInput.object.type == "password") self.passInput.object.setAttribute("type", "text")
                else self.passInput.object.setAttribute("type", "password")
            });

            this.buttonEye.width = this.passInput.height
            this.buttonEye.height = this.passInput.height

            mhbd.getKeyId("group1", 280, function (e) {
                self.buttonEye.link0 = e.icon
            })

            mhbd.getKeyId("group1", 279, function (e) {
                self.buttonEye.link1 = e.icon
            })

			this.errLbl = new DLabel(this.win.content, 0, 0, "")
			this.errLbl.visible = false;
			this.errLbl.color = "#ff0000";

			this.loginBtn = new DButton(this.win.content, 0, 0, "ВОЙТИ", loginCallback);

			this.registerLabel = new DLabel(this.win.content, 0, 0, "Нет аккаунта?");
			this.registerLabel.fontSize = this.fsLitel;
			this.registerLabel.textAlign="right"

			this.registerButton = new DButton(this.win.content, 0, 0, "Регистрация", function () {
				self.fun("registration");
			});
			this.registerButton.height = this.param.otMy;

			this.resetPassLabel = new DLabel(this.win.content, 0, 0, "Забыли пароль?");
			this.resetPassLabel.fontSize = this.fsLitel;
			this.resetPassButton = new DButton(this.win.content, 0, 0, "Восстановить", function () {
				self.fun("toReset");
			});
			this.resetPassButton.height = this.param.otMy;

			this.resetPassButton.color = this.param.colorFont;
			this.resetPassButton.label.bold = true;
			this.resetPassButton.label.color = this.param.color;
			this.resetPassButton.label.fontSize = this.fsLitel;

			this.mXZ = new MXZ(this.win.content, this, function () {
				
			});

			this.panelOr1 = new DPanel(this.win.content, 0, 0);
			this.panelOr1.boolLine = false;	
			this.panelOr1.height = 1;
			this.panelOr1.width -= this.param.otstup;
			this.panelOr1.color=dcmParam._colorText1

			this.orLabel = new DLabel(this.win.content, 0, 0, "или");
			this.orLabel.fontSize = 10;

			this.panelOr2 = new DPanel(this.win.content, 0, 0);
			this.panelOr2.boolLine = false;
			this.panelOr2.color = dcmParam._colorText1;
			this.panelOr2.height = 1;
			this.panelOr2.width -= this.param.otstup;

			/*this.socialButtons = new SocialButtons(this, this.win.content, function (s) {
				var url = new URL(window.location.href)

				var link = url.protocol + "//" + url.host + "/social_auth/login/";

				// if (s == "facebook") {
					// link += "facebook/?next=" + url.pathname;
				// 	window.location.href = link;
				// }

				if (s == "google") {
					link += "google-oauth2/?next=" + url.pathname;
					window.location.href = link;
				}

				else if (s == "vk") {
					link += "/vk-oauth2/?next=" + url.pathname;
					window.location.href = link;
				}
			})*/

			this.formCompArr = [
				this.emailLbl,
				this.emailInput,
				this.passLbl,
				this.passInput,
				this.errLbl,
				this.loginBtn,
				//this.socialButtons,
			];

			for (var i = 0; i < self.formCompArr.length; i++) {
				self.formCompArr[i].width = (this.win.width - this.param.otstup * 2);
				self.formCompArr[i].x = this.param.otstup
			}

			this.passInput.width = (this.win.width - this.param.otstup * 2) - this.buttonEye.width
            this.buttonEye.x = this.passInput.x + this.passInput.width

			this.registerButton.color = this.param.colorFont;
			this.registerButton.label.fontSize = this.fsLitel;
			this.registerButton.label.bold = true;
			this.registerButton.label.color = this.param.color;

			this.dragInputs();
			this.sizeWindow();

			if (this.param.debug) {
				var ww = this.win.width + 10
				var p = new DPanel(self.win.content, ww, 0)
				p.width = 333
				p.height = 53

				/*new DLabel(self.win.content, ww, 0, "root@host.com||1234-глявний").width = 533
				new DLabel(self.win.content, ww, 20, "user1@gmail.com||user1-неопределеный").width = 533
				new DLabel(self.win.content, ww, 40, "user2@gmail.com||user2-строитель").width = 533
				new DLabel(self.win.content, ww, 60, "user3@gmail.com||user3-пользователь").width = 533*/
				new DLabel(self.win.content, ww, 0, "user4@gmail.com||user4-прогер ").width = 533
			
				/*new DLabel(self.win.content, ww, 100, "user5@gmail.com||user5-продовец ").width = 533
				new DLabel(self.win.content, ww, 120, "vorodis2@gmail.com||1qazxsw2 xz ").width = 533
				new DLabel(self.win.content, ww, 140, "alphakplan@gmail.com  || 12345&asd ").width = 533*/
			}
		}

		var loginCallback = function () {
			self.manualLogin(self.emailInput.value, self.passInput.value);
		};

		this.manualLogin = function(_gotEmail, _gotPasswd) {
			self.getTokenNN(
				_gotEmail,
				_gotPasswd,
				function (p, p1) { // funOk
					self.par.location.setToken(p);
					self.active = false;
				},
				function (p, p1) { // funErr
					//if (p1 == "authError") {
						self.processAuthError(p);
						self.dragInputs();
					//}
				}
			);
		};

		//выход из токена
		this.manualLogOut = function(_gotToken, fun, funErr) {
			var o = {}
			o.url = this.param.server + "auth/token/logout/";
	       	o.type = "POST";
	      	o.headers = { "Authorization": "Token " + _gotToken}
	        o.success = fun;
			o.error = funErr;
	        $.ajax(o);
		}

		//подстройка контента
    	this.dragInputs = function () {
			var yy = self.param.otstup;
			var otstup = this.param.otstup;

			var yy = otstup;
			this.emailLbl.y = yy
			yy += this.emailLbl.fontSize + otstup

			this.emailInput.y = yy
			yy += this.emailInput.height + otstup

			this.passLbl.y = yy
			yy += this.passLbl.fontSize + otstup
			this.passInput.y = this.buttonEye.y = yy
			yy += this.passInput.height + otstup

			if (this.errLbl.visible == true) {
				this.errLbl.y = yy
				yy += this.errLbl.getRect().height + otstup
			}
			this.loginBtn.y = yy;
			yy += this.loginBtn.height + otstup * 2;

			var windFreeSpace = this.win.width - this.param.otstup * 2;

			this.registerButton.width=this.param.wb;
			this.registerButton.x=this.param.sizeBase2-this.param.wb-this.param.otstup;

			this.registerLabel.x = 0;
			this.registerLabel.y = yy + otstup;
			this.registerLabel.width = this.registerButton.x-this.param.otstup;
		
			this.registerButton.y = yy;
			yy += this.registerButton.height + this.param.otstup;

			this.resetPassLabel.y = yy + this.param.otstup;
			this.resetPassLabel.x = this.param.otstup;

			this.resetPassButton.width = this.registerButton.width;

			this.resetPassButton.y = yy;
			this.resetPassButton.x = this.param.sizeBase2-this.param.wb-this.param.otstup;

			yy += this.resetPassButton.height + this.param.otstup;

			this.panelOr1.x = this.param.otstup;
			this.panelOr1.y = Math.round(yy + this.orLabel.getRect().height / 2);
			this.orLabel.x = this.panelOr1.x + this.panelOr1.width + this.param.otstup * 3;
			this.orLabel.y = yy;
			this.panelOr2.x = this.win.width - this.panelOr2.width - this.param.otstup;
			this.panelOr2.y = Math.round(yy + this.orLabel.getRect().height / 2);

			yy += this.orLabel.getRect().height;

			//this.socialButtons.y = yy;
			//yy += this.socialButtons.height;

			this.mXZ.dCont.y=yy;
			yy += this.mXZ.height + otstup*2;
			self.win.height = yy + 32;
		};

		this.processAuthError = function (gotErr) {
			this.errLbl.text = ""
			this.errLbl.visible = true;
			for (const key in gotErr) {
				if (Object.hasOwnProperty.call(gotErr, key)) {
					this.errLbl.text += key + ":" + gotErr[key];
				}
			}
		};


		//получения токена
		this.getTokenNN = function (_gotEmail, _gotPasswd, fun, fE) {
			var o = {}
			o.url = self.param.server + "auth/token/login/";
	       	o.type = "POST";
	       	o.data = JSON.stringify({ "email": _gotEmail, "password": _gotPasswd });
	      	o.headers = { "Content-Type": "application/json" };

	        o.success = function (response) {
	          	fun(response.auth_token, "xz");
	        };
	    	o.error = function (response) {
	          	fE(response.responseJSON.non_field_errors, "authError");
	        };
	        $.ajax(o);
	    }


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


export class MXZ {
	constructor(cont, par, fun) {
		this.type = "MXZ";
		this.fun = fun
		this.par = par
		
		var self = this;
		this.param = par.param;
		this.dCont = new DCont(cont);
	

		this.height=44;


		this.panel = new DPanel(this.dCont, this.param.otstup, this.param.otstup);
		this.panel.width=this.par.win.width-this.param.otstup*2;
		this.panel.height=this.height;
		this.panel.boolLine=this.param.debug;
		
		this.dC=new DCont();
		this.dC.x=this.param.otstup;
		this.dC.y=this.param.otstup;
		this.panel.add(this.dC);


		var s='<div style="color: '+dcmParam._colorText1+'; font-family: Montserrat; font-size: 10px; ">При входе вы подтверждаете согласие с ';
		s+='<a style="color: '+dcmParam._color+'; text-decoration: none;" href="https://kaleidoplan.ru/terms/">условиями использования Калейдоплан</a>'
		s+=' и '
		s+='<a style="color: '+dcmParam._color+'; text-decoration: none;" href="https://kaleidoplan.ru/user-data-policy/">политикой о данных пользователей</a>' 

		s+='</div>'
		this.dC.div.innerHTML = s;
		this.dC.div.style.width = Math.round(this.panel.width-this.param.otstup*2) + 'px';
	}
}