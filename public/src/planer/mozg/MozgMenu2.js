
import { MozgMenu } from './MozgMenu.js';

export class MozgMenu2 extends MozgMenu {
    constructor(par, fun) { 
        super(par, fun);         
        this.type="MozgMenu2";
        var self=this;
        this.sobIndex2=undefined
        this.facade=undefined
        this.param=this.par.param;

        this.init=function(){            
            if(this.dCont!=undefined)return
            this.sobIndex2=this.par.par.fManager.sobIndex[2]   
            this.facade=this.par.par.view.facade 
            
                

            this.dCont = new DCont();
            this.dCont.x=0
            this.dCont.y=this.param.wh*3+this.param.otstup*2

            this.gallery=new Gallery2(this.dCont, 0, 0, function(){                
                var o=this.array[this.index].object;
                var o1=mhbd.getKeyId(o.key, o.id);               
                self.sobIndex2.sobSP("creatObjDin", o1.id)
                visi3D.intRend=1;
            },this)
            this.gallery.kolII=1;
            this.gallery.widthPic=this.param.wh;
            this.gallery.heightPic=this.param.wh;
            this.gallery.otstup=0;
            this.gallery.width=this.param.wh+this.otstup*2;
            this.gallery.color=this.gallery.color1;
            this.gallery.panel.visible=false


            this.oInfo = mhbd.objectBase.three.json.three;
            var a=[]
            for (var i = 0; i < this.oInfo.array.length; i++) {
                if(this.oInfo.array[i].tId=="2"){
                    a=this.oInfo.array[i].array;
                }
            }

            if(window.localS.object.debug==false){
                for (var i = a.length - 1; i >= 0; i--) {
                    if(a[i].id==5)a.splice(i,1);  
                }            
            }


            this.gallery.height=(this.param.wh+this.otstup)*a.length+this.otstup;
            this.gallery.start(a);
            


          
           
        }

        this.dragActive=function(){
            if(this._active){
                this.facade.sp.worldBlok.visiBox=true

                this.facade.sp.razVisi=true;
                this.facade.sp.razWindow=true;
            }else{
                this.facade.sp.worldBlok.visiBox=false
                this.facade.sp.worldBlok.activeObject=undefined
            }

            visi3D.intRend=1
        }
    }

}

//достроеный класс галерий
export class Gallery2 extends DGallery {
    constructor(dCont, x, y, fun, par) { 
        super(dCont, x, y, fun); 
        this.par=par
        this.createZamen=function(){ 
            var r=new Box2(this.content, 0, 0, this.downBtn, this.intText, this);  
            r.whPic=this.whPic; 
            r.finalLink=this.finalLink       
            return r
        }      
    }
}






export function Box2(_cont, _x, _y, _fun,_intText, par) {
    DBox.call(this, _cont, _x, _y, _fun);
    this.type = 'Box2';
    var self = this;
    this.image.activMouse=false
    this.id=-1
    var b,link,ooo;
    this.panel.alpha=par.par.param.alpha;
    // Добавление картинки и текста, пошаговая загрузка.
    this.startLoad = function (_obj) {  
        

        this.object=_obj
        this.obj3d=mhbd.getKeyId(_obj.key,_obj.id)
        
       
      
        this.image.link = mhbd.getLink(this.obj3d.icon);
        this.image.visible = true;
        self.funLoad();

       /* this.label.visible=true
        this.label.text=""+_obj.id
        this.label.activMouse=false;
        this.label.fontSize=10*/
    };
}

Box2.prototype = Object.create(DBox.prototype);
Box2.prototype.constructor = Box2;
Object.defineProperties(Box2.prototype, {
    
});



