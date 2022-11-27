


import { MinV3D} from './MinV3D.js';

export  function NaObj(menu, fun) {  
    var self=this   
    this.type="MatObject";
    this.fun=fun;
    this.par=menu;
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


    this.w=new DWindow(null, this.widthBig+this.otstup, this.whv,"Параметры обьета");
    this.w.width=this.widthBig;
    this.w.dragBool=false;
    this.w.hasMinimizeButton=false;
    this.cont=new DCont(this.w);
    this.cont.y=32
    this.content=new DCont(this.cont);
    this.cont.visible=false;

    this.minV3D=new MinV3D(this)

    this.psevdoThree=new PsevdoThree(this.w.content,0,0, this)



    this.o3d;
    this.setObj = function(o3d){ 
        this.o3d=o3d
        this.active=true;
        this.psevdoThree.setObj(o3d)
    }


    this.startObj=function(o){ 

        this.objActiv=o
        this.psevdoThree.testObj(o) 
        if(this.objActiv==null){            
            return 
        }
          

        if(this.objActiv.material!=undefined){
            this.psevdoThree.testMatIndex(this.objActiv.material)            
        }



    }



 


    var bb=false
    this.initdragPic=function(){ 
        if(bb==true)return
        bb=true;
        
        aGlaf.menu.dragPic.addFunAp(function(){
            
            if(self.psevdoThree.naObject3d==undefined)return  
             
            if(aGlaf.menu.dragPic.object!=undefined){  
                
                if(aGlaf.menu.dragPic.object.id!=undefined){             
                    //race("@@@@@@@@@@@dfg@@@@@@",aGlaf.menu.dragPic.object)
                    //if((aGlaf.menu.dragPic.object.id+"").indexOf("m_")!=-1){                                 
                        aGlaf.s3d.setMat(
                            self.psevdoThree.naObject3d,
                            aGlaf.menu.dragPic.object.id, 
                            null, true)                             
                    //}
                }
            }
        })
    }


    var boolNa=false;

    this.mouseover=function(){  
       boolNa=true; 
       self.initdragPic()          
      

    }    
    this.mouseout=function(){
       boolNa=false;   
      
    }       


    if(dcmParam.mobile==false){           
        this.w.div.addEventListener("mouseover", self.mouseover)
        this.w.div.addEventListener("mouseout", self.mouseout)
    }





    this.sizeWindow = function(w,h){  
        this._width=w;
        this._height=h;
        this.w.height= h - this.whv- this.otstup;  
        this.w.x= w-this.widthBig        
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


function PsevdoThree (cont, _x, _y,par) {    
    this.type = 'PLPanel';
    var self = this;
    this.par=par

    this.dCont=new DCont(cont);
    
    this.dCont.x = _x || 0;
    this.dCont.y = _y || 0;

    this.widthBig=aGlaf.widthBig;
    this.otstup=aGlaf.otstup;
    this.height=250
    this.array=[];
    this.arrayMat=[];
    this.ab=[]

    this.panel=new DPanel(this.dCont,this.otstup,this.otstup)
    this.dCp=new DCont(this.panel.content);
    this.panel.width=190
    this.panel.height= this.height
    this.panel.content.div.style.clip = "rect("+this.otstup+"px "+(this.panel.width-this.otstup*2)+"px "+(this.panel.height-this.otstup*2)+"px 0px)";


   /* this.scrol=new DScrollBarV(this.panel,this.panel.width-this.otstup*2,this.otstup,function(){
        self.scrolPos(false)
    }) 
    this.scrol.height=this.panel.height-this.otstup*3
    this.scrol.width =5
    this.scrol.offsetHit=20;*/


    this.batDofiga=new DButton(this.dCont,2,2,"Дофига обьектов FIXE",function(){
        this.visible=false;
        self.three.visible=true;
        self.three.setObj(self.o3d);
    })
    this.batDofiga.visible=false;
    this.batDofiga.width=this.panel.width-4;


    self.clicObj=undefined;
    this.three=new DThree(this.panel,2,2,function(o){
        self.clicObj=o.obj;
        self.setActiv(o.obj);
        aGlaf.s3d.sMod.startObj(o.obj, true);
    })
    this.three.height=250
    this.three.width=this.panel.width-4;
    this.three.heightBut = 20;

    


    this.three.mouseUpFun=function(o){


    }

    this.naObject3d 
    this.three.mouseOverFun=function(o){

        self.naObject3d=o.obj.obj
    }

    this.three.mouseOutFun=function(o){

        self.naObject3d=undefined
    }







    this.testObj=function(o){
        if(o && o.uuid) {
            let but = this.three.bufferOt.find(
                but => but.obj && but.obj.obj && but.obj.obj.uuid === o.uuid);
            
            if (but && this.three.activId !== but.id) {
                this.three.activId = but.id
            }
        }
    }

    this.arrOldName=[]
    this.height=0
    this.clear=function(){
        this.array.length=0;
        this.arrayMat.length=0;
        this.arrOldName=[]
        this.height=0;
        for (var i = 0; i < this.ab.length; i++) {
            this.ab[i].visible=false;
        }
    }
    this.recTest = function(o3d, sah){        
        this.array.push(o3d)
        if(o3d.material!=undefined){
            var b=false;            
            for (var i = 0; i < this.arrayMat.length; i++) {
                if(this.arrayMat[i].uuid==o3d.material.uuid){
                    b=true
                }
            }
            if(b==false)this.arrayMat.push(o3d.material)
        }

        if(o3d.oldName!=undefined){
           
            var b=false;
            for (var i = 0; i < this.arrOldName.length; i++) {
                if(this.arrOldName[i].oldName==o3d.oldName){
                    b=true
                }
            }
            if(b==false)this.arrOldName.push(o3d)
        }

        o3d.sah=sah;
        var sahh=sah+1;
        
        if(o3d.children){
            for (var i = 0; i < o3d.children.length; i++) {
                this.recTest(o3d.children[i], sahh);
            }
        }
    }


    this.testMatIndex= function(_mat){ 
        var ii=-1;  
        for (var i = 0; i < this.gallery.arrayObj.length; i++) {            
            if(this.gallery.arrayObj[i].mat.uuid==_mat.uuid){
                ii=i;
            }
        }

        this.gallery.index=ii
    }


    ////////////////////////////////////
    this.dragMat = function(){   
        var o = {arr:[]}
       
        for (var i = 0; i < this.arrOldName.length; i++) {
            var oo={}
            oo.src=minV3D.getPic(this.arrOldName[i].material,100); 
            oo.mat=this.arrOldName[i].material
            oo.title="null";
            if(oo.mat.name!=undefined)if(oo.mat.name!=null)if(oo.mat.name!="")oo.title=oo.mat.name
            if(oo.mat.idObj) {
                oo.title+=this.arrOldName[i].oldName+" : \n"+oo.mat.idObj.id+"\n"+oo.mat.idObj.title;
            } 
           
            oo.color="#c7edfc"
            var b=true
            for (var j = 0; j < this.arrayMat.length; j++) {                
                if(this.arrayMat[j].uuid==this.arrOldName[i].material.uuid){
                    this.arrayMat.splice(j,1);

                    j=99999
                }
            }
           
            o.arr.push(oo)
        }/**/


        for (var i = 0; i < this.arrayMat.length; i++) {
            var oo={}
            oo.src=minV3D.getPic(this.arrayMat[i],100);            
            oo.mat=this.arrayMat[i]
            oo.title="null";
            if(oo.mat.name!=undefined)if(oo.mat.name!=null)if(oo.mat.name!="")oo.title=oo.mat.name
            if(oo.mat.idObj) {
                oo.title+="\n"+oo.mat.idObj.id+"\n"+oo.mat.idObj.title
            } 
            oo.color="#e2e7ed"            
            o.arr.push(oo)
        }       

        this.gallery.start(o.arr)
        for (var i = 0; i < this.gallery.arrayObj.length; i++) {
            this.gallery.array[i].label.fontSize=10
            this.gallery.array[i].label.visible=true;
            this.gallery.array[i].label.colorText1="#aa0000"
            this.gallery.array[i].label.width=89
            this.gallery.array[i].panel.color=o.arr[i].color
            this.gallery.array[i].color=o.arr[i].color
            this.gallery.array[i].color1=o.arr[i].color
        }
    }  

    





    //////////////////////////////////////



    var kolTri
    this.zborInfa = function(o3d){ 
        kolTri=0;
        this.dsfgasdf(o3d);        
        let s="point: "+kolTri;
        if(o3d.children){
            s+=" child: "+o3d.children.length
        }

        this.par.w.text=s;

    }

    this.dsfgasdf = function(o3d){        
        
        if(o3d.geometry!=undefined){
            if(o3d.geometry.index!=undefined){                        
                kolTri+=o3d.geometry.index.count/3
            }
        }
            
        if(o3d.children){
            for (var i = 0; i < o3d.children.length; i++) {
                this.dsfgasdf(o3d.children[i]);
            }
        }
    }


    this.objAkt
    this.openIdArr = function(i){ 
       
        
        this.setActiv(this.array[i])
        this.tween = new TWEEN.Tween(this.array[i].scale);
        var x=this.array[i].scale.x;
        var y=this.array[i].scale.y;
        var z=this.array[i].scale.z;
        this.array[i].scale.x*=1.5;
        this.array[i].scale.y*=1.5;
        this.array[i].scale.z*=1.5;
        this.tween.to({x:x, y:y, z:z},200).start();

        if(this.objAkt.material){
            for (var i = 0; i < this.arrayMat.length; i++) {
                if(this.arrayMat[i].uuid==this.objAkt.material.uuid){
                    this.gallery.index=i
                    break;
                }
            }
        }

            
    }  

    this.setActiv = function(o3d){ 
        this.objAkt=o3d
        this.dragNa(this.objAkt)
        this.zborInfa(this.objAkt);    
    }

    
    this.bulBat=new DButton(this.dCont, this.otstup, 0,"", function(){
        var b=true;
        if(self.arrayMat[0])if(self.arrayMat[0].wireframe!=undefined)b=!self.arrayMat[0].wireframe
     
        for (var i = 0; i < self.arrayMat.length; i++) {
            if(self.arrayMat[i].wireframe!=undefined)self.arrayMat[i].wireframe=b;
        }    
    },'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAADGklEQVRYR8WVaUhUURTH/2fG6alTY0Vg2AZCG5QUlpGEbYga7YIwRkULSYKWH6LF6oPt9aGsMIL2KEvKTEFbrGynsgWDsoJCFKkPkZjTaNn84yWvpMaZ955jva/3nvP7nXPPfVfwnz/5z3x0SiAig061gPp9km+2ENMCkemsC+uNfiLAp4+oe5cnA8xImBYYmkbmzG1DbiwEXh1UVYx/poJUTNRS1kaGoT8IvG1EbdUhGWgcD/MzMHYx35M4rkJFsPDREen7zwTiUjn4uw3Vd4+LVYVOWMBWSyuG3zotb4xKmDqCKfNI8aDvtXz5oAKnOhlOC95fP2V8DgwLJDmZASCjLF+GtK82ycnXQuwvPSN7jXTBsMCsFPJigfdKfa11JGVIICWZVyF4WXBOMr0lTElmLogRBYUyVW8XdAskJVHpo6D5ZJHvc54/m7Q2IORYhTTrkdAtsGQGG2HFnMNFcs1X4sUzOdkCFB8qlh4BE0hP5FhYcDuvVIL1JE2fRjc8iMu7JI/87dfVgawE0qbAsbNYPvtLqK6nT2J3RcHn3Zf9X0u/AmvimQMicXu5xOiBa3tWx/MBiCs7ymWDrzi/Ahsnkzk3/FfiDaIn1qfA1ol8QuBC9k3ZZKR6be/mOK4XQXL2TRlt+D+wPZph1hA0rLpjrnoNuGsCGRSEXlkV0uBNosMO5I5ni0cwLuuePDNTvRazO5ajrMSDzPui6BY4EMMEC3A27aH07Axciz0Yw0/iQeqySin7M5/XDhyNJu1uKCkv5GtABKJp6wZ8XfT47+P8SyB/FPMoiEx9KomBgGs5To1mqQWocT6V5e3z/hI4EUW73YMVEGxJft65wetI/PxIEkS2y4LcBVXiUvf9FLgcRfu3VjTVTAMGlQK9GxEaWyfuQHagJIKh0hMujWELQveEKnG1CQzj2pZ4bHVPB0JKgODyQKJ/52qOBzSGUo51CdWyrU0gnPZgB5ock4DGCsDm7poOOOxwaQy7C/Yx9fLl1wyoEo5QrLC1YI+60BU9qIxg6DcFK9sz/L4FXSHi9RZ0NcjwW/CvhH4AyKYPMODyEmQAAAAASUVORK5CYII=');


    this.bulBat.width=this.bulBat.height;


   /* this.butNaPm=new DButton(this.dCont, 120, 0,"< naPM", function(){
        
        aGlaf.menu.menuObject.mPRS.creat(true)
        var obj= aGlaf.menu.menuObject.mPRS.o[aGlaf.menu.menuObject.mPRS.keyName]
       
        
        obj.p[0]=self.objAkt.position.x;
        obj.p[1]=self.objAkt.position.y;
        obj.p[2]=self.objAkt.position.z;

        obj.r[0]=self.objAkt.rotation.x;
        obj.r[1]=self.objAkt.rotation.y;
        obj.r[2]=self.objAkt.rotation.z;

        obj.s[0]=self.objAkt.scale.x;
        obj.s[1]=self.objAkt.scale.y;
        obj.s[2]=self.objAkt.scale.z;

       
        aGlaf.menu.menuObject.mPRS.dragOt()

        aGlaf.menu.menuObject.mIndex.index=4


    });
    this.butNaPm.width=70*/




    this.panel=new DPanel(this.dCont, this.otstup, 0);
    this.panel.width=this.widthBig-this.otstup*3;
    var w=(this.panel.width-this.otstup*2)/3-this.otstup;
    
    var hh=24
    var ppp
    this.drag=function(){


        if(self.objAkt.iz==undefined)self.objAkt.iz={}
         

        ppp=self.objAkt[this.ttt]         
        if(this.idArr==0)ppp.x=this.value*1;
        if(this.idArr==1)ppp.y=this.value*1;
        if(this.idArr==2)ppp.z=this.value*1;

        if(this.idArr==999){
            self.objAkt[this.ttt]=this.value;
            self.objAkt.iz[this.ttt]=this.value;
            return
        }

        if(this.idArr==998){
            //self.objAkt[this.ttt]=this.value;
            if(this.value==true){
                self.objAkt[this.ttt]=1;
                self.objAkt.iz[this.ttt]=1;
            }else{
                self.objAkt[this.ttt]=-1;               
                self.objAkt.iz[this.ttt]=-1;
            }            
            return
        }

        if(this.idArr==997){//рубим тени от окна
           
            if(this.value==true){
                self.objAkt[this.ttt]=1;
                self.objAkt.iz[this.ttt]=1;
                self.objAkt.castShadow = false;     
                self.objAkt.receiveShadow = false; 
            }else{
                self.objAkt[this.ttt]=undefined;               
                self.objAkt.iz[this.ttt]=undefined;
                delete self.objAkt[this.ttt]
                delete self.objAkt.iz[this.ttt]

                self.objAkt.castShadow = true;     
                self.objAkt.receiveShadow = true; 
            }            
            return
        }




        if(self.objAkt.iz[this.ttt]==undefined)self.objAkt.iz[this.ttt]={} 
        self.objAkt.iz[this.ttt].x=ppp.x;
        self.objAkt.iz[this.ttt].y=ppp.y;    
        self.objAkt.iz[this.ttt].z=ppp.z;
       


 
    }

    this.dragNa=function(o3){
        this.ar[0].value=o3.position.x;
        this.ar[1].value=o3.position.y;
        this.ar[2].value=o3.position.z;

        this.ar1[0].value=o3.rotation.x;
        this.ar1[1].value=o3.rotation.y;
        this.ar1[2].value=o3.rotation.z;

        this.ar2[0].value=o3.scale.x;
        this.ar2[1].value=o3.scale.y;
        this.ar2[2].value=o3.scale.z;

        this.cheaVisi.value=o3.visible;

        if(o3.renderOrder==1)this.cheaRO.value=true;
        else this.cheaRO.value=false;   

        if(o3.bs!=undefined)this.cheaBS.value=true;
        else this.cheaBS.value=false;

        self.input.value=o3.name
        let s="notMaterial"
        if(o3.material){
            s=o3.material.name;
        }
        self.input1.value=s

    }

    var ottt=0;

    this.cheaVisi=new DCheckBox(this.panel,this.otstup+i*(w+this.otstup), -this.otstup,"visible",this.drag);
    this.cheaVisi.ttt="visible";
    this.cheaVisi.idArr=999;

    this.cheaRO=new DCheckBox(this.panel,70, -this.otstup,"ro",this.drag);
    this.cheaRO.ttt="renderOrder";
    this.cheaRO.idArr=998;

    this.cheaBS=new DCheckBox(this.panel,120, -this.otstup,"bs",this.drag);
    this.cheaBS.ttt="bs";
    this.cheaBS.idArr=997;
    


   /* this.inpRend=new DInput(this.panel,80, this.otstup,i+"0",this.drag);//renderOrder
    this.cheaVisi.ttt="renderOrder";
    this.cheaVisi.idArr=998;
    this.inpRend.width=30; 
    this.inpRend.height=hh;*/

    ottt=20;
    

    this.label=new DLabel(this.panel,this.otstup,this.otstup+ottt,"position")
    this.label=new DLabel(this.panel,this.otstup,this.otstup+(18+hh)+ottt,"rotation")
    this.label=new DLabel(this.panel,this.otstup,this.otstup+(18+hh)*2+ottt,"scale")

    this.ar=[];
    this.ar1=[];
    this.ar2=[];
    for (var i = 0; i < 3; i++) {
        this.ar[i]=new DInput(this.panel,this.otstup+i*(w+this.otstup), this.otstup+18+ottt,i+" ",this.drag);
        this.ar[i].height=hh;
        this.ar[i].idArr=i;
        this.ar[i].ttt="position";
        this.ar[i].width=w;  
        this.ar[i].fontSize=12;   
        this.ar[i].setNum(0.1); 
        this.ar[i].timeFun=1 

        this.ar1[i]=new DInput(this.panel,this.otstup+i*(w+this.otstup), (this.otstup+hh+18)+18+ottt,i+" ",this.drag);
        this.ar1[i].height=hh;
        this.ar1[i].idArr=i;
        this.ar1[i].ttt="rotation";
        this.ar1[i].width=w;  
        this.ar1[i].fontSize=12;   
        this.ar1[i].setNum(0.1); 
        this.ar1[i].timeFun=1 

        this.ar2[i]=new DInput(this.panel,this.otstup+i*(w+this.otstup), this.otstup*3+hh*4+ottt,i+" ",this.drag);
        this.ar2[i].height=hh;
        this.ar2[i].idArr=i;
        this.ar2[i].ttt="scale";
        this.ar2[i].width=w;  
        this.ar2[i].fontSize=12;   
        this.ar2[i].setNum(0.1); 
        this.ar2[i].timeFun=1  
    }
    var hh=35

    this.input=new DInput(this.panel,this.otstup+hh, this.ar2[0].y+this.ar2[0].height," ");
    this.input.fontSize=12
    this.input.height=14
    this.input.width=this.panel.width-this.otstup*4-hh
    new DLabel(this.panel,this.otstup,this.input.y+6,"Mesh").fontSize=10
    
    this.input1=new DInput(this.panel,this.otstup+hh, this.ar2[0].y+this.ar2[0].height+this.otstup*2+12," ");
    this.input1.fontSize=12
    this.input1.height=14
    this.input1.width=this.panel.width-this.otstup*4-hh
    new DLabel(this.panel,this.otstup,this.input1.y+6,"Mat").fontSize=10


    this.panel.height=this.ar2[0].y+this.ar2[0].height+this.otstup*2+24+24


    

   
    var naPic
    this.gallery=new DGallery(this.dCont,0,0,function(){
        
        
        naPic=[]
        self.parsinfGG(self.o3d,this.array[this.index].object.mat)        
        aGlaf.visi3D.arrOut=naPic
    })
    this.gallery.width=this.widthBig;
    this.gallery.kolII=2;
    this.gallery.widthPic=this.widthBig/2-10;
    this.gallery.heightPic=this.widthBig/2-10;


    this.o3d;
    this.objActiv=null






    var nameMat=undefined;


    var bb=false
    this.initdragPic=function(){ 
        if(bb==true)return
        bb=true;
        
       aGlaf.menu.dragPic.addFunAp(function(){ 
             trace("@@@@@@@@@@@@@@@@@")//,self.psevdoThree.naObject3d)
            if(nameMat==undefined)return
            if(aGlaf.menu.dragPic.object!=undefined){                
                if(aGlaf.menu.dragPic.object.id!=undefined){             
                    if((aGlaf.menu.dragPic.object.id+"").indexOf("m_")!=-1){
                        
                        
                        aGlaf.s3d.setMat(aGlaf.s3d.c3d, aGlaf.menu.dragPic.object.id, nameMat, true) 
                    
                    }
                }
            }
        })
    }




    this.gallery.funOver=function(){ 
        self.initdragPic()      
        if(this.object)if(this.object.title)nameMat=this.object.title
    }
    this.gallery.funOut=function(){
        nameMat=undefined;
    }






    this.parsinfGG=function(c,m){        
        if(c.children){
            for (var i = 0; i < c.children.length; i++) {
                this.parsinfGG(c.children[i],m)
            }
        }
        if(c.material!=undefined){
            if(c.material.uuid==m.uuid){
                naPic.push(c)
                //this.parttt(c)
            }
        }
    }

    this.parttt=function(c){
        var tween = new TWEEN.Tween(c.scale);
        var x=c.scale.x;
        var y=c.scale.y;
        var z=c.scale.z;
        c.scale.x*=1.25;
        c.scale.y*=1.25;
        c.scale.z*=1.25;
        tween.to({x:x, y:y, z:z},200).start();
        tween.onUpdate(function(){
            aGlaf.intRend=1;
        })
    }    

    
    this.xzxz = function(){ 
        /*for (var i = 0; i < this.array.length; i++) {
            if(this.ab[i]==undefined){
                this.ab[i]=new DButton(this.dCp, 0, i*hh, "nnn",function(){self.openIdArr(this.idArr) })
                this.ab[i].idArr=i;
                this.ab[i].height=hh
            }
            
            this.ab[i].x=this.array[i].sah*hh;
            this.ab[i].width=this.widthBig-this.ab[i].x;

            this.ab[i].visible=true;
            this.ab[i].text=this.array[i].name;
        }
        


        this.scrol.heightContent = this.array.length*hh;*/

        if(this.array.length>999950){
            this.batDofiga.visible=true;
            this.three.visible=false;
        }else{
            this.batDofiga.visible=false;
            this.three.visible=true;
            this.three.setObj(this.o3d)
        }


        



        this.height=250//this.array.length*hh;
        
        this.panel.y=this.height+this.otstup
        this.height=this.panel.y+this.otstup+this.panel.height

        this.bulBat.y=this.height
       // this.butNaPm.y=this.height

        this.gallery.y=this.height+35
    }

    var ii, jj, ww, hh, bat, sahLoad, wM, hM, sliderOtstup;
    this.scrolPos = function (_bool) {
        if (_bool == true) {
            //self.scrol.value = this.content.y / (this._height - self.scrol.heightContent) * 100;
           
        } else {
            self.dCp.y = (self.scrol.value / 100) * ( self.height - self.scrol.heightContent);
           
        }
       // self.dragIE()
    };


    this.o3d;
    this.setObj = function(o3d){ 
        this.o3d=o3d
        this.clear()
        this.recTest(o3d,0)
        this.xzxz()
        this.dragMat()
        this.setActiv(o3d)
        //this.openIdArr(0)
        //this.scrol.value=0
        self.dCp.y=0
    }
}
