import {Glaf } from './Glaf.js';
import { Param } from '../component/Param.js';
import { MHBDPHP } from '../component/MHBDPHP.js';
import { Calc } from '../component/Calc.js';


import { LocalStorage} from '../component/LocalStorageE6.js';
import {Languages} from '../component/Languages.js';
import { TStyle } from '../t3d/TStyle.js';

//xz
/*sdf			f
sdfsf	
*/
export class Main{
 	constructor(fun) {
		this.type="Main";	//4444 	 	
	 

	    var self=this;
	  	this.contentHTML= document.createElement(
			'div'
		);// dsds
	 	this.contentHTML.style.position = 'fixed';
		this.contentHTML.style.top = '0px';			
		this.contentHTML.style.left = '0px';
		document.body.appendChild(this.contentHTML);  
		
		//создание сцены
  		this.start = function () {
			this.tick();		
			self.glaf=new Glaf(this);
		 	fun("init");         	
        }

        this.setModel = function (s,p,p1) {        	
        	self.glaf.setModel(s,p,p1)
        }


		//тик размит надва
		var b=true
		this.tick = function () {				
			TWEEN.update();		
			if (self.glaf) {
				self.glaf.update();
			}	
			requestAnimationFrame( self.tick );		
		}


		//Маштабим окна 
		this.scale=1; var d;//890809
		var s
  		this.sizeWindow = function(w,h){  			
  			self._width=w;
			self._height=h;
			if (self._width < 450) self._width = 450;
			if (self._height < 610) self._height = 610;
			s= w/self._width;
			if(s>h/self._height)s=h/self._height;
			this.scale = s;
			//if(dcmParam.isIE==true)
				//this.scale = 1;			
			
  			if (self.glaf) { 
  				self.glaf.sizeWindow(w, h, this.scale)
  			}			
  		}
  		
  		window.languages=new Languages([{key:"ru"},{key:"en"}])
  		languages.key="en"

  		/* window.localS=new LocalStorage(function(){},"3dplaner_v1")

  		window.localSInfo=new LocalStorage(function(){},"3dplaner_info_v1")
  		

  		if(window.localS.object.info==undefined)window.localS.object.info={};
  		if(window.localS.object.debug==undefined)window.localS.object.debug = false;	 */





  		window.calc=new Calc()
  		this.param = new Param().param;
  		this.param.wb=160;
  		this.param.wb1=160;
  		this.param.mastab=1
  		if(dcmParam.mobile==true){
  			this.param.wb=90;
  			this.param.mastab=3
  		}
  		this.param.mobile=dcmParam.mobile
  		this.param.wh=64;
  		this.param.otstup=10;
  		//dcmParam.color = "#E22424"
  		dcmParam.color1 = "#C4C4C4"
  		dcmParam.fontSizeLittel=dcmParam._fontSizeLittel=10

  		dcmParam.colorText="#000000";
  		dcmParam.colorText1="#000000";

  		this.param.alpha=0.5;

  		/*this.param.wh=32;;
  		this.param.fontSize=14;
  		//dcmParam.zbrosDokument=true
  		dcmParam.fontSize=this.param.fontSize
  		dcmParam.color="#777777";
  		dcmParam.color1="#303841"
  		dcmParam.color2="#ffffff"*/
  		dcmParam.fontFamily = "PT Mono"
  		//dcmParam.fontFamily = 'Inter'
  		this.param.sizeBase=this.param.wh*3+this.param.otstup*4
  		trace(">>",this.param)


  		window.tStyle= new TStyle();
  		document.body.style.backgroundColor = "#303841"
  		window.tStyle._gage=0.1

   		window.mhbd=new MHBDPHP(this);
   		window.mhbd.load(function(){
   			var loader = new THREE.FontLoader();
			loader.load( 'resources/font/helvetiker_bold.typeface.json', function ( font ) {
				tStyle._fontSize=self.param.fontSizeLittel 

				tStyle.addFont(font);
				self.start()
			})
   			//self.start()
   		})



   		this.keydown=function(event){
            if(event.keyCode==17)self.boolCTRL=true;

            if(event.keyCode==81&&self.boolCTRL)  {
                self.active =  !self.active;
                window.localS.object.debug=!window.localS.object.debug;
                window.localS.save();
                window.location.reload()
            } 
            self.glaf.keydown("down", event, self.boolCTRL)

        }
        this.keyup=function(event){
            if(event.keyCode==17)self.boolCTRL=false;

            self.glaf.keyup("up", event, self.boolCTRL);    
        }
        //document.onkeydown = this.keydown
        window.addEventListener( 'keydown', this.keydown );    
        window.addEventListener( 'keyup', this.keyup ); 
		
  	}
}




