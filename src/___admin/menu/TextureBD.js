
import { TexBDGal, TexBDXZ } from './TexBDGal.js';
import { MBPic } from './MBPic.js';

//import { GalleryXZ } from './GalleryXZ.js';

import { BlokGal } from './BlokGal.js';

import { SwitchPage } from '../../component/ui/SwitchPage.js';

export  class TextureBD {
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

        this.kolBlok=12;

        this._width = 100;
        this._height = 100;

        let butOffset = 32;

        this.iiiii


        //////////////////////////////YV9DN-UXEYX-D48VV-HNZ3Q-XJ3ZP



        this.blokGal=new BlokGal(this.w.content, 5, 5,this.nameType,function(s,p){
            if(s=="clik"){
                self.setId(p);
              /*  var id=self.obj.id;
               // self.setId(id);              
                let a=window.location.href.split("?");
                history.pushState(null, null, a[0]+'?'+self.nameType+'='+id);*/
            }
        })
        this.blokGal.width=this.widthBig-2
        this.blokGal.kolII=4


/*

        this.dCheckBox=new DCheckBox(this.w.content, aGlaf.otstup,  aGlaf.otstup, "Вкл сортировка",function(){
            self.reDrag();
        } )
        this.dCheckBox.width=this.w.width-32-aGlaf.otstup*4;
*/




/*
        var ww=30
        this.gal = new TexBDXZ(this.w.content, aGlaf.otstup, aGlaf.otstup, function(ii){ 
            this.index=ii;
            self.reDrag(true);
            localS.object.textSort1=this.index
            localS.save()
        });
        this.gal.width = this.widthBig-aGlaf.otstup*2;
        this.gal.height = ww+aGlaf.otstup*2;
        this.gal.kolII = 6;
        this.gal.widthPic = ww;
        this.gal.heightPic = ww;


        this.dComboBox=new DComboBox(this.w.content, aGlaf.otstup,  aGlaf.otstup+this.gal.y+this.gal.height, [],function(){
            self.reDrag(true);
            localS.object.textSort=this.index
            localS.save()
        } )
        this.dComboBox.width=this.w.width-32-aGlaf.otstup*2;



        this.b=new DButton(this.w.content, this.dComboBox.width+2, this.dComboBox.y, "+", function() {
            self.par.mInfo.setFunInput(
                "Создание матерьяла",
                "Хочеш новую текстуру :-)?",
                "Имя",
                function(){ 
                    
                    self.creatЕучегкXZ(self.par.mInfo.text)

                }
            );
        })
        this.b.width=this.b.height=this.dComboBox.height-2

        var tt={ru:"dfgdfg",en:"dfgh"}

        podskazka.setBuuton(this.b,tt)

        */



       /* this.bbb=false
        this.rere
        this.rere1
        mhbd.getKeyList("textures/sorts1",function(d){
            self.rere=d
            var a=[]
            a.push(self.param.obJgroup1[273])
            for (var i = 0; i < d.length; i++) {
                a.push(self.param.obJgroup1[d[i].iconId])
            }            
            self.gal.start(a)
            self.gal.index=0;

            mhbd.getKeyList("textures/sorts",function(d){
                self.rere1=d;
                var newArr=[];
                newArr[0]="все";
                for (var i = 0; i < d.length; i++) {
                    newArr[i+1] = d[i].name;
                }
                self.dComboBox.array = newArr;
                self.dComboBox.index=0;

                self.bbb=true


                if(localS.object.textSort==undefined)localS.object.textSort=0;
                if(localS.object.textSort1==undefined)localS.object.textSort1=0;

                self.dComboBox.index=localS.object.textSort;
                self.gal.index=localS.object.textSort1;

                self.reDrag();
            })
        })*/


    


        /////////////////////////////


       /* self.textures=[]
        for (var i = self.param.textures.length - 1; i >= 0; i--) {
            self.textures.push(self.param.textures[i])
        }




        this.gallery = new TexBDGal(this.w.content, aGlaf.otstup, 200, (ii) => {            
            this.iiiii=ii
            this.par.dragPic.testDrag(5, this.clik.bind(this), this.drag.bind(this));
        });
        this.gallery.width = this.w.width-aGlaf.otstup*2;
        this.gallery.kolII = 1;
        this.gallery.widthPic = this.w.width-aGlaf.otstup*4;
        this.gallery.heightPic = this.param.otMy;


        this.switchPage=new SwitchPage(this.w.content, 1, function(s,p){
            if(s=="sobKol"){
                self.setArr(undefined, p*self.kolBlok)                
            }
        }, this.param);
        this.switchPage.wh=24     
        this.switchPage.x=this.param.otstup*/

       


        this.textureObject = new TextureObject(this, ' ', (objDin, reload, dontSave) => {
           trace("objDin==",objDin)
            if(objDin=="redrag"){                 
                self.blokGal.redragGalleryall(self.blokGal._sort);  
                return
            }    


            if(objDin=="dragObj"){
                /*for (var i = 0; i < self.gallery.array.length; i++) {

                    if(self.gallery.array[i].object.id==reload.id){                       
                        self.gallery.array[i].label2.text=reload.name

                        return
                    }
                }*/

        
                self.blokGal.redragGalleryall(self.blokGal._sort);  
                return
            }

            
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





        

   

        var aform=[]

        var aZZ=[]
        var bb1,bb2
        this.reDrag=function(b){ 
            self.blokGal.redragGalleryall(self.blokGal._sort);  
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



        this.setId = function(id){ 
            self.textureObject.setId(id);
            self.blokGal.setId(id);
        }




    }

    find(objDinId) {
        let o = this.gallery.array.find(o => o.object.id === objDinId);
        return o && o.object;
    }

    show(objDin) {
        this.index = this.gallery.array.findIndex(o => o.object.id === objDin.id);
    }

    redragTime() {
        aGlaf.plusLink = "?x=" + Math.random();
        this.reDrag();
        setTimeout(function () {
            aGlaf.plusLink = '';
        }, 500);
    }

   





    sizeWindow (w, h) {
        this._width = w;
        this._height = h;        
        this.w.x = w - this.widthBig-aGlaf.otstup*2;
        this.textureObject.window.y = h-32*2-10-this.textureObject.window.height;
        this.w.height = this.textureObject.window.height+this.textureObject.window.y+34;
        this.blokGal.height=this.textureObject.window.y;
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
            this.blokGal.active = value;
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


//        this.dCont.visible=false



        this.param=this.par.param
        this.nameType=this.par.nameType

        this._width = 200;
        this.lineHeight = 32;
        this.margin = 2;

        this._height = 32;
        this._wh = 64;

        this._active = false;

        this.window = new DWindow(this.dCont, aGlaf.otstup, 0, "textur");
        this.window.hasMinimizeButton = false;
        this.window.dragBool = false;
        this.window.width = this._width - aGlaf.otstup*3 ;
        this.window.height = 222 ;

        var fs=10;
        var wh=24;
        var wh1=(this.window.width-aGlaf.otstup*4)/2
        var yy=aGlaf.otstup

        this.label = new DLabel(this.window.content, 2, yy, "name") 
        this.label.fontSize=fs   
        this.input = new DInput(this.window.content, 2, yy+fs+aGlaf.otstup, "имя", function () {
            mhbd.setParam("textures", self.obj.id,"name",this.value)
            self.obj.name=this.value;  
            self.fun("dragObj",self.obj)      
        });
        this.input.height=wh
        this.input.width=(this.window.width-aGlaf.otstup*2)
        yy+=this.label.fontSize+aGlaf.otstup*2+wh

        this.label1 = new DLabel(this.window.content, 2, yy, "rx") 
        this.label1.fontSize=fs   
        this.input1 = new DInput(this.window.content, 2, yy+fs+aGlaf.otstup, "имя", function () {
            self.obj.rx=this.value*1
            mhbd.setParam("textures", self.obj.id,"rx",self.obj.rx)
            
            self.xz()        
        });//this.setParam=function(keyType,id,param,value,fun){
        this.input1.height=wh
        this.input1.width=wh1
        this.input1.setNum(0.1);

        this.label2 = new DLabel(this.window.content,wh1+aGlaf.otstup*3, yy, "ry") 
        this.label2.fontSize=fs   
        this.input2 = new DInput(this.window.content, wh1+aGlaf.otstup*3, yy+fs+aGlaf.otstup, "имя", function () {
            self.obj.ry=this.value*1
            mhbd.setParam("textures", self.obj.id,"ry",self.obj.ry)
            self.xz()
        });
        this.input2.height=wh;   
        this.input2.width=wh1
        this.input2.setNum(0.1);
        

        yy+=this.label.fontSize+aGlaf.otstup*2+wh



        this.label3 = new DLabel(this.window.content, 2, yy, "textur") 
        this.label3.fontSize=fs   
        this.button = new DButton(this.window.content, 2, yy+fs+aGlaf.otstup, " ", function (b) { 
            resizeImageFile(b,function(r){         
                mhbd.saveFile(r,"textures",self.obj.id, (date)=> { 
                    mhbd.clearFile("textures",self.obj.resId); 
                    self.obj.resId=date.id
                    mhbd.setParam("textures",self.obj.id,"resId",date.id);
                    mhbd.setParam("textures",self.obj.id,"res",date.src);                  
                    self.obj.res=date.src;
                    self.button.link=mhbd.getLink(date.src)                    
                })
            })
            this.link=b
            self.xz(b)
        });
        this.button.height=wh1;
        this.button.width=wh1;
        this.button.color="#dddddd"
        this.button.funLoadImag=function(){
            var s="id:"+self.obj.id+" "+self.button.image.picWidth+"x"+self.button.image.picHeight+"px";       
            self.window.title=s
            self.window.button.color=dcmParam._color
            if(self.test222(self.button.image.picHeight)==false)self.window.button.color="#ff3333"
        }
        this.button.startFile();
     
       
         



        this.label5 = new DLabel(this.window.content, wh1+aGlaf.otstup*3, yy, "icon") 
        this.label5.fontSize=fs   
        this.button1 = new DButton(this.window.content, wh1+aGlaf.otstup*3, yy+fs+aGlaf.otstup, " ", function (b) {
            self.saveIcon(b);        
        });
        this.button1.height=wh*2;
        this.button1.width=wh*2;
        this.button1.color="#dddddd"; 

        this.button1.startFile();

        this.label6 = new DLabel(this.window.content, wh1+aGlaf.otstup*5+wh*2, yy, "get3d") 
        this.label6.fontSize=fs   
        this.button2 = new DButton(this.window.content, wh1+aGlaf.otstup*5+wh*2, yy+fs+aGlaf.otstup, "<<", function () {
            resizeI546()        
        });
        this.button2.height=wh;
        this.button2.width=wh;

        yy+=wh1+46

        this.window.height = yy;

        this.panel=new DPanel(this.window,0,0)
        this.panel.width=  this.window.width
        this.panel.height=  this.window.height
            
        this.panel.alpha=0.5

        this.saveIcon= function(b){     
            
            resizeImageFile(b,function(r){         
                mhbd.saveFile(r,"textures",self.obj.id, (date)=> { 
                    mhbd.clearFile("textures",self.obj.iconId); 
                    self.obj.iconId=date.id
                    mhbd.setParam("textures",self.obj.id,"iconId",date.id);
                    mhbd.setParam("textures",self.obj.id,"icon",date.src);                  
                    self.obj.icon=date.src;

                    self.fun("redrag")
                })
            })
            self.button1.link=mhbd.getLink(b)
        }


         var tt    
        this.xz= function(b){              
            if(aGlaf.s3d.pm.tex.textureCache[self.obj.id]){
                tt=aGlaf.s3d.pm.tex.textureCache[self.obj.id].texture
                if(b!=undefined){
                    const img = new Image();
                    const path = window.location.href.split('/');
                    path.pop();
                    img.onload=function(){
                        tt.image = img;
                        tt.needsUpdate = true;
                    }
                    img.src = b;
                    img.crossOrigin=null
                    return
                }
                
                tt.repeat.x=self.obj.rx
                tt.repeat.y=self.obj.ry             
            }
        }

        this.texture;
        this.start= function(){             
            var b=false;
            this.panel.visible=false
            this.input.value=self.obj.name;
            this.input1.value=self.obj.rx;
            this.input2.value=self.obj.ry;            
            if(self.obj.res)this.button.link=mhbd.getLink(self.obj.res);
            
            this.button1.link=mhbd.getLink(self.obj.icon); 


            if(self.obj.json){

            }          
        }   

        var aadfa=2
        this.test222= function(n){    
             aadfa=2
            for (var i = 0; i < 20; i++) {
                if(n==aadfa)return true
                aadfa*=2;
                
            }
            return false
        }

        this.objId
        this.object
        this.obj
        self.objDin
        self.iiiiii
        this.setId = function(id){       
            self.iiiiii=id  

            mhbd.getKeyId(this.nameType,id,function(data){
                self.obj=data;
                    
                if(typeof data.json === "string") {
                    var conf = JSON.parse(data.json)
                    self.object = conf;
                } else self.object = data.json; 
                self.objDin=self.object;
                self.start();
            })

           /* var o={
                type: "GET",
                url: this.param.server+this.nameType+"/"+id+"/",
                success: function function_name(data) {
                    self.obj=data;
                    
                    if(typeof data.json === "string") {
                        var conf = JSON.parse(data.json)
                        self.object = conf;
                    } else self.object = data.json; 
                    self.objDin=self.object;
                    self.start(); 
                },
                error:function function_name(data) {
                    console.error("не верная загрузка textur")
                }
            }
            o.headers = {
                'Authorization': 'Token ' + aGlaf.param.token
            };

            $.ajax(o);*/

            this.dCont.visible=true
        }


        function resizeImageFile(b64, fun, _w, _h,_name, _wh) {            
            const img = new Image();
            img.onload = () => {
                //fun(img);
                const elem = document.createElement('canvas');
        
                if(_wh==undefined){
                    if(_w!=undefined && _w > img.naturalWidth){
                        fun(null);
                        return;
                    }
                    elem.width = _w==undefined ? img.naturalWidth : _w;
                    elem.height = _h==undefined ? img.naturalHeight : _h;
                }else{
                    var s=img.naturalWidth/_wh;
                    if(s<img.naturalHeight/_wh)s=img.naturalHeight/_wh;
                    elem.width = Math.round(img.naturalWidth/s);
                    elem.height = Math.round(img.naturalHeight/s);   
                }

   
            
                const ctx = elem.getContext('2d');
                ctx.drawImage(img, 0, 0, elem.width, elem.height);

                ctx.canvas.toBlob((blob) => {
                    const image = new File([blob], _name==undefined ? "icon.png" : _name);
                    fun(image);
                }, 'image/png');

               /* var down = document.createElement('a');
                down.href = elem.toDataURL();
                down.download = 'pic.png';
                down.click();*/               
            }
            img.src = b64;           
        }



        function resizeI546() {  
            var d=aGlaf.visi3D.utility.debug;
            aGlaf.visi3D.utility.debug=false;
            aGlaf.s3d.sHelp.content3d.visible=false;
            var sk=aGlaf.visi3D.utility.sky.active;
            aGlaf.visi3D.utility.sky.active=false;


            var alpha=true;
            var color=0xffffff;

            if(aGlaf.visi3D.alpha==false){
                alpha=false;            
                aGlaf.visi3D.renderer.setClearColor(color, 1);
            }

            var ww=aGlaf.visi3D._width
            var hh=aGlaf.visi3D._height
            
            aGlaf.visi3D.sizeWindow(0,0,100,100)
            aGlaf.visi3D.render();



            var base64 = aGlaf.visi3D.renderer.domElement.toDataURL("image/png");
            
        
            self.saveIcon(base64)
          


            
            aGlaf.visi3D.sizeWindow(0,0,ww,hh)
            aGlaf.visi3D.utility.debug=d
            aGlaf.s3d.sHelp.content3d.visible=true
            aGlaf.visi3D.utility.sky.active=sk

            if(alpha==false){
                aGlaf.visi3D.renderer.setClearColor(aGlaf.visi3D.color, 1);
                
            }
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
       /* this.image._link = '';
        this.image.link = '../' + aGlaf.resursData + this.objDin.id + '/' + 'pic.' + this.objDin.type;*/
    }

    async setResizedImage(width, height) {
        /*const type = this.image.link.split('.').pop();
        const img = await resizeImage(this.image.link, width, height, type);
        const resp = await uploadFile(img, this.image.link);
        if (resp === 'ok') {
            this.fun(this.objDin, true, true);
            this.redraw();
        }*/
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
    /*let serverURL = php.server + "src/phpBase.php";
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
    });*/
}
