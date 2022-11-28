



export  function MSort(par, cont) {  // May be killed. It is not using anywhere.
    var self=this   
    this.type="MSort";
    this.par=par;
    
    this._sort=-3;

    this.otstup=aGlaf.otstup;
    this.wh=aGlaf.wh;
    this.whv=aGlaf.whv;
    this.widthBig=aGlaf.widthBig;

    this.dCont=new DCont(cont);
    this.panel=new DPanel(this.dCont, this.otstup, 34);
    this.panel.height=32;
    this.panel.width= this.widthBig-this.otstup*2;

    this.kol=5;
    var ww=(130) / this.kol;

    this.bAll=new DButton(this.panel.content, this.otstup+156, this.otstup ,"A", function(){
        self.par.sort=-1;   
    }) 
    this.bAll.width=ww+4;
    this.bAll.height=this.panel.height-this.otstup*4;
    

    this.bNot=new DButton(this.panel.content, this.otstup, this.otstup ,"N", function(){
        self.par.sort=-2;   
    }) 
    this.bNot.width=ww-2;
    this.bNot.height=this.panel.height-this.otstup*4
    this.bNot.alpha=0.5;
    
    this.aaaa=[];
    for (var i = 0; i < this.kol; i++) {
        this.aaaa[i] = new DButton(this.panel.content, ww-2+this.otstup*2+(ww)*i, this.otstup ,i+"", function(){
            self.par.sort=this.idArr;
        })
        this.aaaa[i].width=ww-2;
        this.aaaa[i].idArr=i;
        this.aaaa[i].height=this.panel.height-this.otstup*4;
    }


    this.testXY=function(_x,_y){
        var r=null;
        for (var i = 0; i < this.aaaa.length; i++) {
            if(this.testXY2(this.aaaa[i],_x,_y)==true)return i;
        }

        if(this.testXY2(this.aaaa[0],_x+32,_y)==true){
            return -1;
        }

        if(this.testXY2(this.bAll,_x,_y)==true)return -1;


        return r;
    }

    this.getBigPar=function(o, p){
        if(o.parent==undefined)return o;
        
        if(o.x)p.x+=o.x;
        if(o.y)p.y+=o.y;
        return this.getBigPar(o.parent, p)
    }
    
    var oo1={x:0,y:0}
    this.testXY2=function(_o,_x,_y){
        oo1.x=0        
        oo1.y=0

        this.getBigPar(_o, oo1);
        if(oo1.x<_x)if(oo1.x+_o.width>_x){
            if(oo1.y<_y)if(oo1.y+_o.height>_y){                
                return true
            }            
        }
        return false;
    }   


    Object.defineProperty(this, "sort", {
        set: function (value) {            
            if(this._sort!=value){
                this._sort=value; 
                this.bAll.alpha=1;
                this.bNot.alpha=1;
                
                for (var i = 0; i < this.kol; i++) {
                    if(i==this._sort){
                        this.aaaa[i].alpha=0.5;
                    }else{
                        this.aaaa[i].alpha=1;
                    }                    
                }
                if(this._sort==-1)this.bAll.alpha=0.5;
                if(this._sort==-2)this.bNot.alpha=0.5;
            }           
        },
        get: function () {
            return this._sort;
        }
    });
}


