

import { PubBase } from './PubBase.js';

//!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!overlap//перекрытия
export class PubOverlap extends PubBase {
  	constructor(par,fun) {
        super(par,fun);   		
  		this.type="PubOverlap";
        var self=this;
        this.par=par;

        this.par.boolRezolka=false//не будем отрезать стены

        this.triangulateShape = this.par.triangulateShape

        //this.graphics=this.par.ssPolygon2d.graphics;
        
        this._boolT=false;
        this._boolAree=false;
        this._text="";

        /////////////////////////////////////////
        this._delph=1

       /* this.colorT=new THREE.Color()
        this.convertC=function(c,a){
            this.colorT.set(c)
            if(a!=undefined){
                this.colorT.r*=a[0]
                this.colorT.g*=a[1]
                this.colorT.b*=a[2]
            }       
            return this.colorT.getHex();
        }*/

        

        /*this._color="#86d1d8";
        this.col=0x86d1d8;
        this.graniXZ.boolZ=false*/
       

        
       /* var sas,sasUUID,bbbb
        this.keyG="gateauOverlapPol"
        this.uuidDin="null";
        this.objDin = null;
        //overlap
                        //крыша             //перекрытия        //стяжка
        this.arrKye=[   "gateauRoofPol",    "gateauOverlapPol", "gateauScreedPol"]; 
        this.draw1Color=function(r,b){           
            if(r==this.keyG){

                if(this.uuidDin!=this.par.gateauObj[this.keyG].uuid){

                    this.uuidDin=this.par.gateauObj[this.keyG].uuid;
                    this.objDin = this.par.gateauObj[this.keyG]                 
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








      /*  this.cont2dText = new PIXI.Container();
        this.par.content2d.addChild(this.cont2dText)



        this.compText1= new PIXI.Text('3',{ fontFamily : 'Montserrat' })
        this.cont2dText.addChild(this.compText1);
        this.compText1.y=32


        this.compText2= new PIXI.Text('3',{ fontFamily : 'Montserrat' })
        this.cont2dText.addChild(this.compText2);
        this.compText2.y=10*/




       /* this.draw2d = function () {           
        	this.par.ssPolygon2d.stAct.draw1()
			this.graphics.clear();



           // this.graphics.lineStyle( 1, 0xffffff*Math.random(), this._alpha/2);
            //this.graphics.drawRect( this.par.rectBig.x, this.par.rectBig.y, this.par.rectBig.w, this.par.rectBig.h);


            


			this.graphics.beginFill(this.col, this._alpha);		
			this.graphics.lineStyle( this.par.par._sizeLine, this.par.par._colorLine_, this._alpha);
			if(this.par.array.length!=0){
				this.graphics.moveTo(this.par.array[0].position.x,this.par.array[0].position.y);
				for (var i = 1; i < this.par.array.length; i++) {
					this.graphics.lineTo(this.par.array[i].position.x,this.par.array[i].position.y);
				}
				this.graphics.lineTo(this.par.array[0].position.x,this.par.array[0].position.y);
			}



           

            this.cont2dText.x = this.triangulateShape.centerShape1.x //- (xx/2);
            this.cont2dText.y = this.triangulateShape.centerShape1.y //- (xx1/2);

           if(this._text==""){
                this.compText1.visible=false
            }else{
                this.compText1.visible=true

            }

            if(this._boolT==false){
                this.compText2.visible=false;
            }else{
                this.compText2.visible=true;
                this.compText2.text=Math.abs(Math.round(this.triangulateShape.areaShape/1000))/10+" m²";
                this.dragText()
            }
           



            //this.text = this.par.ssPolygon2d.text;
            //this.text.text=Math.abs(Math.round(this.triangulateShape.areaShape/1000))/10+" m²";

            //var xx = (this.text.text.length*this.text.style.fontSize)/2;
            //var xx1 = this.text.style.fontSize;
            //this.text.x = this.triangulateShape.centerShape.x - (xx/2);
            //this.text.y = this.triangulateShape.centerShape.y - (xx1/2);
        }*/

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
                this.arrPoint[i].z=0//-this.par.height1//-this.par._delph;
            }
        } 





		this.draw1 = function () {
        	//this.draw2d();
        	this.draw3d();

            this.par._delph=this._delph//this.par._height1
            //this.cont3d.position.z=this._zdvigZ
            //this.cont3dL.position.z=this._zdvigZ 
            if(this._idPosit==0){
                this.cont3d.position.z=this._delph-this._zdvigZ
                this.cont3dL.position.z=this._zdvigZ
            }
            if(this._idPosit==1){
                this.cont3d.position.z=this._zdvigZ
                this.cont3dL.position.z=this._zdvigZ
            }
            if(this._idPosit==2){
                this.cont3d.position.z=-this._zdvigZ
                this.cont3dL.position.z=-this._zdvigZ
            }
            if(this._idPosit==3){
                this.cont3d.position.z=this._delph-this._zdvigZ
                this.cont3dL.position.z=-this._zdvigZ
            }


            this.cont3d.visible=this.par.par._boolMax;
            this.cont3dL.visible=!this.par.par._boolMax;
            if(this.par.par._boolMax==true){                
                this.drawBig();
            }else{
                this.drawLittel();
                this.par.par.addObjFun1(this.par);
            }
            //visi3D.objShadow(this.cont3d)
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




        this.dragText=function(){          
            setTimeout(function() {
                self.compText1.x=-self.compText1.width/2
                self.compText2.x=-self.compText2.width/2
            }, 10);
        }
      
        this.postClear = function () {
            this._boolT=false;
            this._boolAree=false;
            this._text="";
            this._color="#86d1d8";
           
        }

        this.posGetObj=function(o){
          
     
            o.color=this._color
            o.boolT=this._boolT
            o.boolAree=this._boolAree
            o.text=this._text

           
        }

        this.posSetObj=function(o){
            if(o.text)this.text=o.text
            if(o.color)this.color=o.color
            if(o.boolT)this.boolT=o.boolT
            if(o.boolAree)this.boolAree=o.boolAree
        }
	}

    set material(value) {        
        this._material= value;
        //this.mesh3d.material=this._material;
    }    
    get material() { return  this._material;}


    set material1(value) {        
        this._material1= value;
        //this.mesh3d1.material=this._material1;
    }    
    get material1() { return  this._material1;}  

    set color(value) {        
        this._color= value;
       
    }    
    get color() { return  this._color;}  


    set text(value) {        
        this._text= value;   
        this.compText1.text=value; 
        this.compText1.x=-this.compText1.width/2
        this.dragText()    

    }    
    get text() { return  this._text;}   

    set boolT(value) {        
        this._boolT= value;        
    }    
    get boolT() { return  this._boolT;}   

    set boolAree(value) {        
        this._boolAree= value;        
    }    
    get boolAree() { return  this._boolAree;}  

}