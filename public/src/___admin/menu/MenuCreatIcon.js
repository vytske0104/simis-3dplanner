//import { GalleryXZ } from './GalleryXZ.js';
import { BlokGal } from './BlokGal.js';
export   function MenuCreatIcon(menu, fun) {  
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


    this.dCont=new DCont(this.par.par.dCont);
    this.dCont1=new DCont();


    this.panel

    this.init=function(){
        if(this.panel!==undefined)return
        this.panel=new DPanel(this.dCont1, 0, 0); 

        this.dCreatIcon = new DCreatIcon(this.dCont1,this.param.otstup,this.param.otstup,"xz",function(s,p){
                
        })

        this.dCreatIcon.window.hasMinimizeButton=false
        this.dCreatIcon.window.dragBool=false
        this.dCreatIcon.window.color=dcmParam.compToHexArray(dcmParam.hexDec(dcmParam.color), 200);

        this.dCreatIcon.whFinal=64
        this.dCreatIcon.glowColor="#555555";
        this.dCreatIcon.scane.dcDrow.sahShad=2
        this.dCreatIcon.ch0.value=true
        this.dCreatIcon.lineSah=10


        this.button=new DButton(this.dCreatIcon.window,0,0,"Применить, вписать в обьект",function(){
            var s = self.dCreatIcon.scane.dcDrow.canvas.toDataURL();
            resizeImageFile(s, function(s1){
                    if(self.funDin)self.funDin(s1);
                    self.active=false;
                },
                self.dCreatIcon.whFinal,
                self.dCreatIcon.whFinal,
                "xz",
                true
            )
            //0,0,100,100
            
        })
        this.button.width=this.dCreatIcon.window.width; 

        this.label=new DLabel(this.dCreatIcon.window, this.dCreatIcon.window.width+22,10,"X")  
        this.label.activMouse=false;

        this.panel.div.addEventListener('mousedown', function(e){
            self.active=false;
        });   


        this.sizeWindow()
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
    this.funDin
    this.setFun= function(_fun){
        this.funDin=_fun;
        this.active=true;
    }



    this.reDrag = function () {
       
    };

    var w,h,s
    this.sizeWindow = function(_w,_h,_s){
        if(_w){
            w=_w;
            h=_h;
            s=_s;
        }  
        if(!this._active){
            return;
        } 

        this.panel.width=w;
        this.panel.height=h; 

        this.dCreatIcon.x= (w- this.dCreatIcon.window.width)/2;
        this.dCreatIcon.y= (h- this.dCreatIcon.window.height)/2;      
    }

    Object.defineProperty(this, "active", {
        set: function (value) {            
            if(this._active!=value){
                this._active=value; 
                         
                if(value==true){
                    this.init()
                    this.dCont.add(this.dCont1)
                    this.reDrag()
                }else{
                    this.dCont.remove(this.dCont1)
                }                
            }           
        },
        get: function () {
            return this._active;
        }
    });

  
}

