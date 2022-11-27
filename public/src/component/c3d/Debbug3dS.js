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





export class Debbug3dS extends THREE.Object3D {  
  	constructor() { 
        super(); 		
  		this.type="Debbug3dS";
  		var self=this;
        
  		this._s=10;
  		this._p=10;
  		this._k=10;
  		this._r=10;

  		this._skoroct=1;


  		this.ag=[
  			new THREE.BoxBufferGeometry(1,1,1),
  			new THREE.SphereGeometry( 0.5, 32, 16),
  			new THREE.CylinderGeometry( 1, 1, 1, 32 )
  		]

  		this.am=[  		
  			new THREE.MeshPhongMaterial({color:0xffffff}),
  			new THREE.MeshPhongMaterial({color:0xff0000}),
  			new THREE.MeshPhongMaterial({color:0x00ff00}),
  			new THREE.MeshPhongMaterial({color:0x0000ff})
  		]

  		this.array=[];



  		this.redrag=function(){
  			for (var i = 0; i < this._k; i++) {
  				if(this.array[i]==undefined){
  					this.array[i]=new THREE.Mesh(
  						this.ag[Math.round((this.ag.length-1)*Math.random())],
  						this.am[Math.round((this.am.length-1)*Math.random())]
  						)
  					this.array[i].castShadow = true;
					this.array[i].receiveShadow = true;
  					this.add(this.array[i])
  					this.array[i].ss=0.1+Math.random()*0.9;	
  					this.array[i].px=1-Math.random()*2;
  					this.array[i].py=1-Math.random()*2;
  					this.array[i].pz=1-Math.random()*2;

  					this.array[i].ps=1-Math.random()*2;

  					this.array[i].rr=Math.random();

  					this.array[i].pss=0.01+Math.random()*0.1;
  					
  					this.array[i].position.set(
	  					this.array[i].px*this._p,
	  					this.array[i].py*this._p,
	  					this.array[i].pz*this._p
	  				)
                    
  				}
                if(this.array[i].parent==undefined)this.add(this.array[i])
  				
  			}
  			for (var i = this._k; i < this.array.length; i++) {
  				
                if(this.array[i].parent!==undefined)this.remove(this.array[i])
  			}

  			this.upDate();
  		}

  		this.upDate=function(){
  			for (var i = 0; i < this._k; i++) {
  				this.array[i].scale.set(this.array[i].ss*this._s,this.array[i].ss*this._s,this.array[i].ss*this._s)

  				this.array[i].rotation.set(
  					this.array[i].rr*this._r,
  					this.array[i].rr*this._r*1.5,
  					this.array[i].rr*this._r*2
  				)

  				if(this.array[i].ps>0){
  					this.array[i].ps+=this.array[i].pss;
  					if(this.array[i].ps>1){
  						this.array[i].ps>1
  					}
  				}

  				if(this.array[i].px>0){
  					this.array[i].position.x+=this.array[i].px*this._p*this.array[i].pss*this._skoroct*0.1
  					if(this.array[i].position.x>this._p){
  						this.array[i].px=-this.array[i].px;
  					}
  				}
  				if(this.array[i].px<0){
  					this.array[i].position.x+=this.array[i].px*this._p*this.array[i].pss*this._skoroct*0.1
  					if(this.array[i].position.x<-this._p){
  						this.array[i].px=-this.array[i].px;
  					}
  				}

  				if(this.array[i].py>0){
  					this.array[i].position.y+=this.array[i].py*this._p*this.array[i].pss*this._skoroct*0.1
  					if(this.array[i].position.y>this._p){
  						this.array[i].py=-this.array[i].py;
  					}
  				}
  				if(this.array[i].py<0){
  					this.array[i].position.y+=this.array[i].py*this._p*this.array[i].pss*this._skoroct*0.1
  					if(this.array[i].position.y<-this._p){
  						this.array[i].py=-this.array[i].py;
  					}
  				}

  				if(this.array[i].pz>0){
  					this.array[i].position.z+=this.array[i].pz*this._p*this.array[i].pss*this._skoroct*0.1
  					if(this.array[i].position.z>this._p){
  						this.array[i].pz=-this.array[i].pz;
  					}
  				}
  				if(this.array[i].pz<0){
  					this.array[i].position.z+=this.array[i].pz*this._p*this.array[i].pss*this._skoroct*0.1
  					if(this.array[i].position.z<-this._p){
  						this.array[i].pz=-this.array[i].pz;
  					}
  				}
  			}
  			
  			//if(window.visi3D!=undefined)visi3D.intRend=1;
  		}

        var wind
        this.debbug=false
        this.setDebbudCont=function(dCont,x,y,fun){
            if(wind!=undefined){
                dCont.add(wind)
                return
            }
            this.debbug=true
            var wind=new DWindow(dCont,x||0,y||0,"Debbug3dS_Debbud")
            wind.width=200;
            var pObject=new DParamObject(wind.content,2,2,function(){          
                if(fun)fun()
            },1);
            //pObject.tipRide=true;  
            pObject.width=wind.width-4;
            pObject.addObject(this);
            wind.height=pObject.height+36;


        }

  		this.redrag()
    }


    set s(value) {        
        if(this._s!=value){
            this._s= value;
            this.redrag();                  
        }
    }    
    get s() { return  this._s;} 

    set p(value) {        
        if(this._p!=value){
            this._p= value;
            for (var i = 0; i < this.array.length; i++) {

				this.array[i].position.set(
  					this.array[i].px*this._p,
  					this.array[i].py*this._p,
  					this.array[i].pz*this._p
  				)

  			}
            this.redrag();                  
        }
    }    
    get p() { return  this._p;}
    
    set k(value) {        
        if(this._k!=value){
            this._k = Math.round(value);
            this.redrag();                  
        }
    }    
    get k() { return  this._k;}

    set r(value) {        
        if(this._r!=value){
            this._r = Math.round(value);
            this.redrag();                  
        }
    }    
    get r() { return  this._r;}



    set skoroct(value) {        
        if(this._skoroct!=value){
            this._skoroct = value;
                            
        }
    }    
    get skoroct() { return  this._skoroct;}  

}


