
import { TexBDGal } from './TexBDGal.js';
import { MBPic } from './MBPic.js';


export  class TextureBD  {
    constructor(menu, fun) {
        var self=this;
        this.type = "TextureBD";
        this.par = menu;
        window.selfTBD=this;
        this.margin = aGlaf.otstup;
        this.wh = aGlaf.wh;
        this.whv = aGlaf.whv;
        this.widthBig = aGlaf.widthBig;
        this.objectBase = this.par.objectBase;

        this.nameType="textures";
        this.param = this.par.param;
 

        this._sort=-2

        this.dCont = new DCont(this.par.dCont);

        this.w = new DWindow(null, 0, this.whv, this.nameType);
        this.w.width = this.widthBig;
        this.w.dragBool = false;
        this.w.hasMinimizeButton = false;

       /* this.mSort=new MSort(this, this.w);
        this.mSort.dCont.y=127*/


        this._width = 100;
        this._height = 100;

        let butOffset = 32;

        this.iiiii
        this.gallery = new TexBDGal(this.w.content, aGlaf.otstup, 2, (ii) => {
            
            this.iiiii=ii
            this.par.dragPic.testDrag(15, this.clik.bind(this), this.drag.bind(this));
        });
        this.gallery.width = this.widthBig;
        this.gallery.kolII = 1;
        this.gallery.widthPic = this.w.width-this.param.otstup;
        this.gallery.heightPic = this.param.otMy;

        

        /*let b;
        let ww = 28;
        for (let i = 0; i < 4; i++) {
            b = new DButton(this.w, (this.margin + ww) * i + this.margin, this.margin, " ", this.down.bind(this, i));
            b.idArr = i;
            b.width = ww;
            b.height = ww;
            if (i == 0) b.text = "+";
            if (i == 1) b.text = "-";
            if (i == 2) b.text = "<";
            if (i == 3) b.text = ">";
        }*/


        this.textureObject = new TextureObject(this, ' ', (objDin, reload, dontSave) => {
            if (objDin) {
                this.objectBase.textures[this.index] = objDin;
                aGlaf.s3d.pm.tex.updateTexture(objDin, reload);
                if (!dontSave) {
                    aGlaf.save();
                }
            }
            this.redragTime();
        });
        window.textureObject = this.textureObject;


        this.textureObject.window.x=-200
        this.textureObject.window.y = -32;
        

        this.reDragBDIcon=function(id,icon){  
        
            for (var i = 0; i < self.param.textures.length; i++) {          
                if(self.param.textures[i].id==id){
                    self.param.textures[i].icon=icon;
                    break
                }
            }

            this.reDrag()
        }



        var aZZ=[]
        this.reDrag=function(){       
            

            this.gallery.start(self.param.textures);
           /* var b=true
            
            if(this._sort==-1){
                this.gallery.start(self.objectBase.textures);
                b=false; 
            }
            if(this._sort==-2){
                aZZ=[];
                for (var i = 0; i < self.objectBase.textures.length; i++) {
                    if(self.objectBase.textures[i].sort==undefined)self.objectBase.textures[i].sort=-1;
                    if(self.objectBase.textures[i].sort==-1){
                        aZZ.push(self.objectBase.textures[i])
                    }
                }
                this.gallery.start(aZZ);            
                b=false; 
            }

            if(b==true){
                aZZ=[];
                for (var i = 0; i < self.objectBase.textures.length; i++) {
                    if(self.objectBase.textures[i].sort==undefined)self.objectBase.textures[i].sort=-1;
                    if(self.objectBase.textures[i].sort==this._sort){
                        aZZ.push(self.objectBase.textures[i])
                    }
                }
                this.gallery.start(aZZ);
            }
            this.texture.visible = !!this.gallery.array.length;    

            */        
        }


        self.par.dragPic.addFunAp(function(){        
            /*var num=self.mSort.testXY(self.par.dragPic._x, self.par.dragPic._y); 
            if(num!=null){

                self.gallery.array[self.gallery.index].object.sort=num;
                self.reDrag()
                aGlaf.save();
                return
            } */      
        });


       // if(localS.object.sortTex==undefined)localS.object.sortTex=-2
        //setTimeout(function() {self.sort = localS.object.sortTex;}, 10); 


        this.setId = function(id){  

            self.textureObject.setId(id);
            for (var i = 0; i < this.gallery.arrayObj.length; i++) {
                if(this.gallery.arrayObj[i].id==id){
                    if(this.gallery.array[i]!=undefined){                    
                        let ii=i;
                        setTimeout(function() {
                            self.gallery.index=ii;
                        }, 500);
                    }else{
                        this.gallery.index=i;
                    }               
                }
            }

        }




       // this.reDrag();
       // this.index = 0;
        //this.active = true;
    }

    find(objDinId) {
        let o = this.gallery.array.find(o => o.object.id === objDinId);
        return o && o.object;
    }

    show(objDin) {
        this.index = this.gallery.array.findIndex(o => o.object.id === objDin.id);
    }

    clik() {
     
        
        var id=this.gallery.array[this.iiiii].object.id;
        this.setId(id);              
        let a=php.ser.split("?");
        history.pushState(null, null, a[0]+'?'+this.nameType+'='+id);
        //this.index = this.gallery.index;
    }

    drag() {
        
        let dragObj = this.gallery.array[this.iiiii].object;

        var l="resources/image/notpic.png";
        if(dragObj.icon)l=dragObj.icon;

        this.par.dragPic.start(32, l, dragObj);
    }

    redragTime() {
        aGlaf.plusLink = "?x=" + Math.random();
        this.reDrag();
        setTimeout(function () {
            aGlaf.plusLink = '';
        }, 500);
    }

    /*reDrag() {
        this.gallery.start(this.objectBase.textures);
        this.texture.visible = !!this.gallery.array.length;
        this.gallery.index = this.index;
    }*/





    down(butId) {

       /* if (butId == 0) {//создание
            this.creatMat();
        }

        if (butId == 1) {//Убиваем

            if (this.objDin != undefined) {

                function kill (){
                    var dir = '../' + aGlaf.resursData + selfTBD.objDin.id;
                    php.load({ tip: "removeDirRec", dir: dir }, e => {
                        var a = selfTBD.index;
                        var b = selfTBD.objectBase.textures.splice(a, 1);
                        aGlaf.save();
                        selfTBD.reDrag();
                        if(a>selfTBD.objectBase.textures.length-1)a=selfTBD.objectBase.textures.length-1;
                        selfTBD.index=a;
                    });

                }
                if(aGlaf.durak==false){
                    kill()
                    return
                }

                this.par.mInfo.setFun("Удаление обьекта", "Обьект будет удален из бд, не вычещаеться из дерева, и может привести к падениям, короче окуратно!!!",
                    () => {
                        kill()
                        
                    }
                );
            }
        }
        if (butId == 2) {//<<<<<<
            if (this.objDin != undefined) {
                var a = this.index;
                if (a > 0) {
                    var b = this.objectBase.textures.splice(a, 1);
                    this.objectBase.textures.splice(a - 1, 0, b[0])
                    aGlaf.save();
                    this.reDrag()
                    this.index = a - 1;
                }
            }
        }

        if (butId == 3) {//>>>>>>
            if (this.objDin != undefined) {
                var a = this.index;
                if (a < this.objectBase.textures.length - 1 && a != -1) {
                    var b = this.objectBase.textures.splice(a, 1);
                    this.objectBase.textures.splice(a + 1, 0, b[0])
                    aGlaf.save();
                    this.reDrag();
                    this.index = a + 1;
                }
            }
        }*/
    }


    creatMat() {
       /* var id = "t_" + this.grtMaxPlus();

        function plus (_id){
            selfTBD.creatMatName(_id)

        }
        if(aGlaf.durak==false){
            plus(id);
            return;
        }

        this.par.mInfo.setFunInput(
            "Создание матерьяла",
            "Задаюм имя идишника матерьяла, если такой есть то он не срабоает",
            id,
            () => {
                plus(selfTBD.par.mInfo.text)   
            }
        );*/

    }

    creatMatName(name) {
      /*  var b = true;
        let self = this;
        php.load({ tip: 'getDiractFiles', dir: '../' + aGlaf.resursData }, function (e) {
            var a = e.split(",");
            for (var i = 0; i < a.length; i++) {
                if (a[i] == name) {
                    b = false
                }
            }

            if (b == false) {
                self.par.mInfo.setFun("Такой иди есть!!", "Удалите его в начале", function () { })
            } else {
                var id = name;
                php.load({ tip: 'mkdir', dir: '../' + aGlaf.resursData + id }, function (e) {
                    
                    php.load({ tip: 'copy', dirWith: '../' + aGlaf.resurs + 'base/256.png', dir: '../' + aGlaf.resursData + id + '/pic.png' }, function (e) {
                    });

                    php.load({ tip: 'copy', dirWith: '../' + aGlaf.resurs + 'base/32.png', dir: '../' + aGlaf.resursData + id + '/32.png' }, function (e) {
                    });
                    php.load({ tip: 'copy', dirWith: '../' + aGlaf.resurs + 'base/100.png', dir: '../' + aGlaf.resursData + id + '/100.png' }, function (e) {
                    });
                    php.load({ tip: 'copy', dirWith: '../' + aGlaf.resurs + 'base/128.png', dir: '../' + aGlaf.resursData + id + '/128.png' }, function (e) {
                    });
                    php.load({ tip: 'copy', dirWith: '../' + aGlaf.resurs + 'base/256.png', dir: '../' + aGlaf.resursData + id + '/256.png' }, function (e) {
                    });

                    php.load({ tip: 'copy', dirWith: '../' + aGlaf.resurs + 'base/64.png', dir: '../' + aGlaf.resursData + id + '/64.png' }, function (e) {
                        let texture = {
                            id: id,
                            title: id.split('_')[1],
                            rx: 1,
                            ry: 1,
                            type: 'png',
                        };
                        self.objectBase.textures.unshift(texture);
                        aGlaf.save();
                        self.reDrag();
                        self._index = -1;
                        self.index = 0;
                    });
                });
            }
        });*/
    }

    grtMaxPlus() {
        var r = 0;
        var a = []
        for (var i = 0; i < this.objectBase.textures.length; i++) {
            a = this.objectBase.textures[i].id.split("_");
            if (a[1] * 1 > r) r = a[1] * 1;
        }
        r += 1;
        return r
    }

    sizeWindow (w, h) {
        this._width = w;
        this._height = h;
        this.w.height = h - this.whv - this.margin;
        this.w.x = w - this.widthBig;
    }

    set index (value) {
        if (this._index !== value && this.gallery.array[value] != undefined) {
            this._index = value;
            this.gallery.index = value;

            this.objDin = this.gallery.array[value].object;
            this.textureObject.setObj(this.objDin);
        }
    }

    get index () {
        return this._index;
    }

    set active (value) {
        if (this._active != value) {
            this._active = value;
            if (value == true) {
                this.dCont.add(this.w)
                this.reDrag()
            } else {
                this.dCont.remove(this.w)
            }
  
        }           
    }

    get active () {
        return this._active;
    }


    set sort (value) {
        if(this._sort!=value){
            this._sort=value; 

            localS.object.sortTex=value
            localS.save()
            //this.mSort.sort=value; 
            this.reDrag()             
        }            
    }

    get sort () {
        return this._sort;
    }


}

class TextureObject {
    constructor(par, name, _fun) {
        let self = this;
        this.type = 'TextureObject';

        this.par = par;
        this.name = name;
        this.fun = _fun;

        this.dCont = new DCont(this.par.w.content)
        this.dCont.visible=false

        this.param=this.par.param
        this.nameType=this.par.nameType

        this._width = 200;
        this.lineHeight = 32;
        this.margin = 2;

        this._height = 32;
        this._wh = 64;

        this._active = false;

        this.window = new DWindow(this.dCont, this.margin, 0, "textur");
        this.window.hasMinimizeButton = false;
        this.window.dragBool = false;
        this.window.width = this._width - this.margin ;


       

        this.info = new DCont(this.window)
        this.info.visible = this._active;
        this.info.y = this.lineHeight;

        this.panel = new DPanel(this.info, this.margin, this.margin);
        this.panel.width = this.panel.height = this._wh - this.margin;
        this.panel.color1 = "#777777"

        this.mBPic=new MBPic(this.window.content, this.margin, 80, function(s, p, p1){   
            if(s=="fileIcon"){ 

                mhbd.setFile(p,self.object,self.nameType,"icon", (s)=> {                                
                    mhbd.setParam(self.nameType,self.obj.id,"icon",s,(s1)=> {                                           
                        self.start();
                        self.save();
                        self.par.reDragBDIcon(self.obj.id, s); 
                    })                    
                })                
                return;
            } 
        })



        self.uploadI= function(file){ 
            mhbd.setFile(file ,self.object,self.nameType,"res", (s)=> {     
                self.image.link=s;
                self.start();
                self.save();
            })
        }


        this.save=function(){            
            
            var o={
                type: "PUT",
                url: this.param.server+this.nameType+"/"+this.obj.id+"/",
                data:{
                    json:JSON.stringify(this.object)
                },
                success: function function_name(data) { 

                },
                error:function function_name(data) {
                    console.error("не верная загрузка xz")
                }
            }

            o.headers = {
                'Authorization': 'Token ' + aGlaf.param.token
            };



            $.ajax(o);

        }

        this.sah=0
        this.saveTime=function(){
            this.sah++;
            var s=this.sah;
            setTimeout(function() {
                if(self.sah==s)self.save();
            }, 500);
        }


       


        this.size256But = new DButton(this.panel, 0, 0, '256', async () => {
            const width = Math.min(2 ** Math.floor(Math.log2(this.image.picWidth)), 256);
            const height = Math.min(2 ** Math.floor(Math.log2(this.image.picHeight)), 256);
            this.setResizedImage(width, height);
        });
        this.size512But = new DButton(this.panel, 0, 0, '512', async () => {
            const width = Math.min(2 ** Math.floor(Math.log2(this.image.picWidth)), 512);
            const height = Math.min(2 ** Math.floor(Math.log2(this.image.picHeight)), 512);
            this.setResizedImage(width, height);
        });
        this.resizeButton = new DButton(this.panel, 0, 0, "res", async () => {
            const width = 2 ** Math.floor(Math.log2(this.image.picWidth));
            const height = 2 ** Math.floor(Math.log2(this.image.picHeight));
            this.setResizedImage(width, height);
        });

        this.size256But.width = this.size512But.width = this.resizeButton.width = (this.window.width - this.panel.width) / 3 - this.margin * 2;
        this.size256But.height = this.size512But.height = this.lineHeight / 2 - this.margin * 2;
        this.resizeButton.height = this.lineHeight - this.margin * 2;

        this.size256But.x = this.panel.width + this.margin;
        this.size512But.x = this.size256But.x + this.size256But.width + this.margin;
        this.resizeButton.x = this.size512But.x + this.size512But.width + this.margin;

        this.size256But.visible = this.size512But.visible = this.resizeButton.visible = false;

        //this.nameLabel = new DLabel(this.panel, this.panel.width, this.margin, "null")
        //this.nameLabel.fontSize = 12
        this.resLabel = new DLabel(this.panel, this.panel.width, this.margin + 14, "null")
        this.resLabel.fontSize = 12;

        this.colorT = this.resLabel.colorText1;
        this.image = new DImage(this.panel, 0, 0, null, function () {
            self.image.width = self.image.height = self.panel.width;

            if (self.image.picWidth > self.image.picHeight) {
                self.image.height = self.panel.width * (self.image.picHeight / self.image.picWidth);
            }
            if (self.image.picWidth < self.image.picHeight) {
                self.image.width = self.panel.width * (self.image.picWidth / self.image.picHeight);
            }

            var a = self.image.link.split("/");
            var s = a[a.length - 1];
            if (s.length > 20) s = s.substr(0, 20) + "..";
            //self.nameLabel.text = s;
            self.resLabel.text = self.image.picWidth + "x" + self.image.picHeight + "px";

            self.size256But.visible = self.image.picWidth > 256 || self.image.picHeight > 256;
            self.size512But.visible = self.image.picWidth > 512 || self.image.picHeight > 512;

            if (Number.isInteger(Math.log2(self.image.picWidth)) && Number.isInteger(Math.log2(self.image.picHeight))) {
                self.resLabel.colorText1 = self.colorT;
                self.resizeButton.visible = false;
            } else {
                self.resLabel.colorText1 = '#ff0000';
                self.resizeButton.visible = true;
            }
        });
        this.image.width = this.image.height = this.panel.width;

        this.loadButton = new DButton(this.panel, this.image.x, this.image.y, " ", function (b) {
            self.uploadI(this.files[0]);
        });
        this.loadButton.alpha=0.0;

        //this.loadButton.width = this.window.width - this.margin * 2;
        //this.loadButton.x = this.window.width - this.loadButton.width - this.margin;
        //this.loadButton.height = this.lineHeight - this.margin * 2;
        this.loadButton.startFile();

        this.loadButton.width = this.loadButton.height = this.panel.width;



        this.rxInput = new DInput(this.info, 0, 34, "1", function () {            
            self.object.rx = this.value;

            self.texture.repeat.x = self.object.rx;

            self.saveTime();
        });


        this.ryInput = new DInput(this.info, 0, 34, "1", function () {

            self.object.ry = this.value;
            self.texture.repeat.y = self.object.ry;

            self.saveTime();
        });

        //this.rxInput.height = this.ryInput.height = this.loadButton.height;

        this.rxLabel = new DLabel(this.panel, 0, 34, "rx:");
        this.ryLabel = new DLabel(this.panel, 0, 34, "ry:");

        this.rxLabel.width = this.ryLabel.width = 22;
        this.rxInput.width = this.ryInput.width = (this.window.width - this.panel.width - this.rxLabel.width * 2 - this.margin * 2) / 2;
        this.rxLabel.x = this.panel.width + this.margin;
        this.rxInput.x = this.rxLabel.x + this.rxLabel.width;
        this.ryLabel.x = this.rxInput.x + this.rxInput.width;
        this.ryInput.x = this.ryLabel.x + this.ryLabel.width;

        this.rxInput.setNum(0.1);
        this.ryInput.setNum(0.1);

       /* this.titleLabel = new DLabel(this.info, this.margin, this.panel.y + this.panel.height + 8, "title:");
        this.titleLabel.width = 32;
        this.titleLabel.height = this.lineHeight;

        this.titleInput = new DInput(this.info, this.titleLabel.width + this.margin,
            this.panel.y + this.panel.height + this.margin,
            ' ', function () {
            self.objDin.title = this.value;
            self.fun(self.objDin);
        });
        this.titleInput.width = this.window.width - this.titleLabel.width - this.margin * 2;
        this.titleInput.height = this.lineHeight - this.margin * 2;*/

        this.info.visible = true;

        this.window.height=this.mBPic.y+this.mBPic.height+32;
        this._height  = this.lineHeight * 4;

        this.texture;
        this.start= function(){             
            var b=false;
            if(this.object==null){this.object={};b=true;}
            if(this.object.rx==undefined){this.object.rx=1;b=true;}
            if(this.object.ry==undefined){this.object.ry=1;b=true;}
            if(this.object.id== undefined){this.object.id=self.iiiiii;b=true;} 

            if(this.object.res==undefined){                
                this.object.res={src:"resources/image/notpic.png"};
                b=true;
            }
            
            this.ryInput.value = this.object.ry;
            this.rxInput.value = this.object.rx;

            this.texture=aGlaf.s3d.pm.tex.getById(this.object.id);

            var link="resources/image/notpic.png";
            if(this.object.res)if(this.object.res.src){
                link=this.object.res.src;
            }
            
            this.image.link=link


            this.mBPic.setObj(this.object);
        }   



        this.objId
        this.object
        this.obj
        self.objDin
        self.iiiiii
        this.setId = function(id){       
            self.iiiiii=id  

            var o={
                type: "GET",
                url: this.param.server+this.nameType+"/"+id+"/",
                success: function function_name(data) {
                    self.obj=data;
                    if(typeof data.json === "string") {
                        var conf = JSON.parse(data.json)
                        self.object = conf;
                    } else self.object = data.json; 
                    self.objDin=self.object
                    self.start(); 
                },
                error:function function_name(data) {
                    console.error("не верная загрузка textur")
                }
            }
            o.headers = {
                'Authorization': 'Token ' + aGlaf.param.token
            };

            $.ajax(o);
            this.dCont.visible=true
        }
    }

    setObj(objDin) {
      /*  this.objDin = objDin;
        this.ryInput.value = objDin.ry;
        this.rxInput.value = objDin.rx;
       // this.titleInput.value = objDin.title;
        this.redraw();*/
    }

    redraw() {
        this.image._link = '';
        this.image.link = '../' + aGlaf.resursData + this.objDin.id + '/' + 'pic.' + this.objDin.type;
    }

    async setResizedImage(width, height) {
        const type = this.image.link.split('.').pop();
        const img = await resizeImage(this.image.link, width, height, type);
        const resp = await uploadFile(img, this.image.link);
        if (resp === 'ok') {
            this.fun(this.objDin, true, true);
            this.redraw();
        }
    }

    async uploadImage(image) {

       /* if (image && image.size > 2096000) {
            aGlaf.menu.mInfo.setFun(
                "Фаил велик!!",
                "Сорян но не катит, фаил больше 2 метров, если очень нужно качество, то тестируем в слабом, а потом ручками меняем в директории resources/data/<<иди обьекта>>/textur/<<имя файла>>",
                function () {
                }
            );
            return
        }

        var type = image.name.split('.').pop();
        var imageMin = await resizeImageFile(image, 64, 64, type);
        var dest = '../' + aGlaf.resursData + this.objDin.id + '/' + '64.png';
   
        var resp = await uploadFile(imageMin, dest);

        if (resp !== 'ok') {
            return;
        }


        var type = image.name.split('.').pop();
        var imageMin = await resizeImageFile(image, 100, 100, type);
        var dest = '../' + aGlaf.resursData + this.objDin.id + '/' + '100.png';
        var resp = await uploadFile(imageMin, dest);
        if (resp !== 'ok') {
            return;
        }

        var type = image.name.split('.').pop();
        var imageMin = await resizeImageFile(image, 32, 32, type);
        var dest = '../' + aGlaf.resursData + this.objDin.id + '/' + '32.png';
        var resp = await uploadFile(imageMin, dest);
        if (resp !== 'ok') {
            return;
        }

        var type = image.name.split('.').pop();
        var imageMin = await resizeImageFile(image, 128, 128, type);
        var dest = '../' + aGlaf.resursData + this.objDin.id + '/' + '128.png';
        var resp = await uploadFile(imageMin, dest);
        if (resp !== 'ok') {
            return;
        }

        var type = image.name.split('.').pop();
        var imageMin = await resizeImageFile(image, 256, 256, type);
        var dest = '../' + aGlaf.resursData + this.objDin.id + '/' + '256.png';
        var resp = await uploadFile(imageMin, dest);
        if (resp !== 'ok') {
            return;
        }



        dest = '../' + aGlaf.resursData + this.objDin.id + '/' + 'pic.' + type;
        resp = await uploadFile(image, dest);
        if (resp !== 'ok') {
            return;
        }

        if (this.objDin.type !== type) {
            php.load({
                tip: 'unlink',
                dir: '../' + aGlaf.resursData + this.objDin.id + '/' + 'pic.' + this.objDin.type
            });

            this.objDin.type = type;
            this.fun(this.objDin, true);
            this.redraw();
        } else {
            this.fun(this.objDin, true, true);
            this.redraw();
        }*/
    }

    set visible(value) {
        if (this._visible == value) return;
        this._visible = value;

       /* if (value == true) {
            this.dCont.add(this.window)
        } else {
            this.dCont.remove(this.window)
        }*/

    }

    get visible() {
        return this._visible;
    }

    set height(v) {
        if (this._height == v) return;
        this._height = v;
    }

    get height() {
        return this._height;
    }
}

function resizeImageFile(file, width, height, type = 'png') {
    const reader = new FileReader(file);
    reader.readAsDataURL(file);

    return new Promise((res, rej) => {
        reader.onload = event => {
            res(resizeImage(event.target.result, width, height, type, file.name));
        };
    });
}

function resizeImage(src, width, height, type = 'png', fileName = '_') {
    return new Promise((res, rej) => {
        const img = new Image();
        img.src = src;
        const mime = type === 'png' ? 'image/png' : 'image/jpeg';
        img.onload = () => {
            const elem = document.createElement('canvas');
            elem.width = width;
            elem.height = height;
            const ctx = elem.getContext('2d');
            ctx.drawImage(img, 0, 0, width, height);
            ctx.canvas.toBlob((blob) => {
                const image = new File([blob], fileName);
                res(image);
            }, mime);
        };
    });
}

function uploadFile(file, dest) {
    let serverURL = php.server + "src/phpBase.php";
    let data = new FormData();
    data.append('tip', 'saveFile');
    data.append('file', file);
    data.append('dest', dest);

  

    return $.ajax({
        url: serverURL,
        dataType: 'text',
        cache: false,
        contentType: false,
        processData: false,
        data: data,
        type: 'post'
    });
}
