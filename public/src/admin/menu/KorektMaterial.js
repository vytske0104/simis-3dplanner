

import { KorektTexture} from './KorektTexture.js';

export  function KorektMaterial (par,cont, _x, _y, _fun) {
	var self = this;	
	this.type = 'KorektMaterial';
	this.content = new DCont();
	cont.add(this.content);
	this.par=par;

	this.fun=_fun;
	this._x = _x || 0;
	this._y = _y || 0;

	this.content.x = this._x;
	this.content.y = this._y;

	// this._activ = false;
	this._debug = false;
	this._largeMenu = "xz";//bigMenu._largeMenu;
	// this.content.visible=this._activ;
	this.otstup = 2;
	this._width = 200;
	this._height = 100;
	this._w = 100; // screen width
	this._h = 100; // screen height

	this.objOld=undefined;

	this.wh = 32;
	this.material;
	this.imgInfoArray = [];
	this._index=-1;
	this.object = {};
	new NapolnKorektMaterial(this.object);
	this.array = this.object.array;

	this.material;

	this._boolDrag = false;


	this.korektTexture = new KorektTexture(this,this.content,202,-156,function(s,p){

	});

	this.settingsBig = new DSettings(this.content);
	this.settingsBig.content.scale=0.75
	this.settingsBig.content.y = 36;
	this.settingsBig.actIgnBtn = false;
	this.settingsBig.isScroll = true;
	this.settingsBig.heightWindow = (440 - 3)//*1.5//(1/this.settingsBig.content.scale);
	this.settingsBig.otstup = 5;
	this.settingsBig.drawArrFon = false;
	this.settingsBig.height = 222;
	this.settingsBig._width*=(1/this.settingsBig.content.scale)
	
/*

	this.scrollPane = new ScrollPane(this.content, 0, pl102.wh);
	this.scrollPane.addContent(this.settingsBig.content);
	this.scrollPane.boolPositOtctup = true;
	this.scrollPane.widthContent = this._width;
*/

	this.settingsBig.addComponent('DLabel', 'label1');
	this.settingsBig.addComponent('DLabel', 'label2');
	this.settingsBig.addComponent('DLabel', 'label3');

/*	this.settingsBig.addComponent('StringInput', 'input1');*/
	this.settingsBig.addComponent('DColor', 'color');
	this.settingsBig.addComponent('DColor', 'color1');
	this.settingsBig.addComponent('DColor', 'color2');

	this.settingsBig.addComponent('DSliderBig', 'slider');
	this.settingsBig.addComponent('DSliderBig', 'slider1');
	this.settingsBig.addComponent('DSliderBig', 'slider2');
	this.settingsBig.addComponent('DSliderBig', 'slider3');
	this.settingsBig.addComponent('DSliderBig', 'slider4');
	this.settingsBig.addComponent('DSliderBig', 'slider5');
	this.settingsBig.addComponent('DSliderBig', 'slider6');
	this.settingsBig.addComponent('DSliderBig', 'slider7');
	this.settingsBig.addComponent('DSliderBig', 'slider8');
	this.settingsBig.addComponent('DSliderBig', 'slider9');
	this.settingsBig.addComponent('DSliderBig', 'slider10');
	this.settingsBig.addComponent('DSliderBig', 'slider11');
	this.settingsBig.addComponent('DSliderBig', 'slider12');
	this.settingsBig.addComponent('DSliderBig', 'slider13');



	this.settingsBig.addComponent('DCheckBox', 'check');
	this.settingsBig.addComponent('DCheckBox', 'check1');
	this.settingsBig.addComponent('DCheckBox', 'check2');
	this.settingsBig.addComponent('DCheckBox', 'check3');
	this.settingsBig.addComponent('DCheckBox', 'check4');

	/*this.settingsBig.addComponent('SliderObject', 'sliderObject');
*/
	this.settingsBig.addComponent('DComboBox', 'comboBox');
	this.settingsBig.addComponent('DComboBox', 'comboBox1');
	this.settingsBig.addComponent('DComboBox', 'comboBox2');
	this.settingsBig.addComponent('DComboBox', 'comboBox4');

	this.material=undefined
	this.creatMaterial=function(_s){
		var comand = 'new THREE.' + _s + '()';
		this.material = eval(comand);
	}

	this.objBase=undefined
	this.objGlaf=undefined
	this.setObj=function(o){
		this.korektTexture.clear();
		var r=false;
		this.objBase=o;	
		
		
			
		if(o.obj.type==undefined){			
			o.obj.type=this.array[this._index].name;
			this.objGlaf=undefined;
			r=true;
		}else{
			
			this.objGlaf=o.obj;
			var s='[]'

			if(this.objGlaf.textur){
				s=this.objGlaf.textur				
			}	
		
			var a=JSON.stringify(s)
			this.korektTexture.setObj(s)
			this.objGlaf.textur=JSON.parse(a)			
		}
		

		this.creatMaterial(o.obj.type);


		if(this.objGlaf==undefined){
			this.objGlaf=o.obj			
			this.materToObj(this.objGlaf, this.material)
		}else{					
			this.objToMater(this.objGlaf, this.material)			
		}

		
		this._index=-1;		
		var iii=-1
		for (var i = 0; i < this.array.length; i++) {		          
            if(this.array[i].name==o.obj.type){  
             
                iii=i; 	
                            
            }
        }


        if(iii!=-1){
        	var ooo=this.array[iii]

        	for (var i = 0; i < ooo.arrParam.length; i++) {
        		
        		for(var s in this.material){
        			if(s==ooo.arrParam[i]){
        				if(o.obj[s]==undefined){
        					if(typeof this.material[s] == "object"){
        						if(this.material[s].getHexString!=undefined){
        							o.obj[s]="#"+this.material[s].getHexString()	
        						}
        					}else{
        						o.obj[s]=this.material[s]
        					}
        					
        				}
        			}
        		}
        	}



			this.index=iii; 
        }

        //if(o.type){
        	trace(o,this.settingsBig)
       // }
       

	}


	this.materToObj=function(o,m){
		
		for (var i = 0; i < this.array[this._index].arrComD.length; i++) {
			if(m[this.array[this._index].arrComD[i].param]!=undefined){				
				
				if(this.array[this._index].arrComD[i].name.indexOf("color")!=-1){
					o[this.array[this._index].arrComD[i].param]="#"+m[this.array[this._index].arrComD[i].param].getHexString()					
				}else{					
					o[this.array[this._index].arrComD[i].param]=m[this.array[this._index].arrComD[i].param]
				}

			}			
		}
	}
	this.objToMater=function(o,m){
		var s;
		for (var i = 0; i < this.array[this._index].arrComD.length; i++) {
			s=this.array[this._index].arrComD[i].param
			if(m[s]!=undefined){		
				if(o[s]!=undefined){	
					if(m[s] instanceof THREE.Color ){					
						m[s]=new THREE.Color(o[s]);
					}else{
						m[s]=o[s];
					}
				}

			}
		}
	}
	
	this.funComplit=function(c){				
		if(c.type=="DColor"){
			self.material[c.param]=new THREE.Color(c.value);
		}
		if(c.type=="DCheckBox"||c.type=="DSliderBig"){			
			self.material[c.param]=c.value;			
		}
		if(c.type=="DComboBox"){
			self.material[c.param]=c.value;			
		}
		self.fun("saveObj");
		
		
	}


	this.dragIndex=function(){

		if(this.material==undefined)return;
		if(this.objGlaf==undefined)return;
		var obP=this.array[this._index];
		this.material.dispose()

		this.creatMaterial(this.array[this._index].name);
		
		this.objToMater(this.objGlaf,this.material);

		this.objGlaf.type=this.array[this._index].name

		this.korektTexture.setVisiMat(this.material, this.array[this._index].arrTextur)


		var o={};
		o.arrComp = [];
		for (var i = 0; i < obP.arrComD.length; i++) {
			
			o.arrComp.push(obP.arrComD[i]);
		}
		o.param = this.objGlaf;
		o.funComplit=this.funComplit;	

		this.settingsBig.setObj(o);

		this.setMirro(this.objBase.mirro);

		this.fun("openMat", this.material);

	}


	this.setMirro=function(num, bb){

		this.objBase.mirro=num;

		if(num==0){
       		this.material.envMap=null

       	}
       	if(num==1){
       		this.material.envMap=visi3D.getEnvMap()
       	}
       	if(num==2){
       		this.material.envMap=visi3D.getEnvMap1()
       	}

       /* if(num==true){        	
        	this.material.envMap=visi3D.getEnvMap()
        	
        }else{
        	this.material.envMap=null
        }*/
        
        this.material.needsUpdate=true;
		if(bb!=undefined)self.par.saveTime()
	}





}

KorektMaterial.prototype = {
	set index (v) {
		if (this._index == v) return;
		this._index = v;
		this.dragIndex()
		
	},
	get index () {
		return this._index;
	},


	set width (v) {
		if (this._width == v) return;
		this._width = v;
		this.draw();
	},
	get width () {
		return this._width;
	},
	set height (v) {
		if (this._height == v) return;
		this._height = v;
		// this.draw();
	},
	get height () {
		return this._height;
	},



};


function NapolnKorektMaterial (_o) {
	// lambert, normal, toon, depth
	_o.arrayName = [];
	_o.array = [];

	this.typeArray = [
		{
			type: THREE.Color,
			name: 'numbercolor',
			tipRide: true,
			typeYesArray: ['r', 'g', 'b'],
			nameComp: 'PLColorTHREE'
		},
		{
			type: THREE.Vector2,
			name: 'vector2',
			tipRide: true,
			typeYesArray: ['x', 'y']
		}
	];


	









	// -------------------------------------------- P H O N G -----------------------------------------------------------
	var o = {};
	o.param = THREE.MeshPhongMaterial;
	o.name = 'MeshPhongMaterial';
	o.arrTextur = [
		{ type: 'map', typeYesArray: ['repeat'], typeArray: this.typeArray },
		{ type: 'alphaMap', typeYesArray: ['repeat'], typeArray: this.typeArray },
		{ type: 'bumpMap', typeYesArray: ['repeat'], typeArray: this.typeArray },
		{ type: 'normalMap', typeYesArray: ['repeat'], typeArray: this.typeArray },
		{ type: 'displacementMap', typeYesArray: ['repeat'], typeArray: this.typeArray },
		{ type: 'specularMap', typeYesArray: ['repeat'], typeArray: this.typeArray },
		{ type: 'lightMap', typeYesArray: ['repeat'], typeArray: this.typeArray },
		{ type: 'aoMap', typeYesArray: ['repeat'], typeArray: this.typeArray },
		{ type: 'emissiveMap', typeYesArray: ['repeat'], typeArray: this.typeArray }
	];
	o.arrType = this.typeArray;
	o.arrParam = [
		'color',
		'emissive',
		'specular',
		'shininess',
		'skinning',
		'flatShading',
		'opacity',
		'transparent',
		'alphaTest',
		'wireframe'

		// "vertexColors",
		// "side",
		// "blending"
	];

	o.arrComD = [ // Порядок этих элементов опледеляет порядок в меню Phong
		{name: 'color', param: 'color', title: 'Color'},
		{name: 'color1', param: 'specular', title: 'Specular'},
		{name: 'slider', param: 'shininess', title: 'Shininess', min: 0, max: 1000, okrug: 100},
		{name: 'color2', param: 'emissive', title: 'Emissive'},
		{name: 'slider1', param: 'opacity', title: 'Opacity', min: 0, max: 1, okrug: 100},
		{name: 'check', param: 'transparent', title: 'transparent'},
		{name: 'slider7', param: 'alphaTest', title: 'alphaTest', min: 0, max: 1, okrug: 100},
		{name: 'check1', param: 'wireframe', title: 'wireframe'},
		{name: 'check2', param: 'flatShading', title: 'flatShading'},
		{name: 'label3', title: 'depthFunc'},
		{name: 'comboBox1', param: 'depthFunc', title: '', arrObj: ['Never', 'Always', 'Less', 'Less or equal', 'Greather or equal (Валит)', 'Greather (Валит)', 'Not equal (Валит)'], arrValue: [THREE.NeverDepth, THREE.AlwaysDepth, THREE.LessDepth, THREE.LessEqualDepth, THREE.GreaterEqualDepth, THREE.GreaterDepth, THREE.NotEqualDepth]},
		{name: 'label2', title: 'Blending'},
		{name: 'comboBox2', param: 'blending', title: '', arrObj: ['NO', 'NORMAL', 'ADDITIVE', 'SUBTRACTIVE', 'MULTIPLY', 'CUSTOM'], arrValue: [THREE.NoBlending, THREE.NormalBlending, THREE.AdditiveBlending, THREE.SubtractiveBlending, THREE.MultiplyBlending, THREE.CustomBlending]},
		{name: 'label1', title: 'side'},
		{name: 'comboBox', param: 'side', title: '', arrObj: ['FRONT', 'BACK', 'DOUBLE'], arrValue: [THREE.FrontSide, THREE.BackSide, THREE.DoubleSide]},
		{name: 'check3', param: 'depthTest', title: 'depthTest'},
		{name: 'check4', param: 'depthWrite', title: 'depthWrite'},
		{name: 'sliderObject', param: 'normalScale', title: 'normalSc', min: 0, max: 1, okrug: 100},
		{name: 'slider9', param: 'reflectivity', title: 'reflectivity', min: 0, max: 1, okrug: 100}, // Зависит от envMap - которой нет --- бесполезен
		{name: 'slider10', param: 'refractionRatio', title: 'refractionRatio', min: 0, max: 1, okrug: 100}

		
	];


	_o.arrayName.push(o.name);
	_o.array.push(o);





	// -------------------------------------------- B A S I C -----------------------------------------------------------
	var o = {};
	o.param = THREE.MeshBasicMaterial;
	o.name = 'MeshBasicMaterial';
	o.arrTextur = [
		{ type: 'map', typeYesArray: ['repeat'], typeArray: this.typeArray },
		{ type: 'alphaMap', typeYesArray: ['repeat'], typeArray: this.typeArray },
		{ type: 'specularMap', typeYesArray: ['repeat'], typeArray: this.typeArray },
		{ type: 'lightMap', typeYesArray: ['repeat'], typeArray: this.typeArray },
		{ type: 'aoMap', typeYesArray: ['repeat'], typeArray: this.typeArray }
	];
	o.arrType = this.typeArray;

	o.arrComD = [ // Порядок этих элементов опледеляет порядок в меню Phong
		{name: 'color', param: 'color', title: 'Color'},
		{name: 'check', param: 'skinning', title: 'skinning'},
		{name: 'check1', param: 'flatShading', title: 'flatShading'}, // Нафика - ?, он не взаимодействует со светом
		{name: 'label3', title: 'depthFunc'},
		{name: 'comboBox1', param: 'depthFunc', title: '', arrObj: ['Never', 'Always', 'Less', 'Less or equal', 'Greather or equal (Валит)', 'Greather (Валит)', 'Not equal (Валит)'], arrValue: [THREE.NeverDepth, THREE.AlwaysDepth, THREE.LessDepth, THREE.LessEqualDepth, THREE.GreaterEqualDepth, THREE.GreaterDepth, THREE.NotEqualDepth]},
		{name: 'label2', title: 'Blending'},
		{name: 'comboBox2', param: 'blending', title: '', arrObj: ['NO', 'NORMAL', 'ADDITIVE', 'SUBTRACTIVE', 'MULTIPLY', 'CUSTOM'], arrValue: [THREE.NoBlending, THREE.NormalBlending, THREE.AdditiveBlending, THREE.SubtractiveBlending, THREE.MultiplyBlending, THREE.CustomBlending]},
		{name: 'label1', title: 'side'},
		{name: 'comboBox3', param: 'side', title: '', arrObj: ['FRONT', 'BACK', 'DOUBLE'], arrValue: [THREE.FrontSide, THREE.BackSide, THREE.DoubleSide]},
		{name: 'slider', param: 'opacity', title: 'Opacity', min: 0, max: 1, okrug: 100},
		{name: 'check2', param: 'transparent', title: 'transparent'},
		{name: 'slider1', param: 'alphaTest', title: 'alphaTest', min: 0, max: 1, okrug: 100},
		{name: 'check3', param: 'wireframe', title: 'wireframe'},		
		{name: 'slider4', param: 'reflectivity', title: 'reflectivity', min: 0, max: 1, okrug: 100}, // Зависит от envMap - которой нет --- бесполезен
		{name: 'slider5', param: 'refractionRatio', title: 'refractionRatio', min: 0, max: 1, okrug: 100},
		
	];

	o.arrParam = [
		'color',
		'skinning',
		'flatShading',
		'opacity',
		'transparent',
		'alphaTest',
		'wireframe'
		// "vertexColors",
		// "side",
		// "blending"
	];
	_o.arrayName.push(o.name);
	_o.array.push(o);














	// --------------------------------------------- P H Y S I C A L ----------------------------------------------------------
	var o = {};
	o.param = THREE.MeshPhysicalMaterial;
	o.name = 'MeshPhysicalMaterial';
	o.arrTextur = [
		{ type: 'map', typeYesArray: ['repeat'], typeArray: this.typeArray },
		{ type: 'alphaMap', typeYesArray: ['repeat'], typeArray: this.typeArray },
		{ type: 'bumpMap', typeYesArray: ['repeat'], typeArray: this.typeArray },
		{ type: 'normalMap', typeYesArray: ['repeat'], typeArray: this.typeArray },
		{ type: 'displacementMap', typeYesArray: ['repeat'], typeArray: this.typeArray },
		{ type: 'roughnessMap', typeYesArray: ['repeat'], typeArray: this.typeArray },
		{ type: 'metalnessMap', typeYesArray: ['repeat'], typeArray: this.typeArray },
		{ type: 'lightMap', typeYesArray: ['repeat'], typeArray: this.typeArray },
		{ type: 'aoMap', typeYesArray: ['repeat'], typeArray: this.typeArray },
		{ type: 'emissiveMap', typeYesArray: ['repeat'], typeArray: this.typeArray }
	];
	o.arrType = this.typeArray;
	o.arrParam = [
		'color',
		'roughness',
		'metalness',
		'clearCoat',
		'clearCoatRoughness',
		'emissive',
		'skinning',
		'flatShading',
		'opacity',
		'transparent',
		'alphaTest',
		'wireframe'
		// "vertexColors",
		// "side",
		// "blending"
	];

	o.arrComD = [ // Порядок этих элементов опледеляет порядок в меню Phong
		{name: 'color', param: 'color', title: 'Color'},
		{name: 'slider2', param: 'roughness', title: 'roughness', min: 0, max: 1, okrug: 100},
		{name: 'slider3', param: 'metalness', title: 'metalness', min: 0, max: 1, okrug: 100},
		{name: 'slider4', param: 'reflectivity', title: 'reflectivity', min: 0, max: 1, okrug: 100},
		{name: 'slider5', param: 'clearCoat', title: 'clearCoat', min: 0, max: 1, okrug: 100},
		{name: 'slider6', param: 'clearCoatRoughness', title: 'clearCoatRoughness', min: 0, max: 1, okrug: 100},
		{name: 'slider1', param: 'opacity', title: 'Opacity', min: 0, max: 1, okrug: 100},
		{name: 'check', param: 'transparent', title: 'transparent'},
		{name: 'slider7', param: 'alphaTest', title: 'alphaTest', min: 0, max: 1, okrug: 100},
		{name: 'check1', param: 'wireframe', title: 'wireframe'},
		{name: 'check2', param: 'flatShading', title: 'flatShading'},
		{name: 'label3', title: 'depthFunc'},
		{name: 'comboBox1', param: 'depthFunc', title: '', arrObj: ['Never', 'Always', 'Less', 'Less or equal', 'Greather or equal (Валит)', 'Greather (Валит)', 'Not equal (Валит)'], arrValue: [THREE.NeverDepth, THREE.AlwaysDepth, THREE.LessDepth, THREE.LessEqualDepth, THREE.GreaterEqualDepth, THREE.GreaterDepth, THREE.NotEqualDepth]},
		{name: 'label2', title: 'Blending'},
		{name: 'comboBox2', param: 'blending', title: '', arrObj: ['NO', 'NORMAL', 'ADDITIVE', 'SUBTRACTIVE', 'MULTIPLY', 'CUSTOM'], arrValue: [THREE.NoBlending, THREE.NormalBlending, THREE.AdditiveBlending, THREE.SubtractiveBlending, THREE.MultiplyBlending, THREE.CustomBlending]},
		{name: 'label1', title: 'side'},
		{name: 'comboBox', param: 'side', title: '', arrObj: ['FRONT', 'BACK', 'DOUBLE'], arrValue: [THREE.FrontSide, THREE.BackSide, THREE.DoubleSide]},
		{name: 'check3', param: 'depthTest', title: 'depthTest'},
		{name: 'check4', param: 'depthWrite', title: 'depthWrite'}
	];

	_o.arrayName.push(o.name);
	_o.array.push(o);


	// --------------------------------------------- S T A N D A R D ----------------------------------------------------------
	var o = {};
	o.param = THREE.MeshStandardMaterial;
	o.name = 'MeshStandardMaterial';
	o.arrTextur = [
		{ type: 'map', typeYesArray: ['repeat'], typeArray: this.typeArray },
		{ type: 'alphaMap', typeYesArray: ['repeat'], typeArray: this.typeArray },
		{ type: 'bumpMap', typeYesArray: ['repeat'], typeArray: this.typeArray },
		{ type: 'normalMap', typeYesArray: ['repeat'], typeArray: this.typeArray },
		{ type: 'displacementMap', typeYesArray: ['repeat'], typeArray: this.typeArray },
		{ type: 'roughnessMap', typeYesArray: ['repeat'], typeArray: this.typeArray },
		{ type: 'metalnessMap', typeYesArray: ['repeat'], typeArray: this.typeArray },
		{ type: 'lightMap', typeYesArray: ['repeat'], typeArray: this.typeArray },
		{ type: 'aoMap', typeYesArray: ['repeat'], typeArray: this.typeArray },
		{ type: 'emissiveMap', typeYesArray: ['repeat'], typeArray: this.typeArray }
	];

	o.arrType = this.typeArray;
	o.arrParam = [
		'color',
		
		'roughness',
		'metalness',
		'emissive',
		'skinning',
		'flatShading',
		'opacity',
		'transparent',
		'alphaTest',
		'wireframe'
		// "vertexColors",
		// "side",
		// "blending"
	];

	o.arrComD = [ // Порядок этих элементов опледеляет порядок в меню Phong
		{name: 'color', param: 'color', title: 'Color'},
		{name: 'color2', param: 'emissive', title: 'Emissive'},
		{name: 'slider1', param: 'metalness', title: 'metalness', min: 0, max: 1, okrug: 100},
		{name: 'slider2', param: 'roughness', title: 'roughness', min: 0, max: 5, okrug: 100},

		
		
		{name: 'check', param: 'wireframe', title: 'wireframe'},
		{name: 'label3', title: 'depthFunc'},
		{name: 'comboBox1', param: 'depthFunc', title: '', arrObj: ['Never', 'Always', 'Less', 'Less or equal', 'Greather or equal (Валит)', 'Greather (Валит)', 'Not equal (Валит)'], arrValue: [THREE.NeverDepth, THREE.AlwaysDepth, THREE.LessDepth, THREE.LessEqualDepth, THREE.GreaterEqualDepth, THREE.GreaterDepth, THREE.NotEqualDepth]},
		{name: 'label2', title: 'Blending'},
		{name: 'comboBox2', param: 'blending', title: '', arrObj: ['NO', 'NORMAL', 'ADDITIVE', 'SUBTRACTIVE', 'MULTIPLY', 'CUSTOM'], arrValue: [THREE.NoBlending, THREE.NormalBlending, THREE.AdditiveBlending, THREE.SubtractiveBlending, THREE.MultiplyBlending, THREE.CustomBlending]},
		{name: 'label1', title: 'side'},
		{name: 'comboBox', param: 'side', title: '', arrObj: ['FRONT', 'BACK', 'DOUBLE'], arrValue: [THREE.FrontSide, THREE.BackSide, THREE.DoubleSide]},
		{name: 'slider6', param: 'envMapIntensity', title: 'reflectivity', min: 0, max: 1, okrug: 100},
		{name: 'sliderObject', param: 'normalScale', title: 'normalSc', min: 0, max: 1, okrug: 100},
		{name: 'slider8', param: 'refractionRatio', title: 'refractionRatio', min: 0, max: 1, okrug: 100}
	];

	_o.arrayName.push(o.name);
	_o.array.push(o);



	

/*

	var o = {};
	o.param = "shedow";
	o.array = [ // Порядок этих элементов опледеляет порядок в меню Phong
		{name: 'color', param: 'color', title: 'Color', value:10},
		{name: 'color2', param: 'emissive', title: 'Emissive'},
	]
	_o.array.push(o);*/



/*


	var o = {};
	o.param = THREE.MeshLambertMaterial;
	o.name = "MeshLambertMaterial";
	o.arrTextur = [
	    { type: "map", typeYesArray: ["repeat", "isTexture"], typeArray: this.typeArray },
	    { type: "alphaMap", typeYesArray: ["repeat", "isTexture"], typeArray: this.typeArray },
	    { type: "specularMap", typeYesArray: ["repeat", "isTexture"], typeArray: this.typeArray },
	    { type: "lightMap", typeYesArray: ["repeat", "isTexture"], typeArray: this.typeArray },
	    { type: "aoMap", typeYesArray: ["repeat", "isTexture"], typeArray: this.typeArray },
	    { type: "emissiveMap", typeYesArray: ["repeat", "isTexture"], typeArray: this.typeArray }
	];
	o.arrType = this.typeArray;
	o.arrParam = [
	    "color",
	    "emissive",
	    "skinning",
	    "flatShading",
	    "opacity",
	    "transparent",
	    "alphaTest",
	    "wireframe",
	    // "vertexColors",
	    // "side",
	    // "blending"
	];

	o.arrComD = [ // Порядок этих элементов опледеляет порядок в меню Phong
		{name: 'color', param: 'color', title: 'Color'},
		{name: 'color2', param: 'emissive', title: 'Emissive'},
		{name: 'slider1', param: 'alphaTest', title: 'alphaTest', min: 0, max: 1, okrug: 100}	
	];

	_o.arrayName.push(o.name);
	_o.array.push(o); 



*/


	var o = {};
	o.param = THREE.MeshDepthMaterial;
	o.name = "MeshDepthMaterial";

	o.arrTextur = [
	   
	];
	o.arrType = this.typeArray;

	o.arrParam = [
	    
	];

	o.arrComD = [ // Порядок этих элементов опледеляет порядок в меню Phong
		
	];	

	_o.arrayName.push(o.name);
	_o.array.push(o);/* */




}


var code = [
      'vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;',
      '#ifdef DOUBLE_SIDED',
      'reflectedLight.indirectDiffuse = getAmbientLightIrradiance( ambientLightColor );',
      'reflectedLight.indirectDiffuse *= BRDF_Diffuse_Lambert( diffuseColor.rgb );',
      'reflectedLight.directDiffuse = diffuseColor.rgb;',
      'reflectedLight.directDiffuse *= BRDF_Diffuse_Lambert( diffuseColor.rgb ) * getShadowMask();',
      'vec3 outgoingLight = (reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance).rgb * ( 1.0 - 0.45 * ( 1.0 - getShadowMask() ) );',
      '#else',
      'vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;',
      '#endif'
  ].join('\n');


THREE.ShaderLib[ 'lambert' ].fragmentShader = THREE.ShaderLib[ 'lambert' ].fragmentShader.replace(code);








/* var o = {};
o.param = THREE.MeshNormalMaterial;
o.name = "MeshNormalMaterial";
o.arrTextur = [
    { type: "bumpMap", typeYesArray: ["repeat", "isTexture"], typeArray: this.typeArray },
    { type: "normalMaps", typeYesArray: ["repeat", "isTexture"], typeArray: this.typeArray },
    { type: "displacementMap", typeYesArray: ["repeat", "isTexture"], typeArray: this.typeArray }
];
o.arrType = this.typeArray;
o.arrParam = [
    "skinning",
    "flatShading",
    "opacity",
    "transparent",
    "alphaTest",
    "wireframe",
    // "vertexColors",
    // "side",
    // "blending"
];
_o.arrayName.push(o.name);
_o.array.push(o); */





// ------------------------------------------- S P R I T E ------------------------------------------------------------
/*
var o = {};
o.param = THREE.SpriteMaterial;
o.name = 'SpriteMaterial';//
o.arrTextur = [
	{ type: 'map', typeYesArray: ['repeat'], typeArray: this.typeArray },
	{ type: 'alphaMap', typeYesArray: ['repeat'], typeArray: this.typeArray },
	{ type: 'bumpMap', typeYesArray: ['repeat'], typeArray: this.typeArray },
	{ type: 'normalMap', typeYesArray: ['repeat'], typeArray: this.typeArray },
	{ type: 'displacementMap', typeYesArray: ['repeat'], typeArray: this.typeArray },
	{ type: 'specularMap', typeYesArray: ['repeat'], typeArray: this.typeArray },
	{ type: 'lightMap', typeYesArray: ['repeat'], typeArray: this.typeArray },
	{ type: 'aoMap', typeYesArray: ['repeat'], typeArray: this.typeArray },
	{ type: 'emissiveMap', typeYesArray: ['repeat'], typeArray: this.typeArray }
];
o.arrType = this.typeArray;
o.arrParam = [
	'color',
	'emissive',
	'specular',
	'shininess',
	'skinning',
	'flatShading',
	'opacity',
	'transparent',
	'alphaTest',
	'wireframe'
	// "vertexColors",
	// "side",
	// "blending"
];

o.arrComD = [ // Порядок этих элементов опледеляет порядок в меню Phong
	// {name: 'input1', param: 'name', title: 'Name'},
	{name: 'color', param: 'color', title: 'Color'},
	{name: 'slider1', param: 'opacity', title: 'Opacity', min: 0, max: 1, okrug: 100},
	{name: 'check', param: 'transparent', title: 'transparent'},
	{name: 'slider7', param: 'alphaTest', title: 'alphaTest', min: 0, max: 1, okrug: 100},
	{name: 'label3', title: 'depthFunc'},
	{name: 'comboBox1', param: 'depthFunc', title: '', arrObj: ['Never', 'Always', 'Less', 'Less or equal', 'Greather or equal (Валит)', 'Greather (Валит)', 'Not equal (Валит)']},
	{name: 'label1', title: 'side'},
	{name: 'comboBox', param: 'side', title: '', arrObj: ['FRONT', 'BACK', 'DOUBLE']},
	{name: 'label2', title: 'Blending'},
	{name: 'comboBox2', param: 'blending', title: '', arrObj: ['NO', 'NORMAL', 'ADDITIVE', 'SUBTRACTIVE', 'MULTIPLY', 'CUSTOM']},
	{name: 'check3', param: 'depthTest', title: 'depthTest'},
	{name: 'check4', param: 'depthWrite', title: 'depthWrite'}
];

_o.arrayName.push(o.name);
_o.array.push(o);
*/

/* var o = {};
o.param = THREE.MeshToonMaterial;
o.name = "MeshToonMaterial";
o.arrTextur = [
    { type: "map", typeYesArray: ["repeat", "isTexture"], typeArray: this.typeArray },
    { type: "alphaMap", typeYesArray: ["repeat", "isTexture"], typeArray: this.typeArray },
    { type: "bumpMap", typeYesArray: ["repeat", "isTexture"], typeArray: this.typeArray },
    { type: "normalMap", typeYesArray: ["repeat", "isTexture"], typeArray: this.typeArray },
    { type: "displacementMap", typeYesArray: ["repeat", "isTexture"], typeArray: this.typeArray },
    { type: "specularMap", typeYesArray: ["repeat", "isTexture"], typeArray: this.typeArray },
    { type: "lightMap", typeYesArray: ["repeat", "isTexture"], typeArray: this.typeArray },
    { type: "aoMap", typeYesArray: ["repeat", "isTexture"], typeArray: this.typeArray },
    { type: "emissiveMap", typeYesArray: ["repeat", "isTexture"], typeArray: this.typeArray },
    { type: "gradientMap", typeYesArray: ["repeat", "isTexture"], typeArray: this.typeArray }
];
o.arrType = this.typeArray;
o.arrParam = [
    "color",
    "emissive",
    "specular",
    "shininess",
    "skinning",
    "flatShading",
    "opacity",
    "transparent",
    "alphaTest",
    "wireframe",
    "isMeshToonMaterial"
];
_o.arrayName.push(o.name);
_o.array.push(o);
*/





/*	 

	this.comboBox = new PLComboBox(this.content, 0, 0, this.object.arrayName, function () {
		var o = {};
		o.tSet = 'reMat';
		o.idArr = dinPO.getIdMat(self.material);
		o.obj = {};
		o.obj.type = self.object.arrayName[this.index];
		dinPO.dragSetA(dinPO._index, false);
		// Полностью очищаем сет относительно одного матерьяла
		managerProduct.cleanSet(dinPO, dinPO.arraySet[dinPO.index], o.idArr, 'cleanMat');
		dinPO.addSet(o);
		dinPO.dragSetA(dinPO._index, true);

		cMaterial.updateLinkMaterial(dinPO);
		cMaterial.setIndex(self.cMGron.idArr);

		self.settingsBig.setActMouseAll(!this._visiPanel);
	});
	this.comboBox.faceElementFun = function () {
		self.settingsBig.setActMouseAll(!this._visiPanel);
	};

	this.settingsBig.tipRide = true;

	this.settingsBig.dinFun = function () {
		minV3D.intRend = 1;
		visi3D.intRend = 1;
	};

	this.funComplit = function (_com) {		
		var obj = {};
		cMaterial.updateGal();
		bigMenu.menuTS.updateArrMaterial();
		

		if (typeof _com.param === 'object') {
			if (_com.type != undefined) {
				if (_com.type == 'PLsettingsBig') {
					var oo = {};
					oo[_com.componentS.param] = _com.componentS.value;
					obj[_com.text] = oo;
				}
			}
		} else {
			// если параметр стринговый _com.param а значение параметра в материале обьект
			if (typeof self.material[_com.param] === 'object') {				
				
				var oo = {};
				// если у компонента есть параметры для обновления
				if (_com.typeYesArray) {
					// пройдемся по обьекту материала и сохраним значения параметров с typeYesArray
					for (var i = 0; i < _com.typeYesArray.length; i++) {
						oo[_com.typeYesArray[i]] = self.material[_com.param][_com.typeYesArray[i]];
					}
					obj[_com.param] = oo;
				}else{
					
					if(_com.type === "PLColorTHREE"){
						obj[_com.param] = {
							r:self.material[_com.param].r,
							g:self.material[_com.param].g,
							b:self.material[_com.param].b
						};
					}
				} 
			} else {
				obj[_com.param] = self.material[_com.param];
			}
		}


		self.material.needsUpdate = true;

		if (self._boolDrag == false)self.creatSet(obj);
		else materialParam.funSobMat(self.material);
	};

	this.settingsBig.funMinimize = function (_minimize) {
		self._height = self.wh + self.otstup * 2 + this._height;
		// self.setH();

	};

	this.creatSet = function (_obj) {
		
		var o = {};		
		o.tSet = 'mat';
		o.idArr = dinPO.getIdMat(self.material);
		o.obj = _obj;
		dinPO.addSet(o);
	};

	this._tipMaterial = 'null';
	this.restartGaleri = function (_material) {
		this.objectParam = korektM.getObjToMat(this.material);
		//if (this.objectParam == null) return false;
		//if (this._tipMaterial == this.objectParam.name) return true;// уже перестроили
		this._tipMaterial = this.objectParam.name;
		// this.settingsBig.typeYesArray = this.objectParam.arrParam;
		
		//if (this.objectParam.arrComD != undefined) {
			//this.settingsBig.typeArray = [];
			var o = {};
			o.arrComp = [];
			for (var i = 0; i < this.objectParam.arrComD.length; i++) {
				o.arrComp.push(this.objectParam.arrComD[i]);
			}
			o.param = this.material;
			o.funComplit=this.funComplit
		
			this.settingsBig.setObj(o);
			// this.scrollPane.width = this.width
			this.scrollPane.height = this._height;
			this.scrollPane.heightContent = this.settingsBig.finalHeight;
			this.scrollPane.update();
		// } else {
			
		// 	this.settingsBig.typeArray = this.objectParam.arrType;
		// 	this.settingsBig.addObject(this.material);
			
		// }


	};


	this.objectParam;
	this.material;
	this.cMGron;
	this.setcMGron = function (cMGron) {
		this.cMGron = cMGron;
	};

	this.scrolUpdate = function (_h) {
		this.scrollPane.heightContent = this.settingsBig.finalHeight;
		this.scrollPane.height = _h;
		this.scrollPane.update();
	};

	this.setMaterial = function (material) {
		this.material = material;
		this.objectParam = korektM.getObjToMat(this.material);
		if (this.objectParam == null) return false;
		this.restartGaleri(this.material);

		// this.settingsBig.w.text = 'Material';

		if (this.material.type) {
			for (var i = 0; i < this.object.arrayName.length; i++) {
				if (this.object.arrayName[i] == this.material.type) {
					this.comboBox.index = i;
					break;
				}
			}
		}

		this.height = this.wh + this.otstup + (this.settingsBig.finalHeight + this.wh) * this.scalM;

	};

	this.setH = function () {
		// var n= this.content.y+this.settingsBig.w.y+this.settingsBig.w.height*0.7+pl102.wh*0.7+this.otstup;
		// materialParam.setH(n)

	};


	this.getNameMaterial = function (_material) {
		for (var i = 0; i < this.array.length; i++) {
			if (this.array[i].type.type == _material.type) {
				return this.array[i].type.type;
			}
		}
		return 'null';
	};

	this.getObjToMat = function (_material) {
		for (var i = 0; i < this.array.length; i++) {
			if (this.array[i].name == _material.type) {
				return this.array[i];
			}
		}
		return null;
	};

	this.scalM = 0.7;

	this.sizeWindow = function (w, h) {
		this._w = w; // screen width
		this._h = h; // screen height
		this.draw();

	};

	this.draw = function () {
		this.comboBox.width = this.width - this.otstup;
		this.scrollPane.width = this._width + 4;
		this._height = this._h - 303;
		this.scrollPane.update();
		//
		//  if (this._largeMenu == false) {
		// 	this.settingsBig.y = this.wh + this.otstup;
		// 	this.settingsBig.x = 0;
		// 	var vsc = this.settingsBig.w.scale.y;
		// 	this.settingsBig.heightWindow = ((this._h / main.scale - 455) / vsc) - this.wh * vsc - this.otstup * 4;
		// 	this.scalM = 0.7;
		// 	this.settingsBig.width = this.width * (1 / this.scalM);
		// 	this.settingsBig.w.scale.set(this.scalM, this.scalM);
		// 	this.height = this.wh + this.otstup + (this.settingsBig.finalHeight + this.wh) * this.scalM;
		// } else {
		// 	this.settingsBig.y = -(400);
		// 	this.settingsBig.x = 200;
		// 	this.settingsBig.heightWindow = 720;
		// 	this.scalM = 1;
		// 	this.settingsBig.width = this.width * (1 / this.scalM);
		// 	this.settingsBig.w.scale.set(this.scalM, this.scalM);

		// 	this.height = this.wh + this.otstup + (this.settingsBig.finalHeight + this.wh) * this.scalM;
		// } 


	};

	this.draw();*/