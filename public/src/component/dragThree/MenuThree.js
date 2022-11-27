

import { MThree } from './MThree.js';
import { DTParam } from './DTParam.js';

export class MenuThree  {
    constructor(par,fun) {  

        this.type="MenuThree";
        this.fun=fun
        this.par=par
        var self=this;
        this.param=par.param;

        this.dCont1=new DCont(par.dCont);
        this.dCont=new DCont();

        this._active=false;

       

        this.window=undefined

        var sah = 1;



        var pic =  function(n) {
            let linkPic  = '../../resources/forms/'
            let typePic  = 'w.png'
            sah = n != undefined ? n : sah
            let ret =  linkPic+sah+typePic
            sah += 1;

            return ret
        }

        this.init=function(){ 
            if(this.window!=undefined)return
            
            this.window=new DWindow(this.dCont,0,0," ")
            this.window.hasMinimizeButton=false;
            this.window.width=this.param.sizeBase;            
           
            this.dtParam=new DTParam(this,function(s,p,p1){                                
                if(s=="saveTime"){
                    self.saveTime();
                }
                if(s=="redragGalTime"){
                    self.mThree.redragGalTime();
                }

            });

            
            this.mThree=new MThree(this,function(s,p,p1){                               
                if(s=="saveTime"){
                    self.saveTime();
                }
                if(s=="open"){                    
                    self.dtParam.setObj(p);
                    self.poisk(p);
                }
            });
            this.mThree.height=200
            this.mThree.w.y=this.dtParam.panel.height+this.param.otstup*2+32

            this.window.height=this.mThree.w.y+this.mThree.height+this.param.otstup;


            var b=new DButton(this.window,this.window.width-2-28, 2, "x",function(){
                self.active=false;
            });
            b.width=b.height=28;
            b.boolFond=false;

            this.window.div.xss=true
            dragPic.addFunAp(function(e){
                if(self._active ==false ) return false;

                var r=self.window.div.getBoundingClientRect(); 
                r.width=self.window.width
                r.height=self.window.height

                if(dcmParam.globXY.x>=r.x&&dcmParam.globXY.x<=r.x+ r.width){
                    if(dcmParam.globXY.y>=r.y&&dcmParam.globXY.y<=r.y+ r.height){
                        trace("=@@@@@@@@@@@555555@@@@@@==",r)

                        self.mThree.setObj(dragPic.object);
                    }                        
                }


            })


            /*this.three=new DThree(this.window.content,2,this.mThree.height+this.mThree.w.y-30-2,function(o){                           
                self.mThree.openUUID(o.obj.uuid,true)
            });

            this.three.width=this.window.width-4
            this.three.height=this.window.height-4-this.three.y-28


            if(this.param.debug==true){



                new DButton(this.window,-150,0,"неТрогать!!!!",function(){

                    this.visible=false

                    new ClassDrundesNeUsing(self)

                }).width=150
            }*/

     
        }


    ////////////////////////////////
/*
    this.testPosit=function(e,div){            
        var b=false;
        var rect = div.getBoundingClientRect();   
        trace(rect)
       // if(e.target)if(e.target.offsetParent || e.target.parentElement){            
            b=self.recurs(e.target,div);
       // }


        return b
    }


    this.testEvent=function(e,div){            
        var b=false;        
        if(e.target)if(e.target.offsetParent || e.target.parentElement){            
            b=self.recurs(e.target,div);
        }
        return b
    }

    var ddd
    this.recurs=function(div,div1){
        ddd=null
        if(div.offsetParent!=undefined){
            ddd=div.offsetParent
        }
        if(div.parentElement!=undefined){
            ddd=div.parentElement
        } 
        if(ddd!=null){            
            if(ddd===div1){
                return true;
            }
            return this.recurs(ddd,div1)
        }
        return false
    }*/

    ///////////////////////////////
















        this.poisk=function(o){ 

        }



        this.poisk=function(o){ 
           /*  let p=-1
            for (var i = 0; i < this.three.bufferOt.length; i++) {
                
                if(this.three.bufferOt[i].obj.obj){                    
                    if(this.three.bufferOt[i].obj.obj.uuid==o.uuid){                        
                        p=i;
                        break;
                    }
                    
                }  
            }
            if(p==-1)return
            this.three.openTillId(p)
           this.three.openId(p)
            this.three.update()*/
        }

        this.poiskTT=function(){   

        }



        this.id=undefined;
        this.key=undefined;
        this.object=undefined;

        this.set=function(id,key){
     
            this.id=id;
            this.key=key;           

            

            $.ajax({
                type: "GET",
                url: this.param.server+this.key+"/"+this.id+"/",
                success: function function_name(data) {
                    self.active=true;
                    self.window.title=self.key+"::"+self.id;

                    self.window.x=0;
                    self.window.y=300;
                    if(typeof data.json === "string") {
                        var conf = JSON.parse(data.json)
                        self.object = conf;
                    } else self.object = data.json;

                    if(self.object==null){
                        self.object={};
                    }

                    if(self.object.three==null){
                        self.object.three={};
                    }  
                    self.start()                    
                }
            })
        }

       /* setTimeout(function() {

            self.set(2, "scenes3d")
        }, 10);*/


        this.save=function(){ 
            var o={
                type: "PUT",
                url: this.param.server+this.key+"/"+this.id+"/",
                data:{
                    json:JSON.stringify(this.object)
                },
                success: function function_name(data) { 
                    
                },
                error:function function_name(data) {
                    console.error("не верная загрузка xz")
                }
            }

            o.headers = {
                'Authorization': 'Token ' + mhbd.token
            };

            
            $.ajax(o);

           // this.three.setObj(this.object.three,"array","name");

        }

        this.sah=0
        this.saveTime=function(){
            this.sah++;
            var s=this.sah;
            setTimeout(function() {
                if(self.sah==s)self.save();
            }, 500);


        }




        this.start=function(){ 
            this.mThree.startObj(self.object.three)
         //  this.three.setObj(this.object.three,"array","name");
        }





        this.setParam=function(){ 
       
            this.window.x=this.param.otstup;
            this.window.y=this.param.otstup*4+this.param.wh;
            this.window.y=350;
           /* this.window.height=this.param.wh


            if(this.param.mobile==true){
                this.window.width=this.param.wh+this.param.otstup*2;
            }else{
                this.window.width=this.param.wb+this.param.otstup*2;
            }  */



            this.sizeWindow()
        }

        

        var w,h,s
        this.sizeWindow = function(_w,_h,_s){
            if(_w){
                w=_w;
                h=_h;
                s=_s;
            }
            //h/s-(this.param.otstup*5+this.param.wh)                 
        }
    }

    set active(value) {
        if (this._active != value) {
            this._active = value; 
            this.init()  
            if(value==true){
                this.dCont1.add(this.dCont)
            }else{
                this.dCont1.remove(this.dCont)
            }
      
                                          
        }             
    }
    get active() { return this._active; }
}


export class ClassDrundesNeUsing  {
    constructor(par) {  
        var self=this
        this.data
        this.object

        this.init = function(){
            for (var i = 0; i < this.data.length; i++) {
              

                this.data[i].children=""
                this.data[i].parent=-1;


            } 

         
            

            this.setOOO(this.object.three.array[0],-2)

            for (var i = 0; i < this.data.length; i++) {
               

                mhbd.setParam("group", this.data[i].id, "parent", this.data[i].parent)      

                mhbd.setParam("group", this.data[i].id, "children", this.data[i].children)  
            }

        }


        this.setOOO = function(o,parId){
            var oooo=this.getIdGroup(o.id);
            oooo.parent=parId;

            var s="";
            for (var i = 0; i < o.array.length; i++) {
                this.setOOO(o.array[i], oooo.id)

                if(i==0){
                    s+=""+o.array[i].id
                }else{
                    s+=","+o.array[i].id
                }
            }

            oooo.children=s;
        }




        this.getIdGroup = function(id){
            for (var i = 0; i < this.data.length; i++) {
                if(this.data[i].id==id)return this.data[i]

            }
            return null
        }




        mhbd.getKeyList('group', function(data){           
            self.data= data;
            self.object=par.object;
            self.init();       
            //self.setGroup(data)  



        })


    }     

}