





export default function PMIz(par, visi3D, objbase) { 
	this.type="PMFilt";
	var self=this;

    this.par=par
    this.visi3D=visi3D
    this.objbase=objbase;


    
    this.setHron=function(hron, _c){
    	var o, c
    	o=hron.object.iz
    	c=hron.content3d;
    	if(_c)c=_c
    	if(c==undefined||o==undefined)return

    	if(o.a==true){

    		
    		

    		this.setMod(c,this.strToObj(o.str),o.st) 
    	} 
    }

    this.strToObj=function(s){       
        var ss=""
        for (var i = 0; i < s.length; i++) {                
            if(s[i]=='|')ss+='"'
            else ss+=s[i]    
        }
        var o = JSON.parse(ss)
        return o
    }







    ////////////////////////get///////////////////////////////////
    //------------------------------------------------------------
  	var sahMi, arrMi;
    this.getIz=function(_c3d){
        sahMi++;        
        if(_c3d.iz!=undefined){
            var o=0
            if(_c3d.iz.renderOrder!=undefined){
                if(o==0)o={}
                o.renderOrder=_c3d.iz.renderOrder;
            }

            if(_c3d.iz.bs!=undefined){
                if(o==0)o={}
                o.bs=_c3d.iz.bs;
            }


            if(_c3d.iz.mod!=undefined){
            	if(o==0)o={}
                o.mod=_c3d.iz.mod;
            }
            if(_c3d.iz.position!=undefined){
            	if(o==0)o={}
                o.position=_c3d.iz.position;
            }
            if(_c3d.iz.scale!=undefined){
            	if(o==0)o={}
                o.scale=_c3d.iz.scale;
            }
            if(_c3d.iz.rotation!=undefined){
            	if(o==0)o={}
                o.rotation=_c3d.iz.rotation;
            }
            if(_c3d.iz.visible!=undefined){
            	if(o==0)o={}
                o.visible=_c3d.iz.visible;
            }
            if(_c3d.iz.material!=undefined){
            	if(o==0)o={}
                
                o.material=_c3d.iz.material;
            }
            if(o!=0)o.sah=sahMi;
            arrMi.push(o)
        }else{
            arrMi.push(0)
        }

        if(_c3d.children && _c3d.notPar==undefined){
            for (var i = 0; i < _c3d.children.length; i++) {
                this.getIz(_c3d.children[i])
            }
        }        
    }

    this.getMod=function(_c3d){
        
        sahMi=-1;
        arrMi=[]
        this.getIz(_c3d)
        return arrMi;
    }
 	
    ////////////////////////set///////////////////////////////////
    //------------------------------------------------------------

    var aa
    this.setIz=function(_c3d, _bool){
        sahMi++;
        if(aa[sahMi]){
            if(aa[sahMi]!=0){
                _c3d.iz={}
               

                if(aa[sahMi].mod!=undefined){
                    if(_bool)_c3d.iz.mod=aa[sahMi].mod;
                    

                    var o=new THREE.Object3D()

                    var ii=0;
                    for (var i = 0; i < _c3d.parent.children.length; i++) {
                        if(_c3d.parent.children[i].uuid==_c3d.uuid)ii=i;
                    }

                    o.notPar=true
                    _c3d.parent.add(o)
                    _c3d.parent.remove(_c3d)

                    o.parent.children.splice(o.parent.children.length-1,1)
                    o.parent.children.splice(ii,0,o)
                    
                    self.par.getId(aa[sahMi].mod, function(c3d){
                        o.add(c3d)
                    })
                }



                if(aa[sahMi].renderOrder!=undefined){
                    if(_bool)_c3d.iz.renderOrder=aa[sahMi].renderOrder
                    _c3d.renderOrder =  aa[sahMi].renderOrder
                }

                if(aa[sahMi].bs!=undefined){
                    if(_bool)_c3d.iz.bs=aa[sahMi].bs;
                    _c3d.bs =  aa[sahMi].bs;
                }


                if(aa[sahMi].position!=undefined){
                    if(_bool)_c3d.iz.position=aa[sahMi].position                   
                    _c3d.position.set(aa[sahMi].position.x,aa[sahMi].position.y,aa[sahMi].position.z)                   

                }
                if(aa[sahMi].scale!=undefined){
                    if(_bool)_c3d.iz.scale=aa[sahMi].scale
                    _c3d.scale.set(aa[sahMi].scale.x,aa[sahMi].scale.y,aa[sahMi].scale.z)
                }
                if(aa[sahMi].rotation!=undefined){
                    if(_bool)_c3d.iz.rotation=aa[sahMi].rotation
                    _c3d.rotation.set(aa[sahMi].rotation.x,aa[sahMi].rotation.y,aa[sahMi].rotation.z)  
                }            
                if(aa[sahMi].visible!=undefined){
                    if(_bool)_c3d.iz.visible=aa[sahMi].visible
                    _c3d.visible =  aa[sahMi].visible
                }

                if(aa[sahMi].material!=undefined){   
                    if(_c3d.material){
                    	if(_c3d.oldName==undefined){
                    		_c3d.oldName=_c3d.material.name
                    	}
                        if(_bool)_c3d.iz.material=aa[sahMi].material
                            
                        _c3d.material= self.par.matDop.getIDObj(aa[sahMi].material); 
                        

                    } 
                }
            }
        }else{
        	//return
        }           
       
        if(_c3d.children && _c3d.notPar==undefined){
            for (var i = 0; i < _c3d.children.length; i++) {
                this.setIz(_c3d.children[i])
            }
        }        
    }

    this.setMod=function(_c3d_,_a,b){        
       
        if(typeof _a != "object")return
        if(_a[0]==undefined)return	
        
        aa=_a
        sahMi=-1
        
        this.setIz(_c3d_,b)
     
    }

 	////////////////////////MAT///////////////////////////////////
    //------------------------------------------------------------   

    this.setMat=function(_c3d,_mat,_name,_bool){
        
        if(_bool!=undefined)  _bool=true
        if(_c3d.material!=undefined){            
            if(_c3d.oldName==undefined){                
                _c3d.oldName=_c3d.material.name;
            }
            //if(typeof _mat=="string")
                _mat=this.par.mat.getIDReturn(_mat, _bool)
         
            if(_name==null){
                _c3d.material=_mat;
                if(_c3d.iz==undefined)_c3d.iz={}
                _c3d.iz.material= _mat.idUz;                
            }
            else{                         
                if(_c3d.oldName){ 
                    if(_c3d.oldName.indexOf(_name)!=-1){
                    	

                        _c3d.material=_mat;  
                        if(_c3d.iz==undefined)_c3d.iz={}
                        _c3d.iz.material= _mat.idUz; 

                       
                    }
                }
            }            
        }

        if(_c3d.children){
            if(_c3d.notPar==undefined){
                for (var i = 0; i < _c3d.children.length; i++) {
                    this.setMat(_c3d.children[i],_mat,_name,_bool); 
                }
            }
        }
    }


}

