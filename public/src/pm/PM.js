
//Версия с расшаркой дополнительных обьектов

import PMMat from './PMMat.js';
import PMMatDop from './PMMatDop.js';
import PMFilt from './PMFilt.js';
import PMIz from './PMIz.js';
import PMTexture from './PMTexture.js';
import Dop from './Dop.js';

export function PM(visi3D, objbase, _param) { 	
	this.type="PM";
	var self=this;
    this.objbase=objbase;
    this.visi3D=visi3D

    this.param = _param;



    this.plus="?1";
    this.loaderGLTF = new THREE.GLTFLoader();

    this.tex = new PMTexture(this, visi3D, objbase);
    this.mat=new PMMat(this, visi3D, objbase);
    this.filt=new PMFilt(this, visi3D, objbase);
    this.iz=new PMIz(this, visi3D, objbase);
    this.matDop=new PMMatDop(this, visi3D, objbase);

    this.dop=new Dop(this, visi3D, objbase);
    this.arrayHron=[];    

    
    this.getId=function(idObj,fun,bClaen){
        if(bClaen==true){//Стартуем занново
            for (var i = 0; i < this.arrayHron.length; i++) {            
                if(this.arrayHron[i].testId(idObj)==true){
                    this.arrayHron.splice(i,1)                    
                }
            }
        } 
        for (var i = 0; i < this.arrayHron.length; i++) {            
            if(this.arrayHron[i].testId(idObj)==true){
                this.arrayHron[i].setFun(fun);
                return;
            }
        }
        this.arrayHron.push(new Hron(this, idObj, fun));
    }



    





    //глобально очищает все бд
    this.clear=function(){

    }
}  




export function  Hron (par, idObj, fun) {
    this.type="Hron";
    var self=this;
    this.par=par


    this.idObj=idObj;
    this.id=undefined;
    this.object=undefined;
    this.link=undefined;

    this.filt=undefined;

    this.content3d=undefined;
    this.param=this.par.param
    this.nameType=this.param.arrayName[0]
    this.objBig=undefined;


    this.array=[];
    this.array.push(fun);
    this.boolClone=true;
   
    var cc;
    this.setFun = function(fun){
        if(this.content3d!=undefined){
            if(self.boolClone==true){
                cc=self.content3d.clone();                
            }else{
                cc=self.content3d;
            }
            cc.hron=this

            this.par.iz.setHron(this, cc)
            if(this.object.param){                
                this.par.filt.dragParam(cc,this.object.param)
            }
            this.par.iz.setHron(this, cc)
            fun(cc);
            return;
        }
        this.array.push(fun);
    }
    
    this.finalLoad=function(o3d){ 
        this.getObj3D(o3d);
        this.content3d = o3d;
        o3d.name="hron_"+this.id;
        this.par.mat.setObjS(this.content3d,this.object,this.finalLoad1)  
        //this.finalLoad1()            
        //
    }

    this.finalLoad1=function(){         
        self.par.filt.setObjS(self,self.finalLoad2)
    }
    
    this.finalLoad2=function(){        
        for (var i = 0; i < self.array.length; i++) {
            if(self.boolClone==true){
                cc=self.content3d.clone();                
            }else{
                cc=self.content3d;
            }
            cc.hron=self; 
            
            self.par.iz.setHron(self, cc)
            if(self.object.param){           
                self.par.filt.dragParam(cc,self.object.param)
            }
            self.par.iz.setHron(self, cc)
            self.array[i](cc);
        }
    }
        
    
    this.loadObject=function(){ 

    }

 



    this.start=function(){ 


       if(this.object==null)this.object={}
        if(this.object==undefined)this.object={}
       

        if(this.object.res!=undefined){


            var rr=mhbd.getLink(this.object.res.src)//.replace("http://","https://")

            this.par.loaderGLTF.load( rr/*this.object.res.src*/, function ( object ) { 
                self.finalLoad(object.scene);
            })
            return
        }

        this.finalLoad(new THREE.Object3D());

       // this.finalLoad(new THREE.Mesh(new THREE.BoxBufferGeometry(100,100,100)));


        /*
        this.link="resources/data/"+this.id+"/mod/"+this.object.mod.name;          


        if(this.object.mod.name=="n"){//Debag
            this.finalLoad(new THREE.Mesh(new THREE.BoxBufferGeometry(100,100,100)));
            



        }else{
            this.par.loaderGLTF.load( this.link, function ( object ) { 
                self.finalLoad(object.scene);
            })    
        }*/
    }



    var xid,xxid
    this.testId=function(_idObj){

        if(typeof _idObj =="number")xxid=_idObj
        else xxid=_idObj.id;

        if(this.id==undefined){
            xid=this.idObj.id
        }else{
            xid=this.id
        }         

        if(xid==xxid) return true

        return false     
    }



   this.getObj3D=function(o3d){

        if(o3d.material!=undefined){
            if(o3d.material.roughnessMap!=undefined){
                if(par.visi3D)o3d.material.envMap=par.visi3D.cubeMap.getTexture()
            }
        }
        
        if(o3d==undefined)return

        if(o3d.children!=undefined){
            for (var i = o3d.children.length-1; i >=0; i--) {            
                this.getObj3D(o3d.children[i]);                 
            }
        }
        
        if(o3d.name=="Default_light"){
            o3d.parent.remove(o3d)
        }
        //return o;
    }  


 

    if(typeof idObj == "object"){//обект загружен и его можно сразу стортонуть        
        self.object=idObj
        this.start(idObj)        
        return            
    }  

    if(typeof idObj =="number") {
        this.id=idObj;

    }





    mhbd.getKeyId("objects3d",this.id, function(data){
        self.object=data.json;
        
        self.start();
    })    
    
 /*       
        var po=null;
    

        for (var i = 0; i < this.param[this.nameType].length; i++) {   
            if(this.param[this.nameType][i].id == this.id){
                if(this.param[this.nameType][i].json){                    
                    if(typeof this.param[this.nameType][i].json === "string") {
                        po = JSON.parse(this.param[this.nameType][i].json)             
                    } else po = this.param[this.nameType][i].json;
                }
                break;
            }
        }

         


        if(po!=null){  

            self.object=po;




            self.start();
            return 
        }



        var o={}
        o.type= "GET";
        o.url= this.param.server+this.nameType+"/"+idObj+"/";
        o.success= function function_name(data) {           
            self.objBig=data;

            if(typeof data.json === "string") {
                self.object=JSON.parse(data.json);                                    
            } else self.object=data.json; 

            self.start();
        }


        $.ajax(o)

*/
     
}  

