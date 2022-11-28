/***
Код свободный, и может быть использован в разных проектах как разработчиком так и другими программистами. Если юзаете диписуйте себя в шапку и мои контакты не удоляйте)))
Разработчик и владелец данного кода Сидоров Евгений vorodis2.
The code is free and can be used in different projects by both the developer and other programmers. If you use write yourself in a hat and do not delete my contacts)))
Developer and owner of this code Sidorov Evgeniy vorodis2.
contacts:
site: vorodis2
mail: vorodis2@gmail.com
skype: vorodis2
phone: +380951026557 
website: vorodis2.com
*/





export class UtilMetrik{  
  	constructor() { 
       		
  		this.type="UtilMetrik";
  		var self=this;
        this.array=[
            {name:"xyz",    vector:{x:0,y:0,z:0}, title:"xyz ||THREE.Vector3"},
            //{name:"xy2",    vector:{x:0,y:0,z:0}, title:"xy2 ||z:height"},
            {name:"WGS84",  vector:{x:0,y:0,z:0}, title:"WGS84 ||x:lat y:lon,z:высота"},
            {name:"EPSG",    vector:{x:0,y:0,z:0}, title:"EPSG ||x:lat y:lon,z:высота"},
            {name:"cil",    vector:{x:0,y:0,z:0}, title:"cil ||x:lat y:lon,z:высота 0-сброс 9null"},
            {name:"i8c",    vector:{x:0,y:0,z:0}, title:"i8c ||x,y:celind, z:radius "},
            //{name:"box",    vector:{x:0,y:0,z:0}, title:"box ||x:posit,y:min"},
        ]
        
        this.miroY=1
        this.miroX=1
        this.scaleRad=1
        this._radius= 6378137;

        this.isCesium=false;
        var v4Bag={x: 111060.3860593643, y: 1018743.1300558416, z: 0};
        this.pz={x:0, y:0, z:0}

        this.funNaher

        this.get=function(k,k1,v){
            
            if(this.funNaher!==undefined){
                return this.funNaher(k,k1,v)
            }
            
            if(k==k1) return {x:v.x,y:v.y,z:v.z}
            
            return this["c_"+k+"_"+k1](v)//this.utilFun.get(k,k1,v)
        }

        var  rd
        this.c_WGS84_EPSG=function(v){ 
            console.warn("@@@@##c_WGS84_EPSG")           
            point.x=v.x;
            point.y=v.y;
            const p = new proj4.Point(v.x, v.y);
            rd = proj4.transform(sourceProj, destProj, p);            
            let vr={x:0,y:0,z:0}
            vr.x=Math.random()*100;    
            return vr
        }

        ///////////////////////////////
        var _point={x:0,y:0,z:0}
        var _point1={x:0,y:0,z:0}
        var _point2={x:0,y:0,z:0}

        var _pointNull={x:0,y:0,z:0}
        var angel, dist, dist1, dist3,angel2,s;
        var _pointR
        this._radius1=20037508.34*2
        //////////////25500367.83

        var Cartesian3_to_WGS84 = function (point) {
            console.warn("@@@@##Cartesian3_to_WGS84") 
            var cartesian33 = new Cesium.Cartesian3(point.x, point.y, point.z);
            var cartographic = Cesium.Cartographic.fromCartesian(cartesian33);
            var lat = Cesium.Math.toDegrees(cartographic.latitude);
            var lng = Cesium.Math.toDegrees(cartographic.longitude);
            var alt = cartographic.height;
            return {lng: lng, lat: lat, alt: alt};
        }



        this.c_WGS84_xyz=function(v){ 
            console.warn("@@@@##c_WGS84_xyz") 
            let vr=this.c_WGS84_cil(v);
            return this.c_cil_xyz(vr);
        }
        this.c_WGS84_cil=function(v){ 
             console.warn("@@@@##c_WGS84_cil") 
            let vr={x:0,y:0,z:0}
            vr.x=(v.x/this._radius1)*180*this.miroX+this.pz.x;
            vr.y=(v.y/(this._radius1*2))*180*this.miroY+this.pz.y;
            vr.z=v.z +this.pz.z
            return vr;
        }


        this.c_xyz_WGS84=function(v){ 
            console.warn("@@@@##c_xyz_WGS84") 
            let vr=this.c_xyz_cil(v)
            vr.x=(vr.x*this.miroX-this.pz.x)/180*this._radius1;
            vr.y=(vr.y*this.miroY-this.pz.y)/180*(this._radius1*2);
            vr.z-=this.pz.z;               
            return vr
        }



        this.c_xyz_cil=function(v){
            console.warn("@@@@##c_xyz_cil") 
            dist3=this.getDistance3d(_pointNull,v)

            let vr={x:0,y:0,z:0}
            _point.x=v.x;
            _point.y=v.z;
            dist=this.getDistance(_pointNull,_point);
            angel=-this.getAngle(_pointNull,_point);

            angel2=Math.PI/2-Math.acos(v.y/dist3);

            dist1=v.y;           

            vr.x=angel*180/Math.PI;
            vr.y=angel2*180/Math.PI; 
            vr.z=(dist3-this._radius)*this.scaleRad; 
            
            return vr
        }

        ///////////////////////////////////

        this.c_cil_xyz=function(v){
            console.warn("@@@@##c_cil_xyz") 
            let vr={x:0,y:0,z:0}
            this.getVector(this._radius,(v.y)/(180/Math.PI),_point)
            this.getVector(_point.x,-(v.x)/(180/Math.PI),_point1)            
            s=this._radius/(this._radius+v.z/this.scaleRad)
            vr.x=_point1.x/s;
            vr.z=_point1.y/s; 
            vr.y=_point.y/s;
            return vr;
        }
        
        
       
        this.c_cil_WGS84=function(v){ 
            console.warn("@@@@##c_cil_WGS84") 
            let vr={x:0,y:0,z:0}
            vr.x=v.x/180*this._radius1*this.miroX;
            vr.y=v.y/180*(this._radius1*2)*this.miroY; 
            vr.z=v.z; 
            return vr;
        }





        ////////////c_xyz_i8b/////////////////
        var a=[]; 
        var ss;
        var ii,sah,lmm
        this.c_i8b_xyz=function(v){
             console.warn("@@@@&&&&") 
            let vr={x:0,y:0,z:0};
            ss=v.x+""+v.y;
            sah=0
            for (var i = 0; i < ss.length; i++) {
                a[i]=ss[i]*1;
            }
            lmm=v.z;
            if(isNaN(lmm)==true)lmm=1;
            if(lmm<1)lmm=1;
            if(lmm>32)lmm=32;
            a.length=lmm//2//
            _rect.x=0;
            _rect.y=0;
            _rect.z=0;
            _rect.id=0;
            _rect.whd=this.radius*2;

            for (var i = 0; i < a.length; i++) {
                if(this.c_pRecww(a[i],_rect)==false)break
                sah++;
            } 

            vr.x=_rect.x;
            vr.y=_rect.y;
            vr.z=_rect.z;
            return vr;
        }

        this.c_pRecww=function(n,r){
            //let p = this.getNum(n,sah1-sah)
            if(n==1){this.setPR(-1,1,-1,r,n)  ;return true ;}               
            if(n==2){this.setPR(1,1,-1,r,n)   ;return true ;} 
            if(n==3){this.setPR(-1,1,1,r,n)   ;return true ;}           
            if(n==4){this.setPR(1,1,1,r,n)    ;return true ;} 

            if(n==5){this.setPR(-1,-1,1,r,n)    ;return true ;} 
            if(n==6){this.setPR(1,-1,1,r,n)    ;return true ;} 
            if(n==7){this.setPR(-1,-1,-1,r,n)    ;return true ;} 
            if(n==8){this.setPR(1,-1,-1,r,n)    ;return true ;}  

            return false;  
        } 

        this.setPR=function(n,n1,n2,r,t){
            zdvigV[0]=n;            
            zdvigV[1]=n1;
            zdvigV[2]=n2;
            
            r.whd/=2
            rss=r.whd//2
            r.x=r.x+zdvigV[0]*rss
            r.y=r.y+zdvigV[1]*rss
            r.z=r.z+zdvigV[2]*rss

        }



        var _rect = {x:0,y:0,z:0,whd:0,id:0};
        var rp,rp1;
        var kol9=32;
        this.c_xyz_i8b=function(v){
            let vr={x:0,y:0,z:kol9}
            _rect.x=0;
            _rect.y=0;
            _rect.z=0;
            _rect.id=0;
            _rect.whd=this._radius*4;
            if(vr.z<=16){
                this.c_plusRec(v, _rect,  1, vr.z);
                vr.x = _rect.id; 
                vr.y = 0;
            }else{
                this.c_plusRec(v, _rect,  1, 16);
                vr.x = _rect.id;             
                _rect.id=0;
                this.c_plusRec(v, _rect,  1, vr.z-16);
                vr.y = _rect.id;
            }
            return vr            
        }
        this.c_cil_i8b=function(v){
            let vr=this.c_cil_xyz(v);
            return this.c_xyz_i8b(vr);
        }


        this.c_plusRec=function(v,r,sah,sah1){
            let p = this.pR1(v,r)
            rp1=sah1-sah
            rp=this.getDDD(p,rp1);            
            r.id=r.id+rp            
            if(sah<sah1)this.c_plusRec(v,r,sah+1,sah1);             
        } 

        var ryy=0;
        var rss=0;
        var zdvigV=[0,0,0];
        this.pR1=function(v,r){ 
            ryy=0;
            if(v.x>r.x){
                zdvigV[0]=1;                
                if(v.y>r.y){
                    zdvigV[1]=1;                    
                    if(v.z>r.z){
                        zdvigV[2]=1;
                        ryy=4
                    }else{
                        zdvigV[2]=-1;
                        ryy=2
                    }
                }else{
                    zdvigV[1]=-1;
                    if(v.z>r.z){
                        zdvigV[2]=1;
                        ryy=6;                       
                    }else{
                        zdvigV[2]=-1;
                        ryy=8;                        
                    }
                }
                
            }else{
                zdvigV[0]=-1;
               if(v.y>r.y){
                    zdvigV[1]=1;                    
                    if(v.z>r.z){
                        zdvigV[2]=1;
                        ryy=3
                    }else{
                        zdvigV[2]=-1;
                        ryy=1
                    }
                }else{
                    zdvigV[1]=-1;
                    if(v.z>r.z){
                        zdvigV[2]=1;
                        ryy=5;                       
                    }else{
                        zdvigV[2]=-1;
                        ryy=7;                        
                    }
                }
            }
            r.whd/=2
            rss=r.whd/2
            r.x=r.x+zdvigV[0]*rss
            r.y=r.y+zdvigV[1]*rss
            r.z=r.z+zdvigV[2]*rss
            return ryy;
        }



        ///////////c_xyz_i8c///////////////// 
        this.sota=[
            null,
            {x:0,y:0,z:1},//1            
            {x:0,y:0,z:-1},// 2

            {x:1,y:0,z:0},//1
            {x:0,y:1,z:0},// 2
            {x:0,y:-1,z:0},//1
            {x:-1,y:0,z:0},// 2
          
        ]


        this.c_i8c_xyz=function(v){
            let vr={x:0,y:0,z:0}
            _rect.x=0;
            _rect.y=0;
            _rect.z=0;
            _rect.rt=v.y;
            _rect.id="";
            _rect.whd=this._radius;

            var a=[]
            for (var i = 0; i < v.x.length; i++) {
                a[i]=v.x[i]*1
            }
            
            sah=0
            for (var i = 0; i < a.length; i++) {
            //for (var i = 0; i < 2; i++) {    
                this.nee(_rect,a[i]);
                sah++
            }
            vr.x=_rect.x;
            vr.y=_rect.y;
            vr.z=_rect.z;
            return vr
        }
        var rew
        this.nee=function(r,v){
            
            rew=this.sota[v]
         
            r.x+=rew.x*r.whd/this.zs;
            r.y+=rew.y*r.whd/this.zs;
            r.z+=rew.z*r.whd/this.zs;
            r.whd=r.whd/2*this.zs;            
        }





        this.c_xyz_i8c=function(v,m){
            let vr={x:0,y:1,z:0}
            if(m)vr.y=m;
            _rect.x=0;
            _rect.y=0;
            _rect.z=0;
            _rect.rt=vr.y
            _rect.id="";
            _rect.whd=this._radius*4;
            this.daa(_rect,v,0)            
            vr.x=_rect.id;
            return vr
        }



        var ii;
        var ppi,ddd,ddd1
        var rew=1
        var ddsdf
        var kolS=this.sota.length
        var df=100000
        this.zs=1.161803398875//1.11111///61803398875
        this.zsOt=1/this.zs
        

        this.daa=function(r,v,sah){
            ppi=0;
            ddd=999999999999999999999999999999999999999999999999999999999
            for (ii = 1; ii < kolS; ii++) {

                _point.x=r.x+_rect.whd*this.sota[ii].x*this.zsOt;
                _point.y=r.y+_rect.whd*this.sota[ii].y*this.zsOt;
                _point.z=r.z+_rect.whd*this.sota[ii].z*this.zsOt;
                ddd1=this.getDistance3d(_point,v)
                  
             
                if(ddd1<ddd){

                    ddd=ddd1;
                    ppi=ii;
                    _point1.x=_point.x;
                    _point1.y=_point.y;
                    _point1.z=_point.z;
                }
            }

            if(ppi!=0){ 
                ddsdf=r.whd/2/this.zsOt
                if(ddsdf<r.rt)return
                var rr=4    
                r.x=r.x+_rect.whd/rr*this.sota[ppi].x*this.zsOt;
                r.y=r.y+_rect.whd/rr*this.sota[ppi].y*this.zsOt;
                r.z=r.z+_rect.whd/rr*this.sota[ppi].z*this.zsOt;
                r.id+=ppi;                             
                r.whd=ddsdf
                this.daa(r,v,sah+1)
                
            }            
        } 


        this.drag8cr=function(r,v){
            r.id+=this.daa(r,v)            
        }   


        var ii
        this.getDDD = function (n, k) { 
            let r=n;
            for (ii = 0; ii < k; ii++) {
                r*=10
            }
            return r;
        };

        this.getAngle = function (a, b) {           
            return Math.atan2(b.y - a.y, b.x - a.x);
        };
        this.getDistance3d = function (p1, p2) {                    
            return Math.sqrt(Math.pow((p1.x - p2.x), 2) + Math.pow((p1.y - p2.y), 2)+ Math.pow((p1.z - p2.z), 2));
        };
        this.getDistance = function (p1, p2) {        
            return Math.sqrt(Math.pow((p1.x - p2.x), 2) + Math.pow((p1.y - p2.y), 2));
        };
        this.getVector = function (length, angle, point) {
            if (point == undefined) var point = new THREE.Vector2(0, 0);
            if (length < 0) angle += Math.PI;
            point.x = Math.abs(length) * Math.cos(angle);
            point.y = Math.abs(length) * Math.sin(angle);
            return point;
        }  		
    }

    set radius(value) {        
        if(this._radius!=value){
            this._radius = value;
                          
        }
    }    
    get radius() { return  this._radius;}  


    set radius1(value) {        
        if(this._radius1!=value){
            this._radius1 = value;
                            
        }
    }    
    get radius1() { return  this._radius1;}  

}
