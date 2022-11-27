


function MText(p,c,x,y,f) {  
    var self=this   
    this.type="MText"; 
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
    this.keyName="fT";

    this._index=-1;
    var sah=4;
    var ss=0
    var w=40
    var sahPlus=24;

 
    this.ab=[]


    this.panel=new DPanel(this.dCont, 0, 0)
    this.panel.width=this.widthBig-this.otstup*3;
    this.height=this.panel.height=120;
   
    this.batp=new DButton(this.panel, this.otstup, this.otstup,"+",function(){      
        self.o[self.keyName].array.unshift(self.mTMenu.getNewObj())
        self.dragOt();
        self.fun("saveTime"); 
        self._index=-1;
        self.index=0;
    })
    this.batp.width=32 
    
    this.mTMenu=new MTMenu(this,this.panel,200,0,function(s,p){
        if(s=="dragText"){
            self.dragText()
        }
        if(s=="killIndex"){          
            self.o[self.keyName].array.splice(self.index,1);        
            var ii=self.index;
            self.dragOt();
           
            ii--
            if(ii<0)ii=0
            self.index=ii
           
        }
        self.fun("saveTime"); 
    })


    
    this.drag=function(){      
        self.fun("dragPozition",self.o[self.keyName]);
        self.fun("saveTime");       
    }







    this.creat = function(b){ 
        if(b==true){
            this.o[this.keyName]={}
            this.o[this.keyName].array=[]
           
        }else{
            if(this.o[this.keyName]!=undefined){
                delete this.o[this.keyName]
            }          
        }
        this.dragOt(); 
        self.fun("saveTime"); 
    }


    this.clearB= function(){
        for (var i = 0; i < this.ab.length; i++) {
            this.ab[i].visible=false;
        }
    } 

    var ww=24
    var b
    this.getB= function(){
        for (var i = 0; i < this.ab.length; i++) {
            if(this.ab[i].visible==false){
                this.ab[i].visible=true
                return this.ab[i]
            }
        }
        b=new DButton(this.panel,2,34+ww*this.ab.length," ",function(){self.index=this.idArr})
        b.idArr=this.ab.length;
        b.width=this.panel.width-2;
        b.height=ww;        
        this.ab.push(b);
        return b
    } 



    this.dragOt= function(){ 
        if(this.o[this.keyName]!=undefined)if(this.o[this.keyName].active==false){
            delete this.o[this.keyName]
        }


        if(this.o[this.keyName]==undefined){
            self.batACreat.text="создать инфу" 
            self.panel.visible=false;
            self.index=-1; 
            return
        }else{
            self.batACreat.text="удалить инфу";
            self.panel.visible=true; 
        } 
        this.clearB() 
        for (var i = 0; i < this.o[this.keyName].array.length; i++) {
            b=this.getB();
            
        }
        this.dragText()

        if(this.o[this.keyName].array[self.index]!=undefined){
            self._index-=1
            self.index=self._index+1
        }else{
            self._index=-1
            self.index=0
        }       
    }
    this.dragText= function(){ 
        for (var i = 0; i < this.o[this.keyName].array.length; i++) {
            this.ab[i].text=this.o[this.keyName].array[i].key+" ; "+this.o[this.keyName].array[i].text;
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

    this._index

    this.setObj= function(o){            
        this.o=o;
        this.dragOt(); 

         
    }

    Object.defineProperty(this, "index", {
        set: function (value) {            
            if(this._index!=value){
                this._index=value;
                var b=false;
                if(this.ab[value]!=undefined){
                    if(this.ab[value].visible==true){
                        if(this.o[this.keyName].array[value]!=undefined){
                            b=true  
                        }
                    }
                }
                   
                for (var i = 0; i < this.ab.length; i++) {
                    if(i==value){
                        this.ab[i].alpha=0.75
                    }
                    else{
                        this.ab[i].alpha=1
                    }
                }
                if( b==true)this.mTMenu.setObj(this.o[this.keyName].array[value]) 
                else  this.mTMenu.setObj(null)    
            }           
        },
        get: function () {
            return this._index;
        }
    });
}


function MTMenu(p,c,x,y,f) {  
    var self=this   
    this.type="MText"; 
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
    this.dCont.visible=false;

    this.panel=new DPanel(this.dCont, 0, 0)
    this.panel.width=this.widthBig-this.otstup*3;
    this.height=this.panel.height=120;


    this.getNewObj=function(){
        var r={}
        r.key="key"
        r.text="text"
        r.bool=false
        r.str="info"
        r.color="#ffffff"
        return  r;
    }

    this.batp=new DButton(this.panel, this.panel.width-36, 0,"x",function(){      
        self.fun("killIndex");
    })
    this.batp.width=32 

    this.array=[]
    var yy=34;
    this.drag=function(){
        self.o.key=self.array[0].value
        self.o.text=self.array[1].value
        self.o.bool=self.array[2].value
        self.o.str=self.array[3].value
        self.o.color=self.array[4].value
        self.fun("dragText");

    }

    this.array[0]=new DInput(this.panel, this.otstup, 0," ",this.drag)
    this.array[1]=new DInput(this.panel, this.otstup, 0," ",this.drag)

    this.array[2]=new DCheckBox(this.panel, this.otstup, 0,"bool",this.drag)
    this.array[3]=new DInput(this.panel, this.otstup, 0,"info",this.drag)
    this.array[4]=new DColor(this.panel, this.otstup, 0,"#ffffff",this.drag)

    for (var i = 0; i < this.array.length; i++) {
        this.array[i].width=this.panel.width-6
        this.array[i].idArr=i
        this.array[i].y=34+32*i
    }

    this.height=this.panel.height=38+32*this.array.length;

    this.dragOt= function(){ 
        this.array[0].value=this.o.key
        this.array[1].value=this.o.text
        this.array[2].value=this.o.bool
        this.array[3].value=this.o.str
        if(this.o.color)this.array[4].value=this.o.color

    }


    this.setObj=function(o){
        this.o=o
        if(o==null){
            this.dCont.visible=false
            return        
        }

        this.dCont.visible=true
        this.dragOt();


    }
}
