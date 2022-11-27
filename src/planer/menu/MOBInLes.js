

import { MOBaza } from './MOBaza.js';

export class MOBInLes extends MOBaza {
  	constructor(par,fun) {  
        super(par,fun);
  		this.type="MOBInLes";
        this.typeNa="BInLes";
  		var self=this;       
        this.param=this.par.param
        this.dCont=new DCont(par.dCont);

        
        this.button=undefined;
        this.slid
        this.slid1
        this.bool=true
        this.array=[]
        this.postIn = function(){
           
            this.window.title="BInLes";


            this.oInfo = mhbd.objectBase.three.json.three; 
            
            var aa=[];
            let oo=  this.getName(this.oInfo,"a5525d90-71d0a947");

            if(oo.uuid=="a5525d90-71d0a947")    aa= oo.array;
            for (var i = 0; i < oo.array.length; i++) {
                if(oo.array[i].uuid=="a5525d90-71d0a947")aa= oo.array[i].array;
            }
            

            this.gallery = new GalleryXZ(this.window.content, this.otstup, this.otstup, function(){
                self.object.sah=this.index
                mxz.funFDO()
            });
            this.gallery.kolII=3;
            this.gallery.widthPic=64;
            this.gallery.heightPic=64;
            this.gallery.width=this.otstup+(this.gallery.widthPic+this.otstup)*this.gallery.kolII;
            this.gallery.height=this.otstup+(this.gallery.widthPic+this.otstup)*1;

            this.gallery.start(aa);   

        }

        this.getName=function(o, uuid){
            if(o.uuid==uuid){               
                return o
            }
            if(o.array){
                for (var i = 0; i < o.array.length; i++) {
                    let cc=this.getName(o.array[i], uuid)
                    if(cc!=null) return o.array[i]
                }
            }
            return null
        }

        
        
        this.drag=function(){
            if(self.bool!=false){
                this.gallery.index=self.object.sah

                
                trace(self.object)


              
            }            
        }

       

        this.postSO=function(){ 
            this.bool=true           
            //this.object.arrayClass[0].funDragMenu=this.drag
            this.drag()
        }
        this.clear=function(){
            if(this.object!=undefined){
                this.bool=true
                //this.object.arrayClass[0].funDragMenu=undefined;
            }
            this.active=false
        }

        this.sizeWindow = function(w,h,s){ 
            this.dCont.x=w/s-this.width       
        }
  	}

    set index(value) {
        if(this._index!=value){
            this._index= value;
                  
        }
    }  

}





//достроеный класс галерий
export class GalleryXZ extends DGallery {
    constructor(dCont, x, y, fun) { 
        super(dCont, x, y, fun); 

        this.createZamen=function(){ 
            var r=new BoxXZ(this.content, 0, 0, this.downBtn, this.intText, this);  
            r.whPic=this.whPic; 
            r.finalLink=this.finalLink       
            return r
        }      
    }
}






export function BoxXZ(_cont, _x, _y, _fun,_intText, par) {
    DBox.call(this, _cont, _x, _y, _fun);
    this.type = 'BoxXZ';
    var self = this;


    var b,link,ooo;
    // Добавление картинки и текста, пошаговая загрузка.
    this.startLoad = function (_obj) {  

        this.object=_obj
        ooo=mhbd.getKeyId(_obj.key,_obj.id)
       
        link=mhbd.getLink(ooo.icon)
        this.image.link = link;
        this.image.visible = true;
        self.funLoad();


        this.objText.ru=_obj.name;    
    };

     if(dcmParam.mobile==false){
        this.panel.div.removeEventListener("mouseout", this.mouseOut);
        this.image.image.removeEventListener("mouseout", this.mouseOut);

        this.panel.div.removeEventListener("mouseover", this.mouseOver);
        this.image.image.removeEventListener("mouseover", this.mouseOver);
       
    }

    this.funOut=undefined
    this.funOver=undefined
    this.mouseOver = function (e) {        
        self.boolOut = false;
        if(self._activ==false){
            if(self.color1_1==null)self.panel.color1=dcmParam.compToHexArray(dcmParam.hexDec(self._color1), -30);
            else self.panel.color1=self.color1_1
        }
        else {
            if(self.color_1==null)self.panel.color1=dcmParam.compToHexArray(dcmParam.hexDec(self._color), -30);
            else self.panel.color1=self.color_1
        } 
                      
        if(self.funOver==undefined) self.funOver=window.mCPodskazka.sobOver
        self.funOver(this);
        
    };

    this.mouseOut = function (e) {        
        if(self.funDragOwer!=undefined) {
            self.funDragOwer(self);
            return
        }
        self.finalColor() 
       
        if(self.funOut==undefined) self.funOut=window.mCPodskazka.sobOut
        self.funOut(this);
    }
    this.finalColor = function () {        
        if(self._activ==false)self.panel.color1=self._color1;
        else self.panel.color1=self._color;
    }

    if(dcmParam.mobile==false){
        this.panel.div.addEventListener("mouseout", this.mouseOut);
        this.image.image.addEventListener("mouseout", this.mouseOut);

        this.panel.div.addEventListener("mouseover", this.mouseOver);
        this.image.image.addEventListener("mouseover", this.mouseOver);
        window.mCPodskazka.setBuuton(self, {ru:"xzsdfsfsfsdfsdfsdf",en:"xsdfsdfsdfsdfsdfz"})
        
      

    }

}

BoxXZ.prototype = Object.create(DBox.prototype);
BoxXZ.prototype.constructor = BoxXZ;
Object.defineProperties(BoxXZ.prototype, {
 
});