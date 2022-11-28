
import {GraniXZ} from './GraniXZ.js';


export class PubBase  {
  	constructor(par,fun) {  
  		
  		this.type="PubBase";
        var self=this;
        this.par=par;
        this.fun=fun;

        this._active=false;
        this._sloiPoliUnik="null";
        this._alpha=1;

        this._idPosit=0;
        this._zdvigZ=0;

        var bvun=false
        var ver = new Float32Array(9);
        var uv = new Float32Array(6);
        var norm = new Float32Array(9);

        this.geom = new THREE.BufferGeometry();
        this.geom.setAttribute('position', new THREE.BufferAttribute(ver, 3));
    
        var bvun1=false
        var ver1 = new Float32Array(9);        
        var uv1 = new Float32Array(6);     
        var norm1 = new Float32Array(9);
        this.geom1 = new THREE.BufferGeometry();
        this.geom1.setAttribute('position', new THREE.BufferAttribute(ver1, 3));

        this.matBase=pm.matDop.getIDObj(10)
        this._material=pm.matDop.getIDObj(11)
        this._material1=pm.matDop.getIDObj(9)
        //ver.length=ver1.length=0

        this.cont3d =this.par.ssP3d.cont3d// new THREE.Object3D();
        this.cont3dL =this.par.ssP3d.cont3dL


        //this._material = this.par.par.mat;
        //this._material1 = this.par.par.mat;
        
        this.mesh3d = new THREE.Mesh(this.geom, this._material);
        this.mesh3d.castShadow = true;
        this.mesh3d.receiveShadow = true;
        this.cont3d.add(this.mesh3d)
        //this.mesh3d.material=window.pm.matDop.getIDObj(25)

        this.mesh3d1 = new THREE.Mesh(this.geom1, this._material1);
        this.mesh3d1.castShadow = true;
        this.mesh3d1.receiveShadow = true;
        this.cont3d.add(this.mesh3d1);

        
        this.graniXZ=new GraniXZ(this)


        this.boolNova=false;

        visi3D.objShadow(this.cont3d)





        var sas,sasUUID,bbbb,www,hhh
        this.keyG=par.key
        this.uuidDin="null";
        this.objDin = null;
        this._delph=1
        //overlap
                        //крыша             //перекрытия        //стяжка
        this.arrKye=[   "gateauRoofPol",    "gateauOverlapPol", "gateauScreedPol"]; 
        this.draw1Color=function(r,b){ 
                      
           /* if(r==this.keyG){
                //this.drawOD(this.par.gateauObj[this.keyG],b )
                trace(">>%%"+this.uuidDin,"==u==",this.par.gateauObj[this.keyG].uuid," ====== ",r,b,this.boolNova);  
                //b - убийсто уникальности

                

                if((b===true)||(this.uuidDin!=this.par.gateauObj[this.keyG].uuid)){


                    if(this.boolNova===true)return;


                    this.uuidDin=this.par.gateauObj[this.keyG].uuid;
                    this.objDin = this.par.gateauObj[this.keyG];  
                     
                    www=200//
                    hhh=200//
                    if(this.objDin.tovarFace !=null){
                        www=this.objDin.tovarFace.d3Width;
                        hhh=this.objDin.tovarFace.d3Height;
                    }


                    if(this.objDin.mat){
                        if(this.objDin.mat.uuid!==this._material.uuid){
                            this.material=this.objDin.mat
                        }                        
                    }else{
                        if(this.matBase.uuid!==this._material.uuid){
                            this.material=this.matBase
                        }
                    }

                    if(this.objDin.mat1){
                        if(this.objDin.mat1.uuid!==this._material1.uuid){
                            this.material1=this.objDin.mat1
                        }                        
                    }else{
                        if(this.matBase.uuid!==this._material1.uuid){
                            this.material1=this.matBase
                        }
                    }

                    
                    
                    this._delph=this.objDin.delph;

                  

                    
                    this.par.rect.w=www
                    this.par.rect.h=hhh

                    this.graniXZ.addGateau(this.par.gateauObj[this.keyG]);
                    this.par.dragNaTriang()
                    this.draw1()

                }
            }*/
        }


        var ww,hh
        this.drawOD=function(od,b){ 
            trace(">>od,b ^^ ",od,b)
            if(b==undefined)b=false;            
            
            if(this.uuidDin!=od.uuid || b==true){
                this.uuidDin=od.uuid;
                this.objDin = od
                

                if(this.objDin.mat){
                    if(this.objDin.mat.uuid!==this._material.uuid){
                        this.material=this.objDin.mat
                    }                    
                }

                if(this.objDin.mat1){
                    if(this.objDin.mat1.uuid!==this._material1.uuid){
                        this.material1=this.objDin.mat1
                    }                        
                }
                
                this._delph=this.objDin.delph
                ww=100;
                hh=100;
                if(this.objDin.tovarFace)if(this.objDin.tovarFace.d3Width){
                    ww=this.objDin.tovarFace.d3Width
                    hh=this.objDin.tovarFace.d3Height
                }

                
                this.par.rect.w=ww
                this.par.rect.h=hh

                this.graniXZ.addGateau(od);
                this.par.dragNaTriang()
                this.draw1()
                

            }
            
        }
 



        this.setColorNova=function(r,p,b){  
            trace(">>setColorNova ^^ ",r,p,b)
            this.boolNova=true;
            this.drawOD(p,b)
        }

       


        var poA=[]
        var uvA=[]
        var noA=[]
        this.updateMesh = function () {
           
            poA.length=0;
            uvA.length=0;
            noA.length=0;

            for (var i = 0; i < this.triangulateShape.lTri; i++) {
                this.upM(this.triangulateShape.aTri[i], -this.par._delph+0)
            }
           
            if (poA.length ==0) return;

            if (poA.length !== ver.length||bvun==false) {
                bvun=true
                ver = new Float32Array(poA.length);
                uv = new Float32Array(uvA.length);
                norm = new Float32Array(noA.length);
                this.geom.deleteAttribute('normal');
                this.geom.deleteAttribute('position');
                this.geom.deleteAttribute('uv');
                this.geom.setAttribute('position', new THREE.BufferAttribute(ver, 3));
                this.geom.setAttribute('uv', new THREE.BufferAttribute(uv, 2));
                this.geom.setAttribute('normal', new THREE.BufferAttribute(norm, 3));
            }

            for (i = 0; i < poA.length; i++) {
                ver[i] = poA[i]; 
                //ver[i] =Math.random()*500-250               
            }
            for (i = 0; i < uvA.length; i++) {
                uv[i] = uvA[i];                
            }
            for (i = 0; i < noA.length; i++) {
                norm[i] = noA[i];                
            }
            
           // this.geom.computeVertexNormals();

            this.geom.attributes.normal.needsUpdate = true;
            this.geom.attributes.position.needsUpdate = true;
            this.geom.attributes.uv.needsUpdate = true;
            
            this.geom.computeBoundingBox() 
            this.geom.computeBoundingSphere();
            this.geom.computeVertexNormals();
            
      
        }

        




        this.upM = function (tri,zz) { 
            poA.push(tri.p1.x,  tri.p1.y,   tri.p1.z+zz);//4
            poA.push(tri.p.x,   tri.p.y,    tri.p.z+zz); //5          
            poA.push(tri.p2.x,  tri.p2.y,   tri.p2.z+zz);//6
            
            uvA.push(tri.p1.u,  tri.p1.v);////4
            uvA.push(tri.p.u,   tri.p.v);  ////5         
            uvA.push(tri.p2.u,  tri.p2.v);////6
            noA.push(0,0,0, 0,0,0, 0,0,0);
        }


        var poA1=[]
        var uvA1=[]
        var noA1=[]
        this.updateMesh1 = function () {
            return
            poA1.length=0;
            uvA1.length=0;
            noA1.length=0;
            for (var i = 0; i < this.triangulateShape.lTri; i++) {
                this.upM1(this.triangulateShape.aTri[i], 0, poA1, uvA1, noA1)
            }

            if (poA1.length ==0) return;

            if (poA1.length !== ver1.length||bvun1==false) {
                bvun1=true
                ver1 = new Float32Array(poA1.length);
                uv1 = new Float32Array(uvA1.length);
                norm1 = new Float32Array(noA1.length);
                this.geom1.deleteAttribute('normal');
                this.geom1.deleteAttribute('position');
                this.geom1.deleteAttribute('uv');
                this.geom1.setAttribute('position', new THREE.BufferAttribute(ver1, 3));
                this.geom1.setAttribute('uv', new THREE.BufferAttribute(uv1, 2));
                this.geom1.setAttribute('normal', new THREE.BufferAttribute(norm1, 3));
            }

            for (i = 0; i < poA1.length; i++) {
                ver1[i] = poA1[i];                
            }
            for (i = 0; i < uvA.length; i++) {
                uv1[i] = uvA1[i];                
            }
            for (i = 0; i < noA.length; i++) {
                norm1[i] = noA1[i];                
            }

           // this.geom.computeVertexNormals();
            
            this.geom1.attributes.normal.needsUpdate = true;
            this.geom1.attributes.position.needsUpdate = true;
            this.geom1.attributes.uv.needsUpdate = true;
            
            this.geom1.computeBoundingBox() 
            this.geom1.computeBoundingSphere();
            this.geom1.computeVertexNormals();
        }

        this.upM1 = function (tri,zz, _poA1, _uvA1, _noA1) { 
            _poA1.push(tri.p.x,   tri.p.y,    tri.p.z+zz); //5  
            _poA1.push(tri.p1.x,  tri.p1.y,   tri.p1.z+zz);//4                    
            _poA1.push(tri.p2.x,  tri.p2.y,   tri.p2.z+zz);//6

            _uvA1.push(tri.p.u,   tri.p.v);  ////5 
            _uvA1.push(tri.p1.u,  tri.p1.v);////4                    
            _uvA1.push(tri.p2.u,  tri.p2.v);////6 
            _noA1.push(0,0,0, 0,0,0, 0,0,0);
        }




        this.draw2d=function(){

        }
        this.postActive=undefined


        this.tween=undefined
        this.animat=function(time){

            if(this.tween==undefined){
                this.tween = new TWEEN.Tween(this.graphics);
                this.tween.onUpdate(function(){             
                    self.par.par.render();
                })
            }
            this.graphics.alpha=0;
            this.tween.to({alpha:1},time).start();
        }

        this.clear = function () {
            this._alpha=1;
            if(this.boolNova!=false ){
                this.boolNova=false; 
                this.objDin=this.par.gateauObj[this.keyG];
                this.par.draw1Color(this.par.key);
            }
            this._idPosit=0;
            this._zdvigZ=0;
            if(this.postClear)this.postClear()
        }



        this.getObj=function(){
            var o={}
           
            if(this.uuidDin!="null")if(this.par.gateauObj[this.keyG].uuid!==this.uuidDin){                
                o.gateau = p20Gateau.getSaveObj(this.objDin)
            }
            o.idPosit=this.idPosit
            o.zdvigZ=this.zdvigZ

            if(this.posGetObj) this.posGetObj(o)

            return o
        }

        this.setObj=function(o){
          
            if(this.posSetObj) this.posSetObj(o)
            if(o.idPosit!=undefined){
                this.idPosit=o.idPosit
                this.zdvigZ=o.zdvigZ
            }
            this.boolNova=false
            if(o)
            if(o.gateau!=undefined){
                this.boolNova=true
                p20Gateau.korektGateau(o.gateau)  
                this.setColorNova(this.keyG,o.gateau, true)               
            }
            
            return null

        }

	}

    set sloiPoliUnik(value) {
        /*if(this._sloiPoliUnik!=value){     
            this._sloiPoliUnik= value; 
            if(this._sloiPoliUnik!=="null" && this._sloiPoliUnik!==this.type){
                this._alpha=0.2;
                if(this.graphics.interactive==true){
                    this.graphics.interactive = false;
                    for (var i = 0; i < this.par.array.length; i++) {
                        this.par.array[i].boolMA=false;
                      
                    } 
                }
            }else{
                this._alpha=1;
                 if(this.graphics.interactive==false){
                    this.graphics.interactive = true;
                    for (var i = 0; i < this.par.array.length; i++) {
                        this.par.array[i].boolMA=true;
                        this.par.array[i].upChild(true);
                    }  
                }
            }
            this.draw2d();
        }*/
    }    
    get sloiPoliUnik() { return  this._sloiPoliUnik;}
 
    set active(value) { 
        if(this._active!=value){
            this._active=value
            if(this._active==true){
                for (var i = 0; i < this.par.array.length; i++) {               
                    this.par.array[i].upChild(true);
                }
                if(this.par.cont2dVerh.parent!=undefined)this.par.cont2dVerh.parent.addChild(this.par.cont2dVerh);           
                if(this.par.content2d.parent!=undefined)this.par.content2d.parent.addChild(this.par.content2d);
            } 
            if(this.postActive!=undefined)this.postActive();
        } 
    }    
    get active() { return  this._active;}


    set idPosit(value) { 
        if(this._idPosit!=value){
            this._idPosit=value            
        } 
    }    
    get idPosit() { return  this._idPosit;}

    set zdvigZ(value) { 
        if(this._zdvigZ!=value){
            this._zdvigZ=value 

        } 
    }    
    get zdvigZ() { return  this._zdvigZ;}    


}