





export class MCPodskazka  {
  	constructor(dCont,fun) {  		
  		this.type="MCPodskazka";
  		var self=this;       
        this.fun=fun;

        this.key="ru";
        this.time=700
        this.timeTween=500

        this.sahSim=0
     /*   this.panel1=new DPanel(dCont)          
         this.panel1.color="#000000"*/

        this.dCont=new DCont(dCont);

        this.dC=new DCont();  

        //this.ss="normal 16px Montserrat white-space: pre;" 
        // this.ss="normal 16px Montserrat white-space: nowrap;" 
        this.ss="white-space: pre;" 

        this.otstup=5
        


      /*  this.panelSh=new DPanel(this.dC,-1,7)  
        this.panelSh.boolLine = false;
        this.panelSh.color="#333333"
        this.panelSh.alpha=0.5*/


        this.panel=new DPanel(this.dC) 



        

        // this.panel.alpha = 0.9
        this.panel.boolLine = false;
         this.panel.color = '#f7f7f7';


        this.panel2=new DPanel() 
        this.panel2.width=this.panel2.height=0
        //this.panel2.alpha = 0.9




        self.div3=this.panel2.div
        var deg=45

        
        this.label=new DLabel(this.panel, this.otstup,this.otstup,"asdfasdf")   
        // this.label.dCT.div.setAttribute('style', this.ss);
        this.label.div.setAttribute('style', this.ss);
        this.label.fontSize = 12;


           


        //this.dC.x=200
        //this.dC.y=200

/*
        this.dHalp=new DHelpxz(null, 0,0,"gh")
        this.dHalp.picWidth=18
        this.dHalp.plusLabelX=5
        this.dHalp.otstup=1
        this.dHalp.width=510
        this.dHalp.fontSize=16
        this.dHalp.colorText="#000000"
        this.dHalp.fontFamily="SFUIDisplay-Light"
        this.dHalp.boolNiz=true;
        this.dHalp.color="#ffda00";
        this.dHalp.borderRadius=10;
        this.dC.add(this.dHalp);*/



        this.tween=new TWEEN.Tween(this.dC);


        this.sobOver=function(e){           
            self.startTime(self.time, this)
         
        }

        this.sobOut=function(e){ 
            self.stop()  
        }

        this.array=[]
        var sOver,sOut,sah
        this.setBuuton=function(button, objText, _sOver, _sOut){             
           
            if(button.uuid!=undefined){
                sah=-1;
                for (var i = this.array.length - 1; i >= 0; i--) {
                    if(this.array[i].uuid==button.uuid){
                        sah=i;
                        break;

                    }
                }
                if(sah!=-1){
                    this.array[sah].objText=objText
                    return
                }

            }


            if(button.uuid==undefined){
                button.uuid=this.generateRendom(2)

            }
            this.array.push(button) 
            button.xzIdArr=this.array.lenght
            button.objText=objText
            sOver=_sOver||"fun_mouseover"
            sOut=_sOut||"fun_mouseout"
            

            /* button.funOver=this.sobOver;
            button.funOut=this.sobOut;
*/

            button[sOver]=this.sobOver;
            button[sOut]=this.sobOut;


        }



        var r
        this.setText=function(text){ 
           /* for (var i = 0; i < text.length; i++) {
              
            }*/
           
            //text="стена \nперекрытия gdsf gfsdfs  sdf gdsg ssdf gdsgfdsgdsfgxdz df gdas gfgdfsg\n1dsgdsgdsgfdfs\n2dsgdsgdsgfdfs"
            // text="стена \nперекрытия gdsf \ngfsdfs  sdf gdsg \nssdf gdsgfdsgdsfgxdz \ndf gdas gfgdfsg\n1dsgdsgdsgfdfs\n2dsgdsgdsgfdfs"
            // r=this.getTextWidth()//text,this.ss)//,"normal 16px Montserrat white-space")//,'normal 16px Montserrat white-space: pre;');
        
            this.label.text=text;

            var nnnn =  text.split("\n")
            var m = 0;
            for (var i = 0; i < nnnn.length; i++) {
                var mn = this.getTextWidth(nnnn[i])
                if ( mn > m) m = mn
            }
            this.label.width=m
            this.panel.width=m+this.otstup*2;
            this.panel.height= (nnnn.length*(this.label.fontSize+3))+this.otstup*2;

           /* this.panelSh.width=this.panel.width+3;
            this.panelSh.height=this.panel.height+3;*/
        
            //this.dHalp.text=text;
            //this.dHalp.visible=true
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

        // this.ss="normal 16px Montserrat white-space: pre;" 
        // this.ss="normal 16px Montserrat white-space: nowrap;" 
        // this.ss="white-space: pre;" 

        var dCt2=undefined;
        this.getTextWidth = function(_text, _font) {
            if(this.sahSim!=0){
                return this.sahSim*_text.length
            }


            let strBold = self.label.bold == true ? 'bold ' : ' normal '
            let strSize = self.label.fontSize+'px '
            let strFamily = self.label.fontFamily+''

            let text = _text || self.label.text
            let font = _font || strBold+strSize+strFamily+''
            // font+=" white-space pre;"
       

            if(dCt2==undefined)dCt2 = document.createElement("canvas")
            var canvas = dCt2// getTextWidth.canvas || (getTextWidth.canvas = document.createElement("canvas"));    
            var context = canvas.getContext("2d");
            context.font = font;
            var metrics = context.measureText(text);

            
            return metrics.width
        }



        this.start=function(obj){ 
            this.obj = obj
            
            if(obj.objText && obj.objText[this.key]&& obj.objText[this.key]!=""){
                
                this.setText(obj.objText[this.key])
            }else{
               this.stop() 
               return; 
            } 
        
            this.dC.alpha=0;
            this.dCont.add(this.dC)
            this.tween.stop();
            this.tween.to({alpha:1},this.timeTween).start();

            this.sizeWindow()


        }

        this.stop=function(){ 
            this.sah=Math.random();
            if(this.dC.parent!=undefined)this.dC.parent.remove(this.dC);
        }    


        this.sah=0;
        this.startTime=function(t,iii){
            if(t==undefined)t=500;
            this.stop()
            this.sah=Math.random();
            var s=this.sah;
            
            
            setTimeout(function() {
                if(self.sah==s){                    
                    self.start(iii);
                }
            }, t);
        } 


        var w,h,s
        this.sizeWindow = function(_w,_h,_s){
            if(_w){
                w=_w;
                h=_h;
                s=_s;
            }
            
            // this.stop();
            
            var l, r, t, b, tColor, bColor;
            if(this.obj && this.dC.parent){
           
                var basis = this.obj.div.getBoundingClientRect();
                self.div3.style.borderStyle     = 'solid'; 
                
                if((h/s)/2 > basis.y){
                    
                    this.dC.y=basis.y/s+this.obj.height;
                    t = 0;
                    b = 8.7;
                    this.panel.y=b;
                    this.panel2.y=t;
                } else {
                    this.dC.y=basis.y-this.panel.height;
                    t = 8.7;
                    b = 0;
                    this.panel.y=-t;
                    this.panel2.y=this.panel.height-t;
                }

                if((w/s)/2 > basis.x){
                    this.dC.x=basis.x/s;
                    r=l=5
                    this.panel2.x=(this.obj.width/2-r/2)
                } else {
                    this.dC.x=basis.x-this.panel.width+this.obj.width;
                    r=l=5
                    this.panel2.x=this.panel.width-(r/2+this.obj.width/2)
                }



                self.div3.style.borderColor  = '#ffffff transparent #ffffff transparent';   
                self.div3.style._borderColor = '#000000 #000000 #000000 #000000';   
                self.div3.style.borderWidth  = ''+t+'px '+l+'px '+b+'px '+r+'px';
                self.div3.style.filter       = "progid:DXImageTransform.Microsoft.Chroma(color='#000000')";   
 
           
                // self.div3.style.webkitTransform = 'rotate('+deg+'deg)'; 
                // self.div3.style.mozTransform    = 'rotate('+deg+'deg)'; 
                // self.div3.style.msTransform     = 'rotate('+deg+'deg)'; 
                // self.div3.style.oTransform      = 'rotate('+deg+'deg)'; 
                // self.div3.style.transform       = 'rotate('+deg+'deg)';   
            }
  		}

  	}
}




/*



export class DHelpxz extends DCont {
    constructor(dCont, _x, _y, _text, _link) {
        super(dCont); 
        this.type="DHelpxz";
        var self=this
        this.x=_x||0;   
        this.y=_y||0;


        this._text="null";
        this._link=null;
        this._color="#ff0000";

        if(dcmParam==undefined)dcmParam=new DCM();

        if(dCont!=undefined)if(dCont.add!=undefined)dCont.add(this);    
        this._width=100;
        this._picWidth=32;        
        this._height=100;


        this.dCont=new DCont(this)
        
        
        this.textArea=new DTextArea(this.dCont,0,0,"");


        this._color=dcmParam._color;
        this._colorText=dcmParam._colorText;
        this._otstup=dcmParam._otstup;
        this._fontSize=dcmParam._fontSize;
        this._boolLine=dcmParam._boolLine;

        this._fontFamily=dcmParam._fontFamily;
        this._borderRadius=10;

        this._boolNiz=false;



        this.panel=new DPanel(this.dCont)
        this.panel.borderRadius=this._borderRadius;
        this.panel.color1=this._color; 

        this.label=new DLabel(this.dCont);
        this.label.colorText1=this._colorText;

        this.label.dCT.div.setAttribute('style', 'white-space: pre;');
       // 
        this.textArea.visible=false

        this.textArea.textAlign=this.label.textAlign="left"//;"center"//

        this.textArea.object.setAttribute('style', 'white-space: nowrap; ');


        this.dragPic=function(){
            this.image.width=this._picWidth;
            this.image.height=this.image.picHeight*this.image.width/this.image.picWidth;
            this.image.visible=true;
            this.draw()
        }
        this.image=new DImage(this.dCont,0,0,null,function(){
            self.dragPic()
        })

        this.dContNiz=new DCont(this.dCont)
        this.dContNiz.visible=true


        this.image.visible=false;

        this._wCan=20
        this._hCan=15
        this.canvas=undefined;
        this.ctx=undefined;

        this.initNiz=function(){
            if(this.canvas!=undefined)return;
            this.canvas = document.createElement('canvas'); 
            this.canvas.width= this._wCan
            this.canvas.height= this._hCan             
            if (this.canvas.getContext){
                this.ctx = this.canvas.getContext('2d');              
            }
            this.dContNiz.div.appendChild(this.canvas);
            this.drawNiz()
        }

        this.drawNiz=function(){   
            if(this.canvas==undefined)return;     

            this.ctx.clearRect(0, 0, this._wCan, this._hCan);            
            if(this._boolLine==true){
                this.ctx.fillStyle =  dcmParam.compToHexArray(dcmParam.hexDec(this._color), -20);//"#ff0000"//                
                
                this.ctx.beginPath();
                this.ctx.moveTo(0,0);
                this.ctx.lineTo(this._wCan,0);
                this.ctx.lineTo(this._wCan/2,this._hCan);
                this.ctx.fill();

            }
            


            this.ctx.fillStyle = this._color
            this.ctx.beginPath();
            this.ctx.moveTo(1,0);
            this.ctx.lineTo(this._wCan-1,0);
            this.ctx.lineTo(this._wCan/2,this._hCan-1);

            this.ctx.fill();



        }

        this.plusLabelX=0
        var xt,ww,hh
        var r
        this.draw=function(){
            xt=this._otstup+this.plusLabelX;

            if(this.image.visible!=false){
                this.image.x=this._otstup;
                this.image.y=this._otstup;
                xt+= this._picWidth+this._otstup;
            }
            this.label.x=xt;
            let ww=this._width-xt-this._otstup
            this.textArea.width=100//ww;
            this.textArea.text= this.label.text
            this.textArea.width=this.textArea.object.scrollWidth+10

            let _w=this.textArea.width*1.2;

            //if(_w+xt+this._otstup>this._width)_w=this._width-(xt+this._otstup)
            this.panel.width = _w+xt+this._otstup;



            this.label.width=_w            
            r=this.label.getRect();
            
            this.textArea.x=this.label.x;
            this.textArea.y=this.label.y+1111

            hh=r.height+this._otstup*2;
            if(this.image.visible!=false){
                if(this.image.height+this._otstup*2>hh)hh=this.image.height+this._otstup*2

            }
            this.panel.height=hh;                        
            this.dCont.x=-this.panel.width/2
            if(this._boolNiz==true){
                this.dContNiz.y=hh-2
                hh+=this._hCan;
                this.dContNiz.x=(this.panel.width-this._wCan)/2;
            }

            this.image.y=(this.panel.height-this.image.height)/2
            this.image.x+=this._otstup

            this.dCont.y=-hh;      
        }

     

        this.text= _text
        this.link=_link;

    }



    set text(value) {
        if(this._text!=value){            
            this._text = value;                     
            if(this._text){
                if(this._text.lenght!=0){

                    this.label.visible=true;
                    this.label.text = this._text;
                    this.draw();  
                    return
                }                
            }
            this.label.visible=false;             
            this.draw()         
        }       
    }   
    get text() { return  this._text;}



    set fontFamily(value) {
        if(this._fontFamily!=value){            
            this._fontFamily = value; 
            this.label.fontFamily=this._fontFamily;
            this.textArea.fontFamily=this._fontFamily;          
            this.draw()         
        }       
    }   
    get fontFamily() { return  this._fontFamily;}
  




    set fontSize(value) {
        if(this._fontSize!=value){            
            this._fontSize = value;            
            this.label.fontSize = value; 
            this.textArea.fontSize = value+2;          
            this.draw();        
        }       
    }   
    get fontSize() { return  this._fontSize;}

    set boolLine(value) {
        if(this._boolLine!=value){            
            this._boolLine = value;            
            this.panel.boolLine = value;  
            this.drawNiz()        
            this.draw()         
        }       
    }   
    get boolLine() { return  this._boolLine;}

    
    set boolNiz(value) {
        if(this._boolNiz!=value){            
            this._boolNiz = value;            
            this.initNiz() 
            this.dContNiz.visible =this._boolNiz   
            this.draw()         
        }       
    }   
    get boolNiz() { return  this._boolNiz;}


    



    set otstup(value) {
        if(this._otstup!=value){            
            this._otstup = value;  
            this.draw()         
        }       
    }   
    get otstup() { return  this._otstup;}

    set picWidth(value) {
        if(this._picWidth!=value){            
            this._picWidth = value; 
            if( this.image.visible!=false){
                this.dragPic()
            }
            //this.draw()         
        }       
    }   
    get picWidth() { return  this._picWidth;}








    set link(value) {
        if(this._link!=value){            
            this._link = value;            
            
            if(this._link){
                if(this._link.lenght!=0){
                    this.image.visible=false
                    this.image.link=this._link;                    
                    return
                }                
            }
            this.image.visible=false;             
            this.draw()         
        }       
    }   
    get link() { return  this._link;}

    set width(value) {
        if(this._width!=value){            
            this._width = value;
            this.panel.width = value;

            this.draw()         
        }       
    }   
    get width() { return  this._width;}

    set borderRadius(value) {
        if(this._borderRadius!=value){              
            this._borderRadius = value;            
            this.panel.div.style.borderRadius=this._borderRadius+"px";
        }
    }   
    get borderRadius() {        
        return  this._borderRadius;
    }

    set color(value) {
        if(this._color!=value){              
            this._color = value;            
            this.panel.color1=this._color;  
            this.drawNiz();          
        }
    }   
    get color() {        
        return  this._color;
    }

    set colorText(value) {
        if(this._colorText!=value){              
            this._colorText = value;            
            this.label.colorText1=this._colorText;

        }
    }   
    get colorText() {        
        return  this._colorText;
    }




}


*/
