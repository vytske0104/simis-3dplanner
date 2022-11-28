
import { MCMK1 } from './MCMK1.js';

export class MenuConfigList  {
    constructor(par,fun) {          
        this.type="MenuConfigList";
        this.fun=fun
        this.par=par
        var self=this;

        this._active=false;
        this.param=par.param;
        this.dCont=new DCont(par.dCont);
        this.dCont.visible = this._active;

       

        this.down=function(){  
            if(this.idArr==0){//+++
                self.objObj.array.push(self.getBaseObjObj())
                self.gallery.start(self.objObj.array)
                self.index1=self.objObj.array.length-1
                self.fun("saveTime")
            }

            if(this.idArr==1){//Убиваем
                let a = self.index1
                self.objObj.array.splice(self.index1, 1);
                if(a>self.objObj.array.length-1)a=self.objObj.array.length-1;
                self.gallery.start(self.objObj.array)
                self.index1=a

                if (self.objObj.array.length == 0)  self.cxzxz.active=false
                self.fun("saveTime")    
            }

            if(this.idArr==2){//<<<<<<
                let a = self.index1
                if (a > 0){
                    let b = self.objObj.array.splice(self.index1, 1);
                    self.objObj.array.splice(a - 1, 0, b[0])
                    self.gallery.start(self.objObj.array)
                    self.index1= a - 1
                    self.fun("saveTime")
                }
            }

            if(this.idArr==3){//>>>>>>
                let a = self.index1
                if (a < self.objObj.array.length - 1 && a != -1) {
                    var b = self.objObj.array.splice(a, 1);
                    self.objObj.array.splice(a + 1, 0, b[0])
                    self.gallery.start(self.objObj.array)
                    self.index1 = a + 1
                    self.fun("saveTime")
                }
            }
        }


        this.init=function(){
            this.window=new DWindow(this.dCont,0,0," ")
            this.window.hasMinimizeButton=false;
            //this.window.dragBool=false;

            // this.window.width=250;
            this.window.width=400;
            this.window.height=500;            
            this.window.dragBool=false;
            var ww=28;
           
            this.closeWin = new DButton(this.window, this.window.width-ww-2, 2, 'X', function(){
                self.fun("closeWin");
            });
            this.closeWin.width = this.closeWin.height = ww 

            this.listJson = new DButton(this.window, this.window.width-((ww+3)*2)-2, 2, 'L', function(){
                let ll = {"Obj":{"active":true,"type":"null","array":[{"param":"id","width":0,"title":"id","value":" ","cmena":"DInput","bool":false,"num":0,"str":" ","priority":0},{"param":"icon","width":0,"title":"icon","value":"null","cmena":"null","bool":false,"num":0,"str":"null","priority":0},{"param":"name","width":-1,"title":"name","value":" ","cmena":"DInput","bool":false,"num":0,"str":"null","priority":0},{"param":"param","width":50,"title":"null","value":"null","cmena":"null","priority":50,"bool":false,"num":0,"str":"null"}]},"List":{"active":true,"type":"null","array":[{"param":"id","width":0,"title":"id","value":" ","cmena":"null","bool":false,"num":0,"str":"null","priority":0},{"param":"icon","width":0,"title":"null","value":"","cmena":"DImage","bool":false,"num":0,"str":"null","priority":0},{"param":"name","width":-1,"title":"name","value":" ","cmena":"null","bool":false,"num":0,"str":"null","priority":0},{"param":"openCreat","width":50,"title":"null","value":"iconId,group1,12","cmena":"DButton","bool":false,"num":0,"str":"null"},{"param":"openVisi","width":50,"title":"null","value":"iconId,group1,11","cmena":"DButton","bool":false,"num":0,"str":"null"},{"param":"openThree","width":50,"title":"null","value":"iconId,group1,13","cmena":"DButton","bool":false,"num":0,"str":"null"},{"param":"dragObj","width":50,"title":"null","value":"iconId,group1,14","cmena":"DButton","bool":false,"num":0,"str":"null"}]},"Creat":{"active":false,"type":"null","array":[]}}
                self.fun("listJson", JSON.stringify(ll));

            });
            this.listJson.width = this.listJson.height = ww 

            this.creatJson = new DButton(this.window, this.window.width-((ww+3)*3)-2, 2, 'C', function(){
                let ll = {"Obj":{"active":true,"type":"null","array":[{"param":"param","width":200,"title":"Товары продовца","value":"null","cmena":"null","bool":false,"num":0,"str":"null"}]},"List":{"active":false,"type":"null","array":[]},"Creat":{"active":true,"type":"MCOBase","array":[{"param":"name","width":100,"title":"name","value":"null","cmena":"DInput","bool":false,"num":0,"str":"null"},{"param":"icon","width":100,"title":"icon","value":"null","cmena":"DButton","bool":true,"num":0,"str":"null"}]}}
                self.fun("creatJson", JSON.stringify(ll));
            });
            this.creatJson.width = this.creatJson.height = ww 

            var yy = 36+this.param.otstup*2
            this.ch=new DCheckBox(this.window.content,this.param.otstup, yy,"active",function(){
                self.objObj.active=this.value;
                self.fun("saveTime");
            });
            this.ch.visible=false;

            yy += 36+this.param.otstup
            this.comboBox=new DComboBox(
                this.window.content,
                this.param.otstup,
                yy, 
                [
                    "null",
                    "MCOBase",
                    "MCOProduct",
                    "MCOPlane",
                    "MCOGeologists",
                    "MCOProgMet",
                    "MCOUser",
                    "MCOWork",
                    "MCOProject",
                    "MCOGroup0",
                    "MCOTextures"
                ],
                function(){
                    self.objObj.type=this.array[this.index]
                    self.fun("saveTime");
                }
            )
            this.comboBox.width=this.window.width-4;


            yy += 36 + +this.param.otstup // 68+34+this.param.otstup*2
            this.w=new DWindow(this.window.content, 0, yy," ");
            this.w.width=this.window.width;
            this.w.dragBool=false;
            this.w.hasMinimizeButton=false;

            var b;
            for (var i = 0; i < 4; i++) {
                b=new DButton(this.w,(this.param.otstup+ww)*i+this.param.otstup, 2, " ",this.down);
                b.idArr=i;
                 
                if(i==0)b.text="+";
                if(i==1)b.text="-";
                if(i==2)b.text="<"; 
                if(i==3)b.text=">"; 
                
                b.width=ww;
                b.height=ww;
            }

            this.gallery=new Gall33(this.w, this.param.otstup, 36+this.param.otstup ,function(ii){
                self.index1= this.index
            })

            // this.gallery.width=this.window.width-this.param.otstup*2;
            this.gallery.width=this.w.width-this.param.otstup*2;
            this.gallery.height=52
            this.gallery.kolII=5;
            this.gallery.widthPic=(this.gallery.width)/this.gallery.kolII ///45;
            this.gallery.heightPic=24;

            this.mk1=new MCMK1(this,function(s, p, p1){
           
                if (s === "dragParam") self.gallery.array[self.index1].label.value = p
                if (s === "saveTime"){
          
                    self.fun(s,p)
                    
                } 
               /* if (s == "boolGallery") {
                    self.cxzxz.reDrah()
                    self.cxzxz.active=p
                }*/
                    
            }, 0, yy + this.w.height)

            this.window.height = yy + this.gallery.height
        }


        var www=50
        this.arrBut=[]

        this.objBase=undefined;
        this.setObj=function(_obj,arr){ 
            arr=["Obj","List","Creat"]


            this.objBase=_obj
            var b=false
            for (var i = 0; i < arr.length; i++) {
                if(this.objBase[arr[i]]==undefined){
                    this.objBase[arr[i]]=this.getBaseObj();
                    b=true;    
                }
            }
            if(b==true)self.fun("saveTime");

            for (var i = 0; i < this.arrBut.length; i++) {
                this.arrBut[i].visible=false;
            }

            for (var i = 0; i < arr.length; i++) {
                if(this.arrBut[i]==undefined){
                    this.arrBut[i]=new DButton(this.window.content,this.param.otstup+i*(www+this.param.otstup),this.param.otstup,"",function(){
                       self.index=this.idArr
                    })
                    this.arrBut[i].idArr=i;
                    this.arrBut[i].width=www;

                }
                this.arrBut[i].visible=true

                this.arrBut[i].text=arr[i];
                this.arrBut[i].obj=this.objBase[arr[i]];
            }
        
            self.index=0
        }

        this.objObj=undefined;
        this.setObjObj=function(obj){ 
            this.objObj=obj
            this.ch.visible=true;
            this.ch.value=this.objObj.active;

            
            for (var i = 0; i < this.comboBox.array.length; i++) {
                if(this.comboBox.array[i]==this.objObj.type){
                    this.comboBox.index=i
                    break;
                }
            }  
            self.gallery.start(self.objObj.array)
            self.index1=0;          
        }


        this.getBaseObj=function(){
            var o={};
            o.active=false;
            o.type="null";
            o.array=[];
            return  o  
        }


        this.getBaseObjObj=function(){
            var o={};            
            o.param="param";
            o.width=50;
            o.title="null";
            o.value="null";
            o.cmena="null";

            o.priority=50;

            o.bool=false;
            o.num=0;  
            o.str="null";          
            return  o;  
        }


        this.setParam=function(){        
            this.window.x=this.param.otstup;
            this.window.y=this.param.otstup*4+this.param.wh; 
            this.sizeWindow();
        }

        this.init()

        var w,h,s
        this.sizeWindow = function(_w,_h,_s){
            if(_w){
                w=_w;
                h=_h;
                s=_s;
            }
            //h/s-(this.param.otstup*5+this.param.wh)                 
        }
    }

    set index(value) {
        //if (this._active != value) {
            this._index = value;
           
            for (var i = 0; i < this.arrBut.length; i++) {  
                this.arrBut[i].alpha=1
                if(i==this._index){
                    this.arrBut[i].alpha=0.5
                    this.setObjObj(this.arrBut[i].obj)

                }
            }
            //this.dCont.visible=this._active;         
                                          
       // }             
    }
    get index() { return this._index; } 

    set index1(value) {
        this._index1 = value;
        this.gallery.index=-1
        if(this.gallery.array[this._index1]){
            this.gallery.index=this._index1
            this.mk1.setObj(this.gallery.array[this._index1].object)
            

        }else{
            this.mk1.setObj(undefined)
        }
    }

    get index1() { return this._index1; } 



    set active(value) {
        if (this._active != value) {
            this._active = value;   
            this.dCont.visible=this._active;         
                                          
        }             
    }
    get active() { return this._active; }
}






function Gall33(dCont, _x, _y, _fun) {
    DGallery.call(this, dCont, _x, _y, _fun);
    var self=this             
    this.type="Gall33"; 

    this.createZamen=function(){            
        var r=new BoxXZ(this.content, 0, 0, this.downBtn, this);            
        return r;
    }




    // this.dragColorGal=function(){
    //     for (var i = 0; i < this.array.length; i++) {
    //         this.array[i].dragColorGal()
    //     }
    // }    
}

Gall33.prototype = Object.create(DGallery.prototype);
Gall33.prototype.constructor = Gall33;

Object.defineProperties(Gall33.prototype, {

    // index: {// Активный элемент
    //     set: function (value) {    
    //         if (this.array[value] != undefined) {
    //             this.korektPoIndex(value);
    //         }
            
    //         this._index = value;
           

    //         for (var i = 0; i < this.array.length; i++) {
    //             if (this._index == i) this.array[i].activ = true;
    //             else this.array[i].activ = false;
    //         }

    //     },
    //     get: function () { return this._index; }
    // },
    
})


function BoxXZ(dCont, _x, _y, _fun, par) {
    DBox.call(this, dCont, _x, _y, _fun);
    this.type = 'BoxXZ';
    var self=this
    this.par = par;

/*
    this.dragColorGal=function(){
        if(this.object.c!=undefined){                    
            
            if(this._color1 != this.object.c){
                this._color1 = this.object.c;
                this.panel.color1=this._color1;
                this.draw()
            }
        }else{
         
            if(this._color1 != this.par._color1){
                this._color1 = this.par._color1;
                this.panel.color1=this._color1;
                this.draw();
            }
        }
    }*/
    this.label.fontSize=12;
    this.label.activMouse=false


    this.startLoad = function (_obj) {
        this.object = _obj;

        this.label.text=_obj.param;
        this.label.visible=true
      
    
        self.funLoad();
        //var link=aGlaf.resursData+""+_obj.id+"/64.png"+aGlaf.plusLink
       /* var link="resources/image/notpic.png";


        if(_obj.icon){
            link=_obj.icon;
        }

        
        this.dragColorGal();

       
        if(_obj.id!=undefined){
            this.label.visible=true
            this.label.text=_obj.id
            this.label.div.style.pointerEvents="none";
            this.label.fontSize=10;
        }
        */
        if (_obj.icon != undefined) {
            this.image.visible = true;
            if (this.image.link == _obj.icon) {
                if (self.funLoad) self.funLoad();
               
            } else {
                this.image.width = 100;
                this.image.height = 100;
                this.image.link = _obj.icon;
            }
        } else{
            this.image.visible = false;
        }


       
        //this.draw();
    };

   /* this.draw = function () {
        ss = (this._width - this._otstup * 2) / this.image.picWidth;
        if (ss > (this._height - this._otstup * 2) / this.image.picHeight)ss = (this._height - this._otstup * 2) / this.image.picHeight;
        this.image.x = 0;
        this.image.width=this.image.picWidth*ss;
        this.image.height=this.image.picHeight*ss;

        this.image.x = (this._width - this.image.picWidth * ss) / 2;
        this.image.y = (this._height - this.image.picHeight * ss) / 2;

        this.label.x = 2//(this._width - this.label.curW) / 2;
        this.label.y = this._height - 11;

        if (this.postDraw) this.postDraw();
    };*/

}
BoxXZ.prototype = Object.create(DBox.prototype);
BoxXZ.prototype.constructor = BoxXZ;











