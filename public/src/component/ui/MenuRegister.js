
/*
меню для регистрации

*/


export class MenuRegister {
    constructor(par, fun) {
        this.type = "MenuRegister";
        this.fun = fun
        this.par = par
        var self = this;
        this.param = par.param;
        this.dCont = new DCont();
        this.pan = undefined;

        this._active = false;
        this.win;

        this.phoneNumberLabel;
        this.phoneNumberInput;
        this.emailLabel;
        this.emailInput;
        this.passwordLabel;
        this.passwordInput;

        this.components = [];

        this.fsLitel=10

        this._activeNot=true

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

         /*   this.win = new DWindow(this.dCont, 100, 100, "Регистрация");
            this.win.dragBool = false;
            this.win.hasMinimizeButton = false;
            this.win.width = this.param.sizeBase2 || 200*/


            this.win = new DPanel(this.dCont, 100, 100)
            this.win.content.y=32
            this.win.borderRadius=this.param.borderRadius;          
            this.win.glowColor=this.param.glowColor;
            this.win.glowSah=this.param.glowSah;
            this.win.width = this.param.sizeBase2 
            this.win.boolLine=false;

            this.ll = new DLabel(this.win,0,this.param.otstup*2,"Вход")
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

            this.winCloseBtn.width = this.winCloseBtn.height = 32 - 4;
            this.winCloseBtn.x = this.win.width - this.winCloseBtn.width - 2
            this.winCloseBtn.boolFond = false;
            this.winCloseBtn.visible=this._activeNot


            this.nameLabel = new DLabel(this.win.content, 0, 0, "имя");
            this.nameInput = new DInput(this.win.content, 0, 0, "", function () { });
            this.phoneNumberLabel = new DLabel(this.win.content, 0, 0, "телефон");
            this.phoneNumberInput = new DInput(this.win.content, 0, 0, "", function () { });
            this.emailLabel = new DLabel(this.win.content, 0, 0, "емеил:");
            this.emailInput = new DInput(this.win.content, 0, 0, "", function () { });

            this.passwordLabel = new DLabel(this.win.content, 0, 0, "пароль");
            this.passwordInput = new DInput(this.win.content, 0, 0, "", function () { });
            this.passwordInput.object.setAttribute("type", "password")

            this.passwordLabel2 = new DLabel(this.win.content, 0, 0, "повторите пароль");
            this.passwordInput2 = new DInput(this.win.content, 0, 0, "", function () { });
            this.passwordInput2.object.setAttribute("type", "password")


            this.buttonEye = new DCheckBox(this.win.content, 0, 0, " ", function () {
                if(self.passwordInput.object.type == "password") self.passwordInput.object.setAttribute("type", "text")
                else self.passwordInput.object.setAttribute("type", "password")
            });
            this.buttonEye1 = new DCheckBox(this.win.content, 0, 0, " ", function () {
                if(self.passwordInput2.object.type == "password") self.passwordInput2.object.setAttribute("type", "text")
                else self.passwordInput2.object.setAttribute("type", "password")
            });
            this.buttonEye.width = this.buttonEye1.width = this.passwordInput2.height
            this.buttonEye.height = this.buttonEye1.height = this.passwordInput2.height

            mhbd.getKeyId("group1", 280, function (e) {
                self.buttonEye.link0 = e.icon
                self.buttonEye1.link0 = e.icon
            })

            mhbd.getKeyId("group1", 279, function (e) {
                self.buttonEye.link1 = e.icon
                self.buttonEye1.link1 = e.icon
            })

            this.errorLabel = new DLabel(this.win.content, 0, 0, "");
            this.errorLabel.color = "#ff0000";

            this.registerLabel = new DLabel(this.win.content, 0, 0, "Есть аккаунта?");
            this.registerLabel.fontSize = 10;
            this.registerLabel.textAlign="right"

            this.registerBxz = new DButton(this.win.content, 0, 0, "Войти", function () {
                self.fun('toLogin');
                self.active=false
            });
            this.registerBxz.height = this.param.otMy;
            this.registerBxz.color = this.param.colorFont;
            this.registerBxz.label.fontSize = this.fsLitel;
            this.registerBxz.label.bold = true;
            this.registerBxz.label.color = this.param.color;

            this.registerButton = new DButton(this.win.content, 0, 0, "Регистрация", function () {                
                self.fun("registration");
                self.errorLabel.value = "";
                let result = xzFFFF(
                    self.emailInput.value,
                    self.passwordInput.value,
                    self.passwordInput2.value,
                    self.phoneNumberInput.value,
                    self.nameInput.value,
                    function(e){
                        self.okiregistr()
                        self.dragComponents();
                        self.sizeWindow();
                    },
                    function(e){
                        self.processErrors(e);
                        self.dragComponents();
                        self.sizeWindow();
                    },
                );
                self.sizeWindow();
            });


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

                new DButton(self.win.content, ww, 40, "testFormEvent",function(){
                    self.okiregistr()
                }).width = 533
                /*new DLabel(self.win.content, ww, 100, "user5@gmail.com||user5-продовец ").width = 533
                new DLabel(self.win.content, ww, 120, "vorodis2@gmail.com||1qazxsw2 xz ").width = 533
                new DLabel(self.win.content, ww, 140, "alphakplan@gmail.com  || 12345&asd ").width = 533*/
            }




            this.mXZ = new MXZ(this.win.content, this, function () {
                
            });


            this.components = [
                this.nameLabel,
                this.nameInput,
                this.phoneNumberLabel,
                this.phoneNumberInput,
                this.emailLabel,
                this.emailInput,
                this.passwordLabel,
                this.passwordInput,
                this.passwordLabel2,
                this.passwordInput2,
                this.errorLabel,
                this.registerButton,
                this.registerBxz
            ];

            var compWidth = this.win.width - this.param.otstup * 2;

            for (var i = 0; i < this.components.length; i++) {
                this.components[i].width = compWidth;
                this.components[i].x = this.param.otstup;
                if (this.components[i].timeFun != undefined) this.components[i].timeFun = 1;

                if(this.components[i].type=="DLabel")this.components[i].fontSize=this.fsLitel
                this.components[i].name= "xz";     
            }
            this.registerBxz.name= "xz1"; 

            this.passwordInput.width = this.passwordInput2.width = compWidth-this.buttonEye.width
            this.buttonEye.x = this.buttonEye1.x = this.passwordInput.width + this.param.otstup



            this.dragComponents();
            this.sizeWindow();
        }

        var o1,o2
        this.okiregistr = function () {  
            if(o1&&o2){
                self.fun("setEvent", {text:o1.texts["ru"],text1:o2.texts["ru"]});
            }else{
                mhbd.getKeyId("group1", 285, function (e) {
                    o1=e
                    mhbd.getKeyId("group1", 284, function (e) {
                        o2=e
                        self.okiregistr()                        
                    })
                })
            }
        }    


        this.processErrors = function (_gotErr) {  
            var errText = "";
            for (const errField in _gotErr) {
                if (Object.hasOwnProperty.call(_gotErr, errField)) {
                    const errors = _gotErr[errField];
                    errText += errField + ":\n";
                    errors.forEach(eachErr => {
                        errText += eachErr + "\n";
                    });
                }
            }
            this.errorLabel.value = errText;
        };


        this.dragComponents = function () {
            var otstup = this.param.otstup;
            var yy = otstup;
            for (var i = 0; i < this.components.length; i++) {
                this.components[i].y = yy;
                if(this.components[i].type=="DLabel"){
                    if( this.components[i].color=="#ff0000"){
                        if(this.components[i].text==""){

                        }else{
                            yy += this.components[i].getRect().height + otstup;
                        }
                        
                    }else{
                        yy += this.components[i].fontSize + otstup;
                    }                    
                }
                if(this.components[i].type=="DButton"||this.components[i].type=="DInput"){
                    yy += this.components[i].height + otstup;
                }
            }
            this.buttonEye.y = this.passwordInput.y 
            this.buttonEye1.y = this.passwordInput2.y 

            this.registerBxz.width=this.param.wb;
            this.registerBxz.x=this.param.sizeBase2-this.param.wb-this.param.otstup;

            this.registerLabel.x = 0;
            this.registerLabel.y = this.registerBxz.y+5;
            this.registerLabel.width = this.registerBxz.x-this.param.otstup;

            yy -=  otstup;
            this.mXZ.dCont.y=yy;
            yy += this.mXZ.height + otstup*2;
            self.win.height = yy + 32;         
        };


        function xzFFFF(_gotEmail, _gotPasswd, _gotPasswdRe, _gotPhone, _gotName, f, fe) {
            var o={}
            o.url= self.param.server + "auth/users/"
            o.type="POST";
            o.data= JSON.stringify({"first_name": _gotName,"email": _gotEmail, "password": _gotPasswd,"re_password": _gotPasswdRe, "phone_number": _gotPhone })
            o.headers= { "Content-Type": "application/json" };

            o.success = function (response) {
                f(response.auth_token);
            };
            o.error = function (response) {
                fe(response.responseJSON)
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
        this.init();
        this.dragComponents();
        this.sizeWindow();
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