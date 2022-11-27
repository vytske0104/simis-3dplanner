



function DopInfo(par, fun) {  
    var self=this;  
    this.type="DopInfo";
    this.par=par;
    this.otstup=aGlaf.otstup;
    this._active=false;

    this.dCont=new DCont(this.par.par.dCont);

    this.dCont.visible=false    
    this.confText

    this.w=new DWindow(this.dCont, this.otstup, 30+this.otstup*2 ," ");
    this.w.width=1000;
    //this.w.dragBool=false;
    this.w.hasMinimizeButton=false;

    this.vsakoe

    this.array=[]
    this.array[0]=this.vsakoe=undefined;

    this.init=function(){
        if(this.vsakoe!=undefined)return;


        $.ajax({
            url: php.server+"resources/configText.json?"+Math.random(),
            success: function function_name(data) {                         
                if(typeof data === "string") {
                    var conf = JSON.parse(data)
                    self.confText = conf;
                } else self.confText = data;              
                self.init2();           
                                 
            },
            error:function function_name(data) {

                self.confText={};
                self.confText.email="xz@xz.xz";
                self.confText.array=[]  ;  

                self.init2();
                self.save();
            }
        });
    }
    this.init()
    this.init2=function(){        
        this.array[0]=this.vsakoe=new DIVsakoe(this);
        this.array[1]=this.arrText=new DIArrText(this);
        //this.array[2]=this.devSettings=new DevSettings(this);
        this.setActiv(this.vsakoe);



        this.sizeWindow()
    }



    this.setActiv = function(o){  

        for (var i = 0; i < this.array.length; i++) {

            if(this.array[i].type==o.type) this.array[i].active = true
            else this.array[i].active = false
        }
    }

    this.sah=0
    this.saveTime=function(){
        this.sah++;
        var s=this.sah;
        setTimeout(function() {           
            if(self.sah==s)self.save()
        }, 500);
    }

    this.save=function(){    
        var ss  =JSON.stringify(this.confText)           
        var l=php.server+aGlaf.resurs+"configText.json";
        var l="../resources/configText.json";

        aGlaf.php.load({tip:"saveJSON", link:l, text:ss},function(e){
            
        }); 

    }



    this.width=100;
    this.height=100;
    this.sizeWindow = function(w,h){  
        

        if(w!=undefined){
            this.width=w;
            this.height=h; 
        }
        
        if(this._active==false)return
        if(this.vsakoe==undefined)return    


        this.w.width=this.width-this.otstup*2;
        this.w.height=this.height-30-this.otstup*3;

        this.arrText.sizeWindow(this.width, this.height);

    }




    Object.defineProperty(this, "active", {
        set: function (value) {            
            if(this._active!=value){
                this._active=value;
                this.init()
                this.dCont.visible=value 
                this.par.dCont.visible=!value
                this.par.menuVerh.active=!value 

                
                this.sizeWindow()
            }           
        },
        get: function () {
            return this._active;
        }
    });
}







function DIVsakoe(par) {  
    var self=this;  
    this.type="DIVsakoe";
    this.par=par;
    this.otstup=aGlaf.otstup;
    this._active=false;

    this.dCont=new DCont(this.par.w.content);
    this.dCont.visible=false   
    this.button=new DButton(this.par.w, this.otstup, this.otstup,"Всякое", function(s){       
        self.par.setActiv(self)
    });
    this.button.height=28;



    var y=this.otstup;

    let b=false
    
    if(b==true)self.par.saveTime();



    this.chek1=new DCheckBox(this.dCont, this.otstup, y, "Уточнения действий, защита от слкучайного удаления 'durak'", function(s){ 
        self.confText.settings.durak = this.value;
        aGlaf.durak=this.value
        self.par.saveTime();
    })


    y+=32



    this.b=new DButton(this.dCont, this.otstup, y,"load csv", function(s){ 
        var a=s.split("base64,")       
        var str=window.atob( a[1] )
        self.par.par.menuVerh.bigZamena(str);       
    })    
    this.b.startFile("csv"); 
    new DLabel(this.dCont, 110,y+10,"Загружаем цены через csv").width=200

    y+=40

    this.input=new DInput(this.dCont, this.otstup, y,"null", function(s){ 
        self.confText.email= this.text; 
        self.par.saveTime(); 
    });
    this.input.timeFun=1
    this.input.width=300//designer@larvij.ru,vorodis2@gamil.com
    new DLabel(this.dCont, 310,y+10,"Эмел на который будет уходить заказ, можно через запетую <<,>> без пробелов ").width=600

    y+=40

    this.infoObj={
        sah:0,
        version:"1.0"
    }
    this.inputVersion=new DInput(this.dCont, this.otstup, y,"null", function(s){ 
        
    });
    this.inputVersion.object.disabled="disabled" 



    this.b=new DButton(this.dCont, this.otstup+105, y,"+", function(s){ 
        var s=   self.inputVersion.text.split(".") 
        var ss= s[0]+"."+(s[1]*1+1);
        self.infoObj.version=ss
        self.inputVersion.text=ss
        self.saveLoad()
    }).width=32
    new DLabel(this.dCont, this.otstup+145, y+10,"Версия приложения").width=200

    y+=40

    //Акция------------------------------
    this.panel=new DPanel(this.dCont, this.otstup, y);
    new DLabel(this.panel, this.otstup,this.dCont,"Акция").width=200

    this.bLink=new DButton(this.panel, this.otstup, 20, "Load", function(s){ 
        var ll = '../resources/scane/'+this.files[0].name;
        php.savePhoto(ll, s, function (e) {            
            self.confText.action.link = ll; 
            self.par.saveTime(); 
            self.bLink.loadImeg(ll);
        });
    })
    this.bLink.width=this.bLink.height=this.panel.height-20-this.otstup*2;
    this.bLink.startFile();


    this.chek=new DCheckBox(this.panel, this.otstup*3+this.bLink.width, 18, "active", function(s){ 
        self.confText.action.active = this.value; 
        self.par.saveTime(); 
    })

    this.slid=new DSliderBig(this.panel, this.otstup*3+this.bLink.width, 48, function(s){ 
        self.confText.action.kolSah = this.value; 
        self.par.saveTime(); 
    }, "kolSah", 1, 10)
    this.slid.okrug=1;
    this.panel.width=190;
    
        
    


    //////////////////////////////////////////



    
    this.testVers=function(){
        var sss;
        $.ajax({
            url: "resources/info.json?"+Math.random(),
            success: function function_name(data) {                         
                if(typeof data === "string") {
                    var conf = JSON.parse(data)
                    sss = conf;
                } else sss = data;                
                for (var s in sss) {
                   self.infoObj[s]=sss[s]
                }
                self.inputVersion.text=self.infoObj.version;


                                         
            },
            error:function function_name(data) {
                console.log("Что то случилось с конфигом")
            }
        });

    }
    this.saveLoad=function(){ 
        sahBig++;
        var o={
            sah:this.inputVersion.text
        }
        var ss  =JSON.stringify(self.infoObj); 
        var l = "../resources/info.json";        
        aGlaf.php.load({tip:"saveJSON", link:l, text:ss},function(e){
            
        }); 
    }



    this.confText
    this.setConf=function(confText){
        console.warn("!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!",confText)
        
        this.confText=confText    
        this.input.text=this.confText.email;

        if(this.confText.action==undefined){
            this.confText.action={}
            this.confText.action.link="null";
            this.confText.action.active=false;
            this.confText.action.kolSah=1;
        }        
        if(this.confText.action.link!="null")this.bLink.loadImeg(this.confText.action.link);
        this.chek.value=this.confText.action.active;
        this.slid.value=this.confText.action.kolSah;


        if(this.confText.settings==undefined){
            this.confText.settings={}
        }
        if(this.confText.settings.durak==undefined)this.confText.settings.durak=true;
        aGlaf.durak=this.confText.settings.durak
        this.chek1.value=this.confText.settings.durak;


            
    }
    
    this.setConf(this.par.confText)

    Object.defineProperty(this, "active", {
        set: function (value) {            
            if(this._active!=value){
                this._active=value;               
                if(value) this.button.alpha =0.5
                else this.button.alpha =1
                this.dCont.visible=value; 
                this.testVers()               
            }           
        },
        get: function () {
            return this._active;
        }
    });
}





function DIArrText(par) {  
    var self=this;  
    this.type="DIArrText";
    this.par=par;
    this.otstup=aGlaf.otstup;
    this._active=false;


    this.dCont=new DCont(this.par.w.content);
    this.dCont.visible=false;
    this.button=new DButton(this.par.w, this.otstup*2+100, this.otstup,"тексты", function(s){ 
        self.par.setActiv(self)
    });
    this.button.height=28
    


    this.confText=undefined



    


    this.minus=function(sHalp){
        var m=this.gallery.index;
        if(this.confText.array[m]==undefined)return
        this.confText.array.splice(m,1)
        this.gallery.start(this.confText.array);
        this.par.saveTime();
        this.sizeWindow();
        this.gallery.index=m-1;

    }

    this.plus=function(sHalp){
        var idSah=1;
        
        for (var i = 0; i < this.confText.array.length; i++) {
            if(this.confText.array[i].id>=idSah)idSah=this.confText.array[i].id+1
        }

        var o={}
        o.id=idSah;
        o.infa=sHalp;
        o.text={ru:"xz"}
        this.confText.array.push(o)
        this.gallery.start(this.confText.array);
        this.par.saveTime();
        this.sizeWindow();
    }

    this.save=function(){
        this.par.saveTime();
    }

    new DLabel(this.dCont, 2,10,    "ид").width=200;
    new DLabel(this.dCont, 100,10,  "описание").width=200; 
    new DLabel(this.dCont, 460,10,  "текст ru").width=200;


    this.gallery=new GalleryXZ333(this.dCont,2,30,function(){        
        self.save();
    })
    this.gallery.width=875;
    this.gallery.kolII=1;
    this.gallery.widthPic=870;
    this.gallery.heightPic=40;


    this.b=new DButton(this.dCont, 600, this.otstup,"+", function(s){         
        self.par.par.mInfo.setFunInput(
            "Создание нового текста",
            "К этому тексту будет подвязан в программмный продукт",
            "Подсказка",           
            function(){                
                self.plus(self.par.par.mInfo.text)               
            }
        );

    })    
    this.b.width=this.b.height


    this.bm=new DButton(this.dCont, 600+this.b.height, this.otstup,"-", function(s){        
        self.par.par.mInfo.setFun("Удаление обьекта","Будет удалено, осторожно!!! обьект может быть уже связан в коде с идишником!!!",
            function(){              
                self.minus()
            }
        );

    })    
    this.bm.width=this.bm.height









    this.confText
    this.setConf=function(confText){
        this.confText=confText 
        this.gallery.start(this.confText.array);
    }
    this.setConf(this.par.confText)
    


    this.width=100;
    this.height=100;
    this.sizeWindow = function(w,h){ 
        if(w!=undefined){
            this.width=w;
            this.height=h; 
        }        
        if(this._active==false) return;
        if(this.gallery==undefined) return;
        this.gallery.width=this.width-8;
        this.gallery.height=   this.height-100 

    }


    Object.defineProperty(this, "active", {
        set: function (value) {            
            if(this._active!=value){
                this._active=value;

                if(value) this.button.alpha =0.5
                else this.button.alpha =1
                this.dCont.visible=value;
                
            }           
        },
        get: function () {
            return this._active;
        }
    });
}















function GalleryXZ333(dCont, _x, _y, _fun) {
    DGallery.call(this, dCont, _x, _y, _fun);
               
    this.type="GalleryXZ";
   

    this.textArea=new DTextArea()
    this.textArea.textAlign= "Left";
    this.textArea.timeFun=1

    this.textArea2=new DTextArea()
    this.textArea2.textAlign= "Left";
    this.textArea2.timeFun=1

    this.createZamen=function(){            
        var r=new BoxXZ333(this.content, 0, 0, this.downBtn, this);            
        return r;
    }




    
}
GalleryXZ333.prototype = Object.create(DGallery.prototype);
GalleryXZ333.prototype.constructor = GalleryXZ333;

Object.defineProperties(GalleryXZ333.prototype, {

    index: {// Активный элемент
        set: function (value) {
            if(this._index==value)return
              
            if (this.array[value] != undefined) {
                this.korektPoIndex(value);
            }            
            this._index = value; 
            
            if(this.textArea2.parent)  this.textArea2.parent.remove(this.textArea2) 
            if(this.array[this._index]==undefined)if(this.textArea.parent)  this.textArea.parent.remove(this.textArea)   

            for (var i = 0; i < this.array.length; i++) {
                if (this._index == i) {
                    this.array[i].activ = true;
                    this.array[i].setTA(this.textArea)
                }
                else this.array[i].activ = false;
            }
            

        },
        get: function () {
            return this._index;
        }
    },
})







function BoxXZ333(dCont, _x, _y, _fun, par) {
    DBox.call(this, dCont, _x, _y, _fun);
    this.type = 'BoxXZ';
    var self=this
    this.par=par;
    this.image.visible = false;

    this.label1 = new DLabel(this.content, 50, 0, '====');
    this.label1.fontSize=12;
    this.label1.width=400;


    this.labelRu = new DLabel(this.content, 460, 0, '====');
    
    this.labelRu.width=390;

    this.label.div.style.pointerEvents="none";
    this.label1.div.style.pointerEvents="none";
    this.labelRu.div.style.pointerEvents="none";

    this.b=new DButton(this.content, 35, 0," ", function(s){ 
        self.fun()

        self.add(self.par.textArea2)
        self.par.textArea2.width=410;
        self.par.textArea2.height=self.panel.height;
        self.par.textArea2.x=self.label1.x;
        self.par.textArea2.value=self.label1.text
        self.par.textArea2.fun=self.dragText2

    })    
    this.b.width=this.b.height=14
    this.b.color="#eeeeee"
    this.b.alpha=0.5

    this.dragText2=function(){
        
        self.label1.text=self.object.infa=this.value;
        self.fun()
    }

    this.setTA=function(textArea){
        this.add(textArea)
        textArea.width=410;
        textArea.height=this.panel.height;
        textArea.x=this.labelRu.x;
        textArea.value=this.labelRu.text

        textArea.fun=this.dragText
    }


    this.dragText=function(){
        
        self.labelRu.text=self.object.text.ru=this.value;
        self.fun()
    }




    this.startLoad = function (_obj) {
        this.object = _obj;
        


       

        this.label.text=this.object.id;
        this.label1.text=this.object.infa;
        this.labelRu.text=this.object.text.ru;



        this.label.visible=true
       
        
            
        self.funLoad();
        
 


       
        this.draw();
    };

    this.draw = function () {
        this.label.x=10
        this.label.y=10
    };

}
BoxXZ333.prototype = Object.create(DBox.prototype);
BoxXZ333.prototype.constructor = BoxXZ333;
