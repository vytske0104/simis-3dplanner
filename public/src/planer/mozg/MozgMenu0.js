
import { MozgMenu } from './MozgMenu.js';

export class MozgMenu0 extends MozgMenu {
    constructor(par, fun) { 
        super(par, fun);         
        this.type="MozgMenu0";
        var self=this;
        this._indexAngel=0

        this.oInfo = mhbd.objectBase.three.json.three;
        this.aaa=[]
        for (var i = 0; i < this.oInfo.array.length; i++) {
            if(this.oInfo.array[i].tId=="0"){
                this.aaa=this.oInfo.array[i].array;
            }
        }


        this.init=function(){            
            if(this.dCont!=undefined)return
            this.dCont = new DCont();
            this.facade=this.par.par.view.facade; 
            
                

           // this.dCont = new DCont();
            this.dCont.x=0
            this.dCont.y=this.param.wh*3+this.param.otstup*2

            this.gallery=new GalleryAngel(this.dCont, 0, 0, function(){               

                if(self.gallery.array.length-1==this.index){                    
                    self.indexAngel =self.indexAngel+1
                    return
                }
                self.setPlane(this.index)
                /*this.redragRect
                var s=this.array[this.index].object.s[0]
                var b=this.array[this.index].object.b[0]
                if(b===0)b=false
                if(b===1)b=true
                var a=s.split(",") 
                for (var i = 0; i < a.length; i++) {
                      a[i]=a[i]*1
                }  
                
                self.facade.sp.tc3Big.redragRect(self._indexAngel*Math.PI/2,a) */
            },this)
            this.gallery.kolII=1;
            this.gallery.widthPic=this.param.wh;
            this.gallery.heightPic=this.param.wh;
            this.gallery.otstup=0;
            this.gallery.width=this.param.wh+this.otstup*2;
            this.gallery.color=this.gallery.color1;
            this.gallery.panel.visible=false 

            this.oInfo = mhbd.objectBase.three.json.three;
            this.aaa=[]
            for (var i = 0; i < this.oInfo.array.length; i++) {
                if(this.oInfo.array[i].tId=="0"){
                    this.aaa=this.oInfo.array[i].array;
                }
            }
            this.gallery.height=(this.param.wh+this.otstup)*this.aaa.length+this.otstup;
           // this.gallery.start(this.aaa);
            this.gallery.indexAngel=this._indexAngel

            
        }

        this.setPlane = function (p) {
            trace("setPlane==",p)
            if(this.aaa[p]!=undefined){
                this.redragRect
                var s=this.aaa[p].s[0]
                var b=this.aaa[p].b[0]
                if(b===0)b=false
                if(b===1)b=true
                var a=s.split(",") 
                for (var i = 0; i < a.length; i++) {
                      a[i]=a[i]*1
                }  
                
                self.facade.sp.tc3Big.redragRect(self._indexAngel*Math.PI/2,a)
            }
        }


        this.setModel = function (s,p,p1) {
            
            if(s.indexOf("plane")!=-1){
                if(s=="plane"){                    
                    self.setPlane(p)
                    return
                }
                if(s=="planeAngel"){
                    self.indexAngel = p
                    return
                }
                if(s=="planeRect"){
                    self.facade.sp.tc3Big.setRect(p)
                    trace(s,p)
                    return
                }
            }
            
        }


        this.dragScan = function(_time){ 
            if(_time==undefined)_time=this.time            
            this.tween.stop()
            let oo=visi3D.getObj();
            visi3D.utility.focus.active=true;
            visi3D.utility.focus.targetObject=this.facade.sp.content3dBox;
            visi3D.fov = 15;
            visi3D.rotationX = 0;   
            visi3D.rotationZ = 0; 
            visi3D.render();
            oOldV3dNNN=visi3D.getObj();
            visi3D.utility.focus.active=false;
            visi3D.setObj(oo);
            visi3D.render();
            this.tween.to(oOldV3dNNN,_time).start();
        }




        this.time=500;      
        this.tween=new TWEEN.Tween(visi3D);
        var oOldV3d, oOldV3dNNN;
        var fov =45;
        var zM=2;
        this.dragActive=function(){           
            visi3D.rotationZ= (visi3D.rotationZ)%(Math.PI*2)
           
            if(this._active){
                

                oOldV3d = visi3D.getObj();

              /*  visi3D.utility.focus.active=true;
                visi3D.utility.focus.targetObject=this.facade.sp.content3dBox;
                visi3D.fov = 15;
                visi3D.rotationX = 0;   
                visi3D.rotationZ = 0; 
                visi3D.render();
                oOldV3dNNN=visi3D.getObj();
                visi3D.utility.focus.active=false;
                visi3D.setObj(oOldV3d);*/

                //oOldV3dNNN.zume*=zM;


/*
                oOldV3dNNN=visi3D.getObj();

                oOldV3dNNN.fov= 15;
                oOldV3dNNN.rotationX = 0;   
                oOldV3dNNN.rotationZ = 0; 
                //oOldV3dNNN.zume*=zM; */  

                this.dragScan()
                visi3D.position3d.boolDrahXZ = false;
                //this.tween.to(oOldV3dNNN,this.time).start();

                
                this.facade.sp.lineOpor=true;
                this.facade.sp.content3dPol.position.z=-this.facade.sp.minH+10
                this.facade.sp.boolMinH=true;  
               // this.facade.sp.razVisi=true;             
                
                this.facade.sp.razVisi = false;
                
            }else{
                this.facade.sp.content3dPol.position.z=0;
                visi3D.position3d.boolDrahXZ=true;

                this.tween.to(oOldV3d,this.time).start();                
                this.facade.sp.lineOpor=false;
                this.facade.sp.boolMinH=false;

                
            }
            visi3D.intRend=1
        }
    }
    set indexAngel(value) { 

        if (this._indexAngel != value) {
            this._indexAngel = value;            
            if(this._indexAngel>=4) this._indexAngel=0;
            if(this.gallery)this.gallery.indexAngel=this._indexAngel

        }
    }
    get indexAngel() {
        return this._indexAngel;
    }
}



//достроеный класс галерий
export class GalleryAngel extends DGallery {
    constructor(dCont, x, y, fun,par) { 
        super(dCont, x, y, fun); 
        this.par=par
        this._indexAngel=0;
        this.createZamen=function(){ 
            var r=new BoxAngel(this.content, 0, 0, this.downBtn, this.intText, this);  
            r.whPic=this.whPic; 
            r.finalLink=this.finalLink 
            r.indexAngel= this._indexAngel;    
            return r
        }      
    }
    set indexAngel(value) {       
        if (this._indexAngel != value) {
            this._indexAngel = value;
            for (var i = 0; i < this.array.length; i++) {
                this.array[i].indexAngel=value
            }

        }
    }
    get indexAngel() {
        return this._indexAngel;
    }  
}






export function BoxAngel(_cont, _x, _y, _fun,_intText, par) {
    DBox.call(this, _cont, _x, _y, _fun);
    this.type = 'BoxAngel';
    var self = this;
    this.image.activMouse=false
    this.id=-1;
    var b,link,ooo;
    this._indexAngel=0;
    this.panel.alpha=par.par.param.alpha;
    // Добавление картинки и текста, пошаговая загрузка.
    this.startLoad = function (_obj) {  
        

        this.object=_obj
        this.obj3d=mhbd.getKeyId(_obj.key,_obj.id)
        
       
      
        this.image.link = mhbd.getLink(this.obj3d.icon);
        this.image.visible = true;
        self.funLoad();

        /*this.label.visible=true
        this.label.text=""+_obj.id
        this.label.activMouse=false;
        this.label.fontSize=10*/
    };
    this.dragAngel = function () {  
        trace(this._indexAngel);
        if(this._indexAngel==0)rotateImg(this.image.image,0)
        if(this._indexAngel==1)rotateImg(this.image.image,Math.PI/2)
        if(this._indexAngel==2)rotateImg(this.image.image,Math.PI)
        if(this._indexAngel==3)rotateImg(this.image.image,Math.PI+Math.PI/2)                            
        
    }

    function rotateImg(img, angle) {
      var width = img.clientWidth, height = img.clientHeight;
      var sina = Math.sin(angle), cosa = Math.cos(angle);

      img.style.transform = "rotate(" + angle + "rad)";
      img.style.left = height*sina + "px";
      
      var parentStyle = img.parentElement.style;
      parentStyle.width = width*cosa + height*sina + "px";
      parentStyle.height = width*sina + height*cosa + "px";
    }

}

BoxAngel.prototype = Object.create(DBox.prototype);
BoxAngel.prototype.constructor = BoxAngel;
Object.defineProperties(BoxAngel.prototype, {
    indexAngel: { // цвет обводки
        set: function (value) {
            if (this._indexAngel == value) return;
            this._indexAngel = value;
            this.dragAngel();

        },
        get: function () {
            return this._indexAngel;
        }
    },
});
