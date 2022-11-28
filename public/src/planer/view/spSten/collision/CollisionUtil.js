


//-----------------------------------------------------------------------------------------------
//-----------------------------------------------------------------------------------------------


export  function CollisionUtil () {

  var self = this;
 

  // крайние точки бокса который прилипает
  var p1 = new THREE.Vector2(0, 0);
  var p2 = new THREE.Vector2(0, 0);
  var p3 = new THREE.Vector2(0, 0);
  var p4 = new THREE.Vector2(0, 0);
  // крайние точки i-го бокса в мире 
  var pp1 = new THREE.Vector2(0, 0);
  var pp2 = new THREE.Vector2(0, 0);
  var pp3 = new THREE.Vector2(0, 0);
  var pp4 = new THREE.Vector2(0, 0); 



  // прилипать(сдвигать) бокс box к arrBox на растоянии distance
  this.stickBox = function(box, arrBox , distance) {
   if (!box) return;
   // крайние точки бокса который прилипает
   p1.x = box.x;
   p1.y = box.y;

   p2.x = box.x + box.width;
   p2.y = box.y;

   p3.x = box.x + box.width;
   p3.y = box.y + box.height;

   p4.x = box.x;
   p4.y = box.y + box.height;

   var dis;
   for (var i = 0; i < arrBox.length; i++) {
	 pp1.x = arrBox[i].x;
	 pp1.y = arrBox[i].y;
	 pp2.x = arrBox[i].x + arrBox[i].width;
	 pp2.y = arrBox[i].y;
	 pp3.x = arrBox[i].x + arrBox[i].width;
	 pp3.y = arrBox[i].y + arrBox[i].height;
	 pp4.x = arrBox[i].x;
	 pp4.y = arrBox[i].y + arrBox[i].height;

	 dis = this.getDistance(p1, pp4)
	 if (dis <= distance) {
	  box.x = arrBox[i].x;
	  box.y = arrBox[i].y + arrBox[i].height;
	 }
	 
	 dis = this.getDistance(p1, pp3)
	 if (dis <= distance) {
	  box.x = arrBox[i].x + arrBox[i].width;
	  box.y = arrBox[i].y + arrBox[i].height;
	 }   

	 dis = this.getDistance(p1, pp2)
	 if (dis <= distance) {
	  box.x = arrBox[i].x + arrBox[i].width;
	  box.y = arrBox[i].y ;
	 }

	 dis = this.getDistance(p2, pp3)
	 if (dis <= distance) {
	  box.x = arrBox[i].x + arrBox[i].width - box.width;
	  box.y = arrBox[i].y + arrBox[i].height;
	 }
	 
	 dis = this.getDistance(p2, pp4)
	 if (dis <= distance) {
	  box.x = arrBox[i].x - box.width;
	  box.y = arrBox[i].y + arrBox[i].height;
	 }   

	 dis = this.getDistance(p2, pp1)
	 if (dis <= distance) {
	  box.x = arrBox[i].x - box.width;
	  box.y = arrBox[i].y ;
	 }

	 dis = this.getDistance(p3, pp2)
	 if (dis <= distance) {
	  box.x = arrBox[i].x + arrBox[i].width - box.width;
	  box.y = arrBox[i].y - box.height;
	 }
	 
	 dis = this.getDistance(p3, pp1)
	 if (dis <= distance) {
	  box.x = arrBox[i].x - box.width;
	  box.y = arrBox[i].y - box.height;
	 }   

	 dis = this.getDistance(p3, pp4)
	 if (dis <= distance) {
	  box.x = arrBox[i].x - box.width;
	  box.y = arrBox[i].y + arrBox[i].height - box.height ;
	 }

	 dis = this.getDistance(p4, pp1)
	 if (dis <= distance) {
	  box.x = arrBox[i].x;
	  box.y = arrBox[i].y - box.height;
	 }
	 
	 dis = this.getDistance(p4, pp2)
	 if (dis <= distance) {
	  box.x = arrBox[i].x + arrBox[i].width;
	  box.y = arrBox[i].y - box.height;
	 }   

	 dis = this.getDistance(p4, pp3)
	 if (dis <= distance) {
	  box.x = arrBox[i].x + arrBox[i].width;
	  box.y = arrBox[i].y + arrBox[i].height - box.height;
	 }
   }

  }



  // ищем из arrPosit ближайшую позицию к pos 
  this.findMinPosition = function(arrPosit, pos) {
   var minDis = Infinity;
   var dis;
   var res={x:0, y:0}
   for (var i = 0; i < arrPosit.length; i++) {
	 dis = this.getDistance(arrPosit[i], pos)
	 if (minDis > dis) {
	  minDis = dis;
	  res.x = arrPosit[i].x;
	  res.y = arrPosit[i].y;
	 }
   }
   return res;
  }



   //Получение угла между двумя точками градусы
	this.getAngle = function(a, b) {
   		return 180*Math.atan2( b.y - a.y, b.x - a.x)/(Math.PI);
  	}

 
  	// поверяем находится ли вторый прямоугольник в первом 
  	this.isPutIn = function(x1, y1, w1, h1, x2, y2, w2, h2) {
   	// if ( (x1 < x2) && (x1+w1 > x2+w2) ) {}
   		return ( (x1 <= x2) && (x1+w1 >= x2+w2) && (w1 >= w2) && (y1 <= y2) && (y1+h1 >= y2+h2) && (h1 >= h2)); 
  	}
  
  

  	// проверка на пересечение прямоугольников
  	this.isCollisionRectangle = function(x1, y1, w1, h1, x2, y2, w2, h2) {
   		return x1 < (x2 + w2) && y1 < (y2 + h2) && (x1 + w1) > x2 && (y1 + h1) > y2;
  	}

  	// получить дистанцию между точками
  	this.getDistance = function(p1, p2, p3) {
   		if (!p1 || !p2) return 0;
   		return Math.sqrt(Math.pow((p1.x - p2.x), 2) + Math.pow(( p1.y - p2.y), 2))
  	}

  	// получить дистанцию между точками
  	this.getDistance3D = function(p1, p2, p3) {
   		return Math.sqrt(Math.pow((p1.x - p2.x), 2) + Math.pow(( p1.y - p2.y), 2) + Math.pow(( p1.z - p2.z), 2))
  	}
  	//// 
  


}


