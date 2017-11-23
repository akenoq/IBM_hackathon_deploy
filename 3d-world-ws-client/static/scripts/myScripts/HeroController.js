"use strict";

import Logger from "./Logger.js";
import LevelReturner from "./LevelReturner.js";

export default class HeroController{
    constructor(scene, wallsArray, iii, jjj, finI, finJ, carsArray, finishOfGameObject) {
        this.scene = scene;

        this.finishOfGameObject = finishOfGameObject;

        this.wallsArray = wallsArray;
        this.carsArray = carsArray;

        this.mainJSONstringOfTheLevel = LevelReturner.getJSONString();

        this.finI = finI;
        this.finJ = finJ;

        this.createHero(iii, jjj);

        this.w = false;
        this.a = false;
        this.s = false;
        this.d = false;

        this.speedMoving = 0.2;
        this.speedRotation = 0.05;

        this.addKeyEvents();
    }

    setKeyValues(n, flag) {
        switch (n) {
            case 87:
                this.w = flag;
                break;
            case 65:
                this.a = flag;
                break;
            case 83:
                this.s = flag;
                break;
            case 68:
                this.d = flag;
                break;
        }
    }

    createHero(i, j){
        i = parseInt(i);
        j = parseInt(j);

        const ww = 5;

        let radius = ww / 2;
        let height = ww;
        let sideNumber = 4;

        let cone_geometry = new THREE.ConeBufferGeometry(radius, height, sideNumber);
        let cone_material = new THREE.MeshLambertMaterial({color: "#ff0000"});
        let cone = new THREE.Mesh(cone_geometry,cone_material);

        cone.position.x = j * ww + ww / 2;
        cone.position.y = ww / 2;
        cone.position.z = i * ww + ww / 2;

        cone.rotation.x = 0;
        cone.rotation.y = 0;
        cone.rotation.z = -Math.PI / 2;

        this.scene.add(cone);

        this.hero = cone;
    }

    addKeyEvents(){
        const t = this;

        /*
        window.onkeydown = function(event) {
            const keyNumber = event.keyCode;
            t.setKeyValues(keyNumber, true);
        };

        window.onkeyup = function(event){
            const keyNumber = event.keyCode;
            t.setKeyValues(keyNumber, false);
        }
        */

        const urlForSocket = localStorage.getItem("SERVER_ADRESS").toString();
        let socket = new WebSocket(urlForSocket);

        socket.onopen = function() {
            console.log("Соединение установлено");
        };

        socket.onclose = function(event) {
            console.log("Соединение закрыто");
        };

        socket.onerror = function(error) {
            console.log("Ошибка соединения");
        };

        socket.onmessage = function(event) {
            console.log("Получено сообщение: " + event.data);
            const message = event.data.toString();

            t.w = false;
            t.a = false;
            t.s = false;
            t.d = false;

            if(message.indexOf("W") !== -1) t.w = true;
            if(message.indexOf("A") !== -1) t.a = true;
            if(message.indexOf("S") !== -1) t.s = true;
            if(message.indexOf("D") !== -1) t.d = true;

            socket.send("__OK__OK__");
        };
    }

    hitTest(){
        const arr = this.wallsArray;

        let xx = this.hero.position.x;
        let zz = this.hero.position.z;

        this.speedMoving += 2;

        if(this.w === true){
            xx = this.hero.position.x + this.speedMoving * Math.cos(this.hero.rotation.y);
            zz = this.hero.position.z - this.speedMoving * Math.sin(this.hero.rotation.y);
        }

        if(this.s === true){
            xx = this.hero.position.x - this.speedMoving * Math.cos(this.hero.rotation.y);
            zz = this.hero.position.z + this.speedMoving * Math.sin(this.hero.rotation.y);
        }

        this.speedMoving -= 2;

        const x_pos = parseInt(xx / 5);
        const z_pos = parseInt(zz / 5);


        ////////////////////////////////

        const nowX = parseInt(this.hero.position.x / 5);
        const nowZ = parseInt(this.hero.position.z / 5);

        if(nowX === this.finJ && nowZ === this.finI){
            this.finishOfGameObject.gameFinish = true;
            window.location = "victory.html";
        }

        const ww = 5;
        const finishX = this.finJ * ww + ww / 2;
        const finishZ = this.finI * ww + ww / 2;

        const heroX = this.hero.position.x;
        const heroZ = this.hero.position.z;

        function getDistanse(x1,z1,x2,z2){
            const otr1 = x1 - x2;
            const otr2 = z1 - z2;
            return Math.sqrt( (otr1 * otr1) + (otr2 * otr2) );
        }

        const dist = getDistanse(finishX, finishZ, heroX, heroZ);

        if(dist <= 5.1){
            this.finishOfGameObject.gameFinish = true;
            window.location = "victory.html";
        }

        for(let i = 0; i < this.carsArray.length; i++){
            const car = this.carsArray[i].carObj;

            const carX = parseInt(car.position.x / 5);
            const carZ = parseInt(car.position.z / 5);

            if(carX === nowX && carZ === nowZ){
                this.finishOfGameObject.gameFinish = true;
                window.location = "fail.html" + "?" + this.mainJSONstringOfTheLevel;
            }
        }

        ////////////////////////////////

        for(let i = 0; i < arr.length; i++){
            const obj = arr[i];

            if(obj.i === z_pos && obj.j === x_pos){
                return true;
            }
        }

        return false;
    }

    moveHero(){
        if(this.hitTest() === false) {
            if (this.a === true) {
                this.hero.rotation.y += this.speedRotation;
            }

            if (this.d === true) {
                this.hero.rotation.y -= this.speedRotation;
            }

            if (this.w === true) {
                this.hero.position.x += this.speedMoving * Math.cos(this.hero.rotation.y);
                this.hero.position.z += -this.speedMoving * Math.sin(this.hero.rotation.y);
            }

            if (this.s === true) {
                this.hero.position.x += -this.speedMoving * Math.cos(this.hero.rotation.y);
                this.hero.position.z += this.speedMoving * Math.sin(this.hero.rotation.y);
            }
        }
    }
}
