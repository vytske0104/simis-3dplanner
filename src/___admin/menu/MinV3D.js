




var minV3D;
export  function MinV3D (parent) {
	window.minV3D=this;

	//aGlaf
	window.geom = new THREE.BoxBufferGeometry(100, 100, 100, 8, 8)
	this.mash = new THREE.Mesh(geom);
	var w, h,x,z,zume;
	this.getPic=function(m, wh){
		this.mash.material=m;

		w=aGlaf.visi3D.width;
        h=aGlaf.visi3D.height;
        x=aGlaf.visi3D.rotationX;
        z=aGlaf.visi3D.rotationZ;

        var _xVerh=aGlaf.visi3D._xVerh;
       	var _yVerh=aGlaf.visi3D._yVerh;
       	var _zVerh=aGlaf.visi3D._zVerh;

        zume=aGlaf.visi3D.zume;

        aGlaf.visi3D.groupObject.remove(aGlaf.content3d);
        aGlaf.visi3D.groupObject.add(this.mash)
        aGlaf.visi3D.utility.debug = false;



        //aGlaf.visi3D.utility.focus.active=true;
        //aGlaf.visi3D.utility.focus.targetObject=aGlaf.visi3D.groupObject;

        aGlaf.visi3D.xVerh=0
        aGlaf.visi3D.yVerh=0
        aGlaf.visi3D.zVerh=0

        aGlaf.visi3D.rotationX=1.32
        aGlaf.visi3D.rotationZ=-0.1
        aGlaf.visi3D.zume=200
        aGlaf.visi3D.sizeWindow(aGlaf.visi3D._x,aGlaf.visi3D._y,wh,wh);

        aGlaf.visi3D.render();
        var r = aGlaf.visi3D.renderer.domElement.toDataURL();

        aGlaf.visi3D.sizeWindow(aGlaf.visi3D._x,aGlaf.visi3D._y,w,h);


        aGlaf.visi3D.utility.debug = true;

        aGlaf.visi3D.groupObject.remove(this.mash)
        aGlaf.visi3D.groupObject.add(aGlaf.content3d);
        aGlaf.visi3D.rotationX=x;
        aGlaf.visi3D.rotationZ=z;
        aGlaf.visi3D.zume=zume;

        aGlaf.visi3D.xVerh=_xVerh
        aGlaf.visi3D.yVerh=_yVerh
        aGlaf.visi3D.zVerh=_zVerh

        return r;
	}
}





/*


function PlusV3D (_minV3D) {
	this.minV3D = _minV3D;
	this.plus;
	this.index = 0;
	this.material = new THREE.MeshStandardMaterial({color: 0xffffff, side: THREE.DoubleSide});
	var material = new THREE.MeshBasicMaterial({color: 0xffff00, side: THREE.DoubleSide});
	var arrGeometry = [];
	var PI = Math.PI;
	arrGeometry.push({geom: new THREE.SphereBufferGeometry(165, 32, 8), rotX: 0.2, rotY: -PI / 2, rotZ: PI });
	arrGeometry.push({geom: new THREE.CylinderBufferGeometry(160, 160, 265, 25, 8), rotX: 0.2, rotY: 0.1, rotZ: PI });
	arrGeometry.push({geom: new THREE.BoxBufferGeometry(280, 280, 280, 8, 8), rotX: 0.15, rotY: 0.15, rotZ: PI });
	arrGeometry.push({geom: new THREE.PlaneBufferGeometry(320, 320, 8, 8), rotX: 0, rotY: PI, rotZ: PI });

	// Поправить //@
	arrGeometry['dinGeom'] = {geom: new THREE.PlaneBufferGeometry(320, 320, 8, 8), rotX: 0, rotY: 0, rotZ: PI };

	this.geometry = arrGeometry[0].geom;
	this.mash = new THREE.Mesh(this.geometry, this.material);
	this.mash.rotation.x = arrGeometry[0].rotX;
	this.mash.rotation.y = arrGeometry[0].rotY;
	this.mash.rotation.z = arrGeometry[0].rotZ;
	this.minV3D.groupObject.add(this.mash);

	this.sprite = new THREE.Sprite();
	this.sprite.visible = false;

	this.minV3D.zume = 250;

	this.setMaterial = function (_m) {
		this.material = _m;
		this.mash.material = _m;
		this.minV3D.intRend = 1;
	};

	this.switchGeometry = function (index) {
		if (!arrGeometry[index]) return;
		if (this.geometry == arrGeometry[index].geom) return;
		this.index = index;
		this.geometry = arrGeometry[index].geom;
		this.mash.geometry = arrGeometry[index].geom;
		this.mash.rotation.x = arrGeometry[index].rotX;
		this.mash.rotation.y = arrGeometry[index].rotY;
		this.mash.rotation.z = arrGeometry[index].rotZ;
		if (arrGeometry[index].rotZ != undefined) this.mash.rotation.z = arrGeometry[index].rotZ;
		this.minV3D.intRend = 1;
	};


	this.getPicMat = function (_m) {
		_m.needsUpdate = true;// нужно вызвать до и после рендера (чтоб перекомпилился материал при рендере на другом рендере)
		this.mash.visible = false;
		this.sprite.visible = false;
		if (_m.type != 'SpriteMaterial') {
			this.mash.visible = true;
			this.mash.material = _m;
			this.mash.material.needsUpdate = true;
			if (managerProduct.cubeMap && this.mash.material.envMap) {
				managerProduct.cubeMap.upDate(this.minV3D.renderer);
			}
			this.updateRender();

		} else {
			this.sprite.material = _m;
			this.sprite.material.needsUpdate = true;
			this.updateRender();
		}
		var base = this.minV3D.renderer.domElement.toDataURL();
		this.mash.visible = true;
		this.sprite.visible = false;
		_m.needsUpdate = true;

		return base;
	};

	this.updateRender = function () {
		if (this.mash.material) {
			this.mash.material.needsUpdate = true;
		}
		this.minV3D.render();
	};

	this.getObj = function () {
		var obj = {};
		obj.index = this.index;
		obj.bTextur = this.minV3D.bTextur;
		obj.material = this.mash.material;
		obj.scale = new THREE.Vector3(this.mash.scale.x, this.mash.scale.y, this.mash.scale.z);
		obj.rect = new Rectangle(this.minV3D.x, this.minV3D.y, this.minV3D._width, this.minV3D._height);
		return obj;
	};

	this.setObj = function (obj) {
		this.switchGeometry(obj.index);
		this.minV3D.bTextur = obj.bTextur;
		this.mash.material = obj.material;
		this.mash.scale.set(obj.scale.x, obj.scale.y, obj.scale.z);
		this.minV3D.sizeWindow(obj.rect.x, obj.rect.y, obj.rect.width, obj.rect.height);
	};


	this.getPicIcon = function (_m, _i, _w, _h) {
		var rez, obj;
		obj = this.getObj();
		var s = _w / this.minV3D._width;
		this.mash.scale.set(s, s, s);
		this.switchGeometry(_i);
		this.minV3D.bTextur = false;
		this.minV3D.sizeWindow(this.minV3D.x, this.minV3D.y, _w, _h);

		rez = this.getPicMat(_m || this.mash.material);

		this.setObj(obj);
		this.updateRender();

		return rez;
	};
}


var minV3D;
function MinV3D (parent) {

	var self = this;
	this.parent = parent;
	minV3D = this;

	this.arrSetiScene = [];
	this.x = 0;
	this.y = 0;
	this._height = 100;
	this._width = 100;

	this.yes3d = true;


	this.camera;


	this.scene = new THREE.Scene();

	this.intRendOk = 1;
	if (bigBaza.webGL) {
		// this.camera = new THREE.PerspectiveCamera( 60, this._width / this._height, 1, 45000 );
		this.camera = new THREE.OrthographicCamera(-this._width, this._width, this._height, -this._height, 1, 45000);


		if (bigBaza.devas == true) {
			this.renderer = new THREE.WebGLRenderer();
		} else {

			this.renderer = new THREE.WebGLRenderer({antialias: true, alpha: true });
			// this.renderer.shadowMapEnabled = true;
			this.renderer.shadowMap.enabled = true;
		}

		this.renderer.setSize(this._width, this._height);
		this.renderer.domElement.style.zIndex = -100;
		this.renderer.domElement.style.position = 'fixed';
		this.renderer.setClearColor('#ffffff', 0);
		// this.renderer.shadowMapType = THREE.PCFSoftShadowMap;
		this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;
	} else {
		// this.camera = new THREE.PerspectiveCamera( 60, this._width / this._height, 1, 10000 );
		this.camera = new THREE.OrthographicCamera(-this._width, this._width, this._height, -this._height, 1, 10000);

		this.renderer = new THREE.CanvasRenderer({ alpha: true });
		this.renderer.setClearColor('#ffffff', 0);
		this.renderer.setSize(this._width, this._height);
		this.intRendOk = 3;
	}
	this.efect = new EffectArray(this, ['RenderPass', 'OutlinePass', 'ShaderPass'/*, "RenderPass",,"SAOPass"]);
	this.camera.position.set(0, 0, -60);
	this.camera.rotation.set(Math.PI, 0, 0);


	var contHTML;
	this.event3DArr;


	// this.contentHTML.appendChild( this.renderer.domElement);
	main.contentHTML.appendChild(this.renderer.domElement);
	this.renderer.domElement.style.zIndex = -111;
	this.renderer.domElement.style.position = 'fixed';
	this.renderer.domElement.style.top = '220px';
	this.renderer.domElement.style.left = '220px';


	this.group = new THREE.Object3D();
	this.scene.add(this.group);
	this.group1 = new THREE.Object3D();
	this.group.add(this.group1);
	this.group2 = new THREE.Object3D();
	this.group1.add(this.group2);
	this.groupObject = new THREE.Object3D();
	this.group2.add(this.groupObject);
	this.group3d = new THREE.Object3D();
	this.groupObject.add(this.group3d);


	this.gCGG = new THREE.Object3D();
	this.group.add(this.gCGG);
	this.gCAngel = new THREE.Object3D();
	this.gCGG.add(this.gCAngel);
	this.gCam1 = new THREE.Object3D();
	this.gCAngel.add(this.gCam1);
	this.gCam2 = new THREE.Object3D();
	this.gCam1.add(this.gCam2);
	this.ggCam = new THREE.Object3D();
	this.gCam2.add(this.ggCam);
	this.ggCam.add(this.camera);


	this.arrPoint = [];
	var disLig = 4000;
	var powerLig = 0.4;
	var dis = 10000;
	var color = 0xffffff;

	var loader = new THREE.TextureLoader();
	this.bgTexture = loader.load('resources/images/pic.jpg');

	this.restartPosition = function () {

		this.arrPoint[0] = new THREE.PointLight(color, powerLig, dis);
		// this.scene.add( this.arrPoint[0] );
		this.arrPoint[1] = new THREE.PointLight(color, powerLig, dis);
		// this.scene.add( this.arrPoint[1] );
		this.arrPoint[2] = new THREE.PointLight(color, powerLig, dis);
		// this.scene.add( this.arrPoint[2] );
		this.arrPoint[3] = new THREE.PointLight(color, powerLig, dis);
		// this.scene.add( this.arrPoint[3] );


		this.arrPoint[0].position.set(0, disLig, -disLig);
		this.arrPoint[1].position.set(0, -disLig, -disLig);
		this.arrPoint[2].position.set(-disLig, 0, -disLig);
		this.arrPoint[3].position.set(disLig, 0, -disLig);
	};
	this.restartPosition();

	this.sunLight;
	if (bigBaza.devas == false) {
		this.ambientLight = new THREE.AmbientLight('#ffffff', 0.79);// 0.8);
		this.scene.add(this.ambientLight);


		var sunIntensity = 0.22;
		this.sunLight = new THREE.DirectionalLight(color, sunIntensity, 0, 0, 0.2);
		this.sunLight.position.set(4500, 11000, -8000);
		this.sunLight.castShadow = true;
		this.sunLight.shadow.camera.near = 7000;
		this.sunLight.shadow.camera.far = 20000;

		this.sunLight.shadow.camera.right = 8000;
		this.sunLight.shadow.camera.left = -8000;
		this.sunLight.shadow.camera.top	= 8000;
		this.sunLight.shadow.camera.bottom = -8000;
		this.sunLight.shadow.mapSize.width = 4096;
		this.sunLight.shadow.mapSize.height = 4096;
		this.sunLight.shadow.bias = 0.0001;

		this.scene.add(this.sunLight);
		this.spotLightHelper = new THREE.DirectionalLightHelper(this.sunLight);
	}


	this.render = function () {

		if (this.yes3d == false) return;
		this.renderer.render(this.scene, this.camera);
		this.intRend = 10;

		if (this.spotLightHelper) this.spotLightHelper.update();
		// if(composer!=undefined) composer.render();
		this.efect.render();

	};
	this.upDate = function () {
		if (this.intRend == this.intRendOk) {
			this.render();
		}
		if (this.intRend < 10) this.intRend++;
	};


	this.intRend = 1;


	this.sizeWindow = function (_x, _y, _width, _height) {
		this.x = _x;
		this.y = _y;
		this._height = _height;
		this._width = _width;

		// this.renderer.domElement.style.zIndex=zIndex;
		this.renderer.domElement.style.top = _y + 'px';
		this.renderer.domElement.style.left = _x + 'px';


		// this.camera.aspect = this._width / this._height;
		this.camera.left = -this._width / main.scale;
		this.camera.right = this._width / main.scale;
		this.camera.top = this._height / main.scale;
		this.camera.bottom = -this._height / main.scale;

		this.camera.updateProjectionMatrix();
		this.renderer.setSize(this._width, this._height);
		this.intRend = 1;

		// if(event3DArr)event3DArr.sizeWindow(_width, _height);
		this.efect.sizeWindow(_width, _height);
	};


	var rx = 1000;
	var ry = 2500;
	this.offsetD = 11000;
	this.offsetX = 0.9;
	this.offsetY = 0.9;
	this.dragSunLight = function () {

		if (this.sunLight) {
			this.sunLight.position.x = Math.abs(this.offsetD) * Math.cos(this._rotationZ + this.offsetX);
			this.sunLight.position.y = Math.abs(this.offsetD) * Math.sin(this._rotationZ + this.offsetY);
		}
	};
	// отдают точку где 1 ратояние 2 угло
	this.getVector = function (length, angle) {
		var a = Math.abs(length) * Math.cos(angle);
		var b = Math.abs(length) * Math.sin(angle);
		return new THREE.Vector2(a, b);
	};


	this.rotationX = 0;
	this.rotationZ = 0;
	this.zume = 200;
	this.yVerh = -75;


	this.render();


	this.setObject = function (obj) {
		this.rotationX = obj.rotationX;
		this.rotationZ = obj.rotationZ;
		this.zume = obj.zume;
		this.yVerh = obj.yVerh;
	};
	this.getObject = function (obj) {
		var obj = {};
		obj.rotationX = this.rotationX;
		obj.rotationZ = this.rotationZ;
		obj.zume = this.zume;
		obj.yVerh = this.yVerh;
		return obj;
	};


	this.tween = new TWEEN.Tween(this);
	this.startPosit = function () {
		this.tween.to({
			rotationZ: 0,
			rotationX: 0.98 }, 1000).start();
	};

	this.plus = new PlusV3D(this);
}

MinV3D.prototype = {
	set rotationX (v) {

		this._rotationX = v;
		this.intRend = 1;
		this.gCam2.rotation.x = v;

	},
	get rotationX () {
		return this._rotationX;
	},

	set rotationZ (v) {
		this._rotationZ = v;// %(Math.PI*2);
		this.gCam1.rotation.z = v;
		this.intRend = 1;
		this.dragSunLight();
		// this.parent.angel=this._rotationZ;
	},
	get rotationZ () {
		return this._rotationZ;
	},
	set zume (v) {
		this._zume = v;
		this.ggCam.position.z = -v;
		this.camera.position.z = 0;
		this.intRend = 1;
	},
	get zume () {
		return this._zume;
	},
	set yVerh (v) {
		this._yVerh = v;
		this.gCGG.position.z = v;
		this.intRend = 1;
	},
	get yVerh () {
		return this._yVerh;
	},
	set arrOut (v) {

		this._arrOut = v;
		this.efect.setArrayMash('OutlinePass', this._arrOut);
		this.intRend = 1;
	},
	get arrOut () {
		return this._arrOut;
	},
	set bTextur (v) {
		if (this._bTextur == v) return;
		this._bTextur = v;
		if (v == true) this.scene.background = this.bgTexture;
		else if (v == false) this.scene.background = null;
		this.intRend = 1;
	},
	get bTextur () {
		return this._bTextur;
	}


};


*/
