

import { PM } from '../pm/PM.js';
import { BoxHelper } from './menu/BoxHelper.js';

export function INFO() { 	
	this.type="INFO";

    this.tIdArray = [
        {id: 0, name: '0. неопределен'},
        {id: 1, name: '1. геометрии'},
        {id: 2, name: '2. сохронение'},
        {id: 3, name: '3. material'},
        {id: 4, name: '4. test'},
        {id: 5, name: '5. material'},
        {id: 6, name: '6. text'},
        {id: 7, name: '7. настройки'},
        {id: 8, name: '8. Базовые'},
        {id: 9, name: '9. Запчасти'},
        {id: 10, name: '10. Marker'},
        {id: 11, name: '11. PlusGraf'},
    ]

   /* this.aSort = [
        {id:0, name:"0: все"},
        {id:1, name:"1: xz1"},
        {id:2, name:"2: xz2"}
    ]*/
    this.aSort = [
        {id:0, name:"0: All"},
        {id:1, name:"1: xz"},
        {id:2, name:"2: Sten"}
    ]

}