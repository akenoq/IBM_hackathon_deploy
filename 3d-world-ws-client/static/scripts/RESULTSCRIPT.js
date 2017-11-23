/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 3);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";


class Logger{
    static write(){
        const flag = true;

        if(flag === true) {
            if (arguments.length === 0) {
                return;
            }

            let elementsString = "";
            for (let i = 0; i < arguments.length; i++) {
                const element = arguments[i].toString();
                elementsString = elementsString + element + " ";
            }
            console.log("Message: " + elementsString);
        }
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = Logger;



/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";


class ElementGetter{
    static get(idBox){
        idBox = idBox.toString();
        return document.getElementById(idBox);
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = ElementGetter;
;


/***/ }),
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";


class LevelReturner{
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
/* harmony export (immutable) */ __webpack_exports__["a"] = LevelReturner;



/***/ }),
/* 3 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__SceneWorker_js__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__ElementGetter_js__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__Logger_js__ = __webpack_require__(0);






class MainClass {
    constructor(){
        __WEBPACK_IMPORTED_MODULE_2__Logger_js__["a" /* default */].write("RELEASE VERSION");
        __WEBPACK_IMPORTED_MODULE_2__Logger_js__["a" /* default */].write("Version: 3.1");
        this.createControlingObjects();
        this.addEventsToPanelButtons();
    }

    createControlingObjects(){
        this.sceneWorker = new __WEBPACK_IMPORTED_MODULE_0__SceneWorker_js__["a" /* default */]("threeJSGraphicsBox", 1000, 800);
    }

    addEventsToPanelButtons(){
        const t = this;

        __WEBPACK_IMPORTED_MODULE_1__ElementGetter_js__["a" /* default */].get("btnTop").onclick = function () {
            __WEBPACK_IMPORTED_MODULE_2__Logger_js__["a" /* default */].write("Proection TOP");
            t.sceneWorker.setCameraType("TOP");
        };

        __WEBPACK_IMPORTED_MODULE_1__ElementGetter_js__["a" /* default */].get("btnFace").onclick = function () {
            __WEBPACK_IMPORTED_MODULE_2__Logger_js__["a" /* default */].write("Proection FACE");
            t.sceneWorker.setCameraType("FACE");
        }
    }
}

window.onload = function(){
    const mainObj = new MainClass();
};

/***/ }),
/* 4 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__ElementGetter_js__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__ObjectsCreator__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__HeroController__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__LevelReturner_js__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__Logger__ = __webpack_require__(0);








class SceneWorker{
    constructor(idBox, ww, hh){
        this.box = __WEBPACK_IMPORTED_MODULE_0__ElementGetter_js__["a" /* default */].get(idBox);
        this.ww = ww;
        this.hh = hh;

        this.iii = 3;
        this.jjj = 4;

        this.finI = 1000;
        this.finJ = 1000;
        this.finishCube = null;

        this.cameraType = "TOP";

        this.initSceneCameraRenderer();
        this.addLightsToScene();
        this.addGroundToScene();
        this.setCameraTopProection();

        this.wallsArray = [];
        this.buildWallsPerimetr();
        this.buildWalls();

        this.carsArray = [];
        this.createCars();

        this.finishOfGameObject = {
            gameFinish: false
        };

        this.heroController = new __WEBPACK_IMPORTED_MODULE_2__HeroController__["a" /* default */](this.scene, this.wallsArray, this.iii, this.jjj, this.finI, this.finJ, this.carsArray, this.finishOfGameObject);

        this.printContent();

        const t = this;
        this.repeatingMethod(function(){

            if(t.finishOfGameObject.gameFinish === true){
                clearInterval(t.repeatInterval);
            }

            t.pointLight.position.set(t.heroController.hero.position.x, 4, t.heroController.hero.position.z);

            if(t.finishCube !== null){
                t.finishCube.rotation.y += 0.04;
                if(t.finishCube.rotation.y >= Math.PI / 2){
                    t.finishCube.rotation.y = 0;
                }
            }

            t.movingOfAllCars();

            t.heroController.moveHero();

            if(t.cameraType === "TOP"){
                t.setCameraTopProection();
            }

            if(t.cameraType === "FACE"){
                t.camera.position.x = t.heroController.hero.position.x;
                t.camera.position.y = 2.6;
                t.camera.position.z = t.heroController.hero.position.z;

                t.camera.rotation.x = 0;
                t.camera.rotation.y = t.heroController.hero.rotation.y - Math.PI / 2;
                t.camera.rotation.z = 0;
            }

            t.printContent();
        });
    }

    setCameraType(type){
        this.cameraType = type.toString();
    }

    addWall(i, j){
        const wall = {
            i: i,
            j: j
        };
        this.wallsArray.push(wall);
    }

    movingOfAllCars(){
        const speed = 0.5;
        const t = this;

        function isWall(zz,xx){
            for(let i = 0; i < t.wallsArray.length; i++){
                const wall = t.wallsArray[i];
                if(wall.i === zz && wall.j === xx){
                    return true;
                }
            }
            return false;
        }

        for(let i = 0; i < t.carsArray.length; i++){
            const obj = t.carsArray[i];

            let xx = obj.carObj.position.x;
            let zz = obj.carObj.position.z;

            xx = parseInt(xx / 5);
            zz = parseInt(zz / 5);

            if(obj.type === "X"){
                if(obj.v === 1){
                    if(isWall(zz, xx + 1)){
                        obj.v = 0;
                    } else {
                        obj.carObj.position.x += speed;
                    }
                }
                if(obj.v === 0){
                    if(isWall(zz, xx - 1)){
                        obj.v = 1;
                    } else {
                        obj.carObj.position.x -= speed;
                    }
                }
            }

            if(obj.type === "Z"){
                if(obj.v === 1){
                    if(isWall(zz + 1, xx)){
                        obj.v = 0;
                    } else {
                        obj.carObj.position.z += speed;
                    }
                }
                if(obj.v === 0){
                    if(isWall(zz - 1, xx)){
                        obj.v = 1;
                    } else {
                        obj.carObj.position.z -= speed;
                    }
                }
            }
        }
    }

    createCars(){
        const t = this;
        function addCar(i, j, type){
            let carObj = null;

            if(type === "X") {
                carObj = __WEBPACK_IMPORTED_MODULE_1__ObjectsCreator__["a" /* default */].createCarMovingX(i, j, t.scene, "#00FF00", "#000000");
            }
            if(type === "Z") {
                carObj = __WEBPACK_IMPORTED_MODULE_1__ObjectsCreator__["a" /* default */].createCarMovingZ(i, j, t.scene, "#0000FF", "#000000");
            }
            t.carsArray.push({i: i, j: j, carObj: carObj, v: 1, type: type});
        }

        const allLevel = __WEBPACK_IMPORTED_MODULE_3__LevelReturner_js__["a" /* default */].getLevelOfAllElements();

        for(let i = 0; i < allLevel.length; i++){
            const obj = allLevel[i];

            const ii = obj.i;
            const jj = obj.j;
            const value = obj.value;

            if(value === 2){
                addCar(ii, jj, "X");
            }

            if(value === 3){
                addCar(ii, jj, "Z");
            }

            if(value === 4){
                this.iii = ii;
                this.jjj = jj;
            }

            if(value === 5){
                t.finishCube = __WEBPACK_IMPORTED_MODULE_1__ObjectsCreator__["a" /* default */].createFinishPosition(ii, jj, t.scene);
                t.finI = ii;
                t.finJ = jj;
            }
        }
    }

    buildWallsPerimetr(){
        const length = 20;
        for(let i = 0; i < length; i++){
            __WEBPACK_IMPORTED_MODULE_1__ObjectsCreator__["a" /* default */].createWall(0,i,this.scene);
            this.addWall(0, i);
            __WEBPACK_IMPORTED_MODULE_1__ObjectsCreator__["a" /* default */].createWall(19,i,this.scene);
            this.addWall(19, i);
        }

        for(let i = 1; i < length - 1; i++){
            __WEBPACK_IMPORTED_MODULE_1__ObjectsCreator__["a" /* default */].createWall(i, 0, this.scene);
            this.addWall(i, 0);
            __WEBPACK_IMPORTED_MODULE_1__ObjectsCreator__["a" /* default */].createWall(i, 19, this.scene);
            this.addWall(i, 19);
        }
    }

    buildWalls(){
        const t = this;

        function wall(i,j){
            __WEBPACK_IMPORTED_MODULE_1__ObjectsCreator__["a" /* default */].createWall(i, j, t.scene);
            t.addWall(i, j);
        }

        const levelArr = __WEBPACK_IMPORTED_MODULE_3__LevelReturner_js__["a" /* default */].getWallsLevel();
        for(let i = 0; i < levelArr.length; i++){
            const obj = levelArr[i];
            const ii = obj.i;
            const jj = obj.j;
            wall(ii,jj);
        }

    }

    repeatingMethod(foo){
        this.repeatInterval = setInterval(foo, 50);
    }

    setCameraTopProection(){
        const camera = this.camera;

        camera.position.x = 50;
        camera.position.y = 100;
        camera.position.z = 50;

        camera.rotation.x = -Math.PI / 2;
        camera.rotation.y = 0;
        camera.rotation.z = 0;
    }

    printContent(){
        this.renderer.render(this.scene, this.camera);
    }

    initSceneCameraRenderer(){
        const ww = this.ww;
        const hh = this.hh;
        this.scene = new THREE.Scene();
        this.camera = new THREE.PerspectiveCamera(60, ww / hh, 0.1, 1000);
        this.renderer = new THREE.WebGLRenderer();
        this.renderer.setClearColor("#5882ff");
        this.renderer.setSize(ww, hh);
        this.box.append(this.renderer.domElement);
    }

    addLightsToScene(){
        const force = 0.5;

        const light_1 = __WEBPACK_IMPORTED_MODULE_1__ObjectsCreator__["a" /* default */].createSpotLight(0, 0, force);
        const light_2 = __WEBPACK_IMPORTED_MODULE_1__ObjectsCreator__["a" /* default */].createSpotLight(100, 0, force);
        const light_3 = __WEBPACK_IMPORTED_MODULE_1__ObjectsCreator__["a" /* default */].createSpotLight(100, 100, force);
        const light_4 = __WEBPACK_IMPORTED_MODULE_1__ObjectsCreator__["a" /* default */].createSpotLight(0, 100, force);
        const light_5 = __WEBPACK_IMPORTED_MODULE_1__ObjectsCreator__["a" /* default */].createSpotLight(50, 50, force);
        this.scene.add(light_1);
        this.scene.add(light_2);
        this.scene.add(light_3);
        this.scene.add(light_4);
        this.scene.add(light_5);

        this.pointLight = __WEBPACK_IMPORTED_MODULE_1__ObjectsCreator__["a" /* default */].createPointLight(50, 50, force);
        this.scene.add(this.pointLight);
    }

    addGroundToScene(){
        __WEBPACK_IMPORTED_MODULE_1__ObjectsCreator__["a" /* default */].createPlane(100, this.scene);
    }

}
/* harmony export (immutable) */ __webpack_exports__["a"] = SceneWorker;
;

/***/ }),
/* 5 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";


class ObjectsCreator{
    static createSpotLight(xx, zz, force){
        let spotLight = new THREE.SpotLight("#ffffff", parseFloat(force + 0.1));
        const yy = 220;
        spotLight.position.set(xx, yy, zz);
        return spotLight;
    }

    static createPointLight(xx, zz, force){
        const pointLight = new THREE.PointLight( "#ffffff", force);
        pointLight.position.set( xx, 4, zz );
        return pointLight;
    }

    static createFinishPosition(i, j, scene) {
        const ww = 5;
        let cube = ObjectsCreator.createCube(2, 2, 2, "#000000");
        cube.position.x = j * ww + ww / 2;
        cube.position.y = 2.5;
        cube.position.z = i * ww + ww / 2;
        scene.add(cube);
        return cube;
    }


    static createPlane(ww, scene){
        let loader = new THREE.TextureLoader();
        loader.load("images/ground.png", function(image){

            const repeatValue = 20;
            image.wrapS = THREE.RepeatWrapping;
            image.wrapT = THREE.RepeatWrapping;
            image.repeat.set(repeatValue, repeatValue);

            let planeGeometry = new THREE.PlaneGeometry(ww, ww, 1, 1);
            let planeMaterial = new THREE.MeshLambertMaterial({map: image});
            let plane = new THREE.Mesh(planeGeometry, planeMaterial);
            plane.rotation.x = (-0.5) * Math.PI;
            plane.position.x = ww / 2;
            plane.position.y = 0;
            plane.position.z = ww / 2;
            scene.add(plane);
        });
    }

    static createWall(i, j, scene){
        i = parseInt(i);
        j = parseInt(j);
        const ww = 5;

        let loader = new THREE.TextureLoader();
        loader.load("images/wall.png", function(image) {
            let cubeGeometry = new THREE.CubeGeometry(ww, ww, ww);
            let cubeMaterial = new THREE.MeshLambertMaterial({map: image});
            let cube = new THREE.Mesh(cubeGeometry, cubeMaterial);
            cube.position.x = j * ww + ww / 2;
            cube.position.y = ww / 2;
            cube.position.z = i * ww + ww / 2;
            scene.add(cube);
        });
    }

    static createCube(ww, hh, dd, color){
        let cubeGeometry = new THREE.CubeGeometry(ww, hh, dd);
        let cubeMaterial = new THREE.MeshLambertMaterial({color: color.toString()});
        return new THREE.Mesh(cubeGeometry, cubeMaterial);
    }

    static createCylinder(radius, height, color){
        let geometry = new THREE.CylinderGeometry(radius, radius, height, 16);
        let material = new THREE.MeshBasicMaterial({color: color.toString()});
        return new THREE.Mesh( geometry, material );
    }

    static createCarMovingX(i, j, scene, colorBody, colorWheels){
        return ObjectsCreator.createCar(i, j, scene, colorBody, colorWheels, "XXX");
    }

    static createCarMovingZ(i, j, scene, colorBody, colorWheels){
        return ObjectsCreator.createCar(i, j, scene, colorBody, colorWheels, "ZZZ");
    }

    static createCar(i, j, scene, colorBody, colorWheels, typeOfCar){
        i = parseInt(i);
        j = parseInt(j);

        colorBody = colorBody.toString();
        colorWheels = colorWheels.toString();

        let cube1 = ObjectsCreator.createCube(5, 2, 3, colorBody);
        cube1.position.set(0, 2, 0);
        let cube2 = ObjectsCreator.createCube(3, 1, 2, colorBody);
        cube2.position.set(0, 3.5, 0);

        let c1 = ObjectsCreator.createCylinder(1, 1, colorWheels);
        let c2 = ObjectsCreator.createCylinder(1, 1, colorWheels);
        let c3 = ObjectsCreator.createCylinder(1, 1, colorWheels);
        let c4 = ObjectsCreator.createCylinder(1, 1, colorWheels);

        c1.rotation.set(Math.PI / 2, 0, 0);
        c2.rotation.set(Math.PI / 2, 0, 0);
        c3.rotation.set(Math.PI / 2, 0, 0);
        c4.rotation.set(Math.PI / 2, 0, 0);

        c1.position.set(1.5, 1, -1.5);
        c2.position.set(1.5, 1, 1.5);
        c3.position.set(-1.5, 1, -1.5);
        c4.position.set(-1.5, 1, 1.5);

        let group = new THREE.Group();

        group.add(cube1);
        group.add(cube2);
        group.add(c1);
        group.add(c2);
        group.add(c3);
        group.add(c4);

        const ww = 5;

        group.position.x = j * ww + ww / 2;
        group.position.y = 0;
        group.position.z = i * ww + ww / 2;

        if(typeOfCar === "ZZZ"){
            group.rotation.y = Math.PI / 2;
        }

        scene.add(group);
        return group;
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = ObjectsCreator;



/***/ }),
/* 6 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Logger_js__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__LevelReturner_js__ = __webpack_require__(2);





class HeroController{
    constructor(scene, wallsArray, iii, jjj, finI, finJ, carsArray, finishOfGameObject) {
        this.scene = scene;

        this.finishOfGameObject = finishOfGameObject;

        this.wallsArray = wallsArray;
        this.carsArray = carsArray;

        this.mainJSONstringOfTheLevel = __WEBPACK_IMPORTED_MODULE_1__LevelReturner_js__["a" /* default */].getJSONString();

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
/* harmony export (immutable) */ __webpack_exports__["a"] = HeroController;



/***/ })
/******/ ]);