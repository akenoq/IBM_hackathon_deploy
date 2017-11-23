"use strict";

export default class LevelReturner{
    static getJSONString(){
        let contentFromURL = window.location.search;

        if(contentFromURL.indexOf("?") === -1){
            return "";
        }

        let mass = [];
        mass = contentFromURL.split("?");

        return mass[1].toString();
    }

    static getWallsLevel(){
            let contentFromURL = window.location.search;

            if(contentFromURL.indexOf("?") === -1){
                return [];
            }

            let mass = [];
            mass = contentFromURL.split("?");

            let jsonString = decodeURIComponent(mass[1].toString());
            let myObj = JSON.parse(jsonString);

            let arr = [];

            function addToArr(i,j){
                const obj = {
                    i: i,
                    j: j
                };
                arr.push(obj);
            }

            for(let i = 1; i < 19; i++){
                for(let j = 1; j < 19; j++){
                    if(myObj.arr[i][j] === 1) {
                        addToArr(i, j);
                    }
                }
            }

            return arr;
    }

    static getLevelOfAllElements(){
        let contentFromURL = window.location.search;

        if(contentFromURL.indexOf("?") === -1){
            return [];
        }

        let mass = [];
        mass = contentFromURL.split("?");

        let jsonString = decodeURIComponent(mass[1].toString());
        let myObj = JSON.parse(jsonString);

        let arr = [];

        function addToArr(i,j,value){
            const obj = {
                i: i,
                j: j,
                value: value
            };
            arr.push(obj);
        }

        for(let i = 1; i < 19; i++){
            for(let j = 1; j < 19; j++){
                addToArr(i, j, myObj.arr[i][j]);
            }
        }

        return arr;
    }
}
