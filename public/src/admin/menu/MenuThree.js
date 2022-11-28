// import { GalleryXZ } from './GalleryXZ.js';

export  function MenuThree(menu, fun) {  
    var self=this   
    this.type="MenuThree";
    this.par=menu;

    this.otstup=aGlaf.otstup;
    this.wh=aGlaf.wh;
    this.whv=aGlaf.whv;
    this.widthBig=aGlaf.widthBig;

    this.dCont=new DCont(this.par.dCont);
    this.param=menu.param

    this._width=100;
    this._height=100;
    this._active=false
    this._index=-1;
    this._iOld=-1;
    this._arrayOld=[];
    this._iArr=undefined;
/*
    this.tIdArray = [
        {id: 0, name: '0. шаг Поз стен'},
        {id: 1, name: '1. шаг Поз высота стен'},
        {id: 2, name: '2. шаг Драг обдж'},
        {id: 3, name: '3. шаг Lesa'},
        {id: 4, name: '4. шаг Севе++'},
        {id: 5, name: '5. xz'}
    ]*/

    this.tIdArray = [
        {id: 0, name: '0. неопределен'},
        {id: 1, name: '1. геометрии'},
        {id: 2, name: '2. сохронение'},
        {id: 3, name: '3. material'},
        {id: 4, name: '4. test'},
        {id: 5, name: '5. material'},
        {id: 6, name: '6. text'},
        {id: 7, name: '7. настройки'},
        {id: 8, name: '8. Базовые'},
        {id: 9, name: '9. Запчасти'},
        {id: 10, name: '10. Marker'},
        {id: 11, name: '11. PlusGraf'},
    ]
    this.tIdArray =INFO.tIdArray;

    this.rect={x:0,y:0,w:100,h:100,visible:this._active,fun:function(s,p){
    }}
    this.initBool=false;

    this.w=new DWindow(null, this.widthBig+this.otstup, this.whv,"Дерево проекта");
    this.w.width=this.widthBig;
    //this.w.dragBool=false;
    this.w.hasMinimizeButton=false;
    this.w.height=800

    var bbb=new DButton(this.w, this.w.width-30, 2, "x",function(){
        self.active=false;
    });
    bbb.width=bbb.height=28

    this.input = new DInput(this.w, this.otstup*2 ,34,"null",function(){
        self.gallery.array[self._index].object.keyName=this.text;        
        self.save();
    })
    this.input.width=this.widthBig-this.otstup*2;
    this.input.visible=false

    var yy = this.otstup;
    this.menuTObj = new MenuThreeObj(this, this.w.content, function(s, p, p1){        
        self.save();
    })
    yy += this.menuTObj.height + this.otstup;
    var yy1 = yy
    var ww=28;

    yy += ww + this.otstup;


    this.gallery=new GalleryXZKKK(this.w, 0, yy+32,function(){
        self.index=this.index;
    })
    this.gallery.width=this.widthBig;
    this.gallery.kolII=4;
    this.gallery.widthPic=46;
    this.gallery.heightPic=46;
    this.oldRandom=-1;

 
    this.gallery.height=this.w.height-yy-32;

    this.gallery.funOver = function(s, p, p1){
        if(this.object.tId == -1) {
            this.object.tId = 0;
            self.save()
        }
        var sss = this.object.key + '  ' + this.object.id + '  ' + this.object.name + '\n'  + self.tIdArray[this.object.tId].name + '\n' + this.object.b + '\n' + this.object.n + '\n' + this.object.s
        this.panel.objText={ru:sss,en:" "};
        podskazka.start(this.panel);
    }

    this.gallery.funOut = function(s, p, p1){
        podskazka.stop();
    }

    
    

    this.par.dragPic.addDCont(this.w, function(o, l){

        self.setObj(o);
    });

    /*
    this.setObj = function(o){  
        if(this._active==false)return
        var obj={id:o.id, title:o.id, array:[]}

        this._iArr.unshift(obj);
        this.gallery.start(this._iArr);
        
        self.save();
    }*/



    this.nazad=function(){
        if(self._arrayOld.length==0){
            self.ab[0].alpha=0.5;
            self._index=-1;
            self._iOld=-1;
            self._arrayOld=[];
            self._iArr=self.object.json.three.array;
            self.menuTObj.setObj(self.object.json.three)
            self.gallery.start(self._iArr);
            return;
        }

        self._iArr=self.getNazad(self.object.json.three.array, self._arrayOld, 0);
        self.gallery.start(self._iArr);
        self._arrayOld.splice(self._arrayOld.length-1,1)
    } 

    this.getNazad=function(array, aS, sah){
        self.menuTObj.setObj(array[aS[sah]])
        let a=array[aS[sah]].array
        sah++;        
        if(aS.length!=sah){
            a=this.getNazad(a, aS, sah)
        }         
        return a;
    }



    var a=[];
    this.down=function(){        
        if(this.idArr==0){//nazad
            self.nazad()                                
        }

        if(this.idArr==1){//убиваем 
            function kill (){                            
                var a=self.index;
                self._index=-1;                    
                var b=self._iArr.splice(a,1);            
                self.gallery.start(self._iArr);
                if(a>self.gallery.array.length-1)a=self.gallery.array.length-1;                     
                self.index=a;
                // aGlaf.save();
                self.save();
            }

            if(aGlaf.durak==false){
                kill()
                return
            }           

            self.par.mInfo.setFun("Удаление ветки дерева","Обьект/ветка будет удален из бд, окуратно!!!",
                function(){ 
                    var a=self.index;
                    self._index=-1;                    
                    var b=self._iArr.splice(a,1);            
                    self.gallery.start(self._iArr);                  
                    self.index=a;
                    //aGlaf.save();
                    self.save();
                }
            );

        }
         if(this.idArr==2){//<<<<<<            
            var a=self.index;
            if(a>0) {
               var b=self._iArr.splice(a,1);
                self._iArr.splice(a-1,0,b[0])
                
                self.gallery.start(self._iArr);
                //aGlaf.save();       
                self.save();
                self.index=a-1; 
            }                      
        }

        if(this.idArr==3){//>>>>>>            
            var a=self.index;
            if(a<self._iArr.length-1&&a!=-1) {
                var b=self._iArr.splice(a,1);
                self._iArr.splice(a+1,0,b[0])
                //aGlaf.save();                    
                self.save();
                self.gallery.start(self._iArr);                  
                self.index=a+1; 
            }                     
        }


        if(this.idArr==4){//сохроняем структруру 
            self.ab[5].activMouse=true;
            trace(self.menuTObj.obj)
            var s=JSON.stringify(self.menuTObj.obj)
            self.ab[5].json=s;


        }
        if(this.idArr==5){//сохроняем структруру 
           
            var o=JSON.parse(self.ab[5].json)          
            for (var i = 0; i < o.array.length; i++) {
                self.dragUUID(o.array[i])                
                self.menuTObj.obj.array.push(o.array[i])
            }
            self.menuTObj.setObj(self.menuTObj.obj)            
            self.gallery.start(self.menuTObj.obj.array)
            self.redrah();
        }

    }

    this.dragUUID= function(o){
        if(o.uuid!=undefined){
            o.uuid=this.generateRendom(2)
        }
        if(o.array){
            for (var i = 0; i < o.array.length; i++) {
                this.dragUUID(o.array[i])
            }
        }
    }


    var b;
    this.ab=[]
    for (var i = 0; i < 6; i++) {
        b=new DButton(this.w.content,(this.otstup+ww)*i+this.otstup, yy1, " ",this.down);
        b.idArr=i;
        b.width=ww;
        b.height=ww; 
        if(i==0){
            b.text="<<";
            b.color="#ff0000"
            b.alpha=0.5;
        }
        if(i==1)b.text="-";
        if(i==2)b.text="<"; 
        if(i==3)b.text=">"; 

        if(i==4)b.text="g";
        if(i==5){
            b.text="s";
            b.activMouse=false
        } 
        this.ab.push(b)
    }

    this.obj=null
    this.object=null
    this.nameType;
    this.redrah= function(){
        self.active=true;
        
    } 

    this.save=function(){ 
        
        if(mhbd.objectBase!=undefined){
            trace("@@@--------------save-------------return!!!!") 
            mhbd.saveTime();
            
            return; 
        }

        


        var o={
            type: "PATCH",
            url: this.param.server+this.nameType+"/"+this.object.id+"/",
            data:{
                json:JSON.stringify(this.object.json)
            },
            success: function function_name(data) { 

            },
            error:function function_name(data) {
                console.error("не верная загрузка xz")
            }
        } 
        o.headers = {
            'Authorization': 'Token ' + aGlaf.param.token
        };       
        $.ajax(o);
    }


    this.sah=0
    this.saveTime=function(){
        this.sah++;
        var s=this.sah;
        setTimeout(function() {
            if(self.sah==s)self.save()
        }, 100);
    }

    var b;
    this.setObjcet = function(objcet, nameType){
        
        this.nameType=nameType;
        this.object=objcet;

        b=false
        if(self.object.json==null){
            self.object.json={}
            b=true
        }
        if(self.object.json.three==undefined){
            self.object.json.three=self.createObj(nameType,objcet.id)
            b=true
        }
        if(mhbd.objectBase){
            self.object.json.three.key=null;
            self.object.json.three.id=null;
        }

/*
        var aa=self.object.json.three.array
        var s=JSON.stringify(aa)
        var oo=JSON.parse(s)
        var aa=[]
        for (var i = oo.length - 1; i >= oo.length - 4; i--) {
            aa.push(oo[i])
        }*/

        //self.object.json.three.array[1].array=aa;
        
        //trace("@@==",aa)
        //trace("@@",s,self.object.json.three)


        if(b==true){
            self.save();
        }

        self.menuTObj.setObj(self.object.json.three)
        self._iArr = self.object.json.three.array;      
        if(self._iArr)self.gallery.start(self._iArr);
        self.redrah(); 
          
    }


    this.nameType;
    this.mainObj
    this.setObj = function(obj, nameType){
       
        self.obj=obj;
         
        var createObj = this.createObj(self.obj.dinamikNameType, self.obj.id)
        self._iArr.unshift(createObj);

        self.redrah();    
        if(self._iArr)self.gallery.start(self._iArr);
        self.save();
    }

////////////////////генерация нового объекта////////////////////////////////
    this.createObj = function(_key, _id){
        var o = {}
        o.uuid = this.generateRendom(2)
        o.key = _key 
        o.id = _id 
        o.name = 'name'+Math.round(Math.random()*100)
        o.tId = 0;
        o.b = [0,0,0];
        o.n = [0,0,0];
        o.s = [0,0,0];
        o.array = [];
       
        return o;
    }

    this.generateRendom =  function (n){
        if(n==undefined)n=2;        
        let s='';
        let s1='';
        let d0;
        for (var i = 0; i < n; i++) {           
            d0=Math.random() * 0xffffffff | 0;
            s1=(d0 & 0xff).toString(16) + (d0 >> 8 & 0xff).toString(16)+ (d0 >> 16 & 0xff).toString(16)+ (d0 >> 24 & 0xff).toString(16)         
            if(s1.length<8){
                for (var j = 0; j < 8-s1.length+1; j++) {
                    s1+="Z";
                }
            }
            s+= s1 
            if(i!=n-1)s+="-";
        }       
        return s
    }

////////////////////////////////////////////////////

    this.sizeWindow = function(w,h){  
        this._width=w;
        this._height=h;
        
               
    }

    var bbp=false;    
    this.initPHP=function(){
        if(bbp==true)return
        bbp=true;
       
        if(mhbd.objectBase!=undefined){
           
            this.setObjcet(mhbd.objectBase.three,"null")
            
           /* if(mhbd.objectBase.three.uuid==undefined){
                mhbd.objectBase.three=this.createObj()
            }*/
            


        }
    }



    Object.defineProperty(this, "active", {
        set: function (value) {            
            if(this._active!=value){
                this._active=value;
                
                this.initPHP()
                this.rect.visible=value;
                if(value==true){
                    this.dCont.add(this.w)
                    if(this.initBool==false){
                        this.initBool==true
                        if(this._iArr)this.gallery.start(this._iArr);
                    }
                }else{
                    this.dCont.remove(this.w)
                }
                
            }           
        },
        get: function () {
            return this._active;
        }
    });

    Object.defineProperty(this, "index", {
        set: function (value) {           
            if(this._index!=value){
                this._index=value;
                this.gallery.index=value;
            }else{

                if(this.gallery.array[value]!=undefined){
                    this.ab[0].alpha=1;
                    if(this._iOld!=-1){
                        this._arrayOld.push(this._iOld);
                    }
                    this._iOld= this._index;                    
                    this.menuTObj.setObj(this.gallery.array[value].object)
                    this._iArr = this.gallery.array[value].object.array;                                        
                    this.gallery.start(this._iArr);
                    this._index=-1
                } 


            } 
/*
            if(this.gallery.array[this._index]!=undefined){
                if(this.gallery.array[this._index].object.keyName==undefined)this.gallery.array[this._index].object.keyName="null"
                this.input.text=this.gallery.array[this._index].object.keyName
                this.input.visible=true
            }          */
        },
        get: function () {
            return this._index;
        }
    });

}


export  function MenuThreeObj(par, _dCont, fun) {  
    var self=this   
    this.type="MenuThreeObj";
    this.par = par; 
    this.fun = fun; 

    // this.param=menu.param
    this.otstup=aGlaf.otstup;
    this.height = 50
    this.obj=undefined;

    this.dCont=new DCont(_dCont);

    this.fontSize = 12;
    this.elementsHeight = 15;
    this.labelOtstup = 50;

    var xx = this.otstup
    var yy = this.otstup

    this.tIdArray = this.par.tIdArray
    this.array = []
    this.array.push(this.label1 = new DLabel(this.dCont, xx, yy, 'uuid: '))
    this.array.push(this.labelUUID = new DLabel(this.dCont, this.labelOtstup, yy, 'uuid'))
    this.labelUUID.kostylSmeshenie = true;
    this.labelUUID.width = 150;
    yy += this.label1.fontSize + this.otstup;

    this.array.push(this.label2 = new DLabel(this.dCont, xx, yy, 'key: '))
    this.array.push(this.inputKey = new DInput(this.dCont, this.labelOtstup, yy, 'key', function(){
        self.obj.key = this.value;
        self.fun('key', this.value)
    }))
    this.inputKey.width = 105;
    this.inputKey.color1="#eeeeee"
    this.array.push(this.inputId = new DInput(this.dCont, this.labelOtstup+this.inputKey.width , yy, 'Id', function(){
        self.obj.id = this.value;
        self.fun('id', this.value)
    }))
    this.inputId.width = 40;
    this.inputId.color1="#eeeeee";
    yy += this.inputKey.height + this.otstup;



    this.array.push(this.label3 = new DLabel(this.dCont, xx, yy, 'text: '))
    this.array.push(this.inputName = new DTextArea(this.dCont, this.labelOtstup, yy, 'text', function(){
       
        var a=this.value.split("\n")       
        var s=a[0]
        for (var i = 1; i < a.length; i++) {
            s+='\\n'+a[i]
        }        
        self.obj.name = s;        
        self.fun('name', this.value)
    }))
    this.inputName.width = 145;
    yy += this.inputName.height + this.otstup*2;




    this.array.push(this.label3 = new DLabel(this.dCont, xx, yy, 'type: '))
    this.array.push(this.tId = new DComboBox(this.dCont, this.labelOtstup, yy, '', function(){
        self.obj.tId = this.index;
        self.fun('tId', this.index)
    }))
    this.tId.width = 145;
    var aaa = []
    for (var i = 0; i < this.tIdArray.length; i++) {
        aaa.push(this.tIdArray[i].name)
    }

    this.tId.array = aaa;
    yy += this.tId.height + this.otstup*2;


    this.wh=32; //28
    var wxz=47; //32
    var yyy=yy//this.otstup*2+this.wh
    /*
    for (var i = 0; i < 3; i++) {
        this.array.push(this.llll= new DLabel(this.dCont, this.otstup+15+20+(wxz+this.otstup)*i, yyy,i+" "));
        this.llll.kostylSmeshenie = true;
    }
    yyy+=16+this.otstup;*/


    this.createInput = function(_arr, _fun){
        for (var i = 0; i < 3; i++) {
            this.array.push(_arr[i]= new DInput(this.dCont, this.labelOtstup+(wxz+this.otstup)*i, yyy," ", _fun));
            _arr[i].idArr=i
            _arr[i].width=wxz
            _arr[i].height=this.wh
        }
    }


    this.bbb=[];
    this.nnn=[];
    this.sss=[];
    this.aPosit=[];
    this.aRot=[];

    
    this.array.push(new DLabel(this.dCont, this.otstup, yyy+10,"bool:"))
    for (var i = 0; i < 3; i++) {
        this.array.push(this.bbb[i]= new DCheckBox(this.dCont, this.labelOtstup+(wxz+this.otstup)*i, yyy," "+i, function(){
            self.obj.b[this.idArr]=this.value
            self.fun('b', this.value, this.idArr)
        }));
        this.bbb[i].idArr=i
    }
    yyy+=24+this.otstup


    this.array.push(new DLabel(this.dCont, this.otstup, yyy+10,"number:"))
    this.createInput(this.nnn, function(){
        self.obj.n[this.idArr]=this.value
        self.fun('n', this.value, this.idArr)
    });
    for (var i = 0; i < this.nnn.length; i++) {
        this.nnn[i].setNum(0.1)
    }
    yyy+=this.wh+this.otstup


    this.array.push(new DLabel(this.dCont, this.otstup, yyy+10,"string:"))
    this.createInput(this.sss, function(){
        self.obj.s[this.idArr]=this.value
        self.fun('s', this.value, this.idArr)
    });
    yyy+=this.wh+this.otstup;

    this.array.push(new DLabel(this.dCont, this.otstup, yyy+10,"position:"))
    this.createInput(this.aPosit, function(){
        self.obj.xyz[this.idArr]=this.value
        self.fun('n', this.value, this.idArr)
    });
    yyy+=this.wh+this.otstup;


    this.array.push(new DLabel(this.dCont, this.otstup, yyy+10,"rotation:"))
    this.createInput(this.aRot, function(){
        self.obj.xyzR[this.idArr]=this.value
        self.fun('n', this.value, this.idArr)
    });
    yyy+=this.wh+this.otstup;

    ///////////////////огромный костыль чтоб подстроить положение эллементов/////////////////////
    var oldElement, oldElementY;
    var bbbb
    for (var i = 0; i < this.array.length; i++) {
        if(this.array[i].fontSize) this.array[i].fontSize=this.fontSize
        if(this.array[i].height){
            this.array[i].height=this.elementsHeight
            if(this.array[i].type=="DTextArea")this.array[i].height=this.elementsHeight*3
        }
        if(oldElement) {
            if(this.array[i].y == oldElementY) {
                oldElementY = this.array[i].y;
                this.array[i].y = oldElement.y;
            } else {
                let hhh = oldElement.height
                if(oldElement.kostylSmeshenie)hhh= oldElement.fontSize

                oldElementY = this.array[i].y;
                this.array[i].y = oldElement.y + hhh + this.otstup;
            }
        }
        oldElement = this.array[i];
    }


    this.height = this.array[this.array.length-1].y+this.array[this.array.length-1].height+this.otstup//yyy;


    this.setArrValues = function(_arr, _arr1){
        if(!_arr) return
        for (var i = 0; i < _arr.length; i++) {
            _arr1[i].value = _arr[i]
        }
    }

    this.setObj = function(obj, nameType){
        
        self.obj=obj;
        trace(">>>>>>>>>>>>>>>>>>>>>",self.obj)
        this.labelUUID.text = self.obj.uuid;

        this.inputKey.text = self.obj.key;
        this.inputId.text = self.obj.id;
        this.inputKey.activMouse= self.obj.key ? true : false;
        this.inputId.activMouse= self.obj.id ? true : false;
        //if(self.obj.key==undefined || self.obj.key==null)
        
        this.inputName.text = self.obj.name;

        if(self.obj.tId == -1) self.obj.tId = 0;
        self.fun('tId', 0)
        this.tId.index = self.obj.tId;

        if(!self.obj.xyz)self.obj.xyz=[0,0,0]
        if(!self.obj.xyzR)self.obj.xyzR=[0,0,0]    

        this.setArrValues(self.obj.b, self.bbb);
        this.setArrValues(self.obj.n, self.nnn);
        this.setArrValues(self.obj.s, self.sss);
        trace(self.obj.xyz, self.aPosit)
        this.setArrValues(self.obj.xyz, self.aPosit);
        trace(self.obj.xyzR, self.aRot)
        this.setArrValues(self.obj.xyzR, self.aRot);
    }

    this.sizeWindow = function(w,h){  
        this._width=w;
        this._height=h;   
    }
}





export function GalleryXZKKK(dCont, _x, _y, _fun) {
    DGallery.call(this, dCont, _x, _y, _fun);
    var self=this             
    this.type="GalleryXZKKK";
   
    this.boolName=false

    // this.downBtn = function () {
    //     self.index = this.idArr;
    //     self.obj = self.array[this.idArr].object;

    //     if (self.fun) self.fun(this.idArr);
    // };
    
    // this.start = function(s,p,p1){
    //     console.warn('start', s,p,p1)
    // }



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

GalleryXZKKK.prototype = Object.create(DGallery.prototype);
GalleryXZKKK.prototype.constructor = GalleryXZKKK;

Object.defineProperties(GalleryXZKKK.prototype, {

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
        var link="resources/image/notpic.png";

        if(_obj.key){
            mhbd.getKeyId(_obj.key, _obj.id, function(data){
                link=mhbd.getLink(data.icon)
            })
        }

        this.dragColorGal();

       
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


        if (this.postDraw) this.postDraw();
    };



/*
    if(dcmParam.mobile==false){
        this.panel.div.removeEventListener("mouseout", this.mouseOut)                 
        this.panel.div.removeEventListener("mouseover", this.mouseOver)                 
    }

    this.mouseOver = function (e) {
        self.boolOut = false;
        if(self._activ==false)self.panel.color1=dcmParam.compToHexArray(dcmParam.hexDec(self._color1), -30);
        else self.panel.color1=dcmParam.compToHexArray(dcmParam.hexDec(self._color), -30);
        if (self.funOver) self.funOver(self);
    };
    this.mouseOut = function (e) {      
        if(self._activ==false)self.panel.color1=self._color1;
        else self.panel.color1=self._color;     
        if (self.funOut) self.funOut(self);
    };

    if(dcmParam.mobile==false){
        this.panel.div.addEventListener("mouseout", this.mouseOut)                 
        this.panel.div.addEventListener("mouseover", this.mouseOver)                 
    }*/

}
BoxXZ.prototype = Object.create(DBox.prototype);
BoxXZ.prototype.constructor = BoxXZ;



