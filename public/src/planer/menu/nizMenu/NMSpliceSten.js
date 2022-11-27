import { NMBaze } from './NMBaze.js';

export class NMSpliceSten extends NMBaze {  
  	constructor(par,fun) {
  		super(par,fun); 

  		this.type="NMSpliceSten";
        this.typeNa="SpliceSten";
  		var self=this;
        this.par=par
        this.fun=fun
        this.otstup=(this.param.wh-dcmParam.fontSize-32)/3
        this.ww=120
        this.lll
        this.postIn=function(){
            var yy=this.otstup
            var xx=this.param.otstup

            if(dcmParam.mobile==false){
                let l=new  DLabel(this.panel,xx,yy,"Wall");
                l.bold=true;
                l.activMouse=false;
                l.fontSize=l.fontSize*2
                yy+=l.fontSize+this.param.otstup
            }

            this.button1=new DButton(this.panel, xx,yy, " ",function(){
                self.object.boolAree=false;
                self.drag()
                //window.mxz.funFDO()
                visi3D.intRend=1
             
            })
            this.button1.boolFond=false
            this.button1.width=this.button1.height=this.param.wh;
            mhbd.getKeyId("scenes3d", 37, function(e){
                self.button1.link=mhbd.getLink(e.icon)
                if(dcmParam.mobile==false){
                    let l=new DLabel(self.button1,-(200-self.param.wh)/2, self.button1.height,e[languages.key])
                    l.textAlign="center";
                    l.width=200;
                    l.fontSize=dcmParam.fontSizeLittel;
                    l.activMouse=false
                }
            })


            this.button2=new DButton(this.panel, xx,yy, " ",function(){
                self.object.boolAree=true;
                self.drag();
                //window.mxz.funFDO();
                visi3D.intRend=1;
           
            })
            this.button2.width=this.button2.height=this.param.wh;
            mhbd.getKeyId("scenes3d", 38, function(e){
                self.button2.link=mhbd.getLink(e.icon);
                if(dcmParam.mobile==false){
                    let l=new DLabel(self.button2,-(200-self.param.wh)/2, self.button2.height,e[languages.key])
                    l.textAlign="center";
                    l.width=200;
                    l.fontSize=dcmParam.fontSizeLittel;
                    l.activMouse=false
                }
            })
            this.button2.boolFond=false
            this.button2.visible=false;            
            xx+=this.button2.width+this.param.otstup;


            this.button3=new DButton(this.panel, xx,yy, " ",function(){
                //self.object._addPoint1.clear()
                self.object.delim();
                //self.clear();
                visi3D.intRend=1
            })
            this.button3.boolFond=false
            this.button3.width=this.button3.height=this.param.wh;
            mhbd.getKeyId("scenes3d", 40, function(e){
                self.button3.link=mhbd.getLink(e.icon)
                if(dcmParam.mobile==false){
                    let l=new DLabel(self.button3,-(200-self.param.wh)/2, self.button3.height,e[languages.key])
                    l.textAlign="center";
                    l.width=200;
                    l.fontSize=dcmParam.fontSizeLittel;
                    l.activMouse=false
                }
                
            })            
            xx+=this.button3.width+this.param.otstup;


            this.button=new DButton(this.panel, xx,yy, " ",function(){
                self.object._addPoint1.clear()
                self.clear();
                visi3D.intRend=1
            })
            this.button.boolFond=false
            this.button.width=this.button.height=this.param.wh;
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
            xx+=this.button.width+this.param.otstup;


            
            yy+=this.param.wh+this.param.otstup
            if(dcmParam.mobile==false){
                yy+=dcmParam.fontSizeLittel

                let p=new DPanel(this.panel,this.param.otstup,yy);
                p.color=dcmParam.colorText;
                p.width=xx-this.param.otstup*2;
                p.height=2
                yy+=this.param.otstup+2;

                /*var l=new DLabel(this.panel, this.param.otstup, yy, "width:")               
                l.width=200;              
                l.activMouse=false;*/

                this.input=new DInput(this.panel, this.param.otstup, yy, "0",null)
                this.input.width=p.width//+this.param.otstup*2;
                this.input.widthTitle=90;
                this.input.title="width";
                this.input.boolNum=true
                this.input.funEnter=this.sobb
                this.input.timeFun=0
                this.input.min=10
                this.input.max=10000
                yy+=this.param.otstup+this.input.height;

                this.input1=new DInput(this.panel, this.param.otstup, yy, "0",null)
                this.input1.width=p.width//+this.param.otstup*2;
                this.input1.widthTitle=90;
                this.input1.title="height left";
                this.input1.boolNum=true
                this.input1.funEnter=this.sobb
                this.input1.timeFun=0
                this.input1.min=30
                this.input1.max=30000
                yy+=this.param.otstup+this.input.height

                this.input2=new DInput(this.panel, this.param.otstup, yy, "0",null)
                this.input2.width=p.width//+this.param.otstup*2;
                this.input2.widthTitle=90;
                this.input2.title="height right";
                this.input2.boolNum=true
                this.input2.funEnter=this.sobb
                this.input2.timeFun=0
                this.input2.min=30
                this.input2.max=30000
                yy+=this.param.otstup+this.input.height

               /* this.lll=new DLabel(this.panel, this.param.otstup+100, yy, "0")               
                this.lll.width=200;              
                this.lll.activMouse=false;*/

                //yy+=dcmParam.fontSize+this.param.otstup;

                
            }



            this.panel.width=xx;
            this.panel.height=yy
            this.width=xx
        }

        this.sobb=function(){
            if(this.type=="DInput"){
                if(this.title=="width"){
                    self.object.razmeru.setWidth(this.value*1)
                    self.postSO()
                    visi3D.intRend=1;
                }
                if(this.title=="height left"){                    
                    self.bool=false;
                    this.b3d.button.z=this.value*1;
                    this.b3d.button1.z=this.value*1;
                    this.b3d.button2.z=this.value*1;
                    self.object.par.addObjFun(self.object.addPoint); 
                    visi3D.intRend=1;
                }
                if(this.title=="height right"){                    
                    self.bool=false;
                    this.b3d.button.z=this.value*1;
                    this.b3d.button1.z=this.value*1;
                    this.b3d.button2.z=this.value*1;
                    self.object.par.addObjFun(self.object.addPoint1); 
                    visi3D.intRend=1;
                }
            }
        }


        this.clearObj=function(){
            this.object.clear()
            visi3D.intRend=1
        }


        this.drag=function(){
            if(self.bool!=false){ 
                self.button1.visible=self.object.boolAree;
                self.button2.visible=!self.object.boolAree;


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

            let sp=window.facade.sp
            let sah=0
            for (var i = 0; i < sp.arrSplice.length; i++) {
                
                if(sp.arrSplice[i].life ==true)sah++
            }
            
            if(sah<=3){
                self.button.activMouse=false
            }else{
                self.button.activMouse=true
            }

            if(this.input){

                this.input.value=Math.round(this.object.ss3d.tCompArrow.distans);
                
                let bbb=this.object.sVephPoint.array[0].tComp3But.button1
                this.input1.b3d=this.object.sVephPoint.array[0].tComp3But
                this.input1.value=Math.round(bbb.z);

                bbb=this.object.sVephPoint.array[this.object.sVephPoint.array.length-1].tComp3But.button1
                this.input2.b3d=this.object.sVephPoint.array[this.object.sVephPoint.array.length-1].tComp3But        
                this.input2.value=Math.round(bbb.z);


                //this.input.value=Math.round(this.object.ss3d.razmer.array[0]
                //this.lll.text=""+Math.round(this.object.ss3d.tCompArrow.distans)+" cm"
            }
            
            this.drag()
        }
        this.clear=function(){
            
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



