

export function TexBDGal(dCont, _x, _y, _fun) {
    DGallery.call(this, dCont, _x, _y, _fun);
    var self=this             
    this.type="TexBDGal";
   
  

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

TexBDGal.prototype = Object.create(DGallery.prototype);
TexBDGal.prototype.constructor = TexBDGal;

Object.defineProperties(TexBDGal.prototype, {

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

    this.label2=new DLabel(this,30,12)
    this.label2.fontSize=14;
    this.label2.activMouse=false;
    this.label2.width=322;


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
        this.label2.text=_obj.name
        
        this.dragColorGal();      

       
        if(_obj.id!=undefined){
            this.label.visible=true
            this.label.text=_obj.id
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
        var ss = (this._width - 4) / this.image.picWidth;
        if (ss > (this._height - 4) / this.image.picHeight)ss = (this._height - 4) / this.image.picHeight;
        this.image.x = 0;
        this.image.width=this.image.picWidth*ss;
        this.image.height=this.image.picHeight*ss;

        this.image.x = 2;
        this.image.y = 2;

        this.label.x = 32
        this.label.y = 2;

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






















export function TexBDXZ(dCont, _x, _y, _fun) {
    DGallery.call(this, dCont, _x, _y, _fun);
    var self=this             
    this.type="TexBDXZ";
   
  

    this.downBtn = function () {
       

      /*  self.index = this.idArr;
        self.obj = self.array[this.idArr].object;*/

        if (self.fun) self.fun(this.idArr);
    };
    




    this.createZamen=function(){            
        var r=new BoxXZ2(this.content, 0, 0, this.downBtn, this);            
        return r;
    }




    this.dragColorGal=function(){
        for (var i = 0; i < this.array.length; i++) {
            this.array[i].dragColorGal()
        }
    }    
}

TexBDXZ.prototype = Object.create(DGallery.prototype);
TexBDXZ.prototype.constructor = TexBDXZ;

Object.defineProperties(TexBDXZ.prototype, {

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







function BoxXZ2(dCont, _x, _y, _fun, par) {
    DBox.call(this, dCont, _x, _y, _fun);
    this.type = 'BoxXZ2';
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
            this.label.text=_obj.id
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

        trace("++", this.object)
        if(this.object.texts){
            podskazka.setBuuton(self, this.object.texts,"funOver","funOut"); 
        }

       /* mhbd.getKeyId(k,this.object.id,function(e){
            self.image.visible = true;
            self.image.link=e.icon;
            self.objectKey =e


            if(self.par.bHelp){
                if(e && e.texts && e.texts["ru"]){           
                    podskazka.setBuuton(self, e.texts,"funOver","funOut")   
                }
                
            }
        })*/ 
       
        this.draw();
    };

    this.draw = function () {
        var ss = (this._width - this._otstup * 2) / this.image.picWidth;
        if (ss > (this._height - this._otstup * 2) / this.image.picHeight)ss = (this._height - this._otstup * 2) / this.image.picHeight;
        this.image.x = 0;
        this.image.width=this.image.picWidth*ss;
        this.image.height=this.image.picHeight*ss;

        this.image.x = (this._width - this.image.picWidth * ss) / 2;
        this.image.y = (this._height - this.image.picHeight * ss) / 2;

        this.label.x = 2//(this._width - this.label.curW) / 2;
        this.label.y = this._height - this.label._fontSize;
/*
        if(this.butXZ){
            this.butXZ.x = this._width-this.butXZ.width-2
            this.butXZ.y = this.label.y
        }*/

        if (this.postDraw) this.postDraw();
    };

}
BoxXZ2.prototype = Object.create(DBox.prototype);
BoxXZ2.prototype.constructor = BoxXZ2;











