



export class Languages  {
  	constructor(array) {  		
  		this.type="Languages";
  		var self=this;

        
        this.a=array

        this._key=array[0].key

        this.array=[];
        this.arrayC=[];

        this.setCompObj=function(comp, obj, type, fun) {
            this.array.push(new DBLeng(comp, obj, type, fun));
            this.dragDB(this.array[this.array.length-1])
        }

        this.dragDB=function(db){
            db.setKey(this._key)
        }


        this.setClass=function(clS){
            this.arrayC.push(clS);            
            clS.languages=this._key
        }

        this.arrayFun=[];
        
    }

    set key(value) {
        if(this._key!=value){
            this._key= value;   
            for (var i = 0; i < this.array.length; i++) {
                this.dragDB(this.array[i])
            } 

            for (var i = 0; i < this.arrayC.length; i++) {
                this.array[i].languages=this._key;
            }

            for (var i = 0; i < this.arrayFun.length; i++) {
                this.arrayFun[i](this._key);
            }
        }   
    }    
    get key() { return  this._key;}

}



export class DBLeng  {
    constructor(comp, obj, type, fun) {        
        this.type="DBLeng";
        var self=this;
        this.comp=comp;
        this.obj=obj;
        this.type="text";
        this.fun = fun
        if(type!=undefined) this.type=type

        var s=""
        this.setKey=function(key){
            s="null";
            if(obj)if(obj[key])s=obj[key];
            if(self.type)comp[self.type]=s
            if(self.fun)self.fun(key)
        }
    }

}



