export class MCCxzxz  {
    constructor(par,cont,fun) {    
        this.type="MCCxzxz";
        this.fun=fun
        this.par=par
        this.param=par.param
        var self=this;

        this._active = false;  

        
        this.dCont=new DCont(cont)
        this.dCont.visible=this._active;  

        // this._index = -1
        this.array = []
        this.init=function(){
            if(this.w!==undefined)return

            this.w=new DPanel(this.dCont, 0, 0);
            this.w.width=250
            this.w.height=350
            this.w.dragBool=false;
            this.w.hasMinimizeButton=false;

            this.gallery=new Gall33(this.w.content, 0, 0 ,function(ii){
                self.index = this.index
                self.fun("retJson", this.array[this.index].object.id, "group1")
            })

            this.gallery.width=this.w.width
            this.gallery.height=this.w.height
            this.gallery.kolII=4;
            this.gallery.widthPic=(this.w.width-10)/this.gallery.kolII//45;
            this.gallery.heightPic=this.gallery.widthPic;

            var o={}
            o.url= this.param.server+ "group1/";
            o.type="GET";
            o.success = function (response) { 

                let aa=[]
                for (var i = 0; i < response.length; i++) aa.unshift(response[i])

                self.gallery.start(aa)
            };
            $.ajax(o);
        }
                
        this.init()
        
    }

    set objID(value) {
        if (this._objID != value) {
            this._objID = value;   
            for (var i = 0; i < this.gallery.array.length; i++) {
                if (this.gallery.array[i].object.id==value) this.gallery.index=i;
            }
        }            
    }
    get objID() { return this._objID; }

    set active(value) {
        if (this._active != value) {
            this._active = value;   
            this.dCont.visible=this._active;  
            this.init()
                                          
        }             
    }
    get active() { return this._active; }

}













function Gall33(dCont, _x, _y, _fun) {
    DGallery.call(this, dCont, _x, _y, _fun);
    var self=this             
    this.type="Gall33"; 

    this.createZamen=function(){            
        var r=new BoxXZ(this.content, 0, 0, this.downBtn, this);            
        return r;
    }




    // this.dragColorGal=function(){
    //     for (var i = 0; i < this.array.length; i++) {
    //         this.array[i].dragColorGal()
    //     }
    // }    
}

Gall33.prototype = Object.create(DGallery.prototype);
Gall33.prototype.constructor = Gall33;

Object.defineProperties(Gall33.prototype, {

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
        get: function () { return this._index; }
    },
    
})


function BoxXZ(dCont, _x, _y, _fun, par) {
    DBox.call(this, dCont, _x, _y, _fun);
    this.type = 'BoxXZ';
    var self=this
    this.par = par;

/*
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
    }*/
    this.label.fontSize=12;
    this.label.activMouse=false


    this.startLoad = function (_obj) {
        this.object = _obj;

        this.label.text=_obj.param;
        this.label.visible=true
      
    
        self.funLoad();
        //var link=aGlaf.resursData+""+_obj.id+"/64.png"+aGlaf.plusLink
        var link="resources/image/notpic.png";


        if(_obj.icon){
            link=_obj.icon;
        }


        /*
        this.dragColorGal();

       
        if(_obj.id!=undefined){
            this.label.visible=true
            this.label.text=_obj.id
            this.label.div.style.pointerEvents="none";
            this.label.fontSize=10;
        }
        */
        if (_obj.icon != undefined) {
            this.image.visible = true;
            if (this.image.link == link) {
                if (self.funLoad) self.funLoad();
               
            } else {
                this.image.width = 100;
                this.image.height = 100;
                this.image.link = link;
            }
        } else{
            this.image.visible = false;
        }


       
        //this.draw();
    };

   /* this.draw = function () {
        ss = (this._width - this._otstup * 2) / this.image.picWidth;
        if (ss > (this._height - this._otstup * 2) / this.image.picHeight)ss = (this._height - this._otstup * 2) / this.image.picHeight;
        this.image.x = 0;
        this.image.width=this.image.picWidth*ss;
        this.image.height=this.image.picHeight*ss;

        this.image.x = (this._width - this.image.picWidth * ss) / 2;
        this.image.y = (this._height - this.image.picHeight * ss) / 2;

        this.label.x = 2//(this._width - this.label.curW) / 2;
        this.label.y = this._height - 11;

        if (this.postDraw) this.postDraw();
    };*/

}
BoxXZ.prototype = Object.create(DBox.prototype);
BoxXZ.prototype.constructor = BoxXZ;


