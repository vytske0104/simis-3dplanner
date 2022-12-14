 

export function BoxHelper(sizeEdge, material) {
    THREE.Object3D.call(this);
    var self=this;
    this.type="BoxHelper";
    this._width = 100;
    this._height= 100;
    this._depth = 100;
    this._sizeEdge = sizeEdge||1;// толщина граней
    //this._sizeEdge = 1;// толщина граней
    this._activeRadius=false
    this.sizeBox = 10; // размер кубиков
    //if(bigBaza.devas)this.sizeBox=20;
    this.arrCube=[];// кубики
    this.arrEdge=[];// грани

    this._visiCube=false; 

    this._tilshia=5
    //this._radius=10  
   // this.materialBH1=material1

    this._material=material;
    this._activ=false;
    this.boxGeometry= new THREE.BoxBufferGeometry( 1, 1, 1)
    this.sphereGeometry= new THREE.SphereBufferGeometry( 2, 12, 12);
   /* this.torusGeometry = new THREE.TorusBufferGeometry( this._radius, this._tilshia, 6, 64 );
    this.torusGeometry.radOld=this._radius*/

    this.ms = new THREE.Mesh( this.sphereGeometry, this._material);
    this.add( this.ms );
   /* this.torusMesh= new THREE.Mesh( this.torusGeometry, this.materialBH1);
    this.add( this.torusMesh );
    this.torusMesh.rotation.x=Math.PI/2;
    this.torusMesh.scale.z=0.2;
    this.torusMesh.name="bhRadius";*/
    
    this._life=1;
    this.initCube=function(){
        // создаем кубики 
        for (var i = 0; i < 8; i++) {
            this.arrCube[i] = new THREE.Mesh( this.boxGeometry1, this._material );
            this.arrCube[i].scale.x=this.sizeBox;
            this.arrCube[i].scale.y=this.sizeBox;
            this.arrCube[i].scale.z=this.sizeBox;               
        }      
        
        this.arrCube[0].name="tm_1";
        this.arrCube[1].name="tm_1";

        this.arrCube[2].name="tm_4";
        this.arrCube[3].name="tm_4";

        this.arrCube[4].name="tm_2";
        this.arrCube[5].name="tm_2";

        this.arrCube[6].name="tm_3";
        this.arrCube[7].name="tm_3";
    }


    // создаем грани
    for (var i = 0; i < 12; i++) {
        this.arrEdge[i] = new THREE.Mesh( this.boxGeometry, this._material );
        this.arrEdge[i].scale.x=this._sizeEdge;
        this.arrEdge[i].scale.y=this._sizeEdge;
        this.arrEdge[i].scale.z=this._sizeEdge;
        this.add( this.arrEdge[i] );
    }

    // бокс который в нутри
    this.box = new THREE.Mesh( this.boxGeometry, this.materialBH1 );
    this.add(this.box);    
    this.box.scale.x=this._width;
    this.box.scale.y=this._depth;
    this.box.scale.z=this._height;
    this.box.name="blok";
    this.box.visible=this._visiCube;

    this.box.renderOrder=2;

    this.setRect = function(a, rad) {

        if(a[3]<10||a[5]<10||a[4]<10){
            this.sizeEdge=0.5
        }else{
            this.sizeEdge=2
        }

        this.width=a[3];
        this.position.x=a[0]+a[3]/2;
            
        this.height=a[5];
        this.position.z=a[2]+a[5]/2;
            
        this.depth=a[4];
        this.position.y=a[1]+a[4]/2;

        //this.changeSize()



        //this.torusMesh.position.y=this.ms.position.y = -a[4]/2;
        

        //this.radius=rad
       
       
        



    }


  /*  this.dragRatuis=function(){

        if(this._activeRadius==false){
            this.torusMesh.visible=false
            return
        }


        if(this._radius==undefined){
            this.torusMesh.visible=false
        }else{
            
            if(this.torusGeometry.radOld!=this._radius){                
                this.torusMesh.geometry=new  THREE.TorusBufferGeometry( this._radius+this._tilshia*2, this._tilshia, 6, 64 );           
                this.torusGeometry.dispose();
                delete this.torusGeometry
                this.torusGeometry=this.torusMesh.geometry;
                this.torusGeometry.radOld=this._radius
            }
            this.torusMesh.visible=true
        }
    }*/



    

    // позиционируем кубы и грани
    this.repositionCube = function() {
        // 0 - 1 = depth, 0 - 4 = width, 0 - 2 = height
        //
        //   6____7
        // 2/___3/|
        // | 4__|_5
        // 0/___1/
        if(this._visiCube==true){
            if (!this.arrCube[0]) this.initCube();
            this.arrCube[0].position.set(0-this.width/2, 0-this.depth/2, 0+this.height/2);
            this.arrCube[1].position.set(0-this.width/2, 0+this.depth/2, 0+this.height/2);
            this.arrCube[2].position.set(0-this.width/2, 0-this.depth/2, 0-this.height/2);
            this.arrCube[3].position.set(0-this.width/2, 0+this.depth/2, 0-this.height/2);
            this.arrCube[4].position.set(0+this.width/2, 0-this.depth/2, 0+this.height/2);
            this.arrCube[5].position.set(0+this.width/2, 0+this.depth/2, 0+this.height/2);
            this.arrCube[6].position.set(0+this.width/2, 0-this.depth/2, 0-this.height/2);
            this.arrCube[7].position.set(0+this.width/2, 0+this.depth/2, 0-this.height/2);
        }

        this.arrEdge[9].position.set(this.width/2, 0+this.depth/2, 0);//2-0
        this.arrEdge[10].position.set(0+this.width/2, 0-this.depth/2, -0);//3-1
        this.arrEdge[2].position.set(0-this.width/2, 0-this.depth/2, 0);//7-5
        this.arrEdge[1].position.set(0-this.width/2, 0+this.depth/2, 0);//6-4
        
        this.arrEdge[8].position.set(this.width/2, this.sizeEdge/2, 0+this.height/2);//0-1
        this.arrEdge[4].position.set(this.sizeEdge/2, 0-this.depth/2, 0+this.height/2);//1-5
        this.arrEdge[0].position.set(0-this.width/2, -this.sizeEdge/2, 0+this.height/2);//5-4
        this.arrEdge[5].position.set(-this.sizeEdge/2, 0+this.depth/2, 0+this.height/2);//4-0

        this.arrEdge[11].position.set(+this.width/2, this.sizeEdge/2, 0-this.height/2);//2-3
        this.arrEdge[6].position.set(this.sizeEdge/2, 0-this.depth/2, 0-this.height/2);//3-7
        this.arrEdge[3].position.set(0-this.width/2, -this.sizeEdge/2, 0-this.height/2);//7-6
        this.arrEdge[7].position.set(-this.sizeEdge/2, 0+this.depth/2, 0-this.height/2);//6-2
    }

 

    // меняем размеры граней, 
    this.changeSize = function() {
        this.arrEdge[0].scale.y=this.depth;
        this.arrEdge[8].scale.y=this.depth;
        this.arrEdge[3].scale.y=this.depth;

        this.arrEdge[11].scale.y=this.depth;

        this.arrEdge[1].scale.z=this.height-this.sizeEdge;
        this.arrEdge[2].scale.z=this.height-this.sizeEdge;
        this.arrEdge[9].scale.z=this.height-this.sizeEdge;
        this.arrEdge[10].scale.z=this.height-this.sizeEdge;

        this.arrEdge[4].scale.x=this.width;
        this.arrEdge[5].scale.x=this.width;
        this.arrEdge[6].scale.x=this.width;
        this.arrEdge[7].scale.x=this.width;

        this.box.scale.x=this._width;
        this.box.scale.y=this._depth;
        this.box.scale.z=this._height;
        //--

    }
    // толщина граней
    this.changeSizeEdge = function() {
        this.arrEdge[4].scale.y=this._sizeEdge;
        this.arrEdge[5].scale.y=this._sizeEdge;
        this.arrEdge[6].scale.y=this._sizeEdge;
        this.arrEdge[7].scale.y=this._sizeEdge;
        this.arrEdge[4].scale.z=this._sizeEdge;
        this.arrEdge[5].scale.z=this._sizeEdge;
        this.arrEdge[6].scale.z=this._sizeEdge;
        this.arrEdge[7].scale.z=this._sizeEdge;
        this.arrEdge[1].scale.x=this._sizeEdge;
        this.arrEdge[2].scale.x=this._sizeEdge;
        this.arrEdge[9].scale.x=this._sizeEdge;
        this.arrEdge[10].scale.x=this._sizeEdge;
        this.arrEdge[1].scale.y=this._sizeEdge;
        this.arrEdge[2].scale.y=this._sizeEdge;
        this.arrEdge[9].scale.y=this._sizeEdge;
        this.arrEdge[10].scale.y=this._sizeEdge;
        this.arrEdge[0].scale.x=this._sizeEdge;
        this.arrEdge[8].scale.x=this._sizeEdge;
        this.arrEdge[3].scale.x=this._sizeEdge;
        this.arrEdge[11].scale.x=this._sizeEdge;
        this.arrEdge[0].scale.z=this._sizeEdge;
        this.arrEdge[8].scale.z=this._sizeEdge;
        this.arrEdge[3].scale.z=this._sizeEdge;
        this.arrEdge[11].scale.z=this._sizeEdge;
        this.ms.scale.set(this._sizeEdge,this._sizeEdge,this._sizeEdge)
    }


    Object.defineProperty(this, "life", {
        set: function (value) {
            if (this._life == value) return;
            this._life = value;
            /*if(event3DArr){
                
                if(this._life==1){                    
                    //event3DArr.addChild(this.box);
                    if(this.arrCube[0]!=undefined)
                    for (var i = 0; i < 8; i++) {                                    
                        if(event3DArr)event3DArr.addChild(this.arrCube[i]);            
                    }
                }else{                    
                    //event3DArr.removeChild(this.box);
                    if(this.arrCube[0]!=undefined)
                    for (var i = 0; i < 8; i++) {             
                        if(event3DArr)event3DArr.removeChild(this.arrCube[i]);            
                    }
                }

            }*/

        },
        get: function () {
            return this._life;
        }
    });
    this.life=1;





    Object.defineProperty(this, "visiCube", {
        set: function (value) {
            if (this._visiCube == value) return;
            this._visiCube = value;

            if(this.arrCube[0]==undefined)this.initCube();
            if(this._visiCube==true){
                for (var i = 0; i < this.arrCube.length; i++) {
                    this.add(this.arrCube[i]);
                }
                this.repositionCube();
            }else{
                for (var i = 0; i < this.arrCube.length; i++) {
                    this.remove(this.arrCube[i]);
                }
            }
            this.repositionCube();
        },
        get: function () {
            return this._visiCube;
        }
    });

    Object.defineProperty(this, "material", {
        set: function (value) {
            if (this._material.uuid == value.uuid) return;

            this._material = value;
            trace("#########@@@@@@",this._material)
            this.ms.material=this._material;
            for (var i = 0; i < 12; i++) {
                this.arrEdge[i].material=this._material;
            }
        },
        get: function () {
            return this._material;
        }
    }); 

    
    Object.defineProperty(this, "width", {
        set: function (value) {
            if (this._width == value) return;
            this._width = value;
           // this.box.scale.x=this._width;
             this.changeSize();
            this.repositionCube();
        },
        get: function () {
            return this._width;
        }
    });
    Object.defineProperty(this, "depth", {
        set: function (value) {
            if (this._depth == value) return;
            this._depth = value;
            //this.box.scale.y=this._depth;
            this.changeSize();
            this.repositionCube();
        },
        get: function () {
            return this._depth;
        }
    });
    Object.defineProperty(this, "height", {
        set: function (value) {
            if (this._height == value) return;
            this._height = value;
            //this.box.scale.z=this._height;
             this.changeSize();
            this.repositionCube();
        },
        get: function () {
            return this._height;
        }
    });
    Object.defineProperty(this, "sizeEdge", {// толщина граней
        set: function (value) {
            if(this._sizeEdge !=value){
                this._sizeEdge = value;

                this.changeSizeEdge();


            }
            
        },
        get: function () {
            return this._sizeEdge;
        }
    });

    Object.defineProperty(this, "activ", {// толщина граней
        set: function (value) {
            if (this._activ == value) return;
            this._activ = value;
           
            this.box.visible=value;
                  
        },
        get: function () {
            return this._activ;
        }
    });


    this.repositionCube();
    this.changeSize();
    // this.position.set(-100,-100,-100);

}
 
BoxHelper.prototype = Object.create(THREE.Object3D.prototype);
BoxHelper.prototype.constructor = BoxHelper;