



export class MLeftGal  {
    constructor(par, fun) {         
        this.type="MLeftGal";
        var self=this;
        this.par=par;
        this.fun=fun;
        this.param=this.par.param;
        this.dCont1=new DCont(); 
        this.par.dCont.add(this.dCont1)
        this.otstup=this.param.otstup
        this._active=false;

        

        this.dCont=undefined;
        this.oInfo = undefined;

        this.down=function(){         
            self.fun("indexStep",this.array[this.index].object.tId*1)
            //self.fun("indexStep",this.index+1);
        }  



        this.init=function(){
            
            if(this.dCont!=undefined)return
            this.dCont = new DCont();




           // new DPanel(this.dCont)
            this.oInfo = mhbd.objectBase.three.json.three; 


            if(window.localS.object.debug==false){
                let p=this.oInfo.array.length-1
                this.oInfo.array.splice(p,1);               
            }

            
            this.gallery = new GalleryXZ(this.dCont, 0, this.otstup, this.down,this);
            this.gallery.kolII=1;
            this.gallery.color=dcmParam.color1
            this.gallery.color1=dcmParam.color1
            this.gallery.widthPic=this.param.wb1;
            this.gallery.heightPic=this.param.wh;
            this.gallery.width=this.param.wb1;
            this.gallery.height=this.param.wh*this.oInfo.array.length;
            this.gallery.x=this.widthBig;
            this.gallery.y=-this.otstup;
            this.gallery.otstup=0; 
            this.gallery.finalLink=this.linkF
            this.gallery.boolScale=this.boolScale;
            this.gallery.start(this.oInfo.array); 
            this.gallery.panel.visible=false  

              
        }


    
        var w,h,s;
        this.sizeWin = function(_w,_h,_s){  
            if(_w){
                w= _w;
                h= _h; 
                s= _s              
            }         
        }
    }

    set active(value) {       
        if (this._active != value) {
            this._active = value;
            if(this._active==true){
                this.init()               
                this.dCont1.add(this.dCont)
            }else{               
                this.dCont1.remove(this.dCont)
            } 
        }
    }
    get active() {
        return this._active;
    }

    set indexStep(value) {       
        if (this._indexStep != value) { 
            this._indexStep = value;
            this.init();
            var p=-1;
            for (var i = 0; i < this.gallery.array.length; i++) {
                if(this.gallery.array[i].object.tId*1==value){
                    p=i;
                    break
                }
            } 
            this.gallery.index=p;            
        }
    }
    get indexStep() {
        return this._indexStep;
    }
}




//достроеный класс галерий
export class GalleryXZ extends DGallery {
    constructor(dCont, x, y, fun,par) { 
        super(dCont, x, y, fun); 
        this.par=par
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

    this.par=par;
    this.param=this.par.par.param;
    var b,link,ooo;
    // Добавление картинки и текста, пошаговая загрузка.
    this.startLoad = function (_obj) {  

        this.object=_obj
        ooo=mhbd.getKeyId(_obj.key,_obj.id)
       
        link=mhbd.getLink(ooo.icon)
        this.image.link = link;
        this.image.visible = true;
        this.label.bold=true;
        this.label.activMouse=false;
        this.label.text=ooo[languages.key]
        this.label.visible = true;

        this.panel.alpha=this.param.alpha
        self.funLoad();
    };


    var ss;
    this.draw = function () {


        ss = (this._width - this.param.otstup * 2) / this.image.picWidth;
        if (ss > (this._height - this.param.otstup * 2) / this.image.picHeight)ss = (this._height - this.param.otstup * 2) / this.image.picHeight;
       
        
        this.image.x = 0;
        
        this.image.width=this.image.height=this._height - this.param.otstup * 2;

        this.image.x = this.param.otstup
        this.image.y = (this._height - this.image.picHeight * ss) / 2;

        this.label.x = this.param.otstup*2+this.image.width;
        this.label.y = (this._height - this.label._fontSize )/2;
        if (this.postDraw) this.postDraw();
    };


}

BoxXZ.prototype = Object.create(DBox.prototype);
BoxXZ.prototype.constructor = BoxXZ;
Object.defineProperties(BoxXZ.prototype, {
    activ: { // активный элемент
        set: function (value) {
            if (this._activ == value) return;
            this._activ = value;
            if(this._activ==false){
                this.panel.color1=this._color1;
                this.panel.alpha=this.param.alpha
            }
            else {
                this.panel.color1=this._color;
                this.panel.alpha=this.param.alpha*1.75
            }


        },
        get: function () {
            return this._activ;
        }
    },
});