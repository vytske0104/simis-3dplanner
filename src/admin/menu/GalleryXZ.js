
export function GalleryXZ(dCont, _x, _y, _fun) {
    DGallery.call(this, dCont, _x, _y, _fun);
    var self=this             
    this.type="GalleryXZ";
   
    this.boolName=false

    this.downBtn = function () {
       

      /*  self.index = this.idArr;
        self.obj = self.array[this.idArr].object;*/

        if (self.fun) self.fun(this.idArr);
    };
    




    this.createZamen=function(){            
        var r=new BoxXZ(this.content, 0, 0, this.downBtn, this);            
        return r;
    }




    this.dragColorGal=function(){
        for (var i = 0; i < this.array.length; i++) {
            this.array[i].dragColorGal()
        }
    }    
}

GalleryXZ.prototype = Object.create(DGallery.prototype);
GalleryXZ.prototype.constructor = GalleryXZ;

Object.defineProperties(GalleryXZ.prototype, {

    index: {// Активный элемент
        set: function (value) {
            
            if (this.array[value] != undefined) {
                this.korektPoIndex(value);
            }
            
            this._index = value;
           

            for (var i = 0; i < this.array.length; i++) {
                if (this._index == i) this.array[i].activ = true;
                else this.array[i].activ = false;
            }

        },
        get: function () {
            return this._index;
        }
    },
})







function BoxXZ(dCont, _x, _y, _fun, par) {
    DBox.call(this, dCont, _x, _y, _fun);
    this.type = 'BoxXZ';
    var self=this
    this.par = par;




    this.dragColorGal=function(){
        if(this.object.c!=undefined){                    
            
            if(this._color1 != this.object.c){
                this._color1 = this.object.c;
                this.panel.color1=this._color1;
                this.draw()
            }
        }else{
         
            if(this._color1 != this.par._color1){
                this._color1 = this.par._color1;
                this.panel.color1=this._color1;
                this.draw();
            }
        }
    }
    this.butXZ=undefined

    this.startLoad = function (_obj) {
        this.object = _obj;
        

        //var link=aGlaf.resursData+""+_obj.id+"/64.png"+aGlaf.plusLink
        var link="resources/image/notpic.png";


        if(_obj.icon){
            link=_obj.icon;
        }

        
        this.dragColorGal();

      /*  if(_obj.arrTov!=undefined){
            
            if(this.butXZ==undefined){
                this.butXZ=new DButton(this,0,0,"",function(){

                })
                this.butXZ.fontSize=8
                this.butXZ.width=8
                this.butXZ.height=8


            }
            this.butXZ.text=""+_obj.arrTov.length
            this.butXZ.visible=true
        }else{
            if(this.butXZ)this.butXZ.visible=false
        }*/

       
        if(_obj.id!=undefined){
            this.label.visible=true


            var s=_obj.id
            if(this.par.boolName){
                s+=" "+_obj.name
                s=s.substr(0, 16)
            }


            this.label.text=s
            this.label.div.style.pointerEvents="none";
            this.label.fontSize=10;
        }
        
        
        this.image.visible = true;
        if (this.image.link == link) {
            if (self.funLoad) self.funLoad();
           
        } else {
            this.image.width = 100;
            this.image.height = 100;
            this.image.link = link;
        }
       
        this.draw();
    };

    this.draw = function () {
        var ss = (this._width - this._otstup * 2) / this.image.picWidth;
        if (ss > (this._height - this._otstup * 2) / this.image.picHeight)ss = (this._height - this._otstup * 2) / this.image.picHeight;
        this.image.x = 0;
        this.image.width=this.image.picWidth*ss;
        this.image.height=this.image.picHeight*ss;

        this.image.x = 2;
        this.image.y = 2;

        this.label.x = 2//(this._width - this.label.curW) / 2;
        this.label.y = this._height - this.label._fontSize-2;
/*
        if(this.butXZ){
            this.butXZ.x = this._width-this.butXZ.width-2
            this.butXZ.y = this.label.y
        }*/

        if (this.postDraw) this.postDraw();
    };

}
BoxXZ.prototype = Object.create(DBox.prototype);
BoxXZ.prototype.constructor = BoxXZ;









