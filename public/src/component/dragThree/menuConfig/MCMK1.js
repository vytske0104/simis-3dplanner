


import { MCCxzxz } from './MCCxzxz.js';
export class MCMK1  {
    constructor(par,fun, _x, _y) {          
        this.type="MCMK1";
        this.fun=fun
        this.par=par
        var self=this;

        this.param=par.param;

        this.x = 0 || _x
        this.y = 0 || _y
        this.dCont=new DCont(this.par.window.content);
        this.dCont.x=this.x
        this.dCont.y=this.y

        this.window=new DWindow(this.dCont, 0, 0,"Параметры поля")
        this.window.hasMinimizeButton=false;
        this.window.dragBool=false;

        this.window.width=this.par.window.width;
        this.window.height=200;

        this.fontSize = 16
        this.wh =  this.fontSize*2

        this.height = undefined

        this.drag = function(){
            for (var i = 0; i < this.arrComp.length; i++) {
                if (this.arrComp[i].linkParam && (this.arrComp[i].linkParam).indexOf("invisible") === -1) {
                    if (this.arrComp[i].linkParam == 'param') if (self.objBase[this.arrComp[i].linkParam] != this.arrComp[i].value) self.fun("dragParam", this.arrComp[i].value);
                    self.objBase[this.arrComp[i].linkParam] = this.arrComp[i].value
                }
            }

            self.fun("saveTime");
        }

        var www=100
        var ww=this.window.width-www-4
        var yy=this.param.otstup;

        this.arrComp = []
        this.ObjComp={}
        this.addComponent = function (_type, _bool, _linkParam, _text, dCont, _width, _x, _x1, _y, _text1, _fun, _param1, _param2) {
            var component = null;
            if(_bool === true) {
                var lbl = new DLabel(dCont, _x, _y+this.fontSize, _text)
                lbl.width = self.window.width - _width;
            }

            if (_type == 'DComboBox') component = new DComboBox   (dCont, _x1, _y, _text1, _fun, _param1)
            if (_type == 'DButton')   component = new DButton     (dCont, _x1, _y, _text1, _fun, _param1)
            if (_type == 'DCheckBox') component = new DCheckBox   (dCont, _x1, _y, _text1, _fun, _param1, _param2)
            if (_type == 'DImage')    component = new DImage      (dCont, _x1, _y, _param1, _fun)
            if (_type == 'DLabel')    component = new DLabel      (dCont, _x1, _y, _text1)
          
            if (_type == 'DSliderBig'||_type == 'DSlider'){
                component = new DSliderBig  (dCont, _x1, _y, _fun, _text1, _param1, _param2)
                component.mobile=true
            }
            if (_type == 'DInput'){
                component = new DInput      (dCont, _x1, _y, _text1, _fun)
                component.timeFun=1;
            }
            if (_type == 'DTextArea') component = new DTextArea(dCont, _x1, _y, _text1, _fun)
        
            component.width=_width
            component.height=this.wh
            if(_linkParam)component.linkParam = _linkParam

            if(_bool === true)yy+=this.wh+this.param.otstup;
            this.arrComp.push(component)    
            this.ObjComp[_linkParam] = component   
        };


        this.addComponent('DInput', true, 'param',  'param', this.window.content, ww, this.param.otstup, www, yy, "param", function(){self.drag()})
        this.addComponent('DInput', true, 'title', 'title', this.window.content, ww, this.param.otstup, www, yy, "title", function(){self.drag()})
        this.addComponent('DSlider', true, 'width', 'width', this.window.content, ww, this.param.otstup, www, yy, " ", function(){
            this.value = Math.round(this.value)
            self.drag()
        }, -1, 300)

        this.addComponent('DInput', true, 'value', 'comp.value',this.window.content, ww, this.param.otstup, www, yy, " ", function(){self.drag()})
        this.arrComp[this.arrComp.length-1].width = this.window.width-www-4-(this.wh+this.param.otstup)
        this.addComponent('DCheckBox', false, 'invisible_Value', null, this.window.content, ww, this.param.otstup, this.window.width-(this.wh+this.param.otstup), yy-(this.wh+this.param.otstup), " ", function(){
            self.cxzxz.active= this.value
            self.drag()
        })
        this.arrComp[this.arrComp.length-1].value = false

        this.addComponent('DComboBox', true, 'cmena', 'comp.name', this.window.content, ww, this.param.otstup, www, yy, ['null', 'DComboBox', 'DButton', 'DImage', 'DInput', 'DCheckBox', 'MDLeng', 'MTovars', 'GelleryIS'], function(){self.drag()})
        this.addComponent('DSlider', true, 'priority', 'priority', this.window.content, ww, this.param.otstup, www, yy, " ", function(){
            this.value = Math.round(this.value)
            self.drag()
        }, 0, 100)

        var pan = new DPanel (this.window.content, this.param.otstup, yy)
        pan.width = this.window.width - this.param.otstup*2
        yy+=this.param.otstup;

        this.addComponent('DCheckBox', true, 'bool', 'bool', this.window.content, ww-this.param.otstup*2, this.param.otstup*2, www, yy, " ", function(){self.drag()})
        this.addComponent('DInput', true, 'str', 'str', this.window.content, ww-this.param.otstup*2, this.param.otstup*2, www, yy, "str", function(){self.drag()})
        this.addComponent('DSliderBig', true, 'num', 'num', this.window.content, ww-this.param.otstup*2, this.param.otstup*2, www, yy, " ", function(){
            this.value = Math.round(this.value)
            self.drag()
        }, 0, 300)

       // this.addComponent('DInput', true, 'eval', 'eval', this.window.content, ww, this.param.otstup, www, yy, "null", function(){self.drag()})
        
        pan.height = (this.wh+this.param.otstup)*3
        yy+=this.wh+this.param.otstup;




        this.cxzxz=new MCCxzxz(this, this.window.content,function(s,p,p1){
            self.ObjComp["value"].value ="iconId,"+p1+","+p
            self.drag()
        })
        this.cxzxz.dCont.x=this.window.width+this.param.otstup
        this.cxzxz.active=false

       



        this.height = this.window.height = yy

        this.objBase=undefined;
        this.setObj=function(obj){ 
            this.objBase=obj
            if(this.objBase==undefined){
                this.window.visible=false
                return
            }
            this.window.visible=true;
           
            for (var i = 0; i < this.arrComp.length; i++) {
                if (this.arrComp[i].linkParam) {
                    this.arrComp[i].value = this.objBase[this.arrComp[i].linkParam]
                    if (this.objBase.value.split(',')[0] == "iconId"){
                        this.ObjComp["invisible_Value"].value = true
                        this.cxzxz.active=this.ObjComp["invisible_Value"].value
                        this.cxzxz.objID=this.objBase.value.split(',')[2]
                    } else {
                        this.ObjComp["invisible_Value"].value = false
                        this.cxzxz.active=this.ObjComp["invisible_Value"].value
                    }
                }
            }
        }
    }
}






/*
        var arrComp=[]

        new DLabel(this.window.content, this.param.otstup, yy+this.fontSize, "param")
        arrComp[0]=new DInput(this.window.content, www, yy, "param", function(){ self.drag() })
        yy+=this.wh+this.param.otstup;

        new DLabel(this.window.content, this.param.otstup, yy+this.fontSize, "title")
        arrComp[2]=new DInput(this.window.content, www, yy, "title", function(){ self.drag() })
        yy+=this.wh+this.param.otstup;

        new DLabel(this.window.content, this.param.otstup, yy+this.fontSize, "width")
        arrComp[1]=new DSliderBig(this.window.content, www, yy, function(){ self.drag() }, "width", 0, 300)
        yy+=this.wh+this.param.otstup;

        new DLabel(this.window.content, this.param.otstup, yy+this.fontSize, "value")
        arrComp[3]=new DInput(this.window.content, www, yy, "value", function(){ self.drag() })
        arrComp[8]=new DCheckBox(this.window.content, www, yy, "", function(){ self.drag() })
        yy+=this.wh+this.param.otstup;

        new DLabel(this.window.content, this.param.otstup, yy+this.fontSize, "cmena")
        arrComp[4]=new DComboBox(this.window.content, www, yy, ['null', 'DComboBox', 'DButton', 'DImage', 'DInput', 'DCheckBox'], function(){ self.drag() })
        yy+=this.wh+this.param.otstup;

        new DLabel(this.window.content, this.param.otstup, yy+this.fontSize, "bool")
        arrComp[5]=new DCheckBox(this.window.content, www, yy, "", function(){ self.drag() })
        yy+=this.wh+this.param.otstup;

        new DLabel(this.window.content, this.param.otstup, yy+this.fontSize, "str")
        arrComp[7]=new DInput(this.window.content, www, yy, "title", function(){ self.drag() })
        yy+=this.wh+this.param.otstup;

        new DLabel(this.window.content, this.param.otstup, yy+this.fontSize, "num")
        arrComp[6]=new DSliderBig(this.window.content, www, yy, function(){ self.drag() }, "num", 0, 300)
        yy+=this.wh+this.param.otstup;

        yy+=this.wh+this.param.otstup;

*/
