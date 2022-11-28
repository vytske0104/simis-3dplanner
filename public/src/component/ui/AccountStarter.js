import { AccountManager } from "./AccountManager.js"


export class AccountStarter {
    constructor(par, fun, boolAM) {
        var self = this;

        this.type = "AccountStarter";

        this.fun = fun;
        this.par = par;
        this.param = par.param;

        this.arrScen3D = [];
        this.linkKaleido = "https://kaleidoplan.ru/";

        this.dCont=new DCont(this.par.dCont)
        this.accountManager=undefined
        if(boolAM==undefined){
            this.accountManager = new AccountManager(this, function(s,p,p1){                
                if(s=="upButton"){
                    if(p1.key=="help"||p1.key=="partners"){
                        window.open(self.linkKaleido+p1.key);
                        return
                    }
                    if(p1.key=="exit"){
                        self.fun("exitProfile");
                        return
                    } 
                    self.fun("openLeftField", p1.name);
                }
            })
        }
        




        this._active = false;
        this.arrScen3D=undefined
        var arrThree=undefined
        this.startObj = function (o) {
            arrThree = o.three.array;
            this.dragUzer() 
        }


        var sss=0
        var arrXZ
        this.dragUzer = function () {
            console.warn("dragUzer!!!",arrThree,mhbd.uzer)
           // http://localhost:8080/site/indexDin.html
            if(sss==5)return
             sss++   
            if(arrThree==undefined)return;
            if(mhbd.uzer==undefined)return; 
            arrXZ=this.sortUzer(arrThree);
            for (var i = 0; i < arrXZ.length; i++) {                
                this.st(arrXZ[i], true);
            }
        }


        this.init2 = function () {// 

            mhbd.getKeyId("scenes3d",3,function(e){               
                self.startObj(e.json);
            })
        }

    
        


        this.start = function () {
            if(this.accountManager)this.accountManager.start();
        };

        this.sortUzer = function (arr) {            
            var a=[]
            var aad=[]
            if (mhbd.uzer) if (mhbd.uzer.userSort) {

                aad=(mhbd.uzer.userSort+"").split(",")

                var aYes = [
                    "6bc61d14-2a531bdf",//юзер
                  //  "334fdbe5-17ecf25Z",//мои планы
                    "454a2173-56f77fb6",//строительный прайс
                    //"ac8beeb7-d89755cd",//строитель
                  //  "d498567b-ada85d9a"//события
                ];
               



                
                for (var i = 0; i < aad.length; i++) {
                    if (aad[i] == 2) {//строитель
                        aYes.push("48f269b9-eb98c946");
                    }
                    if (aad[i] == 5) {//геолог
                        aYes.push("99c114ZZ-384b8658");
                    }
                    if (aad[i] == 6) {//Менеджер
                        aYes.push("b403b2eZ-c5205a87");
                        aYes.push("d498567b-ada85d9a");
                    }
                    if (aad[i] == 8) {//Менеджер
                        aYes.push("3f631fc7-91cc3c1Z");
                        aYes.push("e7b1c5fa-c85dc6d5");
                    }
                }

                for (var i = 0; i < aad.length; i++) {                    
                    if (aad[i] == 4) {//прогер
                        for (var i = 0; i < arrThree.length; i++) {
                            aYes.push(arrThree[i].uuid)
                        }
                    }
                }
                
                for (var i = 0  ; i < arrThree.length; i++) {
                    var b = false;                    
                    for (var j = 0; j < aYes.length; j++) {
                        if (aYes[j] == arrThree[i].uuid) {
                            b = true;
                            j = 9999;
                        }
                    }

                    if (b == true) {
                       
                        a.push(arrThree[i])
                        
                    }
                }

                            
            }   
            return a;

        }

        this.st = function (o, _bool) {
            let _obj = o;
            let bol=_bool
            $.ajax({
                type: "GET",
                url: this.par.param.server + _obj.key + "/" + _obj.id + "/",
                success: function function_name(data) {
                    _obj.link = data.icon;
                    _obj.objIcon = data;
                    
                  
                    //if (mhbd.debug == false) 
                    if (data.texts) if (data.texts["ru"]) {

                        _obj.title = data.texts["ru"]
                    }
                    if (mhbd.debug == true) 
                    if(bol){
                       _obj.title1 = _obj.name
                    }
                    

                    self.stTest();
                }
            })
            if (o.array) if (o.array.length != 0) {
                for (var i = 0; i < o.array.length; i++) {
                    this.st(o.array[i])
                }
            }
        }



        this.stTest = function () {
            for (var i = 0; i < arrXZ.length; i++) {
                if (this.stTest111(arrXZ[i]) == null) return
            }
            self.fun("openArr", arrXZ);
            if(this.accountManager)self.accountManager.openArr(arrXZ);

            //self.accountManager.openArr(arr);
        }


        this.stTest111 = function (o) {
            if (o.link == undefined) return null
            if (o.array) if (o.array.length != 0) {
                for (var i = 0; i < o.array.length; i++) {
                    if (this.stTest111(o.array[i]) == null) return null
                }
            }
            return true
        }
        

        this.mouseDown = function(e){
            let rectPanel = self.accountManager.panel.div.getBoundingClientRect()
            let border = 2;
            if ((e.clientX <= rectPanel.x || e.clientX >= rectPanel.x + rectPanel.width + border) ||
                (e.clientY <= rectPanel.y || e.clientY >= rectPanel.y + rectPanel.height + border)) self.active = false;
        }



        var w, h, s;
        this.sizeWindow = function (_w, _h, _s) {
            if (_w) {
                w = _w;
                h = _h;
                s = _s;
            }
            if(this.accountManager)this.accountManager.sizeWindow(w,h,s)
        }
        this.init2();
    };

    set active(_val) {
        if (_val == this._active) return;
        this._active = _val;
        this.accountManager.active = _val;

        if(_val == true) {
            this.sizeWindow();
            document.addEventListener("mousedown", this.mouseDown)
        } else {
            document.removeEventListener("mousedown", this.mouseDown)
        }               
    };

    get active() {
        return this._active;
    }
};