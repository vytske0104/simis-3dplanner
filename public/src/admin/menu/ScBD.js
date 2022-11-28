

//import { GalleryXZ } from './GalleryXZ.js';

import { BlokGal } from './BlokGal.js';
import { MBPic } from './MBPic.js';


export  function ScBD(menu, fun) {  
    var self=this;
    this.type="ScBD";
    this.nameType="scenes3d";
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
  


    

    this.id=null
    
    

    this.mBPic=new MBPic(this.w.content, this.otstup, this.otstup, function(s, p, p1){ 
        trace(s, p, p1)   
        if(s=="fileIcon"){
            mhbd.saveFile(p,self.nameType,self.obj.id, (date)=> { 
                trace("dfgdgdgd", date)                 
                mhbd.clearFile(self.nameType,self.obj.iconId);  
                self.obj.iconId=date.id
                mhbd.setParam(self.nameType,self.obj.id,"iconId",date.id);
                
               // self.object.icon=date.src;
                self.obj.icon=date.src;

                mhbd.setParam(self.nameType,self.obj.id,"icon",date.src,function(){
                    trace("dfgdsgdsfgdf")
                    self.blokGal.redragGalleryall(self.blokGal._sort); 
                    self.mBPic.setObj(self.obj, self.nameType);  
                });

                //self.start();
               // self.save();
               // self.fun("reDragBDIcon",self.obj.id, date.src); 
                
                
            })
        } 
    })


    this.button = new DButton(this.w.content, 5, 65, "В дерево", function () {
        menuBig.menuThree.setObjcet(self.obj, self.nameType)     
    });
    this.button.width=this.w.width-10
    

    this.panel=new DPanel(this.w.content,this.otstup, this.otstup)
    this.panel.width=this.w.width-this.otstup*2
    this.panel.height=65+40
    this.panel.alpha=0.74
    this.panel.visible=true


    this.blokGal=new BlokGal(this.w.content, 5, this.button.y+34+5,this.nameType,function(s,p){
        if(s=="clik"){
            self.setId(p);
          /*  var id=self.obj.id;
           // self.setId(id);              
            let a=window.location.href.split("?");
            history.pushState(null, null, a[0]+'?'+self.nameType+'='+id);*/
        }
    })
    this.blokGal.width=this.widthBig-10





    this.redragTime=function(){
        aGlaf.plusLink="?x=" + Math.random();
        this.reDrag();
        setTimeout(function() {
            aGlaf.plusLink='';
        }, 500);
    }

 

  


    this.sizeWindow = function(w,h){
        this._width=w;
        this._height=h;
        this.w.height= h- this.whv- this.otstup;
        
       // this.gallery.height=this.w.height-this._wh32;
        self.blokGal.height=this.w.height-this._wh32-this.button.y-32;


    }


    var aZZ=[]
    this.reDrag=function(){ 
        self.blokGal.redragGalleryall(self.blokGal._sort);    
    }


    this.obj

    this.redrah= function(){
        self.active=true;
        if(this.id!==34562) this.panel.visible=false 
        else this.panel.visible=true 

        this.mBPic.setObj(this.obj, this.nameType)    

    }  

    this.setId = function(id, bool){
        //self.par.matObject.setId(id, bool);

        this.id =  id
        self.blokGal.setId(id, bool);
        mhbd.getKeyId(this.nameType,id,function(e){
            self.obj=e;
            self.redrah();
        })

       /* $.ajax({
            type: "GET",
            url: this.param.server+this.nameType+"/"+id+"/",
            success: function function_name(data) { 
                self.obj=data;
                self.redrah();
            },
            error:function function_name(data) {
                console.error("не верная загрузка textur")
            }
        });*/


        
    };

    this.dragParSort = function(sort,id){
        self.sort=sort;
        self.blokGal.sort=sort;        
    }
   
    Object.defineProperty(this, "index", {
        set: function (value) {
            this._index=value;
            this.objDin=undefined;         
            
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

    
}
