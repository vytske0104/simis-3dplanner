

/*
отрисовка граней от полигона
*/

export class GraniXZ {
  	constructor(par) {    		
  		this.type="GraniXZ";
        var self=this;
        this.par=par
       
        this.cont3d = new THREE.Object3D();
        this.par.cont3d.add(this.cont3d);

        this.array=[];
        this.arrayCech=[];

        this.boolZ=true

        //проверяет и персоздат слои перогов не не перерисовывает
        this.gateau
        var  block;
        var zz
        this.addGateau=function (gateau) {
            let r=false

           

            if(this.array.length!=gateau.array.length)r=true;

            if(r==false){
                for (var i = 0; i < this.array.length; i++) {
                    if(this.array[i].isTovar(gateau.array[i])==false){
                        r=true;
                        break;
                    }
                }
            }

            if(r==true){//перог изменился
                this.clear();
                zz=0;
               
                for (var i = 0; i < gateau.array.length; i++) {
                    block=this.getBlock(gateau.array[i].tovar.id);                    
                    block.active=true;
                    block.depth=gateau.delph
                   
                    block.setdoTovar(gateau.array[i],zz);
                    this.array.push(block);
                    zz+=block.hhh;

                }
            }


            this.gateau=gateau;
            return r;
        }


        this.clear=function () {
            this.array.length=0;
            for (var i = 0; i < this.arrayCech.length; i++) {
                this.arrayCech[i].active=false;
            }
        }

        this.getBlock=function (id) {
            
            for (var i = 0; i < this.arrayCech.length; i++) {
                if(this.arrayCech[i].active==false){
                    if(this.arrayCech[i].idTovar==id){
                        return this.arrayCech[i]
                    }
                }
            }
            for (var i = 0; i < this.arrayCech.length; i++) {
                if(this.arrayCech[i].active==false){                    
                    return this.arrayCech[i]                    
                }
            }

            this.arrayCech.push(new GXZBlock(this))

            return this.arrayCech[this.arrayCech.length-1] 

        }


        this.upData=function (a) { 
          
            for (var i = 0; i < this.array.length; i++) {
                //if(i==0)
                    this.array[i].upData(a)
            }   
            
        }      
	}
/*
    set rotation(value) { 
        if(this._rotation!=value) {
            this._rotation= value;
            this.par.rrr=this._rotation
            this.grap.rotation=this._rotation//*Math.PI/180
        }     
        
    }    
    get rotation() { return  this._rotation;}*/
}


export class GXZBlock {
    constructor(par) {           
        this.type="GXZBlock";
        var self=this;
        this._active=false;
        this.par=par

        var ver = new Float32Array(9);
        for (var i = 0; i < 9; i++) {ver[i]=Math.random()}
        var uv = new Float32Array(6);     
        var norm = new Float32Array(9);

        this.depth=100

        this.hhh=111
        this.z=0
        this.z1=100

        this.u=0
        this.u1=1
        this._material=p20.mat

        this.geom = new THREE.BufferGeometry();
        this.geom.setAttribute('position', new THREE.BufferAttribute(ver, 3));
         
        this.mesh3d = new THREE.Mesh(this.geom, this._material);
        this.mesh3d.castShadow = true;
        this.mesh3d.receiveShadow = true;


        this.idTovar=-1;
        this.doTovar=undefined;
        this.isTovar=function (doTovar) {
            return false;
        }

        var mmmm
        this.setdoTovar=function (doTovar, zz) {
            this.doTovar=doTovar
            this.idTovar=doTovar.tovar.id; 


            //if(doTovar.tovar.depth2==undefined)doTovar.tovar.depth2=doTovar.tovar.obj.depth
            //if(doTovar.tovar.depth==undefined)doTovar.tovar.depth=doTovar.tovar.obj.depth 
          
            this.hhh=doTovar.tovar.depth2
            //this.depth=this.hhh

            this.z1=this.depth-zz;
            this.z=this.depth-(zz+this.hhh); 

            

            mmmm=p20Gateau.getMatToTovar(doTovar.tovar) 

            if(mmmm){
                if(mmmm.uuid)
                if(mmmm.uuid!==this._material.uuid){
                    this._material=mmmm
                    this.mesh3d.material=this._material
                }                        
            }
                               
        }


        this.upData=function (a) {            
            this.updateMesh(a)
        } 


        var poA=[]
        var uvA=[]
        var noA=[]
        this.updateMesh = function (a) {
            poA.length=0;
            uvA.length=0;
            noA.length=0;


            for (var i = 0; i < a.length; i++) {
                if(i==0){
                    this.upM(a[a.length-1].position,a[i].position)
                }else{
                    this.upM(a[i-1].position,a[i].position)
                }
                
            }


            if (poA.length ==0) return;

            if (poA.length !== ver.length) {
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
            }
            for (i = 0; i < uvA.length; i++) {
                uv[i] = uvA[i];                
            }
            for (i = 0; i < noA.length; i++) {
                norm[i] = noA[i];                
            }

           // 
            
            this.geom.attributes.normal.needsUpdate = true;            
            this.geom.attributes.position.needsUpdate = true;
            this.geom.attributes.uv.needsUpdate = true;            
            this.geom.computeBoundingBox() 
            this.geom.computeBoundingSphere();
            this.geom.computeVertexNormals();
        }

        var pz,pz1

        this.upM = function (p,p1) { 
            if(this.par.boolZ==true){
                pz=p.z
                pz1=p1.z
            }else{
                pz=0
                pz1=0
            }
            
       
            /*var r=555
            poA.push(Math.random()*r-r/2,  Math.random()*r-r/2,   Math.random()*r-r/2);
            poA.push(Math.random()*r-r/2,  Math.random()*r-r/2,   Math.random()*r-r/2);
            poA.push(Math.random()*r-r/2,  Math.random()*r-r/2,   Math.random()*r-r/2); */   
            
            poA.push(p.x,  p.y,   -(pz+this.z1)); //5 
            poA.push(p.x,  p.y,   -(pz+this.z));//4                     
            poA.push(p1.x, p1.y,  -(pz1+this.z));//6
            uvA.push(0,  this.u1);////4
            uvA.push(0,   this.u);  ////5         
            uvA.push(1,  this.u);////6 
            noA.push(0,0,0)
            noA.push(0,0,0)
            noA.push(0,0,0)




            poA.push(p.x,  p.y,   -(pz+this.z1)); //5 
            poA.push(p1.x, p1.y,  -(pz1+this.z));//4                     
            poA.push(p1.x, p1.y,  -(pz1+this.z1));//6
            uvA.push(0,  this.u1);////4
            uvA.push(1,   this.u);  ////5         
            uvA.push(1,  this.u1);////6  

            noA.push(0,0,0)
            noA.push(0,0,0)
            noA.push(0,0,0)




            poA.push(p.x,  p.y,   -(pz+this.z));//4  
            poA.push(p.x,  p.y,   -(pz+this.z1)); //5 
                               
            poA.push(p1.x, p1.y,  -(pz1+this.z));//6
            uvA.push(0,   this.u);  ////5              
            uvA.push(0,  this.u1);////4
                   
            uvA.push(1,  this.u);////6 
            noA.push(0,0,0)
            noA.push(0,0,0)
            noA.push(0,0,0)



            poA.push(p1.x, p1.y,  -(pz1+this.z));//4 
            poA.push(p.x,  p.y,   -(pz+this.z1)); //5 
                    
            poA.push(p1.x, p1.y,  -(pz1+this.z1));//6
            uvA.push(1,   this.u);  ////5              
            uvA.push(0,  this.u1);////4
       
            uvA.push(1,  this.u1);////6  

            noA.push(0,0,0)
            noA.push(0,0,0)
            noA.push(0,0,0)



         /*   poA.push(tri.p1.x,  tri.p1.y,   tri.p1.z+zz);//4
            poA.push(tri.p.x,   tri.p.y,    tri.p.z+zz); //5          
            poA.push(tri.p2.x,  tri.p2.y,   tri.p2.z+zz);//6
            
            uvA.push(tri.p1.u,  tri.p1.v);////4
            uvA.push(tri.p.u,   tri.p.v);  ////5         
            uvA.push(tri.p2.u,  tri.p2.v);////6  
*/
            
        }
            


    }

    set active(value) { 
        if(this._active!=value) {
            this._active= value;
            if(value==true){
                this.par.cont3d.add(this.mesh3d)
            }else{
                this.par.cont3d.remove(this.mesh3d)
            }
        }     
        
    }    
    get active() { return  this._active;}    
}