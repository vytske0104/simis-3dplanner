

export function MResurs(dCont, _x,_y,fun) {  
    var self=this   
    this.type="MResurs";
    this.fun=fun;


    this.otstup=1//aGlaf.otstup;
    this.wh=28;
    this.whv=aGlaf.whv;
    this.widthBig=aGlaf.widthBig-8;
   
    this.dCont=new DCont(dCont);
    this.dCont.x=_x;
    this.dCont.y=_y;

    this.array=[];

    this.w=new DWindow(this.dCont, this.otstup, this.otstup," ");

    this.w.dragBool=false;
    this.w.hasMinimizeButton=false;
   // this.w.minimize=true;
    this.w.width=this.widthBig;
    this.w.height=80;

    
    this.button=new DButton(this.w,this.otstup,this.otstup,"+",function(){
        self.plus1()
    })
    this.button.width=this.button.height=this.wh;
    //this.button.startFile();



    this.bClose=new DButton(this.w,this.widthBig-this.wh-this.otstup,this.otstup,"x",function(){        
        self.object.resurs = {array:[]}
        self.resurs=self.object.resurs
        self.killl();
        self.dragScane2();
        self.fun();

    })
    this.bClose.width=this.bClose.height=this.wh;


    this.izStat=new IzStat(this,this.w.content,function(s,p){        

        self.fun("saveTime")
        self.fun();
    })
    


 

    this.plus1=function(){ 
        var oo={
            name:"null", 
            size:1,
            b:false,
            i:"x",
            i1:"x",
            i2:"x"
        }
        this.object.resurs.array.push(oo)
        this.dragScane2();
        self.fun();
    }







    this.dragBat=function(s,p){
        if(s=="saveTime")self.fun("saveTime")
        if(s=="kill"){
            self.object.resurs.array.splice(p,1)
            self.dragScane2();
            self.fun();
        }

        if(s=="verh"){            
            if(this.idArr==0)return;
            var pp=p
            var oo=self.object.resurs.array.splice(p,1)[0]
            self.object.resurs.array.splice(p-1,0,oo)            
            self.dragScane2();
            self.fun();
        }

        if(s=="getMod"){
            var o=aGlaf.s3d.getMod()            
            p(o)
            self.fun();
            self.fun("saveTime")


        } 

        if(s=="setMod"){
            var o=aGlaf.s3d.setMod(p)

        }   

    }



    this.clear=function(){
        //this.w.width=this.wh+this.otstup*2;
       // this.w.minimize=true;
        //this.bClose.visible=false
        
        for (var i = 0; i < this.array.length; i++) {
            this.array[i].dCont.visible=false;
        }
    }


    this.dragScane2=function(){
        this.clear()
        var l='../'+aGlaf.resursData + self.object.id+"/resources/";
        //this.w.width=this.widthBig;
        //this.w.minimize=false;            
        for (var i = 0; i < this.resurs.array.length; i++) {                
            if(this.array[i]==undefined){
                this.array[i]=new MRBlok(this, this.w.content, i, this.dragBat)
            }
            this.array[i].dCont.visible=true;
            
            if(this.array[i].setObj(this.resurs.array[i], l)==true){
                b=true
            }
        }
        var hh=70
        
        this.w.height=(hh+this.otstup)*this.resurs.array.length+68;
    }

    var b1=0

    this.itintt=function(){    
        if(b1!=0)return
        b1=1

        aGlaf.menu.dragPic.addFunAp(function(){    
            if(nnnn==-1) return         
            if(aGlaf.menu.dragPic.object!=undefined){            
                if(aGlaf.menu.dragPic.object.id!=undefined){ 
                    var p=Math.round(Math.random()*100)+"_128.png"

                    var l='../' + aGlaf.resursData + self.object.id+"/resources/"+p
                    var ll='../' + aGlaf.resursData +aGlaf.menu.dragPic.object.id+"/128.png"
                    var nn=nnnn
                    self.array[nn]

                    self.array[nn].object.name=p;        
                    self.array[nn].fun("saveTime");
                    setTimeout(function() {
                        self.array[nn].setObj(self.array[nn].object, self.array[nn].doLink)
                    }, 100);

                    php.load({ tip: 'copy',  dir: l,dirWith:ll},function(s){            
                        
                    })
                }
            }
        })

    }

/*
        var p=Math.round(Math.random()*100)+"_"+file.name
        var dir='../' + aGlaf.resursData +par.object.id +"/resources/"+p;   

*/
    var nnnn=-1
    this.na=function(num){ 
        nnnn=num;
        self.itintt()       
    }



    this.object=undefined;
    this.resurs=undefined;
    this.setObj=function(o){
        var b=false;
        this.object=o;
        if(this.object.resurs==undefined){
            this.object.resurs = {array:[]}
            b=true;
        }        

        this.resurs=this.object.resurs;
        this.dragScane2();

        this.izStat.setObj(this.object)
        return b;
    }

}

function IzStat(par, _cont, fun) {  
    var self=this   
    this.type="MResurs";
    this.fun=fun;
    this.par=par;
    this.dCont=new DCont(_cont);
    this.dCont.y=1
    this.dCont.x=1
    this.otstup=1
    this.height=32;
    this.width=par.widthBig-this.otstup*4;


    this.panel=new DPanel(this.dCont, this.otstup, this.otstup);
    this.panel.height=this.height
    this.panel.width=this.width;


    this.string="null"

    this.button=new DButton(this.dCont,this.panel.width-this.height-this.otstup*1,this.otstup,"x",function(){
        
        delete self.object.iz
        self.object.iz=undefined      
    
        self.setObj(self.object)
        fun()
 

    
    })
    this.button.width=this.button.height=this.height-this.otstup*2;

    this.button1=new DButton(this.dCont,this.panel.width-(this.height-this.otstup)*3-this.otstup*2,this.otstup,">>",function(){
        self.drag()        
        var o=aGlaf.s3d.getMod()        
        var s= JSON.stringify(o)
        var ss=""
        for (var i = 0; i < s.length; i++) {                
            if(s[i]=='"')ss+='|'
            else ss+=s[i]    
        }
        self.string=ss;
        self.object.iz.str=ss;
        self.setObj(self.object)      
        fun()

    })
    this.button1.width=(this.height-this.otstup*2)*2
    this.button1.height=this.height-this.otstup*2;

    this.chek=new DCheckBox(this.dCont, 3, this.otstup+5,"a", function(){

        self.object.iz.a=this.value;
        fun()
    });

    this.chek1=new DCheckBox(this.dCont, 40, this.otstup+5,"st", function(){
        self.object.iz.st=this.value;
        //self.drag()        
        fun()
    });


    this.visiInt=function(b){        
        this.button.visible=this.chek.visible=this.chek1.visible=b
    }




    this.drag=function(){       
       if(this.object==undefined)return
       if(this.object.iz==undefined){
           this.object.iz={}  
           this.object.iz.a=true;
           this.object.iz.st=false;
           this.object.iz.str= '[]';  
        }

        this.chek.value=this.object.iz.a;
        this.chek1.value=this.object.iz.st;
        this.string=this.object.iz.str;
    }


    this.object=undefined
    this.setObj=function(o){
        this.object=o;
        trace(">>>>object==",o)
        this.visiInt(false)
        if(this.object.iz!=undefined) {
            this.visiInt(true)
            this.drag()
        }
    }
}





function MRBlok(par, _cont, _idArr, fun) {  
    var self=this   
    this.type="MResurs";
    this.fun=fun;
    this.par=par;
    this.idArr=_idArr;

    this.otstup=1//aGlaf.otstup;
    this.height=70;

    this.whv=aGlaf.whv;
    this.wh=18
    this.width=par.widthBig-this.otstup*3;
    this.dCont=new DCont(_cont);
    this.dCont.y=this.idArr*(this.height+this.otstup)+34

    this.panel=new DPanel(this.dCont, this.otstup, this.otstup);
    this.panel.height=this.height
    this.panel.width=this.width;

    var linkNull='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAIAAAACCAYAAABytg0kAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAATSURBVBhXY9h0/vV/EIYyXv8HAHkYDa3OOowMAAAAAElFTkSuQmCC'
    this.image=new DImage(this.panel, this.otstup, this.otstup, linkNull, function(){

    });
    this.image.height=this.image.width=this.height-this.otstup*2;


    this.but=new DButton(this.dCont,this.otstup, this.otstup," ",function(){
       
        startFile(this.files[0])
    })
    this.but.height=this.but.width=this.height-this.otstup*2;
    this.but.startFile();

    this.but.fun_mouseover=function(){
        self.par.na(self.idArr)
    }
    this.but.fun_mouseout=function(){
        self.par.na(-1)
    }
    this.na

    this.butGet=new DButton(this.dCont,this.otstup, this.otstup," ",function(){
        self.getFile(mhbd.getLink(self.object.icon),function(e){
            trace(e)

        })
        
    })
    this.butGet.height=this.butGet.width=12;
    this.butGet.borderRadius=11
    this.butGet.color=dcmParam.colorActive

    this.getFile=function(url, fun) {  
       
        var down = document.createElement('a');        
        down.href = url;
        down.download = self.object.name;
        down.click();
    }

    this.label=new DLabel(this.dCont, this.otstup+this.height, this.otstup,"name");


    this.button=new DButton(this.dCont,this.width-this.otstup-this.wh-1,this.otstup,"x",function(){
        if(self.object.iconId){
            mhbd.clearFile("objects3d",self.object.iconId);            
        }
        self.fun("kill",self.idArr);
    })
    this.button.width=this.button.height=this.wh-2;


    this.button1=new DButton(this.dCont,this.width-30,this.otstup+39,">>",function(){
        self.input.text="iz"
        self.fun("getMod",function(o){
            var s= JSON.stringify(o)
            var ss=""
            for (var i = 0; i < s.length; i++) {                
                if(s[i]=='"')ss+='|'
                else ss+=s[i]    
            }

            
            self.input1.text=ss
            self.down()

        });
    })
    this.button1.width=this.button1.height=24;


    this.button11=new DButton(this.dCont,this.width-30-26,this.otstup+39,"<<",function(){
        //if(self.input.text=="iz"){
            var s= self.input1.text
            var ss=""
            for (var i = 0; i < s.length; i++) {                
                if(s[i]=='|')ss+='"'
                else ss+=s[i]    
            }

            var conf = JSON.parse(ss)
            
            self.fun("setMod",conf);

            
       // }        
    })
    this.button11.width=this.button11.height=24;



    this.button2=new DButton(this.dCont,this.width-30-26*2,this.otstup+39,"<",function(){
        self.fun("verh",self.idArr);
    })
    this.button2.width=this.button2.height=24;


    this.brr1=new DButton(this.dCont,this.image.width+6,this.image.height-16,".",function(){
        self.brr1.alpha=0.5;
        self.brr2.alpha=1;
        self.object.i2="x"
        self.fun("saveTime");
    })
    this.brr1.width=this.brr1.height=12;

    this.brr2=new DButton(this.dCont,this.brr1.x+14,this.image.height-16,"r",function(){
        self.brr1.alpha=1;
        self.brr2.alpha=0.5;
        var a=aGlaf.s3d.sMod.getRect(); 
       
        var s="rect,"+Math.round(a[0]*1000)/1000;
        for (var i = 1; i < a.length; i++) {
            s+=","+Math.round(a[i]*1000)/1000;
        }
        
        self.object.i2=s
        self.fun("saveTime");

    })
    this.brr2.width=this.brr2.height=12;


    this.jsonNa=function(s,s1,s2){

    }
 


    this.down=function(){
        self.object.b=self.chek.value
        self.object.i=self.input.value
        self.object.i1=self.input1.value
        self.fun("saveTime");
    }



    this.chek=new DCheckBox(this.dCont, this.height, this.otstup+12," ", this.down);

    this.input=new DInput(this.dCont, this.height+20, this.otstup+18," ", this.down);
    this.input.height=16;
    this.input.width=(this.width-this.height-20-this.otstup*3)/2;

    this.input1=new DInput(this.dCont, this.height+20+this.input.width+this.otstup, this.otstup+18," ", this.down);
    this.input1.height=16;
    this.input1.width=this.input.width;




    function startFile(file) {
        trace(self.object,self.par.object)
        if(self.object.iconId){
            mhbd.clearFile("objects3d",self.object.iconId)
            trace("@@@@@@@@@@@@@@@@@@@@@@@")
        }
        mhbd.saveFile(file,"objects3d",self.par.object.id, (e)=> {
            self.object.icon=e.src;
            self.object.iconId=e.id;
            self.but.link=mhbd.getLink(e.src)
            trace(e)
            trace(self.object)
            trace(self.par.object)
            mhbd.setParam("objects3d",self.par.object.id,"json",JSON.stringify(self.par.object),function(e){ 

            })
        })

           
        /*var dir='../' + aGlaf.resursData +par.object.id +"/resources"

        php.load({ tip: 'isDir',  dir: dir},function(s){            
            if(s!="yesDir"){
                php.load({tip: 'mkdir',dir:dir}, function(){
                    startFile1(file)
                })
            }else{
                startFile1(file)
            }
        })*/
    }

    function startFile1(file) {
        var p=Math.round(Math.random()*100)+"_"+file.name
        var dir='../' + aGlaf.resursData +par.object.id +"/resources/"+p;        
        uploadFile(file, dir)

        self.object.name=p;        
        self.fun("saveTime");
        setTimeout(function() {
            self.setObj(self.object, self.doLink)
        }, 100);
    }



    function uploadFile(file, dest) {
        let serverURL = php.server + "src/phpBase.php";
        let data = new FormData();
        data.append('tip', 'saveFile');
        data.append('file', file);
        data.append('dest', dest);

        return $.ajax({
            url: serverURL,
            dataType: 'text',
            cache: false,
            contentType: false,
            processData: false,
            data: data,
            type: 'post'
        });
    }






    this.object
    this.doLink

    this.setObj=function(o, doLink){
        this.doLink=doLink
        var bb=false
        this.object=o;
        this.label.text=o.name;
        var aa=o.name.split(".")
 

        if(o.b==undefined){
            bb=true
            o.b=false;
            o.i="x";
            o.i1="x";
            o.i2="x";
        }

        this.chek.value=o.b;
        this.input.text=o.i;
        this.input1.text=o.i1;

        if(o&&o.i2&&o.i2!="x"){
            self.brr1.alpha=1;
            self.brr2.alpha=0.5;
        }else{
            self.brr2.alpha=1;
            self.brr1.alpha=0.5;
        }

        
        if(o.iconId){
            this.but.link=mhbd.getLink(o.icon)
        }else{
            this.but.link=null;
        }
               
        /*if(aa[aa.length-1]=="png"||aa[aa.length-1]=="jpg"){            
            this.but.loadImeg(doLink+o.name)
        }else{
            this.but.loadImeg(linkNull)
        }*/
        return bb;
    }






}