import { MBPic } from './MBPic.js';
import { KorektMaterial} from './KorektMaterial.js';

import { MResurs} from './MResurs.js';
import { GalleryXZ } from './GalleryXZ.js';

export  function MatObject(menu, fun) {  
    var self=this   
    this.type="MatObject";
     this.nameType="materials";

   

    this.fun=fun;
    this.par=menu;

    this.param = this.par.param;

    this.otstup=aGlaf.otstup;
    this.wh=aGlaf.wh;
    this.whv=aGlaf.whv;
    this.widthBig=aGlaf.widthBig;
    this.object=null;
    this.dCont=new DCont(this.par.dCont);
    this.objDin=undefined;
    this._width=100;
    this._height=100;
    this._active=false

    this.obj=undefined;

    this.rect={x:0,y:0,w:100,h:100,visible:this._active,fun:function(s,p){

    }} 



    this.w=new DWindow(null, this.widthBig+this.otstup, this.whv," ");
    this.w.width=this.widthBig;
    this.w.dragBool=false;
    this.w.hasMinimizeButton=false;
    this.cont=new DCont(this.w);
    this.cont.y=32
    this.content=new DCont(this.cont);
    this.cont.visible=false;

    this.mBPic=new MBPic(this.content, this.otstup, this.otstup, function(s, p, p1){   
        if(s=="fileIcon"){         

           mhbd.saveFile(p,self.nameType,self.obj.id, (date)=> {         
                mhbd.clearFile(self.nameType,self.obj.iconId); 
                self.obj.iconId=date.id
                mhbd.setParam(self.nameType,self.obj.id,"iconId",date.id);
                mhbd.setParam(self.nameType,self.obj.id,"icon",date.src);
                self.object.icon=date.src;
                self.obj.icon=date.src;

                self.start();
                self.save();
                self.fun("reDragBDIcon",self.obj.id, date.src); 
            })

         /*   mhbd.setFile(p,self.object,self.nameType,"icon", (s)=> {  
                             
                    mhbd.setParam(self.nameType,self.obj.id,"icon",s,(s1)=> {                        
                        self.start();
                        self.save();
                        self.fun("reDragBDIcon",self.obj.id, s); 
                    })                    
                })*/
            return;
        } 
             
       /* if(s=="baseOrig"){
            var ll = '../'+aGlaf.resursData+"" + self.object.id + '/'+p1;            
            php.savePhoto(ll, p, function () {                
                
            }); 
            self.saveTime()

        }
        if(s=="sArray"){
            var ll = '../'+aGlaf.resursData+"" + self.object.id + '/';
            for (var i = 0; i < p.length; i+=2) {
                var lll=ll+p[i+1]
                
                php.savePhoto(lll, p[i]);
            } 
            menu.matBD.redragTime();           
        } */


    })

    this.basMat=new MBasMat(this.content, this.otstup, this.mBPic.y+this.mBPic.height+this.otstup, function(s,p){
        aGlaf.save();
        self.saveTime();
    }, this.param) 
        
    this.matGl=new MatGl(this.content, this.otstup, this.mBPic.y+this.mBPic.height+this.otstup+this.basMat.height, function(s,p){        
        if(s=="setAA")self.matKorektTovar.setAA(p)
       /* aGlaf.save();
        self.saveTime()*/
    },this) 




    this.korekt=new KorektMaterial(this,this.content, this.otstup, this.matGl.y+this.matGl.height+this.otstup-38, function(s,p){        
        
        if(s=="saveObj"){
            self.saveTime()
            return
        }

        fun(s,p);
       /* aGlaf.save();
        self.saveTime()*/
    })

  /*  this.mResurs=new MResurs(this.content, this.widthBig*2+this.otstup*4, -32, function(s, p){      
        self.saveTime();   
    })   */

    this.matGl.setTHIS(this)  

    this.mVuborGeom=new MVuborGeom(this.content, 0, 0, function(s, p){      
         
    })  

    this.matKorektTovar=new MatKorektTovar(this, function(s,p){        
       
       /* aGlaf.save();
        self.saveTime()*/
    }) 


    this.clearMat= function(){ 
        self.par.mInfo.setFun("Чистим матерьял","Все параметры матерьяла будут преведены в изночальное состояние, то есть все будет удалено",
            function(){              
              
                var s=self.object.obj.type
                self.object.obj={type:s};
                self.korekt.objGlaf=undefined
                self.start()
               // self.setObj(self.obj)
                //self.start()
                self.save()
            }
        );
    }

    //var o={id:id, title:id, name:"xz",key:"o_"+id}
    this.start= function(){ 
        var b=false; 
        
        if(this.object==null){              this.object={}; b=true; }
        if(this.object==undefined){         this.object={}; b=true; }           
        if(this.object.id==undefined){      this.object.id=this.obj.id; b=true; }
         
        if(this.object.title==undefined){   this.object.title="title"; b=true; } 

        if(this.object.key==undefined){     this.object.key="MeshPhongMaterial"; b=true; } 
        
        

        this.cont.visible=true;
        this.index=0;
        this.korekt.objOld=undefined

        if(this.object.obj==undefined){  this.object.obj={}; b=true; } 
        if(this.object.mirro==undefined){  this.object.mirro=false; b=true; } 

 
        this.korekt.setObj(this.object);
        
        
        this.matGl.setKey(this.object.key);
        this.matGl.setObj(this.object,this.obj) 


       
        this.mBPic.setObj(this.obj, this.nameType);
       
        this.basMat.setObjS(this.object,this.obj)


        this.matKorektTovar.setObjS(this.object,this.obj)
      
       // if(this.mResurs.setObj(this.object)==true)b=true

           
       //if(b==true)this.saveTime();
    }

/**/

    this.save=function(){  

        mhbd.setParam("materials",this.obj.id,"json",JSON.stringify(this.object))
/*
        var o={
            type: "PUT",
            url: this.param.server+this.nameType+"/"+this.obj.id+"/",
            data:{
                json:JSON.stringify(this.object)
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
        console.warn(">>>>>>saveTime>>>>>44>", o)

        $.ajax(o);*/

    }

    this.sah=0
    this.saveTime=function(){
        this.sah++;
        var s=this.sah;
        console.warn(">>>>>>saveTime>>>>>>")

        setTimeout(function() {
            if(self.sah==s)self.save()
        }, 100);
    }


    this.setObj= function(o){ 
      /*  this.obj=o;
        this.object = null;
        this.cont.visible=false;

       // var l="../"+aGlaf.resursData+""+o.id+"/config.json"+"?x=" + Math.random();

        var l=php.server+aGlaf.resursData+""+o.id+"/config.json"+"?x=" + Math.random();

        $.ajax({
            url: l,
            success: function function_name(data) {                         
                if(typeof data === "string") {
                    var conf = JSON.parse(data)
                    self.object = conf;
                } else self.object = data;              
                self.start();           
                                 
            },
            error:function function_name(data) {

                self.start();
            }
        }); */
    }


    this.setId = function(id,bool){       
        mhbd.getKeyId(this.nameType,id,function(data){
            self.obj=data;

            if(typeof data.json === "string") {
                var conf = JSON.parse(data.json)
                self.object = conf;
            } else self.object = data.json; 

           
            if(bool==true) self.par.matBD.dragParSort(self.obj.sort, id)
            self.start();
        })
            
       /* $.ajax({
            type: "GET",
            url: this.param.server+this.nameType+"/"+id+"/",
            success: function function_name(data) { 
             
                self.obj=data;

                if(typeof data.json === "string") {
                    var conf = JSON.parse(data.json)
                    self.object = conf;
                } else self.object = data.json; 

               
                if(bool==true) self.par.matBD.dragParSort(self.obj.sort, id)
                self.start();
            },
            error:function function_name(data) {
                console.error("не верная загрузка textur")
            }
        });*/
    } 

    this.sizeWindow = function(w,h){  
        this._width=w;
        this._height=h;
        this.w.height= h - this.whv- this.otstup;    

        this.mVuborGeom.sizeWindow(w,h)  

        this.matKorektTovar.sizeWindow(w,h)     
    }

    Object.defineProperty(this, "active", {
        set: function (value) {            
            if(this._active!=value){
                this._active=value;
                this.rect.visible=value;
                if(value==true){
                    this.dCont.add(this.w)
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
            this._index=value;               
            this.matGl.index=value; 
            this.korekt.index=value; 
        },
        get: function () {
            return this._index;
        }
    });
}



function MatGl(c,x,y,f,par) {  
    var self=this;   
    this.type="MMod";
    self.fun=f
    this.par=par
    this.otstup=aGlaf.otstup;
    this.param = this.par.param;
    this.wh=aGlaf.wh;
    this.whv=aGlaf.whv;
    this.widthBig=aGlaf.widthBig;
    this.dCont=new DCont(c);
    this.dCont.x=x;
    this.dCont.y=y;
    this.arrayName=[];
    this.o=undefined;
    this.o1=undefined;
    this.y=y
    this.array=["fbx","3ds","gltf"];
    this.par=undefined;
    this.panel=new DPanel(this.dCont, 0, 0);
    this.panel.width=this.widthBig-this.otstup*3;
    

    this.checkBox=new DCheckBox(this.panel, this.otstup, this.otstup,"reflect",function(){
        var p=0;
        if(this.value==true){
            if(self.checkBox1.value==true){
                self.checkBox1.value=false;
            }
            p=1;
        }
        self.dragChek(p);

       // self.par.korekt.setMirro(this.value, true); 

    })

    this.checkBox1=new DCheckBox(this.panel, 70, this.otstup,"refract",function(){
        var p=0
        if(this.value==true){
            if(self.checkBox.value==true){
                self.checkBox.value=false;
            }
            p=2
        }
        self.dragChek(p)        

    })


    this.butXZ=new DButton(this.panel,170, 0, "", function(){
        self.fun("setAA",self.butXZ.aa)
    })
    this.butXZ.fontSize=10
    this.butXZ.width=24
    this.butXZ.height=24




    this.dragChek=function(p){
        self.par.korekt.setMirro(p, true);
    }




   /* this.bute=new DButton(this.panel, this.panel.width-this.checkBox.height-this.otstup*2, this.otstup, "x",function(){
        self.par.clearMat();
    })

    this.bute.width=this.bute.height=this.checkBox.height;*/


   /* this.button=new DButton(this.panel, 100, this.otstup, "getPic",function(){
        self.getPic()
    })
    this.button.height=this.checkBox.height
    this.button.width=this.panel.width-this.otstup*2- this.button.x*/

    this.comboBox=new DComboBox(this.panel, this.otstup, this.otstup+26, ["mirro"],function(){
        self.par.index=this.index;
        self.par.saveTime()
    })
    this.comboBox.width=this.panel.width-this.otstup*3;

    this.height=this.panel.height=this.comboBox.y+this.comboBox.height+this.otstup*2;

    
    this.setTHIS=function(par){
        this.par=par
        this.arrayName=[]
        for (var i = 0; i < this.par.korekt.array.length; i++) {
            this.arrayName.push(this.par.korekt.array[i].name)
        }
        this.comboBox.array=this.arrayName;        
    }


    self.setKey=function(s){         
        for (var i = 0; i < this.comboBox.array.length; i++) {            
            if(this.comboBox.array[i]==s){
                this.comboBox.index=i;
            }
        }

        if(this.par.object.mirro===true || this.par.object.mirro===false){
            this.checkBox1.value=false;
            this.checkBox.value=this.par.object.mirro;
        }else{
            if(this.par.object.mirro==0){
                this.checkBox.value=this.checkBox1.value=false;
            }
            if(this.par.object.mirro==1){
                this.checkBox.value= true
                this.checkBox1.value=false;
            }
            if(this.par.object.mirro==2){
                this.checkBox.value= false
                this.checkBox1.value=true ;
            }
        }        
    } 

     





    this.setObj= function(o){        
         for (var i = 0; i < this.comboBox.array.length; i++) { 
            trace(i,this.comboBox.array[i])           
            if(this.comboBox.array[i]==o.obj.type){
                this.comboBox.index=i;
            }
        }
        let aa=[]

/*
        for (var i = 0; i < this.param.group3.length; i++) {
            if(this.param.group3[i].d3MatId!=-1){
                if(this.param.group3[i].d3MatId===o.id){
                    //if(objMat[this.param.group3[i].d3MatId]!=undefined){
                       
                        aa.push(this.param.group3[i].id);  
                   // }
                }
            }
        }*/

        

        if(aa.length==0){
            this.butXZ.visible=false
        }else{
            this.butXZ.visible=true
            this.butXZ.aa=aa;
            this.butXZ.text=""+aa.length
        }
    }


    self.getPic=function(){        
        var o={}
        o["32"]=aGlaf.s3d.sMaterial.foto(32);
        o["64"]=aGlaf.s3d.sMaterial.foto(64);
        o["100"]=aGlaf.s3d.sMaterial.foto(100);
        o["128"]=aGlaf.s3d.sMaterial.foto(128);
        o["256"]=aGlaf.s3d.sMaterial.foto(256);

        for (var s in o) {
            var ll = '../'+aGlaf.resursData+"" + self.par.object.id + '/'+s+".png";           
            php.savePhoto(ll, o[s], function () { });
            var ll = '../'+aGlaf.resursData+"" + self.par.object.id + '/y'+s+".png";          
            php.savePhoto(ll, o[s], function () { });
        }
                
        self.par.mBPic.button.loadImeg(o["64"]);        
    }








    Object.defineProperty(this, "index", {
        set: function (value) {           
            this._index=value;               
            this.comboBox.index=value;          
        },
        get: function () {
            return this._index;
        }
    });
}



function MBasMat(c,x,y,f,p) {  
    var self=this   
    this.type="MBas";
    self.fun=f
    this.otstup=aGlaf.otstup;
    this.wh=aGlaf.wh;
    this.whv=aGlaf.whv;
    this.widthBig=aGlaf.widthBig;
    this.dCont=new DCont(c);
    this.dCont.x=x;
    this.dCont.y=y;
    this.o=undefined;
    this.o1=undefined;
    this.y=y
    this.param=p

    this.panel=new DPanel(this.dCont, 0, 0)
    this.panel.width=this.widthBig-this.otstup*3;
    this.height=this.panel.height=37;

    var sah=this.otstup;
    var sahPlus=2;   
    this.lid=new DLabel(this.panel,this.otstup,sah,"id:")
    this.lid.fontSize=10

    this.lid=new DLabel(this.panel,this.otstup,sah+12,"title")
    
    this.ititle=new DInput(this.panel,50,sah,"title",function(){
        self.o.title=this.value;
        self.o1.title=this.value;
        self.fun()
    })
    this.ititle.width=this.panel.width-50-this.otstup*2
    this.ititle.fontSize=12
    this.ititle.height=16


    this.iName=new DInput(this.panel,50,sah+16,"title",function(){
        self.o.name=this.value;
        self.o1.name=this.value;
        self.saveTime()
    })
    this.iName.fontSize=12
    this.iName.height=16
    this.iName.width=this.ititle.width

    trace("!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!")



    this.save=function(){ 

        var o={
            type: "PUT",
            url: this.param.server+"materials/"+this.o1.id+"/",
            data:{
                name:self.o1.name               
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
        trace("!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!",o)

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












   /* this.lkey=new DLabel(this.panel,this.otstup,sah,"key")
    this.ikey=new DInput(this.panel,30,sah-12,"key",function(){
        self.o.key=this.value;
        self.o1.key=this.value;
        self.fun()
    })
    this.ikey.width=this.panel.width-30-this.otstup*2
    sah+=sahPlus;*/

    this.setObjS= function(o, o1){ 
        trace(">>>>>>>>>>",o, o1);
        this.o=o;
        this.o1=o1;
        this.lid.text=o.id;        
        this.ititle.text=o.title;
        this.iName.text=o1.name;
    }
}



function MVuborGeom(c,x,y,f) {  
    var self=this   
    this.type="MVuborGeom";
    self.fun=f
    this.otstup=aGlaf.otstup;
    this.wh=aGlaf.wh;
    this.whv=aGlaf.whv;
    this.widthBig=aGlaf.widthBig;
    this.dCont=new DCont(c);
    this.dCont.x=x;
    this.dCont.y=y;
    this.o=undefined;
    this.o1=undefined;

    this.array=[]
    this._index=0;


    this.height=24;

    this.down=function(){

        /*aGlaf.s3d.sMaterial.index=this.idArr
        self.index=this.idArr*/

        aGlaf.s3d.indexGeometry=this.idArr

    }

    this.chec=new DCheckBox(this.dCont,0, 0," ",function(){
        aGlaf.s3d.sMaterial.cont3d.visible=this.value;
    })

    for (var i = 0; i < 4; i++) {
        this.button=new DButton(this.dCont, this.otstup+(this.height-this.otstup)*this.array.length, this.otstup," ", this.down,
            "src/admin/icon/iObj"+i+".png");
        this.button.c=c;
        this.button.idArr=this.array.length
        this.button.width=this.button.height=this.height-this.otstup*2
        this.array.push(this.button)  
    }

    this.chec.x=   this.array[0].x-20
     this.chec.y=   this.array[0].y+5
    this.chec.value=false
    this.chec.width=this.chec.height=15
    
    this.sizeWindow = function(w,h){        
        this.dCont.x=w-495
        this.dCont.y=h-this.height-this.otstup-65
    }


    Object.defineProperty(this, "index", {
        set: function (value) { 

            if(this._index!=value){
                this._index=value; 

                for (var i = 0; i < this.array.length; i++) {
                    if(i!=this._index)this.array[i].object.style.opacity=0.1
                    else this.array[i].object.style.opacity=1
                }              
                
            }          
            

        },
        get: function () {
            return this._index;
        }
    });
}
















function MatKorektTovar(par) {  
    var self=this   
    this.type="MBas";
    self.par=par

    this._width=100;
    this._height=100;

    this._active=false

    this.param=self.par.param

    this.panel=undefined

    this.dCont
    this.init = function(){ 
        if(this.panel!=undefined)return

        this.dCont=new DCont(this.par.par.par.dCont)    
        this.panel = new DPanel(this.dCont);
        this.window = new DWindow(this.dCont, 0, 0," ");

        this.window.dragBool=false;
        this.window.hasMinimizeButton=false;
        this.window.width=46*5+4
        this.window.height=46*3+4

     
        this._wh32 = 32;  // Для отступа шапки окна

        this._index=-1;
        this.objDin=undefined;
        this.iiiii
        this.gallery=new Gall777(this.window.content, 2, 4, function(ii){
            var rr=window.document.URL.toString();            
            var l=rr.split("?")            
            var l2=l[0].split("/")
            var l3=""
            for (var i = 0; i < l2.length-1; i++) {
                l3+=l2[i]+"/"
            }
            var l4=l3+"adminAll.html?key=group3&type=creat&id="+self.gallery.array[ii].object.id            
            window.open(l4);  
        })

        this.gallery.width=this.window.width-4;
        this.gallery.height=this.window.height-38;
        this.gallery.kolII=1;
        this.gallery.widthPic=this.window.width-8;
        this.gallery.heightPic=24;







        
        this.button=new DButton(this.window, 2, 2,"Заменить",function(){  
            self.rrrrrrrr();          
            self.active=false;    
        })
        this.button.height=28;
       


        this.button2=new DButton(this.window, 2, 2,"x",function(){
            self.active=false;
        })
        this.button2.width=this.button2.height=28;

        this.button2.x= this.window.width-this.button2.width-2; 

        this.panel.alpha=0.4;
        this.panel.div.addEventListener("mousedown", function(){
            self.active=false;
        })



        this.sizeWindow(this._width,this._height)     
    } 

    this.rrrrrrrr = function(){ 

        for (var i = 0; i < aaa.length; i++) {
            trace(i+"!!!!!!!!!!!!!!!!!  ",aaa[i])
            this.rrrr4(aaa[i])
        }
    }

    this.rrrr4 = function(o){ 
       
        trace(o)
        trace(this.ooo)
        trace(this.ooo1)

        var s=this.ooo.title
        var a=s.split("_")

        if(a[1]){
            var ww=(a[0]*1)*o["width"];
            o["d3Width"]=ww;
            mhbd.setParam("group3", o.id, "d3Width", ww);

            var hh=(a[1]*1)*o["height"];
            o["d3Height"]=hh;
            mhbd.setParam("group3", o.id, "d3Height", hh);
        }
        /*

this.buttBal = new DButton(this.dCNiz, 0, 16, "", function(){
            mhbd.getKeyId("materials", self.object["d3MatId"], function(e){
                var s=e.json.title
                var a=s.split("_")

                if(a[1]){
                    var ww=(a[0]*1)*self.object["width"];
                    self.object["d3Width"]=ww;
                    mhbd.setParam(self.key, self.id, "d3Width", ww);
                    self.input1.value=ww;

                    self.mcVuev.d3Width=ww;


                    var hh=(a[1]*1)*self.object["height"];
                    
                    self.object["d3Height"]=hh;
                    mhbd.setParam(self.key, self.id, "d3Height", hh);
                    self.input2.value=hh;
                    self.mcVuev.d3Height=hh;
                }
            });
        })

        */
    }

    this.ooo
    this.ooo1
    this.setObjS = function(o,o1){ 
        this.ooo=o
        this.ooo1=o1
    }


     var aaa
    this.setAA = function(aa){ 
        this.active=true
        trace(aa,this.param)
        aaa=[]
        for (var j= 0; j < aa.length;j++) {
            for (var i = 0; i < this.param.group3.length; i++) {

                if(aa[j]==this.param.group3[i].id){
                    aaa.push(this.param.group3[i])
                }
                
            }
        }
        trace(aaa)
        this.gallery.start(aaa)
    } 

    this.sizeWindow = function(w,h){  
        this._width=w;
        this._height=h;

        if(this._active==false){
            return

        }

        this.panel.width=w;
        this.panel.height=h;
        this.window.x=(w-this.window.width)/2;
        this.window.y=(h-this.window.height)/2;    
  
    }

     Object.defineProperty(this, "active", {
        set: function (value) { 

            if(this._active!=value){
                this._active=value; 

                this.init();
                this.dCont.visible=  value;  
            }          
            

        },
        get: function () {
            return this._active;
        }
    });
}




export function Gall777(dCont, _x, _y, _fun) {
    DGallery.call(this, dCont, _x, _y, _fun);
    var self=this             
    this.type="Gall777";
   
  

    this.downBtn = function () {
       

      /*  self.index = this.idArr;
        self.obj = self.array[this.idArr].object;*/

        if (self.fun) self.fun(this.idArr);
    };
    




    this.createZamen=function(){            
        var r=new Box77(this.content, 0, 0, this.downBtn, this);            
        return r;
    }




    this.dragColorGal=function(){
        for (var i = 0; i < this.array.length; i++) {
            this.array[i].dragColorGal()
        }
    }    
}

Gall777.prototype = Object.create(DGallery.prototype);
Gall777.prototype.constructor = Gall777;

Object.defineProperties(Gall777.prototype, {

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







function Box77(dCont, _x, _y, _fun, par) {
    DBox.call(this, dCont, _x, _y, _fun);
    this.type = 'Box77';
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

            this.label.textAlign = 'left'; 
            this.label.visible=true
            this.label.x=28
            this.label.text=_obj.id+" "+_obj.name
            this.label.div.style.pointerEvents="none";
            this.label.fontSize=10;
            this.label.width=this.width-this.label.x
        
        
        
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

        this.image.x = 2//(this._width - this.image.picWidth * ss) / 2;
        this.image.y = (this._height - this.image.picHeight * ss) / 2;

        this.label.x = 28//(this._width - this.label.curW) / 2;
        this.label.y = 2;
/*
        if(this.butXZ){
            this.butXZ.x = this._width-this.butXZ.width-2
            this.butXZ.y = this.label.y
        }*/

        if (this.postDraw) this.postDraw();
    };

}
Box77.prototype = Object.create(DBox.prototype);
Box77.prototype.constructor = Box77;










