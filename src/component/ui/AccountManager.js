
import { MAMScrol } from './MAMScrol.js';


export class AccountManager {
    constructor(par,fun) {          
        this.type="accountManager";
        this.fun=fun
        this.par=par
        var self=this;
        this.param=par.param;
        this.otstup=this.param.otstup;

        this.dCont=new DCont(par.dCont);

        this._width = 300;
        this._height = 400;

        this._active = false;
        this.heightHedder=0
        this.heightButton = 35+5;

        this.arr = [];

        this.arrButton = undefined;
        this.arrButton2 = undefined;

        this.panel = undefined;

        this.linkKaleido = "https://kaleidoplan.ru/";
        this.color = "#ffffff";
        this.colorText = dcmParam.colorText1;
        //this.fontSize = 14;

        this.arrXZ = [];
        this.arrXZ.push({key:"help", id:0, name:"Помощь"});
        this.arrXZ.push({key:"partners", id:1, name:"Партнерам"});
        this.arrXZ.push({key:"exit", id:1, name:"Выход"});
        this.arrButton1 = [];
        var xx, yy;
        this.init = function(){
            if(this.panel != undefined) return

            this.panelGlow = new DGlow(this.dCont);
            this.panelGlow.width = this._width;
            this.panelGlow.height = this._height;
            this.panelGlow.glowSah = 5;
            this.panelGlow.alpha=0.25;
            this.panelGlow.reDrag();
            this.panelGlow.borderRadius = 3;

            this.panel = new DPanel(this.dCont);
            this.panel.width = this._width;
            this.panel.height = this._height;
            this.panel.borderRadius = 3;
            this.panel.boolLine=false;

            xx = this.otstup;
            yy = this.otstup*2;
            this.label = new DLabel(this.panel.content, xx, yy, "Учетная запись");
            this.label.width = this.width - this.otstup*2;
            this.label.textAlign = "center";
            this.label.color = this.colorText;
           // this.label.fontSize = this.fontSize
            yy += this.label.fontSize + this.otstup*2;



            yy+= this.otstup;
            this.panelDividing = this.generatePanelDivi(this.panel.content);
            yy += this.panelDividing.height + this.otstup*2;

         
            this.dcontRez = new DCont(self.panel.content);
           

            this.dcontent = new DCont(this.dcontRez);

            this.scrollBarV = new MAMScrol(this.dcontent, this.dcontRez, this.dcontRez, this, function () {});

            yy = this.otstup;
            xx = 0;

            




           
            for (var i = 0; i < this.arrXZ.length; i++) {
                this.arrButton1[i]=self.generateButA(self.dcontent, self.arrXZ[i].name, self.arrXZ[i],this.sobBut) /*function(){
                    window.open(self.linkKaleido+this.objXZ.key);
                }))*/
                this.arrButton1[i].tyxz=2
                yy += this.heightButton;
            }


           
            this.panelDividing2 = this.generatePanelDivi(this.dcontent);
           

            
            
            this.dragUzer();

            this.redragBut();


            this.sizeWindow();
        }





        // this.mouseDown = function(e){
        //     let rectPanel = self.panel.div.getBoundingClientRect()
        //     let border = 2;
        //     if ((e.clientX <= rectPanel.x || e.clientX >= rectPanel.x + self.panel.width + border) ||
        //         (e.clientY <= rectPanel.y || e.clientY >= rectPanel.y + self.panel.height + border)) self.active = false;
        // }


        var butA;
        this.generateButA = function(_dCont, _text, _objXZ, _fun){
            butA = new DButton(_dCont, xx, yy, _text, _fun)
            butA.objXZ = _objXZ;
            butA.height = this.heightButton;
            butA.width = this.width - this.otstup*2;
            butA.textAlign = "left";
          
            butA.color = this.color;
            butA.glowColor = this.color;
            butA.borderRadius = 3;
            // butA.glowSah = 0;
           // butA.fontSize = this.fontSize;
            butA.colorText=this.colorText
            butA.boolLine = false;

            return butA;
        }


        var panD;
        this.generatePanelDivi = function(_dCont){
            panD = new DPanel(_dCont);
            panD.width = this.width - this.otstup*2;
            panD.height = 0.1;
            //panD.glowSah = 0.25;
            panD.alpha = 0.13;
            panD.color = "#091e42";
            panD.booline = false;
            //panD.borderRadius = 3;

            return panD;
        }


        this.start = function(){
            this.init()
            // this.active = true
        }


        this.openArr = function(_arr){
            this.arr = _arr;            
            this.redragBut();
        }


        this.clear = function(){
            for (var i = 0; i < this.arrButton.length; i++) {
                this.arrButton[i].visible=false;
            }   
        }


        this.sobBut=function(){
            if(this.tyxz==1){//кнопки в центре
                self.fun("upButton", this.objXZ.name,this.objXZ);
                return 
            }
            if(this.tyxz==2){//кнопки снизу
                self.fun("upButton", this.objXZ.name,this.objXZ);
                return 
            }
        }


        this.arrButton = [];
        this.redragBut = function(){
            if(this.panel == undefined) return                   
            for (var i = 0; i < this.arr.length; i++) {
                if(this.arrButton[i]==undefined){
                    this.arrButton[i]=self.generateButA(self.dcontent, self.arr[i].title, self.arr[i], this.sobBut)/*function(){
                        self.fun("openLeftField", this.objXZ.name);
                    })*/
                    this.arrButton[i].tyxz=1
                } 
                this.arrButton[i].visible=true;
                this.arrButton[i].objXZ=self.arr[i];
                this.arrButton[i].text=self.arr[i].title;
            } 
            this.korektPosition() 
        }

        this.korektPosition = function(){
            
            this.panelDividing.x=this.otstup
            this.panelDividing.y=this.label.y+this.label.fontSize+this.otstup
            this.dcontRez.y=this.panelDividing.y//+this.otstup
            this.heightHedder=this.dcontRez.y

            yy = this.otstup
            for (var i = 0; i < this.arrButton.length; i++) {
                if(this.arrButton[i].visible==false)continue
                this.arrButton[i].x=  this.otstup;
                this.arrButton[i].y=  yy; 
                yy+=this.arrButton[i].height//+this.otstup
            }

            yy+=this.otstup/2
            this.panelDividing2.x=this.otstup;
            this.panelDividing2.y=yy;
            this.panelDividing2.width=  this.width - this.otstup*2-10; 

            yy+=this.otstup


            for (var i = 0; i < this.arrButton1.length; i++) {
                if(this.arrButton1[i].visible==false)continue
                this.arrButton1[i].x=  this.otstup;
                this.arrButton1[i].y=  yy; 
                yy+=this.arrButton1[i].height+this.otstup
            }
            


            yy-=this.otstup*2

            this.heightContent = yy;
            this.scrollBarV.heightContent = yy;


        }



        var w,h,s
        this.sizeWindow = function(_w,_h,_s){
            if(_w){
                w=_w;
                h=_h;
                s=_s;
            }

            if(this.panel == undefined) return
            

            this.panel.x = (w/s) - this.width - this.otstup
            this.panel.y = (this.param.wh2+this.param.otstup*2)+this.otstup*2

            this.panelGlow.x = this.panel.x
            this.panelGlow.y = this.panel.y +8

            if(this.heightContent+this.heightHedder > (h/s) - this.panel.y - this.otstup) {
                this.panel.height = this.panelGlow.height  = h/s - this.panel.y - this.otstup;
                this.scrollBarV.height = this.panel.height-this.heightHedder - this.otstup*2
            } else {
                this.panel.height = this.panelGlow.height = this.scrollBarV.height = this.heightContent+this.heightHedder+this.otstup*2;
            }

            
        }

        this.aaa=null
        this.dragUzer=function(){
            if(this.panel == undefined) return
            
          /*  if(this.aaa!=null){
                this.dragUzer2()
                return
            }
            //this.arr = []
            var o={}
            o.url= this.param.server+ "scenes3d/3/";
            o.type="GET";
            o.success = function (data) {
                self.aaa=data.json.three.array
                self.dragUzer2()
               
            };
            $.ajax(o);*/

        }

/*
 Object { id: 148, key: "group1", uuid: "6bc61d14-2a531bdf", … }​
1: Object { id: 146, key: "group1", uuid: "334fdbe5-17ecf25Z", … }​
2: Object { id: 15, key: "group1", uuid: "e7b1c5fa-c85dc6d5", … }​
3: Object { id: 9, key: "group1", uuid: "454a2173-56f77fb6", … }​
4: Object { id: 8, key: "group1", uuid: "52c03bb3-f1e46bdZ", … }​
5: Object { id: 7, key: "group1", uuid: "f3d57c95-d230b3de", … }​
6: Object { id: 6, key: "group1", uuid: "7e34229a-383346b1", … }​
7: Object { id: 5, key: "group1", uuid: "996e64bc-79735ce9", … }​
8: Object { id: 4, key: "group1", uuid: "b815fc0Z-2ad991ZZ", … }​
9: Object { id: 3, key: "group1", uuid: "178f13c8-b3814ad0", … }​
10: Object { id: 147, key: "group1", uuid: "753a52ad-645bfc3b", … }
*/


        this.dragUzer2=function(){
            
            var aYes = [
                "6bc61d14-2a531bdf",
                "334fdbe5-17ecf25Z",
                "454a2173-56f77fb6",
                "ac8beeb7-d89755cd",
                "d498567b-ada85d9a"
            ];
            
            for (var i = 0; i < mhbd.uzer.userSort.length; i++) {
                if(mhbd.uzer.userSort[i]==2){//строитель
                    aYes.push("48f269b9-eb98c946");                        
                }
                if(mhbd.uzer.userSort[i]==5){//геолог
                    aYes.push("99c114ZZ-384b8658");                        
                }
                if(mhbd.uzer.userSort[i]==6){//Менеджер
                    aYes.push("b403b2eZ-c5205a87"); 
                    aYes.push("d498567b-ada85d9a");                       
                }
                if(mhbd.uzer.userSort[i]==8){//Менеджер
                    aYes.push("3f631fc7-91cc3c1Z"); 
                    aYes.push("e7b1c5fa-c85dc6d5");                       
                }
            }

            var a=[];
            for (var i = self.aaa.length-1; i >=0; i--) {
                var b=false;
                for (var j = 0; j < aYes.length; j++) {
                    if(aYes[j]==self.aaa[i].uuid){
                        b=true;
                        j=9999;
                    }
                }

                if(b==false){
                    a.push(self.aaa[i])
                }
            }

        }


    }
    set width(value) {
        if (this._width != value) {
            this._width = value;                              
        }             
    }
    get width() { return this._width; }

    set height(value) {
        if (this._height != value) {
            this._height = value;                                 
        }             
    }
    get height() { return this._height; }

    set active(value) {
        if (this._active != value) {
            this._active = value;     
                 
            this.dCont.visible=this._active;
            
            // if(value == true) {
            //     this.sizeWindow();
            //     document.addEventListener("mousedown", this.mouseDown)
            // } else {
            //     document.removeEventListener("mousedown", this.mouseDown)
            // }               
        }             
    }
    get active() { return this._active; }
}
