

import { PM } from '../pm/PM.js';
import { BoxHelper } from './menu/BoxHelper.js';

export function INFO() { 	
	this.type="INFO";

    this.tIdArray = [
        {id: 0, name: '0. шаг Поз стен'},
        {id: 1, name: '1. шаг Поз высота стен'},
        {id: 2, name: '2. шаг Драг обдж'},
        {id: 3, name: '3. шаг Lesa'},
        {id: 4, name: '4. шаг Севе++'},
        {id: 5, name: '5. xz'}
    ]

    this.aSort = [
        {id:0, name:"0: все"},
        {id:1, name:"1: xz1"},
        {id:2, name:"2: xz2"}
    ]
}