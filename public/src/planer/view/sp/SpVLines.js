


export function SpVLines (obj) {
	var self = this;
	this.type = 'SpVLines';

	this.par=obj

	this.ractLocal={x:0,y:0,x1:0,y1:0,w:0,h:0};

	this.array=[];

	var gron	
	this.add = function (p,p1) {
		gron=new GronVL(this)
		gron.idArr=this.array.length
		gron.os=this.array.length
		if(p)gron.p.setPoint(p)
		if(p1)gron.p1.setPoint(p1)	
		this.array.push(gron);	
	}


	



	this.object	
	this.setObject=function(object){
		this.object=object;
		if(this.object.tipe=="Splice"){			
			for (var i = 0; i < 3; i++) this.add();
		}
	}



	this.upDate=function(){
		
		if(this.object.tipe=="Splice"){

			this.array[0].setPoisit(0,0);
			this.array[0].setPoisit1(this.object._distans,0);
			this.array[0].corectLocel(this.object.position, this.object._rotation)

			this.array[1].setPoisit(-this.object.arrPosit[0].x,this.object.arrPosit[0].y);
			this.array[1].setPoisit1(this.object.arrPosit1[5].x+this.object._distans,this.object.arrPosit1[5].y);
			this.array[1].corectLocel(this.object.position, this.object._rotation)

			this.array[2].setPoisit(-this.object.arrPosit[5].x,this.object.arrPosit[5].y);
			this.array[2].setPoisit1(this.object.arrPosit1[0].x+this.object._distans,this.object.arrPosit1[0].y);
			this.array[2].corectLocel(this.object.position, this.object._rotation)
		}
		this.ractLocal.x=this.ractLocal.y=999999999;
		this.ractLocal.x1=this.ractLocal.y1=-999999999;

		for (var i = 0; i < this.array.length; i++){
			this.array[i].setMinMax(this.ractLocal)		
		}
		this.ractLocal.w=this.ractLocal.x1-this.ractLocal.x
		this.ractLocal.h=this.ractLocal.y1-this.ractLocal.y

	}
	this.drawDebug=function(g){
		if(!g)return

		
		for (var i = 0; i < this.array.length; i++) {			
			g.lineStyle(1, 0xffffff*Math.random(), 0.5);
			g.moveTo(this.array[i].pLoacel.x,this.array[i].pLoacel.y);
			g.lineTo(this.array[i].pLoacel1.x,this.array[i].pLoacel1.y);
		}

		g.moveTo(this.ractLocal.x,this.ractLocal.y);
		g.lineTo(this.ractLocal.x1,this.ractLocal.y);
		g.lineTo(this.ractLocal.x1,this.ractLocal.y1);
		g.lineTo(this.ractLocal.x,this.ractLocal.y1);
		g.lineTo(this.ractLocal.x,this.ractLocal.y);
	}



	var ePL={
		x:0,
		y:0,
		dist:0,
		os:0,
		pros:0,
		target:this,

		bUU:null,
		bST:0
	}

	var ddd,ddd1,ddd2,dd,vv
	var rr,rr1
	var rr2 = new THREE.Vector3(0, 0, 0);
	var rrCent = new THREE.Vector3(0, 0, 0);

	var reWind, deistPlus	

	this.getPL=function(point,dist){

		ePL.dist=9999999999	
		ePL.bUU=null;
		if(this.ractLocal.x-dist<point.x&&this.ractLocal.x1+dist>point.x){
			if(this.ractLocal.y-dist<point.y&&this.ractLocal.y1+dist>point.y){

				//console.warn("EE",this.par.idArr,point,dist,this.array)

				for (var i = 0; i < this.array.length; i++) {
					



					rr=this.isPointInLin(this.array[i].pLoacel,this.array[i].pLoacel1,point,dist,dist)
					if(rr!=null){

						


						rr2.x=rr.x;
						rr2.y=rr.y;
						rrCent.x=(this.array[i].pLoacel.x+this.array[i].pLoacel1.x)/2
						rrCent.y=(this.array[i].pLoacel.y+this.array[i].pLoacel1.y)/2

						ddd=this.getDistance(rr2,this.array[i].pLoacel)
						ddd1=this.getDistance(rr2,this.array[i].pLoacel1)
						ddd2=this.getDistance(rr2,rrCent)

						if(ddd<=dist){
							rr2.x=this.array[i].pLoacel.x;
							rr2.y=this.array[i].pLoacel.y;
						}
						if(ddd1<=dist){
							rr2.x=this.array[i].pLoacel1.x;
							rr2.y=this.array[i].pLoacel1.y;
						}
						if(ddd2<=dist){
							rr2.x=rrCent.x;
							rr2.y=rrCent.y;
						}




						
						
						dd=this.getDistance(point,rr2);	


						if(ePL.dist>dd){
							ddd=this.getProsent3Point(this.array[i].pLoacel,this.array[i].pLoacel1,rr2);
							ePL.x=rr2.x;
							ePL.y=rr2.y;
							ePL.dist=dd;
							ePL.os=i;
							ePL.pros=ddd;
							ePL.uuid=this.array[i].uuid
							ePL.targetGron=this.array[i]
						}


					}
				}			
			}			
		}




		if(ePL.dist!=9999999999){
			if(ePL.pros==0 || ePL.pros==1){
				
			}else{
				reWind=this.object.windows.getPL(ePL)
				if(reWind)if(reWind.dist<dist){
					deistPlus=0
					if(ePL.os==1)deistPlus=this.par.arrPosit[0].x;
					if(ePL.os==2)deistPlus=this.par.arrPosit[5].x;

					calc.getVector(reWind.fds+deistPlus, this.array[ePL.os].angle, ePL)	    			
	    			ePL.x+=this.array[ePL.os].pLoacel.x;
	    			ePL.y+=this.array[ePL.os].pLoacel.y;

	    			ePL.bUU=reWind.target.uuid;
	    			ePL.bST=reWind.t;

									
				}				
			}
			
			return ePL;
		}
		return null
	}




	this.getGronVP = function(uuid){
		
    	for (var i = 0; i < this.array.length; i++) {
    		if(this.array[i].uuid==uuid)return this.array[i];
    	}
    	return null
    }





	//поподает ли отрезки друг на друга
    this.testLine=function(ps,pf,ps1,pf1){            
        if(ps1>=ps &&ps1<=pf)return true;
        if(ps>=ps1 &&ps<=pf1)return true;
        return false;
    }


	this.getAngle = function (a, b) {
		b = b || rezNull;
		a = a || rezNull;
		return Math.atan2(b.y - a.y, b.x - a.x);
	};

	this.getDistance = function (p1, p2) {
		if (p1 == undefined) {
			return 0;
		}
		if (p2 == undefined) {
			p2 = rezNull;
		}
		p2 = p2 || rezNull;
		return Math.sqrt(Math.pow((p1.x - p2.x), 2) + Math.pow((p1.y - p2.y), 2));
	};

	this.getVector = function (length, angle, point) {
		if (point == undefined) var point = new THREE.Vector2(0, 0);
		if (length < 0) angle += Math.PI;
		point.x = Math.abs(length) * Math.cos(angle);
		point.y = Math.abs(length) * Math.sin(angle);
		return point;
	};
	//угол с 3х точек
	this.getTreeAngel = function (p, p1, p2, bool) {
		a = this.getAngle(p1, p);
		a1 = this.getAngle(p1, p2);
		d = this.getDistance(p1, p2);
		d1 = this.getDistance(p, p1);
		this.getVector(d, a1 - a, rez2);
		a1 = this.getAngle(rezNull, rez2);
		if (bool == undefined) return a1;
		if (a1 > 0) return a1;

		return Math.PI * 2 + a1;
	};

	// от угла и длины получаем вектор точки
	this.isPointInLin = function (p1, p2, pTest, dist, otstup) {
		this.getTreeAngel(p1, p2, pTest);
		if (otstup < 0) { if (Math.abs(otstup) * 2 > d1) return null; }
		
		if (rez2.x <= d1 + otstup) {
			if (rez2.x >= -otstup) {
				if (Math.abs(rez2.y) <= dist) {
					if (rez2.x < 0) {
						rez3 = this.getVector(rez2.x, a - Math.PI);
					} else rez3 = this.getVector(rez2.x, a);

					rez3.x += p2.x;
					rez3.y += p2.y;
					rez3.z = rez2.y;
					return rez3;
				}
			}
		}


		return null;
	};
	// Возврощаеться процент точка между двумя точками
	this.getProsent3Point = function (p, p1, pTest) {
		da = this.getDistance(p, p1);
		db = this.getDistance(p, pTest);
		return db / da;
	};
	var a,d,a1,d1,db,da
	var rez1 = new THREE.Vector3(0, 0, 0);
	var rez2 = new THREE.Vector3(0, 0, 0);
	var rez3 = new THREE.Vector3(0, 0, 0);
	var rez4 = new THREE.Vector3(0, 0, 0);
	var rezNull = new THREE.Vector3(0, 0, 0);

	this.generateRendom =  function (n){
		if(n==undefined)n=2;		
		let s='';
		let s1='';
		let d0;
		for (var i = 0; i < n; i++) {			
			d0=Math.random() * 0xffffffff | 0;
			s1=(d0 & 0xff).toString(16) + (d0 >> 8 & 0xff).toString(16)+ (d0 >> 16 & 0xff).toString(16)+ (d0 >> 24 & 0xff).toString(16)			
			if(s1.length<8){
				for (var j = 0; j < 8-s1.length+1; j++) {
					s1+="Z";
				}
			}
			s+= s1 
			if(i!=n-1)s+="-";
		}		
		return s
	}


	this.setObject(obj);
	var _o;
	this.clear=function(){
		
		for (var i = 0; i < this.array.length; i++) {
		
			for (var j = 0; j < this.array[i].array.length; j++) {
				_o=this.array[i].array[j].obj
				
				_o.clear()
			}
			this.array[i].array.length=0
		}

	}

	this.setObj =  function (o){
		for (var i = 0; i < o.array.length; i++) {			
			if(this.array[i])this.array[i].setObj(o.array[i])
		}
	}

	this.getObj =  function (){
		var o={}
		o.array=[]
		for (var i = 0; i < this.array.length; i++) {
			o.array[i]=this.array[i].getObj()
		}
		return o
	}


}

SpVLines.prototype = {	
	/*set life (v) {
		if (this._life == v) return;
		this._life = v;
		for (var ii = 0; ii < this.arrayClass.length; ii++) {
			if (this.arrayClass[ii].life != undefined) this.arrayClass[ii].life = this._life;
		}

	},
	get life () {
		return this._life;
	}*/
};


export function GronVL (par) {
	var self = this;
	this.par = par;
	this.uuid=this.par.generateRendom(2);
	this.idArr=-1;
	this.os=-1;
	this.type = 'GronVL';
	this.pNull=new Position(0,0)
	this.p=new Position(0,0)
	this.p1=new Position(1000,0)

	this.pLoacel=new Position(0,0)
	this.pLoacel1=new Position(1000,0)
	this.distans=1000

	this.array=[]
	this.arrayChesh=[]

	this.setPoisit=function(x,y){
		this.p.x=x
		this.p.y=y
	}
	this.setPoisit1=function(x,y){
		this.p1.x=x
		this.p1.y=y
	}

	var a,d;
	this.angle=0

	this.corectLocel=function(p,a1){
		a=this.par.getAngle(this.pNull,this.p);
		d=this.par.getDistance(this.pNull,this.p);
		this.par.getVector(d,a+a1,this.pLoacel)
		this.pLoacel.x+=p.x;
		this.pLoacel.y+=p.y;

		this.angle=a1
		a=this.par.getAngle(this.pNull,this.p1);
		d=this.par.getDistance(this.pNull,this.p1);
		this.par.getVector(d,a+a1,this.pLoacel1)
		this.pLoacel1.x+=p.x;
		this.pLoacel1.y+=p.y;
		this.distans=this.par.getDistance(this.p,this.p1);
		this.dragPoint()	
	}

	this.setMinMax=function(rect){
		if(this.pLoacel.x<rect.x)rect.x=this.pLoacel.x;
		if(this.pLoacel1.x<rect.x)rect.x=this.pLoacel1.x;
		if(this.pLoacel.x>rect.x1)rect.x1=this.pLoacel.x;
		if(this.pLoacel1.x>rect.x1)rect.x1=this.pLoacel1.x;

		if(this.pLoacel.y<rect.y)rect.y=this.pLoacel.y;
		if(this.pLoacel1.y<rect.y)rect.y=this.pLoacel1.y;
		if(this.pLoacel.y>rect.y1)rect.y1=this.pLoacel.y;
		if(this.pLoacel1.y>rect.y1)rect.y1=this.pLoacel1.y;
	}

	var xx,yy,b,ddd,deistPlus
	var vec=new THREE.Vector2();
	this.dragPoint=function(p){
		
		for (var i = 0; i < this.array.length; i++) {

			if(this.array[i].life==false)continue;
			//

			b=true
			if(this.array[i].bUU){
				
				
				ddd=this.par.par.windows.getPLToUUID(this.array[i].bUU, this.array[i].bST);

				if(ddd){
					
					deistPlus=0
					if(this.os==1)deistPlus=this.par.par.arrPosit[0].x;
					if(this.os==2)deistPlus=this.par.par.arrPosit[5].x;

					calc.getVector(ddd+deistPlus, this.angle, vec)	    			
	    			vec.x+=this.pLoacel.x;
	    			vec.y+=this.pLoacel.y;
	    			xx=vec.x;
					yy=vec.y;
					b=false
					
				}
				
			}

			if(b){
				xx=this.pLoacel.x*(1-this.array[i].pros)+this.pLoacel1.x*this.array[i].pros;
				yy=this.pLoacel.y*(1-this.array[i].pros)+this.pLoacel1.y*this.array[i].pros;
			}
		
			this.array[i].obj.position.set(xx,yy);
		}
	}
	
	let bb
	this.remove=function(p){
		bb=false;
		if(p.gronVL!=undefined){
			for (var i = this.array.length-1; i >=0; i--) {					
				if(this.array[i].obj.uuid==p.uuid){
					this.array[i].remove(p);
					this.array.splice(i,1);
					bb= true
				}
			}			
		}
		return false
	}

	var box
	this.add=function(p){
		box=this.getBox();
		box.add(p);		
		this.array.push(box);			
		return box;
	}

	this.getBox=function(){
		for (var i = 0; i < this.arrayChesh.length; i++) {
			if(this.arrayChesh[i].life==false){
				return this.arrayChesh[i]
			}
		}
		this.arrayChesh.push(new GronVLBox(this));
		this.arrayChesh[this.arrayChesh.length-1].idArr=this.arrayChesh.length-1;
		return this.arrayChesh[this.arrayChesh.length-1];
	}

	this.setObj =  function (o){
		this.uuid=o.uuid
	}

	this.getObj =  function (){
		var o={}
		o.uuid=this.uuid;
		return o
	}
}

export function GronVLBox (par) {
	var self = this;
	this.life=false;
	this.type = 'GronVLBox';
	this.par=par
	this.pros=0
	this.os=0

	this.bUU=null
	this.bST=0
	
	this.setePL=function(ePL){
		this.pros=ePL.pros;
		this.bUU=ePL.bUU;
		this.bST=ePL.bST;
	}


	this.obj
	this.add=function(p){
		
		this.life=true;		
		this.obj=p;		
		this.obj.gronVL = this;		
	}

	this.remove = function(p){

		this.life=false;
		this.obj.gronVL=undefined;	
		this.par.remove(p)	
		this.obj=undefined;		
	}	
}
