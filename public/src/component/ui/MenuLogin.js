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
		this.dCont1= new DCont(par.dCont);
		this.panel = undefined;

		this._active = false;

		this.ac=[]

		this.init = function (token) {
			if (this.panel != undefined) return
			this.panel = new DPanel(this.dCont, 0, 0);
			this.panel.alpha = 0.5;


			this.window=new DWindow(this.dCont)
			this.window.dragBool=false
			this.window.hasMinimizeButton=false
			this.ac=[]

			this.ac[0]=new DLabel(this.window.content,0,0,"эмеил (v2/v2v2v2v2)")
			this.ac[1]=new DInput(this.window.content,0,0,"vorodis2")
			this.ac[2]=new DLabel(this.window.content,0,0,"пароль")
			this.ac[3]=new DInput(this.window.content,0,0,"1234")

			this.ac[4]=new DButton(this.window.content,0,0,"отправить",function(){
				self.manualLogin(self.ac[1].value,self.ac[3].value)
			})

			this.dragParam()


		}

		this.dragParam = function () {
			this.window.width=this.param.sizeBase;
			var yy=this.param.otMy;
			for (var i = 0; i < this.ac.length; i++) {
				this.ac[i].y=yy;
				this.ac[i].x=this.param.otMy
				if(this.ac[i].type=="DLabel"){
					this.ac[i].activMouse=false;
					this.ac[i].fontSize=this.param.fontSizeLittel;
					yy+=this.param.otstup+this.ac[i].fontSize					
				}
				if(this.ac[i].type=="DInput"){				
					this.ac[i].height=this.param.wh;
					yy+=this.param.otstup+this.param.wh	
					this.ac[i].timeFun=1				
				}
				if(this.ac[i].type=="DButton"){				
					this.ac[i].height=this.param.wh;
					yy+=this.param.otstup+this.param.wh					
				}
				
				this.ac[i].width=this.param.sizeBase-this.param.otMy*2


			}
			this.window.height=yy+32+this.param.otMy-this.param.otstup;
			this.sizeWindow()

		}

		this.dragUzer=function(){
            trace("mhbd.uzer",mhbd.uzer);
            if(mhbd.uzer!=null)self.active=false
        }	

		

		var loginCallback = function () {
			self.manualLogin(self.emailInput.value, self.passInput.value);
		};

		this.manualLogin = function(_gotEmail, _gotPasswd) {
			
			var obj={}
            obj.url=this.param.server+"auth/token/login/"
            obj.method="POST";
           
         
            obj.data={
                "password": _gotPasswd,
                "username": _gotEmail,
            }
           
                           
            
            obj.success = function (response) {
                trace("зашибись===",response);
                locToken.token=response.auth_token;
            };
            obj.error = function (response) {                
                trace("error===",JSON.parse(response.responseText).non_field_errors)                
                self.processAuthError("mail:"+_gotEmail+", password:"+_gotPasswd+", error: ", JSON.parse(response.responseText).non_field_errors);
            }            
              
            $.ajax(obj);		
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

		this.processAuthError = function (ss, error) {
			var s=ss
			for (const key in error) {
				if (Object.hasOwnProperty.call(error, key)) {
					s+=key + ":" + error[key];					
				}
			}
			mInfo.setFun("Ошибки загрузки",s)
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
	        trace("getTokenNN", o)
	        $.ajax(o);
	    }


		var w, h, s;
		this.sizeWindow = function (_w, _h, _s) {
			if (_w) {
				w = _w;
				h = _h;
				s = _s;
			}
			if (this._active==false) return;
			if (this.panel == undefined) {
				return;
			}
			this.panel.width = w / s;
			this.panel.height = h / s;
			this.window.x = (w / s - this.window.width) / 2;
			this.window.y = (h / s - this.window.height) / 2;

			trace("www",w)
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
			this.dCont1.add(this.dCont)
		} else {
			this.dCont1.remove(this.dCont)
		}
		this.init()
		this.sizeWindow()

	};

	get active() {
		return this._active;
	}
}


