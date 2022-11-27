
/*
Хрень при старте или обнове юзера
выдергиваем токен
*/
//import { Logination } from './Logination.js';

export class LocToken {
    constructor(par, fun) {
        var self = this;
        this.type = "LocToken";
        this.par = par;
        this.fun = fun;

        this.param = this.par.param;
       /* this.logination = new Logination(this, function(s,p,p1){
            if(s=="setToken") self.token = p
                trace(s,p,p1)
        })

        this.sizeWindow = function(w, h){
            this.width = w
            this.height = h

            //this.logination.sizeWindow(w,h)
        }*/
/*
        this.key = this.param.nameLS;//'credentials';
        this.object = {}
        var ooo = localStorage.getItem(this.key);
        if (ooo == null||ooo==undefined||ooo=="undefined") {
            this.object = {}
            window.localStorage[this.key] = JSON.stringify(this.object);
        } else {
            this.object = JSON.parse(ooo);
        }

        var token = this.object.token;        

        this._token = -1;

        this.dragUzer = function () {                      
            var obj = {
                url: self.par.param.server + 'auth/users/me/',
                success: function (e) {
                    mhbd.uzer = e;                    
                    self.logination.button.text = e.username
                    self.fun("dragUzer");
                },
                error: function (e) {
                    mhbd.uzer = null;
                    mhbd.token= null;                     
                    self.fun("dragUzer");
                },
                headers: {
                    'Authorization': 'Token ' + mhbd.token
                }
            }
            $.ajax(obj)
        }

		

        this.setToken = function (token) {
            this.token = token;
            this.object.token = token;
            window.localStorage[this.key] = JSON.stringify(self.object);
        }
        trace(this.token+"   "+token)
        this.token = token;

        if(token==undefined || token==null){
            var url = new URL(window.location.href);
            url = self.par.param.server + "get_token_by_session/";
            $.ajax({
                url: url,
                method: "GET",
                success: function(data) {
                    console.log(data);
                    self.setToken(data.auth_token);
                },
                error: function(data) {
                   console.warn(data);
                }
            })
        }*/

    }
    set token(_val) {
        if (_val == this._token) return;
        

        this._token = _val;
        mhbd.token = _val;
        if (this._token == null || this._token == undefined) {
            mhbd.uzer = null;            
            //this.logination.button.text = "Войти"
            this.fun("dragUzer");
        } else {
            this.dragUzer()
        }

        //this.logination.token = _val
    };

    get token() {
        return this._token;
    }
}