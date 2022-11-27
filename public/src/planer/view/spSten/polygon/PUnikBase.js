


export class PUnikBase  {
  	constructor(par,fun) {  		
  		this.type="PUnikBase";
        var self=this;
        this.par=par;
        this.triangulateShape = this.par.triangulateShape

       /*  this.graphics=this.par.ssPolygon2d.graphics;
        this.color=0x999999;
       this.draw2d = function () {	           
        	this.par.ssPolygon2d.stAct.draw1()
			this.graphics.clear();

            
            
            this.graphics.lineStyle( 1, 0xffffff*Math.random(), 0.5);
            this.graphics.drawRect( this.par.rectBig.x, this.par.rectBig.y, this.par.rectBig.w, this.par.rectBig.h)



			this.graphics.beginFill(this.color, 1);		
			this.graphics.lineStyle( this.par.par._sizeLine, this.par.par._colorLine_, 1);
			if(this.par.array.length!=0){
				this.graphics.moveTo(this.par.array[0].position.x,this.par.array[0].position.y);
				for (var i = 1; i < this.par.array.length; i++) {
					this.graphics.lineTo(this.par.array[i].position.x,this.par.array[i].position.y);
				}
				this.graphics.lineTo(this.par.array[0].position.x,this.par.array[0].position.y);
			}


            this.text = this.par.ssPolygon2d.text;
            this.text.text=Math.abs(Math.round(this.triangulateShape.areaShape/1000))/10+" m²";

            var xx = (this.text.text.length*this.text.style.fontSize)/2;
            var xx1 = this.text.style.fontSize;
            this.text.x = this.triangulateShape.centerShape.x - (xx/2);
            this.text.y = this.triangulateShape.centerShape.y - (xx1/2);




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
                this.arrPoint[i].z=0;
            }
        }


		this.draw1 = function () {
        	//this.draw2d();
        	this.draw3d();
		}


        

	}
}