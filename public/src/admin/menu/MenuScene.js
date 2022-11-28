

//import { SceneSB } from './SceneSB.js';
import { SceneSB } from '../../visi3D/SceneSB.js';
export  function MenuScene(menu, fun) {  
    var self=this   
    this.type="MenuScene";
    this.fun=fun;
    this.par=menu;

    this.otstup=aGlaf.otstup;
    this.wh=aGlaf.wh;
    this.whv=aGlaf.whv;
    this.widthBig=aGlaf.widthBig;

    this.object=null;

    this.param = aGlaf.param;

    this.dCont=new DCont(this.par.dCont);


    this._width=100;
    this._height=100;
    this._active=false

    this.obj=undefined;
    this.objectBase=this.par.objectBase;

    this.w=new DWindow(null, this.otstup, this.whv,"MenuScene");
    this.w.width=this.widthBig*2+this.otstup;
    this.w.dragBool=false;
    this.w.hasMinimizeButton=false;
    this.cont=new DCont(this.w);
    this.cont.y=32
    this.content=new DCont(this.cont);
    this.cont.visible=false;


    this.panel=new DPanel(this.w,this.otstup,this.otstup+32);
    this.panel.width=150;

    this.sceneSB=new SceneSB(this.par.par.visi3D);
    


    this.panel1=new DPanel(this.w,this.panel.width+this.otstup*2,32+this.otstup); 
    this.panel1.width=this.widthBig*2-this.otstup*2-this.panel.width


    this.settings=new DSettings(this.panel1);
    this.settings.content.x=this.otstup;
    this.settings.content.y=this.otstup;
    this.settings.width=this.panel1.width-this.otstup*2;

    window.DVisualLoader=DVisualLoader
    trace("###################################")
    trace(this.settings)
    trace(window.DVisualLoader)        
    



    this.setParam = function (o,o1) {
        for(var s in o){
            o1[s]=o[s]
        }
    }


    this.object;

    this.setObj = function (oo, o1) {
        if(oo)this.objectXZ=oo
        var b = false;
        if(oo==null)this.objectXZ={}

        if(this.objectXZ.scene==undefined){
            b=true;
            this.objectXZ.scene = {};

        }
       
        this.object = {}//this.objectBase.scene;

        this.id=o1.id
    
        console.warn(":::!!!!!!!!!!!",this.sceneSB.array);
        for (var i = 0; i <  this.sceneSB.array.length; i++) {
            if (this.object[this.sceneSB.array[i].name] === undefined) {
                this.object[this.sceneSB.array[i].name] = {};
                if (this.objectXZ.scene[this.sceneSB.array[i].name] === undefined) {                    
                    this.objectXZ.scene[this.sceneSB.array[i].name] = {};
                }else{
                    this.setParam(this.objectXZ.scene[this.sceneSB.array[i].name], this.object[this.sceneSB.array[i].name])
                }

                //b=true;
            } 
            trace(":::",this.sceneSB.array[i].name,this.object[this.sceneSB.array[i].name]);
            this.sceneSB.array[i].setBasa(this.object[this.sceneSB.array[i].name]);
        }

        if(b==true){           
          self.saveTime();            
        }
       // this.par.par.visi3D.utility.debug = true;

       this.par.par.visi3D.alwaysRender = true; 
    }
    
    
    this.save=function(){
        for (var i = 0; i <  this.sceneSB.array.length; i++) {
            this.setParam(this.object[this.sceneSB.array[i].name], this.objectXZ.scene[this.sceneSB.array[i].name] )
        }
        
        mhbd.setParam("scenes3d",this.id,"json",JSON.stringify(this.objectXZ))
   }



    this.sah=0
    this.saveTime=function(){
        this.sah++;
        var s=this.sah;
        setTimeout(function() {
            if(self.sah==s)self.save();
        }, 500);
    }





    this.ddd=function(){        
        self.openI(this.idArr)
    }
    var ss=this.otstup;
    this.arrBut=[]
    var bb
    for (var i = 0; i < this.sceneSB.array.length; i++) {
        bb=new DButton(this.panel,this.otstup,ss,this.sceneSB.array[i].name,this.ddd )
        bb.idArr=i;
        bb.width=this.panel.width-this.otstup*3
        this.arrBut.push(bb);
        ss+=bb.height+this.otstup;
    }
    this.panel.height=ss+this.otstup;
//-----------------------------------------------------------------------
    var sceneBox
    this.com
    this.funComplit=function(_com){
        self.com = _com;
        
        self.funC22('complit')
        
    }

    this.settings.dinFun = function (_com) {
        

        self.com = this.compFinal;

        self.fun('dinam');
    };


    this.funC22=function(sob){

        if (sob == 'complit') {
            if (this.com.param != undefined) {

                if (this.com.param == 'active') {
                    sceneBox.drahKeys();//обновить всех
                } else {
                    sceneBox.drahKey(this.com.param);// поштучно
                }
            }else {
                console.log('Y komponenta нихера не обьявлен параметр');
            }
            /*if (this.com.param != undefined) {
                if (this.com.param == 'active') {
                    self.array[self.index].drahKeys();// обновить всех
                } else {
                    self.array[self.index].drahKey(this.com.param);// поштучно
                }
            } else {
                console.log('Y komponenta нихера не обьявлен параметр');
            }
            if (self.fun)self.fun();
            self.debugScene.draw();*/

        }
        if (sob == 'dinam') {            
            sceneBox.setValue(this.com.param, this.com.value, true);
        }
        self.saveTime();
    }

    this.openI=function(iii){
       

        for (var i = 0; i < this.arrBut.length; i++) {
            if(i!=iii)this.arrBut[i].alpha=1
            else this.arrBut[i].alpha=0.7
        }




        sceneBox=this.sceneSB.array[iii];
        this.plusComp(sceneBox)

        
        
        var o = {};
        o.arrComp = [];
        for (var i = 0; i < sceneBox.array.length; i++) {
            o.arrComp.push(sceneBox.array[i].object);
        }

        o.param = this.object[sceneBox.name];
        o.funComplit = this.funComplit;        
        this.settings.setObj(o);   


        this.panel1.height=this.otstup*2+this.settings.finalHeight

    }
    

    this.dradXZ = function () {
/*

       var array=this.arrBut[i]
       
        var o = {};
        o.arrComp = [];
        for (var i = 0; i < this.array[this._index].array.length; i++) {
            o.arrComp.push(this.array[this._index].array[i].object);
        }
        o.param = this.object[this.array[this._index].name];
        o.funComplit = this.funComplit;
        this.settingsBig.setObj(o);*/
    };

    this.plusComp = function (sceneBox) {
        var ccbb, b;
        for (var i = 0; i < sceneBox.array.length; i++) {
            b = true;
            var o = sceneBox.array[i].object;
            var typeParam = o.typeParam;
            var name = o.name;



            for (var j = 0; j < this.settings.arrComp.length; j++) {
                if (this.settings.arrComp[j].name === name) {
                    b = false;
                    break;
                }
            }

            if (b === true) {
                ccbb = true;
                if (o.typeParam === 'DVisualLoader') {
                    ccbb = false;
                    this.settings.addComponent(typeParam, name, {
                        getFile: function (file, fun) {

                            trace("oooo",o);
                           
                            mhbd.saveFile(file,"scenes3d",2,function(s){
                                
                                fun(s.src)
                            })
/*
                            //console.warn("FIXE Нет очистки старого файла, хз грязь!!!!!!!!!!!");
                            var o={id:self.id}    
                            mhbd.setFile(file,o,"scenes3d","xz",function(s){
                                
                                fun(s)

                                console.warn("FIXE Нет очистки старого файла, хз грязь!!!!!!!!!!!");
                            })*/



                           
                        },
                        onload: function (isActiv) {
                            //bigMenu.preloaderActiv(isActiv);
                        }
                    });
                }


                if (ccbb != false) {
                    this.settings.addComponent(typeParam, name);
                }
            }
        }
    }

    this.saveFile = function (link, file, fun, linkOk ) {
        var l='../resources/tmp/'
       
        
        php.load({tip: 'mkdir', dir: l}, function (e) {
                      
            var ll=php.server+"src/upload.php";
            var form_data = new FormData();
            form_data.append('file', file); 
              
            $.ajax({
                url: ll,
                dataType: 'text',
                cache: false,
                contentType: false,
                processData: false,
                data: form_data,
                type: 'post',
                success: function(php_script_response){
                   

                    var llll='../'+aGlaf.resurs+'tmp/';
                    var llllll=link;                    
                    php.load({tip: 'copyDir', dirWith: llll, dir: llllll}, function (e) {            
                        php.load({tip: "removeDirRec", dir: llll, }, function (e) {    
                            fun(linkOk)                           
                        })           
                    })
                }
            });
        })
    }



     





    this.start= function(){ 
    

    }




    this.sizeWindow = function(w,h){  
        this._width=w;
        this._height=h;
        this.w.height= h - this.whv- this.otstup;           
    }

    Object.defineProperty(this, "active", {
        set: function (value) {            
            if(this._active!=value){
                this._active=value;               
                 if(value==true){
                    this.dCont.add(this.w)
                }else{
                    this.dCont.remove(this.w)
                }
            }           
        },
        get: function () {
            return this._active;
        }
    });
}










function DVisualLoader (cont, _x, _y, _fun) {
    DCont.call(this);
    this.type = 'DVisualLoader';
    var self = this;
    cont.add(this);

    this.fun=_fun;
    this._link = 'null';
    this._value = this._link;

    this._width = 100;
    this._height = 20;
    this.otstup = 2;

    this.panel=new DPanel(this, 0, 0);

    trace("sdf")

    this.bat=new DButton(this, this.otstup, this.otstup,"x",function(){
        self.value="null";
        self.fun();
    });
    this._height=this.bat.height*2+this.otstup*3;
    this.panel.height=this._height;
    this.bat.width=this.bat.height

    this.bat1=new DButton(this, this.panel.height, this.otstup*2+this.bat.height,"load",function(base64){
        self.image.visible = true;  


        

        if (self.funGetFile) {

            self.funGetFile(this.files[0], function (_link) {

            
                //var link = (_link !== null) ? _link : self.linkError;
                self.link = _link;
            
                if (self.fun) self.fun();
                //if (self.onload) self.onload(false);
            });
        } else {
            self.input.value = base64;
            self._link = base64;
            self.image.link = base64;
            //if (self.fun) self.fun();
            //if (self.onload) self.onload(false);
        }




    });
    this.bat1.startFile('.jpg, .png');

    this.input=new DInput(this, this.panel.height, this.otstup,this._link,function(){
        self.value=this.text;
        self.fun();
    });

    this.panel1=new DPanel(this, this.otstup, this.otstup);
    this.panel1.width=this.panel1.height=this.panel.height-this.otstup*2;

    
    var hh=this.panel1.width-this.otstup*3
    this.image=new DImage(this.panel1, this.otstup, this.otstup, null, function(){
        this.width = hh;
        this.height = hh;
    });
    





    this.draw = function () {
        this.bat.x=this._width-this.bat.width-this.otstup
        this.input.width=this._width-this.input.x-this.bat.width-this.otstup*2;
        this.bat1.width=this._width-this.panel1.width-this.otstup*3;
    };

    this.draw();

    /*this.funGetFile = null;
    this.onload = null;
    this.funUp = null;
    this.fun = _fun;

    this.x = _x || 0;
    this.y = _y || 0;
    this._otstup = 2;
    this._wh = pl102.wh;
    this._color = pl102.color1;
    this._width = 100;
    this._height = this._wh * 2 + this._otstup;
    this._link = 'null';
    this._value = this._link;
    this._title = null;

    this.linkError = 'resources/picNotFound.jpg';

    this.content = new DCont();
    this.addChild(this.content);

    var downloadUtill = new DownloadUtill();
    this.downloadUtill = downloadUtill;

    this.contur = new PLContur(this.content, 0, 0);
    this.contur.width = this._height;
    this.contur.height = this._height;
    this.contur.thickness = 0.5;
    this.contur.color = this._color;

    this.label = new PLLabel(this.content, 0, 0, '');

    this.image = new PLImage(this.content, 0, 0);
    this.image.funComplit = function () {
        var scale = Math.min(self._height / this.picWidth, self._height / this.picHeight);
        this.scale.set(scale, scale);
        this.width = this.picWidth;
        this.height = this.picHeight;
        var rx = self._height - (this._width * scale);
        var ry = self._height - (this._height * scale);
        this.x = (rx === 0) ? rx : rx / 2;
        this.y = (ry === 0) ? ry : ry / 2;
    };

    this.input = new PLInput(this.content, this._otstup, 0, 'null', function () {
        self.link = this.value;
        if (self.fun) self.fun();
    });
    // this.input.activMouse = false;


    this.btnLoad = new PLButton(this.content, 0, 0, 'Load', function (base64) {
        self.label.visible = false;
        self.image.visible = false;

        if (self.onload) self.onload(true);

        if (self.funGetFile) {
            self.funGetFile(base64, function (_link) {
            
                var link = (_link !== null) ? _link : self.linkError;
                self.link = _link;
            
                if (self.fun) self.fun();
                if (self.onload) self.onload(false);
            });
        } else {
            self.input.value = base64;
            self._link = base64;

            if (self.fun) self.fun();
            if (self.onload) self.onload(false);
        }

        var fileName = this.files[0].name.split('.');
        var exp = fileName[fileName.length - 1];
        if (exp === 'jd' || exp === 'JD' || exp === 'hdr' || exp === 'HDR') {
            self.label.visible = true;
            self.label.text = '.' + exp;
            self.label.pivot.set(self.label.curW / 2, self.label.curH / 2);
            self.label.position.set(self._height / 2, self._height / 2);
        } else {
            self.image.visible = true;
            self.image.link = base64;
        }
    });
    this.btnLoad.x = this._height + this._otstup;
    this.btnLoad.y = this._wh + this._otstup;
    this.btnLoad.startFile('.jpg, .png, .bmp, .jpeg, .hdr, .jd');

    this.localLoad = new PLButton(this.content, 0, 0, '', function () {
        if (self.input.value.indexOf('base64') !== -1) {
            this.downloadUtill.saveBase64(self.input.value);
        } else {
            
        }
        if (self.fun) self.fun();
    }, 'resources/images/adminAr/61.png');
    this.localLoad.width = this._wh;
    this.localLoad.activMouse = false;

    this.linkClear = new PLButton(this.content, 0, 0, 'X', function () {
        self.label.visible = false;
        self.link = 'null';
        //self.link = self.linkError;
        if (self.fun) self.fun();
    });
    this.linkClear.width = this._wh;

    this.image.funError = function () {
        self.image.link = self.linkError
        
    };


    this.draw = function () {
        this.input.width = this._width - this._wh * 2 - this._otstup * 3 - this._height;
        this.input.x = this._height + this._otstup;
        this.localLoad.x = this.input.x + this.input.width + this._otstup;
        this.linkClear.x = this.localLoad.x + this._wh + this._otstup;
        this.btnLoad.width = this._width - this._height - this._otstup;
    };

    this.draw();*/
}

DVisualLoader.prototype = Object.create(DCont.prototype);
DVisualLoader.prototype.constructor = DVisualLoader;

Object.defineProperties(DVisualLoader.prototype, {
    width: {
        set: function (value) {
            if (this._width === value) return;
            this._width = value;
            this.draw();
        },
        get: function () {
            return this._width;
        }
    },
    height: {
        set: function (value) {},
        get: function () {
            return this._height;
        }
    },
    link: {
        set: function (value) {
            if (this._link === value) return;
            this._link = value;

            
            if (this.link === 'null') {
                this.image.visible = false;
                this.input.value = this.link;
            } else if (this.link === this.linkError) {              
                this.image.link = this.linkError;
                this.input.value = this.link;
            } else {
                this.image.visible = true;
                this.image.link = this._link;
                this.input.value = this._link;
            }/**/
        },
        get: function () {
            return this._link;
        }
    },
    value: {
        set: function (value) {
            this.link = value;
        },
        get: function () {
            return this._link;
        }
    },
    title: {
        set: function (value) {
            if (this._title === value) return;
            this._title = value;
            this.bat1.text = value;
/*
            this.btnLoad.text = value;*/
        },
        get: function () {
            return this._title;
        }
    }
});



