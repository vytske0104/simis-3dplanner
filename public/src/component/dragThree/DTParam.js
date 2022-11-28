
import { MenuConfigList } from './menuConfig/MenuConfigList.js';
export class DTParam  {
    constructor(par,fun) {          
        this.type="DTParam";
        this.fun=fun
        this.par=par
        var self=this
        this.param=par.param;
        this.otstup=par.param.otstup

        this.dCont = new DCont();
        this.par.window.content.add(this.dCont);


        this.panel=new DPanel(this.dCont,this.otstup,this.otstup)
        this.panel.width=this.par.window.width-this.otstup*2

        this.drag=function () {
            if(!self.object) return
            self.object.name=arr[0].value
            self.object.title=arr[1].value
            self.object.strB=arr[2].value

            
           // self.object.color=colorise1.value

            self.object.key = arr[7].value
            self.object.id  = arr[8].value*1



            for (var i = 0; i < aatt.length; i++) {
                self.object.arrText[i]=aatt[i].value
            }



           /* let o=JSON.parse(arr[5].value)
            if(o){
                if(typeof o =="object" ){
                    self.object.obj=o;                    
                    
                }
            }*/
            self.fun("saveTime");
            if(this.param=="id"||this.param=="key"){
                self.fun("redragGalTime");
            }           
        }

        


        var ooo=40
        var hhh=this.param.fontSizeLittel+this.otstup*2
        var arr=[];
        var yy=this.otstup;
        var ll=new DLabel(this.panel,this.otstup,yy,"uuid")
        arr[3]=new DLabel(this.panel,this.otstup+ooo,yy,"uuid",this.drag);               
        arr[3].width=this.panel.width
        arr[3].fontSize=ll.fontSize=this.param.fontSizeLittel 
        yy+=this.param.fontSizeLittel+this.otstup;


        var ll=new DLabel(this.panel,this.otstup,yy+hhh-this.param.fontSizeLittel,"key / id")
        ll.fontSize=this.param.fontSizeLittel 
        var ww2=Math.round((this.panel.width-ooo-this.otstup*3)/2)-1
        arr[7]=new DInput(this.panel,this.otstup+ooo,yy,"key",this.drag)
        arr[7].param="key"
        arr[7].width=ww2
        arr[7].timeFun=1;

        arr[8]=new DInput(this.panel,this.otstup*2+ooo+ww2,yy,"id",this.drag)
        arr[8].param="id"
        arr[8].width=ww2
        arr[8].timeFun=1;
        arr[7].fontSize=arr[8].fontSize=this.param.fontSizeLittel
        arr[7].height=arr[8].height=hhh
        yy+=hhh+this.otstup;    



       // var colorise1 = new DColor(this.panel,this.panel.width+4,yy-2,"", this.drag);





       // yy+=colorise1.height+this.param.otstup;

        var ll=new DLabel(this.panel,this.otstup,yy+hhh-this.param.fontSizeLittel,"name")
        ll.fontSize=this.param.fontSizeLittel 
        arr[0]=new DInput(this.panel,this.otstup+ooo,yy,"name",this.drag)
        arr[0].param="name"
        arr[0].width=this.panel.width-ooo-this.otstup*2;
        arr[0].timeFun=1;
        arr[0].height=hhh
        arr[0].fontSize=this.param.fontSizeLittel
        yy+=hhh+this.otstup;

       

        var ll=new DLabel(this.panel,this.otstup,yy+hhh-this.param.fontSizeLittel,"title")
        ll.fontSize=this.param.fontSizeLittel 
        arr[1]=new DInput(this.panel,this.otstup+ooo,yy,"title",this.drag)
        arr[1].param="str"
        arr[1].width=this.panel.width-ooo-this.otstup*2;
        arr[1].timeFun=1;
        arr[1].height=hhh
        arr[1].fontSize=this.param.fontSizeLittel
        yy+=hhh+this.otstup;        


        var ll=new DLabel(this.panel,this.otstup,yy+hhh-this.param.fontSizeLittel,"strB")
        ll.fontSize=this.param.fontSizeLittel 
        arr[2]=new DStrBool(this.panel, this.otstup+ooo, yy,"0000000",this.drag)
        arr[2].param="strB";
        arr[2].height=23;

        yy+=arr[2].height+this.otstup; 

      
        var ll=new DLabel(this.panel,this.otstup,yy+hhh-this.param.fontSizeLittel,"arrText")
        ll.fontSize=this.param.fontSizeLittel 
        var ww4=Math.round((this.panel.width-ooo-this.otstup*6)/4)
        var aatt=[]
        var t=(this.panel.width-(6+ooo))/4
        for (var i = 0; i < 4; i++) {
            aatt[i]=new DInput(this.panel,this.otstup+ooo+(ww4+this.otstup)*i,yy,"",this.drag)
            aatt[i].width=ww4
            aatt[i].height=24
            aatt[i].timeFun=1
            aatt[i].height=hhh
            aatt[i].fontSize=this.param.fontSizeLittel
        }

        yy+=hhh+this.otstup; 

      /*  var ll=new DLabel(this.panel,this.otstup,yy+hhh*2-this.param.fontSizeLittel,"obj")
        ll.fontSize=this.param.fontSizeLittel;  
        arr[5]=new DTextArea(this.panel,this.otstup+ooo,yy,"{}",this.drag)
        arr[5].param="obj";
        arr[5].width=this.panel.width-ooo-this.otstup*2;
        arr[5].timeFun=1;
        arr[5].height=hhh*2
        arr[5].fontSize=this.param.fontSizeLittel;

        yy+=hhh*2+this.otstup;*/ 


        /*this.menuConf=new MenuConfigList(this, function(s,p){ 
            if(s=="saveTime"){
                self.object.obj=this.objBase
                arr[5].value= JSON.stringify(self.object.obj);
                
                self.drag()
            }
            if(s =="closeWin"){
                arr[6].value=false
                this.active=false
            }
            if(s =="creatJson"){
                arr[5].value = p
                self.drag()
                self.menuConf.setObj(self.object.obj)
            }
            if(s =="listJson"){
                arr[5].value = p
                self.drag()
                self.menuConf.setObj(self.object.obj)
            }
        })
        this.menuConf.dCont.x = this.panel.width+this.param.otstup;
        this.menuConf.dCont.y = 0
        this.menuConf.active=false

        arr[6]=new DCheckBox(this.panel,2,yy+32, ' ', function(s,p){ 
            self.menuConf.active=this.value

            if(this.value==true)arr[5].value= JSON.stringify(self.object.obj);
            if(this.value==true)self.menuConf.setObj(self.object.obj)

        })*/

        //this.menuConf.setObj(ooo,["Obj","List","Creat"])


       

        this.panel.height=yy


        this.object
        this.setObj=function (o) {
            var b=false
            this.object=o

            if(this.object.name==undefined){this.object.name="name"+Math.round(Math.random()*100);b=true}
            if(this.object.title==undefined){this.object.title="title"+Math.round(Math.random()*100);b=true}
            if(this.object.arrText==undefined){
                this.object.arrText=[];
                this.object.arrText[0]="0";
                this.object.arrText[1]="0";
                this.object.arrText[2]="0";
                this.object.arrText[3]="0";
                //for (var i = 0; i < aatt.length; i++)this.object.arrText[i]=""+i      
                b=true
            }

            if(this.object.strB==undefined){this.object.strB="0000000";b=true}
            if(this.object.uuid==undefined){this.object.uuid=this.generateRendom(2);b=true}
            //if(this.object.obj==undefined){this.object.obj={};b=true}
            //if(this.object.key==undefined){this.object.key="xz";b=true}


            if(b==true)self.fun("saveTime");


            arr[0].value= this.object.name; 
            arr[1].value= this.object.title;
            arr[2].value= this.object.strB;

            arr[3].value= this.object.uuid;

           // arr[4].value= this.object.key+" / "+this.object.id 
            arr[7].value= this.object.key
            arr[8].value= this.object.id 



            //if(this.object.color=="#008CBA")this.object.color="#ffffff";
            //if(this.object.color==undefined)this.object.color="#ffffff";    
           // if(this.object.color=="undefined")this.object.color="#ffffff";  
         
           // colorise1.value = this.object.color


        /*    if(colorise1.value != dcmParam.color && colorise1.value != undefined) colorise1.visible = true
            else colorise1.visible = false*/

            for (var i = 0; i < aatt.length; i++) {
                aatt[i].value=this.object.arrText[i];
            } 


            //arr[5].value= JSON.stringify(this.object.obj);

           // if(arr[6].value==true)this.menuConf.setObj(this.object.obj)

        }


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


        
    }
}


export class DStrBool extends DCont {
    constructor(dCont, _x, _y, _value,_fun, at) {
        super();



        this.type = 'DStrBool';
        this.dcmParam = dcmParam;
        this.fun=_fun
        var self=this

        this.at=at ||[0,0,0,0,0,0,0,0]

        this.x = _x || 0;
        this.y = _y || 0;
        if (dCont != undefined) if (dCont.add != undefined) dCont.add(this);
        this._width = 0;
        this._height = 32;

        this.array=[]


        this.sob= function () {
            var s=""
             for (var i = 0; i < self.array.length; i++) {
                if(self.array[i].visible!=false){
                    if(self.array[i].value){
                        s+="1";
                    }else{
                        s+="0";
                    }
                }else{
                    break
                }
            }
            self._value=s;
            if(self.fun)self.fun()
        }

        this.drag = function () {
            for (var i = 0; i < this.array.length; i++) {
                this.array[i].visible=false
            }

            for (var i = 0; i < this._value.length; i++) {
                if(this.array[i]==undefined){
                    var rr=""
                    if(this.at[i]!=undefined)rr=this.at[i]
                    this.array[i]=new DCheckBox(this,0,0,"",this.sob)
                    this.array[i].label.visible=false
                    
                    /*let l=new DLabel(this,50,0,rr)
                    l.width=800
                    l.fontSize=10
                    l.activMouse=false

                    this.array[i].l=l;*/
                   /* this.array[i].label.width=800
                    this.array[i].label.activeMouse=false
                    this.array[i].width = 11;*/
                }
                this.array[i].visible=true

                if(this._value[i]==0){
                    this.array[i].value=false;
                }else{
                    this.array[i].value=true;
                }

            }

            this.drag1()
        }

        this.drag1= function () {
            var sah=0;
            var sah1=this._height+1;
            for (var i = 0; i < this.array.length; i++) {
                if(this.array[i].visible!=false){
                    this.array[i].width=this._height;
                    this.array[i].height=this._height;
                    this.array[i].x=sah;
                    //this.array[i].l.y=sah+8;
                    sah+=(this._height+1)
                    sah1+=(this._height+1)
                }else{
                    break
                }
            }

            this._width=sah1
        }

        this.value=_value
    }
    set x(value) {this.position.x = value; }
    get x() {return this.position.x;}

    set y(value) {this.position.y = value;}
    get y() {return this.position.y;}

    set value(value) {
        if (this._value != value) {
            this._value = value+"";
            
            this.drag();
        }
    }
    get value() {
        return this._value;
    }

    set width(value) {
        if (this._width != value) {
            this._width = value;          
        }
    }
    get width() {
        return this._width;
    }

    set height(value) {
        if (this._height != value) {
            this._height = value;           
            this.drag1();
        }
    }
    get height() {
        return this._height;
    }


}


