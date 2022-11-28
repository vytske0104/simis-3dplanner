


export function MFilt(p,c,x,y,f) {  
    var self=this   
    this.type="MFilt";
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
    this.keyName="filt"


    this.panel=new DPanel(this.dCont, 0, 0)
    this.panel.width=this.widthBig-this.otstup*3;
    this.height=this.panel.height=94; 


   
    this.objArray={}
    
    this.array=[    new MMarker(this.panel,"mark",[{type:"input",startParam:"null",name:"id"}],"Marker считывает обьекты и по их позициям растовляет идишники обьектов, один слой. Например: xz1,xz2|13,45  вместо xz1 будут поставлен ид 13  если будет только иди то только меши подменит "),
                    new MMarker(this.panel,"material",[{type:"input",startParam:"null",name:"id"}],"На все меши обьенкта наложит матреьял по ключу ид матерьялов")]
  



    this.otMark=function(t,p){        
        if(t=="creat"){            
            var o={type:p}
            self.o[self.keyName].push(o)             
            self.dragOt()           
        }

        if(t=="index"){
            self.index=p
        }

        if(t=="delete"){

            for (var i = self.o[self.keyName].length - 1; i >= 0; i--) {

                if(self.o[self.keyName][i].type==p){
                    self.o[self.keyName].splice(i,1)
                }
                
            }
        }
        self.fun()
    }  



    for (var i = 0; i < this.array.length; i++) {
        this.objArray[this.array[i].key]=this.array[i]
        this.array[i].fun=this.otMark
        this.array[i].button.x=200;
        this.array[i].button.y=i*34;
        this.array[i].idArr=i
        this.dCont.add(this.array[i].button);
    }
    

    this.dragOt= function(){  
        for (var i = 0; i < this.array.length; i++) {            
            for (var j = 0; j < this.o[this.keyName].length; j++) {                
                if(this.array[i].key==this.o[this.keyName][j].type){                    
                    this.array[i].setObj(this.o[this.keyName][j]);
                }
            }            
        }
    }

    this.clear = function(){ 
        for (var i = 0; i < this.array.length; i++) {
            this.array[i].clear()
        }
    }

    this.setObj= function(o){ 
        this.clear()      
        this.o=o; 
        
        if(this.o[this.keyName]==undefined){
            this.o[this.keyName]=[]
            self.fun("saveTime");          
        }
        this.dragOt();       
    }

    setTimeout(function() {
        self.index=0
    }, 10);

    Object.defineProperty(this, "index", {
        set: function (value) {            
            if(this._index!=value){

                this._index=value;
                for (var i = 0; i < this.array.length; i++) {                    
                    if(value==i){
                        this.array[i].dCont.visible=true;
                        this.array[i].button.alpha=0.5
                    }
                    else {
                        this.array[i].dCont.visible=false;
                        this.array[i].button.alpha=1
                    }
                }                
            }           
        },
        get: function () {
            return this._index;
        }
    });
}



export function MMarker(c,k,a,t,f) {  
    var self=this   
    this.type="MMarker";
    this.dCont=new DCont(c);
    this.aKye=a;
    this.text=t;
    this.key=k;
    this.fun=f;
    this.object; 
    this.idArr=-1

    this.button=new DButton(this.dCont,2,2,this.key,function(){
        self.fun("index",self.idArr);
    });

    this.but=new DButton(this.dCont,2,2,"Создать",function(){
        


        if(self.but.text=="Удалить"){
            self.fun("delete",self.key);
        }else{
            self.fun("creat",self.key);
        }
    });
    



    this.label=new DLabel(this.dCont,2,35,t);
    this.label.width=180;
    this.label.fontSize=10;

    this.panel=new DPanel(this.dCont, 0, 0)
    this.panel.width=190;
    this.height=this.panel.height=94;  

    this.panel.alpha=0.25  

    setTimeout(function() {        
        self.panel.y=self.label.getRect().height+5+32
    }, 10);


    this.down= function(){  
        for (var i = 0; i < self.aKye.length; i++) {
            self.object[self.aKye[i].name]=self.objArray[self.aKye[i].name].value
        } 
        self.fun("save");      
    }
    var yy=2
    this.array=[]
    this.objArray={}
    var ooo
    for (var i = 0; i <  this.aKye.length; i++) {
        if(this.aKye[i].type=="input"){
            new DLabel(this.panel,2,yy+14,this.aKye[i].name);
            ooo=new DInput(this.panel,57,yy,"null",this.down)            
            ooo.idArr=i  
            ooo.width=130   
            this.array.push(ooo)
            this.objArray[this.aKye[i].name] = ooo;
            yy+=32
        }        
    }



    this.dragMod= function(){ 
        for (var i = 0; i < this.aKye.length; i++) {
            this.objArray[this.aKye[i].name].value=this.object[this.aKye[i].name]
        }
    }




    this.setObj= function(o){ 
        this.object=o;



        if(o.type==undefined){
            o.type=this.key                     
        }

        for (var i = 0; i < this.aKye.length; i++) {
            if(o[this.aKye[i].name]==undefined)o[this.aKye[i].name] = this.aKye[i].startParam                
        }



        this.but.text="Удалить";
        this.button.color=dcmParam.compToHexArray(dcmParam.hexDec(dcmParam._color), 25);
        
        this.panel.alpha=1

        this.dragMod()
    }


    this.clear = function(){ 
        this.but.text="Создать";        
        this.button.color=dcmParam.compToHexArray(dcmParam.hexDec(dcmParam._color), 0);
        this.object=undefined;
        this.panel.alpha=0.25
    }


}







export function MBase(p,c,x,y,f) {  
    var self=this   
    this.type="MBase";
    this.fun=f
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
    this.keyName="param";


    this.panel=new DPanel(this.dCont, 0, 0)
    this.panel.width=this.widthBig-this.otstup*3;
    this.height=this.panel.height=140;
   
    this.objArray={}
    
    this.drag=function(){




        for(var s in self.objArray){           
            if(self.o[self.keyName][s]!=undefined){
                self.o[self.keyName][s]=self.objArray[s].value
            }
        }
        
        self.par.par.par.s3d.pm.filt.dragParam(self.par.par.par.s3d.c3d,self.o[self.keyName])
        self.fun() 
    }


    this.objArray["tOt"] = new DCheckBox(this.panel,2, 2,"тень От",this.drag);
    this.objArray["tNa"] = new DCheckBox(this.panel,2, 22,"тень Na",this.drag);
    this.objArray["kesh"] = new DCheckBox(this.panel,2, 42,"кеш Instanced",this.drag);
    this.objArray["sG"] = new DCheckBox(this.panel,2, 62,"слитие геометрий",this.drag);

    this.objArray["clone"] = new DCheckBox(this.panel,2, 82,"clone",this.drag);
    this.objArray["rO"] =new DSliderBig(this.panel, 2, 112, this.drag, "уровень рендера", -1, 10);
    


    this.objArray["rO"].okrug=1;
    this.objArray["rO"].width=186;




    this.dragOt= function(){  
        for(var s in this.objArray){
            
            if(this.o[this.keyName][s]!=undefined)this.objArray[s].value=this.o[this.keyName][s]

        }
    }



    this.setObj= function(o){            
        this.o=o;        
        if(this.o[this.keyName]==undefined){
            this.o[this.keyName]={}
            this.o[this.keyName].tOt=false;
            this.o[this.keyName].tNa=false;
            this.o[this.keyName].rO=-1;//renderOrder
            this.o[this.keyName].kesh=false;
            this.o[this.keyName].sG=false;
            this.o[this.keyName].clone=true;

            this.fun()      
        }
        if(this.o[this.keyName].clone==undefined)this.o[this.keyName].clone=true;
        if(this.o[this.keyName].sG==undefined)this.o[this.keyName].sG=false;
        this.dragOt();       
    }
}





function MPRS(p,c,x,y,f) {  
    var self=this   
    this.type="MBase";
    this.fun=f
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
    this.keyName="psm";


    var sah=4;
    var ss=0
    var w=40
    var sahPlus=24;

    this.arrPosit=[];
    this.arrRotat=[];
    this.arrScale=[];   



    this.panel=new DPanel(this.dCont, 0, 0)
    this.panel.width=this.widthBig-this.otstup*3;
    this.height=this.panel.height=120;
   
    this.objArray={}
    
    this.drag=function(){
        
        for (var i = 0; i < 3; i++) {

            self.o[self.keyName].p[i]=testValue(self.arrPosit[i].value,self.arrPosit[i]); 
            self.o[self.keyName].r[i]=testValue(self.arrRotat[i].value,self.arrRotat[i]);
            self.o[self.keyName].s[i]=testValue(self.arrScale[i].value,self.arrScale[i]);         
        }

        self.fun("dragPozition",self.o[self.keyName])
        self.fun("saveTime")
       
    }

    function testValue(p, input){
        var r=p*1;
        if(isNaN(r)==true){
            input.value=0
            return 0
        }

        r=Math.round(r*100) / 100
        return r;  
    }



   // sah+=20
  

    new DLabel(this.panel,this.otstup,sah+9,"position");       
    for (var i = 0; i < 3; i++) {
        this.arrPosit[i]=new DInput(this.panel,64+i*(w+this.otstup), sah,i+" ",this.drag);
        this.arrPosit[i].idArr=i
        this.arrPosit[i].width=w;
        this.arrPosit[i].height=sahPlus-2; 
        this.arrPosit[i].setNum(0.1);
        this.arrPosit[i].timeFun=1      
    } 
    sah+=sahPlus;

    new DLabel(this.panel,this.otstup,sah+9,"rotation");       
    for (var i = 0; i < 3; i++) {
        this.arrRotat[i]=new DInput(this.panel,64+i*(w+this.otstup), sah,i+" ",this.drag);
        this.arrRotat[i].idArr=i
        this.arrRotat[i].width=w;
        this.arrRotat[i].height=sahPlus-2;  
        this.arrRotat[i].setNum(0.1);
        this.arrRotat[i].timeFun=1  

    } 
    sah+=sahPlus;

    new DLabel(this.panel,this.otstup,sah+9,"scale");       
    for (var i = 0; i < 3; i++) {
        this.arrScale[i]=new DInput(this.panel,64+i*(w+this.otstup), sah,i+" ",this.drag);
        this.arrScale[i].idArr=i
        this.arrScale[i].width=w;
        this.arrScale[i].height=sahPlus-2; 
        this.arrScale[i].setNum(0.1);
        this.arrScale[i].timeFun=1   

    } 
    sah+=sahPlus;




    this.creat = function(b){ 
        if(b==true){
            this.o[this.keyName]={}
            //this.o[this.keyName].active=true; 
            this.o[this.keyName].p=[0,0,0];
            this.o[this.keyName].r=[0,0,0];
            this.o[this.keyName].s=[1,1,1];
           
        }else{
            delete this.o[this.keyName]
           /* this.o[this.keyName].active=false;
            delete this.o[this.keyName].p;
            delete this.o[this.keyName].r;
            delete this.o[this.keyName].s;*/            
        }
        this.dragOt(); 
        self.fun("saveTime"); 
    }



    this.dragOt= function(){ 
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

        for (var i = 0; i < 3; i++) {
            this.arrPosit[i].value=this.o[this.keyName].p[i];           
        }   
        for (var i = 0; i < 3; i++) {
            this.arrRotat[i].value=this.o[this.keyName].r[i];           
        }   
        for (var i = 0; i < 3; i++) {
            this.arrScale[i].value=this.o[this.keyName].s[i];           
        }   

    }

    this.batACreat=new DButton(this.dCont, this.otstup, this.otstup,"создать инфу",function(){
        if(self.panel.visible==true){
            self.par.par.mInfo.setFun("Очистка инфы","Информация будет удолена безвозвратно",function(){              
                self.batACreat.text="создать инфу" 
                self.panel.visible=false; 
                self.creat(false) 
                self.fun("dragPozition",self.o[self.keyName])
            }
        );                   
        }else{
            self.creat(true);
            self.batACreat.text="удалить инфу";
            self.panel.visible=true;
            self.fun("dragPozition",self.o[self.keyName]) 
        }
       
        
    })
    this.batACreat.width=186 
    this.panel.y=34



    this.setObj= function(o){            
        this.o=o; 


        /*if(this.o[this.keyName]==undefined){
            this.o[this.keyName]={active:false} 
            self.fun("saveTime"); 
            return
        }*/
        this.dragOt(); 


        /*if(this.o[this.keyName]==undefined){
            this.o[this.keyName]={}
            this.o[this.keyName].tOt=false;
            this.o[this.keyName].tNa=false;
            this.o[this.keyName].rO=-1;//renderOrder
            this.o[this.keyName].kesh=false;
            this.fun()      
        }
        this.dragOt();  */     
    }
}
