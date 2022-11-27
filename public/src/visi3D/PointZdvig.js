


export class PointZdvig  {
  	constructor(par) {  		
  		this.type="PointZdvig";
  		var self=this;        
        this.scale=1;
        this._active=false;	
        this.debag=false;	
        this.funD=undefined


        this.content3d=new THREE.Object3D();
        this.par=par;


        this.initDebag=function(){
        	this.axesHelper = new THREE.AxesHelper(100);
			this.par.scene.add(this.axesHelper);

			this.axPoint = new THREE.AxesHelper(50);
			this.par.scene.add(this.axPoint);

			this.axCentr = new THREE.AxesHelper(170);
			this.par.gCGG.add(this.axCentr);
			

        }

        if(this.debag)this.initDebag()

        this.vect=new THREE.Vector3()
        this.setPoint=function(v3){
        	this.vect.set(v3.x, v3.y, v3.z);
        	if(this.debag==true){
        		
        		this.axPoint.position.set(v3.x, v3.y, v3.z)
        		this.par.intRend=1
        		
        	}
        }


        var v=new THREE.Vector3()
        var v1=new THREE.Vector3()
        var v2=new THREE.Vector3()
        var a,a1,a2,d,d1,d2,s
        this.set=function(s,p,p1){
        	if(this._active==false)return
        	if(s=="rotationZ"){
        		//return
        		//горизонт Работает
        		v.x=this.vect.x;
        		v.y=this.vect.z;

        		v1.x=this.par._xVerh;
        		v1.y=this.par._zVerh;

        		a1=p-p1

        		d=this.getDistance(v,v1);
        		a=this.getAngle(v,v1);

				this.getVector(d,a+a1,v2)
				v2.x+=v.x
				v2.y+=v.y

				this.par.xVerh=v2.x;
				this.par.zVerh=v2.y;				

				/*trace("a,a1,d",a,a1,d)
				trace("v0==",v)
				trace("v1==",v1)
				trace("v2==",v2)*/
        		return
        	}

        	if(s=="rotationX"){
        		if(this.funD){
        			this.funD("clear");
        			this.funD("setka",10,1);
        			this.funD("pointXY",{x:0,y:0},2);


        		}
        		


        		
				v.x=this.vect.x;
        		v.y=this.vect.y;
        		v.z=this.vect.z;

        		trace()
        		return
        		



        		v1.x=this.par._zVerh;
        		v1.y=this.par._yVerh;

        		a1=p-p1

        		d=this.getDistance(v,v1);
        		a=this.getAngle(v,v1);

				this.getVector(d,a+a1,v2)
				v2.x+=v.x
				v2.y+=v.y

				this.par.zVerh=v2.x;
				this.par.yVerh=v2.y;				

				trace("a,a1,d",a,a1,d)
				trace("v0==",v)
				trace("v1==",v1)
				trace("v2==",v2)
        		return
        	}

        	if(s=="zume"){
        		/*s=p/p1; 


        		v1.x=this.par._xVerh-this.vect.x;
        		v1.y=this.par._yVerh-this.vect.y;
        		v1.z=this.par._zVerh-this.vect.z;

        		v1.x*=s;
        		v1.y*=s;
        		v1.z*=s;

        		this.par.xVerh=this.vect.x+v1.x;
        		this.par.yVerh=this.vect.y+v1.y;
        		this.par.zVerh=this.vect.z+v1.z;

        		*/
	        }
        	
        }

        this.getDistance3d = function (p1, p2) {					
			return Math.sqrt(Math.pow((p1.x - p2.x), 2) + Math.pow((p1.y - p2.y), 2)+ Math.pow((p1.z - p2.z), 2));
		};

        this.getDistance = function (p1, p2) {			
			return Math.sqrt(Math.pow((p1.x - p2.x), 2) + Math.pow((p1.y - p2.y), 2));
		};
		this.getAngle = function (a, b) {			
			return Math.atan2(b.y - a.y, b.x - a.x);
		};
		this.getVector = function (length, angle, point) {			
			point.x = Math.abs(length) * Math.cos(angle);
			point.y = Math.abs(length) * Math.sin(angle);
			return point;
		};

        

        this.dragE3d=function(s,e3d){
        	trace("ss",s,e3d)
        	if(s=="down"){}else return
        		
        	if(e3d!=null){
        		if(e3d.point!=null){

        			trace("ss",s,e3d.point)
        			self.setPoint(e3d.point)
        		}
        	}
        } 

        this.dragActiv = function(){

        	if(this._active==true){
        		

        		this.par.event3DArr.dragE3d=this.dragE3d
        		
        	}else{
        		this.par.event3DArr.dragE3d=undefined
        	}
        }

    }

    set active(value) {        
        if(this._active!=value){
            this._active= value;                   
            this.dragActiv()
        }
    }    
    get active() { return  this._active;}
}


