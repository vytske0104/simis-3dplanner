



export class Param  {
  	constructor() {  		
  		this.type="Param";
  	
        this.param={}
        
        this.param.otstup=5;
        //this.param.wb=220;

        this.param.color="#008cba";
        this.param.colorFont="#ffffff";
        this.param.color1="#999999";

        this.param.colorActive="#f28044";

       // this.param.wh=32;
        this.param.wh=40;
        this.param.wh2=32;
        

  
        this.param.wb=150;
        this.param.mobile=false
        this.param.whb=32;
        this.param.whCr=840;

        this.param.otMy=10;
        this.param.sizeBase=292;

        this.param.fontSize=16;
        this.param.fontSize1=24;
        this.param.fontSizeLittel=10;
   

        this.param.sizeBase2=200;
        this.param.bRadius=24;


        this.param.whPic=256;
        this.param.kolVolid=10;


        this.param.borderRadius = 5;
        this.param.glowColor="#979797"
        this.param.glowSah=5

        this.param.vers="3.03"

        //this.param.server="http://192.168.1.116:8000/api/v1/";
        //this.param.server="http://192.168.1.116:8000/api/v1/";
        //this.param.server="http://127.0.0.1:8000/api/v1/";
        // this.param.server="https://alphakp.ru/api/v1/";
        // this.param.serverNa="https://alphakp.ru/www/";   7  236_k4NDOl1.png

        // var url = new URL(window.location.href);                       // Работает везде, задолюался переключать - оставлю.
        // this.param.host = url.protocol + "//" + url.host + "/";        // Работает везде, задолюался переключать - оставлю.

        this.param.host = "https://kaleidoplan.ru/";

        
        this.param.host="http://77.222.60.51/"
        this.param.host="http://larvij.design/"
         //this.param.host="http://127.0.0.1:8000/"



        this.param.server=this.param.host+"api/v1/";


        this.param.server = this.param.host + "api/v1/";
        this.param.serverNa = this.param.host + "www/";

        this.param.nameLS="___credentials2"


        this.param.token=null;
        
        this.param.objects3d=undefined;
        this.param.materials=undefined;
        this.param.textures=undefined;
        this.param.objectBase=undefined;
        this.param.scenes3d=undefined;
        //this.param.group1=undefined;

        this.param.arrayName=[
            "objects3d",
            "materials",
            "textures",
            "scenes3d",
            "materials_sorts",
            "objects3d_sorts",
            /*"group","group1","group2","group3","langs","auth/users"*/
        ]; 

        this.param.debug=false
        this.param.version_reliz=1;
        this.param.version_dev=8;
        this.param.parentId=0;

        this.param.simMani="₽"

        this.param.versi="v "+this.param.version_reliz+".0"+this.param.version_dev;

        this.param.objectBase={}


        this.param.fontFamily="Montserrat"

        this.param.maxW=350
        this.param.maxH=350

        this.param.langs = ['ru','en'];


        if(window.document.URL.toString().indexOf("localhost")!=-1){            
            var a=window.document.URL.toString().split("/")
            var s=a[0]
            for (var i = 1; i < a.length-1; i++) {
                s+="/"+a[i]
            }   
            this.param.serverNa=s+"/"
            this.param.localServer=this.param.serverNa+"adminAll.html"

                
        }




        
    }
}

