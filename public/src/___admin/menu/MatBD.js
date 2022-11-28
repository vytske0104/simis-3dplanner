

//import { GalleryXZ } from './GalleryXZ.js';

import { BlokGal } from './BlokGal.js';

export  function MatBD(menu, fun) {  
    var self=this;
    this.type="MatBD";
    this.nameType="materials";
    this.par=menu;
    this._active=false
    this.param = this.par.param;

    this.otstup=aGlaf.otstup;
    this.wh=aGlaf.wh;
    this.whv=aGlaf.whv;
    this.widthBig=aGlaf.widthBig;
    this.objectBase=this.par.objectBase;

    this.objectBase=this.par.objectBase;
    this.dCont=new DCont(this.par.dCont);

    this._sort=-1;

    this.w = new DWindow(null, 0, this.whv,this.nameType);
    this.w.width=this.widthBig;
    this.w.dragBool=false;
    this.w.hasMinimizeButton=false;

    this._width=100;
    this._height=100;
    this._wh32 = 32;  // Для отступа шапки окна

    this._index=-1;
    this.objDin=undefined;
    this.iiiii



    this.blokGal=new BlokGal(this.w.content, 5, 5,this.nameType,function(s,p){
        if(s=="clik"){
            self.setId(p);
          /*  var id=self.obj.id;
           // self.setId(id);              
            let a=window.location.href.split("?");
            history.pushState(null, null, a[0]+'?'+self.nameType+'='+id);*/
        }
    })
    this.blokGal.width=this.widthBig-5

    


    this.creatMatXZ=function(s){
        var o={
            type: "POST",
            url: self.param.server+"materials/",
            success: function(e) { 
                mhbd.setParam("materials", e.id, "name", s,function(){
                    mhbd.setParam("materials", e.id, "sort", self.sort,function(){                        
                        self.param.materials.unshift(e)
                        self.reDrag()
                        self.iiiii=self.gallery.array.length-1
                        self.clik()
                    })
                });
            },
            error: function(gotData) {console.error(gotData); }
        } 
        
        $.ajax(o) 
    }





    this.clik=function(){
        var id=self.gallery.array[self.iiiii].object.id
        self.setId(id);              
        let a=window.location.href.split("?");
        history.pushState(null, null, a[0]+'?'+self.nameType+'='+id);
    }

    this.drag=function(){
        var o=self.gallery.array[self.iiiii].object;
        var l="resources/image/notpic.png";
        if(o.icon)l=o.icon;
        trace("@@@!!!!!!!",o.icon);
        
        self.par.dragPic.start(32, l, o);       
    }

    this.redragTime=function(){
        aGlaf.plusLink="?x=" + Math.random();
        this.reDrag();
        setTimeout(function() {
            aGlaf.plusLink='';
        }, 500);
    }

    this.creatMat = function(){
        var id="m_"+self.grtMaxPlus();

        function plus (_id){
            self.creatMatName(_id)
        }
        if(aGlaf.durak==false){
            plus(id)
            return
        }

        self.par.mInfo.setFunInput(
            "Создание матерьяла",
            "Задаюм имя идишника матерьяла, если такой есть то он не срабоает",
            id,
            function(){ 
                plus(self.par.mInfo.text);
            }
        );
    }

    this.creatMatName = function(name){  
        var b=true
        php.load({tip: 'getDiractFiles', dir: '../'+aGlaf.resursData}, function (e) {              
            var a = e.split(",");
            for (var i = 0; i < a.length; i++) {
                if(a[i]==name){
                    b=false
                }
            }

            if(b==false){
                self.par.mInfo.setFun("Такой иди есть!!","Удалите его в начале",function(){})                 
            }else{
                var id=name; 
                php.load({tip: 'mkdir', dir: '../'+aGlaf.resursData + id}, function (e) {                        
                    php.load({tip: 'copyDir', dirWith: '../'+aGlaf.resurs+'base/', dir: '../'+aGlaf.resursData + id + '/'}, function (e) {    
                        var o={id:id, title:"title_"+id, name:"name_"+id,key:"o_"+id}
                        self.objectBase.materials.unshift(o);
                        aGlaf.save();
                        self.reDrag();
                    });
                })
            }
        })
    }

    this.grtMaxPlus = function(){
        var r=0;
        var a=[]
        for (var i = 0; i < this.objectBase.materials.length; i++) {
            a=this.objectBase.materials[i].id.split("_");
            if(a[1]*1>r)r=a[1]*1;
        }
        r+=1;
        return r
    }

    this.sizeWindow = function(w,h){
        this._width=w;
        this._height=h;
        this.w.height= h- this.whv- this.otstup;
        
       // this.gallery.height=this.w.height-this._wh32;
        self.blokGal.height=this.w.height-this._wh32;


    }


    var aZZ=[]
    this.reDrag=function(){

       /* if(self.comboSort.arrayXZ==undefined)return;
        if(self.comboSort.arrayXZ.length==0)return;
        if(this._sort==-1){
            this.sort=self.comboSort.arrayXZ[0].id
            return;
        } 
   
        for (var i = 0; i < this.comboSort.arrayXZ.length; i++) {
            if(this.comboSort.arrayXZ[i].id==this._sort){
                this.comboSort.index=i;
                break;
            }
        }

        // Rebuild gallery content
        var b=-1;
        aZZ.length=0;
        for (var i = self.param.materials.length - 1 ; i >=0; i--) {
            if(self.param.materials[i].sort==self._sort) {
                aZZ.push(self.param.materials[i])
            }
        }
        if (aZZ) this.gallery.start(aZZ);*/ 
        trace("#reDrag#");   
        self.blokGal.redragGalleryall(self.blokGal._sort);    
    }


    this.reDragBDIcon=function(id,icon){
        for (var i = 0; i < self.param.materials.length; i++) {          
            if(self.param.materials[i].id==id){
                self.param.materials[i].icon=icon;
                break
            }
        }
        this.reDrag();
    }



    this.setId = function(id, bool){
        self.par.matObject.setId(id, bool);
        self.blokGal.setId(id, bool)       
    };

    this.dragParSort = function(sort,id){
        self.sort=sort;
        self.blokGal.sort=sort;
        /*for (var i = this.gallery.arrayObj.length - 1; i >= 0; i--) {
            if(this.gallery.arrayObj[i].id==id){
                self.index=i
                return
            }
        }*/
    }
   
    Object.defineProperty(this, "index", {
        set: function (value) {
            this._index=value;
            this.objDin=undefined;
            this.gallery.index=value;
            if(this.gallery.array[value]!=undefined){
                this.objDin=this.gallery.array[value].object;
                this.par.matObject.setObj(this.objDin);
                this.par.matObject.objDin=this.objDin;               
            }
        },
        get: function () {
            return this._index;
        }
    });

    Object.defineProperty(this, "active", {
        set: function (value) {
            if(this._active!=value){
                this._active=value;
                this.blokGal.active=value;
                if(value==true){
                    this.dCont.add(this.w)
                    this.reDrag();
                }else{
                    this.dCont.remove(this.w)
                }
            }
        },
        get: function () {
            return this._active;
        }
    });

    Object.defineProperty(this, "sort", {
        set: function (value) {
            if (this._sort == value) {
                return;
            }
            this._sort=value;
            this.reDrag();
        },
        get: function () {
            return this._sort;
        }
    });
}
