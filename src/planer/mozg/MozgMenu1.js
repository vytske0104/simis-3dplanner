
import { MozgMenu } from './MozgMenu.js';

export class MozgMenu1 extends MozgMenu {
    constructor(par, fun) { 
        super(par, fun);         
        this.type="MozgMenu1";
        var self=this;
        this._index=-1;

        this.oInfo = mhbd.objectBase.three.json.three;
        this.aaa=[]
        for (var i = 0; i < this.oInfo.array.length; i++) {
            if(this.oInfo.array[i].tId=="1"){
                this.aaa=this.oInfo.array[i].array;
            }
        }



        var aaa
        this.init=function(){            
            if(this.dCont!=undefined)return
            this.dCont = new DCont();
            this.facade=this.par.par.view.facade 
            
                

            //this.dCont = new DCont();
            this.dCont.x=0
            this.dCont.y=this.param.wh*3+this.param.otstup*2

            this.gallery=new Gallery2(this.dCont, 0, 0, function(){                
                /*var o=this.array[this.index].object;
                var o1=mhbd.getKeyId(o.key, o.id);               
                self.sobIndex2.sobSP("creatObjDin", o1.id)
                visi3D.intRend=1;*/

                if(self.gallery.array.length-1==this.index){
                    
                    self.index =self.index+1
                    return
                }
                self.setRoof(this.index)
                /*var s=this.array[this.index].object.s[0]
                var b=this.array[this.index].object.b[0]
                if(b===0)b=false
                if(b===1)b=true
                var a=s.split(",") 
                for (var i = 0; i < a.length; i++) {
                      a[i]=a[i]*1
                }  
                self.facade.sp.tc3Big.korectLineRoof(b,a) */   
               
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
                if(this.oInfo.array[i].tId=="1"){
                    this.aaa=this.oInfo.array[i].array;
                }
            }
            
            //this.index=0
          
        }


        this.bool=false;
        this.arr=[];
        var s=this.aaa[0].array[0].s[0]
        var b=this.aaa[0].array[0].b[0]
        if(b===0)b=false
        if(b===1)b=true
        var a=s.split(",") 
        for (var i = 0; i < a.length; i++) {
              a[i]=a[i]*1
        } 
        this.bool=b;
        this.arr=a;


        this.setRoof = function (p) {
            
            if(this.aaa[self.index].array[p]!=undefined){                
                var s=this.aaa[self.index].array[p].s[0]
                var b=this.aaa[self.index].array[p].b[0]
                if(b===0)b=false
                if(b===1)b=true
                var a=s.split(",") 
                for (var i = 0; i < a.length; i++) {
                      a[i]=a[i]*1
                }  

                this.bool=b;
                this.arr=a;

                self.facade.sp.tc3Big.korectLineRoof(b,a)
                
                /*self.facade.sp.tc3Big.redragRect(self._indexAngel*Math.PI/2,a)


                var s=this.array[this.index].object.s[0]
                var b=this.array[this.index].object.b[0]
                if(b===0)b=false
                if(b===1)b=true
                var a=s.split(",") 
                for (var i = 0; i < a.length; i++) {
                      a[i]=a[i]*1
                }  */
                

            }
        }


        this.setModel = function (s,p,p1) {
            
            if(s.indexOf("roof")!=-1){
                if(s=="roof"){                    
                    self.setRoof(p)
                    return
                }
                if(s=="roofAngel"){
                   
                    self.index=p
                    return
                }
                if(s=="roofMinMax"){                    
                    self.facade.sp.tc3Big.setMinMax(p,p1,this.bool,this.arr)
                    return
                }
            }
            
        }


        this.time=500;      
        this.tween=new TWEEN.Tween(visi3D);
        var oOldV3d, oOldV3dNNN;
        var fov =45;
        var zM=2;
        this.dragScan = function(_time){ 
            if(_time==undefined)_time=this.time            
            this.tween.stop()
            let oo=visi3D.getObj();
            visi3D.utility.focus.active=true;
            visi3D.utility.focus.targetObject=this.facade.sp.content3dBox;      
            visi3D.render();
            oOldV3dNNN=visi3D.getObj();
            visi3D.utility.focus.active=false;
            visi3D.setObj(oo);
            visi3D.render();
            this.tween.to(oOldV3dNNN,_time).start();
        }


        this.dragActive=function(){
            if(this._active){
                this.facade.sp.activeVephPoint=true;
                this.facade.sp.tc3Big.visible=true;
                this.facade.sp.osiPoint.visible=true;

                this.facade.sp.razVisi=true;
                this.facade.sp.razWindow=false;
                this.facade.sp.osiPoint.redrag()

            }else{
                this.facade.sp.activeVephPoint=false;
                this.facade.sp.tc3Big.visible=false;
                this.facade.sp.osiPoint.visible=false;
                facade.sp.info33But.setObject(null);

            }
            visi3D.intRend=1
        }
    }

    set index(value) {       
        if (this._index != value) {
            this._index = value;
            if(this.aaa[this._index]==undefined) this._index=0;
            this.gallery.height=(this.param.wh+this.otstup)*this.aaa[this._index].array.length+this.otstup;
            this.gallery.start(this.aaa[this._index].array);
        }
    }
    get index() {
        return this._index;
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

        /*this.label.visible=true
        this.label.text=""+_obj.id
        this.label.activMouse=false;
        this.label.fontSize=10*/
    };
}

Box2.prototype = Object.create(DBox.prototype);
Box2.prototype.constructor = Box2;
Object.defineProperties(Box2.prototype, {
    
});
