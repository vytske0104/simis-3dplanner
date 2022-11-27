
/*
окно поверх с инпутами
*/



export class MInfo  {
    constructor(par,fun) {          
        var self=this   
        this.type="MInfo";
        this.fun=fun;
        this.par=par;
        this.dC=par.dCont;

        this.param=this.par.param;

        this._active=false;
        this.otstup=2;
        this.otstup2=10;
        this.dCont=new DCont(par.dCont);

        this.text="null";


        this.array=[];


        this.array[0]=this.mIBase=new MIBase(this,function(s,p){

        })

        this.array[1]=this.mISave=new MISave(this,function(s,p){

        })

        this.array[2]=this.mICapshion=new MICapshion(this,function(s,p){

        })

        this.array[3]=this.miDaNet=new MIDaNet(this,function(s,p){

        })
        this.array[4]=this.miInput=new MIInput(this,function(s,p){

        })
       
/*
        this.button2=new DButton(this.dC, 333, 333,"x",function(){
            self.setFun("sdfdsfsffsf","dfgdgdgfdgdfgdgfdfg")
        })*/
      

/*

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
        this.input.timeFun=1*/
        

  


        this.dinMenu=undefined


        this.setFun = function(title, text, fun, obj){ 
            var s="MIBase"            
            if(obj==undefined){
               
            }else{
                if(typeof obj == "string" ){
                    s=obj;
                }
                if( typeof obj == "object" ){
                    s=obj.type;
                }
                
            }





            this.typeArray=s;

            trace("this.typeArray", this.typeArray,this.dinMenu)
            if(this.dinMenu!=undefined){

                this.dinMenu.setFun(title, text, fun, obj);
            }
            

        }


        this.setFunInput = function(title, text, text1, fun){ 
           /* this.active = true;
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
            this.sizeWindow()*/
        }



        this.setW=function(w){
           /* this.window.width=w;
            this.label.width= w- this.otstup2*2;
            this.input.width= w- this.otstup2*2;
            this.button2.x= w-this.button2.width-this.otstup; 
            this.button1.x= w-this.otstup2-  this.button1.width
            this.button.x= w-this.otstup2*2-  this.button1.width*2*/
        }
        this.setW(300);


        var w,h,s
        this.sizeWindow = function(_w,_h,_s){ 
            if(_w!=undefined){
                w=_w
                h=_h
                s=_s
            }
            for (var i = 0; i < this.array.length; i++) {
                this.array[i].sizeWindow(w,h,s);
            }   
        }
    }


    set typeArray(value) {
        if(this._typeArray!=value){
            this._typeArray = value; 
            this.dinMenu=undefined
            for (var i = 0; i < this.array.length; i++) {
                if(this.array[i].type==value){
                    this.dinMenu=this.array[i]
                    this.array[i].active=true;
                }else{
                    this.array[i].active=false;
                }
            }          
        }
    }    
    get typeArray() { return  this._typeArray;}
}




export class MIBase {
    constructor(par,fun) {          
        var self=this   
        this.type="MIBase";
        this.fun=fun;
        this.par=par;
        this.param=this.par.param;
        this._active=false

        this.dCont=new DCont();

        this.panel=undefined;    
        this.funPostinit=undefined;

        this.init=function(){
            if(this.panel!=undefined )return
            this.panel = new DPanel(this.dCont);
            this.panel.alpha=0.8; 
            this.window = new DWindow(this.dCont, 0, 0," ");
            this.window.dragBool=false;
            this.window.hasMinimizeButton=false;
            this.window.width=this.param.wb*2;
            this.window.height=this.param.wb;
            this.label = new DLabel(this.window.content, this.param.otstup, this.param.otstup," ");
            this.label.width=this.window.width-this.param.otstup*2

            this.buttonClose=new DButton(this.window, this.window.width-30, 2, "x",function(){
                self.active=false;
            })
            this.buttonClose.width = this.buttonClose.height=28;
            this.buttonClose.boolFond=false;
            
            if(this.funPostinit)this.funPostinit()
            this.sizeWindow()    
        }

        this.funPostSF=undefined;
        this.funDin=undefined
        this.title
        this.text
        this.obj
        this.setFun = function(title, text, fun, obj){       
            this.title=title
            this.text=text
            this.funDin=fun;   
            this.obj=obj


            this.active = true;
                   
            
            this.window.text=title;
            this.label.text=text;    
            var r=this.label.getRect();
            this.window.height=this.label.y+r.height+this.param.otstup+32; 

            if(this.funPostSF)this.funPostSF()
            this.sizeWindow();
        }

        var w,h,s
        this.sizeWindow = function(_w,_h,_s){ 
            if(_w!=undefined){
                w=_w
                h=_h
                s=_s
            }
          
            if(this._active==false)return;
            if(this.panel==undefined)return;

            this.panel.width=w/s;
            this.panel.height=h/s;
            this.window.x=(w/s-this.window.width)/2;
            this.window.y=(h/s-this.window.height)/2;
        }
        this.sobBat =  function(e){
            self.active=false;
        }
    }

    set active(value) {
        if(this._active!=value){
            this._active = value;
            if(value==true){
                this.par.dCont.add(this.dCont)
                this.init();
                this.sizeWindow();
                this.panel.div.addEventListener("mousedown", this.sobBat)
            }else{
                this.panel.div.removeEventListener("mousedown", this.sobBat)
                this.par.dCont.remove(this.dCont)
            } 
        }
    }    
    get active() { return  this._active;}
}

//import { MOBaza } from './MOBaza.js';

//export class MOSten extends MOBaza


export class MISave extends MIBase {
    constructor(par,fun) { 
        super(par,fun);    
        var self=this;  
         
        this.type="MISave";

        this.funPostinit=function(){            
            this.button=new DButton(this.window.content, this.param.otstup, this.param.otstup, "",function(){
                
                self.active=false;
                if(self.funDin!=undefined){
                    self.funDin()
                }
            })
            
            
            this.button.height=this.param.wh

            

            mhbd.getKeyId("group1",24,function(e){            
                self.button.link=e.icon;
                self.button.text=e.name;
            })
        }

        this.funPostSF=function(){  

            this.button.width=this.window.width-this.param.otstup*2

            this.button.y=this.window.height-32

            this.window.height=this.button.y+this.button.height+this.param.otstup+32
        }

    }
}


export class MIDaNet extends MIBase {
    constructor(par,fun) { 
        super(par,fun);    
        var self=this;  
         
        this.type="MIDaNet";

        this.funPostinit=function(){            
            this.button=new DButton(this.window.content, this.param.otstup, this.param.otstup, "Да",function(){                
                self.active=false;
                if(self.funDin!=undefined){
                    self.funDin()
                }
            })            
            this.button1=new DButton(this.window.content, this.param.otstup, this.param.otstup, "Да",function(){                
                self.active=false;               
            })
        }

        this.funPostSF=function(){ 
            //this.button.width=this.window.width-this.param.otstup*2
            
            this.button.text=this.obj.t!=undefined ? this.obj.t : "да"; 
            this.button1.text=this.obj.t1!=undefined ? this.obj.t1 : "нет";

            this.button.x=this.window.width-this.button.width-this.button1.width-this.param.otstup*2
            this.button1.x=this.window.width-this.button1.width-this.param.otstup*1
            
            this.button1.y=this.button.y=this.window.height-32
            this.window.height=this.button.y+this.button.height+this.param.otstup+32
        }

    }
}

export class MIInput extends MIBase {
    constructor(par,fun) { 
        super(par,fun);    
        var self=this;  
         
        this.type="MIInput";

        this.funPostinit=function(){            
            this.button=new DButton(this.window.content, this.param.otstup, this.param.otstup, "Да",function(){                
                self.active=false;
                if(self.funDin!=undefined){
                    self.funDin()
                }
            })            
            this.button1=new DButton(this.window.content, this.param.otstup, this.param.otstup, "нет",function(){                
                self.active=false;               
            })

            this.input=new DInput(this.window.content, this.param.otstup, this.otstup,"",function(){
                par.text=this.value;
            })
            this.input.timeFun=1;
        }

        this.funPostSF=function(){ 
            this.input.text=""
            this.input.width=this.window.width-this.param.otstup*2
            this.input.y=this.button.y=this.window.height-32

            this.button.x=this.window.width-this.button.width-this.button1.width-this.param.otstup*2
            this.button1.x=this.window.width-this.button1.width-this.param.otstup*1
            
            this.button1.y=this.button.y=this.input.y+32+this.param.otstup
            this.window.height=this.button.y+this.button.height+this.param.otstup+32
        }

    }
}




export class MICapshion extends MIBase {
    constructor(par,fun) { 
        super(par,fun);    
        var self=this;  
         
        this.type="MICapshion";


       


        function fallbackCopyTextToClipboard(text) {
          var textArea = document.createElement("textarea");
          textArea.value = text;
          
          // Avoid scrolling to bottom
          textArea.style.top = "0";
          textArea.style.left = "0";
          textArea.style.position = "fixed";

          document.body.appendChild(textArea);
          textArea.focus();
          textArea.select();

          try {
            var successful = document.execCommand('copy');
            var msg = successful ? 'successful' : 'unsuccessful';
            console.log('Fallback: Copying text command was ' + msg);
          } catch (err) {
            console.error('Fallback: Oops, unable to copy', err);
          }

          document.body.removeChild(textArea);
        }
        function copyTextToClipboard(text) {
          if (!navigator.clipboard) {
            fallbackCopyTextToClipboard(text);
            return;
          }
          navigator.clipboard.writeText(text).then(function() {
            console.log('Async: Copying to clipboard was successful!');
          }, function(err) {
            console.error('Async: Could not copy text: ', err);
          });
        }

      

/*
        new DButton(par.par.dCont,222,222,"dfg",function(){
            fallbackCopyTextToClipboard("xzxz1234")
        })*/


        this.funPostinit=function(){            
            

            this.button=new DButton(this.window.content, this.window.width-this.param.wh-this.param.otstup, this.param.otstup, "",function(){                
                self.active=false;

                fallbackCopyTextToClipboard(self.input.value)

                if(self.funDin!=undefined){
                    self.funDin();
                }
            })
            
            
            this.button.height=this.param.wh
            this.button.width=this.param.wh
            this.button.boolFond=false;

            this.input=new DInput(this.window.content, 10, this.otstup,"x",function(){
                
            })
            this.input.timeFun=1;
            this.input.height=this.param.wh
            this.input.width = this.window.width-this.param.otstup*3-this.param.wh  
            this.input.fontSize=10          

            mhbd.getKeyId("group1",221,function(e){            
                self.button.link=e.icon;
                podskazka.setBuuton(self.button, e.texts) 
                //self.button.text=e.name;
            })
            self.button.scalePic=1;
        }

        this.funPostSF=function(){             
            this.button.y=this.window.height-32;
            this.input.y=this.window.height-32;
            this.input.text=this.obj.text
            this.window.height=this.button.y+this.button.height+this.param.otstup+32
        }

    }
}


