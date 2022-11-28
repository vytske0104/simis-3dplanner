

import { TextureBD } from './TextureBD.js';

import { MenuVerh } from './MenuVerh.js';
import { MenuBD } from './MenuBD.js';
import { MenuObject } from './MenuObject.js';
import { MenuThree } from './MenuThree.js';
import { MenuScene } from './MenuScene.js';


import { MenuCreatIcon } from './MenuCreatIcon.js';

import { MatBD } from './MatBD.js';
import { MatObject } from './MatObject.js';
import { NaObj } from './NaObj.js';

import { DragPic } from '../DragPic.js';
import { MInfo } from './MInfo.js';


import { ScBD } from './ScBD.js';


import { INFO } from '../INFO.js';
import { InfoBD } from './InfoBD.js';

export function Menu(aGlaf, fun) {  
    var self=this;  
    this.type="Menu";
    this.par=aGlaf;
    this.objectBase=this.par.objectBase;
    this.fun=fun;
    this.dCont=new DCont(this.par.dCont);

    
    this.param = aGlaf.param;

    this.dragPic= window.dragPic= new DragPic(this.dCont);

    window.INFO=new INFO()
    window.menuBig=this;    

    this.array=[];

    window.mhbdBlad=new MHBDBlad(this);

    this.array.push(this.textureBD = new TextureBD(this, function (s, p) { self.fun(s, p) }));

    this.array.push(this.menuVerh=new MenuVerh(this, function(s,p){ self.fun(s,p)}));
    this.array.push(this.menuBD=new MenuBD(this, function(s,p){ self.fun(s,p)}));  
    this.array.push(this.menuObject=new MenuObject(this, function(s,p,p1){ 
        if(s=="reDragBDIcon")self.menuBD.reDragBDIcon(p,p1)

        if(s=="reDrag3D"){
            setTimeout(function() {
                self.menuBD.setId(self.menuBD.iidd) 

            }, 1000);
            
            trace("reDrag3D")      
        }    
        self.fun(s,p);
    })); 

    this.array.push(this.infoBD=new InfoBD(this, function(s,p){ self.fun(s,p)}));  
    this.array.push(this.menuScene=new MenuScene(this, function(s,p){ self.fun(s,p)}));

    this.array.push(this.matBD=new MatBD(this, function(s,p){ self.fun(s,p)}));  
    this.array.push(this.matObject=new MatObject(this, function(s,p,p1){ 
        if(s=="reDragBDIcon")self.matBD.reDragBDIcon(p,p1);
        self.fun(s,p);
    }));

    this.array.push(this.scBD=new ScBD(this, function(s,p){ self.fun(s,p)}));

    this.array.push(this.menuThree=new MenuThree(this, function(s,p){ self.fun(s,p)}));


    this.array.push(this.naObj=new NaObj(this, function(s,p){ self.fun(s,p)}))

    this.array.push(this.mCreatIcon=new MenuCreatIcon(this, function(s,p){ self.fun(s,p)}));


    this.mInfo= window.mInfo= new MInfo(this.par.dCont);

    var script = document.createElement('script');
    // мы можем загрузить любой скрипт с любого домена
    
    script.onload = function() {
        self.debagThree=new DebagThree(self.par.dCont,635,2,self.par.visi3D.scene,self.par.visi3D);
        self.debagThree.setObj(self.par.s3d.sMod.content3d)
    };
    script.src = "src/pm/DebagThree.js"
    document.head.append(script);
    

    this.sizeWindow = function(w,h){  
        for (var i = 0; i < this.array.length; i++) {
            this.array[i].sizeWindow(w,h)
        }  
        this.mInfo.sizeWindow(w,h)      
    }


    this.keydown=function(e){
        for (var i = this.array.length - 1; i >= 0; i--) {
            if(this.array[i].keydown)this.array[i].keydown(e);
        } 
        
    }
    this.keyup=function(e){
        for (var i = this.array.length - 1; i >= 0; i--) {
            if(this.array[i].keyup)this.array[i].keyup(e);
        } 
    }
}


var mhbd
function MHBDBlad(par) { // MHBD for admin usage (cut version);
    var self=this
    mhbd=this;
    this.par=par
    this.param=par.param

    this.setFile=function(file,obj,keyType,keyParam,fun){
        if(obj)if(obj[keyParam])if(obj[keyParam].id){ 
            var iK=obj[keyParam].id
          
            var o={};
            o.type="DELETE";
            o.url=this.param.server+keyType+"/files/"+iK+"/";
            o.success= function function_name(data) { 
                 
            }

            o.headers = {
                'Authorization': 'Token ' + self.param.token
            };

            $.ajax(o);
        }        

        var formData= new FormData(); 
        formData.append('src', file);
        formData.append('rel_obj', obj.id);
        
        var o={};
        o.type="POST";
        o.url=this.param.server+keyType+"/files/";

        o.data=formData;
        o.processData=false;
        o.contentType=false;


        o.headers = {
            'Authorization': 'Token ' + self.param.token
        };


        o.success= function function_name(data) { 
            obj[keyParam]=data;            
            fun(data.src);           
        }
        o.error=function function_name(data) {
            console.error("не верная загрузка xУУУУУz");
        }
        $.ajax(o);
    }







    this.getKeyList=function(key, successFun, bool){
        if(bool==undefined) {
            if(this.param[key]!=undefined) {
                fun(this.param[key]);
                return;
            }
        }

        var o = {};
        o.url = this.param.server + key+"/";
        o.type = "GET";
        o.success = function (response) {
            trace("response>>>",response)
            self.param[key] = response.results
            if (successFun) successFun(response.results);           
        };
        o.error = function (response) {            
           console.error("ERRR while getting response of", o.url);
        }
        $.ajax(o);
    }




    this.setParam=function(keyType,id,param,value,fun) {

        var o={};
        o.type="PUT";
        o.url=self.param.server+keyType+"/"+id+"/";
        o.data={};
        o.data[param]=value;
      
        o.success= function function_name(data) { 
            if(fun)fun()
        }

        o.error=function function_name(data) {
            console.error("не верная загрузка xУУУУУz")
        }
        o.headers = {
            'Authorization': 'Token ' + self.param.token
        };


        $.ajax(o)
    }
}







