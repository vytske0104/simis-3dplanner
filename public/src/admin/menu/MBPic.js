




export  function MBPic(c,x,y,f) {  
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
 
    this.y=y
    this.aSaze=[32,64,100,128,256,"original"];
    this.height=55
    this.o=undefined
    this.o11=undefined

    this.panel=new DPanel(this.dCont, 0, 0)
    this.panel.width=this.widthBig-this.otstup*3;
    this.panel.height=this.height;

    this.fotoDrag=new FotoDrag(function(){

        //self.narezka();
    })



    this.arBase=[]
    this.narezka=function(){
        this.arBase=[]        
        var s
        for (var i = 0; i < this.aSaze.length; i++) {
            s=this.aSaze[i]+".png";
            this.arBase.push(this.fotoDrag.na(this.aSaze[i], 0));
            this.arBase.push(s);
        }
        for (var i = 0; i < this.aSaze.length; i++) {
            s="y"+this.aSaze[i]+".png";
            this.arBase.push( this.fotoDrag.na(this.aSaze[i], 1));
            this.arBase.push(s);
        }
        self.fun("sArray", this.arBase); 

        this.button.loadImeg(this.arBase[2])
    } 


    this.button=new DButton(this.panel,this.otstup,this.otstup,"",function(base64){        
        
        self.fun("fileIcon", this.files[0]);
        /*if(base64!=undefined){ 
            self.l.text=this.files[0].name;            
            self.o.orig=this.files[0].name;
            self.fun("baseOrig", base64, this.files[0].name); 
            self.fotoDrag.setLink(base64);
        }*/

    })//,"src/admin/icon/i2.png"
    this.button.startFile();
    this.button.width = this.button.height= this.height- this.otstup*3;
    
    /*var s=""
    for (var i = 0; i < this.aSaze.length; i++) {
        s+=this.aSaze[i]+","
    }  

    this.l=new DLabel(this.panel,this.otstup*2+this.button.width,this.otstup,s)   
    this.l.fontSize=10
    this.l.width=this.panel.width-this.otstup*2+this.button.width;


    this.l=new DLabel(this.panel,this.otstup*2+this.button.width,this.otstup+12,""+this.aSaze[0]+".png"+"  не сжат   x"+this.aSaze[0]+".png"  )   
    this.l.fontSize=10
    this.l.width=this.panel.width-this.otstup*2+this.button.width;

    this.l=new DLabel(this.panel,this.otstup*2+this.button.width,this.otstup+32,"ndsfg");   
    this.l.width=this.panel.width-this.otstup*2+this.button.width;*/


    this.funnnnn = function () {
      
        if(self.input.text!==self.obj.name){
             mhbd.setParam(self.nameType,self.obj.id,"name",self.input.text,function(){

            })
        }
        if(self.input1.text!==self.obj.ru){
             mhbd.setParam(self.nameType,self.obj.id,"ru",self.input1.text,function(){

            })
        }
        if(self.input2.text!==self.obj.en){
             mhbd.setParam(self.nameType,self.obj.id,"en",self.input2.text,function(){

            })
        }

    }




    var xx=this.button.height
    var ww=(this.panel.width-xx-this.otstup*4)/2

    var yy=0

    this.label=new DLabel(this.panel,xx+this.otstup*3,this.otstup+10+yy,"name")
    this.label.fontSize=6   
    this.input=new DInput(this.panel,this.label.x+20,this.otstup+yy,"name",this.funnnnn)
    this.input.fontSize=12
    this.input.height=16
    this.input.width=118

    yy+=18

    this.label1=new DLabel(this.panel,xx+this.otstup*3,this.otstup+10+yy,"ru")
    this.label1.fontSize=8   
    this.input1=new DInput(this.panel,this.label1.x+20,this.otstup+yy,"ru",this.funnnnn)
    this.input1.fontSize=12
    this.input1.height=16
    this.input1.width=118

    yy+=18
    
    this.label2=new DLabel(this.panel,xx+this.otstup*3,this.otstup+10+yy,"en")
    this.label2.fontSize=8   
    this.input2=new DInput(this.panel,this.label1.x+20,this.otstup+yy,"en",this.funnnnn)
    this.input2.fontSize=12;
    this.input2.height=16;
    this.input2.width=118;


    /*this.label1=new DLabel(this.panel,xx+this.otstup*2+ww,this.otstup,"en")
    this.label1.fontSize=10*/





    this.butPic1=new DButton(this.panel,this.otstup*2+10,this.otstup*2," ",function(base64){        
         

        var d=aGlaf.visi3D.utility.debug;
        aGlaf.visi3D.utility.debug=false;
        aGlaf.s3d.sHelp.content3d.visible=false;
        var sk=aGlaf.visi3D.utility.sky.active;
        aGlaf.visi3D.utility.sky.active=false;


        var alpha=true;
        var color=0xffffff;

        if(aGlaf.visi3D.alpha==false){
            alpha=false;            
            aGlaf.visi3D.renderer.setClearColor(color, 1);
        }

        var ww=aGlaf.visi3D._width
        var hh=aGlaf.visi3D._height
        
        aGlaf.visi3D.sizeWindow(0,0,200,200)
        aGlaf.visi3D.render();



        var base64 = aGlaf.visi3D.renderer.domElement.toDataURL("image/png");
        
        resizeImageFile(base64,function(r){
            self.fun("fileIcon", r);
        })


        
        aGlaf.visi3D.sizeWindow(0,0,ww,hh)
        aGlaf.visi3D.utility.debug=d
        aGlaf.s3d.sHelp.content3d.visible=true
        aGlaf.visi3D.utility.sky.active=sk

        if(alpha==false){
            aGlaf.visi3D.renderer.setClearColor(aGlaf.visi3D.color, 1);
            
        }
           

    },"src/admin/icon/i2.png")
    
    this.butPic1.width=this.butPic1.height=16
    //this.butPic1.borderRadius=10
    //this.butPic1.color=dcmParam.colorActive
    this.butPic1.boolFond=false

    this.butGet=new DButton(this.dCont,this.otstup, this.otstup*3," ",function(){
        
        var url=mhbd.getLink(self.o.icon);
        var down = document.createElement('a');        
        down.href = url;
        //down.download = self.object.name;
        down.click();
        
    })
    this.butGet.height=this.butGet.width=10;
    this.butGet.borderRadius=11;
    this.butGet.color=dcmParam.colorActive;


    this.butww=new DButton(this.dCont,32, this.otstup*3," ",function(){
       
        menuBig.mCreatIcon.setFun(function(base64){
            if(base64){
                resizeImageFile(base64,function(r){
                    self.fun("fileIcon", r);
                });
            }
            
        }) 
    })
    this.butww.height=this.butww.width=10;
    this.butww.borderRadius=11;
    this.butww.color="#a6d7a6";


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


    this.obj
    this.nameType
    this.setObj= function(o, nameType){ 
        if(nameType)this.nameType=  nameType;  
        this.o=o; 
        this.obj =o;        
        //this.l.text="xz"//this.o.orig; 

        this.input.text=this.o.name
        this.input1.text=this.o.ru
        this.input2.text=this.o.en
        this.o11=o
        var link=mhbd.getLink(o.icon);
        if(o.icon)if(o.icon.src){
            link=o.icon.src;
        }  
        this.button.loadImeg(link);             
    }
}


function FotoDrag(fun) {  
    var self=this   
    this.type="FotoDrag";
    this.fun=fun;
    this.width=256;             
    this.height=256;
    





    var canvas = document.createElement('canvas');
    var ctx = canvas.getContext('2d');
    var image = new Image();    
    var image1 = new Image();



    var bbb
    image.onload = function() {         
        canvas.width = image.width;
        canvas.height = image.height;
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(image, 0, 0);
        ctx.filter = null;
        var imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        var pixels = imageData.data;
        var n=1
        for (var i = 0; i < pixels.length; i += 4) {
            pixels[i]     = n; 
            pixels[i + 1] = n; 
            pixels[i + 2] = n; 
        }   
        ctx.filter = 'blur(5px)';     
        ctx.putImageData(imageData, 0, 0);
        bbb=true
        image1.src=canvas.toDataURL('image/png');
    }

    image1.onload = function() {        
        if(bbb==true){          
            ctx.clearRect(0, 0, image1.width, image1.height);
            ctx.filter = 'blur(5px)'; 
            ctx.drawImage(image1, 0, 0, image1.width, image1.height);
            bbb=false;
            image1.src=canvas.toDataURL('image/png');
        }
        self.fun();
    }



    this.bool=false    
    this.setLink=function(base64,bool){
        this.bool=false
        if(bool)this.bool=bool;        
        image.src = base64;
    }

    this.na=function( num, tip){   

        canvas.width = num;
        canvas.height = num;
        ctx.clearRect(0, 0, num, num);
        

        if(self.bool)ctx.drawImage(image1, 0, 0, num, num);
        ctx.drawImage(image, 0, 0, num, num);
     
       // ctx.drawImage(image, 0, 0, num, num);

        return canvas.toDataURL('image/png');
    }






  




}

