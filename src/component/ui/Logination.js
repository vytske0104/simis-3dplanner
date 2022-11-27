
export class Logination {
    constructor(par, fun) {
        var self = this;
        this.type = "Logination";
        this.par = par;
        this.fun = fun;


        this._token
        this.dCont = new DCont(this.par.par.contentHTML)
        this.button = new DButton(this.dCont, 0, 0, 'Вход', function(){
             self.window.visible=  !self.window.visible 
        })
        this.button.height=30

        this.window = new DWindow(this.dCont, 0, 0, " ", function(){
        });   
        this.window.width=500
        this.window.visible=false

        var url=this.par.param.server;

        let __wwb=new DButton(this.window,200, 34, "послать", function(){
            startNamePas()
        });

         __wwb=new DButton(this.window,300, 34, "Зарег..", function(){
            var obj={}
            obj.url=url+"auth/users/"
            obj.method="POST"

            obj.data={
                "email": "", 
                "re_password": wwi1.text,
                "password": wwi1.text,
                "username": wwi.text,
            }

            obj.success = function (response) {
                trace("зашибись===",response)
                startNamePas()
            };

            obj.error = function (response) {                
                trace("error===",response)
                wwt.text=response.responseText
                wwt.color1="#ffcccc"
            } 
            trace(">=",obj)
            $.ajax(obj);
        })

         __wwb=new DButton(this.window,400, 34, "выйти", function(){
            var obj={}
            obj.url=url+"auth/token/logout/"
            obj.method="POST"
            if(self.token)if(self.token.length>8){
                obj.headers = {
                'Authorization': 'Token ' + self.token
                };
            }
            trace('token выйти', self.token)

            obj.success = function (response) {
                trace("зашибись===",response)
                wwt.text="Все огонь вышли"               
                wwt.color1="#ffffff"
                setToken(null)
            };

            obj.error = function (response) {                
                trace("error===",response)
                wwt.text=response.responseText
                wwt.color1="#ffcccc"
            } 
            trace(">=",obj)
            $.ajax(obj);
        })


        let wwi=new DInput(this.window,0, 34, "vorodis2", function(){
        });        

        let wwi1=new DInput(this.window,100, 34, "1234", function(){
        });        
        
        let wwt=new DTextArea(this.window,0, 34+34, "ответ", function(){
        });        
        
        wwt.width=this.window.width
        this.window.height=wwt.height+wwt.y

        function startNamePas(){  
            var obj={}
            obj.url=url+"auth/token/login/"
            obj.method="POST"
           
            obj.data={
                "password": wwi1.text,
                "username": wwi.text,
            }
            obj.success = function (response) {
                trace("зашибись===",response)
                wwt.text=response.auth_token                
                wwt.color1="#ffffff"
                setToken(response.auth_token)
            };
            obj.error = function (response) {                
                trace("error===",response)
                wwt.text=response.responseText
                wwt.color1="#ffcccc"
            } 
            trace(">=",obj)
            $.ajax(obj);
        }

        function setToken(t){            
            // this.button.text=t; 
            self.token=t
            window.localStorage['credentials']=JSON.stringify({token:t})
            fun('setToken', self.token)
        }

        this.setToken = function (token) {
            this.token = token;
            window.localStorage[this.key] = JSON.stringify(self.object);
        }

        this.sizeWindow = function(w, h){
            this.width = w
            this.height = h

            this.button.x = this.width - (this.button.width + 3)
            this.button.y = 2

            this.window.x = this.width - (this.window.width + 3)
            this.window.y = this.button.y + this.button.height + 3
        }
    }


    set token(_val) {
        if (_val == this._token) return;
        this._token = _val
    };

    get token() {
        return this._token;
    }
}