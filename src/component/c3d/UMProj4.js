

export class UMProj4{  
  	constructor() { 
  		this.type="UMProj4";

        this.objProj4={}
        proj4.defs('WGS84', "+title=WGS 84 (long/lat) +proj=longlat +ellps=WGS84 +datum=WGS84 +units=degrees");

        this.objProj4['WGS84'] = new proj4.Proj('WGS84');/**/
       // this.objProj4['cil']=this.objProj4['WGS84']

        var vectRezXZ={x:0,y:0,z:0}
        var re=null
        var os,ov
        var arr1=[]
        var arr2=[]
        this.konvert=function(s,v,vect,vectRez){
         
            if(vectRez===undefined)vectRez=vectRezXZ;
            
            if(s==v){
                vectRez.x=vect.x;
                vectRez.y=vect.y;
                vectRez.z=vect.z;
                return vectRez                
            }
            
            if(vect.x==0 &&vect.y==0 &&vect.z==0 ){
                vectRez.x=0;
                vectRez.y=0;
                vectRez.z=0;
                return vectRez
            }

            if(s=="cil")s="WGS84";
            if(v=="cil")v="WGS84";
         
            if(s=="xyz" || v=="xyz"){
                return this.konvertXYZ(s,v,vect,vectRez)
            }
            if(s=="WGS84" || v=="WGS84"){
                return this.konvertWGS84(s,v,vect,vectRez)
            }
     

            
            os=this.getMetrik(s);
     
            ov=this.getMetrik(v);
           
            arr1[0]=vect.x;
            arr1[1]=vect.y;
            arr1[2]=vect.z;
        
            arr2 = proj4(os, ov, arr1); 
         
            vectRez.x=arr2[0];
            vectRez.y=arr2[1];
            vectRez.z=arr2[2];
            
            return vectRez
        }


        var vect111={x:0,y:0,z:0}
        var vect2
        this.konvertXYZ=function(s,v,vect,vectRez){
            if(s=="xyz"){//из xzy в мир
                let vv=this.c_xyz_cil(vect)
                let vv1={x:0,y:0,z:0}
                return this.konvert('WGS84',v,vv,vv1) 
                /*vect111=this.c_xyz_cil(vect)
                return this.konvert('WGS84',v,vect111,vectRez) 
                */            
            }
            if(v=="xyz"){//из xzy в мир
                
                let vv1={x:0,y:0,z:0}
                this.konvert(s,'WGS84',vect,vv1)
                let vv=this.c_cil_xyz(vv1);
                return vv
                /*this.konvert(s,'WGS84',vect,vect111)
                vect2=this.c_cil_xyz(vect111);
                vectRez.x=vect2.x;
                vectRez.y=vect2.y;
                vectRez.z=vect2.z;*/               
            }
            return vectRez
        }


        this.konvertWGS84=function(s,v,vect,vectRez){
           
            if(s=="WGS84"){//из xzy в мир
                

                os=this.getMetrik(s);     
                ov=this.getMetrik(v);
           
                arr1[0]=vect.x;
                arr1[1]=vect.y;
                arr1[2]=vect.z;
            
                arr2 = proj4(os, ov, arr1); 
             
                vectRez.x=arr2[1];
                vectRez.y=arr2[0];
                vectRez.z=arr2[2];
                return vectRez                           
            }
            if(v=="WGS84"){//из xzy в мир
                
                vect111.x=vect.y;
                vect111.y=vect.x;
                vect111.z=vect.z;
                
                os=this.getMetrik(s);     
                ov=this.getMetrik(v);
           
                arr1[0]=vect111.x;
                arr1[1]=vect111.y;
                arr1[2]=vect111.z;
            
                arr2 = proj4(os, ov, arr1); 
             
                vectRez.x=arr2[0];
                vectRez.y=arr2[1];
                vectRez.z=arr2[2];

                return vectRez                            
            }
            return vectRez
        }




        this.getMetrik=function(s){            
            if(isNaN(s)==true)s+="";
            if(this.objProj4[s]!=undefined)return this.objProj4[s]
            let _s="EPSG:"+s;
            proj4.defs(_s, proj4_list[_s])
            this.objProj4[s] = new proj4.Proj(_s);            
            return this.objProj4[s]
        }



        this.getArray = function () {  
            let a=[]
            let i=0
            let aa
            for (var s in proj4_list) {
                aa=s.split(":")
                a[i]=aa[1];
                i++
            }
            a.sort(function(a,b){return a-b})
            return a
        }

        var _point={x:0,y:0,z:0}
        var _point1={x:0,y:0,z:0}
        var _point2={x:0,y:0,z:0}

        var _pointNull={x:0,y:0,z:0}
        var angel, dist, dist1, dist3,angel2,s;
        var _pointR
        var vrxc = {x:0,y:0,z:0}
        var vr = {x:0,y:0,z:0}
        this._radius= 6378137; 
        this.scaleRad=1   
        this.c_xyz_cil=function(v){
            
            dist3=this.getDistance3d(_pointNull,v)
       
            
            _point.x=v.x;
            _point.y=v.z;

            dist=this.getDistance(_pointNull,_point);
            angel=-this.getAngle(_pointNull,_point);


            //if(dist3==0)dist3=0.000000001


            angel2=Math.PI/2-Math.acos(v.y/dist3);

            dist1=v.y;           

            vrxc.x=angel*180/Math.PI;
            vrxc.y=angel2*180/Math.PI; 
            vrxc.z=(dist3-this._radius)*this.scaleRad; 
            
            return vrxc
        }

        var vrcx = {x:0,y:0,z:0}
        this.c_cil_xyz=function(v){
            vrcx={x:0,y:0,z:0}
            this.getVector(this._radius,(v.y)/(180/Math.PI),_point)
            this.getVector(_point.x,-(v.x)/(180/Math.PI),_point1) 
                     
            s=this._radius/(this._radius+v.z/this.scaleRad)
            vrcx.x=_point1.x/s;
            vrcx.z=_point1.y/s; 
            vrcx.y=_point.y/s;
            return vrcx;
        }



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
