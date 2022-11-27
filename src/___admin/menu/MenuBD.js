//import { GalleryXZ } from './GalleryXZ.js';
import { BlokGal } from './BlokGal.js';
export   function MenuBD(menu, fun) {  
    var self=this   
    this.type="MenuBD";
    this.nameType="objects3d";
    this.par=menu;
    this._active=false
    this._sort=-2;  

    this.param = this.par.param;

    this.otstup=aGlaf.otstup;
    this.wh=aGlaf.wh;
    this._wh32 = 32;
    this.whv=aGlaf.whv;
    this.widthBig=aGlaf.widthBig;
    this.objectBase=this.par.objectBase;


    this.dCont=new DCont(this.par.dCont);

    this.w=new DWindow(null, 0, this.whv," ");
    this.w.width=this.widthBig;
    this.w.dragBool=false;
    this.w.hasMinimizeButton=false;


  /*  this.comboSort = new DComboBox(this.w, this.otstup, this.otstup, [], function() {
        self.sort = this.arrayXZ[this.index].id;
    });

    if(this.param.objects3d_sorts){
        var newArr=[];
        for (var i = 0; i < this.param.objects3d_sorts.length; i++) {
            newArr[i] = this.param.objects3d_sorts[i].name;
        }
        this.comboSort.array = newArr;
        this.comboSort.arrayXZ = this.param.objects3d_sorts;
        this.comboSort.width = this.w.width - this.otstup * 2;
        this.comboSort.height = this._wh32 - this.otstup;
    }else{
        this.comboSort.arrayXZ = [];
    }
    

    */

    

    this._width=100;
    this._height=100;

    this._index = -1;
    this.curObj3D = undefined;
        self.galClickIndx = 0


    this.blokGal=new BlokGal(this.w.content, 5, 5,this.nameType,function(s,p){
        if(s=="clik"){
            self.setId(p);
          /*  var id=self.obj.id;
           // self.setId(id);              
            let a=window.location.href.split("?");
            history.pushState(null, null, a[0]+'?'+self.nameType+'='+id);*/
        }
    })
    this.blokGal.width=this.widthBig-10    


   /* this.gallery = new GalleryXZ(this.w, this.otstup, this._wh32 + this.otstup * 2, function(ii){
        self.galClickIndx = ii
        self.par.dragPic.testDrag(15,self.clik,self.drag);
        //self.clik()
    })

    this.gallery.width=this.widthBig - this.otstup * 2;
    this.gallery.kolII=2;
    this.gallery.widthPic=46*2;
    this.gallery.heightPic=this.gallery.widthPic+14;
    this.gallery.boolName=true

*/

    this.dragColorGal=function(){
       // this.gallery.dragColorGal()
    }

    var naObj=undefined    
  /*  this.gallery.funOver=function(e){
        naObj=e;
    }

    this.gallery.funOut=function(){
        naObj=undefined;   
    }*/

    this.clik = function(){
        var id = self.gallery.array[self.galClickIndx].object.id;
        self.setId(id);
        let a = window.location.href.split("?");
        history.pushState(null, null, a[0]+'?'+self.nameType+'='+id);
    }

    this.startObj
    this.drag=function(){
        var o=self.gallery.array[self.galClickIndx].object;
        var l="resources/image/notpic.png";
        if(o.icon)l=o.icon;
        trace("@@@!!!!!!!",o.icon);
        self.par.dragPic.start(32, l, o);       
    }

    
    self.par.dragPic.addFunAp(function(){        
       /* var num=self.mSort.testXY(self.par.dragPic._x, self.par.dragPic._y); 
        if(num!=null){

            self.gallery.array[self.gallery.index].object.sort=num;
            self.reDrag()
            aGlaf.save();
            return
        }*/

        /*if(naObj!=undefined){
            if(aGlaf.menu.dragPic.object.id!=undefined){
                if(naObj.object && naObj.object.id){
                    if(aGlaf.menu.dragPic.object.id!=naObj.object.id){
                        var idS=aGlaf.menu.dragPic.object.id
                        var idNa=naObj.object.id


                        function zap (){                            
                            startPapis(idS,idNa)
                        }

                        if(aGlaf.durak==false){
                            zap()
                            return
                        }
                        self.par.mInfo.setFunInput(
                            "перезапись иконки",
                            "Картинка с тоскания запишеться в эту позицию, идишник с донора",
                            idS,           
                            function(){ 
                                zap();
                            }
                        ); 
                    }
                }
            }
        }*/
    })

    this.redragTime=function(){
        aGlaf.plusLink="?x=" + Math.random();
        this.reDrag()
        setTimeout(function() {
            aGlaf.plusLink='';
        }, 500);
    }

    var aZZ=[]
    this.reDrag=function() {

       /* for (var i = 0; i < this.comboSort.arrayXZ.length; i++) {
            if (this.comboSort.arrayXZ[i].id == this._sort) {
                this.comboSort.index = i;
                break;
            }
        }
        aZZ.length = 0;
        for (var i = 0; i < this.param.objects3d.length; i++) {
            if (this.param.objects3d[i].sort == this._sort) {
                aZZ.push(this.param.objects3d[i]);
            }
        }
        if (aZZ.length > 0) this.gallery.start(aZZ);
        else this.gallery.start(this.param.objects3d);
        
        this._updateGalInd();*/

        self.blokGal.redragGalleryall(self.blokGal._sort); 
    }

    this.reDragBDIcon=function(id,icon){        
        for (var i = 0; i < self.param.objects3d.length; i++) {          
            if(self.param.objects3d[i].id==id){
                self.param.objects3d[i].icon=icon;
                break
            }
        }
        this.reDrag()
    }

    this.sizeWindow = function(w,h){ 
        this._width=w;
        this._height=h;
        this.w.height= h- this.whv- this.otstup; 
        //this.gallery.height=this.w.height-32; 

        self.blokGal.height=this.w.height-this._wh32;
    }
    if(localS.object.sort==undefined)localS.object.sort=-2


    function startPapis(idS,idNa){
        
        const a=['32.png','64.png','100.png','128.png','256.png','original.png',
                'y32.png','y64.png','y100.png','y128.png','y256.png','yoriginal.png']

        for (var i = 0; i < a.length; i++) {            
            let link='../'+aGlaf.resursData + idS + '/'+a[i]
            let link1='../'+aGlaf.resursData + idNa + '/'+a[i]
            php.load({tip: 'copy', 
                dirWith:    link, 
                dir:        link1});

        }
    }

    this.iidd
    this.setId = function(id){
        self.par.menuObject.setId(id);
        self.iidd=id
        self.blokGal.setId(id)

        // Get sort of Object3D by id
       /* for (var i = 0; i < this.param.objects3d.length; i++) {
            if (this.param.objects3d[i].id == id) {
                this.curObj3D = this.param.objects3d[i];
                break;
            }
        }

        self.sort = this.curObj3D.sort;
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
        }*/
    }

    this._updateGalInd = function () {
        /*if (this.curObj3D) {
            for (var i = 0; i < this.gallery.arrayObj.length; i++) {
                if (this.gallery.arrayObj[i].id == this.curObj3D.id) {
                    this.gallery.index = i;
                    return;
                }
            }
        }
        this.gallery.index = 0;*/
    };

    Object.defineProperty(this, "index", {
        set: function (value) {            
            this._index=value;
           
            // this.gallery.index=value;
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
                    this.reDrag()
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

            if(this._sort!=value){
                this._sort=value; 

                localS.object.sort=value
                localS.save()
                // this.mSort.sort=value;
                this.reDrag()             
            }           
        },
        get: function () {
            return this._sort;
        }
    });
  
}

