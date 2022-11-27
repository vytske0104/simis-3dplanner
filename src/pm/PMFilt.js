


import MeshCombined from './instance/MeshCombined.js';


export default function PMFilt(par, visi3D, objbase) { 
	this.type="PMFilt";
	var self=this;

    this.par=par
    this.visi3D=visi3D
    this.objbase=objbase;

    //this.pmText=new PMText(this, visi3D);
    
    this.ceshGeom=new CeshGeom(this)

    var b
    this.setObjS = function (hron,fun){
    	b=true;    

    	if(hron.object.filt)if(hron.object.filt.length!=0){    		
    		new StartFilt(this,hron,fun);
    		return
    	}
    	//if(hron.object.
    	/*if(hron.object.iz){
    		this.par.iz.setHron(hron, null)//.content3d,hron.object.iz)
    	}*/
    	
    	this.finalObjS(hron,fun)
    }

    this.finalObjS = function (hron,fun){    	
    	

   		//self.dragPozition(hron)

   		if(hron.object.param){
   			//self.dragParam(hron.content3d, hron.object.param) 	
    		if(hron.object.param.kesh==true)  self.ceshGeom.set(hron.content3d)

    		if(hron.object.param.sG!=undefined)if(hron.object.param.sG==true)self.ceshGeom.groupGeometri(hron.content3d)
    		
    	}
    	fun();
    }


    this.dragParam = function (c3d, obj){ 
		if(c3d.children){
			for (var i = c3d.children.length - 1; i >= 0; i--) {
				this.dragParam(c3d.children[i],obj)
			}
		}
		if(c3d.bs==undefined){
			c3d.castShadow = obj.tOt;		
			c3d.receiveShadow = obj.tNa;
		}
		var b=obj.rO;

		if(c3d.iz)if(c3d.iz.renderOrder)b=c3d.iz.renderOrder;
		c3d.renderOrder=b;
	}






	this.dragPozition = function(hron){
		var b=false
		if(hron.object)	{
			if(hron.object.psm)	{

				b=true
				if(hron.object.psm.active!=undefined)if(hron.object.psm.active==false)b=false
			}			
		}
		

		if(b==true){
			hron.content3d.position.set(hron.object.psm.p[0],hron.object.psm.p[1],hron.object.psm.p[2])
			hron.content3d.rotation.set(hron.object.psm.r[0],hron.object.psm.r[1],hron.object.psm.r[2])
			hron.content3d.scale.set(hron.object.psm.s[0],hron.object.psm.s[1],hron.object.psm.s[2])
		}else{
			hron.content3d.position.set(0,0,0);
			hron.content3d.rotation.set(0,0,0);
			hron.content3d.scale.set(1,1,1);
		}
	}
}



export function StartFilt(par, hron,fun) { 
	this.type="StartFilt";
	var self=this;
	this.par=par
    this.hron=hron
    this.fun=fun
    this.hron.filt=this
    this.array=[]
    var sahF=0;
    var type
    this.dragFilt = function (){   
 	
    	if(sahF==this.hron.object.filt.length){       		
       		this.par.finalObjS(this.hron,this.fun)    		
    		return
    	}

    	type=this.hron.object.filt[sahF].type
    	sahF++;
    	
    	if(type=="mark")this.array.push(new PMMark(this, this.hron.object.filt[sahF-1], this.array.length))
    	if(type=="material")this.array.push(new PMMaterial(this, this.hron.object.filt[sahF-1], this.array.length))	
    }


    this.dragFilt();
}





export function PMMaterial(par, obj, idArr) { 
	this.type="PMMaterial";

	var self=this;
	this.par=par;
	this.obj=obj;
	this.idArr=idArr;

	this.mat=this.par.par.par.mat.getTestTitle(obj.id)


	if(this.mat==null){
		this.par.dragFilt()
		return
	}


	this.parsing = function(c3d){
		if(c3d.children){
			for (var i = c3d.children.length - 1; i >= 0; i--) {
				this.parsing(c3d.children[i])
			}
		}
		if(c3d.material!=undefined){
			c3d.material=this.mat;
		}

	}
	this.parsing(par.hron.content3d);
	this.par.dragFilt();

}




export function PMMark(par, obj, idArr) { 
	this.type="PMMark";

	var self=this;
	this.par=par;
	this.obj=obj;
	this.idArr=idArr;

	this.idKey=obj.id
	this.c3d=par.hron.content3d;

	this.arrName=[]
	this.arrayObj=[]

	if(this.idKey=="null"){
		this.par.dragFilt()
		return
	}


	var bbbb=true;
	if(obj.id.indexOf("|")!=-1){ 
		var aa=obj.id.split("|")
		var aa1=aa[0].split(",")
		var aa2=aa[1].split(",")
			
		for (var i = 0; i < aa1.length; i++) {
			
			this.arrName[i]={name:aa1[i], id:aa2[i]*1, obCont:null};
		}
		bbbb=false;
	}else{
		bbbb=true;
		this.arrName[0]={name:"null", id:obj.id, obCont:null};
	}

	

	var old, nnn
	this.parsing = function(c3d){

		if(c3d.children){
			for (var i = c3d.children.length - 1; i >= 0; i--) {
				this.parsing(c3d.children[i])
			}
		}


		if(c3d.type=="Mesh"){	
			if(bbbb){	
				
				nnn=this.arrName[0].obCont.clone();
				c3d.parent.add(nnn)
				nnn.position.set(c3d.position.x,c3d.position.y,c3d.position.z);
        		nnn.rotation.set(c3d.rotation.x,c3d.rotation.y,c3d.rotation.z);
        		nnn.scale.set(c3d.scale.x,c3d.scale.y,c3d.scale.z);
				c3d.parent.remove(c3d);								
			}else{
				if(c3d.name){
					for (var i = this.arrName.length - 1; i >= 0; i--) {
						
						if(c3d.name.indexOf(this.arrName[i].name)!=-1){
							nnn=this.arrName[i].obCont.clone();
							c3d.parent.add(nnn)
							

							//if(c3d.name.indexOf("Treexz")==-1)c3d.parent.add(nnn)
							nnn.position.set(c3d.position.x,c3d.position.y,c3d.position.z);
        					nnn.rotation.set(c3d.rotation.x,c3d.rotation.y,c3d.rotation.z);
        					nnn.scale.set(c3d.scale.x,c3d.scale.y,c3d.scale.z);
							c3d.parent.remove(c3d);	
							return
						}
					}
				}
			}				
		}


	}



	this.loadMMM = function(o){	

		this.par.par.par.getId(o.id*1,function(c3d){
			
			o.obCont = c3d;			
			self.loadMod()
		})
	}



	this.loadMod = function(){
	
		for (var i = 0; i < this.arrName.length; i++) {
			if(this.arrName[i].obCont==null){
				this.loadMMM(this.arrName[i])
				return
			}
		}
		
		this.parsing(this.c3d)		
		this.par.dragFilt()

	}




	this.loadMod()
}









export function PMText(par, visi3D) { 
	this.type="PMText";
	var self=this;

    this.par=par
    this.visi3D=visi3D

	this.cont3d=undefined
	this.array=undefined
	var kol=0
    this.setHron=function(hron){
    	
    	this.cont3d=hron.content3d;
    	this.array=hron.object.fT.array;
		kol=0
    	this.parsing(this.cont3d)
    }	

    var cc;
    this.parsing=function(c3d){
    	if(c3d.name){    		
    		for (var i = 0; i < this.array.length; i++) {
    			if(c3d.name==this.array[i].key){
    				p=i
    				this.pPlus(c3d,this.array[i])
    				return
    			}
    		}    		
    	}

    	if(c3d.children){
    		for (var i = c3d.children.length - 1; i >= 0; i--) {
    			this.parsing(c3d.children[i])
    		}
    	}
    }

	this.pPlus=function(c3d,){

	}    
}



export function CeshGeom(par) { 
	this.type="CeshGeom";
	var self=this;
	self.kolCount=9999
	this.par=par
	
	var objBody = {};
	var kolA
	var geometry,material,mesh, meshPar,mesh1

	var instancePositions = [];
	var instanceQuaternions = [];
	var instanceScales = [];	

	this.set=function(c3d){	
		objBody = {};
		self.fillObjMesh(c3d);	
	
		for(var s in objBody){
			if(objBody[s].length>=2){
				

				/*
				for (var i = objBody[s].length-1; i >=0; i--) {
					mesh=objBody[s][i]
					moveObject(mesh,c3d);
					meshPar=mesh.parent
					meshPar.remove(mesh);					
				}				
				this.meshCombined = new MeshCombined(objBody[s]);
				c3d.add(this.meshCombined);*/

				new LoadTime(this, c3d, objBody[s])


			}
		}
		
	}

	this.sliteGeom=new SliteGeom()

	//обьеденяет аналогичные геометрии
	this.groupGeometri=function(c3d){
		objBody = {};
		self.fillObjMesh(c3d);
		var bb=false
		
		for(var s in objBody){
			
			if(objBody[s].length>=2){
				
				//console.time(s+'==');
				bb=true
				this.sliteGeom.start(objBody[s][0].geometry.clone());				

				for (var i = objBody[s].length-1; i >=0; i--) {
					mesh=objBody[s][i]
					moveObject(mesh,c3d);
					this.sliteGeom.setMesh(mesh)
					meshPar=mesh.parent
					meshPar.remove(mesh);
				}

				this.sliteGeom.final();
				mesh1=new THREE.Mesh(this.sliteGeom.creatGeom, mesh.material);
				c3d.add(mesh1);


				
				//console.timeEnd(s+'==')
				
			}
		}

		if(bb)self.killNull(c3d)	

	}




	self.killNull = function (c3d) {
		if(c3d.children){
			for (var i = c3d.children.length-1; i >=0; i--) {
				self.killNull(c3d.children[i])
			}
		}

		if(c3d.geometry==undefined){			
			if(c3d.children!=undefined)if(c3d.children.length==0){				
				if(c3d.parent!=undefined){					
					c3d.parent.remove(c3d)
					return
				}
			}
		}


	}

	self.fillObjMesh = function (c3d) {
		var arrMesh = getAllMesh(c3d);		
		for (var i = 0; i < arrMesh.length; i++) {
			if (arrMesh[i].geometry) {
				if (arrMesh[i].geometry.index) {
					if (arrMesh[i].geometry.index.count < self.kolCount) {
						objBody[arrMesh[i].geometry.uuid] = objBody[arrMesh[i].geometry.uuid] || [];
						objBody[arrMesh[i].geometry.uuid].push(arrMesh[i]);
					}
				}
			}

		}
	};

	function getAllMesh (obj) {
		var arr = [];
		// obj.updateMatrix();
		obj.updateMatrixWorld();
		if (obj instanceof THREE.Mesh) {
			arr.push(obj);
		}
		for (var i = 0; i < obj.children.length; i++) {
			var childMeshes = getAllMesh(obj.children[i]);
			for (var j = 0; j < childMeshes.length; j++) {
				arr.push(childMeshes[j]);
			}
		}
		return arr;
	}

	function moveObject (obj, newParent, parentNeedsUpdate, objNeedsUpdate) {
		if (parentNeedsUpdate) newParent.updateMatrixWorld();
		if (objNeedsUpdate) obj.updateMatrixWorld();
		var m = new THREE.Matrix4().getInverse(newParent.matrixWorld);
		if (obj.parent) m.multiply(obj.parent.matrixWorld);
		obj.applyMatrix(m);
		newParent.add(obj);
	}

	this.moveObject=function(obj, newParent, parentNeedsUpdate, objNeedsUpdate){
		moveObject(obj, newParent, parentNeedsUpdate, objNeedsUpdate)
	}

}

export function LoadTime(par, c3d, arr ) { 
	this.type="LoadTime";
	var self=this;
	this.par=par;
	this.c3d=c3d;
	this.arr=arr;

	var geometry,material,mesh, meshPar,mesh1

	this.mesh=arr[0]
	this.geom=arr[0].geometry;
	this.mate=arr[0].material;

	var bb=true

	this.initLoad=function(){
		bb=false;
		if(self.mate)if(self.mate.idObj!=undefined){
			if(self.mate.loadTexure==0){
				bb=true;
			}
		}

		if(bb==false){
			setTimeout(function() {				
				self.initLoad()
			}, 50);
		}else{
			self.creat()			
		}
	}

	this.creat=function(){

		for (var i = arr.length-1; i >=0; i--) {
			mesh=arr[i]
			this.par.moveObject(mesh,c3d);
			meshPar=mesh.parent
			meshPar.remove(mesh);					
		}
			
		this.meshCombined = new MeshCombined(arr);
		c3d.add(this.meshCombined);
		var meshes=this.meshCombined._meshes


		for (var i = 0; i < this.meshCombined.children.length; i++) {
			
			this.meshCombined.children[i].castShadow=mesh.castShadow
			this.meshCombined.children[i].receiveShadow=mesh.receiveShadow
			this.meshCombined.children[i].renderOrder=mesh.renderOrder
		}
		


		this.par.killNull(c3d);
	
	}


	this.initLoad()

}



export function SliteGeom() { 
	this.type="SliteGeom";
	var self=this;
	this.geometry;
	this.kol;
	this.ah=[];
	this.sah=0;
	this.sahMesh=0;
	this.creatGeom;
	this.ap=[]
	this.ai=[]
	this.auv=[]

	this.start=function(_bufferGeometry){
		this.geometry=_bufferGeometry;
		this.creatGeom=new THREE.BufferGeometry();
		this.sah=0;
		this.sahMesh=0;
		this.ap=[]
		this.ai=[]
		this.auv=[]
		this.sPosit();
	}

	

	//наполняем массив с позициями
	this.sPosit=function(){	
		for (var i = 0; i < this.geometry.index.count; i++) {
			if(this.ah[this.sah]==undefined)this.ah[this.sah]=new SGHron()
			this.ah[this.sah].posOld.set(
				this.geometry.attributes.position.array[this.geometry.index.array[i]*3],
				this.geometry.attributes.position.array[this.geometry.index.array[i]*3+1],
				this.geometry.attributes.position.array[this.geometry.index.array[i]*3+2],
			)

			this.ah[this.sah].uv.set(
				this.geometry.attributes.uv.array[this.geometry.index.array[i]*2],
				this.geometry.attributes.uv.array[this.geometry.index.array[i]*2+1]
			)			

			this.ah[this.sah].index=this.geometry.index.array[i]
			this.sah++;
		}


	}
	var kolSah
	this.setMesh=function(mesh){
		kolSah=this.sahMesh*this.sah;
		for (var i = 0; i < this.sah; i++) {
			this.ah[i].setMesh(mesh);
			this.ap.push(this.ah[i].pos.x,this.ah[i].pos.y,this.ah[i].pos.z);
			this.auv.push(this.ah[i].uv.x,this.ah[i].uv.y);
			this.ai.push(this.ah[i].index+kolSah)
		}
		this.sahMesh++;
	}

	this.final=function(){

		
		
		this.creatGeom.setIndex(this.ai)
		this.creatGeom.setAttribute( 'position', new THREE.BufferAttribute( new Float32Array(this.ap), 3 ) );
		this.creatGeom.setAttribute( 'uv', new THREE.BufferAttribute( new Float32Array(this.auv), 2 ) );
		


		this.creatGeom.attributes.position.needsUpdate = true;
        this.creatGeom.attributes.uv.needsUpdate = true;
        this.creatGeom.computeVertexNormals();
        this.creatGeom.attributes.normal.needsUpdate = true;
        this.creatGeom.computeBoundingBox();
        this.creatGeom.computeBoundingSphere();
	}


}

export function SGHron() { 
	this.type="SliteGeom";
	this.pos=new THREE.Vector3()
	this.posOld=new THREE.Vector3()//старый
	
	this.uv=new THREE.Vector2()
	this.index=0
	this.setMesh=function(mesh){		
		this.pos.set(this.posOld.x,this.posOld.y,this.posOld.z)
		this.pos.applyMatrix4(mesh.matrix)
	}
}


