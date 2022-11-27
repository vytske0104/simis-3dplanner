export class MHBDPHP {
    constructor(par) {          
    var self=this
    this.type="MHBDPHP"
    
    this.par=par;
    this.param=par.param;

    this.debug=false;
    if(this.param.debug)this.debug=this.param.debug 
    this.token=this.param.token
    this.idUzer=10;
    this.uzer=null;
    

    this.plusLinkKey="";

    var typeUzer = getURLParameters("typeUzer");
    if(typeUzer) {
        this.param.typeUzer=typeUzer;
    } 

    this.objectBase=null;
    this.load=function(fun){
       
        $.ajax({
            url: "resources/date/config.json?"+Math.random(),
            success: function function_name(data) {                         
                if(typeof data === "string") {
                    var conf = JSON.parse(data)
                    self.objectBase = conf;
                } else self.objectBase = data;
                start();           
                                 
            },
            error:function function_name(data) {
                self.objectBase ={}
          
                start();
            }
        }); 
        function start(){           
            if(self.objectBase.materials==undefined){self.objectBase.materials=[];self.saveTime()}
            if(self.objectBase.objects3d==undefined){self.objectBase.objects3d=[];self.saveTime()}            
            if(self.objectBase.textures==undefined){self.objectBase.textures=[];self.saveTime()}
            if(self.objectBase.scenes3d==undefined){self.objectBase.scenes3d=[];self.saveTime()}
            if(self.objectBase.info==undefined){self.objectBase.info=[];self.saveTime()}
            self.objectBase.info=[];
           
            if(self.objectBase.three==undefined){self.objectBase.three={};self.saveTime()}
            
            if(self.objectBase.scenes3d[1]==undefined){
                self.creat("scenes3d")
                self.creat("scenes3d")    
                       
            }
       
            fun()
          
           
        }
    }



    this.save=function(){ 
        var ss  =JSON.stringify(this.objectBase); 
        var l = "../resources/config.json";      
        trace(">>>>",this.objectBase);

        $.post(
            "src/component/MHBDPHP.php", 
            {tip:"saveJSON", link:"../../resources/date/config.json", text:JSON.stringify(this.objectBase)}, 
            function(data){ 
                trace("<<<",data);        
               
            }
        );


        /*aGlaf.php.load({tip:"saveJSON", link:l, text:ss},function(e){
            //self.saveLoad();

        });*/       
    }

    this.sah=0
    this.saveTime=function(){
        this.sah++;
        var s=this.sah;
        setTimeout(function() {
            if(self.sah==s)self.save();
        }, 100);
    } 




    this.deleteId=function(key,id,fun){
        
        for (var i = 0; i < self.objectBase[key].length; i++) {           
            if(id<=self.objectBase[key][i].id){

                $.post(
                    "src/component/MHBDPHP.php", 
                    {tip:'removeDirRec', dir:"../../resources/date/"+key+"/"+id}, 
                    function(data){  }
                );
                

                var o=self.objectBase[key][i];
                self.objectBase[key].splice(i,1)
                this.saveTime();
                if(fun)fun(o);
                return o
            }

        }

        if(fun)fun(null);
        return null       
    }

    this.creat=function(key,fun){
        var o={}
        var id=0
        for (var i = 0; i < self.objectBase[key].length; i++) {           
            if(id<=self.objectBase[key][i].id)id=self.objectBase[key][i].id;
        }
        o.id=id+1;
        o.ru=key+"_"+o.id+"_ru";
        o.en=key+"_"+o.id+"_en";
        o.name=key+"_"+o.id+"_name";
        o.sort=1;
        o.json={};
        o.icon= "not.png";
        o.iconId= -1;
        o.files=[];
        o.fname=[];
        self.objectBase[key].push(o);
        this.saveTime();

        
        $.post(
            "src/component/MHBDPHP.php", 
            {tip:'mkdir', dir:"../../resources/date/"+key+"/"+o.id}, 
            function(data){ 
                if(fun)fun(o);
            }
        );


        
        return o;
    } 


    /* ,
    file,    <= FormDataFile
    obj,     <= Obj to set in
    keyType, <= GroupName
    keyParam,<= For example "icon"
    fun      <= on success
    */
   /* this.setFile=function(file,obj,keyType,keyParam,fun){
       
        

        if(obj[keyParam+"Id"]!=undefined)if(obj[keyParam+"Id"]>=1){            
            var iK=obj[keyParam+"Id"];
            var o={}
            o.type="DELETE";
            o.url=this.param.server+keyType+"/files/"+iK+"/";
            o.success= function function_name(data) { 
                     
            }
            if(self.token)
            o.headers = {
                'Authorization': 'Token ' + self.token
            };


            $.ajax(o)
        }

        

        if(obj)if(obj[keyParam]){

        }
        


        var formData= new FormData(); 
        //formData.append('file', file);
        formData.append('src', file);
        formData.append('rel_obj', obj.id);  
        //formData.append(keyType+"_obj", obj.id); 




        
        var o={}
        o.type="POST";
        o.url=this.param.server+keyType+"/files/";

        o.data=formData;
        o.processData=false
        o.contentType=false

         if(self.token)
        o.headers = {
            'Authorization': 'Token ' + self.token
        };
        

        o.success= function function_name(data) { 
            
            obj[keyParam]=data.src;
            mhbd.setParam( keyType, obj.id, keyParam,data.src)
            

            if(obj[keyParam+"Id"]!=undefined){
                obj[keyParam+"Id"]=  data.id
                mhbd.setParam( keyType, obj.id, keyParam+"Id",data.id)
            } 

            let ss=data.src
           
            

            fun(ss);           
        }
        o.error=function function_name(data) {
            if(self.debug==true)console.error("не верная загрузка xУУУУУz")
        }        
        $.ajax(o);
    }*/

    this.getIdResCol=function(keyType){
        var _id=1;
        for (var i = 0; i < self.objectBase[keyType].length; i++) { 
            for (var j = 0; j < self.objectBase[keyType][i].files.length; j++) { 
              
                if(_id<=self.objectBase[keyType][i].files[j])_id=self.objectBase[keyType][i].files[j];
            } 
        }
        _id++
        return _id;
    }

    this.getIdResObj=function(keyType, id, bool){
        
        for (var i = 0; i < self.objectBase[keyType].length; i++) { 
            for (var j = 0; j < self.objectBase[keyType][i].files.length; j++) {  
                        
                if(id==self.objectBase[keyType][i].files[j]){
                    if(bool)return j

                    return self.objectBase[keyType][i];
                }
            } 
        }
        
        return null;
    } 


    
    this.saveFile=function(file,keyType,id,fun){       
        oo=this.getKeyId(keyType,id);
        if(oo==null){
            if(fun)fun(null);
           
        }
        var idK=this.getIdResCol(keyType);
        var name=idK+"-"+file.name;
        
        
       
        let data = new FormData();
        data.append('tip', 'saveFile');
        data.append('file', file);
        data.append('dest', "../../resources/date/"+keyType+"/"+id+"/"+name);


        return $.ajax({
            url: "src/component/MHBDPHP.php",
            dataType: 'text',
            cache: false,
            contentType: false,
            processData: false,
            data: data,
            type: 'post',
            success: function function_name(data) {                         
               
                if(oo.fname==undefined) oo.fname=[]
                oo.fname.push(name);    
                oo.files.push(idK);   
                self.save();             
                var o= {id: idK, src: 'date/'+keyType+'/'+id+'/'+name, rel_obj: id} 
                if(fun)fun(o)   
            }
        });
    }

    this.clearFile=function(keyType,id,fun){
        console.warn("deleteId>>clearFile =",keyType,id)
        var oo2=this.getIdResObj(keyType,id)
        if(oo2){
            var ii=this.getIdResObj(keyType,id,true)
            var n=oo2.fname[ii]


            
            var l="../../resources/date/"+keyType+"/"+oo2.id+"/"+n
        
            $.post(
                "src/component/MHBDPHP.php", 
                {tip:'unlink', dir:l}, 
                function(data){                    
                    oo2.fname.splice(ii,1);
                    oo2.files.splice(ii,1);
                    self.save();
                    if(fun)fun();
                }
            );
        }
    }



   




    var kkk,aa
    this.getKeyList=function(key,fun, bool, str, str1){       
        
        if(key.indexOf("sorts")!==-1){
            aa=key.split("/");
            if(aa[1]=="sorts"){
                var a=[]
                for (var i = 0; i < self.objectBase[aa[0]].length; i++) {

                    
                    
                    if(self.objectBase[aa[0]][i].sort==aa[2]*1){
                        a.push(self.objectBase[aa[0]][i])
                    }
                }
                if(fun)fun(a)
                return a
            }
        }   

        if(key.indexOf("sort")!==-1){

            aa=[
                {id: 1, name: 'Не установлено'},
                {id: 2, name: 'xz1'},
                {id: 3, name: 'xz2'},
                {id: 4, name: 'xz3'},
                {id: 5, name: 'xz4'}
            ]
            if(fun)fun(aa)
            return aa
        }


        if(self.objectBase[key]){
            if(fun)fun(self.objectBase[key])
            return self.objectBase[key] 
        }

        if(fun)fun(null);
        return null;
    }


    this.objId={}

    this.funGetKeyId=undefined
    var globIter = 0;
    this.getKeyId=function(key,id,fun, bool){       
        for (var i = 0; i < self.objectBase[key].length; i++) {
            if(self.objectBase[key][i].id==id){
          
                if(fun)fun(self.objectBase[key][i])
                return self.objectBase[key][i]
            }
        }
        if(fun)fun(null)
        return null;
    }



    var oo, pp
    this.setParam=function(keyType,id,param,value,fun){        
        oo=this.getKeyId(keyType,id)
        if(oo==null){
            if(fun)fun(null)
            return null;
        }

        if(oo[param]){
            pp=value
            if(typeof value === 'string'){
                if(value[0]){
                    if(value[0]=="{"||value[0]=="["){//Это джейсон
                        pp=JSON.parse(value)
                    }
                }
            }          
            oo[param]=pp;
            this.saveTime();
            if(fun)fun(oo)
            return oo;
        }


        if(fun)fun(null)
        return null;      
    }


    this.getArKey=function(key,id){
        for (var i = 0; i < this.param[key].length; i++) {
            if(this.param[key][i].id==id)return this.param[key][i]
        }
        return null;
    }   

    this.getURLParameters=function(paramName, url){
        return getURLParameters(paramName, url);
    }


    function getURLParameters(paramName, url){
            var sURL = window.document.URL.toString();
            if(url!=undefined){
                sURL=url
            }

            var arrParams = sURL.split("/");                        
            if (sURL.indexOf("?") > 0) {
                var arrParams = sURL.split("?");
                var arrURLParams = arrParams[1].split("&");
                var arrParamNames = new Array(arrURLParams.length);
                var arrParamValues = new Array(arrURLParams.length);

                arrParams = sURL.split("?");
                arrURLParams = arrParams[1].split("&");
                arrParamNames = new Array(arrURLParams.length);
                arrParamValues = new Array(arrURLParams.length);


                var i = 0;
                for (i = 0; i < arrURLParams.length; i++) {
                    var sParam =  arrURLParams[i].split("=");
                    arrParamNames[i] = sParam[0];
                    if (sParam[1] != "")
                        arrParamValues[i] = unescape(sParam[1]);
                    else
                        arrParamValues[i] = null;
                }

                for (i=0; i<arrURLParams.length; i++) {
                    if (arrParamNames[i] == paramName) {

                        return arrParamValues[i];
                    }
                }
                return null;
            }
        }

    
        var aaaa, oo,bbbb
        this.creatParamKategor=function(){
           /*
            for (var i = 0; i < this.param.group3.length; i++) {
                if(this.param.group3[i].name.indexOf("grabla")!=-1){
                    
                    aaaa=this.param.group3[i].name.split("_");
                    bbbb=aaaa[2].split(":");
                    let idd=aaaa[1]*1

                    

                    oo=this.getArKey("group",aaaa[1]*1);
                    if(oo){
                        if(oo.products==undefined)oo.products=[]
                        if(oo.productsObj==undefined)oo.productsObj=[]    
                            
                        
                        oo.products.push(this.param.group3[i].id);
                        oo.productsObj.push(this.param.group3[i]);
                    }

                    if(this.param.group3[i].type3d==undefined){

                    }

                    let o3d={}
                    o3d.type="material"
                    o3d.id=bbbb[0]*1;
                    o3d.color=bbbb[1];

                    o3d.typeNa="base";
                    o3d.w=bbbb[2]*1;
                    o3d.h=bbbb[3]*1;

                    o3d.price=aaaa[3]*1

                    this.param.group3[i].d3MatColor=bbbb[1]
                    this.param.group3[i].d3MatId=bbbb[0]*1

                    this.param.group3[i].d3Width=bbbb[2]*1
                    this.param.group3[i].d3Height=bbbb[3]*1
                   
                    this.param.group3[i].type3d=o3d;                    
                }
            }
            


            for (var i = 0; i < this.param.group2.length; i++) {
                if(this.param.group2[i].name.indexOf("grabla")!=-1){                    
                    aaaa=this.param.group2[i].name.split("_");

                    oo=this.getArKey("group3",aaaa[1]*1);
                    if(oo){
                        if(oo.sellers==undefined){
                            oo.sellers=[]
                            oo.sellersObj=[]
                        }
                        oo.sellers.push(this.param.group2[i].id);
                        oo.sellersObj.push(this.param.group2[i]);
                    }
                }
            }*/

      

            this.creatParamKategor1()
        }

        this.creatParamKategor1=function(){
            for (var i = 0; i < this.param.group.length; i++) {
                
                oo=this.param.group[i]
                if(oo.products){
                    oo.productsObj=[]; 


                    for (var j= 0; j < oo.products.length;j++) {
                        
                        var o=this.getArKey("group3", oo.products[j])
                        oo.productsObj[j]=o
                    }
                }  
            }


            

        }



        var aa, aa2
        this.getLink=function(_s){
            aa=_s.split('/')
            if(aa.length==1)return _s//прямой линк
            if(aa[0]=="date") {
                var ss=_s.replace('date', "resources/date/")
                return ss
                //this.param.host+_s;  
            }
            
            if(_s.indexOf('http://77.222.60.51')!=-1){
              
                return _s.replace('http://77.222.60.51', this.param.host)
            }

            if(aa[0]=="http:" ||aa[0]=="https:") return _s
           
            

            
            return _s
        } 

        this.setPHP = function(obj, fun){ 
            
            var s="src/component/MHBDPHP.php";        
            $.post(s, obj, function(data){          
                if (fun) fun(data);
            });

        }
    }
}