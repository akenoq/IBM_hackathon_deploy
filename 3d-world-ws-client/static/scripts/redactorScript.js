"use strict";

function setType(element){
    elem("type").innerHTML = element.innerHTML;
}

let holst = null;

let arr = [
    [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], []
];


function normalChar(c) {
    const s = "abcdefghijklmnopqrstuvwxyz1234567890";
    const n = s.indexOf(c);
    return n !== -1;
}

function normalString(s){
    s = s.toString();
    for(let i = 0; i < s.length; i++){
        const c = s.charAt(i);
        if(normalChar(c) === false){
            return false;
        }
    }
    return true;
}


function printMessage(s){
    s = s.toString();
    elem("wwwText").innerHTML = s;
    elem("fon").hidden = false;
    elem("messageWindow").hidden = false;
}


function saveLevel(){
    let levelName = elem("nameLevelField").value.toString();

    if(levelName.length === 0){
        printMessage("Поле ввода пусто.");
        return;
    }

    if(normalString(levelName) === false){
        printMessage("Поле ввода содержит запретные символы.");
        return;
    }

    let myObj = {
        arr: arr,
        levelName: levelName
    };

    let jsonString = encodeURIComponent(JSON.stringify(myObj));

    localStorage.setItem(levelName.toString(), jsonString.toString());
    printMessage("Уровень успешно сохранён.");
}

for(let i = 0; i < 20; i++){
    for(let j = 0; j < 20; j++){
        arr[i][j] = 0;
    }
}

function clearHolst(){
    holst.fillStyle = '#FFFFFF';
    holst.strokeStyle = '#666666';
    holst.fillRect(0, 0, 800, 800);
}

function buildKv(i, j, color){
    holst.fillStyle = color.toString();
    holst.fillRect(j * 25, i * 25, 25, 25);
    holst.strokeRect(j * 25, i * 25, 25, 25);
}

function addEmpty(i, j){
    arr[i][j] = 0;
    buildKv(i, j, "#ffffff");
}

function buildSetka(){
    for(let i = 0; i < 20; i++){
        for(let j = 0; j < 20; j++){
            addEmpty(i, j);
        }
    }
}

function addWall(i, j){
    arr[i][j] = 1;
    buildKv(i, j, "#999999");
}

function addCarX(i, j){
    arr[i][j] = 2;
    buildKv(i, j, "#00FF00");
}

function addCarZ(i, j){
    arr[i][j] = 3;
    buildKv(i, j, "#0000FF");
}

function setStartPos(ii, jj){
    for(let i = 0; i < 20; i++){
        for(let j = 0; j < 20; j++){
            if(arr[i][j] === 4){
                addEmpty(i,j);
            }
        }
    }
    arr[ii][jj] = 4;
    buildKv(ii, jj, "#FF0000");
}

function setFinishPos(ii, jj){
    for(let i = 0; i < 20; i++){
        for(let j = 0; j < 20; j++){
            if(arr[i][j] === 5){
                addEmpty(i,j);
            }
        }
    }
    arr[ii][jj] = 5;
    buildKv(ii, jj, "#000000");
}

function buildPerimaterOfWalls(){
    for(let i = 0; i < 20; i++){
        addWall(i,0);
        addWall(i,19);
    }

    for(let i = 1; i < 19; i++){
        addWall(0, i);
        addWall(19, i);
    }
}


function elem(s){
    return document.getElementById(s.toString());
}


function readJSONobjectFromURL(){
    let contentFromURL = window.location.search;

    if(contentFromURL.indexOf("?") === -1){
        return null;
    }

    let mass = [];
    mass = contentFromURL.split("?");

    let jsonString = decodeURIComponent(mass[1].toString());
    return  JSON.parse(jsonString);
}


window.onload = function(){
        holst = elem("can").getContext("2d");
        clearHolst();
        buildSetka();
        buildPerimaterOfWalls();

        let jsonObject = readJSONobjectFromURL();

        if(jsonObject !== null){
            elem("nameLevelField").value = jsonObject.levelName.toString();
            let mass = jsonObject.arr;
            for(let i = 0; i < 20; i++){
                for(let j = 0; j < 20; j++){
                    const value = mass[i][j];

                    let foo = null;

                    switch (value) {
                        case 0:
                            foo = addEmpty;
                            break;
                        case 1:
                            foo = addWall;
                            break;
                        case 2:
                            foo = addCarX;
                            break;
                        case 3:
                            foo = addCarZ;
                            break;
                        case 4:
                            foo = setStartPos;
                            break;
                        case 5:
                            foo = setFinishPos;
                            break;
                    }

                    if(foo !== null) {
                        foo(i, j);
                    }
                }
            }
        }

        buildPerimaterOfWalls();

        elem("can").addEventListener("click",function(event){
            const xMouse = event.offsetX;
            const yMouse = event.offsetY;

            const xx = parseInt(xMouse / 25);
            const yy = parseInt(yMouse / 25);

            const type = elem("type").innerHTML.toString();

            if(type === "Стены"){
                addWall(yy,xx);
            }

            if(type === "Машины X"){
                addCarX(yy,xx);
            }

            if(type === "Машины Z"){
                addCarZ(yy,xx);
            }

            if(type === "Стартовая позиция"){
                setStartPos(yy,xx);
            }

            if(type === "Финишная позиция"){
                setFinishPos(yy,xx);
            }

            buildPerimaterOfWalls();
        });
};
