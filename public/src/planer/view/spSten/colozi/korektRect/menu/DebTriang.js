//import { MStyle} from './MStyle.js';
//import { DWStenColiz} from './Debag/DWStenColiz.js';
import { SpDebugPixi } from './SpDebugPixi.js';//пикси отрисовка
import { KorektRect } from '../colozi/korektRect/KorektRect.js';//пикси отрисовка
import { VisiPixi } from '../libMy/VisiPixi.js';

import {  GronTriangle } from './GronTriangle.js';

export class DebTriang  {
    constructor(par, fun) {
        this.type="DebTriang";
		var self=this;
		this.par=par
		this.fun=fun

		
		this.dC=par.dCont;
        this._active = false;





        this.dCont=new DCont(this.dC);

        var col=0xff0000
        var col1=0x00ff00
        var col2=0x0000ff
        var dp
        var gt=undefined
        var ww=800
        var hh=400
        self.visiPixi
        var oSave
        this.cont3d=new THREE.Object3D();
        this.cont3d.visible=this._active



        this.init=function(sss){
            if(this.window!=undefined)return;
            this.window=new DWindow(this.dCont,0,0,"xz");
            this.window.width=ww
            this.window.height=hh


           
            this.content2d = new PIXI.Container();
         

            this.debugPixi = new SpDebugPixi();
            this.content2d.addChild(this.debugPixi.content2d);

            dp=this.debugPixi
            self.visiPixi=new VisiPixi(); 
            self.visiPixi.content2d.addChild(self.content2d);
            this.window.content.div.appendChild(self.visiPixi.div);

            self.visiPixi.sizeWindow(this.window.width,this.window.height)
            
            gt=new GronTriangle();

            if(sss!=undefined){
                oSave=JSON.parse(sss)
              
                gt.t=oSave.tr
                gt.t1=oSave.tr1
            }

            setTimeout(function() {self.init2()}, 1000);
        }
        var win
        this.plXZ
        this.plXZ1
        this.init2=function(){ 
            if(win!=undefined)return
            win=new DWindow(this.window,2,100,"triang");
            win.width=222
            var yy=2
            for (var i = 0; i < gt.t.length; i++) {
                var pObject=new DParamObject(win.content,2,yy,function(s){                   
                    self.drag()
                },1);
                pObject.width= win.width-4;
                pObject.tipRide=true
                pObject.addObject(gt.t[i])
                yy+=pObject.height
            }

            win=new DWindow(this.window,224,100,"triang1");
            win.width=222
            var yy=2
            for (var i = 0; i < gt.t1.length; i++) {
                var pObject=new DParamObject(win.content,2,yy,function(s){                   
                    self.drag()
                },1);
                pObject.width= win.width-4;
                pObject.tipRide=true
                pObject.addObject(gt.t1[i])
                yy+=pObject.height
            }


            new DButton(win.content,300,34,"test1",function(){
                
                var jsonArr='{"tr":[{"x":240.00000000000003,"y":-390,"z":-278.25},{"x":210.00000000000003,"y":-390,"z":-278.25},{"x":210.00000000000003,"y":-390,"z":0}],"tr1":[{"x":100,"y":-700,"z":-300},{"x":440,"y":-460,"z":-159},{"x":-30,"y":0,"z":-300}]}'




                oSave=JSON.parse(jsonArr)
                
                gt.t=oSave.tr
                gt.t1=oSave.tr1
                self.drag()

               //pObject.addObject(gt.t1[i])
                //pObject.addObject(gt.t[i])

            })

            new DButton(win.content,300,74,"test2",function(){
                
                var jsonArr='{"tr":[{"x":240.00000000000003,"y":-390,"z":-278.25},{"x":210.00000000000003,"y":-390,"z":-278.25},{"x":210.00000000000003,"y":-390,"z":0}],"tr1":[{"x":-220,"y":-570,"z":-300},{"x":530,"y":-390,"z":-159},{"x":-220,"y":70,"z":-300}]}'

                oSave=JSON.parse(jsonArr)
               
                gt.t=oSave.tr
                gt.t1=oSave.tr1
                self.drag()
            })    


            
            this.par.visi3D.groupObject.add(this.cont3d); 



            this.lineBasicMaterial = new THREE.LineBasicMaterial( { color:col, linewidth: 10});
            this.plXZ=new PlaneXZ();
            this.lineSegments = new THREE.LineSegments(
                this.plXZ,
                this.lineBasicMaterial
            )
            this.cont3d.add(this.lineSegments);

            this.lineBasicMaterial1 = new THREE.LineBasicMaterial( { color: col1, linewidth: 10});
            this.plXZ1=new PlaneXZ();
            this.lineSegments1 = new THREE.LineSegments(
                this.plXZ1,
                this.lineBasicMaterial1
            )
            this.cont3d.add(this.lineSegments1);

             this.lineBasicMaterial2 = new THREE.LineBasicMaterial( { color: col2, linewidth: 10});
            this.plXZ2=new PlaneXZ();
            this.lineSegments2 = new THREE.LineSegments(
                this.plXZ2,
                this.lineBasicMaterial2
            )
            this.cont3d.add(this.lineSegments2);
           // this.par.visi3D.zume=100 
           // this.par.visi3D.rotationX=0;//-1.56
           // this.par.visi3D.rotationZ=0;

                
            this.mesh=[]
            for (let index = 0; index < 6; index++) {
                this.mesh[index] = new THREE.Mesh(new THREE.SphereBufferGeometry( 0.2, 32, 32 ))
                this.cont3d.add(this.mesh[index]);
            }
            this.drag()
        }




        this.drag=function(){
            this.saveTime()

            this.plXZ.clear();
            this.plXZ.addLine(gt.t[0],gt.t[1]);
            this.plXZ.addLine(gt.t[1],gt.t[2]);
            this.plXZ.addLine(gt.t[2],gt.t[0]); 
            this.plXZ.upDate()

            this.plXZ1.clear();
            this.plXZ1.addLine(gt.t1[0],gt.t1[1]);
            this.plXZ1.addLine(gt.t1[1],gt.t1[2]);
            this.plXZ1.addLine(gt.t1[2],gt.t1[0]);
            this.plXZ1.upDate();

            this.par.visi3D.intRend=1;

            //gt.upDate();


            let r=gt.setT();
            this.plXZ2.clear();
            if(r!=null){
                this.plXZ2.addLine(r[0],r[1]);
                
                this.plXZ2.upDate();
                this.mesh[0].scale.set(20,20,20)
                this.mesh[0].position.set(r[0].x,r[0].y,r[0].z);
                this.mesh[1].scale.set(20,20,20)
                this.mesh[1].position.set(r[1].x,r[1].y,r[1].z);
               
            }else{
                this.mesh[0].scale.set(2,2,2)
                this.mesh[1].scale.set(2,2,2)
            }

         
            

/*

            this.plXZ1.addLine(gt.point,gt.point1);
            this.plXZ1.upDate();

            this.mesh[0].position.set(gt.tri[0][0],gt.tri[0][1],gt.tri[0][2]);
            this.mesh[1].position.set(gt.tri[1][0],gt.tri[1][1],gt.tri[1][2]);
            this.mesh[2].position.set(gt.tri[2][0],gt.tri[2][1],gt.tri[2][2]);
            this.mesh[3].scale.set(0.2,0.2,0.2)
            this.mesh[3].position.set(gt.pt.x, gt.pt.y, gt.pt.z);
            this.mesh[4].position.set(gt.pt.x+gt.dir.x,   gt.pt.y+gt.dir.y,   gt.pt.z+gt.dir.z);


            if(gt.out == null){
                this.mesh[5].scale.set(0.2,0.2,0.2)
            }else{
                this.mesh[5].scale.set(2,2,2)
                this.mesh[5].position.set(gt.out[0], gt.out[1], gt.out[2]);
            }

            
            
            dp.clear();

            dp.dLineParam(0,100,ww,100,0,0.5);
            dp.dLineParam(0,300,ww,300,0,0.5);
            dp.dLineParam(100,0,100,hh,0,0.5);
            dp.dLineParam(300,0,300,hh,0,0.5);


            this.dragXY(100,300,gt.t[0],gt.t[1],"x","y",col,"A0")            
            this.dragXY(100,300,gt.t[1],gt.t[2],"x","y",col,"B1") 
            this.dragXY(100,300,gt.t[2],gt.t[0],"x","y",col,"C2") 




            this.dragXY(100,300,gt.t1[0],gt.t1[1],"x","y",col1,"E0")
           // this.dragXY(100,300,gt.t1[0],gt.t1[1],"x","z",col1,"E0")
            this.dragXY(100,300,gt.t1[1],gt.t1[2],"x","y",col1,"D1")
            this.dragXY(100,300,gt.t1[2],gt.t1[0],"x","y",col1,"K2")


            this.dragXY(100,100,gt.t[0],gt.t[1],"x","z",col,"A0")
            this.dragXY(100,100,gt.t[1],gt.t[2],"x","z",col,"B1")
            this.dragXY(100,100,gt.t[2],gt.t[0],"x","z",col,"C2")


            this.dragXY(100,100,gt.t1[0],gt.t1[1],"x","z",col1,"E0")
            this.dragXY(100,100,gt.t1[1],gt.t1[2],"x","z",col1,"D1")
            this.dragXY(100,100,gt.t1[2],gt.t1[0],"x","z",col1,"K2") 

            //dp.dPointParam(gt.point.x+100,gt.point.y+300,1,0x0000ff,1)
            //dp.dPointParam(gt.point1.x+100,gt.point1.y+300,1,0x0077ff,1)

            
*/
            self.visiPixi.render();
            
            

        }

        this.dragXY=function(x,y,p,p1,z,z1,c,t){
            dp.dLineParam(x+p[z], y+p[z1], x+p1[z], y+p1[z1],c,1);
            if(t){
                dp.dText({x:x+p[z], y:y+p[z1]+10},t,col,0.5); 
                 
            }
        }



        this.save1=function(){               
            fun("saveLocal")      
        } 
        this.sah=0;
        this.saveTime=function(){
            this.sah++;
            var s=this.sah;
            setTimeout(function() {
                if(self.sah==s)self.save1()
            }, 500);
        } 

        this.setObjLoc=function(o){             
            if(gt)if(oSave==undefined)gt.setObj(o)

            this.init2()    
        }
        this.getObjLoc=function(o){          
            return gt.getObj(o)
        }

    }

    set active(value) {
        if(this._active!=value){
            if(this.par.visi3D)this.par.visi3D.intRend=1   
            this._active = value;
            this.window.visible = this.active
            this.cont3d.visible = this.active
            this.init()
            
        }       
    }   
    get active() { return  this._active;} 

    set width(value) { 
        if(this._width!=value){
            this._width=value;
            //this.pan.width=value
            //this.slider.value = value;
            this.visiPixi.sizeWindow(this._width,this._height)
           this.funxz();
        }
    }   
    get width() { return  this._width}

    set height(value) { 
        if(this._height!=value){
            this._height=value;
            //this.pan.height=value
            //this.slider1.value = value;
            this.visiPixi.sizeWindow(this._width,this._height)
            this.funxz();
        }
    }   
    get height() { return  this._height}
}





export class PlXZ extends THREE.BufferGeometry {

    constructor( ) {

        super();

        var vertices = [];
        this.upNull=function(){
            
            var wh=1000;
            vertices.push(-wh,-wh,0);
            vertices.push(-wh,-wh,0);
            vertices.push(-wh, wh,0);

            vertices.push(-wh,-wh,0);
            vertices.push(-wh,-wh,0);
            vertices.push(wh,-wh,0);

            vertices.push(wh,-wh,0);
            vertices.push(wh,wh,0);
            vertices.push(wh,wh,0);

            vertices.push(-wh,wh,0);
            vertices.push(-wh,wh,0);
            vertices.push(wh,wh,0); 
            this.setAttribute( 'position', new THREE.Float32BufferAttribute( vertices, 3 ) );
        }

        this.upNull();

        /*

        this.clearPoint=function(){
            this.array.length=0;
        }

        this.array=[]
        this.addLine=function(p,p1){
            this.array.push(p,p1)
          
            
        }

        
        this.upDate=function(){
            if(this.array.length==0){
                this.upNull();
            }
            vertices.length=0;
         
            for (var i = 0; i < this.array.length; i+=2) {                
                
                
               
                vertices.push(this.array[i].x,this.array[i].y,this.array[i].z);

                vertices.push(this.array[i+1].x,this.array[i+1].y,this.array[i+1].z);
                 vertices.push(this.array[i].x,this.array[i].y,this.array[i].z);
            }

            this.setAttribute( 'position', new THREE.Float32BufferAttribute( vertices, 3 ) );
        } */   

    }

}
export class PlaneXZ extends THREE.BufferGeometry {

    constructor( ) {

        super();

        // var indices = [];
        var vertices = [];
        this.upNull=function(){
            
            var wh=0.5;
            vertices.push(-wh,-wh,0);
            vertices.push(-wh,-wh,0);
            vertices.push(-wh, wh,0);

            vertices.push(-wh,-wh,0);
            vertices.push(-wh,-wh,0);
            vertices.push(wh,-wh,0);

            vertices.push(wh,-wh,0);
            vertices.push(wh,wh,0);
            vertices.push(wh,wh,0);

            vertices.push(-wh,wh,0);
            vertices.push(-wh,wh,0);
            vertices.push(wh,wh,0); 
            this.setAttribute( 'position', new THREE.Float32BufferAttribute( vertices, 3 ) );

           /* this.computeBoundingBox();
            this.computeBoundingSphere();
            this.computeVertexNormals();*/
        }

        this.upNull();

        this.clearPoint=function(){
            this.array.length=0;
        }

        this.array=[]
        this.addLine=function(p,p1){
            this.array.push(p,p1)
        }

        this.clear=function(p){
            this.array.length=0;
            vertices.length=0;
            normal.length=0;
            uv.length=0;
        }

        this.addTri=function(p,p1,p2, n,n1,n2,u,u1){           
            vertices.push(p.x,p.y,p.z);
            vertices.push(p1.x,p1.y,p1.z);
            vertices.push(p2.x,p2.y,p2.z);

            if(n){
                normal.push(n.x,n.y,n.z);
                normal.push(n1.x,n1.y,n1.z);
                normal.push(n2.x,n2.y,n2.z);

                uv.push(u.x,u.y);
                uv.push(u1.x,u1.y);
            }
        }


        var uv = [];
        var normal = [];
        var w,h
        this.redrag=function(bNirm){
            if(bNirm==undefined){
                this.setAttribute( 'position', new THREE.Float32BufferAttribute( vertices, 3 ) );
            }else{               
                this.setAttribute( 'position', new THREE.Float32BufferAttribute( vertices, 3 ) );
                this.computeBoundingBox();
                this.computeBoundingSphere();

                if(uv.length==0){
                    w=this.boundingBox.max.x-this.boundingBox.min.x;
                    h=this.boundingBox.max.y-this.boundingBox.min.y;                   
                    for (var i = 0; i < vertices.length; i+=3) {
                        normal.push(bNirm.x,bNirm.y,bNirm.z);
                        uv.push(
                            (vertices[i]-this.boundingBox.min.x)/w,
                            (vertices[i+1]-this.boundingBox.min.y)/h
                        )
                    }
                    this.setAttribute( 'normal', new THREE.Float32BufferAttribute( normal, 3 ) ); 
                    this.setAttribute( 'uv', new THREE.Float32BufferAttribute( uv, 2 ) ); 
                }else{
                    this.setAttribute( 'normal', new THREE.Float32BufferAttribute( normal, 3 ) ); 
                    this.setAttribute( 'uv', new THREE.Float32BufferAttribute( uv, 2 ) ); 
                }
                        
                
            }
            
           /* this.computeBoundingBox();
            this.computeBoundingSphere();
            this.computeVertexNormals();*/
        }


        this.redrag1=function(){
            this.setAttribute( 'position', new THREE.Float32BufferAttribute( vertices, 3 ) );   

           /*if(bNirm==undefined){
                this.setAttribute( 'position', new THREE.Float32BufferAttribute( vertices, 3 ) );
            }else{               
                this.setAttribute( 'position', new THREE.Float32BufferAttribute( vertices, 3 ) );
                this.computeBoundingBox();
                this.computeBoundingSphere();

                w=this.boundingBox.max.x-this.boundingBox.min.x;
                h=this.boundingBox.max.y-this.boundingBox.min.y;
                uv.length=0;
                normal.length=0;
                for (var i = 0; i < vertices.length; i+=3) {
                    normal.push(bNirm.x,bNirm.y,bNirm.z);
                    // uv.push(
                    //     (vertices[i]-this.boundingBox.min.x)/w,
                    //     (vertices[i+1]-this.boundingBox.min.y)/h
                    // )
                }
                this.setAttribute( 'normal', new THREE.Float32BufferAttribute( normal, 3 ) ); 
                this.setAttribute( 'uv', new THREE.Float32BufferAttribute( uv, 2 ) );         
            }*/
        }

        
        this.upDate=function(){
            if(this.array.length==0){
                this.upNull();
            }
            vertices.length=0;
      
            for (var i = 0; i < this.array.length; i+=2) {                
                
                
               
                vertices.push(this.array[i].x,this.array[i].y,this.array[i].z);
                vertices.push(this.array[i+1].x,this.array[i+1].y,this.array[i+1].z);
                //vertices.push(this.array[i].x,this.array[i].y,this.array[i].z);
                
                
                // indices.push(i+1, i+1, i);
            }

            // var rr=1
            // for (var i = 0; i < vertices.length; i+=9) { 
            //     indices.push((i+0)*rr,(i+1)*rr,(i+2)*rr);
            // } 
            // indices=[0*rr,1*rr,2*rr,3*rr,4*rr,5*rr]   

            // //this.setIndex( indices );
            

            this.setAttribute( 'position', new THREE.Float32BufferAttribute( vertices, 3 ) );

        }    

    }

}
