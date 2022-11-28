
import { PubBase } from './PubBase.js';

//screed//!!!!!!!!!!!!!!!!!!!!!!!!!стяжка
export class PubScreed  extends PubBase {
  	constructor(par,fun) {  
        super(par,fun);   		
  		this.type="PubScreed";
        var self=this;
        this.par=par;

        this.par.boolRezolka=false//не будем отрезать стены

        this.triangulateShape = this.par.triangulateShape

        this.graphics=this.par.ssPolygon2d.graphics;
        this.color=0x76a3d5;

        this.text= new PIXI.Text('3',{ fontFamily : 'Montserrat' })
        this.par.content2d.addChild(this.text);

        trace("~~~~~~~~~~~PubScreed``~~")
    
        this._delph=1
/*
        var sas,sasUUID,bbbb
        this.keyG="gateauScreedPol"
        this.uuidDin="null";
        this.objDin = null;
        
                        //крыша             //перекрытия        //стяжка
        this.arrKye=[   "gateauRoofPol",    "gateauOverlapPol", "gateauScreedPol"]; 
        this.draw1Color=function(r,b){ 
                     
            if(r==this.keyG){


                if(this.par.gateauObj[this.keyG].delph==0){
                    this.mesh3d.visible=false

                    return
                }
                this.mesh3d.visible=true


                if(this.uuidDin!=this.par.gateauObj[this.keyG].uuid){
                    this.uuidDin=this.par.gateauObj[this.keyG].uuid;
                    this.objDin=this.par.gateauObj[this.keyG] 
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

                    this.par.rect.w=this.objDin.tovarFace.d3Width
                    this.par.rect.h=this.objDin.tovarFace.d3Height

                    this.graniXZ.addGateau(this.par.gateauObj[this.keyG]);  
                    this.par.dragNaTriang()
                    this.draw1()
                }
                

            }

        }*/
        /////////////////////////////////////////




        this.draw2d = function () {                
        	this.par.ssPolygon2d.stAct.draw1()
			this.graphics.clear();



            //this.graphics.lineStyle( 1, 0xffffff*Math.random(), this._alpha/2);
           // this.graphics.drawRect( this.par.rectBig.x, this.par.rectBig.y, this.par.rectBig.w, this.par.rectBig.h)

			this.graphics.beginFill(this.color, this._alpha);		
			this.graphics.lineStyle( this.par.par._sizeLine, this.par.par._colorLine_, this._alpha);
			if(this.par.array.length!=0){
				this.graphics.moveTo(this.par.array[0].position.x,this.par.array[0].position.y);
				for (var i = 1; i < this.par.array.length; i++) {
					this.graphics.lineTo(this.par.array[i].position.x,this.par.array[i].position.y);
				}
				this.graphics.lineTo(this.par.array[0].position.x,this.par.array[0].position.y);
			}

           // this.text = this.par.ssPolygon2d.text;
            this.text.text=Math.abs(Math.round(this.triangulateShape.areaShape/1000))/10+" m²";

            var xx = (this.text.text.length*this.text.style.fontSize)/2;
            var xx1 = this.text.style.fontSize;
            this.text.x = this.triangulateShape.centerShape.x - (xx/2);
            this.text.y = this.triangulateShape.centerShape.y - (xx1/2);

            this.text.alpha=this._alpha
        }
        ////////////////////////////////////////////////////

		this.kol=0
        this.arrPoint=[];
        this.draw3d = function () {	
        	if(this.par.array.length>=2){
        		this.par.ssP3d.lineSegments.visible = true;
        		this.par.ssP3d.planeXZ.clearPoint()
        		this.kolPointDrag();
        		
        		for (var i = 0; i < this.kol; i++) {                    
                    if(i!=this.kol-1){
                        this.par.ssP3d.planeXZ.addLine(this.arrPoint[i],this.arrPoint[i+1]);
                    }else{
                        this.par.ssP3d.planeXZ.addLine(this.arrPoint[i],this.arrPoint[0]);
                    }
                }
                this.par.ssP3d.planeXZ.upDate()
        	}else{
        		this.par.ssP3d.lineSegments.visible=false;
        	}
        }


		this.kolPointDrag = function () {
            this.kol=this.par.array.length;
            for (var i = 0; i < this.par.array.length; i++) {
                if(this.arrPoint[i]==undefined)this.arrPoint[i]=new THREE.Vector3();
                this.arrPoint[i].x=this.par.array[i].position.x;
                this.arrPoint[i].y=this.par.array[i].position.y;
                this.arrPoint[i].z=-this.par.height1-this.par._delph;
            }
        } 

		
        this.draw1 = function () {
            this.draw2d();

            this.par._delph=this._delph;
            this.cont3d.position.z=-this.par._height1
            this.cont3dL.position.z=-this.par._height1

            this.cont3d.visible=this.par.par._boolMax;
            this.cont3dL.visible=!this.par.par._boolMax;
            if(this.par.par._boolMax==true){                
                this.drawBig();
            }else{
                this.drawLittel();
                this.par.par.addObjFun1(this.par);
            }
        }




        this.kol=0
        this.arrPoint=[];
        this.drawLittel = function () { 
            if(this.par.array.length>=2){
                this.par.ssP3d.lineSegments.visible = true;
                this.par.ssP3d.planeXZ.clearPoint()
                this.kolPointDrag();
                
                for (var i = 0; i < this.kol; i++) {                    
                    if(i!=this.kol-1){
                        this.par.ssP3d.planeXZ.addLine(this.arrPoint[i],this.arrPoint[i+1]);
                    }else{
                        this.par.ssP3d.planeXZ.addLine(this.arrPoint[i],this.arrPoint[0]);
                    }
                }
                this.par.ssP3d.planeXZ.upDate()
            }else{
                this.par.ssP3d.lineSegments.visible=false;
            }
        }

        this.drawBig = function () { 
            this.updateMesh();
            this.updateMesh1(); 
            this.graniXZ.upData(this.par.array);
        }

   

        
	}


    set material(value) {        
        this._material= value;
        this.mesh3d.material=this._material;
    }    
    get material() { return  this._material;}

    set material1(value) {        
        this._material1= value;
        this.mesh3d1.material=this._material1;
    }    
    get material1() { return  this._material1;}


}