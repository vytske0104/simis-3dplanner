





export function MenuVerh(menu, fun) {  
    var self=this;   
    this.type="Menu";
    this.par=menu;

    this._active=true

    this.whv=this.par.par.whv;
    this.otstup=this.par.par.otstup;

    this.dCont=new DCont(this.par.par.dCont);
    this.panel=new DPanel(this.dCont, 0, 0)
    this.panel.height=this.whv-this.otstup;
    // this._topRightBut = '';

    //this.panel.color=0x79bccc;
    
    /*this.button=new DButton(this.dCont, this.otstup, this.otstup,"load csv", function(s){        
 
        var a=s.split("base64,")       
        var str=window.atob( a[1] )
        self.bigZamena(str)

    });
    this.button.height=this.panel.height-this.otstup*2;
    this.button.startFile("csv");*/ 


    // this.buttonDop=new DButton(this.dCont, this.otstup, this.otstup,"++Infa++", function(s){         
    //     menu.dopInfo.active=!menu.dopInfo.active;

    // });
    // this.buttonDop.height=this.panel.height-this.otstup*2;



    var ak= 'юбьтимсчяэждлорпавыфъхзщшгнекуцйЮБЬТИМСЧЯЭЖДЛОРПАВЫФЪХЗЩШГНЕКУЦЙ';
    var ak2='þáüòèìñ÷ÿýæäëîðïàâûôúõçùøãíåêóöéÞÁÜÒÈÌÑ×ßÝÆÄËÎÐÏÀÂÛÔÚÕÇÙØÃÍÅÊÓÖÉ';
    function korektKiril(_s){
        var s="";
        var ss
        for (var i = 0; i < _s.length; i++) {
            ss=_s[i];
            for (var j = 0; j < ak2.length; j++) {
                if(ak2[j]==ss){
                    ss=ak[j]
                }
            }
            s+=ss;
        }
        return  s
    }


    var ar,a
    var sah
    this.bigZamena=function(_str){        
        var str=korektKiril(_str)

        a=str.split("\n")        
        ar=[]
        var ss
        for (var i = 1; i < a.length; i++) {
            ss=a[i].split("\r")
            
            var aaa=ss[0].split(";")

            if(aaa.length>3){               
                if(aaa[0]!="")ar.push(aaa) 
            }else{
                var aaa=ss[0].split(",")
                if(aaa.length>3){                   
                   if(aaa[0]!="")ar.push(aaa) 
                }
            }            
        }






        this.bigZamena1(ar);
        sah=0;
        this.bigZamena2();
    }


    this.objectBase
    var arrxz=[]
    this.bigZamena1=function(arr){  
        
        this.objectBase= this.par.par.par.objectBase;
        arrxz=[]

        //var aaaa="id\tОписание (не учитывается)\tАртикул белого\tЦена белого Артикул серого\tЦена серого\n"




        for (var i = 0; i < this.objectBase.bd.length; i++) {
            for (var j = 0; j < arr.length; j++) { 
                            
                if(this.objectBase.bd[i].id+""==arr[j][0]){
                   // this.setObjArr(this.objectBase.bd[i].obj, arr[j])
                    arrxz.push(this.objectBase.bd[i].obj) 


                }
            }            
        }
    }


    this.bigZamena2=function(){  
        if(arrxz[sah]==undefined){         

            this.par.par.s.save()
            setTimeout(function() {
                location.reload()
            }, 1000);
        }else{
            var s=   JSON.stringify(arrxz[sah], null,4)
            var l="../"+aGlaf.resursData+""+arrxz[sah].id+"/config.json";       
            
            aGlaf.php.load({tip:"saveJSON", link:l, text:s},function(e){
                sah++;
                self.bigZamena2()
            });

        }
    }




    this.setObjArr=function(obj, a){
        if(obj)
        if(obj.plus){            
            if(a[1]){
                obj.plus[1]=a[1];
                obj.plus1[1]=a[1];
            }

            if(a[3]){
                obj.plus[0]=a[2];
                obj.plus[3]=a[3];
            }
            if(a[5]){                
                obj.plus1[0]=a[4];
                obj.plus1[3]=a[5];                
            }
        }
    }





    var a=[];
    this.down=function(){      
        self.activMenu(this.idArr)        
    }  


    this.activMenu = function(ii){
        for (var i = 0; i < self.ab.length; i++) {
            self.ab[i].alpha=1;
        }
        self.ab[ii].alpha=0.5; 
        aGlaf.menu.infoBD.active=false; 
        aGlaf.menu.scBD.active=false; 

        aGlaf.menu.menuBD.active=false;
        aGlaf.menu.menuThree.active=false;
        aGlaf.menu.menuObject.active=false;
        aGlaf.menu.matObject.active=false;;
        aGlaf.menu.matBD.active=false;
        aGlaf.menu.menuScene.active=false;

        
        if(ii==0){//дерево 
            aGlaf.menu.scBD.active=true; 

            aGlaf.menu.menuScene.active=false; 
            aGlaf.menu.menuBD.active=false;                  
            //aGlaf.menu.menuThree.active=false;
            aGlaf.menu.menuObject.active=false;
            aGlaf.menu.matObject.active=false;                  
           // aGlaf.menu.menuThree.active=true;
        }
        if(ii==1){//обьекты   
            aGlaf.menu.scBD.active=false; 

            aGlaf.menu.menuScene.active=false; 
            aGlaf.menu.menuBD.active=false;                  
            //aGlaf.menu.menuThree.active=false;
            aGlaf.menu.menuObject.active=false;
            aGlaf.menu.matObject.active=false;;
            aGlaf.menu.matBD.active=false;

            aGlaf.menu.menuBD.active=true;               
            aGlaf.menu.menuObject.active=true;
        }
        if(ii==2){//матерьялы
            aGlaf.menu.scBD.active=false; 
            aGlaf.menu.menuScene.active=false; 
            aGlaf.menu.menuBD.active=false;                  
            //aGlaf.menu.menuThree.active=false;
            aGlaf.menu.menuObject.active=false;
            aGlaf.menu.matObject.active=false;;
            aGlaf.menu.matBD.active=false;           
            aGlaf.menu.matObject.active=true;
            aGlaf.menu.matBD.active=true;
        }
        if(ii==4){//сцена            
            aGlaf.menu.scBD.active=false; 
            aGlaf.menu.menuScene.active=false; 
            aGlaf.menu.menuBD.active=false;
            //aGlaf.menu.menuThree.active=false;
            aGlaf.menu.menuObject.active=false;
            aGlaf.menu.matObject.active=false;;
            aGlaf.menu.matBD.active=false;
            aGlaf.menu.menuScene.active=true; 
        } 

        if(ii==5){//сцена            
            aGlaf.menu.scBD.active=false; 
            aGlaf.menu.menuScene.active=false; 
            aGlaf.menu.menuBD.active=false;
            aGlaf.menu.menuThree.active=true;
            aGlaf.menu.menuObject.active=false;
            aGlaf.menu.matObject.active=false;;
            aGlaf.menu.matBD.active=false;
            aGlaf.menu.menuScene.active=false; 
        }

        if(ii==6){//сцена  



            aGlaf.menu.infoBD.active=true;
        } 
    }



    /* setTimeout(function() {
        self.activMenu(1);
    }, 1);*/
    

    var but = [
        {id: 0, text:"scenes3d"},
        {id: 1, text:"objects3d"},
        {id: 2, text:"materials"},
        {id: 4, text:"textures"},
        {id: 3, text:"настройки"},
        {id: 5, text:"дерево"},
        {id: 6, text:"info"},
    ]
    var butTextur = undefined;
    this.texturActive = function(){
        if (butTextur.alpha == 1) {
            butTextur.alpha = 0.5;
            menu.naObj.active = false;
            menu.textureBD.active = true;
        } else {
            butTextur.alpha = 1;
            menu.naObj.active = true;
            menu.textureBD.active = false;
        }
    }


    var b;
    var ww=28;
    this.ab=[]
    for (var i = 0; i < but.length; i++) {
        b=new DButton(this.panel, /*aGlaf.widthBig+*/(this.otstup+ww*3)*i+this.otstup, this.otstup, " ", this.down);
        b.idArr=i;
        b.text = but[i].text;

        if(b.text == "textures") {
            butTextur = b;
            butTextur.fun = this.texturActive;
            butTextur.alpha = 0.5;
        }

        b.width=ww*3;
        b.height=ww;      
        this.ab.push(b)
    }


    this.sizeWindow = function(w,h){  
        this.panel.width = w ;
        // this.dcBut.x = w-this.arrBut.length * (this.otstup + (this.otstup + ww));
    }

    /////////////////////////////Впихиваю левые кнопки////////////
    /////////////////////////////////////////////////////////////

    // this.arrBut=[]

    // this.dcBut = new DCont(this.panel)
    // this.dcBut.y = this.otstup;
     
    // for (let i = 0; i < 2; i++) {
    //     this.arrBut[i] = new DButton(this.dcBut, this.otstup + (this.otstup + ww)*i, 0, ""+i, function() {
    //         self.topRightBut=this.idArr;
    //     });
    //     this.arrBut[i].idArr=i
    //     this.arrBut[i].width = this.arrBut[i].height = ww
    // }

    // this.arrBut[1].alpha = 0.5;

    ///----------------------------------

    Object.defineProperty(this, "active", {
        set: function (value) {            
            if(this._active!=value){
                this._active=value;                
                this.panel.visible=value;
                this.panel.visible = value;
            }           
        },
        get: function () {
            return this._active;
        }
    });
/*
    Object.defineProperty(this, "topRightBut", {
        set: function (value) {
            if (this._topRightBut === value) {
                return;
            }
            this._topRightBut = value
            // for (let i = 0; i < this.arrBut.length; i++) {
            //     this.arrBut[i].alpha = 1;
            // }
            // this.arrBut[value].alpha = 0.5;

            // if (value === 0) {
            //     menu.naObj.active = true;
            //     menu.textureBD.active = false;
            // } else if (value === 1) {
            //     menu.naObj.active = false;
            //     menu.textureBD.active = true;
            // }
        },

        get: function () {
            return this._topRightBut;
        }
    });*/
}



