

import { GalleryXZ } from './GalleryXZ.js';

export function MThree(menu, fun) {  
    var self=this   
    this.type="MThree";
    this.par=menu;
    this.fun=fun;
    this.param=menu.param;
    this.otstup=this.param.otstup;
    this.wh=32;
    this.whv=20;



    this.widthBig=this.param.sizeBase-this.otstup*2;
    this.objectBase=200;
    this.dCont=new DCont(this.par.window);

    this._width=100;
    this._height=200;
    this._active=false
    this._index=-1;
    this._iOld=-1;
    this._arrayOld=[];
    this._iArr=this.objectBase.three;

    this.rect={x:0,y:0,w:100,h:100,visible:this._active,fun:function(s,p){

    }}
    this.initBool=false;

    this.w=new DWindow(this.dCont, this.otstup, 0," ");
    this.w.width=this.widthBig;
    this.w.height=this._height;
    this.rect.height=this._height
    this.w.dragBool=false;
    this.w.hasMinimizeButton=false;

    



   /* this.input=new DInput(this.w, this.otstup*2 ,34,"null",function(){
        self.gallery.array[self._index].object.keyName=this.text;
        aGlaf.save();
    })
    this.input.width=this.widthBig-this.otstup*2;
    this.input.visible=false*/

    this.gallery=new GalleryXZ(this.w.content, this.otstup ,this.otstup,function(s,p1){ 
        if(s == "index"){           
            self.index=this.index;
            self.openUUID(this.obj.uuid);
        } 
        if(s == "index2"){                    
            self.index=this.index;
            self.openUUID(this.obj.uuid,true);
        } 


    })
    this.gallery.width=this.widthBig-this.otstup*2;
    this.gallery.kolII=5;
    this.gallery.widthPic=46;
    this.gallery.heightPic=46;
    this.gallery.height=this._height-32-this.otstup*2
    this.oldRandom=-1;

    this.gallery.param=menu.param




    this.redragGalTime=function(){
        trace("redragGalTime")
        if(this.gallery.array[this.gallery.index]){
            this.gallery.array[this.gallery.index].startLoad(this.gallery.array[this.gallery.index].object)
        }
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

    this.setObj= function(o){
        var obj={
            id:o.id, 
            key:o.timeKey, 
            uuid:this.generateRendom(2),
            array:[]
        }
        ooww.array.unshift(obj);            
        this.gallery.start(ooww.array);
        this.gallery.index=0;
        this.openUUID(obj.uuid);        
        this.fun("saveTime"); 

       // aGlaf.save();
    }

    this.nazad=function(){
       /* if(self._arrayOld.length==0){
            self.ab[0].alpha=0.5;
            self._index=-1;
            self._iOld=-1;
            self._arrayOld=[];
            self._iArr=self.objectBase.three;
            self.gallery.start(self._iArr);
            return;
        }
        self.objectBase=self.par.objectBase;
        self._iArr=self.getNazad(self.objectBase.three, self._arrayOld, 0);
        self.gallery.start(self._iArr);
        self._arrayOld.splice(self._arrayOld.length-1,1);*/
       
       // self.openUUID(self.objIn.uuid)
    } 


    var aPar=[]
    var aPar1=[]
    var aParObj=[]
    this.dinObj=null
    this.funOpen=function(o){ 
        this.dinObj=o;
        this.fun("open",o);
        var b=true;
        var bb=null
       
        aPar.length=0
        bb=this.getParantUU(self.objXZ, o.uuid, 0)
        if(aPar.length<=1){
           b=false
        }
       
        
        trace("bbbbbbbbb",b,aPar,bb,o.uuid);
        this.ab[0].activMouse=b
    }  


    var oo={ii:0,par:null}
    var ooww=null
    this.openUUID=function(uuid, bool){     
        if(bool!==undefined){
            ooww=self.getOtUU(self.objXZ, uuid); 
            this.gallery.index=-1;
            this.gallery.start(ooww.array);

            trace("ooww",ooww)
            
            if(ooww.array.length!=0){
                this.gallery.index=0;
                this.funOpen(this.gallery.array[this.gallery.index].object);

            }else{
                
            }

            aPar.length=0
            aPar1.length=0
            var bb=this.getParantUU(self.objXZ, uuid, 0)
            for (var i = 0; i < aPar.length; i++) {
                aPar1[i]=aPar[i];
            }  
            this.batTax.array=aPar1
            trace()          
        }else{
            //trace("---------------",this.gallery.array[this.gallery.index].object)

            this.funOpen(this.gallery.array[this.gallery.index].object);
        }                             

    }




    this.getOtUU=function(o,uuid){   
        if(uuid==o.uuid){
            return o; 
        }
        for (var i = 0; i < o.array.length; i++) {
            aPar.push
            var ooe=this.getOtUU(o.array[i],uuid)
            if(ooe!=null){
                return ooe
            }
        }

        return null; 
    }
    var xzObo,oo1
    var po,pi
    this.getParantUU=function(o,uuid,sah){
        po=null
        pi=-1;
        if(sah==0){
            xzObo=null
        }
        for (var i = 0; i < o.array.length; i++) {
            //var ooe=this.getParantUU(o.array[i], uuid, sah+1)
            oo1=o.array[i]
            po=this.getParantUU(o.array[i], uuid, sah+1)

            if(po!=null){ 
                pi= i; 
                po=o//.array[i]    
                    
                //if(popo==undefined)
                break
            }
         
        }

        if(uuid==o.uuid){
            xzObo = oo1 
            return o; 
        }

        if(pi!=-1){
            aPar[sah]=pi
            aParObj[sah]=po
            return po            
        }
        return null; 
    } 


    var gpar 
    this.getParWW=function(o,uuid){ 
        if(o.array){
            if(uuid==o.uuid){
                return true; 
            }
            var gpar=o                      
            for (var i = 0; i < o.array.length; i++) {
                var  pp = this.getParWW(o.array[i],uuid)
                
                if(pp==true){
                    oo.ii=i 
                    oo.par=gpar  
                }
            } 
        }
        return false;          
    }



    this.getNazad=function(array, aS, sah){
        let a=array[aS[sah]].array
        sah++;        
        if(aS.length!=sah){
            a=this.getNazad(a, aS, sah)
        } 
        return a;
    }

    this.objXZ=undefined
    this.startObj=function(o){
        this.objXZ=o;
        ooww=null
        if(this.objXZ.uuid==undefined){
            this.objXZ.uuid=this.generateRendom()       
            this.objXZ.array=[];
            this.fun("saveTime");            
        }

        this.openUUID(this.objXZ.uuid, true) 
    }



    var a=[];
    this.down=function(){
        if(this.idArr==0){//nazad  
            aPar.length=0;
            aParObj.length=0; 
            var bb=self.getParantUU(self.objXZ, self.dinObj.uuid, 0) 
            let rtyi=aParObj[aParObj.length-1].uuid
            self.openUUID(aParObj[aParObj.length-2].uuid,true)
            for (var i = 0; i < self.gallery.array.length; i++) {                
                if(self.gallery.array[i].object.uuid==rtyi){                    
                    self.gallery.index=i;
                    self.funOpen(self.gallery.array[self.gallery.index].object);
                    break
                }
            }                                       
        }
        if(this.idArr==1){//убиваем 


             
            aPar.length=0;
            aParObj.length=0; 
            var bb=self.getParantUU(self.objXZ, self.dinObj.uuid, 0) 
            let rtyi=aParObj[aParObj.length-1];

            for (var i = 0; i < aParObj[aParObj.length-1].array.length; i++) {
                if(aParObj[aParObj.length-1].array[i].uuid==self.dinObj.uuid){                    
                    var a=aParObj[aParObj.length-1].array;
                    a.splice(i,1);
                    if(aParObj[aParObj.length-2]==undefined){
                        self.openUUID(self.objXZ.uuid,true)
                    }else{
                        self.openUUID(aParObj[aParObj.length-2].uuid,true)
                    }
                    self.fun("saveTime");  

                    return
                }
            }     
        }
        if(this.idArr==2){//<<          
            var a1=self.gallery.index;
            if(a1>0) {                
                aPar.length=0;
                aParObj.length=0;
                var bb=self.getParantUU(self.objXZ, self.dinObj.uuid, 0) 
                let rtyi=aParObj[aParObj.length-1].uuid;
                for (var i = 0; i < aParObj[aParObj.length-1].array.length; i++) {
                    if(aParObj[aParObj.length-1].array[i].uuid==self.dinObj.uuid){                    
                        var a=aParObj[aParObj.length-1].array;                    
                        var rr=a.splice(i,1);
                        a.splice(i-1,0,rr[0]);                                           
                        self.openUUID(rtyi)
                        self.gallery.start(a)
                        self.gallery.index=i-1  
                        self.fun("saveTime");     
                        return
                    }
                } 

            }                      
        }

        if(this.idArr==3){//>>>>>>            
            var a1=self.gallery.index;
            if(a1<self.gallery.array.length) {                
                aPar.length=0;
                aParObj.length=0;
                var bb=self.getParantUU(self.objXZ, self.dinObj.uuid, 0) 
                let rtyi=aParObj[aParObj.length-1].uuid;
                for (var i = 0; i < aParObj[aParObj.length-1].array.length; i++) {
                    if(aParObj[aParObj.length-1].array[i].uuid==self.dinObj.uuid){                    
                        var a=aParObj[aParObj.length-1].array;                    
                        var rr=a.splice(i,1);
                        a.splice(i+1,0,rr[0]);                                           
                        self.openUUID(rtyi)
                        self.gallery.start(a)
                        self.gallery.index=i+1  
                        self.fun("saveTime");     
                        return
                    }
                } 

            }                               
        }
    }
    var ot2=2;
    var b;
    var ww=32-ot2*2;
    this.ab=[]
    for (var i = 0; i < 4; i++) {
        b=new DButton(this.w,(ot2+ww)*i+ot2, ot2, " ",this.down);
        b.idArr=i;
        b.width=ww;
        b.height=ww; 
        if(i==0){
            b.text="<<";
            b.color="#ff0000"
            //b.alpha=0.5;
        }
        if(i==1)b.text="-";
        if(i==2)b.text="<"; 
        if(i==3)b.text=">"; 
        this.ab.push(b)
    }

    this.batTax=new BatTax(this,function(s,p){  
        let rtyi=aParObj[p].uuid
        self.openUUID(rtyi,true)
    })
    this.w.add(this.batTax.dCont)
    this.batTax.dCont.x=122;
    this.batTax.dCont.y=10;
    this.batTax.array=[2," sdfg345sdfg ",56]



    this.sizeWindow = function(w,h){  
        this._width=w;
        this._height=h;
        
           
    }


    this.objIn


   Object.defineProperty(this, "active", {
        set: function (value) {            
            if(this._active!=value){
                this._active=value;
                this.rect.visible=value;
                if(value==true){
                    this.dCont.add(this.w)
                    if(this.initBool==false){
                        this.initBool==true;
                        this.gallery.start(this._iArr);
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
            this._index=value;
                 
        },
        get: function () {
            return this._index;
        }
    });

}



export class BatTax {
    constructor(par, fun) {
        var self = this;
        this.type = "BatTax";
        this.fun = fun;
        this.par = par;
        this.param = par.param;
        this.dCont = new DCont();

        this.height =100; 
        this._width =300; 
        this._array =[]; 


        this.dCont.x=par.param.otstup;
    


        this.bbb=[]


        this.sob = function () {
            self.fun("",this.idArr)
        }


        var s=""
        this.drag = function () {
            for (var i = this.bbb.length - 1; i >= 0; i--) {
                this.bbb[i].visible=false;
            }

            
            
            for (var i = 0; i < this._array.length; i++) {   
                if(this.bbb[i]==undefined){
                    this.bbb[i]=new DButton(this.dCont,0,0," ",this.sob)
                    this.bbb[i].idArr=i;
                    this.bbb[i].fontSize=this.param.fontSizeLittel;
                    this.bbb[i].height=this.bbb[i].fontSize+this.param.otstup*2;
                }
                this.bbb[i].text=this._array[i]+""
                this.bbb[i].visible=true;

                this.bbb[i].width=this.bbb[i].text.length*0.5*this.bbb[i].fontSize+15
                if(i==0){
                    this.bbb[i].x=0
                }else{
                    this.bbb[i].x=this.bbb[i-1].x+this.bbb[i-1].width+1
                }
            }
         
            
          
        }

      

        this.redText=function(_c){
            var c=_c+""
            var a=c.split('"')

            if (a.length!=1){
                c=""
                for (var i = 0; i < a.length; i++) {
                    c+=a[i]
                }
            }
            return c
        }    

    }

    set width(value) {
        if (this._width != value) {
            this._width = value; 
                 
            this.drag()
                                          
        }             
    }
    get width() { return this._width; }

    set array(value) {
        
            this._array = value;           
            this.drag()
                                          
                    
    }
    get array() { return this._array; }
}
