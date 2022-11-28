import { NMBaze } from './NMBaze.js';

export class NMBlok extends NMBaze {  
  	constructor(par,fun) {
  		super(par,fun); 

  		this.type="NMBlok";
        this.typeNa="BInSten";
  		var self=this;
        this.par=par
        this.fun=fun
        this.otstup=(this.param.wh-dcmParam.fontSize-32)/3
        this.ww=120
        this.array=[]
        
        this.postIn=function(){
            var yy=this.otstup
            var xx=this.otstup
           

            this.label=new DLabel(null, 0,-20,"width");
            this.label.activMouse=false;            
            this.input=new DInput(this.dCont, 0,0, " ",null)
            this.input.width=this.ww;
            
            this.input.boolNum=true
            this.input.timeFun=0
            this.input.min=10
            this.input.max=10000

            var rO,x,x1,ww,ww1,sten
            this.input.funEnter=function(){ 
                sten=self.object._parent.par
                x=sten.arrPosit1[1].x;
                x1=sten.arrPosit[5].x;
                ww=x+x1;
                ww1=sten._distans-ww
              

                rO=self.object._parent.collision.getMinMax(self.object.boxColizi,ww1)
                trace("@@@@@@===",rO,ww1)
                
                if(this.value>Math.floor(rO.w)){
                    self.object.setPosition(rO.x+rO.w/2,undefined,undefined)
                    this.value=Math.floor(rO.w)
                }               
                self.object.width=this.value;                
                menuBig.setObject(self.object);
                facade.sp.worldBlok.wbVisiActiv.korekt();              
                self.object.render()
            }



            this.input.add(this.label)
            this.array[0]=this.input

           


            this.label=new DLabel(null, 0,-20,"height");
            this.label.activMouse=false;            
            this.input1=new DInput(this.dCont, 0,0," ")
            this.input1.width=this.ww;

         
            this.input1.boolNum=true
            this.input1.timeFun=0
            this.input1.min=10
            this.input1.max=10000

            
            this.input1.funEnter=function(){ 
                sten=self.object._parent.par
                x=sten.arrPosit1[1].x;
                x1=sten.arrPosit[5].x;
                ww=x+x1;
                ww1=sten._distans-ww
              

                rO=self.object._parent.collision.getMinMax(self.object.boxColizi,ww1)
               
                
                if(this.value>Math.floor(rO.h)-2){
                    //self.object.setPosition(rO.y+rO.h/2,undefined,undefined)
                    this.value=Math.floor(rO.h)-2
                } /**/              
                self.object.height=this.value;                
                menuBig.setObject(self.object);
                facade.sp.worldBlok.wbVisiActiv.korekt();              
                self.object.render()
            }



            this.input1.add(this.label)
            this.array[1]=this.input1
           

            this.label=new DLabel(null, 0,-20,"delph");
            this.label.activMouse=false;            
            this.input2=new DInput(this.dCont, 0,0, " ",function(){
                let pp=this.value*1                
                if(isNaN(pp)==true){
                    pp=self.object.delph
                    this.value=pp;
                    return
                }
                self.korektNUM(this,20)
                self.object.delph=this.value
                self.object.render()
            })
            this.input2.width=this.ww;
           // this.input2.setNum(1);
     

            this.input2.boolNum=true
            this.input2.timeFun=0
            this.input2.min=10
            this.input2.max=10000

            
            this.input2.funEnter=function(){ 
                self.object.delph=this.value
                self.object.render()
            }


            this.input2.add(this.label)
            this.input2.lll=this.label
            this.array[2]=this.input2
           



            this.button=new DButton(this.dCont, 0,0, " ",function(){
                self.object.clear()
                self.clear();
                visi3D.intRend=1
            })
            this.button.width=this.button.height=this.param.wh;
            this.button.boolFond=false
            mhbd.getKeyId("scenes3d", 36, function(e){
                self.button.link=mhbd.getLink(e.icon);

                if(dcmParam.mobile==false){
                    let l=new DLabel(self.button,-(200-self.param.wh)/2, self.button.height,e[languages.key])
                    l.textAlign="center";
                    l.width=200;
                    l.fontSize=dcmParam.fontSizeLittel;
                    l.activMouse=false
                }
            })
            
           


            this.button1=new DButton(this.dCont, 0,0, " ",function(){
                var blok=self.object.copy()
                self.object.parent.addBlok(blok);                
                facade.sp.worldBlok.activeObject=blok;
            });
            this.button1.width=this.button1.height=this.param.wh;
            this.button1.boolFond=false
            mhbd.getKeyId("scenes3d", 39, function(e){
                self.button1.link=mhbd.getLink(e.icon)
                if(dcmParam.mobile==false){
                    let l=new DLabel(self.button1,-(200-self.param.wh)/2, self.button1.height,e[languages.key])
                    l.textAlign="center";
                    l.width=200;
                    l.fontSize=dcmParam.fontSizeLittel;
                    l.activMouse=false
                }
            })
            


            var yy=this.otstup;
            var xx=this.otstup;
            if(dcmParam.mobile==false){
                let l=new  DLabel(this.dCont,xx,yy,"Point 3d");
                l.width=200
                l.bold=true;
                l.activMouse=false;
                l.fontSize=l.fontSize*2
                yy+=l.fontSize+this.param.otstup;

                this.button.x=this.param.sizeBase-this.param.otstup-this.button.width;
                this.button.y=yy;

                this.button1.x=this.param.sizeBase-this.param.otstup*3-this.button.width*2;
                this.button1.y=yy;
                yy+=this.button.height+this.param.otstup+dcmParam.fontSizeLittel



                let p=new DPanel(this.dCont,this.param.otstup,yy);
                p.color=dcmParam.colorText;
                p.width=this.param.sizeBase-this.param.otstup*2;
                p.height=2
                yy+=this.param.otstup+2+20;

                this.input.width=this.param.sizeBase-this.param.otstup*2;
                this.input.x=this.param.otstup;
                this.input.y=yy;
                yy+=55;
                this.input1.width=this.param.sizeBase-this.param.otstup*2;
                this.input1.x=this.param.otstup;
                this.input1.y=yy;
                yy+=55;

                this.input2.width=this.param.sizeBase-this.param.otstup*2;
                this.input2.x=this.param.otstup;
                this.input2.y=yy;
                yy+=40;

                this.panel.width=this.width=this.param.sizeBase
                this.panel.height=this.height=yy;


            }else{
                yy+=20;
                this.input.width=this.param.wb;
                this.input.x=xx;
                this.input.y=yy;
                xx+=this.param.wb+this.param.otstup;

                this.input1.width=this.param.wb;
                this.input1.x=xx;
                this.input1.y=yy;
                xx+=this.param.wb+this.param.otstup;

                this.input2.width=this.param.wb;
                this.input2.x=xx;
                this.input2.y=yy;
                xx+=this.param.wb+this.param.otstup;

                this.button1.x=xx;
                this.button1.y=this.param.otstup;
                xx+=this.button1.width+this.param.otstup;

                this.button.x=xx;
                this.button.y=this.param.otstup;
                xx+=this.button.width+this.param.otstup;

                yy=this.button.height+this.param.otstup*2
                this.panel.width=this.width=xx
                this.panel.height=this.height=yy;
            }
            this.panel.alpha=this.param.alpha*1.75;
        }


        this.korektNUM=function(inp, min){
            var s=inp.value;
            if(isNaN(s*1)==true){
                inp.value=min
            }
            
            if(inp.value*1<min){
                inp.value=min;
            }
        }

       

        this.drag=function(){
            if(self.bool!=false){                
                
                this.array[0].value=self.object.width
                this.array[1].value=self.object.height
                this.array[2].value=self.object.delph
                this.array[2].activMouse=self.object.amDelph

                if(self.object.amDelph){
                    this.array[2].alpha=1;                    
                }else{
                    this.array[2].alpha=0.25                  
                }
               
            }            
        }

        
        this.postSO=function(){ 
            this.bool=true           
            
            this.drag()
        }
        this.clear=function(){
            if(this.object!=undefined){
                this.bool=true
                
            }
            this.active=false;
        }




        var w,h,s;
        this.sizeWindow2 = function(_w,_h,_s){  
            if(_w){
                w= _w;
                h= _h;
                s= _s;   
            }
            
        }

  	}
}



