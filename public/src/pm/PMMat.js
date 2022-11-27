


export default function PMMat(par, visi3D, objbase) { 
	this.type="PMMat";
    var self=this;

    this.par=par
    this.visi3D=visi3D
    this.objbase=objbase;

    this.pmTexture = this.par.tex;
    this.ser = window.location.href;

    var arrParams = window.location.href.split("?"); 
            
    var arrParams2 = arrParams[0].split("/");

    this.param=this.par.param;
    this.nameType="materials";
    this.maxzls = this.param.materials

    this.matError=new THREE.MeshBasicMaterial( {color: 0xFF0000} )
 
    this.server=""
    for (var i = 0; i < arrParams2.length-1; i++) {
        this.server+=arrParams2[i]+"/"
    }
                






    this.setObjS = function (c3d,obj,fun){
        this.getTestTitleObj(c3d)
        fun()
    }   


    this.testObjMatLoad=function(c3d){
        
        if(c3d.children){
            for (var i = 0; i < c3d.children.length; i++) {
                if(this.testObjMatLoad(c3d.children[i])==false)return false
            }
        } 

        if(c3d.material){
            if(c3d.material.bLoad!=undefined){
                if(c3d.material.bLoad==false){
                    return false
                }
            }
        }


        return true;
    }


    
    //this.matarialArray=this.objbase.materials;
    this.matarialArray=this.param[this.nameType];
    var matarialArray=this.matarialArray
    this.idColor=null;
    var loader = new THREE.TextureLoader();
  
    this.obj={}


    this.arrayTitleId=null;

    this.getTestTitle=function(_text){        
        
        
        if(this.arrayTitleId==null)return null;

        //if(_text)return null;
        /*if(_text.length==0)return null;
        if(_text[0]==" ")return null;*/
    
        for (var i = 0; i < this.arrayTitleId.length; i++) {
            if(_text.indexOf(this.arrayTitleId[i].title)!=-1){
               
                return this.getIDReturn(this.arrayTitleId[i].id); 
            }
        }

        return null;


       /*  var r=null;      
       if(_text!=undefined){ 
           
            for (var i = 0; i < matarialArray.length; i++) { 
                
                if( matarialArray[i].title){
                    if(_text.indexOf(matarialArray[i].title)!=-1){
                        r=this.getIDReturn(matarialArray[i].id);           
                        return r;
                    } 
                } else{
                    if( matarialArray[i].json){
                        if( matarialArray[i].json.title){                            
                            if(_text.indexOf(matarialArray[i].json.title)!=-1){                                     
                                r=this.getIDReturn(matarialArray[i].id);           
                                return r;
                            } 

                        }
                    }
                } 
                          
                               
            }
        }
        return r*/
    }
    
    var rt
    this.getTestTitleObj=function(_o3d){ 

        if(_o3d.material){ 
             
            rt=this.getTestTitle(_o3d.material.name)         
            if(rt!=null)_o3d.material=rt;
        }
        for (var i = 0; i < _o3d.children.length; i++) {
            this.getTestTitleObj(_o3d.children[i])
        }
    }

    



    this.getIDReturn=function(id, isBD){
        return this.getIdmhbd(id, isBD)
       /* var r=null;
        var p=-1;    

        for (var i = 0; i < this.maxzls.length; i++) {
            if(this.maxzls[i].id==id){
                p=i;
            }
        }
      
        
        if(p==-1)return this.matError;
        var ooo=this.maxzls[p].json*/

       /* if(isBD==undefined){
            if(this.obj[id]!=undefined)return this.obj[id];
        }*/
        
      
      

        //if(ooo.obj.type==undefined)ooo.obj.type="MeshPhongMaterial";

     /*   const gradientMap = new THREE.DataTexture(  );
                    gradientMap.minFilter = THREE.NearestFilter;
                    gradientMap.magFilter = THREE.NearestFilter;
                    gradientMap.generateMipmaps = false;

        const material = new THREE.MeshToonMaterial({
            gradientMap: gradientMap
        
            });
        return material; */  

        
       /*var comand = 'new THREE.' + ooo.obj.type + '()';
        var m = eval(comand);
        m.idObj=matarialArray[p]
        this.startMat(m, id)
        this.obj[id]=m;
        m.idUz=id
        return m; */      
    }



    this.get=function(_title, _fun, bNameMat){        
        var r=null;
        var p=-1; 
        var s,s1,b;
        var id
        if(bNameMat!=undefined){//швишник может быть дленее по стрингу ищем его в базе   
            s=_title+""
            _title="2456567567867896789"            
            for (var i = 0; i < this.matarialArray.length; i++) {               
                s1=this.matarialArray[i].title+""               
                if(s.indexOf(s1)!=-1){                    
                    _title = this.matarialArray[i].title;
                    break;
                }
               
            }
        }    
        
        for (var i = 0; i < this.matarialArray.length; i++) {            
            if(this.matarialArray[i].title==_title){
                p=i;
            }
        }
       
        if(p==-1){
            _fun(null);
            return 
        }
        this.getId(this.matarialArray[p].id, _fun)
    }


    this.getId=function(id, _fun){
        var p=-1;
        for (var i = 0; i < this.matarialArray.length; i++) {   
            if(this.matarialArray[i].id == id){
                p=i;
                break;
            }
        }
        if(p==-1){
            _fun(null);
            return 
        } 

        if(this.obj[id]!=undefined){
            if(this.obj[id].bLoad==true){
                _fun(this.obj[id])
            }else{
                
                this.obj[id].arrFun.push(_fun)
            }
            
            
            return this.obj[id];
        }
        
        var comand = 'new THREE.' + this.matarialArray[p].key + '()';
        var m = eval(comand);  
        m.idObj=matarialArray[p]
        m.bLoad=false;
        m.loadTexure=999;
        m.arrFun=[_fun] 
          
        this.startMat(m, id)
        this.obj[id]=m;
        return m;       
    }



    this.getIdmhbd=function(id, isBD){
        if(isBD == undefined){
            if(this.obj[id]!=undefined)return this.obj[id];
        }
        
        if((id+"")[0]=="m") {
            var a=(id+"").split("_")
            id=a[1]*1
        }
        
      
        var m =new THREE.MeshPhongMaterial()      
        m.idUz=id
        mhbd.getKeyId("materials",id,function(e){
           
            m.userData=e
            self.startMat2(e.json, m)           
        })
        this.obj[id]=m;        
        return m;
    }


    var textur;
    this.objToMater=function(o,m){
        var s;
        
        for(var s in o){            
            if(m[s]!=undefined){
                if(m[s] instanceof THREE.Color ){                                    
                    m[s]=new THREE.Color(o[s]);
                }else{
                    if(s!="type"){                     
                        m[s]=o[s];
                    }                    
                }
            }
        }       

        m.loadTexure = 0;
        if (o.textur)if (typeof o.textur ==="object") {

            m.loadTexure = o.textur.length;
            for (var i = 0; i < o.textur.length; i++) {
                
                if (o.textur[i].id) {
                    let index = i;
                    textur = this.pmTexture.getById(o.textur[i].id, (t) => {
                        m[o.textur[index].name] = t;
                        --m.loadTexure;
                    });
                    m[o.textur[i].name] = textur;
                } else {
                    
                    var rr=mhbd.getLink(o.textur[i].res.src)//.replace("http://","https://")
                   
                    textur = loader.load(rr, function (t) {
                        if(self.visi3D)self.visi3D.intRend = 1;
                        m.loadTexure--;                        
                    })
                    textur.wrapS = textur.wrapT = THREE.RepeatWrapping;
                    textur.repeat.x = o.textur[i].rx;
                    textur.repeat.y = o.textur[i].ry;                    
                    m[o.textur[i].name] = textur
                }
            }
        }
     
        //m.wireframe=true;
        m.needsUpdate=true;
        m.bLoad=true;
        if(m.arrFun)
        for (var i = 0; i < m.arrFun.length; i++) {
            m.arrFun[i](m);
        }              
    }
      

    this.startMat=function(m, id){
          
        var po=null;
        for (var i = 0; i < this.matarialArray.length; i++) {   
            if(this.matarialArray[i].id == id){
                if(this.matarialArray[i].json){
                    if(typeof this.matarialArray[i].json === "string") {
                        po = JSON.parse(this.matarialArray[i].json)             
                    } else po = this.matarialArray[i].json;

                }

                break;
            }
        }
       
        if(po!=null){            
            self.startMat2(po,m);
            return 
        }


        var o;
        var l=this.server+"resources/data/"+id+"/config.json"+self.par.plus; 
        var obj={}
        obj.type= "GET";
        obj.url= this.param.server+this.nameType+"/"+id+"/";
        obj.success= function function_name(data) {           
            if(typeof data.json === "string") {
                o = JSON.parse(data.json)             
            } else o = data.json;
           
            self.startMat2(o,m)
                       
        }       
        $.ajax(obj)        
    }

    this.startMat2=function(o,m){
        
        if(o){

        }else{
            o={}
            o.mirro=0
            o.obj={}
        }
        
        if(o.mirro===true){
            if(self.visi3D)m.envMap=self.visi3D.getEnvMap()
        }else{
            if(o.mirro==0){
                
            }
            if(o.mirro==1){
                if(self.visi3D)m.envMap=self.visi3D.getEnvMap()
            }
            if(o.mirro==2){
                if(self.visi3D)m.envMap=self.visi3D.getEnvMap1()
            }
        }
        self.objToMater(o.obj,m);  
    }

}
