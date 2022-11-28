
import { MozgMenu } from './MozgMenu.js';

export class MozgMenu4 extends MozgMenu {
    constructor(par, fun) { 
        super(par, fun);         
        this.type="MozgMenu4";
        var self=this;
        this.init=function(){            
            if(this.dCont!=undefined)return
            this.dCont = new DCont();

            this.dCont.x=this.param.otstup
            this.dCont.y=this.param.wh+this.param.otstup*4;

            this.panel=new  DPanel(this.dCont, 0,0) 
            this.panel.width=this.param.sizeBase;
            var bwh=(this.panel.width-this.otstup*3)/3-this.otstup;
            

            

            this.button=new DButton(this.panel, this.otstup, this.otstup,"save new", function(){
                
                
                
                self.save(function(o){
                    history.pushState(null, null, window.location.origin+"/?id="+o);
                    self.dragGal(function(){
                        
                    })
                })
            })
            this.button.width=this.panel.width-this.otstup*2;

            
            this.button1=new DButton(this.panel, this.otstup, this.otstup*2+32,"save this", function(){             
                var id=null
                var a= window.location.href.split("?id=")
                if(a.length==2 && a[1]*1){                
                    
                    id=a[1]*1
                }

                self.save(function(o){
                    history.pushState(null, null, window.location.origin+"/?id="+o);
                    self.dragGal(function(){
                        
                    })
                },id)
            })
            this.button1.width=this.panel.width-this.otstup*2;
            var a= window.location.href.split("?id=")
            if(a.length==2 && a[1]*1){                
                this.button1.activMouse=true
            }else{
                this.button1.activMouse=false
            }

            this.gallery=new Gallery1(this.panel, this.otstup, this.otstup*3+32*2, function(){
                if(this.array[this.index]){
                    var id= this.array[this.index].id
                    history.pushState(null, null, window.location.origin+"/?id="+id);
                    self.par.par.openId(id)
                    self.button1.activMouse=true
                }else{
                    history.pushState(null, null, window.location.origin+"/");
                    var r=200
                    self.par.par.view.facade.clear()
                    self.par.par.view.facade.roomPlus(
                        Math.random()*r-r/2,
                        Math.random()*r-r/2,
                        Math.random()*r+r/2,
                        Math.random()*r+r/2,
                    )
                    self.button1.activMouse=false

                    
                }
                visi3D.intRend=1;
            })

            this.gallery.kolII=3;
            this.gallery.widthPic=bwh;
            this.gallery.heightPic=bwh;
            this.gallery.otstup=this.otstup;
            this.gallery.width=this.panel.width-this.otstup*2;

            self.foto3d = new Foto3d(this.par.par.view.facade.content3d);



            this.save=function(fun,id){
                
              /*  var im=new DImage(this.panel,300,100)
                var b=this.foto3d.getBase64(200, 200)
                im.link=b
                return*/

                let idSave=1;               
                mhbd.setPHP({tip: 'getDiractFiles', dir: '../../resources/date/save/'}, function (e) {              
                    var a = e.split(",");                    
                    for (var i = 0; i < a.length; i++) {             
                        if(a[i]*1!=undefined){                            
                            if(a[i]*1>=idSave){
                                idSave=a[i]*1+1;
                            }
                        }
                    }  
                    if(id)   idSave= id             
                    mhbd.setPHP({tip: 'mkdir', dir: '../../resources/date/save/'+idSave}, function (e) {  
                        var l='../../resources/date/save/'+idSave+"/config.json";  
                        var json=  JSON.stringify(self.par.par.view.facade.getObj())     
                        mhbd.setPHP({tip:"saveJSON", link:l, text:json},function(e){
                            self.foto3d.getFile(200,200,function(e){
                                trace(l,e)
                                self.setFile(
                                    e,
                                    '../../resources/date/save/'+idSave+'/icon.png',                                    
                                    function(){
                                        fun(idSave);
                                    }
                                )
                            })
                        })
                    })
                })    
            }

            this.setFile=function(file,link,fun){  
                let data = new FormData();
                data.append('tip', 'saveFile');
                data.append('file', file);
                data.append('dest', link)//"../../resources/date/"+keyType+"/"+id+"/"+name);


                return $.ajax({
                    url: "src/component/MHBDPHP.php",
                    dataType: 'text',
                    cache: false,
                    contentType: false,
                    processData: false,
                    data: data,
                    type: 'post',
                    success: function function_name(data) {
                        fun()
                    }
                });

            }



            this.dragGal=function(fun){                
                var o={tip:"getFiles1",dir:"../../resources/date/save/",arrNot:["node_modules","hlam","date"]}
                mhbd.setPHP(o,function(date){                    
                    var a=JSON.parse(date); 
                    self.gallery.start(a);
                    let hh=self.gallery.scrollBarV.heightContent;
                    if(hh>300)hh=300;
                    self.gallery.height=hh;
                    self.panel.height=self.gallery.y+self.gallery.height+self.otstup;

                    var a= window.location.href.split("?id=")
                    if(a.length==2 && a[1]*1){                
                        var id=a[1]*1;
                        for (var i = self.gallery.array.length - 1; i >= 0; i--) {
                            if(self.gallery.array[i].id==id){
                                self.gallery._index=-2;
                                self.gallery.index=i;
                                return
                            }
                        }
                        self.openId(a[1]*1)                        
                    }



                    if(fun)fun();
                }) 
            }

            this.dragGal();   

        }



        this.dragActive=function(){

            
        }
    }
}



//достроеный класс галерий
export class Gallery1 extends DGallery {
    constructor(dCont, x, y, fun) { 
        super(dCont, x, y, fun); 

        this.createZamen=function(){ 
            var r=new Box1(this.content, 0, 0, this.downBtn, this.intText, this);  
            r.whPic=this.whPic; 
            r.finalLink=this.finalLink       
            return r
        }      
    }

    set index(value) {       
        ///if (this._index != value) {
            
            /*this._index = value;
            this.killTukIndex++;

            if (this.array[value] != undefined) {
                this.korektPoIndex(value);
            }
            if (this._index == value) return;
            this.killTukIndex=0*/
            if(this._index==value){
                value=-2
            }
            trace("@@@@@",this._index, value)
            this._index = value;
            
            for (var i = 0; i < this.array.length; i++) {
                if (this._index == i) {
                    this.array[i].activ = true;
                    this.killTukIndex=1
                }                   
                else {
                    this.array[i].activ = false;
                }
            }             
        //}
    }
    get index() {
        return this._index;
    }
}






export function Box1(_cont, _x, _y, _fun,_intText, par) {
    DBox.call(this, _cont, _x, _y, _fun);
    this.type = 'Box1';
    var self = this;

    this.id=-1
    var b,link,ooo;
    // Добавление картинки и текста, пошаговая загрузка.
    this.startLoad = function (_obj) {  
        var idS
        for(var s in _obj){
            this.id=s*1
        }

        this.object=_obj
        
       
        //link=mhbd.getLink(ooo.icon)
        this.image.link = "resources/date/save/"+this.id+"/icon.png?"+Math.random();
        this.image.visible = true;
        self.funLoad();

        this.label.visible=true
        this.label.text=""+this.id
        this.label.activMouse=false;
        this.label.fontSize=10
    };

    

}

Box1.prototype = Object.create(DBox.prototype);
Box1.prototype.constructor = Box1;
Object.defineProperties(Box1.prototype, {
 
});

export class Foto3d  {
    constructor(cont3d) { 
        
        var self=this;
        
        var wOld, hOld,x,z,zume,visOld;
        this.tip="image/png"
        this.getBase64 = function(w, h){

            let o=visi3D.getObj();
            wOld=visi3D.width;
            hOld=visi3D.height;

            visi3D.utility.focus.active=true;
            visi3D.utility.focus.targetObject=cont3d; 
            visi3D.sizeWindow(visi3D._x,visi3D._y,w,h);           
            visi3D.render();

            var r = visi3D.renderer.domElement.toDataURL(this.tip);

            visi3D.sizeWindow(visi3D._x,visi3D._y,wOld,hOld);

            visi3D.utility.focus.active=false;
            visi3D.setObj(o);/**/

            return r
        }

        this.getFile = function(w, h, fun){
            let base64=this.getBase64(w, h)
            resizeImageFile(base64,fun)
        }


        function resizeImageFile(b64, fun, _w, _h,_name, _boolB64) {            
            const img = new Image();
            img.onload = () => {
                //fun(img);
                const elem = document.createElement('canvas');
        
                if(_boolB64==undefined)
                if(_w!=undefined && _w > img.naturalWidth){
                    fun(null);
                    return;
                }
               

                elem.width = _w==undefined ? img.naturalWidth : _w;
                elem.height = _h==undefined ? img.naturalHeight : _h;
            
                const ctx = elem.getContext('2d');
                ctx.drawImage(img, 0, 0, elem.width, elem.height);

                if(_boolB64!=undefined){
                    let b6=elem.toDataURL()                    
                    fun(b6);
                    return 
                }
                ctx.canvas.toBlob((blob) => {
                    const image = new File([blob], _name==undefined ? "icon.png" : _name);
                    fun(image);
                }, 'image/png');                
            }
            img.src = b64;           
        }
    }
}


