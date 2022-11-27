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
    this._activeVind=false

    this.dCont=new DCont(this.par.dCont);
    //this.dCont=new DCont(this.dCont);
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

        this.dCreatIcon.whFinal=64;
        this.dCreatIcon.glowColor="#555555";
        this.dCreatIcon.scane.dcDrow.sahShad=2;
        this.dCreatIcon.ch0.value=true;
        this.dCreatIcon.lineSah=10;


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

        this.butt1=new DButton(this.dCreatIcon.window,0,0,"Применить, вписать в обьект",function(){
            self.activeVind=!self._activeVind       
        })
        this.butt1.x=this.dCreatIcon.window.width-32; 
        this.butt1.width=32;
        this.butt1.link='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAAXNSR0IArs4c6QAABSZJREFUWEftl21MU1cYx8/LbUtfmNRlmAhCLWhZurkMEtQPzpgQNQ3IbLIoMM1EoF3BMaVgQwlkS0ooLRVjLS3B+TKKCXExk/iS+WkuwdSEbItzfumwRI0S7czKW0vvvWc5DV3AAaEo7svu53Of/+/8n+c85zwQAMAolUopQiiZ53kxIQQRQiBYgQ9CSCCEPIQwTAgJDQ8PT0ClUrlKo9G8t2XLlo/Gxsbe4jgOUwC6eAUYAMaYS05ODg0ODv5048aNuzAtLS3darUeKCsra10JwYVier3exoaGhl6Ynp6+wWw2l+v1etPVq1eH79+/75dIJH8BAHgAAJoJwCOEuOW6Qh3leZ6ZnJxMycnJyS4sLFS63e42i8XyDVQoFDlGo7G8urq63m63/+ByuQYghA/oD4QQGQVACI3xPD+OEGIBAMtJDSSE0PrKrqmp2WM0GneePn3aZrPZzs4BcLlc/e3t7ecwxn9ACN9xOp2fUQCdTneOEPJAJBKNi0Qi6kxCH8uykGEYaSgU2mQymcoNBsM+p9Npt9vtcx1wu919bW1tPQCAgMlkKtDr9d1Uqbu7u7KlpeX7p0+fvphJTUIAAACoUqkkExMTuWazuVKv15fNC+DxeLwUgGEYf2lp6QeVlZUNVKmnp8d6/vz5wUAgEFomAFKr1ZJQKPRhY2OjblEAq9XaHYlEfp+enhYWFRUpKMDAwMCD58+f/wkAiCS69Zn1SKVSSSORSF59fX2VwWAoWdABq9XqwRj/6vf7p9esWYNpgNHR0SgAgBZgwvmfAWCys7Pl0Wg0/+jRo+W1tbXaRQEkEsnP9+7dm5xV8cup/LhZmOafZdnMHTt27PF4PF8jhPBSARbaMW3VtEfEHAIAcDPuvAyKV69eLZXJZOs0Gs3Orq4uR5zq5MmTHQ6HY+4poEVIUzDLgfkAqDiTkZEhi0ajyTSgSCQKBQKBiZk0xSGwXC6XCYXCjJaWlr06na6Z7jwO0NnZ6Thx4sSZOX1gCQBUXJCamioXCoWZ169fL6cBd+3a1Y0QCjx69IieEuoGiot3dHTs02q1BrFYLJ9dwA6Hw2Gz2RICgGq1WvDs2TM5xnjDlStXanNzcz8mhJChoaGLRUVFHSzLBtavXz81MjKShDHOtFgsn5SUlFRLJJK3Xz49iQLAvLw85vHjxykIoY19fX1fbNu2TYsQYmjgkZER//79+y0PHz4cFIvFL8bHx1MrKio0zc3NXwkEAvF8RzcRgJj4kydPVsnlcpXFYjlcXFx86OWgPp/vVlVVVVcwGBzdvn37Jq/X27lYz1gqAKG2h8PhlKmpqexTp06Va7XawwsFvnnz5o8+n8/f1NS04Jr4v0sCUKvV9AqVh8PhDRcuXPi8oKCgdJmd8F+/LQogFAp/4ThumuO4FCp++fLlL/Pz8/dCCOPvg1fmmBfA7XZfpHdBUlLS3WAwKBAIBFmXLl2q3bx5czFCSPjKqrMCzAvgdDq/s9vtXo7j/Bjj2HugsLDwwOsUnrcG6urqDtfU1Bj7+/uH7ty545NKpcGsrKyNBw8e3LcS4jTmPw5kZma+SwGOHDlSt1Jii/aB/wH+cwfos/zYsWMVb7oG6Hsgdh2npaVtbGpqOkQHkzdZhC6Xq621tfUsXLt27br29vZP3/Ro1tvbaz5+/Pi3seF09+7d72/dujU2nLIsSyeiFZuOGYZh6XB6+/btW9euXfst9rxSKBQyjHEyISSJ53nM8/xr6/mz04oQis+YYY7jxgKBwPjfOaMFdcwtwrAAAAAASUVORK5CYII='


        this.label=new DLabel(this.dCreatIcon.window, this.dCreatIcon.window.width+22,10,"X")  
        this.label.activMouse=false;

        this.panel.div.addEventListener('mousedown', function(e){
            self.active=false;
        });   


        this.sizeWindow();

        dragPic.addFunAp(function(){
            if(self.active==false)return
            if(aGlaf.menu.dragPic.object!=undefined){            
                if(aGlaf.menu.dragPic.object.id!=undefined){
                    trace(">>>>",aGlaf.menu.dragPic.object)
                    var s=mhbd.getLink(aGlaf.menu.dragPic.object.icon)
                    self.dCreatIcon.scane.setPic(s, self.dCreatIcon.chPic.value)
                }
            }
        })
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
        if(this._activeVind==false){
            this.panel.width=w;
            this.panel.height=h; 
            this.panel.x=0
            this.dCreatIcon.x= (w- this.dCreatIcon.window.width)/2;
            this.dCreatIcon.y= (h- this.dCreatIcon.window.height)/2;
        }else{
            let ww=w-400;
            let hh=h;
            this.panel.x=400
            this.panel.width=ww;
            this.panel.height=hh; 

            this.dCreatIcon.x= this.panel.x+(ww- this.dCreatIcon.window.width)/2;
            this.dCreatIcon.y= (hh- this.dCreatIcon.window.height)/2;
        }              
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

    Object.defineProperty(this, "activeVind", {
        set: function (value) {            
            if(this._activeVind!=value){
                this._activeVind=value; 
                this.sizeWindow();         
                               
            }           
        },
        get: function () {
            return this._activeVind;
        }
    });
}

