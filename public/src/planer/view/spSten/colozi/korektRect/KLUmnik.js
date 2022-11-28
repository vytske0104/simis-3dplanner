
export class KLUmnik  {
    constructor(par) {         
        this.type="KLUmnik";        
        var self=this;
        this.par=par

        this.arrPointCeshM=[]
        this.arrPointM=[]

        this.aL=[]
        this.aR=[]

        this.arrL=[]
        this.arrR=[]


        this.start=function() {
            //trace("-KLUmnik--",this.par.arrLine, this.par.offset) 
            this.clear()

            this.naRL()//разхерачиваем на право лево
           // trace("-KLUmnik--", this.arrL, this.arrR)
        }
        
        var b
        this.naRL=function() {
            for (var i = 0; i < this.par.arrLine.length; i++) {               
                b=true
                if((this.par.arrLine[i].p.y>this.par.offset)&&(this.par.arrLine[i].p1.y>this.par.offset)){
                    b=false
                }
                if(b)this.arrL.push(this.par.arrLine[i])
                else this.arrR.push(this.par.arrLine[i])
            }
            this.sam(this.arrL) 
            this.sam(this.arrR) 
        }
        this.sam=function() {

        }

        this.clear=function(){
            this.aL.length=0;
            this.aR.length=0;

            this.arrL.length=0;
            this.arrR.length=0;
            for (var i = 0; i < this.arrPointM.length; i++) this.arrPointM[i].clear()    
        }

        this.getLM=function(){
            
            if(this.arrPointCeshM[this.arrPointM.length]==undefined){
                this.arrPointCeshM[this.arrPointM.length]=new KLPoint(this);
                this.arrPointCeshM[this.arrPointM.length].idArr=this.arrPointM.length;                
            } 

            this.arrPointCeshM[this.arrPointM.length].clear();          
            this.arrPointM.push(this.arrPointCeshM[this.arrPointM.length]);  

            return this.arrPointM[this.arrPointM.length-1];
        }


    }
}

export class XZPoint  {
    constructor(par) {         
        this.type="XZPoint";
        this.idArr=-1    
        this.par=par

       // this.boolP=false

        this.p=new Position();
       // this.pNull=new Position(0,0,0);
       // this.dist=0
       // this.array=[]
      //  this.arrayBool=[]
        this.clear=function(){
       //     this.array.length=0;
        //    this.arrayBool.length=0;
       //      this.boolP=false
        }

     //   this.bM=false
        this.set=function(p){
      //      this.bM=true
      //      if(p.y<0)this.bM=false
     //       this.p.set(p.x,p.y,p.z);
     //       this.dist= this.par.getDist3D(this.pNull,this.p);
        }

        this.addLine=function(line,bool){
      //      this.array.push(line)
     //       this.arrayBool.push(bool)

       //     if(bool==true){
      //          line.point=this                
       //     }else{
       //         line.point1=this
      //      }

        }       
    }
}


/*

function almostEqual (num1, num2, delta) {
            if (delta == undefined) delta = 0.00001;
            return (num1 - num2) < delta;
        };

        function _connectLines(gotArr) {
            if (!gotArr.length) return [];
            let result = [];
            for (let i = 0; i < gotArr.length - 1; i++) {
                let curElem = gotArr[i];
                let nextElem = gotArr[i + 1];
                
                if (
                    almostEqual(curElem.p1.x, nextElem.p.x) &&
                    almostEqual(curElem.p1.y, nextElem.p.y) &&
                    curElem.p1.z != nextElem.p.z
                ) {
                    result.push( { p1:curElem.p1, p: nextElem.p } );
                }
                result.push(curElem);
            }
            result.push(gotArr[gotArr.length - 1]);
            return result;
        }

        function _separateSides(gotArr) {  
            let leftSideLines = gotArr.filter(
            el => Math.min(el.p.y, el.p1.y) <= 0
            )
            
            let rightSideLines = gotArr.filter(
            el => Math.max(el.p.y, el.p1.y) > 0
            )
            
            return {
            leftSide: leftSideLines,
            rightSide: rightSideLines
            }
        };

        var rez
        this.korektLine2 = function () {
            trace(this.arrPointM)
            let {leftSide, rightSide} = _separateSides(this.arrPointM);
              
            leftSide.sort( (el1, el2) => el1.p.x - el2.p.x );
            rightSide.sort( (el1, el2) => el1.p.x - el2.p.x );

            
            
            this.aL = _connectLines(leftSide);
            this.aR = _connectLines(rightSide);
        }
*/
