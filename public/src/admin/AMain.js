


import { AGlaf } from './AGlaf.js';

import { Param } from '../component/Param.js';

import { LocalStorage } from '../component/LocalStorageE6.js';

//import { Location } from "../component/ui/Location.js";
import { LocToken} from '../component/ui/LocToken.js';
import { MHBD } from '../component/MHBD.js';
import { MHBDPHP} from '../component/MHBDPHP.js';

var localS
export function AMain(fun) {
		
	this.type="AMain";

	var self=this;

	this.stage = null;
	this.content2d = null;
	this.renderer = null;
	this.glaf=null;
	this._width=100;
	this._height=100;
	self.resolution=1
	self.objectBase=null
    this.localStorage
    this.active =true

	this.contentHTML= document.createElement('div');
	this.contentHTML.style.position = 'fixed';
	this.contentHTML.style.top = '0px';
	this.contentHTML.style.left = '0px';
	document.body.appendChild(this.contentHTML)

	this.param=new Param().param
	

	//this.param.server="http://192.168.1.116:8000/api/v1/";
	// this.param.server="https://alphakp.ru/api/v1/";
	//this.param.server="https://kaleidoplan.ru/api/v1/";
	
	this.param.objects3d=undefined;
	this.param.materials=undefined;
	this.param.textures=undefined;
	this.param.objectBase=undefined;
	this.param.scenes3d=undefined;

//sceneSB

	window.mhbd=undefined
	window.main=this



	this.start = function () {	
	
		this.stage = new PIXI.Container();
		this.renderer = new PIXI.autoDetectRenderer(this._width, this._height, {antialias: true, transparent: true, preserveDrawingBuffer: true });
		this.renderer.view.style.position = 'fixed';
		//this.contentHTML.appendChild(this.renderer.view);
		this.content2d = new PIXI.Container();
		self.stage.addChild(this.content2d);
		var t = new PIXI.ticker.Ticker();
		t.minFPS = 50;
		t.add(this.tick, this);
		t.start();
		
        window.localS = new LocalStorage(function(){
        	
        	setTimeout(function() {
        		trace("1sd11")
        		trace("111",window.localS)
        		
        		if(window.localS.object.info==undefined)window.localS.object.info={}
        		
        		
        		self.init2();
        	}, 1);
        },"admin_xz_v5");

	};


	this.boolCTRL=false
	this.keydown=function(e){
        if(event.keyCode==17)self.boolCTRL=true
        if(event.keyCode==81&&self.boolCTRL)  {
        	self.localStorage.object.debug=!self.debug;

            self.localStorage.save();
            location.href=location.href;  
        }
        self.glaf.keydown(e);

    }
    this.keyup=function(e){
        if(event.keyCode==17)self.boolCTRL=false
        self.glaf.keyup(e)	
    }

    window.addEventListener( 'keydown', this.keydown );
    window.addEventListener( 'keyup', this.keyup );

    

	this.init2 = function () {
		
		trace("22fgh ")	
	
		if(this.active==true){
			document.body.appendChild(this.contentHTML);
		}

		window.mhbd.getKeyId("scenes3d",2,function(e){
			trace("22 ",e)
			self.init3(e)
		})
		/*$.ajax({
            type: "GET",
            url: this.param.server+"scenes3d/2/",
            success: function function_name(data) { 
            	
                self.init3(data)
            }

        })*/



	}	

	this.init3 = function (oSB) {	
		//new StylePL102(this.stage, this.renderer, this.contentHTML);// document.body);
			
        self.glaf = new AGlaf(this,oSB)
		fun("init");

		setTimeout(function() {			
			let a=window.location.href.split("?");
			if(a[1]){
				let aa=a[1].split("&");
				for (var i = 0; i < aa.length; i++) {
					let aaa=aa[i].split("=");
					
					if(aaa[0]=="objects3d"){
						self.glaf.menu.menuVerh.activMenu(1)
						self.glaf.menu.menuBD.setId(aaa[1]*1);
						// self.glaf.menu.menuBD.reDrag();
						return					}
					if(aaa[0]=="materials"){
						self.glaf.menu.menuVerh.activMenu(2);
						self.glaf.menu.matBD.setId(aaa[1], true);
						//self.glaf.menu.matBD.reDrag();
						return
					}
					if(aaa[0]=="textures"){	
						self.glaf.menu.textureBD.active=true;
						self.glaf.menu.textureBD.setId(aaa[1]);	
						return
					}

					if(aaa[0]=="scenes3d"){	
						self.glaf.menu.scBD.active=true;
						self.glaf.menu.scBD.setId(aaa[1]);	
						return
					}
					if(aaa[0]=="info"){	
						self.glaf.menu.infoBD.active=true;
						self.glaf.menu.infoBD.setId(aaa[1]);	
						return
					}
				}
			}
		}, 1);
		
	}





	this.tick = function () {
		self.renderer.resolution = window.devicePixelRatio * self.resolution;// ставим разрешение рендера (соотношение пикселей)
		self.renderer.render(self.stage);
		TWEEN.update();	
		if (self.glaf) {
			self.glaf.update();
		}			
	}






	var sizeWindow = this.sizeWindow = function(w,h){ 
		self._width=w;
	    self._height=h;

	    if(self.renderer){
  			var precresol = self.resolution;// запоминаем предыдущее разрешение пикселей рендера
			self.renderer.view.style.width = self._width + 'px';
			self.renderer.view.style.height = self._height + 'px';
			
			self.renderer.resolution = 1;// перед изменение размера в дефолт
			self.renderer.resize(self._width, self._height);
			self.renderer.resolution = precresol;// ставим обратно разрешение

		}

		if(self.glaf) self.glaf.sizeWindow(w,h)
	    if(self.location) self.location.sizeWindow(w,h)
	}



	this.retest = function(w,h){ 
		let b=true;
		if(this.param.objectBase==undefined){

			b=false;
			if(mhbd.type=="MHBDPHP"){
				this.param.objectBase=mhbd.objectBase
				b = true;
			}
		}



		if(mhbd.type!=="MHBDPHP")
		for (var i = this.param.arrayName.length - 1; i >= 0; i--) {
			if(this.param[this.param.arrayName[i]]==undefined)b=false;
		}

		trace(b,this.param.arrayName,mhbd.type,this.param.objectBase)

		if(b==true){
			var oo
			for (var i = 0; i < this.param.arrayName.length; i++) {
				
				if(this.param.objectBase[this.param.arrayName[i]]!=undefined){
					if(this.param[this.param.arrayName[i]]==undefined)this.param[this.param.arrayName[i]]=this.param.objectBase[this.param.arrayName[i]]


					this.param["obJ"+this.param.arrayName[i]]={}
					oo=this.param["obJ"+this.param.arrayName[i]]

									
					for (var j = 0; j < this.param[this.param.arrayName[i]].length; j++) {
						oo[this.param[this.param.arrayName[i]][j].id]=this.param[this.param.arrayName[i]][j]
					}

				}
				
			}	
			
			self.start();
		}
	}

	this.initttt=function(){
		/*for (var i = 0; i < this.param.arrayName.length; i++) {
	    	let name = this.param.arrayName[i]

	    	let name1=name.replace("_", "/")
	    	$.ajax({
	        url: this.param.server+name1+"/",
		        success: function function_name(data) { 
		           	self.param[name]=data.results;
		           	self.retest()
		        },
		        error:function function_name(data) {
					console.error("не верная загрузка "+name)
		        }
		    }); 
	    }

		$.ajax({
	        url: "resources/config.json",
	        success: function function_name(data) {
	            if(typeof data === "string") {
					var conf = JSON.parse(data)
					self.objectBase = conf;
				} else self.objectBase = data;
				self.param.objectBase=self.objectBase;
				self.retest()    
	        },
	        error:function function_name(data) {
				console.error("не верная загрузка objectBase")
	        }
	    });*/
	}

	/*window.locToken=new LocToken(this,function(s,p,p1){            
        if(s=="dragUzer"){
        	trace("@@@@@@@@@@@@@@@@@@@@",mhbd.token);
        	self.initttt() 
        	
        }            
    });

    */
    //window.mhbd=new MHBD(this)    
	window.mhbd=new MHBDPHP(this)
	window.mhbd.load(
		function(){
			trace(window.mhbd)
			self.retest()
			//self.start()
		}
	);



    var b;
  /*  this.location = new Location(this, (s, p) => {
    	trace("location >>>", s, p)
        if (s == "dragUzer") { 
        	b = false;
        	if(self.location) {
        		if(self.location.token){
		        	self.param.token=self.location.token
		        	mhbd.token=self.location.token
		        	if(!self.glaf)self.initttt()  
		        	b = true;
	        	}               
	        } 

	        if (b==false) {
	        	if(self.glaf) self.glaf.dCont.visible = false
	        } else {
	        	if(self.glaf) self.glaf.dCont.visible = true
	        }
        } 
    })*/
}








