
// depth mat
var DEPTH_MATERIAL = new THREE.MeshDepthMaterial();
DEPTH_MATERIAL.depthPacking = THREE.RGBADepthPacking;
DEPTH_MATERIAL.clipping = true;
DEPTH_MATERIAL.defines = {
	INSTANCE_TRANSFORM: ''
};

// distance mat
var DISTANCE_SHADER = THREE.ShaderLib['distanceRGBA'];
var DISTANCE_UNIFORMS = THREE.UniformsUtils.clone(DISTANCE_SHADER.uniforms);
var DISTANCE_DEFINES = {
	'USE_SHADOWMAP': '',
	'INSTANCE_TRANSFORM': ''
};

var DISTANCE_MATERIAL = new THREE.ShaderMaterial({
	defines: DISTANCE_DEFINES,
	uniforms: DISTANCE_UNIFORMS,
	vertexShader: DISTANCE_SHADER.vertexShader,
	fragmentShader: DISTANCE_SHADER.fragmentShader,
	clipping: true
});

THREE.InstancedMesh = function (bufferGeometry, material, numInstances) {
	THREE.Mesh.call(this, new InstancedGeom().setGeometry(bufferGeometry), material);
	var self = this;
	this.type = 'InstancedMesh';
	this.numInstances = numInstances || 1;

	// make it work with depth effects
	this.customDepthMaterial = DEPTH_MATERIAL;
	this.customDistanceMaterial = DISTANCE_MATERIAL;

	this.onAfterRender = function (renderer, scene, camera, geometry, material, group) {
		self.geometry.update(camera);
	};

	// var deb = new InstancedMeshDebug(this);
};

THREE.InstancedMesh.prototype = Object.create(THREE.Mesh.prototype);
THREE.InstancedMesh.constructor = THREE.InstancedMesh;

Object.defineProperties(THREE.InstancedMesh.prototype, {

	'material': {
		set: function set (m) {
			this._material = m;
			this._material.defines = this._material.defines || {};
			this._material.defines.INSTANCE_TRANSFORM = '';
			// this._material.defines.INSTANCE_UNIFORM = '';
			this._material.needsUpdate = true;
		},
		get: function get () {
			return this._material;
		}
	},

	'geometry': {
		set: function set (g) {
			if (g instanceof InstancedGeom) {
				this._geometry = g;
			} else { // bufferGeometry
				this._geometry.setGeometry(g);
			}
		},
		get: function get () {
			return this._geometry;
		}
	},

	'numInstances': {
		set: function set (v) {
			this._numInstances = v;
			this.geometry.setCount(this.numInstances);
		},
		get: function get () {
			return this._numInstances;
		}
	}

});

THREE.InstancedMesh.prototype.setPositionAt = function (index, position) {
	this.geometry.setPositionAt(index, position);
};
THREE.InstancedMesh.prototype.setQuaternionAt = function (index, quat) {
	this.geometry.setQuaternionAt(index, quat);
};
THREE.InstancedMesh.prototype.setScaleAt = function (index, scale) {
	this.geometry.setScaleAt(index, scale);
};
THREE.InstancedMesh.prototype.getPositionAt = function (index, position) {
	return this.geometry.getPositionAt(index, position);
};
THREE.InstancedMesh.prototype.getQuaternionAt = function (index, quat) {
	return this.geometry.getQuaternionAt(index, quat);
};
THREE.InstancedMesh.prototype.getScaleAt = function (index, scale) {
	return this.geometry.getScaleAt(index, scale);
};

THREE.InstancedMesh.prototype.needsUpdate = function () {
	this.geometry.needsUpdate = true;
	this.geometry.computeBoundingSphere();
};


function InstancedMeshDebug (im) {
	var funOrigin = im.onAfterRender;
	var box;
	var helper;
	im.onAfterRender = function (renderer, scene, camera, geometry, material, group) {
		// console.time('update')
		funOrigin(renderer, scene, camera, geometry, material, group);
		// console.timeEnd('update')
		// console.log('count', this.geometry.maxInstancedCount);
		clear();
		var arr = im.geometry.arrTransformVisible;
		for (var i = 0; i < arr.length; i++) {
			box = arr[i].boundingBox;
			helper = getHelper();
			helper.scale.set((box.max.x - box.min.x), (box.max.y - box.min.y), (box.max.z - box.min.z));
			// helper.position.copy(box.max)
			box.getCenter(helper.position);
		}
		box = im.geometry.boundingBox;
		helper = getHelper();
		helper.scale.set((box.max.x - box.min.x), (box.max.y - box.min.y), (box.max.z - box.min.z));
		box.getCenter(helper.position);
	};

	var arr = [];
	function getHelper () {
		for (var i = 0; i < arr.length; i++) {
			if (!arr[i].visible) {
				arr[i].visible = true;
				return arr[i];
			}
		}
		var h = new THREE.Mesh(g, mat);
		arr.push(h);
		im.add(h);
		return h;
	}
	function clear () {
		for (var i = 0; i < arr.length; i++) {
			arr[i].visible = false;
		}
	}

}

var g = new THREE.BoxBufferGeometry(1, 1, 1);
var mat = new THREE.MeshNormalMaterial({wireframe: true});


function InstancedGeom () {
	THREE.InstancedBufferGeometry.call(this);
	this.count = 0;
	var self = this;
	this.boundOrigin = new THREE.Box3();
	this.arrTransform = [];
	this.gridTransform = new GridTransform(this.arrTransform);

	this.setCount = function (count) {
		this.count = count;

		if ((this.maxInstancedCount || 0) < count) {
			if (!this.attributes.instanceQuaternion || this.attributes.instanceQuaternion.count < count) {
				var buffers = {
					instanceQuaternion: new Float32Array(4 * count),
					instancePosition: new Float32Array(3 * count),
					instanceScale: new Float32Array(3 * count)
				};
				this.setAttribute('instanceQuaternion', new THREE.InstancedBufferAttribute(buffers.instanceQuaternion, 4));
				this.setAttribute('instancePosition', new THREE.InstancedBufferAttribute(buffers.instancePosition, 3));
				this.setAttribute('instanceScale', new THREE.InstancedBufferAttribute(buffers.instanceScale, 3));
				this.needsUpdate = true;
			}
		}
		for (var i = 0; i < count; i++) {
			this.arrTransform[i] = new Transform(this.boundOrigin);
		}
		this.maxInstancedCount = count;
	};

	this.setGeometry = function (bufferGeometry) {
		this.copy(bufferGeometry);
		this.boundOrigin.setFromBufferAttribute(this.attributes.position);
		return this;
	};

	var frustum = new THREE.Frustum();
	var projScreenMatrix = new THREE.Matrix4();
	this.arrTransformVisible = [];

	this.update = function (camera) {

		projScreenMatrix.multiplyMatrices(camera.projectionMatrix, camera.matrixWorldInverse);
		frustum.setFromMatrix(projScreenMatrix);

		var visibleCount = 0;

		// for (var i = 0; i < this.arrTransform.length; i++) {
		// 	if (frustum.intersectsBox(self.getBoundingBoxAt(i))) {
		// 		visibleCount++;
		// 		this.setTransformAt(visibleCount, this.arrTransform[i]);
		// 	}
		// }
		this.arrTransformVisible = [];
		for (var i = 0; i < this.gridTransform.arrGridIndex.length; i++) {
			var grid = this.gridTransform.arrGridIndex[i];
			if (frustum.intersectsBox(grid.boundingBox)) {
				for (var j = 0; j < grid.arrTransform.length; j++) {
					var t = grid.arrTransform[j];
					this.arrTransformVisible.push(t);
					this.setTransformAt(visibleCount++, t);
				}
			}
		}

		self.maxInstancedCount = visibleCount;
		self.needsUpdate = true;
	};

	this.updateGrid = function () {
		this.gridTransform.updateGrid();
	};

}
InstancedGeom.prototype = Object.create(THREE.InstancedBufferGeometry.prototype);
InstancedGeom.constructor = InstancedGeom;

InstancedGeom.prototype.setTransformAt = function (index, t) {
	this.attributes.instanceScale.setXYZ(index, t.s.x, t.s.y, t.s.z);
	this.attributes.instancePosition.setXYZ(index, t.p.x, t.p.y, t.p.z);
	this.attributes.instanceQuaternion.setXYZW(index, t.q.x, t.q.y, t.q.z, t.q.w);
};
InstancedGeom.prototype.setPositionAt = function (index, position) {
	this.arrTransform[index].setP(position);
	this.setTransformAt(index, this.arrTransform[index]);
};
InstancedGeom.prototype.setQuaternionAt = function (index, quat) {
	this.arrTransform[index].setQ(quat);
	this.setTransformAt(index, this.arrTransform[index]);
};
InstancedGeom.prototype.setScaleAt = function (index, scale) {
	this.arrTransform[index].setS(scale);
	this.setTransformAt(index, this.arrTransform[index]);
};
InstancedGeom.prototype.getPositionAt = function (index, position) {
	return position ? position.copy(this.arrTransform[index].p) : this.arrTransform[index].p;
};
InstancedGeom.prototype.getQuaternionAt = function (index, quat) {
	return quat ? quat.copy(this.arrTransform[index].q) : this.arrTransform[index].q;
};
InstancedGeom.prototype.getScaleAt = function (index, scale) {
	return scale ? scale.copy(this.arrTransform[index].s) : this.arrTransform[index].s;
};

InstancedGeom.prototype.computeBoundingSphere = (function () {
	return function computeBoundingSphere () {
		if (this.boundingSphere === null) {
			this.boundingSphere = new THREE.Sphere();
		}
		this.computeBoundingBox();
		this.boundingBox.getBoundingSphere(this.boundingSphere);
		this.updateGrid();
	};
}());
InstancedGeom.prototype.computeBoundingBox = (function () {
	return function () {
		if (this.boundingBox === null) {
			this.boundingBox = new THREE.Box3();
		}
		this.boundingBox.makeEmpty();
		for (var i = 0, l = this.count; i < l; i++) {
			this.boundingBox.union(this.getBoundingBoxAt(i));
		}
	};
}());

InstancedGeom.prototype.getBoundingBoxAt = (function () {
	return function (i) {
		return this.arrTransform[i].boundingBox;
	};
}());

Object.defineProperties(InstancedGeom.prototype, {
	'needsUpdate': {
		set: function set (v) {
			this.attributes.instancePosition.needsUpdate = v;
			this.attributes.instanceQuaternion.needsUpdate = v;
			this.attributes.instanceScale.needsUpdate = v;
		},
		get: function get () {
			return false;
		}
	}
});

function Transform (boundOrigin) {
	this.boundOrigin = boundOrigin;
	this._boundingBox = null;

	this.p = new THREE.Vector3();
	this.s = new THREE.Vector3(1, 1, 1);
	this.q = new THREE.Quaternion();

	this.setP = function (p) {
		this.p.copy(p);
	};
	this.setS = function (s) {
		this.s.copy(s);
	};
	this.setQ = function (q) {
		this.q.copy(q);
	};
}
Transform.prototype.computeBoundingBox = (function () {
	var m = new THREE.Matrix4();
	return function () {
		if (!this._boundingBox) {
			this._boundingBox = new THREE.Box3();
		}
		m.compose(this.p, this.q, this.s);
		this.boundingBox.copy(this.boundOrigin);
		this.boundingBox.applyMatrix4(m);
		return this.boundingBox;
	};
}());
Object.defineProperties(Transform.prototype, {
	'boundingBox': {
		set: function set (v) {
			this._boundingBox = v;
		},
		get: function get () {
			return this._boundingBox || this.computeBoundingBox();
		}
	}
});


function GridTransform (arrTransform) {
	var self = this;
	this.arrTransform = arrTransform;
	var size = 100;

	this.arrGridIndex = [];
	this.cache = {};

	this.updateGrid = function () {
		this.arrGridIndex.length = 0;
		this.cache = {};
		for (var i = 0; i < this.arrTransform.length; i++) {
			var t = this.arrTransform[i];
			var grid = getGridIndexFromPosition(t.p);
			grid.arrTransform.push(t);
		}
		for (var key in this.cache) {
			this.cache[key].computeBoundingBox();
			this.arrGridIndex.push(this.cache[key]);
		}
	};

	function getGridIndexFromPosition (pos) {
		var x = Math.floor(pos.x / size);
		var y = Math.floor(pos.y / size);
		var z = Math.floor(pos.z / size);
		var key = 'x' + x + 'y' + y + 'z' + z;
		if (!self.cache[key]) {
			self.cache[key] = new GridIndex();
		}
		return self.cache[key];
	}
}

function GridIndex () {
	this.arrTransform = [];
	this._boundingBox = null;
}
GridIndex.prototype.computeBoundingBox = function () {
	if (!this._boundingBox) {
		this._boundingBox = new THREE.Box3();
	}
	this.boundingBox.makeEmpty();
	for (var i = 0, l = this.arrTransform.length; i < l; i++) {
		this.boundingBox.union(this.arrTransform[i].boundingBox);
	}
	return this.boundingBox;
};
Object.defineProperties(GridIndex.prototype, {
	'boundingBox': {
		set: function set (v) {
			this._boundingBox = v;
		},
		get: function get () {
			return this._boundingBox || this.computeBoundingBox();
		}
	}
});
