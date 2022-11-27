import { NMBaze } from './NMBaze.js';

export class NMSpPointSten extends NMBaze {  
  	constructor(par,fun) {
  		super(par,fun); 

  		this.type="NMPoint0";
        this.typeNa="SpPointSten";
  		var self=this;
        this.par=par
        this.fun=fun
        this.otstup=this.param.otstup
  

        this.postIn=function(){
            

            

            this.label=new DLabel(null, 0,-20,"x");
            this.label.activMouse=false;            
            this.input=new DInput(this.dCont, 0,0, " ",function(){
                let pp=this.value*1                
                if(isNaN(pp)==true){
                    pp=self.object.position.x
                    this.value=pp;
                    return
                }

                self.bool=false
                self.object.position.x=this.value*1;
                self.object.dragPost()
                visi3D.intRend=1
            })
           
            //this.input.setNum(1);
            this.input.timeFun=1
            this.input.add(this.label)
            


            this.label=new DLabel(null, 0,-20,"y");
            this.label.activMouse=false;            
            this.input1=new DInput(this.dCont, 0,0, " ",function(){
                let pp=this.value*1
                if(isNaN(pp)==true){
                    pp=self.object.position.y
                    this.value=pp;
                    return
                }
                self.bool=false
                self.object.position.y=this.value*1;
                self.object.dragPost();
                visi3D.intRend=1;
            })
            
            //this.input1.setNum(1);
            this.input1.timeFun=1;
            this.input1.add(this.label)
           

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
            
            
            var yy=this.otstup;
            var xx=this.otstup;
            if(dcmParam.mobile==false){
                let l=new  DLabel(this.dCont,xx,yy,"Point");
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
                self.input.value=Math.round(self.object.position.x)+"";
                self.input1.value=Math.round(self.object.position.y)+"";


            }            
        }

        this.killObj=function(){
            if(this.object.clear && self.button.activMouse){
                if(dcmParam.getFocus()!=null)return
                this.object.clear();
                this.active=false;
            }
        }

        
        this.postSO=function(){ 
            this.bool=true           
            this.object.arrayClass[0].funDragMenu=this.drag

            let sp=window.facade.sp;
            let sah=0
            for (var i = 0; i < sp.arrSplice.length; i++) {
                
                if(sp.arrSplice[i].life ==true)sah++
            }
            
            if(sah<=3){
                self.button.activMouse=false
            }else{
                self.button.activMouse=true
            }
            this.drag()
        }
        this.clear=function(){
            trace("##clear##",this.active,this.object)
            if(this.object!=undefined){
                this.bool=true
                this.object.arrayClass[0].funDragMenu=undefined;
                this.object.active=false
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



