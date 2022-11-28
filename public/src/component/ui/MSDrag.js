export class MSDrag {
    constructor(par, fun) {
        var self = this;
        this.type = "MSDrag";
        this.fun = fun;
        this.par = par;
        this.param = par.param;

        this._width = 100;
        this._realHeight = 100;

        this.dContDD = undefined;
        this.content = undefined;

        this.setContNa = function (c, c1) {
            this.dContDD = c;
            this.content = c1;

            this.scrollBarV = new DScrollBarV(this.dContDD, 0, 0, (evt) => {
                this.scrolPos(false);
            });
            this.scrollBarV.width = this.param.otstup;


            this.dContDD.div.addEventListener('mousewheel', this.mousewheel);
            this.dContDD.div.addEventListener("DOMMouseScroll", this.mousewheel);


            if (dcmParam.mobile == false) {
                this.dContDD.div.addEventListener("mousedown", this.mouseDown);
                window.addEventListener("mouseup", this.mouseup);

            } else {
                this.dContDD.div.addEventListener("touchstart", this.mouseDown);                
                window.addEventListener("touchend", this.mouseup);

            }
            
            dcmParam.addFunMove(self.mousemove);
        }

        this._height = 100;

        this.scrolPos = function (b) {
            if (b) {
                this.scrollBarV.value = this.content.y / (this._height - this.scrollBarV.heightContent) * 100;
            } else {
                this.content.y = (this.scrollBarV.value * 0.01) * (this._height - this.scrollBarV.heightContent);
            }
             self.dragHTMLHole()
        };



        //////////////////////////////////////

        var sp = undefined;
        this.dragActiv = false;
        this.mouseDown = function (e) {
            
            self.dragActiv = true;
            sp = undefined;
            if (self.dragNotEvent == true) document.body.style.pointerEvents = "none";
        }

        this.mouseup = function (e) {
            self.dragActiv = false;
            sp = undefined;
            if (self.dragNotEvent == true) document.body.style.pointerEvents = null;
        }

        var yyy = 0;
        var hhh;
        this.mousemove = function (e) {
            if (self.dragActiv == false) return;
            if (self.scrollBarV.visible == false) return;

            hhh = self.scrollBarV.heightContent - self._height;

            if (dcmParam.mobile == false) {
                if (sp == undefined) {
                    sp = {
                        y: e.clientY,
                        y1: self.content.y
                    };
                }
                sp.ys = e.clientY
            } else {
                if (sp == undefined) {
                    sp = {
                        y: e.targetTouches[0].clientY,
                        y1: self.content.y
                    };
                }
                sp.ys = e.targetTouches[0].clientY
            }

            yyy = sp.y1 - (sp.y - sp.ys);

            if (yyy >= 0) yyy = 0


            if (-1 * yyy >= hhh) {
                yyy = -1 * hhh
            }

            self.content.y = yyy

            self.scrolPos(true)
            self.dragHTMLHole()
        }

        ////////////////////////////////////////////////////////////////////////////////////////////////////////////////
        var sy, sy1

        this.arIE=[0,0,0,0]
        this.dragHTMLHole = function (p) {
            this.arIE[0] = -this.content.y;
            this.arIE[2] = this._height - this.content.y;
            this.arIE[1] = this._width;
            this.arIE[3] = 0;
            this.content.div.style.clip = "rect(" + Math.round(this.arIE[0]) + "px " + Math.round(this.arIE[1]) + "px " + Math.round(this.arIE[2]) + "px " + Math.round(this.arIE[3]) + "px)";
        }

        self.sahDelta = 20
        var hhh, www;
        this.mousewheel = function (e) {

            hhh = self.scrollBarV.heightContent - self._height

            var delta = -1;
            var p = e.delta
            if (e.wheelDelta == undefined) {
                p = e.wheelDelta
            }

            if (e.delta) if (e.delta < 0) delta = 1;
            if (e.deltaY) if (e.deltaY < 0) delta = 1;
            if (e.detail) if (e.detail < 0) delta = 1;

            if (e.wheelDelta != undefined) {
                if (e.wheelDelta > 0) delta = -1;
                else delta = 1;
            }

            p = delta;

            if (self.scrollBarV.visible) {
                if (p < 0) {
                    if (self.content.y >= 0) {
                        self.content.y = 0;
                        //self.scrollBarV.value = 0;
                    } else {
                        //self.scrollBarV.value -= self.sahDelta;
                        self.content.y += self.sahDelta;
                    }
                } else {
                    if (self.content.y <= -(hhh)) {
                        self.content.y = -(hhh);
                        //self.scrollBarV.value = hhh;
                    } else {
                        //self.scrollBarV.value += self.sahDelta;
                        self.content.y -= self.sahDelta;
                    }

                }
            }            
            self.scrolPos(true);
            self.dragHTMLHole();
        };

        ////////////////////////////////////////////////////////////////////////////////////////////////////////////////
        this._updScrl = function  () {
         
            if (this._height > this._realHeight) {
                if(this.scrollBarV.visible==true){
                    this.scrollBarV.value=0;
                    this.scrolPos(false);
                }
                this.scrollBarV.visible = false;
                return;
            }
            this.scrolPos(false);

            this.scrollBarV.visible = true;
            this.scrollBarV.heightContent = this._realHeight;

            self.dragHTMLHole()
        };

        var w, h, s;
        this.sizeWindow = function (_w, _h, _s) {
            if (_w) {
                w = _w ;
                h = _h ;
                s = _s;
            }
            
            

        }
    }

	set realHeight(value) {

        if (value !== this._realHeight) {
            this._realHeight = value;
            this._updScrl();
            this.dragHTMLHole();
            return;
        }
        
	}
	get realHeight() { return this._realHeight; }

	set width(value) {
        if (value !== this._width) {
            this._width = value;            
            this.scrollBarV.x = this._width - this.scrollBarV.width - this.param.otstup
            this._updScrl();
            this.dragHTMLHole();             
        }
        
	}
	get width() { return this._width; }

    set height(value) {
        if (value !== this._height) {
            this._height = value;
            
            this._height = this._height - this.dContDD.y;
            this.scrollBarV.height = this._height; 
            this._updScrl();
            this.dragHTMLHole();
        }
        
    }
    get height() { return this._height; } 
}
