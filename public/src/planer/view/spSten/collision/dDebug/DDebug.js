// -----------------------------------------------------------------------------------------------
// -----------------------------------------------------------------------------------------------



export class DDebug1   {
  	constructor(dCont,x,y,collisi) {
  		this.type="DDebug1";
        this.typeNa="xz";
  		var self=this;
  		this._otstup=5
  		this._otstup1=15
  		this._collisi=null
  		this.dc=dCont
  

  		this.window=new DWindow(null,0,0,"DDebug Тесты 2д ректов и линий");
  		
  		this.panel=new DPanel(this.window.content,this._otstup1,this._otstup1);  		
  		this.dCont=new DCont(this.panel);
  		

  		this.canvas = document.createElement('canvas'); // канвас для картинки
        this.ctx = this.canvas.getContext('2d'); // контекст картинки

        this.dCont.div.appendChild(this.canvas);



        this.draw=function(){
        	this.ctx.clearRect(0, 0, ww, hh)      	

            for (var i = 0; i < this._collisi.arrRect.length; i++) {
            	this.dBox( 
                    this._collisi.arrRect[i].rectCollisMeshdy,
                    1,"#000f71",0.5);


                let t=i+" "+Math.round(this._collisi.arrRect[i].rectCollisMeshdy.x)+" "+Math.round(this._collisi.arrRect[i].rectCollisMeshdy.y);
                this.drawText(
                    this._collisi.arrRect[i].rectCollisMeshdy.x,
                    this._collisi.arrRect[i].rectCollisMeshdy.y-5,                     
                    t,10,"#000f71");
            }
   
            for (var i = 0; i < this._collisi.arrLine.length; i++) {
            	this.drawLine(
                    this._collisi.arrLine[i].p.x,this._collisi.arrLine[i].p.y, 
                    this._collisi.arrLine[i].p1.x,this._collisi.arrLine[i].p1.y,
                    2,"#ff0000");

                let t=i+" "+Math.round(this._collisi.arrLine[i].p.x)+" "+Math.round(this._collisi.arrLine[i].p.y);

                this.drawText(
                    this._collisi.arrLine[i].p.x,this._collisi.arrLine[i].p.y-5, 
                    t,10,"#ff0000");
            }

            this.drawCollLine()

        }
        var clbox
        this.drawCollLine=function(){   
            clbox=this._collisi.colozi.collLine;
            this.dBox( 
                    clbox.sRect,
                    2,"#ff0000",0.5,true);

            this.dBox( 
                    clbox.boxHH,
                    2,"#00ff00",0.5,true);

            for (var i = 0; i < clbox.array.length; i++) {
                this.dBox( 
                    clbox.array[i],
                    1,"#00ff00",0.5,true);
            }



            for (var i = 0; i < clbox.apb.length; i++) {
                this.dBox( 
                    clbox.apb[i],
                    0.5,"#000ff0",0.5,true);
            }
           
            this.dBox( 
                clbox.boxWW,
                2,"#000ff0",0.5,true);
            
            this.dBox( 
                clbox.boxPP,
                4,"#f00ff0",0.2,true);

        }














        this.dBox=function(box, tol, col, alpha,bool){
            
            this.drawBox(
                box.x,
                box.y,
                box.width||box.w,
                box.height||box.h,
                tol, col, alpha, bool
                )
        }
      
        this.drawBox=function(x,y,w,h, tol, col, alpha, bool){

            if(bool!==undefined){
                
                this.drawLine(x,y,x+w,y, tol, col);
                this.drawLine(x,y+h,x+w,y+h, tol, col);
                this.drawLine(x,y,x,y+h, tol, col);
                this.drawLine(x+w,y,x+w,y+h, tol, col);
               
                return
            }


        	this.ctx.beginPath();
            this.ctx.lineWidth=tol==undefined ? "1" :tol*1 ;
            this.ctx.strokeStyle=col==undefined ? "#128ece" :col;

            this.ctx.globalAlpha = alpha==undefined ? 0.5 :alpha ; 
            this.ctx.moveTo(x, y);
            this.ctx.lineTo(x+w, y); 
            this.ctx.lineTo(x+w, y+h);
            this.ctx.lineTo(x, y+h);
            this.ctx.lineTo(x, y); 
            
            
            this.ctx.fillStyle =col;
            this.ctx.moveTo(x, y);
            this.ctx.lineTo(x+w, y); 
            this.ctx.lineTo(x+w, y+h);
            this.ctx.lineTo(x, y+h);
            this.ctx.lineTo(x, y); 

                   	
            this.ctx.fill();
            this.ctx.stroke();
            this.ctx.closePath();
        }


        this.drawText=function(x, y, t, size, col){
            this.ctx.beginPath();    
            this.ctx.strokeStyle=col==undefined ? "#000000" :col;
            this.ctx.fillStyle =col==undefined ? "#000000" :col;
            let s = "30px Arial";
            if(size)s=size+"px Arial";
            this.ctx.font = s;
            this.ctx.fillText(t, x, y);
            this.ctx.fill();
            this.ctx.stroke();
            this.ctx.closePath();
        }

      
        this.drawLine=function(x,y,x1,y1, tol, col){
           
            this.ctx.beginPath();
            this.ctx.lineWidth=tol==undefined ? "1" :tol*1 ;
            this.ctx.strokeStyle=col==undefined ? "#128ece" :col;
            this.ctx.moveTo(x, y);
            this.ctx.lineTo(x1, y1);
            this.ctx.fill();
            this.ctx.stroke();
            this.ctx.closePath();
        }








  		this.drag=function(){
			self.drag1()
  		}
  		var ww,hh
  		this.drag1=function(){  			
  			ww = this._collisi.world.width;
  			hh = this._collisi.world.height;

  			this.window.width=ww+this._otstup1*2;
  			this.window.height=hh+this._otstup1*2+32;

  			this.panel.width=ww;
  			this.panel.height=hh;
  			if(this.canvas.width!=ww)this.canvas.width=ww
  			if(this.canvas.height!=hh)this.canvas.height=hh	
  			if(this.wPlus){
  				this.wPlus.x=this.window.width+this._otstup
  				this.wPlus.y=0
  			}
  			this.draw()
  		}


  		this.wPlus
  		var ab=[]
  		var arrColi=[]
  		var arrCPatch=[]
  		this.setArr=function(arr,arr1){
  			arrColi=arr;
  			arrCPatch=arr1;
  			this.wPlus=new DWindow(this.window,0,0,"Dop menu");
  			this.wPlus.width=150;
  			var yy=this._otstup;
  			for (var i = 0; i < arrColi.length; i++) {
  				ab[i]=new DButton(this.wPlus.content,this._otstup+(this._otstup+32)*i,yy,""+i,function(){
  					if(this.color==dcmParam.colorActive){
  						self.collisi=null
  					}else{
  						self.collisi=self.getColi(this.ooo,0);
  					}
  				})
  				ab[i].idArr=i;
  				ab[i].width=ab[i].height=32;
  				ab[i].ooo=arrColi[i]
  				this.wPlus.addD(ab[i],1);
  			}

  		}


  		var oo
  		this.dragColi=function(){
  			if(!this.wPlus)return;
  			
  			for (var i = 0; i < ab.length; i++) {
  				if(this._collisi){
  					oo=this.getColi(ab[i].ooo,0);
  					if(oo.uuid==this._collisi.uuid){
  						ab[i].color=dcmParam.colorActive
  					}else{
  						ab[i].color=dcmParam.color
  					}
  				}else{
  					ab[i].colorActive=dcmParam.color;
  				}
  			}
  		}

  		this.getColi=function(o,s){
  			if(arrCPatch[s]==undefined) return o	
  			
  			return this.getColi(o[arrCPatch[s]],s+1);
  		}
  	}

  	set collisi(value) {
        if(this._collisi!==value){
        	if(this._collisi)this._collisi.funDedug=undefined
            this._collisi= value;        	
            if(this.window.parent!=undefined)this.window.parent.remove(this.window)
            if(this._collisi) {
            	this.dc.add(this.window);
            	this._collisi.funDedug=this.drag;            	
            	this.drag();

            }
            this.dragColi()  
        }
    }    
    get collisi() { return  this._collisi;}
};
