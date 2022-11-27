export class MHBD {
    constructor(par) {          
    var self=this
    this.type="MHBD"
    
    this.par=par;
    this.param=par.param;

    this.debug=false;
    if(this.param.debug)this.debug=this.param.debug
    //null;//
    this.token=this.param.token//"ebcaee0f2abc6fe72d303b19e540987163d59a4d"//"f5d07df49cfb415fe6a0ba05c689994c23722579";
    //this.token="ebcaee0f2abc6fe72d303b19e540987163d59a4d"
    //this.token=null;//this.token="19f83bef9ed91af86e1d36ee13c99d20dd5478ef"//41
    this.idUzer=10;
    this.uzer=null;
    

    this.plusLinkKey="";

    var typeUzer = getURLParameters("typeUzer");
    if(typeUzer) {
        this.param.typeUzer=typeUzer;
    } 

    this.load=function(fun){
        fun();
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
                if(self.debug==true)trace("ура Убили==",iK);       
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

    
    this.saveFile=function(file,keyType,id,fun){
       
        var formData= new FormData(); 
        //formData.append('file', file);
        formData.append('src', file);
        formData.append('rel_obj', id);
        

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
            fun(data);           
        }
        o.error=function function_name(data) {
            if(self.debug==true)console.error("larvijне верная загрузка xУУУУУz",data)
        } 
             
        $.ajax(o);
    }

    this.clearFile=function(keyType,id,fun){


        var o={}
        o.type="DELETE";
        o.url=this.param.server+keyType+"/files/"+id+"/";
        o.success= function function_name(data) { 
            
            if(fun)fun(data)    
        }
        if(self.token)
        o.headers = {
            'Authorization': 'Token ' + self.token
        };


        $.ajax(o)
       
    }



   




    var kkk
    this.getKeyList=function(key,fun, bool, str, str1){       
        if(bool==undefined){
            if(this.param[key]!=undefined){
                if(fun)fun(this.param[key])  
                return this.param[key]
            }
        }

        kkk="/"
        if(str!=undefined)kkk=str

        var o={};
        if(key.indexOf("/")!==-1) o.url= this.param.server+ key+this.plusLinkKey+kkk;
        else o.url= this.param.server+ key+this.plusLinkKey+kkk;

        if(str1!=undefined){
            o.url= this.param.server+ str1;
        }



        o.type="GET";
        o.success = function (response) { 
            trace("zzz",key,response)
            self.param[key]=response.results;
            if(fun)fun(response.results);           
        };
         if(self.token)
        o.headers = {
            'Authorization': 'Token ' + self.token
        };
        
        
        $.ajax(o);

        return null
    }

    this.objId={}

    this.funGetKeyId=undefined
    var globIter = 0;
    this.getKeyId=function(key,id,fun, bool){       
        let locIter = globIter;

        if(bool==undefined){
            if(self.param["obJ"+key] && self.param["obJ"+key][id]){
                if(self.param["obJ"+key][id].json!==undefined){ 
                    if(fun)fun(self.param["obJ"+key][id])
                    return self.param["obJ"+key][id]
                }
            }


            if(this.par.param[key]){                     
                for (var i = 0; i < this.par.param[key].length; i++) {
                    if(this.par.param[key][i].id==id){

                        if(this.par.param[key][i].json!==undefined){ 
                            if(self.param["obJ"+key]==undefined)self.param["obJ"+key]={}
                            if(self.param["obJ"+key][id]==undefined) self.param["obJ"+key][id]=  this.par.param[key][i] 

                            if(fun)fun(this.par.param[key][i])
                            return this.par.param[key][i]
                        }
                    }
                }
            }
            

            if(self.objId[key]!=undefined)if(self.objId[key][id]!=undefined){
                if(self.objId[key][id].json!==undefined){ 
                    if(self.param["obJ"+key]==undefined)self.param["obJ"+key]={}
                    if(self.param["obJ"+key][id]==undefined) self.param["obJ"+key][id]=  self.objId[key][id] 

                    if(fun)fun(self.objId[key][id])
                    return self.objId[key][id]
                }
            }
        }


        

        

        var o={
            type: "GET",
            url: this.par.param.server+key+"/"+id+"/",
            success: function function_name(data) { 

                if(self.objId[key]==undefined)self.objId[key]={}

                self.objId[key][id]=data

                //расшариваем param
                if(self.param["obJ"+key]==undefined)self.param["obJ"+key]={}
                if(self.param["obJ"+key][id]==undefined) self.param["obJ"+key][id]=  data 
                
                data.keyDin = key;   
                if(self.funGetKeyId!=undefined)self.funGetKeyId(key,id,data);

                if(fun)fun(data)
            },
            error: function (data) {
                if(fun)fun(null)
                return null
                console.error("Err", data);
            }
        }
        if (self.token) {
            o.headers = {"Authorization": "Token " + self.token};
        }
        

        globIter++;
        $.ajax(o)
        return null
    }

    this.deleteId=function(key,id,fun){
   
        $.ajax({
            type: "DELETE",
            url: this.par.param.server+key+"/"+id+"/",
            success: function function_name(data) { 
                if(fun)fun()
            }
        })
    }

    this.creat=function(key,fun){
        $.ajax({
            type: "POST",
            url: this.par.param.server+key+"/",
            success: function function_name(data) { 
                if(fun)fun(data)
            }
        })
    }


    this.setParam=function(keyType,id,param,value,fun){
        var o={}
        //o.type="PUT"
        o.type="PATCH";

        o.url=self.param.server+keyType+"/"+id+"/"
        o.data={}
        o.data[param]=value;

        if(self.token)
        o.headers = {
            'Authorization': 'Token ' + self.token
        };
      
        o.success= function function_name(data) { 
            if(fun)fun(data);
        }
        o.error=function function_name(data) {
            if(self.debug==true)console.error("larvijне верная загрузка xУУУУУz",data)
        }
        
        trace(o)

        $.ajax(o);        
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
            if(aa[0]=="media")return this.param.host+_s;  
            
            if(_s.indexOf('http://77.222.60.51')!=-1){
              
                return _s.replace('http://77.222.60.51', this.param.host)
            }

            if(aa[0]=="http:" ||aa[0]=="https:") return _s
           
            

            
            return _s
        } 
    }
}