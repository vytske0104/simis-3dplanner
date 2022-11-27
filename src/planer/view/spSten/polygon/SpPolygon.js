import { SpPol } from './../../sp/SpPol.js';
//import { SSPolygon2D } from './SSPolygon2D.js';
import { SSP3D } from './SSP3D.js';

import { PUnikBase } from './PUnikBase.js';
import { PubRoof } from './PubRoof.js';

import { PubScreed } from './PubScreed.js';

import { PubOverlap } from './PubOverlap.js';
import { TriangulateShape } from './TriangulateShape.js';
export function SpPolygon(_stage, _unikName) {
    SpPol.call(this, _stage);
    var self = this;
    this.type = 'SpPolygon';
    this.tipe = 'SpPolygon';

    this.area1 = 0
    this._sloiPoliUnik = "null"


    this.unikName = "PUnikBase";
    if (_unikName != undefined) this.unikName = _unikName;

    this.stage = _stage;
    this.par = _stage;
    this._boolText = true;
    this._active = false;
    this.idUi = Math.round(Math.random() * 1000);
    this.sUi = -1;
    this._offset = 0;
    this._bChaz = false;

    this._active = false;

    this._height1 = this.par._height1;
    this._delph = 5; // толщина линии
    this.gateauObj = this.par.gateauObj;


    this._uuid = calc.generateRendom(2);

    this.uuidDin = "null";
    this.objDin = null;


    //крыша				//перекрытия		//стяжка
    this.arrKye = ["gateauRoofPol", "gateauOverlapPol", "gateauScreedPol"];
    this.key = "gateauRoofPol"

    //this.triangulateShape = this.stage.triangulateShape;
    this.triangulateShape = new TriangulateShape()
    //this.triangulateShape = this.stage.triangulateShape1;

    this.arrayClass = []


    this.content3d = new THREE.Object3D();
    this.par.content3dPol.add(this.content3d);

    this.content3d.position.z = -2

    if (this.par.param.mobile==true) {
    	this.content3d.position.z = -20
    }

    /*  let aa=new THREE.AxesHelper(300);
      this.content3d.add(aa);*/

    this.ssP3d = new SSP3D(this);

    this.boolRezolka = true

    this.unik = new PubOverlap(this);



    this.content3d.objClik = this

    this.draw1 = function() {

        if (this.unik.doD1 != undefined) {
            this.unik.doD1()
        }
        this.dragRect();
        this.dragNaTriang();
        this.unik.draw1();

        //FIXE токо для крыш
        //this.par.metodRezolk.setPol(this);

    }

    this.dragTime = function() {

        this.draw1()
    }


    this.drag = function() {
        self.par.addObjFun(self);
    };


    this.dragPost = function() {
        this.draw1();

    }

    var aaac = []
    this.clear = function() {
        aaac.length = 0
        for (var i = this.array.length - 1; i >= 0; i--) {
            aaac[i] = this.array[i]
        }
        for (var i = this.array.length - 1; i >= 0; i--) {
            if (this.array[i]) this.array[i].removePol(this);
        }

        for (var i = 0; i < aaac.length; i++) {
            aaac[i].clear()
        }
        this.life = false
        this.stage.render()
        this.unik.clear()
    };



    var rez, bp, bp1, res
    var arrayCol = []
    this.rectBig = { x: 0, y: 0, z: 0, x1: 0, y1: 0, z1: 0, w: 0, h: 0, d: 0, o: null }

    this.dragRect = function() {
        this.rectBig.x = 99999999999;
        this.rectBig.y = 99999999999;
        this.rectBig.x1 = -29999999999;
        this.rectBig.y1 = -29999999999;
        for (var i = 0; i < this.array.length; i++) {
            if (this.rectBig.x > this.array[i].position.x) this.rectBig.x = this.array[i].position.x;
            if (this.rectBig.x1 < this.array[i].position.x) this.rectBig.x1 = this.array[i].position.x;
            if (this.rectBig.y > this.array[i].position.y) this.rectBig.y = this.array[i].position.y;
            if (this.rectBig.y1 < this.array[i].position.y) this.rectBig.y1 = this.array[i].position.y;

            if (this.rectBig.z > this.array[i].position.z) this.rectBig.z = this.array[i].position.z;
            if (this.rectBig.z1 < this.array[i].position.z) this.rectBig.z1 = this.array[i].position.z;
        }
        this.rectBig.w = this.rectBig.x1 - this.rectBig.x;
        this.rectBig.h = this.rectBig.y1 - this.rectBig.y;
        this.rectBig.d = this.rectBig.z1 - this.rectBig.z;
    }

    this.rect = { x: 0, y: 0, w: 100, h: 100 }

    this.arrPKesh = []
    this.arrPosition = []
    this.arrTiang = []
    var shTr
    this.shTr
    this.rrr = 0
    this.hhh = 1
    this.dragNaTriang = function() {

        this.arrPosition.length = 0;
        for (var i = 0; i < this.array.length; i++) {
            if (this.arrPKesh[i] == undefined) this.arrPKesh[i] = new THREE.Vector3()
            this.arrPKesh[i].set(this.array[i].position.x * 1, this.array[i].position.y * 1, this.array[i].position.z * 1)
            this.arrPosition.push(this.arrPKesh[i]);
        }

        this.triangulateShape.segment.x = this.rect.x;
        this.triangulateShape.segment.y = this.rect.y;
        this.triangulateShape.segment.width = this.rect.w; //this.rectBig.w;
        this.triangulateShape.segment.height = this.rect.h * this.hhh; //this.rectBig.h;
        this.triangulateShape.segment.rotation = 0 //this.rrr;

        this.triangulateShape.start(this.arrPosition); // триангулируем

        this.area1 = Math.abs(this.triangulateShape.areaShape) / this.hhh



        var ar = this.triangulateShape.arrTriangleBig
        shTr = 0
        for (var i = 0; i < ar.length; i++) {

            if (this.arrTiang[shTr] == undefined) {
                this.arrTiang[shTr] = [new THREE.Vector3(), new THREE.Vector3(), new THREE.Vector3()]
            }
            this.arrTiang[shTr][0].set(ar[i][0].x, ar[i][0].y, -ar[i][0].z);
            this.arrTiang[shTr][1].set(ar[i][1].x, ar[i][1].y, -ar[i][1].z);
            this.arrTiang[shTr][2].set(ar[i][2].x, ar[i][2].y, -ar[i][2].z);

            shTr++;
            this.shTr = shTr;
        }

        if (this.rrr !== 0)
            if (p20.boolMax == true) {
                this.triangulateShape.segment.rotation = this.rrr;
                this.triangulateShape.start(this.arrPosition); // триангулируем
            }




        //this.ssP3d.planeXZ.upDate()
    }



    this.isRect = function(r, b) {

    }

    this.isRect = function(r, b) {

        if (calc.isRectS(r, this.rectBig) == true) {
            for (var i = 0; i < this.array.length; i++) {
                if (calc.isRectPoint(r, this.array[i].position) == true) {
                    return this
                }
            }
        }
        return null;
    }



    this.setColorNova = function(r, p, b) {
        this.unik.setColorNova(r, p, b);
    }

    this.draw1Color = function(r, b) {

        if (this.unik.draw1Color) {
            if (this.key !== r) return

            this.unik.draw1Color(r, b);
        }
    }
    this.drawGateau = function(gateau) {

    }



    this.draw1Color(this.unik.keyG)

    this.animat = function(time) {
        this.unik.animat(time)
        //this.ss2d.animat(time)
    }

    var oInfo = {}
    oInfo.type = this.type;
    this.getInfo = function(a) {
        //oInfo.square=this.ss3d.square;
        oInfo.idArr = this.idArr;
        oInfo.square = this.area1;
        oInfo.obj = this;

        if (this.unik.objDin) oInfo.objDin = this.unik.objDin;
        a.push(oInfo);
    }


    this.sloiPoliUnik = this.par._sloiPoliUnik;

}
SpPolygon.prototype = Object.create(SpPol.prototype);
SpPolygon.prototype.constructor = SpPolygon;

SpPolygon.prototype.getObj = function() {
    var o = SpPol.prototype.getObj.call(this);
    o.unik = this.unikName
    if (this.unik.getObj) o.oUnik = this.unik.getObj()
    return o;
};
SpPolygon.prototype.setObj = function(o) {

    SpPol.prototype.setObj.call(this, o);
    if (this.unik.setObj) this.unik.setObj(o.oUnik)
};
SpPolygon.prototype.compare = function(_sten) {
    var rez = true;
    if (!SpPol.prototype.compare(this, _sten)) rez = false;
    return rez;
};
SpPolygon.prototype.setSten = function(_sten) {
    SpPol.prototype.setSten.call(this, _sten);
};
SpPolygon.prototype.restart = function() {
    SpPol.prototype.restart(this);
    //this.windows.clear();
    //this.content2d.addChild(this.sten2D.content2d);
    //this.stage.configureSpPol(this);
};

SpPolygon.prototype.drag = function() {
    SpPol.prototype.drag.call(this);
    this.stage.addObjFun(this);

};
Object.defineProperties(SpPolygon.prototype, {

    life: {
        set: function(value) {
            if (this._life == value) return;
            this._life = value;
            for (var ii = 0; ii < this.arrayClass.length; ii++) {
                if ('life' in this.arrayClass[ii]) this.arrayClass[ii].life = this._life;
            }

            this.ssP3d.life = this._life;
            this.content3d.visible = this._life


        },
        get: function() { return this._life; }
    },
    active: {
        set: function(value) {
            if (this._active === value) return;
            this._active = value;
            this.cont2dVerh.visible = this._active
            if (this.unik)
                if (this.unik.active != undefined) this.unik.active = value;
            this._setAllParam('active', this._active);
        },
        get: function() { return this._active; }
    },


    height1: {
        set: function(value) {
            if (this._height1 === value) return;
            this._height1 = value;

            this._setAllParam('height1', this._height1);
        },
        get: function() { return this._height1; }
    },

    sloiPoliUnik: {
        set: function(value) {
            if (this._sloiPoliUnik != value) {
                this._sloiPoliUnik = value;
                if (this.unik) this.unik.sloiPoliUnik = value;

            }
        },
        get: function() {
            return this._sloiPoliUnik;
        }
    },


});