

import { PM } from '../pm/PM.js';
import { BoxHelper } from './menu/BoxHelper.js';

export function S3D(main) { 	
	this.type="S3D";
	var self=this;
    this.par=main
    this.object=undefined;

    this.param= this.par.param;

    this.content3d = new THREE.Object3D();
    main.content3d.add(this.content3d);
    self.content3d.rotation.x=Math.PI;
    

    this.pm = new PM(this.par.visi3D, this.par.objectBase, this.param);



    this.sMod = new SMod(this);
    this.sHelp = new SHelp(this);
    this.sMaterial = new SMaterial(this);
    this.geterMat = new GeterMat(this.par.objectBase.materials);


    this.c3d;

    this.loadMod=function(obj){
        this.sMod.content3d.visible=true;
        this.sMaterial.content3d.visible=false;   
        this.object=obj;

        this.pm.getId(this.object, function(c3d){
            self.c3d=c3d
         
            self.sMod.setC3d(c3d);
            self.sHelp.loadMod(self.object);
            aGlaf.menu.naObj.setObj(c3d);
                      
        },true)       
    }


    this.getMod=function(){
        return this.pm.iz.getMod(self.c3d)
    }

    this.setMod=function(o,b){        
        this.pm.iz.setMod(self.c3d,o,b)
    }
    this.setMat=function(_c3d,_mat,_name,_bool){
        
        this.pm.iz.setMat(_c3d,_mat,_name,_bool)

    }




    this.dragPozition=function(obj){        
        this.pm.filt.dragPozition(self.c3d.hron)       

        var b=false
        if(obj) {            
            if(obj.active==true)b=true                       
        }
        
        if(b==true){
            self.c3d.position.set(obj.p[0],obj.p[1],obj.p[2])
            self.c3d.rotation.set(obj.r[0]*Math.PI/180,    obj.r[1]*Math.PI/180,    obj.r[2]*Math.PI/180)
            self.c3d.scale.set(obj.s[0],obj.s[1],obj.s[2])
        }else{
            self.c3d.position.set(0,0,0);
            self.c3d.rotation.set(0,0,0);
            self.c3d.scale.set(1,1,1);
        }
        aGlaf.intRend=1;
    }


    this.dragcamera=function(c3d){        
        var xVerh=aGlaf.visi3D.xVerh*1
        var yVerh=aGlaf.visi3D.zVerh*1
        var zVerh= aGlaf.visi3D.yVerh*1
        var zume= aGlaf.visi3D.zume

        aGlaf.visi3D.utility.focus.active=true;
        aGlaf.visi3D.utility.focus.targetObject=c3d           
        aGlaf.visi3D.utility.focus.upDate();
        aGlaf.visi3D.utility.focus.active=false;

        var xVerh1=aGlaf.visi3D.xVerh
        var yVerh1=aGlaf.visi3D.zVerh
        var zVerh1= aGlaf.visi3D.yVerh
        var zume1= aGlaf.visi3D.zume



        aGlaf.visi3D.xVerh=xVerh;
        aGlaf.visi3D.yVerh=yVerh;
        aGlaf.visi3D.zVerh=zVerh;
        aGlaf.visi3D.zume=zume
        aGlaf.intRend=1;





        this.tween = new TWEEN.Tween(aGlaf.visi3D);      
        this.tween.to({xVerh:xVerh1, yVerh:yVerh1, zVerh:zVerh1,zume:zume1},500).start();
        this.tween.onUpdate(function(){
            aGlaf.intRend=1;
        })

    }


    this.openMat=function(mat){

        this.sMod.content3d.visible=false
        this.sMaterial.content3d.visible=true      
        this.sMaterial.openMat(mat)
    }

    this.redrag=function(){
        aGlaf.visi3D.intRend=1;
    }

    this.debagOk=function(b){         
        this.par.visi3D.utility.debug = b; 
        this.par.visi3D.utility.plane.visible=b;
        if(this.par.visi3D.utility.sky.cont3d)this.par.visi3D.utility.sky.cont3d.visible=b;       
        if(b==true){

        }
    }

    Object.defineProperty(this, "indexGeometry", {
        set: function (value) { 
            
            if(this._indexGeometry!=value){
                this._indexGeometry=value;               
                this.sMaterial.index=value;
                aGlaf.menu.matObject.mVuborGeom.index=value;


                localS.object.indexGeometry=value;
                localS.save();
           
            }          
            

        },
        get: function () {
            return this._indexGeometry;
        }
    });

    
}  



function SMaterial(s3d) {
    var self=this; 
    this.par=s3d; 
    this.type="SHelp";
    var self=this;
    this.object=undefined;

    this._index=0;
    this.array=[
        new THREE.SphereGeometry( 50, 32, 32 ),
        new THREE.BoxBufferGeometry( 100, 100, 100,10,10,10 ),
        new THREE.CylinderBufferGeometry( 50, 50, 100, 32 ),
        new THREE.TorusKnotBufferGeometry( 50, 10, 100, 12 )
    ]



    this.content3d = new THREE.Object3D();
    this.mesh=new THREE.Mesh(this.array[0]);
    this.content3d.add(this.mesh); 

    this.mesh.castShadow = true;
    this.mesh.receiveShadow = true;



    self.mat=new THREE.MeshPhongMaterial({color:0xffffff});
    
    var aaa=[]
    var r=33
    var r1=633
    this.cont3d = new THREE.Object3D();    
    this.content3d.add(this.cont3d); 
    this.cont3d.visible=false;
    for (var i = 0; i < r; i++) {
        var m=undefined
        if(Math.random()>0.75)m=self.mat
        aaa[i]=new THREE.Mesh(this.array[1],m);
        this.cont3d.add(aaa[i]); 
        aaa[i].position.set(Math.random()*r1-r1/2,Math.random()*r1-r1/2,Math.random()*r1-r1/2)
        aaa[i].castShadow = true;
        aaa[i].receiveShadow = true;
    }
    this.aaa=aaa



    this.openMat=function(mat){         
        this.mesh.material=mat;
        console.warn("~~~",mat)

        for (var i = 0; i < aaa.length; i++) {
           if(aaa[i].material.uuid!=self.mat.uuid) aaa[i].material=mat;
        }
     
        if(this.content3d.parent!=undefined) this.content3d.parent.remove(this.content3d);
        this.par.content3d.add(this.content3d); 
        this.content3d.rotation.x=Math.PI/2
    }

    var w, h,x,z,zume;
    this.foto=function(wh){
        var r="";
        this.par.debagOk(false);
        w=aGlaf.visi3D.width;
        h=aGlaf.visi3D.height;

        x=aGlaf.visi3D.rotationX;
        z=aGlaf.visi3D.rotationZ;
        zume=aGlaf.visi3D.zume;

        
        aGlaf.visi3D.rotationX=1.12
        aGlaf.visi3D.rotationZ=-0.1
        aGlaf.visi3D.zume=270
        aGlaf.visi3D.sizeWindow(aGlaf.visi3D._x,aGlaf.visi3D._y,wh,wh);
        
        aGlaf.visi3D.render();
        r = aGlaf.visi3D.renderer.domElement.toDataURL();

        aGlaf.visi3D.sizeWindow(aGlaf.visi3D._x,aGlaf.visi3D._y,w,h);

        aGlaf.visi3D.rotationX=x;
        aGlaf.visi3D.rotationZ=z;
        aGlaf.visi3D.zume=zume;

        this.par.debagOk(true);
        return r
    }

    Object.defineProperty(this, "index", {
        set: function (value) { 

            if(this._index!=value){
                this._index=value;               
                this.mesh.geometry= this.array[this._index];

                for (var i = 0; i < this.aaa.length; i++) {
                    this.aaa[i].geometry= this.array[this._index];
                } 
            }          
            

        },
        get: function () {
            return this._index;
        }
    });

}






function SHelp(s3d) {
    var self=this; 
    this.par=s3d; 
    this.type="SHelp";
    var self=this;
    this.object=undefined;

    this.content3d = new THREE.Object3D();    
    this.par.content3d.add(this.content3d);


    self.boxHelper=new BoxHelper(0.15,new THREE.MeshPhongMaterial({color:0xff0000}));
    self.content3d.add(self.boxHelper);
    self.boxHelper1=new BoxHelper(0.15,new THREE.MeshPhongMaterial({color:0x00ff00}));
    self.content3d.add(self.boxHelper1);

    this.clear=function(){
        self.boxHelper.visible=false;
        self.boxHelper1.visible=false;
    }


    this.loadMod=function(obj){
        this.clear();              
        this.object=obj;
      
       /* if(this.object.mod.name=="n"){
            return;
        }*/
     
        this.par.redrag()
        self.boxHelper.visible=true;
        self.boxHelper1.visible=true;
        this.dragObj();
    }

    var aaaa=[0,0,0,1,1,1]

    this.dragObj=function(){


        if(this.object.mod && this.object.mod.r){
           
            if(this.object.mod.r[0]==0&&this.object.mod.r[1]==0&&this.object.mod.r[2]==0&&this.object.mod.r[3]==0&&this.object.mod.r[4]==0&&this.object.mod.r[5]==0){
                self.boxHelper.visible=false;
                self.boxHelper1.visible=false;
                
                this.par.redrag(); 
                return 
            }else{
                self.boxHelper.visible=true;
                self.boxHelper1.visible=true;
            }
        }

       /* if(self.boxHelper.visible==false){
            return;
        }*/



  
        if(this.object.mod && this.object.mod.r){
           
            this.dragObjNWD(self.boxHelper, this.object.mod.r);
            this.dragObjNWD(self.boxHelper1, this.object.mod.r1);
            this.par.redrag(); 
            return 
        }



        if(this.object.iNum!=undefined){
            this.dragObjNWD(self.boxHelper, this.object.iNum.rect);
            this.dragObjNWD(self.boxHelper1, this.object.iNum.rect1);
            this.par.redrag(); 
            return  
        }

        this.dragObjNWD(self.boxHelper, aaaa);
        this.dragObjNWD(self.boxHelper1, this.object.mod.r1);



        this.par.redrag();
    }

    this.dragObjNWD=function(bH, a){

        bH.visible=false;
        if(a==undefined)return; 
        bH.visible=true;    


        if(a[3]>0 && a[4]>0 && a[5]>0){            
            bH.width=a[3];
            bH.position.x=a[0]+a[3]/2;

            bH.height=a[4];
            bH.position.z=a[1]+a[4]/2;

            bH.depth=a[5];
            bH.position.y=-a[2]-a[5]/2;   
        }
    }






}





function SMod(s3d) {
    var self=this; 
    this.par=s3d; 
    this.type="SMod";
    var self=this;
    this.object=undefined;

    this.con3d = new THREE.Object3D();
    this.par.content3d.add(this.con3d);

    this.content3d = new THREE.Object3D();
    this.con3d.add(this.content3d);
    self.content3d.rotation.x=Math.PI/2; 
    this.array=["fbx",Math.PI/2, "3ds", Math.PI, "gltf", 0]



    this.loaderGLTF = new THREE.GLTFLoader();

    this.clear=function(){
        this.object=undefined;
        aGlaf.visi3D.intRend=1;        
        for (var i = 0; i < 1; i++) {
            if(this.content3d.children.length!=0){
                var r=this.content3d.children[this.content3d.children.length-1];
                this.content3d.remove(r)
                i=0;
            }
        }
    }

    this.testDefault_light = function(o3d){  
       
        if(o3d.name=="Default_light"){
            if(o3d.parent)o3d.parent.remove(o3d)
        }
        if(o3d.children){
            for (var i = 0; i < o3d.children.length; i++) {
                this.testDefault_light(o3d.children[i]);
            }
        }
    }


    this.setC3d=function(c3d){   
        this.clear();                   
        self.content3d.add(c3d); 
    }


    this.loadMod=function(obj){        
        this.clear();              
        this.object=obj;

        if(this.object.mod.name=="n"){
            return;
        }

       
       

            var now = new Date().getMilliseconds();
            var l=aGlaf.resursData+""+this.object.id+"/mod/"+this.object.mod.name;
            //var l="https://vim-dev.s3.eu-central-1.amazonaws.com/furniture/13/straight_sofa.gltf"
            this.loaderGLTF.load( l, function ( object ) { 
                
                
                self.testDefault_light(object.scene) 
                self.content3d.rotation.x=Math.PI/2;            
                self.content3d.add(object.scene);                
                aGlaf.visi3D.objShadow(self.content3d, true)

                aGlaf.menu.naObj.setObj(object.scene)
                aGlaf.visi3D.intRend=1; 

                self.testMat(object.scene);
                

            })
             
    }


    this.testMat=function(c){ 
        if(c.material!=undefined){
            
            if(c.material.name){
                var b=false
                if(c.material.name.indexOf("m_base")!=-1){ 
                    c.material=self.par.geterMat.get("m_8");
                    b=true
                } 
                if(c.material.name.indexOf("m_xz")!=-1){ 
                    c.material=self.par.geterMat.get("m_10");
                    b=true
                } 

                if(b==false){
                    
                    var rr=self.par.geterMat.getTestTitle(c.material.name)
                    if(rr!=null){
                        
                        c.material=rr;
                    }
                }

            }
           
            if(c.roughnessMap!=undefined){
                c.envMap=aGlaf.visi3D.cubeMap.getTexture()
            }
                      
        }
        if(c.children){
            for (var i = 0; i < c.children.length; i++) {
                this.testMat(c.children[i])
            }
        }

    } 

    this.objActiv=null
    this.startObj=function(obj, bb){ 
        this.objActiv=obj;
       
        
        if(bb==undefined)aGlaf.menu.naObj.startObj(obj);
       
        if(this.objActiv==null){
            aGlaf.visi3D.arrOut=[]
            return 
        }

        
        aGlaf.visi3D.arrOut=this.objActiv


        

    }



    this.getRect=function(){ 
        var a=[0,0,0,100,100,100];
        var focus=aGlaf.visi3D.utility.focus;
        var o=focus.getBoxObject(this.content3d);

        a[0]=o.box3.min.x;
        a[1]=o.box3.min.y;
        a[2]=o.box3.min.z;

        a[3]=o.box3.max.x-o.box3.min.x;
        a[4]=o.box3.max.y-o.box3.min.y;
        a[5]=o.box3.max.z-o.box3.min.z;

        return a;
    }


    this.obj3d=undefined;    

    this.out=function(e){
        document.body.style.cursor="auto";

        self.obj3d=undefined;
    }
    this.over=function(e){        
        document.body.style.cursor="pointer";
        if(e!=null)if(e.target!=null)self.obj3d=e.target;        
    }

    this.down=function(e){         
        if(e!=null)if(e.target!=null){
            self.startObj(e.target);
            return;
        }
        self.startObj(null);
    }  

    

    const textureLoader = new THREE.TextureLoader();
    aGlaf.menu.dragPic.addFunAp(function(){

        if(aGlaf.menu.dragPic.object!=undefined){            
            if(aGlaf.menu.dragPic.object.id!=undefined){


                if(aGlaf.menu.dragPic.object.key==undefined || aGlaf.menu.dragPic.object.key=="materials"){
                    if(self.obj3d!=undefined){                       
                        self.par.setMat(self.obj3d, aGlaf.menu.dragPic.object.id, null, true)                         
                    }
                    return
                }
                

               /* if((aGlaf.menu.dragPic.object.id+"").indexOf("m_")!=-1){                                    
                    if(self.obj3d!=undefined){                       
                        self.par.setMat(self.obj3d, aGlaf.menu.dragPic.object.id, null, true)                         
                    }
                    return
                } else if ((aGlaf.menu.dragPic.object.id + "").indexOf("t_") !== -1) {
                    if (self.obj3d !== undefined) {
                        self.obj3d.material.map = self.par.pm.tex.getById(aGlaf.menu.dragPic.object.id);
                    }
                    return;
                }*/


                if(self.obj3d!=undefined){
                    
                    var o=new THREE.Object3D()
                    o.position=self.obj3d.position;
                    o.scale=self.obj3d.scale;
                    o.rotation=self.obj3d.rotation;

                    if(o.iz==undefined)o.iz={}
                    o.iz.position=o.iz.position={x:self.obj3d.position.x,y:self.obj3d.position.y,z:self.obj3d.position.z}
                    o.iz.rotation=o.iz.rotation={x:self.obj3d.rotation.x,y:self.obj3d.rotation.y,z:self.obj3d.rotation.z}    
                    o.iz.scale=o.iz.scale={x:self.obj3d.scale.x,y:self.obj3d.scale.y,z:self.obj3d.scale.z}
                    o.iz.mod=aGlaf.menu.dragPic.object.id;




                    var ii=0;
                    for (var i = 0; i < self.obj3d.parent.children.length; i++) {
                        if(self.obj3d.parent.children[i].uuid==self.obj3d.uuid)ii=i;
                    }
                    o.notPar=true
                    self.obj3d.parent.add(o)
                    self.obj3d.parent.remove(self.obj3d)

                    o.parent.children.splice(o.parent.children.length-1,1)
                    o.parent.children.splice(ii,0,o)
                    
                    self.par.pm.getId(aGlaf.menu.dragPic.object.id, function(c3d){
                        o.add(c3d)
                        self.par.sMod.setC3d(self.par.c3d);
                        self.par.sHelp.loadMod(self.par.object);
                        aGlaf.menu.naObj.setObj(self.par.c3d);
                    })                    
                }
            }
        }
    })

        /*this.pm.getId(this.object, function(c3d){
            self.c3d=c3d*/
         


    aGlaf.visi3D.addEvent("out", this.out);
    aGlaf.visi3D.addEvent("over", this.over);
    aGlaf.visi3D.addEvent("down", this.down);
    

    aGlaf.visi3D.addChildMouse(self.par.content3d)

}

function GeterMat(matarialArray) {
    var self=this;     
    this.type="GeterMat";
    this.matarialArray=matarialArray;
    this.obj={}
    
    var loader = new THREE.TextureLoader();


    this.get=function(id){
        var r=null;
        var p=-1;    
        for (var i = 0; i < matarialArray.length; i++) {
            if(matarialArray[i].id==id){
                p=i;
            }
        }
        if(p==-1)return null;

        if(this.obj[id]!=undefined)return this.obj[id];

        var comand = 'new THREE.' + matarialArray[p].key + '()';
        var m = eval(comand);
        this.startMat(m, id)
        this.obj[id]=m;
        m.idUz=id
        return m;       
    }

    this.getTestTitle=function(_text){
        var r=null;
        if(_text=="Material #1sdaw")_text="m_Metal_dfgdg";

        if(_text!=undefined){
        
            for (var i = 0; i < matarialArray.length; i++) {
                if(_text.indexOf(matarialArray[i].title)!=-1){
              
                    r=this.get(matarialArray[i].id);
                    return r
                }                
            }
        }
        return r
    }
  
    this.objToMater=function(obj,m){
        var s;
        var o=obj.obj
        for(var s in o){         
            if(m[s]!=undefined){
                if(m[s] instanceof THREE.Color ){                   
                    m[s]=new THREE.Color(o[s]);
                }else{
                    m[s]=o[s];
                }
            }
        }
        if(obj.mirro!=undefined)if(obj.mirro==true){            
            m.envMap=aGlaf.visi3D.getEnvMap()
        }
        

        if(o.textur)
        for (var i = 0; i < o.textur.length; i++) {
            textur=loader.load(o.textur[i].link)
            textur.wrapS = textur.wrapT = THREE.RepeatWrapping;

            //textur.wrapS =  THREE.RepeatWrapping;
            //textur.wrapT = THREE.RepeatWrapping;

            textur.repeat.x=o.textur[i].rx;
            textur.repeat.y=o.textur[i].ry; 
            m[o.textur[i].name] =  textur       
        }

        

        

        m.needsUpdate=true;
        m.bLoad=true;
        if(m.arrFun)
        for (var i = 0; i < m.arrFun.length; i++) {
            m.arrFun[i](m);
        }              
    }
  

    this.startMat=function(m, id){
        var o;
        //var l="../"+aGlaf.resursData+""+id+"/config.json"+"?x=" + Math.random();

        var l=php.server+aGlaf.resursData+""+id+"/config.json"+"?x=" + Math.random();
        
        $.ajax({
            url: l,
            success: function function_name(data) {                         
                if(typeof data === "string") {
                    var conf = JSON.parse(data)
                    o = conf;
                } else o = data;              
                self.objToMater(o,m)
                
                //self.start();           
                                 
            },
            error:function function_name(data) {

                self.start();
            }
        }); 
    }
}