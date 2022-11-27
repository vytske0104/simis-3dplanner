



export class ManagerURL  {
  	constructor(par,fun) {   		
  		this.type="ManagerURL";
  	    var self=this;
        this.par=par;
        this.fun=fun;
        this.param=par.param;



        this.set=function(separator){

            var args = Array.prototype.slice.call(arguments, 0);
            var s="";
                                  
            for (var i = 0; i < args.length; i++) {
                s+=args[i]+"/";
            }
            var ss=""

            if(window.document.URL.toString().indexOf('localhost')!=-1){
                var a=window.document.URL.toString().split("?")
                ss=a[0]+"?"+s                
            }

            if(window.document.URL.toString().indexOf('larvij.design/admin/')!=-1){
                var a=window.document.URL.toString().split("larvij.design/admin/")
                ss=a[0]+"larvij.design/admin/?"+s                
            }  
                         
            document.title = s; 

            window.history.pushState("object or string", "Title", ss);


        }


        //this.setParam(1,444,555)

        this.open=function(a){

            if(a[0]){
                if(a[0]=="list"){
                    if(a.length==2){//просто открыть лист
                        self.par.indexKey=a[1]
                        mbInfo.oKO[a[1]].object.start()
                    }
                }
                if(a[0]=="obj"){
                    if(a.length>=3){//открыть обьект
                        //mbInfo.oKO[a[1]].object.boolStop=true;
                        self.par.indexKey=a[1]
                        mbInfo.oKO[a[1]].object.start("open")
                        mbInfo.oKO[a[1]].object.mc.setId(a[2]);
                    }
                }
                if(a[0]=="user"){
                    self.par.indexKey="user"
                    mbInfo.oKO["user"].object.start()
                    trace("aaaa",a,mbInfo.oKO)

                    //mbInfo.oKO[a[1]].object
                }
            }
        }


        this.dragUzer=function(){
            if(mhbd.uzer==null){
                this.set()
                return
            }
            var a=null            
            a=window.document.URL.toString().split("?")[1]         
            
            if(a==null)return
            var a1=a.split("/") 
            if(a1[a1.length-1]=='') a1.splice(a1.length-1,1)
            this.open(a1);    
           

        }

        
    }
}

