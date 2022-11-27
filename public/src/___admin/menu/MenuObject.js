import { MBPic } from './MBPic.js';
import { MBase } from './filt/MFilt.js';
import { MResurs} from './MResurs.js';
import { MShadow} from './MShadow.js';

export  function MenuObject(menu, fun) {  
    var self=this   
    this.type="MenuObject";
    this.nameType="objects3d";
    this.fun=fun;
    this.par=menu;
    this.otstup=aGlaf.otstup;
    this.wh=aGlaf.wh;
    this.whv=aGlaf.whv;
    this.widthBig=aGlaf.widthBig;
    this.object=null;
    this.dCont=new DCont(this.par.dCont);

    this.param = this.par.param;

       

    this._width=100;
    this._height=100;
    this._active=false;
    if(localS.object.inObj==undefined)localS.object.inObj=false;


    this.inObj=localS.object.inObj

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
        } 
    }) 

     



    this.mBas = new MBas(this.content, this.otstup, this.mBPic.y+this.mBPic.height+this.otstup, function(s){ 
        if(s=="dragColorGal"){         
            menuBig.menuBD.dragColorGal()
        }
        aGlaf.save();
        self.saveTime();
    }) 

    this.mMod=new MMod(this.content, this.otstup, 150, function(s,p,p1){     
        if(s=="saveLoad"){ 

            
           
            mhbd.saveFile(p,self.nameType,self.object.id, (date)=> {                                 
                trace(">>>>",date)
                if(self.object.res){
                    if(self.object.res.id){
                        mhbd.clearFile("objects3d",self.object.res.id);
                    }
                }
                self.object.res=date
                self.save();
                self.fun("reDrag3D"); 
            })

        }
        if(s=="saveKey"){            
            self.saveTime();
        }

       
    },this)



    this.mBasLLL=new MBasLLL(this,this.content, this.otstup, 220, function(s){       
        if(s=="drag3DRects"){
           fun(s);
        }
        if(s=="saveKey"){            
            self.saveTime();
        }
        if(s=="reDrahObj"){
            self.setObj(self.obj);
        }
        self.saveTime();
    })

    this.mBLOt=new MBLOt(this,this.content, this.otstup, 220, function(s){       
        if(s=="drag3DRects"){
           fun(s);
        }
        if(s=="saveKey"){            
            self.saveTime();
        }
        if(s=="reDrahObj"){
            self.setObj(self.obj);
        }
        self.saveTime();
    })


    /*this.mFilt=new MFilt(this,this.content, this.otstup, 220, function(s, p){      
        if(s=="saveKey"){            
            
        }
        self.saveTime();   
    })*/


    this.mBase=new MBase(this,this.content, this.otstup, 220, function(s, p){          
        self.saveTime();   
    })


  

    this.mResurs=new MResurs(this.content, this.otstup, 220, function(s, p){      
        self.saveTime();   
    })    
   
    this.mIndex=new MIndex(this.content, this.otstup, 186, function(s, p){      
        self.saveTime();   
    })

    this.mShadow=new MShadow(this.content, this.otstup, 220, function(s, p){      
        self.saveTime();   
    })


    this.panelUp=new DPanel(this.content,0,0);
    this.panelUp.width= aGlaf.widthBig
    this.panelUp.height= 1188
    this.panelUp.alpha=0.8
    this.lllf=new DLabel(this.panelUp,5,50,"Этот обьект заопрувленый, up=true, мы не можем его изменять и модифицировать, перейди в понель и снеми апрув, если очень нуно, но луче не трогай)))")
    this.lllf.width=this.panelUp.width-10
    this.panelUp.visible=false

    this.bc=new DButton(this.panelUp,this.panelUp.width-30,2,"x",function(){
        self.panelUp.visible=false
    })
    this.bc.width=this.bc.height=28
    this.lllf.width=this.panelUp.width-10
    this.panelUp.visible=false


    this.mIndex.plus(this.mBLOt.dCont,"src/admin/icon/info.png")
    this.mIndex.plus(this.mBasLLL.dCont,"src/admin/icon/info.png")
    this.mIndex.plus(this.mBase.dCont,"src/admin/icon/xz1.png")
    this.mIndex.plus(this.mResurs.dCont,"src/admin/icon/i1.png")
    this.mIndex.plus(this.mShadow.dCont,'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAADQElEQVRYR8WWXUgUURTH/3d2nd3Zza9U6EtDMjZndtzNiMrQtFIki4h8CKmewqIofAqCIiiC3iQKPx6isBJfKkkiskAS0l6s2WZn1Ye0ol3roUDzo7LdG7u4Uqs7MzuGnqdl9vzP+d1zLvccgiU2YiS/yym0ebzKISPaWI0qgEvkj5snfrT1DQ2NRoUukW8mILWSrBiCTwjALQo0LPg7WfQbpoO50sDA+4VWQfUU0WQh8jObhCwNhGBfNCEBLr6RlUuLAhAnSY8kK9uXDoDSMcnrS106gJi7YRQk7h3Y6HCsoqzZrxY4iNAOWe7vNpo8rIsL4BaFZgC1GsGnJVlh/yuAWxROAfQcQFbrCUxBT3hkXxjWkM2pQEFB/lYmxLSAYL3eiDSEGx5FOa3X/2+/eVvgFoQaMLiXYMBJSVbsCWpU70DkFUzYaKhC8vY/06tTu4QTAGx6A8X4PZJkZb8ebVwAlyhcJsB5PUHm96EvJNlXqqVXmwWMWxSCWgFU/9fRDl3DaCEQWmNbYx9YaBsASukRj9d3N94hNJeK2flvvAyqr+ViAPyz0MSeQwcA/xgge4wX4N+NKmEAl5M/QQhpNApw2f0d++58JG3VGUd/jZnvH+38En5fZk27Ak5nEQh9aRSgqWgS61akwMaa0aUEbu5tHTmWEECBw5HLsOYhIwDWJBMaKuzItkzBP2kC+3s8xNcPmhIC4Hk+hzWRD3oBklgWdvsyEEKQx47iyrUm+G+fQVb1JSx/fgFdXn97VevIgWg8zRZExjNletUALBYLOJs9kjTW2nePo2fwM3ZWiQgOfwVbmodAhxfdg4Hsww++fdIEcAtCHRjUxwa2WjlwNu1ZdTIngKr8tIicLLfBWpkf+T3V2oeHfUOV2gBOoRME5WERx9lg5Ti93Zj166iYADNTHa5mU+T79NsAPvcOx98HoupCt3g2JTVtMwEpA5CRcHYALUXfkJFsjUiZdA5mYSUCT3zI2rhGG0AtYXFxcaGZoaUUpGwGcM5GtJb9jqtbgsiszMet669RmBlCut2CFVnJeMcyU5otMHLiGQ0pKSnZlsr8KrMwwTLBPr6reywLjQd/Y335Bgw89U3zda8sfwCotfxzr1MzGQAAAABJRU5ErkJggg==')
    //this.mIndex.plus(this.mFilt.dCont,"src/admin/icon/xz2.png")
    //this.mIndex.plus(this.mPRS.dCont,"src/admin/icon/xz3.png")
    //this.mIndex.plus(this.mText.dCont,"src/admin/icon/xz4.png")


    
    this.start= function(){ 
        var b=false;       
        if(this.object==null){      this.object={}; b=true; }
        if(this.object==undefined){      this.object={}; b=true; }           
        if(this.object.id==undefined){   this.object.id=this.obj.id; b=true; }
        if(this.object.title==undefined){this.object.title=this.obj.title; b=true; } 
        if(this.object.key==undefined){  this.object.key=this.obj.key; b=true; } 

        this.cont.visible=true;
        this.mBas.setObjS(this.object, this.obj);

        if(this.object.orig==undefined){  this.object.orig="null"; b=true; } 

        if(this.object.mod==undefined){  this.object.mod={}; b=true; } 

        if(this.object.mod.key==undefined){  this.object.mod.key="n"; b=true; } 
        if(this.object.mod.name==undefined){  this.object.mod.name="n"; b=true; } 

        if(this.object.icon==undefined){      this.object.icon=null; b=true; }
     



        this.mBasLLL.setObj(this.object);
        this.mBPic.setObj(this.obj, this.nameType);
        this.mMod.setObj(this.object);
       // this.mFilt.setObj(this.object);
        this.mBase.setObj(this.object);
        this.mBLOt.setObj(this.object);
       // this.mPRS.setObj(this.object);

        //this.mText.setObj(this.object);
        
        // this.par.menuVerh.topRightBut = 0;
        this.par.menuVerh.texturActive();


        this.fun("open", this.object);
        
        if(this.obj.up)this.panelUp.visible=this.obj.up;

        
        if(this.mResurs.setObj(this.object)==true){
            b==true
        }


        if(b==true)this.saveTime();
    }

    this.save=function(){ 
        mhbd.setParam(this.nameType, this.obj.id, "json", JSON.stringify(this.object))

       /* return
        var o={
            type: "PATCH",
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


        console.warn("!!!",mhbd, o)
        $.ajax(o);*/

    }

    this.sah=0
    this.saveTime=function(){
        this.sah++;
        var s=this.sah;
        setTimeout(function() {
            if(self.sah==s)self.save();
        }, 500);
    }


   /* this.setObj= function(o){ 
        this.obj=o;
        this.object = null;
        this.cont.visible=false;
        var l=php.server+aGlaf.resursData+""+o.id+"/config.json"+"?x=" + Math.random();; 
        $.ajax({
            url: l,
            success: function function_name(data) {                         
                if(typeof data === "string") {
                    var conf = JSON.parse(data)
                    self.object = conf;
                } else self.object = data;              
                self.start(); 
                
                if(self.inObj == true){
                    self.obj.obj= self.object;
                    aGlaf.save();   
                }                
            },
            error:function function_name(data) {

                self.start();
            }
        }); 
    }*/

    this.objId
    this.setId = function(id){  
        mhbd.getKeyId(this.nameType,id,function(data){
           

            self.obj=data;

            if(typeof data.json === "string") {
                var conf = JSON.parse(data.json)
                self.object = conf;
            } else self.object = data.json; 

            trace(">>>>>>",data);

            self.start(); 
        })
    } 

    this.sizeWindow = function(w,h){  
        this._width=w;
        this._height=h;
        this.w.height= h - this.whv- this.otstup;           
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

}



function MIndex(c,x,y,f) { 
    var self=this
    this.otstup=2;
    this.wh=aGlaf.wh;
    this.whv=aGlaf.whv;
    this.widthBig=aGlaf.widthBig;
    this.dCont=new DCont(c);
    this.dCont.x=x;
    this.dCont.y=y;

    this.panel=new DPanel(this.dCont, 0, 0);
    this.panel.width=this.widthBig-this.otstup*3;

    this.height=20;
    this.panel.height=28;
    this.array=[]    
    this.plus=function(c,l){
        this.button=new DButton(this.panel, this.otstup+(this.otstup+this.height)*this.array.length, this.otstup," ", function(b){
            self.index=this.ii
        },l);
        this.button.image.alpha=0.35

        this.button.c=c;
        this.button.ii=this.array.length
        this.button.width=this.button.height=this.height

        this.array.push(this.button)
        this._index=-1;
        this.index=0;
    }

    Object.defineProperty(this, "index", {
        set: function (value) {            
            if(this._index!=value){
            
                this._index=value;
                for (var i = 0; i < this.array.length; i++) {
                    if(i==value){
                        this.array[i].alpha=0.5
                        this.array[i].c.visible=true
                    }else{
                        this.array[i].alpha=1
                        this.array[i].c.visible=false
                    }
                }
            }           
        },
        get: function () {
            return this._index;
        }
    });
}



function MMod(c,x,y,f,par) {  
    var self=this;   
    this.type="MMod";
    self.fun=f
    this.par=par
    
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
    this.array=["gltf","glb"];

    this.panel=new DPanel(this.dCont, 0, 0);
    this.panel.width=this.widthBig-this.otstup*3;
    this.height=this.panel.height=94;


    this.button=new DButton(this.panel, this.otstup, this.otstup,"load fbx", function(b){
        if(b!=undefined){            
            self.save3d();
        }
    });
    this.button.startFile(".gltf, .glb");  

    this.button1=new DButton(this.panel, this.otstup, this.otstup," ", function(b){
        trace(self.o)
        var ss=mhbd.getLink(self.o.res.src)
        download1(ss)
    });
    this.button1.width=this.button1.height=12
    this.button1.borderRadius=10
    this.button1.color=dcmParam.colorActive

    function download1(url) {
      const a = document.createElement('a')
      a.href = url
      a.download = url.split('/').pop()
      document.body.appendChild(a)
      a.click()
      document.body.removeChild(a)
    }

    this.bClose=new DButton(this.panel, this.panel.width-this.otstup*2-this.button.height, this.otstup,"x", function(b){   
        self.button1.visible=false;
        //self.o.mod.name="n";
        self.button.text="load: gltf,glb";
        if(self.par.object)if(self.par.object.res)if(self.par.object.res.id){
            mhbd.clearFile("objects3d", self.par.object.res.id, function(){
                self.o.res=undefined
                self.fun("saveKey");
                self.par.fun("reDrag3D"); 
            })
           /* var o={}
            o.type="DELETE";
            o.url=self.par.param.server+self.par.nameType+"/files/"+self.par.object.res.id+"/";
            o.success= function function_name(data) {                 
                self.o.res=undefined
                self.fun("saveKey");

                self.par.fun("reDrag3D"); 
            }
            o.headers = {
                'Authorization': 'Token ' + aGlaf.param.token
            };
            $.ajax(o)*/
        }
        
            
    });
    this.bClose.width=this.bClose.height;
    this.button.width= this.bClose.x-this.otstup*2;
    

    var sah=this.bClose.height + this.otstup + this.otstup;

    
    this.files;
    this.sss=0;
    this.li="0";
    this.save3d=function(){
        
        var files=self.button.files;
        var a=[];
        var p=-1;
        var k='';
        for (var i = 0; i < files.length; i++) {           
            a=files[i].name.split(".");
            for (var j = 0; j < this.array.length; j++) {
                if(a[a.length-1].toLowerCase()==this.array[j]){
                    p=i;
                    k=this.array[j];
                }
            }
        }

        if(p==-1) {

            return;
        }

        self.fun("saveLoad",files[p]);
        this.button.text = files[p].name; 
        self.button1.visible=true


        return;
        
        this.o.mod.name=files[p].name;
        this.button.text=this.o.mod.name;        
        this.o.mod.key=k;
        this.sss=0;
        this.files=files;
        this.killDir(this.saveF);



    }  





    this.saveF=function(){
        var l='../'+aGlaf.resursData + self.o.id+"/mod/";
        self.li=l;   

        php.load({tip: 'mkdir', dir: l}, function (e) {             
            php.load({tip: 'mkdir', dir: '../'+aGlaf.resurs+'tmp/'}, function (e) { 
                self.saveFile();
            });
        })        
        self.fun("saveKey");        
    }





    this.saveFile=function(){
        var ll=php.server+"src/upload.php";
        var form_data = new FormData();

        var size=(self.files[self.sss].size/1024*0.001)

        form_data.append('file', self.files[self.sss]); 

        if(size>2){

            aGlaf.menu.mInfo.setFun(
            "Обьект больше 2 метров",
            "Из за того что обьект здоровый, более 2 метров, скорее всего php не сможет передвть, нужно ручками перекинуть в "+aGlaf.resursData + self.o.id+"/mod/")
            


             /*self.par.mInfo.setFun("Удаление обьекта","Обьект будет удален из бд, не вычещаеться из дерева, и может привести к падениям, короче окуратно!!!",
                    function(){ 
                        var id=self.grtMaxPlus()
                        php.load({tip: 'mkdir', dir: '../'+aGlaf.resursData + id}, function (e) {                        
                            php.load({tip: 'copyDir', dirWith: '../'+aGlaf.resurs+'base/', dir: '../'+aGlaf.resursData + id + '/'}, function (e) {    
                                var o={id:id, title:id, name:"xz",key:"o_"+id}
                                self.objectBase.bd.unshift(o);                    
                                aGlaf.save();
                                self.reDrag();               
                            });
                        })
                    }
                ); */  
        }
        var o={
            url: ll,
            dataType: 'text',
            cache: false,
            contentType: false,
            processData: false,
            data: form_data,
            type: 'post',
            success: function(php_script_response){
                if(self.sss>=self.files.length-1){
                    self.saveFile1()
                }else{
                    self.sss++;
                    self.saveFile();
                }
            }
        }

        o.headers = {
            'Authorization': 'Token ' + aGlaf.param.token
        };

              
        $.ajax(o);
    }

    this.saveFile1=function(){
       
        var llll='../'+aGlaf.resurs+'tmp/';
        var llllll='../'+aGlaf.resursData + self.o.id + '/mod/'//+self.files[self.sss].name;
        
        php.load({tip: 'copyDir', dirWith: llll, dir: llllll}, function (e) {            
            php.load({tip: "removeDirRec", dir: llll, }, function (e) { 
                self.fun("saveKey");
                setTimeout(function() {
                   self.fun("reDrahObj"); 
                }, 400);
                
            })            
        })       
    }


   



    this.killDir=function(f){
        var l='../'+aGlaf.resursData + this.o.id+"/mod/";
        php.load({tip: "removeDirRec", dir: l, }, function (e) { 
            //self.fun("reDrahObj")
            if(f)f()
        })
    }




    this.drag=function(){
        for (var i = 0; i < self.o.mod.r.length; i++) {            
            self.o.mod.r[i] = self.ar[i].text*1;
            self.o.mod.r1[i] = self.ar1[i].text*1;
        }
        self.fun("saveKey"); 
        self.fun("drag3DRects");        
    }

    this.height=this.panel.height=sah

    this.setObj= function(o){    

        this.o=o; 
        this.button.text="load: gltf,glb";
        self.button1.visible=false
        if(this.o) if(this.o.res) {            
            var a=this.o.res.src.split("/")
            this.button.text=a[a.length-1];
            self.button1.visible=true
            return
        }
        if(this.o.mod.name=="n"){
            this.button.text="load: gltf,glb";
        }else{
            this.button.text=this.o.mod.name;
            self.button1.visible=true
        }
    }
}




function MBLOt(p,c,x,y,f) { 
 var self=this   
    this.type="MBLOt";
    self.fun=f
    this.par=p
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

    this.keyName="iNum";
    this.panel=new DPanel(this.dCont, 0, 0)
    this.panel.width=this.widthBig-this.otstup*3;
    this.height=this.panel.height=94;

    var sah=this.otstup;
    var sahPlus=34;
 
    var kolObj=4;


    this.drag=function(){
        self.drag1()
    }
    this.drag1=function(){    
        for (var i = 0; i < kolObj; i++) {
            if(this.aBool[i].value==true) this.o.bool[i]=1;
            else this.o.bool[i]=0;
        }
        for (var i = 0; i < kolObj; i++) {
            this.o.num[i]=this.aNum[i].value*1;        
        }
        for (var i = 0; i < kolObj; i++) {
            this.o.str[i]=this.aStr[i].value;          
        }
        self.fun();
    }    

             
     



    this.dragOt=function(){

        if(this.o[this.keyName]!=undefined)if(this.o[this.keyName].active==false){
            delete this.o[this.keyName]
        }
        /*if(this.o[this.keyName]==undefined){
            self.batACreat.text="создать инфу" 
            self.panel.visible=false;   
            return
        }else{
            self.batACreat.text="удалить инфу";
            self.panel.visible=true 
        }*/

        for (var i = 0; i < kolObj; i++) {
            if(this.o.bool[i]==0) this.aBool[i].value=false;
            else this.aBool[i].value=true;
        }


        for (var i = 0; i < kolObj; i++) {
            this.aNum[i].value=this.o.num[i];           
        }       




        for (var i = 0; i < kolObj; i++) {
            if(this.o.str[i]==undefined)this.o.str[i]="0"
            this.aStr[i].value=this.o.str[i];           
        }


        this.sPriority.value=self.o.priority
        this.sBagY.value=self.o.bagY
        
        for (var i = 0; i < this.o.mod.r.length; i++) {
            this.ar[i].value=Math.round(this.o.mod.r[i]*1000)/1000
            this.ar1[i].value=Math.round(this.o.mod.r1[i]*1000)/1000
        }
    }


    var w=70;
    var ss=0;   

    ////////////////////////////////////////////////
    this.dragR=function(){

        for (var i = 0; i < self.o.mod.r.length; i++) {            
            self.o.mod.r[i] = self.ar[i].text*1;
            self.o.mod.r1[i] = self.ar1[i].text*1;
        }
        self.fun("saveKey"); 
        self.fun("drag3DRects");        
    }



    var sahPlus=24;
    var w=(this.panel.width-this.otstup*2)/6-this.otstup;
    this.ar=[];    


    for (var i = 0; i < 6; i++) {
        this.ar[i]=new DInput(this.panel,this.otstup+i*(w+this.otstup), sah,i+" ",this.dragR);
        this.ar[i].height=20;
        this.ar[i].idArr=i;
        this.ar[i].width=w; 
        this.ar[i].fontSize=10; 
        this.ar[i].okrug=1000
        this.ar[i].setNum(0.1);
    }
    sah+=20+this.otstup;

    this.ar1=[];
    for (var i = 0; i < 6; i++) {
        this.ar1[i]=new DInput(this.panel,this.otstup+i*(w+this.otstup), sah,i+" ",this.dragR);
        this.ar1[i].height=20;
        this.ar1[i].idArr=i;
        this.ar1[i].width=w;  
        this.ar1[i].fontSize=10;
        this.ar1[i].okrug=1000   
        this.ar1[i].setNum(0.1);  
    }
    sah+=20+this.otstup;

    this.buttonRect=new DButton(this.panel,this.otstup, sah, "get rect",function(){        
        var a=aGlaf.s3d.sMod.getRect();  
              
        if(a[0]==Infinity){
            for (var i = 0; i < 6; i++) {
                self.o.mod.r[i] = self.ar[i].text= 0;
                self.o.mod.r1[i] = self.ar1[i].text= 0;
            } 
        }else{
            for (var i = 0; i < 6; i++) {
                self.o.mod.r[i] = self.ar[i].text= Math.round(a[i]*1000)/1000;
                self.o.mod.r1[i] = self.ar1[i].text= Math.round(a[i]*1000)/1000;
            } 
        }
        
        self.fun("drag3DRects"); 
        self.fun("saveKey"); 
    })
    this.buttonRect.width=186;
    this.buttonRect.height=20;
    sah+=this.buttonRect.height+this.otstup*2;



    //////////////////////////////////////////


    
    w=70;

    this.lbool=new DLabel(this.panel,this.otstup,sah+9,"bool");
    this.aBool=[];
    ss=0
    for (var i = 0; i < kolObj; i++) {
        this.aBool[i]=new DCheckBox(this.panel,45+i*37, sah,i+" ",this.drag);
        this.aBool[i].idArr=i
        this.aBool[i].width=w;
        ss++
        if(ss==4){
           ss=0;
           sah+=sahPlus;
        }
    }

    sah+=this.otstup;
   // sah+=sahPlus;


    this.lnum=new DLabel(this.panel,this.otstup,sah+9,"num");
    this.aNum=[];
    ss=0
    for (var i = 0; i < kolObj; i++) {
        this.aNum[i]=new DInput(this.panel,45+ss*(w+this.otstup), sah,"0",this.drag);
        this.aNum[i].idArr=i
        this.aNum[i].width=w;
        this.aNum[i].height=sahPlus-2;
        ss++
        if(ss==2){
           ss=0;
           sah+=sahPlus;
        }
    }

    this.lstr=new DLabel(this.panel,this.otstup,sah+9,"str");
    this.aStr=[];
    ss=0
    for (var i = 0; i < kolObj; i++) {
        this.aStr[i]=new DInput(this.panel,45+ss*(w+this.otstup), sah,i+" ",this.drag);
        this.aStr[i].idArr=i
        this.aStr[i].width=w;
        this.aStr[i].height=sahPlus-2;
        ss++;
        if(ss==2){
           ss=0;
           sah+=sahPlus;
        }
    } 

    

    this.sBagY=new DSliderBig(this.panel, 2, sah, function(){
        self.o.bagY=this.value;
        self.dragOt();
        self.fun();
    }, "bagY", -100, 100);
    this.sBagY.okrug=100;
    this.sBagY.width=this.panel.width-8

    sah+=50


    this.sPriority=new DSliderBig(this.panel, 2, sah, function(){
        self.o.priority=this.value;
        self.dragOt();
        self.fun();
    }, "priority", 0, 100);
    this.sPriority.okrug=1;
    this.sPriority.width=this.panel.width-8;

    sah+=50

    this.height=this.panel.height=sah+this.otstup;



   
    this.creat = function(b){ 
        if(b==true){
            this.o[this.keyName]={}
           //this.o[this.keyName].active=true; 
            this.o[this.keyName].rect=[0,0,0,0,0,0];
            this.o[this.keyName].rect1=[0,0,0,0,0,0];
            this.o[this.keyName].bool=[0,0,0,0];
            this.o[this.keyName].num=[0,0,0,0];
            this.o[this.keyName].str=["0","0","0","0"];
        }else{
            delete this.o[this.keyName]
            /*this.o[this.keyName].active=false;
            delete this.o[this.keyName].rect;
            delete this.o[this.keyName].rect1;
            delete this.o[this.keyName].bool;
            delete this.o[this.keyName].num;
            delete this.o[this.keyName].str;*/
        }
        this.dragOt(); 
        self.fun("saveTime"); 
    }

   /* this.batACreat=new DButton(this.dCont, this.otstup, this.otstup,"создать инфу",function(){
        if(self.panel.visible==true){
            self.par.par.mInfo.setFun("Очистка инфы","Информация будет удолена безвозвратно",function(){              
                self.batACreat.text="создать инфу" 
                self.panel.visible=false; 
                self.creat(false)               
            }
        );                   
        }else{
            self.creat(true)
            self.batACreat.text="удалить инфу";
            self.panel.visible=true 
        }
    })
    this.batACreat.width=186 */

    this.panel.y=-4

   

   
    




    this.setObj= function(o){       
        this.o=o;
        
        let b=false
        if(this.o.bool==undefined){
            b=true
            this.o.bool=[0,0,0,0]
            this.o.num=[0,0,0,0]
            this.o.str=["0","0","0","0"]
            this.o.mod.r=[0,0,0,0,0,0];
            this.o.mod.r1=[0,0,0,0,0,0];
        }
        if(this.o.mod==undefined)this.o.mod={}
        if(this.o.mod.r==undefined){
            this.o.mod.r=[0,0,0,0,0,0];
            this.o.mod.r1=[0,0,0,0,0,0];
        }   
        if(b==true)self.fun("saveTime"); 

        /*if(this.o[this.keyName]==undefined){
            this.o[this.keyName]={active:false} 
            self.fun("saveTime"); 
            return
        }*/
        this.dragOt();       
    }

 


}










function MBasLLL(p,c,x,y,f) {  
    var self=this   
    this.type="MBas";
    self.fun=f
    this.par=p
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

    this.keyName="iNum";
    this.panel=new DPanel(this.dCont, 0, 0)
    this.panel.width=this.widthBig-this.otstup*3;
    this.height=this.panel.height=94;

    var sah=this.otstup;
    var sahPlus=34;
 
    var kolObj=4;


    this.drag=function(){
        self.drag1()
    }
    this.drag1=function(){    
        for (var i = 0; i < kolObj; i++) {
            if(this.aBool[i].value==true) this.o[this.keyName].bool[i]=1;
            else this.o[this.keyName].bool[i]=0;
        }
        for (var i = 0; i < kolObj; i++) {
            this.o[this.keyName].num[i]=this.aNum[i].value*1;        
        }
        for (var i = 0; i < kolObj; i++) {
            this.o[this.keyName].str[i]=this.aStr[i].value;          
        }


        self.fun()
    }    

             
     



    this.dragOt=function(){
        if(this.o[this.keyName]!=undefined)if(this.o[this.keyName].active==false){
            delete this.o[this.keyName]
        }
        if(this.o[this.keyName]==undefined){
            self.batACreat.text="создать инфу" 
            self.panel.visible=false;   
            return
        }else{
            self.batACreat.text="удалить инфу";
            self.panel.visible=true 
        }

        for (var i = 0; i < kolObj; i++) {
            if(this.o[this.keyName].bool[i]==0) this.aBool[i].value=false;
            else this.aBool[i].value=true;
        }


        for (var i = 0; i < kolObj; i++) {
            this.aNum[i].value=this.o[this.keyName].num[i];           
        }       




        for (var i = 0; i < kolObj; i++) {
            if(this.o[this.keyName].str[i]==undefined)this.o.str[i]="0"
            this.aStr[i].value=this.o[this.keyName].str[i];           
        }

        
        for (var i = 0; i < this.o[this.keyName].rect.length; i++) {
            this.ar[i].value=this.o[this.keyName].rect[i]
            this.ar1[i].value=this.o[this.keyName].rect1[i]
        }
    }


    var w=70;
    var ss=0;   

    ////////////////////////////////////////////////
    this.dragR=function(){

        for (var i = 0; i < self.o.iNum.rect.length; i++) {            
            self.o.iNum.rect[i] = self.ar[i].text*1;
            self.o.iNum.rect1[i] = self.ar1[i].text*1;
        }
        self.fun("saveKey"); 
        self.fun("drag3DRects");        
    }



    var sahPlus=24;
    var w=(this.panel.width-this.otstup*2)/6-this.otstup;
    this.ar=[];    


    for (var i = 0; i < 6; i++) {
        this.ar[i]=new DInput(this.panel,this.otstup+i*(w+this.otstup), sah,i+" ",this.dragR);
        this.ar[i].height=20;
        this.ar[i].idArr=i;
        this.ar[i].width=w; 
        this.ar[i].fontSize=10; 
        this.ar[i].okrug=1000
        this.ar[i].setNum(0.1);

    }
    sah+=20+this.otstup;

    this.ar1=[];
    for (var i = 0; i < 6; i++) {
        this.ar1[i]=new DInput(this.panel,this.otstup+i*(w+this.otstup), sah,i+" ",this.dragR);
        this.ar1[i].height=20;
        this.ar1[i].idArr=i;
        this.ar1[i].width=w;  
        this.ar1[i].fontSize=10;
        this.ar1[i].okrug=1000   
        this.ar1[i].setNum(0.1);  
    }
    sah+=20+this.otstup;

    this.buttonRect=new DButton(this.panel,this.otstup, sah, "get rect",function(){        
        var a=aGlaf.s3d.sMod.getRect();        
        if(a[0]==Infinity){
            for (var i = 0; i < 6; i++) {
                self.o[self.keyName].rect[i] = self.ar[i].text= 0;
                self.o[self.keyName].rect1[i] = self.ar1[i].text= 0;
            } 
        }else{
            for (var i = 0; i < 6; i++) {
                self.o[self.keyName].rect[i] = self.ar[i].text= Math.round(a[i]*1000)/1000;
                self.o[self.keyName].rect1[i] = self.ar1[i].text= Math.round(a[i]*1000)/1000;
            } 
        }
        
        self.fun("drag3DRects"); 
        self.fun("saveKey"); 
    })
    this.buttonRect.width=186;
    this.buttonRect.height=20;
    sah+=this.buttonRect.height+this.otstup*2;



    //////////////////////////////////////////


    
    w=70;

    this.lbool=new DLabel(this.panel,this.otstup,sah+9,"bool");
    this.aBool=[];
    ss=0
    for (var i = 0; i < kolObj; i++) {
        this.aBool[i]=new DCheckBox(this.panel,45+i*37, sah,i+" ",this.drag);
        this.aBool[i].idArr=i
        this.aBool[i].width=w;
        ss++
        if(ss==4){
           ss=0;
           sah+=sahPlus;
        }
    }

    sah+=this.otstup;
   // sah+=sahPlus;


    this.lnum=new DLabel(this.panel,this.otstup,sah+9,"num");
    this.aNum=[];
    ss=0
    for (var i = 0; i < kolObj; i++) {
        this.aNum[i]=new DInput(this.panel,45+ss*(w+this.otstup), sah,"0",this.drag);
        this.aNum[i].idArr=i
        this.aNum[i].width=w;
        this.aNum[i].height=sahPlus-2;
        ss++
        if(ss==2){
           ss=0;
           sah+=sahPlus;
        }
    }

    this.lstr=new DLabel(this.panel,this.otstup,sah+9,"str");
    this.aStr=[];
    ss=0
    for (var i = 0; i < kolObj; i++) {
        this.aStr[i]=new DInput(this.panel,45+ss*(w+this.otstup), sah,i+" ",this.drag);
        this.aStr[i].idArr=i
        this.aStr[i].width=w;
        this.aStr[i].height=sahPlus-2;
        ss++;
        if(ss==2){
           ss=0;
           sah+=sahPlus;
        }
    }   

    this.height=this.panel.height=sah+this.otstup;



   
    this.creat = function(b){ 
        if(b==true){
            this.o[this.keyName]={}
           //this.o[this.keyName].active=true; 
            this.o[this.keyName].rect=[0,0,0,0,0,0];
            this.o[this.keyName].rect1=[0,0,0,0,0,0];
            this.o[this.keyName].bool=[0,0,0,0];
            this.o[this.keyName].num=[0,0,0,0];
            this.o[this.keyName].str=["0","0","0","0"];
        }else{
            delete this.o[this.keyName]
            /*this.o[this.keyName].active=false;
            delete this.o[this.keyName].rect;
            delete this.o[this.keyName].rect1;
            delete this.o[this.keyName].bool;
            delete this.o[this.keyName].num;
            delete this.o[this.keyName].str;*/
        }
        this.dragOt(); 
        self.fun("saveTime"); 
    }

    this.batACreat=new DButton(this.dCont, this.otstup, this.otstup,"создать инфу",function(){
        if(self.panel.visible==true){
            self.par.par.mInfo.setFun("Очистка инфы","Информация будет удолена безвозвратно",function(){              
                self.batACreat.text="создать инфу" 
                self.panel.visible=false; 
                self.creat(false)               
            }
        );                   
        }else{
            self.creat(true)
            self.batACreat.text="удалить инфу";
            self.panel.visible=true 
        }
    })
    this.batACreat.width=186 
    this.panel.y=34  





    this.setObj= function(o){       
        this.o=o;         
        this.dragOt();       
    }



}














function MBas(c,x,y,f) {  
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


    this.panel=new DPanel(this.dCont, 0, 0)
    this.panel.width=this.widthBig-this.otstup*3;
    this.height=this.panel.height=94;

    var sah=this.otstup;
    var sahPlus=34;
    this.lId=new DLabel(this.panel,this.otstup,sah)
    sah+=sahPlus;

    this.ltitle=new DLabel(this.panel,this.otstup,sah,"title")
    this.ititle=new DInput(this.panel,30,sah-12,"title",function(){
        self.o.title=this.value;
        self.o1.title=this.value;
        self.fun()
    })
    this.ititle.width=this.panel.width-30-this.otstup*2
    sah+=sahPlus;

    this.lkey=new DLabel(this.panel,this.otstup,sah,"key")
    this.ikey=new DInput(this.panel,30,sah-12,"key",function(){
        self.o.key=this.value;
        self.o1.key=this.value;
        self.fun()
    })
    this.ikey.width=this.panel.width-30-this.otstup*2
    sah+=sahPlus;




    this.buttonColor=new DButton(this.panel,this.panel.width-16-4,this.otstup,"",function(base64){
        
        if(self.dColor.visible==true){

            self.o1.c=undefined
            delete self.o1.c
            self.fun()
            self.dColor.visible=false;
        }else{

            self.dColor.value="#000000";
            self.dColor.visible=true;
            self.o1.c=self.dColor.value
            self.fun()
        }

    },'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAEhUlEQVRYR+2VbUhbZxTHz3NvvPGaaGJ8YS4FBw0IE8ThvBCiSUSkLajZOty06gc7cWxCmSxzpon4Eq1xrbDVgXXttDBWKyL4ZVVY19ybD3Nskw1GdTJmlMa6F2uiTa/JTbzPCCjsgy9X/SCDPl+f8/zP7/zvOeciOOGDTjg/PAf4/ztgNptTAeAdjPHfHMfdPGxPHcsBg8GQKJPJRhFC57YTt7Is23UYiCMDxCrHGA8mnXrpzKOLDqz68QGFpkYiANDGsmyfVIgjAZjNZjUA3FUqlUabsye8fOrlxNtXu0WNjOAf/8AliNHIxyzLOqRAHBqAYZgUmqYHNBrNWZvNFsnPz1f3PY6iO08iW78S8aT+t+8E2WAHEQ2Hez0eT+tBEIcC0Ov1GoqiRlQqlcHpdEZycnJUAIACWwD+LYDLywDjPMbnVv/YDHa9R4rRyAssywb2g5AMsJ38BgC8Ybfbl0tKSrQAQPxX/P1HAJ9uAJx/6ObXBjoTMMa/A8Awx3FXASC6G4gkgIKCgmSSJO8qFApTJBKRMQwTsNvtNE3TCTui/BZAxjzA6cBKKKXzbSpOodx6se7Dp97rDjoaDrV6PJ5dG1MSgNlsrsYYD/X09PyTkZEhtrS0aLKzs9etVmsSTdPKGMT9dQDLooCLR69tRSICCBcuRR9QmvjX7n3OB+6NCCzLJh/ZgaKiIgPG+GuLxSI0NjYmLSwsPHU4HAlZWVmbdrtdHh9PKy+tAPz5y0x4LRRG5w168hUFQr3ffr+2+YVLEV73N3k8nsEjA8QeGo3GcoIgbtXX1/PV1dWZXq/X19zcrMnJyQl8YLWqrwXphLhnYaE4VU69miCKExMTT/r7+5NFUezyeDxOABCPBRB7bDKZLsvl8o6pqSmMEIqbn59fbWtro3U6XcjaYqOUCkWiDIE4Nja2Mjw8rOZ5vlUQhBvT09Obe02CpB7Q6/V0XFycniTJWwzDKF0uV9qO4NLSkq+pqSk1NzfXb7VaVZOTk8H+/v7YouriOC5W+b7nQIDCwsI0giBcCKG3LBbLs7q6Otrv9wsTExOqzMzMzdLSUpnX6w22t7fTarVaWFxclPM83xkMBj+bmZnhjwNAGo3GMwihL7VabXxHR8eKTqc7HQqFNiorK8n19XU/AKgqKioC9fX16UNDQ8Lo6CiFMe7kOO7KQYl37nd1QKfTybVarVMul18sKyuLVlVV0SkpKYnRaDTU3d0ddLvdSwih1zHGeoTQ9by8PNns7CzN8/yVYDD4iZTK9wUwGo0XCIL4yuFw/JWXl5dG0zSiKAq53e4Nl8slFwShjOO4b2IihYWFxSRJ9omiOLDXqB16FZtMpl6CIJrHx8cDNTU1dHl5eaS2tjbc0NBA+Hy+mxzHfSTV4oPidv0EZrM59it1Tk5Orvp8PjE9PZ2y2Wzk7OzsQwAoY1l29SBhqfe7AhgMhmyZTHafYZh4hmGS5ubmNliWJUVRfJNl2Smp4lLi9hzD7fG7DQBnEUI/Y4zf5TjuJwDAUoSlxhy4B6QKHTXuOcBzB07cgX8B+4HTMGa/rP4AAAAASUVORK5CYII=')
    this.buttonColor.width=16;
    this.buttonColor.height=16;
    this.buttonColor.panel1.alpha=0.2
    this.buttonColor.panel.visible=false


    this.dColor=new DColor(this.panel,this.panel.width,this.otstup,"",function(base64){        
        self.o1.c=this.value
        self.fun("dragColorGal");

        
    });
    this.dColor.width=150


    this.setObjS= function(o, o1){ 

        this.o=o;
        this.o1=o1;

        this.lId.text="id: "+o.id;
        this.ikey.text=o.key;
        this.ititle.text=o.title;

        if(o1.c==undefined){

            this.dColor.value="#000000";
            this.dColor.visible=false;
        } else{

            this.dColor.value=o1.c;
            this.dColor.visible=true;
        }  
    }
}


function MBasPlus(c,x,y,f) {  
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


    this.panel=new DPanel(this.dCont, 0, 0)
    this.panel.width=this.widthBig-this.otstup*3;
    this.height=this.panel.height=94;

    var sah=this.otstup;
    var sahPlus=34;

    this.window=new DPanel(this.dCont, 200, -100)
    this.window.width=100;
    this.window.height=100



    this.sBagY=new DSliderBig(this.window.content, 2, 2, function(){
        self.o.bagY=this.value;
        self.dragOt();
        self.fun();
    }, "bagY", -100, 100);
    this.sBagY.okrug=100;
    this.sBagY.width=this.window.width-4




    this.sPriority=new DSliderBig(this.window.content, 2, 50, function(){
        self.o.priority=this.value;
        self.dragOt();
        self.fun();
    }, "priority", 0, 100);
    this.sPriority.okrug=1;
    this.sPriority.width=this.window.width-4



  

    this.drag=function(){
        self.drag1()
    }
    this.drag1=function(){    
        for (var i = 0; i < this.aStr.length; i++) {
            this.o.plus[i]=this.aStr[i].value;          
        }
        for (var i = 0; i < this.aStr1.length; i++) {
            this.o.plus1[i]=this.aStr1[i].value;          
        }
        self.fun();
    }

    this.dragOt=function(){
        for (var i = 0; i < this.o.plus.length; i++) {
            this.aStr[i].value=this.o.plus[i];           
        }
        for (var i = 0; i < this.o.plus1.length; i++) {
            this.aStr1[i].value=this.o.plus1[i];           
        }
        
        this.sPriority.value=this.o.priority;
        this.sBagY.value=this.o.bagY;
    }



    this.aStr=[];   
    var w=100;
    var ss=0; 
    this.plusss= function(text){  
        this.lstr=new DLabel(this.panel,this.otstup,sah+9,text);
        this.aStr[ss]=new DInput(this.panel,this.widthBig-w-this.otstup*5, sah,"null",this.drag);
        this.aStr[ss].idArr=ss
        this.aStr[ss].width=w;
        ss++;
        sah+=sahPlus;
    }


    this.plusss("артикул");
    this.plusss("название");
    this.plusss("размер");
    this.plusss("цена Бел");
    this.plusss("цвет");
    this.height=this.panel.height=sah+this.otstup;


    this.aStr1=[];   
    
    ss=0; 
    sah=0;
    this.plusss1= function(text){         
        this.aStr1[ss]=new DInput(this.panel, 110+this.widthBig-w-this.otstup*5, sah+this.otstup,"null",this.drag);
        this.aStr1[ss].idArr=ss;
        this.aStr1[ss].width=w;
        ss++;
        sah+=sahPlus;
    }


    this.plusss1("артикул");
    this.plusss1("название");
    this.plusss1("размер");
    this.plusss1("цена Бел");
    this.plusss1("цена Бел");


    this.setObj= function(o){       
        this.o=o;
        if(this.o.plus==undefined){
            this.o.plus=["данные","данные","данные","1000","xz"];
            self.fun();
        }
        if(this.o.plus1==undefined){
            this.o.plus1=["данные","данные","данные","1000","xz"];
            self.fun();
        }

        if(this.o.priority==undefined){
            this.o.priority=0;
            self.fun();
        }  
        if(this.o.bagY==undefined){
            this.o.bagY=0;
            self.fun();
        }  
              
        this.dragOt();
    }



}


