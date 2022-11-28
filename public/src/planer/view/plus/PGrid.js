

export class PGrid  {
    constructor(cont,wh,rwh) {
    	this.type="PGrid";
    	
        var self = this;
        this.content2d = new PIXI.Container();
        this.texture = PIXI.Texture.from('resources/image/fill.png');
        //this._scaleGrid = this.texture ? this.texture.baseTexture.width : 100;

        //var scale = 100 / 256;

        this.wh = wh;
        var sprit = new PIXI.extras.TilingSprite(this.texture, this.wh, this.wh);
        //sprit.anchor.set(0.5, 0.5);
        
        if(cont)cont.addChild(this.content2d);

        this.content2d.addChild(sprit);

        var scx = (100 / 256)  /(rwh/100);
        sprit.tileScale.set(scx, scx);
        sprit.alpha=0.9;
        sprit.position.x=-this.wh/2-rwh/4;
        sprit.position.y=-this.wh/2-rwh/4;
    }
}  


export class Grid extends THREE.Object3D {
    constructor(_size,mat, _sah, _link,_alpha) {
        super();
        this.type="Grid";
       /* let loader = new THREE.TextureLoader();
        this.texture=loader.load(_link)
        this.texture.wrapS = THREE.RepeatWrapping;
        this.texture.wrapT = THREE.RepeatWrapping;
        this.texture.repeat.set( _sah, _sah );*/



       /* this.mesh = new THREE.Mesh(
            new THREE.BoxBufferGeometry( _size, _size, _size)
        )
        this.add(this.mesh)*/


     /*   let material=new THREE.MeshPhongMaterial({color:0xffffff, map:this.texture})
        material.side=THREE.DoubleSide;*/  

        
        let mesh=new THREE.Mesh( new THREE.PlaneBufferGeometry( _size, _size,1,1), mat)        
        this.add(mesh)
        mesh.castShadow = true;
        mesh.receiveShadow = true;
        mesh.renderOrder=1
        mesh.position.z=5
        this.mesh=mesh
        mesh.rotation.x=Math.PI

        if(_alpha!=undefined){
            //material.transparent=true
           // material.opacity=_alpha;
        }
    }
}

