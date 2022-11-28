

import { MOPoint } from './MOPoint.js';
import { MOTCompArrow } from './MOTCompArrow.js';
import { MOTComp3But } from './MOTComp3But.js';
import { MOBlok } from './MOBlok.js';
import { MOBInLes } from './MOBInLes.js';


import {NMBaze } from './nizMenu/NMBaze.js';
//import {NMPoint0 } from './nizMenu/NMPoint0.js';
import {NMSpPointSten } from './nizMenu/NMSpPointSten.js';
import {NMSpliceSten } from './nizMenu/NMSpliceSten.js';
import { NMTComp3But } from './nizMenu/NMTComp3But.js';
import { NMBlok } from './nizMenu/NMBlok.js';
export class MObject  {
  	constructor(par,fun) {  		
  		this.type="MObject";
  		var self=this;
        this.par=par
        this.fun=fun
        this.param=this.par.param;

        this.otstup=this.param.otstup;
        this.otstup1=this.param.otstup;
        this.wh=this.param.wh;
        this.width=this.param.sizeBase;
        this.whSize=1000

        this.dCont=new DCont(par.dCont);
        this.dCont.y=this.otstup*3+this.param.wh*2; 
        this.array=[];

        this.dCont1=new DCont(par.dCont);
        this.array1=[];


        this.dragPic=this.par.dragPic//new DragPic(par.dCont)


        this.array[0]=this.moPoint=new MOPoint(this, function(s,p){});
        this.array[1]=this.moTCompArrow=new MOTCompArrow(this, function(s,p){});
        this.array[2]=this.moTComp3But=new MOTComp3But(this, function(s,p){});
        this.array[3]=this.moBlok=new MOBlok(this, function(s,p){});
        this.array[4]=this.moBInLes=new MOBInLes(this, function(s,p){});



       // this.array1[this.array1.length]=this.nmBaze=new NMBaze(this, function(s,p){});
        this.array1[this.array1.length] = new NMSpPointSten(this, function(s,p){});
        this.array1[this.array1.length] = new NMSpliceSten(this, function(s,p){}); 
        this.array1[this.array1.length] = new NMTComp3But(this, function(s,p){});    
        this.array1[this.array1.length] = new NMBlok(this, function(s,p){});  


        this.dragMenu=function(){
            for (var i = 0; i < this.array.length; i++) {
                if(this.array[i].active){
                    if(this.array[i].drag){
                        this.array[i].drag()
                    }
                }
            }
            for (var i = 0; i < this.array1.length; i++) {
                if(this.array1[i].active){
                    if(this.array1[i].drag){
                        this.array1[i].drag()
                    }
                }
            }
        }


        this.clear=function(){
            for (var i = 0; i < this.array.length; i++) {
                this.array[i].clear()
            }
            for (var i = 0; i < this.array1.length; i++) {
                this.array1[i].clear()
            }
        }

        this.setObject=function(obj){
            this.clear();
            if(window.localS.object.debug==true){
                if(obj){
                    for (var i = 0; i < this.array.length; i++) {                  
                        if(this.array[i].typeNa==obj.type){
                            this.array[i].setObject(obj)
                        }
                    }
                }
            }
            
            if(obj){
                for (var i = 0; i < this.array1.length; i++) { 
                                 
                    if(this.array1[i].typeNa==obj.type){
                        this.array1[i].setObject(obj);
                    }else{
                        this.array1[i].active=false;
                    }
                }                
            }else{
                //this.nmBaze.active=false;
            }
        }


        this.sizeWindow = function(w,h,s){             
            this.dCont.x=w/s-this.width -   this.otstup

            for (var i = 0; i < this.array1.length; i++) {
                if(this.array1[i].sizeWindow)this.array1[i].sizeWindow(w,h,s);
            }/* */ 
        }

        this.keydown=function(sob,event,boolCTRL){            
            for (var i = 0; i < self.array.length; i++) {
                if(self.array[i].keydown&& this.array[i].active )self.array[i].keydown(sob,event,boolCTRL)
            }
            for (var i = 0; i < self.array1.length; i++) {
                if(self.array1[i].keydown && this.array1[i].active)self.array1[i].keydown(sob,event,boolCTRL)
            }
        }
        
        this.keyup=function(sob,event,boolCTRL){
            for (var i = 0; i < self.array.length; i++) {
                if(self.array[i].keyup&& this.array[i].active )self.array[i].keyup(sob,event,boolCTRL)
            }
            for (var i = 0; i < self.array1.length; i++) {
                if(self.array1[i].keyup && this.array1[i].active)self.array1[i].keyup(sob,event,boolCTRL)
            }
        }
  	}

     

}
