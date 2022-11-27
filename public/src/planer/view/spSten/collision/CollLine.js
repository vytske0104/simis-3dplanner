


//-----------------------------------------------------------------------------------------------
//-----------------------------------------------------------------------------------------------


export  function CollLine (par) {
	this.par=par
  	var self=this;

  	var sRect=this.sRect=new Box();

  	var box = new Box();
  	var boxHH =this.boxHH= new Box();
  	var boxWW =this.boxWW= new Box();
  	var boxPP =this.boxPP= new Box();
  	this.otstup=5;

  	this.array=[];
  	this.arrayCesh=[];
  	var sahBox=0
  	this.ap=[];
  	this.apCesh=[];
  	this.apb=[];
  	var sahP=0

 	this.getA=function(){ 		
 		if(this.arrayCesh[sahBox]==undefined){
 			this.arrayCesh[sahBox] = new Box()
 		}
 		this.arrayCesh[sahBox].clear()
 		sahBox++;
 		return this.arrayCesh[sahBox-1]
 	}

 	this.getPoint=function(){ 		
 		if(this.apCesh[sahP]==undefined){
 			this.apCesh[sahP] = {x:0,y:0,z:0,b:false}
 		} 		
 		sahP++;
 		return this.apCesh[sahP-1]
 	}


 	
 	var aL, b,boox,hh
 	var point={x:0,y:0}
 	var point1={x:0,y:0}
 	var point2={x:0,y:0}
 	var bool
 	
  	this.dragActiv=function(){
  		sahBox=0
  		aL=this.par.par.arrLine	
  		sRect.b = false;	
  		sRect.x=this.par.activBox._x;
  		sRect.y=this.par.activBox._y;
  		sRect.width=this.par.activBox.width;
  		sRect.height=this.par.activBox.height;
  		sRect.x1=sRect.x+sRect.width;
  		sRect.y1=sRect.y+sRect.height;

  		boxHH.setBox(sRect);
  		boxWW.setBox(sRect);
  		boxPP.setBox(sRect);
  		this.apb.length = 0;
  		this.array.length=0;
		if(this.startPoisk(sRect,this.array)==false){//не врезаемся
			return false;
		}

		this.poiskHH(boxHH,this.array);
		this.poiskWW(boxWW,this.array);


		this.isColisi(boxHH);
		this.isColisi(boxWW);

		if(boxHH.b==false || boxWW.b==false){
			


			if(boxHH.b==false && boxWW.b==false){
				let dw=Math.abs(sRect.x-boxWW.x)
				let dh=Math.abs(sRect.y-boxHH.y)

				//trace(dw+"  $$  "+dh)

				if(dw<dh)boxPP.setBox(boxWW);
				else boxPP.setBox(boxHH);
				return false;	
			}
			if(boxHH.b==false)boxPP.setBox(boxHH);
			if(boxWW.b==false)boxPP.setBox(boxWW);
			return false;
		}else{
			return true;
		}

  		return false;
  	}


	this.isColisi=function(rect){//проверяем на кализии
		rect.b=false;
		if(this.startPoisk(rect)==true){//пересекает линии
			rect.b=true;
			return
		}
		if(this.isRectToBox(rect,this.par.bigBox,true)==false){
			rect.b=true;
			return
		}
		for (var i = 0; i < this.par.arrBox.length; i++) {		
			if(this.par.arrBox[i].uuid!=this.par.activBox.uuid){
				if(this.isRectToBox(rect,this.par.arrBox[i])==true){
					rect.b=true;
					return
				}
			}			
		}
		rect.b=false;
	}

	this.isRectToBox=function(rect, box, bIn){//проверяем на кализии
		if(bIn==true){//рект в нутри 
			if(rect.x>box.x && rect.x1<box.x+box.width){
				if(rect.y>box.y && rect.y1<box.y+box.height){					
					return true;
				}				
			}
			return false;
		}else{
			if(this.testLineXZ3(rect.x, rect.x1, box.x, (box.x+box.width))==true){
				if(this.testLineXZ3(rect.y, rect.y1, box.y, (box.y+box.height))==true){
					
					return true;
				}				
			}
		}
		return false;
	}




	this.poiskWW=function(rect, arr){//смещаем рект вправ/лево
		sahP=0;
		let ps=this.getPoint()
		let pf=this.getPoint()
		let pd
		//первая и последния
		ps.x=0;
		ps.y=rect.y;
		ps.z=0;
		
		pf.x=this.par.bigBox.width;
		pf.y=rect.y;
		pf.z=0;

		///находим точки пересечение, первая и последния по умолчанию
		this.ap.length = 0;
		this.ap.push(ps);
		for (var i = 0; i < aL.length; i++) {
			pd=calc.getPointOfIntersection(ps,pf,aL[i].p,aL[i].p1)
			if(pd){

				let p=this.getPoint();
				p.x=pd.x;
				p.y=pd.y;
				this.ap.push(p);
				pd=calc.isPointInLin(aL[i].p,aL[i].p1,ps,9999999,99999999)
				p.z=pd.z;

			}			
		}
		this.ap.push(pf);
		/////

		//наполняем доступные линии
		this.apb.length = 0;
		for (var i = 1; i < this.ap.length; i++) {
			if(this.ap[i].z<0){
				let box=this.getA();
				box.x=this.ap[i-1].x;
				box.x1=this.ap[i].x;
				box.width=box.x1-box.x
				box.y=this.ap[i].y;
				box.y1=this.ap[i].y+5;

				box.height=5
				this.apb.push(box)
			}
		}

		let d=99999999;
		let d1=99999999;
		let xx=99999999;
		let x1=99999999;
		for (var i = 0; i < this.apb.length; i++) {
			if(this.apb[i].width+this.otstup*2>rect.width){
				xx=this.apb[i].x+this.otstup;
				d1=Math.abs(rect.x-xx)
				if(d>d1){
					d=d1;
					x1=xx;
				}

				xx=this.apb[i].x1-this.otstup-rect.width;
				d1=Math.abs(rect.x-xx)
				if(d>d1){
					d=d1;
					x1=xx;
				}
			}			
		}

		if(d!=99999999){
			rect.x=x1;
			rect.x1=x1+rect.width;			
			return true
		}

		return false
		
	}


  	this.poiskHH=function(rect, arr){//смещаем рект вниз
  		let bool = false;
		for (var i = 0; i < arr.length; i++) {
			if(rect.x<arr[i].line.p.x && rect.x1>arr[i].line.p.x){
				if(rect.y<arr[i].line.p.y){
					hh=arr[i].line.p.y-rect.y+this.otstup
					rect.y+=hh;
					rect.y1+=hh;
					bool=true  						
				}  					
			}
			if(rect.x<arr[i].line.p1.x && rect.x1>arr[i].line.p1.x){
				if(rect.y<arr[i].line.p1.y){
					hh=arr[i].line.p1.y-rect.y+this.otstup
					rect.y+=hh;
					rect.y1+=hh; 
					bool=true  						
				}  					
			}
		}
		for (var i = 0; i < arr.length; i++) {
			point.x=rect.x
			point.y=rect.y

			point1.x=rect.x
			point1.y=rect.y+9999999999;

			point2=calc.getPointOfIntersection(point,point1,arr[i].line.p,arr[i].line.p1)

			if(point2){
				if(rect.y<point2.y+this.otstup){
				rect.y=point2.y+this.otstup;
					rect.y1=rect.y+rect.height;
					bool=true 
				}  					
			}

			point.x=rect.x1
			point.y=rect.y

			point1.x=rect.x1
			point1.y=rect.y+9999999999;

			point2=calc.getPointOfIntersection(point,point1,arr[i].line.p,arr[i].line.p1)

			if(point2){
				if(rect.y<point2.y+this.otstup){
					rect.y=point2.y+this.otstup;
					rect.y1=rect.y+rect.height;
					bool=true 
				}  					
			}			
		}
		
  		return bool;	
  	}





  	this.startPoisk=function(rect,arr){//ищем пересечения 0/1, если арей есть наполняем его
  		rect.x1=rect.x+rect.width
  		rect.y1=rect.y+rect.height
  		let rB=false 		
  		for (var i = 0; i < aL.length; i++) {  			
  			box.setPP1(aL[i]);
  			box.line=aL[i];  			
  			if(this.testLineXZ2(rect.x,  rect.x+rect.x1, box.x, box.x1)==true){
  				if(rect.y<box.y1){  					
  					if(this.testBB(rect,box)==true){
  						rB=true; 
  						if(arr){
  							boox=this.getA();
  							boox.setBox(box);
  							arr.push(boox);
  						}else{
  							return rB;  
  						}						
  					}
  				}
  			}  			
  		}  		
  		return rB;  			
  	}



  	

	var _pb={x:0, y:0}
	var _pb1={x:0, y:0}
	var _pb2={x:0, y:0}
	var _pb3={x:0, y:0}

	this.onBox=function(_b){ 
		_pb.x=_b.x;
        _pb.y=_b.y;

        _pb1.x=_b.x1;
        _pb1.y=_b.y;

        _pb2.x=_b.x1;
        _pb2.y=_b.y1;

        _pb3.x=_b.x;
        _pb3.y=_b.y1;
	}


	var rez
    this.testBB=function(_b,bline){ //кроя бокса за линей, направелние линии важно!!          
        this.onBox(_b);
        rez = calc.isPointInLin(bline.line.p,bline.line.p1,_pb,9999999999,999999999 )
       
        if(rez && rez.z>0){        	
        	return true;
        }
       	rez = calc.isPointInLin(bline.line.p,bline.line.p1,_pb1,9999999999,999999999 )
        if(rez && rez.z>0){        	
        	return true;
        }
        rez = calc.isPointInLin(bline.line.p,bline.line.p1,_pb2,9999999999,999999999 )
        if(rez && rez.z>0){        	
        	return true;
        }
        rez = calc.isPointInLin(bline.line.p,bline.line.p1,_pb3,9999999999,999999999 )
        if(rez && rez.z>0){        	
        	return true;
        } 	

        return false;
    }
    //сверяем две полосы
    this.testLineXZ2=function(ps,pf,ps1,pf1){            
        if(ps1>=ps &&ps1<=pf)return true;
        if(ps>=ps1 &&ps<=pf1)return true;
        return false;
    }
    //сверяем две полосы
    this.testLineXZ3=function(ps,pf,ps1,pf1){            
        if(ps1>ps &&ps1<pf)return true;
        if(ps>ps1 &&ps<pf1)return true;
        return false;
    }


    //Поиск колизий всех, по мере удоления////////////
    //////////////////////////////////////////////////
    var arrRez=[];
    var aRC=[];
  	var arrIgnor
    this.getRey = function (p,p1, yBag,aIgnor) {//от дуча все пересечения 
    	arrIgnor=aIgnor
    	arrRez.length=0
    	this.pr(p,p1,this.par.bigBox);
    	for (var i = 0; i < this.par.arrBox.length; i++) {    		
    		if(this.isIgnor(this.par.arrBox[i]))continue;
    		this.pr(p,p1,this.par.arrBox[i], yBag);
    	}

    	for (var i = 0; i < aL.length; i++) {    		
			this.plys(p,calc.getPointOfIntersection(p,p1,aL[i].p,aL[i].p1),yBag)
		}


    	arrRez.sort(this.sort);

		return arrRez;
	}

	this.sort = function (a,b) {//по длине от ночальной точки
		return a.d-b.d;
	}


    this.isIgnor = function (rcm) {//тест на список игноров
    	if(arrIgnor!=undefined){    		
    		for (var i = 0; i < arrIgnor.length; i++) {				
    			if(arrIgnor[i].uuid==rcm.uuid)return true
    		}
    	}
    	return false
    }


	this.getP = function () {//новый поинт в кеше
		if(aRC[arrRez.length]==undefined)aRC[arrRez.length]={x:0,y:0,d:0}
		arrRez.push(aRC[arrRez.length]);
		return aRC[arrRez.length-1];		
	}	

	var prz,yi;
	this.pr = function (p,p1,box, yBag) {//проверяем коробку
		this.onBox2(box, yBag);
		this.plys(p,calc.getPointOfIntersection(p,p1,_pb,_pb1))		
		this.plys(p,calc.getPointOfIntersection(p,p1,_pb1,_pb2))
		this.plys(p,calc.getPointOfIntersection(p,p1,_pb2,_pb3))
		this.plys(p,calc.getPointOfIntersection(p,p1,_pb3,_pb))
		
	}
	this.plys = function (p,prz,yBag) {//записуем в стек		
		if(!prz)return;
		yi=this.getP();
		yi.x=prz.x;
		yi.y=prz.y;
		if(yBag)yi.y=yBag-prz.y;
		yi.d=calc.getDistance(p,prz);			
	}


	this.onBox2=function(_b, yBag){ //коробку в линии
		if(yBag==undefined){
			_pb.x=_b.x;
	        _pb.y=_b.y;

	        _pb1.x=_b.x+_b.width;
	        _pb1.y=_b.y;

	        _pb2.x=_b.x+_b.width;
	        _pb2.y=_b.y+_b.height;

	        _pb3.x=_b.x;
	        _pb3.y=_b.y+_b.height;
		}else{
			_pb.x=_b.x;
	        _pb.y=yBag-_b.y;

	        _pb1.x=_b.x+_b.width;
	        _pb1.y=yBag-_b.y;

	        _pb2.x=_b.x+_b.width;
	        _pb2.y=yBag-(_b.y+_b.height);

	        _pb3.x=_b.x;
	        _pb3.y=yBag-(_b.y+_b.height);
		}
		
	}

    //////////////////////////////////////////////////
    //////////////////////////////////////////////////
}

function Box () {
	this.x=0;
 	this.y=0;
 	this.width=100;
 	this.height=100;
 	this.x1=100;
 	this.y1=100;
 	this.line=null;
 	this.b=false;
 	this.clear=function(){
 		this.x=0;
	 	this.y=0;
	 	this.width=100;
	 	this.height=100;
	 	this.x1=100;
 		this.y1=100;
 		this.line=null		
 	}

 	this.setPP1=function(o){
 		if(o.p.y<o.p1.y){
 		
	 		this.x=o.p.x;
		 	this.y=o.p.y;

		 	this.x1=o.p1.x;
		 	this.y1=o.p1.y;


 		}else{
 			this.x=o.p.x;
		 	this.y=o.p1.y;
		 	this.x1=o.p1.x;
		 	this.y1=o.p.y;
 		}



	 	this.width=this.x1-this.x;
	 	this.height=this.y1-this.y;

 	}

 	this.setBox	=function(box){
 		this.b=box.b;
 		this.x=box.x;
	 	this.y=box.y;


	 	this.x1=box.x1;
	 	this.y1=box.y1;

	 	this.width=box.width;
	 	this.height=box.height;	
	 	this.line=box.line		
 	}
  	
}




