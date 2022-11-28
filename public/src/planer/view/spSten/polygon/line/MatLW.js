





export class MatLW {
  	constructor(par) {    		
        this.type="MatLW";
        var self=this;
        this.par=par


        this.rrr=50+this.par.par.par.arrPol.length*25
        
        this.array=[];
        this.arrayCech=[];

        this.content3d = new THREE.Object3D();
        this.par.par.content3d.add(this.content3d);

        var blok
        this.get=function(){
            for (var i = 0; i <  this.arrayCech.length; i++) {
                if( this.arrayCech[i]._active==true)continue
                this.arrayCech[i].active=true    
                return  this.arrayCech[i]
            }

            blok=new LWBlok(this, this.sob)
            blok.idArr=this.arrayCech.length
            this.arrayCech.push(blok)
            return blok;
        }




        this.drag=function(){
            

            this.poiskLine()
        }


        this.minZ=999999999999
        this.maxZ=-999999999999

        this.dragBig=function(){
            
            this.minZ=999999999999
            this.maxZ=-999999999999
            for (var i = 0; i < this.array.length; i++) {
                if(this.array[i].spVPXz.position.z>this.maxZ)this.maxZ=this.array[i].spVPXz.position.z
                if(this.array[i].spVPXz.position.z<this.minZ)this.minZ=this.array[i].spVPXz.position.z    
            }    
            

            for (var i = 0; i < this.array.length; i++) {
                
                this.dragB2(this.array[i])
            }
        }

        var rrr
        this.dragB2=function(bl){
            bl.drag();
            rrr=null;
            for (var i = 0; i < this.par.par.par.arrPol.length; i++) {
                if(this.par.par.par.arrPol[i].idArr!==this.par.par.idArr){                    
                    if(this.par.par.par.arrPol[i].unikName=="PubRoof"){
                        
                        for (var j = 0; j < this.par.par.par.arrPol[i].unik.matLW.array.length; j++) {
                            bl.drag();
                            rrr=bl.isLWBlok(this.par.par.par.arrPol[i].unik.matLW.array[j])
                            if(rrr!=null){
                                
                                i=j=99999999
                                break
                               
                            }
                        }
                    }
                }
                bl.inBlok=rrr;
                bl.dragB2();
            }


        }





        this.clearArr=function(){
            this.array.length=0
        }

        var bb,ii
        this.korektArr=function(){
            

            this.clearArr();
            for (var i = 0; i < self.par.par.array.length; i++) {
                bb=this.get();
                ii=i+1
                if(ii==self.par.par.array.length)ii=0
                bb.setSPS(self.par.par.array[i],self.par.par.array[ii]);
                this.array[i]=bb
            }
        }



        var bool
        //ищем и создаюм линии
        this.poiskLine=function(){
            bool=true;
            if(this.array.length!==self.par.par.array.length)bool=false

            if(bool==true){                
                for (var i = 0; i < this.array.length; i++) {                  
                    if(this.array[i].spVPXz.uuid!=self.par.par.array[i].uuid){
                        bool=false                        
                        break
                    }                    
                } 
            }


            if(bool==false){
                this.korektArr()
            }
            this.dragBig()
        }    

    }
}







import {TLabel} from '../../../../../t3d/TStyle.js';

export class LWBlok {
    constructor(par, fun) {         
        this.type="LWBlok";        
        var self=this;
        this.par=par;
        this.fun=fun;
        this._active=true;
        this.key="gRTip";
        var rrr=this.par.rrr;
        this.spVPXz = null;
        this.spVPXz1 = null;

        this.debug=false;//mhbd.param.debug


        if(this.debug==true){
            this.content3d = new THREE.Object3D();
            this.par.content3d.add(this.content3d);
            this.content3d.visible=this._active;

            this.mesh=new THREE.Mesh(p20.boxBufferGeometry,p20.meshBasicMaterial)
            this.mesh.scale.set(3,3,rrr*2)
            this.content3d.add(this.mesh)


            this.tLabel=new TLabel(this.content3d,10,0,"0");
            this.tLabel.cTMaterial=p20.meshBasicMaterial
            this.tLabel.mesh.material=this.tLabel.cTMaterial
            this.tLabel.object3d.rotation.x=Math.PI
            this.tLabel.object3d.position.z=-rrr


        }

       



        this.distans=100

        this.bool=false//горизонтальны ли


        this.tip=-1
        this.tip2=-1
        this.abAct=1//горизонтальны ли
        this.acBool=true

        this.setSPS=function(s,s1){
            var b=false
            if(this.spVPXz==null){
                this.spVPXz=s;
                b=true;
            }else{
                if(this.spVPXz.uuid!==s.uuid){
                    this.spVPXz=s;
                    b=true;
                }
            }

            if(this.spVPXz1==null){
                this.spVPXz1=s1;
                b=true;
            }else{
                if(this.spVPXz1.uuid!==s1.uuid){
                    this.spVPXz1=s1;
                    b=true;
                }
            }
            return b;
        }

        this.pCent=new THREE.Vector3()


        this.drag=function(){
            this.pCent.x=(this.spVPXz.position.x+this.spVPXz1.position.x)/2
            this.pCent.y=(this.spVPXz.position.y+this.spVPXz1.position.y)/2
            this.pCent.z=-(this.spVPXz.position.z+this.spVPXz1.position.z)/2-30

            if(this.content3d)this.content3d.position.copy(this.pCent);

            this.dragTip();

            this.distans=this.getDist3D(this.spVPXz.position,this.spVPXz1.position)
        }

        this.getDist3D = function (p1, p2) {
            return Math.sqrt(Math.pow((p1.x-p2.x), 2) + Math.pow((p1.y-p2.y), 2) + Math.pow((p1.z - p2.z), 2))      
        };

        this._inBlok=null;
        var _inBlok;
        this.isLWBlok=function(_blok){            
            _inBlok=null;
            if(this.isPos(this.spVPXz,_blok.spVPXz)==true||this.isPos(this.spVPXz1,_blok.spVPXz)==true){
                if(this.isPos(this.spVPXz,_blok.spVPXz1)==true||this.isPos(this.spVPXz1,_blok.spVPXz1)==true){
                    _inBlok=_blok;                   
                }
            }

            return _inBlok;
        }


        this.isPos=function(b,b1){  
            if(b.position.x==b1.position.x) if(b.position.y==b1.position.y)if(b.position.z==b1.position.z) return true
            return false
        }



        this.dragTip=function(){ 
            this.abAct=1    
            this.tip=-1
         
            if(this.spVPXz.position.z==this.spVPXz1.position.z){
                this.bool=true;
            }else{
                this.bool=false
            }

            if(this.bool==true){
                if(this.spVPXz.position.z==this.par.minZ){
                    this.tip=1
                }
                if(this.spVPXz.position.z==this.par.maxZ){
                    this.tip=5
                }
            }else{
                this.tip=2
            }  
            this.tip2=this.tip

        }

        this.dragB2=function(){ 
            this.abAct=1
            this.acBool=true
            var s= this.tip+" "
            if(this._inBlok==null){
                s+="0"                
            }else{
                s+="1"; 
                if(this._inBlok.par.par.par.idArr>this.par.par.par.idArr) {
                    this.abAct=0
                    this.acBool=true
                }else{
                    this.acBool=false
                }             
            }

            this.tip2=this.tip

            if(this.abAct==0){
                this.dragB3()
            }

            s+=" : "+this.tip2+" : "+this.abAct+" "+this.acBool;



            if(this.content3d)this.tLabel.text=s
        }

        //если активный то меняем тип 2
        this.dragB3=function(){
            //trace("```^^",this.tip, this._inBlok.tip )
            ///////////////////////////////////
            if(this.tip==5){
                if(this._inBlok.tip==1){
                    this.tip2=6;
                }
            }
            if(this.tip==5){
                if(this._inBlok.tip==5){
                    this.tip2=3;
                }
            }
            if(this.tip==1){
                //if(this._inBlok.tip==5){
                    this.tip2=6;
                //}
            }

            if(this.tip==2){
                if(this._inBlok.tip==2){
                    this.tip2=4;
                }
            }

           /* if(this.tip==1){
                if(this._inBlok.tip==5){
                    this.tip2=6;
                }
            }
            if(this.tip==5){
                if(this._inBlok.tip==5){
                    this.tip2=3;
                }
            }

            if(this.tip==1){
                if(this._inBlok.tip==1){
                    this.tip2=7;
                }
            }
            if(this.tip==5){
                if(this._inBlok.tip==5){
                    this.tip2=6;
                }
            }*/

            /////////////////////////////

        }


    }

    set inBlok(value) {
        if(this._inBlok==null&&value!==null){//собераем
            if(value.inBlok==null){
                this._inBlok = value; 
                value.inBlok=this;
                value.dragB2()
                
            }            
        }
        if(this._inBlok!==null&&value==null){//разрываем
            if(this._inBlok.inBlok!==null){
                var bb=this._inBlok
                this._inBlok= value; 
                bb.inBlok=null;
                bb.dragB2()

            }            
        }

        if(this._inBlok == value){
            return
        } 
        this._inBlok= value;    
        
    }    
    get inBlok() { return  this._inBlok;}

    

    set active(value) {        
        if(this._active == value){
            return
        } 
        this._active= value;    
        this.content3d.visible=this._active;    
    }    
    get active() { return  this._active;}
}
