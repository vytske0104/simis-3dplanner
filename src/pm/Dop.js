





export default function Dop(par, visi3D, objbase) { 
	this.type="Dop";
	var self=this;

    this.par=par
    this.visi3D=visi3D
    this.objbase=objbase;
    this.param=this.par.param

    this.getId=function(idObj,fun,bClaen,op20){

        this.par.getId(idObj,function(c3){            
            c3.tovar=new Tovar(self,c3,op20)
            
            fun(c3);
        },bClaen)
    }
}




///Уникальное поведение завязаное на п20 и его товарах///////////
/////////////////////////////////////////////////////////////////

function Tovar(par,c3,op20) { 
    var self=this
    this.par=par;
    this.type="Tovar";
    this.param=this.par.param
    
    this.c3=c3;
    this.op20=op20;
    var oo, oo1,mat;
    this.array3D=[]
    this.array=[];

    this.setColor=function(n,n1){
        
        this.array[n].index=n1
       
       /* this.array3D.length=0;
        oo=this.op20.array[n];
        
        oo1=this.op20.array[n].array[n1];       
        
        if(oo.type=="res"){
            var o = JSON.parse(oo1.resur.i1.split('|').join('"'))            
            self.par.par.iz.setMod(self.c3,o,false)
            return
        }


        if(oo1.d3MatId==-1){
            mat=self.par.par.matDop.getIDObj(oo.id);            
        }else{
            var ox=null
            if(oo1.d3MatColor)ox=   {color:oo1.d3MatColor}  
            mat=self.par.par.matDop.getIDObj(oo1.d3MatId,ox);    
            
        }
        for (var i = 0; i < oo.children.length; i++) {
            this.array3D[i]=this.getNum(oo.children[i])
            this.array3D[i].material=mat
        }*/
    }


    this.strIz=""
    this.arrIz=[]
    
    var oi,ccc
    this.boolIz=false
    var aa=[]
    var aa1=[]

    this.initIz=function(){

        if(!this.c3.hron.object.iz)return
        var s=this.c3.hron.object.iz.str.split('|').join('"'); 
        this.boolIz=true    
        this.strIz=s;
        this.arrIz=JSON.parse(this.strIz);
    
        for (var i = 0; i < this.arrIz.length; i++) {
            
            if(this.arrIz[i]==0)continue            
            if(this.arrIz[i].material!=undefined){
                
                oi=null
                for (var j = 0; j <  this.array.length; j++) {                        
                    //if(this.array[j].tipe=="mat"){                            
                        if(this.array[j].id==this.arrIz[i].material){
                            oi=this.array[j]
                            j=9999
                        }
                    //}
                }
                if(oi==null){
                    oi=new BTovar(this);
                    oi.tipe="mat";
                    oi.idArr=this.array.length;
                    oi.id=this.arrIz[i].material
                    this.array.push(oi);
                
                }
                ccc=this.getNum(i)                
                oi.addChild(ccc);
            }
        }


        
        if(this.c3.hron.object.resurs)if(this.c3.hron.object.resurs.array)if(this.c3.hron.object.resurs.array.length!==0){  
            
            aa=this.c3.hron.object.resurs.array;
         
            for (var i = 0; i < aa.length; i++) {
            
                oi=null

                for (var j = 0; j < this.array.length; j++) {
                    if(this.array[j].tipe!="res")continue
                    if(this.array[j].id==aa[i].i){
                        oi=this.array[j]
                        j=9999
                    }
                }
                
                if(oi==null){
                    oi=new BTovar(this);
                    oi.tipe="res";
                    oi.id=aa[i].i;
                    oi.idArr=this.array.length;
                    this.array.push(oi);

                   /* oi={}
                    oi.i=aa[i].i;
                    oi.type="res";
                    oi.icon= "resources/image/notpic.png"; 
                    oi.iconId=null; 
                    oi.array=[];
                    aa1.push(oi);
                    o.array.push(oi);*/
                }
                
                //this.axz[i]=JSON.parse(resur.array[i].i1.split('|').join('"'))
                oi.addChild(JSON.parse(aa[i].i1.split('|').join('"')))
                if(oi.children.length==1)oi.index=0
    

                /*var dd={}
                dd.icon="resources/image/notpic.png"
                dd.iconId=null;                  
                dd.name="имя"
                dd.texts={}
                dd.texts.ru="ru";
                dd.texts.en="en";
                dd.resur=aa[i];
                oi.array.push(dd);*/

            }


            /*oi=new BTovar(this);
            oi.setResur(this.c3.hron.object.resurs)
            oi.idArr=this.array.length;
            this.array.push(oi);*/

   
            this.setCJ(this.cj)
        } 
        
    }


    this.uuidTovar="хрен его знает"
    //ТОвар сыпиться с п20 пирога
    this.setTovar=function(tovar){        
        if(tovar!=undefined){
            if(tovar.uuid==undefined)tovar.uuid=this.generateRendom(2);
            if(tovar.uuid!==this.uuidTovar){
                this.uuidTovar=tovar.uuid;
                if(tovar.obj.colorJSON){
                    for (var i = 0; i < this.array.length; i++) {
                        this.array[i].setKusook(tovar.obj.colorJSON.array[i])
                    }
                }               
            }
        }
    }

   
    this.cj=null
    this.setCJ=function(cj){ 
        
        if(cj==null)return
        this.cj=cj    
        
        for (var i = 0; i < cj.array.length; i++) {
            if(cj.array[i].type)if(cj.array[i].type=="mat"){

                if(this.array[i])this.array[i].setKusook(cj.array[i])
                continue
            }
            break

        }
    }


    var b
    //?????????????????????????????????????????
    this.setOp20=function(op20){
        b=false;
        if(this.op20==undefined){
            this.op20=op20
            b=true;
        }else{            
            b=true;
            this.op20=op20;
        }
    }


    //дает пачку на изменения  [0,3,6] нижнии блоки дернут инлексы второго уровня
    this.setColArr=function(arr){

        if(arr==null){           
            for (var i = 0; i < this.array.length; i++) {
                this.array[i].index=-1
            }
        }else{           
            for (var i = 0; i < this.array.length; i++) {   
                this.array[i].index=arr[i]                         
            }
        }       
    }


    //от номера шага дерева возврощает 3д обьект/////////////
    var no={n:0}
    this.getNum=function(num){
        no.n=0;      
        return this.getNum2(this.c3,no,num);
    }   
    this.getNum2=function(_c3d, onn, n1){        
        if(onn.n==n1) return _c3d
        onn.n++;   
        for (var i = 0; i < _c3d.children.length; i++) {
            if(this.getNum2(_c3d.children[i],onn,n1)!=null)return _c3d.children[i]
        } 
        return null
    }
    /////////////////////////////////////////////////////////


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
    this.uuid=this.generateRendom(2)

    this.initIz();  
}



///////////////////////////////////////////////////////////////////////////////////
//один чувак в списке спены цвета либо позиций хранит масив изменений своей групы
///////////////////////////////////////////////////////////////////////////////////
export class BTovar {
    constructor(par ) {  
        var self=this
        this.par=par;
        this.param=this.par.param
        this.tipe="mat";
        this.type="Tovar";        

        this.children=[]
        this.matBase=undefined
        this._index=-1;
        this._material=null;

        this.ooo =undefined
        this.resur=undefined
        this.rObj=undefined
        this.oooArray=[]
        //ВАЖНО  Сюда приходит настройка цветовой политры от товара
        var bb
        this.setKusook=function(ooo){
            this.ooo = ooo 
            if(this.ooo==undefined)return
            if(this.ooo.ct==-1){

                this.oooArray=this.ooo.array;
            }else{
                bb=null
              

                if(this.param.obJscenes3d && this.param.obJscenes3d[this.ooo.ct]){
                    
                    
                    self.oooArray=this.param.obJscenes3d[this.ooo.ct].json.array;
                }else{
                    
                    mhbd.getKeyId("scenes3d",this.ooo.ct,function(e){                        
                        self.oooArray=e.json.array;
                        self.dragIndex(); 
                    })
                }

                //this.oooArray=this.ooo.array;
            }
            


            this.dragIndex()          
        }

        //при mat хватаем 3д дитей для замены цвета
        this.addChild=function(c){
            if(this.tipe=="mat"){//дети 3д модели
                if(this.matBase==undefined)if(c)if(c.material!=undefined){
                    
                    this.matBase=c.material;
                    this._material=c.material;
                }
                this.children.push(c)
            }
            

            if(this.tipe=="res"){//дети есть обьект для изи смены главного
                this.children.push(c)
            }
            
        }

        var col=null

        //от сетера
        this.dragIndex=function(){
            
            if(self.ooo==undefined) return
            if(self.oooArray==undefined) return
            if(self.oooArray[this._index]==undefined) return 
            
            if(this.tipe=="res"){ //меняем позиционое состояние от редактора
                
                self.par.par.par.iz.setMod(self.par.c3,this.children[this._index],false)
                
                return
            }

            if(this.tipe=="mat"){//меняем цвета детей                
                var mat=this.matBase;
                if(self.oooArray[this._index]){                   
                    if(self.oooArray[this._index].d3MatId!=-1){

                        col=undefined
                        if(self.oooArray[this._index].d3MatColor!=null)col={color:self.oooArray[this._index].d3MatColor}
                        mat=self.par.par.par.matDop.getIDObj(self.oooArray[this._index].d3MatId,col);
                        
                    }
                }
                self.material=mat
            }
        }


        //одноразовая хрень токо на прием
        this.axz=null
        this.setResur=function(resur){
           /* this.tipe="res"
            this.resur=resur;             
            if(this.axz==null){
                this.axz=[]
                for (var i = 0; i < resur.array.length; i++) {
                    this.axz[i]=JSON.parse(resur.array[i].i1.split('|').join('"'))
                }
            }  */          
        }
    }


    set material(value) {
        if(this._material==null || this._material.uuid!=value.uuid ){

            this._material = value; 
            for (var i = 0; i < this.children.length; i++) {
                if(this.children[i].material!=undefined)this.children[i].material=this._material
            }
        }
    }    
    get material() { return  this._material;}


    set index(value) {
        if(this._index!=value){
            this._index = value; 
            this.dragIndex()
        }
    }    
    get index() { return  this._index;}
}



