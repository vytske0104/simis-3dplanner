/***
Код свободный, и может быть использован в разных проектах как разработчиком так и другими программистами. Если юзаете диписуйте себя в шапку и мои контакты не удоляйте)))
Разработчик и владелец данного кода Сидоров Евгений vorodis2.
The code is free and can be used in different projects by both the developer and other programmers. If you use write yourself in a hat and do not delete my contacts)))
Developer and owner of this code Sidorov Evgeniy vorodis2.
contacts:
site: vorodis2
mail: vorodis2@gmail.com
skype: vorodis2
phone: +380951026557 
website: vorodis2.com
*/


//Фоткает обьект
//import { Debbug3dS} from './Debbug3dS.js';
export class C3DFoto  {
    constructor() {          
        this.type="C3DFoto";
        var self=this;

        this._wh=512;
        this._boolLight=true;
        this._distans=200;
        this._distOt=0;
        this._x=0;
        this._y=0;
        this._z=-this._distans;
        this._scale=1;
       
        this._obj3d = undefined;



               

        this.scene = new THREE.Scene();
        this.renderer = new THREE.WebGLRenderer({
            antialias: true,
            alpha: true//,
           // preserveDrawingBuffer: true
        });
        this.camera = new THREE.OrthographicCamera(this._wh / -2, this._wh / 2, this._wh / 2, this._wh / -2, 0.001, this._distans);
        this.scene.add(this.camera);


        this.c3d = new THREE.Object3D();
        this.scene.add(this.c3d);
        this.c3d.rotation.x=Math.PI/2;

        this.c3d.scale.set(this._scale,this._scale,this._scale)
/*
        this.debbug3dS=new Debbug3dS();
        this.scene.add(this.debbug3dS);*/


        this.renderer.setPixelRatio(window.devicePixelRatio);
        this.renderer.setSize(this._wh, this._wh);
        this.canvas = this.renderer.domElement;
        this.renderer.localClippingEnabled = true; 

        this.ambientLight = new THREE.AmbientLight("#ffffff", 1);
        if(this.boolLight)this.scene.add(this.ambientLight);

        this.render=function(){
            this.renderer.render(this.scene, this.camera);
        }


        this.setSize = function() { // размер рендера
           

            

            const aspect = this._wh / this._wh;
            this.camera.left = - this._wh * aspect / 2;
            this.camera.right = this._wh * aspect / 2;

            this.camera.top = this._wh / 2;
            this.camera.bottom = - this._wh / 2;
            this.renderer.setSize( this._wh, this._wh );
            this.camera.updateProjectionMatrix();
            this.dragCamera();

            //renderer2.setSize( window.innerwh, window.innerwh );
        };


        this.drag=function(){
            let pp=null;
            
            if(this._obj3d){
                pp=this._obj3d.parent;
                trace("@@@",pp)
                this.c3d.add(this._obj3d)
            }
            this.render();
            //let imgData = renderer.domElement.toDataURL("image/png");
            if(pp){
                trace("@@@=====",pp)
                pp.add(this._obj3d)
            }
            for (var i = this.c3d.children.length - 1; i >= 0; i--) {
                this.c3d.remove(this.c3d.children[i])
            }           
        }
        this.getCanvas=function(){
            this.drag()
            return this.canvas;
        }
        this.getBase64=function(){
            this.drag()
            return this.renderer.domElement.toDataURL("image/png");
        }

        this.getDistance3d = function (p1, p2) {                    
            return Math.sqrt(Math.pow((p1.x - p2.x), 2) + Math.pow((p1.y - p2.y), 2)+ Math.pow((p1.z - p2.z), 2));
        };
        
        var center = new THREE.Vector3();
        var v = new THREE.Vector3();
        var v1 = new THREE.Vector3();
        var xx,yy,zz,dd,d1,ss;
        this.dragCamera=function(){
            v.x=xx=this._x;
            v.y=yy=this._y;
            v.z=zz=this._z;
            d1=this._distans+this._distOt
            if(d1==0)d1=0.0000001;
            dd=this.getDistance3d(center,v);
            ss=d1/dd
            v.x*=ss;
            v.y*=ss;
            v.z*=ss;

            this.camera.position.copy(v);
            this.camera.lookAt(center);
        }

        this.dragCamera()
        this.camera.far = 0.2;


        var wind
        this.debbug=false
        this.setDebbudCont=function(dCont,x,y,fun){
            if(wind!=undefined){
                dCont.add(wind)
                return
            }
            this.debbug=true
            var wind=new DWindow(dCont,x||0,y||0,this.type+"_Debbud")
            wind.width=200;
            var pObject=new DParamObject(wind.content,2,2,function(){          
                if(fun)fun()
            },1);
            //pObject.tipRide=true;  
            pObject.width=wind.width-4;
            pObject.addObject(this);
            wind.height=pObject.height+36;
            var dd=new DCont(wind.content)
            dd.div.appendChild(this.canvas); 
             this.canvas.style.pointerEvents = 'none';
            this.canvas.style.userSelect="none"
            dd.div.style.pointerEvents = 'none';
            dd.div.style.userSelect="none"
            dd.x=204
            dd.y=2
        }
    }



    set distans(value) {       
        if (this._distans !== value) {           
            this._distans = value;
            this.camera.far = value;
            this.camera.updateProjectionMatrix();
            this.dragCamera()            
        }
    }
    get distans() {
        return this._distans;
    }


    set distOt(value) {       
        if (this._distOt !== value) {           
            this._distOt = value;
            this.dragCamera()            
        }
    }
    get distOt() {
        return this._distOt;
    }
    set x(value) {       
        if (this._x !== value) {           
            this._x = value;
            this.dragCamera()            
        }
    }
    get x() {
        return this._x;
    }
    set y(value) {       
        if (this._y !== value) {           
            this._y = value;
            this.dragCamera()            
        }
    }
    get y() {
        return this._y;
    }
    set z(value) {       
        if (this._z !== value) {           
            this._z = value;
            this.dragCamera()            
        }
    }
    get z() {
        return this._z;
    }

    set scale(value) {       
        if (this._scale !== value) {           
            this._scale = value;
            this.c3d.scale.set(this._scale,this._scale,this._scale)           
        }
    }
    get scale() {
        return this._scale;
    }



    set obj3d(value) {       
        if (this._obj3d !== value) {           
            this._obj3d = value;
                      
        }
    }
    get obj3d() {
        return this._obj3d;
    }


    set boolLight(value) {       
        if (this._boolLight !== value) {           
            this._boolLight = value;
            if(this._boolLight==true){
                this.scene.add(this.ambientLight);
            }else{
                this.scene.remove(this.ambientLight);
            }          
        }
    }
    get boolLight() {
        return this._boolLight;
    }


    set wh(value) {       
        if (this._wh != value) {           
            this._wh = Math.round(value);
            this.setSize();           
        }
    }
    get wh() {
        return this._wh;
    }


}

