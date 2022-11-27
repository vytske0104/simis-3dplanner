



export  function MInfo(dC) {  
    var self=this   
    this.type="MInfo";
    this.fun=undefined;
    this.dC=dC;
    this._width=100;
    this._height=100;
    this._active=false;
    this.otstup=2;
    this.otstup2=10;
    this.dCont=new DCont();

    this.text="null";

    this.panel = new DPanel(this.dCont);
    this.window = new DWindow(this.dCont, 0, 0," ");

    this.window.dragBool=false;
    this.window.hasMinimizeButton=false;
    this.label = new DLabel(this.window, this.otstup2, this.otstup2+32," ");
    this.button=new DButton(this.window, 0, 0,"Да",function(){        
        if(self.fun!=undefined)self.fun()
        self.active=false;    
    })
    this.button1=new DButton(this.window, 0, 0,"Нет",function(){
        self.active=false;
    }) 
    this.button2=new DButton(this.window, this.otstup, this.otstup,"x",function(){
        self.active=false;
    })

    this.button2.width=this.button2.height=32-this.otstup*2;

    this.input=new DInput(this.window, 10, this.otstup,"x",function(){
        self.text=this.text;

    })
    this.input.timeFun=1

    this.setFun = function(title, text, fun){ 
        this.active = true;
        this.fun=fun;
        
        this.window.text=title;
        this.label.text=text;
        var p=this.otstup2;
        this.button1.visible=this.button.visible=false;
        this.input.visible=false;
        if(this.fun!=undefined){
            p=this.otstup2*2+32
            this.button1.visible=this.button.visible=true;
        }  

        var r=this.label.getRect()

        this.window.height=this.label.y+r.height+p;
        this.button1.y=this.button.y=this.label.y+r.height+this.otstup2;
        this.sizeWindow(this._width*1, this._height*1);
    }


    this.setFunInput = function(title, text, text1, fun){ 
        this.active = true;
        this.fun=fun;
        
        this.window.text=title;
        this.label.text=text;
        this.text=text1;

        var p=this.otstup2;
        this.button1.visible=this.button.visible=false;
        if(this.fun!=undefined){
            p=this.otstup2*2+32
            this.button1.visible=this.button.visible=true;
        }  
        this.input.text=text1;
        this.input.visible=true;

        var r=this.label.getRect()

        this.input.y=this.label.y+r.height+5;

        

        this.window.height=this.label.y+r.height+p+32+5;
        this.button1.y=this.button.y=this.label.y+r.height+this.otstup2+32+5;
        this.sizeWindow(this._width*1, this._height*1)
    }



    this.setW=function(w){
        this.window.width=w;
        this.label.width= w- this.otstup2*2;
        this.input.width= w- this.otstup2*2;
        this.button2.x= w-this.button2.width-this.otstup; 
        this.button1.x= w-this.otstup2-  this.button1.width
        this.button.x= w-this.otstup2*2-  this.button1.width*2
    }
    this.setW(300);

    this.sizeWindow = function(w,h){ 
        this._width=w;
        this._height=h;
        if(this._active==false)return;

        this.panel.width=w;
        this.panel.height=h;
        this.window.x=(w-this.window.width)/2;
        this.window.y=(h-this.window.height)/2;        
    }




    this.panel.alpha=0.4;
    this.panel.div.addEventListener("mousedown", function(){
        self.active=false;
    })


    Object.defineProperty(this, "active", {
        set: function (value) {            
            if(this._active!=value){
                this._active=value;

                if(value==true){
                    this.dC.add(this.dCont)
                }else{
                    this.dC.remove(this.dCont)
                }
                
            }           
        },
        get: function () {
            return this._active;
        }
    });




}



