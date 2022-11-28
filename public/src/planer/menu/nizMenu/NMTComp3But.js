import { NMBaze } from './NMBaze.js';

export class NMTComp3But extends NMBaze {  
  	constructor(par,fun) {
  		super(par,fun); 

  		this.type="NMTComp3But";
        this.typeNa="TComp3But";
  		var self=this;
        this.par=par
        this.fun=fun
        this.otstup=(this.param.wh-dcmParam.fontSize-32)/3
        this.ww=120

        this.postIn=function(){
            var yy=this.otstup
            var xx=this.param.otstup;




            this.label=new DLabel(null, 0,-20,"height MIN");
            this.label.activMouse=false;            
            this.input=new DInput(this.dCont, 0,0, " ",function(){
                let pp=this.value*1                
                if(isNaN(pp)==true){
                    pp=self.object.button1.z
                    this.value=pp;
                    return
                }
                self.bool=false
                self.object.button1.z=this.value*1;
                self.object.gronPoint.par.par.par.addObjFun(self.object.gronPoint.par.par.addPoint)      
                visi3D.intRend=1
            })
            this.input.width=this.ww;
           // this.input.setNum(1);
            this.input.timeFun=1
            this.input.add(this.label)
            xx+=this.ww+this.otstup


            this.label=new DLabel(null, 0,-20,"height MAX");
            this.label.activMouse=false;            
            this.input1=new DInput(this.dCont, 0,0," ",function(){
                let pp=this.value*1                
                if(isNaN(pp)==true){
                    pp=self.object.button2.z
                    this.value=pp;
                    return
                }
                self.bool=false;
                self.object.button2.z=this.value*1;
                self.object.gronPoint.par.par.par.addObjFun(self.object.gronPoint.par.par.addPoint);              
                visi3D.intRend=1;
            })
            this.input1.width=this.ww;
            //this.input1.setNum(1);
            this.input1.timeFun=1;
            this.input1.add(this.label)
            xx+=this.ww+this.otstup

            

            this.button=new DButton(this.dCont, 0,0, " ",function(){
                self.object.gronPoint.clear()
                visi3D.intRend=1
                self.object.gronPoint.par.par.par.addObjFun(self.object.gronPoint.par.par.addPoint);    
                self.clear();
                
            })
            this.button.width=this.button.height=this.param.wh;
            this.button.boolFond=false
            mhbd.getKeyId("scenes3d", 36, function(e){
                self.button.link=mhbd.getLink(e.icon)
                if(dcmParam.mobile==false){
                    let l=new DLabel(self.button,-(200-self.param.wh)/2, self.button.height,e[languages.key])
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


                this.button.x=xx;
                this.button.y=this.param.otstup;
                xx+=this.button.width+this.param.otstup;

                yy=this.button.height+this.param.otstup*2
                this.panel.width=this.width=xx
                this.panel.height=this.height=yy;
            }

            this.panel.alpha=this.param.alpha*1.75
        }


      


        this.drag=function(){
            if(self.bool!=false){    
                
                self.input.value=Math.round(self.object.button1.z)+"";
                self.input1.value=Math.round(self.object.button2.z)+"";
            }            
        }

        
        this.postSO=function(){ 
            this.bool=true           
            this.object.funDragMenu=this.drag

            if(self.object.gronPoint.idArr==0){
                this.button.activMouse=false
            }else{
                this.button.activMouse=true
            }


            this.drag()
        }
        this.clear=function(){
            if(this.object!=undefined){
                this.bool=true
                this.object.funDragMenu=undefined;
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



