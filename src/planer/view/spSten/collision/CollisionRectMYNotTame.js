//-----------------------------------------------------------------------------------------------
//-----------------------------------------------------------------------------------------------




var calcColis;
function CollisionRect() {
    var self = this;
    this.world=new RectCollis(0,0,400,300);
    if(calcColis==undefined)new CalcColis();

    var arrRect=[];

    var arrX=[];
    var arrY=[];

    var arrXD=[];
    var arrYD=[];

    var arrXB=[];
    var arrYB=[];
    var arrXP=[];

    var p;
    this.addRect=function(r){
        p=9999999;
        for (var i = 0; i < arrRect.length; i++) {
            if(arrRect[i].idRandom==r.idRandom){
                p=i;
                break;
            }
        }

        if(p==9999999){
            r.rectartID();
            arrRect.push(r);
            this.update();
        }
    }

    this.removeRect=function(r, bool){
        p=9999999;
        for (var i = 0; i < arrRect.length; i++) {
            if(arrRect[i].idRandom==r.idRandom){
                p=i;
                break;
            }
        }
        if(p!=9999999){
            
            p=arrRect.splice(p,1);
            this.update();
            if(bool==undefined)this.removeRect(p, true);
        }
    }

    this.rectPoisk=new RectCollis();
    this.rect;
    
    this.testRect=function(r){
        this.rect=r;
        this.rectPoisk.set(r);       
        calcColis.isState(this.world,this.rectPoisk);
        calcColis.isState(this.rectPoisk,this.world);


//calcColis.testRadom(this.world,this.rectPoisk);

        if((this.world.kolPoint==0)&&(this.rectPoisk.kolPoint==0)){
            this.rect.peresek=false;
        }else{
            
            

            this.rect.peresek=true; 
           // this.blizPoisk(this.rectPoisk);

               
            calcColis.rectInRect(this.world,this.rectPoisk);

            if(this.rectPoisk.kolPoint!=0){
                if(this.rectPoisk.kolPoint!=4){
                    this.blizPoisk(this.rectPoisk, true);
                }
                if(this.kolYes(this.rectPoisk)){
                    
                    this.blizPoisk(this.rectPoisk); 
                }                 
            }

        }

            
    }



    var ii;
    var minX, minY, pX, pY, bY, bX,db,dm;
    var sX,sY,sahBoool,sah;
    this.blizPoisk=function(r, bool){
        minX=99999999999;
        minY=99999999999;
        db=true;
        sX=r.position.x;
        sY=r.position.y;

        sahBoool=0; 
        
        
        sah=0;    
        
        for (ii = 0; ii < arrX.length; ii++) {
            if(db==true){
                r.position.x=arrX[ii]-r.x; 
            }else{
                r.position.x=arrX[ii]-r.x-r.width; 
            }
            arrXP[ii]=r.position.x;
            arrXD[ii]=0;
            if(sX>r.position.x)arrXD[ii]=sX-r.position.x;
            if(sX<r.position.x)arrXD[ii]=r.position.x-sX;
           // arrXD[ii]=Math.abs(sX-r.position.x)
            arrXB[ii]=this.kolYes(r);
            if(arrXB[ii]==false){
                if(this.world.getPoint(1).x<r.getPoint(1).x)arrXB[ii]=true;
                if(this.world.getPoint(0).x>r.getPoint(0).x)arrXB[ii]=true;
            }
            sah++;
            db=!db;            
        }

        for (ii = 0; ii < arrX.length; ii++) {
            if(arrXB[ii]==false){
                if(minX>arrXD[ii]){
                    minX=arrXD[ii];
                    r.position.x=arrXP[ii];
                }
            }
            
            db=!db;
           /* if((bool==true)&&(sahBoool==0)){
                sahBoool=1;
                ii = arrX.length-2;
            } */            
        }



 /*       

                if(this.kolYes(r,this.rect.idRandom)){                     
                    dm=Math.abs(Math.abs(sX)-Math.abs(arrX[ii]+r.x));                          
                    if(minX>dm){
                        minX=dm;
                        
                        bX=true;
                        pX=ii;
                    }
                }                              
            }
            if(db==false){
                r.position.x=arrX[ii]-r.x-r.width; 
                if(this.kolYes(r)){
                    dm=Math.abs(Math.abs(sX)-Math.abs(arrX[ii]+r.x));                 
                    
                    if(minX>dm){
                        minX=dm;
                        
                        bX=false;
                        pX=ii;
                    } 
                }              
            }
            
             
        }*/


        
       /* if(minX!=99999999999){
            if(bX==true)r.position.x=arrX[pX]-r.x; 
            else r.position.x=arrX[pX]-r.x-r.width;
        }*/
        return false;
    }

    this.kolYes=function(r){
       
       //if(calcColis.isPutIn(this.world, r)){//он в нутри            
            //if(arrRect.length==0)return true;  
            for (var i = 0; i < arrRect.length; i++) {
                if(r.idRandom!=arrRect[i].idRandom){
                    calcColis.isState(arrRect[i],r);
                    calcColis.isState(r,arrRect[i]);                                    
                    if((arrRect[i].kolPoint==4)||(r.kolPoint==4)){
                        return true;  
                    }/**/
                    
                    if(calcColis.isLineRect(r,arrRect[i])){                       
                        return true; 
                    }
                }
            }


       // }
        return false;  
    }

    this.update=function(){
        arrX=[];
        arrY=[];
        arrX.push(this.world.x+this.world.position.x)
        arrY.push(this.world.y+this.world.position.y)
        for (ii = 0; ii < arrRect.length; ii++) {             
            arrX.push(arrRect[ii].x+arrRect[ii].position.x, arrRect[ii].x+arrRect[ii].position.x+arrRect[ii].width);
            arrX.push(arrRect[ii].x+arrRect[ii].position.x, arrRect[ii].x+arrRect[ii].position.x+arrRect[ii].width);
            arrY.push(arrRect[ii].y+arrRect[ii].position.y, arrRect[ii].y+arrRect[ii].position.y+arrRect[ii].height);
            arrY.push(arrRect[ii].y+arrRect[ii].position.y, arrRect[ii].y+arrRect[ii].position.y+arrRect[ii].height);
        }

        arrY.push(this.world.y+this.world.position.y+this.world.height);
        arrX.push(this.world.x+this.world.position.x+this.world.width)


        arrX.sort(this.testObj); 
        arrY.sort(this.testObj);         
    }

    this.testObj=function(a,b){
        return a-b;
    }

}





function RectCollis(_x,_y,_width,_height) {
    this.x=_x||0;
    this.y=_y||0;

    this.width=_width||100;
    this.height=_height||100;
    this.position=new PositionCollis();


    this.arrKri=[0,0,0,0];
    this.kolPoint=0;
    this.peresek=false;

    this.idRandom=Math.random();
    this.rectartID=function(){this.idRandom=Math.round(Math.random()*10000000000000000)/10000000000000000;}
    this.parent;

    this.set=function(r){
        this.x=r.x;
        this.y=r.y;

        this.width=r.width;
        this.height=r.height; 

        this.position.x=r.position.x;
        this.position.y=r.position.y; 
        this.idRandom =r.idRandom;   
    }
    var p=new PositionCollis();
    this.getPoint=function(num){
        if(num==0)p.set(this.x+this.position.x, this.y+this.position.y);
        if(num==1)p.set(this.x+this.position.x+this.width, this.y+this.position.y);
        if(num==2)p.set(this.x+this.position.x+this.width, this.y+this.position.y+this.height);
        if(num==3)p.set(this.x+this.position.x, this.y+this.position.y+this.height);

        if(num==4)p.set(this.x+this.position.x, this.y+this.position.y);
        return p
    }

}
function PositionCollis(_x,_y) {
    this.x=_x||0;
    this.y=_y||0;
    this.set=function(_x,_y){
        this.x=_x;
        this.y=_y;
    }
}



var calcColis;
function CalcColis() { 
    calcColis=this;
    //Получение угла между двумя точками градусы
    this.getAngle = function(a, b) {
        return Math.atan2(b.y - a.y, b.x - a.x);
    }

    // получить дистанцию между точками
    this.getDistance = function(p1, p2) {
        if (!p1 || !p2) return 0;
        return Math.sqrt(Math.pow((p1.x - p2.x), 2) + Math.pow(( p1.y - p2.y), 2))
    }

    this.getVector = function(length, angle){
        var point=new THREE.Vector2(0,0);
        point.x = Math.abs(length) * Math.cos(angle);
        point.y = Math.abs(length) * Math.sin(angle);   
        return point;   
    }

 
    // поверяем находится ли вторый прямоугольник в первом 
    this.isPutIn = function(r1,r2) {
        
        if( (r1.x+r1.position.x<=r2.x+r2.position.x)&&(r1.x+r1.position.x+r1.width>=r2.x+r2.position.x+r2.width)){
            if( (r1.y+r1.position.y<=r2.x+r2.position.y)&&
                (r1.y+r1.position.y+r1.height>=r2.y+r2.position.y+r2.height)
                ){
                return true;
            }            
        }
        return false;
       // return ( (r1.x <= r2.x) && (r1.x+r1.width >= x2+w2) && (w1 >= w2) && (y1 <= y2) && (y1+h1 >= y2+h2) && (h1 >= h2)); 
    }


    var sah,ii;
  
    //находиться ли точка в ректе
    this.isPointInRect = function(p,r) {        
        if( (p.x>r.x+r.position.x)&&(p.x<r.x+r.position.x+r.width)){
            if( (p.y>r.y+r.position.y)&&(p.y<r.y+r.position.y+r.height)){
                return 1;
            }            
        }
        return 0;       
    }

    //во внутрь смещение второго треугольника относительно первого 
    this.rectInRect = function(r1,r2) {        
        sah=0;
        for (ii = 0; ii < 4; ii++) {
            if(r2.arrKri[ii]==1)sah++;
        }
        if(r1.width<r2.width)return false;
        if(r1.height<r2.height)return false;
        if((sah==1)||(sah==2)){ } else return false;

        if(sah==1){//то в углы           
            if((r2.arrKri[0]==1)){
                r2.position.x=r1.x-r1.position.x-r2.x+r1.width-r2.width;
                r2.position.y=r1.y-r1.position.y-r2.y+r1.height-r2.height;                
            }
            if((r2.arrKri[1]==1)){
                r2.position.x=r1.x-r1.position.x-r2.x//+r1.width-r2.width;
                r2.position.y=r1.y-r1.position.y-r2.y+r1.height-r2.height;
            }
            if((r2.arrKri[2]==1)){
                r2.position.x=r1.x-r1.position.x-r2.x//+r1.width-r2.width;
                r2.position.y=r1.y-r1.position.y-r2.y//+r1.height-r2.height;
            }
            if((r2.arrKri[3]==1)){
                r2.position.x=r1.x-r1.position.x-r2.x+r1.width-r2.width;
                r2.position.y=r1.y-r1.position.y-r2.y//+r1.height-r2.height;
            }
           
        }
        if(sah==2){//то в стороны            
            if((r2.arrKri[0]==1)&&(r2.arrKri[1]==1)){                    
                r2.position.y=r1.y-r1.position.y-r2.y+r1.height-r2.height;
            }
           if((r2.arrKri[1]==1)&&(r2.arrKri[2]==1)){ 
                r2.position.x=r1.x-r1.position.x-r2.x;                
            }

            if((r2.arrKri[2]==1)&&(r2.arrKri[3]==1)){ 
                r2.position.y=r1.y-r1.position.y-r2.y;             
            }
            if((r2.arrKri[3]==1)&&(r2.arrKri[0]==1)){ 
                r2.position.x=r1.x-r1.position.x-r2.x+r1.width-r2.width;         
            }            
        }
        return true;
    }

    var v=new PositionCollis();
    var v1=new PositionCollis();
    var v2=new PositionCollis();
    var v3=new PositionCollis();    
    this.isLineRect = function(r1,r2) {
        var i,j,pp;
        for (i = 0; i < 4; i++) {
            
            v.x=r1.getPoint(i).x;
            v.y=r1.getPoint(i).y;
            v1.x=r1.getPoint(i+1).x;
            v1.y=r1.getPoint(i+1).y;
           // tC.clear();
            //tC.debagLine(v,v1);
            for (j = 0; j < 4; j++) {
                v2.x=r2.getPoint(j).x;
                v2.y=r2.getPoint(j).y;
                v3.x=r2.getPoint(j+1).x;
                v3.y=r2.getPoint(j+1).y;

                pp=this.getPointOfIntersection(v,v1,v2,v3);
               
                
                
                
                //tC.debagLine(v,v1);

                if(pp!=null){
                    if(this.testRadom(r1,r2)==false){
                        return true;
                    }
                   // tC.debagPoint(pp);
                    
                }
            }


        };

        // tC.clear();

        return false;


    }


    this.testRadom = function(r1,r2) {
        if(r1.getPoint(0).x>r2.getPoint(0).x){            
            if(this.numOkr(r1.getPoint(0).x)==this.numOkr(r2.getPoint(1).x)){                
                return true
            }
        }
        if(r1.getPoint(1).y>r2.getPoint(1).y){            
            if(this.numOkr(r1.getPoint(0).y)==this.numOkr(r2.getPoint(2).y)){                
                return true
            }
        }

        
            
        if(this.numOkr(r1.getPoint(1).x)==this.numOkr(r2.getPoint(0).x)){                  
            return true
        }
        
        if(this.numOkr(r1.getPoint(2).y)==this.numOkr(r2.getPoint(0).y)){                   
            return true
        }
        return false
    }



    //проверяем пересечений
    var d,da,db,ta,tb,dx,dy,distans,angel;
    var rez=new PositionCollis(0,0);
    this.getPointOfIntersection = function(p1, p2, p3, p4){
        d = (p1.x - p2.x) * (p4.y - p3.y) - (p1.y - p2.y) * (p4.x - p3.x);
        da = (p1.x - p3.x) * (p4.y - p3.y) - (p1.y - p3.y) * (p4.x - p3.x);
        db = (p1.x - p2.x) * (p1.y - p3.y) - (p1.y - p2.y) * (p1.x - p3.x);
     
        ta = da / d;
        tb = db / d;     
        if (ta >= 0 && ta <= 1 && tb >= 0 && tb <= 1){
            dx = p1.x + ta * (p2.x - p1.x);
            dy = p1.y + ta * (p2.y - p1.y); 
            rez.x= dx;
            rez.y= dy;
            return rez; // точка пересечения            
        }    
        return null;
    }
    
    this.isState = function(r1,r2) {
        var rez=0;
        r2.kolPoint=0;        
        for (var i = 0; i < 4; i++) {           
            r2.arrKri[i]=this.isPointInRect(r2.getPoint(i),r1);            
            if(r2.arrKri[i]==1)r2.kolPoint++;
        }

        if(r2.kolPoint!=0)rez=1;
        if(r2.kolPoint==4)rez=2; 

        return rez;
    }


    this.numOkr = function(n) {
        return Math.round(n*1)/1;
    }
}
