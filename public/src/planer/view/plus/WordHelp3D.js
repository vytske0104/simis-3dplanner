

export class WordHelp3D  {
    constructor(cont3d,matDefolt) {
    	this.type="WordHelp3D";    	
        var self = this;
        this.cont3d=cont3d;
        this.boxGeometry = new THREE.BoxGeometry( 1,1,1)
        this.cylinderGeometry = new THREE.CylinderGeometry( 1,1,1,22)
        this.sphereGeometry = new THREE.SphereGeometry( 0.5, 16, 16 )

        this.size=1;

        if(matDefolt)this.matDefolt=matDefolt
        else this.matDefolt=new THREE.MeshBasicMaterial({color:0x0000ff});

        this.content3d=new THREE.Object3D();
        if(cont3d)cont3d.add(this.content3d);


        this.array=[]
        this.get=function(s){
            for (var i = 0; i < this.array.length; i++) {
                if(this.array[i].type!==s)continue
                if(this.array[i].visible==true)continue
                this.array[i].visible=true;    
                return this.array[i]   
            }
            
            if(s=="WHLine")this.array[this.array.length]=new WHLine(this.content3d,this.matDefolt,this.cylinderGeometry);
            if(s=="WHPint")this.array[this.array.length]=new WHPint(this.content3d,this.matDefolt,this.sphereGeometry);
            
            return this.array[this.array.length-1]   
        }   


        this.clear=function(){
            for (var i = 0; i < this.array.length; i++) {
                this.array[i].visible=false
            } 
            visi3D.intRend=1   
        }


        this.setLine=function(v,v1,mat,size,otstup){          
            
            let line=this.get("WHLine");

            if(otstup){
                this.draggP3(v,v1,otstup)
                line.setVects(vect,vect2);
            }else{
                line.setVects(v,v1);
            } 

            if(size)line.size=size
            else line.size=this.size;

            if(mat)line.material=mat;
            else line.material=this.matDefolt;
            
        }
        this.setLines=function(aV,mat,size){

        }

        this.setPoint=function(v,mat,size){
            let point=this.get("WHPint");            
            point.setVect(v);
            if(size)point.size=size
            else point.size=this.size;

            if(mat)point.material=mat;
            else point.material=this.matDefolt;
        }

        var vect=new THREE.Vector3();
        var vect1=new THREE.Vector3();
        var vect2=new THREE.Vector3();
        var vect3=new THREE.Vector3(); 
        var dd,ds

        this.draggP3=function(v,v1,num){
            vect1.x=(v.x+v1.x)/2;
            vect1.y=(v.y+v1.y)/2;
            vect1.z=(v.z+v1.z)/2;

            dd=this.getDistance(v,v1)/2;
            ds=(dd+num)/dd
            vect.x=(v.x-vect1.x)*ds+vect1.x;
            vect.y=(v.y-vect1.y)*ds+vect1.y;
            vect.z=(v.z-vect1.z)*ds+vect1.z;




            vect2.x=(v1.x-vect1.x)*ds+vect1.x;
            vect2.y=(v1.y-vect1.y)*ds+vect1.y;
            vect2.z=(v1.z-vect1.z)*ds+vect1.z;
        }

        this.getDistance = function (p1, p2) {
           return Math.sqrt(Math.pow((p1.x - p2.x), 2) + Math.pow((p1.y - p2.y), 2)+ Math.pow((p1.z - p2.z), 2));
        };



        this.setXSP=function(x, sten){
            if(sp==undefined)sp=facade.sp;

            ppp.x=x;
            ppp.y=-sten._delph/2;

            a=calc.getAngle(pNull, ppp);
            d=calc.getDistance(pNull, ppp);
            calc.getVector(d, a+sten._rotation, rez)
            rez.x+=sten._addPoint.position.x;
            rez.y+=sten._addPoint.position.y;

            vv.x=rez.x;
            vv.y=rez.y;
            vv.z=0;

            vv1.x=rez.x;
            vv1.y=rez.y;
            vv1.z=-9999;                
            this.setLine(vv,vv1)

            

        }


        //обходим здание 
        var sp=undefined
        var stenStart;
        this.setYSP=function(y, tip){
            if(sp==undefined)sp=facade.sp;
            
            stenStart=null
            for (var i = 0; i < sp.arrSplice.length; i++) {
                if(sp.arrSplice[i].life==true){
                    stenStart=sp.arrSplice[i]
                    break;
                }
            }
            if(stenStart==null)return
           
            this.setSten(stenStart, y, tip)    
        }

        var vv=new THREE.Vector3();
        var vv1=new THREE.Vector3();
        var vv3=new THREE.Vector3();
        this.setSten=function(sten, y, tip){
            //
            if(tip==0){
                vv.x=sten._addPoint.position.x;
                vv.y=sten._addPoint.position.y;
                vv.z=-y;

                vv1.x=sten._addPoint1.position.x;
                vv1.y=sten._addPoint1.position.y;
                vv1.z=-y;                
                this.setLine(vv,vv1)
            }

            if(tip==1){
                vv3=this.getPointGlobSten(sten,0,5)
                //trace(vv3)
                vv.x=vv3.x;
                vv.y=vv3.y;
                vv.z=-y;

                vv3=this.getPointGlobSten(sten,1,0)

                vv1.x=vv3.x;
                vv1.y=vv3.y;
                vv1.z=-y;                
                this.setLine(vv,vv1)
            }


            if(sten._addPoint1.uuid!=stenStart._addPoint.uuid){
                
                for (var i = 0; i < sten._addPoint1.arrSHron.length; i++) {
                    if(sten._addPoint1.arrSHron[i].sten.uuid!=sten.uuid){
                        
                        this.setSten(sten._addPoint1.arrSHron[i].sten, y, tip)
                    }
                }
            }
        }

        var rez=new THREE.Vector3();
        var ppp=new THREE.Vector3();
        var ppp1=new THREE.Vector3();
        var pNull=new THREE.Vector3();
        var a,d;
        this.getPointGlobSten=function(sten, sah, sah1, p){
            //trace(sten.arrPosit)
            //trace(sten.arrPosit1)
            if(p==undefined){
               if(sah==0){                
                    ppp.x=-sten.arrPosit[sah1].x;
                    ppp.y=sten.arrPosit[sah1].y; 
                }else{
                    ppp.x=sten.arrPosit1[sah1].x+sten._distans;
                    ppp.y=sten.arrPosit1[sah1].y; 
                } 
            }else{
                ppp.x=p.x;
                ppp.y=p.y; 
            }
            

            a=calc.getAngle(pNull, ppp);
            d=calc.getDistance(pNull, ppp);
            //trace("&&&",a,sten._rotation,d,"&&&==",ppp)
            calc.getVector(d, a+sten._rotation, rez)

            rez.x+=sten._addPoint.position.x;
            rez.y+=sten._addPoint.position.y;
            //trace(rez)
            //trace(ppp)
          
            return rez
        }


    }
} 

export class WHLine{
    constructor(cont3d,matDefolt,geom) {
        this.type="WHLine";     
        var self = this;
        this._visible=true
        this.cont3d=cont3d;
        this._size=1;
        this.content3d=new THREE.Object3D();
        if(cont3d)cont3d.add(this.content3d);
        this._matDefolt
        if(matDefolt)this._matDefolt=matDefolt
        else this._matDefolt=new THREE.MeshBasicMaterial({color:0x0000ff});

        this.mesh=new THREE.Mesh(geom, this._matDefolt);
        this.content3d.add(this.mesh)


        var vect=new THREE.Vector3();
        var vect1=new THREE.Vector3();
        var a,a1,d,c,c1;
        this.setVects=function(v,v1){
            vect.x=(v.x+v1.x)/2;
            vect.y=(v.y+v1.y)/2;
            vect.z=(v.z+v1.z)/2;

            a=this.getAngle(v,v1);            
            d=this.getDistance(v,v1);            
            c=v.z-v1.z;
            c1=Math.abs(c)
            a1=Math.asin(c1/d)          
            if(c<0)a1*=-1
            this.mesh.scale.y=d;
            this.mesh.rotation.z=Math.PI/2;
            this.mesh.rotation.y=a1
            this.content3d.rotation.z=a;
            this.content3d.position.copy(vect)
        }


        this.getAngle = function (a, b) {
            return Math.atan2(b.y - a.y, b.x - a.x);
        };

        this.getDistance = function (p1, p2) {
           return Math.sqrt(Math.pow((p1.x - p2.x), 2) + Math.pow((p1.y - p2.y), 2)+ Math.pow((p1.z - p2.z), 2));
        };

    }

    set visible(v) {        
        if(this._visible!=v){ 
            this._visible=v;            
            this.content3d.visible=v;     
        }       
    }   
    get visible() { return  this._visible;}

    set size(v) {        
        if(this._size!=v){ 
            this._size=v;            
            this.mesh.scale.x=v
            this.mesh.scale.z=v
        }       
    }   
    get size() { return  this._size;}    

    set matDefolt(v) {        
        if(this._matDefolt.uuid!=v.uuid){ 
            this._matDefolt=v;            
            this.mesh.material = this._matDefolt;  
        }       
    }   
    get matDefolt() { return  this._matDefolt;}


}

export class WHPint  {
    constructor(cont3d,matDefolt,geom) {
        this.type="WHPint";     
        var self = this;
        this._visible=true
        this._size=1;
        this.cont3d=cont3d;
        this.content3d=new THREE.Object3D();
        if(cont3d)cont3d.add(this.content3d);

        this._matDefolt
        if(matDefolt)this._matDefolt=matDefolt
        else this._matDefolt=new THREE.MeshBasicMaterial({color:0x0000ff});

        this.mesh=new THREE.Mesh(geom, this._matDefolt);
        this.content3d.add(this.mesh)


        this.setVect=function(v){
            this.content3d.position.set(v.x,v.y,v.z)
        }
    }

    set size(v) {        
        if(this._size!=v){ 
            this._size=v;            
            this.mesh.scale.set(v,v,v)
        }       
    }   
    get size() { return  this._size;}    

    set matDefolt(v) {        
        if(this._matDefolt.uuid!=v.uuid){ 
            this._matDefolt=v;            
            this.mesh.material = this._matDefolt;  
        }       
    }   
    get matDefolt() { return  this._matDefolt;}


    set visible(v) {        
        if(this._visible!=v){ 
            this._visible=v;            
            this.content3d.visible=v;     
        }       
    }   
    get visible() { return  this._visible;}

}



